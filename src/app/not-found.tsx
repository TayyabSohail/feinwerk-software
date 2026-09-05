import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';
import { Button } from '@/components/ui/button';

import { paths } from '@/constants/paths';
import { getDictionary } from '@/i18n/server';

export default async function NotFound() {
  const dict = await getDictionary();
  const t = dict.notFound;

  return (
    <section className='fw-container flex min-h-[80vh] flex-col justify-center pb-20 pt-40'>
      <Reveal>
        <p className='fw-kicker'>{t.kicker}</p>
      </Reveal>
      <TextReveal
        as='h1'
        text={t.title}
        accentWords={[...t.accent]}
        delay={0.1}
        className='fw-display mt-6 max-w-[14ch] text-display-xl text-foreground'
      />
      <Reveal delay={0.4}>
        <p className='mt-7 max-w-lg text-lg text-muted-foreground'>
          {t.body}
        </p>
      </Reveal>
      <Reveal delay={0.5} className='mt-9 flex flex-wrap gap-3'>
        <Link href={paths.home}>
          <Button variant='brand' size='xl' iconLeft={ArrowLeft}>
            {t.home}
          </Button>
        </Link>
        <Link href={paths.work}>
          <Button variant='outline' size='xl' icon={ArrowUpRight}>
            {t.work}
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}
