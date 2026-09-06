'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS = 'FEINWERKS'.split('');
const HINGE_LETTER_INDEX = LETTERS.length - 1;
const DURATION_MS = 2300;
const REDUCED_DURATION_MS = 600;
const HOLD_MS = 250;

/* The blocky progress bar: filled cells, then empty ones. */
const BAR_CELLS = 24;

/**
 * First-load intro: a black curtain with the wordmark hinging in letter by
 * letter above a blocky retro loader that fills cell by cell as a counter
 * runs to 100, then the curtain lifts.
 *
 * The curtain is part of the server-rendered HTML, so the screen is dark from
 * the very first paint instead of flashing the page before the intro appears.
 * It runs on every full page load; client-side route changes never remount
 * the root layout, so navigating within the site does not replay it. Users
 * who prefer reduced motion get a shorter, fade-only version.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setReduceMotion(reduce);
    document.documentElement.classList.add('lenis-stopped');

    const duration = reduce ? REDUCED_DURATION_MS : DURATION_MS;
    const start = performance.now();
    let frame = 0;
    let timer = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      timer = window.setTimeout(() => {
        setVisible(false);
        document.documentElement.classList.remove('lenis-stopped');
      }, HOLD_MS);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, []);

  const filled = Math.min(
    BAR_CELLS,
    Math.max(0, Math.round((progress / 100) * BAR_CELLS)),
  );

  return (
    <AnimatePresence
      onExitComplete={() => {
        window.dispatchEvent(new Event('feinwerks:preloader-complete'));
      }}
    >
      {visible && (
        <motion.div
          key='preloader'
          initial={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={{
            duration: reduceMotion ? 0.3 : 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-white'
          aria-hidden='true'
          data-preloader
        >
          <div className='flex overflow-visible font-display text-[clamp(2.5rem,9vw,7rem)] font-bold tracking-[0.08em]'>
            {LETTERS.map((letter, index) => {
              const hangs = !reduceMotion && index === HINGE_LETTER_INDEX;

              return (
                <motion.span
                  key={index}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { y: '110%', opacity: 0, rotate: 0 }
                  }
                  animate={
                    hangs
                      ? {
                          y: ['110%', 0, 0, 0, 0],
                          rotate: [0, 0, 0, -72, 0],
                          opacity: [0, 1, 1, 1, 1],
                        }
                      : { y: 0, opacity: 1 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : hangs ? 1.45 : 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                    ...(hangs && { times: [0, 0.25, 0.5, 0.78, 1] }),
                  }}
                  className={
                    hangs
                      ? 'inline-block origin-top'
                      : 'inline-block'
                  }
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {/* Blocky cell bar: filled blocks in brand, empty cells dimmed. */}
          <div className='mt-8 flex w-[min(28rem,84vw)] items-center gap-3 font-mono text-[11px] tracking-[0.12em] sm:gap-4'>
            <span className='text-white/35'>[</span>
            <span className='flex-1 overflow-hidden whitespace-nowrap text-center text-brand'>
              {'█'.repeat(filled)}
              <span className='text-white/15'>
                {'░'.repeat(BAR_CELLS - filled)}
              </span>
            </span>
            <span className='text-white/35'>]</span>
            <span className='w-12 text-right tabular-nums text-white'>
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
