import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal/legal-page';

import { paths } from '@/constants/paths';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Which cookies and browser storage the Feinwerks Software website uses, what they do, and how to change your choice.',
  alternates: { canonical: paths.legal.cookies },
};

const UPDATED = '5 September 2026';

const sectionsEn: LegalSection[] = [
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
        Links to Cal.com take you to that service, which sets its own cookies
        under its own policy. We do not embed third-party widgets that set
        cookies on this site.
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

const sectionsDe: LegalSection[] = [
  {
    id: 'what',
    title: 'Was Cookies sind',
    body: (
      <p>
        Cookies und ähnliche Browserspeicher (Local Storage) sind kleine
        Datenmengen, die eine Website in Ihrem Browser ablegt. Einige sind
        nötig, damit eine Website funktioniert; andere messen, wie sie genutzt
        wird. Diese Website nutzt sehr wenige, und keine für Werbung.
      </p>
    ),
  },
  {
    id: 'essential',
    title: 'Unbedingt erforderliche Speicherung',
    body: (
      <>
        <p>
          Diese werden ohne Einwilligung gesetzt, weil die Website ohne sie
          nicht richtig funktionieren kann:
        </p>
        <ul>
          <li>
            <strong>fw-cookie-consent</strong> (Local Storage): merkt sich, ob
            Sie Analyse akzeptiert oder abgelehnt haben. Bleibt, bis Sie die
            Websitedaten löschen.
          </li>
          <li>
            <strong>theme</strong> (Local Storage): merkt sich Ihre Wahl von
            hellem oder dunklem Modus. Bleibt, bis Sie die Websitedaten löschen.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'analytics',
    title: 'Analyse, mit Ihrer Einwilligung',
    body: (
      <>
        <p>
          Wenn Sie im Cookie-Banner auf &bdquo;Akzeptieren&ldquo; klicken, laden
          wir die Analyse von PostHog. Sie setzt ein Erstanbieter-Cookie und
          einen Local-Storage-Eintrag (mit dem Präfix <strong>ph_</strong>) mit
          einer zufälligen Kennung, damit wiederholte Besuche nur einmal gezählt
          werden. Erfasst werden aufgerufene Seiten, verweisende Website,
          Gerätetyp und ungefähres Land. Was Sie in Formulare eintippen, wird
          nicht erfasst.
        </p>
        <p>
          Die Kennung wird bis zu 12 Monate aufbewahrt. Die Daten werden von
          PostHog in der EU verarbeitet. Wenn Sie ablehnen, wird nichts von
          PostHog geladen.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Inhalte Dritter',
    body: (
      <p>
        Links zu Cal.com führen Sie zu diesem Dienst, der eigene Cookies nach
        seiner eigenen Richtlinie setzt. Wir binden keine Widgets Dritter ein,
        die auf dieser Website Cookies setzen.
      </p>
    ),
  },
  {
    id: 'change',
    title: 'Ihre Wahl ändern',
    body: (
      <p>
        Um die Einwilligung zu widerrufen oder zu ändern, löschen Sie die Daten
        dieser Website in Ihren Browsereinstellungen (meist unter Datenschutz
        oder Website-Einstellungen). Beim nächsten Besuch erscheint das Banner
        erneut. Sie können Cookies auch vollständig im Browser blockieren; die
        Website funktioniert weiterhin.
      </p>
    ),
  },
  {
    id: 'more',
    title: 'Weitere Informationen',
    body: (
      <p>
        Wie wir mit personenbezogenen Daten allgemein umgehen, ist in der{' '}
        <Link href={paths.legal.privacy}>Datenschutzerklärung</Link>{' '}
        beschrieben.
      </p>
    ),
  },
];

function getSections(locale: Locale): LegalSection[] {
  return locale === 'de' ? sectionsDe : sectionsEn;
}

export default async function CookiesPage() {
  const dict = await getDictionary();

  return (
    <LegalPage
      dict={dict}
      kicker={dict.legal.kicker}
      title={dict.legal.policies.cookies.title}
      accentWords={[0]}
      description={dict.legal.intros.cookies}
      updated={UPDATED}
      href={paths.legal.cookies}
      sections={getSections(dict.locale)}
    />
  );
}
