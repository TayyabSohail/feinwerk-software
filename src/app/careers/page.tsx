import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/common/page-hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Work at Feinwerk Software. Senior full-stack, AI and platform engineers in Rawalpindi and remote across Europe and Asia.',
  alternates: { canonical: paths.careers },
};

const PERKS = [
  {
    title: 'Senior by default',
    body: 'Small teams of experienced engineers. No layers between you and the client, and no one to hand the hard part to.',
  },
  {
    title: 'Real products, real numbers',
    body: 'Every project ends with a measured outcome. You will see the metric your work moved, not a ticket closed.',
  },
  {
    title: 'Remote, with overlap',
    body: 'Work from Rawalpindi, Fellbach or anywhere in between. Core hours overlap CET and PKT; the rest is yours.',
  },
  {
    title: 'Modern stack, no legacy',
    body: 'Next.js, TypeScript, Python, Postgres, the current generation of AI tooling. We adopt carefully and replace boldly.',
  },
];

const PROFILES = [
  'Senior full-stack engineer (Next.js, TypeScript, PostgreSQL)',
  'AI engineer (LLM applications, retrieval, evaluation)',
  'Platform engineer (AWS, CI/CD, observability)',
  'Product designer (systems, prototyping, front-end fluency)',
];

export default async function CareersPage() {
  const dict = await getDictionary();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'Careers', href: paths.careers },
        ]}
      />
      <PageHero
        kicker='Careers'
        title='Do the finest work of your career.'
        accentWords={[2, 3]}
        description='We are a small studio and we hire slowly, for people who want to own outcomes rather than tickets. There are no open roles listed right now, but we always read speculative applications.'
        size='lg'
      >
        <Link href={`${paths.contact}?service=other`}>
          <Button variant='brand' size='xl' icon={ArrowUpRight}>
            Send a speculative application
          </Button>
        </Link>
      </PageHero>

      <section className='fw-container pb-16 lg:pb-24'>
        <Stagger className='grid gap-4 sm:grid-cols-2'>
          {PERKS.map((perk, index) => (
            <StaggerItem key={perk.title} className='fw-card p-7'>
              <span className='font-mono text-xs text-muted-foreground'>
                0{index + 1}
              </span>
              <h2 className='mt-8 text-xl font-semibold tracking-tight text-foreground'>
                {perk.title}
              </h2>
              <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                {perk.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className='fw-container pb-10'>
        <Reveal className='fw-card p-7 sm:p-10'>
          <p className='fw-kicker'>Profiles we are always interested in</p>
          <ul className='mt-6 divide-y divide-line'>
            {PROFILES.map((profile) => (
              <li
                key={profile}
                className='flex items-center justify-between gap-4 py-4 text-[15px] text-foreground/85'
              >
                {profile}
                <span className='shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                  Speculative
                </span>
              </li>
            ))}
          </ul>
          <p className='mt-6 text-sm text-muted-foreground'>
            Email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className='text-foreground underline underline-offset-4'
            >
              {siteConfig.email}
            </a>{' '}
            with a link to something you built and a few lines on why. We reply
            to every application.
          </p>
        </Reveal>
      </section>

      <CtaBanner
        dict={dict}
        title='Rather hire us than join us?'
        accentWords={[1, 2]}
        body='Our dedicated team service embeds senior engineers in your roadmap, in your tools, on your schedule.'
      />
    </>
  );
}
