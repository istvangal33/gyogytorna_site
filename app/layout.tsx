import type { Metadata } from "next";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | ReStart Physio - Gyógytorna Győr',
    default: 'ReStart Physio - Gyógytorna és Fizioterápia Győrben | Forrás Fernanda'
  },
  description: "Szakszerű gyógytorna, fizioterápia és sportrehabilitáció Győrben. Közel 10 év tapasztalat gerincpanaszok, sportsérülések és mozgásszervi problémák kezelésében.",
  // keywords törölve - elavult!
  authors: [{ name: "Forrás Fernanda" }],
  
  openGraph: {
    title: "ReStart Physio - Ahol a mozgás újraindul",
    description: "Szakszerű gyógytorna és fizioterápia Győrben. Foglalj időpontot még ma!",
    type: "website",
    locale: "hu_HU",
    url: "https://restartphysio.hu",
    siteName: "ReStart Physio",
    images: [
      {
        url: "/group_core1.jpg", // ezt létre kell hozni!
        width: 1200,
        height: 630,
        alt: "ReStart Physio - Gyógytorna Győr",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "ReStart Physio - Gyógytorna Győrben", 
    description: "Szakszerű gyógytorna és fizioterápia szolgáltatások",
    images: ["/group_core1"],
  },
  
  alternates: {
    canonical: "https://restartphysio.hu",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large", 
      "max-snippet": -1,
    },
  },
  
  verification: {
    google: "your-google-verification-code", // Google Search Console-ból
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
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
        
        <Layout>
          {children}
        </Layout>
        
        <CookieBanner />
      </body>
    </html>
  );
}
