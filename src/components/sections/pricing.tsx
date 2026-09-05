import { ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/common/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

type PricingCopy = Dictionary['pricing'];
type Plan = PricingCopy['plans'][number];

/**
 * Where each plan's call to action lands: the contact form, with the closest
 * service pre-selected so the brief arrives in the right bucket.
 */
const PLAN_LINKS: Record<Plan['id'], string> = {
  consulting: paths.contact,
  mvp: `${paths.contact}?service=mvp-sprint`,
  product: `${paths.contact}?service=product-engineering`,
};

interface PricingProps {
  dict: Dictionary;
  withHeading?: boolean;
  className?: string;
}

/**
 * Three fixed-price packages side by side. Same card, same structure for
 * each; the middle plan carries the tinted surface so the row has a centre.
 */
export function Pricing({ dict, withHeading = true, className }: PricingProps) {
  const t = dict.pricing;

  return (
    <section
      id='pricing'
      className={cn('fw-section fw-rule fw-band-white', className)}
    >
      <div className='fw-container'>
        {withHeading && (
          <SectionHeading
            kicker={t.kicker}
            title={t.title}
            description={t.description}
          />
        )}

        <Stagger
          stagger={0.12}
          className={cn('grid gap-5 lg:grid-cols-3', withHeading && 'mt-14')}
        >
          {t.plans.map((plan, index) => (
            <StaggerItem key={plan.id} className='h-full'>
              <PlanCard plan={plan} t={t} featured={index === 1} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className='mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            {t.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** One plan: name, price, what is included, and a direct call to action. */
function PlanCard({
  plan,
  t,
  featured,
}: {
  plan: Plan;
  t: PricingCopy;
  featured: boolean;
}) {
  return (
    <div
      className={cn(
        'fw-card fw-spot flex h-full flex-col p-7 sm:p-9',
        featured && 'fw-card-tint',
      )}
    >
      <div className='relative z-[2] flex h-full flex-col'>
        <h3 className='fw-display text-3xl text-ink'>{plan.name}</h3>
        <p className='mt-2 text-base text-muted-foreground'>{plan.tagline}</p>

        <p className='mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1'>
          <span className='fw-display text-5xl text-ink sm:text-6xl'>
            {plan.price}
          </span>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
            / {t.period}
          </span>
        </p>

        <ul className='mt-8 space-y-3 border-t pt-7 text-sm leading-snug text-ink/80'>
          {plan.features.map((feature) => (
            <li key={feature} className='flex items-start gap-3'>
              <Check
                aria-hidden='true'
                className='mt-0.5 h-4 w-4 shrink-0 text-brand-text'
                strokeWidth={2}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className='mt-auto pt-9'>
          <Link
            href={PLAN_LINKS[plan.id]}
            className='fw-btn fw-btn-primary inline-flex h-12 w-full items-center justify-center gap-3 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
          >
            {t.cta}
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
