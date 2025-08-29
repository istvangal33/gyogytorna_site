import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                G
              </div>
              <span className="font-bold text-xl">Gyógytorna Szakrendelő</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professzionális gyógytornász szolgáltatások a legmodernebb módszerekkel. 
              Célunk a fájdalom csökkentése és a mozgásfunkciók helyreállítása.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+36301234567" className="text-blue-400 hover:text-blue-300">
                <span className="sr-only">Telefon</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
              <a href="mailto:info@gyogytorna.hu" className="text-blue-400 hover:text-blue-300">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Gyors linkek</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Főoldal
                </Link>
              </li>
              <li>
                <Link href="/bemutatkozo" className="text-gray-300 hover:text-white transition-colors">
                  Bemutatkozó
                </Link>
              </li>
              <li>
                <Link href="/kapcsolat" className="text-gray-300 hover:text-white transition-colors">
                  Kapcsolat
                </Link>
              </li>
              <li>
                <Link href="/elerhetoseg" className="text-gray-300 hover:text-white transition-colors">
                  Elérhetőség
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Elérhetőség</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 1051 Budapest, Példa utca 12.</p>
              <p>📞 +36 30 123 4567</p>
              <p>✉️ info@gyogytorna.hu</p>
              <div className="mt-4">
                <p className="font-medium text-white">Rendelési idő:</p>
                <p className="text-sm">Hétfő-Péntek: 8:00-18:00</p>
                <p className="text-sm">Szombat: 8:00-12:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Gyógytorna Szakrendelő. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}