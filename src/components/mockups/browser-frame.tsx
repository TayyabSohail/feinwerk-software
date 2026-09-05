import Image from 'next/image';

import { cn } from '@/lib/utils';

interface BrowserFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Text shown in the address bar. */
  url?: string;
  /** Tint used for the active-tab dot; defaults to the brand colour. */
  accent?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  /** Force an aspect ratio on the viewport and crop the image to fill it. */
  aspect?: string;
}

/**
 * A macOS-style browser window drawn around a product screenshot, so raw
 * captures read as finished mockups.
 */
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  url,
  accent,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  imageClassName,
  aspect,
}: BrowserFrameProps) {
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

  return (
    <div className={cn('fw-browser', className)}>
      <div className='fw-browser-bar'>
        <span className='fw-browser-dot bg-[#ff5f57]' />
        <span className='fw-browser-dot bg-[#febc2e]' />
        <span className='fw-browser-dot bg-[#28c840]' />
        <div className='mx-auto flex h-6 w-full max-w-[60%] items-center justify-center gap-2 rounded-none border border-line bg-background/70 px-3 font-mono text-[10px] text-muted-foreground'>
          <span
            className='h-1.5 w-1.5 rounded-full'
            style={{ background: accent ?? 'hsl(var(--brand))' }}
          />
          <span className='truncate'>{host ?? 'localhost:3000'}</span>
        </div>
      </div>
      <div
        className={cn('relative w-full overflow-hidden bg-surface-2', aspect)}
        style={aspect ? undefined : { aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover object-top', imageClassName)}
        />
      </div>
    </div>
  );
}
