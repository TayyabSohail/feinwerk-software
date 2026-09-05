import type { Metadata } from 'next';

import { PageHero } from '@/components/common/page-hero';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { ProjectGrid } from '@/components/work/project-grid';

import { paths } from '@/constants/paths';
import {
  getCategories,
  getShowcaseProjectsLocalised,
} from '@/data/projects';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects from Feinwerks Software: marketplaces, SaaS platforms, AI agents and websites, each with the problem, the approach and the measured result.',
  alternates: { canonical: paths.work },
};

export default async function WorkPage() {
  const dict = await getDictionary();
  const t = dict.work;
  const showcase = getShowcaseProjectsLocalised(dict.locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: t.kicker, href: paths.work },
        ]}
      />
      <PageHero
        kicker={t.kicker}
        title={t.title}
        description={t.description}
        size='lg'
      />
      <section className='fw-container pb-10'>
        <ProjectGrid
          projects={showcase}
          categories={getCategories(showcase)}
          labels={t.filters}
          filterLabel={t.filterLabel}
          actionLabel={t.view}
          countTemplate={t.count}
        />
      </section>
      <CtaBanner dict={dict} />
    </>
  );
}
