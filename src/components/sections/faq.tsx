import { SectionHeading } from '@/components/common/section-heading';
import { Reveal } from '@/components/motion/reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { cn } from '@/lib/utils';

import type { Faq } from '@/data/faqs';

interface FaqSectionProps {
  items: Faq[];
  kicker?: string;
  title?: string;
  accentWords?: number[];
  description?: string;
  className?: string;
}

export function FaqSection({
  items,
  kicker = 'Questions',
  title = 'Answers before you ask.',
  accentWords = [2],
  description,
  className,
}: FaqSectionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section className={cn('fw-section', className)}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='fw-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]'>
        <SectionHeading
          kicker={kicker}
          title={title}
          accentWords={accentWords}
          description={description}
          className='md:grid-cols-1 lg:sticky lg:top-32 lg:self-start'
        />
        <Reveal className='fw-card px-6 sm:px-8'>
          <Accordion type='single' collapsible className='divide-y divide-line'>
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className='border-b-0'
              >
                <AccordionTrigger className='py-6 text-left text-lg font-medium tracking-tight hover:no-underline [&[data-state=open]]:text-brand-text'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='pb-7 text-base leading-relaxed text-muted-foreground'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
