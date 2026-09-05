import Link from 'next/link';

import { Flag } from '@/components/brand/flags';
import { Logo } from '@/components/brand/logo';
import { Silk } from '@/components/effects/silk';
import { BackToTop } from '@/components/layout/back-to-top';

import { siteConfig } from '@/config/site';
import { primaryNav } from '@/constants/navigation';
import { isSectionLink, paths } from '@/constants/paths';
import { services } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();
  const t = dict.footer;

  // Same links, same order as the header, so the two never disagree.
  const companyLinks = [
    ...primaryNav(dict),
    { label: dict.nav.contact, href: paths.contact },
  ];

  return (
    <footer className='relative mt-24 border-t'>
      <div className='fw-container'>
        <div className='grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5'>
          <div className='lg:col-span-1'>
            <Logo />
            <p className='mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground'>
              {t.pitch}
            </p>
            <Link
              href={paths.contact}
              className='fw-btn fw-btn-primary mt-6 inline-flex h-11 items-center px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]'
            >
              {t.quote}
            </Link>
          </div>

          <FooterColumn title={t.services}>
            {services.map((service) => (
              <FooterLink key={service.slug} href={paths.service(service.slug)}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t.company}>
            {companyLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t.offices}>
            {siteConfig.locations.map((location) => (
              <div key={location.id} className='text-sm'>
                <p className='flex items-center gap-2 font-medium text-foreground'>
                  <Flag
                    countryCode={location.countryCode}
                    className='h-3 w-[18px]'
                  />
                  {location.city}, {location.country}
                </p>
              </div>
            ))}
          </FooterColumn>

          <FooterColumn title={t.connect}>
            <a
              href={`mailto:${siteConfig.email}`}
              className='fw-link w-fit text-sm text-foreground/80 hover:text-foreground'
            >
              {siteConfig.email}
            </a>
            <p className='text-xs text-muted-foreground'>
              {siteConfig.responseTime}
            </p>
          </FooterColumn>
        </div>

        <div className='flex flex-col gap-4 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <p>
            &copy; {year} {siteConfig.legalName}. {t.rights}
          </p>
          <div className='flex flex-wrap items-center gap-5'>
            {siteConfig.footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='fw-link hover:text-foreground'
              >
                {item.label}
              </Link>
            ))}
          </div>
          <BackToTop label={t.backToTop} />
        </div>
      </div>

      {/* Wordmark on silk, clipped at the bottom edge of the page. The type
          scales with the viewport so the whole word fits on a phone; the band
          keeps pace with it rather than sitting at a fixed minimum height. */}
      <div className='relative h-[30vw] max-h-[20rem] min-h-[5.5rem] overflow-hidden border-t sm:min-h-[9rem]'>
        <Silk brightness={0.98} speed={0.8} />
        <div className='absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent' />
        <p
          aria-hidden='true'
          className='absolute inset-x-0 bottom-[-0.18em] select-none text-center font-display text-[clamp(2.25rem,15vw,17rem)] font-bold uppercase leading-none tracking-[0.04em] text-ink/85 mix-blend-multiply sm:tracking-[0.06em]'
        >
          Feinwerk
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className='font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground'>
        {title}
      </p>
      <div className='mt-5 flex flex-col gap-2.5 text-sm'>{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={!isSectionLink(href)}
      className='fw-link w-fit text-foreground/80 transition-colors hover:text-foreground'
    >
      {children}
    </Link>
  );
}
