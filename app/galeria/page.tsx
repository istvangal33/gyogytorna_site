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

export default function Galeria() {
  const galleryImages: GalleryImage[] = [
    { id: 1, src: '/1.jfif', alt: 'Modern várószoba', category: 'rendelő', title: 'Várószoba' },
    { id: 2, src: '/2.jfif', alt: 'Kezelőszoba', category: 'kezelés', title: 'Kezelőszoba' },
    { id: 3, src: '/3.jfif', alt: 'Gyógytornász eszközök', category: 'eszközök', title: 'Modern eszközök' },
    { id: 4, src: '/images/terapia-1.jpg', alt: 'Terápia', category: 'kezelés', title: 'Terápiás kezelés' },
    { id: 5, src: '/rendelo1.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 6, src: '/rendelo2.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 7, src: '/rendelo3.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 8, src: '/rendelo4.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 9, src: '/rendelo5.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 10, src: '/rendelo6.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 11, src: '/rendelo7.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 12, src: '/rendelo8.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },
    { id: 13, src: '/rendelo9.jpeg', alt: 'Rendelő', category: 'rendelő', title: 'Rendelő' },


    { id: 14, src: '/images/kezelo-2.jpg', alt: 'Második kezelőszoba', category: 'kezelés', title: 'Kezelőszoba 2' },
    { id: 15, src: '/images/eszköz-2.jpg', alt: 'Speciális eszközök', category: 'eszközök', title: 'Speciális eszközök' },
    { id: 16, src: '/images/terapia-2.jpg', alt: 'Egyéni terápia', category: 'kezelés', title: 'Egyéni terápia' },
  ];

  const categories = ['mind', 'rendelő', 'kezelés', 'eszközök'];
  const [activeFilter, setActiveFilter] = useState('mind');
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  // Filter logic
  useEffect(() => {
    if (activeFilter === 'mind') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeFilter));
    }
  }, [activeFilter]);

  // Keyboard navigation
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

  // Prevent scroll when lightbox open
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
      {/* Hero Section - Alime Style */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 text-white py-28 md:py-36">
        {/* Wavy bottom */}
        <div className="absolute inset-x-0 bottom-0">
          <svg className="w-full h-16 md:h-24 text-gray-50" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          >
            Galéria
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Tekintse meg modern rendelőnket és eszközeinket
          </motion.p>
        </div>
      </section>

      {/* Filter Buttons - Alime Style */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
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

          {/* Masonry Grid - Alime Style */}
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
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
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

      {/* Fotók */}
      <AnimatePresence>
        {currentImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
            onClick={() => setCurrentImageIndex(null)}
          >
            {/* Close button */}
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

            {/* Navigation Arrows */}
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

            {/* Counter - Mobile: fent, Desktop: fent jobbra */}
            <div className="absolute top-4 right-14 md:top-6 md:right-20 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-5 md:py-2.5 text-white text-sm md:text-base font-semibold shadow-lg z-20">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>

            {/* Main Image Container - OPTIMALIZÁLT PADDING */}
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
                {/* Kép - RESPONSIVE SIZING */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                    style={{ 
                      maxHeight: 'calc(100vh - 200px)', // Mobile: több hely
                      maxWidth: 'calc(100vw - 16px)'    // Mobile: 8px padding mindkét oldalt
                    }}
                  />
                </div>
                
                {/* Image Info - ALUL */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                  <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 py-4 md:px-8 md:py-6 rounded-b-lg text-center">
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{currentImage.title}</h3>
                    <p className="text-sm md:text-lg text-gray-300">{currentImage.category}</p>
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
