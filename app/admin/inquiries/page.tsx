'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface InquiryRow {
  id: string;
  customer_name: string;
  customer_email: string;
  type: string;
  status: string;
  subject: string;
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingOfferId, setSendingOfferId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    new: 0,
    offersSent: 0,
    won: 0,
    complaints: 0
  });

  useEffect(() => {
    loadInquiries();
  }, []);

  async function sendOfferNow(inquiryId: string) {
    setSendingOfferId(inquiryId);
    try {
      const response = await fetch('/api/admin/send-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId })
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Refresh inquiries list
        loadInquiries();
        alert('✅ Angebot erfolgreich versendet!');
      } else {
        alert(`❌ Fehler: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Fehler beim Versenden des Angebots');
      console.error('Error:', error);
    } finally {
      setSendingOfferId(null);
    }
  }

  async function loadInquiries() {
    setLoading(true);
    try {
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('inquiries')
        .select('id, customer_name, customer_email, type, status, subject, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Failed to load inquiries:', error);
      } else if (data) {
        setInquiries(data);

        // Calculate stats
        setStats({
          new: data.filter(i => i.status === 'new').length,
          offersSent: data.filter(i => i.status === 'offer_sent').length,
          won: data.filter(i => i.status === 'won').length,
          complaints: data.filter(i => i.type === 'complaint').length,
        });
      }
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setLoading(false);
    }
  }

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
            <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Angebote gesendet</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.offersSent}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Gewonnene Aufträge</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.won}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Reklamationen</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.complaints}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Alle Anfragen</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Lädt...</p>
            </div>
          ) : inquiries.length === 0 ? (
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
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{inquiry.customer_name}</p>
                          <p className="text-sm text-gray-500">{inquiry.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-900">{inquiry.subject}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inquiry.type === 'offer' ? 'bg-blue-100 text-blue-800' :
                          inquiry.type === 'complaint' ? 'bg-red-100 text-red-800' :
                          inquiry.type === 'question' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inquiry.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'new' ? 'bg-green-100 text-green-800' :
                          inquiry.status === 'offer_sent' ? 'bg-blue-100 text-blue-800' :
                          inquiry.status === 'won' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        {inquiry.type === 'offer' && inquiry.status === 'new' && (
                          <button
                            onClick={() => sendOfferNow(inquiry.id)}
                            disabled={sendingOfferId === inquiry.id}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white text-xs font-medium rounded transition"
                          >
                            {sendingOfferId === inquiry.id ? '⏳ Wird gesendet...' : '💬 Angebot versenden'}
                          </button>
                        )}
                        {inquiry.status === 'offer_sent' && (
                          <span className="text-xs text-emerald-600 font-medium">✅ Versendet</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="font-bold text-emerald-900">✅ Automation aktiv</h3>
          <p className="text-emerald-800 text-sm mt-2">
            Phase 1 & 2 implementiert:
          </p>
          <ul className="text-sm text-emerald-800 mt-2 space-y-1">
            <li>✅ Kontaktformular mit Auto-Klassifizierung</li>
            <li>✅ Auto-Response Emails (Resend)</li>
            <li>✅ Supabase Datenbank Integration (wartet auf Credentials)</li>
            <li>✅ Live Anfrage-Statistiken</li>
            <li>🔄 Angebots-Automation (Phase 3)</li>
            <li>🔄 Email-Webhook für Incoming Emails (Phase 3)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
