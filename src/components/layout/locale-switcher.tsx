'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { setLocale } from '@/actions/locale';

import { Flag } from '@/components/brand/flags';

import { cn } from '@/lib/utils';

import { type Locale, LOCALES } from '@/i18n/config';

interface LocaleSwitcherProps {
  current: Locale;
  label: string;
  className?: string;
}

const FLAG_FOR: Record<Locale, string> = { en: 'GB', de: 'DE' };
const NAME_FOR: Record<Locale, string> = { en: 'English', de: 'Deutsch' };

/** Two flags. The active one is framed; the other is dimmed until hover. */
export function LocaleSwitcher({
  current,
  label,
  className,
}: LocaleSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (locale: Locale) => {
    if (locale === current) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  };

  return (
    <div
      role='group'
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-1',
        pending && 'opacity-60',
        className,
      )}
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type='button'
          onClick={() => choose(locale)}
          aria-pressed={locale === current}
          aria-label={NAME_FOR[locale]}
          title={NAME_FOR[locale]}
          lang={locale}
          className={cn(
            'flex h-9 w-11 items-center justify-center border transition-all duration-300',
            locale === current
              ? 'border-ink/60 bg-white'
              : 'border-transparent opacity-45 hover:border-ink/30 hover:opacity-100',
          )}
        >
          <Flag countryCode={FLAG_FOR[locale]} className='h-3.5 w-[21px]' />
        </button>
      ))}
    </div>
  );
}
