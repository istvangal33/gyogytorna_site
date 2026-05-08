import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from './lib/blog/blog';
import dynamic from 'next/dynamic';
const WhyChooseUs = dynamic(() => import('../components/WhyChooseUs'), {
  ssr: true,
});



export const metadata: Metadata = {
  title: 'Gyógytorna Győr - ReStart Physio | Személyre szabott fizioterápia',
  description:
    'Fáj a dereka, nyaka, vagy sportsérüléssel küzd? Szakszerű gyógytorna és fizioterápia Győrben, Forrás Fernanda vezetésével. Szabaduljon meg a fájdalomtól, foglaljon időpontot még ma!',
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
      <section className="relative isolate overflow-hidden min-h-[600px] sm:min-h-[700px] w-full">
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
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="ReStart Physio gyógytorna és fizioterápia logó Győr - ahol a mozgás újraindul"
                width={280}
                height={196}
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
              Sportsérülések, állkapocs fájdalom, derék és nyaki panaszok esetén egyénre szabott kezelési tervvel segítek visszatérni a fájdalommentes, aktív mindennapokhoz.
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
                className="inline-flex items-center justify-center gap-2 bg-white/80 text-[#004a6d] px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-[#004a6d]/15 hover:bg-white shadow-lg hover:scale-[1.02]"
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
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Photo */}
            {/* LEFT: Photo + név/chipek a kép alatt */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-3xl aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-2xl">
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
                  <p className="[text-align:justify] text-gray-900">
                    Diplomámat 2017-ben szereztem a Szegedi Tudományegyetem Egészségtudományi és Szociális Képzési Karán gyógytornász-fizioterapeuta szakon. Pályafutásom meghatározó részét az élsportban töltöttem: kezdetben kézilabdázók rehabilitációjával foglalkoztam, majd négy éven át a Győri ETO FC gyógytornászaként labdarúgókkal dolgoztam. Emellett evezős sportolókkal, kosárlabdázókkal és atlétákkal is együttműködtem, így több éves tapasztalatom van abban, hogyan tér vissza egy sérült sportoló a pályára – sportágtól függetlenül. 2024-től a magánszektorban dolgozom, ahol mozgásszervi problémákkal hozzám forduló pácienseket segítek visszatérni a fájdalommentes, aktív mindennapokhoz. Minden kezelési terv egyénre szabott, mert két sérülés sosem egyforma.
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-900 text-center lg:text-left mb-4">
                    Szakterületeim
                  </h3>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Sportsérülések és műtétek utáni rehabilitáció</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Porckorongsérv, derékfájás, nyakfájás kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Isiász és egyéb gerinc eredetű fájdalmak kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Állkapocsízületi (TMI) panaszok kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Gerincferdülés kezelése – Schroth terápia</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Ízületi és mozgásszervi panaszok komplex kezelése</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="text-gray-900 [text-align:justify] leading-relaxed">
                    Győri rendelőmben manuális kezelési technikákkal, BEMER terápiával és egyénre szabott gyógytorna programmal támogatom a hozzám fordulókat – a fájdalom csökkentésétől a biztonságos visszatérésig.
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
                      győri gyógytorna és fizioterápia szolgáltatásaimat
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Sportrehabilitáció', href: '/szolgaltatasok/sportrehabilitacio' },
              { name: 'Gerincpanaszok kezelése', href: '/szolgaltatasok/gerincpanaszok-kezelese' },
              { name: 'BEMER terápia', href: '/szolgaltatasok/bemer-terapia' },
              { name: 'Manuálterápia (FDM)', href: '/szolgaltatasok/manualterapia-fdm' },
              { name: 'TMI terápia', href: '/szolgaltatasok/tmi-terapia' },
              { name: 'Schroth terápia', href: '/szolgaltatasok/schroth-terapia' },
              { name: 'Core edzés', href: '/szolgaltatasok/core-edzes' },
              { name: 'Dinamikus tape', href: '/szolgaltatasok/dinamikus-tape' },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group bg-gray-50 hover:bg-[#004A6D] rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              Összes gyógytorna és fizioterápia szolgáltatás megtekintése →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. WHY CHOOSE US                                                 */}
      {/* ================================================================ */}
      <WhyChooseUs />

      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Legfrissebb cikkeink
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Szakmai tippek, kezelési módszerek és hasznos tanácsok a mozgásszervi
              egészség megőrzéséhez.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {getAllPosts().slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-[#004A6D]/10 text-[#004A6D]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#004A6D] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                      <span>{post.readingTime} olvasás</span>
                      <span className="text-[#004A6D] font-semibold group-hover:text-[#EC7007] transition-colors">
                        Elolvasom →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#004A6D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#EC7007] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Összes cikk megtekintése
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}