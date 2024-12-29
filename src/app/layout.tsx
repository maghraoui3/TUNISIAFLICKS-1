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
  title: "TunisiaFlicks",
  description: "Welcome to TunisiaFlicks, your premier destination for streaming movies and TV shows.",
  openGraph: {
    title: "TunisiaFlicks",
    description: "Stream movies and TV shows for free.",
    type: 'website',
    url: 'https://www.tunisiaflicks.com',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
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
