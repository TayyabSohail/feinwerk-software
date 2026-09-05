import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

export const metadata: Metadata = {
  title: 'Imprint',
  description:
    'Legal notice (Impressum) for Feinwerk Software: company details, contact information and responsible persons under German law.',
  alternates: { canonical: paths.legal.imprint },
};

const UPDATED = '5 September 2026';

const [rawalpindi, fellbach] = siteConfig.locations;

const sections: LegalSection[] = [
  {
    id: 'provider',
    title: 'Service provider',
    body: (
      <>
        <p>
          <strong>{siteConfig.legalName}</strong>
          <br />
          Owner: {siteConfig.founder.name}
          <br />
          {fellbach.city}, Baden-Württemberg, {fellbach.country}
        </p>
        <p>
          Information according to § 5 DDG (German Digital Services Act) and §
          18 (2) MStV. The full postal address of the European office is
          provided on every quotation, contract and invoice, and on request by
          email.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Telephone (Germany): <a href={fellbach.phoneHref}>{fellbach.phone}</a>
        <br />
        Telephone (Pakistan):{' '}
        <a href={rawalpindi.phoneHref}>{rawalpindi.phone}</a>
        <br />
        Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <br />
        Hours: {fellbach.hours} / {rawalpindi.hours}
      </p>
    ),
  },
  {
    id: 'engineering-office',
    title: 'Engineering office',
    body: (
      <p>
        {siteConfig.legalName}
        <br />
        {rawalpindi.city}, Punjab, {rawalpindi.country}
        <br />
        Telephone: <a href={rawalpindi.phoneHref}>{rawalpindi.phone}</a>
      </p>
    ),
  },
  {
    id: 'register',
    title: 'Register and tax information',
    body: (
      <p>
        {siteConfig.legalName} operates as an owner-managed business. Where a
        commercial register entry or a VAT identification number under § 27a
        UStG applies to a contracting entity, it is stated on the quotation and
        invoice for that engagement.
      </p>
    ),
  },
  {
    id: 'responsible',
    title: 'Responsible for content',
    body: (
      <p>
        Responsible for the content of this website according to § 18 (2) MStV:{' '}
        {siteConfig.founder.name}, {siteConfig.founder.role}, {fellbach.city},{' '}
        {fellbach.country}.
      </p>
    ),
  },
  {
    id: 'professional',
    title: 'Nature of the services',
    body: (
      <p>
        Software design, development, consulting and related services for
        business customers. Services are not directed at consumers. Case studies
        on this site describe work delivered for the named clients; product
        names and screenshots belong to their respective owners.
      </p>
    ),
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute resolution',
    body: (
      <p>
        The European Commission provides a platform for online dispute
        resolution at{' '}
        <a
          href='https://ec.europa.eu/consumers/odr/'
          target='_blank'
          rel='noopener noreferrer'
        >
          ec.europa.eu/consumers/odr
        </a>
        . We are neither obliged nor willing to participate in dispute
        resolution proceedings before a consumer arbitration board (§ 36 VSBG).
        Our services are directed at businesses.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability for content and links',
    body: (
      <>
        <p>
          As a service provider we are responsible for our own content on these
          pages under general law. We are not obliged to monitor transmitted or
          stored third-party information or to investigate circumstances that
          indicate illegal activity. Obligations to remove or block the use of
          information under general law remain unaffected; liability is possible
          only from the time we become aware of a specific infringement, and we
          will remove such content promptly.
        </p>
        <p>
          Our site contains links to external websites over which we have no
          control. The respective provider or operator is always responsible for
          the content of linked pages. Linked pages were checked for possible
          legal violations at the time of linking; illegal content was not
          recognisable at that time. Permanent monitoring of linked pages is not
          reasonable without concrete evidence of a violation.
        </p>
      </>
    ),
  },
  {
    id: 'copyright',
    title: 'Copyright',
    body: (
      <p>
        The content and works on these pages created by us are subject to German
        copyright law. Reproduction, editing, distribution and any kind of use
        beyond the limits of copyright require our written consent. Downloads
        and copies of this site are permitted for private, non-commercial use
        only. Where content was not created by us, third-party copyrights are
        respected and such content is marked as such. If you become aware of a
        copyright infringement, please let us know and we will remove the
        content promptly.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <p>
        Information about the processing of personal data is available in our{' '}
        <Link href={paths.legal.privacy}>privacy policy</Link>. All legal
        documents are listed on the{' '}
        <Link href={paths.legal.index}>legal page</Link>.
      </p>
    ),
  },
];

export default function ImprintPage() {
  return (
    <LegalPage
      kicker='Legal'
      title='Imprint'
      description='Legal notice (Impressum) required under German law, with the details of the company operating this website.'
      updated={UPDATED}
      href={paths.legal.imprint}
      sections={sections}
    />
  );
}
