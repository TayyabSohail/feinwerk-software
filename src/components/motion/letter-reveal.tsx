'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface LetterRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** Words (0-based) rendered in the accent colour. */
  accentWords?: number[];
  once?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Per-letter rise, the Silverthread-style hero animation. Words stay intact
 * for wrapping; letters inside each word animate in sequence.
 */
export function LetterReveal({
  text,
  className,
  as = 'h1',
  delay = 0,
  stagger = 0.022,
  accentWords = [],
  once = true,
}: LetterRevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const words = text.split(' ');
  let index = 0;

  return (
    <Component
      key={text}
      aria-label={text}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      className={cn('flex flex-wrap justify-center', className)}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden='true'
          className={cn(
            'mr-[0.28em] inline-flex overflow-hidden pb-[0.06em] last:mr-0',
            accentWords.includes(wordIndex) && 'text-brand-text',
          )}
        >
          {word.split('').map((letter, letterIndex) => {
            const i = index++;
            return (
              <motion.span
                key={`${letter}-${letterIndex}`}
                variants={{
                  hidden: reduce ? {} : { y: '110%', opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease,
                      delay: delay + i * stagger,
                    },
                  },
                }}
                className='inline-block'
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
