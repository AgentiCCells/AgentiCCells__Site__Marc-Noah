import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../../../package.json', import.meta.url));
const { chromium } = require('playwright');
import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../mockups', import.meta.url));
const b = await chromium.launch();
for (const pg of ['home', 'about']) for (const [w, h] of [[390, 844], [1366, 768]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(`file://${D}/${pg}.html`, { waitUntil: 'load' });
  await p.screenshot({ path: `${D}/${pg}-${w}-first-screen.jpg`, type: 'jpeg', quality: 70 });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForFunction(() => [...document.images].filter(i => !i.closest('dialog') && i.offsetParent && i.getBoundingClientRect().left < innerWidth).every(i => i.complete && i.naturalWidth > 0)); await p.waitForTimeout(200);
  const m = await p.evaluate(() => {
    const out = { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, small: [] };
    document.querySelectorAll('a').forEach(a => { if (a.closest('.fn') || a.closest('p:not(.row):not(.quiet):not(.btns)')?.matches('.lede,.muted,.small,p') && !a.matches('.more,.mail,.btn')) return; const r = a.getBoundingClientRect(); if (r.height < 44) out.small.push(a.textContent.trim().slice(0, 30) + ' ' + Math.round(r.height)); });
    return out;
  });
  console.log(pg, w, JSON.stringify(m));
  await p.screenshot({ path: `${D}/${pg}-${w}.jpg`, type: 'jpeg', quality: 70, fullPage: true });
  if (pg === 'home') { await p.evaluate(() => scrollTo(0, 0)); await p.click('.dsw-btn'); await p.waitForTimeout(300);
    const f = await p.evaluate(() => ({ open: document.getElementById('designs').open, active: document.activeElement.closest('dialog') ? 'in dialog' : 'outside', small: [...document.querySelectorAll('dialog a, dialog button')].filter(a => a.getBoundingClientRect().height < 44).length }));
    console.log('dialog', w, JSON.stringify(f));
    await p.screenshot({ path: `${D}/${pg}-${w}-designs-open.jpg`, type: 'jpeg', quality: 70 });
    await p.keyboard.press('Escape'); console.log('after esc open=', await p.evaluate(() => document.getElementById('designs').open)); }
  await p.close();
}
await b.close();
