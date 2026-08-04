'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import { sendToN8N, saveToLocalStorage, OfferData } from '../lib/api';

const productOptions = [
  'Gartengeräte',
  'Rasensamen',
  'Dünger',
  'Bewässerung',
];

export default function OfferPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    product: searchParams.get('product') || 'Gartengeräte',
    quantity: 1,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (
      !formData.product ||
      !formData.quantity ||
      !formData.deliveryDate ||
      !formData.email
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus');
      setLoading(false);
      return;
    }

    const offerData: OfferData = {
      type: 'offer',
      product: formData.product,
      quantity: formData.quantity,
      deliveryDate: formData.deliveryDate,
      email: formData.email,
      phone: formData.phone,
      timestamp: new Date().toISOString(),
    };

    const result = await sendToN8N(offerData);

    if (result.success) {
      saveToLocalStorage('offer_requests', offerData);
      setSuccess(true);
      setFormData({
        product: 'Gartengeräte',
        quantity: 1,
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        email: '',
        phone: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      saveToLocalStorage('offer_requests', offerData);
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Angebotsanfrage
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Wählen Sie Ihre gewünschten Produkte und erhalten Sie ein maßgeschneidertes Angebot
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✓ Ihre Angebotsanfrage wurde erfolgreich versendet. Wir erstellen ein Angebot für Sie!
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produktkategorie *
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {productOptions.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menge *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    max="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gewünschtes Lieferdatum *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Ihre Kontaktdaten
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
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
                      Telefon
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
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-bold rounded-lg transition"
              >
                {loading ? 'Wird gesendet...' : 'Angebot anfragen'}
              </button>
            </form>

            {/* Product Info Cards */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Unsere Produktkategorien
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {productOptions.map((product) => (
                  <div
                    key={product}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-500 cursor-pointer transition"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, product }))
                    }
                  >
                    <p className="font-bold text-gray-900">{product}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Klick zum Auswählen
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
