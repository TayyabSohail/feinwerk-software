import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

/** Translated label for a legal document link, keyed by its href. */
export function legalLabel(href: string, dict: Dictionary): string | null {
  const t = dict.legal;
  switch (href) {
    case paths.legal.privacy:
      return t.policies.privacy.title;
    case paths.legal.terms:
      return t.policies.terms.title;
    case paths.legal.cookies:
      return t.policies.cookies.title;
    case paths.legal.imprint:
      return t.policies.imprint.title;
    case paths.legal.index:
      return t.backToLegal;
    default:
      return null;
  }
}
