import Image from 'next/image';

import { BrowserFrame } from '@/components/mockups/browser-frame';

import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

interface ProjectVisualProps {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Fixed aspect for grid cards; the natural ratio is used otherwise. */
  aspect?: string;
}

/**
 * Presents a project cover in the treatment its `visual` type calls for:
 * device renders float, screenshots get a browser frame, marks sit on a
 * patterned plate, posters fill the frame.
 */
export function ProjectVisual({
  project,
  priority,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  aspect,
}: ProjectVisualProps) {
  const alt = `${project.title} cover`;

  if (project.visual === 'screenshot') {
    return (
      <BrowserFrame
        src={project.coverImage}
        alt={alt}
        width={project.coverWidth}
        height={project.coverHeight}
        url={project.liveUrl}
        accent={project.accent}
        priority={priority}
        sizes={sizes}
        className={className}
        aspect={aspect}
      />
    );
  }

  if (project.visual === 'render') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-none',
          aspect ?? 'aspect-[4/3]',
          className,
        )}
      >
        <Image
          src={project.coverImage}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className='object-cover'
        />
      </div>
    );
  }

  if (project.visual === 'poster') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-none border border-line',
          aspect ?? 'aspect-[40/21]',
          className,
        )}
      >
        <Image
          src={project.coverImage}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className='object-cover'
        />
      </div>
    );
  }

  // mark
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-none border border-line bg-surface-2',
        aspect ?? 'aspect-[4/3]',
        className,
      )}
    >
      <div
        aria-hidden='true'
        className='absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'
        style={{ background: project.accent, opacity: 0.22 }}
      />
      <div className='relative h-[56%] w-[56%]'>
        <Image
          src={project.coverImage}
          alt={alt}
          fill
          sizes='40vw'
          priority={priority}
          className='object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]'
        />
      </div>
    </div>
  );
}
