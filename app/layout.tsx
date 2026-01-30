import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { CookieConsent } from '@/components/CookieConsent';
import { UserProvider } from '@/contexts/UserContext';
import { OnboardingModal } from '@/components/OnboardingModal';

import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Tools for College Projects | Free Student Helpers',
  description:
    'Free AI-powered tools for college students. Generate project ideas, abstracts, and PPT outlines instantly with our AI tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5392572008112828"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <UserProvider>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>

          <Header />

          <main className="flex-grow">{children}</main>

          <Footer />
          <CookieConsent />
          <OnboardingModal />
        </UserProvider>
      </body>
    </html>
  );
}
