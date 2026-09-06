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
  'React Native',
  'Flutter',
  'Python',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'Supabase',
  'OpenAI',
  'Claude',
  'LangGraph',
  'PyTorch',
  'Hugging Face',
  'n8n',
  'AWS',
  'Vercel',
  'Docker',
  'Kubernetes',
  'Terraform',
  'Stripe',
  'WebSockets',
  'Directus',
  'OpenRouter',
  'PostHog',
];

/** Tools per layer, in the same order as `dict.technologies.layers`. */
const LAYERS = [
  [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'ShadCN',
    'Framer Motion',
    'TanStack',
  ],
  [
    'React Native',
    'Expo',
    'Flutter',
    'Swift',
    'Kotlin',
    'Firebase',
    'Capacitor',
    'iOS',
  ],
  [
    'Python',
    'FastAPI',
    'Django',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'Redis',
    'Pandas',
    'Zod',
    'Stripe',
    'WebSockets',
    'Resend',
  ],
  [
    'OpenAI',
    'Claude',
    'LangGraph',
    'LangChain',
    'Hugging Face',
    'PyTorch',
    'Ollama',
    'Pinecone',
    'OpenRouter',
    'DataForSEO',
    'Google Maps API',
  ],
  [
    'n8n',
    'Zapier',
    'Make',
    'Trigger.dev',
    'Celery',
    'Apache Airflow',
    'Puppeteer',
    'Twilio',
    'pg_cron',
    'PostHog',
  ],
  [
    'AWS',
    'Vercel',
    'Docker',
    'Kubernetes',
    'Terraform',
    'CI/CD',
    'AWS EC2',
    'AWS Lambda',
    'Google Cloud',
    'Directus',
  ],
];

/**
 * Hairline borders for a grid that is 1 column by default, 2 from `sm`
 * and 3 from `lg`. Later breakpoints override the earlier ones.
 */
function cellClasses(index: number) {
  return cn(
    'flex flex-col py-7 sm:py-9',
    index > 0 && 'border-t',
    // two columns
    index < 2 ? 'sm:border-t-0' : 'sm:border-t',
    index % 2 === 1 ? 'sm:border-l sm:pl-8 sm:pr-0' : 'sm:pl-0 sm:pr-8',
    // three columns
    index < 3 ? 'lg:border-t-0' : 'lg:border-t',
    index % 3 === 0 && 'lg:border-l-0 lg:pl-0 lg:pr-8',
    index % 3 === 1 && 'lg:border-l lg:px-8',
    index % 3 === 2 && 'lg:border-l lg:pl-8 lg:pr-0',
  );
}

interface TechnologiesProps {
  dict: Dictionary;
}

/**
 * Dimmed tool marquee, then a short statement that fills with ink as you
 * scroll, then the stack laid out by layer in hairline columns.
 */
export function Technologies({ dict }: TechnologiesProps) {
  const t = dict.technologies;

  return (
    <section className='fw-rule fw-band-stone' data-rail={t.kicker}>
      <div className='fw-container pt-12 text-center sm:pt-14'>
        <Reveal>
          <p className='fw-kicker'>{t.kicker}</p>
        </Reveal>
      </div>

      <div className='mt-6 border-b py-6 sm:mt-10 sm:py-8'>
        <Marquee duration={60}>
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

      <div className='fw-container py-14 sm:py-28'>
        <ScrollHighlight
          text={`${t.statement} ${t.statementMuted}`}
          accentWords={Array.from(
            { length: t.statement.split(' ').length },
            (_, index) => index,
          )}
          className='fw-display max-w-4xl text-display-md text-ink [&_.fw-accent]:text-ink'
        />
      </div>

      <div className='fw-container pb-14 sm:pb-24'>
        <Reveal>
          <p className='fw-kicker'>{t.stackLabel}</p>
        </Reveal>
        <Stagger className='mt-6 grid border-y sm:grid-cols-2 lg:grid-cols-3'>
          {t.layers.map((layer, index) => (
            <StaggerItem key={layer.label} className={cellClasses(index)}>
              <h3 className='fw-display text-2xl text-ink'>{layer.label}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {layer.note}
              </p>
              <ul className='mt-4 flex flex-wrap gap-x-5 gap-y-2.5 border-t pt-4 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3 sm:pt-6'>
                {LAYERS[index].map((name) => {
                  const { icon: Icon, color } = getTechMeta(name);
                  return (
                    <li
                      key={name}
                      className='flex items-center gap-2.5 text-sm font-medium text-ink/80'
                    >
                      <Icon
                        aria-hidden='true'
                        className='h-4 w-4 shrink-0'
                        style={{
                          color: color === 'currentColor' ? undefined : color,
                        }}
                      />
                      <span className='truncate'>{name}</span>
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
