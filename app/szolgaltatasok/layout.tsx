import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szolgáltatások - Gyógytorna és Fizioterápia | ReStart Physio Győr',
  description: 'Komplex fizioterápiás szolgáltatások: sportrehabilitáció, gerincstabilizáció, TMI-terápia, FDM-kezelés, BEMER-terápia, core tréning és Schroth terápia Győrben.',
  keywords: 'gyógytorna szolgáltatások Győr, sportrehabilitáció, gerincstabilizáció, TMI terápia, FDM kezelés, BEMER terápia, Schroth terápia, dinamikus tape, core edzés',
  
  openGraph: {
    title: 'Szolgáltatások | ReStart Physio Győr',
    description: 'Professzionális fizioterápiás szolgáltatások egyénre szabottan Győrben.',
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
    description: 'Professzionális fizioterápiás szolgáltatások egyénre szabottan Győrben.',
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
