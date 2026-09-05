import { paths } from '@/constants/paths';
import { env } from '@/env';

/**
 * Single source of truth for company facts that appear across the site:
 * header, footer, contact page, legal pages, structured data and metadata.
 */
export const siteConfig = {
  name: 'Feinwerks Software',
  shortName: 'Feinwerks',
  legalName: 'Feinwerks Software',
  tagline: 'Precision-engineered software.',
  description:
    'Feinwerks Software is a software engineering studio building and maintaining full-stack products, AI systems and cloud automation for companies in Europe, Asia and beyond. Fixed or custom quotes, committed dates, support after launch. From Islamabad and Fellbach, shipped worldwide.',
  url: env.NEXT_PUBLIC_APP_URL,
  founded: 2024,
  // Email lives here so it can be swapped once the company inbox exists.
  email: 'hello@feinwerks.software',
  responseTime: 'within one business day',
  availability: 'Accepting new projects',
  locations: [
    {
      id: 'islamabad',
      city: 'Islamabad',
      country: 'Pakistan',
      countryCode: 'PK',
      label: 'Asian Office',
      timezone: 'Asia/Karachi',
      utc: 'UTC+5',
    },
    {
      id: 'fellbach',
      city: 'Fellbach',
      country: 'Germany',
      countryCode: 'DE',
      label: 'European Office',
      timezone: 'Europe/Berlin',
      utc: 'UTC+1 / UTC+2',
    },
  ],
  founder: {
    name: 'Tayyab Sohail',
    role: 'Founder & Lead Engineer',
  },
  calLink: env.NEXT_PUBLIC_CAL_LINK
    ? `https://cal.com/${env.NEXT_PUBLIC_CAL_LINK}`
    : null,
  nav: [
    { label: 'Services', href: paths.services },
    { label: 'Projects', href: paths.work },
    { label: 'Pricing', href: paths.pricing },
    { label: 'About', href: paths.about },
    { label: 'Contact', href: paths.contact },
  ],
  footerNav: {
    company: [
      { label: 'Services', href: paths.services },
      { label: 'Projects', href: paths.work },
      { label: 'Pricing', href: paths.pricing },
      { label: 'About', href: paths.about },
      { label: 'Contact', href: paths.contact },
    ],
    legal: [
      { label: 'Privacy Policy', href: paths.legal.privacy },
      { label: 'Terms of Service', href: paths.legal.terms },
      { label: 'Cookie Policy', href: paths.legal.cookies },
      { label: 'Imprint', href: paths.legal.imprint },
      { label: 'All legal documents', href: paths.legal.index },
    ],
  },
  stats: [
    { value: 100, suffix: '+', label: 'Projects delivered' },
    { value: 30, suffix: '+', label: 'Clients served' },
    { value: 5, suffix: '+', label: 'Years building products' },
    { value: 2, suffix: '', label: 'Countries, one team' },
  ],
} as const;

export type SiteLocation = (typeof siteConfig.locations)[number];
