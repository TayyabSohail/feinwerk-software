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
    body: 'Feinwerks Software designs and builds web platforms, AI systems and cloud infrastructure for businesses in Europe and Asia. Every engagement starts with a defined scope, a fixed or custom price and a committed delivery date, and we keep maintaining what we build after launch.',
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
    /** Homepage pointer to the projects page; the work itself lives there. */
    teaser: {
      kicker: 'Projects',
      title: 'Every project, with its result',
      accent: [3, 4],
      body: 'Marketplaces, SaaS platforms, AI agents and websites, each shown with the problem, the approach and the measured outcome. They have a page of their own so the numbers get the room they need.',
      cta: 'Browse all projects',
      listLabel: 'Featured projects',
      more: '{n} more on the projects page',
    },
  },
  services: {
    kicker: 'Services',
    title: 'The whole product, one senior team',
    explore: 'See the service',
    groups: {
      capability: {
        label: 'What we build',
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
    badge: 'Top pick',
    period: 'one time',
    customPeriod: 'fixed quote',
    customCta: 'Request a custom quote',
    cta: 'Get started now',
    all: 'Compare plans in detail',
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
    items: [
      { value: '150+', label: 'Projects delivered' },
      { value: '40+', label: 'Clients on four continents' },
      { value: '6 wks', label: 'Typical time to first release' },
    ],
  },
  howItWorks: {
    kicker: 'Working with us',
    title: 'How a project runs',
    description:
      'You know the cost and the date before any code exists. You see working software throughout, not at the end. You keep a team that still picks up the phone once it is live.',
    stepLabel: 'Step',
    cta: 'Start with a call',
    note: 'One short call to start. A written quote and a launch date within a week. A team that stays reachable once the product is live.',
    steps: [
      {
        title: 'Know the cost before the code',
        when: 'Before we build',
        summary:
          'We start with a short conversation about what the product does, who depends on it and the date it has to be live. Within a week you receive a written scope, a price as a standard package or a custom quote, and a launch date we will hold ourselves to.',
        outputs: [
          'Written scope',
          'Package price or custom quote',
          'Launch date we stand behind',
        ],
      },
      {
        title: 'Use it while it is being built',
        when: 'During the build',
        summary:
          'Progress is shown in software, not slides. At the end of each sprint you get a staging link with the newest work and a short summary of what was finished and what is planned next. Changing direction early costs nothing.',
        outputs: [
          'Sprint walkthrough',
          'Always-on staging link',
          'Written progress summary',
        ],
      },
      {
        title: 'Ownership stays with you',
        when: 'After it goes live',
        summary:
          'We release it, keep an eye on it in production and repair anything that breaks. From there it is your call: keep us on retainer for maintenance, or run it yourself with the source code, the accounts and the documentation handed over in full.',
        outputs: [
          'Live monitoring',
          'Ongoing fixes',
          'Full handover of code and access',
        ],
      },
    ],
  },
  testimonials: {
    kicker: 'Client voices',
    title: 'What it is like to work with us',
    accent: [6],
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
  pricingPage: {
    kicker: 'Pricing',
    title: 'A price in writing, before work starts.',
    accent: [5, 6],
    description:
      'Three fixed-price packages for the common cases and a custom quote for everything else. Every plan comes with a written scope, a committed launch date and maintenance after launch, so there is nothing to negotiate once the work is under way.',
    faqKicker: 'Pricing questions',
    faqTitle: 'What people ask before they sign',
    faqAccent: [5],
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
    optional: 'optional',
    companyPlaceholder: 'Company or product name',
    service: 'What do you need?',
    servicePlaceholder: 'Choose a service',
    serviceOther: 'Something else',
    budget: 'Budget range',
    budgetPlaceholder: 'Choose a range',
    budgetHeading: 'Rough budget',
    budgetHint:
      'A range is enough. It tells us what shape of team fits - it is not a quote.',
    message: 'About the project',
    messagePlaceholder:
      'What are you building, who is it for, and when does it need to exist?',
    consentBefore:
      'I agree that Feinwerks Software may store and process this enquiry to respond to me, as described in the',
    consentLink: 'privacy policy',
    consentAfter: '.',
    submit: 'Send enquiry',
    replyNote: 'We reply {time}.',
    errorGeneric: 'Something went wrong. Please try again in a moment.',
    sentTitle: 'Message received.',
    sentToast: 'Your enquiry has been sent. We reply {time}.',
    sentBody:
      'Thank you. We read every enquiry personally and reply {time}, straight to the address you gave us.',
    sentAgain: 'Send another',
    // Multi-step wizard
    stepLabel: 'Step {current} of {total}',
    next: 'Continue',
    back: 'Back',
    steps: {
      service: {
        title: 'What can we build for you?',
        subtitle: 'Pick the closest match. We will refine it together.',
        kicker: 'The work',
      },
      message: {
        title: 'Tell us about the project.',
        subtitle:
          'What are you building, who is it for, and when does it need to exist?',
        kicker: 'The brief',
      },
      details: {
        title: 'Where do we send the reply?',
        subtitle: 'Last step. We only use this to answer your enquiry.',
        kicker: 'Your details',
      },
    },
    reviewTitle: 'Your enquiry',
    notProvided: 'Not provided',
    charactersLeft: '{count} characters left',
    minChars: 'At least 20 characters',
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
  workPage: {
    back: 'All projects',
    anonymised: 'Client project, name changed on request',
    private: 'Private deployment, client project',
    category: 'Category',
    year: 'Year',
    capabilities: 'Capabilities',
    industry: 'Industry',
    problem: 'The problem',
    approach: 'Our approach',
    architecture: 'How it is built',
    keyFeatures: 'Key features',
    challengesKicker: 'Challenges & solutions',
    challenge: 'Challenge',
    solution: 'Solution',
    resultsKicker: 'Results',
    resultsTitle: 'What shipping it changed.',
    gallery: 'Inside the product',
    onThePhone: 'On the phone',
    galleryTitle: 'More than one screen.',
    galleryAnonymised:
      "The product name and data have been changed at the client's request; these screens recreate {title} as it was built.",
    galleryMore: '{n} more screens from {title}, captured at device size.',
    homeScreen: 'Home',
    stack: 'Stack',
    servicesInvolved: 'Services involved',
    more: 'More case studies',
    previous: 'previous',
    next: 'next',
    notFound: 'Case study not found',
    ctaTitle: 'Building something similar?',
    ctaAccent: [1, 2],
    ctaBody:
      'We can usually tell within one call whether the approach above transfers to your problem, and what would need to change.',
  },
  aboutPage: {
    kicker: 'About Feinwerks',
    title: 'A software studio named after a standard.',
    accent: [6, 7],
    description:
      'Feinwerks takes its name from Feinwerk, German for fine work, the precision-engineering tradition of the Stuttgart region where our client office sits. We hold software to the same bar: it has to be exactly right, on the day it was promised.',
    story: [
      'We started Feinwerks after years of building products for companies that had been burned before: agencies that missed the date, teams that shipped almost what was asked, estimates that doubled halfway through.',
      'So we structured the studio around the four things clients said they could not get elsewhere. A date and a price agreed before work starts, for a standard package or a custom scope. One senior team that owns the whole product, from the interface to the cloud bill. A result you can measure after launch, reported by you, not by us. And a team that stays: we maintain what we build and take accountability for it in production.',
      'Our Asian office is in Islamabad. Clients in Europe have a local contact in Fellbach. Between the two offices, someone is working during your working day.',
    ],
    facts: [
      {
        label: 'What we build',
        value: 'Web platforms, AI products, cloud automation, marketing sites',
      },
      {
        label: 'Who for',
        value: 'Founders and product teams in Europe, Asia and North America',
      },
      {
        label: 'How',
        value:
          'Fixed scope, fixed or custom price, weekly demos, maintained after launch',
      },
      {
        label: 'Where',
        value: 'Islamabad and Fellbach, with overlapping working hours',
      },
    ],
    principlesKicker: 'Principles',
    principlesTitle: 'Four rules every project is held to.',
    principlesAccent: [0, 1],
    whereKicker: 'Where we are',
    whereTitle: 'Two offices, one working day.',
    whereAccent: [3, 4],
    whereDescription:
      'An Asian office in Islamabad and a European office in Fellbach. Call whichever is closer; the same team answers.',
    careersKicker: 'Careers',
    careersTitle: 'No open positions right now.',
    careersBody:
      'We are not hiring at the moment. When that changes, roles will be listed on the careers page.',
    careersLink: 'Careers',
    ctaTitle: 'Want to see how we would run your project?',
    ctaAccent: [7, 8],
    ctaBody:
      'Send a short brief. You get a written scope, a fixed or custom price and a launch date within a week, with no obligation, and a team that keeps maintaining the product after launch.',
  },
  careersPage: {
    kicker: 'Careers',
    title: 'No open positions right now.',
    accent: [1, 2],
    description:
      'Feinwerks Software is a small studio that hires slowly. We are not recruiting at the moment, and there are no vacancies to apply for. When that changes, the roles will be listed on this page.',
    badge: '0 open positions',
    statusKicker: 'Current status',
    statusTitle: 'We are not accepting applications.',
    statusBody:
      'There are no vacancies for engineers, designers or any other role, in Islamabad, in Fellbach or remote.',
    notifyBefore: 'Want to hear when this changes? Send us a note through',
    notifyAfter:
      'mentioning “Future roles” and we will let you know once a position opens.',
    ctaTitle: 'Rather hire us than join us?',
    ctaAccent: [1, 2],
    ctaBody:
      'Our dedicated team service embeds senior engineers in your roadmap, in your tools, on your schedule.',
  },
  legal: {
    kicker: 'Legal',
    title: 'The paperwork, in plain language.',
    accent: [3, 4],
    description:
      'Everything that governs how we run this website and how we work with clients, written to be read rather than skimmed. Questions go straight to a person, not a form.',
    reviewed: 'All documents last reviewed {date}',
    updatedLabel: 'Last updated',
    read: 'Read',
    contents: 'Contents',
    onThisPage: 'On this page',
    otherPolicies: 'Other policies:',
    backToLegal: 'All legal documents',
    policies: {
      privacy: {
        title: 'Privacy Policy',
        summary:
          'What personal data this website collects, why, who processes it and the rights you have under the GDPR.',
        audience: 'Visitors, enquirers and clients',
      },
      terms: {
        title: 'Terms of Service',
        summary:
          'The general terms for using this site and for engaging Feinwerks Software, covering scope, payment, intellectual property and liability.',
        audience: 'Business clients',
      },
      cookies: {
        title: 'Cookie Policy',
        summary:
          'The two preference entries the site stores and the single analytics cookie that loads only if you accept it.',
        audience: 'Visitors',
      },
      imprint: {
        title: 'Imprint',
        summary:
          'Legal notice (Impressum) with the company details, contact information and responsible persons required under German law.',
        audience: 'Everyone',
      },
    },
    intros: {
      privacy:
        'What we collect, why, and what you can ask us to do about it. Written for people, not for lawyers.',
      terms:
        'The terms that govern this website and our client engagements, in language you can actually read.',
      cookies:
        'Two small pieces of storage to remember your preferences, and one analytics cookie only if you say yes.',
      imprint:
        'Who runs this website, where we are registered and how to reach a responsible person.',
    },
    commitmentsKicker: 'How we contract',
    commitmentsTitle: 'Four commitments in every engagement.',
    commitments: [
      {
        title: 'You own what we build',
        body: 'Custom code, designs and documentation are assigned to you on payment. We work in repositories and accounts registered to your company.',
      },
      {
        title: 'GDPR by default',
        body: 'A data processing agreement is provided for every project that touches personal data, and our own site collects the minimum needed to reply to you.',
      },
      {
        title: 'NDA before discovery',
        body: 'We sign a mutual non-disclosure agreement on request before any scoping conversation, and treat every brief as confidential regardless.',
      },
      {
        title: 'Two contracting entities',
        body: 'Clients can contract with our German office under German law or with our Asian office under Pakistani law. The statement of work names which.',
      },
    ],
    requestsKicker: 'Legal and data requests',
    requestsBody:
      'To exercise a data right, request a data processing agreement or NDA, report a security issue, or ask anything about these documents, email us. A person replies within five business days; data requests are answered within one month as the GDPR requires.',
  },
  notFound: {
    kicker: 'Error 404',
    title: 'This page was never engineered.',
    accent: [4],
    body: 'The address may have changed, or the link was wrong. Everything we have built is one click away.',
    home: 'Back home',
    work: 'See the work',
  },
  cookies: {
    label: 'Cookie consent',
    kicker: 'Cookies',
    bodyBefore:
      'We use a privacy-friendly analytics cookie to understand which pages are useful. No advertising, no cross-site tracking. Read the',
    link: 'cookie policy',
    bodyAfter: '.',
    accept: 'Accept',
    decline: 'Decline',
  },
  contact: {
    kicker: 'Contact',
    title: 'Tell us what has to be right.',
    accent: [5, 6],
    description:
      'A few sentences are enough. We reply within one business day with a first take on scope, timeline and price, standard package or custom, and on who would build and maintain it.',
    direct: 'How to reach us',
    formNote:
      'The form is the fastest way in. It comes straight to us and we answer every enquiry personally.',
    book: 'Book a 30-minute intro call',
    callNote: 'Prefer a call? Mention it and we will send a booking link.',
    /** Two ways to start: write to us, or book a slot straight away. */
    choose: {
      formTab: 'Write to us',
      callTab: 'Book a call',
      callHint: '30-minute intro call',
    },
    faqKicker: 'Before you write',
    faqTitle: 'The questions we get most.',
    faqAccent: [4],
    /** Closing section of the homepage: the same form, without leaving. */
    home: {
      kicker: 'Contact',
      title: 'Tell us what has to be right.',
      accent: [5, 6],
      description:
        'A few sentences are enough. We reply within one business day with a first take on scope, timeline and price, and on who would build and maintain it.',
    },
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
};

export type Dictionary = typeof en;
