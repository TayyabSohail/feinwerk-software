import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Every integration is optional so the marketing site builds and runs with
 * nothing but NEXT_PUBLIC_APP_URL set. Features light up as keys are added:
 *
 * - RESEND_API_KEY + CONTACT_TO_EMAIL  -> contact form delivers by email
 * - NEXT_PUBLIC_SUPABASE_*             -> contact form is also stored in DB
 * - NEXT_PUBLIC_POSTHOG_*              -> analytics (after cookie consent)
 * - NEXT_PUBLIC_CAL_LINK               -> "Book a call" links to Cal.com
 */
export const env = createEnv({
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    CONTACT_TO_EMAIL: z.string().email().optional(),
    CONTACT_FROM_EMAIL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    NEXT_PUBLIC_CAL_LINK: z.string().optional(),

    NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
    NEXT_PUBLIC_APP_NAME: z.string().default('Feinwerks Software'),
  },
  runtimeEnv: {
    // Supabase variables
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Email
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    // PostHog variables
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Booking
    NEXT_PUBLIC_CAL_LINK: process.env.NEXT_PUBLIC_CAL_LINK,
    // App specific variables
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
  emptyStringAsUndefined: true,
});

export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
