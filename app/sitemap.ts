import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { utolsoModositas } from '@/lib/utolso-modositas';

const baseUrl = 'https://restartphysio.hu';

export default function sitemap(): MetadataRoute.Sitemap {
  // Szolgáltatások beolvasása dinamikusan
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const servicesDirectory = path.join(process.cwd(), 'app', 'szolgaltatasok');
    const items = fs.readdirSync(servicesDirectory, { withFileTypes: true });

    // Csak a mappákat listázzuk ki (amelyek a Next.js App Router útvonalakat jelentik)
    const folders = items.filter(item => item.isDirectory());

    servicePages = folders.map((folder) => ({
      url: `${baseUrl}/szolgaltatasok/${folder.name}`,
      lastModified: utolsoModositas(`app/szolgaltatasok/${folder.name}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Sitemap hiba: Nem sikerült beolvasni a szolgáltatások mappát', error);
  }

  // Oldalanként azokat a fájlokat soroljuk fel, amelyekből a TARTALMA
  // felépül. A fejléc, a lábléc és a süti-sáv szándékosan kimarad: azok
  // minden oldalon ugyanazok, és egyetlen láblécmódosítás mind a 14 oldal
  // dátumát frissítené — pont azt a megbízhatatlanságot hozva vissza,
  // amit meg akarunk szüntetni.
  return [
    {
      url: baseUrl,
      lastModified: utolsoModositas('app/page.tsx', 'components/WhyChooseUs.tsx', 'components/szolgaltatas'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bemutatkozas`,
      lastModified: utolsoModositas('app/bemutatkozas'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/szolgaltatasok`,
      lastModified: utolsoModositas(
        'app/szolgaltatasok/page.tsx',
        'app/szolgaltatasok/layout.tsx',
        'components/ScrollTiles.tsx',
      ),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arak`,
      lastModified: utolsoModositas(
        'app/arak',
        'components/FaqAccordion.tsx',
        'components/FaqSchema.tsx',
      ),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/elerhetoseg`,
      lastModified: utolsoModositas('app/elerhetoseg', 'components/ContactSection.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: utolsoModositas('app/galeria'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Szolgáltatás aloldalak dinamikusan
    ...servicePages,
  ];
}
