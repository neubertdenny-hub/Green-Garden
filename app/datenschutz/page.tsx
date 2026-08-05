'use client';

import Link from 'next/link';
import Header from '../components/Header';

export default function Datenschutz() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Datenschutzerklärung</h1>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">1. Verantwortlicher</h2>
          <p>
            GreenGarden GmbH<br />
            E-Mail: info@greengarden.de<br />
            Telefon: +49 123 456789
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">2. Erhebung und Speicherung von Daten</h2>
          <p>
            Bei der Nutzung unserer Website erfassen wir automatisch bestimmte Informationen, darunter:
          </p>
          <ul className="list-disc ml-6">
            <li>IP-Adresse</li>
            <li>Browsertyp und -version</li>
            <li>Zugriffsdaten und -zeiten</li>
            <li>Referrer-URL</li>
            <li>Besuchte Seiten</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">3. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies, um die Nutzererfahrung zu verbessern. Sie können Cookies in Ihren Browsereinstellungen deaktivieren.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">4. Kontaktformulare</h2>
          <p>
            Wenn Sie unser Kontaktformular nutzen, erfassen wir:
          </p>
          <ul className="list-disc ml-6">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer</li>
            <li>Nachrichteninhalt</li>
          </ul>
          <p>
            Diese Daten werden nur für die Beantwortung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">5. Externe Services</h2>
          <p>
            Wir nutzen folgende externe Services:
          </p>
          <ul className="list-disc ml-6">
            <li><strong>Google Analytics:</strong> zur Analyse von Website-Nutzung</li>
            <li><strong>Google Search Console:</strong> zur Überwachung von Suchmaschinen-Performance</li>
            <li><strong>n8n:</strong> zur Automatisierung von Formularübermittlungen</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">6. Ihre Rechte</h2>
          <p>Sie haben das Recht zu:</p>
          <ul className="list-disc ml-6">
            <li>Erfahren, welche Daten über Sie gespeichert sind</li>
            <li>Ihre Daten korrigieren zu lassen</li>
            <li>Ihre Daten löschen zu lassen</li>
            <li>Der Verarbeitung Ihrer Daten zu widersprechen</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">7. Kontakt zum Datenschutz</h2>
          <p>
            Für Fragen zum Datenschutz kontaktieren Sie uns bitte unter:<br />
            E-Mail: info@greengarden.de<br />
            Telefon: +49 123 456789
          </p>

          <div className="mt-12 p-6 bg-green-50 border-l-4 border-green-600 rounded">
            <p className="text-sm text-gray-600">
              Diese Datenschutzerklärung wurde zuletzt aktualisiert am 05. August 2026.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-green-600 hover:text-green-700">
              ← Zur Startseite
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 GreenGarden. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
