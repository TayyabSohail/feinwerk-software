'use client';

import { useEffect } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

/* A trail point lives this long, and the line never exceeds this length. */
const TRAIL_MS = 140;
const TRAIL_LENGTH = 28;
const MAX_POINTS = 16;

/* The pointer itself: a plain emerald dot, eight pixels across. */
const DOT_RADIUS = 4;

/**
 * Replaces the native pointer with a plain emerald dot on fine-pointer
 * devices and draws a hairline emerald trail behind it: one pixel wide, a
 * few dozen pixels long at most, and gone within a fraction of a second of
 * the pointer stopping. The dot sits exactly where the pointer is, with no
 * easing. Elements marked `data-cursor="view"` (or `view:LABEL`) get a small
 * label pill beside the dot. Nothing lags, nothing lingers.
 */
export function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('canvas');
    canvas.className = 'fw-cursor';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.remove();
      return;
    }
    const root = document.documentElement;
    root.classList.add('fw-no-cursor');

    const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue('--brand').trim() || '160 84% 39%';
    const brandAt = (alpha: number) => `hsl(${brand} / ${alpha})`;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const state = {
      x: -100,
      y: -100,
      chipX: -100,
      chipY: -100,
      chip: 0,
      chipTarget: 0,
      label: '',
      visible: false,
    };
    const trail: TrailPoint[] = [];
    let frame = 0;
    let running = false;

    const labelFor = (target: EventTarget | null): string => {
      const element = target instanceof Element ? target : null;
      const value =
        element?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      if (value === 'view') return 'VIEW';
      if (value.startsWith('view:')) return value.slice(5).toUpperCase();
      return '';
    };

    /* Walk back from the pointer, drawing at most TRAIL_LENGTH pixels of
       hairline that fades to nothing at the tail. */
    const drawTrail = (now: number) => {
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift();
      if (trail.length < 2) return;

      ctx.lineCap = 'round';
      ctx.lineWidth = 1;

      let remaining = TRAIL_LENGTH;
      for (let i = trail.length - 1; i > 0 && remaining > 0; i--) {
        const head = trail[i];
        const tail = trail[i - 1];
        const dx = tail.x - head.x;
        const dy = tail.y - head.y;
        const length = Math.hypot(dx, dy);
        if (length === 0) continue;

        const usable = Math.min(length, remaining);
        const endX = head.x + (dx * usable) / length;
        const endY = head.y + (dy * usable) / length;
        const from = (remaining / TRAIL_LENGTH) * 0.6;
        const to = ((remaining - usable) / TRAIL_LENGTH) * 0.6;

        const gradient = ctx.createLinearGradient(head.x, head.y, endX, endY);
        gradient.addColorStop(0, brandAt(from));
        gradient.addColorStop(1, brandAt(to));
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        remaining -= usable;
      }
    };

    const drawDot = () => {
      if (!state.visible) return;
      ctx.fillStyle = brandAt(1);
      ctx.beginPath();
      ctx.arc(state.x, state.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawChip = () => {
      const alpha = state.chip;
      if (alpha < 0.02 || !state.label) return;

      ctx.font =
        '600 9px var(--font-mono, "JetBrains Mono", ui-monospace, monospace)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '0.16em';

      const height = 18;
      const radius = height / 2;
      const width = Math.ceil(ctx.measureText(state.label).width) + 16;
      const x = state.chipX + 14;
      const y = state.chipY + 16;

      ctx.fillStyle = brandAt(0.95 * alpha);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(x + radius, y + height);
      ctx.arc(x + radius, y + radius, radius, Math.PI / 2, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillText(state.label, x + 8, y + radius + 0.5);
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const follow = reduce ? 1 : 0.35;
      state.chipX += (state.x - state.chipX) * follow;
      state.chipY += (state.y - state.chipY) * follow;
      state.chip += (state.chipTarget - state.chip) * (reduce ? 1 : 0.2);

      if (!reduce) drawTrail(now);
      drawDot();
      drawChip();

      const chipSettled =
        Math.abs(state.chip - state.chipTarget) < 0.01 &&
        (state.chipTarget === 0 ||
          (Math.abs(state.chipX - state.x) < 0.3 &&
            Math.abs(state.chipY - state.y) < 0.3));
      if (trail.length === 0 && chipSettled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      state.x = event.clientX;
      state.y = event.clientY;
      state.visible = true;
      if (!reduce) {
        trail.push({ x: state.x, y: state.y, t: performance.now() });
        if (trail.length > MAX_POINTS) trail.shift();
      }
      const label = labelFor(event.target);
      if (label) state.label = label;
      state.chipTarget = label ? 1 : 0;
      start();
    };

    const onLeave = () => {
      state.visible = false;
      state.chipTarget = 0;
      start();
    };
    const onVisibility = () => {
      if (document.hidden) onLeave();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      root.classList.remove('fw-no-cursor');
      canvas.remove();
    };
  }, []);

  return null;
}
