# Élesítés — lépésről lépésre

Ez a lista a ReStart Physio időpontfoglaló rendszerének éles üzembe
helyezéséről szól. A sorrend számít: több lépés épül az előzőre.

Készült: 2026-09-28.

---

## 0. Mielőtt bármihez hozzákezdesz

Három döntés, ami nélkül nem lehet végigmenni:

- [ ] **Netlify fiók.** Az oldal a Vercelről a Netlifyra költözik, mert a
      Vercel Hobby csomagja kizárja az üzleti használatot („Hobby teams are
      restricted to non-commercial personal use only"), a Netlify Free viszont
      engedi. Ez az oldal két okból is üzleti: szolgáltatást hirdet árakkal, és
      fizetett munkaként készült. A fiók létrehozása a te dolgod, utána a
      telepítés parancssorból megy.
- [ ] **Megőrzési idő.** A tájékoztatóban most 5 év szerepel, és az automatikus
      törlés is ennyire van állítva. Ha a könyvelő mást mond, két helyen kell
      átírni: `lib/adattorles.ts` (a `MEGORZES_EV` érték) és az adatvédelmi
      tájékoztató 5.4. pontja.
- [ ] **A régi adatbázis sorsa.** A fejlesztői adatbázisban demó adatok vannak
      (14 vendég, 30 foglalás, 3 kitalált felhasználó). Ezek nem kerülnek át
      sehová — az éles adatbázis üresen indul.

---

## 1. Supabase projekt

- [ ] Új projekt, **régió: Frankfurt (EU Central)**. Ez nem ízlés kérdése: az
      adatvédelmi tájékoztató VII.4. pontja azt állítja, hogy az adatok az
      Európai Unión belül vannak. Más régióval a dokumentum valótlant állít.
- [ ] Az adatbázis jelszavát mentsd el jelszókezelőbe. A Supabase utólag nem
      mutatja meg.
- [ ] **Séma betöltése:** SQL Editor → a `db/sema.sql` fájl teljes tartalmának
      bemásolása → Run.

  Ez létrehozza mind a 7 táblát, a 2 típust, a `btree_gist` kiterjesztést, a 7
  idegen kulcsot és a 16 indexet. Külön migrációs szkriptet **nem** kell
  futtatni: a fájl már mindent tartalmaz.

- [ ] Ellenőrzés a Supabase SQL Editorban:

  ```sql
  SELECT conname FROM pg_constraint WHERE contype = 'x';
  ```

  Ha ez üres, a `btree_gist` kiterjesztés nem jött létre, és **két foglalás
  ugyanarra az időpontra is felvihetővé válik**. Ilyenkor futtasd:
  `CREATE EXTENSION IF NOT EXISTS btree_gist;` majd töltsd be újra a sémát.

- [ ] **A pooled connection stringet** kérd le (Connect → Transaction pooler,
      6543-as port), ne a közvetlent (5432). A kiszolgálón minden kérés saját
      kapcsolatot nyit; a közvetlen kapcsolatok száma hamar elfogy, és a
      naptár véletlenszerűen hibázni kezd.

---

## 2. Netlify környezeti változók

A meglévőket **ne töröld** — a publikus oldal működéséhez kellenek.

**Új, a foglalórendszerhez:**

| Változó | Érték |
|---|---|
| `DATABASE_URL` | a Supabase **pooled** connection stringje |
| `NEXT_PUBLIC_SITE_URL` | `https://restartphysio.hu` |
| `CRON_SECRET` | hosszú véletlen érték (pl. `openssl rand -hex 32`) |
| `MAIL_FROM` | `ReStart Physio <noreply@restartphysio.hu>` |

**Amit felül kell vizsgálni:**

| Változó | Mit kell tenni |
|---|---|
| `RESEND_API_KEY` | Arra a Resend-fiókra kell állítani, ahol a `restartphysio.hu` domain hitelesítve van. A fejlesztés alatti 403-akat épp az okozta, hogy a régi kulcs egy **másik** fiókhoz tartozott. |
| `CONTACT_FROM` | `noreply@restartphysio.hu` alakra, ha még a Resend homokozó-feladója (`onboarding@resend.dev`) van beállítva. |
| `CONTACT_TO` | Marad, ahogy van — ide érkezik a kapcsolati űrlap. |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Maradnak. Enélkül a kapcsolati űrlap 500-at ad. |

Miért fontos a `NEXT_PUBLIC_SITE_URL`: enélkül a jelszó-visszaállító link a
kérés `Host` fejlécéből épül, amit a kérés küldője állít be — így hamis linket
lehetne kicsalni.

---

## 3. Első adminisztrátor és törzsadatok

A séma betöltése után az adatbázis üres: nincs felhasználó, nincs szolgáltatás,
nincs munkaidő. Belépni sem lehet, mert felhasználót csak bejelentkezett admin
vehet fel.

Állítsd át a `.env.local` `DATABASE_URL` értékét az éles adatbázisra
(**ideiglenesen**, a lépések végén állítsd vissza), és a `NEXT_PUBLIC_SITE_URL`-t
`https://restartphysio.hu`-ra, majd futtasd sorban:

```bash
node --env-file=.env.local scripts/seed-services.mjs
node --env-file=.env.local scripts/elso-admin.mjs "Forrás Fernanda" fernanda@email.hu
node --env-file=.env.local scripts/seed-munkaido.mjs
```

- A `seed-services.mjs` felveszi a 10 szolgáltatást az árakkal.
- Az `elso-admin.mjs` létrehozza az első admint **jelszó nélkül**, és küld egy
  e-mailes meghívót, amin keresztül maga állítja be a jelszavát. A linket a
  konzolra is kiírja. A script csak akkor fut le, ha még nincs aktív admin.
- A `seed-munkaido.mjs` beállítja a 7:00–19:00 munkaidőt (ezért kell az admin
  után futtatni: felhasználóhoz köti).

Ha a meghívó link lejár (60 perc), a belépőoldal „Elfelejtett jelszó" gombja ad
újat.

---

## 4. Telepítés a Netlifyra

A telepítés a **privát GitHub-tárolóból** megy: a Netlify a saját Linux-gépein
fordít. Erre azért volt szükség, mert a helyi, windowsos fordítás a Netlify
utófeldolgozó lépésén elakadt (a `.next` mappát nem engedte átnevezni a
rendszer, EPERM). A privát tároló miatt a kód nem lett nyilvános.

- [ ] A tároló **privát** legyen a GitHubon
- [ ] A Netlify felületén: **Project configuration → Developer settings →
      Continuous deployment → Repository → Link repository** → GitHub →
      `istvangal33/gyogytorna_site`, ág: `main`

      Ne a főoldali „Import from Git"-et használd — az új projektet hozna
      létre a meglévő helyett.

      A fordítási beállításokat nem kell begépelni: a `netlify.toml`
      tartalmazza őket.

- [ ] Ezután minden `git push` után magától épül és települ.
- [ ] A füstteszt (5. szakasz) a `*.netlify.app` próbacímen menjen végig,
      mielőtt a DNS-hez hozzányúlnánk.
- [ ] **Ütemezett feladatok ellenőrzése** a Netlify felületén
      (Project configuration → Functions). A `netlify.toml` kettőt ír le:
      - `emlekezteto` — minden nap 16:00
      - `adattorles` — minden hónap 1-jén 3:00

      Mindkettő elfér a Free csomagon; az ütemezett függvények minden
      csomagon elérhetők. A felületen a „Run now" gombbal kézzel is
      elindíthatók — az emlékeztetőt érdemes így egyszer kipróbálni.

---

## 5. Füstteszt a próbadomainen

Ezt végig kell kattintani, mert olyan dolgokat fed le, amit teszttel nem tudok
ellenőrizni.

- [ ] `https://restartphysio.hu/admin` → átirányít a belépésre
- [ ] Belépés az új admin jelszóval
- [ ] Naptár betölt, látszik a munkaidő sávja
- [ ] **Foglalás felvitele a saját e-mail címeddel** → megérkezik a
      visszaigazoló levél, a naptármeghívó melléklet megnyílik
- [ ] A foglalás lemondása → megérkezik az értesítő
- [ ] Ugyanarra az időpontra ugyanannak a munkatársnak második foglalás →
      a rendszer visszautasítja
- [ ] Vendégek oldal, felhasználók oldal
- [ ] Kijelentkezés
- [ ] „Elfelejtett jelszó" → megérkezik a link
- [ ] Mobilon: naptár napi és heti nézet, áttekintés, vendéglista
- [ ] Publikus oldal: cookie-sáv megjelenik privát ablakban, az „Elfogadom"
      után eltűnik és újratöltés után sem jön vissza
- [ ] Kapcsolati űrlap kiküldése

Az emlékeztető levelet érdemes külön ellenőrizni: vigyél fel egy foglalást
**holnapra**, és másnap nézd meg, megjött-e. Kézzel is kikényszeríthető:

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" \
  "https://restartphysio.hu/api/cron/emlekezteto?napok=1"
```

---

## 6. A domain átállítása

Ez a lépés a legkockázatosabb: innentől a látogatók is az új helyre érkeznek.
Csak akkor kezdj bele, ha az előző szakasz végigment.

> ⚠️ **A névszervereket NE vidd át a Netlifyra.** A `restartphysio.hu` DNS-e az
> Elin-nél van, és ott vannak a levelezés rekordjai is: a Resend DKIM-je, az
> SPF, a DMARC és az MX. Ha a névszerver átkerül, ezek egy pillanat alatt
> eltűnnek — a foglalási visszaigazolók és a kapcsolati űrlap levelei is
> elakadnak. **Maradjon minden az Elin-nél, és csak a weboldalra mutató
> rekordokat írd át.**

- [ ] **Egy-két nappal korábban** vidd le a weboldal DNS-rekordjának TTL
      értékét az Elin-nél (pl. 3600-ról 300-ra). Ez azért kell, hogy ha
      vissza kell lépni, az percek alatt megtörténjen, ne órákig tartson.
- [ ] A Netlifyn: Domain management → Add a domain → `restartphysio.hu` és
      `www.restartphysio.hu`. A Netlify jelezni fogja, hogy a DNS még nem rá
      mutat — ez ilyenkor rendben van.

      **A domaint egyelőre hagyd rajta a Vercelen is.** Amíg a DNS nem változik,
      a Vercel szolgálja ki az oldalt, és ez a visszalépési lehetőséged. Ha
      előbb levennéd róla, a domain a DNS átállásáig senkinél nem működne.
- [ ] Az Elin DNS-kezelőjében írd át **csak** a weboldal rekordjait a Netlify
      által megadott értékre. A levelezéshez tartozó rekordokhoz (MX, SPF,
      DKIM, DMARC) **ne nyúlj**.
- [ ] Várd meg az átállást. Ellenőrzés:

      nslookup restartphysio.hu

- [ ] A HTTPS-tanúsítványt a Netlify magától kiállítja, miután a DNS rá mutat.
      Ez pár perc. Amíg nincs kész, a böngésző tanúsítványhibát jelez — ez
      ilyenkor normális, nem kell beavatkozni.
- [ ] **A füstteszt (5. szakasz) még egyszer, most az éles címen.**
- [ ] Küldj egy próbalevelet magadnak a kapcsolati űrlapról — ezzel ellenőrzöd,
      hogy a levelezés a DNS-átállítás után is működik.
- [ ] **Csak ha minden rendben:** a Vercelen vedd le a domaint a projektről, és
      állítsd vissza a TTL-t a korábbi értékre. Amíg ezt nem tetted meg, egy
      DNS-visszaírással bármikor visszaléphetsz a régi oldalra.

---

## 7. Élesítés után

- [ ] **Cseréld le a kulcsokat**, amelyek a fejlesztés során chatben elhangzottak:
      a Resend API-kulcsot és a régi adatbázis jelszavát.
- [ ] **Mentsd el a három adatfeldolgozói szerződést** PDF-ben, ha szeretnéd a
      szebb formátumot (a szöveges mentés megvan:
      `dokumentumok/adatfeldolgozok/`).
- [ ] **Nézesd át az adatvédelmi tájékoztatót jogásszal.** A szerkezet és a
      tartalom rendben van, de a jogalap és a megőrzési idő olyan kérdés,
      amiben szakember mondja ki az utolsó szót.
- [ ] Állítsd vissza a `.env.local` `DATABASE_URL` értékét a fejlesztői
      adatbázisra, különben a helyi tesztek az éles adatokon futnának.
- [ ] A Vercel-projekt törölhető, ha már semmi nem hivatkozik rá. A
      `vercel.json` fájl is kivehető a projektből — a Netlifyn a
      `netlify.toml` veszi át a szerepét.

---

## Ha valami elromlik

A fejlesztés előtti csomagállapot elmentve: `dokumentumok/frissites-2026-09-28/`.

```bash
cp dokumentumok/frissites-2026-09-28/package.json.elotte package.json
cp dokumentumok/frissites-2026-09-28/package-lock.json.elotte package-lock.json
npm ci
```

Az adatbázis sémája bármikor újra felépíthető a `db/sema.sql`-ből — de vigyázz,
az üres táblákat hoz létre, meglévő adatot nem ment.
