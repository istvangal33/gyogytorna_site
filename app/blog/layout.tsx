import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | ReStart Physio Blog',
    default: 'Blog – Gyógytorna és Fizioterápia Tippek | ReStart Physio Győr',
  },
  description: 'Szakmai cikkek gyógytornáról, fizioterápiáról, sportrehabilitációról és egészséges mozgásról. Tippek derékfájás, nyakfájás, scoliosis kezeléshez Forrás Fernanda fizioterapeutától.',
  keywords: 'gyógytorna blog, fizioterápia cikkek, sportrehabilitáció tippek, BEMER terápia, gerinckezelés tanácsok, mozgásszervi panaszok',

  openGraph: {
    title: 'Blog | ReStart Physio Győr',
    description: 'Szakmai cikkek gyógytornáról és fizioterápiáról.',
    images: [
      {
        url: 'https://restartphysio.hu/group_core1.jpg',
        width: 1200,
        height: 630,
        alt: 'ReStart Physio Blog - Gyógytorna és fizioterápia cikkek',
      }
    ],
    type: 'website',
    url: 'https://restartphysio.hu/blog',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
  },

  alternates: {
    canonical: 'https://restartphysio.hu/blog',
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}