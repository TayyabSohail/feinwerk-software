import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectMockup } from '@/components/mockups/project-mockup';
import { Parallax } from '@/components/motion/parallax';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { ScrollHighlight } from '@/components/motion/scroll-highlight';
import { TextReveal } from '@/components/motion/text-reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { ProjectGallery } from '@/components/work/project-gallery';

import { getTechMeta } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

import { paths } from '@/constants/paths';
import {
  getAdjacentProjectsLocalised,
  getProjectBySlug,
  getProjectBySlugLocalised,
  type Project,
  projects,
} from '@/data/projects';
import { getServiceBySlugLocalised } from '@/data/services';
import { getDictionary } from '@/i18n/server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Case study not found' };

  const title = `${project.title} case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: paths.caseStudy(project.slug) },
    openGraph: {
      title,
      description: project.summary,
      url: paths.caseStudy(project.slug),
      type: 'article',
      images: [
        {
          url: project.coverImage,
          width: project.coverWidth,
          height: project.coverHeight,
          alt: `${project.title} cover`,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const dict = await getDictionary();
  const { slug } = await params;
  const t = dict.workPage;
  const project = getProjectBySlugLocalised(slug, dict.locale);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjectsLocalised(
    project.slug,
    dict.locale,
  );
  const relatedServices = project.services
    .map((serviceSlug) => getServiceBySlugLocalised(serviceSlug, dict.locale))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service),
    );

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, href: paths.home },
          { name: dict.nav.work, href: paths.work },
          { name: project.title, href: paths.caseStudy(project.slug) },
        ]}
      />

      {/* Hero */}
      <header className='fw-container pt-32 sm:pt-40 lg:pt-48'>
        <Reveal>
          <Link
            href={paths.work}
            className='group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground'
          >
            <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-1' />
            {t.back}
          </Link>
        </Reveal>

        <div className='mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
          <div>
            <Reveal>
              <p className='fw-kicker'>
                {project.client} &middot; {project.industry}
              </p>
            </Reveal>
            <TextReveal
              as='h1'
              text={project.title}
              delay={0.1}
              className='fw-display mt-6 text-display-lg text-foreground'
            />
            <Reveal delay={0.35}>
              <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={0.45} className='mt-8 flex flex-wrap gap-3'>
              <span className='inline-flex h-12 items-center rounded-full border border-line px-5 text-sm text-muted-foreground'>
                {project.anonymised
                  ? t.anonymised
                  : t.private}
              </span>
            </Reveal>
          </div>

          <Reveal
            delay={0.2}
            className='grid grid-cols-2 gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-4 lg:grid-cols-2'
          >
            <Meta label={t.category} value={project.category} />
            <Meta label={t.year} value={project.year} />
            <Meta
              label={t.capabilities}
              value={project.capabilities.join(', ')}
            />
            <Meta label={t.industry} value={project.industry} highlight />
          </Reveal>
        </div>

        <Reveal delay={0.3} className='relative mt-14'>
          <div
            aria-hidden='true'
            className='absolute inset-x-1/4 top-1/4 -z-10 h-1/2 rounded-full opacity-30 blur-[120px]'
            style={{ background: project.accent }}
          />
          <Parallax distance={40} scaleFrom={0.97}>
            <ProjectMockup
              project={project}
              priority
              centered
              sizes='(min-width: 1280px) 84rem, 100vw'
              className='aspect-[16/9] shadow-mockup'
            />
          </Parallax>
        </Reveal>
      </header>

      {/* Lede */}
      <section className='fw-container py-16 lg:py-24'>
        <ScrollHighlight
          text={project.description}
          className='max-w-4xl text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl md:leading-snug'
        />
      </section>

      {/* Problem / approach */}
      <section className='fw-container'>
        <Stagger className='grid gap-4 md:grid-cols-2'>
          <StaggerItem className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>{t.problem}</p>
            <p className='mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
              {project.problem}
            </p>
          </StaggerItem>
          <StaggerItem className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>{t.approach}</p>
            <p className='mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
              {project.approach}
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* More screens of the product */}
      <ProjectGallery
        project={project}
        labels={{
          gallery: t.gallery,
          galleryTitle: t.galleryTitle,
          galleryAnonymised: t.galleryAnonymised,
          galleryMore: t.galleryMore,
          onThePhone: t.onThePhone,
          homeScreen: t.homeScreen,
        }}
      />

      {/* Architecture + features */}
      <section className='fw-container pb-16 lg:pb-24'>
        <div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
          <Reveal className='lg:sticky lg:top-32 lg:self-start'>
            <p className='fw-kicker'>{t.architecture}</p>
            <h2 className='fw-display mt-5 text-display-sm text-foreground'>
              Architecture
            </h2>
            <p className='mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {project.architecture}
            </p>
          </Reveal>
          <div>
            <Reveal>
              <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                {t.keyFeatures}
              </p>
            </Reveal>
            <Stagger className='mt-4 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2'>
              {project.keyFeatures.map((feature) => (
                <StaggerItem
                  key={feature}
                  className='flex items-start gap-3 bg-background p-5 text-[15px] text-foreground/85'
                >
                  <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-text'>
                    <Check className='h-3 w-3' strokeWidth={3} />
                  </span>
                  {feature}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className='fw-container'>
        <Reveal>
          <p className='fw-kicker'>{t.challengesKicker}</p>
          <h2 className='fw-display mt-5 text-display-sm text-foreground'>
            {t.challengesTitle}
          </h2>
        </Reveal>
        <Stagger className='mt-10 grid gap-4'>
          {project.challenges.map((item) => (
            <StaggerItem
              key={item.challenge}
              className='fw-card grid gap-6 p-7 sm:p-9 md:grid-cols-2'
            >
              <div>
                <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                  {t.challenge}
                </p>
                <p className='mt-3 text-base leading-relaxed text-foreground sm:text-lg'>
                  {item.challenge}
                </p>
              </div>
              <div className='border-l-2 border-brand pl-5'>
                <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-brand-text'>
                  {t.solution}
                </p>
                <p className='mt-3 text-base leading-relaxed text-muted-foreground'>
                  {item.solution}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Results */}
      <section className='fw-container py-16 lg:py-24'>
        <Reveal>
          <p className='fw-kicker'>{t.resultsKicker}</p>
          <h2 className='fw-display mt-5 text-display-sm text-foreground'>
            {t.resultsTitle}
          </h2>
        </Reveal>
        <Stagger className='mt-10 grid gap-px overflow-hidden rounded-none border border-line bg-line md:grid-cols-3'>
          {project.outcomes.map((outcome) => (
            <StaggerItem key={outcome} className='bg-background p-7 sm:p-8'>
              <Metric text={outcome} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Stack + services */}
      <section className='fw-container'>
        <div className='grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
          <Reveal className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>{t.stack}</p>
            <ul className='mt-6 grid gap-6 sm:grid-cols-2'>
              {project.techStack.map((group) => (
                <li key={group.category}>
                  <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                    {group.category}
                  </p>
                  <ul className='mt-2 flex flex-wrap gap-1.5'>
                    {group.tools.map((tool) => {
                      const { icon: Icon, color } = getTechMeta(tool);
                      return (
                        <li
                          key={tool}
                          className='inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-foreground/85'
                        >
                          <Icon className='h-3 w-3' style={{ color }} />
                          {tool}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>{t.servicesInvolved}</p>
            <ul className='mt-6 divide-y divide-line'>
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={paths.service(service.slug)}
                    className='group flex items-center justify-between py-4 text-foreground'
                  >
                    <span>
                      <span className='block font-medium'>{service.title}</span>
                      <span className='block text-sm text-muted-foreground'>
                        {service.tagline}
                      </span>
                    </span>
                    <ArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground' />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Prev / next */}
      <nav
        aria-label={t.more}
        className='fw-container py-16 lg:py-24'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          {previous && (
            <AdjacentLink
              project={previous}
              direction='previous'
              label={t.previous}
            />
          )}
          {next && (
            <AdjacentLink project={next} direction='next' label={t.next} />
          )}
        </div>
      </nav>

      <CtaBanner
        dict={dict}
        title={t.ctaTitle}
        accentWords={[...t.ctaAccent]}
        body={t.ctaBody}
      />
    </article>
  );
}

function Meta({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className='bg-background p-5'>
      <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
        {label}
      </p>
      <p
        className={cn(
          'mt-2 text-sm font-medium leading-snug text-foreground',
          highlight && 'text-brand-text',
        )}
      >
        {value}
      </p>
    </div>
  );
}

/** Pulls a leading figure out of an outcome sentence and enlarges it. */
function Metric({ text }: { text: string }) {
  const match = text.match(
    /^(<?[$£€]?\d[\d,.]*\s?(?:×|x|%|ms)?(?:\s?million|\s?M|\s?k)?\+?)\s*(.*)$/i,
  );

  if (!match) {
    return (
      <p className='text-base leading-relaxed text-foreground/85'>{text}</p>
    );
  }

  const [, figure, rest] = match;
  return (
    <>
      <span className='fw-display block text-4xl text-brand-text sm:text-5xl'>
        {figure.trim()}
      </span>
      <span className='mt-3 block text-base leading-relaxed text-muted-foreground'>
        {rest}
      </span>
    </>
  );
}

function AdjacentLink({
  project,
  direction,
  label,
}: {
  project: Project;
  direction: 'previous' | 'next';
  label: string;
}) {
  const isNext = direction === 'next';
  return (
    <Link
      href={paths.caseStudy(project.slug)}
      className={cn(
        'fw-card fw-card-link group flex items-center gap-5 p-5',
        isNext && 'flex-row-reverse text-right sm:col-start-2',
      )}
    >
      <div className='w-28 shrink-0'>
        <ProjectMockup
          project={project}
          sizes='112px'
          className='aspect-[4/3]'
        />
      </div>
      <div className='min-w-0'>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground',
            isNext && 'flex-row-reverse',
          )}
        >
          {isNext ? (
            <ArrowRight className='h-3 w-3' />
          ) : (
            <ArrowLeft className='h-3 w-3' />
          )}
          {label}
        </span>
        <span className='mt-1 block truncate text-lg font-semibold text-foreground transition-colors group-hover:text-brand-text'>
          {project.title}
        </span>
        <span className='block truncate text-sm text-muted-foreground'>
          {project.tagline}
        </span>
      </div>
    </Link>
  );
}
