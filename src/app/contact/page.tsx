import { CalendarDays, Mail } from 'lucide-react';
import type { Metadata } from 'next';

import { PageHero } from '@/components/common/page-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { FaqSection } from '@/components/sections/faq';
import { Locations } from '@/components/sections/locations';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project. Feinwerk Software replies within one business day from Islamabad, Pakistan and Fellbach, Germany.',
  alternates: { canonical: paths.contact },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'Contact', href: paths.contact },
        ]}
      />
      <PageHero
        kicker='Contact'
        title='Tell us what has to be right.'
        accentWords={[5, 6]}
        description='A few sentences is enough. We reply within one business day with a first take on scope, timeline and who would work on it.'
        size='lg'
      />

      <section className='fw-container grid gap-10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14'>
        <Reveal>
          <ContactForm defaultService={service} />
        </Reveal>

        <div className='space-y-4 lg:sticky lg:top-32 lg:self-start'>
          <Reveal delay={0.1} className='fw-card p-7'>
            <p className='fw-kicker'>Direct</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className='mt-4 flex items-center gap-3 text-lg font-medium text-foreground'
            >
              <Mail className='h-5 w-5 text-brand-text' />
              <span className='fw-link'>{siteConfig.email}</span>
            </a>
            {siteConfig.calLink ? (
              <a
                href={siteConfig.calLink}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-3 flex items-center gap-3 text-lg font-medium text-foreground'
              >
                <CalendarDays className='h-5 w-5 text-brand-text' />
                <span className='fw-link'>Book a 30-minute intro call</span>
              </a>
            ) : (
              <p className='mt-3 flex items-center gap-3 text-sm text-muted-foreground'>
                <CalendarDays className='h-5 w-5 text-brand-text' />
                Prefer a call? Mention it and we will send a booking link.
              </p>
            )}
          </Reveal>
          <Locations className='sm:grid-cols-1' />
        </div>
      </section>

      <FaqSection
        items={faqs.slice(0, 4)}
        kicker='Before you write'
        title='The questions we get most.'
        accentWords={[4]}
      />
    </>
  );
}
