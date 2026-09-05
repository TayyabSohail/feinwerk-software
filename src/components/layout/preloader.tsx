'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS = 'FEINWERK'.split('');
const DURATION_MS = 1500;
const REDUCED_DURATION_MS = 600;
const HOLD_MS = 250;

/**
 * First-load intro: a black curtain with the wordmark assembling letter by
 * letter while a counter runs to 100, then the curtain lifts.
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

  return (
    <AnimatePresence>
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
        >
          <div className='flex overflow-hidden font-display text-[clamp(2.5rem,9vw,7rem)] font-bold tracking-[0.08em]'>
            {LETTERS.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                }}
                className='inline-block'
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className='mt-8 flex w-[min(28rem,80vw)] items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60'>
            <span>Software</span>
            <span className='relative h-px flex-1 bg-white/15'>
              <span
                className='absolute inset-y-0 left-0 bg-brand'
                style={{ width: `${progress}%` }}
              />
            </span>
            <span className='w-10 text-right tabular-nums text-white'>
              {progress}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
