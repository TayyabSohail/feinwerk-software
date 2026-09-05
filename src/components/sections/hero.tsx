import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BuildGrid } from '@/components/effects/build-grid';
import { Silk } from '@/components/effects/silk';
import { LetterReveal } from '@/components/motion/letter-reveal';
import { Reveal } from '@/components/motion/reveal';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HeroProps {
  dict: Dictionary;
}

/**
 * Full-viewport opening over the silk shader. The headline runs the full
 * width in three lines; beneath it the body and CTAs sit bottom-left while
 * the modules every build ships with assemble into a grid bottom-right.
 */
export function Hero({ dict }: HeroProps) {
  const t = dict.hero;

  return (
    <section className='relative overflow-hidden border-b'>
      <Silk />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background'
      />

      <div className='fw-container relative flex min-h-[min(100svh,64rem)] flex-col pt-28 lg:pt-36'>
        <div className='relative z-10'>
          <Reveal>
            <p className='inline-flex items-center gap-3 border border-ink/20 bg-white/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink backdrop-blur'>
              <span className='h-1.5 w-1.5 bg-brand' />
              {t.badge}
            </p>
          </Reveal>

          <LetterReveal
            as='h1'
            text={t.title}
            accentWords={[...t.accent]}
            delay={0.2}
            className='fw-display mt-8 max-w-[26ch] justify-start text-display-xl uppercase text-ink'
          />
        </div>

        <BuildGrid
          labels={t.stack.blocks}
          kicker={t.stack.kicker}
          delay={1.1}
          className='mt-10 flex-1'
        >
          <Reveal delay={0.8}>
            <p className='max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl'>
              {t.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.95}
            className='mt-8 flex flex-wrap items-center gap-3'
          >
            <Link
              href={paths.contact}
              className='fw-btn fw-btn-ink inline-flex h-14 items-center gap-3 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
            >
              {t.primary}
              <span className='h-2.5 w-2.5 bg-brand' />
            </Link>
            <Link
              href={paths.work}
              className='fw-btn fw-btn-secondary inline-flex h-14 items-center gap-3 bg-white/60 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
            >
              {t.secondary}
              <ArrowRight className='h-4 w-4' />
            </Link>
          </Reveal>
        </BuildGrid>
      </div>
    </section>
  );
}
