import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/brand/logo';

import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

/**
 * A deliberately bare shell for the contact page.
 *
 * The site header and footer are rendered by the root layout, so this cannot
 * remove them; instead the page hides them with `data-bare` (see globals.css)
 * and supplies the minimum needed to stay usable: the logo as a way home, and
 * the legal links the footer would otherwise have carried.
 *
 * The point is that once someone has decided to write to us, nothing on the
 * screen competes with the form.
 */
export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary();

  return (
    <div data-bare='true' className='relative min-h-screen bg-background'>
      <div className='fw-container flex h-[4.25rem] items-center justify-between'>
        <Logo />
        <Link
          href={paths.home}
          className='inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-text transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' aria-hidden='true' />
          {dict.notFound.home}
        </Link>
      </div>

      {children}
    </div>
  );
}
