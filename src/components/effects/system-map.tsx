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

type Tone = 'paper' | 'ink' | 'brand';

interface Route {
  path: MapNodeId[];
  tone: 'brand' | 'ink';
}

interface Packet {
  id: number;
  route: Route;
}

/** One plate unit on screen: half a cell wide, half a cell tall. */
const UX = 40;
const UY = 20;
/** Tile: top diamond plus a thin edge. */
const TILE_W = 88;
const TILE_H = 44;
const TILE_T = 10;
/** Plate: the cloud everything runs on. */
const PLATE_MIN = -0.45;
const PLATE_MAX = 5.45;
const PLATE_T = 8;
/** Packet: a small cube riding the wires. */
const PKT = 10;
/** Seconds per wire segment. */
const SEG_S = 0.85;
/** Milliseconds between packet launches. */
const LAUNCH_MS = 640;
const MAX_PACKETS = 5;
const ease = [0.16, 1, 0.3, 1] as const;

const NODES: Record<MapNodeId, { x: number; y: number; tone: Tone }> = {
  web: { x: 0, y: 2.5, tone: 'paper' },
  mobile: { x: 2.5, y: 0, tone: 'paper' },
  api: { x: 2.5, y: 2.5, tone: 'ink' },
  db: { x: 2.5, y: 5, tone: 'paper' },
  cloud: { x: 5, y: 2.5, tone: 'paper' },
  ai: { x: 5, y: 5, tone: 'paper' },
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

/** Requests leave the apps in emerald; answers come back in ink. */
const ROUTES: Route[] = [
  { path: ['web', 'api', 'db'], tone: 'brand' },
  { path: ['mobile', 'api', 'cloud', 'ai'], tone: 'brand' },
  { path: ['db', 'api', 'web'], tone: 'ink' },
  { path: ['ai', 'db'], tone: 'ink' },
  { path: ['web', 'api', 'cloud'], tone: 'brand' },
  { path: ['ai', 'cloud', 'api', 'mobile'], tone: 'ink' },
  { path: ['mobile', 'api', 'db'], tone: 'brand' },
  { path: ['cloud', 'api', 'web'], tone: 'ink' },
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
const GRID: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let i = 0; i <= 5; i++) {
  const a = project(i, PLATE_MIN);
  const b = project(i, PLATE_MAX);
  GRID.push({ x1: a.px, y1: a.py, x2: b.px, y2: b.py });
  const c = project(PLATE_MIN, i);
  const d = project(PLATE_MAX, i);
  GRID.push({ x1: c.px, y1: c.py, x2: d.px, y2: d.py });
}
const PLATE = (() => {
  const t = project(PLATE_MIN, PLATE_MIN);
  const r = project(PLATE_MAX, PLATE_MIN);
  const b = project(PLATE_MAX, PLATE_MAX);
  const l = project(PLATE_MIN, PLATE_MAX);
  return {
    top: `${t.px},${t.py} ${r.px},${r.py} ${b.px},${b.py} ${l.px},${l.py}`,
    left: `${l.px},${l.py} ${b.px},${b.py} ${b.px},${b.py + PLATE_T} ${l.px},${l.py + PLATE_T}`,
    right: `${b.px},${b.py} ${r.px},${r.py} ${r.px},${r.py + PLATE_T} ${b.px},${b.py + PLATE_T}`,
  };
})();

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

interface TileProps {
  id: MapNodeId;
  label: string;
  index: number;
  ready: boolean;
  pulse: number;
  reduce: boolean;
}

function Tile({ id, label, index, ready, pulse, reduce }: TileProps) {
  const node = NODES[id];
  const { px, py } = project(node.x, node.y);
  const f = box(px, py - TILE_T, TILE_W / 2, TILE_H / 2, TILE_T);
  return (
    <motion.g
      className='fw-map-tile'
      data-tone={node.tone}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
    >
      <polygon className='fw-map-left' points={f.left} />
      <polygon className='fw-map-right' points={f.right} />
      <polygon className='fw-map-top' points={f.top} />
      {!reduce && pulse > 0 && (
        <motion.polygon
          key={pulse}
          className='fw-map-flash'
          points={f.top}
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
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
  const opacity = useTransform(progress, [0, 0.07, 0.93, 1], [0, 1, 1, 0]);

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

  const f = box(0, -PKT, PKT, PKT / 2, PKT);
  return (
    <motion.g
      className='fw-map-packet'
      data-tone={tone}
      style={{ x, y, opacity }}
    >
      <polygon className='fw-map-left' points={f.left} />
      <polygon className='fw-map-right' points={f.right} />
      <polygon className='fw-map-top' points={f.top} />
    </motion.g>
  );
}

/**
 * The systems we build, running: six labelled tiles on a plate, wired
 * together. Tiles rise in after the preloader, the wires draw, then small
 * boxes travel the wires as requests and answers and each tile flashes as
 * one arrives. Packets only launch while the map is on screen. Reduced
 * motion shows the finished map with nothing moving.
 */
export function SystemMap({ copy, delay = 0.5, className }: SystemMapProps) {
  const reduce = useReducedMotion() === true;
  const rootRef = useRef<HTMLDivElement>(null);
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

  const labels = NODE_ORDER.map((id) => copy.nodes[id]).join(', ');

  return (
    <div
      ref={rootRef}
      role='img'
      aria-label={`${copy.kicker}: ${labels}`}
      className={cn('fw-map', className)}
    >
      <svg
        aria-hidden='true'
        viewBox='-244 -26 488 262'
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

        {packets.map((packet) => (
          <PacketView
            key={packet.id}
            packet={packet}
            onArrive={onArrive}
            onDone={onDone}
          />
        ))}
      </svg>

      <p aria-hidden='true' className='fw-kicker mt-3 text-[10px]'>
        {copy.kicker}
      </p>
    </div>
  );
}
