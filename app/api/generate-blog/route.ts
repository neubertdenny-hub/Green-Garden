import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface BlogGenerationResult {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
}

const BLOG_PROMPTS = [
  {
    category: 'Rasensamen',
    title: 'Kahle Stellen im Rasen? So rettest du deinen Garten mit Premium Rasensamen',
    focus: 'Nutzerorientiert: Problem (kahle Stellen), Schmerz (unansehnlicher Rasen), Lösung (Premium Rasensamen schnellkeimend)',
  },
];

async function generateBlogPost(): Promise<BlogGenerationResult | null> {
  // Wähle einen zufälligen Prompt aus
  const prompt = BLOG_PROMPTS[Math.floor(Math.random() * BLOG_PROMPTS.length)];

  const systemPrompt = `Du bist ein erfahrener Garten-Blogger für GreenGarden.
Schreibe einen nutzerorientierten Blog-Artikel (1400-1600 Wörter) über Gartenprodukte.

STRUKTUR:
1. HOOK: Eine fesselnde Frage oder Aussage (50 Wörter)
2. PROBLEM/SCHMERZ: Beschreibe das Problem emotional (150 Wörter)
3. URSACHEN: Warum passiert das? (150 Wörter)
4. WARUM ES WICHTIG IST: Konsequenzen ignorieren (150 Wörter)
5. LÖSUNG: Unser Produkt & wie es hilft (200 Wörter)
6. PRAKTISCHE TIPPS: 3-4 konkrete Anwendungstipps (250 Wörter)
7. KONTEXT: Zusätzliche Informationen (200 Wörter)
8. FAQ: 5-6 häufig gestellte Fragen mit Antworten (300 Wörter)
9. FAZIT & CTA: Zusammenfassung + Handlungsaufforderung (100 Wörter)

STIL:
- Verständlich, nicht technisch
- Empathisch zum Kundenproblem
- Konkrete Beispiele & Geschichten
- Keine harten Verkaufssprache
- Fokus auf Kundenbenefit, nicht Produktfeatures
- Storytelling approach wie bei erfolgreichen Blogs

Du schreibst auf Deutsch und nutzt Markdown-Formatierung.
Gib die Antwort im JSON-Format zurück:
{
  "title": "Artikeltitel",
  "excerpt": "Kurze Zusammenfassung (150 Zeichen)",
  "content": "Vollständiger Markdown-Inhalt mit ## für Überschriften",
  "category": "Produktkategorie"
}`;

  const userPrompt = `Schreibe einen Blog-Artikel mit dem Titel: "${prompt.title}"

ANFORDERUNGEN:
- Länge: 1500-1600 Wörter
- Muss ein FAQ-Abschnitt mit 5-6 Fragen sein
- Nutzerorientiert, kein Verkaufsblog
- Fokus auf Kundenprobleme & Lösungen

Fokus: ${prompt.focus}

STRUKTUR (siehe auch Systemanweisung):
1. Fesselnder Hook (Frage oder Aussage)
2. Problem/Schmerz emotional beschreiben
3. Ursachen erklären
4. Warum wichtig (Konsequenzen)
5. LÖSUNG: Premium Rasensamen
6. 3-4 praktische Anwendungstipps
7. Zusätzliche Informationen
8. FAQ-Sektion mit 5-6 Fragen
9. Fazit & CTA

Produktinfo GreenGarden:
- Premium Rasensamen schnellkeimend 2kg
- 14 Tage Keimzeit
- Bis 80m² Ergiebigkeit
- Made in Germany
- Robust und strapazierfähig

Kundenpain Points:
- Kahle Stellen sehen unansehnlich aus
- Verringert Gartenschönheit
- Schnelle Lösungen sind teuer (Rollrasen)
- Unsicherheit über beste Methode

WICHTIG: Schreibe für Menschen, die nach Lösungen suchen, nicht für Verkauf!`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 3500,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]?.message?.content) {
      console.error('OpenAI Error:', data);
      return null;
    }

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    // Generiere Slug aus Titel
    const slug = prompt.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      title: parsed.title,
      slug,
      content: parsed.content,
      excerpt: parsed.excerpt,
      category: parsed.category || prompt.category,
    };
  } catch (error) {
    console.error('Blog Generation Error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  // Verifiziere den Cron Secret
  const cronSecret = request.headers.get('authorization');
  if (cronSecret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const blogPost = await generateBlogPost();

    if (!blogPost) {
      return NextResponse.json(
        { error: 'Failed to generate blog post' },
        { status: 500 }
      );
    }

    // Speichere als Markdown
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${blogPost.slug}.md`;
    const frontmatter = `---
title: ${blogPost.title}
date: ${date}
category: ${blogPost.category}
excerpt: ${blogPost.excerpt}
---

${blogPost.content}`;

    console.log(`✓ Blog post generated: ${filename}`);

    return NextResponse.json({
      success: true,
      filename,
      title: blogPost.title,
      slug: blogPost.slug,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
