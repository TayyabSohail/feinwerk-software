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
 * The one device treatment every project gets: web products sit on a laptop
 * with a phone in front; app products show two phones. Both stand on a dark
 * plate tinted with the project colour. Phones are sized from the plate's
 * height so they never overflow, whatever aspect the plate is given.
 */
export function ProjectMockup({
  project,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  centered,
}: ProjectMockupProps) {
  const isApp = project.platform === 'app';

  return (
    <div
      className={cn('fw-plate aspect-[16/11] w-full', className)}
      style={{ '--plate-accent': `${project.accent}66` } as React.CSSProperties}
    >
      {isApp ? (
        <>
          <div className='absolute left-[22%] top-[6%] aspect-[390/844] h-[82%] -rotate-[4deg] opacity-90'>
            <PhoneFrame className='h-full w-auto shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)]'>
              <ProjectScreen project={project} variant='phone-alt' />
            </PhoneFrame>
          </div>
          <div className='absolute left-[47%] top-[12%] aspect-[390/844] h-[84%] rotate-[3deg]'>
            <PhoneFrame className='h-full w-auto shadow-[0_50px_80px_-25px_rgba(0,0,0,0.9)]'>
              <ProjectScreen
                project={project}
                variant='phone'
                priority={priority}
              />
            </PhoneFrame>
          </div>
        </>
      ) : (
        <>
          <div
            className={cn(
              'absolute',
              centered
                ? 'inset-x-[9%] top-1/2 -translate-y-1/2'
                : 'inset-x-[6%] top-[7%]',
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
              'absolute',
              centered
                ? 'right-[6%] top-1/2 w-[16%] translate-y-[-22%]'
                : 'bottom-[6%] right-[5%] w-[18%]',
            )}
          >
            <PhoneFrame className='shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)]'>
              <ProjectScreen project={project} variant='phone' />
            </PhoneFrame>
          </div>
        </>
      )}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent'
      />
    </div>
  );
}
