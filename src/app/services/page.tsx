import type { Metadata } from 'next';

import { PageHero } from '@/components/common/page-hero';
import { CtaBanner } from '@/components/sections/cta-banner';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Pricing } from '@/components/sections/pricing';
import { ServicesGrid } from '@/components/sections/services-grid';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full-stack product engineering, AI systems, cloud automation, web design, MVP sprints and dedicated teams from Feinwerk Software.',
  alternates: { canonical: paths.services },
};

export default async function ServicesPage() {
  const dict = await getDictionary();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'Services', href: paths.services },
        ]}
      />
      <PageHero
        kicker='Services'
        title='Engineering, scoped to an outcome.'
        accentWords={[3, 4]}
        description='Four capabilities and two ways to engage, covering the whole lifecycle of a software product from the first prototype to the team that runs it. Each one is priced for a result, not for hours.'
      />
      <ServicesGrid dict={dict} withHeading={false} className='pt-0' />
      <Pricing dict={dict} />
      <HowItWorks dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
