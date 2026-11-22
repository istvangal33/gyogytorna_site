'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollTiles from '../../components/ScrollTiles';

/* ------------------------------------------------------------------ */
/*  Structured Data – Services                                        */
/* ------------------------------------------------------------------ */
function ServiceSchema() {
  const servicesSchema = SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": s.tipus,
    "name": s.name,
    "description": s.leiras.replace(/<[^>]+>/g, ''),
    "url": `https://restartphysio.hu/szolgaltatasok/${s.slug}`,
    "provider": { "@id": "https://restartphysio.hu/#organization" }
  }));

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
        "name": "Milyen panaszokkal fordulhatok a ReStart Physio rendelőbe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Derékfájdalom, nyakfájdalom, porckorongsérv, gerincferdülés, sportsérülések, műtét utáni rehabilitáció, SI ízületi panaszok, állkapocsízületi problémák, krónikus fájdalmak és tartáshibák kezelésében segítünk."
        }
      },
      {
        "@type": "Question",
        "name": "Sportolóként is fordulhatok Önökhöz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Igen, kifejezetten! Forrás Fernanda hat évig dolgozott élsportolókkal – a Győri ETO FC labdarúgóival, kézilabdázókkal és atlétákkal. A sportrehabilitáció az egyik fő szakterületünk."
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
  tipus: string;
  /** 2–3 mondat, ami NEM az aloldal szövege: ha az lenne, a Google a gyűjtőoldalt
      adná az aloldal kulcsszavára (így maradt le az FDM-oldal a „manuálterápia győr”-ről). */
  leiras: string;
  link: string;
}

const SERVICES: PriceItem[] = [
  {
    name: "Egyéni gyógytorna/rehabilitáció", slug: "egyeni-gyogytorna", color: "#004A6D", tipus: "Physiotherapy",
    leiras: "Az <strong>egyéni gyógytorna</strong> a rendelő alapszolgáltatása derék-, nyak-, váll- és térdpanaszokra, műtét utáni rehabilitációra és tartáshibákra. Az első, 50 perces alkalommal állapotfelmérés után már kezelünk, és olyan gyakorlatokat tanítunk, amelyeket otthon is végezhet. Beutaló nem szükséges.",
    link: "Az egyéni gyógytorna részletesen",
  },
  {
    name: "Sportrehabilitáció", slug: "sportrehabilitacio", color: "#004A6D", tipus: "Physiotherapy",
    leiras: "A <strong>sportrehabilitáció</strong> hobbi- és élsportolóknak szól, sportsérülés vagy keresztszalag-műtét után. Fokozatosan építjük vissza az erőt, a stabilitást és a sportágra jellemző mozgásokat, lépésről lépésre a visszatérésig. Fernanda hat évig élsportolók gyógytornásza volt.",
    link: "A sportrehabilitáció részletesen",
  },
  {
    name: "TMI (állkapocsízületi) terápia", slug: "tmi-terapia", color: "#004A6D", tipus: "MedicalTherapy",
    leiras: "Az <strong>állkapocsízületi (TMI) terápia</strong> kattogó vagy fájó állkapocsra, fogszorításra és korlátozott szájnyitásra való manuális kezelés. Az állkapocs körüli izmokat kívülről és szükség esetén a szájüregen belül kezeljük, és otthoni gyakorlatokat is tanítunk.",
    link: "A TMI-terápia részletesen",
  },
  {
    name: "Lágyrész-manuálterápia (FDM-kezelések)", slug: "manualterapia-fdm", color: "#004A6D", tipus: "ManualTherapy",
    leiras: "Az <strong>FDM-manuálterápia</strong> kézzel végzett lágyrész-kezelés a Fascia Disztorziós Modell szerint, hát-, nyak-, váll- és derékfájdalomnál, húzódó, feszülő panaszoknál. A fogások erősek lehetnek, ezért az első alkalommal átbeszéljük, mire számíthat.",
    link: "A manuálterápia (FDM) részletesen",
  },
  {
    name: "Gerincpanaszok kezelése", slug: "gerincpanaszok-kezelese", color: "#004A6D", tipus: "Physiotherapy",
    leiras: "A <strong>gerincpanaszok kezelése</strong> derékfájásra, nyakfájásra, porckorongsérvre, isiászra és SI-ízületi panaszokra. Állapotfelméréssel kezdünk, majd célzott gyakorlatokkal, manuális technikákkal és törzsizom-erősítéssel kezelünk, otthoni programmal kiegészítve.",
    link: "A gerincpanaszok kezelése részletesen",
  },
  {
    name: "BEMER terápia", slug: "bemer-terapia", color: "#004A6D", tipus: "ElectromagneticTherapy",
    leiras: "A <strong>BEMER</strong> pulzáló elektromágneses teret használó, orvostechnikai eszközként forgalmazott készülék. Rendelőnkben gyógytorna és rehabilitáció mellett, kiegészítő kezelésként alkalmazzuk, és otthonra is bérelhető. Az aloldalon azt is leírjuk, kinek nem alkalmazható.",
    link: "BEMER-kezelés és bérlés részletesen",
  },
  {
    name: "Kineziológiai és dinamikus tape", slug: "dinamikus-tape", color: "#004A6D", tipus: "KinesiologyTaping",
    leiras: "A <strong>kineziológiai és a dinamikus tape</strong> rugalmas tapasz, amelyet a kezelések közötti időszakra rakunk fel, a mozgás támogatására. Hogy melyiket és hogyan, azt a panasz és a mozgás határozza meg; felrakás után megmutatjuk, mire figyeljen viselés közben.",
    link: "A tape-elés részletesen",
  },
  {
    name: "Csoportos gerinc core edzés", slug: "core-edzes", color: "#004A6D", tipus: "CoreStabilization",
    leiras: "A <strong>csoportos gerinc core edzés</strong> kiscsoportos foglalkozás gyógytornász vezetésével. A törzs mély izmainak erősítésére, a helyes légzésre és a mindennapi mozgásokhoz igazított gyakorlatokra épül, 30 vagy 50 perces alkalmakkal.",
    link: "A core edzés részletesen",
  },
  {
    name: "Gerincferdülés - Schroth terápia", slug: "schroth-terapia", color: "#004A6D", tipus: "ScoliosisTherapy",
    leiras: "A <strong>Schroth-terápia</strong> gerincferdülésre (scoliosisra) kidolgozott, háromdimenziós gyakorló módszer gyerekeknek és felnőtteknek. Speciális légzéssel és tudatos tartáskorrekcióval dolgozunk, a kezelőorvos javaslatait figyelembe véve, és otthoni gyakorlatokat is tanítunk.",
    link: "A Schroth-terápia részletesen",
  },
];

const SERVICE_DESCRIPTIONS: { [key: string]: string } = Object.fromEntries(
  SERVICES.map((s) => [
    s.name,
    `${s.leiras}<br><br><a href='/szolgaltatasok/${s.slug}' class='group block mt-6'><span class='flex items-center justify-between text-[#004A6D] group-hover:text-[#EC7007] font-bold text-base transition-colors duration-300'><span>${s.link}</span></span><span class='block h-1 w-full rounded-full bg-[#004A6D] group-hover:bg-[#EC7007] mt-3 transition-colors duration-300'></span></a>`,
  ])
);

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
      <section className="relative bg-linear-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
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
              Szolgáltatások és kezelések Győrben
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
      <section id="services-details" className="py-24 bg-linear-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
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
                    className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 min-h-14 flex items-center ${
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
                      expandedServices.has(service.name) ? 'max-h-500' : 'h-18'
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
                  Milyen panaszokkal fordulhatok a ReStart Physio rendelőbe?
                </h3>
                <p className="text-gray-700">
                  Derékfájdalom, nyakfájdalom, porckorongsérv, gerincferdülés, sportsérülések,
                  műtét utáni rehabilitáció, SI ízületi panaszok, állkapocsízületi problémák,
                  krónikus fájdalmak és tartáshibák kezelésében segítünk.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-[#004a6d] mb-2">
                  Sportolóként is fordulhatok Önökhöz?
                </h3>
                <p className="text-gray-700">
                  Igen, kifejezetten! Forrás Fernanda hat évig dolgozott élsportolókkal
                  – a Győri ETO FC labdarúgóival, kézilabdázókkal és atlétákkal. A{" "}
                  <a
                    href="/szolgaltatasok/sportrehabilitacio"
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
              A rendelőről röviden
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A ReStart Physio rendelőben Győrben komplex fizioterápiás és gyógytorna
              szolgáltatásokat kínálunk. Legyen szó sportrehabilitációról, gerincpanaszok
              kezeléséről,{" "}
              <Link href="/szolgaltatasok/gerincpanaszok-kezelese#si-izulet" className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors">
                SI ízületi terápiáról
              </Link>
              , BEMER terápiáról vagy Schroth
              terápiáról – minden kezelést egyénre szabottan, szakszerűen végzünk.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rendelőnk a Győr, Máté Mária u. 4b szám alatt található. Fizikoterápiás
              és manuálterápiás kezeléseink célja nem csupán a tünetek enyhítése,
              hanem a panaszt fenntartó mozgásbeli tényezők kezelése is.
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