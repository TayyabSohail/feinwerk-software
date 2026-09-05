import { paths } from '@/constants/paths';
import type { Dictionary } from '@/i18n/dictionaries/en';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * The primary links in the order the header shows them. The mobile menu and
 * the footer's Company column build on this same list, so the three never
 * drift apart.
 */
export function primaryNav(dict: Dictionary): NavItem[] {
  return [
    { label: dict.nav.services, href: paths.services },
    { label: dict.nav.work, href: paths.work },
    { label: dict.nav.about, href: paths.about },
    { label: dict.nav.pricing, href: paths.pricing },
  ];
}
