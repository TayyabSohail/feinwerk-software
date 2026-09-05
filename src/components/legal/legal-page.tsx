import Link from 'next/link';

import { PageHero } from '@/components/common/page-hero';
import { Reveal } from '@/components/motion/reveal';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  kicker: string;
  title: string;
  accentWords?: number[];
  description: string;
  updated: string;
  href: string;
  sections: LegalSection[];
}

/** Shared layout for the policy pages: sticky table of contents + prose. */
export function LegalPage({
  kicker,
  title,
  accentWords,
  description,
  updated,
  href,
  sections,
}: LegalPageProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: paths.home },
          { name: title, href },
        ]}
      />
      <PageHero
        kicker={kicker}
        title={title}
        accentWords={accentWords}
        description={description}
        size='lg'
      >
        <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
          Last updated {updated}
        </p>
      </PageHero>

      <section className='fw-container grid gap-12 pb-24 lg:grid-cols-[0.3fr_0.7fr]'>
        <Reveal className='lg:sticky lg:top-32 lg:self-start'>
          <nav aria-label='On this page' className='fw-card p-6'>
            <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
              Contents
            </p>
            <ol className='mt-4 space-y-2 text-sm'>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='fw-link flex gap-3 text-foreground/80 hover:text-foreground'
                  >
                    <span className='font-mono text-xs text-muted-foreground'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className='mt-6 border-t border-line pt-5 text-xs text-muted-foreground'>
              Other policies:{' '}
              {siteConfig.footerNav.legal
                .filter((item) => item.href !== href)
                .map((item, index, all) => (
                  <span key={item.href}>
                    <Link
                      href={item.href}
                      className='text-foreground underline underline-offset-4'
                    >
                      {item.label}
                    </Link>
                    {index < all.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
          </nav>
        </Reveal>

        <div className='space-y-12'>
          {sections.map((section, index) => (
            <Reveal
              key={section.id}
              as='section'
              className='scroll-mt-32'
              delay={Math.min(index * 0.03, 0.2)}
            >
              <div id={section.id}>
                <h2 className='flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-foreground'>
                  <span className='font-mono text-xs text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                <div
                  className={cn(
                    'mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/80',
                    '[&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6',
                  )}
                >
                  {section.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
