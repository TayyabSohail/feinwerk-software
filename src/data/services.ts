import type { Locale } from '@/i18n/config';

import { servicesDe } from './services.de';

/**
 * Services offered. Drives /services, /services/[slug], the homepage grid,
 * the footer column and the contact form's "What do you need?" select.
 */
/** Capabilities are what we build; engagement models are how we work together. */
export type ServiceKind = 'capability' | 'engagement';

export type ServiceIcon =
  | 'layers'
  | 'sparkles'
  | 'cloud'
  | 'globe'
  | 'rocket'
  | 'wrench';

export interface Service {
  slug: string;
  /** Which group the service is listed under. */
  kind: ServiceKind;
  title: string;
  /** Short line under the title on cards. */
  tagline: string;
  /** One paragraph used on the service page hero and metadata. */
  summary: string;
  icon: ServiceIcon;
  /** What is included, listed on cards (first 4) and the service page. */
  deliverables: string[];
  /** Typical engagements this service is used for. */
  useCases: string[];
  /** Key tools; icons resolve via lib/tech-icons. */
  stack: string[];
  /** Slugs from data/projects.ts that prove this service. */
  proof: string[];
  /** Engagement details for the service page sidebar. */
  engagement: {
    timeline: string;
    team: string;
    pricing: string;
    /** What we keep doing after launch: maintenance, support, accountability. */
    support: string;
  };
  faqs: { question: string; answer: string }[];
  /** Call to action on engagement cards, e.g. "Start a sprint". */
  cta?: string;
}

export const services: Service[] = [
  {
    slug: 'product-engineering',
    kind: 'capability',
    title: 'Full-Stack Product Engineering',
    tagline: 'Web platforms, marketplaces and SaaS, built end to end.',
    summary:
      'We design, build and ship complete products: the interface your users see, the API and data model underneath, and the operational tooling your team needs to run it. One team owns the whole thing, so nothing falls through the cracks, and the same team maintains it after launch.',
    icon: 'layers',
    deliverables: [
      'Product architecture and data modelling',
      'Next.js and React applications with typed APIs',
      'Role-based dashboards and admin tooling',
      'Payments, subscriptions and payouts (Stripe)',
      'Real-time features over WebSockets',
      'Automated emails, notifications and documents',
    ],
    useCases: [
      'Two-sided marketplaces with bidding, checkout or payouts',
      'B2B SaaS with multi-tenant data and billing',
      'Internal platforms replacing spreadsheets and email',
      'Fintech-style products where every number must reconcile',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Supabase',
      'PostgreSQL',
      'Stripe',
      'TanStack',
      'Zod',
    ],
    proof: ['brickfold', 'bidnest', 'curio-market', 'bitsmiths-hrm'],
    engagement: {
      timeline: '6-16 weeks to first release',
      team: 'Lead engineer + 1-3 engineers, design as needed',
      pricing: 'Fixed or custom quote per phase, or monthly retainer',
      support: 'Maintenance plan: monitoring, fixes and updates',
    },
    faqs: [
      {
        question: 'Do you work with an existing codebase?',
        answer:
          'Yes. We start with a short technical audit, agree on what to keep, and then ship improvements in the same repository your team already uses.',
      },
      {
        question: 'Who owns the code?',
        answer:
          'You do. Everything we write is delivered into your repositories and cloud accounts under your name, with documentation and handover sessions included.',
      },
      {
        question: 'Do you maintain the product after launch?',
        answer:
          'Yes. We do not hand over and disappear. A maintenance plan covers monitoring, bug fixes, dependency and security updates and small improvements, handled by an engineer who knows the codebase. We take accountability for what we build in production, for as long as you want us to.',
      },
    ],
  },
  {
    slug: 'ai-automation',
    kind: 'capability',
    title: 'AI Systems & Automation',
    tagline: 'Agents, retrieval and voice, grounded in your own data.',
    summary:
      'We build AI features that hold up in production: retrieval-augmented assistants that answer from your content, multi-agent workflows that complete real tasks, and real-time voice experiences. Every system is grounded, observable and safe to put in front of customers.',
    icon: 'sparkles',
    deliverables: [
      'RAG pipelines with per-tenant isolation',
      'Multi-agent workflows (LangGraph, LangChain)',
      'Real-time voice and transcription (OpenAI Realtime)',
      'Document review, generation and e-signing flows',
      'Evaluation harnesses and guardrails',
      'Cost, latency and quality monitoring',
    ],
    useCases: [
      'Customer support agents across many brands or shops',
      'Compliance and QA review of documents against standards',
      'Operational assistants for CRM, marketing and reporting',
      'AI-led intake, assessment and planning journeys',
    ],
    stack: [
      'OpenAI',
      'Claude',
      'LangGraph',
      'LangChain',
      'Pinecone',
      'Python',
      'FastAPI',
      'RAG',
    ],
    proof: [
      'real-estate-management-system',
      'qa-compliance-agent',
      'ai-interview-assistant',
      'snobbots',
      'ai-physiotherapy',
    ],
    engagement: {
      timeline: '2-4 weeks for a grounded prototype, 8+ for production',
      team: 'AI engineer + full-stack engineer',
      pricing: 'Discovery sprint, then fixed or custom quote per phase',
      support: 'Monitoring, evaluation runs and model updates',
    },
    faqs: [
      {
        question: 'Which models do you use?',
        answer:
          'Whichever fits the task, budget and data residency requirements. We routinely ship on OpenAI, Anthropic Claude and open models via OpenRouter, behind an abstraction so models can be swapped without touching product code.',
      },
      {
        question: 'How do you keep answers accurate?',
        answer:
          'By grounding every answer in your own content with retrieval, evaluating outputs against a test set before release, and logging every interaction so regressions are caught early.',
      },
    ],
  },
  {
    slug: 'cloud-devops',
    kind: 'capability',
    title: 'Cloud, DevOps & Automation',
    tagline: 'Infrastructure that scales cleanly and costs less.',
    summary:
      'We set up the cloud, pipelines and background systems that keep a product reliable: durable job queues, scheduled workloads, CI/CD, observability and cost controls. The goal is boring infrastructure that your team never has to think about.',
    icon: 'cloud',
    deliverables: [
      'AWS, Vercel and container deployments',
      'Durable background jobs (Trigger.dev, pg_cron)',
      'CI/CD pipelines and preview environments',
      'Caching, batching and API cost reduction',
      'Monitoring, alerting and incident runbooks',
      'Security hardening and access policies',
    ],
    useCases: [
      'Bulk processing that exceeds serverless limits',
      'Monthly, scheduled or event-driven workloads',
      'Cutting third-party API spend at scale',
      'Hardening a product before an enterprise customer',
    ],
    stack: [
      'AWS',
      'Vercel',
      'Docker',
      'Trigger.dev',
      'pg_cron',
      'CI/CD',
      'Monitoring',
      'PostgreSQL',
    ],
    proof: ['rankloom', 'bitsmiths-hrm', 'qa-compliance-agent'],
    engagement: {
      timeline: '1-4 weeks per initiative',
      team: 'Platform engineer, part-time or embedded',
      pricing: 'Fixed audit + implementation, custom scope or retainer',
      support: 'Patching, on-call runbooks and cost reviews',
    },
    faqs: [
      {
        question: 'Can you reduce our cloud bill?',
        answer:
          'Usually. We start with a two-day audit of where money goes, then implement the highest-leverage fixes such as caching, batching, right-sizing and moving work to cheaper execution models.',
      },
    ],
  },
  {
    slug: 'web-design-development',
    kind: 'capability',
    title: 'Web Design & Development',
    tagline: 'Marketing sites that load fast and convert.',
    summary:
      'We design and build company websites, landing pages and CMS-driven marketing sites on Next.js. Static-first rendering, careful typography and clear conversion paths, so the site is both fast and persuasive.',
    icon: 'globe',
    deliverables: [
      'Brand-aligned UI design and design systems',
      'Next.js sites with static-first rendering',
      'Headless CMS integration (Directus, Sanity, Payload)',
      'SEO, Open Graph and structured data',
      'Performance budgets and Core Web Vitals',
      'Analytics and cookie-compliant tracking',
    ],
    useCases: [
      'Agency and studio websites with case studies',
      'Product marketing sites with pricing and docs',
      'Rebuilds of slow sites that no longer rank',
      'Multi-language corporate sites',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Directus',
      'Vercel',
      'PostHog',
    ],
    proof: ['bitsmiths-studio', 'new-web-order'],
    engagement: {
      timeline: '2-6 weeks',
      team: 'Designer + front-end engineer',
      pricing: 'Fixed price per site, custom scope on request',
      support: 'Updates, hosting and content support',
    },
    faqs: [
      {
        question: 'Can our team edit content afterwards?',
        answer:
          'Yes. Sites are built on a headless CMS so case studies, articles and pages are published from an editor, without a developer or a deploy.',
      },
    ],
  },
  {
    slug: 'mvp-sprint',
    kind: 'engagement',
    title: 'MVP in Weeks',
    tagline: 'From brief to a production-ready first release.',
    cta: 'Start a sprint',
    summary:
      'For founders and teams who need a real product in the market fast. We scope ruthlessly, build the core loop on a proven stack, and ship a production-ready MVP with billing, auth and analytics already in place.',
    icon: 'rocket',
    deliverables: [
      'One-week discovery and scope lock',
      'Clickable prototype before code',
      'Production MVP with auth, billing and analytics',
      'Launch checklist, monitoring and handover',
      'Two weeks of post-launch support',
      'Ongoing maintenance plan after that',
    ],
    useCases: [
      'Validating a business idea with paying users',
      'Pre-seed and seed-stage products',
      'Internal ventures inside larger companies',
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel', 'PostHog', 'Resend'],
    proof: ['bitsmiths-studio', 'bidnest', 'ai-interview-assistant'],
    engagement: {
      timeline: '4-8 weeks',
      team: 'Lead engineer + engineer + designer',
      pricing: 'Fixed or custom quote, milestone-based',
      support: 'Two weeks included, then a maintenance plan',
    },
    faqs: [
      {
        question: 'What happens after launch?',
        answer:
          'We stay. Every sprint includes post-launch support, and most clients keep us on a maintenance plan for fixes, updates and growth work. We take accountability for what we shipped. If you prefer to take it in-house, we hand over with documentation and a walkthrough.',
      },
    ],
  },
  {
    slug: 'team-extension',
    kind: 'engagement',
    title: 'Dedicated Engineering Team',
    tagline: 'Senior engineers embedded in your team.',
    cta: 'Build your team',
    summary:
      'A dedicated, senior team working inside your tools and processes. Ideal when you have a roadmap and need reliable capacity in European and Asian time zones without the overhead of hiring.',
    icon: 'wrench',
    deliverables: [
      'Senior full-stack, AI and platform engineers',
      'Working in your repos, tickets and rituals',
      'Weekly demos and written progress reports',
      'Flexible scaling up or down monthly',
      'Overlap with CET and PKT working hours',
    ],
    useCases: [
      'Scaling a product team without slow hiring',
      'Clearing a backlog before a launch or fundraise',
      'Long-running platform ownership',
    ],
    stack: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    proof: ['brickfold', 'curio-market', 'rankloom'],
    engagement: {
      timeline: 'Ongoing, 3-month minimum',
      team: '1-5 engineers',
      pricing: 'Monthly per engineer, custom team on request',
      support: 'The team stays for as long as you need it',
    },
    faqs: [
      {
        question: 'How do you communicate?',
        answer:
          'Slack or Teams for day-to-day communication, a weekly demo call, and a written summary every Friday. You always know what shipped and what is next.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** The four things we build, in display order. */
export const capabilities = services.filter(
  (service) => service.kind === 'capability',
);

/** The two ways to work with us, in display order. */
export const engagements = services.filter(
  (service) => service.kind === 'engagement',
);

function localise(service: Service, locale: Locale): Service {
  if (locale !== 'de') return service;
  const t = servicesDe[service.slug];
  if (!t) return service;
  return { ...service, ...t, cta: t.cta ?? service.cta };
}

/** Every service in `locale`, in display order. */
export function getServices(locale: Locale): Service[] {
  return services.map((service) => localise(service, locale));
}

export function getServiceBySlugLocalised(
  slug: string,
  locale: Locale,
): Service | undefined {
  const service = getServiceBySlug(slug);
  return service ? localise(service, locale) : undefined;
}

/** The four things we build, in `locale`. */
export function getCapabilities(locale: Locale): Service[] {
  return getServices(locale).filter((service) => service.kind === 'capability');
}

/** The two ways to work with us, in `locale`. */
export function getEngagements(locale: Locale): Service[] {
  return getServices(locale).filter((service) => service.kind === 'engagement');
}
