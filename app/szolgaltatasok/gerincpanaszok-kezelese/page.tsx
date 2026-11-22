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

const OLDAL_URL = 'https://restartphysio.hu/szolgaltatasok/gerincpanaszok-kezelese';
const KEP = '/gerinc_core1.jpg';
const KEP_ALT = 'Gerincstabilizáló gyakorlat gyógytornász vezetésével a győri ReStart Physio rendelőben';

// Az a nap (ÉÉÉÉ-HH-NN), amikor Fernanda jóváhagyta az oldal szövegét.
const ELLENORIZVE = '[[FERNANDA: a jóváhagyás napja ÉÉÉÉ-HH-NN alakban, pl. 2026-10-20]]';

const OTVEN_PERC = ar('Egyéni gyógytorna/rehabilitáció', '50 P');

const CIM = 'Gerincpanaszok kezelése Győrben | Derékfájás, porckorongsérv';
const LEIRAS = `Derékfájás, porckorongsérv, isiász, nyakfájás és SI-ízületi panaszok kezelése gyógytornával Győrben. Első alkalom: 50 perc, ${forint(OTVEN_PERC.price)}.`;

export const metadata: Metadata = {
  title: { absolute: CIM },
  description: LEIRAS,
  keywords: 'gerincpanaszok kezelése győr, derékfájás győr, porckorongsérv kezelés, isiász, nyakfájás kezelése győrben, si ízület',
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

const PANASZOK = [
  {
    id: 'derekfajas',
    cim: 'Derékfájás',
    szoveg:
      'A derékfájás a leggyakoribb mozgásszervi panasz, és a legtöbb esetben nem áll mögötte súlyos ok. Gyakran összefügg ülőmunkával, mozgáshiánnyal vagy hirtelen terheléssel. A szakmai irányelvek szerint a legtöbbet az segít, ha mozgásban marad: a teljes ágynyugalom inkább hátráltat. A kezelésben megkeressük, milyen mozdulatok váltják ki a fájdalmat, és célzott gyakorlatokkal, szükség esetén manuális technikákkal fokozatosan visszaépítjük a terhelhetőséget.',
  },
  {
    id: 'porckorongserv',
    cim: 'Porckorongsérv',
    szoveg:
      'Porckorongsérvnél a csigolyák közötti porckorong anyaga kitüremkedik, és nyomhatja a környező ideggyököt. Jó hír, hogy a panaszok sok esetben idővel enyhülnek, és maga a sérv is gyakran kisebb lesz: ez a szervezet saját folyamata. A kezelés célja a fájdalom csillapodásának segítése, a mozgás visszanyerése és a törzsizmok megerősítése. A friss MR- vagy CT-leletet hozza el; a gyakorlatokat ennek és a tüneteinek megfelelően választom ki.',
  },
  {
    id: 'isiasz',
    cim: 'Isiász (ülőidegzsába)',
    szoveg:
      'Isiásznál a fájdalom a derékból vagy a farból a láb hátsó részébe, akár a térd alá sugárzik, sokszor zsibbadással együtt. Leggyakrabban porckorongsérv vagy szűkület nyomja az ideggyököt. A gyógytorna célja az ideg tehermentesítése és a mozgás fokozatos visszanyerése. Ha a lábban gyengeség jelentkezik vagy romlik, az orvosi vizsgálatot nem szabad halogatni (lásd lent).',
  },
  {
    id: 'nyakfajas',
    cim: 'Nyakfájás, nyakmerevség',
    szoveg:
      'A nyakfájás hátterében gyakran hosszú ülőmunka, előrehajtott fejtartás, stressz vagy hirtelen, szokatlan terhelés áll. A fájdalom a vállba, a lapockák közé és a fejbe is kisugározhat. A kezelésben a nyak és a felső hát mozgékonyságán, a mélyizmok erején és a munkahelyi testtartáson dolgozunk. A nyaki manuális kezelés előtt mindig kikérdezem azokat a tüneteket, amelyek miatt inkább orvoshoz kell fordulni.',
  },
  {
    id: 'si-izulet',
    cim: 'SI-ízületi (keresztcsont-csípőízületi) panaszok',
    szoveg:
      'Az SI-ízület a keresztcsont és a medence között van. Panaszai általában a derék alatt, a far egyik oldalán, a keresztcsont felett jelentkeznek, és a combba is kisugározhatnak, ezért gyakran összetévesztik a derékfájással. Az állapotfelmérés során célzott mozgásvizsgálati tesztekkel felmérem, mennyire terhelhető és érzékeny az SI-ízület tája, és ehhez igazítom a kezelést és az otthoni gyakorlatokat. Ha a fájdalom 40 éves kor előtt kezdődött, reggel fél óránál tovább tartó merevséggel jár, és mozgásra enyhül, reumatológiai kivizsgálást javaslok. Az SI-ízület kezeléséről külön képzésen (S.I-terápia tanfolyam) tanultam; az SI-terápia nálam egyéni gyógytorna keretében zajlik.',
  },
  {
    id: 'tartashibak',
    cim: 'Tartáshibák',
    szoveg:
      'A hanyag tartás, a fokozott háti görbület vagy az egyoldalú terhelés összefügghet a gerincpanaszokkal. Ilyenkor a mozgékonyság javítása mellett a tartásért felelős izmok erősítése a cél. Gerincferdülésre a Schroth-terápiát, a törzsizmok rendszeres erősítésére a csoportos core edzést ajánlom.',
  },
];

const GYIK = [
  {
    kerdes: 'Kell MR vagy röntgen a kezelés előtt?',
    valasz:
      'Nem feltétlenül. A legtöbb derék- és nyakfájásnál képalkotó vizsgálat nélkül is elkezdhető a kezelés. Ha van friss lelete, hozza el. Ha a tünetek alapján vizsgálat szükséges, orvoshoz irányítom.',
  },
  {
    kerdes: 'Porckorongsérvvel szabad tornázni?',
    valasz:
      'A legtöbb esetben igen, sőt a fokozatos, célzott mozgás a kezelés része. Hogy melyik gyakorlat és milyen terheléssel, azt a tünetei és a leletei alapján választom ki. Ha a lábban gyengeség jelentkezik vagy romlik, még aznap forduljon orvoshoz. Ha a gát környéke zsibbad, vagy vizelet- vagy székletürítési zavar jelentkezik, azonnal menjen kórházi sürgősségi osztályra.',
  },
  {
    kerdes: 'Hány alkalom kell?',
    valasz:
      'Ez a panasz jellegétől és attól függ, mióta tart. A várható számot az első alkalom után mondom meg, és menet közben felülvizsgáljuk. Ha néhány alkalom után sem látunk előrelépést, orvosi kivizsgálást javaslok.',
  },
  {
    kerdes: 'Kell beutaló?',
    valasz:
      'Nem. A ReStart Physio magánrendelés, beutaló nélkül is foglalhat időpontot.',
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
        name: 'Gerincpanaszok kezelése',
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

export default function GerincpanaszokPage() {
  const frissitve = utolsoModositas('app/szolgaltatasok/gerincpanaszok-kezelese');

  return (
    <>
      <OldalSchema frissitve={frissitve} />
      <BreadcrumbSchema
        items={[
          { name: 'Főoldal', url: 'https://restartphysio.hu' },
          { name: 'Szolgáltatások', url: 'https://restartphysio.hu/szolgaltatasok' },
          { name: 'Gerincpanaszok', url: OLDAL_URL },
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
            <span className="text-[#004A6D]">Gerincpanaszok</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Derék, hát, nyak
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                Gerincpanaszok <span className="text-[#EC7007]">kezelése</span> Győrben
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Derékfájás, porckorongsérv, isiász, nyakfájás és SI-ízületi panaszok kezelése
                gyógytornával és manuális technikákkal. Az első alkalom 50 perces, állapotfelméréssel,
                beutaló nélkül.
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
          <>
          <p className="text-2xl font-bold text-[#004A6D] mb-6 border-b pb-4">Panaszok ezen az oldalon</p>
          <nav aria-label="Panaszok ezen az oldalon">
            <ul className="space-y-3 text-base">
              {PANASZOK.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="font-semibold text-[#004A6D] hover:text-[#EC7007] transition-colors">
                    {p.cim} →
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 pt-6 border-t">
            <Roviden
              cim="Röviden"
              sorok={[
                ['Első alkalom', `50 perc, állapotfelméréssel: ${forint(OTVEN_PERC.price)}`],
                ['Beutaló', 'nem szükséges'],
                ['Helyszín', PRAXIS.helyszin],
              ]}
            />
          </div>
          </>
        }
      >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Milyen gerincpanaszokkal foglalkozunk?</h2>
            <p>
              A gerincpanaszok a leggyakoribb mozgásszervi problémák közé tartoznak, fiataloknál és
              időseknél egyaránt. A kezelés mindig állapotfelméréssel kezdődik: megnézzük, milyen
              mozdulatok váltják ki a panaszt, és mi korlátozza a mozgást. Erre építjük a célzott
              gyakorlatokat, a manuális technikákat és az otthoni programot.
            </p>
          </div>

          {PANASZOK.map((p) => (
            <div key={p.id} id={p.id} className="space-y-4 scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#004A6D]">{p.cim}</h2>
              <p>{p.szoveg}</p>
              {p.id === 'tartashibak' && (
                <p>
                  <Link href="/szolgaltatasok/schroth-terapia" className={linkStilus}>
                    Schroth-terápia gerincferdülésre
                  </Link>{' '}
                  ·{' '}
                  <Link href="/szolgaltatasok/core-edzes" className={linkStilus}>
                    Csoportos gerinc core edzés
                  </Link>
                </p>
              )}
            </div>
          ))}

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Hogyan kezdjünk hozzá?</h2>
            <p>
              Minden gerincpanasz kezelése egy 50 perces{' '}
              <Link href="/szolgaltatasok/egyeni-gyogytorna" className={linkStilus}>
                egyéni gyógytorna
              </Link>{' '}
              alkalommal kezdődik, állapotfelméréssel. Ezután a panaszhoz illően folytatjuk:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>egyéni gyógytornával, 50 vagy 30 perces alkalmakkal,</li>
              <li>
                szükség esetén{' '}
                <Link href="/szolgaltatasok/manualterapia-fdm" className={linkStilus}>
                  manuálterápiával (FDM)
                </Link>
                ,
              </li>
              <li>
                a törzsizmok rendszeres erősítésére{' '}
                <Link href="/szolgaltatasok/core-edzes" className={linkStilus}>
                  csoportos core edzéssel
                </Link>
                .
              </li>
            </ul>
          </div>

          <ArBlokk
            id="arak"
            cim="Árak"
            tetelek={[
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '50 P' },
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '30 P' },
              { nev: 'Egyéni gyógytorna bérlet', idotartam: '5 ALK' },
            ]}
            megjegyzes="Az első alkalom 50 perces, és az állapotfelmérés benne van az árában."
          />

          <OrvoshozBlokk
            extra={[
              'Csontritkulás vagy tartós szteroidszedés mellett, kisebb esés vagy emelés után hirtelen kezdődő hátfájás (csigolyatörés gyanúja).',
              '40 éves kor előtt kezdődött, éjjel-reggel rosszabb, mozgásra enyhülő derék- vagy farfájás, reggeli merevséggel (gyulladásos betegség gyanúja). Ezzel reumatológushoz forduljon.',
            ]}
          />

          <SzakemberBlokk
            ellenorizve={ELLENORIZVE}
            frissitve={frissitve}
            kepesitesek={[
              'S.I-terápia tanfolyam',
              'FDM terápia I.–II.–III. (2019)',
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

      <RelatedServices currentSlug="gerincpanaszok-kezelese" />

      <section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Indítsa újra a mozgást!</h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Az első alkalommal felmérem az állapotát, és megbeszéljük, hogyan kezdjünk hozzá.
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
