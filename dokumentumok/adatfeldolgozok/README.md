# Adatfeldolgozói szerződések — mentett másolatok

Ebben a mappában annak a három szolgáltatónak az adatfeldolgozói szerződése
(DPA) található, amelyik a ReStart Physio oldalán és időpontfoglaló
rendszerében személyes adatot kezel. Az adatvédelmi tájékoztató VII.4. pontja
ezekre a dokumentumokra hivatkozik.

**Mentve: 2026-09-28.**

## Miért van erre szükség

A GDPR 28. cikke szerint az adatkezelőnek — vagyis Forrás Fernandának —
írásbeli szerződéssel kell rendelkeznie minden adatfeldolgozóval. Mindhárom
szolgáltatónál ez a szerződés **automatikusan hatályba lépett** a felhasználási
feltételek elfogadásakor; külön aláírni vagy igényelni nem kellett.

Ez a mappa azt rögzíti, **mi volt a szerződés szövege a mentés napján**. Ha a
szolgáltató később módosítja, ezekből a fájlokból derül ki, mit fogadtunk el
eredetileg.

## Mi van a fájlokban

Mindegyik dokumentum két példányban:

- `*.html` — az eredeti oldal, ahogy a szolgáltató kiszolgálta
- `*.txt` — ugyanaz olvasható szövegként, a forrás URL-jével és a mentés
  dátumával a fájl elején

| Fájl | Szolgáltató | Szerepe |
|---|---|---|
| `vercel-dpa-*` | Vercel Inc. (USA) | tárhely, a weboldal és az admin felület futtatása |
| `supabase-dpa-*` | Supabase Pte. Ltd. (Szingapúr, EU-s tárolás) | az időpontfoglalás adatbázisa |
| `resend-dpa-*` | Plus Five Five, Inc. / Resend (USA) | a kimenő e-mailek küldése |

## A lényeg mindegyikből

**Vercel és Resend** — a szerződés a feltételek elfogadásával hatályba lép:

> „This Addendum shall become legally binding upon Customer entering into the
> Agreement or upon execution of this Addendum."

**Supabase** — ugyanez más megfogalmazásban:

> „The Parties agree that acceptance of the Agreement shall have the same effect
> as signing the SCCs."

Az EU-n kívüli adattovábbítás jogalapja mindháromnál az Európai Bizottság
általános szerződési feltételei (SCC). A **Resend** ezen felül csatlakozott az
EU–USA adatvédelmi kerethez (EU–U.S. Data Privacy Framework) is — a Vercel és a
Supabase dokumentuma erre nem hivatkozik.

## Mikor kell frissíteni

- ha bármelyik szolgáltató módosítja a DPA-ját,
- ha új adatfeldolgozó kerül a rendszerbe (akkor az adatvédelmi tájékoztató
  VII.4. táblázatát is bővíteni kell),
- ha szolgáltatót váltunk.

Frissítéskor ne írd felül a régi fájlt: az új mentés kapjon új dátumot a
nevében, a régi pedig maradjon meg. Épp az a értéke, hogy megmutatja, mi volt
érvényes egy adott időpontban.

## Megjegyzés

Ezek a dokumentumok a szolgáltatók nyilvánosan elérhető szövegei, itt
kizárólag archiválás céljából. A mappa tartalma nem jogi tanácsadás — az
adatvédelmi megfelelést érdemes jogásszal átnézetni.
