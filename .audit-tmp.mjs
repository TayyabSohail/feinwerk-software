import { chromium } from 'playwright-core';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const chromePath = process.env.CHROME_PATH ?? [join(homedir(),'AppData/Local/ms-playwright'), join(homedir(),'.cache/ms-playwright')].flatMap((d)=> existsSync(d)? readdirSync(d).filter(x=>x.startsWith('chromium-')).map(x=>join(d,x,'chrome-win64/chrome.exe')):[]).find(p=>existsSync(p));

const BASE = process.env.BASE || 'http://localhost:3000';
const WIDTHS = [320, 360, 375, 414, 480, 540, 640, 768, 834, 1024, 1280, 1440, 1920];
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const page = await ctx.newPage();

let problems = 0;
for (const path of PAGES) {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    // let lazy sections and the preloader settle
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const res = await page.evaluate((vw) => {
      const docW = document.documentElement.scrollWidth;
      const out = [];
      const seen = new Set();
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const over = Math.max(0, Math.round(r.right - vw), Math.round(-r.left));
        if (over > 1) {
          // report the outermost offender only
          let anc = el.parentElement, nested = false;
          while (anc && anc !== document.body) {
            if (seen.has(anc)) { nested = true; break; }
            anc = anc.parentElement;
          }
          seen.add(el);
          if (nested) continue;
          out.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || '')).slice(0, 110),
            text: (el.textContent || '').trim().slice(0, 40),
            over,
          });
        }
      }
      return { docW, out: out.slice(0, 8) };
    }, w);

    const scrolls = res.docW > w + 1;
    if (scrolls || res.out.length) {
      problems++;
      console.log(`\n[${path} @ ${w}px] scrollWidth=${res.docW}${scrolls ? '  <-- HORIZONTAL SCROLL' : ''}`);
      for (const o of res.out) console.log(`   +${o.over}px  <${o.tag}> "${o.text}"  .${o.cls}`);
    }
  }
}
console.log(problems ? `\n${problems} width/page combos with issues.` : '\nNo overflow at any tested width.');
await browser.close();
