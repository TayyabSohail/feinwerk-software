export interface Faq {
  question: string;
  answer: string;
}

/** General questions, shown on the homepage and the contact page. */
export const faqs: Faq[] = [
  {
    question: 'What does an engagement with Feinwerk look like?',
    answer:
      'Most projects start with a one-week discovery that ends in a written scope, a success metric and a fixed price for the first release. From there we ship weekly to a staging environment you can click through, with a demo every Friday.',
  },
  {
    question: 'How do you price work?',
    answer:
      'Fixed price for well-defined phases such as an MVP or a website, and a monthly retainer for ongoing product work or a dedicated team. We quote in EUR or USD and invoice from Germany or Pakistan, whichever suits your accounting.',
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
