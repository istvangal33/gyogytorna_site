import type { Metadata } from "next";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

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
    <html lang="hu">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://restartphysio.hu/#organization",
                  "name": "ReStart Physio",
                  "url": "https://restartphysio.hu",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://restartphysio.hu/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "image": "https://restartphysio.hu/group_core1.jpg",
                  "description": "Szakszerű gyógytorna és fizioterápia Győrben",
                  "telephone": "+36308198449",
                  "email": "restart.gyor@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Máté Mária u. 4/B",
                    "addressLocality": "Győr",
                    "postalCode": "9028",
                    "addressCountry": "HU"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 47.6782,
                    "longitude": 17.6354
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "08:00",
                      "closes": "18:00"
                    }
                  ],
                  "priceRange": "$$",
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
