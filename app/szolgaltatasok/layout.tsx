import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gyógytorna Szolgáltatások Győrben | BEMER, Manuálterápia, Schroth',
  description: 'Fájdalommentes mozgás egyénre szabott terápiákkal. BEMER terápia, FDM manuálterápia, Schroth és sportrehabilitáció Győrben Forrás Fernandával. Nézze meg szolgáltatásainkat!',
  keywords: 'gyógytorna győr, fizioterápia győr, sportrehabilitáció győr, bemer terápia győr, gerincstabilizáció, TMI terápia, FDM kezelés, manuálterápia győr, Schroth terápia, si terápia győr, fizikoterápia győr, core edzés győr, dinamikus tape, derékfájás kezelés győr, nyakfájás kezelés győr, scoliosis kezelés győr, műtét utáni rehabilitáció győr, térdprotézis utáni gyógytorna, csípőprotézis utáni rehabilitáció',

  openGraph: {
    title: 'Szolgáltatások | ReStart Physio Győr',
    description: 'Professzionális gyógytorna és fizioterápia szolgáltatások egyénre szabottan Győrben.',
    images: [
      {
        url: 'https://restartphysio.hu/group_core1.jpg',
        width: 1200,
        height: 630,
        alt: 'ReStart Physio szolgáltatások - gyógytorna Győrben',
      }
    ],
    type: 'website',
    url: 'https://restartphysio.hu/szolgaltatasok',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Szolgáltatások | ReStart Physio Győr',
    description: 'Professzionális gyógytorna és fizioterápia szolgáltatások egyénre szabottan Győrben.',
    images: ['https://restartphysio.hu/group_core1.jpg'],
  },

  alternates: {
    canonical: 'https://restartphysio.hu/szolgaltatasok',
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
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}