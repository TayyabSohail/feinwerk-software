'use client';

import { motion } from 'framer-motion';
import { FileSignature, PhoneCall, Rocket } from 'lucide-react';
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

const ICONS = [PhoneCall, FileSignature, Rocket];

/**
 * Three connected steps on the same light grid as the rest of the page, with
 * a line that draws itself across the three panels.
 */
export function HowItWorks({ dict, className }: HowItWorksProps) {
  const t = dict.howItWorks;

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

        <div className='relative mt-16'>
          {/* Connecting line */}
          <div
            aria-hidden='true'
            className='absolute left-0 right-0 top-9 hidden h-px bg-ink/10 lg:block'
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              className='block h-full origin-left bg-brand'
            />
          </div>

          <Stagger stagger={0.15} className='grid gap-6 lg:grid-cols-3'>
            {t.steps.map((step, index) => {
              const Icon = ICONS[index];
              return (
                <StaggerItem key={step.title} className='relative'>
                  {/* Node on the line */}
                  <span
                    aria-hidden='true'
                    className='absolute -top-[5px] left-8 z-[2] hidden h-[11px] w-[11px] border border-brand bg-surface lg:block'
                  />
                  <div className='fw-card fw-spot relative flex h-full flex-col p-8'>
                    <div className='flex items-start justify-between'>
                      <span className='fw-display text-6xl text-brand-text'>
                        0{index + 1}
                      </span>
                      <span className='flex h-11 w-11 items-center justify-center border bg-surface-2 text-ink'>
                        <Icon className='h-5 w-5' strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className='mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground'>
                      {t.stepLabel} {index + 1}.0
                    </p>
                    <h3 className='fw-display mt-2 text-2xl text-ink'>
                      {step.title}
                    </h3>
                    <p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                      {step.summary}
                    </p>
                    <ul className='mt-6 flex flex-wrap gap-1.5 border-t pt-5'>
                      {step.outputs.map((output) => (
                        <li
                          key={output}
                          className='border border-brand/40 bg-brand-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-text'
                        >
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className='mt-14 flex justify-center'>
          <Link
            href={paths.contact}
            className='fw-btn fw-btn-ink inline-flex h-14 items-center gap-3 px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.24em]'
          >
            {t.cta}
            <span className='h-2.5 w-2.5 bg-brand' />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
