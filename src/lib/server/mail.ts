import { Resend } from 'resend';

import { appConfig } from '@/config/app';
import { env } from '@/env';

export const isMailConfigured = Boolean(
  env.RESEND_API_KEY && env.CONTACT_TO_EMAIL,
);

/**
 * True while the shared Resend sender is in use. That address only delivers to
 * the address that owns the Resend account, so a mismatch with CONTACT_TO_EMAIL
 * silently drops every enquiry. Surfaced in the error so the cause is obvious.
 */
const usingSharedSender = /onboarding@resend\.dev/i.test(
  appConfig.emails.sender,
);

interface SendMailInput {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

/** Sends an internal notification email. No-op until Resend is configured. */
export async function sendInternalMail({
  subject,
  text,
  html,
  replyTo,
}: SendMailInput) {
  if (!isMailConfigured) return { skipped: true as const };

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: appConfig.emails.sender,
    to: env.CONTACT_TO_EMAIL!,
    replyTo,
    subject,
    text,
    ...(html ? { html } : {}),
  });

  if (error) {
    const hint = usingSharedSender
      ? ` (sending from onboarding@resend.dev, which only delivers to the address that owns the Resend account - verify feinwerks.software in Resend and set CONTACT_FROM_EMAIL to an address on it, or set CONTACT_TO_EMAIL to the account owner's address)`
      : '';
    throw new Error(`${error.message}${hint}`);
  }

  return { skipped: false as const };
}

interface SendVisitorMailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Sends the acknowledgement to the person who filled in the form.
 *
 * Separate from sendInternalMail because a failure here must never fail the
 * submission: the enquiry has already reached us, and the visitor has already
 * seen the confirmation screen. Callers log the error and carry on.
 *
 * Note this cannot work while the shared onboarding@resend.dev sender is in
 * use - that sender only delivers to the Resend account owner, never to a
 * visitor - so it is skipped rather than attempted and failed.
 */
export async function sendVisitorMail({
  to,
  subject,
  text,
  html,
}: SendVisitorMailInput) {
  if (!isMailConfigured || usingSharedSender) return { skipped: true as const };

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: appConfig.emails.sender,
    to,
    replyTo: env.CONTACT_TO_EMAIL!,
    subject,
    text,
    ...(html ? { html } : {}),
  });

  if (error) throw new Error(error.message);
  return { skipped: false as const };
}
