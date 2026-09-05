'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Cloud,
  Globe,
  Layers,
  Rocket,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { SectionHeading } from '@/components/common/section-heading';
import { Reveal } from '@/components/motion/reveal';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import { type ServiceIcon, services } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries/en';

export const SERVICE_ICONS: Record<
  ServiceIcon,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  layers: Layers,
  sparkles: Sparkles,
  cloud: Cloud,
  globe: Globe,
  rocket: Rocket,
  wrench: Wrench,
};

interface ServicesGridProps {
  dict: Dictionary;
  withHeading?: boolean;
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Services as an index: a numbered list on the left, and a dark preview
 * panel on the right that changes as the pointer moves down the list.
 */
export function ServicesGrid({
  dict,
  withHeading = true,
  className,
}: ServicesGridProps) {
  const t = dict.services;
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = SERVICE_ICONS[current.icon];

  return (
    <section id='services' className={cn('fw-section fw-rule', className)}>
      <div className='fw-container'>
        {withHeading && (
          <SectionHeading
            kicker={t.kicker}
            title={t.title}
            description={t.description}
            aside={
              <Link href={paths.services} className='fw-action'>
                {t.all} <ArrowUpRight className='h-4 w-4' />
              </Link>
            }
          />
        )}

        <div
          className={cn(
            'grid gap-8 lg:grid-cols-[1fr_0.9fr]',
            withHeading && 'mt-14',
          )}
        >
          {/* Index */}
          <Reveal>
            <ol className='border-t'>
              {services.map((service, index) => {
                const RowIcon = SERVICE_ICONS[service.icon];
                const isActive = index === active;
                return (
                  <li key={service.slug} className='border-b'>
                    <Link
                      href={paths.service(service.slug)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className={cn(
                        'group relative flex items-center gap-5 py-6 transition-colors duration-300 sm:gap-8',
                        isActive ? 'text-ink' : 'text-ink/55 hover:text-ink',
                      )}
                    >
                      <span
                        aria-hidden='true'
                        className={cn(
                          'absolute left-0 top-0 h-full w-[3px] origin-top bg-brand transition-transform duration-500',
                          isActive ? 'scale-y-100' : 'scale-y-0',
                        )}
                      />
                      <span className='w-8 shrink-0 pl-4 font-mono text-[11px] text-muted-foreground sm:pl-6'>
                        {service.index}
                      </span>
                      <RowIcon
                        className={cn(
                          'h-5 w-5 shrink-0 transition-colors',
                          isActive ? 'text-brand-text' : 'text-ink/40',
                        )}
                        strokeWidth={1.5}
                      />
                      <span className='min-w-0 flex-1'>
                        <span className='fw-display block text-xl sm:text-2xl'>
                          {service.title}
                        </span>
                        <span className='mt-1 block text-sm text-muted-foreground'>
                          {service.tagline}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300',
                          isActive
                            ? 'border-brand bg-brand text-white'
                            : 'border-ink/15 text-ink/40 group-hover:border-ink/40',
                        )}
                      >
                        <ArrowUpRight className='h-4 w-4' />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Preview */}
          <Reveal delay={0.1} className='hidden lg:block'>
            <div className='fw-card fw-card-ink fw-spot fw-spot-ink sticky top-28 min-h-[34rem] p-9'>
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  className='relative z-[2] flex h-full flex-col'
                >
                  <div className='flex items-center justify-between'>
                    <span className='flex h-12 w-12 items-center justify-center border border-white/15 bg-white/5 text-brand-2'>
                      <Icon className='h-5 w-5' strokeWidth={1.5} />
                    </span>
                    <span className='font-mono text-[10px] uppercase tracking-[0.24em] text-white/45'>
                      {t.kicker} &middot; {current.index}
                    </span>
                  </div>

                  <h3 className='fw-display mt-8 text-display-sm text-white'>
                    {current.title}
                  </h3>
                  <p className='mt-4 text-base leading-relaxed text-white/65'>
                    {current.summary}
                  </p>

                  <ul className='mt-6 grid gap-2 border-t border-white/10 pt-6 text-sm text-white/85 sm:grid-cols-2'>
                    {current.deliverables.slice(0, 4).map((item) => (
                      <li key={item} className='flex items-start gap-2.5'>
                        <span className='mt-2 h-1 w-1 shrink-0 bg-brand' />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className='mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 text-xs'>
                    <div className='bg-ink p-4'>
                      <p className='font-mono text-[9px] uppercase tracking-[0.2em] text-white/40'>
                        Timeline
                      </p>
                      <p className='mt-1.5 text-white'>
                        {current.engagement.timeline}
                      </p>
                    </div>
                    <div className='bg-ink p-4'>
                      <p className='font-mono text-[9px] uppercase tracking-[0.2em] text-white/40'>
                        Pricing
                      </p>
                      <p className='mt-1.5 text-white'>
                        {current.engagement.pricing}
                      </p>
                    </div>
                  </div>

                  <ul className='mt-5 flex flex-wrap gap-1.5'>
                    {current.stack.slice(0, 6).map((tool) => {
                      const { icon: ToolIcon, color } = getTechMeta(tool);
                      return (
                        <li
                          key={tool}
                          className='inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80'
                        >
                          <ToolIcon
                            className='h-3 w-3'
                            style={{
                              color:
                                color === 'currentColor' ? undefined : color,
                            }}
                          />
                          {tool}
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={paths.service(current.slug)}
                    className='fw-btn fw-btn-primary mt-auto inline-flex h-12 w-fit items-center gap-3 px-6 pt-0 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
                  >
                    {t.explore}
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
