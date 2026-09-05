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
    <section id='services' className={cn('fw-section fw-rule', className)}>
      <div className='fw-container'>
        {withHeading && <SectionHeading kicker={t.kicker} title={t.title} />}

        <GroupLabel
          label={t.groups.capability.label}
          className={cn(withHeading && 'mt-16')}
        />
        <Stagger
          stagger={0.08}
          className='mt-6 grid gap-px border bg-line sm:grid-cols-2 lg:grid-cols-4'
        >
          {capabilities.map((service) => (
            <StaggerItem key={service.slug} className='bg-surface'>
              <CapabilityCard service={service} explore={t.explore} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Sub-heading for a group: name and a one-line note. */
function GroupLabel({
  label,
  note,
  className,
}: {
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2',
        className,
      )}
    >
      <h3 className='fw-display text-2xl text-ink sm:text-3xl'>{label}</h3>
    </Reveal>
  );
}

/** One capability: the whole cell links to the service page. */
function CapabilityCard({
  service,
  explore,
}: {
  service: Service;
  explore: string;
}) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <Link
      href={paths.service(service.slug)}
      className='group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface-2/70 sm:p-7'
    >
      <div className='flex items-center'>
        <span className='flex h-10 w-10 items-center justify-center border bg-surface-2 text-ink transition-colors duration-300 group-hover:border-brand group-hover:text-brand-text'>
          <Icon className='h-[18px] w-[18px]' strokeWidth={1.5} />
        </span>
      </div>

      <h4 className='fw-display mt-8 text-2xl text-ink'>{service.title}</h4>
      <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
        {service.tagline}
      </p>

      <ul className='mt-6 space-y-2 border-t pt-5 text-sm leading-snug text-ink/80'>
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

      <div className='mt-auto flex items-center justify-between gap-4 pt-7'>
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
        <span className='flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 text-ink/50 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white'>
          <ArrowUpRight className='h-4 w-4' />
          <span className='sr-only'>{explore}</span>
        </span>
      </div>
    </Link>
  );
}
