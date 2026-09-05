'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { isBareRoute } from '@/components/layout/bare-route';
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
  const items = primaryNav(dict);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12);
  });

  // The contact route renders its own minimal chrome.
  const bare = isBareRoute(pathname);

  // Section links such as /#pricing never read as the current page.

  const isActive = (href: string) =>
    !isSectionLink(href) && pathname.startsWith(href);

  if (bare) return null;

  return (
    <motion.header
      initial={false}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-line bg-background/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
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

        <div className='flex items-center gap-3'>
          <LocaleSwitcher
            current={dict.locale}
            label={dict.nav.language}
            className='hidden sm:inline-flex'
          />
          <Link
            href={paths.contact}
            className='fw-btn fw-btn-ink hidden h-10 items-center px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] sm:inline-flex'
          >
            {dict.nav.contact}
          </Link>
          <MobileMenu dict={dict} />
        </div>
      </div>
    </motion.header>
  );
}
