/**
 * Industries the studio has shipped in, each pointing at the case studies
 * that prove it. Names and blurbs live in the dictionaries under
 * `industries.items`, keyed by these ids, so the copy can be translated
 * while the proof stays in one place.
 */
export const INDUSTRY_IDS = [
  'fintech',
  'realEstate',
  'ecommerce',
  'hr',
  'healthcare',
  'recruiting',
  'martech',
  'compliance',
] as const;

export type IndustryId = (typeof INDUSTRY_IDS)[number];

/** Case-study slugs from data/projects.ts that back each industry. */
export const industryProjects: Record<IndustryId, string[]> = {
  fintech: ['vestafi'],
  realEstate: ['vestafi', 'unibid', 'real-estate-management-system'],
  ecommerce: ['anina', 'snobbots'],
  hr: ['bitsmiths-hrm'],
  healthcare: ['ai-physiotherapy'],
  recruiting: ['ai-interview-assistant'],
  martech: ['seomaven'],
  compliance: ['qa-compliance-agent'],
};
