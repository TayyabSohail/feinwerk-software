import { paths } from '@/constants/paths';
import { env } from '@/env';

/**
 * Accepts "username" or "username/event-slug" only. Rejects API keys
 * (cal_live_..., cal_test_...), and tolerates a pasted full cal.com URL.
 */
function parseCalHandle(value: string | undefined) {
  if (!value) return null;
  const handle = value.trim().replace(/^https?:\/\/(www\.)?cal\.com\//i, '');
  if (/^cal_(live|test)_/i.test(handle)) return null;
  return /^[a-z0-9._-]+(\/[a-z0-9._-]+)?$/i.test(handle) ? handle : null;
}

const calHandle = parseCalHandle(env.NEXT_PUBLIC_CAL_LINK);

/**
 * Single source of truth for company facts that appear across the site:
 * header, footer, contact page, legal pages, structured data and metadata.
 */
export const siteConfig = {
  name: 'Feinwerks Software',
  shortName: 'Feinwerks',
  legalName: 'Feinwerks Software',
  tagline: 'Products engineered from MVP to scale',
  description:
    'Feinwerks Software designs, builds and maintains web platforms, AI systems and cloud automation. Written scope, fixed or custom quote, committed launch date, support after launch.',
  url: env.NEXT_PUBLIC_APP_URL,
  founded: 2024,
  /**
   * Inbox that actually receives enquiries. Delivery only - this is a
   * placeholder mailbox until the hello@feinwerks.software inbox exists,
   * so it is deliberately never rendered anywhere on the site.
   */
  email: 'feinwerksoftware@gmail.com',
  /**
   * The address shown publicly. `null` while the company inbox is pending:
   * every surface then points at the contact form instead of a mailto link.
   * Set this to 'hello@feinwerks.software' once that inbox is live.
   */
  publicEmail: null as string | null,
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
  /**
   * Cal.com booking link, built from NEXT_PUBLIC_CAL_LINK.
   *
   * That variable must hold the booking handle - "username" or
   * "username/event", e.g. feinwerks/intro - never a Cal.com API key. A key
   * was set here once and produced a dead https://cal.com/cal_live_... URL
   * that still rendered as a working button, so anything that does not look
   * like a handle is now ignored instead of linked.
   */
  calLink: calHandle ? `https://cal.com/${calHandle}` : null,
  /** The bare handle, for the inline embed. Null when not configured. */
  calHandle,
  nav: [
    { label: 'Home', href: paths.home },
    { label: 'Services', href: paths.services },
    { label: 'Projects', href: paths.work },
    { label: 'Pricing', href: paths.pricing },
    { label: 'About', href: paths.about },
    { label: 'Careers', href: paths.careers },
    { label: 'Contact', href: paths.contact },
  ],
  footerNav: {
    company: [
      { label: 'Home', href: paths.home },
      { label: 'Services', href: paths.services },
      { label: 'Projects', href: paths.work },
      { label: 'Pricing', href: paths.pricing },
      { label: 'About', href: paths.about },
      { label: 'Careers', href: paths.careers },
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
