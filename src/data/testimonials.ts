export interface Testimonial {
  quote: string;
  /** Who said it, as a role. Add the person's name once they approve it. */
  author: string;
  company: string;
  /** Slug from data/projects.ts, used to link the quote to its case study. */
  project?: string;
  /** Short result shown as a badge on the card. */
  result?: string;
}

/**
 * Client quotes. Each one is attributed by role and company and links to
 * the case study it comes from. Replace `author` with the person's name
 * once they have signed off on the wording.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Every shilling on the platform has to reconcile, and it does. Feinwerk built the wallet, the rent distribution and the resale market so that nothing rounds in our favour and nothing moves without an admin seeing it. That is exactly the level of care a members club handling real money needs.',
    author: 'Founder',
    company: 'Property members club (confidential)',
    project: 'brickfold',
    result: '42 screens, one exact ledger',
  },
  {
    quote:
      'We were paying for five SEO tools and still working by hand. Feinwerk replaced them with one platform, moved the heavy generation into background jobs and halved our keyword tracking bill along the way. Thirty articles in ten minutes was not a slide. It was a demo.',
    author: 'Product lead',
    company: 'SEO platform (confidential)',
    project: 'rankloom',
    result: '3x lower cost per article',
  },
  {
    quote:
      'Live bidding with a thousand students hitting the same listing is the kind of thing that breaks quietly. It never did. Bids settle in under two hundred milliseconds and the server decides the winner, not the fastest browser. The parent dashboard was the detail that won our landlords over.',
    author: 'Co-founder',
    company: 'Student housing marketplace (confidential)',
    project: 'bidnest',
    result: '1,000+ concurrent bidders',
  },
  {
    quote:
      'Support tickets dropped by seventy percent the month payouts and shipping went automatic. Sellers see their orders, their money and their DHL tracking in one place, and the personalised feed kept shoppers on the site far longer than the generic one ever did.',
    author: 'Head of operations',
    company: 'Ecommerce marketplace (confidential)',
    project: 'curio-market',
    result: '70% fewer support tickets',
  },
  {
    quote:
      'Our HR ran on email, chat and paper. Now every request is a row with a status, every approval feeds exactly one payroll run, and payslips lock when the period closes. The team stopped chasing people for updates because the system sends them itself.',
    author: 'Managing director',
    company: 'Bitsmiths Studio',
    project: 'bitsmiths-hrm',
    result: '12 automated emails, zero chasing',
  },
  {
    quote:
      'The review agent returns findings at clause level with the standard it came from and a plain explanation. Reviewers trust it because they can check it. Audit turnaround went from roughly a week to half that without adding a single person to the team.',
    author: 'Head of quality',
    company: 'Audit firm (confidential)',
    project: 'qa-compliance-agent',
    result: '50% shorter audit turnaround',
  },
];
