'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface CountUpProps {
  /** Display value such as "150+", "40+", "6 wks" or "1,200". */
  value: string;
  className?: string;
  /** Seconds for the full count. */
  duration?: number;
  /** Seconds before the count starts once in view. */
  delay?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Splits "150+" into prefix "", number 150, suffix "+" and its formatting. */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, raw, suffix] = match;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  const grouped = raw.includes(',');
  const target = Number(raw.replace(/,/g, ''));

  if (Number.isNaN(target)) return null;

  const format = (n: number) =>
    grouped
      ? n.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : n.toFixed(decimals);

  return { prefix, suffix, target, format };
}

/**
 * Counts a figure up from zero the first time it scrolls into view. Renders
 * the final value on the server and for reduced motion, so the number is
 * always present without JavaScript.
 */
export function CountUp({
  value,
  className,
  duration = 1,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const parsed = parseValue(value);
  const target = parsed?.target ?? 0;

  const count = useMotionValue(target);
  const text = useTransform(count, (n) =>
    parsed ? parsed.format(Math.round(n * 100) / 100) : value,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!parsed || reduce) return;
    // Start from zero once hydrated so the server-rendered figure is intact.
    if (!inView) {
      count.set(0);
      return;
    }
    const controls = animate(count, target, { duration, delay, ease });
    return () => controls.stop();
  }, [inView, reduce, target, duration, delay]);

  if (!parsed || reduce || !mounted) {
    return (
      <span ref={ref} className={cn('tabular-nums', className)}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span className='sr-only'>{value}</span>
      <span aria-hidden='true'>
        {parsed.prefix}
        <motion.span>{text}</motion.span>
        {parsed.suffix}
      </span>
    </span>
  );
}
