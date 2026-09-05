'use client';

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  type LucideIcon,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { submitContact } from '@/actions/contact';

import { SERVICE_ICONS } from '@/components/sections/services-grid';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { getServiceBySlugLocalised } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { type ContactInput, SERVICE_OPTIONS } from '@/schema/contact';

const FIELD =
  'h-12 rounded-none border-white/20 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/40 focus-visible:ring-brand/60 focus-visible:ring-offset-0';
const MESSAGE_MAX = 4000;

interface ContactFormProps {
  dict: Dictionary;
  defaultService?: string;
}

export function ContactForm({ dict, defaultService }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const t = dict.contactForm;
  const form = useForm<ContactInput>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: defaultService ?? undefined,
      budget: undefined,
      message: '',
      consent: undefined,
      website: '',
    },
  });

  const serviceLabel = (slug: string) =>
    slug === 'other'
      ? t.serviceOther
      : (getServiceBySlugLocalised(slug, dict.locale)?.title ?? slug);
  const serviceTagline = (slug: string) =>
    slug === 'other'
      ? undefined
      : getServiceBySlugLocalised(slug, dict.locale)?.tagline;

  const { execute, isExecuting } = useAction(submitContact, {
    onSuccess: () => {
      setSent(true);
      setStep(0);
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(error.serverError ?? t.errorGeneric);
    },
  });

  if (sent) {
    return (
      <div className='fw-card flex flex-col items-start p-8 sm:p-10'>
        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground'>
          <CheckCircle2 className='h-6 w-6' />
        </span>
        <h3 className='fw-display mt-6 text-display-sm text-foreground'>
          {t.sentTitle}
        </h3>
        <p className='mt-3 max-w-md text-base leading-relaxed text-muted-foreground'>
          {t.sentBody.replace('{time}', siteConfig.responseTime)}
        </p>
        <div className='mt-6'>
          <Button variant='outline' onClick={() => setSent(false)}>
            {t.sentAgain}
          </Button>
        </div>
      </div>
    );
  }

  const messageLength = form.watch('message')?.length ?? 0;
  const consentGiven = form.watch('consent') === true;
  const stepContent = [t.steps.service, t.steps.message, t.steps.details][step];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => execute(values))}
        className='fw-card overflow-hidden bg-ink text-white'
        noValidate
      >
        <div aria-hidden='true' className='absolute -left-[9999px] top-0'>
          <label htmlFor='contact-website'>Website</label>
          <input
            id='contact-website'
            tabIndex={-1}
            autoComplete='off'
            {...form.register('website')}
          />
        </div>

        <div className='px-6 py-8 sm:px-8 lg:px-10 lg:py-10'>
          <div className='flex items-start justify-between gap-6 border-b border-white/15 pb-6'>
            <div>
              <p className='fw-kicker'>
                {t.stepLabel
                  .replace('{current}', String(step + 1))
                  .replace('{total}', '3')}
              </p>
              <h3 className='fw-display mt-3 text-display-sm text-white'>
                {stepContent.title}
              </h3>
              <p className='mt-2 max-w-lg text-sm leading-relaxed text-white/60'>
                {stepContent.subtitle}
              </p>
            </div>
            <p className='hidden max-w-[12rem] text-right text-xs leading-relaxed text-white/60 sm:block'>
              {t.replyNote.replace('{time}', siteConfig.responseTime)}
            </p>
          </div>

          <div className='mt-8'>
            {step === 0 ? (
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>{t.service}</FormLabel>
                    <FormControl>
                      <div className='mt-3 grid sm:grid-cols-2 sm:gap-x-8'>
                        {SERVICE_OPTIONS.map((option) => {
                          const service =
                            option.value === 'other'
                              ? undefined
                              : getServiceBySlugLocalised(
                                  option.value,
                                  dict.locale,
                                );
                          const Icon: LucideIcon = service
                            ? (SERVICE_ICONS[service.icon] as LucideIcon)
                            : Sparkles;
                          return (
                            <ChoiceCard
                              key={option.value}
                              selected={field.value === option.value}
                              onSelect={() => field.onChange(option.value)}
                              icon={Icon}
                              title={serviceLabel(option.value)}
                              description={serviceTagline(option.value)}
                              dark
                            />
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            {step === 1 ? (
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>{t.message}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={9}
                        maxLength={MESSAGE_MAX}
                        placeholder={t.messagePlaceholder}
                        className='mt-3 min-h-[11rem] rounded-none border-white/20 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus-visible:ring-brand/60 focus-visible:ring-offset-0'
                        {...field}
                      />
                    </FormControl>
                    <p className='mt-2 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-white/60'>
                      {messageLength < 20
                        ? t.minChars
                        : t.charactersLeft.replace(
                            '{count}',
                            String(MESSAGE_MAX - messageLength),
                          )}
                    </p>
                  </FormItem>
                )}
              />
            ) : null}

            {step === 2 ? (
              <div className='space-y-6'>
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                  <ContactInputField
                    control={form.control}
                    name='name'
                    label={t.name}
                    placeholder={t.namePlaceholder}
                    autoComplete='name'
                  />
                  <ContactInputField
                    control={form.control}
                    name='email'
                    label={t.email}
                    placeholder={t.emailPlaceholder}
                    autoComplete='email'
                    type='email'
                  />
                  <ContactInputField
                    control={form.control}
                    name='company'
                    label={t.company}
                    placeholder={t.companyPlaceholder}
                    autoComplete='organization'
                    optional
                  />
                </div>
                <FormField
                  control={form.control}
                  name='consent'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-start gap-3'>
                        <FormControl>
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked === true ? true : undefined,
                              )
                            }
                            className='mt-0.5 h-5 w-5 rounded-none border-white/30 data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-foreground'
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal leading-relaxed text-muted-foreground'>
                          {t.consentBefore}{' '}
                          <Link
                            href={paths.legal.privacy}
                            className='text-foreground underline underline-offset-4'
                          >
                            {t.consentLink}
                          </Link>
                          {t.consentAfter}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ) : null}
          </div>

          <div className='mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-muted-foreground sm:hidden'>
              {t.replyNote.replace('{time}', siteConfig.responseTime)}
            </p>
            {step > 0 ? (
              <Button
                type='button'
                variant='ghost'
                iconLeft={ArrowLeft}
                onClick={() => setStep((current) => current - 1)}
              >
                {t.back}
              </Button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <Button
                type='button'
                variant='brand'
                size='xl'
                icon={ArrowUpRight}
                onClick={() => setStep((current) => current + 1)}
              >
                {t.next}
              </Button>
            ) : (
              <Button
                type='submit'
                variant='brand'
                size='xl'
                icon={ArrowUpRight}
                isLoading={isExecuting}
                disabled={!consentGiven}
              >
                {t.submit}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}

function ContactInputField({
  control,
  name,
  label,
  placeholder,
  autoComplete,
  type = 'text',
  optional = false,
}: {
  control: ReturnType<typeof useForm<ContactInput>>['control'];
  name: 'name' | 'email' | 'company';
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {optional ? (
              <span className='font-normal text-white/60'> (optional)</span>
            ) : null}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={FIELD}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function ChoiceCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  description,
  dark = false,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: LucideIcon;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group relative flex min-h-[4.5rem] cursor-pointer items-center gap-3 border-b py-4 pr-9 text-left transition-colors',
        'hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60',
        selected
          ? 'border-brand text-brand'
          : dark
            ? 'border-white/15 text-white'
            : 'border-line text-foreground',
      )}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center border transition-colors',
          selected
            ? 'border-brand bg-brand text-brand-foreground'
            : dark
              ? 'border-white/25 text-white/60 group-hover:border-brand group-hover:text-brand'
              : 'border-line text-muted-foreground group-hover:border-brand group-hover:text-brand-text',
        )}
      >
        <Icon className='h-4 w-4' strokeWidth={1.6} />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='block text-sm font-medium leading-snug'>{title}</span>
        {description ? (
          <span
            className={cn(
              'mt-1 block text-xs leading-snug',
              dark ? 'text-white/60' : 'text-muted-foreground',
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          'absolute right-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center border transition-colors',
          selected
            ? 'border-brand bg-brand text-brand-foreground'
            : dark
              ? 'border-white/25 bg-transparent text-transparent group-hover:border-brand/60'
              : 'border-line bg-transparent text-transparent group-hover:border-brand/60',
        )}
      >
        <Check className='h-3 w-3' strokeWidth={3} />
      </span>
    </button>
  );
}
