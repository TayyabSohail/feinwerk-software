import type { Locale } from '@/i18n/config';

export interface Faq {
  question: string;
  answer: string;
}

/** General questions, shown on the homepage and the contact page. */
export const faqs: Faq[] = [
  {
    question: 'What does an engagement with Feinwerks look like?',
    answer:
      'Most projects start with a one-week discovery that ends in a written scope, a success metric and a fixed price for the first release, whether that is one of our packages or a custom solution. From there we ship weekly to a staging environment you can click through, with a demo at the end of each sprint. After launch we stay on to maintain what we built.',
  },
  {
    question: 'How does you pricing work?',
    answer:
      'Six distinct options cover strategy, maintenance, an MVP, a full product and dedicated product work. Everything else is a custom solution: send a brief and you have a written scope and a fixed quote within five working days. We quote in EUR or USD and invoice from Germany or Pakistan, whichever suits your accounting.',
  },
  {
    question: 'Do you maintain what you build after launch?',
    answer:
      'Yes. We do not hand over and disappear. Every plan, custom solutions included, comes with post-launch support, and a maintenance plan keeps us accountable after that: monitoring, bug fixes, dependency and security updates and small improvements, handled by an engineer who knows the codebase. You can take it in-house whenever you like, because the documentation is written as we go.',
  },
  {
    question: 'Where is the team based?',
    answer:
      'Our Asian office is in Islamabad and our European office is in Fellbach, Germany. That gives clients in Europe a local contact and a working-hours overlap with the whole team.',
  },
  {
    question: 'Who owns the code and the accounts?',
    answer:
      'You do, from day one. We work inside repositories, cloud accounts and third-party services registered to your company, so there is nothing to migrate when a project ends.',
  },
  {
    question: 'Can you take over an existing product?',
    answer:
      'Yes. We begin with a short technical audit, agree on what to keep, stabilise and improve, then work in the same codebase your team already knows.',
  },
  {
    question: 'Do you sign NDAs and data processing agreements?',
    answer:
      'Yes. We routinely sign NDAs before discovery and provide a GDPR-compliant data processing agreement for projects that involve personal data.',
  },
  {
    question: "What's included in the 30-day MVP development process?",
    answer:
      'We shape the scope, design the essential user journey, build the first production-ready release, connect the required services and deploy it with the foundations for measurement. You see working software throughout, with weekly demos and a clear handover at the end.',
  },
  {
    question: 'Which technologies do you use to build MVPs?',
    answer:
      'We usually use Next.js, React, TypeScript, PostgreSQL, Supabase and cloud platforms such as Vercel or AWS. The exact stack follows the product, integrations, team and long-term operating cost rather than a fixed house preference.',
  },
  {
    question: 'What if we need updates or changes after launch?',
    answer:
      'We can continue with maintenance, small improvements or a new product phase. Every plan includes launch support, and ongoing work can run as a monthly maintenance plan, a retainer or a separately scoped fixed-price phase.',
  },
  {
    question: 'Will we fully own the code?',
    answer:
      'Yes. Your company owns the custom code, designs, documentation and accounts. We work in repositories and services registered to you from the start, so you are never locked into our infrastructure.',
  },
  {
    question: 'How do you keep our data private and secure?',
    answer:
      'We minimise the data we handle, separate customer access, use least-privilege permissions and build auditability into the product. We can sign an NDA before discovery and provide a GDPR-compliant data processing agreement where personal data is involved.',
  },
  {
    question: 'Can you connect our MVP to other tools or platforms?',
    answer:
      'Yes. We connect products to payments, CRMs, email, analytics, identity providers, marketplaces and internal systems through APIs, webhooks and background jobs. We scope the integration around reliability, permissions and how it will be monitored after launch.',
  },
  {
    question: "What's not part of the standard build?",
    answer:
      'A standard build covers the agreed core journey and the integrations needed for the first release. Extensive data migration, complex enterprise procurement, unscoped feature growth, native apps and ongoing content or operations are scoped separately when they are needed.',
  },
  {
    question: 'Can you help with projects that are already started, or just new ideas?',
    answer:
      'Both. We can turn a new idea into a first release, or audit, stabilise and continue an existing product. We start by understanding the current code, infrastructure and users before recommending what to keep, fix or rebuild.',
  },
];

/** German copy, in the same order as `faqs`. */
const faqsDe: Faq[] = [
  {
    question: 'Wie läuft ein Projekt mit Feinwerks ab?',
    answer:
      'Die meisten Projekte beginnen mit einer einwöchigen Analyse, an deren Ende ein schriftlicher Leistungsumfang, eine Erfolgskennzahl und ein Festpreis für das erste Release stehen, ob als eines unserer Pakete oder als Individuallösung. Danach liefern wir wöchentlich auf eine Staging-Umgebung, die Sie selbst durchklicken können, mit einer Demo am Ende jedes Sprints. Nach dem Launch bleiben wir an Bord und warten, was wir gebaut haben.',
  },
  {
    question: 'Wie kalkulieren Sie Ihre Preise?',
    answer:
      'Sechs unterschiedliche Optionen decken Strategie, Wartung, MVP, vollständige Produkte und dedizierte Produktarbeit ab. Alles Weitere ist eine Individuallösung: Senden Sie uns ein kurzes Briefing und Sie erhalten innerhalb von fünf Werktagen einen schriftlichen Leistungsumfang und ein verbindliches Angebot. Wir kalkulieren in EUR oder USD und stellen aus Deutschland oder Pakistan in Rechnung, je nachdem, was Ihrer Buchhaltung entgegenkommt.',
  },
  {
    question: 'Warten Sie nach dem Launch, was Sie gebaut haben?',
    answer:
      'Ja. Wir übergeben nicht und verschwinden. Jeder Tarif, Individuallösungen eingeschlossen, umfasst Support nach dem Launch, und ein Wartungsvertrag hält uns danach in der Verantwortung: Monitoring, Fehlerbehebung, Abhängigkeits- und Sicherheitsupdates sowie kleine Verbesserungen, betreut von einer Entwicklerin oder einem Entwickler, die den Code kennen. Sie können die Wartung jederzeit selbst übernehmen, denn die Dokumentation entsteht von Anfang an mit.',
  },
  {
    question: 'Wo sitzt das Team?',
    answer:
      'Unser asiatisches Büro ist in Islamabad, unser europäisches in Fellbach bei Stuttgart. So haben Kundinnen und Kunden in Europa einen Ansprechpartner vor Ort und eine Überschneidung der Arbeitszeiten mit dem gesamten Team.',
  },
  {
    question: 'Wem gehören der Code und die Zugänge?',
    answer:
      'Ihnen, vom ersten Tag an. Wir arbeiten in Repositories, Cloud-Konten und Diensten, die auf Ihr Unternehmen laufen. Am Projektende ist deshalb nichts zu migrieren.',
  },
  {
    question: 'Können Sie ein bestehendes Produkt übernehmen?',
    answer:
      'Ja. Wir beginnen mit einem kurzen technischen Audit, stimmen ab, was bleibt, stabilisiert und verbessert wird, und arbeiten dann in derselben Codebasis, die Ihr Team bereits kennt.',
  },
  {
    question: 'Unterzeichnen Sie NDAs und Auftragsverarbeitungsverträge?',
    answer:
      'Ja. Wir unterzeichnen regelmäßig NDAs vor der Analysephase und stellen für Projekte mit personenbezogenen Daten einen DSGVO-konformen Auftragsverarbeitungsvertrag bereit.',
  },
  {
    question: 'Was ist im 30-Tage-Prozess für die MVP-Entwicklung enthalten?',
    answer:
      'Wir schärfen den Leistungsumfang, gestalten den wichtigsten Nutzerfluss, bauen die erste produktionsreife Version, binden die nötigen Dienste an und bringen sie live. Sie sehen währenddessen funktionierende Software, mit wöchentlichen Demos und einer klaren Übergabe am Ende.',
  },
  {
    question: 'Welche Technologien nutzen Sie für MVPs?',
    answer:
      'Meist arbeiten wir mit Next.js, React, TypeScript, PostgreSQL, Supabase und Cloud-Plattformen wie Vercel oder AWS. Der konkrete Stack richtet sich nach Produkt, Schnittstellen, Team und langfristigen Betriebskosten, nicht nach einer festen Vorliebe.',
  },
  {
    question: 'Was ist, wenn wir nach dem Launch Änderungen brauchen?',
    answer:
      'Wir können die Wartung, kleinere Verbesserungen oder eine weitere Produktphase übernehmen. Jeder Tarif umfasst Unterstützung nach dem Launch; laufende Arbeit kann als monatlicher Wartungsvertrag, Retainer oder separat kalkulierte Festpreisphase laufen.',
  },
  {
    question: 'Gehört der Code vollständig uns?',
    answer:
      'Ja. Ihr Unternehmen besitzt den individuellen Code, die Designs, die Dokumentation und die Konten. Wir arbeiten von Anfang an in Repositories und Diensten, die auf Sie registriert sind, damit Sie nie an unsere Infrastruktur gebunden sind.',
  },
  {
    question: 'Wie schützen Sie unsere Daten und halten sie vertraulich?',
    answer:
      'Wir minimieren die Daten, die wir verarbeiten, trennen Zugriffe, arbeiten mit dem Prinzip der geringsten Berechtigung und bauen Nachvollziehbarkeit in das Produkt ein. Vor der Analysephase unterzeichnen wir auf Wunsch ein NDA und stellen bei personenbezogenen Daten einen DSGVO-konformen Auftragsverarbeitungsvertrag bereit.',
  },
  {
    question: 'Können Sie unser MVP mit anderen Tools oder Plattformen verbinden?',
    answer:
      'Ja. Wir verbinden Produkte über APIs, Webhooks und Hintergrundjobs mit Zahlungen, CRMs, E-Mail, Analytics, Identitätsdiensten, Marktplätzen und internen Systemen. Dabei planen wir Zuverlässigkeit, Berechtigungen und Monitoring von Anfang an mit ein.',
  },
  {
    question: 'Was gehört nicht zum Standardumfang?',
    answer:
      'Ein Standardumfang deckt den vereinbarten Kernprozess und die nötigen Integrationen für den ersten Release ab. Aufwendige Datenmigration, komplexe Enterprise-Beschaffung, zusätzliche unklare Funktionen, native Apps und laufende Inhalte oder Abläufe werden bei Bedarf separat kalkuliert.',
  },
  {
    question: 'Helfen Sie auch bei begonnenen Projekten oder nur bei neuen Ideen?',
    answer:
      'Bei beidem. Wir können eine neue Idee in einen ersten Release überführen oder ein bestehendes Produkt prüfen, stabilisieren und weiterentwickeln. Zuerst verstehen wir Code, Infrastruktur und Nutzer, bevor wir empfehlen, was bleiben, repariert oder neu gebaut werden sollte.',
  },
];

export function getFaqs(locale: Locale): Faq[] {
  return locale === 'de' ? faqsDe : faqs;
}
