import type { Metadata } from 'next';

import { ContactChannels } from '@/components/contact/contact-channels';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project. Feinwerks Software replies within one business day from Islamabad, Pakistan and Fellbach, Germany.',
  alternates: { canonical: paths.contact },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

/**
 * Deliberately the quietest page on the site.
 *
 * No hero, no FAQ, no locations, no CTA banner, and (via the route's own
 * layout) no site header or footer. Someone who reaches this page has already
 * been sold; everything else is now in the way. What remains is the form, and
 * the calendar for people who would rather just talk.
 */
export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;
  const dict = await getDictionary();
  const t = dict.contact;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.contact, href: paths.contact },
        ]}
      />

      <section className='fw-container max-w-5xl pb-16 pt-10 sm:pt-16'>
        <header className='mb-10 max-w-2xl'>
          <p className='fw-kicker'>{t.kicker}</p>
          <h1 className='fw-display mt-4 text-display-md text-foreground sm:text-display-lg'>
            {t.title}
          </h1>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-muted-foreground'>
            {t.description}
          </p>
        </header>

        <ContactChannels
          dict={dict}
          defaultService={service}
          calHandle={siteConfig.calHandle}
        />
      </section>
    </>
  );
}
