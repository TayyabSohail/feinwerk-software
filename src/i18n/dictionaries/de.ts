import type { Dictionary } from './en';

/** German copy. Structure mirrors `en` exactly. */
export const de: Dictionary = {
  locale: 'de',
  nav: {
    services: 'Leistungen',
    work: 'Projekte',
    about: 'Über uns',
    contact: 'Kontakt',
    home: 'Start',
    careers: 'Karriere',
    cta: 'Projekt starten',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    language: 'Sprache',
  },
  hero: {
    badge: 'Studio für Produktentwicklung · Deutschland & Pakistan',
    title: 'Individuelle Software, termingerecht geliefert',
    accent: [2, 3],
    body: 'Feinwerk Software konzipiert und entwickelt Webplattformen, KI-Systeme und Cloud-Infrastruktur für Unternehmen in Europa und Asien. Jedes Projekt beginnt mit definiertem Umfang, Festpreis und verbindlichem Liefertermin.',
    primary: 'Angebot anfordern',
    secondary: 'Unsere Arbeit ansehen',
    proof: [
      'Festpreisprojekte',
      'Verbindliche Liefertermine',
      'Wöchentliche Statusreviews',
      'Volle Rechte am Code',
    ],
    live: 'Im Einsatz',
    privateLabel: 'Interner Einsatz',
  },
  work: {
    kicker: 'Ausgewählte Arbeiten',
    title: 'Produkte, die wir geliefert haben',
    description:
      'Zwölf Plattformen im Einsatz: Marktplätze, die echtes Geld bewegen, KI-Systeme, die aus den richtigen Dokumenten antworten, interne Werkzeuge, die bis zur letzten Einheit stimmen.',
    all: 'Alle Projekte',
    view: 'Projekt ansehen',
    filterLabel: 'Projekte filtern',
    filters: {
      All: 'Alle',
      SaaS: 'SaaS',
      Marketplace: 'Marktplätze',
      AI: 'KI',
      Website: 'Websites',
      'Full-Stack': 'Full-Stack',
      'Cloud & Automation': 'Cloud & Automatisierung',
      Web: 'Web',
    },
    count: '{n} Projekte',
  },
  services: {
    kicker: 'Was wir bauen',
    title: 'Das ganze Produkt, ein erfahrenes Team',
    description:
      'Oberfläche, API, Daten, KI und die Cloud darunter. Wählen Sie ein Format oder beschreiben Sie das Problem, wir schlagen eines vor.',
    all: 'Alle Leistungen',
    explore: 'Leistung ansehen',
  },
  technologies: {
    kicker: 'Bewährte Technologie',
    statement: 'Gebaut auf den Werkzeugen, die zählen.',
    statementMuted:
      'Wir nutzen dieselben Modelle, Frameworks und Infrastruktur wie die Produkte, auf die Sie sich bereits verlassen. Nichts, was wir liefern, ist ein Experiment auf Ihre Kosten.',
    stackLabel: 'Der Stack, nach Ebene',
    layers: [
      { label: 'Oberfläche', note: 'Was Ihre Nutzer sehen und bedienen.' },
      {
        label: 'Backend & Daten',
        note: 'Wo die Wahrheit liegt und abgestimmt wird.',
      },
      {
        label: 'KI-Systeme',
        note: 'Modelle, Retrieval und Agenten, verankert in Ihren Daten.',
      },
      {
        label: 'Cloud & Betrieb',
        note: 'Wo es läuft, ausgeliefert wird und weiterläuft.',
      },
    ],
  },
  industries: {
    kicker: 'Branchen',
    title: 'Für wen wir bauen',
    description:
      'Produkte, bei denen eine falsche Zahl Geld kostet. Hinter jeder Branche steht ein ausgeliefertes Projekt.',
    shipped: 'Geliefert',
    items: {
      fintech: {
        name: 'Fintech',
        blurb:
          'Wallets, Ledger und Auszahlungen, die bis auf die letzte Einheit stimmen.',
      },
      realEstate: {
        name: 'Immobilien',
        blurb: 'Marktplätze, Mietplattformen und Agentur-Abläufe.',
      },
      ecommerce: {
        name: 'E-Commerce',
        blurb:
          'Multi-Seller-Shops, Checkout, Versand und automatisierter Support.',
      },
      hr: {
        name: 'HR & Lohn',
        blurb:
          'Zeiterfassung, Urlaub und Lohnabrechnung, die jede Prüfung bestehen.',
      },
      healthcare: {
        name: 'Gesundheit',
        blurb: 'Reha- und Patientenassistenten mit klinischen Leitplanken.',
      },
      recruiting: {
        name: 'Recruiting',
        blurb:
          'Strukturierte Sprachinterviews, Bewertung und Transkripte in großer Zahl.',
      },
      martech: {
        name: 'Marketing-Technologie',
        blurb:
          'SEO- und Content-Plattformen, die erzeugen, veröffentlichen und messen.',
      },
      compliance: {
        name: 'Compliance',
        blurb: 'Dokumentenprüfung auf Klauselebene mit Prüfpfad.',
      },
    },
  },
  globalReach: {
    kicker: 'Weltweit',
    title: 'Technische Tiefe, geliefert über Zeitzonen hinweg',
    description:
      'Kunden in Europa, Asien, Afrika und Nordamerika. Entwicklung in Rawalpindi, Kundenbüro in Fellbach, und ein Arbeitstag, der beides abdeckt.',
    bullets: [
      'Festpreis und fester Termin in jedem Angebot',
      'DSGVO-konforme Verarbeitung, AVV und NDA auf Anfrage',
      'Ausschließlich Senior-Entwickler, in CET und PKT',
    ],
    legend: 'Standorte und Kundenorte',
  },
  numbers: {
    kicker: 'In Zahlen',
    title: 'Belege statt Versprechen',
    description:
      'Unternehmenskennzahlen und Ergebnisse, die Kunden nach dem Launch berichtet haben.',
    items: [
      { value: '150+', label: 'Abgeschlossene Projekte' },
      { value: '40+', label: 'Kunden auf vier Kontinenten' },
      { value: '1M+', label: 'Endnutzer auf von uns gebauten Produkten' },
      { value: '99,9%', label: 'Verfügbarkeit über alle Live-Plattformen' },
      { value: '12', label: 'Bediente Branchen' },
      { value: '70%', label: 'Weniger Handarbeit nach Automatisierung' },
      { value: '6 Wo.', label: 'Typische Zeit bis zum ersten Release' },
      { value: '24h', label: 'Antwortzeit auf jede Nachricht' },
    ],
  },
  howItWorks: {
    kicker: 'So läuft es',
    title: 'Vom Briefing zum Launch, mit Datum',
    description:
      'Ein Gespräch, ein schriftlicher Plan, wöchentliche Demos, dann ein Launch, den Sie in den Kalender eintragen können. Sie behalten die Kontrolle.',
    stepLabel: 'Schritt',
    cta: 'Erstgespräch buchen',
    steps: [
      {
        title: 'Sagen Sie uns, was entstehen muss',
        summary:
          'Ein 30-minütiges Gespräch über Produkt, Nutzer und Termin. Innerhalb von fünf Werktagen erhalten Sie einen schriftlichen Umfang, einen Festpreis und ein Launch-Datum.',
        outputs: ['Schriftlicher Umfang', 'Festpreis', 'Launch-Datum'],
      },
      {
        title: 'Sehen Sie zu, wie es entsteht',
        summary:
          'Jeden Freitag eine klickbare Version mit kurzem schriftlichen Update. Wer früh umdenkt, zahlt nichts extra.',
        outputs: [
          'Wöchentliche Demo',
          'Staging-Zugang',
          'Schriftliches Update',
        ],
      },
      {
        title: 'Launch, und es gehört Ihnen',
        summary:
          'Wir gehen live, überwachen die ersten Wochen und übergeben alles mit Dokumentation. Retainer oder intern weiterführen, so oder so gehört es Ihnen.',
        outputs: ['Monitoring', 'Dokumentation', 'Vollständige Übergabe'],
      },
    ],
  },
  testimonials: {
    kicker: 'Kundenstimmen',
    title: 'So ist die Zusammenarbeit mit uns',
    accent: [3],
    description:
      'Jedes Zitat steht neben dem Projekt, das es beschreibt, damit Sie die Aussage an der Arbeit prüfen können.',
    read: 'Projekte lesen',
    caseStudy: 'Projekt ansehen',
    prev: 'Vorherige Stimme',
    next: 'Nächste Stimme',
  },
  faq: {
    kicker: 'Fragen',
    title: 'Antworten, bevor Sie fragen',
    accent: [0],
  },
  cta: {
    kicker: 'Sprechen wir',
    title: 'Bereit, ein Datum festzulegen?',
    accent: [3, 4],
    body: 'Schicken Sie uns heute ein kurzes Briefing. Innerhalb einer Woche erhalten Sie Umfang, Festpreis und Launch-Datum schriftlich, unverbindlich.',
    button: 'Projekt starten',
  },
  footer: {
    pitch:
      'Ein Studio für Produktentwicklung für Unternehmen, die sich keinen zweiten Versuch leisten können.',
    quote: 'Angebot anfordern',
    services: 'Leistungen',
    company: 'Unternehmen',
    offices: 'Standorte',
    legal: 'Rechtliches',
    connect: 'Kontakt',
    caseStudies: 'Projekte',
    rights: 'Alle Rechte vorbehalten.',
    backToTop: 'Nach oben',
  },
  languageNotice:
    'Projektseiten, Leistungsdetails und Rechtstexte sind derzeit nur auf Englisch verfügbar.',
};
