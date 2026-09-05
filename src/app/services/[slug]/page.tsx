import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';
import { CtaBanner } from '@/components/sections/cta-banner';
import { FaqSection } from '@/components/sections/faq';
import { SERVICE_ICONS } from '@/components/sections/services-grid';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/work/project-card';

import { getTechMeta } from '@/lib/tech-icons';

import { paths } from '@/constants/paths';
import { getProjectsBySlugs } from '@/data/projects';
import { getServiceBySlug, services } from '@/data/services';
import { getDictionary } from '@/i18n/server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: paths.service(service.slug) },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const dict = await getDictionary();
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = SERVICE_ICONS[service.icon];
  const proof = getProjectsBySlugs(service.proof).slice(0, 3);
  const others = services.filter((item) => item.slug !== service.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: { '@type': 'Organization', name: 'Feinwerk Software' },
    areaServed: ['DE', 'PK', 'EU', 'US'],
    serviceType: service.title,
  };

  return (
    <article>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: 'Services', href: paths.services },
          { name: service.title, href: paths.service(service.slug) },
        ]}
      />

      <header className='fw-container pt-32 sm:pt-40 lg:pt-48'>
        <Reveal>
          <Link
            href={paths.services}
            className='group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground'
          >
            <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-1' />
            All services
          </Link>
        </Reveal>

        <div className='mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <Reveal className='flex items-center gap-4'>
              <span className='flex h-12 w-12 items-center justify-center rounded-none bg-brand text-brand-foreground'>
                <Icon className='h-5 w-5' />
              </span>
              <p className='fw-kicker'>
                {service.kind === 'engagement'
                  ? 'Engagement model'
                  : 'Capability'}
              </p>
            </Reveal>
            <TextReveal
              as='h1'
              text={service.title}
              delay={0.1}
              className='fw-display mt-6 text-display-lg text-foreground'
            />
            <Reveal delay={0.35}>
              <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
                {service.summary}
              </p>
            </Reveal>
            <Reveal delay={0.45} className='mt-8'>
              <Link href={`${paths.contact}?service=${service.slug}`}>
                <Button variant='brand' size='xl' icon={ArrowUpRight}>
                  Discuss this service
                </Button>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2} className='fw-card self-start p-7 sm:p-8'>
            <p className='fw-kicker'>Engagement</p>
            <dl className='mt-6 divide-y divide-line text-sm'>
              <div className='flex justify-between gap-6 py-4'>
                <dt className='text-muted-foreground'>Timeline</dt>
                <dd className='text-right font-medium text-foreground'>
                  {service.engagement.timeline}
                </dd>
              </div>
              <div className='flex justify-between gap-6 py-4'>
                <dt className='text-muted-foreground'>Team</dt>
                <dd className='text-right font-medium text-foreground'>
                  {service.engagement.team}
                </dd>
              </div>
              <div className='flex justify-between gap-6 py-4'>
                <dt className='text-muted-foreground'>Pricing</dt>
                <dd className='text-right font-medium text-foreground'>
                  {service.engagement.pricing}
                </dd>
              </div>
              <div className='flex justify-between gap-6 py-4'>
                <dt className='text-muted-foreground'>After launch</dt>
                <dd className='text-right font-medium text-foreground'>
                  {service.engagement.support}
                </dd>
              </div>
            </dl>
            <p className='mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
              Core stack
            </p>
            <ul className='mt-3 flex flex-wrap gap-1.5'>
              {service.stack.map((tool) => {
                const { icon: ToolIcon, color } = getTechMeta(tool);
                return (
                  <li
                    key={tool}
                    className='inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-foreground/85'
                  >
                    <ToolIcon className='h-3 w-3' style={{ color }} />
                    {tool}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </header>

      <section className='fw-container py-16 lg:py-24'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Reveal className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>What is included</p>
            <ul className='mt-6 space-y-3'>
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-[15px] text-foreground/85'
                >
                  <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-text'>
                    <Check className='h-3 w-3' strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className='fw-card p-7 sm:p-9'>
            <p className='fw-kicker'>Typical use cases</p>
            <ul className='mt-6 divide-y divide-line'>
              {service.useCases.map((item) => (
                <li key={item} className='py-4 text-[15px] text-foreground/85'>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {proof.length > 0 && (
        <section className='fw-container'>
          <Reveal className='flex flex-wrap items-end justify-between gap-4'>
            <div>
              <p className='fw-kicker'>Proof</p>
              <h2 className='fw-display mt-5 text-display-sm text-foreground'>
                Where we have done this before.
              </h2>
            </div>
            <Link
              href={paths.work}
              className='fw-link inline-flex items-center gap-1.5 text-sm font-medium text-foreground'
            >
              All case studies <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Reveal>
          <Stagger className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {proof.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <FaqSection
        items={service.faqs}
        kicker='Questions'
        title='About this service.'
        accentWords={[1, 2]}
      />

      <section className='fw-container pb-6'>
        <Reveal>
          <p className='fw-kicker'>Other services</p>
        </Reveal>
        <Stagger className='mt-6 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2 lg:grid-cols-5'>
          {others.map((item) => (
            <StaggerItem key={item.slug} className='bg-background'>
              <Link
                href={paths.service(item.slug)}
                className='group flex h-full flex-col p-5 transition-colors hover:bg-surface'
              >
                <span className='text-sm font-medium text-foreground group-hover:text-brand-text'>
                  {item.title}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBanner dict={dict} />
    </article>
  );
}
