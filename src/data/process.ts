import type { Locale } from '@/i18n/config';

export interface ProcessStep {
  title: string;
  duration: string;
  summary: string;
  outcome: string;
}

/** How an engagement runs, in three steps a client actually experiences. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Brief',
    duration: 'Week 1',
    summary:
      'One call to understand the problem, then a written scope, a fixed price for a standard package or a custom quote, and a launch date within five working days.',
    outcome: 'You know exactly what you will get, when, and for how much.',
  },
  {
    title: 'Build',
    duration: 'Weeks 2-8',
    summary:
      'A working version you can click on every Friday, with a short written update. Change your mind early and it costs nothing.',
    outcome: 'No surprises at the end, because there is no "the end".',
  },
  {
    title: 'Launch',
    duration: 'Launch week and after',
    summary:
      'We ship, monitor it live, fix what breaks and keep maintaining it. Stay on a maintenance plan or take it in-house with full documentation. We do not hand over and disappear.',
    outcome: 'A product that is yours, running, maintained, and ready to grow.',
  },
];

export interface Guarantee {
  title: string;
  body: string;
}

/** Commitments repeated in every proposal. */
export const guarantees: Guarantee[] = [
  {
    title: 'Fixed price',
    body: 'Quoted in writing, per phase. Custom scopes too.',
  },
  { title: 'Fixed date', body: 'Agreed before work starts.' },
  {
    title: 'Maintained after launch',
    body: 'Support, fixes and updates. We stay accountable.',
  },
  { title: 'You own it all', body: 'Code, accounts and designs.' },
  { title: '1 business day', body: 'Reply time on every message.' },
];

export interface Value {
  title: string;
  body: string;
}

export const values: Value[] = [
  {
    title: 'Precision over volume',
    body: 'Feinwerks takes its name from Feinwerk, fine work. We would rather ship one system that reconciles to the last unit than three that mostly work.',
  },
  {
    title: 'Own the whole problem',
    body: 'Interface, API, data, infrastructure and the emails in between. One team responsible for the outcome, not a layer.',
  },
  {
    title: 'Boring infrastructure',
    body: 'Durable jobs, tested policies and monitoring that alerts before customers notice. Excitement belongs in the product.',
  },
  {
    title: 'Write it down',
    body: 'Decisions and handover notes are documented as we go, so your team can run what we built without us.',
  },
];

const valuesDe: Value[] = [
  {
    title: 'Präzision statt Menge',
    body: 'Feinwerks ist nach dem Feinwerk benannt, der feinen Arbeit. Uns ist ein System lieber, das bis zur letzten Einheit stimmt, als drei, die größtenteils funktionieren.',
  },
  {
    title: 'Das ganze Problem übernehmen',
    body: 'Oberfläche, API, Daten, Infrastruktur und die E-Mails dazwischen. Ein Team verantwortet das Ergebnis, nicht eine Schicht.',
  },
  {
    title: 'Unaufgeregte Infrastruktur',
    body: 'Robuste Jobs, geprüfte Richtlinien und Monitoring, das alarmiert, bevor es Kundinnen und Kunden merken. Spannung gehört ins Produkt.',
  },
  {
    title: 'Alles aufschreiben',
    body: 'Entscheidungen und Übergabenotizen entstehen laufend, damit Ihr Team ohne uns betreiben kann, was wir gebaut haben.',
  },
];

const processStepsDe: ProcessStep[] = [
  {
    title: 'Briefing',
    duration: 'Woche 1',
    summary:
      'Ein Gespräch, um das Problem zu verstehen, dann ein schriftlicher Leistungsumfang, ein Festpreis für ein Standardpaket oder ein individuelles Angebot und ein Launch-Termin innerhalb von fünf Werktagen.',
    outcome: 'Sie wissen genau, was Sie bekommen, wann und zu welchem Preis.',
  },
  {
    title: 'Umsetzung',
    duration: 'Wochen 2-8',
    summary:
      'Jeden Freitag eine lauffähige Version zum Durchklicken, mit einem kurzen schriftlichen Update. Wenn Sie früh umdenken, kostet es nichts.',
    outcome: 'Keine Überraschungen am Ende, weil es kein „Ende“ gibt.',
  },
  {
    title: 'Launch',
    duration: 'Launch-Woche und danach',
    summary:
      'Wir liefern aus, überwachen den Livebetrieb, beheben, was bricht, und warten weiter. Bleiben Sie im Wartungsvertrag oder übernehmen Sie selbst, mit vollständiger Dokumentation. Wir übergeben nicht und verschwinden.',
    outcome:
      'Ein Produkt, das Ihnen gehört, läuft, gewartet wird und wachsen kann.',
  },
];

const guaranteesDe: Guarantee[] = [
  {
    title: 'Festpreis',
    body: 'Schriftlich je Phase kalkuliert. Auch für individuelle Umfänge.',
  },
  { title: 'Fester Termin', body: 'Vereinbart, bevor die Arbeit beginnt.' },
  {
    title: 'Wartung nach dem Launch',
    body: 'Support, Fehlerbehebung und Updates. Wir bleiben verantwortlich.',
  },
  { title: 'Alles gehört Ihnen', body: 'Code, Zugänge und Designs.' },
  { title: '1 Werktag', body: 'Antwortzeit auf jede Nachricht.' },
];

export function getValues(locale: Locale): Value[] {
  return locale === 'de' ? valuesDe : values;
}

export function getProcessSteps(locale: Locale): ProcessStep[] {
  return locale === 'de' ? processStepsDe : processSteps;
}

export function getGuarantees(locale: Locale): Guarantee[] {
  return locale === 'de' ? guaranteesDe : guarantees;
}
