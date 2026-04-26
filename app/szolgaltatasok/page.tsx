'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollTiles from '../../components/ScrollTiles';

/* ------------------------------------------------------------------ */
/*  Structured Data – Services                                        */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Structured Data – FAQ                                             */
/* ------------------------------------------------------------------ */
function ServicesFAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Mikor forduljak gyógytornászhoz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ha bármilyen mozgásszervi fájdalma van (derék, nyak, váll, térd), sportsérülés érte, műtét utáni rehabilitációra szorul, vagy tartáshibákat szeretne korrigálni. Beutaló nélkül is felkereshet minket."
        }
      },
      {
        "@type": "Question",
        "name": "Mi a különbség a gyógytorna és a fizioterápia között?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fizioterápia a tágabb fogalom, amely magában foglalja a gyógytornát is. A gyógytorna célzott mozgásgyakorlatokra fókuszál, míg a fizioterápia egyéb kezelési módszereket is tartalmaz, mint a manuálterápia, fizikoterápia (pl. BEMER) és a funkcionális tréning."
        }
      },
      {
        "@type": "Question",
        "name": "Hány alkalom szükséges a javuláshoz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ez egyénenként változó. Akut panaszoknál gyakran 3-5 alkalom is jelentős javulást hoz, krónikus problémáknál általában 8-15 kezelés szükséges. Az első alkalommal felállított kezelési terv tartalmazza a várható időtartamot."
        }
      },
      {
        "@type": "Question",
        "name": "Milyen panaszokkal fordulhatok a ReStart Physio rendelőbe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Derékfájdalom, nyakfájdalom, porckorongsérv, gerincferdülés, sportsérülések, műtét utáni rehabilitáció, SI ízületi panaszok, állkapocs ízületi problémák, krónikus fájdalmak és tartáshibák kezelésében segítünk."
        }
      },
      {
        "@type": "Question",
        "name": "Sportolóként is fordulhatok Önökhöz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Igen, kifejezetten! Forrás Fernanda közel 10 évig dolgozott élsportolókkal – a Győri ETO FC labdarúgóival, kézilabdázókkal és atlétákkal. A sportrehabilitáció az egyik fő szakterületünk."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
interface PriceItem {
  name: string;
  slug: string;
  color?: string;
}

const SERVICES: PriceItem[] = [
  { name: "Egyéni gyógytorna/rehabilitáció", slug: "sportrehabilitacio", color: "#004A6D" },
  { name: "TMI (Állkapocs ízületi) terápia", slug: "tmi-terapia", color: "#004A6D" },
  { name: "Lágy rész manuál terápia (FDM kezelések)", slug: "manualterapia-fdm", color: "#004A6D" },
  { name: "Gerincpanaszok kezelése", slug: "gerincpanaszok-kezelese", color: "#004A6D" },
  { name: "BEMER terápia", slug: "bemer-terapia", color: "#004A6D" },
  { name: "Dinamikus tape", slug: "dinamikus-tape", color: "#004A6D" },
  { name: "Csoportos gerinc core edzés", slug: "core-edzes", color: "#004A6D" },
  { name: "Gerincferdülés - Schroth terápia", slug: "schroth-terapia", color: "#004A6D" },
];

const SERVICE_DESCRIPTIONS: { [key: string]: string } = {
  "Egyéni gyógytorna/rehabilitáció": "A <strong>sportrehabilitáció</strong> célja, hogy a sérülést követően a sportoló – legyen hobbi vagy élsportoló – minél gyorsabban, biztonságosan és teljes értékűen térhessen vissza az edzéshez vagy versenyzéshez. Győri rendelőnkben a kezelés nem csupán a fájdalomcsillapításról szól, hanem a teljes funkció helyreállításáról és a sérülés újbóli kialakulásának minimalizálásáról.<br><br>A <strong>sportrehabilitáció és gyógytorna</strong> során személyre szabott kezelési tervet készítünk, melyben ötvözzük a manuálterápiát és a funkcionális gyakorlatokat. Megtanítjuk a helyes mozgásmintákat, javítjuk a mobilitást, koordinációt, stabilitást, dinamikát és az erőnlétet – legyen szó húzódásról, szalagsérülésekről, műtét utáni állapotról vagy túlterheléses problémákról.<br><br><strong>Mikor ajánlott?</strong><br>• Sportsérülések (húzódás, szalagsérülés, meniscus)<br>• Műtét utáni rehabilitáció (térd, váll, csípő, gerinc)<br>• Túlterheléses panaszok<br>• Visszatérés az edzéshez sérülés után<br><br><a href='/szolgaltatasok/sportrehabilitacio' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a sportrehabilitációról</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "TMI (Állkapocs ízületi) terápia": "Az <strong>állkapocs-ízületi (TMI) terápia</strong> a rágóízület (TMJ – temporomandibuláris ízület) működésének helyreállítására, fájdalmainak és mozgáskorlátozottságának csökkentésére irányuló speciális manuális kezelés Győrben.<br><br>A mindennapi stressz, fogszorítás, fogcsikorgatás, helytelen testtartás vagy harapási rendellenességek gyakran okozhatnak állkapocs körüli fájdalmat, kattogást, fejfájást, fülzúgást vagy szájnyitási nehézségeket. Az <strong>állkapocs-ízületi terápia</strong> során célzott technikákkal kezeljük az érintett izmokat, kötőszöveteket és ízületeket – kívülről és szükség esetén a szájüregen belül is.<br><br>A kezelés által segítjük az ízületi funkciók normalizálását, oldjuk az ízületben kialakult feszüléseket és javítjuk a szájnyitás szabadságát, miközben enyhítjük a fájdalmat és a kapcsolódó tüneteket.<br><br><a href='/szolgaltatasok/tmi-terapia' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a TMI terápiáról</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "Lágy rész manuál terápia (FDM kezelések)": "Az <strong>FDM (Fascia Disztorziós Modell) manuálterápia</strong> egy innovatív manuális kezelési módszer, amellyel a fascia (kötőszöveti hálózat) elváltozásainak helyreállítására fókuszálunk. Győri rendelőnkben ezt a technikát gyakran alkalmazzuk akut és krónikus mozgásszervi panaszok kezelésére.<br><br>A fascia az egész testet behálózó szövet, amely kulcsszerepet játszik a mozgásban, erőátvitelben és a testtartásban. Az <strong>FDM terápia</strong> során speciális fogásokat alkalmazunk, melynek során a fasciában kialakult letapadásokat és elmozdulásokat oldjuk, célzott pontok nyomásával és a szövetek felszakításával.<br><br>A kezelések által hatékonyan enyhíthetjük a mozgásszervi panaszokat, például hát-, nyak-, váll- vagy derékfájdalmat. Az FDM manuálterápia által gyors és látványos eredményeket érhetünk el már néhány alkalom után.<br><br><a href='/szolgaltatasok/manualterapia-fdm' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben az FDM manuálterápiáról</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "Gerincpanaszok kezelése": "A <strong>gerincpanaszok</strong> napjaink egyik leggyakoribb mozgásszervi problémái közé tartoznak, érintve fiatalokat és időseket egyaránt. Hosszabb ülés, stressz, mozgáshiány vagy túlterhelés hozzájárulhatnak a gerinc szegmenseinek fájdalmához, instabilitásához, porckorong problémák kialakulásához.<br><br>Győri <strong>fizioterápiás</strong> rendelőnkben a célunk nem csak a tünetek enyhítése, hanem az okok feltárása és a tartós megoldás megtalálása. A <strong>gerincpanaszok kezelése</strong> komplex módon történik: manuális technikák, mobilizációs módszerek és core stabilizációs gyakorlatok alkalmazásával.<br><br><strong>Gyakori gerincpanaszok, amiket kezelünk:</strong><br>• Porckorongsérv és porckorong-előboltozódás<br>• Derékfájdalom és hátfájás<br>• Nyaki gerinc panaszok, nyakmerevség<br>• SI ízületi (keresztcsont-csípőízületi) diszfunkció<br>• Ülőideg-becsípődés (isiász)<br>• Tartáshibák és gerincinstabilitás<br><br><a href='/szolgaltatasok/gerincpanaszok-kezelese' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a gerincpanaszok kezeléséről</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "BEMER terápia": "A <strong>BEMER terápia</strong> egy orvostechnikai eszközön alapuló fizikoterápiás módszer, amely célzott, pulzáló elektromágneses mező segítségével javítja a szervezet mikrokeringését és aktiválja az öngyógyító folyamatokat. <br><br>Győri rendelőnkben önállóan vagy más kezelésekkel (pl. gyógytornával, manuálterápiával) kombinálva alkalmazzuk. Kiváló és fájdalommentes megoldás krónikus fájdalmak, sportsérülések, műtét utáni állapotok és keringési problémák kezelésére. A gyorsabb felépülés érdekében a készülék otthonra is bérelhető!<br><br><a href='/szolgaltatasok/bemer-terapia' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a BEMER terápiáról és bérlésről</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",
  
  "Dinamikus tape": "A <strong>Dynamic Tape</strong> egy innovatív, biomechanikai szemléletű tapasz, amely nemcsak támogatja az izmokat és ízületeket, hanem aktívan segíti a mozgást is. Győri rendelőnkben a dinamikus tape-et és a kineziológiai tape-et egyaránt alkalmazzuk.<br><br>Ellentétben a klasszikus kineziológiai tapaszokkal, a Dynamic Tape erőteljesen rugalmas, több irányban nyúlik, és képes elnyelni, majd visszaadni a mozgás során keletkező energiát. Ez az első és egyetlen biomechanikai tapasz, amely közvetlenül hatással van az izmok munkájára és az ízületek mozgására.<br><br><strong>Mikor alkalmazzuk?</strong><br>• Ficamok és sérülések utáni támogatás<br>• Izmok és ízületek terhelésének csökkentése<br>• Mozgástartomány növelése, fájdalom csökkentése<br>• Sportteljesítmény javítása<br>• Krónikus panaszok (derékfájdalom, teniszkönyök, térdfájdalom)<br>• Mozgásminták korrekciója<br><br><a href='/szolgaltatasok/dinamikus-tape' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a dinamikus tape-ről</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "Csoportos gerinc core edzés": "A <strong>core (törzsizomzat)</strong> a test stabilitásának alapja. Ha ezek az izmok gyengék vagy nem működnek megfelelően, a gerinc túlterhelődik – ez gyakori oka a fájdalmaknak és a sérüléseknek.<br><br>Győri rendelőnkben <strong>kiscsoportos core edzéseket</strong> tartunk, ahol a személyre szabott core-stabilizációs program célja, hogy fokozatosan, az egyéni állapothoz igazítva építsük vissza a törzs tartóerejét. A stabil, jól koordinált izommunka megtanítása által a páciens tehermentesítheti a gerincet, javíthatja a testtartást és megelőzheti a panaszok kiújulását.<br><br><strong>Core stabilizáció elemei:</strong><br>• Mély has- és hátizmok aktiválása<br>• Légzéstechnika és testérzékelés fejlesztése<br>• Funkcionális gyakorlatok a mindennapi mozgásokhoz igazítva<br>• Gerinc core edzés csoportosan, szakmai felügyelettel<br><br><a href='/szolgaltatasok/core-edzes' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a core edzésről</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>",

  "Gerincferdülés - Schroth terápia": "A <strong>Schroth terápia</strong> egy speciális, háromdimenziós mozgásterápia, amely a gerincferdülés (scoliosis) és más tartáshibák célzott kezelésére szolgál. Győri rendelőnkben ez az egyik legkeresettebb szolgáltatásunk fiatal és felnőtt páciensek körében egyaránt.<br><br>A <strong>Schroth terápia</strong> az egyik leghatékonyabb konzervatív kezelési formának számít a gerincdeformitások korrigálásában. A terápia során a páciens megtanulja a saját testtartási mintáinak tudatos korrekcióját, speciális légzőgyakorlatokkal és izomaktiválással kombinálva.<br><br><strong>A Schroth terápia célja:</strong><br>• A gerinc helyzetének javítása<br>• Az aszimmetria csökkentése<br>• A fájdalom enyhítése<br>• A ferdülés romlásának megelőzése<br>• Tudatos testtartás kialakítása a mindennapokban<br><br><a href='/szolgaltatasok/schroth-terapia' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>Bővebben a Schroth terápiáról</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>"
};

const SERVICE_MAPPING: { [key: string]: string } = {
  "Sport rehabilitáció és műtétek utáni rehabilitáció": "Egyéni gyógytorna/rehabilitáció",
  "Állkapocs ízületi terápia": "TMI (Állkapocs ízületi) terápia",
  "Manuál fascia kezelések": "Lágy rész manuál terápia (FDM kezelések)",
  "Gerincpanaszok kezelése": "Gerincpanaszok kezelése",
  "BEMER terápia": "BEMER terápia",
  "Dinamikus tape": "Dinamikus tape",
  "Egyéni és csoportos foglalkozások": "Csoportos gerinc core edzés",
  "Gerincferdülés - Schroth terápia": "Gerincferdülés - Schroth terápia"
};

/* ------------------------------------------------------------------ */
/*  Fő komponens                                                      */
/* ------------------------------------------------------------------ */
export default function ServicesSection() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let serviceName = '';

      if (hash.startsWith('#detail-')) {
        serviceName = decodeURIComponent(hash.replace('#detail-', ''));
      } else if (hash.length > 1) {
        const slug = hash.replace('#', '');
        const matched = SERVICES.find(s => s.slug === slug);
        if (matched) {
          serviceName = matched.name;
        }
      }

      if (serviceName) {
        setExpandedServices(new Set([serviceName]));

        setTimeout(() => {
          const cardElement = document.querySelector(`[data-service-name="${serviceName}"]`);

          if (cardElement) {
            cardElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }, 300);
      }
    };

    handleHashChange();

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
      <ServicesFAQSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://restartphysio.hu" },
            { "@type": "ListItem", "position": 2, "name": "Szolgáltatások", "item": "https://restartphysio.hu/szolgaltatasok" }
          ]
        }) }}
      />

      {/* ============================================================== */}
      {/* HERO SECTION                                                    */}
      {/* ============================================================== */}
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-4">
              Gyógytorna és Fizioterápia Szolgáltatások Győrben
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Gyógytorna, fizioterápia és sportrehabilitáció Győrben – egyénre szabott kezelésekkel
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SERVICE SLIDER                                                  */}
      {/* ============================================================== */}
      
        <ScrollTiles />

      {/* ============================================================== */}
      {/* SZOLGÁLTATÁSOK GRID                                             */}
      {/* ============================================================== */}
      <section id="services-details" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Szolgáltatások részletesen
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Professzionális fizioterápiás szolgáltatások egyénre szabottan
            </p>
          </div>

          <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start scroll-mt-8">
            {SERVICES.map((service, index) => (
              <div
                key={`service-${index}`}
                id={service.slug}
                data-service-name={service.name}
                className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 border border-white/20 ${
                  expandedServices.has(service.name)
                    ? 'shadow-2xl -translate-y-2'
                    : 'hover:shadow-2xl hover:-translate-y-2'
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                    expandedServices.has(service.name)
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${service.color || '#004A6D'}15, transparent)`
                  }}
                />

                <div className="relative z-10 p-6">
                  <h3
                    className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 min-h-[3.5rem] flex items-center ${
                      expandedServices.has(service.name)
                        ? 'text-[#EC7007]'
                        : 'text-gray-900 group-hover:text-[#004A6D]'
                    }`}
                  >
                    {service.name}
                  </h3>

                  <div
                    className={`h-1 rounded-full mb-4 transition-all duration-500 ${
                      expandedServices.has(service.name)
                        ? 'w-full'
                        : 'w-12 group-hover:w-full'
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

          {/* ============================================================ */}
          {/* CTA                                                          */}
          {/* ============================================================ */}
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
                </Link>, vagy vegye fel velünk a kapcsolatot!
              </p>
              <a
                href="/elerhetoseg#contact"
                className="inline-flex items-center gap-2 bg-[#0f1f29] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d4610a] transition-colors duration-200 shadow-sm hover:shadow-md hover:scale-105 transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kapcsolatfelvétel
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FAQ SZEKCIÓ                                                   */}
          {/* ============================================================ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Gyakran Ismételt Kérdések
            </h2>

            <div className="space-y-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Mikor forduljak gyógytornászhoz?
                </h3>
                <p className="text-gray-700">
                  Ha bármilyen mozgásszervi fájdalma van (derék, nyak, váll, térd),
                  sportsérülés érte, műtét utáni rehabilitációra szorul, vagy tartáshibákat
                  szeretne korrigálni. Beutaló nélkül is felkereshet minket.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Mi a különbség a gyógytorna és a fizioterápia között?
                </h3>
                <p className="text-gray-700">
                  A fizioterápia a tágabb fogalom, amely magában foglalja a gyógytornát is.
                  A gyógytorna célzott mozgásgyakorlatokra fókuszál, míg a fizioterápia egyéb
                  kezelési módszereket is tartalmaz, mint a{" "}
                  <a
                    href="#manualterapia-fdm"
                    className="text-[#004a6d] font-semibold hover:text-[#EC7007] transition-colors"
                  >
                    manuálterápia
                  </a>, fizikoterápia (pl.{" "}
                  <a
                    href="#bemer-terapia"
                    className="text-[#004a6d] font-semibold hover:text-[#EC7007] transition-colors"
                  >
                    BEMER
                  </a>) és a funkcionális tréning.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Hány alkalom szükséges a javuláshoz?
                </h3>
                <p className="text-gray-700">
                  Ez egyénenként változó. Akut panaszoknál gyakran 3–5 alkalom is jelentős
                  javulást hoz, krónikus problémáknál általában 8–15 kezelés szükséges.
                  Az első alkalommal felállított kezelési terv tartalmazza a várható időtartamot.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Milyen panaszokkal fordulhatok a ReStart Physio rendelőbe?
                </h3>
                <p className="text-gray-700">
                  Derékfájdalom, nyakfájdalom, porckorongsérv, gerincferdülés, sportsérülések,
                  műtét utáni rehabilitáció, SI ízületi panaszok, állkapocs ízületi problémák,
                  krónikus fájdalmak és tartáshibák kezelésében segítünk.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Sportolóként is fordulhatok Önökhöz?
                </h3>
                <p className="text-gray-700">
                  Igen, kifejezetten! Forrás Fernanda közel 10 évig dolgozott élsportolókkal
                  – a Győri ETO FC labdarúgóival, kézilabdázókkal és atlétákkal. A{" "}
                  <a
                    href="#sportrehabilitacio"
                    className="text-[#004a6d] font-semibold hover:text-[#EC7007] transition-colors"
                  >
                    sportrehabilitáció
                  </a>{" "}
                  az egyik fő szakterületünk.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ÖSSZEFOGLALÓ SZÖVEG – SEO                                    */}
          {/* ============================================================ */}
          <div className="mt-20 max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Gyógytorna és Fizioterápia Győrben
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A ReStart Physio rendelőben Győrben komplex fizioterápiás és gyógytorna
              szolgáltatásokat kínálunk. Legyen szó sportrehabilitációról, gerincpanaszok
              kezeléséről, SI ízületi terápiáról, BEMER terápiáról vagy Schroth
              terápiáról – minden kezelést egyénre szabottan, szakszerűen végzünk.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rendelőnk a Győr, Máté Mária u. 4b szám alatt található. Fizikoterápiás
              és manuálterápiás kezeléseink célja nem csupán a tünetek enyhítése,
              hanem az okok feltárása és a tartós javulás elérése.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/arak"
                className="inline-flex items-center justify-center gap-2 bg-[#004A6D]/10 text-[#004A6D] px-6 py-3 rounded-lg font-semibold hover:bg-[#0f1f29] hover:text-white transition-all duration-300"
              >
                Áraink megtekintése
              </Link>
              <Link
                href="/elerhetoseg#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#EC7007] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d4610a] transition-colors duration-200"
              >
                Időpontfoglalás
              </Link>
            </div>
          </div>

        </div>

        {/* Dekoratív körök */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </section>
    </>
  );
}