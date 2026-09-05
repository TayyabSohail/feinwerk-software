'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { readCookieConsent, writeCookieConsent } from '@/lib/cookie-consent';

import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

/**
 * GDPR-style consent banner. Analytics never loads before a decision, and
 * the choice is remembered per browser. Hidden entirely once answered.
 */
export function CookieConsent({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const t = dict.cookies;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(readCookieConsent() === null);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    writeCookieConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role='dialog'
          aria-live='polite'
          aria-label={t.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className='fixed inset-x-4 bottom-4 z-[60] sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-md'
        >
          <div className='fw-card p-5 shadow-mockup backdrop-blur-xl'>
            <p className='fw-kicker'>{t.kicker}</p>
            <p className='mt-3 text-sm leading-relaxed text-foreground/85'>
              {t.bodyBefore}{' '}
              <Link
                href={paths.legal.cookies}
                className='underline underline-offset-4'
              >
                {t.link}
              </Link>
              {t.bodyAfter}
            </p>
            <div className='mt-5 flex gap-2'>
              <Button
                variant='brand'
                size='sm'
                onClick={() => decide('accepted')}
              >
                {t.accept}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => decide('rejected')}
              >
                {t.decline}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
