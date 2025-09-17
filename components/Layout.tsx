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

  // Toggle admin-no-chrome class on body element
  useEffect(() => {
    if (hideChrome) {
      document.body.classList.add('admin-no-chrome');
    } else {
      document.body.classList.remove('admin-no-chrome');
    }

    // Cleanup function to remove class on unmount
    return () => {
      document.body.classList.remove('admin-no-chrome');
    };
  }, [hideChrome]);

  if (hideChrome) {
    return (
      <div className="min-h-screen flex flex-col bg-[rgb(27,27,27)] text-gray-100">
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