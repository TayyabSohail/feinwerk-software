export interface Faq {
  question: string;
  answer: string;
}

/** General questions, shown on the homepage and the contact page. */
export const faqs: Faq[] = [
  {
    question: 'What does an engagement with Feinwerk look like?',
    answer:
      'Most projects start with a one-week discovery that ends in a written scope, a success metric and a fixed price for the first release, whether that is one of our packages or a custom solution. From there we ship weekly to a staging environment you can click through, with a demo every Friday. After launch we stay on to maintain what we built.',
  },
  {
    question: 'How do you price work?',
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
