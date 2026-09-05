import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface CtaBannerProps {
  dict: Dictionary;
  title?: string;
  accentWords?: number[];
  body?: string;
}

/** Closing call to action: an ink panel with one large button. */
export function CtaBanner({ dict, title, accentWords, body }: CtaBannerProps) {
  const t = dict.cta;
  const primary = siteConfig.locations[0];

  return (
    <section className='fw-container pb-6 pt-10'>
      <div className='fw-card fw-card-ink fw-grid-surface relative px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24'>
        <div
          aria-hidden='true'
          className='absolute -right-32 -top-32 h-[24rem] w-[24rem] rounded-full bg-brand/25 blur-[110px]'
        />
        <div className='relative mx-auto max-w-3xl'>
          <Reveal>
            <p className='fw-kicker justify-center text-white/60'>{t.kicker}</p>
          </Reveal>
          <TextReveal
            as='h2'
            text={title ?? t.title}
            accentWords={accentWords ?? [...t.accent]}
            className='fw-display mt-5 justify-center text-display-lg text-white [&_.fw-accent]:text-brand-2'
          />
          <Reveal delay={0.3}>
            <p className='mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg'>
              {body ?? t.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.4}
            className='mt-10 flex flex-wrap items-center justify-center gap-3'
          >
            <Link
              href={paths.contact}
              className='fw-btn fw-btn-primary inline-flex h-14 items-center gap-3 px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.24em]'
            >
              {t.button}
              <span className='h-2.5 w-2.5 bg-white' />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className='inline-flex h-14 items-center gap-2 border border-white/25 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-brand'
            >
              <Mail className='h-4 w-4' />
              {siteConfig.email}
            </a>
            <a
              href={primary.phoneHref}
              className='inline-flex h-14 items-center gap-2 border border-white/25 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-brand'
            >
              <Phone className='h-4 w-4' />
              {primary.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
