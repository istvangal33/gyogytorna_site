import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RelatedServices from '@/components/RelatedServices';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArBlokk from '@/components/szolgaltatas/ArBlokk';
import ElsoAlkalom from '@/components/szolgaltatas/ElsoAlkalom';
import GyikBlokk from '@/components/szolgaltatas/GyikBlokk';
import OrvoshozBlokk from '@/components/szolgaltatas/OrvoshozBlokk';
import TartalomRacs, { Roviden } from '@/components/szolgaltatas/TartalomRacs';
import SzakemberBlokk, { ervenyesDatum } from '@/components/szolgaltatas/SzakemberBlokk';
import { PRAXIS } from '@/lib/praxis';
import { alkalmankentiAr, ar, forint, idotartamSzovegesen } from '@/lib/arlista';
import { utolsoModositas } from '@/lib/utolso-modositas';

const OLDAL_URL = 'https://restartphysio.hu/szolgaltatasok/egyeni-gyogytorna';
const KEP = '/sportrehab3.jpg';
const KEP_ALT = 'Térderősítő gyakorlat gyógytornász felügyeletével a győri ReStart Physio rendelőben';

// Az a nap (ÉÉÉÉ-HH-NN), amikor Fernanda jóváhagyta az oldal szövegét.
const ELLENORIZVE = '[[FERNANDA: a jóváhagyás napja ÉÉÉÉ-HH-NN alakban, pl. 2026-10-20]]';

const ARAK = [
  { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '50 P' },
  { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '30 P' },
  { nev: 'Egyéni gyógytorna bérlet', idotartam: '5 ALK' },
  { nev: 'Egyéni gyógytorna bérlet', idotartam: '10 ALK' },
];
const OTVEN_PERC = ar('Egyéni gyógytorna/rehabilitáció', '50 P');
const HARMINC_PERC = ar('Egyéni gyógytorna/rehabilitáció', '30 P');
const BERLET_5 = ar('Egyéni gyógytorna bérlet', '5 ALK');
const BERLET_10 = ar('Egyéni gyógytorna bérlet', '10 ALK');
const KINEZIO_TAPE = ar('Kineziológiai tape');
const DINAMIKUS_TAPE = ar('Dinamikus tape');

const CIM = 'Egyéni gyógytorna Győrben | Műtét utáni rehabilitáció, árak';
const LEIRAS = `Egyéni gyógytorna és műtét utáni rehabilitáció Győrben Forrás Fernandával, beutaló nélkül. Az első, 50 perces alkalom állapotfelméréssel együtt ${forint(OTVEN_PERC.price)}.`;

export const metadata: Metadata = {
  title: { absolute: CIM },
  description: LEIRAS,
  alternates: { canonical: OLDAL_URL },
  openGraph: {
    title: CIM,
    description: LEIRAS,
    url: OLDAL_URL,
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
    type: 'website',
    images: [{ url: `https://restartphysio.hu${KEP}`, width: 2400, height: 2170, alt: KEP_ALT }],
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
    kerdes: 'Kell beutaló az egyéni gyógytornához?',
    valasz:
      'Nem. A ReStart Physio magánrendelés, beutaló nélkül is foglalhat időpontot. Ha van orvosi lelete (röntgen, MR, zárójelentés), hozza magával, mert segíti az állapotfelmérést.',
  },
  {
    kerdes: 'Mit hozzak magammal, és milyen ruhában jöjjek?',
    valasz:
      'Hozza el a panaszához kapcsolódó orvosi leleteket és zárójelentéseket, a rendszeresen szedett gyógyszerei listáját, és ha műtéten esett át, a műtét utáni protokollt vagy tornalapot. Olyan ruhában jöjjön, amelyben kényelmesen mozog, és a kezelt testrész könnyen hozzáférhető: térd- vagy csípőpanasznál rövidnadrágban, vállpanasznál trikóban.',
  },
  {
    kerdes: 'Lehet 30 perces az első alkalom?',
    valasz:
      'Nem. Az első alkalommal állapotfelmérést végzek, és ehhez 50 perc kell: így marad idő a kezelésre és az otthoni gyakorlatok megtanítására is. A folytatásban már választhat a 30 és az 50 perc között.',
  },
  {
    kerdes: 'Fájni fog a kezelés?',
    valasz:
      'Érezhet feszülést, enyhe kellemetlenséget, másnap izomlázat: ez a terhelés természetes velejárója. A manuális kezelés egyes fogásai pillanatnyilag kellemetlenek lehetnek, ezek erősségét az Ön jelzéséhez igazítom. Szóljon, ha éles, szúró fájdalmat érez, vagy ha a panasza másnapra sem tér vissza a kezelés előtti szintre: ilyenkor módosítjuk a terhelést.',
  },
  {
    kerdes: 'Nem árt a gyakorlás a frissen operált ízületnek?',
    valasz:
      'A fokozatos, az operáló orvos utasításaihoz igazított gyakorlás a gyógyulás része, a túlzott kímélés is árt: merevséghez és izomgyengüléshez vezet. A gyakorlatokat a megengedett határokon belül választom ki, és csak fokozatosan nehezítem. A rendelőben látom, hogyan bírja az ízület; otthon szóljon, ha a duzzanat vagy a fájdalom a gyakorlás után tartósan fokozódik.',
  },
  {
    kerdes: 'Mikor érzek javulást?',
    valasz:
      'Sokan már az első alkalmak után könnyebbséget éreznek, de ez nem szabály: a tartós változáshoz idő és rendszeres otthoni gyakorlás kell. Ha néhány alkalom után sem látunk előrelépést, újragondoljuk a tervet, vagy orvosi kivizsgálást javaslok.',
  },
  {
    kerdes: 'Igénybe vehető TB-támogatás?',
    valasz:
      'Nem. A ReStart Physio magánrendelés, a kezelésekre társadalombiztosítási (NEAK) támogatás nem vehető igénybe.',
  },
  {
    kerdes: 'Hogyan mondhatom le az időpontomat?',
    valasz:
      'Díjmentesen lemondhatja vagy módosíthatja legkésőbb 24 órával a kezelés előtt. 24 órán belüli lemondásnál, vagy ha nem jön el, a kezelés teljes díját ki kell számláznunk, bérletnél pedig az alkalmat levonjuk.',
  },
  {
    kerdes: 'Frissen operálva, mankóval is megközelíthető a rendelő? Hol tudok parkolni?',
    valasz:
      '[[FERNANDA: A rendelő a 3. emeleten van. Van lift a házban? Hány lépcső vezet a bejáratig? Hol lehet parkolni a ház közelében, és ingyenes-e? Ha nincs lift, mit javasolsz a frissen operált pácienseknek?]]',
  },
];

function OldalSchema({ frissitve }: { frissitve?: Date }) {
  const ellenorizve = ervenyesDatum(ELLENORIZVE);
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
        ...(ellenorizve && { lastReviewed: ELLENORIZVE }),
        ...(frissitve && { dateModified: frissitve.toISOString() }),
      },
      {
        '@type': 'Service',
        '@id': `${OLDAL_URL}#service`,
        serviceType: 'Physiotherapy',
        name: 'Egyéni gyógytorna és rehabilitáció',
        description:
          'Személyre szabott egyéni gyógytorna és műtét utáni rehabilitáció Győrben, állapotfelméréssel kezdve, otthoni gyakorlatprogrammal.',
        url: OLDAL_URL,
        provider: { '@id': 'https://restartphysio.hu/#organization' },
        areaServed: { '@type': 'City', name: 'Győr' },
        offers: ARAK.map(({ nev, idotartam }) => {
          const tetel = ar(nev, idotartam);
          return {
            '@type': 'Offer',
            name: `${tetel.name} (${idotartamSzovegesen(idotartam)})`,
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

export default function EgyeniGyogytornaPage() {
  const frissitve = utolsoModositas('app/szolgaltatasok/egyeni-gyogytorna');

  return (
    <>
      <OldalSchema frissitve={frissitve} />
      <BreadcrumbSchema
        items={[
          { name: 'Főoldal', url: 'https://restartphysio.hu' },
          { name: 'Szolgáltatások', url: 'https://restartphysio.hu/szolgaltatasok' },
          { name: 'Egyéni gyógytorna', url: OLDAL_URL },
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
            <span className="text-[#004A6D]">Egyéni gyógytorna</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Magánrendelés, beutaló nélkül
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                Egyéni <span className="text-[#EC7007]">gyógytorna</span>{' '}
                <br className="hidden sm:block" />
                és rehabilitáció Győrben
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Forrás Fernanda vagyok, gyógytornász-fizioterapeuta. Győri magánrendelőmben az
                egyéni gyógytornán a kezelés teljes ideje az Öné: felmérem, milyen mozdulatok
                váltják ki a fájdalmat, és mi korlátozza a mozgását, kezelem a panaszát, és
                megtanítom azokat a gyakorlatokat, amelyekkel otthon is tehet a javulásért. Az első,
                50 perces alkalom állapotfelméréssel együtt {forint(OTVEN_PERC.price)}, és beutaló
                nem kell.
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
                  Árak és bérletek
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
              ['Időtartam', '50 vagy 30 perc'],
              ['Első alkalom', '50 perc: állapotfelmérés és kezelés'],
              ['Ár', `${forint(OTVEN_PERC.price)} / 50 perc · ${forint(HARMINC_PERC.price)} / 30 perc`],
              ['Bérlet', '5 vagy 10 alkalom 50 perces kezelésekre, 3 hónapig érvényes, heti legalább 2 kezeléssel'],
              ['Beutaló', 'nem szükséges'],
              ['TB-támogatás', 'nincs, magánrendelés'],
              ['Helyszín', PRAXIS.helyszin],
            ]}
          />
        }
      >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Mi az egyéni gyógytorna?</h2>
            <p>
              Az egyéni gyógytorna olyan kezelés, amelyen a gyógytornász végig egyetlen páciensre
              figyel. Nem előre megírt gyakorlatsort kap: a kezelési tervet a vizsgálat
              eredményéhez, a céljaihoz és a mindennapjaihoz igazítom, és alkalomról alkalomra
              módosítom, ahogy az állapota változik.
            </p>
            <p>
              A kezelés jellemzően két részből áll. Az egyik az én részem: kézzel végzett
              (manuális) technikákkal lazítom a feszes szöveteket, és átmozgatom a beszűkült
              ízületeket. A másikat Ön tanulja meg: célzott gyakorlatokat, amelyeket otthon is
              végez. A tartós javulás nagyrészt ezen a második részen múlik, ezért a rendelőben
              pontosan begyakoroljuk őket.
            </p>
            <p>
              Az egyéni gyógytorna a rendelő alapszolgáltatása. A többi kezelést a főoldalon
              találja:{' '}
              <Link href="/" className={linkStilus}>
                gyógytorna és fizioterápia Győrben
              </Link>
              .
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Kinek ajánlom?</h2>
            <p>Leggyakrabban ezekkel a panaszokkal keresnek fel:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Derék-, hát- és nyakfájás</strong>, porckorongsérv, isiász. Ezekről külön
                oldalon is olvashat:{' '}
                <Link href="/szolgaltatasok/gerincpanaszok-kezelese" className={linkStilus}>
                  gerincpanaszok kezelése
                </Link>
                .
              </li>
              <li>
                <strong>Ízületi fájdalom</strong> a vállban, a térdben, a csípőben vagy a bokában,
                ízületi kopás okozta mozgásbeszűkülés.
              </li>
              <li>
                <strong>Műtét utáni rehabilitáció</strong>: protézisműtét, keresztszalag-pótlás,
                váll- vagy gerincműtét után (részletesen lent).
              </li>
              <li>
                <strong>Tartáshibák</strong> és az ülőmunka okozta feszülés, fájdalom.
                Gerincferdülésre a{' '}
                <Link href="/szolgaltatasok/schroth-terapia" className={linkStilus}>
                  Schroth-terápiát
                </Link>{' '}
                ajánlom.
              </li>
              <li>
                <strong>Sérülés utáni felépülés</strong>, visszatérés a hétköznapi mozgáshoz. Ha a
                sportba térne vissza, a{' '}
                <Link href="/szolgaltatasok/sportrehabilitacio" className={linkStilus}>
                  sportrehabilitáció
                </Link>{' '}
                a jobb választás.
              </li>
            </ul>
            <p>
              Nem biztos benne, hogy ez a megfelelő kezelés?{' '}
              <Link href="/elerhetoseg#contact" className={linkStilus}>
                Írja meg röviden a panaszát
              </Link>
              , vagy hívjon a {PRAXIS.telefon} számon, és megmondom, mit javaslok.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Műtét utáni rehabilitáció</h2>
            <p>
              A műtét a gyógyulásnak csak az első lépése. Hogy mennyire hajlik újra a térd, mennyi
              erő tér vissza a vállba, és mikor jár újra biztonságosan, az nagyban múlik a műtét
              utáni hetek és hónapok rendszeres, fokozatosan nehezedő gyakorlásán.
            </p>
            <p>
              A rehabilitáció ütemét mindig az operáló orvos utasításaihoz igazítom: mikor és
              mennyire terhelhet, mekkora mozgás engedélyezett, mikor kezdhető az erősítés. Ezért
              kérem, hozza el a zárójelentést, és ha kapott, a műtét utáni protokollt vagy
              tornalapot is.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 pt-2">Térdprotézis és csípőprotézis után</h3>
            <p>
              A térdprotézis vagy csípőprotézis utáni gyógytorna első heteiben a cél a duzzanat
              csökkentése és a biztonságos járás, előbb mankóval, majd anélkül; térdprotézisnél a
              hajlítás és a teljes nyújtás visszanyerése is. Csípőprotézisnél nem a mozgás
              erőltetése a cél: ha az operáló orvos mozgáskorlátozást írt elő (például a mély ülés
              vagy a lábkeresztezés kerülését), azt a ficam megelőzésére betartjuk. Utána
              következik a comb- és a farizmok erősítése, a lépcsőzés és az egyensúly gyakorlása,
              hogy a hétköznapokban újra magabiztosan mozogjon.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 pt-2">Keresztszalag-pótlás után</h3>
            <p>
              Keresztszalag-pótlás után a hétköznapi járáshoz és lépcsőzéshez szükséges mozgást és
              erőt építjük vissza, az operáló orvos protokollja szerint. Ha a cél a sportba való
              visszatérés is, olvasson a{' '}
              <Link href="/szolgaltatasok/sportrehabilitacio" className={linkStilus}>
                keresztszalag-műtét utáni sportrehabilitációról
              </Link>
              .
            </p>

            <h3 className="text-2xl font-bold text-gray-900 pt-2">Vállműtét után</h3>
            <p>
              Az első hetekben a vállat gyakran vállrögzítő védi, és csak az operáló orvos által
              engedélyezett mozgások végezhetők. A rehabilitáció ilyenkor óvatos, irányított
              mozgatással indul, és csak később, lépésenként jut el az aktív mozgásig és az
              erősítésig.
            </p>
            <p>
              Gerinc- és meniszkuszműtét után is vállalok rehabilitációt, ugyanígy az operáló orvos
              utasításai szerint.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 pt-2">
              Mikor vezethet, dolgozhat, sportolhat újra?
            </h3>
            <p>
              Erről az operáló orvos dönt, ezért előre nem ígérek dátumot. Az első alkalommal a
              zárójelentés alapján megbeszéljük, mire számíthat, és menet közben mindig elmondom,
              hol tartunk.
            </p>
            <p>
              Ha hazaérve folytatná a kórházban elkezdett tornát, az operáló orvos engedélyével
              érdemes minél előbb jelentkeznie. Térdműtét után ez különösen fontos: az első
              hetekben elmaradt hajlítást és nyújtást később nehezebb visszanyerni.
            </p>
          </div>

          <ElsoAlkalom
            bevezeto="Az első alkalom mindig 50 perces. Ennyi idő kell ahhoz, hogy alaposan felmérjem az állapotát, és rögtön el is kezdjük a kezelést."
            lepesek={[
              {
                cim: 'Beszélgetés és leletek',
                szoveg:
                  'Átbeszéljük, mióta és mikor fáj, mi enyhíti és mi rontja, milyen betegségei, műtétei voltak, és mit szeretne elérni a kezeléssel.',
              },
              {
                cim: 'Mozgásvizsgálat',
                szoveg:
                  'Megnézem a testtartását, az ízületek mozgásterjedelmét, az izomerőt, és azt, hogyan végzi a hétköznapi mozdulatokat. Ebből látom, milyen mozgásbeli eltérések játszhatnak szerepet a panaszában.',
              },
              {
                cim: 'Kezelés már az első alkalommal',
                szoveg:
                  'A hátralévő időben elkezdjük a kezelést: manuális technikákkal és az első gyakorlatokkal. Közben közérthetően elmondom, mit találtam.',
              },
              {
                cim: 'Otthoni program és kezelési terv',
                szoveg:
                  'Néhány begyakorolt gyakorlattal megy haza, és megbeszéljük, hány alkalommal és milyen gyakran érdemes jönnie.',
              },
            ]}
          />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Milyen módszereket használok?</h2>
            <p>A módszert mindig a panaszhoz választom, nem fordítva. Leggyakrabban ezeket kombinálom:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Célzott, korrektív és erősítő gyakorlatok.</strong> Ez a kezelés gerince,
                ezekből áll össze az otthoni program is.
              </li>
              <li>
                <strong>Manuális technikák</strong>: kézzel végzett lágyrész- és ízületi kezelés. A
                fascia célzott kezelésére külön{' '}
                <Link href="/szolgaltatasok/manualterapia-fdm" className={linkStilus}>
                  FDM-manuálterápiát
                </Link>{' '}
                is kínálok.
              </li>
              <li>
                <strong>SMR-henger</strong>: önmasszázs hengerrel, amelyet otthon is alkalmazhat.
              </li>
              <li>
                <Link href="/szolgaltatasok/dinamikus-tape" className={`${linkStilus} font-bold`}>
                  Kineziológiai tapasz és dinamikus tape
                </Link>{' '}
                a kezelések közötti időszakra, a mozgás támogatására.
              </li>
              <li>
                <strong>BEMER-kezelés</strong>: kiegészítő kezelés, előzetes egyeztetés alapján.
              </li>
            </ul>
            <p>
              A tape ({forint(KINEZIO_TAPE.price)}, dinamikus tape esetén{' '}
              {forint(DINAMIKUS_TAPE.price)}) és a BEMER-kezelés nem része az egyéni gyógytorna
              árának. Ha javaslom, előre megbeszéljük.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">
              A kezelési terv: 30 vagy 50 perc, hány alkalom?
            </h2>
            <p>
              Az első alkalom után a kezelések lehetnek 50 vagy 30 percesek. Az 50 perc akkor kell,
              ha manuális kezelésre és új gyakorlatok tanulására is szükség van. A 30 perc jó
              választás, ha már ismeri a programját, és főleg a gyakorlatok ellenőrzése, nehezítése
              a cél.
            </p>
            <p>
              Hogy hány alkalom kell, az a panasz jellegétől, attól, mióta tart, és attól is függ,
              mennyit gyakorol otthon. Tájékoztatásul: friss panasznál a kezelés gyakran 3–5
              alkalomból áll, régóta fennálló problémánál inkább 8–15 alkalommal érdemes számolni,
              műtét után pedig a teljes felépülés hónapokig tarthat. Ez nem ígéret: a várható
              számot az első alkalom után mondom meg, és menet közben felülvizsgáljuk.
            </p>
            <p>
              Ha rendszeres kezelésre van szüksége, a bérlet kedvezőbb: az 5 alkalmas bérlettel{' '}
              {forint(alkalmankentiAr(BERLET_5)!)}, a 10 alkalmassal {forint(alkalmankentiAr(BERLET_10)!)} egy 50
              perces kezelés díja. A bérlet a vásárlástól számított 3 hónapig, heti legalább 2
              alkalommal használható fel.
            </p>
          </div>

          <div className="rounded-3xl bg-[#004A6D]/5 border-l-4 border-[#EC7007] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#004A6D] mb-4">
              Amit a rendelőben a leggyakrabban látok
            </h2>
            <figure>
              <blockquote>
                <p>
                  [[FERNANDA: 3–5 mondat egyes szám első személyben: mit látsz a leggyakrabban
                  egyéni gyógytornán, mire tanítod meg először a pácienseidet, mi az, amiben a te
                  munkád más. Elég szóban elmondani, Claude megfogalmazza, de a végső szöveget
                  neked kell jóváhagynod.]]
                </p>
              </blockquote>
              <figcaption className="mt-4 font-semibold text-gray-900">
                Forrás Fernanda, gyógytornász-fizioterapeuta
              </figcaption>
            </figure>
          </div>

          <ArBlokk
            id="arak"
            cim="Árak és bérletek"
            tetelek={ARAK}
            megjegyzes="Az állapotfelmérésért nem kérünk külön díjat: benne van az első, 50 perces kezelés árában."
          />

          <OrvoshozBlokk
            extra={[
              'Műtét után: az egyik láb (vádli vagy comb) fájdalma, duzzanata, melegsége (trombózis gyanúja). Ilyenkor azonnal forduljon orvoshoz.',
              'Műtét után: hirtelen nehézlégzés, mellkasi fájdalom, szapora szívverés vagy ájulás (tüdőembólia gyanúja). Ilyenkor hívja a 112-t.',
              'Műtét után: a seb körüli fokozódó pirosság, duzzanat, váladékozás, a seb szétnyílása vagy láz (fertőzés gyanúja). Ezzel még aznap keresse az operáló osztályt.',
              'Csípőprotézis után: hirtelen erős csípőfájdalom, a láb megrövidülése, kifordulása vagy terhelhetetlensége (ficam gyanúja). Ilyenkor hívja a 112-t.',
            ]}
          />

          <SzakemberBlokk
            ellenorizve={ELLENORIZVE}
            frissitve={frissitve}
            kepesitesek={[
              'Functional Movement Screen (Gray Cook-módszer)',
              'SMR henger alapkurzus (Csiky System)',
              'Kinematic Taping',
              'The Complete Guide to the Athletic ACL – Aspetar, Doha (2024)',
            ]}
          />

          <GyikBlokk kerdesek={GYIK} />
      </TartalomRacs>

      <RelatedServices currentSlug="egyeni-gyogytorna" />

      <section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Kezdjük egy alapos állapotfelméréssel
          </h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Az első, 50 perces alkalommal felmérem az állapotát, elkezdjük a kezelést, és
            megbeszéljük, mire számíthat. Beutaló nem kell.
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
