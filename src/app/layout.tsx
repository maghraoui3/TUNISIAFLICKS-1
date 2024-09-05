import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from './providers'

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TunisiaFlicks",
  description: "Welcome to TunisiaFlicks, your premier destination for streaming movies and TV shows. Dive into a vast collection of content, meticulously curated for a superior viewing experience. Enjoy detailed descriptions, ratings, and an ad-free environment—all completely free. Designed with user-friendliness in mind, TunisiaFlicks brings you seamless navigation and a sleek interface. Proudly crafted in Tunisia, our platform is committed to offering you the best in entertainment. Explore TunisiaFlicks today and discover your next cinematic adventure!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
        <Navbar />
        <div className="bg-white text-black flex min-h-screen dark:bg-[#0d0c0f] dark:text-white">
          <Sidebar />
          <div className="flex justify-center p-4 sm:pt-20 pt-14 w-full">
            {children}
          </div>
        </div>
        </Providers>
      </body>
    </html>
  );
}
