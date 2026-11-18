// Round 3 mock-ups: the five older designs with his label's photographs and a few films, each in its own idiom.
// Starts from the real page (renderDesign in scripts/designs.mjs, so every fact, date and alt text is the
// live one) and adds the proposal's pieces by string insertion, with our own CSS. Writes ../mockups/<id>.html.
// Asset paths are rewritten to the repository's files: from team/rounds/3/design/mockups/ the root is five
// levels up (../../../../../). Code Apache-2.0. By designer.marc-noah@AgentiCCells.dinis, 17 November 2026.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderDesign } from '../../../../../scripts/designs.mjs';
import { esc, cite, photo, photoById, V, playAttrs, PLAYICON, playerDialog, STILLS_CREDIT, fmtDate } from '../../../../../scripts/lib.mjs';
import { PHOTO_CREDIT } from '../../../../../data/photos.mjs';

const OUT = fileURLToPath(new URL('../mockups/', import.meta.url));
mkdirSync(OUT, { recursive: true });
const ROOT = '../../../../../';

// A replace that fails loudly when its anchor is missing, so a mock-up never silently drops a piece.
const put = (html, find, repl) => {
  const hit = typeof find === 'string' ? html.includes(find) : find.test(html);
  if (!hit) throw new Error(`anchor not found: ${String(find).slice(0, 80)}`);
  return html.replace(find, repl);
};

// A film's poster: its own YouTube frame, self-hosted (src/assets/video/<id>-640.jpg); alt="" as the link names the film.
// Below the first screen, posters and photographs are deferred the way the site's posters already are (round 2
// follow-up 2): a blank src, the real file in data-src/data-srcset, set by the site's own script near the viewport.
const BLANK = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 9%27/%3E';
const poster = (id, { eager = false } = {}) => eager ? `<img src="/assets/video/${id}-640.jpg" width="640" height="360" alt="" decoding="async">`
  : `<img class="lz" src="${BLANK}" data-src="/assets/video/${id}-640.jpg" data-srcset="/assets/video/${id}-640.jpg 640w" sizes="320px" width="640" height="360" alt="" loading="lazy" decoding="async">`;
const lzPhoto = (id, sizes = '(min-width:900px) 480px, 90vw') => { const p = photoById(id); const [w, hh] = p.size;
  return `<img class="lz" src="${BLANK}" data-src="${p.small}" data-srcset="${p.small} 800w, ${p.file} ${w}w" sizes="${sizes}" width="${w}" height="${hh}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`; };
const playMark = `<span class="pb">${PLAYICON}</span>`;
// Accessible name of every film link: "Play <caption>" (the caption from VIDEOS).
const film = (id, cls, inner) => { const v = V(id); return `<a class="${cls}" ${playAttrs(v)} aria-label="Play ${esc(v.caption)}">${inner}</a>`; };

// The player's styles for the /d/ pages, which do not load /style.css (same values as style.css, round 2).
const PLAYER_CSS = `.player{width:min(70rem,calc(100% - 16px));max-height:calc(100svh - 16px);padding:0;border:1px solid #2a3440;border-radius:8px;background:#000;color:#f2ede6;font:16px/1.5 system-ui,sans-serif}.player::backdrop{background:rgba(3,5,8,.9)}
.pl-head{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.4rem .4rem .4rem 1rem;background:#131a22}.pl-head h2{margin:0;font-weight:600;font-size:.95rem}
.pbox{aspect-ratio:16/9;max-height:calc(100svh - 140px);background:#000}.pbox iframe{width:100%;height:100%;border:0;display:block}
.pl-note{margin:0;padding:0 1rem;font-size:.8rem;color:#a7b0ba;background:#131a22}.pl-note a{color:#f2ede6;display:inline-flex;min-height:44px;align-items:center}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.pb{position:absolute;left:50%;top:50%;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.62);color:#fff;border:2px solid #fff}.pb svg{width:20px;height:20px;margin-left:3px}
.dcredit{font-size:13px}
.mock{font:13px/1.5 system-ui,sans-serif;max-width:60rem;margin:0 auto;padding:0 1rem 2rem;opacity:.85}`;

// The credit line every design that shows a photograph or a still carries in its footer (proposal, common rule C3).
const credit = (stills = true) => `<p class="dcredit">${esc(PHOTO_CREDIT)} ${cite('photos')}${stills ? ` ${esc(STILLS_CREDIT)} ${cite('yt-frames')}` : ''}</p>\n</footer>`;
const mockNote = id => `<p class="mock">Mock-up for the round 3 design proposal (${id}), by designer.marc-noah@AgentiCCells.dinis, 17 November 2026. Built from the live page's code with the proposal's pieces added; links inside the site do not resolve here.</p>`;

function finish(id, html, css) {
  html = put(html, '</style>', `\n/* round 3 mock-up */\n${PLAYER_CSS}\n${css}\n</style>`);
  html = put(html, /<\/footer>/, credit());
  html = put(html, /<script>/, `${playerDialog()}\n${mockNote(id)}\n<script>`);
  html = html.replace(/(["\s,(])\/assets\//g, `$1${ROOT}src/assets/`);
  writeFileSync(`${OUT}${id}.html`, html);
  console.log('wrote', id, html.length, 'bytes');
}
const page = id => renderDesign(id, { image: `/assets/share/${id}.jpg`, description: `${id} mock-up` });

// ---------------- The Coast ----------------
{
  let h = page('coast');
  const q = photoById('sofa-session-quarteira');
  h = put(h, '<article class="song" aria-labelledby="feat">', `<figure class="c-card">${photo('sofa-session-quarteira', { eager: true, cls: 'c-sun' })}<figcaption>On the green chair, on the seafront promenade</figcaption></figure>
<article class="song" aria-labelledby="feat">`);
  h = put(h, /<a class="btn" href="https:\/\/www\.youtube\.com\/watch\?v=adbD0f2FYLA">([^]*?)Watch Roadtrip on YouTube<\/a>/, (m, ic) => `<a class="btn" ${playAttrs(V('adbD0f2FYLA'))}>${ic}Watch the Roadtrip video<span class="c-here">plays here</span></a>`);
  const i = h.indexOf('<figure class="fig">'), j = h.indexOf('</figure>', i) + 9;
  const films = `<div class="c-films"><p class="kick">Filmed on the coast: Green Sofa Sessions</p><ul>
${['6yUpmlZzrk0', 'RRTVycYkcOo'].map(id => `<li>${film(id, 'c-film', `<span class="c-pic">${poster(id)}${playMark}</span><span class="c-cap">${esc(V(id).caption)}</span>`)}</li>`).join('\n')}
</ul></div>`;
  h = h.slice(0, i) + '<div class="c-side">' + h.slice(i, j) + films + '</div>' + h.slice(j);
  h = put(h, '<h2 class="h" id="l">On stage</h2>', `<h2 class="h" id="l">On stage</h2>\n<figure class="c-live">${lzPhoto('live-acoustic')}</figure>`);
  finish('coast', h, `
.c-card{margin:.2rem 0 1.4rem;background:#fff;padding:8px 8px 6px;border-radius:6px;box-shadow:0 1px 0 #e3d6c1,0 10px 24px rgba(17,96,122,.18);transform:rotate(-1.2deg);max-width:30rem}
.c-card picture{display:block;position:relative;overflow:hidden;border-radius:3px}
.c-card picture::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(243,180,93,.28),transparent 55%);mix-blend-mode:soft-light;pointer-events:none}
.c-card img{display:block;width:100%;aspect-ratio:4/3;height:auto;object-fit:cover;object-position:50% 62%;filter:saturate(1.06)}
.c-card figcaption{font-size:.85rem;color:#5a5650;padding:.35rem .2rem 0}
.c-here{font-size:.78rem;font-weight:500;opacity:.9;margin-left:.4rem}
.c-films{margin-top:1rem}.c-films ul{list-style:none;margin:.4rem 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.c-film{display:block;color:var(--ink);text-decoration:none;min-height:44px}.c-pic{position:relative;display:block;border-radius:.6rem;overflow:hidden;border:1px solid var(--line)}
.c-pic img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover}.c-cap{display:block;font-size:.88rem;line-height:1.3;padding-top:.35rem}
.c-film:hover .pb,.c-film:focus-visible .pb{background:var(--sea);border-color:var(--sea)}
.c-live{margin:0 0 1rem}.c-live img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:50% 30%;border-radius:.75rem}
@media (min-width:900px){.hero{position:relative;align-items:start}.c-card{position:absolute;z-index:2;top:3.2rem;width:10rem;right:calc((100% - 3rem) * .5122 - 11rem);margin:0;transform:rotate(-3deg)}.c-card figcaption{font-size:.75rem}.c-pic img{aspect-ratio:16/10}}
@media (min-width:1200px){.c-card{width:12.5rem;right:calc((100% - 3rem) * .5122 - 14rem)}}`);
}

// ---------------- Azulejo ----------------
{
  let h = page('azulejo');
  h = put(h, '<section class="a-hero"><p class="t">', `<section class="a-hero"><figure class="a-ph"><span class="a-paint">${photo('portrait-bw', { eager: true })}</span></figure><p class="t">`);
  h = put(h, '<ul class="a-tiles">', `<ul class="a-tiles">\n<li class="a-cov">${lzPhoto('giant-little-victories-cover', '(min-width:700px) 240px, 90vw')}<span class="m">The album cover, from his label</span></li>`);
  const films = { 'Towers and Bridges': 'K8795UoBqTg', Mother: 'JMd-r6okn80', Roadtrip: 'adbD0f2FYLA' };
  for (const [song, id] of Object.entries(films)) {
    h = put(h, new RegExp(`<li><svg[^]*?</svg><h3>${song}</h3>([^]*?)<span class="m"><a href="[^"]+">[^<]+</a></span></li>`),
      (m, mid) => `<li>${film(id, 'a-film', `<span class="a-paint">${poster(id)}</span>${playMark}`)}<h3>${song}</h3>${mid}<span class="m">${film(id, 'a-play', 'Play the video here')}</span></li>`);
  }
  finish('azulejo', h, `
.a-ph{margin:0 auto 1.1rem;width:min(15rem,66vw);padding:12px;background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#1d4f91"/><path d="M12 3 21 12 12 21 3 12Z" fill="none" stroke="#fbfaf6" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" fill="#fbfaf6"/></svg>')}");background-size:24px}
.a-paint{display:block;position:relative;background:#1d4f91;isolation:isolate;overflow:hidden}
.a-paint img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;filter:grayscale(1) contrast(1.12) brightness(1.06);mix-blend-mode:screen}
.a-ph .a-paint::after{content:"";position:absolute;inset:0;background-image:linear-gradient(90deg,#fbfaf6 3px,transparent 3px),linear-gradient(#fbfaf6 3px,transparent 3px);background-size:33.34% 33.34%;background-position:-1.5px -1.5px}
.a-cov img{display:block;width:100%;height:auto;border:6px solid #fff;outline:2px solid #1d4f91}.a-cov{justify-content:center}
.a-film{position:relative;display:block;width:100%;border:2px solid #1d4f91;padding:4px;background:#fff}.a-film .a-paint img{aspect-ratio:16/10}
.a-film:hover .a-paint img,.a-film:focus-visible .a-paint img{filter:none;mix-blend-mode:normal}
.a-play{display:inline-flex;align-items:center;min-height:44px;font-weight:600}`);
}

// ---------------- Tour Poster ----------------
{
  let h = page('poster');
  const show = V('S85R1WgyKJ0');
  h = put(h, /<p class="l">([^]*?)<\/p><\/section>/, (m, l) => `<p class="l">${l}</p></div>
<div class="p-art"><figure class="p-photo">${photo('live-acoustic', { eager: true })}</figure>
${film('S85R1WgyKJ0', 'p-stamp p-show', `See the show<small>With his band, TEMPO, Portimão, ${fmtDate(show.date)}</small>`)}</div></section>`);
  h = put(h, '<span class="p-sun" aria-hidden="true"></span>', '<span class="p-sun" aria-hidden="true"></span><div class="p-words">');
  const rows = { '9.º Festival Acústico': 'OyvGbs1fg7g', 'Choque Frontal ao Vivo': 'S85R1WgyKJ0', 'Sons no Castelo': 'q2P-ScNIL7w' };
  for (const [venue, id] of Object.entries(rows)) {
    h = put(h, new RegExp(`(<span class="v">${venue.replace('.', '\\.')}[^<]*</span>)</span></li>`), (m, v) => `${v}${film(id, 'p-film', `${PLAYICON}Filmed: watch`)}</span></li>`);
  }
  h = put(h, '<ul class="p-dates">', `<figure class="p-paste">${lzPhoto('autumn-leaves-tour', '240px')}<figcaption>His label's poster for the autumn 2024 tour</figcaption></figure>\n<ul class="p-dates">`);
  finish('poster', h, `
.p-top .t,.p-top .l{color:#1b1b1b}
.p-art{position:relative;margin-top:1.1rem}
.p-photo{margin:0;position:relative;background:#e2552b;isolation:isolate;border:5px solid #1b1b1b;overflow:hidden}
.p-photo img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;object-position:50% 35%;filter:grayscale(1) contrast(1.45) brightness(1.08);mix-blend-mode:multiply}
.p-photo::after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#1b1b1b .9px,transparent 1.3px);background-size:4px 4px;mix-blend-mode:multiply;opacity:.55}
.p-show{position:absolute;right:.6rem;bottom:-1.1rem;background:#f9f1e3;color:#1b1b1b;border-color:#1b1b1b;display:inline-flex;flex-direction:column;min-height:44px;line-height:1.05;padding:.5rem .8rem}
.p-show small{font:700 .72rem/1.3 Arial,sans-serif;text-transform:none;letter-spacing:0;margin-top:.2rem}
.p-top{padding-bottom:2rem}
.p-film{display:inline-flex;align-items:center;gap:.35rem;min-height:44px;font:900 .95rem Impact,"Arial Black",sans-serif;text-transform:uppercase;color:#a33a14;text-decoration:none}.p-film svg{width:16px;height:16px}
.p-dates .v{display:block}
.p-paste{width:min(62%,15rem);margin:0 0 1.4rem .4rem;transform:rotate(2deg);background:#fff;padding:6px;box-shadow:0 2px 0 #1b1b1b}.p-paste img{display:block;width:100%;height:auto}.p-paste figcaption{font-size:.75rem;line-height:1.3;padding-top:.3rem}
.p-dates{clear:none}

.p-top>.p-sun{position:absolute;display:none}
@media (min-width:900px){.p-top>.p-sun{display:block}.p-top{display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:center;padding:2rem 2rem 2.6rem}.p-art{margin:0}}`);
}

// ---------------- The Songbook ----------------
{
  let h = page('songbook');
  h = put(h, '<h1>Marc Noah</h1>', `<figure class="s-pola">${photo('portrait-grey', { eager: true })}<figcaption>Marc Noah</figcaption></figure>\n<h1>Marc Noah</h1>`);
  const films = { 'Lie to Me': 'ZBwgJ7Lg7-o', Sunshine: '5H8PBg1tQHc', Mother: 'RRTVycYkcOo' };
  for (const [song, id] of Object.entries(films)) {
    h = put(h, new RegExp(`(<h3>${song}</h3><p class="s-meta">[^<]*</p>)`), (m, p) => `${p}${film(id, 's-film', `<span class="s-snap">${poster(id)}${playMark}</span><span class="s-fcap">Watch the Green Sofa Session: ${esc(V(id).caption)}</span>`)}`);
  }
  h = put(h, /(<h2>Also<\/h2>)/, `$1\n<figure class="s-tape s-ep">${lzPhoto('green-sofa-session-ep', '320px')}</figure>`);
  finish('songbook', h, `
.s-pola{float:right;width:min(42%,13rem);margin:.2rem -.4rem .6rem 1rem;background:#fff;padding:7px 7px 0;box-shadow:0 2px 6px rgba(0,0,0,.18);transform:rotate(2.5deg);position:relative}
.s-pola::before,.s-tape::before{content:"";position:absolute;left:50%;top:-12px;width:64px;height:22px;margin-left:-32px;background:rgba(240,224,170,.78);transform:rotate(-4deg);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.s-pola img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;object-position:50% 30%;filter:sepia(.18) contrast(1.04)}
.s-pola figcaption{font:italic 1.05rem/1.75rem "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;color:#1f3d7a;text-align:center;padding:.1rem 0 .2rem}
.s-film{display:grid;grid-template-columns:8.5rem 1fr;gap:.8rem;align-items:center;margin:.5rem 0 .25rem;color:#8a3b12;text-decoration:none;min-height:44px}
.s-snap{position:relative;display:block;background:#fff;padding:4px;box-shadow:0 1px 4px rgba(0,0,0,.18);transform:rotate(-2deg)}.s-snap img{display:block;width:100%;height:auto;filter:sepia(.12)}
.s-snap .pb{width:36px;height:36px;margin:-18px 0 0 -18px}.s-snap .pb svg{width:14px;height:14px}
.s-fcap{font-size:1rem;line-height:1.4;text-decoration:underline}
.s-tape{position:relative;background:#fff;padding:6px;box-shadow:0 2px 6px rgba(0,0,0,.15);margin:1rem 0}.s-ep{width:min(70%,20rem);transform:rotate(-1.5deg)}.s-tape img{display:block;width:100%;height:auto}`);
}

// ---------------- Side A, Side B ----------------
{
  let h = page('cassette');
  h = put(h, '<div class="k-label"><div><p class="t">', `<div class="k-label"><div class="k-jcard"><figure class="k-front">${photo('roadtrip-car', { eager: true })}</figure><div><p class="t">`);
  h = put(h, /(Epopeia Records<\/p>)(<\/div><\/div>)/, '$1</div>$2');
  const flips = { 'To The Bone': 'GdY-l97_vCU', Slowtalk: 'JB0jvIitE9I', 'No More Dreaming': 'f__TLj6ccQI' };
  for (const [song, id] of Object.entries(flips)) {
    h = put(h, new RegExp(`(<li><b>${song}</b>[^]*?</small>)</li>`), (m, li) => `${li}${film(id, 'k-flip', `<span class="k-thumb">${poster(id)}</span><span><b>Flip side</b> live at Choque Frontal ao Vivo, Portimão, filmed by Alvor FM</span>`)}</li>`);
  }
  h = put(h, '<div class="k-story">', `<figure class="k-liner">${lzPhoto('towers-bridges-piano', '(min-width:900px) 544px, 90vw')}</figure>\n<div class="k-story">`);
  finish('cassette', h, `
.k-jcard{display:grid;grid-template-columns:minmax(0,44%) minmax(0,1fr);gap:1rem;align-items:center}
.k-front{margin:0;position:relative;border:3px solid #23202b}.k-front::after{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:repeating-linear-gradient(90deg,#ef476f 0 25%,#ffd166 0 50%,#06d6a0 0 75%,#118ab2 0)}
.k-front img{display:block;width:100%;height:auto;aspect-ratio:3/4;object-fit:cover;object-position:62% 40%;filter:saturate(.85) contrast(1.08) sepia(.12)}
.k-label h1{font-size:clamp(2rem,9vw,4.8rem)}
@media (max-width:599px){.k-label .t{letter-spacing:.08em;font-size:.82rem;line-height:1.35}.k-label>div{padding:.8rem}}
.k-flip{display:flex;gap:.6rem;align-items:center;margin:.35rem 0 .5rem;min-height:44px;color:#8a3b12;text-decoration:none;font-size:.88rem;line-height:1.3}
.k-thumb{flex:none;width:5.5rem;border:2px solid #23202b;border-radius:3px;overflow:hidden;position:relative}.k-thumb img{display:block;width:100%;height:auto}
.k-thumb::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,#f8f3e6 0 6px,#23202b 6px 8px,transparent 8px) 22% 50%/40% 70% no-repeat,radial-gradient(circle,#f8f3e6 0 6px,#23202b 6px 8px,transparent 8px) 78% 50%/40% 70% no-repeat;opacity:.9}
.k-flip b{color:#23202b}
.k-liner{margin:0 0 1rem;max-width:34rem;border:2px dashed #6a6478;border-radius:8px;padding:8px}.k-liner img{display:block;width:100%;height:auto;filter:grayscale(1) contrast(1.25)}`);
}
