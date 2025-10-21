"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HeartPulse, Activity, User, Baby, HandHeart, Users } from "lucide-react";

const services = [
  { 
    title: "Sport rehabilitáció és műtétek utáni rehabilitáció", 
    desc: "A sportrehabilitáció célja, hogy a sportolók a sérüléseket követően minél gyorsabban és biztonságosan visszatérhessenek a sporttevékenységhez. Személyre szabott programokkal segítjük az izomerő, ízületi mozgékonyság, koordináció és állóképesség fokozatos helyreállítását.", 
    icon: <HeartPulse className="h-7 w-7" />, 
    color: "#163e72",
    image: "/sportrehab.jpg"
  },
  { 
    title: "Állkapocs ízületi", 
    desc: "Az állkapocsízületi kezelés célja a fájdalom csökkentése és az ízület természetes mozgásának helyreállítása. Személyre szabott terápiás gyakorlatokkal, manuális technikákkal és szükség esetén kiegészítő kezelésekkel segítjük az állkapocs működésének harmonizálását és a mindennapi komfort visszanyerését.", 
    icon: <HeartPulse className="h-7 w-7" />, 
    color: "#163e72",
    image: "/allkapocs.jpg"
  },
  { 
    title: "Manuál fascia kezelések", 
    desc: "A manuál- és fasciakezelések célja a mozgásszervi fájdalmak enyhítése és a test természetes egyensúlyának helyreállítása. Finom, célzott fogásokkal oldjuk az izmok, ízületek és kötőszövetek feszüléseit, javítjuk a keringést és elősegítjük a regenerációt, hogy a test szabadabban és fájdalommentesebben mozoghasson.",
    icon: <Activity className="h-7 w-7" />, 
    color: "#125341",
    image: "/kinesio.png"
  },
  { 
    title: "Gerinc- és ízületi panaszok kezelése", 
    desc: "A kezelések célja a fájdalom csökkentése, a mozgékonyság helyreállítása és a testtartás javítása. Személyre szabott terápiás módszerekkel — például gyógytornával, manuális technikákkal és stabilizáló gyakorlatokkal — segítjük a gerinc és az ízületek egészséges működésének visszaállítását, valamint a panaszok kiújulásának megelőzését.",
    icon: <HandHeart className="h-7 w-7" />, 
    color: "#7e2c40",
    image: "/bosu.png"
  },
  { 
    title: "BEMER - terápia", 
    desc: "A BEMER-terápia egy innovatív, pulzáló elektromágneses mezőn alapuló kezelés, amely javítja a sejtek vérellátását és anyagcseréjét. Segíti a regenerációt, csökkenti a gyulladást és a fájdalmat, valamint támogatja a szervezet öngyógyító folyamatait. Kiváló kiegészítője lehet a sport- és rehabilitációs kezeléseknek.",
    icon: <User className="h-7 w-7" />, 
    color: "#362a5b",
    image: "/manual.png"
  },
  { 
    title: "Egyéni és csoportok foglalkozások", 
    desc: "Az egyéni foglalkozások során a kezelés teljes mértékben a páciens igényeihez és aktuális állapotához igazodik, így gyorsabb és hatékonyabb eredmény érhető el. A csoportos foglalkozások motiváló légkört teremtenek, segítik a rendszeres mozgást és a közösségi élményt, miközben szakember irányítása mellett zajlanak a gyakorlatok.",
    icon: <Baby className="h-7 w-7" />, 
    color: "#633b1c",
    image: "/flossing.png"
  }
];

export default function ServiceSlider() {
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrent((prev) => Math.max(prev - 1, 0));
      if (e.key === "ArrowRight") setCurrent((prev) => Math.min(prev + 1, services.length - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Reset image loaded state when current changes
  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  // Scroll to active card on mobile
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

  return (
    // TELJES SZÉLESSÉGŰ DESKTOP VERZIÓ
    <section className="w-full px-0 py-6 md:py-14">
      <div className="w-full rounded-none md:rounded-3xl bg-gradient-to-br from-black to-blue-950 p-4 md:p-14 xl:p-24 relative flex flex-col min-h-[390px] md:min-h-[500px] overflow-hidden">

        {/* Background Image with Smooth Transition */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <Image
            src={services[current].image}
            alt={services[current].title}
            fill
            className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-25' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            priority={current === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/85 to-green-950/80" />
        </div>

        {/* Desktop: Split Layout - TELJES SZÉLESSÉGŰ */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 items-center flex-1 relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Left Side: Service Image */}
          <div className="col-span-2 relative h-80 lg:h-96 rounded-2xl overflow-hidden group">
            <Image
              src={services[current].image}
              alt={services[current].title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 1200px) 400px, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Right Side: Content */}
          <div className="col-span-3 flex flex-col justify-center text-left pl-4">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-2 leading-tight">
              {services[current].title}
            </h1>
            <h2 className="text-3xl xl:text-4xl font-extrabold mb-4"
              style={{ color: services[current].color }}>
              
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              {services[current].desc}
            </p>
          </div>
        </div>

        {/* Mobile: Original Layout */}
        <div className="md:hidden flex flex-col items-center justify-center text-center w-full relative z-10 flex-1">
          <span className="uppercase tracking-widest text-xs text-gray-300 mb-2 font-semibold">
            {services[current].title.split(" ")[0]}
          </span>
          <div className="h-[4.5rem] flex items-center justify-center mb-2 px-4">
            <h1 className="text-3xl font-extrabold text-white leading-tight text-center line-clamp-2">
              {services[current].title}
            </h1>
          </div>
          <h2 className="text-2xl font-extrabold mb-4 text-center"
            style={{ color: services[current].color }}>
            
          </h2>
          <div className="h-[7rem] overflow-y-auto">
            <p className="text-xs text-gray-200 max-w-sm mx-auto leading-snug text-center px-2">
              {services[current].desc}
            </p>
          </div>
        </div>

        {/* Navigation with Image Thumbnails - KÖZÉPRE IGAZÍTVA */}
        <div className="w-full mt-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {isMobile ? (
              // MOBILE: Enhanced horizontal slider
              <div
                ref={sliderRef}
                className="flex gap-3 overflow-x-auto no-scrollbar px-1 py-2"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollSnapType: "x mandatory"
                }}
              >
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    aria-label={service.title}
                    tabIndex={0}
                    className={`relative flex flex-col items-center justify-end min-w-[120px] max-w-[120px] h-32 rounded-2xl overflow-hidden
                      transition-all duration-400 group
                      ${idx === current ? "card-active border-2 border-white shadow-lg scale-105 z-10" : "border border-transparent opacity-60 scale-95"}
                    `}
                    onClick={() => setCurrent(idx)}
                    style={{ scrollSnapAlign: "center" }}
                  >
                    {/* Thumbnail Background */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: idx === current
                            ? `linear-gradient(135deg, ${service.color}70, #00000090)`
                            : `linear-gradient(135deg, ${service.color}50, #00000070)`,
                        }}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-end h-full pb-3">
                      <div className="flex items-center justify-center mb-2 mt-4 text-white">
                        {service.icon}
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">{service.title.split(" ")[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // DESKTOP: Enhanced cards with thumbnails - KÖZÉPRE IGAZÍTVA
              <div className="flex flex-row items-end gap-3 md:gap-6 mt-auto justify-center w-full">
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    aria-label={service.title}
                    tabIndex={0}
                    className={`group transition-all duration-400 rounded-2xl flex flex-col items-center justify-end min-w-[112px] h-40 relative overflow-hidden
                      ${idx === current
                        ? "border-2 border-white shadow-lg scale-105 z-10"
                        : "border border-transparent opacity-40 scale-95 hover:opacity-70 hover:scale-100"
                      }
                    `}
                    onClick={() => setCurrent(idx)}
                  >
                    {/* Thumbnail Background */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="112px"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: idx === current
                            ? `linear-gradient(135deg, ${service.color}80, #00000090)`
                            : `linear-gradient(135deg, ${service.color}60, #00000080)`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-end h-full pb-3">
                      <div className="flex items-center justify-center mb-2 mt-4 text-white group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div className="text-sm font-semibold text-white mb-1">{service.title.split(" ")[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
