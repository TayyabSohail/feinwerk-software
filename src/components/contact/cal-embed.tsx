'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface CalEmbedProps {
  /** Cal.com handle: "username" or "username/event-slug". */
  handle: string;
  className?: string;
  /** Shown while the calendar loads, and if it never does. */
  fallbackLabel: string;
}

/**
 * Inline Cal.com booking calendar.
 *
 * Loaded as a plain iframe rather than @calcom/embed-react: the widget is one
 * element on one page, and the official package pulls a sizeable runtime plus
 * its own snippet loader for what amounts to an iframe with a theme parameter.
 *
 * The iframe is only mounted once it scrolls into view, so the contact page's
 * first paint is not held up by a third-party calendar, and visitors who never
 * scroll to it never load Cal.com at all (which also keeps the cookie promise
 * in the privacy policy honest).
 */
export function CalEmbed({ handle, className, fallbackLabel }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div
      ref={containerRef}
      className={cn('relative min-h-[36rem] w-full bg-surface', className)}
    >
      {!loaded && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <p className='font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground'>
            {fallbackLabel}
          </p>
        </div>
      )}

      {visible && (
        <iframe
          src={`https://cal.com/${handle}?embed=true&theme=auto`}
          title={fallbackLabel}
          loading='lazy'
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-[36rem] w-full border-0 transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
}
