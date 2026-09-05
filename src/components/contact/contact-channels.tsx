'use client';

import { CalendarDays, PenLine } from 'lucide-react';
import { useState } from 'react';

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
}

/**
 * Two ways in, one at a time: write a brief, or take a slot.
 *
 * A toggle rather than two columns, because both panels want the full width.
 * The form's three steps and service cards are cramped at half width, and the
 * calendar is a large grey box until the third-party iframe resolves, which is
 * not what should greet someone beside the form.
 *
 * The form is the default: it is the only channel that survives Cal.com being
 * unconfigured or blocked, and a written brief is what we need to quote.
 */
export function ContactChannels({
  dict,
  defaultService,
  calHandle,
}: ContactChannelsProps) {
  const [channel, setChannel] = useState<Channel>('form');
  const t = dict.contact.choose;

  // Without a booking link there is nothing to choose between.
  if (!calHandle) {
    return <ContactForm dict={dict} defaultService={defaultService} />;
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
      <div role='tablist' aria-label={t.formTab} className='grid gap-3 sm:grid-cols-2'>
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
                'flex items-start gap-3 border p-4 text-left transition-colors',
                active
                  ? 'border-brand bg-brand/5'
                  : 'border-line bg-surface hover:border-brand/40',
              )}
            >
              <Icon
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0',
                  active ? 'text-brand-text' : 'text-muted-foreground',
                )}
              />
              <span>
                <span className='block text-[15px] font-medium text-foreground'>
                  {option.label}
                </span>
                <span className='mt-0.5 block text-sm text-muted-foreground'>
                  {option.hint}
                </span>
              </span>
            </button>
          );
        })}
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
            className='border border-line'
          />
        )}
      </div>
    </div>
  );
}
