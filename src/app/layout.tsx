import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { myCustomFont } from './ui/fonts';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import Analytics from "./analytics";


export const metadata = {
  title: "Manavi Writes",
  description: "Personal blog of Manavi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${myCustomFont.className} min-h-screen flex flex-col`}>
      <body className="flex flex-col min-h-screen flex-grow">
        
        {/* ✅ Google Analytics Script (in body with afterInteractive strategy) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1WCE70TMP0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1WCE70TMP0');
          `}
        </Script>

        <Navbar />

        <main className="flex-grow">
          <Analytics />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}