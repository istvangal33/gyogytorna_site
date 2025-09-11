'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const hideChrome = pathname === '/admin/foglalas';

  if (hideChrome) {
    return (
      <div className="min-h-screen flex flex-col">
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