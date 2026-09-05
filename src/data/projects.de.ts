import type { Project } from './projects';

/**
 * German copy for each case study, keyed by slug. Only prose is translated:
 * slug, images, accent, tech, category, capabilities and year stay as they
 * are in `projects`. Product names and client labels are kept.
 */
export type ProjectTranslation = Partial<
  Pick<
    Project,
    | 'title'
    | 'client'
    | 'tagline'
    | 'summary'
    | 'description'
    | 'industry'
    | 'headline'
    | 'problem'
    | 'approach'
    | 'outcomes'
    | 'architecture'
    | 'keyFeatures'
    | 'challenges'
  >
> & {
  /** Gallery captions, in the same order as the project's `gallery`. */
  gallery?: { title: string; caption: string }[];
  /** `techStack` category labels, in the same order. */
  techStackCategories?: string[];
};

export const projectsDe: Record<string, ProjectTranslation> = {
  brickfold: {
    client: 'Vertraulich (Immobilien-Mitgliederclub)',
    tagline: 'Anteiliges Immobilieneigentum für Ostafrika',
    summary:
      'Ein Mitgliederclub, in dem Uganderinnen und Ugander ertragsstarke Wohnungen ab 1.000.000 UGX gemeinsam besitzen.',
    description:
      'Immobilien werden als ein unteilbares Ganzes verkauft, und dieses Ganze kostet mehr, als die meisten Menschen je auf einmal auf dem Konto haben. Brickfold teilt es auf. Geprüfte Mitglieder bündeln Kapital, besitzen gemeinsam echte, ertragsstarke Wohnungen in Uganda, erhalten ihren anteiligen Anteil an der Monatsmiete und verkaufen ihren Anteil an andere Mitglieder, wenn sie aussteigen möchten.',
    industry: 'Fintech / Immobilien',
    headline: { value: '42', label: 'Screens, ein exaktes Hauptbuch' },
    problem:
      'Die meisten Menschen in Ostafrika werden nie eine Wohnung besitzen, nicht aus Mangel an Ersparnissen, sondern weil Immobilien als unteilbares Ganzes verkauft werden. Kapital ist über Jahre gebunden, Mieteinnahmen bedeuten, Vermieter zu werden, und es gibt keine Transparenz darüber, was ein Gebäude tatsächlich einbringt.',
    approach:
      'Wir haben einen zweiseitigen Mitgliederclub gebaut: einen geprüften Bewerbungs- und Onboarding-Prozess, eine Wallet, durch die jeder Schilling läuft, drei Wege zum Eigentum und einen internen Zweitmarkt für den Ausstieg. Jede finanzielle Entscheidung läuft über eine reale Person in der Administration.',
    outcomes: [
      '42 Screens über Mitglieder-, Admin- und öffentliche Oberflächen.',
      '84 Geschäftsvorgänge über 25 Tabellen, umgesetzt von 7 Mitwirkenden.',
      '3 Eigentumsprodukte: Fractional, Live und Prime.',
    ],
    architecture:
      'Next.js und React mit TanStack und typisierten Server Actions, darunter Supabase und PostgreSQL mit Zod an den Schnittstellen. Rund 72.600 Zeilen über 416 Dateien und 211 wiederverwendbare Komponenten. Wallet-Salden müssen zwingend immer Einzahlungen minus Investitionen minus Auszahlungen entsprechen, und UGX wird durchgängig in ganzen Schillingen geführt, nie als Gleitkommazahl.',
    keyFeatures: [
      'Wohnungsmarktplatz mit Suche, Filtern und Sortierung',
      'Vault-Wallet für Einzahlungen, Investitionen und Auszahlungen',
      'Monatliche Mietausschüttung, exakt nach Anteil aufgeteilt',
      'Zweitmarkt mit Ausstiegsfenstern und 1,5 % Plattformgebühr',
      'Freigabestelle in der Administration für jede Geldbewegung',
      'Broadcast-Editor mit 6 Zielgruppensegmenten',
      'Empfehlungen, 4 Mitgliedsstufen und 35 automatisierte E-Mails',
    ],
    challenges: [
      {
        challenge:
          'Eigentumsanteile mussten über Erstkäufe, monatliche Mietaufteilungen und Zweitmarktgeschäfte hinweg exakt bleiben, ohne dass ein Mitglied je durch Rundung benachteiligt wird.',
        solution:
          'Prozentsätze werden bei jedem Lesevorgang aus den tatsächlichen Beträgen abgeleitet statt gespeichert, und jede Aufteilung rundet auf den ganzen Schilling ab, sodass die Plattform nie zu ihren eigenen Gunsten rundet.',
      },
      {
        challenge:
          'Eine Wallet mit echtem Geld darf nie abweichen, und kein Mitglied durfte einen Admin-Screen sehen oder erreichen können.',
        solution:
          'Die Invariante des Hauptbuchs, nach der der Saldo Einzahlungen minus Investitionen minus Auszahlungen entspricht, wird erzwungen statt vorausgesetzt. Mitglieder- und Adminwelt sind im Produkt strikt getrennt.',
      },
      {
        challenge:
          'Mitgliedsbeiträge, Mindestbeträge und Zweitmarktgebühren mussten sich mit dem Geschäft ändern können, nicht mit dem Releasezyklus.',
        solution:
          'Jede Regel wurde zu einer betrieblichen Einstellung hinter einem Admin-Bereich, sodass das Team die Plattformökonomie sofort anpasst.',
      },
    ],
    gallery: [
      {
        title: 'Wohnungsmarktplatz',
        caption:
          'Einheiten, die zum Erwerb offenstehen, mit Finanzierungsfortschritt, Rendite und Mindestanteil.',
      },
      {
        title: 'Vault',
        caption:
          'Jede Einzahlung, Investition, Mietgutschrift und Auszahlung in einem exakten Hauptbuch.',
      },
      {
        title: 'Freigabestelle',
        caption:
          'Die Administration gibt jede Geldbewegung frei und ändert Plattformregeln ohne Release.',
      },
    ],
    techStackCategories: [
      'Frontend',
      'Styling',
      'Backend',
      'Nachrichten & Dokumente',
      'Analytics',
    ],
  },
  rankloom: {
    client: 'Vertraulich (SEO-Plattform)',
    tagline: 'KI-gestützte Plattform für intelligenteres SEO-Wachstum',
    summary: 'KI-gestützte SEO- und Content-Plattform.',
    description:
      'Eine Plattform für Keyword-Recherche, KI-Content-Erstellung und Rank-Tracking, die dem Hin und Her zwischen Werkzeugen ein Ende macht, das SEO-Teams ganze Tage gekostet hat.',
    industry: 'Marketingtechnologie',
    headline: { value: '3x', label: 'geringere Kosten pro Artikel' },
    problem:
      'SEO-Teams wechselten zwischen fünf verschiedenen Werkzeugen, nur um von der Keyword-Recherche bis zum Tracking zu kommen, verloren dabei Stunden und riskierten uneinheitliche Daten. Die meisten Werkzeuge stützen sich zudem auf veraltete Keyword- und Ranking-Daten, sodass Teams langsam auf Suchtrends reagieren.',
    approach:
      'Eine Plattform: eine KI-Content-Engine auf OpenRouter, verbunden mit Live-Daten aus DataForSEO und Google Maps, während Trigger.dev Massenjobs und Caching im Hintergrund ausführt.',
    outcomes: [
      '3x geringere Kosten pro Artikel durch automatisierte KI-Abläufe.',
      '30 Artikel in 10 Minuten, wofür zuvor Stunden nötig waren.',
      '50 % geringere Kosten für Keyword-Tracking, 0,09 $ statt 0,18 $.',
    ],
    architecture:
      'Next.js App Router mit Server Components für datenintensive Ansichten, Supabase und PostgreSQL zur Speicherung und Trigger.dev für robuste Hintergrundjobs. Die Generierung läuft über OpenRouter, sodass Modelle ohne Eingriff in den Produktcode getauscht werden.',
    keyFeatures: [
      'KI-Content-Erstellung mit Unterstützung mehrerer Sprachräume',
      'Keyword- und Rank-Tracking in Echtzeit',
      'Standortbezogene Auswertungen über die Google-Maps-API',
      'Pipelines zur Massenverarbeitung mit Caching',
      'Abonnementabrechnung über Stripe',
    ],
    challenges: [
      {
        challenge:
          'Die Kosten der Keyword-API stiegen linear mit der Nutzerzahl und wurden schnell zum größten Posten.',
        solution:
          'Wir haben Anfragen gebündelt und eine Caching-Schicht nach Keyword und Sprachraum eingeführt, was die Tracking-Ausgaben halbierte, ohne die Aktualität der Daten zu verringern.',
      },
      {
        challenge:
          'Massenjobs zur Content-Erstellung überschritten die Ausführungsgrenzen von Serverless und brachen mittendrin ab.',
        solution:
          'Die Generierung läuft nun über Trigger.dev, mit fortsetzbaren Jobs, die Zwischenstände sichern und einzelne Elemente erneut versuchen statt des gesamten Stapels.',
      },
    ],
    gallery: [
      {
        title: 'Keyword-Recherche',
        caption:
          'Aktuelles Suchvolumen, Schwierigkeit und Suchabsicht, mit lokalen Auswertungen aus Google Maps.',
      },
      {
        title: 'Content-Assistent',
        caption:
          'Artikelerstellung im Stapel als fortsetzbarer Job, mit SEO-Bewertung je Entwurf.',
      },
      {
        title: 'Rank-Tracking',
        caption:
          'Tägliche Positionen, Veränderungen und die Hintergrundjobs, die sie aktualisieren.',
      },
    ],
    techStackCategories: [
      'Frontend',
      'Styling',
      'Backend',
      'APIs & KI',
      'Zahlungen',
      'Deployment',
      'Analytics',
    ],
  },
  bidnest: {
    client: 'Vertraulich (Marktplatz für Studierendenwohnungen)',
    tagline: 'Wohnungen außerhalb des Campus, zu Ihren Bedingungen',
    summary: 'Auktionsbasierter Mietmarktplatz für Wohnungen außerhalb des Campus.',
    description:
      'Studierende bieten in Echtzeit auf Wohnungen außerhalb des Campus, mit rollenspezifischen Dashboards für Studierende, Eltern und Vermietende.',
    industry: 'Immobilientechnologie',
    headline: { value: '1.000+', label: 'gleichzeitig Bietende, ohne Konflikte' },
    problem:
      'Der Markt für Studierendenwohnungen ist von Festpreisangeboten ohne Verhandlungsspielraum geprägt, verstreut über unzuverlässige Plattformen. Eltern finanzieren die meisten dieser Mieten, haben aber überhaupt keinen Zugang zum Prozess.',
    approach:
      'Wir haben ein Live-Auktionssystem über WebSockets mit Aktualisierungen unter 200 ms entworfen, gestützt auf Datenmodelle für Angebote, Gebote und Benachrichtigungen sowie getrennte Dashboards je Rolle.',
    outcomes: [
      '1.000+ gleichzeitige Nutzende mit konfliktfreier Synchronisation der Gebote.',
      '200 ms Aktualisierung der Gebote, sodass alle Bietenden synchron bleiben.',
      '3 rollenspezifische Dashboards für Studierende, Eltern und Vermietende.',
    ],
    architecture:
      'Next.js über Supabase und PostgreSQL. Gebote laufen über einen WebSocket-Kanal und werden vor dem Commit serverseitig geprüft, sodass ein Client nie ein Höchstgebot verbuchen kann, das er nicht erzielt hat. Der Rollenzugriff wird über Row-Level Security durchgesetzt.',
    keyFeatures: [
      'Auktionsmarktplatz für geprüfte Wohnungen außerhalb des Campus',
      'Elternzugang, um im Namen der Studierenden zu bieten und zu schreiben',
      'Buchung von Diensten für Umzug, Reinigung und Reparaturen',
      'Integrierte Nachrichten zwischen Studierenden, Vermietenden und Anbietern',
      'Benachrichtigungen in der App, per E-Mail und SMS',
      'Angebote gefiltert nach Nähe zu Partnerhochschulen',
    ],
    challenges: [
      {
        challenge:
          'Gleichzeitige Gebote auf dasselbe Angebot liefen gegeneinander und konnten beide angenommen werden.',
        solution:
          'Die Annahme von Geboten läuft nun in einer serialisierten serverseitigen Transaktion, sodass die Reihenfolge verbindlich entschieden wird und Clients sich mit dem festgeschriebenen Ergebnis abgleichen.',
      },
      {
        challenge:
          'Jedes Gebot an alle verbundenen Clients zu senden, überlastete die Socket-Schicht zu Spitzenzeiten.',
        solution:
          'Abonnements laufen nun je Angebot, sodass Clients nur Aktualisierungen zu dem erhalten, was sie tatsächlich verfolgen.',
      },
    ],
    gallery: [
      {
        title: 'Angebot und Live-Gebot',
        caption:
          'Die Gebotshistorie aktualisiert sich in unter 200 ms, mit einem Elternteil als Mitunterzeichner.',
      },
      {
        title: 'Dashboard für Studierende',
        caption:
          'Laufende Gebote, Fortschritt beim Mietvertrag und bei Partnern gebuchte Dienste.',
      },
      {
        title: 'Nachrichten',
        caption:
          'Studierende, Vermietende und Anbieter in einem Verlauf, mit dokumentierten Buchungen.',
      },
    ],
    techStackCategories: [
      'Frontend',
      'Styling',
      'Backend',
      'Echtzeit',
      'Zahlungen',
      'Benachrichtigungen',
      'Analytics',
    ],
  },
  'curio-market': {
    client: 'Vertraulich (E-Commerce-Marktplatz)',
    tagline: 'Ein personalisierter Marktplatz mit vielen Anbietern',
    summary: 'Personalisierter E-Commerce-Marktplatz mit vielen Anbietern.',
    description:
      'Ein Marktplatz mit vielen Anbietern, personalisierten Empfehlungen, Auszahlungen über Stripe Connect und automatisierter Sendungsverfolgung von DHL.',
    industry: 'E-Commerce',
    headline: { value: '70 %', label: 'weniger Support-Tickets' },
    problem:
      'Die meisten Shops zeigen einen allgemeinen Feed und begraben Kundinnen und Kunden unter Optionen, die nicht zu ihrem Stil passen. Anbieter erhalten einfache Werkzeuge ohne Überblick über Bestellungen oder Auszahlungen, und die manuelle Zahlungsabwicklung samt undurchsichtiger Lieferung untergräbt das Vertrauen an der Kasse.',
    approach:
      'Wir haben eine serverseitig gerenderte Empfehlungs-Engine auf einer mandantenfähigen Supabase-Architektur mit strikter Datentrennung gebaut und anschließend die Wege für Geld und Logistik durchgängig automatisiert, mit Stripe Connect und der DHL-API.',
    outcomes: [
      '40 % mehr Interaktion durch personalisierte Empfehlungen.',
      '70 % weniger Support-Tickets nach der Automatisierung von Kasse und Versand.',
    ],
    architecture:
      'Next.js App Router, der die Empfehlungsflächen serverseitig rendert. Supabase liefert mandantenfähige Speicherung mit Row-Level Security je Anbieter. Stripe Connect wickelt geteilte Zahlungen und Auszahlungen ab; DHL-Webhooks steuern die Sendungsverfolgung.',
    keyFeatures: [
      'Persönlichkeitstest, der die Produktempfehlungen steuert',
      'Marktplatz mit vielen Anbietern in einem Einkaufserlebnis',
      'Anbieter-Dashboard für Produkte, Bestellungen und Auszahlungen',
      'Stripe-Zahlungen mit automatisierten Auszahlungen an Anbieter',
      'DHL-Anbindung für automatisierte Sendungsverfolgung',
    ],
    challenges: [
      {
        challenge:
          'Bei der Mandantenfähigkeit bestand das Risiko, dass Abfragen eines Anbieters die Daten eines anderen erreichen.',
        solution:
          'Wir haben die Trennung über Row-Level-Security-Richtlinien in der Datenbank erzwungen statt im Anwendungscode, sodass eine vergessene Prüfung in der App keine Daten preisgeben kann.',
      },
      {
        challenge:
          'Manuelle Anfragen zu Auszahlungen und Versand beherrschten die Support-Warteschlange.',
        solution:
          'Wir haben beide Wege automatisiert, mit Stripe Connect für planmäßige Auszahlungen und DHL-Webhooks für die Sendungsverfolgung, und zeigen den Status direkt in der Bestellansicht.',
      },
    ],
    gallery: [
      {
        title: 'Geschmackstest',
        caption:
          'Acht Fragen machen aus dem Geschmack der Kundschaft einen persönlichen Feed.',
      },
      {
        title: 'Personalisierter Marktplatz',
        caption:
          'Produkte vieler Anbieter, sortiert nach Übereinstimmung und gefiltert nach Stimmung.',
      },
      {
        title: 'Anbieter-Dashboard',
        caption:
          'Bestellungen mit DHL-Sendungsverfolgung und planmäßigen Auszahlungen über Stripe Connect.',
      },
    ],
    techStackCategories: [
      'Frontend',
      'Styling',
      'Backend',
      'Zahlungen',
      'Logistik',
      'Analytics',
    ],
  },
  'bitsmiths-hrm': {
    tagline: 'HR- und Lohnsystem, vollständig prüfbar',
    summary:
      'Onboarding, Urlaub, Krankheitskosten, Überstunden und Lohnabrechnung für Bitsmiths Studio.',
    description:
      'Eine interne HR-Plattform, auf der Mitarbeitende eingeladen, eingearbeitet und aktiviert werden; sie reichen Urlaub, Krankheitskosten und Überstunden ein, die Administration gibt jeden Vorgang frei, und die freigegebenen Posten fließen in einen monatlichen Abrechnungslauf, der Lohnabrechnungen berechnet, sperrt und nach Payoneer exportiert.',
    industry: 'HR-Technologie',
    headline: { value: '12', label: 'automatisierte E-Mails, kein Nachhaken' },
    problem:
      'Die Personalarbeit war über E-Mail, Chat und Papier verstreut: Onboarding per E-Mail, Urlaub und Überstunden in Nachrichten, Krankheitskosten auf Papier und eine Lohnabrechnung, die jeden Monat von Hand aus all dem zusammengesetzt wurde. Nichts stimmte überein, und nichts war prüfbar.',
    approach:
      'Ein System, in dem jeder Antrag ein Datensatz mit einem Status ist. Mitarbeitende reichen ein, die Administration gibt frei; freigegebener Urlaub, Krankheitskosten und Überstunden fließen dann in einen monatlichen Abrechnungslauf, der die Lohnabrechnungen berechnet und sperrt.',
    outcomes: [
      '5 Abläufe in einem Werkzeug: Onboarding, Urlaub, Krankheitskosten, Überstunden, Lohnabrechnung.',
      '4 Schutzebenen für den Zugriff von Administration und Mitarbeitenden.',
      '12 automatisierte E-Mails ersetzen das manuelle Nachhaken.',
    ],
    architecture:
      'Next.js 15 App Router mit next-safe-action Server Actions über Supabase, mit Postgres, Auth, Storage und pg_cron. Die Geschäftslogik liegt in der Datenbank: Urlaubs- und Krankheitskostensalden, Lohnberechnung und Sperrung sind Postgres-Funktionen, abgesichert durch Row-Level Security. Rollen werden per Trigger in das JWT gespiegelt, sodass die Middleware danach routen kann. Resend versendet 12 React-Email-Vorlagen, und ein monatlicher Cron-Job eröffnet jede Abrechnungsperiode.',
    keyFeatures: [
      'Mitarbeitenden-Dashboard mit aktuellen Salden und letzter Lohnabrechnung',
      'Anträge für Urlaub, Krankheitskosten und Überstunden mit Freigabeverlauf',
      'Freigabe-Warteschlange der Administration über alle Antragsarten',
      'Monatliche Abrechnungsläufe, nach Abschluss gesperrt',
      'Lohnabrechnungen, erst nach der Sperrung für Mitarbeitende freigegeben',
      'Payoneer-Export und eine Ablage für Richtliniendokumente',
    ],
    challenges: [
      {
        challenge:
          'Mitarbeitende konnten ihre eigenen gesperrten Lohnabrechnungen nicht sehen. Die Sichtbarkeitsrichtlinie fragte eine nur für die Administration zugängliche Tabelle ab, und diese Unterabfrage läuft mit den Rechten der aufrufenden Person, lieferte also stillschweigend nichts zurück.',
        solution:
          'Wir haben die Prüfung in eine SECURITY-DEFINER-Hilfsfunktion verlagert, die nur beantwortet, ob ein Lauf gesperrt ist. So löst sich die Richtlinie auf, ohne die unternehmensweiten Lohnsummen dieser Tabelle offenzulegen.',
      },
      {
        challenge:
          'Freigegebene Krankheitskosten und Überstunden konnten doppelt gezählt werden, einmal im Lauf, der sie erfasste, und erneut im nächsten.',
        solution:
          'Beim Sperren eines Laufs wird jeder freigegebene Posten in derselben Transaktion mit dessen Lauf-ID versehen, sodass jeder Posten in genau eine Abrechnung einfließt und späte Freigaben in den Folgemonat wandern statt sich zu verdoppeln.',
      },
      {
        challenge:
          'Manuelle Anpassungen der Administration an einer Lohnabrechnung, etwa geleistete Stunden, Überstundenfaktor und individuelle Korrekturen, gingen bei jeder Neuberechnung verloren.',
        solution:
          'Wir haben die Berechnung idempotent gemacht: Sie schreibt abgeleitete Werte fort und bewahrt dabei die von der Administration eingetragenen Anpassungen, sodass eine Neuberechnung jederzeit vor der Sperrung der Periode gefahrlos möglich ist.',
      },
    ],
    gallery: [
      {
        title: 'Urlaubsanträge',
        caption:
          'Anträge gehen an die Teamleitung und die Administration, mit Salden, die sich bei Freigabe aktualisieren.',
      },
      {
        title: 'Abrechnungszyklus',
        caption:
          'Das monatliche Register mit Überstunden und Abzügen, in zwei Schritten freigegeben.',
      },
      {
        title: 'Lohnabrechnung',
        caption:
          'Bezüge, Abzüge und der Nachweis, wer sie erstellt, geprüft und ausgezahlt hat.',
      },
    ],
    techStackCategories: [
      'Frontend',
      'Styling',
      'Backend',
      'Datenabruf',
      'E-Mail',
      'Zeitsteuerung',
    ],
  },
  'bitsmiths-studio': {
    tagline: 'Agenturwebsite und CMS',
    summary:
      'Marketing-Website für ein Studio, das MVPs in 30 Tagen liefert.',
    description:
      'Die Marketing-Website des Studios, auf einem CMS gebaut, sodass Referenzen, Artikel und Kundenstimmen ohne Deploy veröffentlicht werden.',
    industry: 'Softwareagentur',
    headline: { value: '4', label: 'Inhaltstypen, keine Deploys' },
    problem:
      'Das Studio verspricht produktionsreife MVPs in 30 Tagen, und zwar Gründerinnen und Gründern, die es mit Agenturen vergleichen, die ein Vielfaches verlangen. Dieses Versprechen braucht sichtbare Belege, und das Team musste sie ohne Entwicklung veröffentlichen können.',
    approach:
      'Next.js über einem Directus-CMS, sodass jede Inhaltsfläche bearbeitbar ist. Die Seite ist als geordnete Argumentation aufgebaut: Versprechen, Beleg, Einwände, ein Handlungsaufruf.',
    outcomes: [
      '30 Tage vom Briefing zum ausgelieferten MVP, das Versprechen der Website.',
      '4 Inhaltstypen, veröffentlichbar ohne Codeänderung.',
      '1 Handlungsaufruf, nach Versprechen, Beleg und Einwänden.',
    ],
    architecture:
      'Next.js App Router über einem Directus-Headless-CMS. Referenzen, Beiträge, Kundenstimmen und FAQs sind CMS-Sammlungen, die über gemeinsame Vorlagen gerendert werden, mit Medien über Transformationen zur Anfragezeit.',
    keyFeatures: [
      'CMS-gestützte Referenzen mit gemeinsamer Detailvorlage',
      'Technik-Blog',
      'Karussell mit Kundenstimmen',
      'FAQ zu Preisen und Vorgehen',
      'SEO- und OpenGraph-Metadaten je Seite',
    ],
    challenges: [
      {
        challenge:
          'Marketingtexte, Referenzen und Artikel mussten sich häufig ändern lassen, ohne dass die Entwicklung eingebunden ist.',
        solution:
          'Wir haben jede Inhaltsfläche in Directus modelliert und über gemeinsame Vorlagen gerendert, sodass Veröffentlichen eine Handlung im CMS ist statt eines Deploys.',
      },
      {
        challenge:
          'Bilder von Referenzen sind schwer und würden sonst das Seitengewicht dominieren, gerade auf einer Marketing-Website, bei der der erste Eindruck von der Geschwindigkeit abhängt.',
        solution:
          'Alle Medien laufen über Directus mit WebP-Transformationen je Anfrage, sodass Seiten moderne Formate ausliefern, ohne dass jemand von Hand exportieren muss.',
      },
    ],
    gallery: [
      {
        title: 'Blog',
        caption:
          'Beiträge und Neuigkeiten, aus dem CMS heraus auf der Startseite veröffentlicht.',
      },
      {
        title: 'Leistungen',
        caption:
          'Der Leistungskatalog, vom Team im CMS verfasst und sortiert.',
      },
      {
        title: 'Preise',
        caption: 'Tarife und der Weg zur Anfrage am Ende der Seite.',
      },
    ],
    techStackCategories: ['Frontend', 'Styling', 'CMS'],
  },
  'real-estate-management-system': {
    title: 'Real Estate Operating System',
    client: 'Vertraulich (Immobiliengruppe)',
    tagline: 'Mandantenfähige KI-Plattform, die den Maklerbetrieb automatisiert',
    summary:
      'Mandantenfähige KI-Plattform zur Automatisierung des Betriebs von Immobilienmaklern.',
    description:
      'Ein einheitliches Betriebssystem für Maklerbüros, das CRM, Compliance, Marketing, Dokumentenerstellung und E-Signatur in einer mandantenfähigen Plattform zusammenführt.',
    industry: 'Immobilien',
    headline: { value: '30+', label: 'Maklerbüros auf einer Plattform' },
    problem:
      'Maklerbüros verwalteten CRM, Compliance, Marketing und Dokumentenabläufe über unverbundene Werkzeuge und manuelle Prozesse hinweg. Für Kunden- und Objektverwaltung oder die Erstellung von Verträgen gab es kein einheitliches System.',
    approach:
      'Wir haben ein mandantenfähiges KI-System mit spezialisierten Agenten für CRM, Compliance und Wissen gebaut und diese dann mit einem Marketingmodul und einer vollständigen Pipeline für Dokumentenerstellung und E-Signatur verbunden.',
    outcomes: [
      '30+ Maklerbüros auf einer Plattform unterstützt.',
      '70 % weniger Zeitaufwand für die manuelle Bearbeitung von Dokumenten und Verträgen.',
    ],
    architecture:
      'Ein React-Frontend spricht mit einem Backend aus Python und FastAPI, während LangGraph spezialisierte Multi-Agenten-Abläufe auf Basis von OpenAI-Modellen orchestriert. Die mandantenfähige Architektur bedient mehr als 30 Maklerbüros aus einer Plattform heraus und unterstützt dabei das jeweils eigene CRM und die eigenen Abläufe.',
    keyFeatures: [
      'CRM-Agent, der sich mit den CRMs der einzelnen Büros abgleicht',
      'Compliance-Agent für regulatorische Abläufe',
      'Wissens-Agent für Fragen zu Pipeline und Abläufen',
      'Marketingmodul für Fotografiebuchung und Prospektbestellung',
      'Berichte für Eigentümer',
      'Automatisierte Dokumentenerstellung und E-Signatur',
    ],
    challenges: [
      {
        challenge:
          'Jedes Büro nutzte ein eigenes CRM und eigene Abläufe, sodass eine feste Integration nicht alle Mandanten bedienen konnte.',
        solution:
          'Wir haben die Unterschiede hinter büro-spezifischen CRM-Integrationen gekapselt und den Agentenablauf sowie das Produkterlebnis über alle Mandanten hinweg gemeinsam gehalten.',
      },
      {
        challenge:
          'Aufgaben aus CRM, Compliance, Wissen und Dokumenten mussten zusammenspielen, ohne dass ein langer Ablauf zu einer brüchigen Kette wird.',
        solution:
          'Wir haben die Arbeit auf spezialisierte Agenten aufgeteilt und mit LangGraph deren Zuständigkeiten und Übergaben koordiniert.',
      },
    ],
    gallery: [
      {
        title: 'Vermietungspipeline',
        caption:
          'Interessenten, vom CRM-Agenten bewertet und durch Besichtigung, Angebot und Vertrag geführt.',
      },
      {
        title: 'Vertragserstellung',
        caption:
          'Mietverträge, aus Vorlagen erzeugt und zur elektronischen Unterschrift versandt.',
      },
      {
        title: 'KI-Agenten',
        caption:
          'Agenten für CRM, Compliance und Wissen, begrenzt auf die Daten des jeweiligen Büros.',
      },
    ],
    techStackCategories: ['Frontend', 'Backend', 'KI', 'Architektur'],
  },
  'qa-compliance-agent': {
    title: 'Agent für Compliance-Prüfung',
    client: 'Vertraulich (Wirtschaftsprüfung)',
    tagline: 'Feststellungen als Änderungsverfolgung je Klausel, KI-erzeugt',
    summary:
      'KI-Agent für Compliance, der Feststellungen als Änderungsverfolgung je Klausel erzeugt.',
    description:
      'Ein KI-gestützter Prüfablauf, der hochgeladene Berichte gegen etablierte Normen abgleicht und Änderungsverfolgung auf Klauselebene zurückgibt, mit einer klaren Begründung zu jeder Feststellung.',
    industry: 'Prüfung und Compliance',
    headline: { value: '50 %', label: 'kürzere Durchlaufzeit der Prüfung' },
    problem:
      'Manuelle Compliance- und Prüfungsdurchsichten gegen etablierte Normen waren langsam und fielen je nach prüfender Person unterschiedlich aus, wobei jeder Bericht rund eine Woche in Anspruch nahm.',
    approach:
      'Wir haben einen Agenten gebaut, der hochgeladene Berichte gegen einen Datensatz etablierter Normen prüft und daraus einen Feststellungsbericht mit Änderungsverfolgung auf Klauselebene und KI-verfassten Kommentaren zu jedem beanstandeten Punkt erzeugt.',
    outcomes: [
      '50 % kürzere Durchlaufzeit der Prüfung, von etwa einer Woche auf ungefähr die Hälfte.',
      'Doppelt so schneller Prüfprozess bei einheitlicheren Ergebnissen.',
    ],
    architecture:
      'Ein auf AWS betriebenes Backend aus Python und FastAPI übernimmt das Einlesen der Berichte und den Abgleich mit dem Normendatensatz. Claude erzeugt Prüfung und Kommentare und gibt Feststellungen zurück, die einzelnen Klauseln zugeordnet sind, für einen nachvollziehbaren Prüfablauf.',
    keyFeatures: [
      'Upload von Berichten und Abgleich mit einem Normendatensatz',
      'Feststellungen als Änderungsverfolgung auf Klauselebene',
      'KI-erzeugte Kommentare zu jeder Feststellung',
      'Einheitliche, wiederholbare Prüflogik über alle Berichte hinweg',
    ],
    challenges: [
      {
        challenge:
          'Allgemein gehaltene KI-Rückmeldungen waren nicht präzise genug für Prüferinnen und Prüfer, die genau sehen mussten, welche Klausel eine Feststellung ausgelöst hat.',
        solution:
          'Wir haben jede Prüfung im Normendatensatz verankert und Feststellungen als Änderungsverfolgung mit angehängter Begründung zurückgegeben.',
      },
      {
        challenge:
          'Die Einschätzung der Prüfenden schwankte zwischen Berichten, was Ergebnisse schwer vergleichbar machte und die abschließende Freigabe verzögerte.',
        solution:
          'Wir haben die Prüfung als wiederholbaren Agentenablauf festgeschrieben, sodass jeder Bericht gegen dieselben Normen und dieselbe Ausgabestruktur bewertet wird.',
      },
    ],
    gallery: [
      {
        title: 'Prüf-Warteschlange',
        caption:
          'Dokumente, in Klauseln zerlegt und gegen die ausgewählten Normen geprüft.',
      },
      {
        title: 'Feststellungsbericht',
        caption:
          'Feststellungen nach Schweregrad, exportierte Änderungen und Kommentare am Rand.',
      },
      {
        title: 'Normenbibliothek',
        caption:
          'Die Absätze, auf die sich jede Feststellung beruft, samt der eigenen Auslegung der Kanzlei.',
      },
    ],
    techStackCategories: ['Backend', 'Cloud', 'KI'],
  },
  'ai-interview-assistant': {
    title: 'Sprachassistent für Interviews in Echtzeit',
    client: 'Vertraulich (Personalvermittlung)',
    tagline: 'Live-KI-Sprachinterviews mit automatischen Transkripten',
    summary:
      'Durchgängige KI-Interviewplattform mit Live-Sprache und Transkription.',
    description:
      'Eine durchgängige Interviewplattform, die Live-KI-Sprachinterviews plant, terminiert und durchführt und das Transkript nach Ende der Sitzung automatisch zustellt.',
    industry: 'Personalvermittlung',
    headline: { value: '30+', label: 'durchgängig geführte Interviews' },
    problem:
      'Strukturierte allgemeine, podcastartige oder Bewerbungsinterviews in größerer Zahl zu führen, erforderte für jede Sitzung manuelle Terminplanung, Moderation und Nachbearbeitung des Transkripts.',
    approach:
      'Wir haben eine Plattform gebaut, auf der Nutzende Interviewart, Beschreibung, Stil sowie eigene Einleitung und Abschluss wählen. Sie führt das Interview live über die OpenAI Realtime API, übernimmt Transkription, Meeting-Links und Einladungen und stellt das Transkript anschließend automatisch zu.',
    outcomes: [
      '30+ Praktikumsinterviews über die Plattform geführt.',
      '3 unterstützte Interviewformate: allgemein, podcastartig und Bewerbung.',
    ],
    architecture:
      'Next.js trägt Frontend und Backend und hält damit Einrichtung, Einladungen und Zustellung nach der Sitzung in einer Anwendung. Die OpenAI Realtime API führt das Live-Sprachgespräch und die Transkription, einschließlich Bewerbungssitzungen mit mehreren Kandidatinnen, Kandidaten und Lebensläufen.',
    keyFeatures: [
      'Interviewarten allgemein, podcastartig und Bewerbung',
      'Eigene Interviewbeschreibung, Stil, Einleitung und Abschluss',
      'Live-Sprachinterview mit Transkription in Echtzeit',
      'Unterstützung mehrerer Bewerbender und Lebensläufe je Sitzung',
      'Automatische Erzeugung von Meeting-Links und Einladungen',
      'Automatische Zustellung des Transkripts per E-Mail nach dem Interview',
    ],
    challenges: [
      {
        challenge:
          'Ein Live-Interview musste gesprochenes Gespräch und Transkript über die gesamte Sitzung hinweg synchron halten.',
        solution:
          'Wir nutzen die OpenAI Realtime API sowohl für das Sprachinterview als auch für die Live-Transkription, sodass beides in derselben Echtzeitsitzung läuft.',
      },
      {
        challenge:
          'Bewerbungsinterviews mussten mehrere Kandidatinnen, Kandidaten und Lebensläufe unterstützen, ohne deren Kontext zu vermischen.',
        solution:
          'Wir haben Bewerbungssitzungen um kandidatenspezifische Eingaben herum strukturiert und Terminplanung, Einladungen und Transkriptzustellung in einem Ablauf gehalten.',
      },
    ],
    gallery: [
      {
        title: 'Bewerbende',
        caption:
          'Jede Runde nach demselben Raster bewertet, mit Live-Sitzungen einen Klick entfernt.',
      },
      {
        title: 'Interviewbericht',
        caption:
          'Bewertungen nach Raster, Höhepunkte mit Zeitstempel und eine Empfehlung zur Durchsicht.',
      },
      {
        title: 'Einrichtung der Rolle',
        caption:
          'Fragestruktur, adaptive Nachfragen und Spracheinstellungen je Rolle.',
      },
    ],
    techStackCategories: ['Frontend & Backend', 'KI'],
  },
  snobbots: {
    tagline: 'Mandantenfähige KI-Support-Agenten für Onlineshops',
    summary: 'Mandantenfähige KI-Chatbot-Plattform.',
    description:
      'Wiederverkäufer richten KI-Support-Agenten für ihre Shops in großer Zahl ein, wobei jeder Mandant getrennt ist und jede Antwort in den Inhalten des jeweiligen Shops verankert wird.',
    industry: 'E-Commerce / Kundenservice',
    headline: { value: '60 %', label: 'schnellere Bereitstellung der Agenten' },
    problem:
      'Wiederverkäufer wollten ihren eigenen Kunden KI-Support-Agenten anbieten, doch jede Bereitstellung war Maßarbeit, sodass die Einrichtung eines neuen Shops Tage manueller Arbeit kostete.',
    approach:
      'Wir haben eine mandantenfähige MERN-Architektur gebaut, in der jeder Shop einen eigenständigen, kontextbewussten Agenten betreibt, und darüber eine automatisierte Bereitstellung gelegt, sodass Wiederverkäufer Bots in großer Zahl statt einzeln aufsetzen können.',
    outcomes: [
      '60 % schnellere Bereitstellung durch automatisierte Orchestrierung.',
      '1 Namensraum je Mandant, sodass kein Shop die Inhalte eines anderen lesen kann.',
    ],
    architecture:
      'MERN: React, eine API aus Express und Node.js und MongoDB für Mandanten- und Gesprächsdaten. Pinecone hält die Embeddings je Mandant, sodass der Abruf auf die Wissensbasis eines Shops begrenzt ist und die Bereitstellung ohne manuelle Einrichtung läuft.',
    keyFeatures: [
      'Mandantenfähige Architektur mit getrennten Agenten',
      'RAG für kontextbewusste, geschäftsspezifische Antworten',
      'Automatisierte Bereitstellung vieler Bots auf einmal',
      'Verwaltungs-Dashboard für Wiederverkäufer',
      'Einbettbares Support-Widget',
    ],
    challenges: [
      {
        challenge:
          'Der Abruf über einen gemeinsamen Vektorindex brachte Inhalte eines Shops in den Antworten eines anderen zum Vorschein.',
        solution:
          'Wir haben die Embeddings in Pinecone je Mandant partitioniert, sodass der Abruf immer nur den Namensraum des anfragenden Shops erreichen kann.',
      },
      {
        challenge:
          'Die manuelle Einrichtung je Shop machte das Onboarding der Wiederverkäufer zum Engpass für Wachstum.',
        solution:
          'Wir haben die Bereitstellung durchgängig automatisiert und damit aus einem mehrtägigen manuellen Vorgang eine Massenoperation gemacht.',
      },
    ],
    gallery: [
      {
        title: 'Übergabe-Postfach',
        caption:
          'Gespräche, die der Bot nicht abschließen konnte, mit Bestellung und Kunde daneben.',
      },
      {
        title: 'Wissensbasis',
        caption:
          'Katalog, Bestell-API und Richtlinien, aus denen jeder Bot antworten darf.',
      },
      {
        title: 'Shop-Widget',
        caption: 'Der Kundenchat erscheint im Shop des Kunden.',
      },
    ],
    techStackCategories: ['Frontend', 'Backend', 'Datenbank', 'KI'],
  },
  'ai-physiotherapy': {
    title: 'KI-Assistent für Physiotherapie',
    client: 'Vertraulich (Gesundheitswesen)',
    tagline: 'Adaptive Rehabilitation, von KI begleitet',
    summary: 'Full-Stack-KI-Plattform für adaptive Rehabilitation.',
    description:
      'Ein durchgängiger Rehabilitationsverlauf von der Aufnahme über die Bewegungsanalyse und adaptive Trainingsplanung bis zu täglichem Fortschritt und KI-gestütztem Videofeedback.',
    industry: 'Gesundheitswesen',
    headline: { value: '90 %+', label: 'Genauigkeit der Analyse' },
    problem:
      'Der Rehabilitationsverlauf war zersplittert: manuelle Aufnahme, Bewegungsanalyse, allgemeine Trainingspläne und seltene Nachkontrollen. Zwischen den betreuten Terminen hatten Patientinnen und Patienten kaum Anleitung, und die Pläne reagierten nicht schnell auf die tatsächliche Leistung.',
    approach:
      'Wir haben den Verlauf um einen Aufnahme-Agenten, eine angeleitete Bewegungsanalyse und die automatische Erstellung von Trainingsplänen herum gebaut. Tägliche Einträge steuern die Steigerung oder Reduktion des Plans, während hochgeladene Übungsvideos KI-Feedback erhalten und Fachartikel zu Verletzungen in künftige Pläne einfließen.',
    outcomes: [
      '90 %+ Genauigkeit bei der KI-gestützten Bewegungs- und Ausführungsanalyse.',
      'Tägliche Steigerung und Reduktion des Plans, automatisiert aus der Leistung der Patientinnen und Patienten.',
    ],
    architecture:
      'Ein React-Frontend verbindet sich mit einem Backend aus Python und FastAPI. LangChain koordiniert Aufnahme, Analysekontext und Planerstellung, während OpenAI die adaptive Anleitung erzeugt. Hochgeladene Videos fließen in die Ausführungsanalyse, und hochgeladene Fachartikel zu Verletzungen liefern das Quellenmaterial für die Planerstellung.',
    keyFeatures: [
      'Aufnahme-Agent, der den Patientenverlauf startet',
      'Bewegungsanalyse mit Anleitungsvideos und Tutorials',
      'Automatische Erstellung von Trainingsplänen',
      'Tägliche Einträge mit automatischer Steigerung oder Reduktion',
      'Ausführungsanalyse hochgeladener Videos mit KI-Feedback',
      'Planerstellung auf Basis hochgeladener Fachartikel zu Verletzungen',
    ],
    challenges: [
      {
        challenge:
          'Statische Trainingspläne konnten nicht reagieren, wenn sich die tägliche Leistung verbesserte oder verschlechterte.',
        solution:
          'Wir haben die täglichen Einträge mit Regeln für Steigerung und Reduktion verbunden, sodass sich der Plan automatisch anpasst, statt auf eine manuelle Durchsicht zu warten.',
      },
      {
        challenge:
          'Die Planerstellung brauchte verletzungsspezifischen Kontext, statt sich auf allgemeines Modellwissen zu verlassen.',
        solution:
          'Wir haben hochgeladene Artikel zu häufigen Verletzungen für den Erstellungsablauf verfügbar gemacht, sodass Empfehlungen auf einschlägiges Quellenmaterial zurückgreifen können.',
      },
    ],
    gallery: [
      {
        title: 'Bewegungsanalyse',
        caption:
          'Haltungsanalyse an einem hochgeladenen Clip, mit Gelenkwinkeln und Rückmeldung zur Ausführung.',
      },
      {
        title: 'Achtwochenplan',
        caption:
          'Phasen, die Einheiten dieser Woche und jede Anpassung samt Begründung.',
      },
      {
        title: 'Ansicht für Behandelnde',
        caption:
          'Patientinnen und Patienten nach Dringlichkeit, mit KI-Planänderungen zur Freigabe.',
      },
    ],
    techStackCategories: ['Frontend', 'Backend', 'KI'],
  },
  'new-web-order': {
    tagline: 'Unternehmenswebsite, neu gebaut für Tempo und SEO',
    summary: 'Unternehmenswebsite, gebaut für Performance und SEO.',
    description:
      'Eine Unternehmenswebsite, auf Next.js neu gebaut für Tempo und Suche. 40 % schneller, und endlich mit guten Rankings.',
    industry: 'Professionelle Dienstleistungen',
    headline: { value: '40 %', label: 'schnellere Ladezeiten' },
    problem:
      'Die bestehende Website lud langsam und rankte schlecht, was das Unternehmen Anfragen kostete, noch bevor Besuchende das Angebot überhaupt sahen.',
    approach:
      'Wir haben die Website auf Next.js mit TypeScript für Typsicherheit und Tailwind für das Styling neu gebaut und uns dann durch das Performance-Budget gearbeitet: Code-Splitting, Bildoptimierung und je Route abgestimmte Rendering-Strategien.',
    outcomes: [
      '40 % schneller durch gezielte Performance-Arbeit.',
      '100 % der Routen erreichen ihren Handlungsaufruf in einem Scrollvorgang.',
    ],
    architecture:
      'Static-First-Build mit dem Next.js App Router. Routen werden vorgerendert, wo die Inhalte es zulassen, Bilder laufen über next/image mit expliziten Maßen, und JavaScript wird je Route aufgeteilt, um die anfängliche Last klein zu halten.',
    keyFeatures: [
      'Static-First-Rendering für schnelles erstes Bild',
      'Code-Splitting auf Routenebene',
      'Optimierte Bilder ohne Layoutsprünge',
      'SEO-Metadaten über alle Routen',
      'Vollständig responsives Layout',
    ],
    challenges: [
      {
        challenge:
          'Große Marketingbilder dominierten das Seitengewicht und verzögerten das erste Bild.',
        solution:
          'Wir haben alle Bilder auf next/image mit expliziten Maßen und modernen Formaten umgestellt und nur das Hero-Bild oberhalb der Falz priorisiert.',
      },
    ],
    gallery: [
      {
        title: 'Projekte',
        caption: 'Die Projektübersicht, neu gebaute Seiten.',
      },
      {
        title: 'Leistungen',
        caption: 'Leistungsseiten, aus strukturierten Inhalten erzeugt.',
      },
      {
        title: 'Über uns',
        caption: 'Die Unternehmensseite auf demselben Layoutsystem.',
      },
    ],
    techStackCategories: ['Frontend', 'Styling'],
  },
  'bidnest-mobile': {
    title: 'Bidnest Mobile App',
    client: 'Vertraulich (Marktplatz für Studierendenwohnungen)',
    tagline: 'Der Auktionsmarktplatz, verpackt für iOS und Android',
    summary:
      'Der Bidnest-Marktplatz, mit Capacitor verpackt, damit Studierende und Eltern vom Telefon aus bieten können.',
    description:
      'Dieselbe Codebasis, die die Bidnest-Webplattform betreibt, mit Capacitor zu nativen iOS- und Android-Apps verpackt. Ein Team liefert die Webplattform und beide App Stores aus einem einzigen Repository, und jeder Ablauf des Marktplatzes funktioniert innerhalb der nativen Hülle, ohne neu gebaut zu werden.',
    industry: 'Immobilientechnologie',
    headline: { value: '1', label: 'Codebasis für Web, iOS und Android' },
    problem:
      'Studierende leben auf ihrem Telefon. Ein vom Laptop abgegebenes Gebot kann überboten werden, während sie in der Vorlesung sitzen, und ein Browser-Tab weckt niemanden. Zwei native Apps von Grund auf zu bauen, hätte die Arbeit für einen bereits bestehenden Marktplatz verdoppelt.',
    approach:
      'Statt das Produkt nativ neu zu bauen, haben wir die bestehende Next.js-Anwendung mit Capacitor verpackt, die Screens für Gebote und Nachrichten auf Touch und sichere Bereiche abgestimmt und das Ergebnis aus demselben Repository in beide Stores geliefert.',
    outcomes: [
      '1 Codebasis liefert die Website, die iOS-App und die Android-App.',
      '2 App Stores, bedient aus demselben Release-Branch.',
      '0 neu gebaute Funktionen: jeder Ablauf des Marktplatzes funktioniert in der nativen Hülle.',
    ],
    architecture:
      'Capacitor betreibt den produktiven Web-Build in einer nativen WebView auf iOS und Android. Native Plugins decken ab, was der Browser nicht kann; alles andere, von Echtzeitgeboten bis zum Stripe-Checkout, ist derselbe Code, der die Webplattform bedient, sodass eine Korrektur auf drei Plattformen zugleich ausgeliefert wird.',
    keyFeatures: [
      'Native iOS- und Android-Builds aus der Web-Codebasis',
      'Dieselben Abläufe für Gebote, Nachrichten und Zahlungen',
      'Touch-orientierte Layouts mit Beachtung sicherer Bereiche',
      'Sitzung bleibt zwischen Starts auf dem Gerät erhalten',
      'Deep Links aus Benachrichtigungen direkt zum passenden Angebot',
      'Offline-Screen statt einer Browser-Fehlermeldung',
    ],
    challenges: [
      {
        challenge:
          'WebSocket-Verbindungen brechen ab, wenn die App in den Hintergrund wechselt, sodass Gebote nach dem Fortsetzen verspätet eintreffen konnten.',
        solution:
          'Beim Fortsetzen wird neu verbunden und der Zustand vollständig abgeglichen, sodass das Angebot die verbindliche Gebotshistorie zeigt, sobald die App zurückkehrt.',
      },
      {
        challenge:
          'Die Store-Prüfung lehnt Apps ab, die sich wie eine Website in einem Rahmen verhalten.',
        solution:
          'Native Navigationsgesten, Layouts für sichere Bereiche und ein Offline-Screen, wobei die Web-Navigation innerhalb der Hülle entfernt wurde.',
      },
    ],
    gallery: [
      {
        title: 'Dashboard für Studierende',
        caption:
          'Gebote, Schritte zum Mietvertrag und Dienste innerhalb der nativen Hülle.',
      },
      {
        title: 'Nachrichten',
        caption:
          'Verläufe mit Vermietenden und Anbietern, per Deep Link aus Benachrichtigungen geöffnet.',
      },
      {
        title: 'Stöbern',
        caption:
          'Karte und Suche der Webplattform, auf Touch abgestimmt.',
      },
    ],
    techStackCategories: [
      'Native Hülle',
      'Frontend',
      'Styling',
      'Backend',
      'Echtzeit',
      'Zahlungen',
      'Benachrichtigungen',
      'Analytics',
    ],
  },
  'tayyab-sohail-portfolio': {
    tagline: 'Referenz-Portfolio für einen erfahrenen Entwickler',
    summary:
      'Eine persönliche Website, auf der jedes Projekt eine vollständige Fallstudie ist, erzeugt aus einer einzigen typisierten Datendatei.',
    description:
      'Das Portfolio unseres Gründers: eine Next.js-Website, bei der das Projektraster, jede Fallstudienseite, die Sitemap und die Social-Vorschauen aus einer einzigen typisierten Datendatei erzeugt werden. Sie liefert HTML aus, animiert ohne Einbußen bei der Ladezeit und ermöglicht Terminbuchungen über einen eingebetteten Kalender.',
    industry: 'Softwareentwicklung',
    headline: { value: '12', label: 'Fallstudien aus einer Datendatei' },
    problem:
      'Ein Lebenslauf zählt Technologien auf; er zeigt nicht, wie ein Produkt gebaut wurde oder was sich nach dem Launch verändert hat. Die meisten Portfolio-Websites sind ein Raster aus Vorschaubildern ohne Substanz dahinter, und ein Dutzend Projektseiten von Hand konsistent zu halten, ist genau die Stelle, an der sie auseinanderfallen.',
    approach:
      'Wir haben das Portfolio wie ein Produkt behandelt. Jedes Projekt ist ein typisierter Datensatz mit Problem, Vorgehen, Architektur, Funktionen, Herausforderungen und Ergebnissen, und die Website erzeugt Raster, Fallstudienseiten, Sitemap und Social-Vorschauen aus diesem einen Array.',
    outcomes: [
      '12 Fallstudien, erzeugt aus einer einzigen typisierten Datendatei.',
      '0 CMS und 0 Datenbank: jede Seite wird beim Deploy statisch gebaut.',
      '1 Klick von jeder Fallstudie zum gebuchten Termin.',
    ],
    architecture:
      'Next.js App Router mit statischer Generierung für jede Fallstudien-Route. Die Projektdaten liegen in einem einzigen TypeScript-Array, sodass die Typprüfung einen Build verweigert, wenn ein Abschnitt fehlt. Die Bewegung läuft über Framer Motion nach dem ersten Bild; die Terminbuchung ist ein eingebettetes Cal.com-Widget.',
    keyFeatures: [
      'Filterbares Projektraster nach Kategorie und Kompetenz',
      'Je Projekt erzeugte Fallstudienseite',
      'Navigation zum vorherigen und nächsten Projekt',
      'Sitemap und Social-Bilder aus denselben Daten abgeleitet',
      'Eingebettete Terminbuchung',
      'Lebenslauf zum Herunterladen',
    ],
    challenges: [
      {
        challenge:
          'Zwölf von Hand geschriebene Fallstudien liefen in Struktur und Tonfall auseinander.',
        solution:
          'Ein typisiertes Schema für alle Projekte, wobei der Compiler den Build scheitern lässt, wenn ein Feld fehlt.',
      },
      {
        challenge:
          'Animierte Seiten schneiden bei Ladezeit und Layoutstabilität meist schlecht ab.',
        solution:
          'Statische Generierung, Schriften über next/font geladen und Bewegung, die erst nach dem ersten Bild startet.',
      },
    ],
    gallery: [
      {
        title: 'Tech-Stack',
        caption: 'Werkzeuge und Frameworks, nach Ebene gruppiert.',
      },
      {
        title: 'Kontakt',
        caption:
          'Ein Nachrichtenformular und eine eingebettete Cal.com-Buchung auf einem Screen.',
      },
    ],
    techStackCategories: ['Frontend', 'Styling & Motion', 'Buchung', 'Hosting'],
  },
};
