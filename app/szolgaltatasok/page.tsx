'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollTiles from '../../components/ScrollTiles';

function ServiceSchema() {
  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Physiotherapy",
      "name": "Egyéni gyógytorna/rehabilitáció", 
      "description": "A sportrehabilitáció célja, hogy a sérülést követően a sportoló minél gyorsabban, biztonságosan és teljes értékűen térhessen vissza az edzéshez vagy versenyzéshez.",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org", 
      "@type": "Service",
      "serviceType": "MedicalTherapy", 
      "name": "TMI (Állkapocs ízületi) terápia",
      "description": "Az állkapocs-ízületi terápia a rágóízület működésének helyreállítására, fájdalmainak és mozgáskorlátozottságának csökkentésére irányuló speciális manuális kezelés.",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "ManualTherapy",
      "name": "Lágy rész manuál terápia (FDM kezelések)",
      "description": "Az FDM (Fascia Disztorziós Modell) terápia egy innovatív manuális kezelési módszer, amellyel a fascia elváltozásainak helyreállítására fókuszálunk.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "SpinalTherapy",
      "name": "Gerincpanaszok kezelése",
      "description": "A gerincpanaszok napjaink egyik leggyakoribb mozgásszervi problémái közé tartoznak. A célunk nem csak a tünetek enyhítése, hanem az okok feltárása és a tartós megoldás megtalálása.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "ElectromagneticTherapy",
      "name": "BEMER terápia",
      "description": "A BEMER terápia egy orvostechnikai eszközön alapuló fizikoterápiás módszer, amely célzott, pulzáló elektromágneses mező segítségével javítja a szervezet mikrokeringését.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "KinesiologyTaping",
      "name": "Dinamikus tape",
      "description": "A Dynamic Tape egy innovatív, biomechanikai szemléletű tapasz, amely nemcsak támogatja az izmokat és ízületeket, hanem aktívan segíti a mozgást is.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "CoreStabilization",
      "name": "Csoportos gerinc core edzés",
      "description": "A core (törzsizomzat) a test stabilitásának alapja. A személyre szabott core-stabilizációs program célja, hogy fokozatosan építsük vissza a törzs tartóerejét.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "serviceType": "ScoliosisTherapy",
      "name": "Gerincferdülés - Schroth terápia",
      "description": "A Schroth terápia egy speciális, háromdimenziós mozgásterápia, amely a gerincferdülés (scoliosis) és más tartáshibák célzott kezelésére szolgál.",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "ReStart Physio",
        "url": "https://restartphysio.hu"
      }
    }
  ];

  return (
    <>
      {servicesSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
}


interface PriceItem {
  name: string;
  color?: string;
}

const SERVICES: PriceItem[] = [
  { name: "Egyéni gyógytorna/rehabilitáció", color: "#004A6D" },
  { name: "TMI (Állkapocs ízületi) terápia", color: "#004A6D" },
  { name: "Lágy rész manuál terápia (FDM kezelések)", color: "#004A6D" },
  { name: "Gerincpanaszok kezelése", color: "#004A6D" },
  { name: "BEMER terápia", color: "#004A6D" },
  { name: "Dinamikus tape", color: "#004A6D" },
  { name: "Csoportos gerinc core edzés", color: "#004A6D" },
  { name: "Gerincferdülés - Schroth terápia", color: "#004A6D"}
];

// Szolgáltatás leírások
const SERVICE_DESCRIPTIONS: { [key: string]: string } = {
  "Egyéni gyógytorna/rehabilitáció": "A <strong>sportrehabilitáció</strong> célja, hogy a sérülést követően a sportoló - legyen hobbi vagy élsportoló - minél gyorsabban, biztonságosan és teljes értékűen térhessen vissza az edzéshez vagy versenyzéshez. A kezelés nem csupán a fájdalomcsillapításról szól, hanem a teljes funkció helyreállításáról és a sérülés újbóli kialakulásának minimalizálásáról. A sportrehabilitáció során személyre szabott kezelési tervet készítünk, melyben ötvözzük a manuálterápiát, funkcionális gyakorlatokat. Megtanítjuk a helyes mozgásmintákat, javítjuk a mobilitást, koordinációt, stabilitást, dinamikát és az erőnlétet -legyen szó húzódásról, szalagsérülésekről, műtét utáni állapotról vagy túlterheléses problémákról.",
  "TMI (Állkapocs ízületi) terápia": "Az <strong>állkapocs-ízületi</strong> terápia a rágóízület (TMJ – temporomandibuláris ízület) működésének helyreállítására, fájdalmainak és mozgáskorlátozottságának csökkentésére irányuló speciális manuális kezelés. <br>A mindennapi stressz, fogszorítás, fogcsikorgatás, helytelen testtartás vagy harapási rendellenességek gyakran okozhatnak állkapocs körüli fájdalmat, kattogást, fejfájást, fülzúgást vagy szájnyitási nehézségeket. Az állkapocs-ízületi terápia során célzott technikákkal kezeljük az érintett izmokat, kötőszöveteket és ízületeket – kívülről és szükség esetén a szájüregen belül is. A kezelés által segítjük az ízületi funkciók normalizálását, oldjuk az ízületben kialakult feszüléseket és javítjuk a szájnyitás szabadságát, miközben enyhítjük a fájdalmat és a kapcsolódó tüneteket.",
  "Lágy rész manuál terápia (FDM kezelések)": "Az <strong>FDM (Fascia Disztorziós Modell)</strong> terápia egy innovatív manuális kezelési módszer, amellyel a fascia (kötőszöveti hálózat) elváltozásainak helyreállítására fókuszálunk. A fascia az egész testet behálózó szövet, amely kulcsszerepet játszik a mozgásban, erőátvitelben és a testtartásban. Az FDM terápia során speciális fogásokat alkalmazunk, melynek során a fasciában kialakult letapadásokat és elmozdulásokat oldjuk, célzott pontok nyomásával és a szövetek felszakításával. A kezelések által hatékonyan enyhíthetjük a mozgásszervi panaszokat, például hát-, nyak-, váll- vagy derékfájdalmat. Az FDM terápia által gyors és látványos eredményeket érhetünk el már néhány alkalom után.",
  "Gerincpanaszok kezelése": "A <strong>gerincpanaszok</strong> napjaink egyik leggyakoribb mozgásszervi problémái közé tartoznak, érintve fiatalokat és időseket egyaránt. Hosszabb ülés, stressz, mozgáshiány vagy túlterhelés hozzájárulhatnak a gerinc szegmenseinek fájdalmához, instabilitásához, porckorong problémák kialakulásához. A célunk nem csak a tünetek enyhítése, hanem az okok feltárása és a tartós megoldás megtalálása. A gerincpanaszok kezelése komplex módon történik, manuális, mobilizációs és Core stabilizációs technikák alkalmazása által.",
  "BEMER terápia": "A <strong>BEMER terápia</strong> egy orvostechnikai eszközön alapuló fizikoterápiás módszer, amely célzott, pulzáló elektromágneses mező segítségével javítja a szervezet <strong>mikrokeringését</strong> – vagyis a hajszálerekben zajló vérárramlást. Ez kulcsfontosságú a sejtek oxigén- és tápanyagellátása, valamint a salakanyagok elszállítása szempontjából. A terápia segít a szervezet <strong>öngyógyító folyamatait aktiválni</strong>, fokozza a regenerációt, csökkenti a gyulladást és elősegíti a fizikai és mentális teljesítőképesség helyreállítását.<br><br><strong>Miben segít a BEMER terápia?</strong><br>• Sérülések, műtétek utáni gyorsabb regeneráció<br>• Krónikus fájdalmak, izomfeszülések csökkentése<br>• Keringési problémák, hideg végtagok<br>• Immunrendszer támogatása<br>• Alvászavarok, stressz tüneteinek enyhítése<br>• Sportteljesítmény és terhelhetőség javítása<br><br><strong>Hogyan zajlik a kezelés?</strong><br>A BEMER kezelés fájdalommentes, kényelmes, mindössze 8–20 percig tart. A páciens egy speciális kezelőmatracon fekszik, amely alacsony -közepes és magas intenzitású elektromágneses impulzusokat bocsát ki.",
  "Dinamikus tape": "A <strong>Dynamic Tape</strong> egy innovatív, biomechanikai szemléletű tapasz, amely nemcsak támogatja az izmokat és ízületeket, hanem aktívan segíti a mozgást is. Ellentétben a klasszikus kineziológiai tapaszokkal, a Dynamic Tape erőteljesen rugalmas, több irányban nyúlik, és képes elnyelni, majd visszaadni a mozgás során keletkező energiát.​A Dynamic Tape kontrollálja a terhelést, a mozgásmintákat és funkciókat azáltal, hogy energiát juttat a rendszerbe. Ez az első és egyetlen biomechanikai tapasz, amely közvetlenül hatással van az izmok munkájára és az ízületek mozgására.​A tapaszt hatékonyan használhatjuk ficamok és sérülések után, izmok és ízületek terhelésének csökkentésére, mozgástartomány növelésére, fájdalom csökkentésére. A Dynamic Tape-et sérülések utáni rehabilitációban, sportteljesítmény javításában, krónikus fájdalmak enyhítésében (derékfájdalom, teniszkönyök, térdfájdalom) vagy mozgásminták korrekciójában használjuk.",
  "Csoportos gerinc core edzés": "A <strong>core (törzsizomzat)</strong> a test stabilitásának alapja. Ha ezek az izmok gyengék vagy nem működnek megfelelően, a gerinc túlterhelődik – ez gyakori oka a fájdalmaknak és a sérüléseknek.<br><br>A <strong>személyre szabott core-stabilizációs program</strong> célja, hogy fokozatosan, az egyéni állapothoz igazítva építsük vissza a törzs tartóerejét. A stabil, jól koordinált izommunka megtanítása által a páciens tehermentesítheti a gerincet, javíthatja a testtartást és megelőzheti a panaszok kiújulását.<br><br><strong>Core stabilizáció elemei:</strong><br>• Mély has- és hátizmok aktiválása<br>• Légzéstechnika és testérzékelés fejlesztése<br>• Funkcionális gyakorlatok a mindennapi mozgásokhoz igazítva",
  "Gerincferdülés - Schroth terápia": "A <strong>Schroth</strong> terápia egy speciális, háromdimenziós mozgásterápia, amely a gerincferdülés (scoliosis) és más tartáshibák célzott kezelésére szolgál. Ez a terápia az egyik leghatékonyabb konzervatív kezelési formának számít a gerincdeformitások korrigálásában. A terápia során a páciens megtanulja a saját testtartási mintáinak tudatos korrekcióját, speciális légzőgyakorlatokkal és izomaktiválással kombinálva. A kezelés célja, hogy javítsuk a gerinc helyzetét, csökkentsük az aszimmetriát, enyhítsük a fájdalmat és megelőzzük a ferdülés romlását."
};

// SERVICE MAPPING - SCROLLTILES -> GRID MAPPING
const SERVICE_MAPPING: { [key: string]: string } = {
  "Sport rehabilitáció és műtétek utáni rehabilitáció": "Egyéni gyógytorna/rehabilitáció",
  "Állkapocs ízületi terápia": "TMI (Állkapocs ízületi) terápia",
  "Manuál fascia kezelések": "Lágy rész manuál terápia (FDM kezelések)",
  "Gerincpanaszok kezelése": "Gerincpanaszok kezelése",
  "BEMER terápia": "BEMER terápia",
  "Dinamikus tape": "Dinamikus tape",
  "Egyéni és csoportos foglalkozások": "Csoportos gerinc core edzés"
};

export default function ServicesSection() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  // Figyelj URL hash változásokat
  // Figyelj URL hash változásokat
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#detail-')) {
      const serviceName = decodeURIComponent(hash.replace('#detail-', ''));
      
      // Nyisd ki a service-t
      setExpandedServices(new Set([serviceName]));
      
      // Scroll a KONKRÉT KÁRTYÁHOZ
      setTimeout(() => {
        // Keressük meg a kártya indexét
        const serviceIndex = SERVICES.findIndex(s => s.name === serviceName);
        
        if (serviceIndex !== -1) {
          // Keressük meg a kártyát ID alapján
          const cardElement = document.querySelector(`[data-service-name="${serviceName}"]`);
          
          if (cardElement) {
            cardElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',  // A KÁRTYA kerül középre
              inline: 'nearest' 
            });
          }
        }
      }, 300); // Több idő a DOM frissüléshez
    }
  };

    // Initial check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


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
      <ServiceSchema />
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
      <section id="services-details" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
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

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {SERVICES.map((service, index) => (
              <div
                key={`service-${index}`}
                data-service-name={service.name}
                className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 border border-white/20 ${
                  expandedServices.has(service.name) 
                    ? 'shadow-2xl -translate-y-2'  // ← EXPANDED állapot: mintha hover lenne
                    : 'hover:shadow-2xl hover:-translate-y-2'  // ← CSAK hover esetén
                }`}
              >
                <div 
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                    expandedServices.has(service.name)
                      ? 'opacity-100'  // ← EXPANDED: mindig látszik
                      : 'opacity-0 group-hover:opacity-100'  // ← CSAK hover esetén
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${service.color || '#004A6D'}15, transparent)`
                  }}
                />

                <div className="relative z-10 p-6">
                  <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 min-h-[3.5rem] flex items-center ${
                    expandedServices.has(service.name) 
                      ? 'text-[#EC7007]'
                      : 'text-gray-900 group-hover:text-[#004A6D]'
                  }`}>
                    {service.name}
                  </h3>

                   <div 
                      className={`h-1 rounded-full mb-4 transition-all duration-500 ${
                        expandedServices.has(service.name)
                          ? 'w-full'  // ← EXPANDED: teljes szélesség
                          : 'w-12 group-hover:w-full'  // ← CSAK hover esetén nő
                      }`}
                      style={{ backgroundColor: service.color || '#004A6D' }}
                    />

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

                  <button
                    onClick={() => toggleServiceExpansion(service.name)}
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                      expandedServices.has(service.name)
                        ? 'bg-[#004A6D] text-white hover:bg-[#EC7007]'
                        : 'bg-[#004A6D]/20 text-[#004A6D] hover:bg-[#EC7007] hover:text-white'
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
                Ismerje meg{" "}
                <Link 
                  href="/bemutatkozas" 
                  className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                >
                  tapasztalt fizioterapeutánkat
                </Link>, vagy vegye fel velünk a kapcsolatot egy ingyenes konzultációért!
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

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </section>
    </>
  );
}
