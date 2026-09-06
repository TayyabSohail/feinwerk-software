'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface LetterRevealProps {
  /** A newline forces a line break; words are indexed across the whole text. */
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** Words (0-based) rendered in the accent colour. */
  accentWords?: number[];
  /** Number of trailing letters that swing down and return after revealing. */
  hingeTail?: number;
  /** Wait for the first-load preloader to finish before beginning. */
  afterPreloader?: boolean;
  /** Zero-based lines whose letters should use the standard reveal. */
  animatedLines?: number[];
  /** Quick type-like bounce for every character. */
  typingBounce?: boolean;
  once?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Per-letter rise reveal for the hero. A small optional tail can swing up
 * from a dropped, top-hinged position on the first reveal.
 */
export function LetterReveal({
  text,
  className,
  as = 'h1',
  delay = 0,
  stagger = 0.022,
  accentWords = [],
  hingeTail = 0,
  afterPreloader = false,
  animatedLines,
  typingBounce = false,
  once = true,
}: LetterRevealProps) {
  const reduce = useReducedMotion();
  const [preloaderFinished, setPreloaderFinished] = useState(!afterPreloader);
  const Component = motion[as];
  const lines = text.split('\n');
  const totalLetters = text.replace(/[\s\n]/g, '').length;
  let index = 0;
  let wordIndex = 0;

  useEffect(() => {
    if (!afterPreloader) return;
    if (!document.querySelector('[data-preloader]')) {
      setPreloaderFinished(true);
      return;
    }

    const reveal = () => setPreloaderFinished(true);
    window.addEventListener('feinwerks:preloader-complete', reveal, {
      once: true,
    });
    return () => window.removeEventListener('feinwerks:preloader-complete', reveal);
  }, [afterPreloader]);

  return (
    <Component
      key={text}
      aria-label={text.replace(/\n/g, ' ')}
      initial='hidden'
      animate={afterPreloader ? (preloaderFinished ? 'visible' : 'hidden') : undefined}
      whileInView={afterPreloader ? undefined : 'visible'}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      className={cn('flex flex-wrap justify-center', className)}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={`${line}-${lineIndex}`}>
          {lineIndex > 0 && (
            <span aria-hidden='true' className='h-0 basis-full' />
          )}
          {line.split(' ').map((word, wordInLine) => {
            const w = wordIndex++;
            const wordHasHinge =
              hingeTail > 0 && index + word.length > totalLetters - hingeTail;
            const lineAnimates = animatedLines?.includes(lineIndex) ?? true;
            return (
              <span
                key={`${word}-${wordInLine}`}
                aria-hidden='true'
                className={cn(
                  'mr-[0.28em] inline-flex pb-[0.06em] last:mr-0',
                  wordHasHinge || typingBounce
                    ? 'overflow-visible'
                    : 'overflow-hidden',
                  accentWords.includes(w) && 'text-brand-text',
                )}
                style={{ perspective: '800px' }}
              >
                {word.split('').map((letter, letterIndex) => {
                  const i = index++;
                  const hangs =
                    !reduce && hingeTail > 0 && i >= totalLetters - hingeTail;
                  const reveals = lineAnimates || hangs;
                  return (
                    <motion.span
                      key={`${letter}-${letterIndex}`}
                      variants={{
                        hidden: !reveals || reduce
                          ? { opacity: 0 }
                          : { y: '110%', opacity: 0, rotate: 0 },
                        visible: hangs
                          ? {
                              y: ['110%', 0, 0, 0, 0],
                              rotate: [0, 0, 0, -72, 0],
                              opacity: [0, 1, 1, 1, 1],
                              transition: {
                                duration: 1.3,
                                ease,
                                delay: 0.2,
                                times: [0, 0.3, 0.5, 0.78, 1],
                              },
                            }
                          : !reveals
                            ? { opacity: 1 }
                          : typingBounce
                            ? {
                                y: [12, -3, 0],
                                opacity: [0, 1, 1],
                                transition: {
                                  duration: 0.32,
                                  ease,
                                  delay: delay + i * stagger,
                                  times: [0, 0.65, 1],
                                },
                              }
                          : {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 0.8,
                                ease,
                                delay: delay + i * stagger,
                              },
                            },
                      }}
                      className={cn(
                        'inline-block',
                        hangs ? 'origin-top' : 'origin-bottom',
                      )}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </Fragment>
      ))}
    </Component>
  );
}
