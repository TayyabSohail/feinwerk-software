import Image from 'next/image';

import { LaptopFrame } from '@/components/mockups/laptop-frame';
import { PhoneFrame } from '@/components/mockups/phone-frame';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';

import type { Project, ProjectGalleryScreen } from '@/data/projects';

interface ProjectGalleryProps {
  project: Project;
  labels: {
    gallery: string;
    galleryTitle: string;
    galleryAnonymised: string;
    galleryMore: string;
    onThePhone: string;
    homeScreen: string;
  };
}

/**
 * The rest of the product: every gallery screen on the same laptop and phone
 * treatment as the hero, so a case study shows the whole product rather than
 * one dashboard. Web products get a laptop per screen and a row of phones;
 * app products get a phone per screen.
 */
export function ProjectGallery({ project, labels }: ProjectGalleryProps) {
  const { gallery } = project;
  if (gallery.length === 0) return null;

  const plateStyle = {
    '--plate-accent': `${project.accent}66`,
  } as React.CSSProperties;
  const isApp = project.platform === 'app';
  const laptops = gallery.filter(
    (screen): screen is ProjectGalleryScreen & { desktop: string } =>
      Boolean(screen.desktop),
  );

  return (
    <section className='fw-container py-16 lg:py-24'>
      <Reveal>
        <p className='fw-kicker'>{labels.gallery}</p>
        <h2 className='fw-display mt-5 text-display-sm text-foreground'>
          {labels.galleryTitle}
        </h2>
        <p className='mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
          {project.anonymised
            ? labels.galleryAnonymised.replace('{title}', project.title)
            : labels.galleryMore
                .replace('{n}', String(gallery.length))
                .replace('{title}', project.title)}
        </p>
      </Reveal>

      {isApp ? (
        <Stagger className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3'>
          {gallery.map((screen) => (
            <StaggerItem key={screen.title}>
              <div className='fw-plate aspect-[4/5]' style={plateStyle}>
                <div className='absolute left-1/2 top-[8%] aspect-[390/844] h-[110%] -translate-x-1/2'>
                  <PhoneFrame className='h-full w-auto shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)]'>
                    <Image
                      src={screen.mobile}
                      alt={`${project.title}: ${screen.title} on a phone`}
                      fill
                      sizes='(min-width: 768px) 20vw, 40vw'
                      className='object-cover object-top'
                    />
                  </PhoneFrame>
                </div>
              </div>
              <Caption screen={screen} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <>
          <Stagger className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {laptops.map((screen) => (
              <StaggerItem key={screen.title}>
                <div className='fw-plate aspect-[16/10]' style={plateStyle}>
                  <div className='absolute inset-x-[7%] top-1/2 -translate-y-1/2'>
                    <LaptopFrame>
                      <Image
                        src={screen.desktop}
                        alt={`${project.title}: ${screen.title} on a laptop`}
                        fill
                        sizes='(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw'
                        className='object-cover object-top'
                      />
                    </LaptopFrame>
                  </div>
                </div>
                <Caption screen={screen} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className='mt-10'>
            <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
              {labels.onThePhone}
            </p>
          </Reveal>
          <Stagger className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {[
              { title: labels.homeScreen, mobile: project.screens.mobile },
              ...gallery,
            ].map((screen) => (
              <StaggerItem key={screen.title}>
                <div className='fw-plate aspect-[4/5]' style={plateStyle}>
                  <div className='absolute left-1/2 top-[8%] aspect-[390/844] h-[110%] -translate-x-1/2'>
                    <PhoneFrame className='h-full w-auto shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)]'>
                      <Image
                        src={screen.mobile}
                        alt={`${project.title}: ${screen.title} on a phone`}
                        fill
                        sizes='(min-width: 640px) 22vw, 45vw'
                        className='object-cover object-top'
                      />
                    </PhoneFrame>
                  </div>
                </div>
                <p className='mt-3 text-sm font-medium text-foreground'>
                  {screen.title}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </>
      )}
    </section>
  );
}

function Caption({ screen }: { screen: ProjectGalleryScreen }) {
  return (
    <div className='mt-4'>
      <p className='text-base font-semibold text-foreground'>{screen.title}</p>
      <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
        {screen.caption}
      </p>
    </div>
  );
}
