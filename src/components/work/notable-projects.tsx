import { SectionHeading } from '@/components/common/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { ProjectCard } from '@/components/work/project-card';

import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

interface NotableProjectsProps {
  /** Projects flagged `notable` in data/projects.ts. */
  projects: Project[];
  kicker: string;
  title: string;
  description: string;
  actionLabel: string;
  className?: string;
}

/**
 * The "Notable projects" band: smaller builds, apps and side projects that
 * sit apart from the main showcase but still get the same card and their
 * own case-study page. Renders nothing when no project carries the flag.
 */
export function NotableProjects({
  projects,
  kicker,
  title,
  description,
  actionLabel,
  className,
}: NotableProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id='notable'
      aria-labelledby='notable-heading'
      className={cn('fw-section fw-rule fw-band-stone', className)}
    >
      <div className='fw-container'>
        <SectionHeading
          kicker={kicker}
          title={title}
          description={description}
        />
        <Stagger className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                project={project}
                actionLabel={actionLabel}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
