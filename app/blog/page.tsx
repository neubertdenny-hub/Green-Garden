'use client';

import Link from 'next/link';
import Header from '../components/Header';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

// Blog-Posts werden automatisch aus app/blog/*.md geladen
// Der erste Post über Rasensamen ist jetzt live!
const blogPosts: BlogPost[] = [
  {
    slug: 'rasensamen-kahle-stellen-rasen',
    title: 'Kahle Stellen im Rasen? So rettest du deinen Garten mit Premium Rasensamen',
    excerpt: 'Erfahre, warum dein Rasen kahle Stellen bekommt und wie du sie mit den richtigen Rasensamen dauerhaft fixierst. Eine Anleitung für deinen perfekten Garten.',
    date: '2026-08-05',
    category: 'Rasensamen',
    readTime: '8 min',
  },
  // Weitere Blog-Posts werden automatisch hinzugefügt
  // Jeden Freitag um 10:00 UTC generiert der Vercel Cron einen neuen Post
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌱 Garten-Blog von GreenGarden
          </h1>
          <p className="text-xl text-green-100">
            Tipps, Tricks & Lösungen für deinen perfekten Garten
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white border-2 border-gray-200 hover:border-green-600 rounded-xl p-8 transition cursor-pointer hover:shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-gray-500 text-sm">
                      {new Date(post.date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-green-600 font-semibold text-sm hover:text-green-700">
                      Artikel lesen →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Neue Garten-Tipps jede Woche
            </h3>
            <p className="text-gray-600 mb-6">
              Abonniere unseren Newsletter und erhalte jeden Freitag einen neuen Blog-Artikel direkt in dein Postfach.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Deine E-Mail..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                Abonnieren
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">GreenGarden</h4>
              <p className="text-sm">Premium Gartenprodukte & Tipps für deinen Garten.</p>
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
                <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
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
