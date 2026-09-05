import { Flag } from '@/components/brand/flags';
import { Globe } from '@/components/effects/globe';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { siteConfig } from '@/config/site';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface GlobalReachProps {
  dict: Dictionary;
}

/** Copy on the left, the dotted globe on the right, offices underneath. */
export function GlobalReach({ dict }: GlobalReachProps) {
  const t = dict.globalReach;

  return (
    <section className='fw-section fw-rule fw-band-white overflow-hidden'>
      <div className='fw-container grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]'>
        <div>
          <Reveal>
            <p className='fw-kicker'>{t.kicker}</p>
          </Reveal>
          <TextReveal
            as='h2'
            text={t.title}
            className='fw-display mt-5 max-w-[16ch] text-display-md text-ink'
          />
          <Reveal delay={0.2}>
            <p className='mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {t.description}
            </p>
          </Reveal>
          <Stagger className='mt-8 space-y-3'>
            {t.bullets.map((bullet) => (
              <StaggerItem
                key={bullet}
                className='border-l-2 border-brand pl-4 text-sm font-medium text-ink/85'
              >
                {bullet}
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className='mt-10 grid gap-px border bg-ink/10 sm:grid-cols-2'>
            {siteConfig.locations.map((location) => (
              <StaggerItem key={location.id} className='bg-background p-5'>
                <p className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
                  <Flag
                    countryCode={location.countryCode}
                    className='h-3 w-[18px]'
                  />
                  {location.label}
                </p>
                <p className='fw-display mt-3 text-xl text-ink'>
                  {location.city}, {location.country}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className='relative mx-auto w-full max-w-[560px]'>
          <div
            aria-hidden='true'
            className='absolute inset-[10%] rounded-full bg-brand/10 blur-[80px]'
          />
          <Globe />
          <p className='mt-2 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground'>
            {t.legend}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
