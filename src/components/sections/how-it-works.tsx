import Link from 'next/link';

import { SectionHeading } from '@/components/common/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HowItWorksProps {
  dict: Dictionary;
  className?: string;
}

/**
 * Three moments on the calendar, side by side on the same hairline grid as
 * the rest of the page: when it happens in big type, what happens, and what
 * you hold at the end of it. No cards, no numbering, about one screen tall.
 */
export function HowItWorks({ dict, className }: HowItWorksProps) {
  const t = dict.howItWorks;
  const last = t.steps.length - 1;

  return (
    <section
      id='how-it-works'
      className={cn('fw-section fw-rule fw-band-stone', className)}
    >
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
        />

        <Stagger
          stagger={0.15}
          className='mt-14 grid border-t lg:mt-16 lg:grid-cols-3'
        >
          {t.steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className={cn(
                'flex flex-col py-8 lg:py-10',
                index > 0 && 'border-t lg:border-l lg:border-t-0 lg:pl-10',
                index < last && 'lg:pr-10',
              )}
            >
              <p className='fw-display text-4xl text-ink lg:text-5xl'>
                {step.when}
              </p>
              <h3 className='fw-display mt-5 text-2xl text-ink'>
                {step.title}
              </h3>
              <p className='mb-8 mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base'>
                {step.summary}
              </p>

              <ul className='mt-auto space-y-2.5 border-t pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink'>
                {step.outputs.map((output) => (
                  <li key={output} className='flex items-center gap-3'>
                    <span
                      aria-hidden='true'
                      className='h-1.5 w-1.5 shrink-0 bg-brand'
                    />
                    {output}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className='flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between'>
          <Link
            href={paths.contact}
            className='fw-btn fw-btn-ink inline-flex h-14 items-center gap-3 self-start px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.24em]'
          >
            {t.cta}
            <span className='h-2.5 w-2.5 bg-brand' />
          </Link>
          <p className='max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ink/50 sm:text-right'>
            {t.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
