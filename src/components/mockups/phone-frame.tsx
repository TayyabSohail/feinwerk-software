import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
  objectPosition?: string;
  /** Custom screen content instead of a screenshot. */
  children?: React.ReactNode;
}

/** A phone drawn in CSS around a screenshot (or custom screen content). */
export function PhoneFrame({
  src,
  alt = '',
  sizes = '220px',
  className,
  objectPosition = 'left top',
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        'relative aspect-[9/19] w-full rounded-[2.4rem] border border-black/25 bg-[#101015] p-[6px] shadow-[0_40px_70px_-30px_rgba(20,19,26,0.6)]',
        className,
      )}
    >
      <div className='relative h-full w-full overflow-hidden rounded-[2rem] bg-black'>
        {children ??
          (src && (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className='object-cover'
              style={{ objectPosition }}
            />
          ))}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent'
        />
      </div>
      <span
        aria-hidden='true'
        className='absolute left-1/2 top-[14px] h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-[#101015]'
      />
    </div>
  );
}
