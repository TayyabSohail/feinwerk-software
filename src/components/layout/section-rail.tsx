'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SectionRailProps {
  /** Label on the jump button, e.g. "Next". */
  next: string;
  /** Label on the jump button once the last section is reached. */
  top: string;
}

interface RailSection {
  el: HTMLElement;
  label: string;
}

/** Fraction of the viewport a section must cross before it counts as current. */
const ACTIVE_LINE = 0.38;

/**
 * Phone-only orientation strip pinned to the bottom of the viewport. Reads
 * every `section[data-rail]` on the page, shows which one is on screen and
 * the name of the one after it, and jumps there on tap. Hidden until the
 * first tagged section is reached and again once the footer takes over, and
 * never shown from `lg`, where the page is short enough to see ahead.
 */
export function SectionRail({ next, top }: SectionRailProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [sections, setSections] = useState<RailSection[]>([]);
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);

  // Collect the sections once the new route has rendered.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const found = Array.from(
        document.querySelectorAll<HTMLElement>('main [data-rail]'),
      )
        .map((el) => ({ el, label: el.dataset.rail?.trim() ?? '' }))
        .filter((section) => section.label.length > 0);
      setSections(found);
      setActive(-1);
      setVisible(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (sections.length === 0) return;
    let ticking = false;

    const measure = () => {
      ticking = false;
      const line = window.innerHeight * ACTIVE_LINE;
      let current = -1;
      for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].el.getBoundingClientRect().top <= line) current = i;
      }
      const last = sections[sections.length - 1].el.getBoundingClientRect();
      setActive(current);
      setVisible(current >= 0 && last.bottom > line);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  const current = active >= 0 ? sections[active] : null;
  const following = active >= 0 ? sections[active + 1] : undefined;
  const total = sections.length;

  const jump = () => {
    const target = following?.el ?? 0;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
      return;
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          key='rail'
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className='fixed inset-x-0 bottom-0 z-[45] border-t border-line bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden'
        >
          <div className='fw-container flex h-12 items-center justify-between gap-3'>
            <div
              className='flex min-w-0 flex-1 items-baseline gap-2.5'
              aria-live='polite'
            >
              <span className='shrink-0 font-mono text-[10px] font-semibold tabular-nums tracking-[0.16em] text-brand-text'>
                {String(active + 1).padStart(2, '0')}/
                {String(total).padStart(2, '0')}
              </span>
              <span className='truncate font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                {current.label}
              </span>
            </div>

            <button
              type='button'
              onClick={jump}
              className='group flex h-8 max-w-[70%] shrink-0 items-center gap-2 border border-ink/20 bg-surface px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand-text'
            >
              <span className='shrink-0 text-muted-foreground'>
                {following ? next : top}
              </span>
              {following && (
                <span className='min-w-0 truncate'>{following.label}</span>
              )}
              {following ? (
                <ArrowDown className='h-3.5 w-3.5 shrink-0 text-brand-text transition-transform duration-300 group-hover:translate-y-0.5' />
              ) : (
                <ArrowUp className='h-3.5 w-3.5 shrink-0 text-brand-text transition-transform duration-300 group-hover:-translate-y-0.5' />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
