import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
  /** Custom screen content instead of a screenshot. */
  children?: React.ReactNode;
}

/**
 * A phone drawn in CSS around a 390x844 screen. Corner radii, bezel and the
 * camera island are all proportional, so the frame looks right at any size.
 */
export function PhoneFrame({
  src,
  alt = '',
  sizes = '240px',
  className,
  children,
}: PhoneFrameProps) {
  return (
    <div className={cn('fw-phone relative aspect-[390/844] w-full', className)}>
      <div className='fw-phone-screen relative h-full w-full overflow-hidden bg-black'>
        {children ??
          (src && (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className='object-cover object-top'
            />
          ))}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent'
        />
      </div>
      <span aria-hidden='true' className='fw-phone-island' />
      <span aria-hidden='true' className='fw-phone-button fw-phone-button-left' />
      <span aria-hidden='true' className='fw-phone-button fw-phone-button-right' />
    </div>
  );
}
