import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

interface ProjectScreenProps {
  project: Project;
  /** Laptop screens show the desktop view; phone screens the mobile view. */
  variant: 'laptop' | 'phone';
  priority?: boolean;
  sizes?: string;
}

/**
 * What appears on a device screen for a given project.
 *
 * Products with device-native captures (`project.screens`) show the real
 * desktop and mobile views edge to edge. Everything else gets a generated
 * screen: posters fill the laptop, logo-only projects get a splash, and the
 * phone always shows a mobile splash built from the artwork.
 */
export function ProjectScreen({
  project,
  variant,
  priority,
  sizes = '(min-width: 1024px) 40vw, 90vw',
}: ProjectScreenProps) {
  if (project.screens) {
    const isPhone = variant === 'phone';
    return (
      <Image
        src={isPhone ? project.screens.mobile : project.screens.desktop}
        alt={isPhone ? '' : `${project.title} screen`}
        fill
        sizes={isPhone ? '240px' : sizes}
        priority={priority && !isPhone}
        className='object-cover object-top'
      />
    );
  }

  if (variant === 'phone') {
    return <PhoneSplash project={project} />;
  }

  if (project.visual === 'mark') {
    return <SplashScreen project={project} priority={priority} />;
  }

  if (project.visual === 'poster') {
    return (
      <Image
        src={project.coverImage}
        alt={`${project.title} screen`}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover object-center'
      />
    );
  }

  // Raw screenshots and 3D renders without captures: show the top-left of
  // the UI, zooming renders to their photographed screen.
  const focus = project.visual === 'render' ? project.screenFocus : undefined;
  const position = focus?.position ?? 'left top';
  const scale = focus?.scale ?? 1;

  return (
    <Image
      src={project.coverImage}
      alt={`${project.title} screen`}
      fill
      sizes={sizes}
      priority={priority}
      className='object-cover'
      style={{
        objectPosition: position,
        transform: `scale(${scale})`,
        transformOrigin: position,
      }}
    />
  );
}

/**
 * Laptop splash for logo-only projects: artwork centred on a dark UI shell.
 * Sized in container units so it scales with whatever device holds it.
 */
function SplashScreen({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div
      className='relative h-full w-full overflow-hidden text-white [container-type:inline-size]'
      style={{
        background: `radial-gradient(60% 70% at 50% 40%, ${project.accent}55, #0b0b0f 75%)`,
      }}
    >
      <div className='flex items-center gap-[0.8cqw] border-b border-white/10 px-[1.6cqw] py-[1cqw]'>
        <span className='h-[0.9cqw] w-[0.9cqw] rounded-full bg-white/25' />
        <span className='h-[0.9cqw] w-[0.9cqw] rounded-full bg-white/25' />
        <span className='h-[0.9cqw] w-[0.9cqw] rounded-full bg-white/25' />
        <span className='ml-[1.2cqw] h-[0.8cqw] w-[10cqw] rounded-full bg-white/10' />
        <span className='ml-auto h-[0.8cqw] w-[4cqw] rounded-full bg-white/10' />
      </div>
      <div className='absolute bottom-0 left-0 top-[3.8cqw] w-[22%] border-r border-white/10 p-[1.4cqw]'>
        {[0, 1, 2, 3, 4].map((row) => (
          <span
            key={row}
            className={cn(
              'mb-[1.2cqw] block h-[0.7cqw] rounded-full',
              row === 0 ? 'w-3/4 bg-white/40' : 'w-1/2 bg-white/10',
            )}
          />
        ))}
      </div>
      <div className='absolute inset-y-0 left-[22%] right-0 flex flex-col items-center justify-center gap-[1.4cqw] px-[3cqw]'>
        <div className='relative aspect-square w-[22cqw] overflow-hidden rounded-[18%] border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]'>
          <Image
            src={project.coverImage}
            alt=''
            fill
            sizes='20vw'
            priority={priority}
            className='object-cover'
          />
        </div>
        <p className='font-display text-[3.2cqw] font-bold tracking-tight'>
          {project.title}
        </p>
        <p className='font-mono text-[1.4cqw] uppercase tracking-[0.2em] text-white/50'>
          {project.category} &middot; {project.year}
        </p>
      </div>
    </div>
  );
}

/**
 * Phone splash for projects without a mobile capture: the artwork as an app
 * icon (logos) or a hero card (posters), the name, and a primary action in
 * the project colour. Sized in container units so it scales with the phone.
 */
function PhoneSplash({ project }: { project: Project }) {
  const isMark = project.visual === 'mark';

  return (
    <div
      className='relative h-full w-full overflow-hidden text-white [container-type:inline-size]'
      style={{
        background: `radial-gradient(90% 45% at 50% 0%, ${project.accent}66, #0b0b0f 70%)`,
      }}
    >
      <div className='absolute inset-x-0 top-[15%] flex flex-col items-center gap-[5cqw] px-[9cqw]'>
        {isMark ? (
          <div className='relative aspect-square w-[42cqw] overflow-hidden rounded-[22%] border border-white/15 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]'>
            <Image
              src={project.coverImage}
              alt=''
              fill
              sizes='160px'
              className='object-cover'
            />
          </div>
        ) : (
          <div className='relative aspect-[40/21] w-full overflow-hidden rounded-[5cqw] border border-white/15 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]'>
            <Image
              src={project.coverImage}
              alt=''
              fill
              sizes='240px'
              className='object-cover object-center'
            />
          </div>
        )}
        <p className='text-center font-display text-[8cqw] font-bold leading-tight tracking-tight'>
          {project.title}
        </p>
        <p className='-mt-[2cqw] font-mono text-[3.4cqw] uppercase tracking-[0.2em] text-white/50'>
          {project.category}
        </p>
      </div>
      <div className='absolute inset-x-[9cqw] bottom-[9%] flex flex-col gap-[3cqw]'>
        <span className='block h-[2.4cqw] w-3/4 rounded-full bg-white/15' />
        <span className='block h-[2.4cqw] w-1/2 rounded-full bg-white/10' />
        <span
          className='mt-[3cqw] block h-[12cqw] w-full rounded-[3cqw]'
          style={{ background: project.accent }}
        />
      </div>
    </div>
  );
}
