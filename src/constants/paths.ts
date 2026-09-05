export const paths = {
  home: '/',
  services: '/services',
  service: (slug: string) => `/services/${slug}` as const,
  work: '/work',
  caseStudy: (slug: string) => `/work/${slug}` as const,
  about: '/about',
  process: '/about#how-it-works',
  pricing: '/pricing',
  careers: '/careers',
  contact: '/contact',
  legal: {
    index: '/legal',
    privacy: '/legal/privacy',
    terms: '/legal/terms',
    cookies: '/legal/cookies',
    imprint: '/legal/imprint',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
} as const;

/** True for a link into a section of a page (/about#how-it-works) rather than a page. */
export const isSectionLink = (href: string) => href.includes('#');
