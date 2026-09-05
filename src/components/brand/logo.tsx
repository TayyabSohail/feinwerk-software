import Link from 'next/link';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

interface LogoMarkProps {
  className?: string;
  /** Renders the mark in fixed brand colours instead of theme tokens. */
  inverted?: boolean;
}

/**
 * The Feinwerks mark: an "F" built from three precision bars and a single
 * accent square, the "fine detail" the name refers to. Theme-aware by
 * default: the plate takes the foreground colour, the glyph the background.
 */
export function LogoMark({ className, inverted }: LogoMarkProps) {
  return (
    <svg
      viewBox='0 0 64 64'
      aria-hidden='true'
      className={cn('h-8 w-8', className)}
    >
      <rect
        width='64'
        height='64'
        rx='8'
        className={inverted ? 'fill-brand' : 'fill-foreground'}
      />
      <g className={inverted ? 'fill-white' : 'fill-background'}>
        <rect x='18' y='16' width='9' height='32' rx='1.5' />
        <rect x='18' y='16' width='28' height='9' rx='1.5' />
        <rect x='18' y='31' width='20' height='8' rx='1.5' />
      </g>
      <rect
        x='39'
        y='39'
        width='9'
        height='9'
        rx='1.5'
        className={inverted ? 'fill-white' : 'fill-brand'}
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the mark. */
  compact?: boolean;
  /** Wraps in a link to the homepage unless false. */
  linked?: boolean;
  markClassName?: string;
}

export function Logo({
  className,
  compact,
  linked = true,
  markClassName,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        'group/logo inline-flex items-center gap-3 text-foreground',
        className,
      )}
    >
      <LogoMark
        className={cn(
          'transition-transform duration-500 ease-out-expo group-hover/logo:-rotate-6',
          markClassName,
        )}
      />
      {!compact && (
        <span className='flex flex-col leading-none'>
          <span className='text-[15px] font-semibold tracking-[-0.02em]'>
            {siteConfig.shortName}
          </span>
          <span className='mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground'>
            Software
          </span>
        </span>
      )}
    </span>
  );

  if (!linked) return content;

  return (
    <Link
      href={paths.home}
      aria-label={`${siteConfig.name} home`}
      className='rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    >
      {content}
    </Link>
  );
}
