import { LaptopFrame } from '@/components/mockups/laptop-frame';
import { PhoneFrame } from '@/components/mockups/phone-frame';
import { ProjectScreen } from '@/components/mockups/project-screen';

import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

interface ProjectMockupProps {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Centre the devices vertically (lead tiles whose plate is taller). */
  centered?: boolean;
}

/**
 * The one device treatment every project gets: a laptop with the product on
 * screen and a phone in front, on a dark plate tinted with the project colour.
 */
export function ProjectMockup({
  project,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  centered,
}: ProjectMockupProps) {
  return (
    <div
      className={cn('fw-plate aspect-[16/11] w-full', className)}
      style={{ '--plate-accent': `${project.accent}66` } as React.CSSProperties}
    >
      <div
        className={cn(
          'absolute inset-x-[7%]',
          centered ? 'top-1/2 -translate-y-1/2' : 'top-[8%]',
        )}
      >
        <LaptopFrame>
          <ProjectScreen
            project={project}
            variant='laptop'
            priority={priority}
            sizes={sizes}
          />
        </LaptopFrame>
      </div>
      <div
        className={cn(
          'absolute right-[5%] w-[19%]',
          centered ? 'top-1/2 translate-y-[-28%]' : 'bottom-[5%]',
        )}
      >
        <PhoneFrame className='shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]'>
          <ProjectScreen project={project} variant='phone' />
        </PhoneFrame>
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent'
      />
    </div>
  );
}
