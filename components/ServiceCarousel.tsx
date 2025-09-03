'use client';

import { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Activity, 
  User, 
  Baby, 
  HandHeart, 
  Dumbbell, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export default function ServiceCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 6;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index) => setCurrentSlide(index);

  const SLIDE_INTERVAL = 12000;

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Szolgáltatások adatai
  const services = [
    {
      title: "Gerinc Rehabilitáció",
      description: "Gerincfájdalmak, porckorongsérvek és tartási hibák kezelése célzott gyakorlatokkal.",
      features: ["McKenzie terápia", "Gerinc mobilizáció", "Core erősítő gyakorlatok"],
      color: "blue",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Sportrehabilitáció",
      description: "Sportkárosodások gyógyítása és a teljesítmény optimalizálása sportolók számára.",
      features: ["Sérülés utáni rehabilitáció", "Teljesítményfokozás", "Prevenciós tanácsadás"],
      color: "green",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Időskorú Terápia",
      description: "Speciális gyakorlatok az aktivitás fenntartásához és a mobilitás javításához időskorban.",
      features: ["Egyensúly javítása", "Erő és rugalmasság", "Esés megelőzés"],
      color: "orange",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Szülés Előtti/Utáni",
      description: "Kismamák és friss anyukák speciális igényeire szabott kezelések.",
      features: ["Medencefenék erősítés", "Diastasis recti kezelés", "Tartási problémák javítása"],
      color: "pink",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Manuálterápia",
      description: "Kézzel végzett kezelések az ízületek mobilitásának javítására.",
      features: ["Ízületi mobilizáció", "Lágyrész kezelések", "Trigger pont terápia"],
      color: "purple",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Mozgásterápia",
      description: "Komplex mozgásprogramok a test harmonikus működésének helyreállítására.",
      features: ["Funkcionális tréning", "Koordináció fejlesztés", "Légzésterápia"],
      color: "teal",
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <div 
      className="carousel-container relative overflow-hidden rounded-2xl shadow-2xl bg-white min-h-[500px] lg:min-h-[400px]"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div
        className="carousel-list flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {services.map((service, index) => (
          <div key={index} className="carousel-item min-w-full pt-18 md:pl-16 lg:pl-24 pr-6 md:pr-8 lg:pr-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {service.description}
              </p>
              <ul className="text-gray-600 space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
              <div className="relative">
                <div className="w-full h-64 lg:h-50 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-6xl text-gray-400">🏥</div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
        aria-label="Előző slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
        aria-label="Következő slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-blue-1600 w-8' 
                : 'bg-gray-800 hover:bg-gray-400'
            }`}
            aria-label={`Ugrás a ${index + 1}. slide-re`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}