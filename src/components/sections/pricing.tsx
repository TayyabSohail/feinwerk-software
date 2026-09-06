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
  dedicated: `${paths.contact}?service=dedicated-team`,
  growth: `${paths.contact}?service=other`,
};

interface PricingProps {
  dict: Dictionary;
  withHeading?: boolean;
  /** Show a link to the full pricing page beside the heading. */
  withLink?: boolean;
  /** Show a gateway to the full pricing page instead of plan cards. */
  compact?: boolean;
  className?: string;
}

/**
 * Plans are displayed from the lowest published price to the highest, with
 * the custom quote last. The MVP plan carries the top pick badge. The
 * homepage points visitors to the full comparison, while the pricing route
 * owns the plan details and shared inclusions.
 */
export function Pricing({
  dict,
  withHeading = true,
  withLink = false,
  compact = false,
  className,
}: PricingProps) {
  const t = dict.pricing;
  const plans = [...t.plans].sort((a, b) => {
    const price = (value: string) =>
      Number(value.replace(/[^\d]/g, '')) || Number.POSITIVE_INFINITY;
    return price(a.price) - price(b.price);
  });

  return (
    <section
      id='pricing'
      className={cn('fw-section fw-rule fw-band-white', className)}
      data-rail={t.kicker}
    >
      <div className='fw-container'>
        {withHeading && (
          <SectionHeading
            kicker={t.kicker}
            title={t.title}
            aside={
              withLink && !compact ? (
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

        {compact ? (
          <Reveal delay={0.1} className={cn('mt-10', !withHeading && 'mt-0')}>
            <Link
              href={paths.pricing}
              className='fw-card fw-card-ink fw-card-link group flex flex-col gap-6 rounded-xl p-5 shadow-[0_24px_60px_-30px_hsl(var(--ink)/0.6)] [clip-path:none] sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-8'
            >
              <div className='relative z-[2] max-w-2xl'>
                <p className='font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-2'>
                  {t.kicker}
                </p>
                <h3 className='fw-display mt-3 text-2xl text-white sm:text-3xl'>
                  {t.promoTitle}
                </h3>
                <p className='mt-3 text-base leading-relaxed text-white/70'>
                  {t.note}
                </p>
              </div>
              <span className='fw-btn fw-btn-primary relative z-[2] inline-flex h-14 w-full shrink-0 items-center justify-center gap-3 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] sm:w-auto'>
                {t.all} <ArrowUpRight className='h-4 w-4' />
              </span>
            </Link>
          </Reveal>
        ) : (
          <Stagger
            stagger={0.12}
            className={cn(
              'grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4',
              withHeading && 'mt-14',
            )}
          >
            {plans.map((plan) => (
              <StaggerItem key={plan.id} className='h-full'>
                <PlanCard plan={plan} t={t} compact={false} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {!compact && (
          <Reveal delay={0.15} className='mt-12 border-t pt-8'>
            <p className='fw-kicker text-[11px] sm:text-xs'>
              {t.includes.title}
            </p>
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
        )}

        {!compact && (
          <Reveal delay={0.2}>
            <p className='mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
              {t.note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * One plan: name, price, what is included, and a direct call to action. The
 * custom plan has no number; it shows "Custom" with a quote label instead.
 */
function PlanCard({
  plan,
  t,
  compact,
}: {
  plan: Plan;
  t: PricingCopy;
  compact: boolean;
}) {
  const custom = plan.id === 'custom';
  const featured = plan.featured;
  return (
    <div
      className={cn(
        'fw-card fw-spot flex h-full flex-col rounded-xl border-ink/15 bg-background p-5 shadow-[0_12px_30px_-24px_hsl(var(--ink)/0.6)] [clip-path:none] max-sm:border-x-0 max-sm:py-7 sm:p-9 xl:p-7',
        featured && 'border-brand/70 bg-brand-soft shadow-none',
      )}
    >
      <div className='relative z-[2] flex h-full flex-col'>
        {featured && (
          <p className='mb-5 inline-flex w-fit items-center gap-2 border border-brand/40 bg-brand px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-ink'>
            <Star aria-hidden='true' className='h-3 w-3' strokeWidth={2} />
            {t.badge}
          </p>
        )}
        <h3 className='fw-display text-2xl text-ink sm:text-3xl'>
          {plan.name}
        </h3>
        <p className='mt-2 text-base text-muted-foreground'>{plan.tagline}</p>

        <p className='mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-8'>
          <span className='fw-display text-4xl text-ink sm:text-6xl xl:text-5xl'>
            {plan.price}
          </span>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
            / {plan.period ?? (custom ? t.customPeriod : t.period)}
          </span>
        </p>

        <ul className='mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-5 text-[13px] leading-snug text-ink/75 sm:mt-8 sm:block sm:space-y-3 sm:pt-7 sm:text-sm'>
          {plan.features.slice(0, compact ? 4 : undefined).map((feature) => (
            <li key={feature} className='flex items-start gap-2 sm:gap-3'>
              <Check
                aria-hidden='true'
                className='mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-text sm:h-4 sm:w-4'
                strokeWidth={2}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className='mt-auto pt-6 sm:pt-9'>
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
