import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

interface ProjectScreenProps {
  project: Project;
  /** Laptop screens show the full UI; phone screens zoom into a corner. */
  variant: 'laptop' | 'phone';
  priority?: boolean;
  sizes?: string;
}

/**
 * What appears on a device screen for a given project. Screenshots are
 * shown as-is, 3D renders are zoomed to their photographed screen, posters
 * are centred, and logo-only projects get a generated splash screen.
 */
export function ProjectScreen({
  project,
  variant,
  priority,
  sizes = '(min-width: 1024px) 40vw, 90vw',
}: ProjectScreenProps) {
  if (project.visual === 'mark') {
    return variant === 'laptop' ? (
      <SplashScreen project={project} priority={priority} />
    ) : (
      <Image
        src={project.coverImage}
        alt=''
        fill
        sizes='200px'
        className='object-cover object-center'
      />
    );
  }

  const focus = project.visual === 'render' ? project.screenFocus : undefined;
  let position: string;
  let scale: number;

  if (variant === 'phone') {
    position =
      focus?.position ?? (project.visual === 'poster' ? 'center' : '0% 0%');
    scale = focus
      ? focus.scale * 1.35
      : project.visual === 'poster'
        ? 1.4
        : 1.8;
  } else {
    position =
      focus?.position ?? (project.visual === 'poster' ? 'center' : 'left top');
    scale = focus?.scale ?? 1;
  }

  return (
    <Image
      src={project.coverImage}
      alt={`${project.title} screen`}
      fill
      sizes={variant === 'phone' ? '220px' : sizes}
      priority={priority}
      className={cn('object-cover')}
      style={{
        objectPosition: position,
        transform: `scale(${scale})`,
        transformOrigin: position,
      }}
    />
  );
}

/** Splash screen for logo-only projects: artwork centred on a dark UI shell. */
function SplashScreen({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div
      className='relative h-full w-full overflow-hidden text-white'
      style={{
        background: `radial-gradient(60% 70% at 50% 40%, ${project.accent}55, #0b0b0f 75%)`,
      }}
    >
      <div className='flex items-center gap-2 border-b border-white/10 px-4 py-2'>
        <span className='h-2 w-2 rounded-full bg-white/25' />
        <span className='h-2 w-2 rounded-full bg-white/25' />
        <span className='h-2 w-2 rounded-full bg-white/25' />
        <span className='ml-3 h-2 w-24 rounded-full bg-white/10' />
        <span className='ml-auto h-2 w-10 rounded-full bg-white/10' />
      </div>
      <div className='absolute bottom-0 left-0 top-9 w-[22%] border-r border-white/10 p-3'>
        {[0, 1, 2, 3, 4].map((row) => (
          <span
            key={row}
            className={cn(
              'mb-2.5 block h-1.5 rounded-full',
              row === 0 ? 'w-3/4 bg-white/40' : 'w-1/2 bg-white/10',
            )}
          />
        ))}
      </div>
      <div className='absolute inset-y-0 left-[22%] right-0 flex flex-col items-center justify-center gap-3 px-6'>
        <div className='relative aspect-square h-[52%] overflow-hidden rounded-[18%] border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]'>
          <Image
            src={project.coverImage}
            alt=''
            fill
            sizes='20vw'
            priority={priority}
            className='object-cover'
          />
        </div>
        <p className='font-display text-[clamp(0.7rem,1.4vw,1.1rem)] font-bold tracking-tight'>
          {project.title}
        </p>
        <p className='font-mono text-[clamp(0.4rem,0.7vw,0.6rem)] uppercase tracking-[0.2em] text-white/50'>
          {project.category} &middot; {project.year}
        </p>
      </div>
    </div>
  );
}
