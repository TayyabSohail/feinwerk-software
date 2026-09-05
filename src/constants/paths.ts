export const paths = {
  home: '/',
  services: '/services',
  service: (slug: string) => `/services/${slug}` as const,
  work: '/work',
  caseStudy: (slug: string) => `/work/${slug}` as const,
  about: '/about',
  process: '/about#how-it-works',
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
