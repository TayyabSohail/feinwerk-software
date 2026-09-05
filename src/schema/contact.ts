import { z } from 'zod';

import { services } from '@/data/services';

export const BUDGET_OPTIONS = [
  { value: 'under-10k', label: 'Under €10k' },
  { value: '10k-25k', label: '€10k - €25k' },
  { value: '25k-50k', label: '€25k - €50k' },
  { value: '50k-100k', label: '€50k - €100k' },
  { value: 'over-100k', label: '€100k+' },
  { value: 'retainer', label: 'Monthly retainer' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;

export const SERVICE_OPTIONS = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: 'other', label: 'Something else' },
] as const;

const budgetValues = BUDGET_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];
const serviceValues = SERVICE_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  name: z
    .string({ message: 'Your name is required' })
    .trim()
    .min(2, 'Please enter your full name')
    .max(100, 'That name is a little long'),
  email: z
    .string({ message: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(200),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  service: z.enum(serviceValues, { message: 'Pick the closest match' }),
  budget: z.enum(budgetValues, { message: 'Pick a range, even a rough one' }),
  message: z
    .string({ message: 'Tell us a little about the project' })
    .trim()
    .min(20, 'A couple of sentences help us reply usefully')
    .max(4000, 'Please keep it under 4,000 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy policy' }),
  }),
  /** Honeypot: must stay empty. Bots fill every field. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
