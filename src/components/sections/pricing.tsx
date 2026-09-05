import { ArrowUpRight, Check, Star } from 'lucide-react';
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
  custom: `${paths.contact}?service=other`,
};

interface PricingProps {
  dict: Dictionary;
  withHeading?: boolean;
  /** Show a link to the full pricing page beside the heading. */
  withLink?: boolean;
  className?: string;
}

/**
 * The custom solution leads, followed by three fixed-price packages. Same
 * card, same structure for each; the MVP plan carries the tinted surface and
 * the top pick badge. Beneath the cards, what every plan includes: a written
 * quote, maintenance after launch and accountability for the product.
 */
export function Pricing({
  dict,
  withHeading = true,
  withLink = false,
  className,
}: PricingProps) {
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
            aside={
              withLink ? (
                <Link
                  href={paths.pricing}
                  className='fw-btn fw-btn-secondary inline-flex h-12 items-center gap-3 px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
                >
                  {t.all} <ArrowUpRight className='h-4 w-4' />
                </Link>
              ) : undefined
            }
          />
        )}

        <Stagger
          stagger={0.12}
          className={cn(
            'grid gap-5 md:grid-cols-2 xl:grid-cols-4',
            withHeading && 'mt-14',
          )}
        >
          {t.plans.map((plan) => (
            <StaggerItem key={plan.id} className='h-full'>
              <PlanCard plan={plan} t={t} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className='mt-12 border-t pt-8'>
          <p className='fw-kicker text-[10px]'>{t.includes.title}</p>
          <dl className='mt-6 grid gap-px border bg-line sm:grid-cols-2 xl:grid-cols-4'>
            {t.includes.items.map((item) => (
              <div key={item.title} className='bg-surface p-5 sm:p-6'>
                <dt className='flex items-start gap-3 text-sm font-semibold leading-snug text-ink'>
                  <Check
                    aria-hidden='true'
                    className='mt-0.5 h-4 w-4 shrink-0 text-brand-text'
                    strokeWidth={2}
                  />
                  {item.title}
                </dt>
                <dd className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.2}>
          <p className='mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            {t.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One plan: name, price, what is included, and a direct call to action. The
 * custom plan has no number; it shows "Custom" with a quote label instead.
 */
function PlanCard({ plan, t }: { plan: Plan; t: PricingCopy }) {
  const custom = plan.id === 'custom';
  const featured = plan.featured;
  return (
    <div
      className={cn(
        'fw-card fw-spot flex h-full flex-col p-7 sm:p-9 xl:p-7',
        featured && 'fw-card-tint',
      )}
    >
      <div className='relative z-[2] flex h-full flex-col'>
        {featured && (
          <p className='mb-4 inline-flex w-fit items-center gap-2 border border-brand-text/30 bg-brand-text/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-text'>
            <Star aria-hidden='true' className='h-3 w-3' strokeWidth={2} />
            {t.badge}
          </p>
        )}
        <h3 className='fw-display text-3xl text-ink'>{plan.name}</h3>
        <p className='mt-2 text-base text-muted-foreground'>{plan.tagline}</p>

        <p className='mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1'>
          <span className='fw-display text-5xl text-ink sm:text-6xl xl:text-5xl'>
            {plan.price}
          </span>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
            / {custom ? t.customPeriod : t.period}
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
            {custom ? t.customCta : t.cta}
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
