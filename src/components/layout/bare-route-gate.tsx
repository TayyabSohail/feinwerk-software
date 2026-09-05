'use client';

import { usePathname } from 'next/navigation';

import { isBareRoute } from '@/components/layout/bare-route';

/**
 * Hides its children on routes that render without the site chrome.
 *
 * Exists for the footer, which is a server component and so cannot read the
 * pathname itself. The header and preloader are client components and check
 * `isBareRoute` directly.
 */
export function BareRouteGate({ children }: { children: React.ReactNode }) {
  return isBareRoute(usePathname()) ? null : <>{children}</>;
}
