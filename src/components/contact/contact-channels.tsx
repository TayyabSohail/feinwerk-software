'use client';

import { ArrowRight, CalendarDays, PenLine } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { CalEmbed } from '@/components/contact/cal-embed';
import { ContactForm } from '@/components/contact/contact-form';

import { cn } from '@/lib/utils';

import type { Dictionary } from '@/i18n/dictionaries/en';

type Channel = 'form' | 'call';

interface ContactChannelsProps {
  dict: Dictionary;
  defaultService?: string;
  /** Cal.com handle; when absent only the form is offered. */
  calHandle: string | null;
  /** Page heading; rendered beside the channel picker so they share a row. */
  header: ReactNode;
}

/**
 * Two ways in, one at a time: write a brief, or take a slot.
 *
 * The picker sits in the column beside the heading rather than under it. The
 * heading is deliberately narrow (long lines read badly), which used to leave
 * the right half of the row empty above a full-width form. Putting the two
 * channels there fills the row and keeps the choice at eye level with the
 * title, where it belongs.
 *
 * A toggle rather than two columns for the panels themselves, because both
 * want the full width: the form's three steps and service cards are cramped
 * at half width, and the calendar is a large grey box until the third-party
 * iframe resolves.
 *
 * The form is the default: it is the only channel that survives Cal.com being
 * unconfigured or blocked, and a written brief is what we need to quote.
 */
export function ContactChannels({
  dict,
  defaultService,
  calHandle,
  header,
}: ContactChannelsProps) {
  const [channel, setChannel] = useState<Channel>('form');
  const t = dict.contact.choose;

  // Without a booking link there is nothing to choose between.
  if (!calHandle) {
    return (
      <>
        {header}
        <ContactForm dict={dict} defaultService={defaultService} />
      </>
    );
  }

  const options = [
    { id: 'form' as const, icon: PenLine, label: t.formTab, hint: t.formHint },
    {
      id: 'call' as const,
      icon: CalendarDays,
      label: t.callTab,
      hint: t.callHint,
    },
  ];

  return (
    <div>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:items-end lg:gap-12'>
        {header}

        <div
          role='tablist'
          aria-orientation='vertical'
          aria-label={t.formTab}
          className='fw-card divide-y divide-line overflow-hidden'
        >
          {options.map((option) => {
            const active = channel === option.id;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                type='button'
                role='tab'
                id={`contact-tab-${option.id}`}
                aria-selected={active}
                aria-controls={`contact-panel-${option.id}`}
                onClick={() => setChannel(option.id)}
                className={cn(
                  'group relative flex w-full items-center gap-4 px-5 py-4 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60',
                  active
                    ? 'bg-brand/[0.06]'
                    : 'bg-surface hover:bg-brand/[0.03]',
                )}
              >
                {/* Brand bar on the active row; the hover state hints at it. */}
                <span
                  aria-hidden='true'
                  className={cn(
                    'absolute inset-y-0 left-0 w-[3px] transition-colors',
                    active
                      ? 'bg-brand'
                      : 'bg-transparent group-hover:bg-brand/30',
                  )}
                />

                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center border transition-colors',
                    active
                      ? 'border-brand bg-brand text-brand-foreground'
                      : 'border-line text-muted-foreground group-hover:border-brand/40',
                  )}
                >
                  <Icon className='h-[18px] w-[18px]' />
                </span>

                <span className='min-w-0 flex-1'>
                  <span className='block text-[15px] font-medium text-foreground'>
                    {option.label}
                  </span>
                  <span className='mt-0.5 block text-sm text-muted-foreground'>
                    {option.hint}
                  </span>
                </span>

                <ArrowRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition-all',
                    active
                      ? 'translate-x-0 text-brand-text opacity-100'
                      : '-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-60',
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Kept mounted rather than unmounted, so switching to the calendar and
          back never discards a half-typed brief. */}
      <div
        role='tabpanel'
        id='contact-panel-form'
        aria-labelledby='contact-tab-form'
        hidden={channel !== 'form'}
        className='mt-8'
      >
        <ContactForm dict={dict} defaultService={defaultService} />
      </div>

      <div
        role='tabpanel'
        id='contact-panel-call'
        aria-labelledby='contact-tab-call'
        hidden={channel !== 'call'}
        className='mt-8'
      >
        {/* Mounted only once asked for, so Cal.com never loads for the
            majority who just fill in the form. */}
        {channel === 'call' && (
          <CalEmbed
            handle={calHandle}
            fallbackLabel={t.calendarLoading}
            bookingUrl={`https://cal.com/${calHandle}`}
            bookingLabel={t.calendarFallback}
            className='fw-card'
          />
        )}
      </div>
    </div>
  );
}
