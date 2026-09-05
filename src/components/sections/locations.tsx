import { Mail } from 'lucide-react';

import { Flag } from '@/components/brand/flags';
import { LocalTime } from '@/components/common/local-time';
import { Stagger, StaggerItem } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

interface LocationsProps {
  className?: string;
}

export function Locations({ className }: LocationsProps) {
  return (
    <Stagger className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {siteConfig.locations.map((location, index) => (
        <StaggerItem
          key={location.id}
          className={cn('fw-card p-7', index === 1 && 'fw-card-tint')}
        >
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='fw-kicker'>{location.label}</p>
              <p className='mt-4 flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-foreground'>
                <Flag countryCode={location.countryCode} />
                {location.city}
              </p>
              <p className='text-sm text-muted-foreground'>
                {location.country}
              </p>
            </div>
            <div className='text-right'>
              <p className='fw-display text-2xl text-foreground'>
                <LocalTime timezone={location.timezone} />
              </p>
              <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                {location.utc}
              </p>
            </div>
          </div>

          <ul className='mt-6 space-y-3 border-t border-line pt-5 text-sm'>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className='fw-link inline-flex items-center gap-2.5 text-foreground'
              >
                <Mail className='h-4 w-4 text-brand-text' />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
