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
        disallow: '/admin/',
      }
    ],
    sitemap: 'https://restartphysio.hu/sitemap.xml',
  };
}
