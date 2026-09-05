export interface ProcessStep {
  title: string;
  duration: string;
  summary: string;
  outcome: string;
}

/** How an engagement runs, in three steps a client actually experiences. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Brief',
    duration: 'Week 1',
    summary:
      'One call to understand the problem, then a written scope, a fixed price for a standard package or a custom quote, and a launch date within five working days.',
    outcome: 'You know exactly what you will get, when, and for how much.',
  },
  {
    title: 'Build',
    duration: 'Weeks 2-8',
    summary:
      'A working version you can click on every Friday, with a short written update. Change your mind early and it costs nothing.',
    outcome: 'No surprises at the end, because there is no "the end".',
  },
  {
    title: 'Launch',
    duration: 'Launch week and after',
    summary:
      'We ship, monitor it live, fix what breaks and keep maintaining it. Stay on a maintenance plan or take it in-house with full documentation. We do not hand over and disappear.',
    outcome: 'A product that is yours, running, maintained, and ready to grow.',
  },
];

export interface Guarantee {
  title: string;
  body: string;
}

/** Commitments repeated in every proposal. */
export const guarantees: Guarantee[] = [
  {
    title: 'Fixed price',
    body: 'Quoted in writing, per phase. Custom scopes too.',
  },
  { title: 'Fixed date', body: 'Agreed before work starts.' },
  {
    title: 'Maintained after launch',
    body: 'Support, fixes and updates. We stay accountable.',
  },
  { title: 'You own it all', body: 'Code, accounts and designs.' },
  { title: '1 business day', body: 'Reply time on every message.' },
];

export interface Value {
  title: string;
  body: string;
}

export const values: Value[] = [
  {
    title: 'Precision over volume',
    body: 'Feinwerk means fine work. We would rather ship one system that reconciles to the last unit than three that mostly work.',
  },
  {
    title: 'Own the whole problem',
    body: 'Interface, API, data, infrastructure and the emails in between. One team responsible for the outcome, not a layer.',
  },
  {
    title: 'Boring infrastructure',
    body: 'Durable jobs, tested policies and monitoring that alerts before customers notice. Excitement belongs in the product.',
  },
  {
    title: 'Write it down',
    body: 'Decisions and handover notes are documented as we go, so your team can run what we built without us.',
  },
];
