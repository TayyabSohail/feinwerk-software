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
    title: 'Produkte, die mit Ihrem\nWachstum skalieren.',
    accent: [2, 3],
    body: 'Feinwerks Software konzipiert und entwickelt Webplattformen, KI-Systeme und Cloud-Infrastruktur für Unternehmen in Europa und Asien. Jedes Projekt beginnt mit definiertem Umfang, Fest- oder Individualpreis und verbindlichem Liefertermin, und wir warten, was wir bauen, auch nach dem Launch.',
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
    teaser: {
      kicker: 'Projekte',
      title: 'Jedes Projekt, mit seinem Ergebnis',
      accent: [3, 4],
      body: 'Marktplätze, SaaS-Plattformen, KI-Agenten und Websites, jeweils mit dem Problem, dem Ansatz und dem gemessenen Ergebnis. Sie haben eine eigene Seite, damit die Zahlen den Platz bekommen, den sie brauchen.',
      cta: 'Alle Projekte ansehen',
      listLabel: 'Einige davon',
      more: '{n} weitere auf der Projektseite',
    },
  },
  services: {
    kicker: 'Leistungen',
    title: 'Das ganze Produkt, ein erfahrenes Team',
    explore: 'Leistung ansehen',
    groups: {
      capability: {
        label: 'Was wir bauen',
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
    title: 'Wählen Sie die Zusammenarbeit, die zu Ihrem Unternehmen passt',
    badge: 'Top-Empfehlung',
    period: 'einmalig',
    customPeriod: 'Festangebot',
    customCta: 'Individuelles Angebot anfordern',
    cta: 'Jetzt starten',
    all: 'Pakete im Detail vergleichen',
    promoTitle: 'Bauen Sie das Richtige als Nächstes.',
    note: 'Sie wissen noch nicht, wo Sie starten sollen? Vergleichen Sie sechs Wege der Zusammenarbeit mit Feinwerks, vom klar definierten Projekt bis zum laufenden Produktteam. Jede Zusammenarbeit beginnt mit einem schriftlichen Umfang, einem transparenten Preis und Support nach dem Launch.',
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
        id: 'custom',
        featured: false,
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
      {
        id: 'consulting',
        featured: false,
        name: 'Beratung & Strategie',
        tagline: 'Fundierte Beratung, die Ihr Wachstum beschleunigt.',
        price: '2.999 €',
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
        featured: true,
        name: 'MVP-Entwicklung',
        tagline: 'Marktreifes MVP in 30 Tagen oder weniger.',
        price: '4.999 €',
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
        featured: false,
        name: 'Komplettes Produkt',
        tagline:
          'Ein vollständiges Produkt, gelauncht und übergeben in 45 Tagen.',
        price: '9.999 €',
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
        id: 'dedicated',
        featured: false,
        name: 'Dediziertes Produktteam',
        tagline: 'Erfahrene Entwickler, die Ihr Team monatlich ergänzen.',
        price: '6.500 €',
        period: 'pro Monat',
        features: [
          'Dedizierte Senior-Produktentwickler',
          'Priorisierte Planung und Umsetzung',
          'Wöchentliche Produkt- und Technik-Reviews',
          'Flexibler Umfang bei wechselnden Prioritäten',
          'Direkter Zugang zum Umsetzungsteam',
          'Dokumentation und Wissenstransfer',
        ],
      },
      {
        id: 'growth',
        featured: false,
        name: 'Wachstum & Wartung',
        tagline: 'Halten Sie Ihr Produkt schnell, sicher und in Bewegung.',
        price: '1.500 €',
        period: 'pro Monat',
        features: [
          'Monitoring und Reaktion auf Vorfälle',
          'Sicherheits- und Dependency-Updates',
          'Monatliche Verbesserungs-Releases',
          'Performance- und Conversion-Reviews',
          'Kleine Produktverbesserungen inklusive',
          'Klare Monats-Roadmap und Berichte',
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
    kicker: 'Zusammenarbeit',
    title: 'So läuft ein Projekt ab',
    description:
      'Sie kennen Kosten und Termin, bevor es Code gibt. Sie sehen lauffähige Software während des Projekts, nicht erst am Ende. Und Sie behalten ein Team, das auch nach dem Livegang noch ans Telefon geht.',
    stepLabel: 'Schritt',
    cta: 'Mit einem Gespräch starten',
    note: 'Ein kurzes Gespräch zum Start. Schriftliches Angebot und Launch-Termin innerhalb einer Woche. Ein Team, das nach dem Livegang erreichbar bleibt.',
    steps: [
      {
        title: 'Kosten kennen, bevor Code entsteht',
        when: 'Vor der Umsetzung',
        summary:
          'Wir beginnen mit einem kurzen Gespräch darüber, was das Produkt leistet, wer darauf angewiesen ist und wann es live sein muss. Innerhalb einer Woche erhalten Sie einen schriftlichen Leistungsumfang, einen Preis als Standardpaket oder individuelles Angebot und einen Launch-Termin, an dem wir uns messen lassen.',
        outputs: [
          'Schriftlicher Leistungsumfang',
          'Paketpreis oder individuelles Angebot',
          'Launch-Termin, zu dem wir stehen',
        ],
      },
      {
        title: 'Nutzen, während es entsteht',
        when: 'Während der Umsetzung',
        summary:
          'Fortschritt zeigen wir in Software, nicht in Folien. Am Ende jedes Sprints erhalten Sie einen Staging-Link mit dem neuesten Stand und eine kurze Zusammenfassung: was fertig ist und was als Nächstes ansteht. Ein früher Richtungswechsel kostet nichts.',
        outputs: [
          'Sprint-Durchgang',
          'Dauerhafter Staging-Link',
          'Schriftlicher Fortschrittsbericht',
        ],
      },
      {
        title: 'Das Eigentum bleibt bei Ihnen',
        when: 'Nach dem Livegang',
        summary:
          'Wir veröffentlichen, behalten den Produktivbetrieb im Blick und reparieren, was bricht. Danach entscheiden Sie: Wartung über uns im Retainer, oder eigener Betrieb mit vollständig übergebenem Quellcode, allen Zugängen und der Dokumentation.',
        outputs: [
          'Live-Monitoring',
          'Laufende Fehlerbehebung',
          'Vollständige Übergabe von Code und Zugängen',
        ],
      },
    ],
  },
  testimonials: {
    kicker: 'Kundenstimmen',
    title: 'So ist die Zusammenarbeit mit uns',
    accent: [3],
    caseStudy: 'Projekt ansehen',
    prev: 'Vorherige Stimme',
    next: 'Nächste Stimme',
  },
  servicesPage: {
    kicker: 'Leistungen',
    title: 'Entwicklung, auf ein Ergebnis zugeschnitten.',
    accent: [3, 4],
    description:
      'Vier Kompetenzen und zwei Formen der Zusammenarbeit, die den gesamten Lebenszyklus eines Softwareprodukts abdecken, vom ersten Prototyp bis zum Team, das es betreibt. Jede ist auf ein Ergebnis kalkuliert, nicht auf Stunden, passt in ein Standardpaket oder einen individuellen Umfang und wird von uns nach dem Launch gewartet.',
    deliverables: 'Was Sie bekommen',
    useCases: 'Typische Projekte',
    stack: 'Werkzeuge, die wir nutzen',
    proof: 'Referenzen',
    faqTitle: 'Fragen zu dieser Leistung',
  },
  pricingPage: {
    kicker: 'Preise',
    title: 'Ein Preis, schriftlich, bevor die Arbeit beginnt.',
    accent: [5, 6],
    description:
      'Sechs unterschiedliche Formen der Zusammenarbeit: von laufender Wartung und Strategie bis zum dedizierten Produktteam und zur vollständigen Produktentwicklung. Jede Option enthält einen schriftlichen Leistungsumfang, ein verbindliches Launch-Datum und Support nach dem Launch.',
    faqKicker: 'Fragen zu den Preisen',
    faqTitle: 'Was vor der Unterschrift gefragt wird',
    faqAccent: [3],
  },
  servicePage: {
    back: 'Alle Leistungen',
    kindEngagement: 'Zusammenarbeitsmodell',
    kindCapability: 'Kompetenz',
    discuss: 'Über diese Leistung sprechen',
    engagement: 'Zusammenarbeit',
    coreStack: 'Kern-Stack',
    included: 'Was enthalten ist',
    useCases: 'Typische Anwendungsfälle',
    proof: 'Referenzen',
    proofTitle: 'Wo wir das schon gemacht haben.',
    allCaseStudies: 'Alle Projekte',
    faqKicker: 'Fragen',
    faqTitle: 'Zu dieser Leistung.',
    faqAccent: [1, 2],
    others: 'Weitere Leistungen',
    notFound: 'Leistung nicht gefunden',
  },
  contactForm: {
    name: 'Vollständiger Name',
    namePlaceholder: 'Erika Mustermann',
    email: 'Geschäftliche E-Mail',
    emailPlaceholder: 'erika@unternehmen.de',
    company: 'Unternehmen',
    optional: 'optional',
    companyPlaceholder: 'Unternehmens- oder Produktname',
    service: 'Was brauchen Sie?',
    servicePlaceholder: 'Leistung auswählen',
    serviceOther: 'Etwas anderes',
    budget: 'Budgetrahmen',
    budgetPlaceholder: 'Rahmen auswählen',
    budgetHeading: 'Ungefähres Budget',
    budgetHint:
      'Ein Rahmen genügt. Er zeigt uns, welches Team passt - es ist kein Angebot.',
    message: 'Über das Projekt',
    messagePlaceholder:
      'Was bauen Sie, für wen ist es, und bis wann muss es stehen?',
    consentBefore:
      'Ich bin damit einverstanden, dass Feinwerks Software diese Anfrage speichert und verarbeitet, um mir zu antworten, wie in der',
    consentLink: 'Datenschutzerklärung',
    consentAfter: ' beschrieben.',
    submit: 'Anfrage senden',
    replyNote: 'Wir antworten {time}. Keine Newsletter, keine Kampagnen.',
    errorGeneric:
      'Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.',
    sentTitle: 'Nachricht erhalten.',
    sentToast: 'Ihre Anfrage wurde gesendet. Wir antworten {time}.',
    sentBody:
      'Vielen Dank. Wir lesen jede Anfrage persönlich und antworten {time}, direkt an die von Ihnen angegebene Adresse.',
    sentAgain: 'Weitere senden',
    // Mehrstufiges Formular
    stepLabel: 'Schritt {current} von {total}',
    next: 'Weiter',
    back: 'Zurück',
    steps: {
      service: {
        title: 'Was dürfen wir für Sie bauen?',
        subtitle:
          'Wählen Sie das Passendste. Die Details klären wir gemeinsam.',
        kicker: 'Die Aufgabe',
      },
      message: {
        title: 'Erzählen Sie uns vom Projekt.',
        subtitle: 'Was bauen Sie, für wen ist es, und bis wann muss es stehen?',
        kicker: 'Das Briefing',
      },
      details: {
        title: 'Wohin dürfen wir antworten?',
        subtitle:
          'Letzter Schritt. Wir nutzen das nur für die Antwort auf Ihre Anfrage.',
        kicker: 'Ihre Daten',
      },
    },
    reviewTitle: 'Ihre Anfrage',
    notProvided: 'Nicht angegeben',
    charactersLeft: 'Noch {count} Zeichen',
    minChars: 'Mindestens 20 Zeichen',
    budgets: {
      'under-10k': 'Unter 10.000 €',
      '10k-25k': '10.000 € - 25.000 €',
      '25k-50k': '25.000 € - 50.000 €',
      '50k-100k': '50.000 € - 100.000 €',
      'over-100k': 'Über 100.000 €',
      retainer: 'Monatliche Pauschale',
      unsure: 'Noch unklar',
    },
  },
  workPage: {
    back: 'Alle Projekte',
    anonymised: 'Kundenprojekt, Name auf Wunsch geändert',
    private: 'Nicht öffentlich betrieben, Kundenprojekt',
    category: 'Kategorie',
    year: 'Jahr',
    capabilities: 'Kompetenzen',
    industry: 'Branche',
    problem: 'Das Problem',
    approach: 'Unser Vorgehen',
    architecture: 'Wie es gebaut ist',
    keyFeatures: 'Kernfunktionen',
    challengesKicker: 'Herausforderungen & Lösungen',
    challenge: 'Herausforderung',
    solution: 'Lösung',
    resultsKicker: 'Ergebnisse',
    resultsTitle: 'Was der Launch verändert hat.',
    gallery: 'Im Produkt',
    onThePhone: 'Auf dem Telefon',
    galleryTitle: 'Mehr als ein Screen.',
    galleryAnonymised:
      'Produktname und Daten wurden auf Wunsch des Kunden geändert; diese Screens bilden {title} so nach, wie es gebaut wurde.',
    galleryMore: '{n} weitere Screens aus {title}, in Gerätegröße aufgenommen.',
    homeScreen: 'Start',
    stack: 'Stack',
    servicesInvolved: 'Beteiligte Leistungen',
    more: 'Weitere Projekte',
    previous: 'zurück',
    next: 'weiter',
    notFound: 'Projekt nicht gefunden',
    ctaTitle: 'Bauen Sie etwas Ähnliches?',
    ctaAccent: [1, 2],
    ctaBody:
      'Meist lässt sich in einem Gespräch sagen, ob sich das obige Vorgehen auf Ihr Problem übertragen lässt und was sich dafür ändern müsste.',
  },
  aboutPage: {
    kicker: 'Über Feinwerks',
    title: 'Ein Softwarestudio, benannt nach einem Anspruch.',
    accent: [6, 7],
    description:
      'Feinwerks steht für die Tradition der Feinwerktechnik aus der Region Stuttgart, in der unser europäisches Büro sitzt. An Software legen wir denselben Maßstab an: Sie muss exakt stimmen, und zwar an dem Tag, der zugesagt wurde.',
    story: [
      'Wir haben Feinwerks gegründet, nachdem wir jahrelang Produkte für Unternehmen gebaut hatten, die schlechte Erfahrungen gemacht hatten: Agenturen, die den Termin rissen, Teams, die fast das Gewünschte lieferten, Schätzungen, die sich auf halbem Weg verdoppelten.',
      'Also haben wir das Studio um die vier Dinge herum aufgebaut, die Kundinnen und Kunden anderswo nicht bekamen. Termin und Preis, vereinbart bevor die Arbeit beginnt, für ein Standardpaket oder einen individuellen Umfang. Ein erfahrenes Team, das das ganze Produkt verantwortet, von der Oberfläche bis zur Cloud-Rechnung. Ein Ergebnis, das Sie nach dem Launch messen können, berichtet von Ihnen, nicht von uns. Und ein Team, das bleibt: Wir warten, was wir bauen, und übernehmen dafür im Produktivbetrieb die Verantwortung.',
      'Unser asiatisches Büro ist in Islamabad. Kundinnen und Kunden in Europa haben einen Ansprechpartner vor Ort in Fellbach. Zwischen beiden Büros arbeitet immer jemand während Ihres Arbeitstages.',
    ],
    facts: [
      {
        label: 'Was wir bauen',
        value:
          'Webplattformen, KI-Produkte, Cloud-Automatisierung, Marketing-Websites',
      },
      {
        label: 'Für wen',
        value:
          'Gründerinnen, Gründer und Produktteams in Europa, Asien und Nordamerika',
      },
      {
        label: 'Wie',
        value:
          'Fester Umfang, Fest- oder Individualpreis, wöchentliche Demos, Wartung nach dem Launch',
      },
      {
        label: 'Wo',
        value: 'Islamabad und Fellbach, mit überlappenden Arbeitszeiten',
      },
    ],
    principlesKicker: 'Grundsätze',
    principlesTitle: 'Vier Regeln, an denen sich jedes Projekt messen lässt.',
    principlesAccent: [0, 1],
    whereKicker: 'Wo wir sind',
    whereTitle: 'Zwei Büros, ein Arbeitstag.',
    whereAccent: [3, 4],
    whereDescription:
      'Ein asiatisches Büro in Islamabad und ein europäisches in Fellbach. Rufen Sie an, wo es näher ist; es antwortet dasselbe Team.',
    careersKicker: 'Karriere',
    careersTitle: 'Derzeit keine offenen Stellen.',
    careersBody:
      'Wir stellen momentan nicht ein. Sobald sich das ändert, werden Stellen auf der Karriereseite ausgeschrieben.',
    careersLink: 'Karriere',
    ctaTitle: 'Möchten Sie sehen, wie wir Ihr Projekt führen würden?',
    ctaAccent: [7, 8],
    ctaBody:
      'Senden Sie uns ein kurzes Briefing. Sie erhalten innerhalb einer Woche einen schriftlichen Leistungsumfang, einen Fest- oder Individualpreis und einen Launch-Termin, unverbindlich, und ein Team, das das Produkt nach dem Launch weiter wartet.',
  },
  careersPage: {
    kicker: 'Karriere',
    title: 'Derzeit keine offenen Stellen.',
    accent: [1, 2],
    description:
      'Feinwerks Software ist ein kleines Studio, das langsam einstellt. Wir rekrutieren momentan nicht, und es gibt keine Stellen, auf die Sie sich bewerben könnten. Sobald sich das ändert, werden die Stellen auf dieser Seite ausgeschrieben.',
    badge: '0 offene Stellen',
    statusKicker: 'Aktueller Stand',
    statusTitle: 'Wir nehmen keine Bewerbungen an.',
    statusBody:
      'Es gibt keine offenen Stellen für Entwicklung, Design oder andere Rollen, weder in Islamabad noch in Fellbach noch remote.',
    notifyBefore:
      'Möchten Sie erfahren, wenn sich das ändert? Schreiben Sie uns über',
    notifyAfter:
      'mit dem Hinweis „Künftige Stellen“ und wir melden uns, sobald eine Position frei wird.',
    ctaTitle: 'Lieber uns beauftragen als bei uns anfangen?',
    ctaAccent: [1, 2],
    ctaBody:
      'Unser dediziertes Team bringt erfahrene Entwicklerinnen und Entwickler in Ihre Roadmap, Ihre Werkzeuge und Ihren Zeitplan.',
  },
  legal: {
    kicker: 'Rechtliches',
    title: 'Die Formalitäten, verständlich formuliert.',
    accent: [3, 4],
    description:
      'Alles, was den Betrieb dieser Website und die Zusammenarbeit mit Kundinnen und Kunden regelt, geschrieben zum Lesen und nicht zum Überfliegen. Fragen gehen direkt an einen Menschen, nicht an ein Formular.',
    reviewed: 'Alle Dokumente zuletzt geprüft am {date}',
    updatedLabel: 'Zuletzt aktualisiert',
    read: 'Lesen',
    contents: 'Inhalt',
    onThisPage: 'Auf dieser Seite',
    otherPolicies: 'Weitere Dokumente:',
    backToLegal: 'Alle Rechtsdokumente',
    policies: {
      privacy: {
        title: 'Datenschutzerklärung',
        summary:
          'Welche personenbezogenen Daten diese Website erhebt, warum, wer sie verarbeitet und welche Rechte Ihnen nach der DSGVO zustehen.',
        audience: 'Besuchende, Anfragende und Kundschaft',
      },
      terms: {
        title: 'Allgemeine Geschäftsbedingungen',
        summary:
          'Die allgemeinen Bedingungen für die Nutzung dieser Website und die Beauftragung von Feinwerks Software, zu Leistungsumfang, Zahlung, geistigem Eigentum und Haftung.',
        audience: 'Geschäftskunden',
      },
      cookies: {
        title: 'Cookie-Richtlinie',
        summary:
          'Die zwei Präferenzeinträge, die die Website speichert, und das eine Analyse-Cookie, das nur bei Ihrer Zustimmung geladen wird.',
        audience: 'Besuchende',
      },
      imprint: {
        title: 'Impressum',
        summary:
          'Impressum mit den Unternehmensangaben, Kontaktdaten und verantwortlichen Personen, wie nach deutschem Recht vorgeschrieben.',
        audience: 'Alle',
      },
    },
    intros: {
      privacy:
        'Was wir erheben, warum, und worum Sie uns bitten können. Geschrieben für Menschen, nicht für Juristen.',
      terms:
        'Die Bedingungen für diese Website und unsere Kundenprojekte, in einer Sprache, die man tatsächlich lesen kann.',
      cookies:
        'Zwei kleine Speichereinträge für Ihre Präferenzen und ein Analyse-Cookie, nur wenn Sie zustimmen.',
      imprint:
        'Wer diese Website betreibt, wo wir eingetragen sind und wie Sie eine verantwortliche Person erreichen.',
    },
    commitmentsKicker: 'Wie wir Verträge schließen',
    commitmentsTitle: 'Vier Zusagen in jedem Projekt.',
    commitments: [
      {
        title: 'Ihnen gehört, was wir bauen',
        body: 'Individueller Code, Designs und Dokumentation gehen mit der Zahlung auf Sie über. Wir arbeiten in Repositories und Konten, die auf Ihr Unternehmen laufen.',
      },
      {
        title: 'DSGVO als Standard',
        body: 'Für jedes Projekt mit personenbezogenen Daten stellen wir einen Auftragsverarbeitungsvertrag bereit, und unsere eigene Website erhebt nur das Nötigste, um Ihnen zu antworten.',
      },
      {
        title: 'NDA vor der Analysephase',
        body: 'Auf Wunsch unterzeichnen wir vor jedem Gespräch über den Leistungsumfang eine beidseitige Vertraulichkeitsvereinbarung und behandeln ohnehin jedes Briefing vertraulich.',
      },
      {
        title: 'Zwei Vertragspartner',
        body: 'Kundinnen und Kunden können mit unserem deutschen Büro nach deutschem Recht oder mit unserem asiatischen Büro nach pakistanischem Recht kontrahieren. Der Leistungsschein benennt, welcher gilt.',
      },
    ],
    requestsKicker: 'Rechts- und Datenanfragen',
    requestsBody:
      'Um ein Datenrecht auszuüben, einen Auftragsverarbeitungsvertrag oder ein NDA anzufordern, ein Sicherheitsproblem zu melden oder etwas zu diesen Dokumenten zu fragen, schreiben Sie uns. Ein Mensch antwortet innerhalb von fünf Werktagen; Datenanfragen werden innerhalb eines Monats beantwortet, wie es die DSGVO verlangt.',
  },
  notFound: {
    kicker: 'Fehler 404',
    title: 'Diese Seite wurde nie gebaut.',
    accent: [4],
    body: 'Die Adresse hat sich vielleicht geändert, oder der Link war falsch. Alles, was wir gebaut haben, ist einen Klick entfernt.',
    home: 'Zurück zur Startseite',
    work: 'Arbeiten ansehen',
  },
  cookies: {
    label: 'Cookie-Einwilligung',
    kicker: 'Cookies',
    bodyBefore:
      'Wir nutzen ein datenschutzfreundliches Analyse-Cookie, um zu verstehen, welche Seiten nützlich sind. Keine Werbung, kein seitenübergreifendes Tracking. Lesen Sie die',
    link: 'Cookie-Richtlinie',
    bodyAfter: '.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  contact: {
    kicker: 'Kontakt',
    title: 'Sagen Sie uns, was stimmen muss.',
    accent: [5, 6],
    description:
      'Ein paar Sätze genügen. Wir antworten innerhalb eines Werktags mit einer ersten Einschätzung zu Umfang, Zeitplan und Preis, Standardpaket oder individuell, und dazu, wer das Produkt bauen und warten würde.',
    direct: 'So erreichen Sie uns',
    formNote:
      'Das Formular ist der schnellste Weg zu uns. Es kommt direkt bei uns an und wir beantworten jede Anfrage persönlich.',
    book: 'Ein 30-minütiges Kennenlerngespräch buchen',
    callNote:
      'Lieber telefonieren? Erwähnen Sie es und wir senden Ihnen einen Buchungslink.',
    choose: {
      formTab: 'Schreiben Sie uns',
      callTab: 'Gespräch buchen',
      callHint: '30-minütiges Erstgespräch',
    },
    faqKicker: 'Bevor Sie schreiben',
    faqTitle: 'Die Fragen, die wir am häufigsten hören.',
    faqAccent: [4],
    home: {
      kicker: 'Kontakt',
      title: 'Sagen Sie uns, was stimmen muss.',
      accent: [5, 6],
      description:
        'Ein paar Sätze genügen. Wir antworten innerhalb eines Werktags mit einer ersten Einschätzung zu Umfang, Zeitplan und Preis und dazu, wer das Produkt bauen und warten würde.',
    },
  },
  faq: {
    kicker: 'Unsere FAQs',
    title: 'Transparente Antworten von Gründern mit mehr als 10 gebauten und verkauften Start-ups',
    description:
      'Klare Antworten darauf, wie wir Produkte planen, bauen, launchen und weiter betreuen.',
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
};
