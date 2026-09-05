import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/common/page-hero';
import { SectionHeading } from '@/components/common/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Locations } from '@/components/sections/locations';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { paths } from '@/constants/paths';
import { values } from '@/data/process';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Feinwerk Software is a software studio with offices in Islamabad, Pakistan and Fellbach, Germany, building web, AI and cloud products on fixed dates.',
  alternates: { canonical: paths.about },
};

const FACTS = [
  {
    label: 'What we build',
    value: 'Web platforms, AI products, cloud automation, marketing sites',
  },
  {
    label: 'Who for',
    value: 'Founders and product teams in Europe, Asia and North America',
  },
  {
    label: 'How',
    value:
      'Fixed scope, fixed or custom price, weekly demos, maintained after launch',
  },
  {
    label: 'Where',
    value: 'Islamabad and Fellbach, with overlapping working hours',
  },
];

export default async function AboutPage() {
  const dict = await getDictionary();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'About', href: paths.about },
        ]}
      />
      <PageHero
        kicker='About Feinwerk'
        title='A software studio named after a standard.'
        accentWords={[6, 7]}
        description='Feinwerk is German for fine work, the precision-engineering tradition of the Stuttgart region where our client office sits. We hold software to the same bar: it has to be exactly right, on the day it was promised.'
      />

      <section className='fw-container grid gap-12 pb-16 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pb-24'>
        <Reveal className='space-y-6 text-lg leading-relaxed text-foreground/85'>
          <p>
            We started Feinwerk after years of building products for companies
            that had been burned before: agencies that missed the date, teams
            that shipped almost what was asked, estimates that doubled halfway
            through.
          </p>
          <p>
            So we structured the studio around the four things clients said they
            could not get elsewhere. A date and a price agreed before work
            starts, for a standard package or a custom scope. One senior team
            that owns the whole product, from the interface to the cloud bill. A
            result you can measure after launch, reported by you, not by us. And
            a team that stays: we maintain what we build and take accountability
            for it in production.
          </p>
          <p>
            Our Asian office is in Islamabad. Clients in Europe have a local
            contact in Fellbach. Between the two offices, someone is working
            during your working day.
          </p>
        </Reveal>

        <Stagger className='grid gap-px self-start overflow-hidden rounded-none border border-line bg-line'>
          {FACTS.map((fact) => (
            <StaggerItem
              key={fact.label}
              className='grid gap-2 bg-background p-6 sm:grid-cols-[8rem_1fr]'
            >
              <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                {fact.label}
              </p>
              <p className='text-base font-medium text-foreground'>
                {fact.value}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className='fw-section border-t border-line'>
        <div className='fw-container'>
          <SectionHeading
            kicker='Principles'
            title='Four rules every project is held to.'
            accentWords={[0, 1]}
          />
          <Stagger className='mt-14 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2 lg:grid-cols-4'>
            {values.map((value) => (
              <StaggerItem
                key={value.title}
                className='flex flex-col bg-background p-7'
              >
                <h3 className='fw-display text-2xl text-foreground'>
                  {value.title}
                </h3>
                <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                  {value.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <HowItWorks dict={dict} />

      <section className='fw-section'>
        <div className='fw-container'>
          <SectionHeading
            kicker='Where we are'
            title='Two offices, one working day.'
            accentWords={[3, 4]}
            description='An Asian office in Islamabad and a European office in Fellbach. Call whichever is closer; the same team answers.'
          />
          <Locations className='mt-14' />
        </div>
      </section>

      <section className='fw-container pb-6'>
        <Reveal className='fw-card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10'>
          <div>
            <p className='fw-kicker'>Careers</p>
            <p className='fw-display mt-3 text-2xl text-foreground'>
              No open positions right now.
            </p>
            <p className='mt-3 max-w-md text-sm leading-relaxed text-muted-foreground'>
              We are not hiring at the moment. When that changes, roles will be
              listed on the careers page.
            </p>
          </div>
          <Link
            href={paths.careers}
            className='inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium transition-colors hover:border-brand/60'
          >
            Careers <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Reveal>
      </section>

      <CtaBanner
        dict={dict}
        title='Want to see how we would run your project?'
        accentWords={[7, 8]}
        body='Send a short brief. You get a written scope, a fixed or custom price and a launch date within a week, with no obligation, and a team that keeps maintaining the product after launch.'
      />
    </>
  );
}
