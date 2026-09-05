'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in pixels across the element's scroll range. */
  distance?: number;
  /** Positive values move with the scroll; negative move against it. */
  direction?: 1 | -1;
  /** Optional scale-in on entry. */
  scaleFrom?: number;
}

/** Scroll-linked vertical drift. Works with the Lenis smooth scroller. */
export function Parallax({
  children,
  className,
  distance = 80,
  direction = -1,
  scaleFrom,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * direction * -1, distance * direction],
  );
  const y = useSpring(rawY, { stiffness: 90, damping: 26, mass: 0.6 });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleFrom ?? 1, 1, scaleFrom ?? 1],
  );

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y, scale }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
