import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge only knows Tailwind's default font sizes, so the custom
 * `text-display-*` scale from tailwind.config.ts would otherwise be treated
 * as a text colour and dropped whenever `text-foreground` follows it.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display-xl', 'display-lg', 'display-md', 'display-sm'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
