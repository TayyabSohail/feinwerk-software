'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ProjectMockup } from '@/components/mockups/project-mockup';
import { Tilt } from '@/components/motion/tilt';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Project, ProjectCategory } from '@/data/projects';

interface ProjectShowcaseProps {
  projects: Project[];
  categories: ProjectCategory[];
  labels: Record<string, string>;
  filterLabel: string;
  actionLabel: string;
}

type Filter = 'All' | ProjectCategory;

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Chip category filters, then every project on a device mockup.
 * The first tile (and the last, when the count is even) is a lead: full
 * width, mockup beside the copy.
 */
export function ProjectShowcase({
  projects,
  categories,
  labels,
  filterLabel,
  actionLabel,
}: ProjectShowcaseProps) {
  const [active, setActive] = useState<Filter>('All');
  const reduce = useReducedMotion();
  const filters: Filter[] = useMemo(() => ['All', ...categories], [categories]);

  const visible = useMemo(
    () =>
      active === 'All'
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  const isLead = (index: number) =>
    index === 0 || (index === visible.length - 1 && visible.length % 2 === 0);

  return (
    <>
      {/* Same compact chip filters as the projects page, at every width. */}
      <div
        role='group'
        aria-label={filterLabel}
        className='flex flex-wrap gap-1.5'
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type='button'
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                'border px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors sm:px-4 sm:py-2.5 sm:text-[11px]',
                isActive
                  ? 'border-ink bg-ink text-white'
                  : 'border-ink/15 bg-background text-ink/70 hover:bg-brand-soft hover:text-ink',
              )}
            >
              {labels[filter] ?? filter}
            </button>
          );
        })}
      </div>

      <motion.div layout className='mt-12 grid gap-6 lg:grid-cols-2'>
        <AnimatePresence mode='popLayout' initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.6,
                ease,
                delay: Math.min(index, 5) * 0.05,
              }}
              className={cn(isLead(index) && 'lg:col-span-2')}
            >
              <ProjectTile
                project={project}
                index={index}
                lead={isLead(index)}
                actionLabel={actionLabel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

const VISIBLE_TECH = 5;

function ProjectTile({
  project,
  index,
  lead,
  actionLabel,
}: {
  project: Project;
  index: number;
  lead: boolean;
  actionLabel: string;
}) {
  const visibleTech = project.tech.slice(0, VISIBLE_TECH);
  const overflow = project.tech.length - visibleTech.length;

  return (
    <div className='fw-halo h-full'>
      <Link
        href={paths.caseStudy(project.slug)}
        aria-label={`${project.title}: ${project.tagline}`}
        className={cn(
          'fw-card fw-card-link fw-spot group flex h-full flex-col',
          lead && 'lg:flex-row lg:items-stretch',
        )}
      >
        <div className={cn('relative', lead && 'lg:w-[58%] lg:self-stretch')}>
          <Tilt max={4} lift={0} className='h-full'>
            <ProjectMockup
              project={project}
              priority={index < 2}
              centered={lead}
              sizes={
                lead
                  ? '(min-width: 1024px) 60vw, 100vw'
                  : '(min-width: 1024px) 45vw, 100vw'
              }
              className={cn(
                lead && 'lg:aspect-auto lg:h-full lg:min-h-[30rem]',
              )}
            />
          </Tilt>
          <span className='absolute left-5 top-5 z-10 inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-md'>
            <span aria-hidden='true' className='h-px w-3 bg-brand' />
            {project.category}
          </span>
        </div>

        <div
          className={cn(
            'relative z-[2] flex flex-1 flex-col p-6 sm:p-7',
            lead && 'lg:border-l lg:p-10',
          )}
        >
          <p className='font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
            {project.client} &middot; {project.year}
          </p>
          <h3
            className={cn(
              'fw-display mt-3 text-ink transition-colors duration-300 group-hover:text-brand-text',
              lead ? 'text-display-sm' : 'text-2xl',
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'mt-2 leading-relaxed text-muted-foreground',
              lead ? 'text-base sm:text-lg' : 'text-sm',
            )}
          >
            {lead ? project.description : project.tagline}
          </p>

          <ul className='mt-5 flex flex-wrap items-center gap-1.5'>
            {project.capabilities.map((capability) => (
              <li
                key={capability}
                className='inline-flex items-center gap-1.5 border border-ink/10 bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/70 transition-colors group-hover:border-brand/40'
              >
                <span aria-hidden='true' className='h-1 w-1 bg-brand' />
                {capability}
              </li>
            ))}
          </ul>

          <ul className='mt-5 flex flex-wrap items-center gap-1.5 border-t pt-5'>
            {visibleTech.map((tech) => {
              const { icon: Icon, color } = getTechMeta(tech);
              return (
                <li
                  key={tech}
                  className='inline-flex items-center gap-1.5 border border-ink/10 bg-surface-2 px-2 py-1 text-xs text-ink/70'
                >
                  <Icon
                    aria-hidden='true'
                    className='h-3.5 w-3.5 shrink-0'
                    style={{
                      color: color === 'currentColor' ? undefined : color,
                    }}
                  />
                  {tech}
                </li>
              );
            })}
            {overflow > 0 && (
              <li className='inline-flex items-center border border-ink/10 bg-surface-2 px-2 py-1 text-xs text-ink/70'>
                +{overflow}
              </li>
            )}
          </ul>

          <span className='mt-auto flex items-center justify-between pt-7 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-300 group-hover:text-brand-text'>
            <span className='inline-flex items-center gap-2.5'>
              <span
                aria-hidden='true'
                className='h-px w-4 bg-brand transition-[width] duration-300 group-hover:w-8'
              />
              {actionLabel}
            </span>
            <span className='flex h-9 w-9 shrink-0 items-center justify-center border border-brand/40 bg-brand/[0.08] text-brand-text transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white'>
              <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
