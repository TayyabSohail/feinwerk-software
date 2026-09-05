'use client';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

import { COOKIE_CONSENT_EVENT, readCookieConsent } from '@/lib/cookie-consent';

import { env } from '@/env';

/**
 * PostHog only initialises after the visitor accepts analytics cookies. The
 * consent banner dispatches COOKIE_CONSENT_EVENT so a decision made on the
 * current page takes effect without a reload.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!env.NEXT_PUBLIC_POSTHOG_KEY) return;

    let initialised = false;
    const init = () => {
      if (initialised || readCookieConsent() !== 'accepted') return;
      initialised = true;
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: '/ingest',
        ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
      });
    };

    init();
    window.addEventListener(COOKIE_CONSENT_EVENT, init);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, init);
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
