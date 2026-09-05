'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

interface ScrollHighlightProps {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3';
  /** Words (0-based) rendered in the accent colour once highlighted. */
  accentWords?: number[];
  /** Colour of a word before the scroll reaches it. */
  dimClassName?: string;
}

/**
 * Words start dim and fill with ink as they pass through the viewport, tied
 * directly to scroll position so scrolling back un-highlights them again.
 */
export function ScrollHighlight({
  text,
  className,
  as = 'p',
  accentWords = [],
  dimClassName,
}: ScrollHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 88%', 'end 45%'],
  });
  const words = text.split(' ');
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      aria-label={text}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          progress={scrollYProgress}
          start={index / words.length}
          end={(index + 1) / words.length}
          accent={accentWords.includes(index)}
          reduce={Boolean(reduce)}
          dimClassName={dimClassName}
        />
      ))}
    </Component>
  );
}

function Word({
  word,
  progress,
  start,
  end,
  accent,
  reduce,
  dimClassName,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  accent: boolean;
  reduce: boolean;
  dimClassName?: string;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span aria-hidden='true' className='relative mr-[0.26em] inline-block'>
      <span
        className={cn(
          'absolute inset-0 select-none',
          dimClassName ?? 'opacity-20',
        )}
      >
        {word}
      </span>
      <motion.span
        style={reduce ? undefined : { opacity }}
        className={cn('relative inline-block', accent && 'fw-accent')}
      >
        {word}
      </motion.span>
    </span>
  );
}
