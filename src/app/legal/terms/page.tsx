import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms on which Feinwerk Software provides this website and its software engineering services, including scope, payment, intellectual property and liability.',
  alternates: { canonical: paths.legal.terms },
};

const UPDATED = '5 September 2026';

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope of these terms',
    body: (
      <>
        <p>
          These terms govern (a) your use of the {siteConfig.name} website and
          (b) the general basis on which {siteConfig.legalName}{' '}
          (&ldquo;Feinwerk&rdquo;, &ldquo;we&rdquo;) provides software design,
          engineering and related services to business clients
          (&ldquo;you&rdquo;).
        </p>
        <p>
          Every engagement is additionally governed by a written proposal or
          statement of work (&ldquo;SOW&rdquo;) that describes scope,
          deliverables, timeline and fees. If a SOW conflicts with these terms,
          the SOW prevails for that engagement.
        </p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'Use of the website',
    body: (
      <>
        <p>
          The website is provided for information about our services. You may
          browse it and share links to it. You may not scrape it at scale, use
          it to send unsolicited messages, attempt to breach its security, or
          reproduce its content commercially without permission.
        </p>
        <p>
          Case studies describe work delivered for clients. Product names and
          logos shown belong to their respective owners and are used to identify
          the work, not to imply endorsement of this site.
        </p>
      </>
    ),
  },
  {
    id: 'proposals',
    title: 'Proposals and quotes',
    body: (
      <>
        <p>
          Estimates given in conversation or email are indicative. A binding
          quote is one we issue in writing as a proposal or SOW, and it is valid
          for 30 days unless stated otherwise.
        </p>
        <p>
          Fixed-price engagements cover the scope written in the SOW. Work
          outside that scope is agreed in writing as a change request before it
          starts, with its effect on price and timeline.
        </p>
      </>
    ),
  },
  {
    id: 'delivery',
    title: 'Delivery and acceptance',
    body: (
      <>
        <p>
          We deliver in increments, typically weekly, to a staging environment
          you can review. Each milestone is accepted when you confirm it in
          writing or when ten business days pass after delivery without a
          written list of defects, whichever comes first.
        </p>
        <p>
          A defect is a material deviation from the agreed scope. We correct
          defects reported during the acceptance window at no additional cost.
          Changes in preference or scope are handled as change requests.
        </p>
      </>
    ),
  },
  {
    id: 'client-obligations',
    title: 'Your responsibilities',
    body: (
      <ul>
        <li>
          Provide timely access to the people, systems, credentials and content
          the work depends on.
        </li>
        <li>
          Review deliverables and give feedback within the agreed windows.
        </li>
        <li>
          Ensure that content and data you supply does not infringe third-party
          rights or applicable law.
        </li>
        <li>
          Hold the accounts (cloud, domains, third-party services) in your own
          name where the SOW says so.
        </li>
      </ul>
    ),
  },
  {
    id: 'fees',
    title: 'Fees and payment',
    body: (
      <>
        <p>
          Fees are stated in the SOW in EUR or USD, exclusive of VAT and other
          applicable taxes. Fixed-price work is invoiced per milestone;
          retainers and dedicated teams are invoiced monthly in advance.
        </p>
        <p>
          Invoices are payable within 14 days. We may pause work on overdue
          accounts after written notice and charge statutory default interest.
          Third-party costs incurred on your behalf (cloud usage, licences,
          APIs) are passed through at cost unless the SOW says otherwise.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    body: (
      <>
        <p>
          On full payment of the fees for a deliverable, you own the custom
          code, designs and documentation we created for you under that SOW, and
          we assign our rights in them to you.
        </p>
        <p>
          We retain ownership of pre-existing materials, generic tooling,
          templates and know-how we bring to the project, and grant you a
          perpetual, non-exclusive licence to use them as part of the
          deliverables. Open-source components remain under their own licences.
        </p>
        <p>
          Unless you ask us not to in writing, we may name you as a client and
          describe the work in general terms in our portfolio after launch.
        </p>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    body: (
      <p>
        Each party keeps the other&rsquo;s non-public business, technical and
        financial information confidential, uses it only for the engagement and
        protects it with reasonable care, during the engagement and for three
        years afterwards. We sign a separate NDA on request before discovery.
      </p>
    ),
  },
  {
    id: 'data-protection',
    title: 'Data protection',
    body: (
      <p>
        Where we process personal data on your behalf, we do so as your
        processor under a data processing agreement that meets Art. 28 GDPR. Our
        own handling of website and enquiry data is described in the{' '}
        <Link href={paths.legal.privacy}>privacy policy</Link>.
      </p>
    ),
  },
  {
    id: 'warranties',
    title: 'Warranties',
    body: (
      <>
        <p>
          We warrant that services are performed with the skill and care
          expected of a professional software studio and that deliverables will
          materially conform to the SOW for 30 days after acceptance. Our sole
          obligation for breach of this warranty is to correct the
          non-conformity.
        </p>
        <p>
          Except as stated here, deliverables are provided without other
          warranties, express or implied, including fitness for a particular
          purpose. We do not warrant that software will be error-free or that
          third-party services will remain available or unchanged.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <>
        <p>
          To the extent permitted by law, our total liability arising out of an
          engagement is limited to the fees paid under the relevant SOW in the
          twelve months before the claim. Neither party is liable for indirect
          or consequential loss, lost profits or lost data, except in cases of
          intent, gross negligence, injury to life or health, or where liability
          cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Term and termination',
    body: (
      <>
        <p>
          Either party may end a retainer or dedicated-team engagement with 30
          days&rsquo; written notice. Fixed-price engagements may be terminated
          for material breach not remedied within 14 days of notice.
        </p>
        <p>
          On termination you pay for work performed and non-cancellable costs up
          to the termination date, and we hand over the work completed to that
          point.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Governing law and disputes',
    body: (
      <>
        <p>
          For clients contracting with our German office, these terms are
          governed by the laws of the Federal Republic of Germany, excluding the
          UN Convention on Contracts for the International Sale of Goods, and
          the courts of Stuttgart have exclusive jurisdiction where permitted.
          For clients contracting with our Pakistani office, the laws of
          Pakistan apply and the courts of Rawalpindi have jurisdiction. The SOW
          states which office is contracting.
        </p>
        <p>
          Before starting proceedings, both parties agree to attempt to resolve
          any dispute through good-faith discussion between senior
          representatives for at least 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'general',
    title: 'General',
    body: (
      <ul>
        <li>If any provision is unenforceable, the rest remains in effect.</li>
        <li>
          Neither party may assign an engagement without the other&rsquo;s
          consent, except to a successor of its business.
        </li>
        <li>
          Neither party is liable for delay caused by events beyond its
          reasonable control.
        </li>
        <li>
          These terms, together with the SOW and any NDA or DPA, are the entire
          agreement for an engagement.
        </li>
        <li>
          We may update these terms for future engagements; the version in force
          when a SOW is signed applies to that SOW.
        </li>
      </ul>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker='Legal'
      title='Terms of Service'
      accentWords={[0]}
      description='The general terms for using this website and for engaging Feinwerk Software. Each project is also governed by its own written proposal.'
      updated={UPDATED}
      href={paths.legal.terms}
      sections={sections}
    />
  );
}
