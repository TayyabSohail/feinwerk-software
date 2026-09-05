import { Resend } from 'resend';

import { appConfig } from '@/config/app';
import { env } from '@/env';

export const isMailConfigured = Boolean(
  env.RESEND_API_KEY && env.CONTACT_TO_EMAIL,
);

interface SendMailInput {
  subject: string;
  text: string;
  replyTo?: string;
}

/** Sends an internal notification email. No-op until Resend is configured. */
export async function sendInternalMail({
  subject,
  text,
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
  });

  if (error) throw new Error(error.message);
  return { skipped: false as const };
}
