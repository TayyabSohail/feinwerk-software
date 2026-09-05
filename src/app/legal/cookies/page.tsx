import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { paths } from '@/constants/paths';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Which cookies and browser storage the Feinwerk Software website uses, what they do, and how to change your choice.',
  alternates: { canonical: paths.legal.cookies },
};

const UPDATED = '5 September 2026';

const sections: LegalSection[] = [
  {
    id: 'what',
    title: 'What cookies are',
    body: (
      <p>
        Cookies and similar browser storage (local storage) are small pieces of
        data a website saves in your browser. Some are needed for a site to
        work; others measure how it is used. This site uses very few, and none
        for advertising.
      </p>
    ),
  },
  {
    id: 'essential',
    title: 'Strictly necessary storage',
    body: (
      <>
        <p>
          These are set without consent because the site cannot function
          properly without them:
        </p>
        <ul>
          <li>
            <strong>fw-cookie-consent</strong> (local storage): remembers
            whether you accepted or declined analytics. Kept until you clear
            site data.
          </li>
          <li>
            <strong>theme</strong> (local storage): remembers your light or dark
            mode choice. Kept until you clear site data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'analytics',
    title: 'Analytics, with your consent',
    body: (
      <>
        <p>
          If you click &ldquo;Accept&rdquo; on the cookie banner, we load
          PostHog analytics. It sets a first-party cookie and local storage
          entry (prefixed <strong>ph_</strong>) containing a random identifier
          so that repeat visits are counted once. It records pages viewed,
          referring site, device type and approximate country. It does not
          record what you type into forms.
        </p>
        <p>
          The identifier is kept for up to 12 months. Data is processed by
          PostHog in the EU. If you decline, nothing from PostHog is loaded.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party content',
    body: (
      <p>
        Links to Cal.com, LinkedIn, GitHub and WhatsApp take you to those
        services, which set their own cookies under their own policies. We do
        not embed third-party widgets that set cookies on this site.
      </p>
    ),
  },
  {
    id: 'change',
    title: 'Changing your choice',
    body: (
      <p>
        To withdraw or change consent, clear this site&rsquo;s data in your
        browser settings (usually under Privacy or Site settings). The banner
        will appear again on your next visit. You can also block cookies
        entirely in your browser; the site will still work.
      </p>
    ),
  },
  {
    id: 'more',
    title: 'More information',
    body: (
      <p>
        How we handle personal data more generally is described in the{' '}
        <Link href={paths.legal.privacy}>privacy policy</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      kicker='Legal'
      title='Cookie Policy'
      accentWords={[0]}
      description='Two small pieces of storage to remember your preferences, and one analytics cookie only if you say yes.'
      updated={UPDATED}
      href={paths.legal.cookies}
      sections={sections}
    />
  );
}
