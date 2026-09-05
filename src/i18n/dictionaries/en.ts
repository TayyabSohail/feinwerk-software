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
    badge: 'Product engineering studio',
    title: 'Precision software,\nshipped on time',
    accent: [2, 3, 4],
    body: 'Feinwerk Software designs and builds web platforms, AI systems and cloud infrastructure for businesses in Europe and Asia. Every engagement starts with a defined scope, a fixed or custom price and a committed delivery date, and we keep maintaining what we build after launch.',
    primary: 'Request a proposal',
    secondary: 'View our work',
    /** The living system map beside the hero copy. */
    map: {
      kicker: 'One team, the whole system',
      nodes: {
        web: 'Web app',
        mobile: 'Mobile app',
        api: 'API',
        db: 'Database',
        ai: 'AI model',
        cloud: 'Cloud',
      },
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
        note: 'Priced for a result, not for hours. Custom scopes welcome, and every build is maintained after launch.',
      },
    },
    meta: {
      timeline: 'Timeline',
      team: 'Team',
      pricing: 'Pricing',
      support: 'After launch',
    },
  },
  pricing: {
    kicker: 'Pricing plans',
    title: 'Choose the plan that works best for your business',
    description:
      'A custom solution scoped to your brief, plus three fixed-price packages. Each one starts with a written scope and a committed date, ends with a product you own outright, and is maintained by us after launch.',
    badge: 'Top pick',
    period: 'one time',
    customPeriod: 'fixed quote',
    customCta: 'Request a custom quote',
    cta: 'Get started now',
    note: 'Prices in EUR, excluding VAT. Nothing here fits exactly? Every brief gets a custom scope and a fixed quote within five working days, and every plan comes with maintenance and support after launch.',
    includes: {
      title: 'Included in every plan, custom solutions too',
      items: [
        {
          title: 'Written scope and fixed quote',
          body: 'Standard package or custom solution: the price and the date are agreed in writing before work starts.',
        },
        {
          title: 'Maintenance after launch',
          body: 'Monitoring, fixes, updates and security patches. We do not hand over and disappear.',
        },
        {
          title: 'Accountability for what we build',
          body: 'One senior team answers for the product in production, for as long as you want us to.',
        },
        {
          title: 'Full ownership',
          body: 'Code, accounts and designs are yours from day one, with documentation to run it without us.',
        },
      ],
    },
    plans: [
      {
        id: 'custom' as const,
        featured: false,
        name: 'Custom Solution',
        tagline:
          'Scoped to your brief, priced in writing, maintained after launch.',
        price: 'Custom',
        features: [
          'Written scope from your brief',
          'Fixed quote within five working days',
          'Any stack, integration or scale',
          'AI, cloud, mobile and web combined',
          'Committed launch date',
          'Weekly demos and staging access',
          'Maintenance and support after launch',
          'Full ownership of your product',
        ],
      },
      {
        id: 'consulting' as const,
        featured: false,
        name: 'Consulting & Strategy',
        tagline: 'Expert guidance to accelerate your growth.',
        price: '€2,999',
        features: [
          'Future-proof tech blueprint',
          '6-month growth roadmap',
          'Best-in-class tech stack',
          'Enterprise scaling strategy',
          'ROI-focused planning',
          'Hiring & team planning',
          'Risk mitigation strategy',
          '90-day growth blueprint',
          'Follow-up sessions after delivery',
        ],
      },
      {
        id: 'mvp' as const,
        featured: true,
        name: 'MVP Development',
        tagline: 'Market-ready MVP in 30 days or less.',
        price: '€4,999',
        features: [
          'Market-ready MVP in 30 days',
          'Professional design that converts',
          'Essential features your users need',
          'Built to scale: handle 100k+ users',
          'Perfect experience on any device',
          'Built-in growth tracking',
          '14 days of launch support',
          'Ongoing maintenance and updates',
          'Full ownership of your product',
        ],
      },
      {
        id: 'product' as const,
        featured: false,
        name: 'Full-Scale Product',
        tagline: 'A complete product, launched and handed over in 45 days.',
        price: '€9,999',
        features: [
          'Launch-ready product within 45 days',
          'Premium UI/UX that outshines competitors',
          'Start making money from day one',
          'AI-powered insights dashboard',
          'Bank-level security protocols',
          'Lightning-fast performance',
          '30 days of dedicated support',
          'Ongoing maintenance and updates',
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
      'Fixed or custom price and a fixed date on every proposal',
      'Maintenance and support after launch, on every project',
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
      'One call, a written plan, weekly demos, then a launch you can put in the calendar, and a team that keeps maintaining it afterwards. You stay in control the whole way.',
    stepLabel: 'Step',
    cta: 'Book the first call',
    note: 'One call. Five working days to a fixed or custom quote and a launch date. Maintained after launch.',
    steps: [
      {
        title: 'Tell us what has to exist',
        when: 'Day 1',
        summary:
          'A 30-minute call. Walk us through the product, the users and the deadline. Within five working days you will have a written scope, a fixed price for a standard plan or a custom quote, and a launch date.',
        outputs: ['Written scope', 'Fixed or custom quote', 'Launch date'],
      },
      {
        title: 'Watch it get built',
        when: 'Every Friday',
        summary:
          'A working version you can click on every Friday, with a short written update. Change your mind early and it costs nothing.',
        outputs: ['Weekly demo', 'Staging access', 'Written update'],
      },
      {
        title: 'Launch, and we stay',
        when: 'Launch day and after',
        summary:
          'We ship, monitor it live, fix what breaks and keep maintaining it. We do not hand over and disappear: stay on a maintenance plan for updates and support, or take it in-house with full documentation. Yours either way.',
        outputs: ['Monitoring', 'Maintenance & support', 'Full handover'],
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
  servicesPage: {
    kicker: 'Services',
    title: 'Engineering, scoped to an outcome.',
    accent: [3, 4],
    description:
      'Four capabilities and two ways to engage, covering the whole lifecycle of a software product from the first prototype to the team that runs it. Each one is priced for a result, not for hours, fits a standard package or a custom scope, and is maintained by us after launch.',
    deliverables: 'What you get',
    useCases: 'Typical engagements',
    stack: 'Tools we use',
    proof: 'Proof',
    faqTitle: 'Questions about this service',
  },
  servicePage: {
    back: 'All services',
    kindEngagement: 'Engagement model',
    kindCapability: 'Capability',
    discuss: 'Discuss this service',
    engagement: 'Engagement',
    coreStack: 'Core stack',
    included: 'What is included',
    useCases: 'Typical use cases',
    proof: 'Proof',
    proofTitle: 'Where we have done this before.',
    allCaseStudies: 'All case studies',
    faqKicker: 'Questions',
    faqTitle: 'About this service.',
    faqAccent: [1, 2],
    others: 'Other services',
    notFound: 'Service not found',
  },
  contactForm: {
    name: 'Full name',
    namePlaceholder: 'Jane Doe',
    email: 'Work email',
    emailPlaceholder: 'jane@company.com',
    company: 'Company',
    companyPlaceholder: 'Company or product name',
    service: 'What do you need?',
    servicePlaceholder: 'Choose a service',
    serviceOther: 'Something else',
    budget: 'Budget range',
    budgetPlaceholder: 'Choose a range',
    message: 'About the project',
    messagePlaceholder:
      'What are you building, who is it for, and when does it need to exist?',
    consentBefore:
      'I agree that Feinwerk Software may store and process this enquiry to respond to me, as described in the',
    consentLink: 'privacy policy',
    consentAfter: '.',
    submit: 'Send enquiry',
    replyNote: 'We reply {time}. No newsletters, no drip campaigns.',
    errorGeneric:
      'Something went wrong. Please try again or email us directly.',
    sentTitle: 'Message received.',
    sentBody:
      'Thank you. We read every enquiry personally and reply {time}. If it is urgent, email us directly.',
    sentEmail: 'Email us',
    sentAgain: 'Send another',
    budgets: {
      'under-10k': 'Under €10k',
      '10k-25k': '€10k - €25k',
      '25k-50k': '€25k - €50k',
      '50k-100k': '€50k - €100k',
      'over-100k': '€100k+',
      retainer: 'Monthly retainer',
      unsure: 'Not sure yet',
    },
  },
  contact: {
    kicker: 'Contact',
    title: 'Tell us what has to be right.',
    accent: [5, 6],
    description:
      'A few sentences are enough. We reply within one business day with a first take on scope, timeline and price, standard package or custom, and on who would build and maintain it.',
    direct: 'Direct',
    book: 'Book a 30-minute intro call',
    callNote: 'Prefer a call? Mention it and we will send a booking link.',
    faqKicker: 'Before you write',
    faqTitle: 'The questions we get most.',
    faqAccent: [4],
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
    body: 'Send a short brief today. Within a week you will have a written scope, a fixed or custom quote and a launch date, with no obligation. After launch we stay on to maintain what we built.',
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
