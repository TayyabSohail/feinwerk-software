import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  /** Word indexes rendered in the serif accent style. */
  accentWords?: number[];
  description?: string;
  /** Slot on the right of the description, e.g. a link. */
  aside?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  kicker,
  title,
  accentWords,
  description,
  aside,
  align = 'left',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end',
        align === 'center' &&
          'text-center md:grid-cols-1 md:justify-items-center',
        className,
      )}
    >
      <div>
        <Reveal>
          <p
            className={cn('fw-kicker', align === 'center' && 'justify-center')}
          >
            {kicker}
          </p>
        </Reveal>
        <TextReveal
          as={as}
          text={title}
          accentWords={accentWords}
          className={cn(
            'fw-display mt-5 text-display-md text-foreground',
            align === 'center' && 'justify-center',
          )}
        />
      </div>
      {(description || aside) && (
        <Reveal
          delay={0.15}
          className={cn(
            'flex flex-col gap-5 md:items-end',
            align === 'center' && 'items-center md:items-center',
          )}
        >
          {description && (
            <p
              className={cn(
                'max-w-md text-base leading-relaxed text-muted-foreground md:text-lg',
                align === 'left' && 'md:text-right',
              )}
            >
              {description}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
