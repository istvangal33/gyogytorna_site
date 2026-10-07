'use client';

import { useEffect } from 'react';
import { esemeny, TELEFON_KATTINTAS } from '@/lib/meres';

/**
 * Egyetlen figyelő az egész oldalra, amely minden telefonszám-hivatkozás
 * kattintását elkapja.
 *
 * MIÉRT ÍGY: tizenkét `tel:` hivatkozás van az oldalon, és a legtöbb
 * kiszolgálóoldali komponensben. Ha mindegyikhez külön onClick kellene,
 * kilenc oldalt kellene kliensoldalivá tenni — csak azért, hogy mérjünk.
 * Így egy helyen van a logika, és a később hozzáadott számok is bekerülnek
 * magától.
 *
 * A lefogás szakaszában (capture) figyelünk, hogy akkor is lefusson, ha egy
 * közbülső elem megállítja az esemény terjedését.
 */
export default function TelefonMeres() {
  useEffect(() => {
    const kattintas = (e: MouseEvent) => {
      const cel = e.target;
      if (!(cel instanceof Element)) return;
      const link = cel.closest('a[href^="tel:"]');
      if (!link) return;
      esemeny(TELEFON_KATTINTAS, { hely: window.location.pathname });
    };

    document.addEventListener('click', kattintas, true);
    return () => document.removeEventListener('click', kattintas, true);
  }, []);

  return null;
}
