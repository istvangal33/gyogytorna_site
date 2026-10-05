import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        // A robot CSAK a ra nevesitett csoportot olvassa, a * csoportot nem.
        // Ezert itt meg kell ismetelni ugyanazokat a tiltasokat.
        disallow: ['/admin/', '/api/', '/private/'],
      }
    ],
    sitemap: 'https://restartphysio.hu/sitemap.xml',
  };
}