import type { Metadata } from 'next';

import { PageHero } from '@/components/common/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Feinwerk Software has no open positions at the moment. Roles are listed here when we hire again.',
  alternates: { canonical: paths.careers },
};

/**
 * Nothing is on offer right now, and the page says so plainly instead of
 * dressing a speculative pipeline up as vacancies.
 */
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
        title='No open positions right now.'
        accentWords={[1, 2]}
        description='Feinwerk Software is a small studio that hires slowly. We are not recruiting at the moment, and there are no vacancies to apply for. When that changes, the roles will be listed on this page.'
        size='lg'
      >
        <span className='inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
          0 open positions
        </span>
      </PageHero>

      <section className='fw-container pb-16 lg:pb-24'>
        <Reveal className='fw-card p-7 sm:p-10'>
          <p className='fw-kicker'>Current status</p>
          <h2 className='mt-6 text-xl font-semibold tracking-tight text-foreground'>
            We are not accepting applications.
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            There are no vacancies for engineers, designers or any other role,
            in Islamabad, in Fellbach or remote.
          </p>
          <p className='mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            Want to hear when this changes? Email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className='text-foreground underline underline-offset-4'
            >
              {siteConfig.email}
            </a>{' '}
            with the subject line &ldquo;Future roles&rdquo; and we will let you
            know once a position opens.
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
