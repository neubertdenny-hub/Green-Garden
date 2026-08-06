'use client';

import { useState } from 'react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Kundenanfragen</h1>
          <p className="text-gray-600 mt-1">Verwalte alle Anfragen, Angebote und Reklamationen</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Neue Anfragen</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Angebote gesendet</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Gewonnene Aufträge</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Reklamationen</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Alle Anfragen</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Noch keine Anfragen vorhanden.</p>
              <p className="text-sm text-gray-500 mt-1">Neue Anfragen erscheinen hier.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Kunde</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Betreff</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Typ</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Datum</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Placeholder rows */}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900">🚀 Bald verfügbar</h3>
          <p className="text-blue-800 text-sm mt-2">
            Dashboard wird mit Supabase Datenbank verbunden:
          </p>
          <ul className="text-sm text-blue-800 mt-2 space-y-1">
            <li>✅ Live Anfrage-Statistiken</li>
            <li>✅ Angebote automatisch versenden</li>
            <li>✅ Status-Updates tracken</li>
            <li>✅ Email-Klassifizierung</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
