"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

function GallerySchema({ images }: { images: GalleryImage[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "ReStart Physio Galéria - Rendelő és Kezelések",
    "description": "Modern gyógytorna rendelő és professzionális fizioterápiás kezelések képekben Győrben",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "ReStart Physio",
      "url": "https://restartphysio.hu"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


export default function Galeria() {
  // ✅ CSAK ALT TEXTEK JAVÍTÁSA - FÁJLNEVEK VÁLTOZATLANOK!
  const galleryImages: GalleryImage[] = [
    // RENDELŐ KÉPEK
    { id: 1, src: '/rendelo1.jpeg', alt: 'ReStart Physio gyógytorna rendelő Győr – modern kezelőhelyiség gyönyörű kilátással', category: 'rendelő', title: '' },
    { id: 2, src: '/rendelo2.jpeg', alt: 'ReStart Physio kezelőszoba modern fizioterápiás eszközökkel Győrben', category: 'rendelő', title: '' },
    { id: 3, src: '/rendelo3.jpeg', alt: 'ReStart Physio váróterme – modern, barátságos környezet', category: 'rendelő', title: '' },
    { id: 4, src: '/rendelo4.jpeg', alt: 'Tágas rehabilitációs terem jól felszerelt edzőgépekkel', category: 'rendelő', title: '' },
    { id: 5, src: '/rendelo5.jpeg', alt: 'ReStart Physio váróterme kényelmes székekkel és oklevelekkel.', category: 'rendelő', title: '' },
    { id: 6, src: '/rendelo6.jpeg', alt: 'A ReStart Physio győri gyógytorna rendelő kezelőhelyisége', category: 'rendelő', title: '' },
    { id: 7, src: '/rendelo7.jpeg', alt: 'A ReStart Physio győri gyógytorna rendelő kezelőhelyisége csodás kilátással', category: 'rendelő', title: '' },
    { id: 8, src: '/rendelo8.jpeg', alt: 'ReStart Physio kezelőterem tornaszőnyegekkel és bordásfallal', category: 'rendelő', title: '' },
    { id: 9, src: '/rendelo9.jpeg', alt: 'Tágas tornaterem szobabiciklivel és rehabilitációs eszközökkel', category: 'rendelő', title: '' },
    
    // KEZELÉSEK - BEMER
    { id: 10, src: '/bemer1.jpg', alt: 'BEMER terápia páciensen – regeneráció modern eszközzel Győrben', category: 'kezelés', title: '' },
    { id: 11, src: '/bemer2.jpg', alt: 'BEMER terápia arckezelés a ReStart Physio rendelőben', category: 'kezelés', title: '' },
    { id: 12, src: '/bemer3.jpg', alt: 'BEMER terápia vállkezelés a ReStart Physio rendelőben', category: 'kezelés', title: '' },
    { id: 13, src: '/bemer4.jpg', alt: 'BEMER érterápia – regeneráció sportolóknak Győrben', category: 'kezelés', title: '' },
    
    // MANUÁLIS KEZELÉSEK
    { id: 14, src: '/manual2.jpg', alt: 'Manuális nyak- és vállkezelés – izomlazítás és fascia terápia', category: 'kezelés', title: '' },
    { id: 15, src: '/manual3.jpg', alt: 'Manuális vállkezelés fizioterapeuta által Győrben', category: 'kezelés', title: '' },
    { id: 16, src: '/manual4.jpg', alt: 'Személyre szabott manuális nyakkezelés fizioterapeutával', category: 'kezelés', title: '' },
    
    // SPORTREHABILITÁCIÓ
    { id: 17, src: '/sportrehab1.jpg', alt: 'Sportrehabilitáció – egyensúlyfejlesztő gyakorlat Győrben', category: 'kezelés', title: '' },
    { id: 18, src: '/sportrehab2.JPG', alt: 'Sportrehabilitáció – izomerősítés és koordináció fejlesztés', category: 'kezelés', title: '' },
    { id: 19, src: '/sportrehab3.jpg', alt: 'Térderősítő sportrehabilitáció sérülés után Győrben', category: 'kezelés', title: '' },
    { id: 20, src: '/sportrehab4.jpg', alt: 'Térdrehabilitáció gumiszalaggal – izomerősítés és stabilizáció', category: 'kezelés', title: '' },
    
    // GERINCSTABILIZÁCIÓ
    { id: 21, src: '/gerinc_core1.jpg', alt: 'Core-stabilizáció fitball labdán – törzserősítés Győrben', category: 'kezelés', title: '' },
    { id: 22, src: '/gerinc_core2.jpg', alt: 'Gerincstabilizáció súlyzóval és pilates labdával Győrben', category: 'kezelés', title: '' },
    { id: 23, src: '/gerinc_core3.jpg', alt: 'Core-stabilizáció BOSU labdán – egyensúlyfejlesztés Győrben', category: 'kezelés', title: '' },
    
    // CSOPORTOS CORE
    { id: 24, src: '/group_core1.jpg', alt: 'Csoportos core tréning gumiszalaggal Győrben', category: 'kezelés', title: '' },
    { id: 25, src: '/group_core2.jpg', alt: 'Csoportos core gyakorlat fitball-labdával Győrben', category: 'kezelés', title: '' },
    { id: 26, src: '/group_core3.jpg', alt: 'Csoportos core gyakorlat – törzsizom erősítés a rendelőben', category: 'kezelés', title: '' },
    { id: 27, src: '/group_core4.jpg', alt: 'Csoportos core tréning és nyújtás gyógytornász vezetésével', category: 'kezelés', title: '' },
    
    // ÁLLKAPOCS TERÁPIA
    { id: 28, src: '/allkapocs1.jpg', alt: 'TMI terápia – állkapocs-ízületi manuálterápia Győrben', category: 'kezelés', title: '' },
    { id: 29, src: '/allkapocs2.jpg', alt: 'Állkapocs-ízületi TMI kezelés rágóizom feszültség oldására', category: 'kezelés', title: '' },
    { id: 30, src: '/allkapocs3.jpg', alt: 'TMI manuálterápia fekvő helyzetben – állkapocs kezelés', category: 'kezelés', title: '' },
    { id: 31, src: '/allkapocs4.jpg', alt: 'TMI terápia szájüregen keresztül – ízületi blokkok oldása', category: 'kezelés', title: '' },
    
    // DYNAMIC TAPE
    { id: 32, src: '/dynamictape1.jpg', alt: 'Dynamic Tape boka stabilizálás – kineziológiai taping Győrben', category: 'kezelés', title: '' },
  ];

  const categories = ['mind', 'rendelő', 'kezelés'];
  const [activeFilter, setActiveFilter] = useState('mind');
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    if (activeFilter === 'mind') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentImageIndex === null) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'Escape') setCurrentImageIndex(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  useEffect(() => {
    document.body.style.overflow = currentImageIndex !== null ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [currentImageIndex]);

  const openViewer = (index: number) => setCurrentImageIndex(index);
  const goToNext = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((currentImageIndex + 1) % filteredImages.length);
  };
  const goToPrevious = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex(currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1);
  };

  const currentImage = currentImageIndex !== null ? filteredImages[currentImageIndex] : null;

  return (
    <>
      {/* ✅ STRUCTURED DATA HOZZÁADVA */}
      <GallerySchema images={galleryImages} />
      
      {/* Hero Section */}
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
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4"
            >
              Galéria
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Tekintse meg modern rendelőnket és professzionális kezeléseinket
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ✅ ARIA-LABEL HOZZÁADVA */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-label={`Szűrés: ${cat}`}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[#EC7007] text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* ✅ MASONRY GRID - IMG VÁLTOZATLAN (KÉP BETÖLTÉS OK) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => openViewer(index)}
              >
                <div className="relative overflow-hidden w-full h-auto">
                  {/* ✅ IMG → IMAGE (Next.js komponens) */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                    unoptimized // ✅ FONTOS statikus exportnál!
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX - VÁLTOZATLAN */}
      <AnimatePresence>
        {currentImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
            onClick={() => setCurrentImageIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(null);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 text-white/90 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Bezár"
            >
              <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/90 hover:text-white transition-all p-2 md:p-3 hover:bg-white/10 rounded-full hover:scale-110"
              aria-label="Előző"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/90 hover:text-white transition-all p-2 md:p-3 hover:bg-white/10 rounded-full hover:scale-110"
              aria-label="Következő"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute top-4 right-14 md:top-6 md:right-20 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-5 md:py-2.5 text-white text-sm md:text-base font-semibold shadow-lg z-20">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>

            <div 
              className="h-full w-full flex items-center justify-center px-2 py-24 md:px-24 md:py-16"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                    style={{ 
                      maxHeight: 'calc(100vh - 200px)',
                      maxWidth: 'calc(100vw - 16px)'
                    }}
                    unoptimized // ✅ FONTOS!
                  />
                </div>
  
                <div className="absolute bottom-0 left-0 right-0 w-full">
                  <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 py-4 md:px-8 md:py-6 rounded-b-lg text-center">
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{currentImage.title}</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
