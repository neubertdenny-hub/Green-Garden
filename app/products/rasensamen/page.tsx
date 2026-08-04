'use client';

import Link from 'next/link';
import Header from '../../components/Header';

export default function RasensamenPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-green-600 hover:text-green-700">Startseite</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900">Rasensamen</span>
          </div>
        </div>
      </div>

      {/* Category Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌱 Premium Rasensamen
          </h1>
          <p className="text-xl text-green-100">
            Hochwertige Rasensamen für einen dichten, grünen Rasen
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card */}
            <Link href="/shop" className="group">
              <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition overflow-hidden">
                {/* Product Image */}
                <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-6xl">🌱</div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition">
                    Premium Rasensamen schnellkeimend 2 kg
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <span className="text-gray-600">(245 Bewertungen)</span>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Schnellkeimende Rasensamen mit 14-Tage-Keimzeit. Ideal für Rasenreparatur, Nachsaat und Neuanlage.
                    Ergiebigkeit bis 80 m². Made in Germany.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Schnellkeimend (14 Tage)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Bis zu 80 m² Ergiebigkeit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Robust & strapazierfähig</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Made in Germany</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="border-t pt-4">
                    <p className="text-3xl font-bold text-green-600 mb-4">
                      €19,97
                    </p>
                    <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition">
                      Zum Shop & kaufen →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
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
                Premium Gartenprodukte für deinen perfekten Garten.
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
