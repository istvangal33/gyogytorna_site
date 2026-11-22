import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ArBlokk from '@/components/szolgaltatas/ArBlokk';
import ElsoAlkalom from '@/components/szolgaltatas/ElsoAlkalom';
import GyikBlokk from '@/components/szolgaltatas/GyikBlokk';
import { PRAXIS } from '@/lib/praxis';
const WhyChooseUs = dynamic(() => import('../components/WhyChooseUs'), {
  ssr: true,
});



export const metadata: Metadata = {
  title: 'Gyógytorna Győr - ReStart Physio | Személyre szabott fizioterápia',
  description:
    'Fáj a dereka, nyaka, vagy sportsérüléssel küzd? Szakszerű gyógytorna és fizioterápia Győrben, Forrás Fernandával. Foglaljon időpontot még ma!',
  keywords:
    'gyógytorna győr, fizioterápia győr, fizioterapeuta győr, gyógytornász győr, sportrehabilitáció győr, gerincpanaszok kezelése, manuálterápia győr, bemer terápia győr, porckorongsérv kezelés, si terápia győr, derékfájás kezelés győr, nyakfájás kezelés győr, mozgásszervi rehabilitáció győr, fizioterapeuta győr magán',

  other: {
    'application-name': 'ReStart Physio',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },

  openGraph: {
    title: 'ReStart Physio – Gyógytorna és Fizioterápia Győrben',
    description:
      'Szakszerű gyógytorna és fizioterápia Győrben. Foglalj időpontot: +36 30 819 8449',
    url: 'https://restartphysio.hu',
    siteName: 'ReStart Physio',
    images: [
      {
        url: 'https://restartphysio.hu/group_core1.jpg',
        width: 1200,
        height: 630,
        alt: 'ReStart Physio – gyógytorna és fizioterápia rendelő Győrben',
      },
    ],
    locale: 'hu_HU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ReStart Physio – Gyógytorna Győrben',
    description:
      'Szakszerű gyógytorna és fizioterápia Győrben. Foglalj időpontot: +36 30 819 8449',
    images: ['https://restartphysio.hu/group_core1.jpg'],
  },

  alternates: {
    canonical: 'https://restartphysio.hu',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function Home() {
  return (
    <>

      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden min-h-150 sm:min-h-[700px] w-full">
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/group_core1.webp"
            alt="Csoportos core-stabilizációs tréning gumiszalaggal a ReStart Physio rendelőben"
            fill
            priority
            fetchPriority='high'
            className="object-cover object-center"
            sizes="100vw"
            quality={75}
          />
        </div>

        <div className="absolute inset-0 bg-white/60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 h-full flex flex-col items-center justify-center">
          {/* Logo + Brand tagline sor */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-10 lg:mb-14">
            <div className="shrink-0">
              <Image
                src="/logo.png"
                alt="ReStart Physio gyógytorna és fizioterápia logó Győr - ahol a mozgás újraindul"
                width={288}
                height={152}
                // A magasság a valódi arányból jön (826x436), nem találomra:
                // így a kép helye pontos, és nem ugrik meg alatta a szöveg.
                // A sizes nélkül a böngésző 100vw-t feltételez, és a 640 px
                // széles változatot tölti le egy 192 px-en megjelenő logóhoz —
                // épp az LCP-kép elől véve el a sávszélességet.
                sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 224px, 192px"
                className="w-48 sm:w-56 md:w-64 lg:w-72 drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                style={{ height: 'auto' }}
                priority
                fetchPriority='high'
                quality={80}
              />
            </div>
            <div className="hidden sm:block w-px h-16 bg-[#004a6d]/20" />
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic text-[#004a6d] leading-tight text-center sm:text-left">
              Ahol a{' '}
              <span className="text-[#EC7007]">mozgás</span>
              <br className="hidden sm:block" />{' '}
              újraindul.
            </p>
          </div>

          {/* H1 + szöveg + CTA */}
          <div className="max-w-3xl text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004a6d] leading-tight mb-4 lg:mb-6">
              Gyógytorna, fizioterápia és sportrehabilitáció Győrben
            </h1>
            
            <p className="text-lg md:text-xl text-[#004a6d] font-medium max-w-xl mx-auto mb-8">
              Sportsérülések, állkapocs fájdalom, derék és nyaki panaszok esetén egyénre szabott kezelési tervvel segítek visszatérni az aktív mindennapokhoz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/elerhetoseg#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#004a6d] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-[#004a6d]/20 hover:bg-[#EC7007] hover:border-[#EC7007] shadow-lg hover:scale-[1.02]"
              >
                Időpontfoglalás
              </Link>
              <Link
                href="/szolgaltatasok#services-details"
                className="inline-flex items-center justify-center  bg-white/80 text-[#004a6d] px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-[#004a6d]/15 hover:bg-white shadow-lg hover:scale-[1.02]"
              >
                Szolgáltatásaink
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. FORRÁS FERNANDA – RÖVIDÍTETT BEMUTATKOZÁS                     */}
      {/* ================================================================ */}
      <section className="py-24 bg-linear-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Photo */}
            {/* LEFT: Photo + név/chipek a kép alatt */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-3xl aspect-3/4 lg:aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="/main1.jpg"
                  alt="Forrás Fernanda gyógytornász-fizioterapeuta – gerincstabilizáció fitball labdával Győrben"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 900px"
                />
              </div>

              {/* Kép alatti blokk */}
              <div className="mt-6 w-full max-w-3xl backdrop-blur-sm rounded-2xl p-6 text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  Forrás Fernanda
                </p>
                <p className="mt-2 text-gray-700 font-medium">
                  Gyógytornász – fizioterapeuta
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  {[
                    'Közel 10 év tapasztalat',
                    'Egyéni kezelési terv',
                    'Aktív életmód támogatása',
                  ].map((label) => (
                    <span
                      key={label}
                      className="px-4 py-2 rounded-full bg-[#EC7007]/15 text-gray-900 text-sm font-semibold border border-[#EC7007]/20"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Bemutatkozás rövid */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Szakmai Háttér
              </h2>

              <div className="prose prose-lg text-gray-900 space-y-6 max-w-none">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="text-justify text-gray-900">
                    Diplomámat 2017-ben szereztem a Szegedi Tudományegyetem Egészségtudományi és Szociális Képzési Karán gyógytornász-fizioterapeuta szakon. Pályafutásom meghatározó részét az élsportban töltöttem: kezdetben kézilabdázók rehabilitációjával foglalkoztam, majd négy éven át a Győri ETO FC gyógytornászaként labdarúgókkal dolgoztam. Emellett evezős sportolókkal, kosárlabdázókkal és atlétákkal is együttműködtem, így több éves tapasztalatom van abban, hogyan tér vissza egy sérült sportoló a pályára – sportágtól függetlenül. 2024-től a magánszektorban dolgozom, ahol mozgásszervi problémákkal hozzám forduló pácienseket segítek visszatérni az aktív mindennapokhoz. Minden kezelési terv egyénre szabott, mert két sérülés sosem egyforma.
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-900 text-center lg:text-left mb-4">
                    Szakterületeim
                  </h3>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Sportsérülések és műtétek utáni rehabilitáció</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Porckorongsérv, derékfájás, nyakfájás kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Isiász és egyéb gerinc eredetű fájdalmak kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Állkapocsízületi (TMI) panaszok kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Gerincferdülés kezelése – Schroth terápia</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-gray-900">Ízületi és mozgásszervi panaszok komplex kezelése</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="text-gray-900 text-justify leading-relaxed">
                    Győri rendelőmben{" "}
                    <Link
                      href="/szolgaltatasok/egyeni-gyogytorna"
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      egyéni gyógytornával
                    </Link>
                    , manuális kezelési technikákkal és BEMER-terápiával támogatom a hozzám fordulókat – a fájdalom csökkentésétől a biztonságos visszatérésig.
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <p className="text-center text-sm leading-relaxed text-gray-900">
                    Tudj meg többet rólam a{" "}
                    <Link
                      href="/bemutatkozas"
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      bemutatkozás oldalon
                    </Link>, vagy nézd meg{" "}
                    <Link
                      href="/szolgaltatasok"
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      összes szolgáltatásomat
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. SZOLGÁLTATÁSOK RÖVID ÁTTEKINTÉS                               */}
      {/* ================================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gyógytorna és fizioterápiás szolgáltatásaink Győrben
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Egyénre szabott gyógytorna, fizioterápia sportsérülések, nyakfájás, derékfájás és egyéb mozgásszervi panaszok esetén.
            </p>
          </div>

          {/* 9 csempe: mobilon az első (az alapszolgáltatás) teljes szélességű, így
              nem marad árva csempe; asztalon 3×3. */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'Egyéni gyógytorna', href: '/szolgaltatasok/egyeni-gyogytorna' },
              { name: 'Sportrehabilitáció', href: '/szolgaltatasok/sportrehabilitacio' },
              { name: 'Gerincpanaszok kezelése', href: '/szolgaltatasok/gerincpanaszok-kezelese' },
              { name: 'Manuálterápia (FDM)', href: '/szolgaltatasok/manualterapia-fdm' },
              { name: 'Schroth-terápia gerincferdülésre', href: '/szolgaltatasok/schroth-terapia' },
              { name: 'TMI – állkapocsízületi terápia', href: '/szolgaltatasok/tmi-terapia' },
              { name: 'BEMER-terápia', href: '/szolgaltatasok/bemer-terapia' },
              { name: 'Csoportos core edzés', href: '/szolgaltatasok/core-edzes' },
              { name: 'Kineziológiai és dinamikus tape', href: '/szolgaltatasok/dinamikus-tape' },
            ].map((service, i) => (
              <Link
                key={service.name}
                href={service.href}
                className={`group bg-gray-50 hover:bg-[#004A6D] rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <span className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-white transition-colors">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/szolgaltatasok#services-grid"
              className="text-[#004A6D] font-semibold hover:text-[#EC7007] transition-colors"
            >
              Az összes szolgáltatás →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. TUDNIVALÓK: mikor, hogyan, mennyiért, hol                     */}
      {/* ================================================================ */}
      <section className="pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-gray-700 text-lg leading-relaxed">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Mikor érdemes gyógytornászhoz fordulni?</h2>
            <p>
              Ha egy mozgásszervi panasz napok alatt sem múlik, újra és újra visszatér, vagy akadályozza
              a munkáját, a sportot, az alvást. Leggyakrabban ezekkel keresnek fel:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              {[
                { panasz: 'Derékfájás, nyakfájás, porckorongsérv, isiász', href: '/szolgaltatasok/gerincpanaszok-kezelese#derekfajas', link: 'gerincpanaszok kezelése' },
                { panasz: 'Váll-, térd- vagy csípőfájdalom, műtét utáni állapot', href: '/szolgaltatasok/egyeni-gyogytorna', link: 'egyéni gyógytorna és műtét utáni rehabilitáció' },
                { panasz: 'Sportsérülés, keresztszalag-műtét', href: '/szolgaltatasok/sportrehabilitacio', link: 'sportrehabilitáció' },
                { panasz: 'Feszülő, húzódó izom- és fasciapanaszok', href: '/szolgaltatasok/manualterapia-fdm', link: 'manuálterápia (FDM)' },
                { panasz: 'Gerincferdülés gyerekeknél és felnőtteknél', href: '/szolgaltatasok/schroth-terapia', link: 'Schroth-terápia gerincferdülésre' },
                { panasz: 'Állkapocsfájdalom, kattogás, fogszorítás', href: '/szolgaltatasok/tmi-terapia', link: 'állkapocsízületi (TMI) terápia' },
              ].map((sor) => (
                <li key={sor.href}>
                  <strong>{sor.panasz}</strong>:{' '}
                  <Link href={sor.href} className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors">
                    {sor.link}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Beutaló nem szükséges: a ReStart Physio magánrendelés, időpontot közvetlenül foglalhat.
              Ha a panasz mellett hirtelen gyengeséget, zsibbadást vagy lázat tapasztal, előbb orvoshoz
              forduljon.
            </p>
          </div>

          <ElsoAlkalom
            bevezeto="Minden kezelés egy 50 perces első alkalommal kezdődik, mert a terv az állapotfelmérésre épül."
            lepesek={[
              {
                cim: 'Beszélgetés',
                szoveg: 'Mióta tart a panasz, mikor erősebb, mi segít rajta, milyen betegségei, műtétei voltak. Ha van lelete vagy zárójelentése, hozza magával.',
              },
              {
                cim: 'Mozgásvizsgálat',
                szoveg: 'Testtartás, ízületi mozgásterjedelem, izomerő és a hétköznapi mozdulatok: ebből látom, milyen mozgásbeli tényezők játszhatnak szerepet a panaszában.',
              },
              {
                cim: 'Az első kezelés',
                szoveg: 'Még ugyanezen az alkalmon elkezdjük a kezelést, a panaszhoz illő módszerrel: gyakorlatokkal, manuális technikákkal.',
              },
              {
                cim: 'Terv és otthoni gyakorlatok',
                szoveg: 'Megbeszéljük, milyen gyakran és nagyjából hány alkalomra érdemes jönnie, és megkapja az első otthoni gyakorlatait.',
              },
            ]}
          />

          <ArBlokk
            cim="Mennyibe kerül a gyógytorna?"
            tetelek={[
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '50 P' },
              { nev: 'Egyéni gyógytorna/rehabilitáció', idotartam: '30 P' },
              { nev: 'Egyéni gyógytorna bérlet', idotartam: '5 ALK' },
            ]}
            megjegyzes={
              <>
                Az első alkalom 50 perces, a felmérés benne van az árában.{' '}
                <Link href="/szolgaltatasok/egyeni-gyogytorna#arak" className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors">
                  Az egyéni gyógytorna árai és bérletei
                </Link>
              </>
            }
          />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Gyógytorna vagy fizioterápia: mi a különbség?</h2>
            <p>
              A két szót gyakran egymás szinonimájaként használják. A <strong>fizioterápia</strong> a
              tágabb fogalom: minden olyan kezelés ide tartozik, amely mozgással, kézzel végzett
              technikákkal vagy fizikai eszközökkel segíti a mozgásszervek működését. A{' '}
              <strong>gyógytorna</strong> ennek a legfontosabb része: célzott, a pácienshez igazított
              gyakorlatok, amelyeket a gyógytornász megtanít és ellenőriz. Mindkettőt ugyanaz a szakember
              végzi, a gyógytornász-fizioterapeuta.
            </p>
            <p>
              A <strong>fizikoterápia</strong> pedig a gépi kezeléseket jelenti (például elektroterápia,
              ultrahang, mágnes). Ezek közül nálunk a{' '}
              <Link href="/szolgaltatasok/bemer-terapia" className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors">
                BEMER-kezelés
              </Link>{' '}
              érhető el, kiegészítő kezelésként. Nálam a kezelés gerince mindig a gyakorlás.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#004A6D]">Hogyan talál ide?</h2>
            <p>
              A rendelő címe: <strong>{PRAXIS.helyszin}</strong>, a 3. emeleten (24-es ajtó). Időpontot
              telefonon is foglalhat:{' '}
              <a href={PRAXIS.telefonHivas} className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors">
                {PRAXIS.telefon}
              </a>
              .
            </p>
            <a
              href={PRAXIS.terkep}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold text-[#004A6D] hover:text-[#EC7007] transition-colors"
            >
              Útvonaltervezés a térképen →
            </a>
          </div>

          <GyikBlokk
            kerdesek={[
              {
                kerdes: 'Kell beutaló gyógytornára?',
                valasz: 'Magánrendelésre nem kell beutaló, időpontot közvetlenül foglalhat. Beutaló csak a társadalombiztosítás által finanszírozott ellátáshoz szükséges.',
              },
              {
                kerdes: 'Fizeti a TB a kezelést?',
                valasz: 'Nem. A ReStart Physio magánrendelés, a kezelésekre társadalombiztosítási (NEAK) támogatás nem vehető igénybe. Az aktuális árakat az árlistán találja.',
              },
              {
                kerdes: 'Mit hozzak az első alkalomra?',
                valasz: 'A panaszához kapcsolódó leleteket, zárójelentéseket és a szedett gyógyszerei listáját, valamint kényelmes ruhát, amelyben a kezelt testrész könnyen hozzáférhető.',
              },
              {
                kerdes: 'Hány alkalomra lesz szükségem?',
                valasz: 'Ez a panasztól függ. Friss panasznál a kezelés gyakran 3–5 alkalomból áll, régóta fennálló problémánál inkább 8–15 alkalommal érdemes számolni. Ez nem ígéret: a várható számot az első alkalom után mondom meg.',
              },
            ]}
          />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. WHY CHOOSE US                                                 */}
      {/* ================================================================ */}
      <WhyChooseUs />
    </>
  );
}