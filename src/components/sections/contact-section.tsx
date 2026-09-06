import { ContactChannels } from '@/components/contact/contact-channels';
import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';

import { siteConfig } from '@/config/site';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface ContactSectionProps {
  dict: Dictionary;
}

/**
 * The homepage ends on the contact form itself rather than a button to it.
 * Same channels as the contact page (write, or book a call), so someone who
 * has scrolled the whole page can start a brief without another click.
 */
export function ContactSection({ dict }: ContactSectionProps) {
  const t = dict.contact.home;

  return (
    <section
      id='contact'
      data-rail={t.kicker}
      className='fw-section fw-rule fw-band-stone'
    >
      <div className='fw-container max-w-7xl'>
        <ContactChannels
          dict={dict}
          calLink={siteConfig.calLink}
          header={
            <div className='max-w-2xl'>
              <Reveal>
                <p className='fw-kicker'>{t.kicker}</p>
              </Reveal>
              <TextReveal
                as='h2'
                text={t.title}
                accentWords={[...t.accent]}
                className='fw-display mt-4 text-display-md text-foreground'
              />
              <Reveal delay={0.2}>
                <p className='mt-5 max-w-xl text-base leading-relaxed text-muted-foreground'>
                  {t.description}
                </p>
              </Reveal>
            </div>
          }
        />
      </div>
    </section>
  );
}
