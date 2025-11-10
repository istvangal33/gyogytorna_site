import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Szabályzat | ReStart Physio Győr',
  description: 'ReStart Physio cookie (süti) kezelési szabályzata. Hogyan használjuk a sütiket weboldalunkon.',
  
  openGraph: {
    title: 'Cookie Szabályzat | ReStart Physio',
    description: 'Tájékoztatás a weboldalon használt cookie-kről (sütikről).',
    url: 'https://restartphysio.hu/cookie-policy',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
    type: 'website',
  },
  
  alternates: {
    canonical: 'https://restartphysio.hu/cookie-policy',
  },
  
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#EC7007] transition-colors">
            Kezdőlap
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Cookie kezelése</span>
        </nav>

        {/* Címsor */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Sütik (cookie) kezelése
        </h1>

        {/* Tartalom */}
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-700 leading-relaxed">
            A ReStart Physio weboldala sütiket használ a weboldal működtetése, használatának megkönnyítése, 
            a weboldalon végzett tevékenység nyomon követése és releváns ajánlatok megjelenítése érdekében.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Kérjük, hogy a dokumentumot figyelmesen olvassa el és csak akkor vegye igénybe a weboldal szolgáltatásait, 
            amennyiben minden pontjával egyetért és azokat Önre (a továbbiakban: Felhasználó) nézve kötelező érvényűnek 
            elfogadja. Felhívjuk figyelmét, hogy jelen szabályzat csak az adott weboldalon történő cookie-kezelésre vonatkozik.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Mi az a Cookie?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A cookie (magyarul &quot;süti&quot;) egy olyan kisméretű adatcsomag, amit az internetes szolgáltatások a böngészőben 
            tárolnak el. A hatékony és modern felhasználói élményt nyújtó online szolgáltatás működéséhez elengedhetetlen 
            technológia, amelyet manapság minden böngésző támogat.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Hogyan keletkezik a Cookie?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Először a kliens gép küld egy kérést a kiszolgáló irányába. Ekkor a kiszolgáló létrehoz egy egyedi azonosítót 
            és ezt eltárolja a saját adatbázisában, majd az így létrehozott cookie-t az összes információval visszaküldi 
            a kliensnek. Az így visszakapott információs cookie eltárolódik a kliens gépen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Hogyan hasznosul a Cookie?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Amikor a kliens gép újra kapcsolatba lép a kiszolgálóval már párosítja az előzőleg már létrehozott és eltárolt 
            cookie-t. A kiszolgáló összehasonlítja a kapott és az általa tárolt cookie tartalmát. Ez által könnyedén azonosítja 
            pl. a bejelentkezett regisztrált felhasználót. Enélkül például nem lehetne bejelentkezni egy weboldalra.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Milyen sütiket és mire használ a weboldal?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A weboldal a sütiket a következő célokból használja:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>weboldalunk fejlesztése,</li>
            <li>az Ön navigációjának megkönnyítése weboldalunkon és az oldal funkcióinak használata során, 
                így biztosítva a zökkenőmentes felhasználói élményt,</li>
            <li>információ gyűjtése azzal kapcsolatban, hogy hogyan használja weboldalunkat - annak felmérésével, 
                hogy weboldalunk melyik részeit látogatja vagy használja leginkább, így megtudhatjuk, hogyan biztosítsunk 
                Önnek még jobb felhasználói élményt, ha ismét meglátogatja oldalunkat,</li>
            <li>megtudhatjuk, hogyan biztosítsuk még jobban a felhasználói élményt, ha ismét meglátogatja az oldalunkat,</li>
            <li>célzott hirdetések elhelyezése más weboldalakon,</li>
            <li>böngésző felhasználók megkülönböztetése, azonosítása,</li>
            <li>a weboldalon végzett tevékenységek nyomon követésére azért, hogy általuk még inkább kifejezetten 
                az Önt érdeklő vagy az Ön számára fontos, releváns ajánlatokról üzenetet juttathassunk el az Ön számára.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            A sütik típusai
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Alapműködést biztosító sütik
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ezen sütik biztosítják a weboldal megfelelő működését, megkönnyítik annak használatát, és látogatóink 
            azonosítása nélkül gyűjtenek információt a használatáról.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ide tartozik például a kalkulátorhasználati értékek tárolása, a sütikezelés elfogadásának státusza, 
            bejelentkezési módok és adatok megjegyzése, weboldal értesítési üzenetek státusza és a csökkentett 
            funkcionalitású Google Analytics kód.
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            Ne feledje, ezen sütik alkalmazása nélkül nem tudjuk garantálni Önnek weboldalunk kényelmes használatát.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Statisztikai célú sütik
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Weboldalunk fejlesztésének, valamint a felhasználók számára biztosított élmények javításának céljával olyan 
            sütiket is használunk, melyek lehetővé teszik számunkra, hogy információt gyűjtsünk azzal kapcsolatban, 
            hogyan használják látogatóink weboldalunkat. Ezek a sütik nem tudják Önt személy szerint beazonosítani, 
            olyan információkat gyűjtenek, mint pl. hogy melyik oldalt nézte meg a látogatónk, a felhasználó a weboldal 
            mely részére kattintott, hány oldalt keresett fel, milyen hosszú volt az egyes munkamenetek megtekintési ideje, 
            melyek voltak az esetleges hibaüzenetek.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Teljesítményt biztosító sütik
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ilyen teljesítményt biztosító sütik a Google Analytics sütijei is. A Google Analytics sütikkel kapcsolatos 
            további tudnivalók érdekében kérjük, kattintson ide:{' '}
            <a 
              href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EC7007] hover:underline"
            >
              Google Analytics Cookie Usage
            </a>
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Célzó- és hirdetési sütik
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ezeknek a sütiknek az a célja, hogy általuk még inkább az Önt érdeklő vagy az Ön számára releváns hirdetések 
            jelenjenek meg a weboldalakon. Ezek a sütik az Ön hozzájárulása nélkül nem tudják Önt személy szerint beazonosítani, 
            olyan információkat gyűjtenek, mint pl. hogy melyik oldalt nézte meg a látogatónk, a felhasználó a weboldal mely 
            részére kattintott, hány oldalt keresett fel, mindezt az Ön érdeklődésére számot tartó tartalmak megismerése érdekében.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Amennyiben azonban ehhez hozzájárult, a weboldal használat nyomon követése során összegyűjtött információkat 
            együttesen használhatjuk fel az Ön személyes adataival, annak érdekében, hogy marketing kommunikációnkat még 
            jobban az Ön igényeihez igazíthassuk és az Ön számára minél inkább személyre szabott ajánlatokra hívjuk fel a figyelmét.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Honlapunkon az alábbi szolgáltatók hirdetési sütijeit használjuk:
          </h3>
          
          <div className="space-y-4 ml-4">
            <div>
              <h4 className="font-semibold text-gray-900">Google Analytics</h4>
              <p className="text-gray-700">
                A szolgáltatással kapcsolatos részletes tájékoztató:{' '}
                <a 
                  href="https://www.google.com/intl/hu/policies/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC7007] hover:underline"
                >
                  https://www.google.com/intl/hu/policies/privacy
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Facebook</h4>
              <p className="text-gray-700">
                A szolgáltatással kapcsolatos részletes tájékoztató:{' '}
                <a 
                  href="https://www.facebook.com/help/cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC7007] hover:underline"
                >
                  https://www.facebook.com/help/cookies/
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Instagram</h4>
              <p className="text-gray-700">
                A szolgáltatással kapcsolatos részletes tájékoztató:{' '}
                <a 
                  href="https://help.instagram.com/402411646841720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC7007] hover:underline"
                >
                  https://help.instagram.com/402411646841720
                </a>
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
            Hogyan ellenőrizheti, és hogyan tudja kikapcsolnia a sütiket?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Minden modern böngésző engedélyezi a sütik beállításának a változtatását. A legtöbb böngésző alapértelmezettként 
            automatikusan elfogadja a sütiket, ezek a beállítások azonban általában megváltoztathatók, így a böngésző meg tudja 
            akadályozni az automatikus elfogadást, és minden alkalommal fel tudja ajánlani a választás lehetőségét, hogy 
            engedélyezi-e a sütiket.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Felhívjuk figyelmét, hogy mivel a sütik célja weboldalunk használhatóságának és folyamatainak megkönnyítése vagy 
            lehetővé tétele, a cookie-k alkalmazásának megakadályozása vagy törlése miatt előfordulhat, hogy nem tudja 
            weboldalunk funkcióit teljes körűen használni, illetve hogy a weboldal a tervezettől eltérően fog működni böngészőjében.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            A legnépszerűbb böngészők süti beállításairól az alábbi linkeken tájékozódhat:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" 
                 className="text-[#EC7007] hover:underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/hu/kb/sutik-engedelyezese-es-tiltasa-amit-weboldak-haszn" 
                 target="_blank" rel="noopener noreferrer" className="text-[#EC7007] hover:underline">
                Firefox
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/hu-hu/windows/cookie-k-t%C3%B6rl%C3%A9se-%C3%A9s-kezel%C3%A9se-168dab11-0753-043d-7c16-ede5947fc64d" 
                 target="_blank" rel="noopener noreferrer" className="text-[#EC7007] hover:underline">
                Microsoft Edge
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/hu-hu/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                 target="_blank" rel="noopener noreferrer" className="text-[#EC7007] hover:underline">
                Safari
              </a>
            </li>
          </ul>

          <div className="bg-gray-100 border-l-4 border-[#EC7007] p-4 mt-8">
            <p className="text-sm text-gray-700 italic">
              Jelen dokumentum tájékoztató jellegű. Ha bármilyen kérdése van a cookie-kezeléssel kapcsolatban, 
              kérjük vegye fel velünk a kapcsolatot:{' '}
              <a href="mailto:restart.gyor@gmail.com" className="text-[#EC7007] hover:underline">
                restart.gyor@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Vissza gomb */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC7007] text-white rounded-lg hover:bg-[#d96306] transition-colors"
          >
            ← Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
