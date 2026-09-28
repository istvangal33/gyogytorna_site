'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import GoogleAnalytics from './GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  // Az admin felület saját fejlécet kap. A mérőkódok és a süti-sáv is kimarad:
  // a személyzet nem látogató, és a betegadatokat kezelő felület használatát
  // nem követjük analitikával.
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
