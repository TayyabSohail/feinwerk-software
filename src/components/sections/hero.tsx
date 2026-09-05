import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Contours } from '@/components/effects/contours';
import { SystemMap } from '@/components/effects/system-map';
import { LetterReveal } from '@/components/motion/letter-reveal';
import { Reveal } from '@/components/motion/reveal';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HeroProps {
  dict: Dictionary;
}

/**
 * Opening section over a drifting contour-map texture. The headline runs
 * the full width in two lines; beneath it the body and CTAs sit on the left
 * and, on the right, the systems we build run as a living map: labelled
 * tiles on a plate with requests and answers riding the wires between them.
 */
export function Hero({ dict }: HeroProps) {
  const t = dict.hero;

  return (
    <section className='relative overflow-hidden border-b'>
      <Contours />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background'
      />

      <div className='fw-container relative pb-14 pt-32 lg:pb-16 lg:pt-32'>
        <Reveal>
          <p className='inline-flex items-center gap-3 border border-ink/15 bg-white/85 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink backdrop-blur-sm'>
            <span className='h-1.5 w-1.5 bg-brand' />
            {t.badge}
          </p>
        </Reveal>

        <LetterReveal
          as='h1'
          text={t.title}
          accentWords={[...t.accent]}
          delay={0.2}
          className='fw-display mt-7 justify-start text-[clamp(2.75rem,6.4vw,6rem)] leading-[0.98] tracking-[-0.035em] text-ink'
        />

        <div className='mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12'>
          <div className='min-w-0'>
            <Reveal delay={0.7}>
              <p className='max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl'>
                {t.body}
              </p>
            </Reveal>
            <Reveal
              delay={0.85}
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
                className='fw-btn fw-btn-secondary inline-flex h-14 items-center gap-3 bg-white/85 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
              >
                {t.secondary}
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Reveal>
          </div>

          <Reveal
            delay={0.9}
            distance={16}
            className='w-full min-w-0 justify-self-center lg:-mt-6 lg:justify-self-end'
          >
            <SystemMap copy={t.map} delay={0.5} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
