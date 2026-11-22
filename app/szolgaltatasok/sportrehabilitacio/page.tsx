import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RelatedServices from '@/components/RelatedServices';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArBlokk from '@/components/szolgaltatas/ArBlokk';
import GyikBlokk from '@/components/szolgaltatas/GyikBlokk';
import OrvoshozBlokk from '@/components/szolgaltatas/OrvoshozBlokk';
import TartalomRacs, { Roviden } from '@/components/szolgaltatas/TartalomRacs';
import SzakemberBlokk, { ervenyesDatum } from '@/components/szolgaltatas/SzakemberBlokk';
import { PRAXIS } from '@/lib/praxis';
import { ar, forint } from '@/lib/arlista';
import { utolsoModositas } from '@/lib/utolso-modositas';

const OLDAL_URL = 'https://restartphysio.hu/szolgaltatasok/sportrehabilitacio';
const KEP = '/sportrehab5.jpg';
const KEP_ALT = 'Térdstabilizáló gyakorlat gumiszalaggal, gyógytornász vezetésével a győri ReStart Physio rendelőben';

// Az a nap (ÉÉÉÉ-HH-NN), amikor Fernanda jóváhagyta az oldal szövegét.
const ELLENORIZVE = '[[FERNANDA: a jóváhagyás napja ÉÉÉÉ-HH-NN alakban, pl. 2026-10-20]]';

const CIM = 'Sportrehabilitáció Győrben | Sportsérülés, keresztszalag-műtét';
const LEIRAS =
  'Sportrehabilitáció Győrben hobbi- és élsportolóknak: sportsérülés és keresztszalag-műtét után, a biztonságos visszatérésig a sporthoz.';

export const metadata: Metadata = {
  title: { absolute: CIM },
  description: LEIRAS,
  keywords: 'sportrehabilitáció győr, sportsérülés kezelés, keresztszalag szakadás gyógytorna, acl rehabilitáció, térdműtét rehabilitáció',
  alternates: { canonical: OLDAL_URL },
  openGraph: {
    title: CIM,
    description: LEIRAS,
    url: OLDAL_URL,
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
    type: 'website',
    images: [{ url: `https://restartphysio.hu${KEP}`, width: 2400, height: 2862, alt: KEP_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: CIM,
    description: LEIRAS,
    images: [`https://restartphysio.hu${KEP}`],
  },
};

const GYIK = [
  {
    kerdes: 'Műtét után mikor kezdhetem a rehabilitációt?',
    valasz:
      'Az operáló orvos engedélyével minél előbb. A műtét utáni első hetek sokat számítanak, például hogy visszanyerjük-e a térd teljes nyújtását. Hozza el a zárójelentést és a műtét utáni protokollt.',
  },
  {
    kerdes: 'Mikor térhetek vissza a sporthoz?',
    valasz:
      'Nem a naptár dönt, hanem az, hogy teljesíti-e a feltételeket: teljes mozgás, duzzanat nélküli ízület, közel azonos erő a két oldalon, és a sportágára jellemző mozgások biztonságos végrehajtása. Keresztszalag-pótlás után a kutatások alapján legalább 9 hónappal érdemes számolni. Az engedélyt az operáló orvos adja meg.',
  },
  {
    kerdes: 'Hobbisportolóként is jöhetek?',
    valasz:
      'Igen. A sportrehabilitáció ugyanúgy szól annak, aki hetente kétszer fut vagy focizik, mint a versenyzőknek: a cél mindkét esetben a biztonságos visszatérés a saját sportjához.',
  },
  {
    kerdes: 'Kell beutaló?',
    valasz:
      'Nem. A ReStart Physio magánrendelés, beutaló nélkül is foglalhat időpontot. Friss sérülésnél, ha a végtag nem terhelhető vagy erősen bedagad, előbb orvosi vizsgálat kell.',
  },
  {
    kerdes: 'Egyeztet az edzőmmel?',
    valasz:
      'Ha kéri és hozzájárul, igen: ehhez az egészségügyi adatai miatt az Ön kifejezett hozzájárulása kell. Élsportolók mellett megszoktam, hogy az edzővel közösen tervezzük a terhelést, és ez hobbisportolóknál is sokat segít.',
  },
];

function OldalSchema({ frissitve }: { frissitve?: Date }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${OLDAL_URL}#webpage`,
        url: OLDAL_URL,
        name: CIM,
        description: LEIRAS,
        inLanguage: 'hu-HU',
        about: { '@id': `${OLDAL_URL}#service` },
        reviewedBy: { '@id': 'https://restartphysio.hu/#person' },
        ...(ervenyesDatum(ELLENORIZVE) && { lastReviewed: ELLENORIZVE }),
        ...(frissitve && { dateModified: frissitve.toISOString() }),
      },
      {
        '@type': 'Service',
        '@id': `${OLDAL_URL}#service`,
        serviceType: 'Physiotherapy',
        name: 'Sportrehabilitáció',
        description: LEIRAS,
        url: OLDAL_URL,
        provider: { '@id': 'https://restartphysio.hu/#organization' },
        areaServed: { '@type': 'City', name: 'Győr' },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}

const linkStilus = 'text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors';

export default function RehabTherapyPage() {
  const frissitve = utolsoModositas('app/szolgaltatasok/sportrehabilitacio');

  return (
    <>
      <OldalSchema frissitve={frissitve} />
      <BreadcrumbSchema
        items={[
          { name: 'Főoldal', url: 'https://restartphysio.hu' },
          { name: 'Szolgáltatások', url: 'https://restartphysio.hu/szolgaltatasok' },
          { name: 'Sportrehabilitáció', url: OLDAL_URL },
        ]}
      />

      <section className="relative bg-white py-20 md:py-28 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-linear-to-b from-[#004A6D]/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EC7007]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-8 text-sm font-semibold text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#EC7007] transition-colors">Főoldal</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/szolgaltatasok" className="hover:text-[#EC7007] transition-colors">Szolgáltatások</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#004A6D]">Sportrehabilitáció</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Sérülés utáni felépülés
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                <span className="text-[#EC7007]">Sportrehabilitáció</span> Győrben:{' '}
                <br className="hidden sm:block" />
                visszatérés a sporthoz
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Hat évig dolgoztam élsportolók mellett, a Győri ETO FC-nél és a Mosonmagyaróvári KC-nél.
                Ugyanezzel a módszerrel segítem a hobbisportolókat is: sportsérülés vagy
                keresztszalag-műtét után lépésről lépésre építjük fel a terhelést, a visszatérésig.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/elerhetoseg#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#004A6D] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(0,74,109,0.3)] hover:shadow-xl hover:-translate-y-1"
                >
                  Időpontfoglalás
                </Link>
                <a
                  href="#arak"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#004A6D] border-2 border-[#004A6D]/20 px-8 py-4 rounded-xl font-bold hover:border-[#004A6D] hover:bg-gray-50 transition-all duration-300"
                >
                  Árak
                </a>
              </div>
            </div>

            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white bg-[#f4f7f9]">
              <Image
                src={KEP}
                alt={KEP_ALT}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <TartalomRacs
        oldalsav={
          <Roviden
            sorok={[
              ['Kinek?', 'hobbi- és élsportolóknak, sérülés vagy műtét után'],
              ['Első alkalom', '50 perc, állapotfelméréssel'],
              ['Ár', `${forint(ar('Egyéni gyógytorna/rehabilitáció', '50 P').price)} / 50 perc (az egyéni gyógytorna díja)`],
              ['Tapasztalat', '6 év élsport: Győri ETO FC, Mosonmagyaróvári KC'],
              ['Beutaló', 'nem szükséges'],
              ['Helyszín', PRAXIS.helyszin],
            ]}
          />
        }
      >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Kinek szól a sportrehabilitáció?</h2>
            <p>
              A sportrehabilitáció célja, hogy a sérülést követően a sportoló – legyen hobbi vagy
              élsportoló – biztonságosan és teljes értékűen térhessen vissza az edzéshez vagy a
              versenyzéshez. Leggyakrabban ezekkel keresnek fel:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>izomhúzódás, izomszakadás,</li>
              <li>bokarándulás, szalagsérülés,</li>
              <li>keresztszalag- és meniszkuszsérülés, illetve -műtét,</li>
              <li>túlterheléses panaszok (pl. ín- és ínhüvelygyulladás, futótérd),</li>
              <li>visszatérő sérülések, amelyek mögött mozgásbeli hiba állhat.</li>
            </ul>
            <p>
              Ha nem a sportba, hanem a hétköznapi mozgáshoz térne vissza, például térd- vagy
              csípőprotézis után, az{' '}
              <Link href="/szolgaltatasok/egyeni-gyogytorna" className={linkStilus}>
                egyéni gyógytorna és műtét utáni rehabilitáció
              </Link>{' '}
              a jobb választás.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Visszatérés a sporthoz: a feltételek</h2>
            <p>
              A leggyakoribb hiba, hogy a sportoló akkor tér vissza, amikor már nem fáj. A fájdalom
              hiánya viszont még nem jelenti azt, hogy az ízület és az izmok elbírják a sport
              terhelését. Ezért a visszatérésről nem a naptár alapján döntünk, hanem feltételek
              alapján:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>teljes, fájdalommentes mozgásterjedelem és duzzanat nélküli ízület,</li>
              <li>közel azonos (legalább 90%-os) izomerő a sérült és az ép oldalon,</li>
              <li>biztonságos ugrás, érkezés és irányváltás,</li>
              <li>a sportágra jellemző mozgások terhelés alatt is,</li>
              <li>magabiztosság, félelem nélküli mozgás.</li>
            </ul>
            <p>
              A visszatérés két lépcsős: előbb az edzésre, csak utána a mérkőzésre vagy versenyre. A
              végső engedélyt műtét után az operáló orvos adja meg; én abban segítek, hogy erre a
              pontra a lehető legjobb állapotban érkezzen.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Keresztszalag-műtét (ACL) után</h2>
            <p>A rehabilitáció szakaszokban halad, és mindegyiknek megvan a maga célja:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Korai szakasz:</strong> a duzzanat csökkentése, a térd teljes nyújtásának
                visszanyerése és a combizom „visszakapcsolása”.
              </li>
              <li>
                <strong>Erősítés:</strong> fokozatosan nehezedő erősítés, egyensúly- és
                stabilitásgyakorlatok.
              </li>
              <li>
                <strong>Futás és ugrás:</strong> amikor az erő és a mozgásminták már engedik.
              </li>
              <li>
                <strong>Sportspecifikus szakasz:</strong> irányváltások, a sportág mozgásai, majd az
                edzésre való visszatérés.
              </li>
            </ol>
            <p>
              Egy ismert kutatásban a keresztszalag-pótlás után 9 hónapnál korábban visszatérők
              körében gyakoribb volt az újrasérülés (Grindem és mtsai, British Journal of Sports Medicine, 2016). Ezért nem sietünk: a cél az, hogy hosszú távon is
              sportolhasson. Az ACL utáni rehabilitációból 2024-ben a katari Aspetar Ortopédiai és
              Sportorvosi Kórház ACL-rehabilitációs konferenciáján és workshopján vettem részt, és erről a témáról tudományos előadást is
              tartottam.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Tapasztalat az élsportban</h2>
            <p>
              Két évig a Mosonmagyaróvári Kézilabda Club, majd négy évig a Győri ETO FC
              labdarúgócsapatának gyógytornásza voltam. Dolgoztam evezősökkel, kosárlabdázókkal,
              atlétákkal és úszókkal, 2023-ban pedig a Magyarországon rendezett Atlétikai
              Világbajnokság fizioterapeuta csapatának tagja voltam.
            </p>
            <p>
              Az élsportban megszoktam, hogy az edzővel és az orvossal együtt tervezzük a terhelést.
              Ha kéri és hozzájárul, az edzőjével is egyeztetek.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Sérülésmegelőzés</h2>
            <p>
              A visszatérés után a cél, hogy a sérülés ne ismétlődjön meg. Ehhez felmérem az
              alapvető mozgásmintákat (például guggolás, kitörés, egylábas egyensúly), és célzott
              gyakorlatokkal javítjuk azokat a gyenge pontokat, amelyek a sérüléshez
              hozzájárulhattak. A gyakorlatokat úgy állítjuk össze, hogy a saját edzésébe is beépíthesse.
            </p>
          </div>

          <ArBlokk
            id="arak"
            cim="Árak"
            tetelek={[
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '50 P' },
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '30 P' },
              { nev: 'Egyéni gyógytorna bérlet', idotartam: '5 ALK' },
              { nev: 'Egyéni gyógytorna bérlet', idotartam: '10 ALK' },
            ]}
            megjegyzes="A sportrehabilitáció az egyéni gyógytorna díjaival számol. Az első alkalom 50 perces, állapotfelméréssel."
          />

          <OrvoshozBlokk
            extra={[
              'Sérülés után: ha az ízület hirtelen erősen bedagad, nem terhelhető, vagy „kiszalad” alóla a láb. Ilyenkor előbb orvosi vizsgálat kell a törés vagy a szalagszakadás kizárására.',
              'Fejsérülés után fejfájás, hányás, zavartság, aluszékonyság vagy emlékezetkiesés. Ezzel még aznap forduljon orvoshoz.',
            ]}
          />

          <SzakemberBlokk
            ellenorizve={ELLENORIZVE}
            frissitve={frissitve}
            kepesitesek={[
              'The Complete Guide to the Athletic ACL – Aspetar, Doha (2024)',
              'Előadás: LCA-szakadás után, BTB-plasztikából visszatérő labdarúgó (Fiatal Sporttudósok Kongresszusa, 2021)',
              'Functional Movement Screen (Gray Cook-módszer)',
              'Kinematic Taping',
            ]}
          />

          <GyikBlokk kerdesek={GYIK} />

          <p>
            Telefonon is foglalhat időpontot:{' '}
            <a href={PRAXIS.telefonHivas} className={linkStilus}>
              {PRAXIS.telefon}
            </a>
            .
          </p>
      </TartalomRacs>

      <RelatedServices currentSlug="sportrehabilitacio" />

      <section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Indítsa újra a mozgást!</h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Az első alkalommal felmérem az állapotát, és megbeszéljük, milyen lépésekben térhet vissza
            a sportjához.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/elerhetoseg#contact"
              className="inline-flex items-center gap-2 bg-[#EC7007] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(236,112,7,0.4)] hover:shadow-xl hover:-translate-y-1"
            >
              Időpontot kérek
            </Link>
            <a
              href={PRAXIS.telefonHivas}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:border-white transition-colors duration-300"
            >
              {PRAXIS.telefon}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
