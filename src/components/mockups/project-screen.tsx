import Image from 'next/image';

import type { Project } from '@/data/projects';

interface ProjectScreenProps {
  project: Project;
  /** Which capture to show. `phone-alt` falls back to the main phone screen. */
  variant: 'laptop' | 'phone' | 'phone-alt';
  priority?: boolean;
  sizes?: string;
}

/**
 * The product on a device screen. Every project has real captures at the
 * device's own resolution, so nothing is zoomed, cropped or upscaled: the
 * image simply fills the screen from the top.
 */
export function ProjectScreen({
  project,
  variant,
  priority,
  sizes,
}: ProjectScreenProps) {
  const { screens } = project;
  const src =
    variant === 'laptop'
      ? screens.desktop
      : variant === 'phone-alt'
        ? (screens.mobileAlt ?? screens.mobile)
        : screens.mobile;

  return (
    <Image
      src={src}
      alt={`${project.title} on a ${variant === 'laptop' ? 'laptop' : 'phone'}`}
      fill
      sizes={
        sizes ?? (variant === 'laptop' ? '(min-width: 1024px) 40vw, 90vw' : '240px')
      }
      priority={priority}
      className='object-cover object-top'
    />
  );
}
