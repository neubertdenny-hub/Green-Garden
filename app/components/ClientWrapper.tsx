'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatBot = dynamic(() => import('./ChatBot'), {
  ssr: false,
  loading: () => null
});

const CookieBanner = dynamic(() => import('./CookieBanner'), {
  ssr: false,
  loading: () => null
});

export function ClientComponents() {
  return (
    <Suspense fallback={null}>
      <ChatBot />
      <CookieBanner />
    </Suspense>
  );
}
