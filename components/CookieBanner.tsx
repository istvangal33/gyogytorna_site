'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';
import { CONSENT_COOKIE, CONSENT_EVENT, type ConsentValue } from '@/lib/consent';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Ellenőrzi, hogy van-e már cookie beleegyezés
    const consent = Cookies.get(CONSENT_COOKIE);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // A döntést elmentjük, majd szólunk a mérőkódnak. Újratöltés szándékosan
  // nincs: az felülírná a document.referrer-t, és minden látogató "Direct"
  // forrásként jelenne meg a Google Analyticsben.
  const saveConsent = (value: ConsentValue) => {
    Cookies.set(CONSENT_COOKIE, value, { expires: 365, sameSite: 'lax' });
    setShowBanner(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  const handleAcceptCookie = () => saveConsent('true');
  const handleDeclineCookie = () => saveConsent('false');

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Elfogadom"
      declineButtonText="Elutasítom"
      // A könyvtár alapból angol nevet ad a gomboknak ("Accept cookies"), így a
      // felolvasó mást mondott, mint ami ki volt írva, a hangvezérlés pedig a
      // magyar szóra nem reagált. A felolvasott névnek tartalmaznia kell a
      // látható feliratot, ezért kezdődik ugyanazzal a szóval.
      ariaAcceptLabel="Elfogadom a sütiket"
      ariaDeclineLabel="Elutasítom a sütiket"
      enableDeclineButton
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      expires={365}
      style={{
        background: '#0d1117',
        padding: '12px 16px',
        alignItems: 'center',
        zIndex: 9999,
      }}
      // A könyvtár alapból 15 px margót tesz a szövegre és MINDKÉT gombra.
      // Ez a három margó adta a sáv magasságának a felét, ezért vesszük ki.
      contentStyle={{
        flex: '1 1 240px',
        margin: '0 0 10px 0',
      }}
      // A két gomb margója szándékosan azonos: a könyvtár sorrendje
      // verziónként változhat, és ha csak az egyiknek adnánk oldalmargót, a
      // másik sorrendnél összeérnének a gombok. Telefonon két egymáshoz
      // tapadó gomb félrekoppintáshoz vezet — pont az elutasításnál.
      buttonStyle={{
        background: '#EC7007',
        color: 'white',
        fontSize: '14px',
        padding: '10px 22px',
        margin: '0 4px',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
      }}
      declineButtonStyle={{
        background: '#6B7280',
        color: 'white',
        fontSize: '14px',
        padding: '10px 22px',
        margin: '0 4px',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {/* A korábbi szöveg azt állította, hogy "az oldal használatával Ön
          beleegyezik" — ez a GDPR szerint sem igaz (a böngészés nem
          hozzájárulás), és a saját működésünknek is ellentmondott: a mérőkód
          a gombra kattintásig el sem indul. Az új mondat azt írja le, ami
          ténylegesen történik. */}
      <span style={{ fontSize: '14px', lineHeight: 1.4 }}>
        Analitikai sütiket csak az Ön hozzájárulásával használunk, a
        látogatottság méréséhez.{' '}
        <a
          href="/cookie-policy"
          style={{ color: '#EC7007', textDecoration: 'underline' }}
        >
          Részletek
        </a>
      </span>
    </CookieConsent>
  );
}
