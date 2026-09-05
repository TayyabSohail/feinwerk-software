import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Imprint',
  description:
    'Legal notice (Impressum) for Feinwerk Software: company details, contact information and responsible persons under German law.',
  alternates: { canonical: paths.legal.imprint },
};

const UPDATED = '5 September 2026';

const [islamabad, fellbach] = siteConfig.locations;

const sectionsEn: LegalSection[] = [
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
        Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    ),
  },
  {
    id: 'pakistani-office',
    title: 'Asian office',
    body: (
      <p>
        {siteConfig.legalName}
        <br />
        {islamabad.city}, Islamabad Capital Territory, {islamabad.country}
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


const sectionsDe: LegalSection[] = [
  {
    id: 'provider',
    title: 'Diensteanbieter',
    body: (
      <>
        <p>
          <strong>{siteConfig.legalName}</strong>
          <br />
          Inhaber: {siteConfig.founder.name}
          <br />
          {fellbach.city}, Baden-Württemberg, {fellbach.country}
        </p>
        <p>
          Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV.
          Die vollständige Postanschrift des europäischen Büros wird auf jedem
          Angebot, Vertrag und jeder Rechnung sowie auf Anfrage per E-Mail
          mitgeteilt.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Kontakt',
    body: (
      <p>
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    ),
  },
  {
    id: 'pakistani-office',
    title: 'Asiatisches Büro',
    body: (
      <p>
        {siteConfig.legalName}
        <br />
        {islamabad.city}, Islamabad Capital Territory, {islamabad.country}
      </p>
    ),
  },
  {
    id: 'register',
    title: 'Register- und Steuerangaben',
    body: (
      <p>
        {siteConfig.legalName} wird als inhabergeführtes Unternehmen betrieben.
        Soweit für eine Vertragspartei ein Handelsregistereintrag oder eine
        Umsatzsteuer-Identifikationsnummer nach § 27a UStG besteht, wird diese
        auf dem Angebot und der Rechnung des jeweiligen Projekts angegeben.
      </p>
    ),
  },
  {
    id: 'responsible',
    title: 'Verantwortlich für den Inhalt',
    body: (
      <p>
        Verantwortlich für den Inhalt dieser Website nach § 18 Abs. 2 MStV:{' '}
        {siteConfig.founder.name}, {siteConfig.founder.role}, {fellbach.city},{' '}
        {fellbach.country}.
      </p>
    ),
  },
  {
    id: 'professional',
    title: 'Art der Leistungen',
    body: (
      <p>
        Softwaredesign, Entwicklung, Beratung und verwandte Leistungen für
        Geschäftskunden. Die Leistungen richten sich nicht an Verbraucher. Die
        Projektbeschreibungen auf dieser Website stellen für die genannten
        Kunden erbrachte Arbeiten dar; Produktnamen und Bildschirmfotos gehören
        den jeweiligen Rechteinhabern.
      </p>
    ),
  },
  {
    id: 'dispute-resolution',
    title: 'Streitbeilegung',
    body: (
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung bereit unter{' '}
        <a
          href='https://ec.europa.eu/consumers/odr/'
          target='_blank'
          rel='noopener noreferrer'
        >
          ec.europa.eu/consumers/odr
        </a>
        . Wir sind nicht verpflichtet und nicht bereit, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen (§ 36 VSBG). Unsere Leistungen richten sich an Unternehmen.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Haftung für Inhalte und Links',
    body: (
      <>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
          von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt; eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer
          konkreten Rechtsverletzung möglich, und wir entfernen entsprechende
          Inhalte umgehend.
        </p>
        <p>
          Unsere Website enthält Links zu externen Websites, auf deren Inhalte
          wir keinen Einfluss haben. Für die Inhalte verlinkter Seiten ist stets
          der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten
          Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft; rechtswidrige Inhalte waren zu diesem
          Zeitpunkt nicht erkennbar. Eine dauerhafte Überwachung verlinkter
          Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
          zumutbar.
        </p>
      </>
    ),
  },
  {
    id: 'copyright',
    title: 'Urheberrecht',
    body: (
      <p>
        Die von uns erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung
        und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
        bedürfen unserer schriftlichen Zustimmung. Downloads und Kopien dieser
        Website sind nur für den privaten, nicht kommerziellen Gebrauch
        gestattet. Soweit die Inhalte nicht von uns erstellt wurden, werden die
        Urheberrechte Dritter beachtet und entsprechend gekennzeichnet. Sollten
        Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um
        einen Hinweis; wir entfernen den Inhalt umgehend.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: 'Datenschutz',
    body: (
      <p>
        Informationen zur Verarbeitung personenbezogener Daten finden Sie in
        unserer <Link href={paths.legal.privacy}>Datenschutzerklärung</Link>.
        Alle Rechtsdokumente sind auf der{' '}
        <Link href={paths.legal.index}>Rechtsseite</Link> aufgeführt.
      </p>
    ),
  },
];

function getSections(locale: Locale): LegalSection[] {
  return locale === 'de' ? sectionsDe : sectionsEn;
}

export default async function ImprintPage() {
  const dict = await getDictionary();

  return (
    <LegalPage
      dict={dict}
      kicker={dict.legal.kicker}
      title={dict.legal.policies.imprint.title}
      description={dict.legal.intros.imprint}
      updated={UPDATED}
      href={paths.legal.imprint}
      sections={getSections(dict.locale)}
    />
  );
}
