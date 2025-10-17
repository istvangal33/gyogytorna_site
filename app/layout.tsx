import type { Metadata } from "next";
import Layout from "@/components/Layout";  // @ használata a gyökérre
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyógytorna - Professzionális Fizioterápia",
  description: "Szakképzett gyógytornász szolgáltatások. Gerincfájdalom, ízületi problémák, sportkárosodások kezelése modern módszerekkel.",
  keywords: ["gyógytorna", "fizioterápia", "gerincfájdalom", "ízületi fájdalom", "rehabilitáció", "masszázs"],
  authors: [{ name: "Gyógytorna Szakrendelő" }],
  openGraph: {
    title: "Gyógytorna - Professzionális Fizioterápia",
    description: "Szakképzett gyógytornász szolgáltatások. Gerincfájdalom, ízületi problémák, sportkárosodások kezelése modern módszerekkel.",
    type: "website",
    locale: "hu_HU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased bg-white text-gray-900 font-sans">
        {/* Google Analytics - GDPR kompatibilis */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
        
        <Layout>
          {children}
        </Layout>
        
        {/* Cookie Banner - az oldal alján */}
        <CookieBanner />
      </body>
    </html>
  );
}
