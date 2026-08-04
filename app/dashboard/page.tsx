'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { isAdminLoggedIn } from '../lib/auth';
import { ContactData, OfferData } from '../lib/api';

interface DashboardStats {
  openRequests: number;
  offers: number;
  revenue: string;
  tasks: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    openRequests: 0,
    offers: 0,
    revenue: '€0',
    tasks: 0,
  });
  const [contactRequests, setContactRequests] = useState<ContactData[]>([]);
  const [offerRequests, setOfferRequests] = useState<OfferData[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push('/login');
      return;
    }

    // Load data from localStorage
    const stored_contacts = localStorage.getItem('contact_requests') || '[]';
    const stored_offers = localStorage.getItem('offer_requests') || '[]';

    const contacts: ContactData[] = JSON.parse(stored_contacts);
    const offers: OfferData[] = JSON.parse(stored_offers);

    setContactRequests(contacts);
    setOfferRequests(offers);

    // Calculate stats
    setStats({
      openRequests: contacts.length,
      offers: offers.length,
      revenue: '€' + (offers.length * 500).toLocaleString('de-DE'),
      tasks: contacts.length + offers.length,
    });

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Übersicht über Anfragen, Angebote und Aufgaben
          </p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Offene Anfragen
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.openRequests}
                  </p>
                </div>
                <div className="text-4xl">📧</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Angebote</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.offers}
                  </p>
                </div>
                <div className="text-4xl">📄</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Geschätzter Umsatz
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.revenue}
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Aufgaben</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.tasks}
                  </p>
                </div>
                <div className="text-4xl">✓</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-4 font-medium transition ${
                activeTab === 'overview'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Übersicht
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-2 px-4 font-medium transition ${
                activeTab === 'contacts'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Kontaktanfragen ({contactRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`py-2 px-4 font-medium transition ${
                activeTab === 'offers'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Angebote ({offerRequests.length})
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Letzte Aktivitäten
                </h2>
                <div className="space-y-3">
                  {contactRequests.length === 0 && offerRequests.length === 0 ? (
                    <p className="text-gray-600">Noch keine Anfragen vorhanden</p>
                  ) : (
                    <>
                      {contactRequests.slice(-3).map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Neue Kontaktanfrage von {req.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(req.timestamp).toLocaleString('de-DE')}
                            </p>
                          </div>
                          <span className="text-2xl">📧</span>
                        </div>
                      ))}
                      {offerRequests.slice(-3).map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Neue Angebotsanfrage: {req.product}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(req.timestamp).toLocaleString('de-DE')}
                            </p>
                          </div>
                          <span className="text-2xl">📄</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {contactRequests.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  Noch keine Kontaktanfragen
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          E-Mail
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Telefon
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Datum
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactRequests.map((req, idx) => (
                        <tr
                          key={idx}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {req.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {req.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {req.phone}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(req.timestamp).toLocaleDateString(
                              'de-DE'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Offers Tab */}
          {activeTab === 'offers' && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {offerRequests.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  Noch keine Angebotsanfragen
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Produkt
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Menge
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          E-Mail
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Lieferdatum
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                          Anfragedatum
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {offerRequests.map((req, idx) => (
                        <tr
                          key={idx}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {req.product}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {req.quantity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {req.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(req.deliveryDate).toLocaleDateString(
                              'de-DE'
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(req.timestamp).toLocaleDateString(
                              'de-DE'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
