import type { Metadata } from "next";
import Layout from "@/components/Layout";  // @ használata a gyökérre
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyógytorna - Professzionális Fizioterápia",
  description: "Szakképzett gyógytornász szolgáltatások. Gerincfájdalom, ízületi problémák, sportkárosodások kezelése modern módszerekkel.",
  keywords: ["gyógytorna", "fizioterápia", "gerincfájdalom", "ízületi fájdalom", "rehabilitáció", "masszázs"],
  authors: [{ name: "Gyógytorna Szakrendelő" }],
  openGraph: {
    title: "Gyógytorna - Professzionális Fizioterápia",
    description: "Szakképzett gyógytornász szolgáltatások. Gerincfájdalom, ízületi problémák, sportkárosodások kezelése modern módszerekkel.",
    type: "website",
    locale: "hu_HU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var initialTheme = theme || systemTheme;
                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        {/* Google Analytics - GDPR kompatibilis */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID!} />
        
        <Layout>
          {children}
        </Layout>
        
        {/* Cookie Banner - az oldal alján */}
        <CookieBanner />
        
        {/* Theme Toggle - fixed bottom-right */}
        <ThemeToggle />
      </body>
    </html>
  );
}
