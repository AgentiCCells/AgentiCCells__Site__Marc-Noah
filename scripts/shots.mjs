// Screenshots for reviews and round reports: each page at 390 px (phone) and 1366 px (laptop).
// Usage: node scripts/shots.mjs [--max-height=N] <base-url> <out-dir> [path ...]   (default paths: / /songs/ /d/)
// --max-height=N keeps only the top N px of a page taller than that (the log says so), to keep files small.
// Writes <out-dir>/<name>-<width>.jpg, full page, JPEG quality 70. Code Apache-2.0.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';
const args = process.argv.slice(2);
const maxArg = args.find(a => a.startsWith('--max-height='));
const maxH = maxArg ? Number(maxArg.split('=')[1]) : 0;
const [base, outDir, ...rest] = args.filter(a => a !== maxArg);
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
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const cut = maxH && height > maxH;
    await page.screenshot({ path: `${outDir}/${name}-${width}.jpg`, fullPage: true, type: 'jpeg', quality: 70, ...(cut ? { clip: { x: 0, y: 0, width, height: maxH } } : {}) });
    console.log(`${name}-${width}.jpg${cut ? `  (top ${maxH} px of ${height})` : ''}${overflow > 0 ? `  WARNING: ${overflow}px horizontal overflow` : ''}`);
  }
  await page.close();
}
await browser.close();
