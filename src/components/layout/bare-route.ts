/**
 * Routes that render without the site chrome.
 *
 * `/contact` is deliberately isolated: once someone has decided to write to
 * us, the nav, footer, preloader and ambient effects are only competition for
 * the form. The header, footer and preloader live in the root layout, which a
 * nested route cannot unmount, so each of them checks this instead.
 */
const BARE_ROUTES = ['/contact'];

export function isBareRoute(pathname: string | null) {
  if (!pathname) return false;
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
