'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export type MapNodeId = 'web' | 'mobile' | 'api' | 'db' | 'ai' | 'cloud';

export interface SystemMapCopy {
  kicker: string;
  nodes: Record<MapNodeId, string>;
}

interface SystemMapProps {
  copy: SystemMapCopy;
  /** Seconds after the preloader lifts before the tiles rise. */
  delay?: number;
  className?: string;
}

type TileTone = 'paper' | 'mint' | 'warm' | 'ink';
type CubeTone = 'paper' | 'brand' | 'warm' | 'ink';

interface Route {
  path: MapNodeId[];
  tone: CubeTone;
}

interface Packet {
  id: number;
  route: Route;
}

/** One plate unit on screen: half a cell wide, half a cell tall. */
const UX = 48;
const UY = 24;
/** Tile: top diamond plus a thin edge. */
const TILE_W = 104;
const TILE_H = 52;
const TILE_T = 11;
/** Plate: the cloud everything runs on. Its margin around the tiles shrinks
    as the box narrows (see `useFit`), so the whole plate always fits. */
const PLATE_MARGIN_WIDE = 0.7;
const PLATE_MARGIN_TIGHT = 0.2;
const PLATE_T = 8;
/** Packet: a small cube riding the wires. */
const PKT = 11;
/** Seconds per wire segment. */
const SEG_S = 1.7;
/** Fraction of a route that glows behind a packet. */
const TRAIL = 0.08;
/** Milliseconds between packet launches. */
const LAUNCH_MS = 900;
const MAX_PACKETS = 6;
/** Width of the light band that sweeps the plate, in plate units. */
const BAND_W = 0.32;
/** The whole plate is always in view. As the box narrows the plate margin
    tightens and the labels grow a little, so nothing is cut off and the
    tiles stay legible. Both follow the measured stage width rather than a
    viewport media query, so the map reads the same in the hero column at
    any breakpoint. Box widths the two tunings are made for; between them
    we interpolate. */
const CROP_WIDE = 620;
const CROP_TIGHT = 340;
/** Label size in SVG units at the wide and tight tunings. */
const LABEL_WIDE = 11;
const LABEL_TIGHT = 13.5;
/** Breathing room around the plate inside the viewBox. */
const VIEW_PAD = 10;
const ease = [0.16, 1, 0.3, 1] as const;

const NODES: Record<MapNodeId, { x: number; y: number; tone: TileTone }> = {
  web: { x: 0, y: 2.5, tone: 'mint' },
  mobile: { x: 2.5, y: 0, tone: 'mint' },
  api: { x: 2.5, y: 2.5, tone: 'ink' },
  db: { x: 2.5, y: 5, tone: 'paper' },
  cloud: { x: 5, y: 2.5, tone: 'paper' },
  ai: { x: 5, y: 5, tone: 'warm' },
};

/** Back to front, so tiles paint in the right order. */
const NODE_ORDER: MapNodeId[] = ['web', 'mobile', 'api', 'db', 'cloud', 'ai'];

const EDGES: [MapNodeId, MapNodeId][] = [
  ['web', 'api'],
  ['mobile', 'api'],
  ['api', 'db'],
  ['api', 'cloud'],
  ['db', 'ai'],
  ['cloud', 'ai'],
];

/** Requests leave the apps in emerald, answers come back in ink, and
    whatever the model produces travels in orange. */
const ROUTES: Route[] = [
  { path: ['web', 'api', 'db'], tone: 'brand' },
  { path: ['mobile', 'api', 'cloud', 'ai'], tone: 'brand' },
  { path: ['db', 'api', 'web'], tone: 'ink' },
  { path: ['ai', 'db'], tone: 'warm' },
  { path: ['web', 'api', 'cloud'], tone: 'brand' },
  { path: ['ai', 'cloud', 'api', 'mobile'], tone: 'warm' },
  { path: ['mobile', 'api', 'db'], tone: 'brand' },
  { path: ['cloud', 'api', 'web'], tone: 'ink' },
  { path: ['db', 'ai'], tone: 'ink' },
  { path: ['ai', 'cloud', 'api', 'web'], tone: 'warm' },
];

/** Spare blocks resting in the empty plate corners; they bob in place. */
const BLOCKS: {
  x: number;
  y: number;
  size: number;
  tone: CubeTone;
  duration: number;
  delay: number;
}[] = [
  { x: 0.75, y: 0.75, size: 14, tone: 'paper', duration: 3.6, delay: 0 },
  { x: 1.45, y: 0.3, size: 9, tone: 'brand', duration: 3.1, delay: 0.8 },
  { x: 5.05, y: 0.35, size: 12, tone: 'warm', duration: 3.9, delay: 0.4 },
  { x: 4.4, y: 0.95, size: 9, tone: 'paper', duration: 3.3, delay: 1.4 },
  { x: 0.35, y: 4.4, size: 12, tone: 'paper', duration: 3.7, delay: 1.0 },
  { x: 0.95, y: 5.05, size: 9, tone: 'brand', duration: 3.0, delay: 0.2 },
];

const project = (x: number, y: number) => ({
  px: (x - y) * UX,
  py: (x + y) * UY,
});

const diamond = (cx: number, cy: number, hw: number, hh: number) =>
  `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;

/** Three faces of a box whose top diamond is centred on (cx, cy). */
function box(cx: number, cy: number, hw: number, hh: number, t: number) {
  return {
    top: diamond(cx, cy, hw, hh),
    left: `${cx - hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + t} ${cx - hw},${cy + t}`,
    right: `${cx},${cy + hh} ${cx + hw},${cy} ${cx + hw},${cy + t} ${cx},${cy + hh + t}`,
  };
}

/** Screen point at fraction `p` along a route. */
function along(path: MapNodeId[], p: number) {
  const segs = path.length - 1;
  const s = Math.min(segs - 1e-6, Math.max(0, p * segs));
  const i = Math.floor(s);
  const t = s - i;
  const a = project(NODES[path[i]].x, NODES[path[i]].y);
  const b = project(NODES[path[i + 1]].x, NODES[path[i + 1]].y);
  return { x: a.px + (b.px - a.px) * t, y: a.py + (b.py - a.py) * t };
}

/** Plate grid lines at whole units. */
function gridAt(margin: number) {
  const min = -margin;
  const max = 5 + margin;
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i <= 5; i++) {
    const a = project(i, min);
    const b = project(i, max);
    lines.push({ x1: a.px, y1: a.py, x2: b.px, y2: b.py });
    const c = project(min, i);
    const d = project(max, i);
    lines.push({ x1: c.px, y1: c.py, x2: d.px, y2: d.py });
  }
  return lines;
}
function plateAt(margin: number) {
  const min = -margin;
  const max = 5 + margin;
  const t = project(min, min);
  const r = project(max, min);
  const b = project(max, max);
  const l = project(min, max);
  return {
    top: `${t.px},${t.py} ${r.px},${r.py} ${b.px},${b.py} ${l.px},${l.py}`,
    left: `${l.px},${l.py} ${b.px},${b.py} ${b.px},${b.py + PLATE_T} ${l.px},${l.py + PLATE_T}`,
    right: `${b.px},${b.py} ${r.px},${r.py} ${r.px},${r.py + PLATE_T} ${b.px},${b.py + PLATE_T}`,
  };
}
/** The sweep band at the plate's left edge, and how far it travels. */
function bandAt(margin: number) {
  const min = -margin;
  const max = 5 + margin;
  const a = project(min, min);
  const b = project(min, max);
  const c = project(min + BAND_W, max);
  const d = project(min + BAND_W, min);
  const travel = max - min - BAND_W;
  return {
    points: `${a.px},${a.py} ${b.px},${b.py} ${c.px},${c.py} ${d.px},${d.py}`,
    dx: travel * UX,
    dy: travel * UY,
  };
}
/** A viewBox that encloses the whole plate, with a little padding. */
function viewBoxAt(margin: number) {
  const min = -margin;
  const max = 5 + margin;
  const left = project(min, max).px - VIEW_PAD;
  const right = project(max, min).px + VIEW_PAD;
  const top = project(min, min).py - VIEW_PAD;
  const bottom = project(max, max).py + PLATE_T + VIEW_PAD;
  return [left, top, right - left, bottom - top].map(Math.round).join(' ');
}

/**
 * Resolves once the first-load preloader has lifted its curtain (it keeps
 * `lenis-stopped` on the root element while it runs), or immediately when
 * no preloader is active.
 */
function waitForCurtain(): Promise<void> {
  const root = document.documentElement;
  if (!root.classList.contains('lenis-stopped')) return Promise.resolve();
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (root.classList.contains('lenis-stopped')) return;
      observer.disconnect();
      resolve();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  });
}

/** 0 at the wide tuning, 1 at the tight one, for a rendered width. */
function tightnessAt(width: number) {
  return Math.min(
    1,
    Math.max(0, (CROP_WIDE - width) / (CROP_WIDE - CROP_TIGHT)),
  );
}

interface Fit {
  margin: number;
  label: number;
}

/**
 * The plate margin and label size for the map's current rendered width:
 * roomy once the box is wide, tightening as it narrows so the whole plate
 * still fits. Holds the wide tuning until the box has been measured, so
 * server and first client paint agree.
 */
function useFit(ref: React.RefObject<HTMLElement | null>): Fit {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  const t = tightnessAt(width > 0 ? width : CROP_WIDE);
  return {
    margin: PLATE_MARGIN_WIDE + (PLATE_MARGIN_TIGHT - PLATE_MARGIN_WIDE) * t,
    label: LABEL_WIDE + (LABEL_TIGHT - LABEL_WIDE) * t,
  };
}

interface CubeProps {
  tone: CubeTone;
  size: number;
  className?: string;
}

/** A small cube standing on the point (0, 0) of its parent group. */
function Cube({ tone, size, className }: CubeProps) {
  const f = box(0, -size, size, size / 2, size);
  return (
    <g className={cn('fw-map-cube', className)} data-tone={tone}>
      <polygon className='fw-map-left' points={f.left} />
      <polygon className='fw-map-right' points={f.right} />
      <polygon className='fw-map-top' points={f.top} />
    </g>
  );
}

interface TileProps {
  id: MapNodeId;
  label: string;
  index: number;
  ready: boolean;
  pulse: number;
  reduce: boolean;
}

/** Offsets from the tile centre; the sparks start at the top edge and rise. */
const SPARKS = [
  { dx: -24, dy: -14, delay: 0 },
  { dx: 0, dy: -24, delay: 0.05 },
  { dx: 24, dy: -14, delay: 0.1 },
];

function Tile({ id, label, index, ready, pulse, reduce }: TileProps) {
  const node = NODES[id];
  const { px, py } = project(node.x, node.y);
  const f = box(px, py - TILE_T, TILE_W / 2, TILE_H / 2, TILE_T);
  const live = ready && !reduce;
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
    >
      <polygon
        className='fw-map-shadow'
        points={diamond(px, py + 5, TILE_W / 2 + 3, TILE_H / 2 + 1.5)}
      />
      <motion.g
        className='fw-map-tile'
        data-tone={node.tone}
        animate={live ? { y: [0, -2.5, 0] } : undefined}
        transition={{
          duration: 3.8 + index * 0.35,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1 + index * 0.45,
        }}
      >
        <polygon className='fw-map-left' points={f.left} />
        <polygon className='fw-map-right' points={f.right} />
        <polygon className='fw-map-top' points={f.top} />
        {!reduce && pulse > 0 && (
          <g key={pulse}>
            <motion.polygon
              className='fw-map-flash'
              points={f.top}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {SPARKS.map((s, i) => (
              <motion.rect
                key={i}
                className='fw-map-spark'
                x={px + s.dx - 2.5}
                y={py - TILE_T + s.dy - 2.5}
                width={5}
                height={5}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -22 - i * 4 }}
                transition={{ duration: 0.75, ease: 'easeOut', delay: s.delay }}
              />
            ))}
          </g>
        )}
        <text
          className='fw-map-label'
          x={px}
          y={py - TILE_T}
          textAnchor='middle'
          dominantBaseline='central'
        >
          {label}
        </text>
      </motion.g>
    </motion.g>
  );
}

interface PacketViewProps {
  packet: Packet;
  onArrive: (id: MapNodeId) => void;
  onDone: (id: number) => void;
}

function PacketView({ packet, onArrive, onDone }: PacketViewProps) {
  const { path, tone } = packet.route;
  const segs = path.length - 1;
  const progress = useMotionValue(0);
  const reached = useRef(0);
  const x = useTransform(progress, (p) => along(path, p).x);
  const y = useTransform(progress, (p) => along(path, p).y);
  const tx = useTransform(
    progress,
    (p) => along(path, Math.max(0, p - TRAIL)).x,
  );
  const ty = useTransform(
    progress,
    (p) => along(path, Math.max(0, p - TRAIL)).y,
  );
  const opacity = useTransform(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  useMotionValueEvent(progress, 'change', (v) => {
    const idx = Math.min(segs, Math.floor(v * segs + 1e-4));
    while (reached.current < idx) {
      reached.current += 1;
      onArrive(path[reached.current]);
    }
  });

  useEffect(() => {
    let cancelled = false;
    const controls = animate(progress, 1, {
      duration: segs * SEG_S,
      ease: 'linear',
    });
    controls.then(() => {
      if (!cancelled) onDone(packet.id);
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [progress, segs, packet.id, onDone]);

  return (
    <motion.g style={{ opacity }}>
      <motion.line
        className='fw-map-trail'
        data-tone={tone}
        x1={tx}
        y1={ty}
        x2={x}
        y2={y}
      />
      <motion.g style={{ x, y }}>
        <Cube tone={tone} size={PKT} />
      </motion.g>
    </motion.g>
  );
}

/**
 * The systems we build, running: six labelled tiles on a plate, wired
 * together. Tiles rise in after the preloader, the wires draw, then small
 * boxes travel the wires as requests and answers, leaving a glow behind
 * them; each tile flashes and throws sparks as one arrives. Spare blocks
 * bob in the plate corners and a band of light sweeps the plate now and
 * then. Packets only launch while the map is on screen. Reduced motion
 * shows the finished map with nothing moving.
 */
export function SystemMap({ copy, delay = 0.5, className }: SystemMapProps) {
  const reduce = useReducedMotion() === true;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fit = useFit(stageRef);
  const viewBox = viewBoxAt(fit.margin);
  const PLATE = plateAt(fit.margin);
  const GRID = gridAt(fit.margin);
  const BAND = bandAt(fit.margin);
  const inView = useInView(rootRef, { amount: 0.4 });
  const inViewRef = useRef(false);
  inViewRef.current = inView;

  const [ready, setReady] = useState(false);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [pulses, setPulses] = useState<Record<MapNodeId, number>>({
    web: 0,
    mobile: 0,
    api: 0,
    db: 0,
    cloud: 0,
    ai: 0,
  });

  const onArrive = useCallback((id: MapNodeId) => {
    setPulses((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }, []);
  const onDone = useCallback((id: number) => {
    setPackets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }
    let cancelled = false;
    let timer = 0;
    let next = 0;
    let nextId = 1;
    (async () => {
      await waitForCurtain();
      await new Promise((r) => window.setTimeout(r, delay * 1000));
      if (cancelled) return;
      setReady(true);
      await new Promise((r) => window.setTimeout(r, 1300));
      if (cancelled) return;
      timer = window.setInterval(() => {
        if (!inViewRef.current) return;
        const route = ROUTES[next % ROUTES.length];
        next += 1;
        const id = nextId++;
        setPackets((prev) =>
          prev.length >= MAX_PACKETS ? prev : [...prev, { id, route }],
        );
      }, LAUNCH_MS);
    })();
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [reduce, delay]);

  const live = ready && !reduce;
  const labels = NODE_ORDER.map((id) => copy.nodes[id]).join(', ');

  return (
    <div
      ref={rootRef}
      role='img'
      aria-label={`${copy.kicker}: ${labels}`}
      className={cn('fw-map', className)}
      style={{ '--fw-map-label': `${fit.label}px` } as React.CSSProperties}
    >
      {/* Full-bleed below lg (`.fw-map-stage`) so the plate gets the whole
          screen width; the viewBox always encloses it, so nothing is cut. */}
      <div ref={stageRef} className='fw-map-stage'>
        <svg
          aria-hidden='true'
          viewBox={viewBox}
          className='block h-auto w-full overflow-visible'
        >
          <g className='fw-map-plate'>
            <polygon className='fw-map-plate-side' points={PLATE.left} />
            <polygon className='fw-map-plate-side' points={PLATE.right} />
            <polygon className='fw-map-plate-top' points={PLATE.top} />
            <g className='fw-map-grid'>
              {GRID.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
            <motion.polygon
              className='fw-map-sweep'
              points={BAND.points}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={
                live
                  ? { x: [0, BAND.dx], y: [0, BAND.dy], opacity: [0.7, 0.7] }
                  : undefined
              }
              transition={{
                duration: 5.5,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 4,
                delay: 2.5,
              }}
            />
          </g>

          <g>
            {EDGES.map(([a, b], i) => {
              const pa = project(NODES[a].x, NODES[a].y);
              const pb = project(NODES[b].x, NODES[b].y);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  className='fw-map-edge'
                  x1={pa.px}
                  y1={pa.py}
                  x2={pb.px}
                  y2={pb.py}
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
                  transition={{ duration: 0.6, ease, delay: 0.55 + i * 0.08 }}
                />
              );
            })}
          </g>

          {BLOCKS.map((b, i) => {
            const { px, py } = project(b.x, b.y);
            return (
              <motion.g
                key={i}
                initial={reduce ? false : { opacity: 0 }}
                animate={ready ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.08 }}
              >
                <polygon
                  className='fw-map-shadow'
                  points={diamond(px, py + 2, b.size + 2, b.size / 2 + 1)}
                />
                <motion.g
                  style={{ x: px, y: py }}
                  animate={live ? { y: [py, py - 6, py] } : undefined}
                  transition={{
                    duration: b.duration,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: b.delay,
                  }}
                >
                  <Cube tone={b.tone} size={b.size} className='fw-map-block' />
                </motion.g>
              </motion.g>
            );
          })}

          {packets.map((packet) => (
            <PacketView
              key={packet.id}
              packet={packet}
              onArrive={onArrive}
              onDone={onDone}
            />
          ))}

          {NODE_ORDER.map((id, i) => (
            <Tile
              key={id}
              id={id}
              label={copy.nodes[id]}
              index={i}
              ready={ready}
              pulse={pulses[id]}
              reduce={reduce}
            />
          ))}
        </svg>
      </div>

      <p aria-hidden='true' className='fw-kicker mt-3 text-[10px]'>
        {copy.kicker}
      </p>
    </div>
  );
}
