import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { Inter } from 'next/font/google';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://restartphysio.hu'),
  
  title: {
    template: '%s | ReStart Physio - Gyógytorna Győr',
    default: 'ReStart Physio - Gyógytorna és Fizioterápia Győrben | Forrás Fernanda'
  },
  description: "Szakszerű gyógytorna, fizioterápia és sportrehabilitáció Győrben. Közel 10 év tapasztalat gerincpanaszok, sportsérülések és mozgásszervi problémák kezelésében.",
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
        url: "https://restartphysio.hu/group_core1.jpg",
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
    images: ["https://restartphysio.hu/group_core1.jpg"],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/site.webmanifest', 
  
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={inter.className} data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/group_core1.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["MedicalClinic", "HealthAndBeautyBusiness", "LocalBusiness"],
                  "@id": "https://restartphysio.hu/#organization",
                  "name": "ReStart Physio - Gyógytorna és Fizioterápia",
                  "url": "https://restartphysio.hu",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://restartphysio.hu/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "image": "https://restartphysio.hu/group_core1.jpg",
                  "description": "Szakszerű gyógytorna, fizioterápia és sportrehabilitáció Győrben.",
                  "telephone": "+36308198449",
                  "email": "restart.gyor@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Máté Mária u. 4b",
                    "addressLocality": "Győr",
                    "postalCode": "9028",
                    "addressCountry": "HU"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 47.6596433,
                    "longitude": 17.6599994
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "reviewCount": "41"
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "08:00",
                      "closes": "18:00"
                    }
                  ],
                  "medicalSpecialty": ["Physiotherapy"],
                  "priceRange": "7000–17000 HUF",
                  "currenciesAccepted": "HUF",
                  "paymentAccepted": ["Cash", "Credit Card", "NFC mobile payments"],
                  "hasMap": "https://maps.app.goo.gl/MAsW9JaN2v5PcCR59",
                  "areaServed": [
                    { "@type": "City", "name": "Győr" },
                    { "@type": "AdministrativeArea", "name": "Győr-Moson-Sopron megye" }
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+36308198449",
                    "contactType": "customer service",
                    "email": "restart.gyor@gmail.com",
                    "availableLanguage": "Hungarian"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Szolgáltatások",
                    "itemListElement": [
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gyógytorna" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fizioterápia" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sportrehabilitáció" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gerinckezelés és gerinc core edzés" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Állkapocs ízületi (TMJ) terápia" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fascia kezelések (FDM)" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Schroth terápia" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BEMER terápia" } }
                    ]
                  },
                  "sameAs": [
                    "https://www.facebook.com/Restartphysiogyor",
                    "https://www.instagram.com/restartphysiogyor"
                  ]
                },
                {
                  "@type": "Person",
                  "@id": "https://restartphysio.hu/#person",
                  "name": "Forrás Fernanda",
                  "jobTitle": "Fizioterapeuta",
                  "worksFor": {
                    "@id": "https://restartphysio.hu/#organization"
                  },
                  "url": "https://restartphysio.hu/bemutatkozas"
                }
              ]
            })
          }}
        />
      </head>
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