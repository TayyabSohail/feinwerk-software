'use server';

import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

import {
  renderAcknowledgementHtml,
  renderEnquiryHtml,
} from '@/lib/server/enquiry-email';
import {
  isMailConfigured,
  sendInternalMail,
  sendVisitorMail,
} from '@/lib/server/mail';
import { isRateLimited } from '@/lib/server/rate-limit';
import { safeActionClient } from '@/lib/server/safe-action';
import Logger from '@/utils/logger';

import { siteConfig } from '@/config/site';
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

        // Acknowledgement to the visitor. Best effort: the enquiry is
        // already delivered, so a failure here must not fail the action.
        try {
          const firstName = parsedInput.name.split(' ')[0] || parsedInput.name;
          await sendVisitorMail({
            to: parsedInput.email,
            subject: `We have your message - ${siteConfig.name}`,
            text: [
              `Hi ${firstName},`,
              '',
              `Thanks for getting in touch about ${service}. A real person reads`,
              `every enquiry and you will hear back ${siteConfig.responseTime}.`,
              '',
              'What you sent:',
              parsedInput.message,
            ].join('\n'),
            html: renderAcknowledgementHtml({
              name: parsedInput.name,
              service,
              message: parsedInput.message,
              responseTime: siteConfig.responseTime,
            }),
          });
        } catch (error) {
          Logger.error(
            'Contact acknowledgement failed',
            error instanceof Error ? error.message : String(error),
          );
        }
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

    if (mailError && delivered) {
      // Stored in Supabase, but nothing reached the inbox. Nobody watches
      // the table, so log the enquiry where it will actually be noticed.
      Logger.error(
        'Contact enquiry stored but NOT emailed - check Resend config\n' +
          summary,
      );
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
