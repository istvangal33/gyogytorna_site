"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HeartPulse, Activity, User, HandHeart, Users, Zap } from "lucide-react";

const services = [
  { 
    title: "Sport rehabilitáció és műtétek utáni rehabilitáció", 
    desc: "A sportrehabilitáció célja, hogy a sportolók a sérüléseket követően minél gyorsabban és biztonságosan visszatérhessenek a sporttevékenységhez. Személyre szabott programokkal segítjük az izomerő, ízületi mozgékonyság, koordináció és állóképesség fokozatos helyreállítását.", 
    icon: <HeartPulse className="h-6 w-6" />, 
    color: "#EC7007",
    image: "/sportrehab4.jpg"
  },
  { 
    title: "Állkapocs ízületi terápia", 
    desc: "Az állkapocsízületi kezelés célja a fájdalom csökkentése és az ízület természetes mozgásának helyreállítása. Személyre szabott terápiás gyakorlatokkal, manuális technikákkal és szükség esetén kiegészítő kezelésekkel segítjük az állkapocs működésének harmonizálását és a mindennapi komfort visszanyerését.", 
    icon: <Activity className="h-6 w-6" />, 
    color: "#004A6D",
    image: "/allkapocs3.jpg"
  },
  { 
    title: "Manuál fascia kezelések", 
    desc: "A manuál- és fasciakezelések célja a mozgásszervi fájdalmak enyhítése és a test természetes egyensúlyának helyreállítása. Finom, célzott fogásokkal oldjuk az izmok, ízületek és kötőszövetek feszüléseit, javítjuk a keringést és elősegítjük a regenerációt, hogy a test szabadabban és fájdalommentesebben mozoghasson.",
    icon: <HandHeart className="h-6 w-6" />, 
    color: "#125341",
    image: "/manual3.jpg"
  },
  { 
    title: "Gerinc- és ízületi panaszok kezelése", 
    desc: "A kezelések célja a fájdalom csökkentése, a mozgékonyság helyreállítása és a testtartás javítása. Személyre szabott terápiás módszerekkel — például gyógytornával, manuális technikákkal és stabilizáló gyakorlatokkal — segítjük a gerinc és az ízületek egészséges működésének visszaállítását, valamint a panaszok kiújulásának megelőzését.",
    icon: <User className="h-6 w-6" />, 
    color: "#7e2c40",
    image: "/gerinc_core3.jpg"
  },
  { 
    title: "BEMER terápia – Mikrokeringés javítása sejtszinten", 
    desc: "A BEMER terápia egy orvostechnikai eszközön alapuló fizikoterápiás módszer, amely célzott, pulzáló elektromágneses mező segítségével javítja a szervezet mikrokeringését – vagyis a hajszálerekben zajló vérárramlást. Ez kulcsfontosságú a sejtek oxigén- és tápanyagellátása, valamint a salakanyagok elszállítása szempontjából.", 
    icon: <Zap className="h-6 w-6" />, 
    color: "#362a5b",
    image: "/bemer3.jpg"
  },
  { 
    title: "Egyéni és csoportos foglalkozások", 
    desc: "Az egyéni foglalkozások során a kezelés teljes mértékben a páciens igényeihez és aktuális állapotához igazodik, így gyorsabb és hatékonyabb eredmény érhető el. A csoportos foglalkozások motiváló légkört teremtenek, segítik a rendszeres mozgást és a közösségi élményt, miközben szakember irányítása mellett zajlanak a gyakorlatok.",
    icon: <Users className="h-6 w-6" />, 
    color: "#633b1c",
    image: "/group_core1.jpg"
  }
];

export default function ServiceSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrent((prev) => Math.max(prev - 1, 0));
      if (e.key === "ArrowRight") setCurrent((prev) => Math.min(prev + 1, services.length - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
    setIsExpanded(false); // Reset expand amikor váltunk
  }, [current]);

  useEffect(() => {
    if (isMobile && sliderRef.current) {
      const active = sliderRef.current.querySelector(".card-active") as HTMLElement;
      if (active) {
        const slider = sliderRef.current;
        const scrollLeft = active.offsetLeft - slider.offsetWidth / 2 + active.offsetWidth / 2;
        slider.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [current, isMobile]);

  const ArrowButton = ({ direction, onClick, disabled }: { direction: 'left' | 'right', onClick: () => void, disabled: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ [direction]: '1.5rem' }}
      aria-label={direction === 'left' ? 'Előző' : 'Következő'}
    >
      <svg 
        className="w-5 h-5 text-[#004A6D] group-hover:text-[#EC7007] transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} 
        />
      </svg>
    </button>
  );

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="w-full">
        {/* FULL WIDTH SLIDER */}
        <div className="relative w-full bg-white md:rounded-none rounded-2xl shadow-xl overflow-visible h-auto md:h-[900px]">
          
          {/* ÉLES HÁTTÉRKÉP */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={services[current].image}
              alt=""
              fill
              className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-105' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              priority={current === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/88 to-blue-50/92" />
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex flex-col h-full max-w-7xl mx-auto px-12 py-16 relative z-10">
            
            {/* Fő tartalom */}
            <div className="flex items-center gap-16 flex-1">
              
              {/* Bal - KÉP */}
              <div className="w-1/2 relative h-[600px] rounded-3xl overflow-hidden group flex-shrink-0">
                <Image
                  src={services[current].image}
                  alt={services[current].title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="800px"
                />
              </div>

              {/* Jobb - Tartalom */}
              <div className="flex-1">
                <div 
                  className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white mb-6 shadow-lg"
                  style={{ backgroundColor: services[current].color }}
                >
                  {services[current].title.split(" ")[0].toUpperCase()}
                </div>
                
                <h1 className="text-4xl xl:text-6xl font-extrabold text-[#004A6D] mb-8 leading-tight">
                  {services[current].title}
                </h1>
                
                {/* LEÍRÁS - FIX 5 SOR + EXPAND */}
                <div className="relative">
                  <p className={`text-xl text-gray-700 leading-relaxed transition-all duration-300 ${
                    isExpanded ? '' : 'line-clamp-5'
                  }`}>
                    {services[current].desc}
                  </p>
                  
                  {/* TOVÁBB GOMB */}
                  {services[current].desc.length > 200 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-4 inline-flex items-center gap-2 text-[#004A6D] hover:text-[#EC7007] font-semibold transition-colors duration-200"
                    >
                      <span>{isExpanded ? 'Kevesebb' : 'Továbbiak'}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-12 pt-10 border-t border-gray-200">
              <div className="grid grid-cols-6 gap-5">
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`relative w-full h-28 rounded-xl overflow-hidden transition-all duration-300 group bg-gradient-to-br from-gray-50 to-gray-100
                      ${idx === current 
                        ? "ring-2 ring-[#EC7007] shadow-2xl" 
                        : "opacity-40 hover:opacity-100 hover:scale-105 hover:shadow-lg"
                      }
                    `}
                    aria-label={service.title}
                  >
                    <div className={`w-full h-full transition-transform duration-300 ${idx === current ? 'scale-110' : ''}`}>
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-110" 
                        sizes="200px"
                      />
                    </div>
                    
                    <div 
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(to top, ${service.color}${idx === current ? 'dd' : '99'}, transparent 60%)`
                      }}
                    />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 pointer-events-none">
                      {idx === current && (
                        <span className="text-white text-xs font-bold mt-1 drop-shadow-lg">
                          {service.title.split(" ")[0]}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden flex flex-col min-h-[600px] relative z-10">
            <div className="flex-1 flex flex-col items-center text-center justify-center p-6">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white mb-4 shadow-lg"
                style={{ backgroundColor: services[current].color }}
              >
                {services[current].icon}
                <span className="text-xs font-bold uppercase">
                  {services[current].title.split(" ")[0]}
                </span>
              </div>

              <h1 className="text-2xl font-extrabold text-[#004A6D] mb-4 leading-tight">
                {services[current].title}
              </h1>

              {/* MOBILE LEÍRÁS - FIX 4 SOR */}
              <div className="relative w-full">
                <p className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ${
                  isExpanded ? '' : 'line-clamp-4'
                }`}>
                  {services[current].desc}
                </p>
                
                {services[current].desc.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-[#004A6D] hover:text-[#EC7007] font-semibold text-sm transition-colors duration-200"
                  >
                    {isExpanded ? 'Kevesebb ↑' : 'Továbbiak ↓'}
                  </button>
                )}
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="px-3 pb-4 pt-4">
              <div
                ref={sliderRef}
                className="flex gap-2.5 overflow-x-auto pb-3 pt-3 px-2"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                  scrollPaddingLeft: "0.5rem",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none"
                }}
              >
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`relative flex-shrink-0 w-[80px] h-[80px] rounded-xl overflow-hidden transition-all duration-300
                      ${idx === current 
                        ? "card-active ring-[3px] ring-[#EC7007] shadow-xl opacity-100 scale-105" 
                        : "opacity-55 hover:opacity-85 scale-100"
                      }
                    `}
                    style={{ scrollSnapAlign: "center" }}
                    aria-label={service.title}
                  >
                    {/* ÉLES, TELJES KÉP - OBJECT-CONTAIN */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-contain p-1" 
                        quality={95}
                        sizes="80px"
                        priority={idx <= 2}
                      />
                    </div>
                    
                    {/* SZÍNES OVERLAY - CSAK ALUL */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        idx === current ? 'opacity-50' : 'opacity-70'
                      }`}
                      style={{
                        background: idx === current 
                          ? `linear-gradient(to top, #EC7007ee 0%, transparent 45%)`
                          : `linear-gradient(to top, ${service.color}dd 0%, transparent 45%)`
                      }}
                    />
                    
                    {/* KONTRASZT SZÖVEG */}
                    <div className="absolute inset-0 flex items-end justify-center pb-1.5 pointer-events-none">
                      <span 
                        className={`text-white font-extrabold transition-all duration-200 ${
                          idx === current ? 'text-[10px]' : 'text-[9px]'
                        }`}
                        style={{ 
                          textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {service.title.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* PROGRESS BAR - MOBILE ALATT */}
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mx-2 mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#EC7007] to-[#004A6D] transition-all duration-300 rounded-full"
                  style={{ width: `${((current + 1) / services.length) * 100}%` }}
                />
              </div>
            </div>

            <style jsx global>{`
              div[ref]::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Navigation Arrows */}
          <ArrowButton 
            direction="left" 
            onClick={() => setCurrent(prev => Math.max(0, prev - 1))} 
            disabled={current === 0}
          />
          <ArrowButton 
            direction="right" 
            onClick={() => setCurrent(prev => Math.min(services.length - 1, prev + 1))} 
            disabled={current === services.length - 1}
          />

          {/* Progress bar - DESKTOP */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-20">
            <div 
              className="h-full bg-gradient-to-r from-[#EC7007] to-[#004A6D] transition-all duration-300"
              style={{ width: `${((current + 1) / services.length) * 100}%` }}
            />
          </div>

        </div>


        {/* Counter */}
        <div className="text-center mt-8 text-base text-gray-500 font-medium">
          {current + 1} / {services.length}
        </div>
      </div>
    </section>
  );
}
