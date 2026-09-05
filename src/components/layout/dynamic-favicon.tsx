'use client';

import { useEffect } from 'react';

import { faviconFrames } from '@/components/brand/favicon-frames';

const INTERVAL_MS = 10_000;
const LINK_ID = 'fw-dynamic-favicon';
const SVG_TYPE = 'image/svg+xml';
const ICON_LINKS = "link[rel~='icon']";

/**
 * Flips the tab icon between the dark and light brand frames so the tab
 * stands out in a crowded tab strip.
 *
 * Next re-inserts the static metadata icons whenever the head re-renders,
 * and browsers prefer the last `<link rel="icon">` in the document. Rather
 * than fighting React over those nodes, every icon link is pointed at the
 * current frame and our own link is kept last; a MutationObserver re-applies
 * this whenever the head changes.
 */
export function DynamicFavicon() {
  useEffect(() => {
    const frames = faviconFrames();
    const head = document.head;
    let index = 0;

    let own = document.getElementById(LINK_ID) as HTMLLinkElement | null;
    if (!own) {
      own = document.createElement('link');
      own.id = LINK_ID;
      own.rel = 'icon';
      own.type = SVG_TYPE;
      head.appendChild(own);
    }

    // Every write below is guarded so re-applying is a no-op and the observer
    // cannot loop on its own mutations.
    const paint = () => {
      const href = frames[index];
      const links = head.querySelectorAll<HTMLLinkElement>(ICON_LINKS);
      links.forEach((link) => {
        if (link.getAttribute('href') !== href) link.setAttribute('href', href);
        if (link.getAttribute('type') !== SVG_TYPE)
          link.setAttribute('type', SVG_TYPE);
        if (link.hasAttribute('sizes')) link.removeAttribute('sizes');
      });
      if (own && links[links.length - 1] !== own) head.appendChild(own);
    };

    paint();

    const observer = new MutationObserver(paint);
    observer.observe(head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href', 'rel', 'type', 'sizes'],
    });

    const timer = window.setInterval(() => {
      index = (index + 1) % frames.length;
      paint();
    }, INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
