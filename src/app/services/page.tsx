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
    'Full-stack product engineering, AI systems, cloud automation, web design, MVP sprints and dedicated teams from Feinwerks Software.',
  alternates: { canonical: paths.services },
};

export default async function ServicesPage() {
  const dict = await getDictionary();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.services, href: paths.services },
        ]}
      />
      <PageHero
        kicker={dict.servicesPage.kicker}
        title={dict.servicesPage.title}
        accentWords={[...dict.servicesPage.accent]}
        description={dict.servicesPage.description}
      />
      <ServicesGrid dict={dict} withHeading={false} className='pt-0' />
      <Pricing dict={dict} />
      <HowItWorks dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
