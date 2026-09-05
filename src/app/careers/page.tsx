import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/common/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Feinwerks Software has no open positions at the moment. Roles are listed here when we hire again.',
  alternates: { canonical: paths.careers },
};

/**
 * Nothing is on offer right now, and the page says so plainly instead of
 * dressing a speculative pipeline up as vacancies.
 */
export default async function CareersPage() {
  const dict = await getDictionary();
  const t = dict.careersPage;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.careers, href: paths.careers },
        ]}
      />
      <PageHero
        kicker={t.kicker}
        title={t.title}
        accentWords={[...t.accent]}
        description={t.description}
        size='lg'
      >
        <span className='inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
          {t.badge}
        </span>
      </PageHero>

      <section className='fw-container pb-16 lg:pb-24'>
        <Reveal className='fw-card p-7 sm:p-10'>
          <p className='fw-kicker'>{t.statusKicker}</p>
          <h2 className='mt-6 text-xl font-semibold tracking-tight text-foreground'>
            {t.statusTitle}
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            {t.statusBody}
          </p>
          <p className='mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            {t.notifyBefore}{' '}
            <Link
              href={paths.contact}
              className='text-foreground underline underline-offset-4'
            >
              {dict.nav.contact.toLowerCase()}
            </Link>{' '}
            {t.notifyAfter}
          </p>
        </Reveal>
      </section>

      <CtaBanner
        dict={dict}
        title={t.ctaTitle}
        accentWords={[...t.ctaAccent]}
        body={t.ctaBody}
      />
    </>
  );
}
