'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/app/components/Header';
import { SocialLinks } from '@/app/components/SocialLinks';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact_form' })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.');
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Es ist ein Fehler aufgetreten.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Fehler beim Absenden des Formulars. Bitte später versuchen.');
      console.error('Error:', error);
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Kontakt</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Hast du Fragen zu unseren Produkten? Möchtest du ein Angebot? Oder hast du Feedback?
            Wir freuen uns auf deine Nachricht!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:info@greengarden.de" className="text-emerald-700 hover:text-emerald-800 font-medium">
                    info@greengarden.de
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Telefon</h3>
                  <a href="tel:+49123456789" className="text-emerald-700 hover:text-emerald-800 font-medium">
                    +49 123 456789
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Social</h3>
                  <div className="flex gap-4 text-emerald-700">
                    <SocialLinks />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Öffnungszeiten</h3>
                  <p className="text-gray-600 text-sm">
                    Mo-Fr: 9:00 - 17:00 Uhr<br/>
                    Sa-So: Geschlossen
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="deine@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Telefon (optional)</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Betreff *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="Angebotsa nfrage">Angebotsa nfrage für Produkte</option>
                    <option value="Frage zu Produkt">Frage zu einem Produkt</option>
                    <option value="Reklamation">Reklamation / Beschwerde</option>
                    <option value="Feedback">Feedback / Verbesserungsvorschlag</option>
                    <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Nachricht *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Schreib deine Nachricht hier..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    ✅ {message}
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    ❌ {message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition"
                >
                  {status === 'loading' ? 'Wird gesendet...' : '📧 Anfrage absenden'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">GreenGarden</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Premium Gartenprodukte & professionelle Beratung für deinen Traumgarten.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/shop" className="text-gray-600 hover:text-emerald-700 transition font-medium">Alle Produkte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Unternehmen</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-emerald-700 transition font-medium">Über uns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Kontakt</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 font-medium">Email</p>
                  <a href="mailto:info@greengarden.de" className="text-emerald-700 hover:text-emerald-800 transition">info@greengarden.de</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">&copy; 2026 GreenGarden GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
