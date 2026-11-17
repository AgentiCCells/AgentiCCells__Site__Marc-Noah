// Render the 1200x630 share cards (typographic, no photos) into src/assets/share/.
// Needs Playwright with Chromium. Run: node scripts/cards.mjs   Code Apache-2.0.
import { mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const songs = 'To The Bone · Lie to Me · Towers and Bridges · Mother · Sunshine · Roadtrip · Slowtalk · No More Dreaming';
const base = (bg, ink, accent, extra, font = 'system-ui,sans-serif', name = 'Marc Noah', sub = 'Singer-songwriter, Algarve') => `<html><body style="margin:0;width:1200px;height:630px;overflow:hidden;background:${bg};color:${ink};font-family:${font};position:relative">${extra}
<div style="position:absolute;left:70px;top:90px;right:70px"><div style="font-size:30px;letter-spacing:.2em;text-transform:uppercase;color:${accent};font-weight:700">${sub}</div>
<div style="font-size:150px;font-weight:800;line-height:1;margin-top:18px;letter-spacing:-2px">${name}</div>
<div style="font-size:38px;margin-top:26px;max-width:900px;line-height:1.25">He lives in the Algarve. He is the composer. These are his songs.</div>
<div style="font-size:22px;margin-top:40px;opacity:.85;max-width:1000px">Giant Little Victories (2024): ${songs}</div></div></body></html>`;
const CARDS = {
  'marc-noah': base('#f7efe2', '#1f2328', '#11607a', `<svg width="1200" height="630" style="position:absolute;inset:0"><circle cx="1010" cy="170" r="120" fill="#f3b45d"/><path d="M0 560c100-35 200-35 300 0s200 35 300 0 200-35 300 0 200 35 300 0V630H0z" fill="#cfe6ee"/><path d="M0 590c100-30 200-30 300 0s200 30 300 0 200-30 300 0 200 30 300 0" fill="none" stroke="#11607a" stroke-width="5"/></svg>`),
  coast: null,
  azulejo: base('#fbfaf6', '#122a4d', '#1d4f91', `<svg width="1200" height="630" style="position:absolute;inset:0"><defs><pattern id="t" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#1d4f91"/><path d="M30 6 54 30 30 54 6 30Z" fill="none" stroke="#fbfaf6" stroke-width="3"/><circle cx="30" cy="30" r="6" fill="#fbfaf6"/></pattern></defs><rect width="1200" height="40" fill="url(#t)"/><rect y="590" width="1200" height="40" fill="url(#t)"/></svg>`, 'Georgia,serif'),
  poster: base('#e2552b', '#f9f1e3', '#f2b134', `<div style="position:absolute;right:-90px;top:-90px;width:420px;height:420px;border-radius:50%;background:repeating-radial-gradient(circle,#f2b134 0 14px,#e2552b 14px 26px)"></div><div style="position:absolute;inset:0;border:16px solid #1b1b1b"></div>`, 'Impact,"Arial Black",sans-serif', 'MARC NOAH', 'Live in the Algarve'),
  songbook: base('#fdfbf4', '#2b2a27', '#8a3b12', `<div style="position:absolute;inset:0;background:linear-gradient(#fdfbf4 40px,#cfe0ee 40px,#cfe0ee 42px) 0 0/100% 42px"></div><div style="position:absolute;left:40px;top:0;bottom:0;border-left:3px double #e0a3a3"></div>`, 'Palatino,Georgia,serif', 'Marc Noah', 'The Songbook'),
  cassette: base('#23202b', '#f1ece2', '#ffd166', `<div style="position:absolute;left:0;right:0;bottom:0;height:26px;background:linear-gradient(90deg,#ef476f 0 25%,#ffd166 0 50%,#06d6a0 0 75%,#118ab2 0)"></div>`, '"Courier New",monospace', 'Marc Noah', 'Side A, Side B'),
};
CARDS.coast = CARDS['marc-noah'];
mkdirSync('src/assets/share', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [id, html] of Object.entries(CARDS)) {
  await page.setContent(html);
  const f = `src/assets/share/${id}-1200x630.jpg`;
  await page.screenshot({ path: f, type: 'jpeg', quality: 82 });
  const kb = Math.round(statSync(f).size / 1024); if (kb >= 300) throw new Error(`${f} is ${kb} KB`);
  console.log(f, `${kb} KB`);
}
await browser.close();
