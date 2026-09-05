import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { paths } from '@/constants/paths';
import { getShowcaseProjectsLocalised } from '@/data/projects';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface ProjectsTeaserProps {
  dict: Dictionary;
}

/** How many project names the homepage lists before pointing to the page. */
const LISTED = 6;

/**
 * A pointer to the projects page, not the projects themselves.
 *
 * The homepage used to carry every product on a device mockup, which made
 * it long and left the projects page with nothing of its own. Now the
 * homepage says what is there and how much, names a few, and sends people
 * over. The mockups, filters and case studies all live on /work.
 */
export function ProjectsTeaser({ dict }: ProjectsTeaserProps) {
  const t = dict.work.teaser;
  const showcase = getShowcaseProjectsLocalised(dict.locale);
  const listed = showcase.slice(0, LISTED);
  const remaining = showcase.length - listed.length;

  return (
    <section id='work' className='fw-section fw-rule fw-band-white'>
      <div className='fw-container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20'>
        <div className='max-w-xl'>
          <Reveal>
            <p className='fw-kicker'>{t.kicker}</p>
          </Reveal>
          <TextReveal
            as='h2'
            text={t.title}
            accentWords={[...t.accent]}
            className='fw-display mt-5 text-display-md text-foreground'
          />
          <Reveal delay={0.2}>
            <p className='mt-6 text-base leading-relaxed text-muted-foreground md:text-lg'>
              {t.body}
            </p>
          </Reveal>
          <Reveal delay={0.3} className='mt-9'>
            <Link
              href={paths.work}
              className='fw-btn fw-btn-ink inline-flex h-14 items-center gap-3 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]'
            >
              {t.cta}
              <span className='h-2.5 w-2.5 bg-brand' />
            </Link>
          </Reveal>
        </div>

        <div className='self-end'>
          <Reveal>
            <p className='fw-kicker text-[10px]'>{t.listLabel}</p>
          </Reveal>
          <Stagger className='mt-5 border-t border-line'>
            {listed.map((project, index) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={paths.caseStudy(project.slug)}
                  className='group flex items-baseline gap-5 border-b border-line py-4'
                >
                  <span className='font-mono text-[11px] tabular-nums text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='min-w-0 flex-1 text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-brand-text'>
                    {project.title}
                  </span>
                  <span className='hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block'>
                    {dict.work.filters[project.category]}
                  </span>
                  <ArrowUpRight className='h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100' />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          {remaining > 0 && (
            <Reveal delay={0.2}>
              <Link
                href={paths.work}
                className='fw-link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground'
              >
                {t.more.replace('{n}', String(remaining))}
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
