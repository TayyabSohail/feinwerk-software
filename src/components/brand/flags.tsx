import { cn } from '@/lib/utils';

interface FlagProps {
  className?: string;
}

/** Flag of Pakistan, drawn inline so it renders identically everywhere. */
export function FlagPK({ className }: FlagProps) {
  return (
    <svg
      viewBox='0 0 36 24'
      aria-hidden='true'
      className={cn('h-4 w-6 rounded-[2px] shadow-sm', className)}
    >
      <rect width='36' height='24' fill='#ffffff' />
      <rect x='9' width='27' height='24' fill='#01411C' />
      <circle cx='23' cy='12' r='6' fill='#ffffff' />
      <circle cx='24.8' cy='10.8' r='5.4' fill='#01411C' />
      <polygon
        fill='#ffffff'
        points='27.2,5.8 28,8.1 30.4,8.1 28.5,9.5 29.2,11.8 27.2,10.4 25.2,11.8 25.9,9.5 24,8.1 26.4,8.1'
      />
    </svg>
  );
}

/** Flag of Germany. */
export function FlagDE({ className }: FlagProps) {
  return (
    <svg
      viewBox='0 0 36 24'
      aria-hidden='true'
      className={cn('h-4 w-6 rounded-[2px] shadow-sm', className)}
    >
      <rect width='36' height='8' fill='#000000' />
      <rect y='8' width='36' height='8' fill='#DD0000' />
      <rect y='16' width='36' height='8' fill='#FFCE00' />
    </svg>
  );
}

/** Flag of the United Kingdom, simplified. Used for the English switch. */
export function FlagGB({ className }: FlagProps) {
  return (
    <svg
      viewBox='0 0 36 24'
      aria-hidden='true'
      className={cn('h-4 w-6 rounded-[2px] shadow-sm', className)}
    >
      <rect width='36' height='24' fill='#012169' />
      <path d='M0 0L36 24M36 0L0 24' stroke='#ffffff' strokeWidth='4.5' />
      <path d='M0 0L36 24M36 0L0 24' stroke='#C8102E' strokeWidth='2' />
      <path d='M18 0V24M0 12H36' stroke='#ffffff' strokeWidth='7' />
      <path d='M18 0V24M0 12H36' stroke='#C8102E' strokeWidth='4' />
    </svg>
  );
}

export function Flag({
  countryCode,
  className,
}: FlagProps & { countryCode: string }) {
  if (countryCode === 'PK') return <FlagPK className={className} />;
  if (countryCode === 'DE') return <FlagDE className={className} />;
  if (countryCode === 'GB') return <FlagGB className={className} />;
  return null;
}
