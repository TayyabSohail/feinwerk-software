import { CalendarDays } from 'lucide-react';

import { Logo } from '@/components/brand/logo';
import { MobileMenu } from '@/components/layout/mobile-menu';

import { siteConfig } from '@/config/site';
import { getDictionary } from '@/i18n/server';

/**
 * A deliberately bare shell for the contact page.
 *
 * The site header and footer are rendered by the root layout, so this cannot
 * remove them; instead the page hides them with `data-bare` (see globals.css)
 * and supplies the minimum needed to stay usable: the logo as a way home and
 * the hamburger menu, shown at every width here since there is no other nav.
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
        {/* Mark only on narrow phones: the wordmark, the booking button and
            the hamburger do not all fit in 360px, least of all in German. */}
        <Logo wordmarkClassName='hidden sm:block' />
        <div className='flex shrink-0 items-center gap-3'>
          {siteConfig.calLink ? (
            <a
              href={siteConfig.calLink}
              target='_blank'
              rel='noopener noreferrer'
              className='fw-btn fw-btn-primary inline-flex h-10 items-center gap-2 px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] sm:px-5'
            >
              <CalendarDays
                className='hidden h-4 w-4 sm:block'
                aria-hidden='true'
              />
              {dict.nav.bookCall}
            </a>
          ) : null}
          <MobileMenu dict={dict} className='' />
        </div>
      </div>

      {children}
    </div>
  );
}
