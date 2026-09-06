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

import { SectionHeading } from '@/components/common/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import {
  getCapabilities,
  type Service,
  type ServiceIcon,
} from '@/data/services';
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

/**
 * The four capabilities (what we build) in a hairline grid with their key
 * deliverables and tools.
 */
export function ServicesGrid({
  dict,
  withHeading = true,
  className,
}: ServicesGridProps) {
  const t = dict.services;
  const capabilities = getCapabilities(dict.locale);

  return (
    <section
      id='services'
      data-rail={t.kicker}
      className={cn('fw-section fw-rule', className)}
    >
      <div className='fw-container'>
        {withHeading && <SectionHeading kicker={t.kicker} title={t.title} />}

        <GroupLabel
          label={t.groups.capability.label}
          className={cn(withHeading && 'mt-10 sm:mt-16')}
        />
        <Stagger
          stagger={0.08}
          className='mt-5 grid gap-px overflow-hidden border bg-line sm:mt-6 sm:grid-cols-2 lg:grid-cols-4'
        >
          {capabilities.map((service, index) => (
            <StaggerItem key={service.slug} className='bg-surface'>
              <CapabilityCard
                service={service}
                index={index}
                explore={t.explore}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Sub-heading for a group. */
function GroupLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn('flex flex-wrap items-baseline gap-x-8 gap-y-2', className)}
    >
      <h3 className='fw-display text-2xl text-ink sm:text-3xl'>{label}</h3>
    </Reveal>
  );
}

/** One capability: the whole cell links to the service page. */
function CapabilityCard({
  service,
  index,
  explore,
}: {
  service: Service;
  index: number;
  explore: string;
}) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <Link
      href={paths.service(service.slug)}
      className='group relative flex h-full flex-col bg-surface p-5 transition-colors duration-300 hover:bg-brand-soft/35 sm:min-h-[31rem] sm:p-7'
    >
      <div className='flex items-center justify-between'>
        <span className='flex h-10 w-10 items-center justify-center border bg-surface-2 text-ink transition-colors duration-300 group-hover:border-brand group-hover:bg-brand-soft group-hover:text-brand-text'>
          <Icon className='h-[18px] w-[18px]' strokeWidth={1.5} />
        </span>
        <span className='font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-brand-text'>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h4 className='fw-display mt-6 max-w-[13ch] text-[1.65rem] text-ink sm:mt-9 sm:text-[1.8rem]'>
        {service.title}
      </h4>
      <p className='mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground'>
        {service.tagline}
      </p>

      <ul className='mt-5 space-y-2.5 border-t pt-4 text-[13px] leading-snug text-ink/80 sm:mt-7 sm:pt-5'>
        {service.deliverables.slice(0, 3).map((item) => (
          <li key={item} className='flex items-start gap-2.5'>
            <span
              aria-hidden='true'
              className='mt-[7px] h-1 w-1 shrink-0 bg-brand'
            />
            {item}
          </li>
        ))}
      </ul>

      <div className='mt-auto pt-6 sm:pt-7'>
        <ul className='flex items-center gap-1.5' aria-label='Core tools'>
          {service.stack.slice(0, 5).map((tool) => {
            const { icon: ToolIcon, color } = getTechMeta(tool);
            return (
              <li
                key={tool}
                title={tool}
                className='flex h-7 w-7 items-center justify-center border bg-surface-2'
              >
                <ToolIcon
                  className='h-3.5 w-3.5'
                  style={{
                    color: color === 'currentColor' ? undefined : color,
                  }}
                />
              </li>
            );
          })}
        </ul>
        <span className='mt-5 flex h-10 w-full items-center justify-between border border-brand bg-brand px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground transition-colors duration-300 group-hover:bg-transparent group-hover:text-brand-text'>
          {explore}
          <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
        </span>
      </div>
    </Link>
  );
}
