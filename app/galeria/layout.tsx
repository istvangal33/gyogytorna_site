import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galéria | ReStart Physio - Rendelő & Kezelések Fotói Győr',
  description: 'ReStart Physio galéria: modern rendelő, BEMER terápia, sportrehabilitáció, gerincstabilizáció, manuális kezelések és csoportos edzések képekben. Győr, Máté Mária u.',
  keywords: 'gyógytorna rendelő Győr képek, fizioterapeuta galéria, BEMER terápia fotók, sportrehabilitáció Győr, gerincstabilizáció képek, core tréning galéria',
  
  openGraph: {
    title: 'Galéria | ReStart Physio Győr',
    description: 'Modern rendelőnk és professzionális kezeléseink képekben.',
    images: ['/rendelo1.jpeg'],
    type: 'website',
    url: 'https://restartphysio.hu/galeria',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Galéria | ReStart Physio',
    description: 'Modern rendelőnk és professzionális kezeléseink képekben.',
    images: ['/rendelo2.jpeg'],
  },

  alternates: {
    canonical: 'https://restartphysio.hu/galeria',
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

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
