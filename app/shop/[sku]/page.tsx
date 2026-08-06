'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import { SocialLinks } from '@/app/components/SocialLinks';
import { products, getProductBySku, getProductPrice } from '@/lib/products';
import { useState, useEffect } from 'react';

// Produktdetails mit Bulletpoints & langen Texten für 8 Top-Produkte
const productDetails: Record<string, { bullets: string[]; longText: string }> = {
  'IN-Y5CY-G7RS': {
    bullets: [
      '100 Tabletten (50x pH-Wert Phenol Red + 50x Chlor DPD1) — Komplettpaket für 20+ Wochen Tests',
      '10 Jahre Haltbarkeit bei korrekter Lagerung — zuverlässige Messergebnisse bis zum Ablaufdatum',
      'Sekundenschnelle Farbreaktion — klare Ergebnisse auch für Anfänger ohne Messgeräte',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das Problem: Unsichtbare Wasserchemie</h3>
Jeder Poolbesitzer kennt das: Das Wasser sieht klar aus, aber irgendetwas stimmt nicht. Der Pool riecht komisch, die Augen brennen nach dem Schwimmen, oder die Algen kehren regelmäßig zurück — obwohl Sie regelmäßig Chemikalien zugeführt haben.

Das Kernproblem: Sie arbeiten im Blindflug. Chlor und pH-Wert sind unsichtbar. Wenn der pH-Wert zu hoch ist (über 7,8), funktioniert Chlor nicht richtig — Algen entstehen, obwohl Sie längst Chemikalien zugeführt haben.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die Lösung: Wissen ist Macht</h3>
Diese hochwertigen Wassertest-Tabletten sind das Handwerkzeug jedes erfahrenen Pool-Managers. Der pH-Wert ist das Fundament aller anderen Tests. Mit dem bewährten Phenol Red Test bekommen Sie innerhalb von Sekunden ein zuverlässiges Farbmessungs-Ergebnis. Das Chlor-Teablet zeigt, ob Ihre Desinfektion wirkt.

Chlor tötet Bakterien und Viren — aber NUR in der richtigen Menge. Zu wenig: Algen und Bakterien. Zu viel: Rote Augen und Haut-Irritationen.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Was andere Kunden berichten</h3>
Viele Besitzer sagen: Nach der ersten richtigen Wassermessung brauchten sie plötzlich 40-50% weniger Chemikalien — weil sie endlich wussten, WAS ihr Pool wirklich brauchte. Mit 10 Jahren Haltbarkeit sind diese Tests verlässlich und konsistent.`,
  },
  'F3-0F4C-6S4O': {
    bullets: [
      '3-in-1 Multifunktional-Wirkung: Bekämpft Algen, reduziert Trübung & verhindert Vergrünungen gleichzeitig',
      '2 Liter Hochkonzentrat = flexible Dosierung für alle Poolgrößen (optimal 50-80 m³)',
      'Sofortige Wirkung innerhalb 24h + langfristige Prävention — sichtbar klares Wasser zum Schwimmen',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das Alptraum-Szenario: Grüner Pool im Sommer</h3>
Der Traum vom perfekten Pool endet schnell, wenn das Wasser grün wird. Grünes Wasser = Algenbloom. Algen sind hartnäckig: Einmal etabliert, sind sie schwer zu bekämpfen. Die meisten Poolbesitzer versuchen, Algen zu bekämpfen, NACHDEM sie entstanden sind — kostet Zeit, Geld, Frustration.

Das Kernproblem: Poolprobleme kommen selten allein.
- Grünes Wasser (Algenbloom)
- Trübes Wasser (Schwebstoffe, die der Filter nicht erfasst)
- Vergrünungen (Verfärbungen an Wänden & Boden)

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das 3-in-1 System: Alles auf einmal lösen</h3>
Dieses Poolpflege-Konzentrat ist anders konstruiert. Es ist ein durchdachtes System, das die DREI Hauptprobleme gleichzeitig angeht:

1. **Algizid** — Das aktive Algenmittel stoppt Algenwachstum bei der Wurzel. Präventiv auch.
2. **Flockungsmittel** — Der Klärer fällt kleine Schwebstoffe aus, sodass sie der Filter erfasst
3. **Anti-Vergrünungs-Agent** — Verhindert, dass Algenpigmente an Wänden/Boden haften

2 Liter Konzentrat bedeutet maximale Flexibilität. Du dosierst selbst nach deinem Pool-Volumen und Problemgrad.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Ergebnis: Kristallklares Wasser garantiert</h3>
Mit dieser 3-in-1-Lösung hast du einen einfachen, verlässlichen Weg zu klarem, einladendem Pool-Wasser.`,
  },
  '64-7W5Q-EH06': {
    bullets: [
      '5 Meter Reichweite — halte sichere Distanz zu Angreifern ein (statt risikoreichen 1-2 Metern)',
      'Breitstrahl-Formulierung mit 0,66% OC — schwer zu verfehlen auch unter Stress & zittrigen Händen',
      'Professionelle Wirksamkeit + sofortige Abwehr — psychologischer Schutz + physische Sicherheit',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das oft übersehene Sicherheitsproblem</h3>
Selbstschutz ist nicht glamourös. Aber die Psychologie ist crystal clear: Wer vorbereitet ist, hat einen Vorteil. Ein gutes Pfefferspray ist nicht nur eine physische Abwehr — es ist auch psychologischer Schutz. Es gibt dir das Gefühl, dass du NICHT hilflos bist.

Das Problem mit schlecht gewählten Sprays: Sie wirken nicht, weil sie zu schwach sind oder die Reichweite fehlt. Ein Spray mit nur 2-3 Metern Reichweite? Das ist fast nutzlos — zu nah dran, zu viel Risiko.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Warum 5 Meter Reichweite entscheidend ist</h3>
Dieses Pfefferspray ist nicht irgendein Gadget — es ist ein ernsthafter Selbstschutz-Tool.

5 Meter Reichweite ermöglicht dir eine SICHERE DISTANZ zu einem Angreifer. Die Breitstrahl-Formulierung ist schwer zu verfehlen. Wenn deine Hände zittern (was bei Angst normal ist), trifft es trotzdem. 0,66% OC ist ernsthafte Qualität — nicht Spielzeug.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die oft übersehene Wahrheit</h3>
Ein Pfefferspray schützt dich BEVOR es benutzt wird. Forschung zeigt: Kriminelle bevorzugen wehrlose Ziele. Wenn du weißt, dass du dich schützen KANNST, strahlst du das auch aus — unbewusst, aber messbar.`,
  },
  'NN-IK54-4FG4': {
    bullets: [
      '2kg Premium Rasensamen mit 85%+ Keimrate — dichtes Grün statt 30% Keimquoten von Billigprodukten',
      'Schnellkeimend: Erste Triebe nach 1-2 Wochen, nutzbarer Rasen nach 4-6 Wochen (statt 8-10 Wochen)',
      'Für intensive Nutzung gezüchtet — hält Haustiere, Fußball & tägliche Beanspruchung mühelos aus',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das sichtbare Nachbar-Problem</h3>
Nichts ist frustrierender als ein lückenhafter Rasen. Du siehst deine Nachbarn mit ihrem perfekten Grün — und deiner ist voller kahler Stellen. Der Grund ist oft nicht mangelnde Arbeit, sondern mangelnde Qualität beim Saatgut.

Das stille Katastrophen-Szenario: Viele Gartenbesitzer kaufen Billig-Samenmischungen. Ergebnis:
- Nur 30-40% der Samen keimen (bei hochwertigen: 80%+)
- Billige Mischungen enthalten Gräser, die nicht zu deinem Klima passen
- Billige Hersteller sorgen nicht für reine Sorten

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die Realität der Billigvariante</h3>
Du säst, wartest, und nach 3 Wochen sind 60% der Stellen noch kahl. Frustrierend? Total.

Diese hochwertige Samenmischung ist nicht einfach "Rasensamen" — es ist ein durchdachtes Zucht-Produkt.

Mit hochwertiger Genetik keimen 85%+ der Körner. Die Mischung ist für intensive Nutzung gedacht. Diese Sorte wächst schnell — du hast nach 4-6 Wochen einen nutzbaren Rasen. Ein guter Rasen ist ein Marathon, nicht ein Sprint.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Worauf es ankommt</h3>
Premium Rasensamen = mehr Geld vorne, zero Frust hinten.`,
  },
  'OZ-5L9K-FQEA': {
    bullets: [
      '240 x 140 cm robuste Stahlkonstruktion — trägt 50+ kg Pflanzengewicht mühelos (nicht wie dünne Kunststoff-Bögen)',
      'Grüne, rostfreie Beschichtung für 20+ Jahre Haltbarkeit — wartungsfrei auch im nassen Klima',
      'Ideal für Kletterrosen, Clematis, Efeu & Geißblatt — verwandelt einen flachen Garten in ein Tiefenwunder',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das Geheimnis eines interessanten Gartens</h3>
Viele Gärten sind eintönig: Rasen, ein paar Beete, fertig. Aber zwischen "einfach" und "WOW" liegt oft nur eine Entscheidung: eine vertikale Struktur für Kletterrosen.

Ein guter Rankgerüst transformiert einen Garten völlig.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die unsichtbare Dimension: HÖHE</h3>
Gärten arbeiten mit drei Dimensionen:
- Länge (horizontal)
- Breite (horizontal)
- HÖHE (vertikal — oft ignoriert!)

Viele Gärtner ignorieren die Höhe. Alle Pflanzen sind bodennah. Der Blick fällt flach und monoton ab. Der Garten wirkt uninteressant.

Ein Rankgerüst mit Kletterrosen löst das völlig. Plötzlich hat dein Garten:
- Tiefe
- Struktur
- Visuelles Interesse
- Eine natürliche Wanderung des Blicks

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Qualität zählt: Diese robuste Stahlversion vs. Billig-Varianten</h3>
Nicht alle Rankgerüste sind gleich. Billige Kunststoff- oder dünne Metall-Bögen halten dem Gewicht einer etablierten Kletterrose nicht. Diese robuste Stahlversion hält Jahrzehnte.

Der Rankgerüst ist nicht NUR für Rosen: Kletterrosen, Clematis, Efeu & Wilder Wein, Geißblatt. Ein einzelner schöner Rankgerüst kann deine tägliche Beziehung zu deinem Garten transformieren.`,
  },
  'HR-BV3P-DRBM': {
    bullets: [
      '1kg Reparaturrasen mit integriertem Langzeit-Dünger — speziell gezüchtet für Schnelligkeit (7-10 Tage Keimung)',
      'Für Hunde-Buddellöcher, Fußball-Plätze & Wetter-Schäden entwickelt — hält verdichtete Böden aus',
      'Nachhereffekt nach 3 Wochen sichtbar: Kahle Stellen verschwinden komplett (vs. 6-8 Wochen bei normalen Samen)',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das tägliche Alptraum-Szenario</h3>
Es passiert bei jedem Rasen:
- Hunde buddeln ein Loch
- Kinder spielen Fußball auf der gleichen Stelle
- Ein trockener Sommer tötet Gräser ab
- Plötzlich hast du kahle Stellen — und sie sehen nicht gut aus

Das ist das übersehene Geheimnis: Kahle Stellen sind nicht einfach "Boden ohne Gras". Sie sind oft:
- Verdichtet (vom Betreten)
- Nährstoffarm (ausgelaugt)
- Sogar sauer (ungünstiges pH)

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das Versagenszenario mit normalem Rasensamen</h3>
Wenn du normale Rasensamen dort säst, keimen sie nicht oder wachsen schwach. Ergebnis: Du säst, wartest, und nach 3-4 Wochen ist die Stelle immer noch lückig. Das kostet Geld und Zeit — und löst nichts.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die Reparaturrasen-Lösung: Ein durchdachtes System</h3>
Dieser Reparaturrasen ist nicht einfach "Rasensamen". Es ist ein speziell entwickeltes System für kahle Stellen.

**Spezielle schnellkeimende Gräsersorten** — buchstäblich GEZÜCHTET für Schnelligkeit. Sie keimen in 7-10 Tagen.

**Integrierter Langzeit-Dünger** — das Game-Changer. Der Dünger gibt den jungen Gräsern SOFORT Nährstoffe zum Wachsen.

Viele Homeowner berichten: "Nach 3 Wochen sind die kahlen Stellen weg — wirklich weg."`,
  },
  '47-9BMA-FPJ7': {
    bullets: [
      '24 verschiedene Testparameter — nicht nur pH & Chlor, sondern auch Stabilisator, Säurekapazität, Cyanurin',
      'Digitales Photometer mit Bluetooth + App für iOS/Android — speichert Messwerte, zeigt Trends über Zeit',
      'Vorhersage statt Reaktion — siehst Wertveränderungen BEVOR visuelle Probleme entstehen',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Das Nachteil-Szenario von Tablettentests</h3>
Tablettentest sind gut — aber sie haben ein massives Problem: Sie basieren auf Farbvergleich. Dein Auge entscheidet, welcher Farbton "richtig" ist. Außerdem: Wer hat Lust, wöchentlich Tests zu machen?

Die Grenzen sind real:
- Farbinterpretation ist subjektiv (zwei Menschen, zwei Ergebnisse)
- Du brauchst 5-10 Minuten pro Test
- Langfristige Daten sind schwer zu tracken

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">PoolLab 2.0: Eine neue Herangehensweise</h3>
Für ernsthafte Poolbesitzer gibt es PoolLab 2.0. Das ist nicht einfach "ein besseres Testgerät" — es ist eine völlig neue Herangehensweise.

Du gießt Wasser in die Küvette, drückst einen Knopf, und das Gerät misst EXAKT die chemischen Werte. Du bekommst 24 verschiedene Parameter — nicht nur pH und Chlor, sondern auch:
- Stabilisator
- Säurekapazität (Alkalität)
- Cyanurin
- Und viel mehr

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die Smart-App: Vorhersage statt Reaktion</h3>
Die Messwerte gehen DIREKT in eine App auf deinem Smartphone. Die App speichert alle Messwerte und zeigt dir Trends über Zeit. Du siehst, ob ein Wert aus der Balance rutscht — BEVOR das Problem sichtbar wird (grünes Wasser, Algen, etc.).

Das ist die Zukunft der Poolpflege: Datangetrieben statt intuitive.`,
  },
  '2P-7TGB-F6W0': {
    bullets: [
      'XXL-Format (900x400mm) — Platz für Maus UND Tastatur, keine Mid-Game-Position-Resets nötig',
      'Optimierte Oberfläche für mittlere Mausgeschwindigkeiten (Precision + Speed Balance) — konsistent über Jahre',
      'Gummierte Unterseite + kaffeeresistent — hält intensiven Gaming-Sessions & Alltags-Stress aus',
    ],
    longText: `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die unbewusste Nachteil-Frage</h3>
Du fragst dich: Warum trifft mein Gegner dich immer — obwohl ihr beide den gleichen Monitor habt? Der Unterschied sitzt unter der Maus. Das Mousepad.

Viele Gamer machen diesen Fehler:
- Spielen auf winzigen Pads
- Spielen direkt auf dem Schreibtisch
- Verwenden irgendwelche alten Pads

Das führt zu:
- Inconsistente Bewegungen (Reibung variiert)
- Arm-Ermüdung (unnötige Adjustments)
- Verkürzte Maus-Lebensdauer (Verschleiß)

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Was Profis wissen (und was Amateure ignorieren)</h3>
Professionelle E-Sportler wechseln ihr Pad regelmäßig — weil sie wissen, dass die Pad-Konsistenz entscheidend ist.

Dieses XXL-Mousepad ist nicht einfach ein buntes Kunstwerk. Es ist ein Werkzeug für präzise Aim-Kontrolle. Mit genug Platz brauchst du nie wieder deine Maus-Position zu resetten. Das Material ist exakt abgestimmt für mittlere Maus-Geschwindigkeiten.

Das Pad verrutscht NICHT beim intensiven Spielen. Es hält einem realen Gaming-Leben stand (Kaffee, Schweiß, Kratzer).

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Die psychologische Wahrheit</h3>
Wenn du dich bei deinem Setup WOHLFÜHLST, spielst du besser. Das ist wissenschaftlich belegt. Profis investieren in Peripherie, weil kleine Unterschiede zählen.`,
  },
};

// Shipping Info Component
function ShippingInfo() {
  const [timeLeft, setTimeLeft] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const cutoffHour = 14;

      let cutoffTime = new Date(now);
      cutoffTime.setHours(cutoffHour, 0, 0, 0);

      if (now.getHours() >= cutoffHour) {
        cutoffTime.setDate(cutoffTime.getDate() + 1);
      }

      const diff = cutoffTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${String(hours).padStart(2, '0')} h ${String(minutes).padStart(2, '0')} min`);

      // Delivery date (next day after cutoff)
      const delivery = new Date(cutoffTime);
      delivery.setDate(delivery.getDate() + 1);
      const day = String(delivery.getDate()).padStart(2, '0');
      const month = String(delivery.getMonth() + 1).padStart(2, '0');
      setDeliveryDate(`${day}.${month}.${new Date().getFullYear()}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const todayDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}`;
  const tomorrowDate = `${String(tomorrow.getDate()).padStart(2, '0')}.${String(tomorrow.getMonth() + 1).padStart(2, '0')}`;
  const dayAfterDate = `${String(dayAfterTomorrow.getDate()).padStart(2, '0')}.${String(dayAfterTomorrow.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-lg p-6 mb-8">
      {/* DHL Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-orange-700">📦 Versand mit DHL</span>
        <span className="text-sm bg-orange-600 text-white px-3 py-1 rounded font-bold">STANDARD</span>
      </div>

      {/* Countdown */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-orange-200">
        <p className="text-sm text-gray-600 mb-1">⏰ Bestellen Sie noch innerhalb von</p>
        <p className="text-3xl font-bold text-orange-700 font-mono">{timeLeft}</p>
        <p className="text-sm text-gray-600 mt-2">und erhalten Sie Ihr Paket schon am <strong>{deliveryDate}</strong></p>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-sm font-bold text-gray-900 mb-1">Bestellt</div>
          <div className="text-xs text-gray-600">{todayDate}</div>
          <div className="text-2xl mt-2">📋</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-2xl text-orange-400">→</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-gray-900 mb-1">In Zustellung</div>
          <div className="text-xs text-gray-600">{tomorrowDate}</div>
          <div className="text-2xl mt-2">🚚</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-2xl text-orange-400">→</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-gray-900 mb-1">Zugestellt</div>
          <div className="text-xs text-gray-600">{dayAfterDate}</div>
          <div className="text-2xl mt-2">📍</div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-orange-200">
        <div className="flex gap-2">
          <span className="text-xl">🔐</span>
          <div className="text-xs">
            <p className="font-bold text-gray-900">Diskrete Lieferung</p>
            <p className="text-gray-600">nach DE & AT</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-xl">✅</span>
          <div className="text-xs">
            <p className="font-bold text-gray-900">30 Tage Geld-Zurück</p>
            <p className="text-gray-600">Garantie</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-xl">🔄</span>
          <div className="text-xs">
            <p className="font-bold text-gray-900">30 Tage</p>
            <p className="text-gray-600">Rückgaberecht</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-xl">🛡️</span>
          <div className="text-xs">
            <p className="font-bold text-gray-900">Sichere Zahlung</p>
            <p className="text-gray-600">Geprüft & Sicher</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const sku = params.sku as string;
  const product = getProductBySku(sku);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <section className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Produkt nicht gefunden</h1>
            <p className="text-gray-600 mb-6">Das gesuchte Produkt existiert nicht.</p>
            <Link href="/shop" className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition">
              Zurück zum Shop
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const { unitPrice, totalPrice, discount } = getProductPrice(product, quantity);
  const details = productDetails[product.sku] || { bullets: [], longText: '' };
  const savePercent = quantity >= 15 ? Math.round((discount / (unitPrice * quantity)) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <Link href="/shop" className="text-green-600 hover:text-green-700 mb-8 inline-block text-sm">
            ← Zurück zum Shop
          </Link>

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Left: Product Image */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full min-h-96 flex items-center justify-center sticky top-20 shadow-sm">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl opacity-20 mb-2">📦</div>
                    <p className="text-gray-400 text-sm">Bild folgt</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-2">
              {/* Trust Signal */}
              <div className="mb-4 text-sm text-gray-600 font-medium">
                ✅ Über 1000x gekauft
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

              {/* Short Hook */}
              <p className="text-lg text-gray-700 mb-6 font-medium">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                <span className="text-sm text-gray-600">4.9 (142 Bewertungen)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-600 text-sm mb-1">Preis pro Stück</p>
                <p className="text-4xl font-bold text-green-700 mb-2">
                  {unitPrice.toFixed(2)} EUR
                </p>
                {quantity >= 15 && (
                  <p className="text-sm text-green-600 font-semibold">
                    ✅ Staffelrabatt 10% aktiv
                  </p>
                )}
              </div>

              {/* Bulletpoints */}
              {details.bullets.length > 0 && (
                <div className="mb-8 space-y-3 bg-green-50 p-5 rounded-lg">
                  {details.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3 text-gray-800">
                      <span className="text-green-600 font-bold text-xl leading-none mt-0.5">✓</span>
                      <span className="text-sm lg:text-base">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* DHL Shipping Info */}
              <ShippingInfo />

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Menge: {quantity} Stück
                </label>
                <div className="flex gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const message = `Ich interessiere mich für ein Angebot für:\n\nArtikel: ${product.name}\nSKU: ${product.sku}\nMenge: ${quantity} Stück\n\nBitte geben Sie mir ein Angebot!`;
                  const encodedMessage = encodeURIComponent(message);
                  window.location.href = `/contact?subject=Angebotsanfrage%20-%20${encodeURIComponent(product.name)}&message=${encodedMessage}`;
                }}
                className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-lg transition text-center mb-4 shadow-lg hover:shadow-xl cursor-pointer"
              >
                💬 Angebot anfordern
              </button>

              {/* Total Price & Stock */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Gesamtpreis</p>
                  <p className="text-2xl font-bold text-gray-900">{totalPrice.toFixed(2)} EUR</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
                  {product.inStock ? (
                    <p className="text-green-700 font-bold text-sm">✓ Sofort lieferbar</p>
                  ) : (
                    <p className="text-red-700 font-bold text-sm">Nicht verfügbar</p>
                  )}
                  {quantity >= 15 && savePercent > 0 && (
                    <p className="text-green-700 font-bold text-sm mt-1">Sparen: {savePercent}%</p>
                  )}
                </div>
              </div>

              {/* Link Back */}
              <Link
                href="/shop"
                className="inline-block text-green-600 hover:text-green-700 font-semibold text-sm"
              >
                → Weitere Produkte
              </Link>
            </div>
          </div>

          {/* Long SEO Text */}
          {details.longText && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Warum dieses Produkt?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-gray-700 leading-relaxed space-y-4 prose prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.longText
                      .replace(/<h3 class="([^"]*)">/g, '<h3 class="$1">')
                      .replace(/<li>/g, '<li class="ml-4">')
                      .replace(/\*\*([^*]*)\*\*/g, '<strong>$1</strong>')
                  }}
                  className="text-gray-700"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">GreenGarden</h4>
              <p className="text-sm">Premium Gartenprodukte & Tipps für deinen Garten.</p>
              <div className="mt-6">
                <SocialLinks />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Startseite</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Kontakt</h4>
              <p className="text-sm mb-1">📧 info@greengarden.de</p>
              <p className="text-sm">📞 +49 123 456789</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/datenschutz" className="hover:text-white transition">Datenschutz (DSGVO)</Link></li>
                <li><a href="#" className="hover:text-white transition">Impressum</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 GreenGarden. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
