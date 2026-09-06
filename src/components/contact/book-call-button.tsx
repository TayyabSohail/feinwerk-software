'use client';

import { getCalApi } from '@calcom/embed-react';
import { CalendarDays } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

/** One namespace for every modal trigger, so the iframe is shared. */
const NAMESPACE = 'feinwerks-book';

/** Matches `--brand` in globals.css (emerald-500). */
const BRAND = '#10b981';

interface BookCallButtonProps {
  /** Bare Cal.com handle, "username" or "username/event". */
  calHandle: string;
  children: ReactNode;
  className?: string;
  /** Hide the calendar glyph, e.g. where the label is long. */
  hideIcon?: boolean;
  /** Runs before the modal opens, e.g. to close a menu underneath it. */
  onOpen?: () => void;
}

/**
 * Opens Cal.com as a modal over the current page.
 *
 * Every "book a call" surface on the site must go through this or through
 * the inline `CalEmbed`: never link out to cal.com. Leaving the site to book
 * loses the visitor, and the embed already covers both cases.
 */
export function BookCallButton({
  calHandle,
  children,
  className,
  hideIcon,
  onOpen,
}: BookCallButtonProps) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal('ui', {
        layout: 'month_view',
        theme: 'light',
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { 'cal-brand': BRAND },
          dark: { 'cal-brand': BRAND },
        },
      });
      // Fetch the booking page early so the modal opens without a blank wait.
      cal('preload', { calLink: calHandle });
    })();
    return () => {
      cancelled = true;
    };
  }, [calHandle]);

  const open = async () => {
    onOpen?.();
    const cal = await getCalApi({ namespace: NAMESPACE });
    cal('modal', {
      calLink: calHandle,
      config: { layout: 'month_view' },
    });
  };

  return (
    <button
      type='button'
      onClick={open}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {!hideIcon && <CalendarDays className='h-4 w-4' aria-hidden='true' />}
      {children}
    </button>
  );
}
