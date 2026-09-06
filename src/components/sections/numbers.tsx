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
    <section className='fw-section fw-rule fw-band-stone'>
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
        />

        <div className='fw-card fw-card-ink mt-14'>
          <div className='grid sm:grid-cols-3'>
            {t.items.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  'relative border-white/10 p-8 text-center sm:p-10 lg:p-12',
                  i > 0 && 'border-t sm:border-l sm:border-t-0',
                )}
              >
                <p className='fw-display text-6xl tabular-nums text-white sm:text-7xl lg:text-8xl'>
                  <CountUp value={item.value} delay={i * 0.08} />
                </p>
                <p className='mx-auto mt-5 max-w-[20ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55'>
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
