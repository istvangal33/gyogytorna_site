'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Függőleges Header bal oldalon - CSAK DESKTOP */}
      <header className="hidden lg:flex fixed left-0 top-0 h-full w-24 bg-white shadow-lg border-r border-blue-900/30 z-50 flex-col">
        <div className="flex flex-col items-center justify-between h-full py-6">
          
          {/* Logo felül */}
          <Link href="/" className="flex flex-col items-center space-y-2 group">
            <Image
              src="/logo.png"
              alt="Gyógytorna logo"
              width={40}
              height={40}
              className="group-hover:scale-110 transition-transform"
            />
            <div className="text-center">
              <div className="text-xs font-bold text-gray-900 leading-tight">
                Fernanda
              </div>
              <div className="text-xs font-semibold text-gray-700">
                Gyógytorna
              </div>
            </div>
          </Link>

          {/* Navigáció középen */}
          <nav className="flex flex-col space-y-6 items-center">
            <Link 
              href="/bemutatkozas" 
              className="group flex flex-col items-center hover:text-orange-500 transition-colors"
              title="Bemutatkozás"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs text-center">Bemutatkozás</span>
            </Link>
            
            <Link 
              href="/elerhetoseg" 
              className="group flex flex-col items-center hover:text-orange-500 transition-colors"
              title="Elérhetőség"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-center">Elérhetőség</span>
            </Link>
          </nav>

          {/* Contact gomb alul */}
          <div className="flex flex-col items-center space-y-2">
            <Link
              href="/elerhetoseg"
              className="btn flex flex-col items-center px-3 py-3 rounded-full border border-gray-300 font-medium transition-all hover:bg-orange-50"
              title="Contact me"
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xs">Contact</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header - EREDETI DESIGN */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-blue-900/30 z-50 lg:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Gyógytorna logo"
                width={40}
                height={40}
              />
              <span className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                Fernanda<br/>Gyógytorna
              </span>
            </Link>

            {/* Mobile Menu Button + Contact */}
            <div className="flex items-center gap-3">
              <Link
                href="/elerhetoseg"
                className="btn px-4 py-3 rounded-full border border-gray-300 font-medium transition-all"
              >
                Contact me
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mt-4 mb-4 rounded-lg bg-white shadow-lg border border-gray-100">
              <nav className="flex flex-col px-4 py-4 space-y-2 text-gray-800 font-medium">
                <Link href="/bemutatkozas" className="hover:text-blue-700 transition-colors">Bemutatkozás</Link>
                <Link href="/elerhetoseg" className="hover:text-blue-700 transition-colors">Elérhetőség</Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}