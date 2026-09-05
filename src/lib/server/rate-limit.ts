/**
 * Tiny in-memory rate limiter for the contact form. Good enough to stop a
 * script from hammering the endpoint on a single instance; swap for Upstash
 * or a database table if the site ever runs on many instances.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
