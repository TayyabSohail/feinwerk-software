import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Silk } from '@/components/effects/silk';
import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';
import { HeroDevices } from '@/components/sections/hero-devices';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HeroProps {
  dict: Dictionary;
}

/** Two columns over the silk: the offer on the left, every product on devices on the right. */
export function Hero({ dict }: HeroProps) {
  const t = dict.hero;

  return (
    <section className='relative overflow-hidden border-b'>
      <Silk />
      <div className='absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background' />

      <div className='fw-container relative grid min-h-[92vh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-16 lg:pt-24'>
        <div className='relative z-10 min-w-0'>
          <Reveal>
            <p className='inline-flex items-center gap-3 border border-ink/20 bg-white/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink backdrop-blur'>
              {t.badge}
            </p>
          </Reveal>

          <TextReveal
            as='h1'
            text={t.title}
            accentWords={[...t.accent]}
            delay={0.15}
            stagger={0.07}
            className={cn(
              'fw-display mt-7 max-w-[15ch] uppercase text-ink',
              dict.locale === 'de' ? 'text-display-lg' : 'text-display-xl',
            )}
          />

          <Reveal delay={0.7}>
            <p className='mt-7 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl'>
              {t.body}
            </p>
          </Reveal>

          <Reveal
            delay={0.85}
            className='mt-9 flex flex-wrap items-center gap-3'
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

          <Reveal
            delay={1}
            className='mt-9 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55'
          >
            {t.proof.map((item) => (
              <span key={item} className='inline-flex items-center gap-2'>
                <span className='h-1.5 w-1.5 bg-brand' />
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        <div className='relative min-w-0'>
          <HeroDevices liveLabel={t.live} privateLabel={t.privateLabel} />
        </div>
      </div>
    </section>
  );
}
