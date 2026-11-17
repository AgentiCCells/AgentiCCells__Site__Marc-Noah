// Screenshots for reviews and round reports: each page at 390 px (phone) and 1366 px (laptop).
// Usage: node scripts/shots.mjs <base-url> <out-dir> [path ...]   (default paths: / /songs/ /d/)
// Writes <out-dir>/<name>-<width>.jpg, full page, JPEG quality 70. Code Apache-2.0.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';
const [base, outDir, ...rest] = process.argv.slice(2);
if (!base || !outDir) { console.error('usage: node scripts/shots.mjs <base-url> <out-dir> [path ...]'); process.exit(1); }
const paths = rest.length ? rest : ['/', '/songs/', '/d/'];
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
for (const width of [390, 1366]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 768 }, deviceScaleFactor: 1 });
  for (const p of paths) {
    await page.goto(base.replace(/\/$/, '') + p, { waitUntil: 'networkidle' });
    const name = p.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.screenshot({ path: `${outDir}/${name}-${width}.jpg`, fullPage: true, type: 'jpeg', quality: 70 });
    console.log(`${name}-${width}.jpg${overflow > 0 ? `  WARNING: ${overflow}px horizontal overflow` : ''}`);
  }
  await page.close();
}
await browser.close();
