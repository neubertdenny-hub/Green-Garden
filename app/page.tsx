import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';

const products = [
  {
    id: 1,
    name: 'Gartengeräte',
    description: 'Professionelle Werkzeuge für müheloses Gärtnern – vom ersten Spatenstich bis zur Blütenpflege',
    icon: '🔧',
    image: '/gartengeraete.png',
  },
  {
    id: 2,
    name: 'Rasensamen',
    description: 'Premium Rasensamenmischungen für einen dichten, grünen Rasen das ganze Jahr',
    icon: '🌱',
  },
  {
    id: 3,
    name: 'Dünger',
    description: 'Organische & mineralische Dünger – Nährstoffe für kräftiges Wachstum und leuchtende Farben',
    icon: '🌾',
  },
  {
    id: 4,
    name: 'Bewässerung',
    description: 'Intelligente Bewässerungssysteme für sorgenfreies Gärtnern – auch im Urlaub',
    icon: '💧',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section with Modern Gradient Design */}
      <section className="relative w-full h-screen max-h-[500px] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-900"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-green-400/20 rounded-full blur-sm"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Ihr Garten ist<br />Ihr Zuhause
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed font-normal">
                Hochwertige Gartenprodukte & fachkundige Beratung – für Anfänger und erfahrene Gärtner. Entdecken Sie, wie Sie aus Ihrem Garten eine grüne Wohlfühloase schaffen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/offer"
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition text-center"
                >
                  Jetzt beraten lassen
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition"
                >
                  Fachberatung anfordern
                </Link>
              </div>

              <div className="mt-12 flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">★</span>
                  <span>4.9/5 Bewertungen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>5000+ zufriedene Gärtner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-yellow-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center text-sm">
            <div>
              <p className="font-semibold text-gray-900">Kostenloser Versand</p>
              <p className="text-gray-600">ab 39 EUR*</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">2% Rabatt</p>
              <p className="text-gray-600">bei Vorkasse</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Schneller Versand</p>
              <p className="text-gray-600">mit DHL</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Sichere Zahlung</p>
              <p className="text-gray-600">mit PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unsere Produktkategorien
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Alles für Ihren Garten - von A bis Z
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/offer?product=${product.name}`}
                className="group"
              >
                {product.image ? (
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 h-64 hover:border-green-600 hover:shadow-lg transition">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 group-hover:to-black/50 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-200">{product.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-lg transition h-full">
                    <p className="text-4xl mb-4">{product.icon}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      {product.description}
                    </p>
                    <p className="text-green-600 font-semibold text-sm">
                      Jetzt anschauen →
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Dein zuverlässiger Partner für den perfekten Garten
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ob Anfänger oder erfahrener Gärtner – wir unterstützen Dich mit hochwertigen Produkten und Fachwissen
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ✓ Geprüfte Qualität
              </h3>
              <p className="text-gray-600">
                Jedes Produkt stammt von führenden Herstellern und erfüllt höchste Qualitätsstandards – garantiert.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                💡 Fachberatung
              </h3>
              <p className="text-gray-600">
                Kostenlose, persönliche Beratung für Dein Gartenprojekt – von Anfängertipps bis zu Profivarianten.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🚚 Schnelle Lieferung
              </h3>
              <p className="text-gray-600">
                Versand innerhalb von 2-3 Werktagen mit DHL – damit Dein Gartenprojekt nicht stagniert.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🌱 Umweltbewusst
              </h3>
              <p className="text-gray-600">
                Nachhaltige Produkte und klimaneutraler Versand – für einen grünen Garten und grüne Erde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Deinen perfekten Garten?
          </h2>
          <p className="text-lg text-green-100 mb-10">
            Starte jetzt mit professioneller Beratung & hochwertigen Produkten – völlig unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offer"
              className="px-10 py-3 bg-white text-green-700 font-semibold rounded hover:bg-gray-100 transition text-center"
            >
              Kostenlos Angebot anfordern
            </Link>
            <Link
              href="/contact"
              className="px-10 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/20 transition"
            >
              Experten-Beratung erhalten
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">GreenGarden GmbH</h4>
              <p className="text-sm leading-relaxed">
                Ihre Experten für hochwertige Gartenprodukte und professionelle Beratung seit 2010.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Startseite</Link></li>
                <li><Link href="/#products" className="hover:text-white transition">Produkte</Link></li>
                <li><Link href="/offer" className="hover:text-white transition">Angebot</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Kontakt</h4>
              <p className="text-sm mb-1">📧 info@greengarden.de</p>
              <p className="text-sm mb-1">📞 +49 123 456789</p>
              <p className="text-sm">📍 Garten Str. 1, 12345 Stadt</p>
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
            <p>&copy; 2024 GreenGarden GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
