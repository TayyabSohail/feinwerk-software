'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { LaptopFrame } from '@/components/mockups/laptop-frame';
import { PhoneFrame } from '@/components/mockups/phone-frame';
import { ProjectScreen } from '@/components/mockups/project-screen';
import { Tilt } from '@/components/motion/tilt';

import { cn } from '@/lib/utils';

import { projects } from '@/data/projects';

interface HeroDevicesProps {
  liveLabel: string;
  privateLabel: string;
}

const ease = [0.16, 1, 0.3, 1] as const;
const INTERVAL_MS = 4500;

/**
 * Every shipped product, one after another, on a laptop and a phone. The
 * screens cross-fade every few seconds. Nothing sits on top of the desktop
 * view: the status chip rides the laptop base and the caption lives below.
 */
export function HeroDevices({ liveLabel, privateLabel }: HeroDevicesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yLaptop = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % projects.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduce]);

  const project = projects[index];
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : null;

  return (
    <div ref={ref} className='relative mx-auto w-full max-w-[760px]'>
      <div className='relative pt-4'>
        <div
          aria-hidden='true'
          className='absolute inset-x-[10%] top-[20%] -z-10 h-[60%] rounded-full blur-[90px] transition-colors duration-1000'
          style={{ background: `${project.accent}55` }}
        />

        <motion.div
          style={{ y: yLaptop }}
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
          className='w-[90%]'
        >
          <Tilt max={5} lift={4}>
            <LaptopFrame>
              <AnimatePresence mode='sync' initial={false}>
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className='absolute inset-0'
                >
                  <ProjectScreen
                    project={project}
                    variant='laptop'
                    priority={index === 0}
                    sizes='(min-width: 1024px) 46vw, 90vw'
                  />
                </motion.div>
              </AnimatePresence>
            </LaptopFrame>
          </Tilt>
        </motion.div>

        <motion.div
          style={{ y: yPhone }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.75 }}
          className='absolute -bottom-3 right-0 w-[24%] sm:w-[22%]'
        >
          <Tilt max={8} lift={4}>
            <PhoneFrame>
              <AnimatePresence mode='sync' initial={false}>
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className='absolute inset-0'
                >
                  <ProjectScreen project={project} variant='phone' />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </Tilt>
        </motion.div>

        {/* Status chip on the laptop base */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className='fw-glass absolute -left-2 bottom-[3%] flex items-center gap-3 px-4 py-2.5 sm:-left-6'
        >
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-brand' />
          </span>
          <AnimatePresence mode='wait' initial={false}>
            <motion.span
              key={project.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className='font-mono text-[10px] uppercase tracking-[0.18em] text-ink'
            >
              {host
                ? `${liveLabel} · ${host}`
                : `${privateLabel} · ${project.title}`}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Caption: what is on screen, and where we are in the sequence */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.35 }}
        className='mt-9 flex items-end justify-between gap-6 border-t border-ink/10 pt-4'
      >
        <div className='min-w-0'>
          <p className='font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground'>
            {project.category} &middot; {project.year}
          </p>
          <AnimatePresence mode='wait' initial={false}>
            <motion.p
              key={project.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className='fw-display mt-1 truncate text-xl text-ink'
            >
              {project.title}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className='flex shrink-0 gap-1.5 pb-2'>
          {projects.map((item, dot) => (
            <button
              key={item.slug}
              type='button'
              aria-label={item.title}
              onClick={() => setIndex(dot)}
              className={cn(
                'h-[3px] transition-all duration-500',
                dot === index
                  ? 'w-7 bg-brand'
                  : 'w-2.5 bg-ink/20 hover:bg-ink/50',
              )}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
