'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { submitContact } from '@/actions/contact';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { siteConfig } from '@/config/site';
import { paths } from '@/constants/paths';
import {
  BUDGET_OPTIONS,
  type ContactInput,
  contactSchema,
  SERVICE_OPTIONS,
} from '@/schema/contact';

const FIELD =
  'h-12 rounded-none border-line bg-surface px-4 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0';

interface ContactFormProps {
  /** Pre-select a service, e.g. when arriving from a service page. */
  defaultService?: string;
}

export function ContactForm({ defaultService }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
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
    onSuccess: () => {
      setSent(true);
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(
        error.serverError ??
          'Something went wrong. Please try again or email us directly.',
      );
    },
  });

  if (sent) {
    return (
      <div className='fw-card flex flex-col items-start p-8 sm:p-10'>
        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground'>
          <CheckCircle2 className='h-6 w-6' />
        </span>
        <h3 className='fw-display mt-6 text-display-sm text-foreground'>
          Message received.
        </h3>
        <p className='mt-3 max-w-md text-base leading-relaxed text-muted-foreground'>
          Thank you. We read every enquiry personally and reply{' '}
          {siteConfig.responseTime}. If it is urgent, WhatsApp is the fastest
          route.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <a
            href={siteConfig.locations[0].whatsapp}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant='outline' icon={ArrowUpRight}>
              Message on WhatsApp
            </Button>
          </a>
          <Button variant='ghost' onClick={() => setSent(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => execute(values))}
        className='fw-card space-y-6 p-6 sm:p-8 lg:p-10'
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

        <div className='grid gap-5 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Jane Doe'
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
                <FormLabel>Work email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='jane@company.com'
                    autoComplete='email'
                    className={FIELD}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company{' '}
                <span className='font-normal text-muted-foreground'>
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Company or product name'
                  autoComplete='organization'
                  className={FIELD}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid gap-5 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='service'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you need?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={FIELD}>
                      <SelectValue placeholder='Choose a service' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='budget'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget range</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={FIELD}>
                      <SelectValue placeholder='Choose a range' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>About the project</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder='What are you building, who is it for, and when does it need to exist?'
                  className='min-h-[9rem] rounded-none border-line bg-surface px-4 py-3 text-[15px] focus-visible:ring-brand/60 focus-visible:ring-offset-0'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                      field.onChange(checked === true ? true : undefined)
                    }
                    className='mt-0.5 h-5 w-5 rounded-none border-line data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-foreground'
                  />
                </FormControl>
                <FormLabel className='text-sm font-normal leading-relaxed text-muted-foreground'>
                  I agree that Feinwerk Software may store and process this
                  enquiry to respond to me, as described in the{' '}
                  <Link
                    href={paths.legal.privacy}
                    className='text-foreground underline underline-offset-4'
                  >
                    privacy policy
                  </Link>
                  .
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs text-muted-foreground'>
            We reply {siteConfig.responseTime}. No newsletters, no drip
            campaigns.
          </p>
          <Button
            type='submit'
            variant='brand'
            size='xl'
            icon={ArrowUpRight}
            isLoading={isExecuting}
          >
            Send enquiry
          </Button>
        </div>
      </form>
    </Form>
  );
}
