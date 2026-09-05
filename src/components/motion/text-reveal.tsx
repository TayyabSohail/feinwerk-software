'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Element rendered around the words. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  /** Words (0-based) to render in the serif italic accent. */
  accentWords?: number[];
  once?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word rise, each word clipped by its own line box so it appears to
 * slide up from beneath the baseline. Used on every major headline.
 */
export function TextReveal({
  text,
  className,
  as = 'h2',
  delay = 0,
  stagger = 0.045,
  accentWords = [],
  once = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const words = text.split(' ');

  return (
    <Component
      key={text}
      aria-label={text}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden='true'
          className='mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-bottom'
        >
          <motion.span
            variants={{
              hidden: reduce ? {} : { y: '112%', rotate: 3 },
              visible: {
                y: 0,
                rotate: 0,
                transition: { duration: 0.9, ease },
              },
            }}
            className={cn(
              'inline-block origin-bottom-left',
              accentWords.includes(index) && 'fw-accent text-brand-text',
            )}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
