// A bejelentkezett felhasználó feloldása, egy helyen.
//
// Minden admin oldal és API-végpont ezen keresztül kérdezi le, ki jár éppen
// az oldalon. Így három dolog biztosan megtörténik, és nem maradhat ki
// véletlenül sehol:
//
//   1. van-e egyáltalán munkamenet,
//   2. a fiók létezik-e még és aktív-e — ezt mindig az adatbázisból nézzük,
//      nem a tokenből, így egy jogosultság-változás azonnal érvényes,
//   3. a munkamenet a jelenlegi jelszóhoz tartozik-e.
//
// A harmadik a lényeg ahhoz, hogy jelszóváltás után a korábbi bejelentkezések
// érvényüket veszítsék: ha valaki azért cserél jelszót, mert illetéktelen
// hozzáfért a fiókjához, a betolakodó munkamenete a következő kérésnél elszáll.
import { auth } from "@/auth";
import { felhasznaloAzonositoval } from "@/lib/db";
import { munkamenetElavult } from "@/lib/munkamenet-belyeg";

export { munkamenetElavult };

/**
 * A bejelentkezett felhasználó friss adatai, vagy null, ha nincs érvényes
 * munkamenet. A hívó dönti el, mit kezd a null-lal: az oldalak a belépésre
 * irányítanak, az API-végpontok 401-et adnak.
 */
export async function bejelentkezettFelhasznalo() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await felhasznaloAzonositoval(session.user.id);
  if (!user || !user.active) return null;

  if (munkamenetElavult(session.user.jelszoValtozott, user.passwordChangedAt)) {
    return null;
  }

  return user;
}
