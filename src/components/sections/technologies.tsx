import { Marquee } from '@/components/motion/marquee';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { ScrollHighlight } from '@/components/motion/scroll-highlight';

import { getTechMeta } from '@/lib/tech-icons';

import type { Dictionary } from '@/i18n/dictionaries/en';

const TOOLS = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Supabase',
  'OpenAI',
  'Claude',
  'LangGraph',
  'AWS',
  'Vercel',
  'Docker',
  'Stripe',
  'Pinecone',
  'Trigger.dev',
];

interface TechnologiesProps {
  dict: Dictionary;
}

/**
 * Dimmed tool marquee, then a statement that fills with ink as you scroll,
 * then three large figures in hairline cells.
 */
export function Technologies({ dict }: TechnologiesProps) {
  const t = dict.technologies;

  return (
    <section className='fw-rule fw-band-white'>
      <div className='fw-container pt-14 text-center'>
        <Reveal>
          <p className='fw-kicker'>{t.kicker}</p>
        </Reveal>
      </div>

      <div className='mt-10 border-b py-8'>
        <Marquee duration={50}>
          {TOOLS.map((name) => {
            const { icon: Icon, color } = getTechMeta(name);
            return (
              <span
                key={name}
                className='mx-9 inline-flex items-center gap-3 text-ink/35 transition-colors duration-500 hover:text-ink'
              >
                <Icon
                  className='h-7 w-7'
                  style={{
                    color: color === 'currentColor' ? undefined : `${color}99`,
                  }}
                />
                <span className='fw-display text-2xl'>{name}</span>
              </span>
            );
          })}
        </Marquee>
      </div>

      <div className='fw-container py-20 sm:py-28'>
        <ScrollHighlight
          text={`${t.statement} ${t.statementMuted}`}
          accentWords={Array.from(
            { length: t.statement.split(' ').length },
            (_, index) => index,
          )}
          className='fw-display max-w-5xl text-display-md text-ink [&_.fw-accent]:text-ink'
        />
      </div>

      <Stagger className='grid border-y sm:grid-cols-3'>
        {t.stats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className='fw-spot flex flex-col items-center px-6 py-14 text-center sm:py-20 sm:[&:not(:first-child)]:border-l'
          >
            <p className='fw-display text-6xl text-ink sm:text-7xl'>
              {stat.value}
            </p>
            <p className='mt-4 max-w-[22ch] font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground'>
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
