'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface BuildGridProps {
  /** Module labels in placement order; the last one is the emerald "shipped" tile. */
  labels: readonly string[];
  kicker: string;
  /** Seconds before the first tile is placed when no preloader is running. */
  delay?: number;
  className?: string;
  /** Content placed to the left of the grid on large screens. */
  children: React.ReactNode;
}

type Tone = 'ink' | 'paper' | 'brand';

/** A few ink tiles give the grid rhythm; everything else is paper. */
const INK_AT = new Set([0, 4, 9]);

/** Milliseconds between tiles while the grid assembles. */
const PLACE_MS = 150;
/** Milliseconds between steps of the selection square once assembled. */
const WALK_MS = 2400;
const COLS_WIDE = 3;
const COLS_NARROW = 2;

const ease = [0.16, 1, 0.3, 1] as const;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Resolves once the first-load preloader has lifted its curtain (it keeps
 * `lenis-stopped` on the root element while it runs), or immediately when
 * no preloader is active.
 */
function waitForCurtain(): Promise<void> {
  const root = document.documentElement;
  if (!root.classList.contains('lenis-stopped')) return Promise.resolve();
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (root.classList.contains('lenis-stopped')) return;
      observer.disconnect();
      resolve();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  });
}

/** Three columns from the `sm` breakpoint up, two below it. */
function useColumns(): number {
  const [cols, setCols] = useState(COLS_WIDE);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)');
    const apply = () => setCols(query.matches ? COLS_WIDE : COLS_NARROW);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);
  return cols;
}

/**
 * Everything that ships with a build, placed into a hairline grid one tile
 * at a time: an emerald selection square steps to each slot and the tile
 * fills in behind it. Once assembled, the square keeps walking the grid at
 * a slow pace. Reduced motion shows the finished grid with no square.
 */
export function BuildGrid({
  labels,
  kicker,
  delay = 1,
  className,
  children,
}: BuildGridProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(rootRef, { margin: '200px' });
  const cols = useColumns();
  const count = labels.length;

  const [placed, setPlaced] = useState(0);
  const [cursor, setCursor] = useState(-1);
  const [box, setBox] = useState<Box | null>(null);

  const isStatic = reduce === true;
  const assembled = placed >= count;

  // Assembly: one tile every PLACE_MS after the preloader lifts.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: number[] = [];
    (async () => {
      await waitForCurtain();
      if (cancelled) return;
      const first = delay * 1000;
      for (let i = 0; i < count; i++) {
        timers.push(
          window.setTimeout(
            () => {
              setCursor(i);
              setPlaced(i + 1);
            },
            first + i * PLACE_MS,
          ),
        );
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduce, delay, count]);

  // Idle: the square walks the grid while the hero is on screen.
  useEffect(() => {
    if (reduce || !assembled || !inView) return;
    const id = window.setInterval(
      () => setCursor((c) => (c + 1) % count),
      WALK_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, assembled, inView, count]);

  // Measure the active cell so the square can move as a real box (width and
  // height animate as CSS values, so its outline never stretches).
  useEffect(() => {
    const cell = cellRefs.current[cursor];
    if (!cell) {
      setBox(null);
      return;
    }
    const measure = () =>
      setBox({
        x: cell.offsetLeft,
        y: cell.offsetTop,
        w: cell.offsetWidth,
        h: cell.offsetHeight,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cell);
    if (cell.parentElement) observer.observe(cell.parentElement);
    return () => observer.disconnect();
  }, [cursor, cols]);

  return (
    <div ref={rootRef} className={cn('relative flex flex-col', className)}>
      <div className='grid flex-1 gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-x-16 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'>
        <div className='relative z-10 flex flex-col justify-end pb-12 lg:pb-16'>
          {children}
        </div>

        <div
          className='relative z-10 flex flex-col justify-end pb-12 lg:pb-16'
          role='img'
          aria-label={`${kicker}: ${labels.join(', ')}`}
        >
          <p
            aria-hidden='true'
            className='fw-kicker mb-4 text-[10px] text-ink/60'
          >
            {kicker}
          </p>

          <div
            className='relative grid gap-1.5'
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {labels.map((label, i) => {
              const last = i === count - 1;
              const tone: Tone = last
                ? 'brand'
                : INK_AT.has(i)
                  ? 'ink'
                  : 'paper';
              const span = last ? cols - ((count - 1) % cols) : 1;
              const visible = isStatic || i < placed;
              return (
                <div
                  key={`${label}-${i}`}
                  ref={(node) => {
                    cellRefs.current[i] = node;
                  }}
                  aria-hidden='true'
                  className='relative h-12'
                  style={{ gridColumn: `span ${span}` }}
                >
                  <div className='fw-tile-slot' />
                  <motion.div
                    initial={false}
                    animate={
                      visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
                    }
                    transition={{
                      duration: 0.5,
                      ease,
                      delay: visible ? 0.12 : 0,
                    }}
                    className={cn('fw-tile', `fw-tile-${tone}`)}
                  >
                    <span className='min-w-0 truncate'>{label}</span>
                    {last && <Check className='h-3.5 w-3.5' strokeWidth={3} />}
                  </motion.div>
                </div>
              );
            })}

            {box && !isStatic && (
              <motion.div
                aria-hidden='true'
                initial={false}
                animate={{ x: box.x, y: box.y, width: box.w, height: box.h }}
                transition={{ duration: 0.34, ease }}
                data-tone={cursor === count - 1 ? 'brand' : 'default'}
                className='fw-tile-cursor'
              >
                <span />
                <span />
                <span />
                <span />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
