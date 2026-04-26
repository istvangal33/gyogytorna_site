import type { MetadataRoute } from 'next';
import { getAllPosts } from './lib/blog/blog';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://restartphysio.hu';
  
  const siteLastUpdated = new Date('2026-04-20');
  
  // Blog bejegyzések dinamikusan
  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Szolgáltatások beolvasása dinamikusan
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const servicesDirectory = path.join(process.cwd(), 'app', 'szolgaltatasok');
    const items = fs.readdirSync(servicesDirectory, { withFileTypes: true });
    
    // Csak a mappákat listázzuk ki (amelyek a Next.js App Router útvonalakat jelentik)
    const folders = items.filter(item => item.isDirectory());
    
    servicePages = folders.map((folder) => ({
      url: `${baseUrl}/szolgaltatasok/${folder.name}`,
      lastModified: siteLastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Sitemap hiba: Nem sikerült beolvasni a szolgáltatások mappát', error);
  }

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
    // Blog lista oldal
    {
      url: `${baseUrl}/blog`,
      lastModified: siteLastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog cikkek dinamikusan
    ...blogPosts,
    // Szolgáltatás aloldalak dinamikusan
    ...servicePages,
  ];
}