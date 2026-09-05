'use client';

import { motion } from 'framer-motion';
import { FileSignature, PhoneCall, Rocket } from 'lucide-react';
import Link from 'next/link';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HowItWorksProps {
  dict: Dictionary;
  className?: string;
}

const ICONS = [PhoneCall, FileSignature, Rocket];

/** Dark band: three connected steps with a line that draws itself across. */
export function HowItWorks({ dict, className }: HowItWorksProps) {
  const t = dict.howItWorks;

  return (
    <section
      id='how-it-works'
      className={cn(
        'fw-section fw-band-ink relative overflow-hidden',
        className,
      )}
    >
      <div
        aria-hidden='true'
        className='absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand/15 blur-[140px]'
      />

      <div className='fw-container relative'>
        <div className='grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end'>
          <div>
            <Reveal>
              <p className='fw-kicker text-white/60'>{t.kicker}</p>
            </Reveal>
            <TextReveal
              as='h2'
              text={t.title}
              className='fw-display mt-5 text-display-md text-white'
            />
          </div>
          <Reveal delay={0.15}>
            <p className='max-w-md text-base leading-relaxed text-white/60 md:ml-auto md:text-right md:text-lg'>
              {t.description}
            </p>
          </Reveal>
        </div>

        <div className='relative mt-16'>
          {/* Connecting line */}
          <div
            aria-hidden='true'
            className='absolute left-0 right-0 top-9 hidden h-px bg-white/10 lg:block'
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
                  <div className='fw-spot fw-spot-ink border-white/12 relative flex h-full flex-col border bg-white/[0.04] p-8 backdrop-blur-sm'>
                    {/* Node on the line */}
                    <span
                      aria-hidden='true'
                      className='absolute -top-[5px] left-8 hidden h-[11px] w-[11px] border border-brand bg-ink lg:block'
                    />
                    <div className='flex items-start justify-between'>
                      <span className='fw-display text-6xl text-brand-2'>
                        0{index + 1}
                      </span>
                      <span className='flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white'>
                        <Icon className='h-5 w-5' strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className='mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45'>
                      {t.stepLabel} {index + 1}.0
                    </p>
                    <h3 className='fw-display mt-2 text-2xl text-white'>
                      {step.title}
                    </h3>
                    <p className='mt-3 text-sm leading-relaxed text-white/65 sm:text-base'>
                      {step.summary}
                    </p>
                    <ul className='mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5'>
                      {step.outputs.map((output) => (
                        <li
                          key={output}
                          className='border border-brand/40 bg-brand/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-2'
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
            className='fw-btn fw-btn-primary inline-flex h-14 items-center gap-3 px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.24em]'
          >
            {t.cta}
            <span className='h-2.5 w-2.5 bg-white' />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
