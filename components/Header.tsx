'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // A hydration elkerülése érdekében csak kliens oldalon fusson
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      
      window.addEventListener('scroll', handleScroll);
      // Kezdeti érték beállítása
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-gradient-to-r from-blue-700/90 to-blue-900/90 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              isScrolled 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-white backdrop-blur-md'
            }`}>
              {/* Javított osztály: text=1 → text-xl */}
              <div className="font-bold text-xl">G</div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg tracking-tight transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>GyógytornaPlus</span>
              <span className={`text-xs transition-colors ${
                isScrolled ? 'text-gray-500' : 'text-blue-100'
              }`}>Professzionális rehabilitáció</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Főoldal
            </Link>
            <Link 
              href="/bemutatkozo" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Rólunk
            </Link>
            <Link 
              href="/elerhetoseg" 
              className={`ml-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              } shadow-md hover:shadow-lg`}
            >
              Elérhetőség
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden inline-flex items-center justify-center p-3 rounded-xl focus:outline-none transition-colors ${
              isScrolled 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-expanded="false"
          >
            <span className="sr-only">Főmenü megnyitása</span>
            {!isMenuOpen ? (
              // Hamburger icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              // Close icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation - Csak kliens oldalon jelenjen meg */}
        {typeof window !== 'undefined' && isMenuOpen && (
          <div className={`md:hidden mt-4 rounded-xl overflow-hidden transition-all duration-300 ${
            isScrolled 
              ? 'bg-white shadow-xl' 
              : 'bg-white/10 backdrop-blur-md'
          }`}>
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link 
                href="/"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Főoldal
              </Link>
              <Link 
                href="/bemutatkozo"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Szolgáltatások
              </Link>
              <Link 
                href="/bemutatkozo"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Rólunk
              </Link>
              <Link 
                href="/arak"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Árak
              </Link>
              <Link 
                href="/kapcsolat"
                className={`block px-4 py-3 rounded-lg font-medium mt-2 text-center ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Időpontfoglalás
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}