import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ProjectVisual } from '@/components/mockups/project-visual';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
  className?: string;
  /** Text for the footer action. */
  actionLabel?: string;
}

const VISIBLE_TECH = 4;

/**
 * Portfolio-style project tile: cover with category chip, ghosted index,
 * title, tagline, capability badges, tech chips, full-bleed action footer.
 * The whole card is the link, so it is the one card type that lifts.
 */
export function ProjectCard({
  project,
  index,
  priority,
  className,
  actionLabel = 'View project',
}: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, VISIBLE_TECH);
  const overflow = project.tech.length - visibleTech.length;
  const aspect =
    project.visual === 'poster'
      ? 'aspect-[40/21]'
      : project.visual === 'mark'
        ? 'aspect-square'
        : 'aspect-[4/3]';

  return (
    <Link
      href={paths.caseStudy(project.slug)}
      aria-label={`${project.title}: ${project.tagline}`}
      className={cn(
        'fw-card fw-card-link group relative isolate block min-w-0 max-w-full',
        className,
      )}
    >
      <div className='fw-grid-surface absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100' />

      <div className='relative border-b bg-surface-2'>
        <div className='transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]'>
          <ProjectVisual
            project={project}
            priority={priority}
            aspect={aspect}
            sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            className='rounded-none border-0'
          />
        </div>
        <span className='absolute bottom-4 left-4 inline-flex items-center gap-2 border border-ink/15 bg-white/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink backdrop-blur-md'>
          <span aria-hidden='true' className='h-px w-3 bg-brand' />
          {project.category}
        </span>
      </div>

      <div className='relative p-5 sm:p-6'>
        <span
          aria-hidden='true'
          className='absolute -top-3 right-4 -z-10 font-display text-6xl font-bold text-ink/[0.05] transition duration-300 group-hover:text-brand/15'
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className='fw-display text-2xl text-ink transition-colors duration-300 group-hover:text-brand-text'>
          {project.title}
        </h3>
        <p className='mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base'>
          {project.tagline}
        </p>

        <ul className='mt-4 flex flex-wrap items-center gap-1.5'>
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
                className='inline-flex items-center gap-1.5 border border-ink/10 bg-surface-2 px-2 py-1 text-xs text-ink/70 transition group-hover:text-ink'
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

        <span className='-mx-5 -mb-5 mt-6 flex min-h-14 items-center justify-between border-t bg-surface-2/60 px-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-300 group-hover:bg-brand/[0.08] group-hover:text-brand-text sm:-mx-6 sm:-mb-6 sm:px-6'>
          <span className='inline-flex items-center gap-2.5'>
            <span
              aria-hidden='true'
              className='h-px w-4 bg-brand transition-[width] duration-300 group-hover:w-6'
            />
            {actionLabel}
          </span>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center border border-brand/40 bg-brand/[0.08] text-brand-text transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white'>
            <ArrowUpRight
              aria-hidden='true'
              className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            />
          </span>
        </span>
      </div>
    </Link>
  );
}
