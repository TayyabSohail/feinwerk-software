'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { readCookieConsent, writeCookieConsent } from '@/lib/cookie-consent';

import { paths } from '@/constants/paths';

/**
 * GDPR-style consent banner. Analytics never loads before a decision, and
 * the choice is remembered per browser. Hidden entirely once answered.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

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
          aria-label='Cookie consent'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className='fixed inset-x-4 bottom-4 z-[60] sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-md'
        >
          <div className='fw-card p-5 shadow-mockup backdrop-blur-xl'>
            <p className='fw-kicker'>Cookies</p>
            <p className='mt-3 text-sm leading-relaxed text-foreground/85'>
              We use a privacy-friendly analytics cookie to understand which
              pages are useful. No advertising, no cross-site tracking. Read the{' '}
              <Link
                href={paths.legal.cookies}
                className='underline underline-offset-4'
              >
                cookie policy
              </Link>
              .
            </p>
            <div className='mt-5 flex gap-2'>
              <Button
                variant='brand'
                size='sm'
                onClick={() => decide('accepted')}
              >
                Accept
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => decide('rejected')}
              >
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
