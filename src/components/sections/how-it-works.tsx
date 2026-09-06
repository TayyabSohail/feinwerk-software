'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/common/section-heading';
import { Reveal, Stagger } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HowItWorksProps {
  dict: Dictionary;
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Six step cards in a responsive grid. Each card fades up in turn and a
 * brand hairline draws across its top edge as it lands.
 */
export function HowItWorks({ dict, className }: HowItWorksProps) {
  const t = dict.howItWorks;
  const reduce = Boolean(useReducedMotion());

  return (
    <section
      id='how-it-works'
      className={cn('fw-section fw-rule fw-band-stone', className)}
    >
      <div className='fw-container'>
        <SectionHeading kicker={t.kicker} title={t.title} />

        <Stagger
          stagger={0.12}
          className='mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5'
        >
          {t.steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={{
                hidden: reduce ? {} : { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className='fw-card fw-grid-surface group relative flex flex-col p-6 transition-shadow duration-300 hover:shadow-glow lg:p-7'
            >
              <motion.span
                aria-hidden='true'
                variants={{
                  hidden: reduce ? {} : { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.7, ease: 'linear', delay: 0.1 },
                  },
                }}
                className='absolute inset-x-0 top-0 z-[4] h-px origin-left bg-brand'
              />
              <span
                aria-hidden='true'
                className='fw-display pointer-events-none absolute -right-1 -top-2 select-none text-[5.5rem] leading-none text-brand/10 transition-colors duration-300 group-hover:text-brand/20 lg:text-[6rem]'
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <p className='font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-text'>
                {t.stepLabel} {String(index + 1).padStart(2, '0')}
                <span className='mx-2 text-muted-foreground/50'>/</span>
                <span className='text-muted-foreground'>{step.when}</span>
              </p>
              <h3 className='fw-display mt-8 max-w-[15ch] text-2xl text-foreground lg:mt-10'>
                {step.title}
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                {step.summary}
              </p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className='mt-10 border-t pt-8 lg:mt-14'>
          <Link
            href={paths.contact}
            className='fw-btn fw-btn-ink inline-flex h-14 items-center gap-3 px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] shadow-[0_16px_30px_-22px_hsl(var(--ink))]'
          >
            {t.cta}
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
