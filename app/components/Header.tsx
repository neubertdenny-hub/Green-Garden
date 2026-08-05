'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    setIsAdmin(!!adminSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-green-700 transition">
            Startseite
          </Link>
          <Link href="/#products" className="text-gray-600 hover:text-green-700 transition">
            Produkte
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-green-700 transition">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-700 transition">
            Kontakt
          </Link>
          <Link href="/offer" className="text-gray-600 hover:text-green-700 transition">
            Angebot
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAdmin ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-green-700 hover:bg-green-50 rounded-lg transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
