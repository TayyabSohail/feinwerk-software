'use client';

import { CalendarDays, PenLine } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { CalEmbed } from '@/components/contact/cal-embed';
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
 * Only the selected channel is mounted. This keeps the booking widget from
 * competing with the project form and avoids loading Cal.com unnecessarily.
 */
export function ContactChannels({
  dict,
  defaultService,
  calLink,
  header,
}: ContactChannelsProps) {
  const t = dict.contact.choose;
  const [channel, setChannel] = useState<'form' | 'calendar'>('form');

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
      <div className='grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:items-end lg:gap-12'>
        {header}

        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setChannel('form')}
            aria-pressed={channel === 'form'}
            className={`inline-flex h-12 items-center gap-2 rounded-full border px-5 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${
              channel === 'form'
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-line bg-surface text-foreground hover:border-brand hover:text-brand-text'
            }`}
          >
            <PenLine className='h-4 w-4' />
            {t.formTab}
          </button>

          <button
            type='button'
            onClick={() => setChannel('calendar')}
            aria-pressed={channel === 'calendar'}
            className={`inline-flex h-12 items-center gap-2 rounded-full border px-5 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${
              channel === 'calendar'
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-line bg-surface text-foreground hover:border-brand hover:text-brand-text'
            }`}
          >
            <CalendarDays className='h-4 w-4' />
            {t.callTab}
          </button>
        </div>
      </div>

      {channel === 'calendar' ? (
        <div
          id='contact-calendar'
          className='mt-8 overflow-hidden border border-line bg-ink'
        >
          <CalEmbed calLink={calLink} />
        </div>
      ) : (
        <div id='contact-form' className='mt-6 sm:mt-8'>
          <ContactForm dict={dict} defaultService={defaultService} />
        </div>
      )}
    </div>
  );
}
