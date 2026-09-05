import { Marquee } from '@/components/motion/marquee';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { ScrollHighlight } from '@/components/motion/scroll-highlight';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

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

/** Tools per layer, in the same order as `dict.technologies.layers`. */
const LAYERS = [
  ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'ShadCN'],
  ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Supabase'],
  ['OpenAI', 'Claude', 'LangGraph', 'LangChain', 'Pinecone'],
  ['AWS', 'Vercel', 'Docker', 'Trigger.dev', 'CI/CD'],
];

interface TechnologiesProps {
  dict: Dictionary;
}

/**
 * Dimmed tool marquee, then a statement that fills with ink as you scroll,
 * then the stack laid out by layer in four hairline columns.
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

      <div className='fw-container pb-20 sm:pb-24'>
        <Reveal>
          <p className='fw-kicker'>{t.stackLabel}</p>
        </Reveal>
        <Stagger className='mt-6 grid border-y sm:grid-cols-2 lg:grid-cols-4'>
          {t.layers.map((layer, index) => (
            <StaggerItem
              key={layer.label}
              className={cn(
                'flex flex-col py-9',
                index > 0 && 'border-t',
                index >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                index % 2 === 1 ? 'sm:border-l sm:pl-8' : 'sm:pr-8',
                index > 0 ? 'lg:border-l lg:pl-8' : 'lg:pl-0',
                index === 3 ? 'lg:pr-0' : 'lg:pr-8',
                'lg:border-t-0',
              )}
            >
              <span className='font-mono text-[10px] text-brand-text'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='fw-display mt-3 text-2xl text-ink'>
                {layer.label}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {layer.note}
              </p>
              <ul className='mt-6 flex flex-col gap-3 border-t pt-6'>
                {LAYERS[index].map((name) => {
                  const { icon: Icon, color } = getTechMeta(name);
                  return (
                    <li
                      key={name}
                      className='flex items-center gap-3 text-sm font-medium text-ink/80'
                    >
                      <Icon
                        aria-hidden='true'
                        className='h-4 w-4 shrink-0'
                        style={{
                          color: color === 'currentColor' ? undefined : color,
                        }}
                      />
                      {name}
                    </li>
                  );
                })}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
