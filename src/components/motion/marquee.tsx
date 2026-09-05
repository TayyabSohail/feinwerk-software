import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal scroller. Children are duplicated once so the loop is
 * seamless; pure CSS, so it costs nothing on the main thread.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        pauseOnHover && 'fw-marquee-paused',
        className,
      )}
    >
      <div
        className={cn('fw-marquee', reverse && 'fw-marquee-reverse')}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className='flex shrink-0 items-center'>{children}</div>
        <div aria-hidden='true' className='flex shrink-0 items-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
