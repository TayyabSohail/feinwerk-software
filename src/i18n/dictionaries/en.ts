import type { Locale } from '../config';

export const en = {
  locale: 'en' as Locale,
  nav: {
    services: 'Services',
    work: 'Projects',
    about: 'About',
    contact: 'Contact',
    home: 'Home',
    careers: 'Careers',
    cta: 'Start a project',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
  },
  hero: {
    badge: 'Product engineering studio · Germany & Pakistan',
    title: 'Custom software engineering, delivered on schedule',
    accent: [3, 4, 5],
    body: 'Feinwerk Software designs and builds web platforms, AI systems and cloud infrastructure for businesses in Europe and Asia. Every engagement starts with a defined scope, a fixed price and a committed delivery date.',
    primary: 'Request a proposal',
    secondary: 'View our work',
    proof: [
      'Fixed-price engagements',
      'Committed delivery dates',
      'Weekly progress reviews',
      'Full IP ownership',
    ],
    live: 'In production',
    privateLabel: 'Private deployment',
  },
  work: {
    kicker: 'Selected work',
    title: 'Products we have shipped',
    description:
      'Twelve platforms in production: marketplaces that move real money, AI systems that answer from the right documents, internal tools that reconcile to the last unit.',
    all: 'All projects',
    view: 'View project',
    filterLabel: 'Filter projects',
    filters: {
      All: 'All work',
      SaaS: 'SaaS',
      Marketplace: 'Marketplaces',
      AI: 'AI',
      Website: 'Websites',
      'Full-Stack': 'Full-stack',
      'Cloud & Automation': 'Cloud & automation',
      Web: 'Web',
    },
    count: '{n} projects',
  },
  services: {
    kicker: 'What we build',
    title: 'The whole product, one senior team',
    description:
      'Interface, API, data, AI and the cloud underneath. Pick a shape, or describe the problem and we propose one.',
    all: 'All services',
    explore: 'See the service',
  },
  technologies: {
    kicker: 'Trusted technology',
    statement: 'Built on the tools that matter.',
    statementMuted:
      'We use the same models, frameworks and infrastructure behind the products you already rely on, so nothing we ship is an experiment on your budget.',
    stackLabel: 'The stack, by layer',
    layers: [
      { label: 'Interface', note: 'What your users see and touch.' },
      {
        label: 'Backend & data',
        note: 'Where the truth lives and reconciles.',
      },
      {
        label: 'AI systems',
        note: 'Models, retrieval and agents, grounded in your data.',
      },
      {
        label: 'Cloud & delivery',
        note: 'Where it runs, ships and keeps running.',
      },
    ],
  },
  industries: {
    kicker: 'Industries',
    title: 'Who we build for',
    description:
      'Products where a wrong number costs money. Every industry below has a shipped case study behind it.',
    shipped: 'Shipped',
    items: {
      fintech: {
        name: 'Fintech',
        blurb: 'Wallets, ledgers and payouts that reconcile to the last unit.',
      },
      realEstate: {
        name: 'Real estate',
        blurb: 'Marketplaces, rental platforms and agency operations.',
      },
      ecommerce: {
        name: 'Ecommerce',
        blurb:
          'Multi-seller storefronts, checkout, shipping and support automation.',
      },
      hr: {
        name: 'HR & payroll',
        blurb: 'Attendance, leave and payroll that pass an audit.',
      },
      healthcare: {
        name: 'Healthcare',
        blurb:
          'Rehabilitation and patient-facing assistants with clinical guardrails.',
      },
      recruiting: {
        name: 'Recruiting',
        blurb: 'Structured voice interviews, scoring and transcripts at scale.',
      },
      martech: {
        name: 'Marketing technology',
        blurb: 'SEO and content platforms that generate, publish and measure.',
      },
      compliance: {
        name: 'Compliance',
        blurb: 'Clause-level document review with an audit trail.',
      },
    },
  },
  globalReach: {
    kicker: 'Global reach',
    title: 'Engineering depth that ships across time zones',
    description:
      'Clients in Europe, Asia, Africa and North America. Engineering in Rawalpindi, a client office in Fellbach, and a working day that covers both.',
    bullets: [
      'Fixed price and fixed date on every proposal',
      'GDPR-compliant processing, DPA and NDA on request',
      'Senior engineers only, working across CET and PKT',
    ],
    legend: 'Offices and client locations',
  },
  numbers: {
    kicker: 'By the numbers',
    title: 'Proof, not promises',
    description:
      'Company figures and results reported by clients after launch.',
    items: [
      { value: '150+', label: 'Projects delivered' },
      { value: '40+', label: 'Clients on four continents' },
      { value: '1M+', label: 'End users on products we built' },
      { value: '99.9%', label: 'Uptime across live platforms' },
      { value: '12', label: 'Industries served' },
      { value: '70%', label: 'Less manual work after automation' },
      { value: '6 wks', label: 'Typical time to first release' },
      { value: '24h', label: 'Reply time on every message' },
    ],
  },
  howItWorks: {
    kicker: 'How it works',
    title: 'From brief to launch, on a date',
    description:
      'One call, a written plan, weekly demos, then a launch you can put in the calendar. You stay in control the whole way.',
    stepLabel: 'Step',
    cta: 'Book the first call',
    steps: [
      {
        title: 'Tell us what has to exist',
        summary:
          'A 30-minute call. Walk us through the product, the users and the deadline. Within five working days you have a written scope, a fixed price and a launch date.',
        outputs: ['Written scope', 'Fixed price', 'Launch date'],
      },
      {
        title: 'Watch it get built',
        summary:
          'A working version you can click on every Friday, with a short written update. Change your mind early and it costs nothing.',
        outputs: ['Weekly demo', 'Staging access', 'Written update'],
      },
      {
        title: 'Launch and keep it',
        summary:
          'We ship, monitor the first weeks live, and hand over everything with documentation. Stay on a retainer or take it in-house. Yours either way.',
        outputs: ['Monitoring', 'Documentation', 'Full hand-over'],
      },
    ],
  },
  testimonials: {
    kicker: 'Client voices',
    title: 'What it is like to work with us',
    accent: [6],
    description:
      'Every quote sits next to the project it describes, so you can check the claim against the work.',
    read: 'Read the projects',
    caseStudy: 'View project',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
  },
  faq: {
    kicker: 'Questions',
    title: 'Answers before you ask',
    accent: [2],
  },
  cta: {
    kicker: "Let's talk",
    title: 'Ready to put a date on it?',
    accent: [5, 6],
    body: 'Send a short brief today. Within a week you have a written scope, a fixed price and a launch date, with no obligation.',
    button: 'Start a project',
  },
  footer: {
    pitch:
      'A product engineering studio for companies that cannot afford a second attempt.',
    quote: 'Get a quote',
    services: 'Services',
    company: 'Company',
    offices: 'Offices',
    legal: 'Legal',
    connect: 'Connect',
    caseStudies: 'Projects',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  languageNotice:
    'Project pages, service details and legal documents are currently available in English only.',
};

export type Dictionary = typeof en;
