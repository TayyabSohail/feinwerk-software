'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  type LucideIcon,
  MessageSquare,
  Sparkles,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { useCallback, useRef, useState } from 'react';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import { getServiceBySlugLocalised } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries/en';
import {
  BUDGET_OPTIONS,
  CONTACT_STEP_COUNT,
  CONTACT_STEP_FIELDS,
  type ContactInput,
  contactSchema,
  SERVICE_OPTIONS,
} from '@/schema/contact';

const FIELD =
  'h-12 rounded-none border-line bg-surface px-4 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0';

const MESSAGE_MAX = 4000;

/** Icons for the budget cards, in the order BUDGET_OPTIONS declares them. */
const BUDGET_ACCENT: Record<string, string> = {
  'under-10k': '25%',
  '10k-25k': '40%',
  '25k-50k': '55%',
  '50k-100k': '70%',
  'over-100k': '90%',
  retainer: '60%',
  unsure: '15%',
};

interface ContactFormProps {
  dict: Dictionary;
  /** Pre-select a service, e.g. when arriving from a service page. */
  defaultService?: string;
}

export function ContactForm({ dict, defaultService }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  /** Direction of travel, so the slide animation matches the button pressed. */
  const [direction, setDirection] = useState(1);
  const cardRef = useRef<HTMLFormElement>(null);
  const t = dict.contactForm;

  const serviceLabel = (slug: string) =>
    slug === 'other'
      ? t.serviceOther
      : (getServiceBySlugLocalised(slug, dict.locale)?.title ?? slug);
  const serviceTagline = (slug: string) =>
    slug === 'other'
      ? undefined
      : getServiceBySlugLocalised(slug, dict.locale)?.tagline;
  const budgetLabel = (value: string | undefined) =>
    value && value in t.budgets
      ? t.budgets[value as keyof typeof t.budgets]
      : '';

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    // onChange runs the whole-form resolver on the first keystroke and lights
    // up errors on steps the visitor has not reached yet. onTouched waits for
    // a blur, and reValidate keeps corrections instant after that.
    mode: 'onTouched',
    reValidateMode: 'onChange',
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

  const { execute, isExecuting } = useAction(submitContact, {
    onSuccess: ({ data }) => {
      // The action only logs when no delivery channel is configured. Do not
      // show a success screen for a message that reached nobody.
      if (!data?.delivered) {
        toast.error(t.errorGeneric);
        return;
      }
      toast.success(t.sentToast.replace('{time}', siteConfig.responseTime));
      setSent(true);
      setStep(0);
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(error.serverError ?? t.errorGeneric);
    },
  });

  /**
   * Bring the top of the card into view when the step changes, so a long
   * step never leaves the visitor stranded halfway down the next one.
   */
  const scrollToTop = useCallback(() => {
    const node = cardRef.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const goNext = useCallback(async () => {
    const fields = CONTACT_STEP_FIELDS[step];
    const valid = await form.trigger(
      fields as unknown as (keyof ContactInput)[],
    );
    if (!valid) return;
    setDirection(1);
    setStep((current) => Math.min(current + 1, CONTACT_STEP_COUNT - 1));
    scrollToTop();
  }, [form, step, scrollToTop]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
    scrollToTop();
  }, [scrollToTop]);

  /** Jump back to a completed step from the rail. Never forwards. */
  const goTo = useCallback(
    (index: number) => {
      if (index >= step) return;
      setDirection(-1);
      setStep(index);
      scrollToTop();
    },
    [step, scrollToTop],
  );

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

  const steps = [t.steps.service, t.steps.message, t.steps.details];
  const active = steps[step];
  const isLast = step === CONTACT_STEP_COUNT - 1;
  const messageLength = form.watch('message')?.length ?? 0;

  return (
    <Form {...form}>
      <form
        ref={cardRef}
        onSubmit={form.handleSubmit((values) => execute(values))}
        className='fw-card overflow-hidden lg:flex lg:items-stretch'
        noValidate
      >
        {/* Honeypot, hidden from people and screen readers. */}
        <div aria-hidden='true' className='absolute -left-[9999px] top-0'>
          <label htmlFor='contact-website'>Website</label>
          <input
            id='contact-website'
            tabIndex={-1}
            autoComplete='off'
            {...form.register('website')}
          />
        </div>

        <StepHeader
          steps={steps}
          step={step}
          label={t.stepLabel
            .replace('{current}', String(step + 1))
            .replace('{total}', String(CONTACT_STEP_COUNT))}
          onJump={goTo}
          note={t.replyNote.replace('{time}', siteConfig.responseTime)}
        />

        <div className='min-w-0 flex-1 px-6 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10 lg:py-10'>
          <div>
            <h3 className='fw-display text-display-sm text-foreground'>
              {active.title}
            </h3>
            <p className='mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground'>
              {active.subtitle}
            </p>
          </div>

          <div className='relative mt-8'>
            <AnimatePresence mode='wait' initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <FormField
                    control={form.control}
                    name='service'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {/* Three across on a wide card: seven services in
                              two columns ran four rows deep and pushed the
                              buttons below the fold. */}
                          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
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
                        <FormMessage className='mt-3' />
                      </FormItem>
                    )}
                  />
                )}

                {step === 1 && (
                  <div className='grid gap-8 lg:grid-cols-2 lg:gap-10'>
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={9}
                              autoFocus
                              maxLength={MESSAGE_MAX}
                              placeholder={t.messagePlaceholder}
                              className='min-h-[11rem] rounded-none border-line bg-surface px-4 py-3 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0'
                              {...field}
                            />
                          </FormControl>
                          <div className='mt-2 flex items-center justify-between'>
                            <FormMessage />
                            <p className='ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>
                              {messageLength < 20
                                ? t.minChars
                                : t.charactersLeft.replace(
                                    '{count}',
                                    String(MESSAGE_MAX - messageLength),
                                  )}
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Budget sits with the brief rather than on a screen of
                        its own: it reads as one more detail about the project
                        instead of a gate to get past. */}
                    <FormField
                      control={form.control}
                      name='budget'
                      render={({ field }) => (
                        <FormItem>
                          <div className='border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0'>
                            <FormLabel className='fw-kicker'>
                              {t.budgetHeading}
                            </FormLabel>
                            <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                              {t.budgetHint}
                            </p>
                            <FormControl>
                              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                                {BUDGET_OPTIONS.map((option) => (
                                  <ChoiceCard
                                    key={option.value}
                                    selected={field.value === option.value}
                                    onSelect={() =>
                                      field.onChange(option.value)
                                    }
                                    icon={Wallet}
                                    title={t.budgets[option.value]}
                                    meter={BUDGET_ACCENT[option.value]}
                                  />
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage className='mt-3' />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className='space-y-5'>
                    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.name}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.namePlaceholder}
                                autoComplete='name'
                                className={FIELD}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.email}</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder={t.emailPlaceholder}
                                autoComplete='email'
                                className={FIELD}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Third in the same row on a wide card, rather than
                          alone on a line of its own. */}
                      <FormField
                        control={form.control}
                        name='company'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t.company}{' '}
                              <span className='font-normal text-muted-foreground'>
                                ({t.optional})
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.companyPlaceholder}
                                autoComplete='organization'
                                className={FIELD}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Summary
                      title={t.reviewTitle}
                      items={[
                        {
                          label: t.service,
                          value: serviceLabel(form.getValues('service') ?? ''),
                        },
                        {
                          label: t.budget,
                          value: budgetLabel(form.getValues('budget')),
                        },
                      ]}
                    />

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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between'>
            {step === 0 ? (
              // The rail carries this note on wide screens; repeat it here
              // only where the rail's foot is hidden.
              <p className='text-xs text-muted-foreground lg:hidden'>
                {t.replyNote.replace('{time}', siteConfig.responseTime)}
              </p>
            ) : (
              <Button
                type='button'
                variant='ghost'
                iconLeft={ArrowLeft}
                onClick={goBack}
              >
                {t.back}
              </Button>
            )}

            {isLast ? (
              <Button
                type='submit'
                variant='brand'
                size='xl'
                icon={ArrowUpRight}
                isLoading={isExecuting}
              >
                {t.submit}
              </Button>
            ) : (
              <Button
                type='button'
                variant='brand'
                size='xl'
                icon={ArrowUpRight}
                onClick={goNext}
              >
                {t.next}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}

interface StepHeaderProps {
  steps: { kicker: string }[];
  step: number;
  label: string;
  /** Revisit a completed step. Steps ahead of the current one stay locked. */
  onJump?: (index: number) => void;
  /** Reassurance shown at the foot of the rail on wide screens. */
  note?: string;
}

/**
 * Numbered rail plus a progress bar that fills as the visitor advances.
 * Sits beside the fields on wide screens, above them on narrow ones.
 */
function StepHeader({ steps, step, label, onJump, note }: StepHeaderProps) {
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className='border-b border-line bg-surface/60 p-6 sm:p-8 lg:flex lg:h-full lg:w-[17rem] lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r'>
      <p className='fw-kicker'>{label}</p>

      {/* A vertical rail on wide screens, a horizontal one on narrow: three
          steps read as a list beside the fields, but as a strip above them. */}
      <ol className='mt-5 flex items-center gap-2 lg:mt-8 lg:flex-col lg:items-stretch lg:gap-0'>
        {steps.map((item, index) => {
          const done = index < step;
          const current = index === step;
          // Only a step already completed can be revisited; jumping ahead
          // would skip the validation that gates each Next.
          const canJump = done && Boolean(onJump);

          return (
            <li
              key={item.kicker}
              className='flex flex-1 items-center gap-2 lg:flex-none lg:flex-col lg:items-stretch lg:gap-0'
            >
              <button
                type='button'
                disabled={!canJump}
                onClick={canJump ? () => onJump?.(index) : undefined}
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-3 text-left transition-colors lg:w-full lg:py-1',
                  canJump ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-[11px] transition-colors duration-300',
                    done && 'border-brand bg-brand text-brand-foreground',
                    current && 'border-brand text-brand-text',
                    !done && !current && 'border-line text-muted-foreground',
                  )}
                >
                  {done ? <Check className='h-4 w-4' /> : index + 1}
                </span>
                <span
                  className={cn(
                    'hidden truncate text-xs sm:block lg:text-sm',
                    current
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground',
                    canJump && 'hover:text-foreground',
                  )}
                >
                  {item.kicker}
                </span>
              </button>

              {/* Connector between the numbers, vertical layout only. */}
              {index < steps.length - 1 ? (
                <span
                  aria-hidden='true'
                  className={cn(
                    'hidden lg:ml-4 lg:block lg:h-6 lg:w-px lg:transition-colors',
                    index < step ? 'lg:bg-brand' : 'lg:bg-line',
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* The bar is the only progress cue left on narrow screens, where the
          step labels are hidden. */}
      <div className='mt-5 h-[3px] w-full bg-line lg:mt-8'>
        <motion.div
          className='h-full bg-brand'
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {note ? (
        <p className='mt-auto hidden pt-8 text-xs leading-relaxed text-muted-foreground lg:block'>
          {note}
        </p>
      ) : null}
    </div>
  );
}

interface ChoiceCardProps {
  selected: boolean;
  onSelect: () => void;
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Width of the small bar drawn under budget cards. */
  meter?: string;
}

/** A large, clickable card that replaces a dropdown option. */
function ChoiceCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  description,
  meter,
}: ChoiceCardProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group relative flex h-full flex-col gap-2 border p-3 pr-8 text-left transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
        selected
          ? 'border-brand bg-brand/[0.06]'
          : 'border-line bg-surface hover:bg-surface',
      )}
    >
      {/* Icon beside the title, not stacked above it: the same choice in
          roughly half the height, so a step fits without scrolling. */}
      <span className='flex items-center gap-2.5'>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-200',
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

      {meter ? (
        <span className='mt-auto block h-1 w-full bg-line'>
          <span
            className={cn(
              'block h-full transition-colors duration-200',
              selected ? 'bg-brand' : 'bg-foreground/20',
            )}
            style={{ width: meter }}
          />
        </span>
      ) : null}

      <span
        className={cn(
          'absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-brand-foreground transition-all duration-200',
          selected ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
        )}
      >
        <Check className='h-3 w-3' strokeWidth={3} />
      </span>
    </button>
  );
}

/** Read-back of the choices made in earlier steps. */
function Summary({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className='border border-line bg-surface p-4'>
      <p className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>
        <MessageSquare className='h-3.5 w-3.5 text-brand-text' />
        {title}
      </p>
      <dl className='mt-3 grid gap-2 sm:grid-cols-2'>
        {items.map((item) => (
          <div key={item.label}>
            <dt className='text-xs text-muted-foreground'>{item.label}</dt>
            <dd className='truncate text-sm text-foreground'>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
