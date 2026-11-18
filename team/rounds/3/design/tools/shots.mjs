// Screenshots of the round 3 mock-ups: the first screen at 390 x 844 for each design, and at 1366 x 768 for
// The Coast and Tour Poster. JPEG quality 65. Also logs horizontal overflow, links under 44 px outside the
// source lines, requests to any host (there should be none before a press) and which photographs and
// posters load on the first screen. Needs Playwright (global install: NODE_PATH=$(npm root -g)). Code Apache-2.0.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const { chromium } = createRequire(import.meta.url)('playwright');
const D = fileURLToPath(new URL('../mockups', import.meta.url));
const b = await chromium.launch();
const jobs = [['coast', 390], ['azulejo', 390], ['poster', 390], ['songbook', 390], ['cassette', 390], ['coast', 1366], ['poster', 1366]];
for (const [id, w] of jobs) {
  const h = w === 390 ? 844 : 768;
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const hosts = new Set(), imgs = [];
  p.on('request', r => { const u = new URL(r.url()); if (u.protocol !== 'file:' && u.protocol !== 'data:') hosts.add(u.host); else if (/\.jpg$/.test(u.pathname)) imgs.push(u.pathname.split('/').pop()); });
  await p.goto(`file://${D}/${id}.html`, { waitUntil: 'load' });
  await p.waitForTimeout(300);
  const m = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    small: [...document.querySelectorAll('main a, .dfoot a')].filter(a => !a.closest('.cite,.fn') && a.offsetParent).map(a => [a.textContent.trim().slice(0, 28), Math.round(a.getBoundingClientRect().height)]).filter(([, hh]) => hh < 44).slice(0, 8),
    films: document.querySelectorAll('a[data-yt]').length,
    pics: [...new Set([...document.querySelectorAll('main img')].map(i => (i.currentSrc || i.src).split('/').pop()).filter(s => !/^data:/.test(s)))],
  }));
  console.log(id, w, JSON.stringify({ ...m, firstLoad: imgs, hosts: [...hosts] }));
  await p.screenshot({ path: `${D}/${id}-${w}.jpg`, type: 'jpeg', quality: 65 });
  await p.close();
}
await b.close();
