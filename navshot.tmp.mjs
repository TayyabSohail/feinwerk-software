import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

const chromePath =
  process.env.CHROME_PATH ??
  [join(homedir(), 'AppData/Local/ms-playwright'), join(homedir(), '.cache/ms-playwright')]
    .flatMap((dir) =>
      existsSync(dir)
        ? readdirSync(dir).filter((d) => d.startsWith('chromium-')).map((d) => join(dir, d, 'chrome-win64/chrome.exe'))
        : [],
    )
    .find((p) => existsSync(p));

const OUT = process.env.SHOT_OUT;
const BASE = process.env.BASE ?? 'http://localhost:3002';
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

for (const [name, path] of [['work', '/work'], ['services', '/services'], ['about', '/about']]) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: join(OUT, `nav-${name}.png`), clip: { x: 0, y: 0, width: 1440, height: 80 } });
}

// hover preview: on /work, hover Services
await page.goto(BASE + '/work', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.hover('nav[aria-label="Primary"] a[href="/services"]');
await page.waitForTimeout(900);
await page.screenshot({ path: join(OUT, 'nav-hover.png'), clip: { x: 0, y: 0, width: 1440, height: 80 } });

// scrolled state on /work
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(1000);
await page.screenshot({ path: join(OUT, 'nav-scrolled.png'), clip: { x: 0, y: 0, width: 1440, height: 80 } });

await browser.close();
console.log('done');
