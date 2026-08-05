'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'rasensamen-kahle-stellen-rasen',
    title: 'Kahle Stellen im Rasen? So rettest du deinen Garten mit Premium Rasensamen',
    excerpt: 'Erfahre, warum dein Rasen kahle Stellen bekommt und wie du sie mit den richtigen Rasensamen dauerhaft fixierst. Eine Anleitung für deinen perfekten Garten.',
    date: '2026-08-05',
    category: 'Rasensamen',
    readTime: '8 min',
    image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/blog" className="text-gray-600 hover:text-green-700 mb-6 inline-block">
            ← ZURÜCK ZUM BLOG
          </Link>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            GARTEN-BLOG.
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Jede Woche neuer Artikel. Direkt aus dem Garten.
          </p>
          <p className="text-gray-500">
            Tipps & Tricks, praktische Anleitungen, neuste Trends — kurz, knackig, sofort umsetzbar. 12+ Artikel bisher.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-green-600 transition">
                  {/* Bild oben */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-r from-green-100 to-green-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-900 text-xs font-bold border border-gray-300">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs font-semibold">⏱ {post.readTime}</span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                      <span className="text-green-600 font-bold text-xs group-hover:text-green-700">
                        LESEN →
                      </span>
                    </div>
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
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">GreenGarden</h4>
              <p className="text-sm">Premium Gartenprodukte & Tipps für deinen Garten.</p>
              {/* Social Media */}
              <div className="flex gap-4 mt-6">
                <a href="https://instagram.com/greengarden" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white transition" title="Instagram">📸</a>
                <a href="https://facebook.com/greengarden" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white transition" title="Facebook">👍</a>
                <a href="https://tiktok.com/@greengarden" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white transition" title="TikTok">🎵</a>
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
