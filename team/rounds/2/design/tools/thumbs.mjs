import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../../../package.json', import.meta.url));
const { chromium } = require('playwright');
import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../mockups', import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 0.375 });
const list = [['editorial', `file://${D}/home.html`], ...['coast','azulejo','poster','songbook','cassette'].map(d => [d, `http://localhost:8765/d/${d}/`])];
for (const [id, u] of list) { await p.goto(u, { waitUntil: 'load' }); await p.screenshot({ path: `${D}/thumb-${id}.jpg`, type: 'jpeg', quality: 62 }); }
await b.close();
