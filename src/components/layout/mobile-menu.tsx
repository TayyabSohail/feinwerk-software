'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Flag } from '@/components/brand/flags';
import { Logo } from '@/components/brand/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

const ease = [0.16, 1, 0.3, 1] as const;

interface MobileMenuProps {
  dict: Dictionary;
}

export function MobileMenu({ dict }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

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
    { label: dict.nav.services, href: paths.services },
    { label: dict.nav.work, href: paths.work },
    { label: dict.nav.about, href: paths.about },
    { label: dict.nav.contact, href: paths.contact },
    { label: dict.nav.careers, href: paths.careers },
  ];

  return (
    <div className='md:hidden'>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-label={dict.nav.menuOpen}
        aria-expanded={open}
        className='flex h-10 w-10 items-center justify-center border border-ink/30 bg-white/70'
      >
        <Menu className='h-4 w-4' />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key='menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-[70] flex flex-col bg-background'
            data-lenis-prevent
          >
            <div className='fw-container flex h-[4.25rem] items-center justify-between border-b'>
              <Logo />
              <div className='flex items-center gap-2'>
                <LocaleSwitcher
                  current={dict.locale}
                  label={dict.nav.language}
                />
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  aria-label={dict.nav.menuClose}
                  className='flex h-10 w-10 items-center justify-center border border-ink/30 bg-white/70'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>

            <nav
              aria-label='Mobile'
              className='fw-container flex flex-1 flex-col justify-center gap-1 py-10'
            >
              {links.map((item, index) => {
                const active =
                  item.href === paths.home
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
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
                        className={cn(
                          'flex items-baseline gap-4 py-3',
                          active ? 'text-brand-text' : 'text-foreground',
                        )}
                      >
                        <span className='font-mono text-xs text-muted-foreground'>
                          0{index + 1}
                        </span>
                        <span className='fw-display text-display-md uppercase'>
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className='fw-container border-t py-6'
            >
              <Link
                href={paths.contact}
                className='fw-btn fw-btn-primary flex h-12 w-full items-center justify-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em]'
              >
                {dict.nav.cta}
              </Link>
              <div className='mt-6 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>
                {siteConfig.locations.map((location) => (
                  <div key={location.id}>
                    <p className='flex items-center gap-2 text-foreground'>
                      <Flag
                        countryCode={location.countryCode}
                        className='h-3 w-[18px]'
                      />
                      {location.city}
                    </p>
                    <a href={location.phoneHref} className='mt-1 block'>
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
