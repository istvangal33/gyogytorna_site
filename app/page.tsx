import WhyChooseUs from '../components/WhyChooseUs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';



export const metadata: Metadata = {
  title: 'ReStart Physio - Gyógytorna és Fizioterápia Győrben | Forrás Fernanda',
  description:
    'Szakszerű gyógytorna, fizioterápia és sportrehabilitáció Győrben. Közel 10 év tapasztalat gerincpanaszok, sportsérülések és mozgásszervi problémák kezelésében. Foglalj időpontot: +36 30 819 8449',
  keywords:
    'gyógytorna Győr, fizioterápia Győr, sportrehabilitáció Győr, gerincpanaszok kezelése, manuálterápia Győr, porckorongsérv kezelés Győr, TMI terápia, funkcionális tréning',
  
  // ✅ JSON-LD structured data (LocalBusiness + Person)
  other: {
    'application-name': 'ReStart Physio',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  
  openGraph: {
    title: 'ReStart Physio - Gyógytorna és Fizioterápia Győrben',
    description:
      'Szakszerű gyógytorna és fizioterápia Győrben. Foglalj időpontot még ma! Tel: +36 30 819 8449',
    url: 'https://restartphysio.hu',
    siteName: 'ReStart Physio',
    images: [
      {
        url: 'https://restartphysio.hu/group_core1.jpg',
        width: 1200,
        height: 630,
        alt: 'ReStart Physio rendelő Győr - gyógytorna és fizioterápia szakember',
      },
    ],
    locale: 'hu_HU',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'ReStart Physio - Gyógytorna Győrben',
    description:
      'Szakszerű gyógytorna és fizioterápia szolgáltatások Győrben. Foglalj időpontot: +36 30 819 8449',
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
      <StructuredData />
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-[600px] sm:min-h-[700px] w-full">
        {/* Háttérkép - teljes szélesség, kitöltés vágással */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/group_core1.jpg"
            alt="Csoportos core-stabilizációs gyakorlat a ReStart Physio fizioterapeutájának vezetésével – gumiszalagos törzsizom-erősítő tréning a stabil testtartásért."
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Halvány fehér overlay a szöveg olvashatóságához */}
        <div className="absolute inset-0 bg-white/60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
            {/* Logo - bal oldal gépen, felül mobil */}
            <div className="relative order-first">
              <Image 
                src="/logo.png" 
                alt="ReStart Physio gyógytorna és fizioterápia logó Győr - ahol a mozgás újraindul" 
                width={500}
                height={350}
                className="w-full max-w-md mx-auto lg:max-w-none h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
            {/* Szöveg - jobb oldal gépen, alul mobil */}
            <div className="text-center lg:text-left order-last">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004a6d] leading-tight mb-4 lg:mb-6">
                Ahol a <span className="text-[#EC7007]">mozgás</span> újraindul.
              </h1>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT: Photo + basic info */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-3xl h-[240px] sm:h-[320px] lg:h-[420px] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/gerinc_core1.jpg"
                  alt="Gerincstabilizációs gyakorlat fitball gimnasztikai labdával – Forrás Fernanda, a ReStart Physio fizioterapeutája, szakértő irányításával."
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 900px"
                />
              </div>

              {/* Eddig a név/cím csak nagy kijelzőn volt balra, ezután mindig középen */}
              <div className="w-full flex flex-col items-center justify-center mt-6 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00254d] text-center">
                  Forrás Fernanda
                </h2>
                <p className="text-base text-[#00254d] mt-2 mb-4 text-center">
                  Gyógytornász - fizioterapeuta
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Manuálterápia
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Közel 10 év szakmai tapasztalat
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Sportrehabilitáció
                </span>
              </div>
            </div>

            {/* RIGHT: professional story */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Szakmai Háttér
              </h2>
              
              <div className="prose prose-lg text-gray-900 space-y-6 max-w-none">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="[text-align:justify] indent-8 text-gray-900">
                    Diplomámat 2017-ben szereztem meg a Szegedi Tudományegyetem Egészségtudományi és Szociális Képzési Karán gyógytornász-fizioterapeuta szakon. Az elmúlt évek döntő részében élsportolókkal dolgoztam együtt, kezdetben kézilabdázókkal majd ezt követően a Győri ETO FC gyógytornászaként négy évig labdarúgókkal. Ezen évek alatt lehetőségem nyílt evezős sportolókval, kosárlabdázókkal és atlétákkal is együtt dolgozni, így komplex rálátást és szemléletet kaptam különböző sportok rehabilitációjáról. 2024-től léptem át a magánszektorba, ahol számos mozgásszervi betegséggel hozzám forduló pácienst segíthettem vissza a mindennapi fájdalommentes életéhez.
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h4 className="text-2xl font-semibold text-gray-900 text-center lg:text-left mb-4">Szakterületeim</h4>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Sportrehabilitáció / műtétek utáni rehabilitáció</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Manuális fascia kezelések</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Állkapocs ízületi panaszok kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Porckorongsérv és egyéb gerinc panaszok kezelése</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Gerincferdülés</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#004A6D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-900">Ízületi és mozgásszervi panaszok kezelése</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="[text-align:justify] indent-8 text-gray-900">
                    Az elmúlt évek tapasztalatait szeretném arra használni, hogy minél hatékonyabban tudjam segíteni a hozzám fordulókat, motivációt nyújtsak a rehabilitáció folyamatában és hozzásegítsem a pácienseimet a közösen kitűzött célok eléréséhez!
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <p className="text-center text-sm leading-relaxed text-gray-900">
                    További információért tekintse meg{" "}
                    <Link 
                      href="/szolgaltatasok" 
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      szolgáltatásainkat
                    </Link>, vagy{" "}
                    <Link 
                      href="/elerhetoseg" 
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      vegye fel velünk a kapcsolatot
                    </Link>.
                  </p>
                </div>
              </div>
            </div>




          </div>
          {/* dekoratív háttér-kör (opcionális) */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
        </div>
      </section>


      {/* Why Choose Us Section */}
      <WhyChooseUs />

    </>
  );
}