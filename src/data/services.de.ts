import type { Service } from './services';

/**
 * German copy for each service, keyed by slug. Only prose is translated:
 * slug, kind, icon, stack and proof stay as they are in `services`.
 */
export type ServiceTranslation = Pick<
  Service,
  | 'title'
  | 'tagline'
  | 'summary'
  | 'deliverables'
  | 'useCases'
  | 'engagement'
  | 'faqs'
> &
  Partial<Pick<Service, 'cta'>>;

export const servicesDe: Record<string, ServiceTranslation> = {
  'product-engineering': {
    title: 'Full-Stack-Produktentwicklung',
    tagline: 'Webplattformen, Marktplätze und SaaS, durchgängig entwickelt.',
    summary:
      'Wir konzipieren, entwickeln und liefern vollständige Produkte: die Oberfläche, die Ihre Nutzerinnen und Nutzer sehen, die API und das Datenmodell darunter und die Werkzeuge, die Ihr Team für den Betrieb braucht. Ein Team verantwortet das Ganze, damit nichts zwischen die Stühle fällt, und dasselbe Team wartet es nach dem Launch.',
    deliverables: [
      'Produktarchitektur und Datenmodellierung',
      'Next.js- und React-Anwendungen mit typisierten APIs',
      'Rollenbasierte Dashboards und Admin-Werkzeuge',
      'Zahlungen, Abonnements und Auszahlungen (Stripe)',
      'Echtzeitfunktionen über WebSockets',
      'Automatisierte E-Mails, Benachrichtigungen und Dokumente',
    ],
    useCases: [
      'Zweiseitige Marktplätze mit Geboten, Checkout oder Auszahlungen',
      'B2B-SaaS mit mandantenfähigen Daten und Abrechnung',
      'Interne Plattformen, die Tabellen und E-Mails ablösen',
      'Fintech-nahe Produkte, bei denen jede Zahl stimmen muss',
    ],
    engagement: {
      timeline: '6-16 Wochen bis zum ersten Release',
      team: 'Lead Engineer + 1-3 Engineers, Design nach Bedarf',
      pricing:
        'Fest- oder Individualangebot je Phase, oder monatliche Pauschale',
      support: 'Wartungsvertrag: Monitoring, Fehlerbehebung und Updates',
    },
    faqs: [
      {
        question: 'Arbeiten Sie auch mit einer bestehenden Codebasis?',
        answer:
          'Ja. Wir beginnen mit einem kurzen technischen Audit, stimmen ab, was bleibt, und liefern Verbesserungen dann in demselben Repository, das Ihr Team bereits nutzt.',
      },
      {
        question: 'Wem gehört der Code?',
        answer:
          'Ihnen. Alles, was wir schreiben, liefern wir in Ihre Repositories und Cloud-Konten auf Ihren Namen, inklusive Dokumentation und Übergabeterminen.',
      },
      {
        question: 'Warten Sie das Produkt nach dem Launch?',
        answer:
          'Ja. Wir übergeben nicht und verschwinden. Ein Wartungsvertrag deckt Monitoring, Fehlerbehebung, Abhängigkeits- und Sicherheitsupdates sowie kleine Verbesserungen ab, betreut von jemandem, der den Code kennt. Wir übernehmen Verantwortung für das, was wir bauen, im Produktivbetrieb und so lange Sie möchten.',
      },
    ],
  },
  'ai-automation': {
    title: 'KI-Systeme & Automatisierung',
    tagline: 'Agenten, Retrieval und Sprache, fundiert auf Ihren eigenen Daten.',
    summary:
      'Wir bauen KI-Funktionen, die im Produktivbetrieb bestehen: Retrieval-gestützte Assistenten, die aus Ihren Inhalten antworten, Multi-Agenten-Abläufe, die echte Aufgaben erledigen, und Sprachanwendungen in Echtzeit. Jedes System ist fundiert, beobachtbar und sicher genug für den Kundenkontakt.',
    deliverables: [
      'RAG-Pipelines mit Trennung je Mandant',
      'Multi-Agenten-Abläufe (LangGraph, LangChain)',
      'Sprache und Transkription in Echtzeit (OpenAI Realtime)',
      'Dokumentenprüfung, -erstellung und E-Signatur',
      'Evaluierungsumgebungen und Leitplanken',
      'Monitoring von Kosten, Latenz und Qualität',
    ],
    useCases: [
      'Support-Agenten über viele Marken oder Shops hinweg',
      'Compliance- und QS-Prüfung von Dokumenten gegen Normen',
      'Operative Assistenten für CRM, Marketing und Reporting',
      'KI-geführte Erfassung, Bewertung und Planung',
    ],
    engagement: {
      timeline:
        '2-4 Wochen für einen fundierten Prototyp, ab 8 für den Produktivbetrieb',
      team: 'KI-Engineer + Full-Stack-Engineer',
      pricing: 'Discovery-Sprint, danach Fest- oder Individualangebot je Phase',
      support: 'Monitoring, Evaluierungsläufe und Modell-Updates',
    },
    faqs: [
      {
        question: 'Welche Modelle setzen Sie ein?',
        answer:
          'Jene, die zu Aufgabe, Budget und Anforderungen an den Datenstandort passen. Wir liefern regelmäßig auf OpenAI, Anthropic Claude und offenen Modellen über OpenRouter, hinter einer Abstraktion, sodass Modelle ohne Eingriff in den Produktcode getauscht werden können.',
      },
      {
        question: 'Wie stellen Sie die Richtigkeit der Antworten sicher?',
        answer:
          'Indem wir jede Antwort per Retrieval in Ihren eigenen Inhalten verankern, Ausgaben vor dem Release gegen einen Testdatensatz prüfen und jede Interaktion protokollieren, damit Verschlechterungen früh auffallen.',
      },
    ],
  },
  'cloud-devops': {
    title: 'Cloud, DevOps & Automatisierung',
    tagline: 'Infrastruktur, die sauber skaliert und weniger kostet.',
    summary:
      'Wir richten Cloud, Pipelines und Hintergrundsysteme ein, die ein Produkt zuverlässig halten: robuste Job-Queues, geplante Workloads, CI/CD, Observability und Kostenkontrolle. Das Ziel ist unaufgeregte Infrastruktur, über die Ihr Team nie nachdenken muss.',
    deliverables: [
      'Deployments auf AWS, Vercel und in Containern',
      'Robuste Hintergrundjobs (Trigger.dev, pg_cron)',
      'CI/CD-Pipelines und Preview-Umgebungen',
      'Caching, Batching und geringere API-Kosten',
      'Monitoring, Alarmierung und Incident-Runbooks',
      'Sicherheitshärtung und Zugriffsrichtlinien',
    ],
    useCases: [
      'Massenverarbeitung jenseits der Serverless-Grenzen',
      'Monatliche, geplante oder ereignisgesteuerte Workloads',
      'Senkung der Ausgaben für Drittanbieter-APIs im großen Maßstab',
      'Härtung eines Produkts vor einem Enterprise-Kunden',
    ],
    engagement: {
      timeline: '1-4 Wochen je Vorhaben',
      team: 'Platform Engineer, anteilig oder eingebettet',
      pricing: 'Festes Audit + Umsetzung, individueller Umfang oder Pauschale',
      support: 'Patches, On-Call-Runbooks und Kostenprüfungen',
    },
    faqs: [
      {
        question: 'Können Sie unsere Cloud-Rechnung senken?',
        answer:
          'Meistens ja. Wir beginnen mit einem zweitägigen Audit, wohin das Geld fließt, und setzen dann die wirksamsten Maßnahmen um, etwa Caching, Batching, passende Dimensionierung und die Verlagerung von Arbeit auf günstigere Ausführungsmodelle.',
      },
    ],
  },
  'web-design-development': {
    title: 'Webdesign & Entwicklung',
    tagline: 'Marketing-Websites, die schnell laden und überzeugen.',
    summary:
      'Wir gestalten und entwickeln Unternehmenswebsites, Landingpages und CMS-gestützte Marketing-Seiten auf Next.js. Static-First-Rendering, sorgfältige Typografie und klare Konversionswege, damit die Website schnell und überzeugend zugleich ist.',
    deliverables: [
      'Markengerechtes UI-Design und Designsysteme',
      'Next.js-Websites mit Static-First-Rendering',
      'Anbindung eines Headless-CMS (Directus, Sanity, Payload)',
      'SEO, Open Graph und strukturierte Daten',
      'Performance-Budgets und Core Web Vitals',
      'Analytics und cookie-konformes Tracking',
    ],
    useCases: [
      'Agentur- und Studio-Websites mit Referenzen',
      'Produkt-Websites mit Preisen und Dokumentation',
      'Neubau langsamer Websites, die nicht mehr ranken',
      'Mehrsprachige Unternehmenswebsites',
    ],
    engagement: {
      timeline: '2-6 Wochen',
      team: 'Designer + Frontend-Engineer',
      pricing: 'Festpreis je Website, individueller Umfang auf Anfrage',
      support: 'Updates, Hosting und Unterstützung bei Inhalten',
    },
    faqs: [
      {
        question: 'Kann unser Team die Inhalte später selbst pflegen?',
        answer:
          'Ja. Die Websites laufen auf einem Headless-CMS, sodass Referenzen, Artikel und Seiten aus einem Editor heraus veröffentlicht werden, ohne Entwicklung und ohne Deploy.',
      },
    ],
  },
  'mvp-sprint': {
    title: 'MVP in wenigen Wochen',
    tagline: 'Vom Briefing zum produktionsreifen ersten Release.',
    cta: 'Sprint starten',
    summary:
      'Für Gründerinnen, Gründer und Teams, die schnell ein echtes Produkt am Markt brauchen. Wir schneiden den Umfang konsequent zu, bauen die Kernschleife auf einem bewährten Stack und liefern ein produktionsreifes MVP, in dem Abrechnung, Authentifizierung und Analytics bereits stecken.',
    deliverables: [
      'Einwöchige Analyse und Festlegung des Umfangs',
      'Klickbarer Prototyp vor der ersten Zeile Code',
      'Produktives MVP mit Auth, Abrechnung und Analytics',
      'Launch-Checkliste, Monitoring und Übergabe',
      'Zwei Wochen Support nach dem Launch',
      'Anschließend ein laufender Wartungsvertrag',
    ],
    useCases: [
      'Eine Geschäftsidee mit zahlenden Kunden validieren',
      'Produkte in der Pre-Seed- und Seed-Phase',
      'Interne Ausgründungen in größeren Unternehmen',
    ],
    engagement: {
      timeline: '4-8 Wochen',
      team: 'Lead Engineer + Engineer + Designer',
      pricing: 'Fest- oder Individualangebot, nach Meilensteinen',
      support: 'Zwei Wochen inklusive, danach ein Wartungsvertrag',
    },
    faqs: [
      {
        question: 'Was passiert nach dem Launch?',
        answer:
          'Wir bleiben. Jeder Sprint enthält Support nach dem Launch, und die meisten Kunden behalten uns für Fehlerbehebung, Updates und Weiterentwicklung im Wartungsvertrag. Wir übernehmen Verantwortung für das, was wir geliefert haben. Wenn Sie lieber selbst übernehmen, übergeben wir mit Dokumentation und einer gemeinsamen Durchsprache.',
      },
    ],
  },
  'team-extension': {
    title: 'Dediziertes Entwicklungsteam',
    tagline: 'Erfahrene Engineers, eingebettet in Ihr Team.',
    cta: 'Team zusammenstellen',
    summary:
      'Ein dediziertes, erfahrenes Team, das in Ihren Werkzeugen und Abläufen arbeitet. Ideal, wenn Sie eine Roadmap haben und verlässliche Kapazität in europäischen und asiatischen Zeitzonen brauchen, ohne den Aufwand einer Einstellung.',
    deliverables: [
      'Erfahrene Full-Stack-, KI- und Platform-Engineers',
      'Arbeit in Ihren Repos, Tickets und Ritualen',
      'Wöchentliche Demos und schriftliche Fortschrittsberichte',
      'Monatlich flexibel skalierbar, nach oben wie nach unten',
      'Überschneidung mit MEZ- und PKT-Arbeitszeiten',
    ],
    useCases: [
      'Ein Produktteam ohne langwierige Einstellungen vergrößern',
      'Einen Rückstand vor Launch oder Finanzierungsrunde abbauen',
      'Langfristige Verantwortung für eine Plattform',
    ],
    engagement: {
      timeline: 'Laufend, mindestens 3 Monate',
      team: '1-5 Engineers',
      pricing: 'Monatlich je Engineer, individuelles Team auf Anfrage',
      support: 'Das Team bleibt, so lange Sie es brauchen',
    },
    faqs: [
      {
        question: 'Wie läuft die Kommunikation?',
        answer:
          'Slack oder Teams für den Alltag, ein wöchentlicher Demo-Termin und jeden Freitag eine schriftliche Zusammenfassung. Sie wissen jederzeit, was geliefert wurde und was als Nächstes kommt.',
      },
    ],
  },
};
