'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface GlobeProps {
  className?: string;
  markers?: { location: [number, number]; size: number }[];
}

const DEFAULT_MARKERS: GlobeProps['markers'] = [
  { location: [33.6, 73.07], size: 0.05 }, // Rawalpindi
  { location: [48.81, 9.28], size: 0.05 }, // Fellbach
  { location: [0.35, 32.58], size: 0.03 }, // Kampala
  { location: [40.71, -74.0], size: 0.03 }, // New York
  { location: [42.36, -71.06], size: 0.025 }, // Boston
  { location: [51.5, -0.12], size: 0.025 }, // London
  { location: [25.2, 55.27], size: 0.025 }, // Dubai
];

/**
 * Dotted wireframe globe (cobe), light palette, slow spin, drag to rotate.
 * Markers show the two offices and client locations.
 */
export function Globe({ className, markers = DEFAULT_MARKERS }: GlobeProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const dragStart = useRef<number | null>(null);
  const drift = useRef(0);
  const driftAtStart = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let width = canvas.offsetWidth;
    let phi = 0;
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 18000,
      mapBrightness: 2.4,
      baseColor: [0.6, 0.6, 0.58],
      markerColor: [0.06, 0.72, 0.5],
      glowColor: [0.97, 0.97, 0.96],
      markers,
      opacity: 0.9,
    });

    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * 2, height: width * 2 });
    };
    window.addEventListener('resize', onResize);

    const tick = () => {
      if (!reduce && dragStart.current === null) phi += 0.0035;
      globe.update({ phi: phi + drift.current });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [markers]);

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <canvas
        ref={ref}
        onPointerDown={(event) => {
          dragStart.current = event.clientX;
          driftAtStart.current = drift.current;
        }}
        onPointerUp={() => {
          dragStart.current = null;
        }}
        onPointerLeave={() => {
          dragStart.current = null;
        }}
        onPointerMove={(event) => {
          if (dragStart.current !== null) {
            drift.current =
              driftAtStart.current + (event.clientX - dragStart.current) / 200;
          }
        }}
        className='h-full w-full cursor-grab [contain:layout_paint_size] active:cursor-grabbing'
        aria-label='Globe showing Feinwerk offices and client locations'
      />
    </div>
  );
}
