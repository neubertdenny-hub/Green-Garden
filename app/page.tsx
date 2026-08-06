'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import { SocialLinks } from './components/SocialLinks';

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

      {/* Hero Section — Modern & Clean */}
      <section className="relative w-full py-28 md:py-40 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-60"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Dein Garten.<br />Dein Projekt.<br />Deine Inspiration.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Hochwertige Produkte und fachkundige Beratung für deinen perfekten Garten. Ob Anfänger oder Profi — hier findest du alles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
                >
                  Zum Shop →
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-gray-300 hover:border-emerald-600 text-gray-900 font-bold rounded-lg transition"
                >
                  Beratung anfordern
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">★</span>
                  <div>
                    <p className="font-bold text-gray-900">4.9/5</p>
                    <p className="text-gray-600">142+ Bewertungen</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">5000+</p>
                    <p className="text-gray-600">Zufriedene Kunden</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Decorative Element */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl opacity-20 blur-2xl"></div>
                <div className="absolute inset-8 border-2 border-emerald-200 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-8xl opacity-20">🌿</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals — Minimal & Professional */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 mb-2">📦</p>
              <p className="font-bold text-gray-900 text-lg">DHL Versand</p>
              <p className="text-gray-600 text-sm mt-1">bis 14:00 Uhr</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 mb-2">⚡</p>
              <p className="font-bold text-gray-900 text-lg">1-2 Tage</p>
              <p className="text-gray-600 text-sm mt-1">Lieferzeit</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 mb-2">🔒</p>
              <p className="font-bold text-gray-900 text-lg">Sichere Zahlung</p>
              <p className="text-gray-600 text-sm mt-1">Alle Methoden</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 mb-2">↩️</p>
              <p className="font-bold text-gray-900 text-lg">30 Tage Rückgabe</p>
              <p className="text-gray-600 text-sm mt-1">Kostenlos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-4">Kategorien</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Alles für deinen Garten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Entdecke unser sorgsam zusammengestelltes Sortiment — von professionellen Werkzeugen bis zu hochwertigen Saatgut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => {
              const categoryLinks: Record<string, string> = {
                'Rasensamen': '/products/rasensamen',
              };
              const href = categoryLinks[product.name] || `/offer?product=${product.name}`;

              return (
              <Link
                key={product.id}
                href={href}
                className="group"
              >
                {product.image ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 h-72 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:to-black/40 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition">{product.name}</h3>
                      <p className="text-sm text-gray-200 mb-4">{product.description}</p>
                      <span className="inline-block text-green-300 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Jetzt entdecken →
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-8 border-2 border-green-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-72 flex flex-col justify-between group">
                    <div>
                      <p className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{product.icon}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition">
                        {product.name}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-green-600 font-bold text-sm group-hover:text-green-700 group-hover:translate-x-2 transition-transform">
                      Jetzt entdecken →
                    </p>
                  </div>
                )}
              </Link>
            );
            })}
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

      {/* Trust Signals Row */}
      <section className="bg-gray-50 border-y border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-bold text-gray-900 text-center mb-8 uppercase tracking-wide">Zahlungsarten & Versand</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {/* DHL */}
            <div className="flex flex-col items-center">
              <Image
                src="/dhl-logo.webp"
                alt="DHL"
                width={80}
                height={40}
                className="h-10 w-auto mb-2"
              />
              <p className="text-xs text-gray-600 text-center">Versand</p>
            </div>

            {/* PayPal */}
            <div className="flex flex-col items-center">
              <Image
                src="/paypal-logo.svg"
                alt="PayPal"
                width={80}
                height={40}
                className="h-10 w-auto mb-2"
              />
              <p className="text-xs text-gray-600 text-center">Zahlung</p>
            </div>

            {/* Überweisung */}
            <div className="flex flex-col items-center">
              <div className="h-10 mb-2 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-600 text-center">Überweisung</p>
            </div>

            {/* Rechnungskauf */}
            <div className="flex flex-col items-center">
              <div className="h-10 mb-2 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M16 18H8v-2h8v2z" fill="white"/>
                  <path d="M16 14H8v-2h8v2z" fill="white"/>
                </svg>
              </div>
              <p className="text-xs text-gray-600 text-center">Rechnung</p>
            </div>

            {/* Stripe */}
            <div className="flex flex-col items-center">
              <div className="h-10 mb-2 flex items-center">
                <svg className="h-8" viewBox="0 0 120 40" fill="none">
                  <text x="0" y="30" fontSize="28" fontWeight="bold" fill="#0a1427">Stripe</text>
                </svg>
              </div>
              <p className="text-xs text-gray-600 text-center">Sicher</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">GreenGarden</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Premium Gartenprodukte & professionelle Beratung für deinen Traumgarten.
              </p>
              <div className="flex gap-4 text-gray-600">
                <SocialLinks />
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/shop" className="text-gray-600 hover:text-emerald-700 transition font-medium">Alle Produkte</Link></li>
                <li><Link href="/shop?category=Rasensamen" className="text-gray-600 hover:text-emerald-700 transition font-medium">Rasensamen</Link></li>
                <li><Link href="/shop?category=Poolpflege" className="text-gray-600 hover:text-emerald-700 transition font-medium">Poolpflege</Link></li>
                <li><Link href="/shop?category=Wassertests" className="text-gray-600 hover:text-emerald-700 transition font-medium">Wassertests</Link></li>
              </ul>
            </div>

            {/* Unternehmen Column */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Unternehmen</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-emerald-700 transition font-medium">Über uns</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-emerald-700 transition font-medium">Blog & Tipps</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-emerald-700 transition font-medium">Kontakt</Link></li>
                <li><Link href="/offer" className="text-gray-600 hover:text-emerald-700 transition font-medium">Beratung</Link></li>
              </ul>
            </div>

            {/* Kontakt Column */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Kontakt</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 font-medium">Email</p>
                  <a href="mailto:info@greengarden.de" className="text-emerald-700 hover:text-emerald-800 transition">info@greengarden.de</a>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Telefon</p>
                  <a href="tel:+49123456789" className="text-emerald-700 hover:text-emerald-800 transition">+49 123 456789</a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
              <div>
                <p>&copy; 2026 GreenGarden GmbH. Alle Rechte vorbehalten.</p>
              </div>
              <div className="md:text-right space-x-6">
                <Link href="/datenschutz" className="hover:text-emerald-700 transition">Datenschutz</Link>
                <a href="#" className="hover:text-emerald-700 transition">Impressum</a>
                <a href="#" className="hover:text-emerald-700 transition">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
