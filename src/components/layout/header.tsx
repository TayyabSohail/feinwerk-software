'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { MobileMenu } from '@/components/layout/mobile-menu';

import { cn } from '@/lib/utils';

import { primaryNav } from '@/constants/navigation';
import { isSectionLink, paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface HeaderProps {
  dict: Dictionary;
}

/** Full-width bar: wordmark left, mono nav right, filled CONTACT button. */
export function Header({ dict }: HeaderProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = [
    { label: dict.nav.home, href: paths.home },
    ...primaryNav(dict),
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12);
  });

  // Home only matches exactly, so it doesn't light up on every route.
  // Section links such as /about#how-it-works never read as the current page.
  const isActive = (href: string) =>
    href === paths.home
      ? pathname === href
      : !isSectionLink(href) && pathname.startsWith(href);

  return (
    <motion.header
      initial={false}
      className={cn(
        'fixed inset-x-0 top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        // The header is the stacking context for the menu overlay it renders,
        // so while the menu is open it has to sit above the cookie banner
        // (z-60) or the banner covers the menu's CTAs.
        mobileMenuOpen
          ? 'z-[70] border-line bg-background'
          : scrolled
            ? 'z-50 border-line bg-background/85 backdrop-blur-xl'
            : 'z-50 border-transparent bg-transparent',
      )}
    >
      <div className='fw-container flex h-[4.25rem] items-center justify-between'>
        <Logo />

        <nav aria-label='Primary' className='hidden items-center gap-8 md:flex'>
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                // Lenis animates section links; Next's own jump would fight it.
                scroll={!isSectionLink(item.href)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors',
                  active
                    ? 'font-bold text-foreground'
                    : 'fw-link font-medium text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                {/* The current page keeps a solid underline; other links get
                    the sliding fw-link one on hover. */}
                {active && (
                  <span
                    aria-hidden
                    className='absolute -bottom-1.5 left-0 h-[2px] w-full bg-foreground'
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className='flex shrink-0 items-center gap-3'>
          <LocaleSwitcher
            current={dict.locale}
            label={dict.nav.language}
            className='hidden sm:inline-flex'
          />
          {/* Shown at every width so phones get a CTA beside the hamburger,
              not only the icon. Dropped on the contact page itself, where it
              would only point at the form already on screen. */}
          {!isActive(paths.contact) && (
            <Link
              href={paths.contact}
              className='fw-btn fw-btn-primary inline-flex h-10 items-center px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] sm:px-5'
            >
              {dict.nav.contact}
            </Link>
          )}
          <MobileMenu dict={dict} onOpenChange={setMobileMenuOpen} />
        </div>
      </div>
    </motion.header>
  );
}
