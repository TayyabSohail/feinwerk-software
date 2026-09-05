import {
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Users,
} from 'lucide-react';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import type { Dictionary } from '@/i18n/dictionaries/en';

const ICONS = [
  Landmark,
  Building2,
  ShoppingBag,
  Users,
  HeartPulse,
  BriefcaseBusiness,
];

interface IndustriesProps {
  dict: Dictionary;
}

/** Six hairline cells with a line icon each. Static, so no hover. */
export function Industries({ dict }: IndustriesProps) {
  const t = dict.industries;

  return (
    <section className='fw-section fw-rule fw-band-stone text-center'>
      <div className='fw-container'>
        <Reveal>
          <p className='fw-kicker'>{t.kicker}</p>
        </Reveal>
        <TextReveal
          as='h2'
          text={t.title}
          className='fw-display mt-5 justify-center text-display-md text-ink'
        />
        <Stagger className='mt-14 grid grid-cols-2 border-y sm:grid-cols-3 lg:grid-cols-6'>
          {t.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <StaggerItem
                key={item}
                className='fw-spot flex flex-col items-center gap-4 border-b bg-white/60 px-4 py-10 sm:border-b-0 sm:[&:not(:first-child)]:border-l'
              >
                <span className='flex h-12 w-12 items-center justify-center border border-brand/30 bg-brand-soft text-brand-text'>
                  <Icon className='h-5 w-5' strokeWidth={1.5} />
                </span>
                <span className='text-sm font-medium text-ink/80'>{item}</span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
