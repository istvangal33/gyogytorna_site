import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Árak & Szolgáltatások | ReStart Physio - Fizioterápia Győrben',
  description: 'Teljes árlista: egyéni gyógytorna 15.000 Ft-tól, csoportos core edzés 7.000 Ft-tól, TMI terápia, FDM kezelések. Átlátható árak, nincsenek rejtett költségek.',
  keywords: 'fizioterápia árak Győr, gyógytorna ár, TMI terápia ár, FDM kezelés árak, csoportos edzés bérlet, gyógytorna Győr árak, sportrehabilitáció költség',
  
  openGraph: {
    title: 'Áraink | ReStart Physio Győr',
    description: 'Professzionális fizioterápiás kezelések átlátható árakkal',
    images: ['/group_core1.jpg'], 
    type: 'website',
    url: 'https://restartphysio.hu/arak',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Áraink | ReStart Physio',
    description: 'Professzionális fizioterápiás kezelések átlátható árakkal',
    images: ['/group_core1.jpg'],
  },

  alternates: {
    canonical: 'https://restartphysio.hu/arak',
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

export default function PriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
