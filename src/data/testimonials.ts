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
      'Every shilling reconciles and nothing moves without an admin seeing it. Exactly the care a club handling real money needs.',
    author: 'Founder',
    company: 'Property members club',
    project: 'brickfold',
  },
  {
    quote:
      'One platform replaced five SEO tools and halved our tracking bill. Thirty articles in ten minutes was a demo, not a slide.',
    author: 'Product lead',
    company: 'SEO platform',
    project: 'rankloom',
  },
  {
    quote:
      'A thousand students bidding on one listing and it never broke. Bids settle in under two hundred milliseconds.',
    author: 'Co-founder',
    company: 'Student housing marketplace',
    project: 'bidnest',
  },
  {
    quote:
      'Support tickets dropped seventy percent the month payouts and shipping went automatic.',
    author: 'Head of operations',
    company: 'Ecommerce marketplace',
    project: 'curio-market',
  },
  {
    quote:
      'HR ran on email and paper. Now every approval feeds one payroll run and nobody chases updates.',
    author: 'Managing director',
    company: 'Bitsmiths Studio',
    project: 'bitsmiths-hrm',
  },
  {
    quote:
      'Findings at clause level, with the standard they came from. Audit turnaround went from a week to half that.',
    author: 'Head of quality',
    company: 'Audit firm',
    project: 'qa-compliance-agent',
  },
];

/** German copy, in the same order as `testimonials`. */
const testimonialsDe: Testimonial[] = [
  {
    quote:
      'Jeder Schilling stimmt, und nichts bewegt sich ohne Blick der Administration. Genau die Sorgfalt, die echtes Geld braucht.',
    author: 'Gründer',
    company: 'Immobilien-Mitgliederclub',
    project: 'brickfold',
  },
  {
    quote:
      'Eine Plattform statt fünf SEO-Tools, Tracking-Kosten halbiert. Dreißig Artikel in zehn Minuten war eine Demo, keine Folie.',
    author: 'Produktleitung',
    company: 'SEO-Plattform',
    project: 'rankloom',
  },
  {
    quote:
      'Tausend Studierende bieten auf ein Angebot, und nichts bricht. Gebote stehen in unter zweihundert Millisekunden fest.',
    author: 'Mitgründerin',
    company: 'Marktplatz für Studierendenwohnungen',
    project: 'bidnest',
  },
  {
    quote:
      'Siebzig Prozent weniger Support-Tickets in dem Monat, in dem Auszahlungen und Versand automatisch liefen.',
    author: 'Leitung Betrieb',
    company: 'E-Commerce-Marktplatz',
    project: 'curio-market',
  },
  {
    quote:
      'Personalarbeit lief über E-Mail und Papier. Jetzt fließt jede Freigabe in einen Abrechnungslauf, und niemand hakt mehr nach.',
    author: 'Geschäftsführung',
    company: 'Bitsmiths Studio',
    project: 'bitsmiths-hrm',
  },
  {
    quote:
      'Feststellungen auf Klauselebene, mit der Norm dahinter. Die Prüfdauer ist von einer Woche auf die Hälfte gefallen.',
    author: 'Leitung Qualität',
    company: 'Wirtschaftsprüfung',
    project: 'qa-compliance-agent',
  },
];

export function getTestimonials(locale: Locale): Testimonial[] {
  return locale === 'de' ? testimonialsDe : testimonials;
}
