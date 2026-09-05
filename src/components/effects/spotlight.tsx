'use client';

import { useEffect } from 'react';

/**
 * One delegated pointer listener for every `.fw-spot` card on the page:
 * writes the pointer position into CSS variables so the card's spotlight
 * follows the cursor. Also drives the page-level cursor glow.
 */
export function SpotlightEffect() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'fw-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let frame = 0;
    let x = 0;
    let y = 0;
    let target: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      glow.style.setProperty('--cx', `${x}px`);
      glow.style.setProperty('--cy', `${y}px`);
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${x - rect.left}px`);
        target.style.setProperty('--my', `${y - rect.top}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      target =
        (event.target as HTMLElement | null)?.closest?.('.fw-spot') ?? null;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      glow.remove();
    };
  }, []);

  return null;
}
