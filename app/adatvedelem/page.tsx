import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Adatvédelmi Tájékoztató | ReStart Physio Győr',
  description: 'ReStart Physio adatvédelmi tájékoztatója. GDPR-kompatibilis adatkezelés, személyes adatok védelme, cookie szabályzat.',
  
  openGraph: {
    title: 'Adatvédelmi Tájékoztató | ReStart Physio',
    description: 'GDPR-kompatibilis adatkezelés és személyes adatok védelme.',
    url: 'https://restartphysio.hu/adatvedelem',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
    type: 'website',
  },
  
  alternates: {
    canonical: 'https://restartphysio.hu/adatvedelem',
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#EC7007] transition-colors">
            Kezdőlap
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Adatkezelési tájékoztató</span>
        </nav>


        {/* Tartalom */}
        <div className="prose prose-lg max-w-none space-y-6">
        
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Adatkezelési tájékoztató
          </h1>

          {/* Tartalom */}
          <div className="prose prose-lg max-w-none space-y-6">
            
            {/* Bevezető */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Adatkezelési szabályzat</h2>
              <p className="text-gray-700 leading-relaxed">
                A természetes személyeknek a személyes adatok kezelése tekintetében történő védelméről és az ilyen adatok szabad áramlásáról, valamint a 95/46/EK rendelet hatályon kívül helyezéséről (általános adatvédelmi rendelet) AZ EURÓPAI PARLAMENT ÉS A TANÁCS (EU) 2016/679 RENDELETE (2016. április 27.) szerint az Adatkezelő által Restart Physio néven működtetett vállalkozás (továbbiakban: Szolgáltatás) az alábbi adatkezelési szabályzattal rendelkezik:
              </p>
            </div>

            {/* 1. Az Adatkezelő és elérhetőségei */}
            <section id="adatkezelo-adatok">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                I. Az Adatkezelő és elérhetőségei
              </h2>

              {/* 1.1 Adatkezelő/Szolgáltató neve */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Adatkezelő/Szolgáltató (továbbiakban: Szolgáltató) adatai
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Amennyiben megkeresné vállalkozásunkat, az alábbi elérhetőségeken léphet kapcsolatba az adatkezelővel:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <p className="mb-2 text-gray-700"><strong>Forrás Fernanda egyéni vállalkozó</strong></p>
                <p className="mb-2 text-gray-700"><strong>Szolgáltatás megnevezése:</strong> Restart Physio</p>
                <p className="mb-2 text-gray-700"><strong>Székhely:</strong> 9700 Szombathely, Munkácsy Mihály utca 29/a</p>
                <p className="mb-2 text-gray-700"><strong>Telephely:</strong> 9028 Győr, Máté Mária utca 4/B 3. emelet 24. számú ajtó</p>
                <p className="mb-2 text-gray-700"><strong>Tulajdonos / működtető neve:</strong> Forrás Fernanda</p>
                <p className="mb-2 text-gray-700"><strong>Cégforma:</strong> egyéni vállalkozás</p>
                <p className="mb-2 text-gray-700"><strong>Nyilvántartási szám:</strong> <span className="text-gray-500 italic">[kitöltendő]</span></p>
                <p className="mb-2 text-gray-700"><strong>Adószám:</strong> <span className="text-gray-500 italic">[kitöltendő]</span></p>
                <p className="mb-2 text-gray-700"><strong>TEÁOR:</strong> 8690 – Egyéb humán-egészségügyi ellátás</p>
                <p className="mb-2 text-gray-700"><strong>Szakmai felelős neve:</strong> Forrás Fernanda</p>
                <p className="mb-2 text-gray-700"><strong>Végzettség:</strong> okleveles gyógytornász-fizioterapeuta</p>
                <p className="mb-2 text-gray-700"><strong>Működési nyilvántartási szám:</strong> 251415</p>
                <p className="mb-2 text-gray-700"><strong>E-mail:</strong> restart.gyor@gmail.com</p>
                <p className="mb-2 text-gray-700"><strong>Telefon:</strong> +36 30 819 8449</p>
                <p className="mb-2 text-gray-700"><strong>Weboldal:</strong> <Link href="https://restartphysio.hu" className="text-EC7007 hover:underline font-semibold">restartphysio.hu</Link>/</p>
              </div>

              {/* 2. Az adatkezelés célja */}
              <h3 className="text-xl font-semibold text-gray-900 mt-12 mb-6 p-4">
                2. Az adatkezelés célja és elvei
              </h3>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.1. Az adatkezelési szabályzat célja
              </h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Jelen szabályzat célja, hogy az érintettek megfelelő tájékoztatást kaphassanak a Szolgáltatás által kezelt, illetve az általa megbízott adatfeldolgozó által feldolgozott adatokról, azok forrásáról, az adatkezelés céljáról, jogalapjáról, időtartamáról, az adatkezelésbe esetlegesen bevont adatfeldolgozó nevéről, címéről és az adatkezeléssel összefüggő tevékenységéről, továbbá - az érintett személyes adatainak továbbítása esetén - az adattovábbítás jogalapjáról és címzettjéről a mozgásszervi problémák, sportsérülések megelőzése, kezelése, rehabilitációja, a páciensek általános közérzetének javítása, a műtétek utáni rehabilitáció elvégzése és a páciensek nyomon követése érdekében.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.2. A NAIH ajánlásainak betartása
              </h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Adatkezelő törekszik arra, hogy minél pontosabban betartsa a Nemzeti Adatvédelmi és Információszabadság Hatóság ajánlásait, így különösen az előzetes tájékoztatás adatvédelmi követelményeiről szóló 2015. szeptember hó 29. napján kiadott ajánlását, és ezért a lehető legérthetőbben fejezi ki az adatvédelmi szabályokat, szükség esetén példákkal magyarázva azokat, valamint részletesen bemutatja az egyes adatkezelési tevékenységeket, hogy az érintett mindezek ismeretében tudja eldönteni azt, hogy önkéntes hozzájárulását adja azokhoz, vagy sem.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.3. Kapcsolatfelvételi lehetőségek
              </h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Amennyiben megkeresné a Szolgáltatást, a fenti elérhetőségeken és a <strong>https://restartphysio.hu/elerhetoseg</strong> honlapon megadott módon léphet kapcsolatba az adatkezelővel.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.4. E-mailek megőrzési ideje
              </h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás minden, hozzá beérkezett e-mailt a küldő nevével, e-mail címével, a dátum, időpont adatokkal és más, az üzenetben megadott egyéb személyes adatokkal együtt az adatközléstől számított öt év elteltével töröl.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.5. Hatósági megkeresések és egyéb rendelkezések
              </h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  E tájékoztatóban fel nem sorolt adatkezelésekről az adat felvételekor adunk tájékoztatást.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Tájékoztatjuk az Érintetteket, hogy a bíróság, az ügyész, a nyomozó hatóság, a szabálysértési hatóság, a közigazgatási hatóság, a Nemzeti Adatvédelmi és Információszabadság Hatóság, illetőleg jogszabály felhatalmazása alapján más szervek tájékoztatás adása, adatok közlése, átadása, illetőleg iratok rendelkezésre bocsátása végett megkereshetik az adatkezelőt. A Szolgáltatás a hatóságok részére – amennyiben a hatóság a pontos célt és az adatok körét megjelölte – személyes adatot csak annyit és olyan mértékben ad ki, amely a megkeresés céljának megvalósításához elengedhetetlenül szükséges.
                </p>
              </div>
            </section>

            {/* II. A szabályzat hatálya */}
            <section id="szabalyzat-hatalya">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                II. A szabályzat hatálya
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  Jelen szabályzat az online és/vagy a Szolgáltatás telephelyén átadott személyes adatok kezelésére vonatkozik.
                </p>
              </div>

              {/* 1. Időbeli hatály */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Időbeli hatály
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Jelen Szabályzat aláírásának napján lép hatályba és visszavonásig hatályos.
                </p>
              </div>

              {/* 2. Személyi hatály */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Személyi hatály
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jelen Szabályzat személyi hatálya kiterjed:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>az Adatkezelőre, továbbá</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>azon személyekre, akik adatait e Szabályzat hatálya alá tartozó adatkezelések tartalmazzák, továbbá</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>azon személyekre, akik jogait vagy jogos érdekeit az adatkezelés érinti</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Az Adatkezelő elsősorban azoknak a természetes személyeknek az adatait kezeli, akik a mozgásszervi problémák, sportsérülések megelőzése, kezelése és rehabilitációja, a páciensek általános közérzetének javítása, a műtétek utáni rehabilitáció elvégzése, nyomon követés, közérzetjavítás céljából veszik fel a kapcsolatot az Adatkezelővel az Adatkezelő bármely e-mail címére küldött adataikkal, közösségi oldalon keresztül, telefonon vagy személyesen
                </p>

                <ul className="space-y-2 text-gray-700 ml-4 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>az Adatkezelő nyilvántartása érdekében, a szolgáltatás igénybevételével kapcsolatos, jogaik gyakorlása és kötelezettségeik teljesítése érdekében azzal összefüggésben,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>kapcsolat kialakítása céljából jelentkeztek,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>kapcsolat kialakításán kívül eső más okból vagy célból jelentkeztek</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>az Adatkezelő Munkatársai, alkalmazottai, megbízottai</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>az Adatkezelő természetes személy Partnerei, nem természetes személy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>szerződéses partnereinek képviselői, kapcsolattartói</span>
                  </li>
                </ul>
              </div>

              {/* 3. Tárgyi hatály */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Tárgyi hatály
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Jelen Szabályzat hatálya kiterjed az Adatkezelő által folytatott valamennyi személyes adatokat tartalmazó adatkezelésre, függetlenül attól, hogy az elektronikusan és/vagy papíralapon történik.
                </p>
              </div>
            </section>


            {/* III. Alkalmazandó jogszabályok */}
            <section id="jogszabalyok">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                III. Alkalmazandó fontosabb adatvédelemmel kapcsolatos jogszabályok
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>1997 évi CLIV. sz. törvény az egészségügyről</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>1997. évi XLVII. törvény az egészségügyi és a hozzájuk kapcsolódó személyes adatok kezeléséről és védelméről</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>1997. évi CLV. törvény – a fogyasztóvédelemről</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>1998. évi XIX. törvény – a büntetőeljárásról</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>2000. évi C. törvény – a számvitelről</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>2001. évi CVIII. törvény – az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>2011. évi CXII. törvény – az információs önrendelkezési jogról és az információszabadságról (Infotv.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>2013. évi V. törvény – a Polgári Törvénykönyvről (Ptk.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">•</span>
                    <span>Az Európai Parlament és a Tanács (EU) 2016/679 Rendelete (GDPR)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                1. A tájékoztató módosítása
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás fenntartja magának a jogot jelen tájékoztató bármikor történő megváltoztatására, az esetleges változásokról kellő időben értesíti a hozzá fordulókat és egyéb partnereit, illetve honlapján közzéteszi a változásokat.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                2. Joghatóság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatással kapcsolatos bármilyen jogvita a magyar joghatóság, a magyar bíróságok illetékessége alá tartozik a magyar jogszabályok alapul vételével.
A Szolgáltatás adatkezelési alapelvei összhangban vannak az adatvédelemmel kapcsolatos hatályos jogszabályokkal.
                </p>
              </div>
            </section>

            {/* IV. Fogalom meghatározás */}
            <section id="fogalmak">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                IV. Fogalom meghatározás
              </h2>

              {/* 1. Személyes adat */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Személyes adat
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Azonosított vagy azonosítható természetes személyre („érintett") vonatkozó bármely információ; azonosítható az a természetes személy, aki közvetlen vagy közvetett módon, különösen valamely azonosító, például név, szám, helymeghatározó adat, online azonosító vagy a természetes személy testi, fiziológiai, genetikai, szellemi, gazdasági, kulturális vagy szociális azonosságára vonatkozó egy vagy több tényező alapján azonosítható.
                </p>
              </div>

              {/* 2. Adatkezelés */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Adatkezelés
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatokon vagy adatállományokon automatizált vagy nem automatizált módon végzett bármely művelet vagy műveletek összessége, így a gyűjtés, rögzítés, rendszerezés, tagolás, tárolás, átalakítás vagy megváltoztatás, lekérdezés, betekintés, felhasználás, közlés továbbítás, terjesztés vagy egyéb módon történő hozzáférhetővé tétel útján, összehangolás vagy összekapcsolás, korlátozás, törlés, illetve megsemmisítés.
                </p>
              </div>

              {/* 3. Adatkezelő */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Adatkezelő
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az a természetes vagy jogi személy, illetve jogi személyiséggel nem rendelkező szervezet, aki, vagy amely önállóan vagy másokkal együtt az adatok kezelésének célját meghatározza, az adatkezelésre (beleértve a felhasznált eszközt) vonatkozó döntéseket meghozza és végrehajtja, vagy az általa megbízott adatfeldolgozóval végrehajtatja.
                </p>
              </div>

              {/* 4. Adatfeldolgozó */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Adatfeldolgozó
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az a természetes vagy jogi személy, közhatalmi szerv, ügynökség vagy bármely egyéb szerv, amely az adatkezelő nevében személyes adatokat kezel.
                </p>
              </div>

              {/* 5. Adatállomány */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Adatállomány
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az egy nyilvántartásban kezelt adatok összessége.
                </p>
              </div>

              {/* 6. Címzett */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. Címzett
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az a természetes vagy jogi személy, közhatalmi szerv, ügynökség vagy bármely egyéb szerv, akivel vagy amellyel a személyes adatot közlik, függetlenül attól, hogy harmadik fél-e. Azon közhatalmi szervek, amelyek egy egyedi vizsgálat keretében az uniós vagy a tagállami joggal összhangban férhetnek hozzá személyes adatokhoz, nem minősülnek címzettnek; az említett adatok e közhatalmi szervek általi kezelése meg kell, hogy feleljen az adatkezelés céljainak megfelelően az alkalmazandó adatvédelmi szabályoknak.
                </p>
              </div>

              {/* 7. Hozzájárulás */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7. Hozzájárulás
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az érintett akaratának önkéntes és határozott kinyilvánítása, amely megfelelő tájékoztatáson alapul, és amellyel félreérthetetlen beleegyezését adja a rá vonatkozó személyes adatok - teljes körű vagy egyes műveletekre kiterjedő – kezeléséhez, így tehát a hozzájárulásnak 3 alapeleme van: az önkéntesség, a határozottság és a megfelelő tájékozottság.
                </p>
              </div>

              {/* 8. Harmadik személy */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8. Harmadik személy
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Olyan természetes vagy jogi személy, illetve jogi személyiséggel nem rendelkező szervezet, aki vagy amely nem azonos az érintettel, az adatkezelővel vagy az adatfeldolgozóval.
                </p>
              </div>

              {/* 9. Adatvédelmi incidens */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9. Adatvédelmi incidens
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Személyes adat jogellenes kezelése vagy feldolgozása, így különösen a jogosulatlan hozzáférés, megváltoztatás, továbbítás, nyilvánosságra hozatal, törlés vagy megsemmisítés, valamint a véletlen megsemmisülés és sérülés.
                </p>
              </div>

              {/* 10. Partner */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10. Partner
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Adatkezelő szolgáltatásait szerződés alapján igénybe vevő és/vagy az Adatkezelő szolgáltatásainak teljesítéseit elősegítő (teljesítési segéd) jogi személyek, jogi személyiséggel nem rendelkező gazdasági társaságok, amelyek felé az Adatkezelő - az érintett hozzájárulását követően - személyes adatot továbbít vagy továbbíthat, vagy amelyek az Adatkezelő számára adattárolási, feldolgozási, kapcsolódó informatikai és egyéb biztonságos adatkezelést elősegítő tevékenységet végeznek vagy végezhetnek.
                </p>
              </div>

              {/* 11. Munkatárs */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                11. Munkatárs
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Adatkezelővel megbízási-, munka- vagy egyéb jogviszonyban levő természetes személy, aki az Adatkezelő szolgáltatásainak ellátásának, teljesítésének feladatával van bízva és adatkezelési vagy adatfeldolgozási feladatai során személyes adatokkal kapcsolatba kerül vagy kerülhet és akinek tevékenységével kapcsolatban az Adatkezelő teljes felelősséget vállal az érintettek személyi köre és harmadik személyek irányában.
                </p>
              </div>

              {/* 12. Weboldal (honlap) */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                12. Weboldal (honlap)
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A portál és minden aloldala, amelynek üzemeltetője az Adatkezelő.
                </p>
              </div>

              {/* 13. Közösségi oldal */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                13. Közösségi oldal
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A portálon található, a weboldalhoz, annak tartalmához kapcsolódó oldal, amelynek gondozását az Adatkezelő végzi.
                </p>
              </div>
            </section>

            {/* V. Alapelvek */}
            <section id="alapelvek">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                V. Alapelvek
              </h2>

              {/* 1. Jogszerűség, tisztességes eljárás és átláthatóság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Jogszerűség, tisztességes eljárás és átláthatóság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatok kezelését jogszerűen és tisztességesen, valamint az érintett számára átlátható módon kell végezni.
                </p>
              </div>

              {/* 2. Célhoz kötöttség */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Célhoz kötöttség
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatok gyűjtése csak meghatározott, egyértelmű és jogszerű célból történjen, és azokat ne kezeljék ezekkel a célokkal össze nem egyeztethető módon; a 89. cikk (1) bekezdésének megfelelően nem minősül az eredeti céllal össze nem egyeztethetőnek a közérdekű archiválás céljából, tudományos és történelmi kutatási célból vagy statisztikai célból történő további adatkezelés.
                </p>
              </div>

              {/* 3. Adattakarékosság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Adattakarékosság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatok az adatkezelés céljai szempontjából megfelelőek és relevánsak kell, hogy legyenek, és a szükségesre kell korlátozódniuk.
                </p>
              </div>

              {/* 4. Pontosság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Pontosság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatoknak pontosnak és szükség esetén naprakésznek kell lenniük; minden ésszerű intézkedést meg kell tenni annak érdekében, hogy az adatkezelés céljai szempontjából pontatlan személyes adatokat haladéktalanul töröljék vagy helyesbítsék.
                </p>
              </div>

              {/* 5. Korlátozott tárolhatóság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Korlátozott tárolhatóság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatok tárolásának olyan formában kell történnie, amely az érintettek azonosítását csak a személyes adatok kezelése céljainak eléréséhez szükséges ideig teszi lehetővé; a személyes adatok ennél hosszabb ideig történő tárolására csak akkor kerülhet sor, amennyiben a személyes adatok kezelésére a 89. cikk (1) bekezdésének megfelelően közérdekű archiválás céljából, tudományos és történelmi kutatási célból vagy statisztikai célból kerül majd sor, az e rendeletben az érintettek jogainak és szabadságainak védelme érdekében előírt megfelelő technikai és szervezési intézkedések végrehajtására is figyelemmel.
                </p>
              </div>

              {/* 6. Integritás és bizalmas jelleg */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. Integritás és bizalmas jelleg
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A személyes adatok kezelését oly módon kell végezni, hogy megfelelő technikai vagy szervezési intézkedések alkalmazásával biztosítva legyen a személyes adatok megfelelő biztonsága, az adatok jogosulatlan vagy jogellenes kezelésével, véletlen elvesztésével, megsemmisítésével vagy károsodásával szembeni védelmet is ideértve.
                </p>
              </div>

              {/* 7. Elszámoltathatóság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7. Elszámoltathatóság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az adatkezelő felelős a fentiek megfelelésért, továbbá képesnek kell lennie e megfelelés igazolására.
                </p>
              </div>
            </section>


            {/* VI. Érintettek jogai */}
            <section id="erintettek-jogai">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                VI. Érintettek jogai (törlés, elfeledtetés, tiltakozás stb.)
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett tájékoztatást kérhet személyes adatai kezeléséről, valamint kérheti személyes adatainak helyesbítését, illetve – a kötelező adatkezelések kivételével – törlését vagy zárolását az erre irányuló kérelem űrlap kitöltésével.
                </p>
              </div>

              {/* 1. Tájékoztatáshoz való jog */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Tájékoztatáshoz való jog
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintett kérelmére a Szolgáltatás, mint Adatkezelő tájékoztatást ad az általa kezelt, illetőleg az általa megbízott feldolgozó által feldolgozott adatairól, azok forrásáról, az adatkezelés céljáról, jogalapjáról, időtartamáról, az adatfeldolgozó nevéről, címéről és az adatkezeléssel összefüggő tevékenységéről, az adatvédelmi incidens körülményeiről, hatásairól és az elhárítására megtett intézkedésekről, továbbá adattovábbítás esetén annak jogalapjáról és címzettjéről.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás a kérelem benyújtásától számított legrövidebb idő alatt, legfeljebb azonban 25 napon belül, közérthető formában, az érintett erre irányuló kérelmére írásban adja meg a tájékoztatást.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  E tájékoztatás ingyenes, ha a tájékoztatást kérő a folyó évben azonos adatkörre vonatkozó tájékoztatási kérelmet az adatkezelőhöz még nem nyújtott be. Egyéb esetekben a Szolgáltatás költségtérítést állapít meg.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett tájékoztatását a Szolgáltatás csak törvényben meghatározott esetekben tagadhatja meg. A tájékoztatás megtagadása esetén a Szolgáltatás írásban közli az Érintettel, hogy a felvilágosítás megtagadására az Infótörvény mely rendelkezése alapján került sor. A felvilágosítás megtagadása esetén a Szolgáltatás tájékoztatja az Érintettet a bírósági jogorvoslat, továbbá a Felügyeleti Hatósághoz (NAIH) fordulás lehetőségéről.
                </p>
              </div>

              {/* 2. Helyesbítés joga */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Helyesbítés joga
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Ha a személyes adat a valóságnak nem felel meg, és a valóságnak megfelelő személyes adat a Szolgáltatás rendelkezésére áll, a személyes adatot a Szolgáltatás helyesbíti.
                </p>
              </div>

              {/* 3. Törléshez való jog */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Törléshez való jog
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás a személyes adatot törli, ha:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>kezelése jogellenes;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>az érintett kéri (kivéve, ha az adatkezelés jogszabály alapján kötelező);</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>az hiányos vagy téves - és ez az állapot jogszerűen nem orvosolható -, feltéve, hogy a törlést törvény nem zárja ki;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>az adatkezelés célja megszűnt, vagy az adatok tárolásának törvényben meghatározott határideje lejárt (kivéve azt az adatot, amelynek adathordozóját a levéltári anyag védelmére vonatkozó jogszabály értelmében levéltári őrizetbe kell adni);</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">e)</span>
                    <span>azt a bíróság vagy a Hatóság elrendelte.</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mt-6 mb-3 font-semibold">
                  Az adat kezelése jogellenes, ha:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>az adat hiányos vagy téves - és ez az állapot jogszerűen nem orvosolható -, feltéve, hogy a törlést törvény nem zárja ki;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>az adatkezelés célja megszűnt, vagy az adatok tárolásának törvényben meghatározott határideje lejárt;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>azt a bíróság vagy a Hatóság elrendelte;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>a személyes adatokra már nincs szükség abból a célból, amelyből azokat gyűjtötték vagy más módon kezelték;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">e)</span>
                    <span>az érintett tiltakozik az adatkezelés ellen és nincsen elsőbbséget élvező jogszerű ok az adatkezelésre.</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mt-6 mb-3 font-semibold">
                  Az adattörlés korlátai:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>a véleménynyilvánítás szabadságához és a tájékozódáshoz való jog gyakorlása;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>a személyes adatok kezelését előíró, az adatkezelőre alkalmazandó uniós vagy tagállami jog szerinti kötelezettség teljesítése, illetve közérdekből vagy az adatkezelőre ruházott közhatalmi jogosítvány gyakorlása keretében végzett feladat végrehajtása;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>népegészségügy területét érintő közérdek;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>az EU 2016/679 Rendelet 89. cikk (1) bekezdésével összhangban a közérdekű archiválás céljából, tudományos és történelmi kutatási célból vagy statisztikai célból, amennyiben a törléshez való jog valószínűsíthetően lehetetlenné tenné vagy komolyan veszélyeztetné ezt az adatkezelést; vagy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">e)</span>
                    <span>jogi igények előterjesztése, érvényesítése, illetve védelme.</span>
                  </li>
                </ul>
              </div>

              {/* 4. Az adatkezelés korlátozásához való jog */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Az adatkezelés korlátozásához való jog
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az érintett jogosult arra, hogy kérésére az adatkezelő korlátozza az adatkezelést, ha az alábbiak valamelyike teljesül:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>az érintett vitatja a személyes adatok pontosságát, ez esetben a korlátozás arra az időtartamra vonatkozik, amely lehetővé teszi, hogy az adatkezelő ellenőrizze a személyes adatok pontosságát;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>az adatkezelés jogellenes, és az érintett ellenzi az adatok törlését, és ehelyett kéri azok felhasználásának korlátozását;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>az adatkezelőnek már nincs szüksége a személyes adatokra adatkezelés céljából, de az érintett igényli azokat jogi igények előterjesztéséhez, érvényesítéséhez vagy védelméhez; vagy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>az érintett tiltakozott az adatkezelés ellen; ez esetben a korlátozás arra az időtartamra vonatkozik, amíg megállapításra nem kerül, hogy az adatkezelő jogos indokai elsőbbséget élveznek-e az érintett jogos indokaival szemben.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ha az adatkezelés korlátozás alá esik, az ilyen személyes adatokat a tárolás kivételével csak az Érintett hozzájárulásával, vagy jogi igények előterjesztéséhez, érvényesítéséhez vagy védelméhez, vagy más természetes vagy jogi személy jogainak védelme érdekében, vagy az Unió, illetve valamely tagállam fontos közérdekéből lehet kezelni.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Az Adatkezelő az Érintettet, akinek a kérésére korlátozták az adatkezelést, az adatkezelés korlátozásának feloldásáról előzetesen tájékoztatja.
                </p>
              </div>

              {/* 5. Eljárási szabályok */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Eljárási szabályok
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A személyes adatok törlésére, korlátozására, helyesbítésére 25 (huszonöt) nap áll az Adatkezelő rendelkezésére. Szükség esetén, figyelembe véve a kérelem összetettségét és a kérelmek számát, ez a határidő további két hónappal meghosszabbítható. A határidő meghosszabbításáról az adatkezelő a késedelem okainak megjelölésével a kérelem kézhezvételétől számított egy hónapon belül tájékoztatja az érintettet. Ha az érintett elektronikus úton nyújtotta be a kérelmet, a tájékoztatás elektronikus úton kerül megadásra, kivéve, ha az érintett azt másként kéri.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Amennyiben az Adatkezelő az érintett helyesbítés, zárolás vagy törlés iránti igényét nem teljesíti, 25 (huszonöt) napon belül írásban vagy az Érintett hozzájárulásával elektronikus úton közli az elutasítás indokait.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A kérelem elutasítása esetén az Adatkezelő tájékoztatja az Érintettet a bírósági jogorvoslat, továbbá a Hatósághoz fordulás lehetőségéről. Az Érintett jogainak megsértése esetén bírósághoz fordulhat. Azt, hogy az adatkezelés a jogszabályban foglaltaknak megfelel, az Adatkezelő köteles bizonyítani. A per elbírálása a törvényszék hatáskörébe tartozik. A per – az Érintett választása szerint – az érintett lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindítható.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Az Adatkezelő a helyesbítésről, a zárolásról, a megjelölésről és a törlésről az Érintettet, továbbá mindazokat értesíti, akiknek korábban az adatot adatkezelés céljára továbbította. Az értesítést mellőzi, ha ez az adatkezelés céljára való tekintettel az Érintett jogos érdekét nem sérti.
                </p>
              </div>

              {/* 6. Adathordozáshoz való jog */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. Adathordozáshoz való jog
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett jogosult arra, hogy a rá vonatkozó, általa az adatkezelő rendelkezésére bocsátott személyes adatokat tagolt, széles körben használt, géppel olvasható formátumban megkapja, és ezeket az adatokat egy másik adatkezelőnek továbbítsa.
                </p>
              </div>

              {/* 7. Tiltakozás joga */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7. Tiltakozás joga
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintett tiltakozhat személyes adatának kezelése ellen, ha:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>a személyes adatok kezelése vagy továbbítása kizárólag az adatkezelőre vonatkozó jogi kötelezettség teljesítéséhez vagy az adatkezelő, adatátvevő vagy harmadik személy jogos érdekének érvényesítéséhez szükséges, kivéve, ha az adatkezelést törvény rendelte el;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>a személyes adat felhasználása vagy továbbítása közvetlen üzletszerzés, közvélemény-kutatás vagy tudományos kutatás céljára történik;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>törvényben meghatározott egyéb esetben.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás a tiltakozást a kérelem benyújtásától számított legrövidebb időn belül, de legfeljebb 15 nap alatt megvizsgálja, annak megalapozottsága kérdésében döntést hoz, és döntéséről a kérelmezőt írásban tájékoztatja. Ha a Szolgáltatás az érintett tiltakozásának megalapozottságát megállapítja, az adatkezelést - beleértve a további adatfelvételt és adattovábbítást is - megszünteti, és az adatokat zárolja, valamint a tiltakozásról, továbbá az annak alapján tett intézkedésekről értesíti mindazokat, akik részére a tiltakozással érintett személyes adatot korábban továbbította, és akik kötelesek intézkedni a tiltakozási jog érvényesítése érdekében.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Amennyiben az Érintett a Szolgáltatás meghozott döntésével nem ért egyet, az ellen - annak közlésétől számított 30 napon belül - bírósághoz fordulhat.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás az Érintett adatát nem törölheti, ha az adatkezelést törvény rendelte el. Az adat azonban nem továbbítható az adatátvevő részére, ha a Szolgáltatás egyetértett a tiltakozással, illetőleg a bíróság a tiltakozás jogosságát megállapította.
                </p>
              </div>

              {/* 8. Automatizált döntéshozatal */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8. Automatizált döntéshozatal egyedi ügyekben, beleértve a profilalkotást
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az érintett jogosult arra, hogy ne terjedjen ki rá az olyan, kizárólag automatizált adatkezelésen – ideértve a profilalkotást is – alapuló döntés hatálya, amely rá nézve joghatással járna vagy őt hasonlóképpen jelentős mértékben érintené.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nem alkalmazható a fenti jogosultság, ha az adatkezelés az érintett és az adatkezelő közötti szerződés megkötése vagy teljesítése érdekében szükséges; meghozatalát az adatkezelőre alkalmazandó olyan uniós vagy tagállami jog teszi lehetővé, amely az érintett jogainak és szabadságainak, valamint jogos érdekeinek védelmét szolgáló megfelelő intézkedéseket is megállapít; vagy az érintett kifejezett hozzájárulásán alapul.
                </p>
              </div>
            </section>

            {/* VII. Az adatkezelés biztonsági elvei */}
            <section id="biztonsagi-elvek">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                VII. Az adatkezelés biztonsági elvei
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás a személyes adatok kezeléséhez a szolgáltatás nyújtása során alkalmazott informatikai eszközöket úgy választja meg és üzemelteti, hogy a kezelt adat:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>az arra feljogosítottak számára hozzáférhető (rendelkezésre állás);</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>hitelessége és hitelesítése biztosított (adatkezelés hitelessége);</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>változatlansága igazolható (adatintegritás);</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>a jogosulatlan hozzáférés ellen védett (adat bizalmassága) legyen.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás olyan műszaki, szervezési és szervezeti intézkedésekkel gondoskodik az adatkezelés biztonságának védelméről, amely az adatkezeléssel kapcsolatban jelentkező kockázatoknak megfelelő védelmi szintet nyújt.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Adatkezelés során megőrzött elvek
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás az adatkezelés során megőrzi:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span><strong>a titkosságot:</strong> megvédi az információt, hogy csak az férhessen hozzá, aki erre jogosult;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span><strong>a sértetlenséget:</strong> megvédi az információnak és a feldolgozás módszerének a pontosságát és teljességét;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span><strong>a rendelkezésre állást:</strong> gondoskodik arról, hogy amikor a jogosult használónak szüksége van rá, valóban hozzá tudjon férni a kívánt információhoz, és rendelkezésre álljanak az ezzel kapcsolatos eszközök.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Informatikai biztonság
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás informatikai rendszere és hálózata egyaránt védett a számítógéppel támogatott csalás, kémkedés, szabotázs, vandalizmus, tűz és árvíz, továbbá a számítógépvírusok, a számítógépes betörések és a szolgálatmegtagadásra vezető támadások ellen. Az üzemeltető a biztonságról szerverszintű és alkalmazásszintű védelmi eljárásokkal gondoskodik.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Tájékoztatjuk az Érintetteket, hogy az interneten továbbított elektronikus üzenetek, protokolltól (e-mail, web, ftp, stb.) függetlenül sérülékenyek az olyan hálózati fenyegetésekkel szemben, amelyek tisztességtelen tevékenységre, szerződés vitatására, vagy az információ felfedésére, módosítására vezetnek. Az ilyen fenyegetésektől megvédendő a Szolgáltatás megtesz minden tőle elvárható óvintézkedést. A rendszereket megfigyeli annak érdekében, hogy minden biztonsági eltérést rögzíthessen, és bizonyítékkal szolgálhasson minden biztonsági esemény esetében. A rendszermegfigyelés ezen kívül lehetővé teszi az alkalmazott óvintézkedések hatékonyságának ellenőrzését is.
                </p>
              </div>

              {/* Táblázat 1: Szolgáltatás működésével kapcsolatos adatkezelések */}
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                3. A Szolgáltatás működésével kapcsolatos adatkezelések
              </h3>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Érintettek</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Kezelt adat</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Adatkezelés célja</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Adatkezelés jogalapja</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Munkavállalók</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Név, születési név, születési hely és idő, anyja neve, lakcím, állampolgárság, 
                        adóazonosító jel, TAJ szám, bankszámlaszám, személyi igazolvány szám
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">A munkajogviszonnyal kapcsolatos ügyintézés.</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">2011. évi CXII. törvény (Infotv.), 2012. évi I. törvény (Mt.), 2017. évi CL. törvény (Art.) illetve az érintett hozzájárulása.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Partnerek, szállítók</td>
                       <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Név, email cím, telefonszám, számlázási cím, cégnév, adószám, 
                        bankszámlaszám, kapcsolattartó neve
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">A Szolgáltatás és partnerei, illetve szállítói közötti együttműködés, kapcsolatteremtés lehetővé tétele, megkönnyítése.</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">2011. évi CXII. törvény (Infotv.), 2005. évi CLXIV. tv. (Kertv.) illetve az érintett hozzájárulása.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Ügyfelek</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Név, email cím, telefonszám, lakcím, születési dátum, TAJ szám, 
                        egészségügyi adatok (anamnézis, diagnózis, kezelési terv), szerződéses adatok
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Az adatkezelés célja az érintett számára megfelelő szolgáltatás, információ, ajánlat nyújtása és kapcsolattartás, panasz esetén a panasz közlésének lehetővé tétele, a panasz azonosítása és a törvényből származó kötelezettségek, kötelező adatok felvétele.</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">2011. évi CXII. törvény (Infotv.), illetve az érintett hozzájárulása. 1997. évi XLVII. törvény (kifejezett, írásbeli és célhoz kötött hozzájárulása)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Táblázat 2: Adatfeldolgozók */}
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                4. Adatfeldolgozók megnevezése
              </h3>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Adatfeldolgozó</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Adatfeldolgozással kapcsolatos információk</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Az adatfeldolgozás jogalapja</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Online fizetési szolgáltató</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        A kezelt adatok köre: név, e-mail cím. Az adatkezelés célja az adományozás lebonyolítása, a tranzakciók visszaigazolása és a felhasználók védelme érdekében végzett fraud-monitoring (visszaélések ellenőrzése). Az adatkezelés időtartama, az adatok törlésének határideje: az online fizetés lebonyolítása.
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Érintett hozzájárulása, az 2011. évi CXII. törvény (Infotv.), 2001. évi CVIII. törvény (Eker. tv.)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Tárhely szolgáltató</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Az adatkezelés célja a weboldal elérhetővé tétele, megfelelő működtetése. Az adatkezelés időtartama a regisztráció törléséig tart.
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Érintett hozzájárulása, az 2011. évi CXII. törvény (Infotv.), 2001. évi CVIII. törvény (Eker. tv.)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Munkatárs, alvállalkozó</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        A szolgáltatás nyújtásához szükséges tartalommal és mértékben írásbeli hozzájáruló nyilatkozat alapján
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Érintett célhoz kötött hozzájárulása a 2011. évi CXII. törvény (Infotv.) alapján</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Könyvelő</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Számlákon, bizonylatokon szereplő adatok, azok Számviteli törvény szerinti megőrzési idejéig.
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Érintett hozzájárulása, 2000. évi C. sz. törvény a számvitelről, az Áfa törvény</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Jogi képviselő</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        Az ügyvédségről szóló hatályos törvény szerinti adatokkal kapcsolatos
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">2017. évi LXXVIII. s. tv az ügyvédi tevékenységről</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* VIII. Honlappal kapcsolatos adatkezelési tudnivalók */}
            <section id="cookie-tajekoztato">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                VIII. Honlappal kapcsolatos adatkezelési tudnivalók
              </h2>

              {/* 1. Mi az a Cookie? */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Mi az a Cookie (süti)?
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookie-k (Magyarul: süti) alatt olyan kisméretű szöveges fájlokat értünk, amelyekben a weboldalak a látogatásokkal kapcsolatos információkat meghatározott ideig és célból tárolják. Az ismételt látogatások során a weboldal képes felismerni a szövegfájlt, ezáltal beazonosítva a korábbi látogatót.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A cookie-k elsődleges funkciója, hogy kényelmesebbé, személyre szabottá tegyék a böngészést, hiszen segítségükkel eltárolhatjuk különböző személyes adatainkat, beállításainkat. A cookie-k segítségével jól célzott, személyre szabott reklámkampányok is megvalósíthatók.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A <Link href="https://restartphysio.hu" className="text-EC7007 hover:underline font-semibold">restartphysio.hu</Link> weboldal tekintettel a 2003. évi C. törvény 155.§ 4. bekezdésében foglaltaknak, miszerint „Egy előfizetőnek vagy felhasználónak elektronikus hírközlő végberendezésén csak az érintett felhasználó vagy előfizető világos és teljes körű - az adatkezelés céljára is kiterjedő - tájékoztatását követő hozzájárulása alapján lehet adatot tárolni, vagy az ott tárolt adathoz hozzáférni" a következő tájékoztatást adja az általa használt analitikai eszközökkel, azaz cookie-kkal kapcsolatban.
                </p>
              </div>

              {/* 2. Portál cookie-k */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Portál cookie-k kezelése
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás weboldalát a portál segítségével hozta létre, a weboldal ennek motorját használja. A portál és a portál segítségével létrehozott oldalak a következőkben meghatározott cookie-kat használhatják, azonban az Adatkezelő e cookie-kat saját maga nem használja fel semmilyen módon. A használt cookie-k az Érintett eszköze és a portál között kommunikálhatnak, az Adatkezelő számára semmilyen adatot nem továbbítanak, nem adnak át, így a használt cookie-k vonatkozásában a portál saját adatkezelési útmutatója az irányadó.
                </p>
              </div>

              {/* 3. Cookie-k típusai */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Cookie-k típusai
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás weboldalán használatos cookie-kat 4 különböző kategóriába sorolhatjuk, a Nemzetközi Kereskedelmi Kamara osztályozásának megfelelően: működéshez feltétlenül szükséges, teljesítményt javító, egyéni beállításokat tároló, webanalitikai és hirdetések célzását szolgáló.
                </p>
              </div>

              {/* 3.1 Működéshez feltétlenül szükséges */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1. Működéshez feltétlenül szükséges cookie-k
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A cookie-k ezen típusa teszi lehetővé a weboldalon történő böngészést. Ezen cookie-k nélkül a Szolgáltatás weboldalán felkeresett tartalmak kiszolgálása (beleértve a biztonságos protokollok használatát) lehetetlenné válik.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás weboldala titkosított karakterláncot tartalmazó cookie segítségével azonosítja Önt a honlap használata közben. Valahányszor belép az Érintetti felületre, ezt az egyedi azonosítót tartalmazó cookie-t helyezünk a gépére. Például: session cookie.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Ezek a cookie-k feltétlenül szükségesek a weboldal működéséhez, így tiltásukra nincsen lehetőség.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-900">Figyelmeztetés:</strong> Kérjük, hogy ne használja tovább a Szolgáltatás weboldalát, amennyiben nem szeretné, hogy ezen cookie-k a böngészőjében letöltésre kerüljenek!
                </p>
              </div>

              {/* 3.2 Teljesítményjavító */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.2. Teljesítményjavító cookie-k
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ezek a cookie-k arról gyűjtenek információt, hogy a látogatók milyen módon használnak egy weboldalt. Például mely oldalait látogatják a leggyakrabban, hol ütköznek a látogatók hibaüzenetekbe.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ezek a cookie-k nem tárolnak olyan információt, amellyel a látogatókat a weboldalak beazonosítanák. A segítségükkel gyűjtött információ kizárólag összesítve, névtelenül kerül felhasználásra. Céljuk a Szolgáltatás weboldalán elérhető funkciók, felhasználói élmény javítása. Például: has_js__cdrop
                </p>
                <p className="text-gray-700 leading-relaxed text-sm italic">
                  A weboldal teljesítményéről adatot gyűjtő cookie-k a böngésző beállításainál letilthatók, törölhetők.
                </p>
              </div>

              {/* 3.3 Egyéni beállításokat tároló */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.3. Egyéni beállításokat tároló cookie-k
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ezek a cookie-k teszik lehetővé a weboldalon használt felhasználói név, kiválasztott nyelvi preferencia eltárolását. Például egy weboldal képes lokális hírek kiszolgálására a látogató cookie-ban eltárolt földrajzi elhelyezkedése alapján. Ezek a cookie-k alkalmasak a megváltoztatott betűméret, illetve további hasonló beállítások eltárolására. A cookie-kban tárolt beállítások anonimek. A tárolt értékük az üzemeltető számára nem vezethetők vissza az egyes Érintettekhez. Például: Drupal.tableDrag.showWeight Drupal.toolbar.collapsed
                </p>
                <p className="text-gray-700 leading-relaxed text-sm italic mb-4">
                  A személyes beállításokat eltároló cookie-k a böngésző beállításainál letilthatók, törölhetők.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Ezen cookie típus tiltása hatással van a Szolgáltatás weboldalának funkcióira, ezáltal a tapasztalt felhasználói élményre.
                </p>
              </div>

              {/* 3.4 Webanalitikai és hirdetések célzását szolgáló */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.4. Webanalitikai és hirdetések célzását szolgáló cookie-k
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ezek a cookie-k teszik lehetővé, hogy a látogatók az érdeklődésüknek megfelelő reklámüzenetekkel találkozzon.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Google Analytics</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás weboldalának üzemeltetője a Google Analytics szolgáltatást használja a látogatók viselkedésének statisztikai elemzésére. Annak ellenére, hogy a harmadik fél számára átadott információ nem tartalmaz személyes adatot, a látogatottsági adatok bizonyos esetekben visszavezethetőek az Érintettekhez.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Google Adwords és hirdetési rendszerek</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás weboldalának üzemeltetője a Google Adwords-öt és további hirdetési rendszereket használ online hirdetéseinek megjelenítésére. Ezek a szolgáltatók eltárolhatják a látogatók IP címét, illetve további - nem személyes adatnak minősülő - azonosító információt annak érdekében, hogy a későbbiekben külső weboldalakon megjelenítsék a Szolgáltatás hirdetését.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">IP-anonimizálás</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintett által használt weboldallal kapcsolatos cookie-kkal létrehozott információk rendszerint a Google egyik USA-beli szerverére kerülnek és tárolódnak. Az IP-anonimizálás weboldali aktiválásával a Google az Érintett IP-címét az Európai Unió tagállamain belül vagy az Európai Gazdasági Térségről szóló megállapodásban részes más államokban előzőleg megrövidíti.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A teljes IP-címnek a Google USA-ban lévő szerverére történő továbbítására és ottani lerövidítésére csak kivételes esetekben kerül sor. Eme weboldal üzemeltetőjének megbízásából a Google ezeket az információkat arra fogja használni, hogy kiértékelje, hogyan használta az Érintett a honlapot, továbbá, hogy a weboldal üzemeltetőjének a honlap aktivitásával összefüggő jelentéseket készítsen, valamint, hogy a weboldal- és az internethasználattal kapcsolatos további szolgáltatásokat teljesítsen.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Cookie-k kezelése és letiltása</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Google Analytics keretein belül az Érintett böngészője által továbbított IP-címet nem vezeti össze a Google más adataival. A cookie-k tárolását az Érintett a böngészőjének megfelelő beállításával megakadályozhatja, azonban felhívjuk figyelmét, hogy ebben az esetben előfordulhat, hogy ennek a honlapnak nem minden funkciója lesz teljes körűen használható.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Megakadályozhatja továbbá, hogy a Google gyűjtse és feldolgozza a cookie-k általi, az Érintett weboldalhasználattal kapcsolatos adatait (beleértve az IP-címet is), ha letölti és telepíti a következő linken elérhető böngésző plugint:{" "}
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout?hl=hu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#EC7007] hover:underline font-medium"
                  >
                    https://tools.google.com/dlpage/gaoptout?hl=hu
                  </a>
                </p>
              </div>
            </section>

            {/* IX. Közösségi oldalak használata */}
            <section id="kozossegi-oldalak">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                IX. Közösségi oldalak használata
              </h2>

              {/* Bevezető */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény 20. § (1) bekezdése alapján, meg kell határozni a közösségi oldalak adatkezelése körében a következőket:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">a)</span>
                    <span>az adatgyűjtés ténye,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">b)</span>
                    <span>az érintettek köre,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">c)</span>
                    <span>az adatgyűjtés célja,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">d)</span>
                    <span>az adatkezelés időtartama,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">e)</span>
                    <span>az adatok megismerésére jogosult lehetséges adatkezelők személye,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC7007] font-bold mt-1">f)</span>
                    <span>az érintettek adatkezeléssel kapcsolatos jogainak ismertetése.</span>
                  </li>
                </ul>
              </div>

              {/* 1. Az adatgyűjtés ténye */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Az adatgyűjtés ténye, a kezelt adatok köre
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Facebook/Instagram/Twitter/Pinterest/Youtube stb. közösségi oldalakon regisztrált neve, illetve az Érintett nyilvános profilképe.
                </p>
              </div>

              {/* 2. Az érintettek köre */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Az érintettek köre
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Azon természetes személyek, akik az Adatkezelő közösségi oldalait, különösen facebook.com közösségi oldalán lévő oldalt vagy azon megjelenő tartalmakat önként követik, megosztják, kedvelik.
                </p>
              </div>

              {/* 3. Az adatgyűjtés célja */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Az adatgyűjtés célja
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A közösségi oldalakon, a weboldal egyes tartalmi elemeinek, termékeinek, akcióinak vagy magának a weboldalnak a megosztása, illetve „lájkolása", népszerűsítése.
                </p>
              </div>

              {/* 4. Az adatkezelés időtartama */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Az adatkezelés időtartama, az adatok törlésének határideje, az adatok megismerésére jogosult lehetséges adatkezelők személye és az érintettek adatkezeléssel kapcsolatos jogainak ismertetése
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az adatok forrásáról, azok kezeléséről, illetve az átadás módjáról, és jogalapjáról az adott közösségi oldalon tájékozódhat az érintett. Az adatkezelés a közösségi oldalakon valósul meg, így az adatkezelés időtartamára, módjára, illetve az adatok törlési és módosítási lehetőségeire az adott közösségi oldal szabályozása vonatkozik.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Az adatkezelés jogalapja:</strong> az érintett önkéntes hozzájárulása személyes adatai kezeléséhez a közösségi oldalakon.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Adatkezelés időtartama:</strong> érintett kérésére törlésig.
                </p>
              </div>

              {/* 5. Facebook oldal használata */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Facebook oldal használata
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás elérhető a Facebook közösségi portálon, valamint más közösségi oldalakon. A közösségi oldalak, azon belül is különösen a Facebook oldal használata és az azon keresztül, az Adatkezelővel történő kapcsolatfelvétel, kapcsolattartás, és egyéb, a közösségi oldal által megengedett művelet önkéntes hozzájáruláson alapul.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Adatkezelő az érintettekkel kizárólag akkor kommunikál, és így az adatok célja akkor válik lényegessé, ha az érintett a közösségi oldalon keresztül keresi meg az Adatkezelőt.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A közösségi portálokon, különösen a Facebook-on történő jelenlét és az azzal kapcsolatos adatkezelés célja a weboldalon található tartalmak közösségi oldalon történő megosztása, publikálása, marketingje. A közösségi oldal segítségével az érintett tájékozódhat a legújabb akciókról is.
                </p>
              </div>

              {/* 6. Hozzájárulás és értékelés */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. Hozzájárulás és értékelés
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintett a közösségi oldal feltételei alapján önként hozzájárul az Adatkezelő tartalmainak követéséhez, kedveléséhez. Példálózó meghatározással élve, a Facebook oldalon található üzenő falon közzétett hírfolyamra az érintett az oldalon található <strong>„like"/ „tetszik"</strong> linkre kattintva iratkozhat fel, és ezzel hozzájárul az Adatkezelő híreinek és ajánlatainak közzétételéhez a saját üzenőfalán, és az ugyanitt található <strong>„dislike"/"nem tetszik"</strong> linkre kattintva iratkozhat le, továbbá az üzenő fal beállításai segítségével törölheti a nem kívánt, üzenő falon megjelenő hírfolyamokat.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett az Adatkezelőt szövegesen és számszerűen értékelheti, ha ezt a közösségi oldal lehetővé teszi.
                </p>
              </div>

              {/* 7. Képek és videók közzététele */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7. Képek és videók közzététele
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Adatkezelő közösségi oldalán, különösen Facebook oldalán képeket/videófelvételeket is közzétesz a különböző eseményekről, az Adatkezelő szolgáltatásairól, egyebekről. Az Adatkezelő a facebook oldalt összekapcsolhatja más közösségi oldalakkal a facebook.com közösségi portál szabályai szerint, így a facebook oldalon történő közzétételen érteni kell az ilyen kapcsolt közösségi portálokon történő közzétételt is.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Amennyiben nem tömegfelvételről, vagy közéleti szereplésről készült felvételről van szó (Ptk. 2:48.§), az Adatkezelő mindig kikéri az érintett írásbeli hozzájárulását a képek közzététele előtt.
                </p>
              </div>

              {/* 8. Adatkezelésről való tájékoztatás */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8. Adatkezelésről való tájékoztatás
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett az adott közösségi oldal adatkezeléséről tájékoztatást az adott közösségi oldalon kaphat, ennek megfelelően a Facebook oldal adatkezeléséről tájékoztatást a{" "}
                  <a 
                    href="https://www.facebook.com/privacy/policy/?locale=hu_HU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#EC7007] hover:underline font-medium"
                  >
                    https://www.facebook.com/privacy/policy/?locale=hu_HU
                  </a>
                  {" "}címen kaphat.
                </p>
              </div>
            </section>

            {/* X. Panaszkezelés */}
            <section id="panaszkezeles">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                X. Panaszkezelés
              </h2>

              {/* 1. Kártérítés és sérelemdíj */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Kártérítés és sérelemdíj
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás az Érintett adatainak jogellenes kezelésével vagy az adatbiztonság követelményeinek megszegésével másnak okozott kárt megtéríti. Az Érintett személyiségi jogának megsértése esetén az érintett sérelemdíjat (Ptk. 2:52. §) követelhet.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintettel szemben a Szolgáltatás felel az adatfeldolgozó által okozott kárért is.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás mentesül a felelősség alól, ha a kárt az adatkezelés körén kívül eső elháríthatatlan ok idézte elő.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás nem téríti meg a kárt és nem követelhető sérelemdíj annyiban, amennyiben a kár a károsult vagy a személyiségi jog megsértésével okozott jogsérelem az érintett szándékos vagy súlyosan gondatlan magatartásából származott.
                </p>
              </div>

              {/* 2. Panaszkezelés - Adatvédelmi Hatóság */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Panaszkezelés - Adatvédelmi Hatósághoz fordulás
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Amennyiben a Szolgáltatás adatkezelésével kapcsolatban kérdése, problémája van, kérjük forduljon az adatvédelmi hatósághoz:
                </p>
              </div>

              {/* NAIH elérhetőségek */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Hivatalos név:</strong> Nemzeti Adatvédelmi és Információszabadság Hatóság</p>
                  <p><strong>Székhely:</strong> 1125 Budapest, Szilágyi Erzsébet fasor 22/C.</p>
                  <p><strong>Levelezési cím:</strong> 1530 Budapest, Pf.: 5.</p>
                  <p><strong>Telefon:</strong> +36 (1) 391-1400</p>
                  <p><strong>Fax:</strong> +36 (1) 391-1410</p>
                  <p>
                    <strong>E-mail:</strong>{" "}
                    <a 
                      href="mailto:ugyfelszolgalat@naih.hu" 
                      className="text-[#EC7007] hover:underline"
                    >
                      ugyfelszolgalat@naih.hu
                    </a>
                  </p>
                  <p>
                    <strong>Honlap:</strong>{" "}
                    <a 
                      href="https://www.naih.hu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#EC7007] hover:underline"
                    >
                      https://www.naih.hu
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* XI. Felügyeleti Hatóság */}
            <section id="feluegyeleti-hatosag">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                XI. Felügyeleti Hatóság
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jogorvoslati lehetőséggel, panasszal a Nemzeti Adatvédelmi és Információszabadság Hatóságnál lehet élni:
                </p>
              </div>

              {/* NAIH elérhetőségek - FRISSÍTETT 2025 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
                </h3>
                
                
                              {/* NAIH elérhetőségek */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Hivatalos név:</strong> Nemzeti Adatvédelmi és Információszabadság Hatóság</p>
                  <p><strong>Székhely:</strong> 1125 Budapest Szilágyi Erzsébet fasor 22/c.</p>
                  <p><strong>Levelezési cím:</strong> 1530 Budapest, Pf.: 5.</p>
                  <p><strong>Telefon:</strong> +36 (1) 391-1400</p>
                  <p><strong>Fax:</strong> +36 (1) 391-1410</p>
                  <p>
                    <strong>E-mail:</strong>{" "}
                    <a 
                      href="mailto:ugyfelszolgalat@naih.hu" 
                      className="text-[#EC7007] hover:underline"
                    >
                      ugyfelszolgalat@naih.hu
                    </a>
                  </p>
                  <p>
                    <strong>Honlap:</strong>{" "}
                    <a 
                      href="https://www.naih.hu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#EC7007] hover:underline"
                    >
                      https://www.naih.hu
                    </a>
                  </p>
                </div>
              </div>
              </div>
            </section>

            {/* XII. Jognyilatkozat */}
            <section id="jognyilatkozat">
              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[#EC7007]">
                XII. Jognyilatkozat
              </h2>

              {/* 1. Szerzői jogok */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Szerzői jogok és védjegyek
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás a honlapon megjelenített információkat, dokumentumokat csakis tájékoztatás céljóból teszi közzé. A megjelenített védjegyek, és lógók, valamint az elérhető információk és egyéb anyagok szerzői jogi védelem alatt állnak, ezekhez fűződő jogok kizárólag az Adatkezelőt illetik meg.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A honlapon megtalálható védjegyek védjegyoltalom alatt állnak. Kifejezett előzetes írásbeli hozzájárulás nélkül harmadik személy semmilyen módon, és jogcímen nem használhatja, nem másolhatja, nem terjesztheti, és nem teheti közzé. Tilos a honlapon előzetes írásbeli hozzájárulás nélkül bármilyen más honlaphoz kapcsolást (linket) létrehozni. Jogellenes felhasználás esetén szerzői, a polgári illetve a büntető jogszabályokban foglalt jogkövetkezményeket vonhat maga után.
                </p>
              </div>

              {/* 2. Felhasználási engedély */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Felhasználási engedély
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Az Érintett az információkat eredeti formában, kizárólag a saját céljára használhatja fel, a számítógépére letöltse, illetve kinyomtassa. Ezen engedély kizárólag a weboldal egy eredeti példányának kezelését illetve annak archiválását teszi lehetővé.
                </p>
              </div>

              {/* 3. Felelősség kizárása */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Felelősség kizárása
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Az Érintett képernyőjén megjelenített weboldal pontosságára, megbízhatóságára vagy tartalmára vonatkozóan a Szolgáltatástól független változtatásokra nem vállal – amennyiben a törvény másként nem rendelkezik – semmilyen természetű garanciát.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás fenntartja a jogot a honlapon megjelenített tartalmak módosítására, továbbá elérhetőségük megszüntetésére.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Szolgáltatás nem garantálja, illetve nem nyújt biztosítékot a honlaphoz való hozzáférés folyamatosságára vagy hibamentességére.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A honlap, illetve az ott megjelenő információk, dokumentációk hozzáféréséből, valamint azok közvetett vagy közvetlen felhasználásából, a honlap használatra alkalmatlan állapotából, vagy a nem megfelelő működésből, hiányosságból, esetleges üzemzavarból, vagy félreérhetőségből eredő károkért, veszteségért a felelősséget a Szolgáltatás kizárja.
                </p>
              </div>

              {/* 4. Harmadik felek tartalmai */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Harmadik felek tartalmai
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás nem vállal felelősséget olyan, harmadik fél által létrehozott, továbbított, vagy publikált anyagokért, melyekhez a Szolgáltatás weboldalához kapcsolódnak, vagy amelyre hivatkoznak.
                </p>
              </div>

              {/* 5. Felhasználók által küldött tartalmak */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Felhasználók által küldött tartalmak
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Amennyiben az Érintett írásos anyagot bocsát a Szolgáltatás rendelkezésére, az Érintett elismeri, hogy az alkalmas a nyilvánosságra-hozatalra, és elfogadja, hogy a Szolgáltatás azt – minden felelősségvállalás nélkül – közzé teheti, tartalmát részben vagy egészben a szerzői minőség feltüntetésével felhasználhatja. Az Érintett ezzel azt is vállalja, hogy a rendelkezésre bocsátott dokumentum, tartalom nem sérti harmadik személy hozzá fűződő, szerzői, illetve egyéb jogait, és azokkal kapcsolatban nem kezdeményez a Szolgáltatás ellen jogi eljárást, nem terjeszt elő semmilyen követelést, illetve igényérvényesítést, továbbá harmadik fél igényérvényesítése esetén kártalanítja a Szolgáltatást.
                </p>
              </div>

              {/* 6. Felhasználási feltételek */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. Felhasználási feltételek
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  A Szolgáltatás weboldala a jelen előírásoktól a hatályos jogszabályokkal összhangban eltérő rendelkezéseket is előírhat, így a mindenkor aktuális előírások, illetve felhasználási feltételek megismerése és elfogadása feltételét képezi az egyes szolgáltatások igénybevételének, használatának.
                </p>
              </div>
            </section>



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
