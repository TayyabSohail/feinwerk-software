import { ArrowUpRight, CalendarDays, PenLine } from 'lucide-react';
import type { ReactNode } from 'react';

import { ContactForm } from '@/components/contact/contact-form';

import type { Dictionary } from '@/i18n/dictionaries/en';

interface ContactChannelsProps {
  dict: Dictionary;
  defaultService?: string;
  /** Cal.com booking URL; when absent only the form is offered. */
  calLink: string | null;
  /** Page heading; rendered beside the channel picker so they share a row. */
  header: ReactNode;
}

/**
 * Two ways in: write a brief, or take a slot.
 *
 * The picker sits in the column beside the heading rather than under it. The
 * heading is deliberately narrow (long lines read badly), which used to leave
 * the right half of the row empty above a full-width form. Putting the two
 * channels there fills the row and keeps the choice at eye level with the
 * title, where it belongs.
 *
 * "Book a call" is a plain link to Cal.com in a new tab. An inline embed was
 * tried and dropped: Cal's embed script sat on a blank card for many visitors
 * (blocked scripts, Cloudflare challenges), which is worse than a link that
 * always works. It also keeps Cal.com off this page entirely, which is what
 * the privacy policy promises.
 *
 * The form is always shown: it is the only channel that survives Cal.com being
 * unconfigured, and a written brief is what we need to quote.
 */
export function ContactChannels({
  dict,
  defaultService,
  calLink,
  header,
}: ContactChannelsProps) {
  const t = dict.contact.choose;

  // Without a booking link there is nothing to choose between.
  if (!calLink) {
    return (
      <>
        {header}
        <ContactForm dict={dict} defaultService={defaultService} />
      </>
    );
  }

  return (
    <div>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:items-end lg:gap-12'>
        {header}

        <div className='fw-card divide-y divide-line overflow-hidden'>
          {/* Current channel: the form below. Static, so it reads as "you are
              here" rather than a second button that does nothing. */}
          <div className='relative flex w-full items-center gap-4 bg-brand/[0.06] px-5 py-4 text-left'>
            <span
              aria-hidden='true'
              className='absolute inset-y-0 left-0 w-[3px] bg-brand'
            />
            <span className='flex h-10 w-10 shrink-0 items-center justify-center border border-brand bg-brand text-brand-foreground'>
              <PenLine className='h-[18px] w-[18px]' />
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block text-[15px] font-medium text-foreground'>
                {t.formTab}
              </span>
              <span className='mt-0.5 block text-sm text-muted-foreground'>
                {t.formHint}
              </span>
            </span>
          </div>

          <a
            href={calLink}
            target='_blank'
            rel='noreferrer'
            className='group relative flex w-full items-center gap-4 bg-surface px-5 py-4 text-left transition-colors hover:bg-brand/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60'
          >
            {/* Brand bar appears on hover, matching the active row above. */}
            <span
              aria-hidden='true'
              className='absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors group-hover:bg-brand/30'
            />
            <span className='flex h-10 w-10 shrink-0 items-center justify-center border border-line text-muted-foreground transition-colors group-hover:border-brand/40'>
              <CalendarDays className='h-[18px] w-[18px]' />
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block text-[15px] font-medium text-foreground'>
                {t.callTab}
              </span>
              <span className='mt-0.5 block text-sm text-muted-foreground'>
                {t.callHint}
              </span>
            </span>
            <ArrowUpRight className='h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60' />
          </a>
        </div>
      </div>

      <div className='mt-8'>
        <ContactForm dict={dict} defaultService={defaultService} />
      </div>
    </div>
  );
}
