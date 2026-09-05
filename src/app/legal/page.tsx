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
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Legal',
  description:
    'Legal information for Feinwerks Software: privacy policy, terms of service, cookie policy and imprint, plus how to reach us about data or contracts.',
  alternates: { canonical: paths.legal.index },
};

const UPDATED = '5 September 2026';

const POLICY_META = [
  { key: 'privacy' as const, href: paths.legal.privacy, icon: ShieldCheck },
  { key: 'terms' as const, href: paths.legal.terms, icon: ScrollText },
  { key: 'cookies' as const, href: paths.legal.cookies, icon: Cookie },
  { key: 'imprint' as const, href: paths.legal.imprint, icon: FileText },
];



export default async function LegalIndexPage() {
  const dict = await getDictionary();
  const t = dict.legal;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: t.kicker, href: paths.legal.index },
        ]}
      />
      <PageHero
        kicker={t.kicker}
        title={t.title}
        accentWords={[...t.accent]}
        description={t.description}
        size='lg'
      >
        <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
          {t.reviewed.replace('{date}', UPDATED)}
        </p>
      </PageHero>

      <section className='fw-container pb-16 lg:pb-24'>
        <Stagger className='grid gap-4 md:grid-cols-2'>
          {POLICY_META.map((meta) => {
            const Icon = meta.icon;
            const policy = t.policies[meta.key];
            return (
              <StaggerItem key={meta.href}>
                <Link
                  href={meta.href}
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
                    {t.read}
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
          <p className='fw-kicker'>{t.commitmentsKicker}</p>
          <h2 className='fw-display mt-5 text-display-sm text-foreground'>
            {t.commitmentsTitle}
          </h2>
        </Reveal>
        <Stagger className='mt-10 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2 lg:grid-cols-4'>
          {t.commitments.map((item) => (
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
            <p className='fw-kicker'>{t.requestsKicker}</p>
            <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foreground/85'>
              {t.requestsBody}
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
