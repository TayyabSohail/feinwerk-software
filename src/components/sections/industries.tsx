import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/common/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import { INDUSTRY_IDS, industryProjects } from '@/data/industries';
import { getProjectBySlugLocalised, type Project } from '@/data/projects';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface IndustriesProps {
  dict: Dictionary;
}

/**
 * An index of industries: number, name, what we ship there, and the case
 * studies that prove it. Two hairline columns on desktop, one on mobile.
 */
export function Industries({ dict }: IndustriesProps) {
  const t = dict.industries;

  return (
    <section className='fw-section fw-rule fw-band-stone' data-rail={t.kicker}>
      <div className='fw-container'>
        <SectionHeading
          kicker={t.kicker}
          title={t.title}
          description={t.description}
        />

        <Stagger stagger={0.06} className='mt-14 grid border-b lg:grid-cols-2'>
          {INDUSTRY_IDS.map((id, index) => {
            const item = t.items[id];
            const proofs = industryProjects[id]
              .map((slug) => getProjectBySlugLocalised(slug, dict.locale))
              .filter((project): project is Project => Boolean(project));

            return (
              <StaggerItem
                key={id}
                className={cn(
                  'border-t py-7 sm:py-8',
                  index % 2 === 0 ? 'lg:border-r lg:pr-12' : 'lg:pl-12',
                )}
              >
                <div className='min-w-0'>
                  <h3 className='fw-display text-3xl text-ink sm:text-4xl'>
                    {item.name}
                  </h3>
                  <p className='mt-2 max-w-md text-base leading-relaxed text-muted-foreground'>
                    {item.blurb}
                  </p>
                  <p className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em]'>
                    <span className='text-ink/40'>{t.shipped}</span>
                    {proofs.map((project) => (
                      <Link
                        key={project.slug}
                        href={paths.caseStudy(project.slug)}
                        className='fw-link inline-flex items-center gap-1 text-ink transition-colors hover:text-brand-text'
                      >
                        {project.title}
                        <ArrowUpRight className='h-3 w-3' />
                      </Link>
                    ))}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
