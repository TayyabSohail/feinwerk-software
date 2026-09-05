'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { ProjectCard } from '@/components/work/project-card';

import { cn } from '@/lib/utils';

import {
  CAPABILITY_ORDER,
  type Project,
  type ProjectCapability,
  type ProjectCategory,
} from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
  categories: ProjectCategory[];
  labels: Record<string, string>;
  filterLabel: string;
  actionLabel: string;
  countTemplate: string;
}

type Filter = 'All' | ProjectCategory | ProjectCapability;

/**
 * Filter chips over a three-column masonry of project tiles. Items are
 * distributed across columns so the flow reads left-to-right, top-to-bottom.
 */
export function ProjectGrid({
  projects,
  categories,
  labels,
  filterLabel,
  actionLabel,
  countTemplate,
}: ProjectGridProps) {
  const [active, setActive] = useState<Filter>('All');
  const reduce = useReducedMotion();

  const filters: Filter[] = useMemo(
    () => [
      'All',
      ...categories,
      ...CAPABILITY_ORDER.filter(
        (capability) => !(categories as string[]).includes(capability),
      ),
    ],
    [categories],
  );

  const visible = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter(
      (project) =>
        project.category === active ||
        project.capabilities.includes(active as ProjectCapability),
    );
  }, [active, projects]);

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div
          role='group'
          aria-label={filterLabel}
          className='flex max-w-full gap-px overflow-x-auto border border-ink/15 bg-ink/15 p-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
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
                  'shrink-0 whitespace-nowrap px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition',
                  isActive
                    ? 'bg-ink text-white'
                    : 'bg-background text-ink/70 hover:bg-brand-soft hover:text-ink',
                )}
              >
                {labels[filter] ?? filter}
              </button>
            );
          })}
        </div>
        <p
          aria-live='polite'
          className='font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'
        >
          {countTemplate.replace('{n}', String(visible.length))}
        </p>
      </div>

      <MasonryColumns
        key={active}
        projects={visible}
        columnCount={1}
        className='mt-10 flex flex-col gap-6 sm:hidden'
        actionLabel={actionLabel}
        reduce={Boolean(reduce)}
      />
      <MasonryColumns
        key={`${active}-2`}
        projects={visible}
        columnCount={2}
        className='mt-10 hidden gap-6 sm:grid sm:grid-cols-2 lg:hidden'
        actionLabel={actionLabel}
        reduce={Boolean(reduce)}
      />
      <MasonryColumns
        key={`${active}-3`}
        projects={visible}
        columnCount={3}
        className='mt-10 hidden gap-6 lg:grid lg:grid-cols-3'
        actionLabel={actionLabel}
        reduce={Boolean(reduce)}
      />
    </>
  );
}

function MasonryColumns({
  projects,
  columnCount,
  className,
  actionLabel,
  reduce,
}: {
  projects: Project[];
  columnCount: number;
  className: string;
  actionLabel: string;
  reduce: boolean;
}) {
  return (
    <div className={className}>
      {Array.from({ length: columnCount }, (_, columnIndex) => (
        <div key={columnIndex} className='flex min-w-0 flex-col gap-6'>
          {projects
            .filter((_, index) => index % columnCount === columnIndex)
            .map((project, index) => {
              const visualIndex = columnIndex + index * columnCount;
              return (
                <motion.div
                  key={project.slug}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (index % 3) * 0.06,
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={visualIndex}
                    priority={visualIndex < 3}
                    actionLabel={actionLabel}
                  />
                </motion.div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
