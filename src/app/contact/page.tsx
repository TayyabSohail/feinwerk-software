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
import { getFaqs } from '@/data/faqs';
import { getDictionary, getLocale } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project. Feinwerks Software replies within one business day from Islamabad, Pakistan and Fellbach, Germany.',
  alternates: { canonical: paths.contact },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;
  const dict = await getDictionary();
  const locale = await getLocale();
  const t = dict.contact;
  const faqs = getFaqs(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.contact, href: paths.contact },
        ]}
      />
      <PageHero
        kicker={t.kicker}
        title={t.title}
        accentWords={[...t.accent]}
        description={t.description}
        size='lg'
      />

      <section className='fw-container grid gap-10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14'>
        <Reveal>
          <ContactForm dict={dict} defaultService={service} />
        </Reveal>

        <div className='space-y-4 lg:sticky lg:top-32 lg:self-start'>
          <Reveal delay={0.1} className='fw-card p-7'>
            <p className='fw-kicker'>{t.direct}</p>
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
                <span className='fw-link'>{t.book}</span>
              </a>
            ) : (
              <p className='mt-3 flex items-center gap-3 text-sm text-muted-foreground'>
                <CalendarDays className='h-5 w-5 text-brand-text' />
                {t.callNote}
              </p>
            )}
          </Reveal>
          <Locations className='sm:grid-cols-1' />
        </div>
      </section>

      <FaqSection
        items={faqs.slice(0, 4)}
        kicker={t.faqKicker}
        title={t.faqTitle}
        accentWords={[...t.faqAccent]}
      />
    </>
  );
}
