import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, type, timestamp } = await request.json();

    // Speichere lokal in localStorage (wird clientseitig gemacht)
    // Aber du kannst hier auch zu n8n senden
    const leadData = {
      type: type || 'chat_lead',
      message: message,
      timestamp: timestamp,
      source: 'chatbot',
    };

    // Sende zu n8n wenn URL vorhanden
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      } catch (e) {
        console.log('n8n webhook failed (non-critical):', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Capture Lead Error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Anfrage' },
      { status: 500 }
    );
  }
}
