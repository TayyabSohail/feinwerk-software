'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ProjectMockup } from '@/components/mockups/project-mockup';
import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { paths } from '@/constants/paths';
import { getShowcaseProjectsLocalised } from '@/data/projects';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface ProjectsTeaserProps {
  dict: Dictionary;
}

const AUTO_MS = 3000;

/**
 * A compact featured-project showcase with the real product screens on
 * devices, linked to the full case studies on /work.
 */
export function ProjectsTeaser({ dict }: ProjectsTeaserProps) {
  const t = dict.work.teaser;
  const showcase = getShowcaseProjectsLocalised(dict.locale);
  const listed = showcase;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || listed.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % listed.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [listed.length, paused, reduce]);

  const activeProject = listed[activeIndex];
  const move = (delta: number) => {
    setActiveIndex(
      (current) => (current + delta + listed.length) % listed.length,
    );
  };

  return (
    <section
      id='work'
      data-rail={t.kicker}
      className='fw-section fw-rule fw-band-white'
    >
      <div className='fw-container'>
        <div className='relative overflow-hidden sm:p-8 lg:p-12'>
          <div className='grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12'>
            <div className='flex max-w-xl flex-col lg:h-full lg:justify-self-start'>
              <Reveal>
                <p className='fw-kicker'>{t.kicker}</p>
              </Reveal>
              <TextReveal
                as='h2'
                text={t.title}
                accentWords={[...t.accent]}
                className='fw-display mt-5 text-display-lg text-foreground'
              />
              <Reveal delay={0.2}>
                <p className='mt-5 text-sm leading-relaxed text-muted-foreground md:text-base'>
                  {t.body}
                </p>
              </Reveal>
              <Reveal
                delay={0.3}
                className='mt-7 max-sm:flex max-sm:justify-center sm:mt-9 lg:mt-auto lg:pt-10'
              >
                <Link
                  href={paths.work}
                  className='fw-btn fw-btn-primary inline-flex h-16 items-center gap-3 px-8 font-mono text-xs font-semibold uppercase tracking-[0.22em] shadow-[0_16px_30px_-18px_hsl(var(--brand-strong))]'
                >
                  {t.cta}
                  <ArrowUpRight className='h-4 w-4' />
                </Link>
              </Reveal>
            </div>

            <div
              className='min-w-0 self-end lg:w-full lg:justify-self-end'
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <Reveal>
                <p className='fw-kicker text-[11px] sm:text-xs'>
                  {t.listLabel}
                </p>
              </Reveal>
              {activeProject && (
                <>
                  <div className='relative mt-3 aspect-[16/9] min-w-0 overflow-hidden border border-line bg-ink sm:mt-4'>
                    <AnimatePresence mode='wait' initial={false}>
                      <motion.div
                        key={activeProject.slug}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className='absolute inset-0'
                      >
                        <Link
                          href={paths.caseStudy(activeProject.slug)}
                          aria-label={`${activeProject.title}: ${activeProject.tagline}`}
                          className='group block h-full min-w-0'
                        >
                          <ProjectMockup
                            project={activeProject}
                            priority={activeIndex === 0}
                            className='aspect-auto h-full w-full'
                            sizes='(min-width: 1024px) 43vw, 100vw'
                          />
                        </Link>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className='mt-3 border-t border-line pt-3 sm:mt-4 sm:pt-4'>
                    <div className='flex flex-col gap-3'>
                      <Link
                        href={paths.caseStudy(activeProject.slug)}
                        className='group min-w-0'
                      >
                        <h3 className='fw-display min-w-0 text-lg text-foreground transition-colors group-hover:text-brand-text sm:text-xl'>
                          {activeProject.title}
                        </h3>
                      </Link>
                      <div className='flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between'>
                        <div className='flex min-w-0 flex-1 items-baseline gap-3 border-l-2 border-brand px-4 py-1 sm:gap-4 sm:px-5 sm:py-1.5'>
                          <span className='fw-display text-3xl leading-none text-brand-text sm:text-4xl'>
                            {activeProject.headline.value}
                          </span>
                          <span className='max-w-[22ch] text-xs font-semibold leading-snug text-ink sm:text-sm'>
                            {activeProject.headline.label}
                          </span>
                        </div>
                        <div className='flex shrink-0 gap-2 sm:items-center'>
                          <button
                            type='button'
                            onClick={() => move(-1)}
                            aria-label='Previous featured project'
                            className='flex h-10 w-10 items-center justify-center border border-line text-foreground transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand-text'
                          >
                            <ArrowLeft className='h-4 w-4' />
                          </button>
                          <button
                            type='button'
                            onClick={() => move(1)}
                            aria-label='Next featured project'
                            className='flex h-10 w-10 items-center justify-center bg-ink text-white transition-colors hover:bg-brand'
                          >
                            <ArrowRight className='h-4 w-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='mt-3 flex items-center gap-4 sm:mt-4'>
                      <div
                        className='relative h-1 min-w-0 flex-1 overflow-hidden bg-line'
                        role='progressbar'
                        aria-label='Featured project rotation progress'
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <span
                          key={activeProject.slug}
                          className='absolute inset-y-0 left-0 w-0 animate-[fw-project-progress_3s_linear] bg-brand'
                          style={{
                            animationPlayState: paused ? 'paused' : 'running',
                          }}
                        />
                      </div>
                      <span className='shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                        Featured work
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
