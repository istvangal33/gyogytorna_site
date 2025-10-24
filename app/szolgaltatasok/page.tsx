'use client';

import { useState } from 'react';
import ScrollTiles from '../../components/ScrollTiles';

interface PriceItem {
  name: string;
  duration?: string;
  price: number;
}

const SERVICES: PriceItem[] = [
  { name: "Egyéni gyógytorna/rehabilitáció", duration: "50 P", price: 15000 },
  { name: "Lágy rész manuál terápia (FDM kezelések)", duration: "50 P", price: 16000 },
  { name: "Schroth terápia", duration: "50 P", price: 15000 },
  { name: "TMI (Állkapocs ízületi) terápia", duration: "50 P", price: 15000 },
  { name: "Komplex rehabilitáció", duration: "50 P", price: 17000 },
  { name: "Csoportos gerinc core edzés", duration: "50 P", price: 7000 },
  { name: "Kinesiológiai tape", price: 5000 },
  { name: "Dinamikus tape", price: 7500 },
];

// Szolgáltatás leírások
const SERVICE_DESCRIPTIONS: { [key: string]: string } = {
  "Egyéni gyógytorna/rehabilitáció": "Személyre szabott gyógytorna kezelés, amely a páciens egyedi szükségleteihez igazodik. A kezelés magában foglalja a mozgásfunkció javítását, fájdalomcsillapítást és az erőnlét helyreállítását.",
  "Lágy rész manuál terápia (FDM kezelések)": "Fascial Distortion Model alapú kezelés, amely a fascialis rendszer diszfunkcióit kezeli speciális manuális technikákkal. Hatékonyan csökkenti a fájdalmat és javítja a mobilitást.",
  "Schroth terápia": "Specifikus háromdimenziós gerincegyenesítő gyakorlatrendszer scoliosis és egyéb gerincdeformitások kezelésére. A terápia javítja a testtartást és csökkenti a gerinc görbületét.",
  "TMI (Állkapocs ízületi) terápia": "Temporomandibularis ízületi diszfunkciók kezelése, amely magában foglalja az állkapocs mozgászavarainak, fájdalmának és egyéb tüneteinek kezelését.",
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg 
      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ServiceCard = ({ 
    item, 
    isExpanded, 
    onToggle, 
    description 
  }: { 
    item: PriceItem; 
    isExpanded: boolean; 
    onToggle: () => void;
    description?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#EC7007] focus:ring-offset-2 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[#004a6d] mb-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {item.duration && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                  </svg>
                  {item.duration}
                </span>
              )}
              <span className="text-xl font-bold text-[#EC7007]">
                {formatPrice(item.price)} Ft
              </span>
            </div>
          </div>
          <ChevronIcon isExpanded={isExpanded} />
        </div>
      </button>
      
      {/* Expandálható tartalom */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-700 leading-relaxed">
              {description || "A szolgáltatás részletes leírása hamarosan elérhető lesz."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        {/* Dekoratív hullámos alj */}
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
              Bemutatkozás
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Komplex fizioterápiás megoldások minden igényre – egyénre szabott kezelésekkel
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE SLIDER */}
      <ScrollTiles />
      
      {/* PRICING SECTION - CSAK SZOLGÁLTATÁSOK */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Szolgáltatások részletesen
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Professzionális fizioterápiás szolgáltatások egyénre szabottan
            </p>
          </div>

          {/* Egyéni Szolgáltatások - TELJES SZÉLESSÉG */}
          <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#EC7007] to-[#FFB347] rounded-xl flex items-center justify-center mr-4 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Szolgáltatásaink</h3>
            </div>
            
            <div className="space-y-4">
              {SERVICES.map((service, index) => (
                <ServiceCard
                  key={`service-${index}`}
                  item={service}
                  isExpanded={expandedServices.has(service.name)}
                  onToggle={() => toggleServiceExpansion(service.name)}
                  description={SERVICE_DESCRIPTIONS[service.name]}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
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
