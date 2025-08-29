'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              G
            </div>
            <span className="font-bold text-xl text-gray-900">Gyógytorna</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors"
            >
              Főoldal
            </Link>
            <Link 
              href="/bemutatkozo" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors"
            >
              Bemutatkozó
            </Link>
            <Link 
              href="/kapcsolat" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors"
            >
              Kapcsolat
            </Link>
            <Link 
              href="/elerhetoseg" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors"
            >
              Elérhetőség
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
          >
            <span className="sr-only">Menü megnyitása</span>
            {/* Hamburger icon */}
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link 
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Főoldal
              </Link>
              <Link 
                href="/bemutatkozo"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Bemutatkozó
              </Link>
              <Link 
                href="/kapcsolat"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Kapcsolat
              </Link>
              <Link 
                href="/elerhetoseg"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Elérhetőség
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}