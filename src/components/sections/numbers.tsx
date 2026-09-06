import { SectionHeading } from '@/components/common/section-heading';
import { CountUp } from '@/components/motion/count-up';

import { cn } from '@/lib/utils';

import type { Dictionary } from '@/i18n/dictionaries/en';

interface NumbersProps {
  dict: Dictionary;
}

/** Three company figures in one ink panel. Each counts up fast on entering view. */
export function Numbers({ dict }: NumbersProps) {
  const t = dict.numbers;

  return (
    <section className='fw-section fw-rule fw-band-stone' data-rail={t.kicker}>
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
        />

        <div className='fw-card fw-card-ink mt-8 sm:mt-14'>
          <div className='grid grid-cols-3'>
            {t.items.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  'relative border-white/10 px-2 py-6 text-center sm:p-10 lg:p-12',
                  i > 0 && 'border-l',
                )}
              >
                <p className='fw-display text-3xl tabular-nums text-white min-[400px]:text-4xl sm:text-7xl lg:text-8xl'>
                  <CountUp value={item.value} delay={i * 0.08} />
                </p>
                <p className='mx-auto mt-3 max-w-[14ch] font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-white/55 sm:mt-5 sm:max-w-[20ch] sm:text-[11px] sm:tracking-[0.18em]'>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
