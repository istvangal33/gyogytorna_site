# Adatmentés és visszaállítás

A Supabase ingyenes csomagjában nincs automatikus mentés. Ha az adatbázis
elveszik, vagy valaki véletlenül töröl, magától nincs visszaút — páciensek
neveivel, elérhetőségeivel és időpontjaival együtt.

Ez a leírás arról szól, hogyan készül a mentés, és **hogyan lehet belőle
visszaállítani**. A második a fontosabbik: a mentés csak akkor ér valamit, ha
a visszaállítás ki van próbálva.

---

## Mentés készítése

```
node --env-file=.env.prod scripts/mentes.mjs
```

A szkript a teljes éles adatbázist kiírja, tömöríti, **titkosítja**, és a
OneDrive-mappába teszi:

```
<OneDrive>\ReStart Physio mentesek\restartphysio-ÉÉÉÉ-HH-NN-ÓÓPP.sql.gz.enc
```

Az utolsó **12** mentés marad meg, a régebbieket magától törli.

Ha a OneDrive nem fut, a szkript a projekt `mentesek/` mappájába ír. Ilyenkor
is van mentés, de **ugyanazon a gépen**, mint az eredeti — egy merevlemez-hiba
mindkettőt elviszi. Ezért érdemes a OneDrive-ot bekapcsolva tartani.

### Miért van titkosítva

A mentés páciensadatot tartalmaz, és felhőbe szinkronizált mappába kerül.
Titkosítás nélkül a felhőszolgáltató is adatfeldolgozóvá válna ebben a
láncban, amit az adatvédelmi tájékoztató nem említ. Így viszont csak egy
olvashatatlan fájl kerül fel, a kulcs pedig a rendelőnél marad.

A titkosítás AES-256-GCM, a kulcs a jelszóból képződik (scrypt).

### A jelszó

Az első futáskor a szkript generál egy jelszót, beírja a `.env.prod` fájlba,
és **kiírja a képernyőre**. Ezt le kell írni egy jelszókezelőbe vagy papírra.

> **Ha a jelszó elvész, a mentés visszaállíthatatlan.** Ha csak a gépen marad,
> és a gép meghal, a mentés is használhatatlan — pont akkor, amikor kellene.

---

## Visszaállítás

### 1. Nézd meg, mi van a mentésben

```
node --env-file=.env.prod scripts/mentes-visszaallitas.mjs "<fájl>"
```

Megfejti, kicsomagolja, és kiírja, milyen táblákat tartalmaz és melyikben van
adat. A kicsomagolt `.sql` fájl **titkosítatlan páciensadat** — ha végeztél
vele, töröld.

### 2. Töltsd vissza

A cél adatbázist **kifejezetten meg kell adni**:

```
node --env-file=.env.prod scripts/mentes-visszaallitas.mjs "<fájl>" --cel "postgres://..."
```

Ez szándékosan nincs alapértelmezve. Ha az lenne, egy elgépelés az éles
adatbázist írná felül a mentés tartalmával, és a mentés óta keletkezett
foglalások nyom nélkül eltűnnének.

### Éles visszaállítás menete

Ha tényleg baj van, és az éles adatbázist kell visszaállítani:

1. **Előbb ments** a jelenlegi állapotról, bármilyen rossz is. Lehet, hogy
   tartalmaz olyan foglalást, ami a mentésben nincs.
2. A Supabase felületén hozz létre egy **új, üres adatbázist**, és oda tölts
   vissza. Ne a meglévőre: amíg a visszaállítás nem bizonyult jónak, ne
   semmisítsd meg azt, ami még megvan.
3. Ellenőrizd a visszaállított adatot: foglalások száma, vendégek, a
   `booking_no_overlap` megszorítás megléte.
4. Csak ezután állítsd át a `DATABASE_URL`-t a Netlifyn, és telepíts újra.

---

## Automatikus futtatás

Egy mentés, amit emlékezni kell lefuttatni, néhány hét alatt elmarad. Ezért
érdemes ütemezni. Windows Feladatütemező, heti egy futás:

```
schtasks /create /tn "ReStart Physio mentes" /tr "cmd /c cd /d C:\gyogytorna_site && node --env-file=.env.prod scripts\mentes.mjs" /sc weekly /d SUN /st 20:00
```

Ellenőrzés: `schtasks /query /tn "ReStart Physio mentes"`
Törlés: `schtasks /delete /tn "ReStart Physio mentes" /f`

A gépnek bekapcsolva kell lennie az adott időpontban. Ha nincs, a
Feladatütemezőben bekapcsolható, hogy a kihagyott futást később pótolja.

---

## Amit érdemes évente megnézni

- **Próbáld ki a visszaállítást.** Egy üres adatbázisba, a fenti lépésekkel.
  Ez az egyetlen módja megtudni, hogy a mentés tényleg működik.
- **Megvan-e még a jelszó** ott, ahova leírtad.
- **Készülnek-e a mentések** — nézz rá a OneDrive-mappára, friss-e a
  legutóbbi fájl dátuma.

---

## Ellenőrzött állapot

A teljes kör ki lett próbálva 2026-10-04-én: mentés, megfejtés,
visszatöltés egy üres adatbázisba, majd összehasonlítás soronként. Mind a
nyolc tábla egyezett, és a `booking_no_overlap` megszorítás is átjött.
