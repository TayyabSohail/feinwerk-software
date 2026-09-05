import { cookies, headers } from 'next/headers';

import { DEFAULT_LOCALE, isLocale, type Locale, LOCALE_COOKIE } from './config';
import { de } from './dictionaries/de';
import { type Dictionary, en } from './dictionaries/en';

const DICTIONARIES: Record<Locale, Dictionary> = { en, de };

/**
 * Locale for the current request: the visitor's explicit choice (cookie),
 * otherwise the browser's preferred language, otherwise English.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const chosen = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;

  const accept = (await headers()).get('accept-language') ?? '';
  if (/^de\b|,\s*de\b/i.test(accept)) return 'de';
  return DEFAULT_LOCALE;
}

export async function getDictionary(): Promise<Dictionary> {
  return DICTIONARIES[await getLocale()];
}
