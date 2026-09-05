import { ContactSection } from '@/components/sections/contact-section';
import { FaqSection } from '@/components/sections/faq';
import { GlobalReach } from '@/components/sections/global-reach';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Numbers } from '@/components/sections/numbers';
import { Pricing } from '@/components/sections/pricing';
import { ProjectsTeaser } from '@/components/sections/projects-teaser';
import { ServicesGrid } from '@/components/sections/services-grid';
import { Technologies } from '@/components/sections/technologies';
import { Testimonials } from '@/components/sections/testimonials';

import { getFaqs } from '@/data/faqs';
import { getDictionary } from '@/i18n/server';

export default async function HomePage() {
  const dict = await getDictionary();
  const faqs = getFaqs(dict.locale);

  return (
    <>
      <Hero dict={dict} />
      <Numbers dict={dict} />
      <ProjectsTeaser dict={dict} />
      <ServicesGrid dict={dict} className='fw-band-stone' />
      <Technologies dict={dict} />
      <GlobalReach dict={dict} />
      <HowItWorks dict={dict} />
      <Testimonials dict={dict} />
      <Pricing dict={dict} withLink />
      <FaqSection
        items={faqs.slice(0, 4)}
        kicker={dict.faq.kicker}
        title={dict.faq.title}
        accentWords={[...dict.faq.accent]}
        className='fw-band-stone fw-rule'
      />
      <ContactSection dict={dict} />
    </>
  );
}
