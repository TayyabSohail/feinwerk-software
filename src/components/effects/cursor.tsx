'use client';

import { useEffect } from 'react';

type Mode = 'default' | 'link' | 'text' | 'view';

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  life: number;
  size: number;
  rotation: number;
  spin: number;
  ink: boolean;
}

const TRAIL_MS = 460;
const MAX_TRAIL = 64;
const RING: Record<Mode, number> = {
  default: 17,
  link: 26,
  text: 0,
  view: 38,
};

/**
 * Replaces the native cursor on fine-pointer devices with a square emerald
 * dot, a lagging ring, an emerald ribbon that trails the pointer and small
 * square sparks that fly off at speed. Links grow the ring, text fields turn
 * it into a caret, and `data-cursor="view"` shows a labelled disc.
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
    document.documentElement.classList.add('fw-has-cursor');

    const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue('--brand').trim() || '160 84% 39%';
    const ink = styles.getPropertyValue('--ink').trim() || '0 0% 5%';
    const brandAt = (alpha: number) => `hsl(${brand} / ${alpha})`;
    const inkAt = (alpha: number) => `hsl(${ink} / ${alpha})`;

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
      ringX: -100,
      ringY: -100,
      ring: RING.default,
      ringTarget: RING.default,
      opacity: 0,
      visible: false,
      mode: 'default' as Mode,
      label: '',
      down: false,
      speed: 0,
      lastX: -100,
      lastY: -100,
      lastMove: 0,
    };
    const trail: TrailPoint[] = [];
    const sparks: Spark[] = [];
    let frame = 0;
    let running = false;

    const emit = (count: number, burst: boolean) => {
      if (reduce) return;
      const now = performance.now();
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const magnitude = burst ? 2 + Math.random() * 4 : 0.4 + Math.random() * 1.4;
        sparks.push({
          x: state.x,
          y: state.y,
          vx: Math.cos(angle) * magnitude,
          vy: Math.sin(angle) * magnitude - (burst ? 0 : 0.3),
          born: now,
          life: burst ? 700 + Math.random() * 300 : 420 + Math.random() * 380,
          size: burst ? 3 + Math.random() * 3 : 2 + Math.random() * 2.5,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.3,
          ink: Math.random() < 0.25,
        });
      }
      if (sparks.length > 160) sparks.splice(0, sparks.length - 160);
    };

    const modeFor = (target: EventTarget | null): [Mode, string] => {
      const element = target instanceof Element ? target : null;
      if (!element) return ['default', ''];
      const custom = element.closest<HTMLElement>('[data-cursor]');
      if (custom) {
        const value = custom.dataset.cursor ?? '';
        if (value === 'view' || value.startsWith('view:')) {
          return ['view', value.split(':')[1] ?? 'VIEW'];
        }
      }
      if (element.closest('input, textarea, select, [contenteditable="true"]')) {
        return ['text', ''];
      }
      if (
        element.closest(
          'a, button, [role="button"], label, summary, [data-cursor="link"]',
        )
      ) {
        return ['link', ''];
      }
      return ['default', ''];
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      state.ringX += (state.x - state.ringX) * 0.18;
      state.ringY += (state.y - state.ringY) * 0.18;
      state.ring += (state.ringTarget - state.ring) * 0.16;
      state.opacity += ((state.visible ? 1 : 0) - state.opacity) * 0.14;

      /* Ribbon */
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift();
      if (trail.length > 1 && !reduce) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          const k = 1 - (now - b.t) / TRAIL_MS;
          ctx.strokeStyle = brandAt(k * k * 0.85 * state.opacity);
          ctx.lineWidth = Math.max(0.4, k * k * 7);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      /* Sparks */
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        const age = (now - spark.born) / spark.life;
        if (age >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.96;
        spark.vy *= 0.96;
        spark.rotation += spark.spin;
        const alpha = (1 - age) * 0.9 * state.opacity;
        const size = spark.size * (1 - age * 0.5);
        ctx.save();
        ctx.translate(spark.x, spark.y);
        ctx.rotate(spark.rotation);
        ctx.fillStyle = spark.ink ? inkAt(alpha) : brandAt(alpha);
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }

      const alpha = state.opacity;
      if (alpha > 0.01) {
        const pressed = state.down ? 0.82 : 1;
        if (state.mode === 'text') {
          ctx.fillStyle = inkAt(0.85 * alpha);
          ctx.fillRect(state.x - 1, state.y - 12, 2, 24);
        } else {
          const radius = state.ring * pressed;
          ctx.beginPath();
          ctx.arc(state.ringX, state.ringY, radius, 0, Math.PI * 2);
          if (state.mode === 'view') {
            ctx.fillStyle = brandAt(0.92 * alpha);
            ctx.fill();
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.font =
              '600 9px var(--font-mono, "JetBrains Mono", ui-monospace, monospace)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.letterSpacing = '0.18em';
            ctx.fillText(state.label, state.ringX + 1, state.ringY + 0.5);
          } else if (state.mode === 'link') {
            ctx.fillStyle = brandAt(0.1 * alpha);
            ctx.fill();
            ctx.strokeStyle = brandAt(0.9 * alpha);
            ctx.lineWidth = 1.25;
            ctx.stroke();
          } else {
            ctx.strokeStyle = inkAt(0.45 * alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          if (state.mode !== 'view') {
            const dot = state.mode === 'link' ? 4 : 6;
            ctx.fillStyle = brandAt(alpha);
            ctx.fillRect(state.x - dot / 2, state.y - dot / 2, dot, dot);
          }
        }
      }

      const idle = now - state.lastMove > 1200;
      const settled =
        Math.abs(state.ringX - state.x) < 0.3 &&
        Math.abs(state.ring - state.ringTarget) < 0.2 &&
        Math.abs(state.opacity - (state.visible ? 1 : 0)) < 0.01;
      if (idle && settled && trail.length === 0 && sparks.length === 0) {
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
      const now = performance.now();
      state.x = event.clientX;
      state.y = event.clientY;
      state.visible = true;
      state.lastMove = now;
      const dx = state.x - state.lastX;
      const dy = state.y - state.lastY;
      state.speed = Math.hypot(dx, dy);
      state.lastX = state.x;
      state.lastY = state.y;

      trail.push({ x: state.x, y: state.y, t: now });
      if (trail.length > MAX_TRAIL) trail.shift();
      if (state.speed > 18 && Math.random() < 0.55) emit(1, false);

      const [mode, label] = modeFor(event.target);
      state.mode = mode;
      state.label = label.toUpperCase();
      state.ringTarget = RING[mode];
      start();
    };

    const onDown = () => {
      state.down = true;
      emit(10, true);
      start();
    };
    const onUp = () => {
      state.down = false;
      start();
    };
    const onLeave = () => {
      state.visible = false;
      start();
    };
    const onEnter = () => {
      state.visible = true;
      start();
    };
    const onVisibility = () => {
      if (document.hidden) onLeave();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      document.documentElement.classList.remove('fw-has-cursor');
      canvas.remove();
    };
  }, []);

  return null;
}
