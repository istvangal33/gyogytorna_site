import { useEffect, useRef, useState } from 'react';

export default function MapSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      if (elementTop <= windowHeight && elementTop + elementHeight >= 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight / 2)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(1, scrollProgress * 2);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Animated Interactive Map */}
          <div className="relative">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video relative overflow-hidden">
                {/* Animated Background - űr effekt */}
                <div 
                  className="absolute inset-0 transition-all duration-1000 ease-out"
                  style={{
                    background: `radial-gradient(circle at center, 
                      rgba(59, 130, 246, ${0.1 * scrollProgress}) 0%, 
                      rgba(30, 64, 175, ${0.05 * scrollProgress}) 50%, 
                      rgba(15, 23, 42, ${0.8 - scrollProgress * 0.6}) 100%)`,
                    transform: `scale(${3 - scrollProgress * 2})`,
                  }}
                />

                {/* Csillagok */}
                <div className="absolute inset-0">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.max(0, 1 - scrollProgress * 2),
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Föld/Térkép átmenet */}
                <div 
                  className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    background: `conic-gradient(from 0deg, 
                      #10b981 ${scrollProgress * 30}%, 
                      #3b82f6 ${scrollProgress * 60}%, 
                      #06b6d4 ${scrollProgress * 90}%, 
                      #10b981 100%)`,
                    transform: `scale(${scrollProgress}) rotate(${scrollProgress * 360}deg)`,
                    opacity: scrollProgress,
                    borderRadius: `${50 - scrollProgress * 30}%`,
                  }}
                />

                {/* Utcakép szimuláció */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-gray-100 transition-all duration-1000 ease-out"
                  style={{
                    opacity: Math.max(0, scrollProgress - 0.5) * 2,
                    transform: `scale(${0.8 + scrollProgress * 0.4})`,
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, #374151 1px, transparent 1px),
                        linear-gradient(0deg, #374151 1px, transparent 1px)
                      `,
                      backgroundSize: `${20 + scrollProgress * 30}px ${20 + scrollProgress * 30}px`,
                      opacity: scrollProgress,
                    }}
                  />
                  
                  {/* Épületek */}
                  {scrollProgress > 0.7 && (
                    <>
                      <div 
                        className="absolute bg-gray-600 transition-all duration-500"
                        style={{
                          left: '20%', top: '30%', width: '15%', height: '25%',
                          opacity: (scrollProgress - 0.7) * 3,
                          transform: `translateY(${(1 - scrollProgress) * 50}px)`,
                        }}
                      />
                      <div 
                        className="absolute bg-blue-600 transition-all duration-700"
                        style={{
                          left: '60%', top: '40%', width: '20%', height: '35%',
                          opacity: (scrollProgress - 0.7) * 3,
                          transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Tartalom */}
                <div 
                  className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-1000"
                  style={{ opacity }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 
                      className="text-xl font-semibold text-gray-700 mb-2 transition-all duration-1000"
                      style={{
                        transform: `translateY(${(1 - scrollProgress) * 15}px)`,
                        opacity,
                      }}
                    >
                      Interaktív térkép
                    </h3>
                    <p 
                      className="text-gray-600 mb-4 transition-all duration-1000"
                      style={{
                        transform: `translateY(${(1 - scrollProgress) * 10}px)`,
                        opacity,
                      }}
                    >
                      1051 Budapest, Példa utca 12.
                    </p>
                    
                    <a 
                      href="https://www.google.com/maps/search/1051+Budapest+Példa+utca+12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      style={{
                        transform: `translateY(${(1 - scrollProgress) * 5}px)`,
                        opacity,
                      }}
                    >
                      Megnyitás Google Maps-ben
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Details - a meglévő tartalom */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Rendelő Adatai
            </h2>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                  <div className="text-2xl">📍</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cím</h3>
                  <p className="text-gray-700 text-lg">
                    1051 Budapest<br />
                    Példa utca 12., 2. emelet<br />
                    Kapukód: 1234
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <div className="text-2xl">🕒</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nyitvatartás</h3>
                  <div className="text-gray-700 space-y-1">
                    <div className="flex justify-between items-center">
                      <span>Hétfő:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Kedd:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Szerda:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Csütörtök:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Péntek:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Szombat:</span>
                      <span className="font-medium">8:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vasárnap:</span>
                      <span className="font-medium text-red-600">Zárva</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                  <div className="text-2xl">📞</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kapcsolat</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <a href="tel:+36301234567" className="text-blue-600 hover:text-blue-800 font-medium">
                        +36 30 123 4567
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <a href="mailto:info@gyogytorna.hu" className="text-blue-600 hover:text-blue-800 font-medium">
                        info@gyogytorna.hu
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}