import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Feinwerk Software collects, uses and protects personal data on this website and in client engagements, in line with the GDPR.',
  alternates: { canonical: paths.legal.privacy },
};

const UPDATED = '5 September 2026';

const sections: LegalSection[] = [
  {
    id: 'controller',
    title: 'Who is responsible',
    body: (
      <>
        <p>
          The controller for personal data processed through this website is{' '}
          <strong>{siteConfig.legalName}</strong>, with offices in{' '}
          {siteConfig.locations
            .map((location) => `${location.city}, ${location.country}`)
            .join(' and ')}
          . Full contact details are in the{' '}
          <Link href={paths.legal.imprint}>imprint</Link>.
        </p>
        <p>
          Questions about this policy or your data can be sent to{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'What we collect',
    body: (
      <>
        <p>
          We keep data collection to what the site needs to work and to answer
          you.
        </p>
        <ul>
          <li>
            <strong>Contact enquiries.</strong> Name, email address, company
            (optional), the service and budget range you select, and your
            message. We also record the IP address the enquiry came from, to
            protect the form from abuse.
          </li>
          <li>
            <strong>Server logs.</strong> Our hosting provider records standard
            request data (IP address, user agent, requested URL, timestamp) for
            security and reliability. Logs are retained for a short period and
            then deleted.
          </li>
          <li>
            <strong>Analytics, only with consent.</strong> If you accept
            analytics cookies, we use PostHog to understand which pages are
            useful. We do not use advertising trackers or sell data.
          </li>
          <li>
            <strong>Preferences.</strong> Your theme choice and cookie decision
            are stored in your browser only and never sent to us.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'purposes',
    title: 'Why we use it and on what basis',
    body: (
      <>
        <ul>
          <li>
            <strong>Responding to enquiries</strong> and preparing proposals:
            Art. 6(1)(b) GDPR (steps prior to a contract) and Art. 6(1)(f) (our
            legitimate interest in answering you).
          </li>
          <li>
            <strong>Running the website securely</strong>, including rate
            limiting and log retention: Art. 6(1)(f) GDPR.
          </li>
          <li>
            <strong>Analytics</strong>: Art. 6(1)(a) GDPR, your consent, which
            you can withdraw at any time by clearing site data in your browser.
          </li>
          <li>
            <strong>Legal obligations</strong>, such as tax record keeping for
            invoices: Art. 6(1)(c) GDPR.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'processors',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          We use a small number of service providers who process data on our
          behalf under data processing agreements:
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (USA / EU regions) for hosting and
            content delivery.
          </li>
          <li>
            <strong>Resend</strong> for delivering contact form notifications by
            email.
          </li>
          <li>
            <strong>Supabase</strong> (EU region) for storing contact
            submissions, where enabled.
          </li>
          <li>
            <strong>PostHog</strong> (EU cloud) for analytics, only after
            consent.
          </li>
          <li>
            <strong>Cal.com</strong> if you book a call through a link we
            provide; their privacy policy applies to the booking.
          </li>
        </ul>
        <p>
          Where a provider is outside the EU or EEA, transfers are covered by
          the EU Standard Contractual Clauses or an adequacy decision. We never
          sell personal data.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <>
        <ul>
          <li>
            Contact enquiries: up to 24 months after our last exchange, unless a
            contract follows.
          </li>
          <li>
            Contract and invoicing records: as long as commercial and tax law
            requires (typically 10 years in Germany).
          </li>
          <li>Server logs: up to 30 days.</li>
          <li>Analytics data: up to 12 months, in aggregated form.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under the GDPR you can ask us to:</p>
        <ul>
          <li>
            confirm whether we hold data about you and provide a copy (access);
          </li>
          <li>correct inaccurate data (rectification);</li>
          <li>
            delete your data where there is no longer a reason to keep it
            (erasure);
          </li>
          <li>
            restrict or object to processing based on legitimate interest;
          </li>
          <li>receive your data in a portable format;</li>
          <li>
            withdraw consent at any time, without affecting earlier processing.
          </li>
        </ul>
        <p>
          Write to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          . We respond within one month. You also have the right to lodge a
          complaint with a supervisory authority; for our German office that is
          the Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          Baden-Württemberg.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        All traffic to this site is encrypted in transit (TLS). Contact
        submissions are stored with access restricted to the people who handle
        them, protected by row-level security at the database and by server-only
        credentials. We review access and providers regularly.
      </p>
    ),
  },
  {
    id: 'clients',
    title: 'Data in client engagements',
    body: (
      <p>
        When we build or operate software for a client, we act as a processor
        for any personal data in that system and the client remains the
        controller. This is governed by a separate data processing agreement
        that we provide for every project involving personal data. This policy
        covers only this website.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We update this policy when our practices or the law change. The date at
        the top shows the current version. Material changes are announced on
        this page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker='Legal'
      title='Privacy Policy'
      accentWords={[0]}
      description='Plain-language explanation of what personal data this website collects, why, who sees it, and the rights you have over it.'
      updated={UPDATED}
      href={paths.legal.privacy}
      sections={sections}
    />
  );
}
