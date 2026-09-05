'use client';

import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Inertial smooth scrolling, the foundation the parallax and stacking
 * effects sit on. Disabled automatically for users who prefer reduced
 * motion, and reset on route change so a new page starts at the top,
 * unless the URL names a section (/#pricing), which wins.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    // Lenis still holds the previous page's dimensions at this point, so a
    // jump would be clamped to the old scroll limit. It subtracts the
    // scroll-padding from globals.css itself when given an element.
    lenis.resize();
    if (target) lenis.scrollTo(target, { immediate: true, force: true });
    else lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (media.matches) lenis.stop();
      else lenis.start();
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
