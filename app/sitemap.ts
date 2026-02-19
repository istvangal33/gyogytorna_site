import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://restartphysio.hu';
  
  // Oldal indulási dátuma vagy utolsó tartalmi frissítés
  const siteLastUpdated = new Date('2025-11-20');
  
  return [
    {
      url: baseUrl,
      lastModified: siteLastUpdated,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bemutatkozas`,
      lastModified: siteLastUpdated,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/szolgaltatasok`,
      lastModified: siteLastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arak`,
      lastModified: siteLastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/elerhetoseg`,
      lastModified: siteLastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: siteLastUpdated,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
