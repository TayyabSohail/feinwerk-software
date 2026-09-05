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
      'Three fixed-price packages cover consulting, an MVP and a full product. Everything else is a custom solution: send a brief and you have a written scope and a fixed quote within five working days. Ongoing product work, maintenance and dedicated teams run on a monthly retainer. We quote in EUR or USD and invoice from Germany or Pakistan, whichever suits your accounting.',
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
      'Drei Festpreispakete decken Beratung, ein MVP und ein vollständiges Produkt ab. Alles Weitere ist eine Individuallösung: Senden Sie uns ein kurzes Briefing und Sie erhalten innerhalb von fünf Werktagen einen schriftlichen Leistungsumfang und ein verbindliches Angebot. Laufende Produktarbeit, Wartung und dedizierte Teams rechnen wir über eine monatliche Pauschale ab. Wir kalkulieren in EUR oder USD und stellen aus Deutschland oder Pakistan in Rechnung, je nachdem, was Ihrer Buchhaltung entgegenkommt.',
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
];

export function getFaqs(locale: Locale): Faq[] {
  return locale === 'de' ? faqsDe : faqs;
}
