import type { Dictionary } from './en';

/** German copy. Structure mirrors `en` exactly. */
export const de: Dictionary = {
  locale: 'de',
  nav: {
    services: 'Leistungen',
    work: 'Projekte',
    pricing: 'Preise',
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
    badge: 'Studio für Produktentwicklung',
    title: 'Präzise Software,\npünktlich geliefert',
    accent: [2, 3],
    body: 'Feinwerk Software konzipiert und entwickelt Webplattformen, KI-Systeme und Cloud-Infrastruktur für Unternehmen in Europa und Asien. Jedes Projekt beginnt mit definiertem Umfang, Fest- oder Individualpreis und verbindlichem Liefertermin, und wir warten, was wir bauen, auch nach dem Launch.',
    primary: 'Angebot anfordern',
    secondary: 'Unsere Arbeit ansehen',
    map: {
      kicker: 'Ein Team, das ganze System',
      nodes: {
        web: 'Web-App',
        mobile: 'Mobile App',
        api: 'API',
        db: 'Datenbank',
        ai: 'KI-Modell',
        cloud: 'Cloud',
      },
    },
  },
  work: {
    kicker: 'Ausgewählte Arbeiten',
    title: 'Produkte, die wir geliefert haben',
    description:
      'Zwölf Produkte im Einsatz: Marktplätze, die echtes Geld bewegen, KI-Systeme, die aus den richtigen Dokumenten antworten, interne Werkzeuge, die bis zur letzten Einheit stimmen.',
    all: 'Alle Projekte',
    view: 'Projekt ansehen',
    filterLabel: 'Projekte filtern',
    filters: {
      All: 'Alle',
      SaaS: 'SaaS',
      Marketplace: 'Marktplätze',
      AI: 'KI',
      Mobile: 'Mobil',
      Website: 'Websites',
      'Full-Stack': 'Full-Stack',
      'Cloud & Automation': 'Cloud & Automatisierung',
      Web: 'Web',
    },
    count: '{n} Projekte',
  },
  services: {
    kicker: 'Leistungen',
    title: 'Das ganze Produkt, ein erfahrenes Team',
    description:
      'Vier Kompetenzen decken Oberfläche, API, Daten, KI und die Cloud darunter ab. Zwei Modelle der Zusammenarbeit legen fest, wie wir gemeinsam arbeiten.',
    all: 'Alle Leistungen',
    explore: 'Leistung ansehen',
    groups: {
      capability: {
        label: 'Was wir bauen',
        note: 'Einzeln oder kombiniert. Ein Team verantwortet den ganzen Stack.',
      },
      engagement: {
        label: 'Wie wir zusammenarbeiten',
        note: 'Bepreist nach Ergebnis, nicht nach Stunden. Individuelle Umfänge willkommen, und jedes Produkt wird nach dem Launch gewartet.',
      },
    },
    meta: {
      timeline: 'Zeitrahmen',
      team: 'Team',
      pricing: 'Preismodell',
      support: 'Nach dem Launch',
    },
  },
  pricing: {
    kicker: 'Preise',
    title: 'Wählen Sie das Paket, das zu Ihrem Unternehmen passt',
    description:
      'Drei Festpreispakete und eine individuelle Lösung nach Ihrem Briefing. Jedes beginnt mit schriftlichem Umfang und verbindlichem Termin, endet mit einem Produkt, das ganz Ihnen gehört, und wird von uns nach dem Launch gewartet.',
    period: 'einmalig',
    customPeriod: 'Festangebot',
    customCta: 'Individuelles Angebot anfordern',
    cta: 'Jetzt starten',
    note: 'Preise in USD, zzgl. MwSt. Nichts passt genau? Jedes Briefing erhält einen individuellen Umfang und ein Festpreisangebot innerhalb von fünf Werktagen, und jedes Paket enthält Wartung und Support nach dem Launch.',
    includes: {
      title: 'In jedem Paket enthalten, auch bei individuellen Lösungen',
      items: [
        {
          title: 'Schriftlicher Umfang und Festangebot',
          body: 'Standardpaket oder individuelle Lösung: Preis und Termin werden schriftlich vereinbart, bevor die Arbeit beginnt.',
        },
        {
          title: 'Wartung nach dem Launch',
          body: 'Monitoring, Fehlerbehebung, Updates und Sicherheits-Patches. Wir übergeben nicht und verschwinden.',
        },
        {
          title: 'Verantwortung für das, was wir bauen',
          body: 'Ein erfahrenes Team steht für das Produkt im Betrieb ein, so lange Sie es wünschen.',
        },
        {
          title: 'Volles Eigentum',
          body: 'Code, Konten und Designs gehören Ihnen ab dem ersten Tag, mit Dokumentation, um es ohne uns zu betreiben.',
        },
      ],
    },
    plans: [
      {
        id: 'consulting',
        name: 'Beratung & Strategie',
        tagline: 'Fundierte Beratung, die Ihr Wachstum beschleunigt.',
        price: '$2,999',
        features: [
          'Zukunftssicherer Technologie-Blueprint',
          '6-Monats-Wachstumsplan',
          'Erstklassiger Tech-Stack',
          'Skalierungsstrategie für Enterprise',
          'ROI-orientierte Planung',
          'Hiring- und Teamplanung',
          'Strategie zur Risikominimierung',
          '90-Tage-Wachstumsplan',
          'Folgetermine nach der Übergabe',
        ],
      },
      {
        id: 'mvp',
        name: 'MVP-Entwicklung',
        tagline: 'Marktreifes MVP in 30 Tagen oder weniger.',
        price: '$4,999',
        features: [
          'Marktreifes MVP in 30 Tagen',
          'Professionelles Design, das konvertiert',
          'Die Kernfunktionen, die Ihre Nutzer brauchen',
          'Skalierbar gebaut: für 100.000+ Nutzer',
          'Perfekte Erfahrung auf jedem Gerät',
          'Integriertes Wachstums-Tracking',
          '14 Tage Launch-Support',
          'Laufende Wartung und Updates',
          'Volles Eigentum an Ihrem Produkt',
        ],
      },
      {
        id: 'product',
        name: 'Komplettes Produkt',
        tagline:
          'Ein vollständiges Produkt, gelauncht und übergeben in 45 Tagen.',
        price: '$9,999',
        features: [
          'Launch-fertiges Produkt in 45 Tagen',
          'Premium-UI/UX, das die Konkurrenz übertrifft',
          'Vom ersten Tag an Umsatz erzielen',
          'KI-gestütztes Insights-Dashboard',
          'Sicherheit auf Bankniveau',
          'Blitzschnelle Performance',
          '30 Tage dedizierter Support',
          'Laufende Wartung und Updates',
          'Vollständige technische Übergabe',
        ],
      },
      {
        id: 'custom',
        name: 'Individuelle Lösung',
        tagline:
          'Nach Ihrem Briefing zugeschnitten, schriftlich bepreist, nach dem Launch gewartet.',
        price: 'Individuell',
        features: [
          'Schriftlicher Umfang aus Ihrem Briefing',
          'Festangebot innerhalb von fünf Werktagen',
          'Jeder Stack, jede Integration, jede Größe',
          'KI, Cloud, Mobile und Web kombiniert',
          'Verbindliches Launch-Datum',
          'Wöchentliche Demos und Staging-Zugang',
          'Wartung und Support nach dem Launch',
          'Volles Eigentum an Ihrem Produkt',
        ],
      },
    ],
  },
  technologies: {
    kicker: 'Bewährte Technologie',
    statement: 'Gebaut auf den Werkzeugen, die zählen.',
    statementMuted:
      'Bewährte Modelle, Frameworks und Infrastruktur. Keine Experimente auf Ihre Kosten.',
    stackLabel: 'Der Stack, nach Ebene',
    layers: [
      { label: 'Oberfläche', note: 'Was Ihre Nutzer sehen und bedienen.' },
      {
        label: 'Mobile',
        note: 'iOS und Android, nativ oder plattformübergreifend.',
      },
      { label: 'Backend & Daten', note: 'Wo die Wahrheit liegt.' },
      {
        label: 'KI-Systeme',
        note: 'Modelle, Retrieval und Agenten auf Ihren Daten.',
      },
      {
        label: 'Automatisierung',
        note: 'Abläufe, die ohne Menschen im Loop laufen.',
      },
      { label: 'Cloud & Betrieb', note: 'Wo es läuft und weiterläuft.' },
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
      'Kunden in Europa, Asien, Afrika und Nordamerika. Ein asiatisches Büro in Islamabad, ein europäisches Büro in Fellbach, und ein Arbeitstag, der beides abdeckt.',
    bullets: [
      'Fest- oder Individualpreis und fester Termin in jedem Angebot',
      'Wartung und Support nach dem Launch, bei jedem Projekt',
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
      { value: '6 Wo.', label: 'Typische Zeit bis zum ersten Release' },
    ],
  },
  howItWorks: {
    kicker: 'So läuft es',
    title: 'Vom Briefing zum Launch, mit Datum',
    description:
      'Ein Gespräch, ein schriftlicher Plan, wöchentliche Demos, dann ein Launch, den Sie in den Kalender eintragen können, und ein Team, das danach weiter wartet. Sie behalten die Kontrolle.',
    stepLabel: 'Schritt',
    cta: 'Erstgespräch buchen',
    note: 'Ein Gespräch. Fünf Werktage bis Fest- oder Individualangebot und Launch-Datum. Nach dem Launch gewartet.',
    steps: [
      {
        title: 'Sagen Sie uns, was entstehen muss',
        when: 'Tag 1',
        summary:
          'Ein 30-minütiges Gespräch über Produkt, Nutzer und Termin. Innerhalb von fünf Werktagen erhalten Sie einen schriftlichen Umfang, einen Festpreis für ein Standardpaket oder ein individuelles Angebot, und ein Launch-Datum.',
        outputs: [
          'Schriftlicher Umfang',
          'Fest- oder Individualangebot',
          'Launch-Datum',
        ],
      },
      {
        title: 'Sehen Sie zu, wie es entsteht',
        when: 'Jeden Freitag',
        summary:
          'Jeden Freitag eine klickbare Version mit kurzem schriftlichen Update. Wer früh umdenkt, zahlt nichts extra.',
        outputs: [
          'Wöchentliche Demo',
          'Staging-Zugang',
          'Schriftliches Update',
        ],
      },
      {
        title: 'Launch, und wir bleiben',
        when: 'Launch-Tag und danach',
        summary:
          'Wir gehen live, überwachen den Betrieb, beheben, was bricht, und warten das Produkt weiter. Wir übergeben nicht und verschwinden: Bleiben Sie im Wartungsplan für Updates und Support, oder führen Sie es intern mit vollständiger Dokumentation weiter. So oder so gehört es Ihnen.',
        outputs: ['Monitoring', 'Wartung & Support', 'Vollständige Übergabe'],
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
    body: 'Schicken Sie uns heute ein kurzes Briefing. Innerhalb einer Woche erhalten Sie Umfang, Fest- oder Individualangebot und Launch-Datum schriftlich, unverbindlich. Nach dem Launch bleiben wir dran und warten, was wir gebaut haben.',
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
