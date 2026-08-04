'use client';

import { useState } from 'react';
import Header from '../components/Header';
import { sendToN8N, saveToLocalStorage, ContactData } from '../lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Bitte füllen Sie alle Felder aus');
      setLoading(false);
      return;
    }

    const contactData: ContactData = {
      type: 'contact',
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const result = await sendToN8N(contactData);

    if (result.success) {
      // Also save locally
      saveToLocalStorage('contact_requests', contactData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      // Save locally as fallback
      saveToLocalStorage('contact_requests', contactData);
      setError(
        result.error ||
        'Anfrage wurde lokal gespeichert (Webhook nicht erreichbar)'
      );
      setTimeout(() => setError(''), 5000);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Kontaktieren Sie uns
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Haben Sie Fragen oder Wünsche? Wir freuen uns auf Ihre Nachricht!
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✓ Ihre Anfrage wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen!
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ihre.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+49 123 456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ihre Nachricht..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-bold rounded-lg transition"
              >
                {loading ? 'Wird gesendet...' : 'Nachricht absenden'}
              </button>
            </form>

            <div className="mt-12 grid md:grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h4 className="font-bold text-gray-900 mb-1">E-Mail</h4>
                <p className="text-gray-600">info@greengarden.de</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                <p className="text-gray-600">+49 123 456789</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📍</div>
                <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                <p className="text-gray-600">Garten Str. 1<br />12345 Stadt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
