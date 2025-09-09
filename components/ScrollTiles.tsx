"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HeartPulse, Activity, User, Baby, HandHeart, Users } from "lucide-react";

const services = [
  { 
    title: "Állapotfelmérés", 
    desc: "Részletes egészségügyi és mozgásállapot-felmérés, amely megalapozza a személyre szabott kezelési terv kidolgozását, és alapvető kiindulópontja a hatékony terápiának.", 
    icon: <HeartPulse className="h-7 w-7" />, 
    color: "#163e72",
    image: "/checkup.png"
  },
  { 
    title: "SMR tréning", 
    desc: "Ez a gyakorlat az SMR hengerrel, vagyis az önmasszázs egyik hatékony formájával segít ellazítani az izmokat. A kivitelezés során érdemes rövid időre megállni az érzékenyebb pontokon, hogy még hatékonyabban érjük el a lazító hatást.", 
    icon: <HeartPulse className="h-7 w-7" />, 
    color: "#163e72",
    image: "/smr.png"
  },
  { 
    title: "Kinesio Tape felhelyezés", 
    desc: "A kinesio tape egy rugalmas tapasz, amely hatékonyan támogatja az izmokat és ízületeket anélkül, hogy korlátozná a mozgást. Alkalmazása segíthet a fájdalom csökkentésében, a mozgásszervi problémák kezelésében és a regeneráció elősegítésében. Bár otthoni videók alapján egyszerűnek tűnhet a felhelyezése, a pontos anatómiai ismeretek hiányában ritkán érhető el a kívánt hatás. Ezért érdemes szakemberhez fordulni, aki a panaszok megismerése és a problémás testrész vizsgálata után helyezi fel a tapaszt, és szükség esetén további terápiás javaslatokkal is ellát, például kiegészítő köpölyözést ajánlhat a mielőbbi gyógyulás érdekében. A különféle ragasztási technikák révén a kinesio tape erősítő és regeneráló hatással is támogathatja a szervezetet.",
    icon: <Activity className="h-7 w-7" />, 
    color: "#125341",
    image: "/kinesio.png"
  },
  { 
    title: "Sportsérülések rehabilitációja", 
    desc: "A sportsérülések sajnos a legfelkészültebb sportolókat is érinthetik, legyen szó hobbi szinten űzött mozgásról vagy versenysportól. A gyors és szakszerű rehabilitáció kulcsfontosságú, hiszen nemcsak a mielőbbi visszatérést segíti, hanem a későbbi sérülések megelőzésében is szerepet játszik. Személyre szabott rehabilitációs programjaink célja, hogy fokozatosan helyreállítsuk a sérült izmok, ízületek és szalagok működését, valamint visszaépítsük az erőt, a mozgékonyságot és az állóképességet. A folyamat része lehet a gyógytorna, funkcionális erősítő gyakorlatok, nyújtás, manuális terápia, valamint különböző regenerációt segítő kezelések. ",
    icon: <HandHeart className="h-7 w-7" />, 
    color: "#7e2c40",
    image: "/bosu.png"
  },
  { 
    title: "Manuálterápia", 
    desc: "Kézzel végzett kezelések az ízületek mobilitásának javítására és a fájdalom csökkentésére. Precíz technikák tapasztalt szakemberektől.",
    icon: <User className="h-7 w-7" />, 
    color: "#362a5b",
    image: "/manual.png"
  },
  { 
    title: "Flossing terápia", 
    desc: "A flossing terápia egy modern rehabilitációs és regenerációs módszer, amely során speciális, rugalmas gumiszalagot tekerünk az adott izom- vagy ízületi terület köré. A szalag rövid ideig tartó kompressziót hoz létre, amely a mozgás és a nyomás feloldása után fokozza a vérkeringést, segíti a regenerációt, csökkenti a fájdalmat és javítja az ízületi mozgástartományt. Gyakran alkalmazzák sportsérülések, izomfeszülések vagy mozgásbeszűkülés kezelésére, valamint edzés utáni gyorsabb felépülés támogatására.",
    icon: <Baby className="h-7 w-7" />, 
    color: "#633b1c",
    image: "/flossing.png"
  },
  { 
    title: "Köredzés", 
    desc: "Kis csoportos foglalkozások hasonló problémákkal küzdő páciensek számára. Motiváló közösségi környezet.",
    icon: <Users className="h-7 w-7" />, 
    color: "#232b5b",
    image: "/koredzes.png"
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
    <section className="w-full flex justify-center px-2 md:px-0 py-6 md:py-14">
      <div className="rounded-3xl bg-gradient-to-br from-black blue-950 p-4 md:p-14 xl:p-24 relative flex flex-col w-full
        max-w-[95vw] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1400px] min-h-[390px] md:min-h-[500px] overflow-hidden">

        {/* Background Image with Smooth Transition */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <Image
            src={services[current].image}
            alt={services[current].title}
            fill
            className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-25' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            priority={current === 0}
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 900px, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/85 to-green-950/80" />
        </div>

        {/* Desktop: Split Layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 items-center flex-1 relative z-10">
          
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
            
            {/* Image Overlay Icon */}
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <div className="text-white text-xl">
                {services[current].icon}
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="col-span-3 flex flex-col justify-center text-left pl-4">
            <span className="uppercase tracking-widest text-sm text-gray-300 mb-2 font-semibold">
              {services[current].title.split(" ")[0]}
            </span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-2 leading-tight">
              {services[current].title}
            </h1>
            <h2 className="text-3xl xl:text-4xl font-extrabold mb-4"
              style={{ color: services[current].color }}>
              
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              {services[current].desc}
            </p>
            
            {/* CTA Button */}
            <div className="flex gap-4">
              <button 
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                Foglalj időpontot
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Original Layout with Enhanced Background */}
        <div className="md:hidden flex flex-col items-center justify-center text-center w-full relative z-10 flex-1">
          <span className="uppercase tracking-widest text-xs text-gray-300 mb-2 font-semibold">
            {services[current].title.split(" ")[0]}
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight text-center">
            {services[current].title}
          </h1>
          <h2 className="text-2xl font-extrabold mb-4 text-center"
            style={{ color: services[current].color }}>
            
          </h2>
          <p className="text-base text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed text-center px-4">
            {services[current].desc}
          </p>

          {/* Mobile CTA */}
          <button 
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            Foglalj időpontot
          </button>
        </div>

        {/* Subtle corner icons */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 opacity-20 pointer-events-none select-none">
          <div className="text-white text-2xl md:text-3xl">{services[current].icon}</div>
        </div>
        <div className="absolute top-4 md:top-8 right-4 md:right-8 opacity-20 pointer-events-none select-none">
          <div className="text-white text-2xl md:text-3xl">{services[current].icon}</div>
        </div>

        {/* Navigation with Image Thumbnails */}
        <div className="w-full mt-8 relative z-10">
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
            // DESKTOP: Enhanced cards with thumbnails
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
    </section>
  );
}