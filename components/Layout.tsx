'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith('/admin');

  // Toggle admin-no-chrome class and handle viewport height for iOS Safari
  useEffect(() => {
    if (hideChrome) {
      document.body.classList.add('admin-no-chrome');
      
      // Set initial viewport height
      const setViewportHeight = () => {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--app-vh', `${vh}px`);
      };

      // Initial measurement
      setViewportHeight();

      // iOS Safari URL bar stabilization with delay
      const handleResize = () => {
        setTimeout(setViewportHeight, 250);
      };

      const handleOrientationChange = () => {
        setTimeout(setViewportHeight, 250);
      };

      // Add event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        document.body.classList.remove('admin-no-chrome');
        document.documentElement.style.removeProperty('--app-vh');
      };
    } else {
      document.body.classList.remove('admin-no-chrome');
      document.documentElement.style.removeProperty('--app-vh');
    }

    // Cleanup function to remove class on unmount
    return () => {
      document.body.classList.remove('admin-no-chrome');
      document.documentElement.style.removeProperty('--app-vh');
    };
  }, [hideChrome]);

  if (hideChrome) {
    return (
      <div className="admin-root-vh bg-[rgb(27,27,27)] text-gray-100">
        <main className="flex-grow p-0 m-0">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}