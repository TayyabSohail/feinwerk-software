/**
 * Regenerates the device captures in /public/work/screens.
 *
 * Every project shows real screens on its laptop and phone mockups, plus a
 * gallery of further screens on its case-study page. Products with a public
 * URL are captured live; everything else is rendered from the HTML mock
 * screens in scripts/screens/ (one file per screen, shared base.css).
 * Desktop captures are 1152x720 CSS px at 1.875x (2160x1350), phones
 * 390x844 at 2x (780x1688).
 *
 * File naming, per project slug:
 *   <slug>-desktop.webp / <slug>-mobile.webp         the `main` screen
 *   <slug>-<id>-desktop.webp / <slug>-<id>-mobile.webp  every other screen
 * App projects (phones only):
 *   <slug>-mobile.webp, <slug>-alt.webp, <slug>-<id>-mobile.webp
 *
 * Usage:
 *   pnpm add -D playwright-core            # once
 *   CHROME_PATH=/path/to/chrome node scripts/capture-screens.mjs [slug ...]
 *
 * CHROME_PATH defaults to the Chromium that Playwright installs under
 * ~/AppData/Local/ms-playwright (Windows) or ~/.cache/ms-playwright (Linux).
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

import sharp from 'sharp';

const OUT = resolve('public/work/screens');
const SCREENS = resolve('scripts/screens');

/**
 * A screen is a mock file name, a live URL, or an object with `url` plus an
 * `anchor` selector to scroll to before capturing.
 */
const SOURCES = {
  brickfold: {
    screens: {
      main: 'brickfold-home.html',
      listings: 'brickfold-listings.html',
      vault: 'brickfold-vault.html',
      admin: 'brickfold-admin.html',
    },
  },
  rankloom: {
    screens: {
      main: 'rankloom-home.html',
      keywords: 'rankloom-keywords.html',
      editor: 'rankloom-editor.html',
      tracking: 'rankloom-tracking.html',
    },
  },
  bidnest: {
    screens: {
      main: 'bidnest-home.html',
      listing: 'bidnest-listing.html',
      dashboard: 'bidnest-dashboard.html',
      messages: 'bidnest-messages.html',
    },
  },
  'curio-market': {
    screens: {
      main: 'curio-home.html',
      quiz: 'curio-quiz.html',
      market: 'curio-market.html',
      seller: 'curio-seller.html',
    },
  },
  'bitsmiths-hrm': {
    screens: {
      main: 'hrm-home.html',
      leave: 'hrm-leave.html',
      payroll: 'hrm-payroll.html',
      payslip: 'hrm-payslip.html',
    },
  },
  'bitsmiths-studio': {
    screens: {
      /* Not `#work`: its featured-project cards show a client this site withholds. */
      main: 'https://bitsmiths.studio/',
      services: { url: 'https://bitsmiths.studio/', anchor: '#services' },
      pricing: { url: 'https://bitsmiths.studio/', anchor: '#pricing' },
      blogs: { url: 'https://bitsmiths.studio/', anchor: '#blogs' },
    },
  },
  'real-estate-management-system': {
    screens: {
      main: 'estate-home.html',
      crm: 'estate-crm.html',
      documents: 'estate-documents.html',
      agents: 'estate-agents.html',
    },
  },
  'qa-compliance-agent': {
    screens: {
      main: 'clause-home.html',
      queue: 'clause-queue.html',
      report: 'clause-report.html',
      standards: 'clause-standards.html',
    },
  },
  'ai-interview-assistant': {
    screens: {
      main: 'cadence-home.html',
      candidates: 'cadence-candidates.html',
      report: 'cadence-report.html',
      roles: 'cadence-roles.html',
    },
  },
  snobbots: {
    screens: {
      main: 'snobbots-home.html',
      inbox: 'snobbots-inbox.html',
      knowledge: 'snobbots-knowledge.html',
      widget: 'snobbots-widget.html',
    },
  },
  'ai-physiotherapy': {
    screens: {
      main: 'physio-home.html',
      assessment: 'physio-assessment.html',
      plan: 'physio-plan.html',
      clinician: 'physio-clinician.html',
    },
  },
  'new-web-order': {
    screens: {
      main: 'https://www.newweborder.us/',
      projects: 'https://www.newweborder.us/projects',
      services: 'https://www.newweborder.us/services',
      about: 'https://www.newweborder.us/about',
    },
  },
  /* App project: phone screens only. `main` and `alt` are the hero phones. */
  'bidnest-mobile': {
    phones: {
      main: 'bidnest-listing.html',
      alt: 'bidnest-home.html',
      dashboard: 'bidnest-dashboard.html',
      messages: 'bidnest-messages.html',
      browse: 'bidnest-home.html',
    },
  },
  /*
   * Only sections that do not name clients: the outcomes and project grid
   * on the portfolio show the real product names that this site withholds.
   */
  'tayyab-sohail-portfolio': {
    screens: {
      main: 'https://tayyab-portfolio-chi.vercel.app/',
      stack: {
        url: 'https://tayyab-portfolio-chi.vercel.app/',
        anchor: '#stack',
      },
      contact: {
        url: 'https://tayyab-portfolio-chi.vercel.app/',
        anchor: '#contact',
      },
    },
  },
};

const HIDE_CSS = `
  *::-webkit-scrollbar { display: none !important; }
  [class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i] { display: none !important; }
`;

const chromePath =
  process.env.CHROME_PATH ??
  [
    join(homedir(), 'AppData/Local/ms-playwright'),
    join(homedir(), '.cache/ms-playwright'),
  ]
    .flatMap((dir) =>
      existsSync(dir)
        ? readdirSync(dir)
            .filter((d) => d.startsWith('chromium-'))
            .map((d) => join(dir, d, 'chrome-win64/chrome.exe'))
        : [],
    )
    .find((p) => existsSync(p));

let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  console.error(
    'playwright-core is not installed: pnpm add -D playwright-core',
  );
  process.exit(1);
}
if (!chromePath) {
  console.error(
    'No Chromium found. Set CHROME_PATH to a Chrome/Chromium binary.',
  );
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

const fileUrl = (name) => 'file:///' + join(SCREENS, name).replace(/\\/g, '/');

/** Normalise a screen entry to { url, anchor, live }. */
function resolveScreen(entry) {
  const spec = typeof entry === 'string' ? { url: entry } : entry;
  const live = /^https?:/.test(spec.url);
  return {
    url: live ? spec.url : fileUrl(spec.url),
    anchor: spec.anchor,
    live,
  };
}

async function capture({ url, anchor, live }, kind) {
  const isMobile = kind === 'mobile';
  const ctx = await browser.newContext({
    viewport: isMobile
      ? { width: 390, height: 844 }
      : { width: 1152, height: 720 },
    deviceScaleFactor: isMobile ? 2 : 1.875,
    isMobile,
    hasTouch: isMobile,
    colorScheme: 'light',
    locale: 'en-US',
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  await page
    .goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(live ? 2500 : 300);
  await page.addStyleTag({ content: HIDE_CSS }).catch(() => {});
  if (anchor) {
    // One instant jump (a second scroll call would cancel a site's smooth
    // scrolling), stopping 80px short so a fixed header does not cover the
    // section heading.
    await page
      .evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }, anchor)
      .catch(() => {});
    await page.waitForTimeout(2500);
  }
  const png = await page.screenshot({ type: 'png' });
  await ctx.close();
  return png;
}

async function save(png, file, width, height) {
  await sharp(png)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .webp({ quality: 88 })
    .toFile(join(OUT, file));
}

const DESKTOP = [2160, 1350];
const PHONE = [780, 1688];

for (const [slug, source] of Object.entries(SOURCES)) {
  if (only.length && !only.includes(slug)) continue;
  if (source.phones) {
    for (const [id, entry] of Object.entries(source.phones)) {
      const file =
        id === 'main'
          ? `${slug}-mobile.webp`
          : id === 'alt'
            ? `${slug}-alt.webp`
            : `${slug}-${id}-mobile.webp`;
      await save(await capture(resolveScreen(entry), 'mobile'), file, ...PHONE);
    }
  } else {
    for (const [id, entry] of Object.entries(source.screens)) {
      const base = id === 'main' ? slug : `${slug}-${id}`;
      const screen = resolveScreen(entry);
      await save(
        await capture(screen, 'desktop'),
        `${base}-desktop.webp`,
        ...DESKTOP,
      );
      await save(
        await capture(screen, 'mobile'),
        `${base}-mobile.webp`,
        ...PHONE,
      );
    }
  }
  console.log('captured', slug);
}

await browser.close();
