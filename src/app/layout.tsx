import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';
import { CookieConsentBanner } from '@/components/common/CookieConsentBanner';

export const metadata: Metadata = {
  title: 'SnapBot - Visual Block-Coding IDE & Library for Discord Bots',
  description:
    'Build powerful Discord bots visually with zero-drag latency, Scratch/Entry-style snapping blocks, and real-time discord.js v14 compilation.',
  keywords: [
    'SnapBot',
    'Discord Bot',
    'Block Coding',
    'Visual IDE',
    'discord.js',
    'TypeScript',
    'Scratch',
    'Entry',
  ],
  authors: [{ name: 'Workshop-Koharu', url: 'https://koharu.live' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  metadataBase: new URL('https://snapbot.koharu.live'),
  openGraph: {
    title: 'SnapBot - Visual Block-Coding Discord Bot Platform',
    description:
      'Assemble blocks to build full-featured Discord bots instantly! Pure TypeScript magnetic snapping engine & live simulator.',
    url: 'https://snapbot.koharu.live',
    siteName: 'SnapBot',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapBot',
    description: 'Visual block-coding Discord bot builder with real-time compilation',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <I18nProvider>
          {children}
          <CookieConsentBanner />
        </I18nProvider>
      </body>
    </html>
  );
}

