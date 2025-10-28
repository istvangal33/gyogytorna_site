'use client';

import { useState } from 'react';
import ScrollTiles from '../../components/ScrollTiles';

interface PriceItem {
  name: string;
  color?: string;
}

const SERVICES: PriceItem[] = [
  { name: "Egyéni gyógytorna/rehabilitáció", color: "#004A6D" },
  { name: "Lágy rész manuál terápia (FDM kezelések)", color: "#004A6D" },
  { name: "Schroth terápia", color: "#004A6D" },
  { name: "TMI (Állkapocs ízületi) terápia", color: "#004A6D" },
  { name: "Komplex rehabilitáció", color: "#004A6D" },
  { name: "Csoportos gerinc core edzés", color: "#004A6D" },
  { name: "Kinesiológiai tape", color: "#004A6D" },
  { name: "Dinamikus tape", color: "#004A6D" },
];

// Szolgáltatás leírások
const SERVICE_DESCRIPTIONS: { [key: string]: string } = {
  "Egyéni gyógytorna/rehabilitáció": "A <strong>sportrehabilitáció</strong> célja, hogy a sérülést követően a sportoló - legyen hobbi vagy élsportoló - minél gyorsabban, biztonságosan és teljes értékűen térhessen vissza az edzéshez vagy versenyzéshez. A kezelés nem csupán a fájdalomcsillapításról szól, hanem a teljes funkció helyreállításáról és a sérülés újbóli kialakulásának minimalizálásáról. A sportrehabilitáció során személyre szabott kezelési tervet készítünk, melyben ötvözzük a manuálterápiát, funkcionális gyakorlatokat. Megtanítjuk a helyes mozgásmintákat, javítjuk a mobilitást, koordinációt, stabilitást, dinamikát és az erőnlétet -legyen szó húzódásról, szalagsérülésekről, műtét utáni állapotról vagy túlterheléses problémákról.",
  "Lágy rész manuál terápia (FDM kezelések)": "Az <strong>FDM (Fascia Disztorziós Modell)</strong> terápia egy innovatív manuális kezelési módszer, amellyel a fascia (kötőszöveti hálózat) elváltozásainak helyreállítására fókuszálunk. A fascia az egész testet behálózó szövet, amely kulcsszerepet játszik a mozgásban, erőátvitelben és a testtartásban. Az FDM terápia során speciális fogásokat alkalmazunk, melynek során a fasciában kialakult letapadásokat és elmozdulásokat oldjuk, célzott pontok nyomásával és a szövetek felszakításával. A kezelések által hatékonyan enyhíthetjük a mozgásszervi panaszokat, például hát-, nyak-, váll- vagy derékfájdalmat. Az FDM terápia által gyors és látványos eredményeket érhetünk el már néhány alkalom után.",
  "Schroth terápia": "A <strong>Schroth</strong> terápia egy speciális, háromdimenziós mozgásterápia, amely a gerincferdülés (scoliosis) és más tartáshibák célzott kezelésére szolgál. Ez a terápia az egyik leghatékonyabb konzervatív kezelési formának számít a gerincdeformitások korrigálásában. A terápia során a páciens megtanulja a saját testtartási mintáinak tudatos korrekcióját, speciális légzőgyakorlatokkal és izomaktiválással kombinálva. A kezelés célja, hogy javítsuk a gerinc helyzetét, csökkentsük az aszimmetriát, enyhítsük a fájdalmat és megelőzzük a ferdülés romlását.",
  "TMI (Állkapocs ízületi) terápia": "Az <strong>állkapocs-ízületi</strong> terápia a rágóízület (TMJ - temporomandibuláris ízület) működésének helyreállítására, fájdalmainak és mozgáskorlátozottságának csökkentésére irányuló speciális manuális kezelés. A mindennapi stressz, fogszorítás, fogcsikorgatás, helytelen testtartás vagy harapási rendellenességek gyakran okozhatnak állkapocs körüli fájdalmat, kattogást, fejfájást, fülzúgást vagy szájnyitási nehézségeket.",
  "Komplex rehabilitáció": "Átfogó rehabilitációs program, amely kombinálja a gyógytornát, manuális terápiát és egyéb kezelési módszereket a teljes gyógyulás érdekében.",
  "Csoportos gerinc core edzés": "Kiscsoportos edzés a gerincstabilizáló izmok erősítésére, amely javítja a testtartást és megelőzi a gerincproblémákat.",
  "Kinesiológiai tape": "Rugalmas tapasz alkalmazása, amely támogatja az izmokat és ízületeket, csökkenti a fájdalmat és javítja a mozgást.",
  "Dinamikus tape": "Speciális tapaszolási technika, amely dinamikus támogatást nyújt a mozgás során és segíti a funkcionális mozgásminták helyreállítását."
};

export default function ServicesSection() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  const toggleServiceExpansion = (serviceName: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceName)) {
      newExpanded.delete(serviceName);
    } else {
      newExpanded.add(serviceName);
    }
    setExpandedServices(newExpanded);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-16 md:h-24 text-white"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4">
              Szolgáltatásaink
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Komplex fizioterápiás megoldások minden igényre – egyénre szabott kezelésekkel
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE SLIDER */}
      <ScrollTiles />
      
      {/* SZOLGÁLTATÁSOK - FIXED GRID */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Szolgáltatások részletesen
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Professzionális fizioterápiás szolgáltatások egyénre szabottan
            </p>
          </div>

          {/* GRID - ITEMS START AT TOP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {SERVICES.map((service, index) => (
              <div
                key={`service-${index}`}
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/20"
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${service.color || '#004A6D'}15, transparent)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6">
                  
                  {/* Title - FIX MAGASSÁG 2 SOR = 3.5rem (56px) */}
                  <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 min-h-[3.5rem] flex items-center ${
                    expandedServices.has(service.name) 
                      ? 'text-[#EC7007]'  // NARANCS ha nyitva
                      : 'text-gray-900 group-hover:text-[#004A6D]'  // KÉK hover
                  }`}>
                    {service.name}
                  </h3>

                  {/* Divider */}
                  <div 
                    className="w-12 h-1 rounded-full mb-4 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: service.color || '#004A6D' }}
                  />

                  {/* Description - FIX MAGASSÁG 3 SOR = 4.5rem (72px) */}
                  <div 
                    className={`text-gray-600 text-sm leading-relaxed transition-all duration-500 overflow-hidden ${
                      expandedServices.has(service.name) ? 'max-h-[2000px]' : 'h-[4.5rem]'
                    }`}
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: expandedServices.has(service.name) ? 'unset' : 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: SERVICE_DESCRIPTIONS[service.name] || "Leírás hamarosan..."
                    }}
                  />

                  {/* Toggle button */}
                  <button
                    onClick={() => toggleServiceExpansion(service.name)}
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                      expandedServices.has(service.name)
                        ? 'bg-[#004A6D] text-white hover:bg-[#EC7007]'  // Kék → Narancs hover
                        : 'bg-[#004A6D]/20 text-[#004A6D] hover:bg-[#EC7007] hover:text-white'  // Átlátszó kék → Narancs hover
                    }`}
                  >
                    <span>{expandedServices.has(service.name) ? 'Kevesebb' : 'Továbbiak'}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedServices.has(service.name) ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>


                {/* Bottom accent */}
                <div 
                  className="h-1 rounded-b-2xl"
                  style={{ backgroundColor: service.color || '#004A6D' }}
                />
              </div>
            ))}

          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500 max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Szeretne időpontot foglalni?
              </h4>
              <p className="text-gray-600 mb-6">
                Vegye fel velünk a kapcsolatot, és egyeztessünk egy ingyenes konzultációt!
              </p>
              <a 
                href="/elerhetoseg#contact"
                className="inline-flex items-center gap-2 bg-[#EC7007] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d4610a] transition-colors duration-200 shadow-sm hover:shadow-md hover:scale-105 transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kapcsolatfelvétel
              </a>
            </div>
          </div>
        </div>

        {/* Dekoratív háttér körök */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </section>
    </>
  );
}
