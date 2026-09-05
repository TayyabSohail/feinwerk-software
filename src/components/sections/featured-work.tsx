import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/common/section-heading';
import { ProjectShowcase } from '@/components/work/project-showcase';

import { paths } from '@/constants/paths';
import { getCategories, projects } from '@/data/projects';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface FeaturedWorkProps {
  dict: Dictionary;
}

/** Every project on a device mockup, with tab filters. */
export function FeaturedWork({ dict }: FeaturedWorkProps) {
  const t = dict.work;

  return (
    <section id='work' className='fw-section fw-rule fw-band-white'>
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
          aside={
            <Link href={paths.work} className='fw-action'>
              {t.all} <ArrowUpRight className='h-4 w-4' />
            </Link>
          }
        />

        <div className='mt-12'>
          <ProjectShowcase
            projects={projects}
            categories={getCategories()}
            labels={t.filters}
            filterLabel={t.filterLabel}
            actionLabel={t.view}
          />
        </div>
      </div>
    </section>
  );
}
