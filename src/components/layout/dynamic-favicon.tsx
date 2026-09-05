'use client';

import { useEffect } from 'react';

import { faviconFrames } from '@/components/brand/favicon-frames';

const INTERVAL_MS = 5000;
const LINK_ID = 'fw-dynamic-favicon';

/**
 * Cycles the tab icon through the brand frames every five seconds. The
 * static icon from metadata is removed once this takes over so browsers do
 * not fall back to it.
 */
export function DynamicFavicon() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const frames = faviconFrames();

    document
      .querySelectorAll<HTMLLinkElement>("link[rel~='icon']")
      .forEach((link) => {
        if (link.id !== LINK_ID) link.remove();
      });

    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = LINK_ID;
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }

    let index = 0;
    link.href = frames[index];

    const timer = window.setInterval(() => {
      index = (index + 1) % frames.length;
      if (link) link.href = frames[index];
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
