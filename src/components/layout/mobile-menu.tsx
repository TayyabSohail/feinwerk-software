'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LocaleSwitcher } from '@/components/layout/locale-switcher';

import { cn } from '@/lib/utils';

import { primaryNav } from '@/constants/navigation';
import { isSectionLink, paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

const ease = [0.16, 1, 0.3, 1] as const;

interface MobileMenuProps {
  dict: Dictionary;
  onOpenChange?: (open: boolean) => void;
  /**
   * Wrapper classes. The header hides the trigger from `lg` up, where the
   * full nav fits; the contact page, which has no other nav, passes an
   * empty string so the hamburger is the menu at every width.
   */
  className?: string;
}

export function MobileMenu({
  dict,
  onOpenChange,
  className = 'lg:hidden',
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { label: dict.nav.home, href: paths.home },
    ...primaryNav(dict),
    { label: dict.nav.contact, href: paths.contact },
  ];

  return (
    <div className={className}>
      <button
        type='button'
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
        aria-expanded={open}
        className='relative z-[70] flex h-10 w-10 items-center justify-center border border-ink/20 bg-background shadow-sm'
      >
        {open ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key='menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // Solid, not `bg-background/98`: the colour is defined as
            // hsl(var(--background)) with no alpha slot, so Tailwind dropped
            // the modifier and only the blur remained, showing the page
            // through the menu.
            className='fixed inset-0 z-[65] flex h-[100dvh] flex-col bg-background'
            data-lenis-prevent
          >
            <div className='h-[4.25rem] shrink-0 border-b border-line/10' />

            <nav
              aria-label='Mobile'
              className='fw-container flex min-h-0 flex-1 flex-col overflow-y-auto pb-4 pt-4'
            >
              {links.map((item, index) => {
                const active =
                  item.href === paths.home
                    ? pathname === item.href
                    : !isSectionLink(item.href) &&
                      pathname.startsWith(item.href);
                return (
                  <div
                    key={item.href}
                    className='overflow-hidden border-b py-1'
                  >
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%' }}
                      transition={{
                        duration: 0.7,
                        ease,
                        delay: 0.05 + index * 0.06,
                      }}
                    >
                      <Link
                        href={item.href}
                        // Same-page section links do not change the pathname,
                        // so the menu has to close itself. Lenis animates
                        // them; Next's own jump would fight it.
                        onClick={() => setOpen(false)}
                        scroll={!isSectionLink(item.href)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-baseline gap-4 py-3',
                          active ? 'text-brand-text' : 'text-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'fw-display text-display-md uppercase',
                            active && 'underline underline-offset-[6px]',
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* The header only shows the language switcher from `sm` up, so
                on phones this is the one place to change language. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className='fw-container flex shrink-0 items-center justify-between border-t border-line/10 py-5 sm:hidden'
            >
              <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
                {dict.nav.language}
              </span>
              <LocaleSwitcher current={dict.locale} label={dict.nav.language} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
