import type { Metadata } from 'next';

import { PageHero } from '@/components/common/page-hero';
import { CtaBanner } from '@/components/sections/cta-banner';
import { FaqSection } from '@/components/sections/faq';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Pricing } from '@/components/sections/pricing';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { paths } from '@/constants/paths';
import { getFaqs } from '@/data/faqs';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Six ways to work with Feinwerks Software, from strategy and maintenance to dedicated teams and full product builds. Every plan includes a written scope and support after launch.',
  alternates: { canonical: paths.pricing },
};

/**
 * Positions in `getFaqs` of the questions that concern money and terms:
 * how we price, maintenance after launch, ownership, and agreements.
 */
const PRICING_FAQS = [1, 2, 4, 6];

export default async function PricingPage() {
  const dict = await getDictionary();
  const t = dict.pricingPage;
  const faqs = getFaqs(dict.locale).filter((_, index) =>
    PRICING_FAQS.includes(index),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.pricing, href: paths.pricing },
        ]}
      />
      <PageHero
        kicker={t.kicker}
        title={t.title}
        accentWords={[...t.accent]}
        description={t.description}
      />
      <Pricing dict={dict} withHeading={false} className='pt-0' />
      <FaqSection
        items={faqs}
        kicker={t.faqKicker}
        title={t.faqTitle}
        accentWords={[...t.faqAccent]}
        className='fw-band-stone fw-rule'
      />
      <HowItWorks dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
