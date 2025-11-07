"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function UserIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      viewBox="0 0 24 24" 
      aria-hidden="true"
    >
      {/* 3x3 grid - szolgáltatások listája */}
      <rect x={3} y={3} width={7} height={7} />
      <rect x={14} y={3} width={7} height={7} />
      <rect x={3} y={14} width={7} height={7} />
      <rect x={14} y={14} width={7} height={7} />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      viewBox="0 0 24 24" 
      aria-hidden="true"
    >
      {/* Receipt forma hullámos tetejével és aljával */}
      <path d="M4 4v16l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V4l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      {/* Szöveg sorok az árlistán */}
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
    </svg>
  );
}

const navItems = [
  { label: "Bemutatkozás", href: "/bemutatkozas", icon: <UserIcon /> },
  { label: "Szolgáltatások", href: "/szolgaltatasok", icon: <ServicesIcon /> },
  { label: "Árak", href: "/arak", icon: <PriceIcon /> },
  { label: "Elérhetőség", href: "/elerhetoseg", icon: <MailIcon /> },
  { label: "Galéria", href: "/galeria", icon: <GalleryIcon /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // FIX: Safe hydration

  // FIX: Safe hydration - csak client oldalon renderel
  useEffect(() => {
    setMounted(true);
  }, []);

  // Zárd a menüt útvonal váltáskor
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Body scroll lock - csak client oldalon
  useEffect(() => {
    if (!mounted) return; // FIX: Csak mounted után
    
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = "";
      body.style.touchAction = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isMenuOpen, mounted]);

  const isActive = (href: string) => {
    if (!mounted) return false; // FIX: Safe check
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  };

  // FIX: Ne renderelj semmit amíg nincs mounted
  if (!mounted) {
    return (
      <>
        {/* Static skeleton - SSR safe */}
        <header className="hidden lg:flex fixed left-0 top-0 h-full w-24 bg-[#0f1f29] backdrop-blur-md shadow-lg border-r border-white/10 z-50 flex-col">
          <div className="flex flex-col items-center justify-between h-full py-6">
            <Link href="/" className="flex flex-col items-center group" aria-label="Főoldal">
              <Image src="/logo.png" alt="ReStart Physio" width={80} height={80} className="group-hover:scale-110 transition-transform" />
            </Link>
            <nav className="flex flex-col space-y-4 items-center">
              {/* Skeleton nav items */}
              {navItems.map((item) => (
                <div key={item.href} className="flex flex-col items-center px-2 py-2 text-white/70">
                  {item.icon}
                  <span className="text-[10px] text-center font-medium tracking-tight">{item.label}</span>
                </div>
              ))}
            </nav>
            <div className="flex flex-col items-center">
              <Link href="/elerhetoseg#contact" className="inline-flex flex-col items-center px-3 py-1.5 rounded-full border border-white/30 text-white/70 text-xs">
                <MailIcon />
                <span className="text-center">Kapcsolat</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile skeleton */}
        <header className="fixed top-0 left-0 w-full bg-[#0f1f29] backdrop-blur-md shadow-sm border-b border-white/10 z-40 lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2" aria-label="Főoldal">
                <Image src="/logo.png" alt="ReStart Physio" width={56} height={56} className="h-10 w-auto" />
              </Link>
              <div className="p-2 text-white/80">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      {/* DESKTOP bal oldali sáv */}
      <header className="hidden lg:flex fixed left-0 top-0 h-full w-24 bg-[#0f1f29] backdrop-blur-md shadow-lg border-r border-white/10 z-50 flex-col">
        <div className="flex flex-col items-center justify-between h-full py-6">
          <Link href="/" className="flex flex-col items-center group" aria-label="Főoldal">
            <Image src="/logo.png" alt="ReStart Physio" width={80} height={80} className="group-hover:scale-110 transition-transform" />
          </Link>

          <nav className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => {
              const active = isActive(item.href);
              
              // FIX: Egyszerűbb pozíciózás
              const getLeftPosition = () => {
                switch(item.label) {
                  case "Bemutatkozás":
                  case "Szolgáltatások":
                    return "-left-1";
                  case "Árak":
                    return "-left-6";
                  case "Elérhetőség":
                    return "-left-3";
                  default:
                    return "-left-6";
                }
              };

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex flex-col items-center px-2 py-2 rounded-lg transition-colors ${
                    active ? "text-[#EC7007]" : "text-white/70 hover:text-[#EC7007]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={`pointer-events-none absolute ${getLeftPosition()} top-1/2 -translate-y-1/2 w-1 h-6 rounded-full transition-opacity ${active ? "bg-[#EC7007] opacity-100" : "opacity-0"}`} />
                  {item.icon}
                  <span className="text-[10px] text-center font-medium tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-center">
            <Link
              href="/elerhetoseg#contact"
              className={`group inline-flex flex-col items-center px-3 py-1.5 rounded-full border text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC7007]/40 focus-visible:ring-offset-2 ${
                pathname?.startsWith("/elerhetoseg")
                  ? "border-[#EC7007] text-[#EC7007]"
                  : "border-white/30 text-white/70 hover:border-[#EC7007] hover:text-[#EC7007]"
              }`}
            >
              <MailIcon />
              <span className="text-center">Kapcsolat</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE: felső sáv */}
      <header className="fixed top-0 left-0 w-full bg-[#0f1f29] backdrop-blur-md shadow-sm border-b border-white/10 z-40 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2" aria-label="Főoldal">
              <Image src="/logo.png" alt="ReStart Physio" width={56} height={56} className="h-10 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-[#EC7007] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC7007] focus-visible:ring-offset-2 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          aria-label="Overlay – menü bezárása"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        />

        <div className="relative z-10 h-full w-full bg-[#0f1f29] flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-white/10">
            <Link href="/" aria-label="Főoldal" onClick={() => setIsMenuOpen(false)}>
              <Image src="/logo.png" alt="ReStart Physio" width={56} height={56} className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Menü bezárása"
              className="p-2 rounded-md text-white/80 hover:text-[#EC7007] hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 sm:px-6 py-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base transition-colors ${
                          active
                            ? "text-[#EC7007] bg-[#EC7007]/5"
                            : "text-white/70 hover:text-[#EC7007] hover:bg-white/5"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4">
                <Link
                  href="/elerhetoseg#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-white/30 text-white/70 hover:border-[#EC7007] hover:text-[#EC7007] transition-all duration-200 transform-gpu hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(236,112,7,0.15)] active:translate-y-0"
                >
                  <MailIcon />
                  <span className="font-semibold">Kapcsolat</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
