import { Resend } from 'resend';

import { appConfig } from '@/config/app';
import { env } from '@/env';

export const isMailConfigured = Boolean(
  env.RESEND_API_KEY && env.CONTACT_TO_EMAIL,
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

  if (error) throw new Error(error.message);
  return { skipped: false as const };
}
