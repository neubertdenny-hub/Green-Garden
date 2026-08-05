'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-6 px-4 shadow-2xl z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="font-bold mb-2">🍪 Cookies & Datenschutz</h3>
          <p className="text-sm text-gray-300 mb-3 md:mb-0">
            Wir nutzen Cookies zur Verbesserung der Nutzererfahrung. Einige sind notwendig für die Website-Funktion, andere helfen uns durch Google Analytics die Website zu optimieren.{' '}
            <Link href="/datenschutz" className="text-green-400 hover:text-green-300 underline">
              Mehr erfahren
            </Link>
          </p>
        </div>

        <div className="flex gap-4 whitespace-nowrap">
          <button
            onClick={handleReject}
            className="px-6 py-2 border-2 border-gray-500 text-gray-300 hover:border-gray-400 hover:text-white rounded-lg transition font-semibold"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
