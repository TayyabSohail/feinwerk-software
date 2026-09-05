/**
 * Two favicon frames, dark and light. The tab icon flips between them every
 * five seconds.
 */
const BRAND = '#10b981';
const INK = '#0d0d0d';
const PAPER = '#f5f5f3';

const F_BARS = (fill: string) =>
  `<g fill="${fill}"><rect x="18" y="16" width="9" height="32" rx="1.5"/><rect x="18" y="16" width="28" height="9" rx="1.5"/><rect x="18" y="31" width="20" height="8" rx="1.5"/></g>`;

function frame(plate: string, glyph: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="${plate}"/>${F_BARS(glyph)}<rect x="39" y="39" width="9" height="9" rx="1.5" fill="${BRAND}"/></svg>`;
}

export function faviconFrames(): string[] {
  return [frame(INK, PAPER), frame(PAPER, INK)].map(
    (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`,
  );
}
