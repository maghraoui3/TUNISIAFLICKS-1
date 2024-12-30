import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TunisiaFlicks',
  description: 'Stream the latest movies and TV shows for free with no ads, powered by cutting-edge technology for the best viewing experience.',
  keywords: ['Free Movies', 'Free Streaming', 'No Ads', 'Latest Movies', 'TV Shows', 'Streaming Service', 'TunisiaFlicks'],
  authors: [{ name: 'TunisiaFlicks Team' }],
  creator: 'TunisiaFlicks Team',
  publisher: 'TunisiaFlicks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tunisiaflicks.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-TN': '/ar-TN',
    },
  },
  openGraph: {
    title: 'TunisiaFlicks',
    description: 'Stream the latest movies and TV shows for free, without ads, on TunisiaFlicks.',
    url: 'https://tunisiaflicks.vercel.app',
    siteName: 'TunisiaFlicks',
    images: [
      {
        url: 'https://tunisiaflicks.vercel.app/og-image.png',
        width: 1080,
        height: 1080,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TunisiaFlicks',
    description: 'Watch the latest movies and TV shows for free with no ads on TunisiaFlicks.',
    creator: '@TunisiaFlicks',
    images: ['https://tunisiaflicks.vercel.app/og-image.png'],
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
    other: {
      me: ['malek.magraoui3@gmail.com', 'https://malek-maghraoui.netlify.app'],
      'telegram-channel': '@TunisiaFlicks',
    },
  },
  category: 'Entertainment',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Telegram-specific meta tags */}
        <meta property="telegram:channel" content="@TunisiaFlicks" />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <div className="bg-white text-black flex min-h-screen dark:bg-[#0d0c0f] dark:text-white">
            <Sidebar />
            <main role="main" className="flex justify-center sm:pt-20 pt-14 w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
