'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';

const products = [
  {
    id: 1,
    name: 'Premium Rasensamen schnellkeimend 2 kg',
    category: 'Rasensamen',
    price: 19.97,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81FvLqWJK2L._AC_SX679_.jpg',
    asin: 'B0H942JJCG',
    coverage: '80 m²',
    keimtime: '14 Tage',
    rating: 4.8,
    reviews: 245,
  },
];

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GreenGarden Shop
          </h1>
          <p className="text-xl text-green-100">
            Premium Gartenprodukte für deinen perfekten Garten
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Product Details */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {products[0].name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {products[0].rating} ({products[0].reviews} Bewertungen)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-1">Preis (inkl. 7% MwSt):</p>
                  <p className="text-4xl font-bold text-green-600">
                    €{products[0].price.toFixed(2)}
                  </p>
                </div>

                {/* Key Info */}
                <div className="space-y-3 mb-8 pb-8 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <div>
                      <p className="font-semibold text-gray-900">Ergiebigkeit</p>
                      <p className="text-gray-600">{products[0].coverage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Keimzeit</p>
                      <p className="text-gray-600">{products[0].keimtime}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={`https://amazon.de/dp/${products[0].asin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-center transition"
                >
                  🛒 Bei Amazon kaufen
                </a>
                <p className="text-xs text-gray-600 text-center mt-2">
                  Sichere Amazon-Zahlung • Versand in 1-2 Tagen
                </p>
              </div>
            </div>

            {/* Product Content */}
            <div className="md:col-span-2">
              {/* Product Image */}
              <div className="mb-12">
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={products[0].image}
                    alt={products[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Full SEO Content */}
              <article className="prose prose-lg max-w-none text-gray-700">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Premium Rasensamen schnellkeimend – Der Weg zu deinem perfekten Rasen
                </h1>

                <p className="text-lg leading-relaxed mb-6">
                  Ein dichter, grüner Rasen ist der Traum vieler Gartenbesitzer. Doch Kahlfraßstellen,
                  Moosflecken und kahle Stellen durch Belastung machen diesen Traum oft zur Herausforderung.
                  Genau hier setzen Premium Rasensamen schnellkeimend an – eine hochwertige Lösung für
                  alle, die ihren Rasen reparieren, verdichten oder von Grund auf neu anlegen möchten.
                </p>

                <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
                  <p className="font-semibold text-gray-900 mb-2">💡 Rasensamen für jeden Gärtner</p>
                  <p className="text-gray-700">
                    Egal ob Anfänger oder erfahrener Gärtner – diese Premium Rasensamen bieten
                    die perfekte Lösung für Rasenreparatur und Nachsaat. Mit einer Keimzeit von nur 14 Tagen
                    erlebst du schnell sichtbare Erfolge.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                  Warum Rasensamen die perfekte Lösung sind
                </h2>

                <p className="mb-6">
                  Rasensamen sind deutlich kostengünstiger als das Verlegen von Rollrasen. Mit hochwertigen Rasensamen
                  erreichst du ähnliche Ergebnisse – mit mehr Flexibilität und weniger Belastung für deinen Geldbeutel.
                  Die schnellkeimenden Sorten ermöglichen sogar eine Rasenreparatur während der Wachstumsperiode.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
                  ✓ Schnelle Keimung – Ergebnisse nach 14 Tagen
                </h3>
                <p className="mb-6">
                  Diese schnellkeimenden Rasensamen keimen deutlich schneller als Standard-Saatgut.
                  Die spezielle Mischung ist auf maximale Keimgeschwindigkeit optimiert. Du siehst bereits nach
                  zwei Wochen die ersten grünen Halme sprießen – perfekt für die Rasenreparatur im Sommer und Herbst.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
                  ✓ Ergiebigkeit bis 80 m² – Großflächige Rasenreparatur
                </h3>
                <p className="mb-6">
                  Die 2 kg Packung Rasensamen reicht bis zu 80 Quadratmetern. Das macht diese Rasensamen
                  besonders wirtschaftlich. Egal ob kleine Lücken oder größere kahle Stellen – diese Nachsaat-Mischung
                  schafft es, deinen Rasen wieder dicht und grün zu bekommen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
                  ✓ Robust und strapazierfähig
                </h3>
                <p className="mb-6">
                  Der neue Rasen ist nicht nur dicht und sattgrün, sondern auch extrem strapazierfähig.
                  Spielende Kinder, tobende Hunde und regelmäßiges Betreten – der aus diesen Premium Rasensamen
                  entstandene Rasen verträgt alles. Eine perfekte Rasenreparatur, die lange hält.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                  Anleitung: Rasenreparatur mit schnellkeimenden Rasensamen
                </h2>

                <ol className="list-decimal pl-6 space-y-4 mb-8">
                  <li className="text-gray-700">
                    <strong>Vorbereitung:</strong> Harken Sie die kahlen Stellen auf und lockern Sie den Boden auf.
                  </li>
                  <li className="text-gray-700">
                    <strong>Aussaat:</strong> Verteilen Sie die Rasensamen gleichmäßig. Bei großflächiger Rasenreparatur
                    verwenden Sie ca. 25g pro Quadratmeter.
                  </li>
                  <li className="text-gray-700">
                    <strong>Bewässerung:</strong> Wässern Sie die Fläche gründlich und halten Sie den Boden
                    die nächsten 2-3 Wochen gleichmäßig feucht.
                  </li>
                  <li className="text-gray-700">
                    <strong>Keimung:</strong> Nach ca. 14 Tagen beginnt die Keimung. Nach 4-6 Wochen ist der
                    neue Rasen vollständig etabliert.
                  </li>
                </ol>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                  Häufig gestellte Fragen zu Rasensamen
                </h2>

                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-900 mb-2">❓ Wann ist die beste Zeit für Rasenreparatur?</h4>
                    <p className="text-gray-700">
                      Herbstrasen sind ideal. Aber auch Frühjahr und Sommer funktionieren mit schnellkeimenden Rasensamen.
                      Wichtig: Der Boden sollte warm und feucht sein.
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-900 mb-2">❓ Wie lange hält der neue Rasen?</h4>
                    <p className="text-gray-700">
                      Ein aus diesen Premium Rasensamen gewachsener Rasen hält viele Jahre,
                      wenn Sie ihn regelmäßig mähen und düngen.
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-900 mb-2">❓ Kann ich diese Rasensamen auch bei Regen aussäen?</h4>
                    <p className="text-gray-700">
                      Ideal ist leicht feuchter Boden. Starkregen sollten Sie vermeiden,
                      da die Samen dann weggeschwemmt werden könnten.
                    </p>
                  </div>
                </div>

                <div className="bg-green-100 border border-green-300 rounded-lg p-6 my-8">
                  <h3 className="font-bold text-gray-900 mb-2">🌱 Garantie & Qualität</h3>
                  <p className="text-gray-700">
                    Diese Premium Rasensamen werden in Deutschland hergestellt und erfüllen höchste Qualitätsstandards.
                    Bei korrekter Anwendung erzielen Sie garantiert sichtbare Ergebnisse.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                  Dein Weg zum perfekten Rasen – Jetzt bestellen!
                </h2>

                <p className="text-lg mb-8">
                  Premium Rasensamen schnellkeimend sind die intelligente Wahl für alle,
                  die ihren Rasen reparieren und verbessern möchten. Mit einer Keimzeit von nur 14 Tagen,
                  hoher Ergiebigkeit und bewährter Qualität sind diese Rasensamen die perfekte Lösung für dein Gartenprojekt.
                </p>

                <a
                  href={`https://amazon.de/dp/${products[0].asin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition text-lg"
                >
                  🛒 Premium Rasensamen jetzt kaufen
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">GreenGarden</h4>
              <p className="text-sm">
                Dein Shop für hochwertige Gartenprodukte und Rasenqualität.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Startseite</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Kontakt</h4>
              <p className="text-sm mb-1">📧 info@greengarden.de</p>
              <p className="text-sm mb-1">📞 +49 123 456789</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition">AGB</a></li>
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
