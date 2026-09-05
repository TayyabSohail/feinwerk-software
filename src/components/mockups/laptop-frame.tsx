import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LaptopFrameProps {
  /** Screenshot to show on the screen. Omit when passing `children`. */
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Position of the screenshot inside the screen. */
  objectPosition?: string;
  /** Custom screen content instead of a screenshot. */
  children?: React.ReactNode;
}

/**
 * A slim laptop drawn in CSS around a screenshot (or custom screen content),
 * so raw captures read as a product on a device rather than a cropped image.
 */
export function LaptopFrame({
  src,
  alt = '',
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  objectPosition = 'left top',
  children,
}: LaptopFrameProps) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Lid */}
      <div className='relative rounded-[1.4rem] border border-black/20 bg-[#101015] p-[6px] shadow-[0_40px_80px_-30px_rgba(20,19,26,0.55)] sm:rounded-[1.6rem] sm:p-2'>
        <div className='relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-black sm:rounded-[1.15rem]'>
          {children ??
            (src && (
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className='object-cover'
                style={{ objectPosition }}
              />
            ))}
          {/* Screen glare */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent'
          />
        </div>
        {/* Camera notch */}
        <span
          aria-hidden='true'
          className='absolute left-1/2 top-[3px] h-[6px] w-16 -translate-x-1/2 rounded-b-md bg-[#101015] sm:top-[5px]'
        />
      </div>
      {/* Base */}
      <div className='mx-auto h-[10px] w-[104%] -translate-x-[2%] rounded-b-[1rem] bg-gradient-to-b from-[#d9d9de] to-[#b9b9c2] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] sm:h-[13px]'>
        <span className='mx-auto block h-[4px] w-24 rounded-b-md bg-[#a3a3ab] sm:h-[5px]' />
      </div>
    </div>
  );
}
