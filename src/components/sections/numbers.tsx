import { SectionHeading } from '@/components/common/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import type { Dictionary } from '@/i18n/dictionaries/en';

interface NumbersProps {
  dict: Dictionary;
}

/** Eight figures in an ink panel with hairline cells. Static, no counting. */
export function Numbers({ dict }: NumbersProps) {
  const t = dict.numbers;

  return (
    <section className='fw-section fw-rule fw-band-stone'>
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
        />

        <Stagger
          stagger={0.05}
          className='fw-card fw-card-ink mt-14 grid sm:grid-cols-2 lg:grid-cols-4'
        >
          {t.items.map((item, index) => (
            <StaggerItem
              key={item.label}
              className={cn(
                'relative border-white/10 p-8 sm:p-9',
                index % 2 === 1 && 'sm:border-l',
                index % 4 !== 0 && 'lg:border-l',
                index >= 2 && 'sm:border-t',
                index < 4 && 'lg:border-t-0',
                index >= 4 && 'lg:border-t',
              )}
            >
              <p className='fw-display text-5xl text-white sm:text-6xl'>
                {item.value}
              </p>
              <p className='mt-3 max-w-[18ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55'>
                {item.label}
              </p>
              <span
                aria-hidden='true'
                className='absolute right-6 top-6 font-mono text-[10px] text-brand'
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
