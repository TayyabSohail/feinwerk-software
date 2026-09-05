'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { LaptopFrame } from '@/components/mockups/laptop-frame';
import { ProjectScreen } from '@/components/mockups/project-screen';
import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import { getProjectBySlug } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface TestimonialsProps {
  dict: Dictionary;
  className?: string;
}

const AUTO_MS = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Light band. One quote at a time on the left, the product it is about on a
 * laptop on the right. Auto-advances, pauses on hover, draggable on touch.
 */
export function Testimonials({ dict, className }: TestimonialsProps) {
  const t = dict.testimonials;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || reduce || total < 2) return;
    const timer = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduce, go, total]);

  if (total === 0) return null;

  const item = testimonials[index];
  const project = item.project ? getProjectBySlug(item.project) : null;

  return (
    <section className={cn('fw-section fw-rule fw-band-white', className)}>
      <div className='fw-container'>
        <div className='grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end'>
          <div>
            <Reveal>
              <p className='fw-kicker'>{t.kicker}</p>
            </Reveal>
            <TextReveal
              as='h2'
              text={t.title}
              className='fw-display mt-5 text-display-md text-ink'
            />
          </div>
          <Reveal delay={0.15} className='flex flex-col gap-5 md:items-end'>
            <p className='max-w-md text-base leading-relaxed text-muted-foreground md:text-right md:text-lg'>
              {t.description}
            </p>
            <Link href={paths.work} className='fw-action'>
              {t.read} <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Reveal>
        </div>

        <Reveal className='fw-card fw-spot mt-14 grid overflow-hidden lg:grid-cols-[1fr_0.75fr]'>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className='contents'
          >
            {/* Quote */}
            <div className='relative z-[2] flex flex-col p-8 sm:p-10 lg:p-12'>
              <Quote className='h-7 w-7 text-brand' />
              <div className='relative mt-6 min-h-[14rem]'>
                <AnimatePresence mode='wait' custom={direction} initial={false}>
                  <motion.blockquote
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: 40 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 * direction }}
                    transition={{ duration: 0.5, ease }}
                    drag={reduce ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1);
                      if (info.offset.x > 60) go(-1);
                    }}
                    className='cursor-grab active:cursor-grabbing'
                  >
                    <p className='fw-display text-2xl leading-[1.25] text-ink sm:text-3xl'>
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className='mt-8 flex flex-wrap items-center justify-between gap-4'>
                      <div>
                        <p className='font-semibold text-ink'>{item.author}</p>
                        <p className='text-sm text-muted-foreground'>
                          {item.company}
                        </p>
                      </div>
                      {item.result && (
                        <p className='font-mono text-[10px] uppercase tracking-[0.18em] text-brand-text'>
                          {item.result}
                        </p>
                      )}
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className='mt-10 flex items-center justify-between border-t pt-6'>
                <div className='flex gap-1.5'>
                  {testimonials.map((_, dot) => (
                    <button
                      key={dot}
                      type='button'
                      aria-label={`${dot + 1} / ${total}`}
                      onClick={() => {
                        setDirection(dot > index ? 1 : -1);
                        setIndex(dot);
                      }}
                      className={cn(
                        'h-[3px] transition-all duration-500',
                        dot === index
                          ? 'w-8 bg-brand'
                          : 'w-3 bg-ink/15 hover:bg-ink/40',
                      )}
                    />
                  ))}
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={() => go(-1)}
                    aria-label={t.prev}
                    className='flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-brand hover:text-brand-text'
                  >
                    <ArrowLeft className='h-4 w-4' />
                  </button>
                  <button
                    type='button'
                    onClick={() => go(1)}
                    aria-label={t.next}
                    className='fw-btn fw-btn-primary flex h-11 w-11 items-center justify-center'
                  >
                    <ArrowRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>

            {/* Product on a laptop */}
            <div
              className='fw-plate relative z-[2] flex min-h-[22rem] flex-col justify-center border-t p-8 lg:border-l lg:border-t-0'
              style={
                {
                  '--plate-accent': `${project?.accent ?? '#10b981'}66`,
                } as React.CSSProperties
              }
            >
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={project?.slug ?? index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease }}
                  className='relative'
                >
                  {project && (
                    <>
                      <LaptopFrame>
                        <ProjectScreen
                          project={project}
                          variant='laptop'
                          sizes='(min-width: 1024px) 34vw, 90vw'
                        />
                      </LaptopFrame>
                      <div className='mt-6 flex items-end justify-between gap-4 text-white'>
                        <div>
                          <p className='font-mono text-[9px] uppercase tracking-[0.2em] text-white/50'>
                            {project.category} &middot; {project.year}
                          </p>
                          <p className='fw-display mt-1 text-xl'>
                            {project.title}
                          </p>
                        </div>
                        <Link
                          href={paths.caseStudy(project.slug)}
                          className='fw-action text-brand-2 hover:text-white'
                        >
                          {t.caseStudy} <ArrowUpRight className='h-3.5 w-3.5' />
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
