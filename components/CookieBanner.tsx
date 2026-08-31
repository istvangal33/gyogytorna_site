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
      enableDeclineButton
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      expires={365}
      style={{
        background: '#0d1117',
        padding: '20px',
        alignItems: 'center',
        zIndex: 9999,
      }}
      buttonStyle={{
        background: '#EC7007',
        color: 'white',
        fontSize: '14px',
        padding: '10px 30px',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
      }}
      declineButtonStyle={{
        background: '#6B7280',
        color: 'white',
        fontSize: '14px',
        padding: '10px 30px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: '14px' }}>
        Ez a weboldal sütiket (cookies) használ a jobb felhasználói élmény érdekében. 
        Az oldal használatával Ön beleegyezik a sütik használatába.{' '}
        <a 
          href="/adatvedelem" 
          style={{ color: '#EC7007', textDecoration: 'underline' }}
        >
          További információk
        </a>
      </span>
    </CookieConsent>
  );
}
