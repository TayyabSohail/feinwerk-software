import { paths } from '@/constants/paths';

import { siteConfig } from '@/config/site';

/**
 * Where to send someone who wants to reach us.
 *
 * While `siteConfig.publicEmail` is null there is no inbox worth publishing,
 * so every surface links to the contact form instead of a mailto address.
 * Once the company inbox exists, setting `publicEmail` flips all of them back
 * to a real mailto link without touching the call sites.
 */
export function contactRoute(subject?: string) {
  const email = siteConfig.publicEmail;

  if (!email) {
    return { href: paths.contact, isEmail: false as const, label: null };
  }

  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return { href: `mailto:${email}${query}`, isEmail: true as const, label: email };
}
