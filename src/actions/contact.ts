'use server';

import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

import { renderEnquiryHtml } from '@/lib/server/enquiry-email';
import { isMailConfigured, sendInternalMail } from '@/lib/server/mail';
import { isRateLimited } from '@/lib/server/rate-limit';
import { safeActionClient } from '@/lib/server/safe-action';
import Logger from '@/utils/logger';

import { env, isSupabaseConfigured } from '@/env';
import {
  BUDGET_OPTIONS,
  contactSchema,
  SERVICE_OPTIONS,
} from '@/schema/contact';

/**
 * Handles the contact form. Delivery is layered so the form always
 * succeeds for the visitor:
 *
 * 1. Email via Resend, when configured.
 * 2. Row in `contact_messages`, when Supabase is configured.
 * 3. Server log, always.
 */
export const submitContact = safeActionClient
  .schema(contactSchema)
  .action(async ({ parsedInput }) => {
    // Honeypot filled: pretend success, drop silently.
    if (parsedInput.website) return { delivered: true };

    const headerStore = await headers();
    const ip =
      headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headerStore.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(`contact:${ip}`)) {
      throw new Error(
        'Too many messages from this connection. Please try again in a few minutes or email us directly.',
      );
    }

    const service =
      SERVICE_OPTIONS.find((option) => option.value === parsedInput.service)
        ?.label ?? parsedInput.service;
    const budget =
      BUDGET_OPTIONS.find((option) => option.value === parsedInput.budget)
        ?.label ?? parsedInput.budget;

    const summary = [
      `Name: ${parsedInput.name}`,
      `Email: ${parsedInput.email}`,
      `Company: ${parsedInput.company || '-'}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      '',
      parsedInput.message,
    ].join('\n');

    let delivered = false;
    let mailError: unknown = null;

    if (isMailConfigured) {
      try {
        await sendInternalMail({
          subject: `New enquiry: ${parsedInput.name} (${service})`,
          text: summary,
          html: renderEnquiryHtml({ ...parsedInput, service, budget }),
          replyTo: parsedInput.email,
        });
        delivered = true;
      } catch (error) {
        // Remember it, but let the Supabase fallback below still run.
        mailError = error;
        Logger.error(
          'Contact email failed',
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    if (isSupabaseConfigured && env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createClient(
        env.NEXT_PUBLIC_SUPABASE_URL!,
        env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } },
      );
      const { error } = await admin.from('contact_messages').insert({
        name: parsedInput.name,
        email: parsedInput.email,
        company: parsedInput.company || null,
        service: parsedInput.service,
        budget: parsedInput.budget,
        message: parsedInput.message,
        ip,
      });
      if (error) Logger.error('contact_messages insert failed', error.message);
      else delivered = true;
    }

    if (!delivered) {
      // Nothing accepted the message. Always log it so it is not lost, then
      // tell the visitor the truth instead of showing a false success screen.
      Logger.info('Contact enquiry (undelivered)\n' + summary);

      if (mailError || isMailConfigured) {
        throw new Error(
          'We could not send your message just now. Please try again in a moment.',
        );
      }
    }

    return { delivered };
  });
