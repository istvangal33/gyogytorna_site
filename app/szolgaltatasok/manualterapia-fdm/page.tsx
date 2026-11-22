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
import { ar, forint, idotartamSzovegesen } from '@/lib/arlista';
import { utolsoModositas } from '@/lib/utolso-modositas';

const OLDAL_URL = 'https://restartphysio.hu/szolgaltatasok/manualterapia-fdm';
const KEP = '/manual2.jpg';
const KEP_ALT = 'FDM manuálterápia: kézzel végzett lágyrész-kezelés a győri ReStart Physio rendelőben';

// Az a nap (ÉÉÉÉ-HH-NN), amikor Fernanda jóváhagyta az oldal szövegét.
const ELLENORIZVE = '[[FERNANDA: a jóváhagyás napja ÉÉÉÉ-HH-NN alakban, pl. 2026-10-20]]';

const ARAK = [
  { nev: 'Lágy rész manuál terápia (FDM kezelések)', idotartam: '50 P' },
  { nev: 'Lágy rész manuál terápia (FDM kezelések)', idotartam: '30 P' },
];
const OTVEN_PERC = ar('Lágy rész manuál terápia (FDM kezelések)', '50 P');

const CIM = 'Manuálterápia Győrben – FDM lágyrész-kezelés | ReStart Physio';
const LEIRAS = `Manuálterápia Győrben: FDM lágyrész- és fasciakezelés hát-, nyak-, váll- és derékfájdalom esetén. 50 perc ${forint(OTVEN_PERC.price)}, beutaló nélkül.`;

export const metadata: Metadata = {
  title: { absolute: CIM },
  description: LEIRAS,
  keywords: 'manuálterápia győr, fdm terápia győr, fascia kezelés, hátfájás kezelés, derékfájás manuálterápia, medical flossing',
  alternates: { canonical: OLDAL_URL },
  openGraph: {
    title: CIM,
    description: LEIRAS,
    url: OLDAL_URL,
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
    type: 'website',
    images: [{ url: `https://restartphysio.hu${KEP}`, width: 3600, height: 2400, alt: KEP_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: CIM,
    description: LEIRAS,
    images: [`https://restartphysio.hu${KEP}`],
  },
};

// Az FDM szerint a páciens kézmozdulata utal az elváltozás típusára.
const ELVALTOZASOK = [
  {
    nev: 'Triggersáv',
    leiras: 'húzódó, égő fájdalom egy vonal mentén; a páciens végighúzza rajta az ujját.',
  },
  {
    nev: 'Kitüremkedett triggerpont',
    leiras: 'mély, tompa, nyomó fájdalom egy pontban, gyakran a váll vagy a csípő táján; a páciens az ujjaival belenyom.',
  },
  {
    nev: 'Kontinuum-torzulás',
    leiras: 'éles fájdalom egyetlen pontban, ott, ahol az ín vagy a szalag a csonthoz tapad; a páciens egy ujjal mutatja.',
  },
  {
    nev: 'Hajtogatódás',
    leiras: 'mélyen az ízületben érzett fájdalom, sokszor bizonytalanság-érzéssel; a páciens a tenyerével átfogja az ízületet.',
  },
  {
    nev: 'Hengerforma-torzulás',
    leiras: 'felületes, nehezen körülhatárolható, helyét változtató fájdalom vagy zsibbadás; a páciens a tenyerével végigsimít a területen.',
  },
  {
    nev: 'Tektonikus fixáció',
    leiras: 'merev, „beragadt” ízület, korlátozott mozgással; a páciens jellemzően megmozgatja az ízületet, hogy megmutassa.',
  },
];

const GYIK = [
  {
    kerdes: 'Fáj az FDM-kezelés?',
    valasz:
      'A fogások erősek, kellemetlenek lehetnek, de az erősségüket mindig az Ön jelzéséhez igazítom, és bármikor szólhat, ha abba kell hagyni. Kék folt előfordulhat a kezelt területen, ez általában néhány nap alatt elmúlik.',
  },
  {
    kerdes: 'Kell beutaló a manuálterápiához?',
    valasz:
      'Nem. A ReStart Physio magánrendelés, beutaló nélkül is foglalhat időpontot. Ha van a panaszához kapcsolódó lelete, hozza magával.',
  },
  {
    kerdes: 'Milyen ruhában jöjjek?',
    valasz:
      'Olyanban, amelyben a kezelt testrész könnyen szabaddá tehető: vállnál, nyaknál trikóban, lábnál rövidnadrágban.',
  },
  {
    kerdes: 'Kombinálható gyógytornával?',
    valasz:
      'Igen, a legtöbbször így alkalmazom: az FDM-kezelés mellett célzott gyakorlatokat is tanítok, mert a tartós változáshoz a mozgásra is szükség van.',
  },
  {
    kerdes: 'Hány kezelésre lesz szükségem?',
    valasz:
      'Ez a panasztól és attól függ, mióta tart. Az első kezelés után megbeszéljük, mire számíthat. Ha néhány alkalom után sem látunk változást, más módszert vagy orvosi kivizsgálást javaslok.',
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
        serviceType: 'ManualTherapy',
        name: 'Manuálterápia (FDM lágyrész-kezelés)',
        description:
          'Kézzel végzett lágyrész- és fasciakezelés a Fascia Disztorziós Modell (FDM) szerint, triggerpont-terápiával és Medical Flossinggal, Győrben.',
        url: OLDAL_URL,
        provider: { '@id': 'https://restartphysio.hu/#organization' },
        areaServed: { '@type': 'City', name: 'Győr' },
        offers: ARAK.map(({ nev, idotartam }) => {
          const tetel = ar(nev, idotartam);
          return {
            '@type': 'Offer',
            name: `Manuálterápia, FDM (${idotartamSzovegesen(idotartam)})`,
            price: tetel.price,
            priceCurrency: 'HUF',
          };
        }),
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

export default function FDMTherapyPage() {
  const frissitve = utolsoModositas('app/szolgaltatasok/manualterapia-fdm');

  return (
    <>
      <OldalSchema frissitve={frissitve} />
      <BreadcrumbSchema
        items={[
          { name: 'Főoldal', url: 'https://restartphysio.hu' },
          { name: 'Szolgáltatások', url: 'https://restartphysio.hu/szolgaltatasok' },
          { name: 'Manuálterápia (FDM)', url: OLDAL_URL },
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
            <span className="text-[#004A6D]">Manuálterápia (FDM)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Lágyrész- és fasciakezelés
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                Manuálterápia Győrben:{' '}
                <br className="hidden sm:block" />
                <span className="text-[#EC7007]">FDM</span> lágyrész-kezelés
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Kézzel végzett lágyrész-kezelés a Fascia Disztorziós Modell (FDM) szerint. A fogásokat
                aszerint választom ki, hogyan írja le és hogyan mutatja meg a fájdalmát. 50 vagy 30
                perces kezelés, beutaló nélkül.
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
              ['Módszer', 'FDM lágyrész-kezelés, triggerpont-terápia, Medical Flossing'],
              ['Időtartam', '50 vagy 30 perc'],
              ['Ár', ARAK.map(({ nev, idotartam }) => `${forint(ar(nev, idotartam).price)} / ${idotartamSzovegesen(idotartam)}`).join(' · ')],
              ['Milyen érzés?', 'a fogások erősek lehetnek, az erősséget az Ön jelzéséhez igazítom'],
              ['Beutaló', 'nem szükséges'],
              ['Helyszín', PRAXIS.helyszin],
            ]}
          />
        }
      >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Mi a manuálterápia, és mi ebben az FDM?</h2>
            <p>
              A <strong>manuálterápia</strong> gyűjtőfogalom: minden olyan kezelés, amelyet a terapeuta
              a kezével végez az izmokon, a kötőszöveten és az ízületeken. Az <strong>FDM</strong>{' '}
              (Fascia Disztorziós Modell) ezen belül egy módszer, amelyet Stephen Typaldos amerikai
              oszteopátiás orvos (D.O.) dolgozott ki.
            </p>
            <p>
              A <strong>fascia</strong> az a kötőszöveti hálózat, amely az izmokat, az ízületeket és a
              szerveket körülveszi és összeköti. Az FDM szerint sok mozgásszervi fájdalom mögött ennek a
              kötőszövetnek valamilyen elváltozása áll, és a modell ezeket hat jellegzetes típusba
              sorolja.
            </p>
            <p>
              Az FDM hatásosságáról és elméleti hátteréről még kevés a magas színvonalú kutatás. Ezért nálam nem önálló
              kezelés, hanem a kezelés egyik eszköze: a mozgásvizsgálat alapján választom ki, és
              legtöbbször{' '}
              <Link href="/szolgaltatasok/egyeni-gyogytorna" className={linkStilus}>
                egyéni gyógytornával
              </Link>{' '}
              kombinálom.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">A fascia hat elváltozása az FDM szerint</h2>
            <p>
              Az FDM egyik sajátossága, hogy figyel arra, hogyan mutatja meg a páciens a fájdalmát: egy
              ujjal egy pontra bök, végighúzza az ujját egy vonalon, vagy a tenyerével átfogja a fájó
              részt. A modell szerint ez a mozdulat sokat elárul:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              {ELVALTOZASOK.map((e) => (
                <li key={e.nev}>
                  <strong>{e.nev}</strong>: {e.leiras}
                </li>
              ))}
            </ul>
            <p>
              Ez a felosztás az FDM saját modellje. Orvosi diagnózist nem helyettesít, a kezelési
              technika kiválasztásában segít.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Milyen panaszoknál alkalmazom?</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Hát-, nyak-, váll- és derékfájdalom (a gerinceredetű panaszokról bővebben:{' '}
                <Link href="/szolgaltatasok/gerincpanaszok-kezelese" className={linkStilus}>
                  gerincpanaszok kezelése
                </Link>
                )
              </li>
              <li>Bokarándulás (ha törés kizárható) és izomhúzódás után</li>
              <li>Beszűkült mozgás, „beragadt” érzés egy ízületben</li>
              <li>Húzódó, feszülő, nehezen körülírható fájdalmak</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Milyen érzés? Fáj?</h2>
            <p>
              Őszintén: igen, a fogások erősek lehetnek. Az FDM-ben határozott nyomással dolgozom, ezért
              kezelés közben kellemetlenséget, akár fájdalmat is érezhet, utána pedig kék folt jelenhet
              meg a kezelt területen.
            </p>
            <p>
              A nyomás erősségét mindig az Ön jelzéséhez igazítom, és bármikor szólhat, ha abba kell
              hagyni. Ha a fájdalom vagy a kék folt napok múlva sem enyhül, jelezze.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Hogyan zajlik egy kezelés?</h2>
            <p>
              Az első alkalommal átbeszéljük a panaszt, megnézem a mozgását, és megkérem, mutassa meg,
              hol és hogyan fáj. Ez alapján választom ki a fogásokat. A kezelés 50 vagy 30 perces.
            </p>
            <p>
              A változás üteme egyénenként nagyon eltérő, ezért előre nem ígérek alkalomszámot. Az első
              kezelés után megbeszéljük, mire számíthat, és ha néhány alkalom után sem látunk
              változást, más módszert vagy orvosi kivizsgálást javaslok.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Triggerpont-terápia és Medical Flossing</h2>
            <p>
              Az 50 perces kezelés az FDM mellett más manuális technikákat is tartalmazhat:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Triggerpont-terápia</strong>: érzékeny, feszes izompontok célzott, tartott
                nyomása.
              </li>
              <li>
                <strong>Eszköztámogatott manuális technikák</strong>: a kéz munkáját segítő
                eszközökkel végzett lágyrész-kezelés.
              </li>
              <li>
                <strong>Medical Flossing</strong>: rugalmas gumiszalagot tekerek a kezelt testrészre,
                és a szalaggal együtt mozgatjuk az ízületet.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Mikor nem alkalmazom?</h2>
            <p>
              A határozott nyomás miatt az FDM nem minden helyzetben jön szóba. Ilyenkor más kezelést
              választunk, vagy előbb orvosi vélemény kell, többek között:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>véralvadásgátló szedése esetén,</li>
              <li>friss trombózis vagy annak gyanúja esetén,</li>
              <li>ha a kezelt területen seb, bőrbetegség vagy gyulladás van,</li>
              <li>friss törés vagy súlyos csontritkulás esetén,</li>
              <li>láz, fertőzés idején,</li>
              <li>ha a kezelt területen daganat van, vagy daganatos betegség miatt kezelik,</li>
              <li>vérzékenység vagy alacsony vérlemezkeszám esetén,</li>
              <li>ha a kezelt területen visszértágulat vagy más érelváltozás van,</li>
              <li>friss műtéti terület kezelésénél,</li>
              <li>várandósság alatt a has és a derék táján.</li>
            </ul>
            <p>
              A Medical Flossingot nem alkalmazom perifériás érszűkület, nyirokpangás, trombózis és
              latexallergia esetén. Ezeket az első alkalommal mindig átbeszéljük.
            </p>
          </div>

          <ArBlokk
            id="arak"
            cim="Árak"
            tetelek={ARAK}
            megjegyzes="Ha szükség van rá, az 50 perces kezelés triggerpont-terápiát, eszköztámogatott technikákat és Medical Flossingot is tartalmazhat; ezekért nem kérünk külön díjat."
          />

          <OrvoshozBlokk
            extra={[
              'Kezelés után napokig fokozódó fájdalom, egyre nagyobb kék folt vagy duzzanat. Ezzel forduljon orvoshoz.',
            ]}
          />

          <SzakemberBlokk
            ellenorizve={ELLENORIZVE}
            frissitve={frissitve}
            kepesitesek={[
              'FDM terápia I.–II.–III. (2019)',
              'Medical Flossing terápia',
              'SMR henger alapkurzus (Csiky System)',
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

      <RelatedServices currentSlug="manualterapia-fdm" />

      <section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Indítsa újra a mozgást!</h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Az első alkalommal átbeszéljük a panaszát, és megnézzük, hogy az FDM-kezelés jó választás-e
            Önnek.
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
