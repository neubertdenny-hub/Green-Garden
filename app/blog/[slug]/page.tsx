'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '../../components/Header';

interface BlogPost {
  title: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  content: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const blogContent: Record<string, BlogPost> = {
  'rasensamen-kahle-stellen-rasen': {
    title: 'Kahle Stellen im Rasen? So rettest du deinen Garten mit Premium Rasensamen',
    date: '2026-08-05',
    category: 'Rasensamen',
    readTime: '8 min',
    author: 'GreenGarden',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `# Kahle Stellen im Rasen? So rettest du deinen Garten mit Premium Rasensamen

Kennst du das Gefühl? Du sitzt auf deiner Terrasse, schaust auf deinen Garten – und siehst dort überall diese fiesen **kahlen Stellen im Rasen**, die einfach nicht verschwinden wollen. Der Rasen sieht unansehnlich aus. Und du fragst dich: "Wie kam es dazu, und noch wichtiger – wie werde ich es los?"

Die gute Nachricht: **Du bist nicht allein.** Kahle Stellen sind eines der häufigsten Gartenprobleme. Und noch bessere Nachricht: Es gibt eine bewährte, kostengünstige Lösung, die wirklich funktioniert.

## Warum bekommt mein Rasen überhaupt kahle Stellen?

Bevor wir zur Lösung kommen, müssen wir verstehen, *warum* dein Rasen diese Lücken bekommt. Die Ursachen sind vielfältig:

### Intensive Nutzung und Belastung

Wenn dein Garten viel genutzt wird – Kinder spielen, der Hund rennt herum – verdichtet sich der Boden. Die Grashalme werden abgenutzt und der Boden bekommt keine Chance zu regenerieren.

### Schädlinge und Krankheiten

Manchmal sind es Maden, Grauschimmel oder andere Rasenkrankheiten, die ganze Flächen zerstören.

### Nährstoffmangel

Dein Rasen braucht Stickstoff, Phosphor und Kalium. Ohne diese Nährstoffe wird er dünn und anfällig.

### Falsche Bewässerung

Zu viel Wasser fördert Moos und Pilze. Zu wenig führt zu Austrocknung.

## Warum ist ein dicker, grüner Rasen wichtig?

Das ist nicht nur Ästhetik. Ein dichter Rasen bietet praktische Vorteile:

### Weniger Unkraut

Ein dichter Rasen lässt Unkräutern keine Chance. Kahle Stellen sind eine Einladung für Löwenzahn und Klee.

### Bodenstabilität

Der Rasen hält deinen Boden zusammen und schafft eine stabile Oberfläche.

### Besseres Mikroklima

Ein grüner Rasen kühlt den Garten im Sommer ab und verbessert die Luftqualität.

## Die Lösung: Premium Rasensamen schnellkeimend

Hier kommt die gute Nachricht: **Du brauchst nicht Tausende von Euro für einen Rollrasen auszugeben.** Mit den richtigen Premium Rasensamen kannst du kahle Stellen in nur wenigen Wochen beheben.

Der Schlüssel liegt in der **Schnellkeimung**. Normale Rasensamen brauchen 3-4 Wochen. Schnellkeimende Premium Rasensamen keimen bereits nach **14 Tagen**!

Das bedeutet:
- Schneller Erfolg: Du siehst innerhalb von zwei Wochen erste grüne Halme sprießen
- Kostengünstig: Eine 2kg Packung kostet einen Bruchteil eines Rollrasens
- Robust: Der neue Rasen ist von Anfang an strapazierfähig
- Made in Germany: Premium-Qualität mit höchsten Standards

## Praktische Anleitung: So behebt man kahle Stellen richtig

Jetzt zur Praxis. So machst du es richtig:

### Schritt 1: Boden vorbereiten

Harke die kahle Stelle gründlich auf. Lockere den verdichteten Boden auf – das ist wichtig! Der neue Samen braucht Bodenkontakt. Entferne Unkraut und alte Graswurzeln.

### Schritt 2: Richtige Menge ausbringen

Verwende etwa 25g Rasensamen pro Quadratmeter. Bei einer 2kg Packung kannst du bis zu 80 Quadratmeter nachsäen.

### Schritt 3: Gießen – der kritischste Schritt

Nach der Aussaat ist Wasser entscheidend. Wässere täglich, damit der Boden **feucht, aber nicht staunass** bleibt.

### Schritt 4: Warten und dann pflegen

Nach 14 Tagen siehst du die ersten grünen Halme. Nach 4-6 Wochen ist der neue Rasen vollständig etabliert.

## Häufige Fehler und wie du sie vermeidest

Zu den häufigsten Fehlern gehört das Unterschätzen der Bodenvorbereitung. Ein aufgelockerter Boden ist das A und O. Wenn du diesen Schritt vernachlässigst, riskierst du, dass die Samen nicht keimen.

Ein weiterer häufiger Fehler ist unregelmäßiges Gießen. Die ersten zwei Wochen sind entscheidend. Wenn der Boden austrocknet, keimen die Samen nicht – wenn er zu nass ist, faulen sie.

📋 **TIPP:** Wähle die richtige Jahreszeit – Frühjahr (März-Mai) und Herbst (September-Oktober) sind ideal. Der Boden ist warm genug und es gibt natürliche Feuchtigkeit.

## Häufig gestellte Fragen

**Kann ich Premium Rasensamen das ganze Jahr über aussäen?**
Theoretisch ja, aber die besten Ergebnisse erzielst du im Frühjahr und Herbst. Im Hochsommer braucht der Rasen konstante Bewässerung, im Winter keimen die Samen sehr schlecht.

**Wie lange hält ein aus Rasensamen gezogener Rasen?**
Bei korrekter Pflege kann dein Rasen viele Jahre halten – oft 10-20 Jahre oder länger. Es ist eine langfristige Investition.

**Ist Premium Rasensamen teurer als normales Saatgut?**
Nein! Das Preis-Leistungs-Verhältnis ist ausgezeichnet. Eine 2kg Packung kostet etwa 20-25 Euro und bepflanzt bis zu 80 m².

**Kann ich Rasensamen auf bestehenden Rasen aussäen?**
Ja, aber die Chancen auf Keimung sind geringer. Beste Ergebnisse erzielst du auf aufgelockertem Boden.

**Was ist der Unterschied zwischen schnellkeimenden und normalen Rasensamen?**
Schnellkeimende Sorten haben eine dünnere Samenschale und optimierte Keimfähigkeit. Sie keimen in 14 Tagen statt 3-4 Wochen und haben bessere Keimquoten.

## Fazit

Kahle Stellen im Rasen sind **lösbar**. Mit Premium Rasensamen sparst du Zeit, Geld und Aufwand. In nur 14 Tagen sieht dein Rasen wieder grün aus – und nach 6 Wochen ist das Problem völlig gelöst.

Das Beste daran? **Es ist einfach.** Du brauchst keine speziellen Geräte oder teures Equipment. Nur Rasensamen, ein bisschen Wasser und Geduld.

🌱 **Dein perfekter Garten beginnt mit den richtigen Rasensamen!**
`,
  },
};

// Generiere Inhaltsverzeichnis aus Überschriften
function generateTableOfContents(content: string): TableOfContentsItem[] {
  const lines = content.split('\n');
  const toc: TableOfContentsItem[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      toc.push({ text, level: 2, id });
    } else if (line.startsWith('### ')) {
      const text = line.replace('### ', '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      toc.push({ text, level: 3, id });
    }
  });

  return toc;
}

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Kann ich Premium Rasensamen das ganze Jahr über aussäen?',
      a: 'Theoretisch ja, aber die besten Ergebnisse erzielst du im Frühjahr und Herbst. Im Hochsommer braucht der Rasen konstante Bewässerung, im Winter keimen die Samen sehr schlecht.',
    },
    {
      q: 'Wie lange hält ein aus Rasensamen gezogener Rasen?',
      a: 'Bei korrekter Pflege kann dein Rasen viele Jahre halten – oft 10-20 Jahre oder länger. Es ist eine langfristige Investition.',
    },
    {
      q: 'Ist Premium Rasensamen teurer als normales Saatgut?',
      a: 'Nein! Das Preis-Leistungs-Verhältnis ist ausgezeichnet. Eine 2kg Packung kostet etwa 20-25 Euro und bepflanzt bis zu 80 m².',
    },
    {
      q: 'Kann ich Rasensamen auf bestehenden Rasen aussäen?',
      a: 'Ja, aber die Chancen auf Keimung sind geringer. Beste Ergebnisse erzielst du auf aufgelockertem Boden.',
    },
    {
      q: 'Was ist der Unterschied zwischen schnellkeimenden und normalen Rasensamen?',
      a: 'Schnellkeimende Sorten haben eine dünnere Samenschale und optimierte Keimfähigkeit. Sie keimen in 14 Tagen statt 3-4 Wochen und haben bessere Keimquoten.',
    },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left font-bold text-gray-900 flex items-center justify-between transition"
          >
            <span>{faq.q}</span>
            <span className="text-xl">
              {openIndex === idx ? '−' : '+'}
            </span>
          </button>
          {openIndex === idx && (
            <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-300">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogContent[slug];
  const toc = post ? generateTableOfContents(post.content) : [];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <section className="py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Artikel nicht gefunden</h1>
          <Link href="/blog" className="text-green-600 hover:text-green-700">
            ← Zurück zum Blog
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Image */}
      <section className="relative w-full h-96 md:h-[500px] bg-gray-200 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </section>

      {/* Meta & Title */}
      <section className="bg-white border-b border-gray-200 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-gray-600 hover:text-green-700 mb-6 inline-block font-semibold">
            ← ZURÜCK ZUM BLOG
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-900 text-xs font-bold border border-gray-300">
              {post.category}
            </span>
            <span className="text-gray-600 text-sm font-semibold">
              ⏱ {post.readTime}
            </span>
            <span className="text-gray-600 text-sm">
              {new Date(post.date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
            <span className="text-gray-600 text-sm">
              · VON {post.author.toUpperCase()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {/* Sidebar: Table of Contents */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 bg-gray-50 border border-gray-300 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase">Inhaltsverzeichnis</h3>
              <nav className="space-y-2 text-sm">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-gray-600 hover:text-green-700 transition ${
                      item.level === 3 ? 'ml-4' : ''
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Article */}
          <article className="md:col-span-3 text-gray-700 space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();

              if (trimmed.startsWith('# ')) {
                // H1 - nur am Anfang, überspringen da wir es oben haben
                return null;
              } else if (trimmed.startsWith('## ')) {
                const text = trimmed.replace('## ', '');
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <h2
                    key={idx}
                    id={id}
                    className="text-3xl font-bold text-gray-900 mt-12 pt-8 border-t-4 border-gray-200"
                  >
                    {text}
                  </h2>
                );
              } else if (trimmed.startsWith('### ')) {
                const text = trimmed.replace('### ', '');
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <h3
                    key={idx}
                    id={id}
                    className="text-xl font-bold text-gray-900 mt-6"
                  >
                    {text}
                  </h3>
                );
              } else if (trimmed.startsWith('📋')) {
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-lg bg-blue-50 border-l-4 border-blue-400"
                  >
                    <p className="text-sm font-bold text-blue-900 mb-2">TIPP</p>
                    <p className="text-gray-700">{trimmed.replace(/^📋\s*/, '')}</p>
                  </div>
                );
              } else if (trimmed.includes('\n')) {
                const lines = trimmed.split('\n');
                return (
                  <div key={idx} className="space-y-2">
                    {lines.map((line, i) => (
                      <p key={i} className="text-lg leading-relaxed">
                        {line.replace(/^[-•]\s*/, '').trim()}
                      </p>
                    ))}
                  </div>
                );
              } else {
                return (
                  <p key={idx} className="text-lg leading-relaxed">
                    {trimmed}
                  </p>
                );
              }
            })}

            {/* FAQ Section */}
            <div className="mt-16 pt-8 border-t-4 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Häufig gestellte Fragen
              </h2>
              <FAQAccordion />
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready für den perfekten Rasen?
          </h3>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Jetzt Premium Rasensamen kaufen →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 GreenGarden. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
