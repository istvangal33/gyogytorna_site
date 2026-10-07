import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://restartphysio.hu';

/**
 * Egy oldal utolsó módosítása: az oldalt felépítő fájlok legutóbbi
 * commitjának dátuma.
 *
 * MIÉRT GITBŐL: korábban egyetlen, kézzel beírt dátum szerepelt mind a 14
 * oldalnál, és öt és fél hónapig nem frissült senki. A Google ebből dönti
 * el, melyik oldalt érdemes hamarabb újra megnéznie; ha minden dátum
 * egyforma és láthatóan régi, megtanulja, hogy ennek a sitemapnek a
 * dátumaiban nem lehet bízni, és figyelmen kívül hagyja őket.
 *
 * A fordítás a Netlifyn fut, GitHubról. A Netlify „blobless" klónt készít
 * (--filter=blob:none): minden commit és könyvtárfa benne van, csak a
 * fájltartalmak töltődnek le igény szerint. A git log útvonalszűrése épp a
 * fákat hasonlítja, nem a tartalmat, ezért ott is helyes dátumot ad.
 *
 * Ha a git mégsem érhető el, a dátum KIMARAD. A hiányzó lastmod jobb, mint
 * a téves: a téves dátumok miatt a Google az egész sitemap dátumait
 * elvetheti.
 */
function utolsoModositas(...fajlok: string[]): Date | undefined {
  try {
    const datum = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...fajlok], {
      encoding: 'utf8',
    }).trim();

    // Üres válasz = a git fut, de egyik útvonalra sem talált commitot.
    // Ez jellemzően elgépelt útvonal, és némán tüntetné el a dátumot —
    // ezért a fordítás naplójában jelezzük.
    if (!datum) {
      console.warn(`Sitemap: nincs commit ezekre az útvonalakra: ${fajlok.join(', ')}`);
      return undefined;
    }
    return new Date(datum);
  } catch {
    return undefined;
  }
}

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
      lastModified: utolsoModositas('app/page.tsx', 'components/WhyChooseUs.tsx'),
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
