import type { Locale } from '@/i18n/config';

export interface Testimonial {
  quote: string;
  /** Who said it, as a role. Add the person's name once they approve it. */
  author: string;
  company: string;
  /** Slug from data/projects.ts, used to link the quote to its case study. */
  project?: string;
}

/**
 * Client quotes. Each one is attributed by role and company and links to
 * the case study it comes from. Replace `author` with the person's name
 * once they have signed off on the wording.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Every shilling on the platform has to reconcile, and it does. Feinwerks built the wallet, the rent distribution and the resale market so that nothing rounds in our favour and nothing moves without an admin seeing it. That is exactly the level of care a members club handling real money needs.',
    author: 'Founder',
    company: 'Property members club',
    project: 'brickfold',
  },
  {
    quote:
      'We were paying for five SEO tools and still working by hand. Feinwerks replaced them with one platform, moved the heavy generation into background jobs and halved our keyword tracking bill along the way. Thirty articles in ten minutes was not a slide. It was a demo.',
    author: 'Product lead',
    company: 'SEO platform',
    project: 'rankloom',
  },
  {
    quote:
      'Live bidding with a thousand students hitting the same listing is the kind of thing that breaks quietly. It never did. Bids settle in under two hundred milliseconds and the server decides the winner, not the fastest browser. The parent dashboard was the detail that won our landlords over.',
    author: 'Co-founder',
    company: 'Student housing marketplace',
    project: 'bidnest',
  },
  {
    quote:
      'Support tickets dropped by seventy percent the month payouts and shipping went automatic. Sellers see their orders, their money and their DHL tracking in one place, and the personalised feed kept shoppers on the site far longer than the generic one ever did.',
    author: 'Head of operations',
    company: 'Ecommerce marketplace',
    project: 'curio-market',
  },
  {
    quote:
      'Our HR ran on email, chat and paper. Now every request is a row with a status, every approval feeds exactly one payroll run, and payslips lock when the period closes. The team stopped chasing people for updates because the system sends them itself.',
    author: 'Managing director',
    company: 'Bitsmiths Studio',
    project: 'bitsmiths-hrm',
  },
  {
    quote:
      'The review agent returns findings at clause level with the standard it came from and a plain explanation. Reviewers trust it because they can check it. Audit turnaround went from roughly a week to half that without adding a single person to the team.',
    author: 'Head of quality',
    company: 'Audit firm',
    project: 'qa-compliance-agent',
  },
];

/** German copy, in the same order as `testimonials`. */
const testimonialsDe: Testimonial[] = [
  {
    quote:
      'Jeder Schilling auf der Plattform muss stimmen, und er stimmt. Feinwerks hat die Wallet, die Mietausschüttung und den Zweitmarkt so gebaut, dass nichts zu unseren Gunsten gerundet wird und sich nichts bewegt, ohne dass die Administration es sieht. Genau diese Sorgfalt braucht ein Mitgliederclub, der mit echtem Geld arbeitet.',
    author: 'Gründer',
    company: 'Immobilien-Mitgliederclub',
    project: 'brickfold',
  },
  {
    quote:
      'Wir haben für fünf SEO-Werkzeuge bezahlt und trotzdem von Hand gearbeitet. Feinwerks hat sie durch eine Plattform ersetzt, die aufwendige Generierung in Hintergrundjobs verlagert und nebenbei unsere Kosten für Keyword-Tracking halbiert. Dreißig Artikel in zehn Minuten war keine Folie. Das war eine Demo.',
    author: 'Produktleitung',
    company: 'SEO-Plattform',
    project: 'rankloom',
  },
  {
    quote:
      'Live-Gebote mit tausend Studierenden auf demselben Angebot sind genau die Art Sache, die still und leise bricht. Sie hat es nie getan. Gebote stehen in unter zweihundert Millisekunden fest, und der Server entscheidet, wer gewinnt, nicht der schnellste Browser. Das Eltern-Dashboard war das Detail, das unsere Vermietenden überzeugt hat.',
    author: 'Mitgründerin',
    company: 'Marktplatz für Studierendenwohnungen',
    project: 'bidnest',
  },
  {
    quote:
      'Die Support-Tickets sind um siebzig Prozent gefallen, in dem Monat, in dem Auszahlungen und Versand automatisch liefen. Anbieter sehen ihre Bestellungen, ihr Geld und ihre DHL-Sendungsverfolgung an einem Ort, und der personalisierte Feed hat Kundinnen und Kunden deutlich länger auf der Seite gehalten als der allgemeine je zuvor.',
    author: 'Leitung Betrieb',
    company: 'E-Commerce-Marktplatz',
    project: 'curio-market',
  },
  {
    quote:
      'Unsere Personalarbeit lief über E-Mail, Chat und Papier. Jetzt ist jeder Antrag ein Datensatz mit Status, jede Freigabe fließt in genau einen Abrechnungslauf, und Lohnabrechnungen werden gesperrt, sobald die Periode schließt. Das Team hakt niemandem mehr hinterher, weil das System die Updates selbst verschickt.',
    author: 'Geschäftsführung',
    company: 'Bitsmiths Studio',
    project: 'bitsmiths-hrm',
  },
  {
    quote:
      'Der Prüf-Agent liefert Feststellungen auf Klauselebene, mit der Norm, aus der sie stammen, und einer verständlichen Begründung. Die Prüfenden vertrauen ihm, weil sie ihn nachprüfen können. Die Durchlaufzeit der Prüfung ist von rund einer Woche auf die Hälfte gefallen, ohne eine einzige zusätzliche Person im Team.',
    author: 'Leitung Qualität',
    company: 'Wirtschaftsprüfung',
    project: 'qa-compliance-agent',
  },
];

export function getTestimonials(locale: Locale): Testimonial[] {
  return locale === 'de' ? testimonialsDe : testimonials;
}
