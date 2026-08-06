'use client';

import Link from 'next/link';
import Header from '../components/Header';
import { SocialLinks } from '../components/SocialLinks';
import { products, getAllCategories, getProductPrice } from '@/lib/products';
import { useState } from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const categories = getAllCategories();

  const handleAddToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    const { totalPrice } = getProductPrice(product, item.quantity);
    return sum + totalPrice;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Alle Premium-Produkte für deinen Garten – hochwertig, zuverlässig und schnell geliefert.
          </p>
        </div>
      </section>

      {/* Shop Layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Kategorien */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Kategorien</h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-4 py-3 mb-2 rounded-lg transition ${
                    selectedCategory === null
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Alle Produkte
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-3 mb-2 rounded-lg transition ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Warenkorb</h3>
                  <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={item.productId} className="text-sm">
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-gray-600">{item.quantity}x</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-2">Gesamt:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {cartTotal.toFixed(2)} EUR
                    </p>
                  </div>
                  <button className="w-full mt-4 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition">
                    Zur Kasse
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const { unitPrice, totalPrice } = getProductPrice(product, 1);
                  return (
                    <Link
                      key={product.id}
                      href={`/shop/${product.sku}`}
                      className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-green-600 hover:shadow-lg transition group block"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center overflow-hidden">
                        <div className="text-6xl opacity-30 group-hover:scale-110 transition">
                          🌱
                        </div>
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">
                          {product.category}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="mb-4 pb-4 border-b-2 border-gray-200">
                          <p className="text-2xl font-bold text-green-700">
                            {unitPrice.toFixed(2)} EUR
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            💰 Ab 15 Stück: 10% Rabatt
                          </p>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-4">
                          {product.inStock ? (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              ✓ Lagernd
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              Nicht verfügbar
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={!product.inStock}
                          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition"
                        >
                          {product.inStock ? '🛒 In den Warenkorb' : 'Nicht verfügbar'}
                        </button>

                        {/* SKU */}
                        <p className="text-xs text-gray-400 mt-3">SKU: {product.sku}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Keine Produkte in dieser Kategorie.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Beratung benötigt?
          </h2>
          <p className="text-gray-600 mb-6">
            Unsere Experten helfen dir gerne bei der Auswahl der richtigen Produkte für dein Gartenprojekt.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          >
            Kostenlose Beratung anfordern
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-auto">
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
