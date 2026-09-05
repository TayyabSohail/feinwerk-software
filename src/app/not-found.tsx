import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/motion/reveal';
import { TextReveal } from '@/components/motion/text-reveal';
import { Button } from '@/components/ui/button';

import { paths } from '@/constants/paths';

export default function NotFound() {
  return (
    <section className='fw-container flex min-h-[80vh] flex-col justify-center pb-20 pt-40'>
      <Reveal>
        <p className='fw-kicker'>Error 404</p>
      </Reveal>
      <TextReveal
        as='h1'
        text='This page was never engineered.'
        accentWords={[4]}
        delay={0.1}
        className='fw-display mt-6 max-w-[14ch] text-display-xl text-foreground'
      />
      <Reveal delay={0.4}>
        <p className='mt-7 max-w-lg text-lg text-muted-foreground'>
          The address may have changed, or the link was wrong. Everything we
          have built is one click away.
        </p>
      </Reveal>
      <Reveal delay={0.5} className='mt-9 flex flex-wrap gap-3'>
        <Link href={paths.home}>
          <Button variant='brand' size='xl' iconLeft={ArrowLeft}>
            Back home
          </Button>
        </Link>
        <Link href={paths.work}>
          <Button variant='outline' size='xl' icon={ArrowUpRight}>
            See the work
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}
