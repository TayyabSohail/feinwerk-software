import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Feinwerks Software collects, uses and protects personal data on this website and in client engagements, in line with the GDPR.',
  alternates: { canonical: paths.legal.privacy },
};

const UPDATED = '5 September 2026';

const sectionsEn: LegalSection[] = [
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
          Questions about this policy or your data can be sent through our{' '}
          <Link href={paths.contact}>contact form</Link>.
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
          Reach us through our <Link href={paths.contact}>contact form</Link>.
          We respond within one month. You also have the right to lodge a
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


const sectionsDe: LegalSection[] = [
  {
    id: 'controller',
    title: 'Wer verantwortlich ist',
    body: (
      <>
        <p>
          Verantwortlich für die über diese Website verarbeiteten
          personenbezogenen Daten ist <strong>{siteConfig.legalName}</strong>{' '}
          mit Büros in{' '}
          {siteConfig.locations
            .map((location) => `${location.city}, ${location.country}`)
            .join(' und ')}
          . Die vollständigen Kontaktdaten finden Sie im{' '}
          <Link href={paths.legal.imprint}>Impressum</Link>.
        </p>
        <p>
          Fragen zu dieser Erklärung oder zu Ihren Daten richten Sie bitte über
          unser <Link href={paths.contact}>Kontaktformular</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'Was wir erheben',
    body: (
      <>
        <p>
          Wir beschränken die Datenerhebung auf das, was die Website zum
          Funktionieren braucht und was nötig ist, um Ihnen zu antworten.
        </p>
        <ul>
          <li>
            <strong>Kontaktanfragen.</strong> Name, E-Mail-Adresse, Unternehmen
            (optional), die von Ihnen gewählte Leistung und der Budgetrahmen
            sowie Ihre Nachricht. Zudem erfassen wir die IP-Adresse, von der die
            Anfrage kam, um das Formular vor Missbrauch zu schützen.
          </li>
          <li>
            <strong>Serverprotokolle.</strong> Unser Hosting-Anbieter erfasst
            übliche Anfragedaten (IP-Adresse, User Agent, aufgerufene URL,
            Zeitstempel) zur Sicherheit und Zuverlässigkeit. Protokolle werden
            kurz aufbewahrt und dann gelöscht.
          </li>
          <li>
            <strong>Analyse, nur mit Einwilligung.</strong> Wenn Sie
            Analyse-Cookies akzeptieren, nutzen wir PostHog, um zu verstehen,
            welche Seiten nützlich sind. Wir setzen keine Werbetracker ein und
            verkaufen keine Daten.
          </li>
          <li>
            <strong>Präferenzen.</strong> Ihre Wahl des Erscheinungsbildes und
            Ihre Cookie-Entscheidung werden nur in Ihrem Browser gespeichert und
            nie an uns übermittelt.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'purposes',
    title: 'Wozu wir sie nutzen und auf welcher Grundlage',
    body: (
      <>
        <ul>
          <li>
            <strong>Beantwortung von Anfragen</strong> und Erstellung von
            Angeboten: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
            und Art. 6 Abs. 1 lit. f (unser berechtigtes Interesse, Ihnen zu
            antworten).
          </li>
          <li>
            <strong>Sicherer Betrieb der Website</strong>, einschließlich
            Ratenbegrenzung und Protokollaufbewahrung: Art. 6 Abs. 1 lit. f
            DSGVO.
          </li>
          <li>
            <strong>Analyse</strong>: Art. 6 Abs. 1 lit. a DSGVO, Ihre
            Einwilligung, die Sie jederzeit widerrufen können, indem Sie die
            Websitedaten in Ihrem Browser löschen.
          </li>
          <li>
            <strong>Gesetzliche Pflichten</strong>, etwa die steuerliche
            Aufbewahrung von Rechnungen: Art. 6 Abs. 1 lit. c DSGVO.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'processors',
    title: 'Mit wem wir sie teilen',
    body: (
      <>
        <p>
          Wir setzen eine kleine Zahl von Dienstleistern ein, die Daten in
          unserem Auftrag auf Grundlage von Auftragsverarbeitungsverträgen
          verarbeiten:
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (USA / EU-Regionen) für Hosting und
            Auslieferung der Inhalte.
          </li>
          <li>
            <strong>Resend</strong> für den Versand der Benachrichtigungen aus
            dem Kontaktformular per E-Mail.
          </li>
          <li>
            <strong>Supabase</strong> (EU-Region) zur Speicherung von
            Kontaktanfragen, soweit aktiviert.
          </li>
          <li>
            <strong>PostHog</strong> (EU-Cloud) für die Analyse, nur nach
            Einwilligung.
          </li>
          <li>
            <strong>Cal.com</strong>, wenn Sie über einen von uns
            bereitgestellten Link einen Termin buchen; für die Buchung gilt
            deren Datenschutzerklärung.
          </li>
        </ul>
        <p>
          Soweit ein Anbieter außerhalb der EU oder des EWR sitzt, sind
          Übermittlungen durch die EU-Standardvertragsklauseln oder einen
          Angemessenheitsbeschluss abgedeckt. Wir verkaufen niemals
          personenbezogene Daten.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Wie lange wir sie aufbewahren',
    body: (
      <>
        <ul>
          <li>
            Kontaktanfragen: bis zu 24 Monate nach unserem letzten Austausch,
            sofern kein Vertrag folgt.
          </li>
          <li>
            Vertrags- und Rechnungsunterlagen: so lange es das Handels- und
            Steuerrecht verlangt (in Deutschland üblicherweise 10 Jahre).
          </li>
          <li>Serverprotokolle: bis zu 30 Tage.</li>
          <li>Analysedaten: bis zu 12 Monate, in aggregierter Form.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Ihre Rechte',
    body: (
      <>
        <p>Nach der DSGVO können Sie von uns verlangen,</p>
        <ul>
          <li>
            zu bestätigen, ob wir Daten über Sie führen, und eine Kopie zu
            erhalten (Auskunft);
          </li>
          <li>unrichtige Daten zu berichtigen (Berichtigung);</li>
          <li>
            Ihre Daten zu löschen, wenn kein Grund zur Aufbewahrung mehr besteht
            (Löschung);
          </li>
          <li>
            die Verarbeitung auf Grundlage berechtigter Interessen
            einzuschränken oder ihr zu widersprechen;
          </li>
          <li>Ihre Daten in einem übertragbaren Format zu erhalten;</li>
          <li>
            eine Einwilligung jederzeit zu widerrufen, ohne dass die bis dahin
            erfolgte Verarbeitung berührt wird.
          </li>
        </ul>
        <p>
          Schreiben Sie uns über unser{' '}
          <Link href={paths.contact}>Kontaktformular</Link>. Wir antworten
          innerhalb eines Monats. Ihnen steht zudem das Recht zu, sich
          bei einer Aufsichtsbehörde zu beschweren; für unser deutsches Büro ist
          das der Landesbeauftragte für den Datenschutz und die
          Informationsfreiheit Baden-Württemberg.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Sicherheit',
    body: (
      <p>
        Der gesamte Datenverkehr zu dieser Website ist bei der Übertragung
        verschlüsselt (TLS). Kontaktanfragen werden so gespeichert, dass der
        Zugriff auf die Personen beschränkt ist, die sie bearbeiten, geschützt
        durch Row-Level Security in der Datenbank und durch ausschließlich
        serverseitige Zugangsdaten. Zugriffe und Anbieter prüfen wir regelmäßig.
      </p>
    ),
  },
  {
    id: 'clients',
    title: 'Daten in Kundenprojekten',
    body: (
      <p>
        Wenn wir Software für einen Kunden entwickeln oder betreiben, handeln
        wir hinsichtlich der personenbezogenen Daten in diesem System als
        Auftragsverarbeiter, und der Kunde bleibt Verantwortlicher. Geregelt
        wird dies in einem gesonderten Auftragsverarbeitungsvertrag, den wir für
        jedes Projekt mit personenbezogenen Daten bereitstellen. Diese Erklärung
        betrifft ausschließlich diese Website.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Änderungen dieser Erklärung',
    body: (
      <p>
        Wir aktualisieren diese Erklärung, wenn sich unsere Praxis oder die
        Rechtslage ändert. Das Datum oben zeigt die aktuelle Fassung.
        Wesentliche Änderungen werden auf dieser Seite bekannt gegeben.
      </p>
    ),
  },
];

function getSections(locale: Locale): LegalSection[] {
  return locale === 'de' ? sectionsDe : sectionsEn;
}

export default async function PrivacyPage() {
  const dict = await getDictionary();

  return (
    <LegalPage
      dict={dict}
      kicker={dict.legal.kicker}
      title={dict.legal.policies.privacy.title}
      accentWords={[0]}
      description={dict.legal.intros.privacy}
      updated={UPDATED}
      href={paths.legal.privacy}
      sections={getSections(dict.locale)}
    />
  );
}
