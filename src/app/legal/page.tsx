import {
  ArrowUpRight,
  Cookie,
  FileText,
  Mail,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/common/page-hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

export const metadata: Metadata = {
  title: 'Legal',
  description:
    'Legal information for Feinwerk Software: privacy policy, terms of service, cookie policy and imprint, plus how to reach us about data or contracts.',
  alternates: { canonical: paths.legal.index },
};

const UPDATED = '5 September 2026';

const POLICIES = [
  {
    href: paths.legal.privacy,
    icon: ShieldCheck,
    title: 'Privacy Policy',
    summary:
      'What personal data this website collects, why, who processes it and the rights you have under the GDPR.',
    audience: 'Visitors, enquirers and clients',
  },
  {
    href: paths.legal.terms,
    icon: ScrollText,
    title: 'Terms of Service',
    summary:
      'The general terms for using this site and for engaging Feinwerk Software, covering scope, payment, intellectual property and liability.',
    audience: 'Business clients',
  },
  {
    href: paths.legal.cookies,
    icon: Cookie,
    title: 'Cookie Policy',
    summary:
      'The two preference entries the site stores and the single analytics cookie that loads only if you accept it.',
    audience: 'Visitors',
  },
  {
    href: paths.legal.imprint,
    icon: FileText,
    title: 'Imprint',
    summary:
      'Legal notice (Impressum) with the company details, contact information and responsible persons required under German law.',
    audience: 'Everyone',
  },
];

const COMMITMENTS = [
  {
    title: 'You own what we build',
    body: 'Custom code, designs and documentation are assigned to you on payment. We work in repositories and accounts registered to your company.',
  },
  {
    title: 'GDPR by default',
    body: 'A data processing agreement is provided for every project that touches personal data, and our own site collects the minimum needed to reply to you.',
  },
  {
    title: 'NDA before discovery',
    body: 'We sign a mutual non-disclosure agreement on request before any scoping conversation, and treat every brief as confidential regardless.',
  },
  {
    title: 'Two contracting entities',
    body: 'Clients can contract with our German office under German law or with our Asian office under Pakistani law. The statement of work names which.',
  },
];

export default function LegalIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'Legal', href: paths.legal.index },
        ]}
      />
      <PageHero
        kicker='Legal'
        title='The paperwork, in plain language.'
        accentWords={[3, 4]}
        description='Everything that governs how we run this website and how we work with clients, written to be read rather than skimmed. Questions go straight to a person, not a form.'
        size='lg'
      >
        <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
          All documents last reviewed {UPDATED}
        </p>
      </PageHero>

      <section className='fw-container pb-16 lg:pb-24'>
        <Stagger className='grid gap-4 md:grid-cols-2'>
          {POLICIES.map((policy) => {
            const Icon = policy.icon;
            return (
              <StaggerItem key={policy.href}>
                <Link
                  href={policy.href}
                  className='fw-card fw-card-link group flex h-full flex-col p-7 sm:p-8'
                >
                  <div className='flex items-center justify-between'>
                    <span className='flex h-11 w-11 items-center justify-center rounded-none border border-line bg-surface-2 text-foreground transition-colors duration-500 group-hover:border-brand/60 group-hover:bg-brand group-hover:text-brand-foreground'>
                      <Icon className='h-5 w-5' />
                    </span>
                    <span className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                      {policy.audience}
                    </span>
                  </div>
                  <h2 className='mt-8 text-2xl font-semibold tracking-tight text-foreground'>
                    {policy.title}
                  </h2>
                  <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                    {policy.summary}
                  </p>
                  <span className='mt-auto flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground'>
                    Read
                    <ArrowUpRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className='fw-container pb-16 lg:pb-24'>
        <Reveal>
          <p className='fw-kicker'>How we contract</p>
          <h2 className='fw-display mt-5 text-display-sm text-foreground'>
            Four commitments in every engagement.
          </h2>
        </Reveal>
        <Stagger className='mt-10 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2 lg:grid-cols-4'>
          {COMMITMENTS.map((item) => (
            <StaggerItem
              key={item.title}
              className='flex flex-col bg-background p-7'
            >
              <h3 className='text-lg font-semibold tracking-tight text-foreground'>
                {item.title}
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                {item.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className='fw-container pb-24'>
        <Reveal className='fw-card grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center'>
          <div>
            <p className='fw-kicker'>Legal and data requests</p>
            <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foreground/85'>
              To exercise a data right, request a data processing agreement or
              NDA, report a security issue, or ask anything about these
              documents, email us. A person replies within five business days;
              data requests are answered within one month as the GDPR requires.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}?subject=Legal%20enquiry`}
            className='inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5'
          >
            <Mail className='h-4 w-4' />
            {siteConfig.email}
          </a>
        </Reveal>
      </section>
    </>
  );
}
