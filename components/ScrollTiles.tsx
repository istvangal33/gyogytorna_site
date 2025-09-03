"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HeartPulse, Activity, User, Baby, HandHeart, Users, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { 
    title: "Gerinc Rehabilitáció", 
    desc: "Professzionális kezelések gerincfájdalmak, porckorongsérvek és tartási hibák esetén. Modern módszerekkel és egyéni terápiás tervekkel segítjük a gyógyulási folyamatot.", 
    icon: <HeartPulse className="h-8 w-8" />, 
    color: "#2563EB",
    image: "/physio1.jpg",
    author: "GYÓGYTORNA",
    topic: "GERINC"
  },
  { 
    title: "Sportrehabilitáció", 
    desc: "Sportolók számára tervezett rehabilitációs programok sérülések után. Gyors visszatérés a sporthoz biztonságos körülmények között.",
    icon: <Activity className="h-8 w-8" />, 
    color: "#059669",
    image: "/physio2.jpg",
    author: "SPORT",
    topic: "REHABILITÁCIÓ"
  },
  { 
    title: "Szülés Utáni Terápia", 
    desc: "Kismamák és friss anyukák speciális igényeire szabott kezelések. Biztonságos visszatérés az aktív életmódhoz szülés után.",
    icon: <HandHeart className="h-8 w-8" />, 
    color: "#DB2777",
    image: "/physio3.jpg",
    author: "ANYASÁG",
    topic: "HELYREÁLLÍTÁS"
  },
  { 
    title: "Manuálterápia", 
    desc: "Kézzel végzett kezelések az ízületek mobilitásának javítására és a fájdalom csökkentésére. Precíz technikák tapasztalt szakemberektől.",
    icon: <User className="h-8 w-8" />, 
    color: "#7C3AED",
    image: "/physio4.jpg",
    author: "MANUÁLIS",
    topic: "TERÁPIA"
  },
  { 
    title: "Gyermek Terápia", 
    desc: "Gyermekek számára tervezett fejlesztő és rehabilitációs programok. Játékos környezetben, a gyermek tempójának megfelelően.",
    icon: <Baby className="h-8 w-8" />, 
    color: "#EA580C",
    image: "/physio5.jpg",
    author: "GYERMEK",
    topic: "FEJLESZTÉS"
  },
  { 
    title: "Csoportos Terápia", 
    desc: "Kis csoportos foglalkozások hasonló problémákkal küzdő páciensek számára. Motiváló közösségi környezet.",
    icon: <Users className="h-8 w-8" />, 
    color: "#4F46E5",
    image: "/physio6.jpg",
    author: "KÖZÖSSÉGI",
    topic: "TERÁPIA"
  }
];

export default function ScrollTiles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const autoSlide = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000);

    return () => clearInterval(autoSlide);
  }, [currentIndex, isAnimating, isClient]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % services.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleThumbnailClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (Math.abs(velocity) >= 500) {
      if (velocity > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (Math.abs(offset) > 50) {
      if (offset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  if (!isClient) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const currentService = services[currentIndex];

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="relative h-[80vh] md:h-screen bg-black overflow-hidden 
                rounded-2xl shadow-xl border border-white/10 md:rounded-none md:shadow-none md:border-0">
        
        {/* Progress Bar 
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-orange-500 z-40"
          key={currentIndex}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 7, ease: 'linear' }}
        />
        */}

        {/* Mobile Slider */}
        <div className="relative h-full w-full">
          <motion.div
            className="flex h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{
              x: `${-currentIndex * 100}%`
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="w-full h-full flex-shrink-0 relative flex flex-col justify-center items-center p-6"
                style={{
                  background: `linear-gradient(135deg, ${service.color}60, ${service.color}30, #000000)`
                }}
              >
                {/* Mobile Content */}
                <motion.div 
                  className="text-center text-white z-10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="text-xs font-bold tracking-[8px] mb-4 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {service.author}
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl font-bold leading-tight mb-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {service.title.split(' ')[0]}
                  </motion.h1>
                  
                  <motion.h2 
                    className="text-4xl font-bold leading-tight mb-6"
                    style={{ color: service.color }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {service.topic}
                  </motion.h2>

                  {/* Icon */}
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-white/30"
                    style={{ backgroundColor: `${service.color}30` }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="text-white text-3xl">
                      {service.icon}
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-gray-200 leading-relaxed mb-8 max-w-xs mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {service.desc}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col gap-3 w-full max-w-xs mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                  </motion.div>
                </motion.div>

                {/* Background Pattern */}
                <div className="hidden md:absolute md:inset-0 md:opacity-5 md:flex md:items-center md:justify-center">
                  <div className="text-[200px]">
                    {service.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout (eredeti)
  return (
    <div className="relative h-[80vh] bg-black overflow-hidden">
      
      {/* Progress Bar 
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-orange-500 z-40"
        key={currentIndex}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 7, ease: 'linear' }}
      />
      */}

      {/* Main Slide */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ 
              scale: direction === 'next' ? 0.8 : 1.2,
              opacity: 0 
            }}
            animate={{ 
              scale: 1,
              opacity: 1 
            }}
            exit={{ 
              scale: direction === 'next' ? 1.2 : 0.8,
              opacity: 0 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-br opacity-90"
              style={{
                background: `linear-gradient(135deg, ${currentService.color}40, ${currentService.color}20, #000000)`
              }}
            />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full flex items-center justify-center text-9xl">
                {currentService.icon}
              </div>
            </div>

            {/* Content */}
            <motion.div 
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-8 text-white"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="text-sm font-bold tracking-[10px] mb-4 text-gray-300"
                initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {currentService.author}
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-8xl font-bold leading-tight mb-4"
                initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {currentService.title.split(' ')[0]}
              </motion.h1>
              
              <motion.h2 
                className="text-6xl md:text-8xl font-bold leading-tight mb-8"
                style={{ color: currentService.color }}
                initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {currentService.topic}
              </motion.h2>
              
              <motion.p 
                className="text-lg max-w-2xl mb-8 text-gray-200 leading-relaxed"
                initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                {currentService.desc}
              </motion.p>
              
              <motion.div 
                className="flex gap-4"
                initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
              </motion.div>
            </motion.div>

            {/* Large Icon */}
            <motion.div 
              className="absolute left-20 top-1/2 transform -translate-y-1/2 text-white opacity-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-[300px]">
                {currentService.icon}
              </div>
            </motion.div>
            <motion.div 
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-white opacity-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-[300px]">
                {currentService.icon}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails - csak desktop */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-5 z-40">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`w-32 h-44 rounded-3xl overflow-hidden cursor-pointer relative group ${
              index === currentIndex ? 'ring-4 ring-white' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, ${service.color}60, ${service.color}40)`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-6xl opacity-60">
                {service.icon}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white text-xs font-semibold">
                {service.title.split(' ')[0]}
              </div>
              <div className="text-gray-300 text-xs">
                {service.topic}
              </div>
            </div>
          </motion.div>
        ))}
      </div>      
    </div>
  );
}