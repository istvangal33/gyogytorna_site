import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RelatedServices from '@/components/RelatedServices';
import { PRAXIS } from '@/lib/praxis';
import { ar, forint } from '@/lib/arlista';

const BERLES = ar('BEMER készülék bérlése', '1 HÓNAP');

// --- 1. SEO META ADATOK ---
export const metadata: Metadata = {
  title: { absolute: 'BEMER terápia Győrben | Kezelés a rendelőben és otthoni bérlés' },
  description: 'BEMER-kezelés Győrben Forrás Fernandával, gyógytorna és rehabilitáció kiegészítéseként: a rendelőben, vagy otthoni bérléssel.',
  keywords: 'bemer terápia győr, bemer kezelés győr, bemer bérlés győr, pulzáló mágnesterápia, bemer gép győr, fizikoterápia győr',
  alternates: {
    canonical: 'https://restartphysio.hu/szolgaltatasok/bemer-terapia',
  },
  openGraph: {
    title: 'BEMER Terápia Győrben | ReStart Physio',
    description: 'BEMER-kezelés Győrben, gyógytorna és rehabilitáció kiegészítéseként: a rendelőben, vagy otthoni bérléssel.',
    url: 'https://restartphysio.hu/szolgaltatasok/bemer-terapia',
    images: [{ url: 'https://restartphysio.hu/group_core1.jpg', width: 1200, height: 630, alt: 'BEMER terápia Győrben' }],
  }
};

// --- 2. STRUKTURÁLT ADATOK (JSON-LD) ---
function BemerSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "ElectromagneticTherapy",
    "name": "BEMER Terápia Győr",
    "description": "Pulzáló elektromágneses teret használó, orvostechnikai eszközként forgalmazott készülékkel végzett kiegészítő kezelés, gyógytorna és rehabilitáció mellett. A készülék otthonra is bérelhető.",
    "provider": { "@id": "https://restartphysio.hu/#organization" },
    "areaServed": {
      "@type": "City",
      "name": "Győr"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://restartphysio.hu/arak",
      "priceCurrency": "HUF"
    }
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://restartphysio.hu" },
      { "@type": "ListItem", "position": 2, "name": "Szolgáltatások", "item": "https://restartphysio.hu/szolgaltatasok" },
      { "@type": "ListItem", "position": 3, "name": "BEMER Terápia", "item": "https://restartphysio.hu/szolgaltatasok/bemer-terapia" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}

// --- 3. OLDAL KOMPONENS ---
export default function BemerTherapyPage() {
  return (
    <>
      <BemerSchema />

      {/* HERO SECTION */}
            {/* HERO SECTION */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden border-b border-gray-100">
        {/* Garantáltan világos, letisztult gradiens, ami nem engedi át a szürke hátteret */}
        <div className="absolute inset-0 bg-linear-to-b from-[#004A6D]/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EC7007]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb navigáció (vizuális) - Sötétebb, olvashatóbb színek */}
          <nav className="flex mb-8 text-sm font-semibold text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#EC7007] transition-colors">Főoldal</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/szolgaltatasok" className="hover:text-[#EC7007] transition-colors">Szolgáltatások</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#004A6D]">BEMER terápia</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Kiegészítő kezelés Győrben
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                Pulzáló <span className="text-[#EC7007]">BEMER</span> <br className="hidden sm:block"/>Terápia Győrben
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Pulzáló elektromágneses térrel működő, orvostechnikai eszközként forgalmazott készülék. A ReStart Physio rendelőben gyógytorna és rehabilitáció kiegészítéseként alkalmazzuk, és otthonra is bérelhető.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/elerhetoseg#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#004A6D] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(0,74,109,0.3)] hover:shadow-xl hover:-translate-y-1"
                >
                  Időpontfoglalás
                </Link>
                <Link
                  href="/arak"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#004A6D] border-2 border-[#004A6D]/20 px-8 py-4 rounded-xl font-bold hover:border-[#004A6D] hover:bg-gray-50 transition-all duration-300"
                >
                  Árak és Bérlés
                </Link>
              </div>
            </div>

            {/* Kép beállítása */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white bg-[#f4f7f9]">
              <Image
                src="/bemer1.jpg"
                alt="BEMER terápia"
                fill
                className="object-contain" // Megtartja a teljes képet, üres részeken pedig a háttérszín látszik
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* RÉSZLETES TARTALOM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Bal oldali fő szöveg */}
            <div className="lg:col-span-2 space-y-8 text-gray-700 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-[#004A6D]">Mi az a BEMER terápia és hogyan működik?</h2>
              <p>
                A <strong>BEMER (Bio-Electro-Magnetic-Energy-Regulation) terápia</strong> egy pulzáló, alacsony intenzitású elektromágneses teret használó, orvostechnikai eszközként forgalmazott készülékkel végzett kezelés. A gyártó a test mikrokeringésének – vagyis a legkisebb vérerekben (hajszálerekben) zajló véráramlásnak – a támogatására fejlesztette ki.
              </p>
              <p>
                A BEMER hatásáról szóló kutatások eredményei vegyesek, ezért önálló kezelésként nem ígérünk tőle gyógyulást. Rendelőnkben <strong>kiegészítő kezelésként</strong> alkalmazzuk: gyógytorna, manuálterápia vagy rehabilitáció mellett, ha a páciens állapota indokolja. A gyártó szerint is kiegészítő alkalmazás, és nem helyettesíti az orvosilag előírt terápiát.
              </p>

              <h2 className="text-3xl font-bold text-[#004A6D] pt-8">Hogyan zajlik a kezelés Győrben?</h2>
              <p>
                A kezelés alatt a legtöbben semmit nem éreznek. Győri rendelőnkben a páciens ruhában, kényelmesen fekszik a BEMER matracon, miközben az eszköz alacsony intenzitású impulzusokat bocsát ki. Egy alkalom 8–20 percig tart.
              </p>
              <p>
                A BEMER-kezelést a legtöbbször <Link href="/szolgaltatasok/egyeni-gyogytorna" className="text-[#004A6D] font-semibold underline hover:text-[#EC7007]">egyéni gyógytornával</Link>, <Link href="/szolgaltatasok/manualterapia-fdm" className="text-[#004A6D] font-semibold underline hover:text-[#EC7007]">manuálterápiával</Link> vagy sportrehabilitációval kombináljuk.
              </p>

              {/* A gyártó használati útmutatója alapján (BEMER Evo, magyar IFU, 2.1.4–2.1.5 és 2.4.1 pont, V05 11/2024). */}
              <div className="bg-[#EC7007]/5 border border-[#EC7007]/30 p-6 rounded-xl my-10">
                <h3 className="text-xl font-bold text-[#004A6D] mb-2">Kinek nem alkalmazható?</h3>
                <p className="text-base text-gray-700">
                  A gyártó szerint a kezelés ellenjavallt orvosilag aktív implantátumok (pl. gyógyszerpumpák, szívritmus-szabályozók) viselőinek, valamint a szervátültetésben, allogén sejtátültetésben, csontvelő- vagy őssejt-átültetésben részesülőknek immunszuppresszív terápiával kombinálva.
                </p>
                <p className="text-base text-gray-700 mt-3">
                  A kezelőorvos hozzájárulása szükséges ismeretlen eredetű láz, fertőző betegség, súlyos szívritmuszavar, súlyos pszichózis, kontrollálatlan görccsel járó betegség (pl. epilepszia), béta-blokkolók, nagy dózisú kortikoidok vagy kumarin-származék véralvadásgátlók hosszú távú szedése, vényköteles gyógyszerek folyamatos szedése, várandósság és daganatos megbetegedés esetén.
                </p>
                <p className="text-base text-gray-700 mt-3">
                  Nagyon ritkán a pulzus vagy a vérnyomás átmeneti változása előfordulhat. Ha vérhígítót vagy vérnyomáscsökkentőt szed, az első kezeléssorozat után kérje kezelőorvosa ellenőrzését.
                </p>
              </div>

              {/* Információs doboz */}
              <div className="bg-[#004A6D]/5 border-l-4 border-[#EC7007] p-6 rounded-r-xl my-10">
                <h4 className="text-xl font-bold text-[#004A6D] mb-2">Otthoni BEMER bérlés</h4>
                <p className="text-base text-gray-700">
                  A BEMER készülék <strong>otthonra is bérelhető</strong>, {forint(BERLES.price)} / hónap áron. A bérlés részleteiről (átvétel, betanítás, visszavitel) telefonon tájékoztatjuk.
                </p>
              </div>
            </div>

            {/* Jobb oldali sáv: Kinek ajánlott (Feature lista) */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 h-fit lg:sticky lg:top-24">
              <h3 className="text-2xl font-bold text-[#004A6D] mb-6 border-b pb-4">Mikor alkalmazzuk?</h3>
              <ul className="space-y-4">
                {[
                  "Akut vagy krónikus mozgásszervi fájdalom esetén, gyógytorna mellett",
                  "A mozgásszervrendszer degeneratív (kopásos) betegségeinél, gyógytorna mellett",
                  "Sebgyógyulási zavar esetén, orvosi kezelés mellett"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[#EC7007]/20 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-[#EC7007]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t">
                <a
                  href={PRAXIS.telefonHivas}
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 text-[#004A6D] px-6 py-4 rounded-xl font-bold hover:bg-[#004A6D] hover:text-white transition-colors duration-300 border border-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PRAXIS.telefon}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <RelatedServices currentSlug="bemer-terapia" />

      {/* CALL TO ACTION */}
            {/* CALL TO ACTION */}
      <section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Kérdése van a BEMER-kezelésről vagy a bérlésről?
          </h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Hívjon, vagy írjon nekünk: megbeszéljük, az Ön állapotában van-e értelme a kezelésnek.
          </p>
          <Link
            href="/elerhetoseg#contact"
            className="inline-flex items-center gap-2 bg-[#EC7007] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(236,112,7,0.4)] hover:shadow-xl hover:-translate-y-1"
          >
            Időpontot kérek
          </Link>
        </div>
      </section>
    </>
  );
}