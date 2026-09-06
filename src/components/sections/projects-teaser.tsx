'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || listed.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % listed.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [listed.length, reduce]);

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
          <Reveal delay={0.3} className='mt-9 max-sm:flex max-sm:justify-center'>
            <Link
              href={paths.work}
              className='fw-btn fw-btn-primary inline-flex h-16 items-center gap-3 px-8 font-mono text-xs font-semibold uppercase tracking-[0.22em] shadow-[0_16px_30px_-18px_hsl(var(--brand-strong))]'
            >
              {t.cta}
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Reveal>
        </div>

        <div className='self-end'>
          <Reveal>
            <p className='fw-kicker text-[10px]'>{t.listLabel}</p>
          </Reveal>
          <Stagger className='mt-5 grid gap-2 sm:block sm:border-t sm:border-line'>
            {listed.map((project, index) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={paths.caseStudy(project.slug)}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  className={`group flex items-center gap-3 rounded-lg border px-4 py-3.5 transition-all duration-500 sm:items-baseline sm:gap-5 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:px-0 sm:py-4 ${
                    activeIndex === index
                      ? 'border-brand-2 bg-brand-soft text-ink shadow-[inset_0_0_0_1px_hsl(var(--brand-2)/0.35)]'
                      : 'border-line bg-surface hover:border-brand/60 hover:bg-brand-soft'
                  }`}
                >
                  <span className='font-mono text-[11px] tabular-nums text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span
                      className={`block text-base font-medium leading-snug transition-colors sm:text-lg ${
                        activeIndex === index
                          ? 'text-ink'
                          : 'text-foreground group-hover:text-brand-text'
                      }`}
                    >
                      {project.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={`h-4 w-4 shrink-0 sm:-translate-x-1 sm:transition-all sm:group-hover:translate-x-0 ${
                      activeIndex === index
                        ? 'text-ink'
                        : 'text-brand-text sm:text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100'
                    }`}
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
