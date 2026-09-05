export type CookieConsent = 'accepted' | 'rejected';

const STORAGE_KEY = 'fw-cookie-consent';

/** Fired on `window` whenever the visitor records a consent decision. */
export const COOKIE_CONSENT_EVENT = 'fw:cookie-consent';

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The
    // banner simply shows again next visit.
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
