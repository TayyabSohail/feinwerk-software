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
  'h-12 rounded-none border-line bg-surface px-4 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0';
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
        className='fw-card overflow-hidden'
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
          <div className='flex items-start justify-between gap-6 border-b border-line pb-6'>
            <div>
              <p className='fw-kicker'>
                {t.stepLabel
                  .replace('{current}', String(step + 1))
                  .replace('{total}', '3')}
              </p>
              <h3 className='fw-display mt-3 text-display-sm text-foreground'>
                {stepContent.title}
              </h3>
              <p className='mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground'>
                {stepContent.subtitle}
              </p>
            </div>
            <p className='hidden max-w-[12rem] text-right text-xs leading-relaxed text-muted-foreground sm:block'>
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
                    <FormLabel>{t.service}</FormLabel>
                    <FormControl>
                      <div className='mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
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
                    <FormLabel>{t.message}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={9}
                        maxLength={MESSAGE_MAX}
                        placeholder={t.messagePlaceholder}
                        className='mt-3 min-h-[11rem] rounded-none border-line bg-surface px-4 py-3 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0'
                        {...field}
                      />
                    </FormControl>
                    <p className='mt-2 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>
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
                              field.onChange(checked === true ? true : undefined)
                            }
                            className='mt-0.5 h-5 w-5 rounded-none border-line data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-foreground'
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
              <span className='font-normal text-muted-foreground'>
                {' '}
                (optional)
              </span>
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
}: {
  selected: boolean;
  onSelect: () => void;
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col gap-2 border p-3 pr-9 text-left transition-all',
        'hover:-translate-y-0.5 hover:border-brand hover:bg-brand/[0.03] hover:shadow-[0_8px_20px_-16px_hsl(var(--ink)/0.45)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
        selected
          ? 'border-brand bg-brand/[0.06]'
          : 'border-line bg-surface',
      )}
    >
      <span className='flex items-center gap-2.5'>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center border',
            selected
              ? 'border-brand bg-brand text-brand-foreground'
              : 'border-line text-brand-text group-hover:border-brand',
          )}
        >
          <Icon className='h-4 w-4' strokeWidth={1.6} />
        </span>
        <span className='block text-sm font-medium leading-snug text-foreground'>
          {title}
        </span>
      </span>
      {description ? (
        <span className='block text-xs leading-snug text-muted-foreground'>
          {description}
        </span>
      ) : null}
      <span
        className={cn(
          'absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
          selected
            ? 'border-brand bg-brand text-brand-foreground'
            : 'border-line bg-surface text-transparent group-hover:border-brand/60',
        )}
      >
        <Check className='h-3 w-3' strokeWidth={3} />
      </span>
    </button>
  );
}
