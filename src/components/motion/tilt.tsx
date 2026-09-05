'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Lift on hover, in pixels. */
  lift?: number;
}

/** Pointer-tracking 3D tilt, the "mockup floats above the page" effect. */
export function Tilt({ children, className, max = 7, lift = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 160,
    damping: 20,
  });
  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, hsl(var(--foreground) / 0.10), transparent 55%)`;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1400 }} className={cn('group', className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        whileHover={{ y: -lift }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className='relative h-full will-change-transform'
      >
        {children}
        <motion.div
          aria-hidden='true'
          style={{ background: glare }}
          className='pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        />
      </motion.div>
    </div>
  );
}
