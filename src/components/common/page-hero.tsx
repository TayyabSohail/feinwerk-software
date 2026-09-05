import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { cn } from '@/lib/utils';

interface PageHeroProps {
  kicker: string;
  title: string;
  accentWords?: number[];
  description?: string;
  children?: React.ReactNode;
  className?: string;
  /** Narrower title for long-form pages. */
  size?: 'lg' | 'xl';
}

/** Shared opening block for inner pages. */
export function PageHero({
  kicker,
  title,
  accentWords,
  description,
  children,
  className,
  size = 'xl',
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'fw-container pb-12 pt-36 sm:pt-44 lg:pb-16 lg:pt-52',
        className,
      )}
    >
      <Reveal>
        <p className='fw-kicker'>{kicker}</p>
      </Reveal>
      <TextReveal
        as='h1'
        text={title}
        accentWords={accentWords}
        delay={0.1}
        className={cn(
          'fw-display mt-6 text-foreground',
          size === 'xl'
            ? 'max-w-[14ch] text-display-xl'
            : 'max-w-[18ch] text-display-lg',
        )}
      />
      {description && (
        <Reveal delay={0.4}>
          <p className='mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            {description}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.5} className='mt-9'>
          {children}
        </Reveal>
      )}
    </section>
  );
}
