'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface CalEmbedProps {
  /** Cal.com handle: "username" or "username/event-slug". */
  handle: string;
  className?: string;
  /** Shown while the calendar loads, and if it never does. */
  fallbackLabel: string;
  /** Opened in a new tab if the embed cannot load. */
  bookingUrl: string;
  /** Label for that fallback link. */
  bookingLabel: string;
}

/** Cal.com's embed loader snippet, minus the queue plumbing we do not use. */
type CalGlobal = ((...args: unknown[]) => void) & {
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
  loaded?: boolean;
};

const EMBED_SCRIPT = 'https://app.cal.com/embed/embed.js';

/** Loads embed.js once per page and resolves with the `Cal` global. */
function loadCal(): Promise<CalGlobal> {
  const w = window as unknown as { Cal?: CalGlobal };

  if (w.Cal?.loaded) return Promise.resolve(w.Cal);

  return new Promise((resolve, reject) => {
    // Cal's snippet: queue calls until embed.js swaps in the real implementation.
    if (!w.Cal) {
      const api: CalGlobal = function (...args: unknown[]) {
        (api.q ??= []).push(args);
      } as CalGlobal;
      api.q = [];
      w.Cal = api;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`,
    );
    const script = existing ?? document.createElement('script');

    script.addEventListener('load', () => resolve(w.Cal as CalGlobal));
    script.addEventListener('error', () =>
      reject(new Error('Cal.com embed failed to load')),
    );

    if (!existing) {
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

/**
 * Inline Cal.com booking calendar.
 *
 * Uses Cal's own embed.js rather than framing https://cal.com/<handle>
 * directly: the public booking page sits behind Cloudflare, which answers
 * bot-challenged requests with `X-Frame-Options: SAMEORIGIN` and leaves a
 * blank iframe. The embed endpoint is built to be framed and is not
 * challenged, so it is the only reliable way to inline the calendar.
 *
 * The calendar is only initialised once it scrolls into view, so the contact
 * page's first paint is not held up by a third-party calendar, and visitors
 * who never scroll to it never load Cal.com at all (which also keeps the
 * cookie promise in the privacy policy honest).
 */
export function CalEmbed({
  handle,
  className,
  fallbackLabel,
  bookingUrl,
  bookingLabel,
}: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // No IntersectionObserver (old browsers, some test runners): just load.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    const node = containerRef.current;
    if (!node) return;

    loadCal()
      .then((cal) => {
        if (cancelled) return;

        cal('init', { origin: 'https://app.cal.com' });
        cal('inline', {
          elementOrSelector: node,
          calLink: handle,
          config: { theme: 'auto', layout: 'month_view' },
        });
        // The iframe paints a moment after `inline` returns; revealing on the
        // next frame avoids a flash of the unstyled Cal skeleton.
        requestAnimationFrame(() => {
          if (!cancelled) setLoaded(true);
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [visible, handle]);

  return (
    <div className={cn('relative min-h-[36rem] w-full bg-surface', className)}>
      {!loaded && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center'>
          <p className='font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground'>
            {fallbackLabel}
          </p>
          {failed && (
            <a
              href={bookingUrl}
              target='_blank'
              rel='noreferrer'
              className='font-mono text-[11px] uppercase tracking-[0.18em] text-foreground underline underline-offset-4'
            >
              {bookingLabel}
            </a>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        // Cal sizes its own iframe to the container; the height keeps the
        // month view from collapsing before it does.
        className={cn(
          'h-[36rem] w-full overflow-y-auto transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
