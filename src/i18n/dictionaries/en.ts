import type { Locale } from '../config';

export const en = {
  locale: 'en' as Locale,
  nav: {
    services: 'Services',
    work: 'Projects',
    pricing: 'Pricing',
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
    stack: {
      kicker: 'Every build ships with',
      blocks: [
        'Next.js',
        'Postgres',
        'Auth',
        'Payments',
        'CI/CD',
        'LLM agents',
        'Kubernetes',
        'React Native',
        'Test suite',
        'Monitoring',
        'Fixed price',
        'Weekly demo',
        'Handover docs',
        'Shipped',
      ],
    },
  },
  work: {
    kicker: 'Selected work',
    title: 'Products we have shipped',
    description:
      'Twelve products in production: marketplaces that move real money, AI systems that answer from the right documents, internal tools that reconcile to the last unit.',
    all: 'All projects',
    view: 'View project',
    filterLabel: 'Filter projects',
    filters: {
      All: 'All work',
      SaaS: 'SaaS',
      Marketplace: 'Marketplaces',
      AI: 'AI',
      Mobile: 'Mobile',
      Website: 'Websites',
      'Full-Stack': 'Full-stack',
      'Cloud & Automation': 'Cloud & automation',
      Web: 'Web',
    },
    count: '{n} projects',
    notable: {
      kicker: 'Also shipped',
      title: 'Notable projects',
      description:
        'Apps, sites and side builds alongside the main products. Each one has its own page, and the list grows as new work ships.',
    },
  },
  services: {
    kicker: 'Services',
    title: 'The whole product, one senior team',
    description:
      'Four capabilities cover the interface, API, data, AI and the cloud underneath. Two engagement models decide how we work together.',
    all: 'All services',
    explore: 'See the service',
    groups: {
      capability: {
        label: 'What we build',
        note: 'Pick one or combine them. One team owns the whole stack.',
      },
      engagement: {
        label: 'How we work together',
        note: 'Priced for a result, not for hours.',
      },
    },
    meta: {
      timeline: 'Timeline',
      team: 'Team',
      pricing: 'Pricing',
    },
  },
  pricing: {
    kicker: 'Pricing plans',
    title: 'Choose the plan that works best for your business',
    description:
      'Three fixed-price packages. Each one starts with a written scope and a committed date, and ends with a product you own outright.',
    period: 'one time',
    cta: 'Get Started Now',
    note: 'Prices in USD, excluding VAT. Need something in between? Send a brief and you have a fixed quote within five working days.',
    plans: [
      {
        id: 'consulting' as const,
        name: 'Consulting & Strategy',
        tagline: 'Expert guidance to accelerate your growth.',
        price: '$2,999',
        features: [
          'Future-proof tech blueprint',
          '6-month growth roadmap',
          'Best-in-class tech stack',
          'Enterprise scaling strategy',
          'ROI-focused planning',
          'Hiring & team planning',
          'Risk mitigation strategy',
          '90-day growth blueprint',
        ],
      },
      {
        id: 'mvp' as const,
        name: 'MVP Development',
        tagline: 'Market-ready MVP in 30 days or less.',
        price: '$4,999',
        features: [
          'Market-ready MVP in 30 days',
          'Professional design that converts',
          'Essential features your users need',
          'Built to scale: handle 100k+ users',
          'Perfect experience on any device',
          'Built-in growth tracking',
          '14 days of launch support',
          'Full ownership of your product',
        ],
      },
      {
        id: 'product' as const,
        name: 'Full-Scale Product',
        tagline: 'A complete product, launched and handed over in 45 days.',
        price: '$9,999',
        features: [
          'Launch-ready product within 45 days',
          'Premium UI/UX that outshines competitors',
          'Start making money from day one',
          'AI-powered insights dashboard',
          'Bank-level security protocols',
          'Lightning-fast performance',
          '30 days of dedicated support',
          'Complete technical handover',
        ],
      },
    ],
  },
  technologies: {
    kicker: 'Trusted technology',
    statement: 'Built on the tools that matter.',
    statementMuted:
      'Proven models, frameworks and infrastructure. No experiments on your budget.',
    stackLabel: 'The stack, by layer',
    layers: [
      { label: 'Interface', note: 'What your users see and touch.' },
      { label: 'Mobile', note: 'iOS and Android, native or cross-platform.' },
      { label: 'Backend & data', note: 'Where the truth lives.' },
      {
        label: 'AI systems',
        note: 'Models, retrieval and agents on your data.',
      },
      {
        label: 'Automation',
        note: 'Work that runs without a human in the loop.',
      },
      { label: 'Cloud & delivery', note: 'Where it runs and keeps running.' },
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
      'Clients in Europe, Asia, Africa and North America. An Asian office in Islamabad, a European office in Fellbach, and a working day that covers both.',
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
      { value: '6 wks', label: 'Typical time to first release' },
    ],
  },
  howItWorks: {
    kicker: 'How it works',
    title: 'From brief to launch, on a date',
    description:
      'One call, a written plan, weekly demos, then a launch you can put in the calendar. You stay in control the whole way.',
    stepLabel: 'Step',
    cta: 'Book the first call',
    note: 'One call. Five working days to a fixed price and a launch date.',
    steps: [
      {
        title: 'Tell us what has to exist',
        when: 'Day 1',
        summary:
          'A 30-minute call. Walk us through the product, the users and the deadline. Within five working days you have a written scope, a fixed price and a launch date.',
        outputs: ['Written scope', 'Fixed price', 'Launch date'],
      },
      {
        title: 'Watch it get built',
        when: 'Every Friday',
        summary:
          'A working version you can click on every Friday, with a short written update. Change your mind early and it costs nothing.',
        outputs: ['Weekly demo', 'Staging access', 'Written update'],
      },
      {
        title: 'Launch and keep it',
        when: 'Launch day',
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
