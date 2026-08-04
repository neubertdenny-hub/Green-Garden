import { NextRequest, NextResponse } from 'next/server';
import { sendToN8N } from '@/app/lib/api';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const SYSTEM_PROMPT = `Du bist der freundliche GreenGarden-Assistent - ein Experte für Gartenprodukte und Gartenberatung.

WICHTIG: Du beantwortest ALLE Fragen hilfreiche, freundlich und professionell. Du bist nicht auf vordefinierte Antworten begrenzt.

Über GreenGarden:
- Wir verkaufen hochwertige Gartenprodukte: Gartengeräte, Rasensamen, Dünger, Bewässerungssysteme
- Versand: 2-3 Werktage mit DHL
- Kostenloser Versand ab 39€
- 4.9/5 Bewertungen
- 5000+ zufriedene Kunden
- Email: info@greengarden.de
- Telefon: +49 123 456789

Deine Aufgaben:
1. KUNDENSERVICE: Beantworte Fragen zu Versand, Rückgaben, Lieferstatus, Zahlung etc.
2. PRODUKTBERATUNG: Gib Tipps & Tricks zu Produkten, empfehle Produkte basierend auf Bedürfnissen
3. GARTENTIPPS: Antworte auf Garten-Fragen (Pflanzenpflege, beste Jahreszeit, Schädlingsbekämpfung etc.)
4. LEAD-CAPTURING: Wenn jemand eine konkrete Anfrage hat (Angebot, Großbestellung, spezielle Wünsche), markiere dies durch "LEAD_CAPTURE" in deiner Antwort.

Wenn der Nutzer eine Anfrage hat, die persönliche Beratung braucht, schlag vor:
- "Möchtest du unverbindlich mit unserem Team sprechen? Ich leite deine Anfrage weiter!"

Ton: Freundlich, hilfreich, professionell, deutsch.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API Key nicht konfiguriert' },
        { status: 500 }
      );
    }

    // Baue Conversation History für Kontext
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...conversationHistory.map((msg: Message) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // OpenAI API Call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI Error:', data);
      return NextResponse.json(
        { error: 'OpenAI API Fehler', details: data },
        { status: 500 }
      );
    }

    const reply = data.choices[0].message.content;
    const shouldCapture = reply.includes('LEAD_CAPTURE');
    const cleanReply = reply.replace('LEAD_CAPTURE', '').trim();

    // Wenn Lead-Capturing, speichere zu n8n
    if (shouldCapture) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL || '', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'chat_lead',
            message: message,
            timestamp: new Date().toISOString(),
            source: 'chatbot',
          }),
        });
      } catch (e) {
        console.log('n8n webhook failed:', e);
      }
    }

    return NextResponse.json({
      reply: cleanReply,
      shouldCapture: shouldCapture,
      type: 'chat_inquiry',
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    );
  }
}
