"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

export default function Galeria() {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/1.jfif',
      alt: 'Modern várószoba kényelmes fotelekkel',
      category: 'rendelő',
      title: 'Várószoba'
    },
    {
      id: 2,
      src: '/2.jfif',
      alt: 'Kezelőszoba modern berendezésekkel',
      category: 'kezelés',
      title: 'Kezelőszoba'
    },
    {
      id: 3,
      src: '/3.jfif',
      alt: 'Gyógytornász eszközök és felszerelések',
      category: 'eszközök',
      title: 'Modern eszközök'
    },
    {
      id: 4,
      src: '/images/terapia-1.jpg',
      alt: 'Gyógytornász kezelés közben',
      category: 'kezelés',
      title: 'Terápiás kezelés'
    },
    {
      id: 5,
      src: '/images/rendelő-2.jpg',
      alt: 'Recepciós terület',
      category: 'rendelő',
      title: 'Recepció'
    },
    {
      id: 6,
      src: '/images/kezelo-2.jpg',
      alt: 'Második kezelőszoba',
      category: 'kezelés',
      title: 'Kezelőszoba 2'
    },
    {
      id: 7,
      src: '/images/eszköz-2.jpg',
      alt: 'Speciális rehabilitációs eszközök',
      category: 'eszközök',
      title: 'Speciális eszközök'
    },
    {
      id: 8,
      src: '/images/terapia-2.jpg',
      alt: 'Egyéni gyógytorna foglalkozás',
      category: 'kezelés',
      title: 'Egyéni terápia'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentImageIndex === null) return;

      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setCurrentImageIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (currentImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentImageIndex]);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToNext = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex(
      (currentImageIndex + 1) % galleryImages.length
    );
  };

  const goToPrevious = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex(
      currentImageIndex === 0
        ? galleryImages.length - 1
        : currentImageIndex - 1
    );
  };

  const currentImage = currentImageIndex !== null ? galleryImages[currentImageIndex] : null;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Galéria</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tekintse meg modern rendelőnket és eszközeinket
          </p>
        </div>
      </section>

      {/* Simple Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer group"
                onClick={() => openViewer(index)}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center relative overflow-hidden">
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300"
                      whileHover={{ scale: 1.07 }}
                    />
                  </div>
                  {/* Card Content */}
                  <div className="p-6">
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Photo Viewer */}
      <AnimatePresence>
        {currentImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ perspective: '1000px' }}
          >
            {/* Blurred background */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `url(${currentImage.src}) center center / cover no-repeat`,
                filter: 'blur(12px) brightness(0.7)',
                opacity: 0.9,
                transition: 'background-image 0.3s'
              }}
            />
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors"
              aria-label="Előző kép"
            >
              <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors"
              aria-label="Következő kép"
            >
              <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Close button */}
            <button
              onClick={() => setCurrentImageIndex(null)}
              className="absolute top-5 right-6 z-20 text-white/80 hover:text-white transition-colors"
              aria-label="Bezár"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Main Image Display */}
            <div className="h-full flex items-center justify-center p-2 pt-16 pb-12 z-10 relative">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.96, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotateY: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl mx-auto"
                style={{
                  transform: 'rotateX(-2deg) rotateY(1deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main image */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <motion.img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 bg-white/90 rounded px-2 py-1 shadow text-gray-800 text-base">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </div>
            {/* Bottom Thumbnail Bar */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-20">
              <div className="flex space-x-2 bg-black/40 rounded-xl p-2 backdrop-blur-sm max-w-full overflow-x-auto">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-8 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-white shadow-lg scale-110' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    aria-label={`Thumbnail ${index + 1}`}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-200"
                      whileHover={{ scale: 1.09 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}