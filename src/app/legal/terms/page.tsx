import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms on which Feinwerks Software provides this website and its software engineering services, including scope, payment, intellectual property and liability.',
  alternates: { canonical: paths.legal.terms },
};

const UPDATED = '5 September 2026';

const sectionsEn: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope of these terms',
    body: (
      <>
        <p>
          These terms govern (a) your use of the {siteConfig.name} website and
          (b) the general basis on which {siteConfig.legalName}{' '}
          (&ldquo;Feinwerks&rdquo;, &ldquo;we&rdquo;) provides software design,
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
          Ensure that content and data you supply do not infringe third-party
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
          For clients contracting with our Asian office, the laws of
          Pakistan apply and the courts of Islamabad have jurisdiction. The SOW
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


const sectionsDe: LegalSection[] = [
  {
    id: 'scope',
    title: 'Geltungsbereich dieser Bedingungen',
    body: (
      <>
        <p>
          Diese Bedingungen regeln (a) Ihre Nutzung der Website von{' '}
          {siteConfig.name} und (b) die allgemeine Grundlage, auf der{' '}
          {siteConfig.legalName} (&bdquo;Feinwerks&ldquo;, &bdquo;wir&ldquo;)
          Softwaredesign, Entwicklung und verwandte Leistungen für
          Geschäftskunden (&bdquo;Sie&ldquo;) erbringt.
        </p>
        <p>
          Für jedes Projekt gilt zusätzlich ein schriftliches Angebot oder ein
          Leistungsschein (&bdquo;SOW&ldquo;), der Umfang, Ergebnisse, Zeitplan
          und Vergütung beschreibt. Widerspricht ein SOW diesen Bedingungen, geht
          der SOW für das jeweilige Projekt vor.
        </p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'Nutzung der Website',
    body: (
      <>
        <p>
          Die Website dient der Information über unsere Leistungen. Sie dürfen
          sie ansehen und Links darauf teilen. Nicht gestattet sind das
          massenhafte Auslesen, die Nutzung zum Versand unerwünschter
          Nachrichten, Versuche, die Sicherheit zu umgehen, sowie die
          gewerbliche Vervielfältigung der Inhalte ohne unsere Erlaubnis.
        </p>
        <p>
          Die Projektbeschreibungen stellen für Kunden erbrachte Arbeiten dar.
          Gezeigte Produktnamen und Logos gehören den jeweiligen Rechteinhabern
          und dienen der Kennzeichnung der Arbeit, nicht als Befürwortung dieser
          Website.
        </p>
      </>
    ),
  },
  {
    id: 'proposals',
    title: 'Angebote und Kostenvoranschläge',
    body: (
      <>
        <p>
          Im Gespräch oder per E-Mail genannte Schätzungen sind unverbindlich.
          Verbindlich ist ein Angebot, das wir schriftlich als Proposal oder SOW
          erteilen; es gilt 30 Tage, sofern nicht anders angegeben.
        </p>
        <p>
          Festpreisprojekte decken den im SOW beschriebenen Umfang ab. Arbeiten
          außerhalb dieses Umfangs werden vor Beginn schriftlich als
          Änderungsanfrage vereinbart, samt Auswirkung auf Preis und Zeitplan.
        </p>
      </>
    ),
  },
  {
    id: 'delivery',
    title: 'Lieferung und Abnahme',
    body: (
      <>
        <p>
          Wir liefern in Schritten, in der Regel wöchentlich, auf eine
          Staging-Umgebung, die Sie prüfen können. Ein Meilenstein gilt als
          abgenommen, wenn Sie ihn schriftlich bestätigen oder wenn nach der
          Lieferung zehn Werktage ohne schriftliche Mängelliste verstreichen, je
          nachdem, was zuerst eintritt.
        </p>
        <p>
          Ein Mangel ist eine wesentliche Abweichung vom vereinbarten Umfang.
          Innerhalb der Abnahmefrist gemeldete Mängel beheben wir ohne
          zusätzliche Kosten. Geänderte Wünsche oder ein geänderter Umfang
          werden als Änderungsanfrage behandelt.
        </p>
      </>
    ),
  },
  {
    id: 'client-obligations',
    title: 'Ihre Mitwirkungspflichten',
    body: (
      <ul>
        <li>
          Rechtzeitiger Zugang zu den Personen, Systemen, Zugangsdaten und
          Inhalten, von denen die Arbeit abhängt.
        </li>
        <li>
          Prüfung der Ergebnisse und Rückmeldung innerhalb der vereinbarten
          Fristen.
        </li>
        <li>
          Sicherstellung, dass von Ihnen bereitgestellte Inhalte und Daten keine
          Rechte Dritter oder geltendes Recht verletzen.
        </li>
        <li>
          Führung der Konten (Cloud, Domains, Dienste Dritter) auf Ihren eigenen
          Namen, soweit der SOW dies vorsieht.
        </li>
      </ul>
    ),
  },
  {
    id: 'fees',
    title: 'Vergütung und Zahlung',
    body: (
      <>
        <p>
          Die Vergütung ist im SOW in EUR oder USD angegeben, zuzüglich
          Umsatzsteuer und weiterer anfallender Steuern. Festpreisarbeiten
          werden je Meilenstein abgerechnet; Pauschalen und dedizierte Teams
          monatlich im Voraus.
        </p>
        <p>
          Rechnungen sind innerhalb von 14 Tagen zahlbar. Bei überfälligen
          Beträgen können wir die Arbeit nach schriftlicher Ankündigung
          aussetzen und gesetzliche Verzugszinsen berechnen. In Ihrem Auftrag
          entstandene Kosten Dritter (Cloud-Nutzung, Lizenzen, APIs) werden zum
          Selbstkostenpreis weitergegeben, sofern der SOW nichts anderes
          bestimmt.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Geistiges Eigentum',
    body: (
      <>
        <p>
          Mit vollständiger Zahlung der Vergütung für ein Ergebnis gehören Ihnen
          der individuelle Code, die Designs und die Dokumentation, die wir im
          Rahmen dieses SOW für Sie erstellt haben; wir übertragen Ihnen unsere
          Rechte daran.
        </p>
        <p>
          Das Eigentum an vorbestehenden Materialien, allgemeinen Werkzeugen,
          Vorlagen und Know-how, die wir in das Projekt einbringen, verbleibt
          bei uns; wir räumen Ihnen daran ein dauerhaftes, nicht ausschließliches
          Nutzungsrecht als Teil der Ergebnisse ein. Open-Source-Komponenten
          unterliegen weiterhin ihren eigenen Lizenzen.
        </p>
        <p>
          Sofern Sie dem nicht schriftlich widersprechen, dürfen wir Sie nach dem
          Launch als Kunden nennen und die Arbeit in unserem Portfolio allgemein
          beschreiben.
        </p>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Vertraulichkeit',
    body: (
      <p>
        Jede Partei behandelt die nicht öffentlichen geschäftlichen, technischen
        und finanziellen Informationen der anderen vertraulich, nutzt sie nur
        für das Projekt und schützt sie mit angemessener Sorgfalt, während des
        Projekts und drei Jahre darüber hinaus. Auf Wunsch unterzeichnen wir vor
        der Analysephase eine gesonderte Vertraulichkeitsvereinbarung.
      </p>
    ),
  },
  {
    id: 'data-protection',
    title: 'Datenschutz',
    body: (
      <p>
        Soweit wir personenbezogene Daten in Ihrem Auftrag verarbeiten, tun wir
        dies als Ihr Auftragsverarbeiter auf Grundlage eines
        Auftragsverarbeitungsvertrags nach Art. 28 DSGVO. Der Umgang mit
        Website- und Anfragedaten ist in der{' '}
        <Link href={paths.legal.privacy}>Datenschutzerklärung</Link>{' '}
        beschrieben.
      </p>
    ),
  },
  {
    id: 'warranties',
    title: 'Gewährleistung',
    body: (
      <>
        <p>
          Wir sichern zu, dass die Leistungen mit der Sorgfalt und Fachkunde
          erbracht werden, die von einem professionellen Softwarestudio erwartet
          wird, und dass die Ergebnisse für 30 Tage nach der Abnahme im
          Wesentlichen dem SOW entsprechen. Unsere einzige Pflicht bei
          Verletzung dieser Zusage ist die Beseitigung der Abweichung.
        </p>
        <p>
          Über das hier Genannte hinaus werden die Ergebnisse ohne weitere
          ausdrückliche oder stillschweigende Zusagen bereitgestellt,
          einschließlich der Eignung für einen bestimmten Zweck. Wir sichern
          nicht zu, dass Software fehlerfrei ist oder dass Dienste Dritter
          verfügbar oder unverändert bleiben.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Haftungsbeschränkung',
    body: (
      <>
        <p>
          Soweit gesetzlich zulässig, ist unsere Gesamthaftung aus einem Projekt
          auf die in den zwölf Monaten vor dem Anspruch unter dem betreffenden
          SOW gezahlte Vergütung begrenzt. Keine Partei haftet für mittelbare
          Schäden oder Folgeschäden, entgangenen Gewinn oder Datenverlust, außer
          bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper oder
          Gesundheit oder soweit die Haftung gesetzlich nicht beschränkt werden
          kann.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Laufzeit und Kündigung',
    body: (
      <>
        <p>
          Jede Partei kann eine Pauschale oder ein dediziertes Team mit einer
          Frist von 30 Tagen schriftlich kündigen. Festpreisprojekte können bei
          einer wesentlichen Pflichtverletzung gekündigt werden, die nicht
          innerhalb von 14 Tagen nach Anzeige behoben wird.
        </p>
        <p>
          Bei Kündigung vergüten Sie die bis zum Kündigungszeitpunkt erbrachten
          Leistungen und nicht stornierbare Kosten, und wir übergeben die bis
          dahin fertiggestellte Arbeit.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Anwendbares Recht und Streitigkeiten',
    body: (
      <>
        <p>
          Für Kundinnen und Kunden, die mit unserem deutschen Büro kontrahieren,
          gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
          UN-Kaufrechts; ausschließlicher Gerichtsstand ist, soweit zulässig,
          Stuttgart. Für Kundinnen und Kunden, die mit unserem asiatischen Büro
          kontrahieren, gilt pakistanisches Recht, und die Gerichte in Islamabad
          sind zuständig. Der SOW benennt, welches Büro kontrahiert.
        </p>
        <p>
          Vor Einleitung eines Verfahrens vereinbaren beide Parteien, mindestens
          30 Tage lang zu versuchen, die Streitigkeit in einem Gespräch zwischen
          leitenden Vertretern nach Treu und Glauben beizulegen.
        </p>
      </>
    ),
  },
  {
    id: 'general',
    title: 'Allgemeines',
    body: (
      <ul>
        <li>
          Ist eine Bestimmung unwirksam, bleiben die übrigen davon unberührt.
        </li>
        <li>
          Keine Partei darf ein Projekt ohne Zustimmung der anderen übertragen,
          ausgenommen an einen Rechtsnachfolger ihres Geschäftsbetriebs.
        </li>
        <li>
          Keine Partei haftet für Verzögerungen durch Ereignisse außerhalb ihres
          zumutbaren Einflussbereichs.
        </li>
        <li>
          Diese Bedingungen bilden zusammen mit dem SOW sowie einer etwaigen
          Vertraulichkeitsvereinbarung und einem Auftragsverarbeitungsvertrag die
          vollständige Vereinbarung für ein Projekt.
        </li>
        <li>
          Wir können diese Bedingungen für künftige Projekte ändern; für einen
          SOW gilt die bei seiner Unterzeichnung geltende Fassung.
        </li>
      </ul>
    ),
  },
];

function getSections(locale: Locale): LegalSection[] {
  return locale === 'de' ? sectionsDe : sectionsEn;
}

export default async function TermsPage() {
  const dict = await getDictionary();

  return (
    <LegalPage
      dict={dict}
      kicker={dict.legal.kicker}
      title={dict.legal.policies.terms.title}
      accentWords={[0]}
      description={dict.legal.intros.terms}
      updated={UPDATED}
      href={paths.legal.terms}
      sections={getSections(dict.locale)}
    />
  );
}
