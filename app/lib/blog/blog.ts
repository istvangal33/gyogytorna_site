export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  date: string;            // YYYY-MM-DD
  updatedDate?: string;    // YYYY-MM-DD
  readingTime: string;
  tags: string[];
  keywords: string;
  faq?: {
    question: string;
    answer: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bemer-terapia-gyor",
    title: "BEMER terápia Győrben – Hogyan javítja a mikrokeringést?",
    metaTitle: "BEMER Terápia Győrben – Hatásai, Árak, Tapasztalatok | ReStart Physio",
    metaDescription: "BEMER terápia Győrben a ReStart Physio rendelőben. Tudjon meg mindent a BEMER kezelés hatásairól, áráról és arról, hogyan javítja a mikrokeringést. Készülék bérlés is!",
    excerpt: "A BEMER terápia egy orvostechnikai eszközön alapuló fizikoterápiás módszer, amely célzott elektromágneses mező segítségével javítja a mikrokeringést. Ismerje meg, hogyan segíthet Önnek!",
    coverImage: "/bemer2.jpg",
    coverImageAlt: "BEMER terápia kezelés a ReStart Physio rendelőben Győrben – mikrokeringés javítása",
    author: "Forrás Fernanda",
    date: "2026-04-02",
    readingTime: "8 perc",
    tags: ["BEMER", "fizikoterápia", "mikrokeringés", "regeneráció"],
    keywords: "bemer terápia győr, bemer kezelés, bemer hatásai, bemer készülék bérlés, mikrokeringés javítása, fizikoterápia győr, bemer ár",
    faq: [
      {
        question: "Fájdalmas a BEMER terápia?",
        answer: "Nem, a BEMER kezelés teljesen fájdalommentes. A páciens egy speciális matracon fekszik, és legfeljebb enyhe melegséget vagy bizsergést érezhet a kezelt területen."
      },
      {
        question: "Hány BEMER kezelés szükséges az eredményhez?",
        answer: "Általában 10-15 kezelés javasolt, heti 2-3 alkalommal. Akut panaszoknál már 5-6 alkalom után érezhető javulás. Krónikus problémáknál hosszabb kúra szükséges."
      },
      {
        question: "Mennyibe kerül a BEMER terápia Győrben?",
        answer: "A ReStart Physio rendelőben a BEMER kezelés a komplex rehabilitáció része. A BEMER készülék otthoni bérlése havi 100.000 Ft. Részletes árlistánkat az árak oldalon találja."
      },
      {
        question: "Ki nem kaphat BEMER kezelést?",
        answer: "BEMER terápia nem alkalmazható beültetett pacemakerrel, terhesség alatt, aktív vérzés esetén, valamint akut lázas állapotban. Kezelés előtt mindig egyeztetünk az esetleges kontraindikációkról."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>BEMER terápia</strong> az egyik legmodernebb fizikoterápiás módszer, amely pulzáló elektromágneses mező segítségével javítja szervezetünk <strong>mikrokeringését</strong>. Győri rendelőnkben a BEMER kezelést más fizioterápiás módszerekkel kombinálva alkalmazzuk a lehető legjobb eredmény érdekében.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mi az a BEMER terápia?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A BEMER (Bio-Electro-Magnetic-Energy-Regulation) egy orvostechnikai eszköz, amely alacsony intenzitású, pulzáló elektromágneses teret alkalmaz. A kezelés célzottan a <strong>mikroereket</strong> – a hajszálereket – stimulálja, amelyek a teljes érrendszer mintegy 74%-át alkotják. A mikrokeringés felelős a sejtek oxigén- és tápanyagellátásáért, valamint a salakanyagok elszállításáért.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan működik a BEMER?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        A BEMER készülék egy speciális jelformát alkalmaz, amely klinikailag bizonyítottan javítja a mikroerek vazomócióját – vagyis az erek ritmikus összehúzódását és tágulását. Ez a folyamat kulcsfontosságú:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Javuló oxigénellátás</strong> – a sejtek hatékonyabban kapnak oxigént</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Fokozott tápanyag-szállítás</strong> – az érintett szövetek gyorsabban regenerálódnak</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Hatékonyabb salakanyag-elvezetés</strong> – csökken a gyulladás és a duzzanat</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Immunrendszer támogatása</strong> – az immunsejtek hatékonyabban jutnak el a szövetekhez</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Milyen panaszok esetén segíthet a BEMER terápia?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        Győri rendelőnkben az alábbi esetekben alkalmazzuk a BEMER terápiát:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Sportsérülések rehabilitációja</strong> – gyorsabb regeneráció húzódás, ficam vagy szalagsérülés után</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Műtét utáni felépülés</strong> – a szövetek gyorsabb gyógyulása a jobb vérellátás által</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Krónikus fájdalmak</strong> – derékfájás, nyakfájdalom, izomfeszülések enyhítése</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Keringési problémák</strong> – hideg végtagok, zsibbadás, nehéz lábak</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Alvászavarok és stressz</strong> – a jobb keringés elősegíti a pihentető alvást</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Sportteljesítmény fokozása</strong> – edzés utáni regeneráció felgyorsítása</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan zajlik a BEMER kezelés a ReStart Physio rendelőben?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        A kezelés menete egyszerű és kényelmes:
      </p>
      <ol class="list-none space-y-4 mb-6 counter-reset">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Állapotfelmérés</strong> – az első alkalommal megvizsgáljuk a panaszait és felállítjuk a kezelési tervet</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Kezelés</strong> – kényelmesen lefekszik a BEMER matracon, a készülék 8–20 percig dolgozik</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Kombináció</strong> – a BEMER kezelést gyakran kiegészítjük <a href="/szolgaltatasok#detail-Lágy rész manuál terápia (FDM kezelések)" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">manuálterápiával</a> vagy gyógytornával</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Otthoni folytatás</strong> – igény esetén a <a href="/arak" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER készüléket otthonra is bérelheti</a></span>
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">BEMER készülék bérlés Győrben</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Rendelőnkben lehetőség van a <strong>BEMER készülék otthoni bérlésére</strong> is. Ez különösen ajánlott azoknak, akik napi rendszerességgel szeretnék használni a terápiát a gyorsabb felépülés érdekében. A bérlés havi díja 100.000 Ft, amely tartalmazza a készülék használati útmutatóját és a személyre szabott kezelési protokollt. A részletekért tekintse meg <a href="/arak" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">árlistánkat</a>.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Miért válassza a ReStart Physio BEMER terápiáját?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Komplex megközelítés</strong> – a BEMER-t egyéb fizioterápiás módszerekkel kombináljuk</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Szakmai tapasztalat</strong> – Forrás Fernanda közel 10 éves élsport-háttérrel rendelkezik</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Otthoni bérlés</strong> – a kezelés folytatása otthon, saját tempóban</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Egyénre szabott protokoll</strong> – minden páciens személyre szabott kezelési tervet kap</span>
        </li>
      </ul>
    `
  },

    {
    slug: "gyogytorna-gyor",
    title: "Gyógytorna Győrben – Mikor van rá szükség és hogyan segít?",
    metaTitle: "Gyógytorna Győrben – Kezelések, Árak, Időpontfoglalás | ReStart Physio",
    metaDescription: "Gyógytorna Győrben a ReStart Physio rendelőben. Tudja meg, mikor szükséges a gyógytorna, milyen panaszokban segít és hogyan zajlik egy kezelés. Beutaló nélkül is!",
    excerpt: "A gyógytorna a mozgásszervi panaszok egyik leghatékonyabb kezelési módszere. Ismerje meg, mikor érdemes gyógytornászhoz fordulni és mire számíthat a kezelés során.",
    coverImage: "/sportrehab4.jpg",
    coverImageAlt: "Gyógytorna kezelés a ReStart Physio rendelőben Győrben – egyéni rehabilitáció",
    author: "Forrás Fernanda",
    date: "2026-04-02",
    readingTime: "7 perc",
    tags: ["gyógytorna", "rehabilitáció", "fizioterápia", "mozgásszervi panaszok"],
    keywords: "gyógytorna győr, gyógytornász győr, rehabilitáció győr, fizioterápia győr, mozgásszervi kezelés, egyéni gyógytorna",
    faq: [
      {
        question: "Kell beutaló a gyógytornához?",
        answer: "Nem, a ReStart Physio rendelőbe beutaló nélkül is jöhet. Az első alkalommal részletes állapotfelmérést végzünk, és ennek alapján állítjuk össze a személyre szabott kezelési tervet."
      },
      {
        question: "Mennyi ideig tart egy gyógytorna alkalom?",
        answer: "Az egyéni gyógytorna alkalmak általában 50-60 percesek. Ez magában foglalja a manuális kezelést és a célzott gyakorlatokat is."
      },
      {
        question: "Milyen gyakran kell gyógytornára járni?",
        answer: "Általában heti 1-2 alkalom javasolt, de ez egyénenként változó. Akut fájdalomnál kezdetben sűrűbb, majd a javulással ritkább alkalmakat javaslunk."
      },
      {
        question: "Fájdalmas a gyógytorna?",
        answer: "A kezelés célja a fájdalom csökkentése, nem a fokozása. Bizonyos manuális technikáknál érezhető enyhe kellemetlenség, de mindig a páciens tűréshatárán belül dolgozunk."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>gyógytorna</strong> az egyik leghatékonyabb és legtermészetesebb módszer a mozgásszervi panaszok kezelésére. Győri rendelőnkben az egyéni gyógytornát más fizioterápiás módszerekkel – <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápiával</a>, manuálterápiával – kombinálva alkalmazzuk a tartós eredmény érdekében.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mikor van szükség gyógytornára?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        Sokan csak akkor gondolnak gyógytornára, amikor már erős fájdalmat éreznek. Pedig a korai kezelés sokkal gyorsabb és hatékonyabb eredményt hoz. Az alábbi esetekben érdemes gyógytornászhoz fordulni:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Krónikus fájdalmak</strong> – derékfájás, nyakfájdalom, vállpanaszok, amelyek heteken át fennállnak</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Sportsérülések</strong> – húzódás, ficam, szalagsérülés utáni rehabilitáció</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Műtét utáni állapot</strong> – térd-, váll-, csípő- vagy gerincműtét utáni felépülés</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Tartáshibák</strong> – irodai munkából eredő görnyedt tartás, gerincferdülés</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Mozgáskorlátozottság</strong> – ízületi merevség, csökkent mozgástartomány</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Prevenciós célok</strong> – sérülések megelőzése, sportteljesítmény javítása</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mi a különbség a gyógytorna és a fizioterápia között?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A <strong>fizioterápia</strong> a tágabb fogalom, amely magában foglalja a gyógytornát is. A gyógytorna kifejezetten a célzott mozgásgyakorlatokra fókuszál, míg a fizioterápia egyéb kezelési módszereket is tartalmaz – ilyen a <a href="/szolgaltatasok#detail-Lágy%20rész%20manuál%20terápia%20(FDM%20kezelések)" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">manuálterápia (FDM)</a>, a fizikoterápia (pl. BEMER) és a funkcionális tréning. Győri rendelőnkben ezeket a módszereket kombinálva alkalmazzuk.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan zajlik a gyógytorna a ReStart Physio-nál?</h2>
      <ol class="list-none space-y-4 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Részletes állapotfelmérés</strong> – megvizsgáljuk a panaszait, mozgását, tartását és feltárjuk a fájdalom valódi okát</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Személyre szabott kezelési terv</strong> – az állapotfelmérés alapján összeállítjuk az egyéni terápiás programot</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Manuális kezelés</strong> – az érintett területek kézi technikákkal való kezelése a fájdalom csökkentéséért</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Célzott gyakorlatok</strong> – megtanítjuk a helyes mozgásmintákat és az otthon is végezhető gyakorlatokat</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
          <span class="text-gray-700"><strong>Kontroll és progresszió</strong> – a kezelés előrehaladtával folyamatosan módosítjuk a tervet az állapot változásának megfelelően</span>
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Milyen panaszokat kezelünk gyógytornával?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        Győri rendelőnkben az alábbi problémák kezelésére specializálódtunk:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Gerincpanaszok</strong> – <a href="/szolgaltatasok#detail-Gerincpanaszok%20kezelése" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">porckorongsérv, derékfájás, nyaki panaszok</a></span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Sportsérülések</strong> – szalagsérülés, meniszkusz-sérülés, izomhúzódás</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Műtét utáni rehabilitáció</strong> – térd TEP, válltükrözés, gerincműtét</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Gerincferdülés</strong> – <a href="/szolgaltatasok#detail-Gerincferdülés%20-%20Schroth%20terápia" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Schroth terápiával</a> kombinálva</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Ízületi panaszok</strong> – váll, csípő, térd, boka problémák</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Állkapocs panaszok</strong> – <a href="/szolgaltatasok#detail-TMI%20(Állkapocs%20ízületi)%20terápia" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">TMI terápiával</a> kiegészítve</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Miért a ReStart Physio-t válassza Győrben?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Élsport háttér</strong> – Forrás Fernanda közel 10 évig dolgozott élsportolókkal, a Győri ETO FC labdarúgóival és kézilabdázókkal</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Komplex megközelítés</strong> – nem csak a tünetet, hanem az okot kezeljük</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Modern eszközök</strong> – BEMER terápia, dinamikus tape és egyéb kiegészítő módszerek</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Otthoni program</strong> – minden páciens kap otthon végezhető gyakorlatsort a gyorsabb felépülésért</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Beutaló nélkül</strong> – nincs szükség beutalóra, hívjon és foglaljon időpontot</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Gyógytorna árak Győrben</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Az egyéni gyógytorna kezelések áráról részletes információt <a href="/arak" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">árlistánkon</a> talál. Az első alkalom állapotfelméréssel egybekötött kezelés. Kérdés esetén hívjon minket a <a href="tel:+36308198449" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">+36 30 819 8449</a> telefonszámon!
      </p>
    `
  },

    {
    slug: "gerincfajdalom-okai-kezelese",
    title: "Gerincfájdalom okai és kezelése – Mikor forduljunk szakemberhez?",
    metaTitle: "Gerincfájdalom Okai és Kezelése Győrben | ReStart Physio",
    metaDescription: "Gerincfájdalom okai, tünetei és hatékony kezelési módszerei. Tudja meg, mikor szükséges szakember és hogyan segít a fizioterápia a tartós fájdalommentességben.",
    excerpt: "A gerincfájdalom napjaink népbetegsége. Ismerje meg a leggyakoribb okokat, a figyelmeztető jeleket és a modern fizioterápiás kezelési lehetőségeket.",
    coverImage: "/gerinc_core1.jpg",
    coverImageAlt: "Gerincfájdalom kezelése fizioterápiával a ReStart Physio rendelőben Győrben",
    author: "Forrás Fernanda",
    date: "2026-04-03",
    readingTime: "9 perc",
    tags: ["gerincfájdalom", "fizioterápia", "rehabilitáció", "mozgásszervi panaszok"],
    keywords: "gerincfájdalom kezelése, derékfájás okai, porckorongsérv kezelés, nyakfájdalom, gerincpanaszok győr, fizioterápia győr, isiász kezelés",
    faq: [
      {
        question: "Meddig normális a derékfájás?",
        answer: "Az akut derékfájás általában 2-4 héten belül javul. Ha a fájdalom 4 hétnél tovább fennáll, visszatérő, vagy kisugárzó (lábba húzó) tünetekkel jár, mindenképpen forduljon szakemberhez."
      },
      {
        question: "Porckorongsérv esetén szükséges a műtét?",
        answer: "Az esetek többségében nem. A porckorongsérv 80-90%-a konzervatív kezeléssel – fizioterápiával, gyógytornával, manuálterápiával – eredményesen kezelhető. Műtét csak ritkán, súlyos idegi tünetek esetén szükséges."
      },
      {
        question: "Lehet-e sportolni gerincfájdalommal?",
        answer: "A teljes mozgásmentesség nem javasolt. A kontrollált, szakember által összeállított mozgásprogram segíti a felépülést. Bizonyos sportok (úszás, séta, core edzés) kifejezetten ajánlottak, míg másokat ideiglenesen kerülni kell."
      },
      {
        question: "Hogyan előzhető meg a gerincfájdalom kiújulása?",
        answer: "Rendszeres core edzéssel, helyes testtartással, ergonomikus munkahelyi beállításokkal és az ülő életmód kerülésével. A ReStart Physio-nál csoportos gerinc core edzést is tartunk a megelőzés érdekében."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>gerincfájdalom</strong> napjaink egyik leggyakoribb egészségügyi panasza – a felnőtt lakosság mintegy 80%-a tapasztal életében legalább egyszer jelentős hát- vagy derékfájást. Győri rendelőnkben a gerincpanaszok komplex kezelésére specializálódtunk, ötvözve a <a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">gyógytornát</a>, manuálterápiát és modern fizikoterápiás módszereket.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mi okozza a gerincfájdalmat?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        A gerincfájdalom mögött számos ok állhat. A pontos diagnózis kulcsfontosságú a hatékony kezeléshez:
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Mechanikai okok (leggyakoribb)</h3>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Izomfeszülés és izomgyengeség</strong> – az ülő életmód miatt a tartóizmok elgyengülnek, a feszülő izmok pedig túlterhelődnek</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Porckorong problémák</strong> – előboltozódás (protrúzió) vagy sérv (hernia), ami ideget nyomhat</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>SI ízületi diszfunkció</strong> – a keresztcsont-csípőízület elakadása, ami derék- és csípőfájdalmat okoz</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Fascia letapadások</strong> – a kötőszöveti hálózat összeletapadása, amely mozgáskorlátozottságot és fájdalmat okoz</span>
        </li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Életmódi tényezők</h3>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Tartós ülés</strong> – napi 8+ óra ülőmunka az irodában</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Mozgáshiány</strong> – a core izmok elgyengülése, a gerinc instabilitása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Stressz</strong> – tartós izomfeszülés a nyak-váll régióban</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Helytelen emelési technika</strong> – hirtelen, rossz testtartásból végzett emelés</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Figyelmeztető jelek – Mikor forduljunk orvoshoz azonnal?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        A legtöbb gerincfájdalom jóindulatú és kezeléssel javul. Azonban vannak figyelmeztető jelek, amelyek azonnali orvosi vizsgálatot igényelnek:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Végtaggyengeség vagy zsibbadás, ami gyorsan romlik</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Hólyag- vagy bélműködési zavar</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Láz kíséretében jelentkező gerincfájdalom</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Éjszakai, nyugalmi fájdalom ami nem csillapodik</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan kezeljük a gerincfájdalmat a ReStart Physio-nál?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        Győri rendelőnkben a gerincpanaszok kezelése <strong>komplex megközelítéssel</strong> történik. Nem csupán a tüneteket kezeljük, hanem feltárjuk és megszüntetjük a fájdalom valódi okát:
      </p>
      <ol class="list-none space-y-4 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Alapos vizsgálat</strong> – mozgásvizsgálat, provokációs tesztek, a fájdalom forrásának azonosítása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Fájdalomcsökkentés</strong> – <a href="/szolgaltatasok#detail-Lágy%20rész%20manuál%20terápia%20(FDM%20kezelések)" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">manuálterápia (FDM)</a>, mobilizáció, szükség esetén <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápia</a></span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Stabilizáció</strong> – core edzés, tartásjavító gyakorlatok, a mély stabilizáló izmok aktiválása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Visszatérés a mindennapokba</strong> – ergonómiai tanácsadás, otthoni gyakorlatsor, prevenciós program</span>
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">A leggyakoribb gerincpanaszok</h2>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Derékfájás és isiász</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A derékfájás a leggyakoribb gerincpanasz. Amennyiben a fájdalom a lábba sugárzik (isiász), az gyakran porckorong-problémára vagy piriformis-szindrómára utal. A <strong>célzott gyógytorna és manuálterápia</strong> az esetek túlnyomó többségében hatékonyan kezeli ezeket a panaszokat – műtét nélkül.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Nyaki gerinc panaszok</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A nyakfájdalom gyakran jár együtt fejfájással, szédüléssel vagy a karba sugárzó fájdalommal. Az irodai munkavégzés, a telefonhasználat és a stressz mind hozzájárulnak a nyaki izmok túlterheléséhez. A kezelés során a nyaki gerinc mobilizációját és a tartóizmok erősítését végezzük.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Porckorongsérv</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A porckorongsérv diagnózis sokakat megrémiszt, de fontos tudni: az esetek <strong>80-90%-a konzervatív kezeléssel gyógyul</strong>. A fizioterápia, a célzott gyakorlatok és a manuális technikák együttesen hatékonyan csökkentik a fájdalmat és helyreállítják a funkciót.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">5 tipp a gerincfájdalom megelőzéséhez</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#EC7007] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Mozogjon rendszeresen</strong> – napi 30 perc séta vagy úszás már sokat segít</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#EC7007] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Erősítse a core izmokat</strong> – a <a href="/szolgaltatasok#detail-Csoportos%20gerinc%20core%20edzés" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">csoportos core edzés</a> kiváló lehetőség</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#EC7007] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Állítsa be ergonomikusan a munkahelyét</strong> – monitor szemmagasságban, lábak a padlón</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#EC7007] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Tartson szüneteket</strong> – óránként álljon fel és mozogjon 2-3 percet</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#EC7007] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
          <span class="text-gray-700"><strong>Emeljen helyesen</strong> – térdből guggolva, egyenes háttal, a terhet testközelben tartva</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Ne halassza a kezelést!</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A gerincfájdalom kezelésében az időfaktor kulcsfontosságú. Minél hamarabb kezdjük el a terápiát, annál gyorsabb és tartósabb eredményt érhetünk el. Ha gerincpanaszokkal küzd, <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">foglaljon időpontot</a> győri rendelőnkbe – beutaló nélkül is várjuk!
      </p>
    `
  },
    {
    slug: "sportrehabilitacio-gyor",
    title: "Sportrehabilitáció Győrben – Biztonságos visszatérés a pályára",
    metaTitle: "Sportrehabilitáció Győrben – Sérülés Utáni Felépülés | ReStart Physio",
    metaDescription: "Sportrehabilitáció Győrben élsport háttérrel. Sportsérülések utáni rehabilitáció, visszatérés az edzéshez biztonságosan. Személyre szabott kezelési terv a ReStart Physio-nál.",
    excerpt: "A sportrehabilitáció célja a sérülés utáni teljes felépülés és a biztonságos visszatérés. Ismerje meg módszereinket, amelyeket élsportolók kezelése során fejlesztettünk.",
    coverImage: "/sportrehab4.jpg",
    coverImageAlt: "Sportrehabilitáció a ReStart Physio rendelőben Győrben – sérülés utáni visszatérés",
    author: "Forrás Fernanda",
    date: "2026-04-04",
    readingTime: "8 perc",
    tags: ["sportrehabilitáció", "rehabilitáció", "sportsérülés", "fizioterápia"],
    keywords: "sportrehabilitáció győr, sportsérülés kezelés, rehabilitáció győr, szalagsérülés kezelés, térdszalag rehabilitáció, sportolók fizioterápia",
    faq: [
      {
        question: "Mikor kezdhető el a sportrehabilitáció sérülés után?",
        answer: "Minél hamarabb, annál jobb. Akut sérüléseknél az első 48-72 óra után, műtétet követően általában 1-2 héttel a beavatkozás után megkezdhető a rehabilitáció. A korai mobilizáció bizonyítottan gyorsítja a felépülést."
      },
      {
        question: "Mennyi idő alatt térhetek vissza a sporthoz?",
        answer: "Ez a sérülés típusától és súlyosságától függ. Egy izomhúzódás 2-4 hét, szalagsérülés 3-6 hónap, keresztszalag-műtét 9-12 hónap rehabilitációt igényelhet. A visszatérés mindig teljesítménytesztek alapján történik."
      },
      {
        question: "Hobbisportolóként is fordulhatok Önökhöz?",
        answer: "Természetesen! A sportrehabilitáció nem csak élsportolóknak szól. Akár futó, kerékpáros, teniszező vagy hétvégi focista – mindenkinek személyre szabott kezelési tervet készítünk."
      },
      {
        question: "Milyen sportsérüléseket kezelnek?",
        answer: "Szalagsérüléseket, izomhúzódásokat, meniszkusz-problémákat, Achilles-ín sérüléseket, vállficamot, bokaficamot, teniszkönyököt, futótérdet és túlterheléses panaszokat egyaránt kezelünk."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>sportrehabilitáció</strong> célja, hogy a sérülést követően a sportoló – legyen hobbi vagy élsportoló – minél gyorsabban, biztonságosan és teljes értékűen térhessen vissza az edzéshez. A ReStart Physio rendelőben Forrás Fernanda közel 10 éves élsport tapasztalatával dolgozik a páciensek felépülésén.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Élsport háttér a szolgálatában</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Forrás Fernanda a <strong>Győri ETO FC labdarúgócsapat</strong>, kézilabdázók és atlétái mellett szerezte tapasztalatait. Ez az élsport háttér garantálja, hogy pontosan értjük a sportolók igényeit, a terhelés-regeneráció egyensúlyát és a visszatérés kihívásait.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">A sportrehabilitáció fázisai</h2>
      <ol class="list-none space-y-4 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <div>
            <span class="text-gray-700"><strong>Akut fázis – Fájdalomcsökkentés és védelem</strong></span>
            <p class="text-gray-600 text-sm mt-1">Gyulladáscsökkentés, fájdalomcsillapítás, az érintett terület védelme. <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápia</a> a regeneráció felgyorsítására.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <div>
            <span class="text-gray-700"><strong>Szubakut fázis – Mobilitás helyreállítása</strong></span>
            <p class="text-gray-600 text-sm mt-1">Mozgástartomány fokozatos növelése, <a href="/szolgaltatasok#detail-Lágy%20rész%20manuál%20terápia%20(FDM%20kezelések)" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">manuálterápia (FDM)</a>, enyhe terheléses gyakorlatok.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <div>
            <span class="text-gray-700"><strong>Erősítő fázis – Stabilitás és erő építése</strong></span>
            <p class="text-gray-600 text-sm mt-1">Célzott izomerősítés, propriocepció fejlesztése, core stabilizáció. A szövetek terhelhetőségének fokozatos növelése.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <div>
            <span class="text-gray-700"><strong>Funkcionális fázis – Sportspecifikus edzés</strong></span>
            <p class="text-gray-600 text-sm mt-1">Sportágspecifikus mozgásminták visszaépítése, gyorsaság, agilitás, robbanékonyság fejlesztése.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
          <div>
            <span class="text-gray-700"><strong>Visszatérés – Teljesítménytesztek</strong></span>
            <p class="text-gray-600 text-sm mt-1">Objektív tesztek alapján döntünk a visszatérésről. A cél: a sérülés előtti szint elérése vagy meghaladása.</p>
          </div>
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Leggyakoribb sportsérülések</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Szalagsérülések</strong> – boka, térd (ACL, MCL), váll – a leggyakoribb kontaktsport sérülések</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Izomhúzódás és -szakadás</strong> – combhajlítók, vádli, hátsó combizom</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Meniszkusz-sérülés</strong> – térdízületi porcfelszín sérülése</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Achilles-ín problémák</strong> – tendinopátia, részleges vagy teljes szakadás</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Túlterheléses panaszok</strong> – futótérd, teniszkönyök, shin splint, stressztörés</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Vállficam és rotátorköpeny sérülés</strong> – dobósportoknál, küzdősportoknál</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Módszereink a sportrehabilitációban</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong><a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Egyéni gyógytorna</a></strong> – személyre szabott gyakorlatprogram</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>FDM manuálterápia</strong> – fascia kezelés a gyorsabb szövetgyógyulásért</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>BEMER terápia</strong> – mikrokeringés javítása a regeneráció felgyorsítására</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong><a href="/szolgaltatasok#detail-Dinamikus%20tape" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Dinamikus tape</a></strong> – biomechanikai támogatás edzés és verseny közben</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Funkcionális tréning</strong> – sportágspecifikus mozgásminták visszaépítése</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Ne várjon a rehabilitációval!</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A korai rehabilitáció bizonyítottan gyorsabb felépülést eredményez. Ha sportsérülést szenvedett, vagy műtét utáni rehabilitációra van szüksége, <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">foglaljon időpontot</a> győri rendelőnkbe. Tapasztalatunk és felkészültségünk az Ön szolgálatában!
      </p>
    `
  },
  {
    slug: "manualterapia-fdm-kezeles",
    title: "Manuálterápia és FDM kezelés – Mikor segíthet és hogyan működik?",
    metaTitle: "Manuálterápia és FDM Kezelés Győrben | ReStart Physio",
    metaDescription: "FDM manuálterápia Győrben a ReStart Physio rendelőben. Ismerje meg a fascia kezelés hatásait, mikor javasolt és hogyan segít a fájdalom gyors csökkentésében.",
    excerpt: "Az FDM manuálterápia az egyik leghatékonyabb módszer az akut és krónikus mozgásszervi fájdalmak kezelésére. Tudja meg, hogyan működik és mikor érdemes alkalmazni.",
    coverImage: "/manual5.jpg",
    coverImageAlt: "FDM manuálterápia kezelés a ReStart Physio rendelőben Győrben",
    author: "Forrás Fernanda",
    date: "2026-04-05",
    readingTime: "7 perc",
    tags: ["manuálterápia", "FDM", "fizioterápia", "fájdalomkezelés"],
    keywords: "manuálterápia győr, fdm kezelés, fascia terápia, fájdalomkezelés győr, manuális terápia, lágy rész kezelés, fizioterápia győr",
    faq: [
      {
        question: "Fájdalmas az FDM kezelés?",
        answer: "Az FDM kezelés során a fascia letapadások oldásakor érezhető erőteljesebb nyomás, amely rövid ideig kellemetlen lehet. A kezelés intenzitását mindig a páciens tűréshatárához igazítjuk. A kezelés utáni könnyebbség azonban szinte azonnal érezhető."
      },
      {
        question: "Hány FDM kezelés szükséges?",
        answer: "Akut panaszoknál gyakran már 1-3 alkalom is jelentős javulást hoz. Krónikus problémáknál 5-8 kezelés szükséges. Az FDM egyik nagy előnye, hogy gyors, látványos eredményt ad."
      },
      {
        question: "Maradhat nyoma az FDM kezelésnek?",
        answer: "A kezelés után az érintett területen átmeneti bőrpír vagy kisebb véraláfutás jelentkezhet, ami 2-5 napon belül elmúlik. Ez a szövetgyógyulás természetes része."
      },
      {
        question: "Kombinálható más kezeléssel az FDM?",
        answer: "Igen, kifejezetten javasolt! Az FDM-et gyakran kombináljuk gyógytornával, BEMER terápiával és dinamikus tape alkalmazásával a legjobb eredmény érdekében."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        Az <strong>FDM (Fascia Disztorziós Modell) manuálterápia</strong> egy innovatív kézi kezelési módszer, amely a fascia – az egész testet behálózó kötőszöveti hálózat – elváltozásainak helyreállítására fókuszál. Győri rendelőnkben az FDM-et a <a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">gyógytornával</a> és más módszerekkel kombinálva alkalmazzuk.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mi az a fascia és miért fontos?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A <strong>fascia</strong> egy összefüggő kötőszöveti hálózat, amely körbeveszi és összeköti az izmokat, csontokat, idegeket és szerveket. Kulcsszerepet játszik a mozgásban, az erőátvitelben és a testtartásban. Ha a fascia „összetapad", megkeményedik vagy elcsúszik, az fájdalmat, mozgáskorlátozottságot és teljesítménycsökkenést okozhat.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan működik az FDM kezelés?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        Az FDM modell hatféle fascia elváltozást (disztorziót) különböztet meg, és mindegyikre specifikus kézi technikát alkalmaz:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Triggerband</strong> – a fascia csavarodása mentén történő kisimítás erőteljes húzó mozdulatokkal</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Herniated Triggerpoint</strong> – a kiszorult szövet visszanyomása az eredeti helyére</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Continuum Distortion</strong> – az ízületi átmeneti zónák kezelése</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Folding Distortion</strong> – az ízületi szalagok és tokok ráncosodásának kezelése</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Cylinder Distortion</strong> – a mélyebb szöveti rétegek összetapadásának oldása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Tectonic Fixation</strong> – az ízületi felszínek mozgásának helyreállítása</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mikor javasolt az FDM manuálterápia?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Akut fájdalmak</strong> – berántás, ficam, hirtelen fellépő fájdalom</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Krónikus panaszok</strong> – hónapok óta fennálló derékfájás, vállmerevség, nyakfájdalom</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Sportsérülések</strong> – húzódás, ficam, íngyulladás gyors kezelése</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Mozgáskorlátozottság</strong> – csökkent vállmozgás, merev térd, korlátozott hajlítás</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Műtét utáni állapot</strong> – hegszövetek, letapadások oldása</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Az FDM előnyei más módszerekkel szemben</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Gyors eredmény</strong> – már az első kezelés után érezhető javulás</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Ok-orientált</strong> – nem csak a tünetet, hanem a fascia disztorziót kezeli</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Kevés kezelés</strong> – akut esetben 1-3 alkalom is elegendő</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Kombinálható</strong> – kiválóan kiegészíti a <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápiát</a> és a gyógytornát</span>
        </li>
      </ul>

      <p class="text-gray-700 mb-6 leading-relaxed">
        Ha akut vagy krónikus fájdalommal küzd, az FDM manuálterápia gyors és hatékony megoldást nyújthat. <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Foglaljon időpontot</a> győri rendelőnkbe!
      </p>
    `
  },
  {
    slug: "schroth-terapia-gerincferdules",
    title: "Schroth terápia gerincferdülés kezelésére – Hatékony módszer műtét nélkül",
    metaTitle: "Schroth Terápia Gerincferdülés Kezelésére Győrben | ReStart Physio",
    metaDescription: "Schroth terápia Győrben gerincferdülés (scoliosis) kezelésére. Háromdimenziós korrekciós módszer gyermekeknek és felnőtteknek. Személyre szabott program a ReStart Physio-nál.",
    excerpt: "A Schroth terápia a gerincferdülés leghatékonyabb konzervatív kezelési módszere. Ismerje meg, hogyan korrigálja a tartáshibákat műtét nélkül.",
    coverImage: "/schroth.jpg",
    coverImageAlt: "Schroth terápia gerincferdülés kezelése a ReStart Physio rendelőben Győrben",
    author: "Forrás Fernanda",
    date: "2026-04-06",
    readingTime: "8 perc",
    tags: ["Schroth terápia", "gerincferdülés", "fizioterápia", "rehabilitáció"],
    keywords: "schroth terápia győr, gerincferdülés kezelés, scoliosis terápia, gerincferdülés gyerek, tartáshiba kezelés, konzervatív scoliosis kezelés",
    faq: [
      {
        question: "Hány éves kortól alkalmazható a Schroth terápia?",
        answer: "A Schroth terápia már 8-10 éves kortól alkalmazható, amikor a gyermek képes tudatosan együttműködni a gyakorlatok során. Serdülőkorban, a növekedési csúcs idején különösen fontos a korai beavatkozás."
      },
      {
        question: "Gyógyítható a gerincferdülés Schroth terápiával?",
        answer: "A Schroth terápia célja a ferdülés progressziójának megállítása, a meglévő görbület csökkentése és a tartás javítása. Teljes korrekció nem minden esetben lehetséges, de a rendszeres terápia jelentős javulást eredményez."
      },
      {
        question: "Milyen gyakran kell Schroth terápiára járni?",
        answer: "Általában heti 1-2 alkalommal javasolunk intenzív blokkterápiát, majd fenntartó fázisban heti 1 alkalom és napi otthoni gyakorlás. A gyakorlatok otthoni végzése kulcsfontosságú az eredmény fenntartásához."
      },
      {
        question: "Fűző mellett is szükséges a Schroth terápia?",
        answer: "Igen, a Schroth terápia és a fűzőviselés kiegészíti egymást. A terápia segít az izmok aktív korrekciójában, míg a fűző passzív támogatást nyújt. A kettő kombinációja adja a legjobb eredményt."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>Schroth terápia</strong> egy speciális, háromdimenziós mozgásterápia, amelyet Katharina Schroth fejlesztett ki a gerincferdülés (scoliosis) kezelésére. Győri rendelőnkben ez az egyik legkeresettebb szolgáltatásunk – gyermekeknek és felnőtteknek egyaránt.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mi az a gerincferdülés (scoliosis)?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A gerincferdülés a gerinc oldalirányú görbülete, amely <strong>háromdimenziós deformitás</strong> – a gerinc nemcsak oldalra hajlik, hanem rotálódik (csavarodik) is. A ferdülés mértékét Cobb-fokokban mérik. 10 fok felett beszélünk gerincferdülésről, 20-25 fok felett fűzőviselés, 40-50 fok felett műtét jöhet szóba.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Hogyan működik a Schroth terápia?</h2>
      <p class="text-gray-700 mb-4 leading-relaxed">
        A Schroth terápia a gerinc háromdimenziós korrekcióján alapul. A kezelés három pillére:
      </p>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Testhelyzet-korrekció</strong> – a páciens megtanulja felismerni és korrigálni a ferdülés okozta aszimmetriát</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Rotációs légzés</strong> – speciális légzéstechnika, amely a beesett oldalon tágítja a mellkast és a bordákat</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Izomaktiválás</strong> – célzott izomerősítés a korrigált pozícióban, hogy a test megtanulja az új tartást</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Kinek ajánlott a Schroth terápia?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Serdülők</strong> – akiknél iskolai szűrésen vagy szülői észlelésen ferdülést találtak</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Fűzőt viselő fiatalok</strong> – a fűző mellett a Schroth terápia aktív korrekciót biztosít</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Felnőttek gerincferdüléssel</strong> – a fájdalom csökkentése és a tartás javítása céljából</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Műtét utáni páciensek</strong> – a gerinc fúziós műtét utáni rehabilitáció részeként</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Tartáshibás gyermekek</strong> – hanyagtartás, Scheuermann-kór korai kezelése</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">A Schroth terápia menete a ReStart Physio-nál</h2>
      <ol class="list-none space-y-4 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Részletes vizsgálat</strong> – tartáselemzés, röntgen kiértékelés, ferdülés típusának meghatározása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Egyéni Schroth-program</strong> – a ferdülés típusához igazított korrekciós gyakorlatok összeállítása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Intenzív terápia</strong> – heti 1-2 alkalom a rendelőben, a helyes technika elsajátítása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Otthoni gyakorlás</strong> – napi 15-20 perc otthoni program az eredmény fenntartásáért</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
          <span class="text-gray-700"><strong>Kontroll</strong> – rendszeres újravizsgálat és a program módosítása a fejlődés alapján</span>
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Miért érdemes korán kezdeni?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        A gerincferdülés kezelésében az <strong>időfaktor kritikus</strong>. Serdülőkorban, a növekedési csúcs idején a ferdülés gyorsan romolhat – de a Schroth terápia ekkor a leghatékonyabb is. A korai felismerés és kezelés megakadályozhatja a műtéti beavatkozás szükségességét.
      </p>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Ha gyermekénél gerincferdülést diagnosztizáltak, vagy tartáshibát észlel, ne halogasson – <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">foglaljon időpontot</a> a ReStart Physio rendelőbe. A Schroth terápiát más módszerekkel – <a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">gyógytornával</a>, <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápiával</a> – is kombinálhatjuk a legjobb eredmény érdekében.
      </p>
    `
  },
  {
    slug: "mutet-utani-rehabilitacio",
    title: "Műtét utáni rehabilitáció – Mire számítson és hogyan gyorsítsa a felépülést?",
    metaTitle: "Műtét Utáni Rehabilitáció Győrben | ReStart Physio",
    metaDescription: "Műtét utáni rehabilitáció Győrben a ReStart Physio rendelőben. Térd-, váll-, csípő- és gerincműtét utáni felépülés személyre szabott fizioterápiával.",
    excerpt: "A műtét utáni rehabilitáció kulcsfontosságú a teljes felépüléshez. Ismerje meg, hogyan segít a fizioterápia a gyorsabb és biztonságosabb visszatérésben.",
    coverImage: "/sportrehab4.jpg",
    coverImageAlt: "Műtét utáni rehabilitáció a ReStart Physio rendelőben Győrben",
    author: "Forrás Fernanda",
    date: "2026-04-07",
    readingTime: "8 perc",
    tags: ["rehabilitáció", "műtét utáni", "fizioterápia", "gyógytorna"],
    keywords: "műtét utáni rehabilitáció győr, térdműtét rehabilitáció, válműtét utáni gyógytorna, csípőprotézis rehabilitáció, gerincműtét felépülés",
    faq: [
      {
        question: "Mikor kezdhető a rehabilitáció műtét után?",
        answer: "A legtöbb ortopédiai műtét után 1-2 héten belül megkezdhető a rehabilitáció. Egyes esetekben (pl. térdprotézis) már a műtét utáni napon elkezdődik a korai mobilizáció. Az orvos ajánlása alapján egyeztetjük az időpontot."
      },
      {
        question: "Mennyi ideig tart a műtét utáni rehabilitáció?",
        answer: "Ez a műtét típusától függ: térdtükrözés után 4-8 hét, keresztszalag-plasztika után 6-9 hónap, térd- vagy csípőprotézis után 3-6 hónap, gerincműtét után 2-4 hónap rehabilitáció szükséges."
      },
      {
        question: "Kell beutaló a műtét utáni rehabilitációhoz?",
        answer: "A ReStart Physio-ba beutaló nélkül is jöhet. Azonban javasoljuk, hogy hozza magával a műtéti leírást és az orvos ajánlásait, hogy a rehabilitációs tervet ehhez igazíthassuk."
      },
      {
        question: "Mi történik, ha kihagyom a rehabilitációt?",
        answer: "A rehabilitáció kihagyása vagy túl korai abbahagyása ízületi merevséghez, izomgyengeséghez, kompenzációs mozgásmintákhoz és a műtéti eredmény romlásához vezethet. A teljes rehabilitáció befejezése kulcsfontosságú."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>műtét utáni rehabilitáció</strong> legalább olyan fontos, mint maga a sebészeti beavatkozás. A műtét megoldja a strukturális problémát, de a teljes funkció helyreállítása – az erő, a mozgékonyság és a stabilitás visszanyerése – a <a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">fizioterápia</a> feladata.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Miért kritikus a rehabilitáció?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Ízületi merevség megelőzése</strong> – a műtét utáni immobilizáció során az ízületek hamar „beragadnak"</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Izomgyengeség kezelése</strong> – a műtét és a pihenés során az izmok gyorsan sorvadnak</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Hegszövet kezelése</strong> – a letapadások megelőzése és a hegszövet mobilizálása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Helyes mozgásminták</strong> – a kompenzációs stratégiák megelőzése és a normál járás visszatanítása</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Újrasérülés megelőzése</strong> – fokozatos terhelés a szövetek teherbíró-képességéhez igazítva</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Milyen műtétek utáni rehabilitációban segítünk?</h2>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Térdműtétek</h3>
      <ul class="list-none space-y-2 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Keresztszalag-plasztika (ACL rekonstrukció)</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Térdtükrözés (artroszkópia) – meniszkusz, porc</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Térdprotézis (TEP) beültetés</span>
        </li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Vállműtétek</h3>
      <ul class="list-none space-y-2 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Rotátorköpeny rekonstrukció</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Válltükrözés (artroszkópia)</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Vállstabilizáció (Bankart-műtét)</span>
        </li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Csípő- és gerincműtétek</h3>
      <ul class="list-none space-y-2 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700">Csípőprotézis beültetés</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#004a6d] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><a href="/blog/gerincfajdalom-okai-kezelese" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Gerincműtét</a> – porckorongsérv, stabilizáció, fúzió</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">A rehabilitáció fázisai</h2>
      <ol class="list-none space-y-4 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <div>
            <span class="text-gray-700"><strong>Korai fázis (1-2. hét)</strong></span>
            <p class="text-gray-600 text-sm mt-1">Duzzanat csökkentése, fájdalomkezelés, enyhe mozgatás. <a href="/blog/bemer-terapia-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">BEMER terápia</a> a keringés javítására.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <div>
            <span class="text-gray-700"><strong>Mobilizációs fázis (2-6. hét)</strong></span>
            <p class="text-gray-600 text-sm mt-1">Mozgástartomány fokozatos növelése, hegszövet kezelés <a href="/blog/manualterapia-fdm-kezeles" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">FDM manuálterápiával</a>.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <div>
            <span class="text-gray-700"><strong>Erősítő fázis (6-12. hét)</strong></span>
            <p class="text-gray-600 text-sm mt-1">Célzott izomerősítés, egyensúlygyakorlatok, propriocepció fejlesztése.</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <div>
            <span class="text-gray-700"><strong>Funkcionális fázis (12+ hét)</strong></span>
            <p class="text-gray-600 text-sm mt-1">Visszatérés a mindennapi tevékenységekhez, sporthoz. Prevenciós program összeállítása.</p>
          </div>
        </li>
      </ol>

      <p class="text-gray-700 mb-6 leading-relaxed">
        Ha műtét előtt áll vagy frissen operálták, <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">foglaljon időpontot</a> a ReStart Physio győri rendelőjébe. A műtéti leírás és az orvosi ajánlás alapján összeállítjuk az Ön személyre szabott rehabilitációs programját.
      </p>
    `
  },
  {
    slug: "derekfajas-irodai-munka",
    title: "Derékfájás irodai munkánál – 5 hatékony gyakorlat és tipp a megelőzéshez",
    metaTitle: "Derékfájás Irodai Munkánál – Gyakorlatok és Tippek | ReStart Physio",
    metaDescription: "Derékfájás irodai munkánál? 5 hatékony gyakorlat és ergonómiai tipp a fizioterápiás szakembertől. Előzze meg a krónikus fájdalmat a ReStart Physio tanácsaival.",
    excerpt: "Az irodai munkavégzés az egyik leggyakoribb oka a derékfájásnak. Ismerje meg a legjobb gyakorlatokat és ergonómiai tippeket a megelőzéshez.",
    coverImage: "/gerinc_core1.jpg",
    coverImageAlt: "Derékfájás megelőzése irodai munkánál – gyakorlatok és ergonómiai tippek",
    author: "Forrás Fernanda",
    date: "2026-04-08",
    readingTime: "6 perc",
    tags: ["derékfájás", "ergonómia", "megelőzés", "mozgásszervi panaszok"],
    keywords: "derékfájás irodai munka, derékfájás gyakorlatok, ergonómia iroda, ülőmunka derékfájás, gerinc gyakorlatok, derékfájás megelőzése",
    faq: [
      {
        question: "Milyen gyakran kell szünetet tartani ülőmunkánál?",
        answer: "Legalább óránként érdemes 2-3 percre felállni és mozogni. Az ideális a 45 perc ülés + 5 perc mozgás váltakozás. Még egy rövid nyújtás vagy séta a konyhába is segít."
      },
      {
        question: "Milyen szék a legjobb az irodai munkához?",
        answer: "Olyan szék ideális, amely állítható magasságú, ágyéki (lumbális) támasztékkal rendelkezik, és lehetővé teszi, hogy a lábak teljes talppal a padlón legyenek. Az ülőlabda vagy térdeplőszék alkalmanként jó alternatíva, de nem ajánlott egész napos használatra."
      },
      {
        question: "Az álló asztal megoldja a derékfájást?",
        answer: "Az álló asztal önmagában nem csodaszer. A lényeg a pozícióváltás – az ideális a váltakozó ülés és állás. Az egész napos állás is túlterhelheti a gerincet. A kombináció a kulcs."
      },
      {
        question: "Mikor forduljak orvoshoz a derékfájásommal?",
        answer: "Ha a fájdalom 2-3 hétnél tovább fennáll, a lábba sugárzik, zsibbadás vagy gyengeség kíséri, vagy éjszaka is fájdalmat okoz. Ezekben az esetekben érdemes szakember véleményét kérni."
      }
    ],
    content: `
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        A <strong>derékfájás</strong> az irodai dolgozók egyik leggyakoribb panasza. A napi 8+ óra ülés, a monitor elé görnyedés és a mozgáshiány együttesen terhelik meg a gerincet. De a jó hír: néhány egyszerű szokással és gyakorlattal jelentősen csökkenthető a fájdalom és megelőzhető a <a href="/blog/gerincfajdalom-okai-kezelese" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">krónikus gerincpanasz</a> kialakulása.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Miért fáj a derék az irodai munkától?</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Tartós nyomás a porckorongokon</strong> – ülés közben a gerinc terhelése 40%-kal nagyobb, mint állás közben</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>A csípőhajlító izmok rövidülése</strong> – a tartós ülés miatt ezek az izmok „berövidülnek" és előrebillentik a medencét</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>A core izmok elgyengülése</strong> – a tartóizmok nem dolgoznak aktívan ülés közben</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 bg-[#EC7007] rounded-full mt-2 flex-shrink-0"></span>
          <span class="text-gray-700"><strong>Helytelen testtartás</strong> – a monitor felé görnyedés, a lógatott váll fokozza a terhelést</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">5 hatékony gyakorlat irodai munkásoknak</h2>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Csípőhajlító nyújtás</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Álljon fel, lépjen egyet hátra a jobb lábával, és engedje le a csípőjét előre és lefelé. Tartsa egyenesen a felsőtestét. Tartsa 30 másodpercig, majd váltson oldalt. <strong>Naponta 3x ismételje mindkét oldalon.</strong>
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Macska-tehén gyakorlat</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Térdeljen négykézlábra. Belégzésre engedje le a hasát (tehén pozíció), kilégzésre domborítsa a hátát (macska pozíció). Lassan, tudatosan végezze. <strong>10 ismétlés, naponta 2-3 alkalommal.</strong>
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Széken végezhető gerinccsavarás</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Üljön egyenesen a székén, tegye a jobb kezét a bal térdére, és csavarodjon balra. Tartsa 20 másodpercig, majd váltson. <strong>Ez a gyakorlat a munkahelyen is elvégezhető!</strong>
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Hídgyakorlat (glute bridge)</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Feküdjön hanyatt, hajlítsa be a térdeit. Emelje fel a csípőjét, szorítsa össze a farizomzatot a tetőn. Lassan engedje le. <strong>15 ismétlés, 3 sorozat.</strong> Ez erősíti a farizomzatot és stabilizálja a medencét.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Dead bug gyakorlat</h3>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Feküdjön hanyatt, emelje fel a karjait és a hajlított lábait. Lassan nyújtsa ki az egyik karját hátra és az ellentétes lábát előre, miközben a derekát a talajhoz nyomja. <strong>10 ismétlés oldalanként.</strong> A legjobb core stabilizáló gyakorlat kezdőknek.
      </p>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Ergonómiai tippek az irodába</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <span class="text-gray-700"><strong>Monitor szemmagasságban</strong> – a képernyő teteje legyen a szemek magasságában, karnyújtásnyira</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <span class="text-gray-700"><strong>Lábak a padlón</strong> – a térd 90 fokban hajlítva, talpak teljes felülettel a padlón (vagy lábtámaszon)</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <span class="text-gray-700"><strong>Ágyéktámasz</strong> – egy kis párna vagy a szék lumbális támasztéka a derékhajlatba</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <span class="text-gray-700"><strong>Billentyűzet és egér közel</strong> – a könyök 90 fokos hajlításban, vállak lazán leeresztve</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-8 h-8 bg-[#004a6d] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
          <span class="text-gray-700"><strong>Óránkénti szünet</strong> – álljon fel, járjon pár lépést, nyújtózzon – ez a legfontosabb szabály!</span>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-[#004a6d] mt-10 mb-4">Mikor kérjen szakember segítséget?</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Ha a derékfájás <strong>2-3 hétnél tovább fennáll</strong>, rendszeresen visszatér, vagy a mindennapi tevékenységeket korlátozza, érdemes szakemberhez fordulni. A ReStart Physio rendelőben feltárjuk a fájdalom okát és <a href="/blog/gyogytorna-gyor" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">személyre szabott gyógytorna programot</a> állítunk össze. <a href="/elerhetoseg#contact" class="text-[#004a6d] font-semibold hover:text-[#EC7007]">Foglaljon időpontot</a> – beutaló nélkül is várjuk!
      </p>
    `
  },
];


/* ------------------------------------------------------------------ */
/*  Helper függvények                                                  */
/* ------------------------------------------------------------------ */
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.tags.some(tag => current.tags.includes(tag)))
    .slice(0, limit);
}