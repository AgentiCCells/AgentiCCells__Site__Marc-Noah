// Builds the round 2 mock-ups from data/facts.mjs and data/photos.mjs. Run: node team/rounds/2/design/tools/mockups.mjs
// Then: node team/rounds/2/design/tools/shots.mjs (thumbnails need src/ served on :8765 first). Code Apache-2.0.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const R = fileURLToPath(new URL('../../../../../', import.meta.url)).replace(/\/$/, '');
const F = await import(`${R}/data/facts.mjs`);
const PH = await import(`${R}/data/photos.mjs`);
const L = await import(`${R}/scripts/lib.mjs`);
const { esc, fmtDate, routeMap } = L;
const { SOURCES, PERSON, HERO, FEATURE, TRACKS, TRACKS_SRC, QUOTES, COMPOSER, ALBUM, ALBUM_LINE, LIVE, STAGES, FORMATS, FORMATS_SRC, BOOKING, STORY, BIO_PT, BIO_NOTE, FOOTER, LISTEN, SOURCES_NOTE, READ } = F;
const { PHOTOS, PHOTO_CREDIT, PHOTO_SOURCE, EMBEDS } = PH;
const OUT = `${R}/team/rounds/2/design/mockups`;
mkdirSync(OUT, { recursive: true });

// The photo source sits in data/photos.mjs; the build adds it to the source list (change 8).
const SRC = { ...SOURCES, photos: PHOTO_SOURCE };
const { LYRIC_LINES, CONTACT, VIDEOS, VIDEOS_NOTE } = F;
const LY = song => LYRIC_LINES.find(l => l.song === song);
const lyr = (l, c) => `<figure class="lyr"><blockquote>${esc(l.text)}</blockquote><figcaption>From <b>${esc(l.song)}</b>${c(l.src)}</figcaption></figure>`;
function citer() {
  const order = [];
  const num = id => { if (!SRC[id]) throw new Error(id); let i = order.indexOf(id); if (i < 0) { order.push(id); i = order.length - 1; } return i + 1; };
  const c = (...ids) => { const l = [...new Set(ids.flat(2).filter(Boolean))]; if (!l.length) return ''; return `<span class="fn">${l.map(id => { const n = num(id); return `<a href="#src-${n}" aria-label="Source ${n}: ${esc(SRC[id].short || SRC[id].title)}">${n}</a>`; }).join('')}</span>`; };
  const list = () => `<section class="sources wrap" aria-labelledby="srch"><h2 id="srch">Sources</h2>
<p>${esc(SOURCES_NOTE.readOnce)} ${esc(SOURCES_NOTE.exceptions.brief)} The full register is on <a href="#">the sources page</a>.</p>
<ol>${order.map((id, i) => `<li id="src-${i + 1}"><a href="${esc(SRC[id].url)}">${esc(SRC[id].title)}</a></li>`).join('\n')}</ol></section>`;
  return { c, list };
}

// Photos: the real files by relative path, -800 on phones, width and height set.
const P = Object.fromEntries(PHOTOS.map(p => [p.id, p]));
const BASE = '../../../../../src/assets/photos/';
const fn = f => BASE + f.split('/').pop();
// On phones (under 700 px) the 800 px file always, whatever the pixel density; the full file above.
const img = (id, { eager = false, cls = '', style = '' } = {}) => {
  const p = P[id]; if (!p) throw new Error(id);
  const [w, h] = p.size;
  return `<picture><source media="(max-width:699px)" srcset="${fn(p.small)}"><img src="${fn(p.file)}" width="${w}" height="${h}" alt="${esc(p.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}></picture>`;
};

const PLAYI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
// The facade: a link to the video (works without JS); our script swaps in the iframe on click.
const ytId = u => new URL(u).searchParams.get("v");
const KIND = { official: 'Video, his label\'s Vevo channel', live: 'Live', session: 'Green Sofa Session' };
const V = id => { const v = VIDEOS.find(x => x.id === id); if (!v) throw new Error(id); return v; };
const ytFacade = (v, photo, { big = false, pos = '50% 50%', title, sub } = {}) => `<div class="embed r169${big ? ' big' : ''}" id="v-${v.id}">
<a class="facade" href="https://www.youtube.com/watch?v=${v.id}" data-embed="${esc(EMBEDS.youtube(v.id))}" data-title="${esc(v.title)} (YouTube)">
${img(photo, { style: `object-position:${pos}` })}
<span class="pb">${PLAYI}</span>
<span class="ft"><b>${esc(title || v.song || v.title)}</b><small>${esc(sub || KIND[v.kind])} · plays from YouTube</small></span>
</a></div>`;
const spFacade = () => `<div class="embed sp" id="sp-album">
<a class="facade sq" href="${esc(ALBUM.listen[0].url)}" data-embed="${esc(EMBEDS.spotifyAlbum)}" data-title="${esc(ALBUM.title)}, Marc Noah, on Spotify" data-h="352">
${img('giant-little-victories-cover', { sizes: '(min-width:900px) 26rem, 100vw' })}
<span class="pb">${PLAYI}</span>
<span class="ft"><b>Play the album</b><small>${esc(ALBUM.title)} · 8 songs · plays from Spotify</small></span>
</a></div>`;
const SCRIPT = `<script>
/* Click to play: nothing loads from YouTube or Spotify until a visitor presses play. Ours, a few lines. */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-embed]');if(!a||e.metaKey||e.ctrlKey)return;e.preventDefault();
var box=a.parentNode,f=document.createElement('iframe');f.src=a.getAttribute('data-embed');f.title=a.getAttribute('data-title');
f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';
if(a.getAttribute('data-h')){box.classList.add('open');f.height=a.getAttribute('data-h');}box.replaceChildren(f);f.focus();});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('a[data-play]');if(!b)return;var t=document.getElementById(b.getAttribute('data-play'));var a=t&&t.querySelector('a[data-embed]');if(!a)return;e.preventDefault();t.scrollIntoView({block:'center'});a.click();});
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-dialog]');if(!t)return;var d=document.getElementById(t.getAttribute('data-dialog'));if(!d||!d.showModal)return;e.preventDefault();d.showModal();});
document.querySelectorAll('dialog').forEach(function(d){d.addEventListener('click',function(e){if(e.target===d)d.close();});});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-yt]');if(!a||e.metaKey||e.ctrlKey)return;var d=document.getElementById('player');if(!d||!d.showModal)return;e.preventDefault();
var id=a.getAttribute('data-yt'),f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';f.title=a.getAttribute('data-title');
f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';
d.querySelector('.pbox').replaceChildren(f);d.querySelector('#pl-t').textContent=a.getAttribute('data-title');d.querySelector('#pl-yt').href=a.href;d.showModal();});
document.addEventListener('close',function(e){if(e.target.id==='player')e.target.querySelector('.pbox').replaceChildren();},true);
document.querySelectorAll('.tabs a[data-f]').forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();var f=t.getAttribute('data-f');
document.querySelectorAll('.tabs a').forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false');});
document.querySelectorAll('.group[data-g]').forEach(function(g){g.hidden=!(f==='all'||g.getAttribute('data-g')===f);});});});
</script>`;

const CSS = `
:root{color-scheme:dark;--bg:#0b0f14;--s1:#131a22;--s2:#1a222c;--line:#2a3440;--ink:#f2ede6;--muted:#a7b0ba;--faint:#8b95a1;--accent:#e2a878;--on-accent:#1b1009;
--sans:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;--serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;--wrap:76rem;--g:16px}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 var(--sans);overflow-wrap:break-word}
img{display:block;max-width:100%;height:auto}picture{display:contents}svg{max-width:100%}
a{color:var(--ink);text-decoration-color:var(--accent);text-underline-offset:.2em}a:hover{color:var(--accent)}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:2px}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 var(--g)}
@media (min-width:900px){:root{--g:40px}}
.eyebrow{margin:0 0 .9rem;font-size:.75rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
h1,h2,h3{font-family:var(--sans);margin:0}
h2.sec{font-size:clamp(2rem,7vw,3.6rem);line-height:1;letter-spacing:-.03em;font-weight:750;margin-bottom:1rem}
p{margin:0 0 1rem}
.lede{font-size:clamp(1.12rem,3.6vw,1.35rem);line-height:1.5;color:var(--ink);max-width:36rem}
.muted{color:var(--muted)}.small{font-size:.88rem;color:var(--muted)}
section.band{padding:clamp(4rem,10vw,7.5rem) 0}
.rule{border-top:1px solid var(--line)}

/* Header: transparent over the home hero, solid dark elsewhere */
.top{position:relative;z-index:5;background:var(--bg);border-bottom:1px solid var(--line)}
.top.over{position:absolute;left:0;right:0;top:0;background:linear-gradient(rgba(5,8,12,.7),rgba(5,8,12,0));border:0}
.top .wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0 2rem;padding-top:.4rem;padding-bottom:.4rem}
.brand{font-weight:800;letter-spacing:.18em;text-transform:uppercase;font-size:.95rem;text-decoration:none;min-height:44px;display:flex;align-items:center}
.top nav{display:flex;margin:0 -.55rem}
.top nav a{min-height:44px;display:flex;align-items:center;padding:0 .55rem;text-decoration:none;font-size:.92rem;letter-spacing:.04em}
.top nav a[aria-current]{box-shadow:inset 0 -2px 0 var(--accent)}
.sm{display:none}@media (max-width:599px){.lg{display:none}.sm{display:inline}.top nav a{padding:0 .5rem;font-size:.9rem}}

/* Markers: quiet */
.fn{white-space:normal}.fn a{white-space:nowrap}
.fn a{display:inline-block;min-width:24px;height:24px;line-height:24px;padding:0 3px;font-size:11px;font-weight:600;text-align:center;vertical-align:top;position:relative;top:-.35em;color:var(--faint);text-decoration:none;border-radius:4px}
.fn a:hover{color:var(--accent);background:var(--s2)}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:.6rem;min-height:52px;padding:.4rem 1.5rem .4rem .45rem;border-radius:999px;background:var(--accent);color:var(--on-accent);font-weight:700;text-decoration:none;letter-spacing:.01em}
.btn .disc{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--on-accent);color:var(--accent)}.btn .disc svg{width:18px;height:18px;margin-left:2px}
.btn small{display:block;font-weight:500;font-size:.78rem;opacity:.8}
.btn:hover{background:var(--ink);color:var(--on-accent)}
.btn.line{background:transparent;color:var(--ink);border:1px solid var(--muted);padding:.4rem 1.3rem;min-height:48px}.btn.line:hover{border-color:var(--accent);color:var(--accent)}
.btns{display:flex;flex-wrap:wrap;gap:.6rem;margin:1.4rem 0 0}
.more{display:inline-flex;align-items:center;min-height:44px;font-weight:600}

/* Hero */
.hero{position:relative;min-height:min(100svh,58rem);display:flex;align-items:flex-end;overflow:hidden;background:#06090c}
.hero>picture>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:64% 30%}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,9,12,.97) 0,rgba(6,9,12,.9) 50%,rgba(6,9,12,.45) 66%,rgba(6,9,12,0) 80%)}
.hero .wrap{position:relative;z-index:2;width:100%;padding-bottom:clamp(2rem,6vh,4.5rem)}
.hero h1{font-size:clamp(4.6rem,23vw,9.5rem);line-height:.86;letter-spacing:-.045em;font-weight:800;margin:0 0 1.1rem}
.hero h1 span{display:block}
.hero .lede{max-width:28rem;margin:0}
@media (min-width:900px){.hero>picture>img{object-position:50% 28%}.hero::after{background:linear-gradient(90deg,rgba(6,9,12,.92) 0,rgba(6,9,12,.55) 38%,rgba(6,9,12,0) 62%),linear-gradient(0deg,rgba(6,9,12,.6),rgba(6,9,12,0) 30%)}.hero h1 span{display:inline}.hero h1 span+span{margin-left:.22em}.hero h1{font-size:clamp(5rem,8.4vw,8.5rem)}}

/* Words */
.words{display:grid;gap:2.5rem;align-items:center}
.words figure{margin:0}
.q{font-family:var(--serif);font-style:italic;font-size:clamp(1.7rem,5.6vw,2.9rem);line-height:1.2;letter-spacing:-.01em;margin:0 0 1.2rem}
.q::before{content:"\\201C"}.q::after{content:"\\201D"}
.q i{font-style:normal}
.pt{font-family:var(--serif);font-style:italic;color:var(--muted);margin:0 0 .6rem}
figcaption{font-size:.88rem;color:var(--muted)}
.frame img{width:100%;aspect-ratio:4/5;object-fit:cover}
@media (min-width:900px){.words{grid-template-columns:5fr 7fr;gap:5rem}}

/* Video */
.vids{display:grid;gap:1.25rem}
.embed{position:relative;background:#000;overflow:hidden;border-radius:4px}
.r169{aspect-ratio:16/9}
.embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.embed.sp.open{aspect-ratio:auto;height:352px}.embed.sp.open iframe{position:static;height:352px}
.facade{position:absolute;inset:0;display:block;color:var(--ink);text-decoration:none}
.facade.sq{position:relative}
.facade img{width:100%;height:100%;object-fit:cover;transition:transform .6s,opacity .3s;opacity:.86}
.facade:hover img{transform:scale(1.03);opacity:1}
.facade::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.82),rgba(0,0,0,0) 55%)}
.pb{position:absolute;z-index:2;left:50%;top:46%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:rgba(11,15,20,.55);border:2px solid var(--ink);display:grid;place-items:center;backdrop-filter:blur(4px)}
.pb svg{width:24px;height:24px;margin-left:3px}
.big .pb{width:84px;height:84px}.big .pb svg{width:30px;height:30px}
.facade:hover .pb{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.ft{position:absolute;z-index:2;left:1rem;right:1rem;bottom:.9rem}
.ft b{display:block;font-size:1.15rem;line-height:1.2;letter-spacing:-.01em}.big .ft b{font-size:clamp(1.4rem,3vw,2rem)}
.ft small{display:block;font-size:.8rem;color:#d3d8de}
@media (min-width:900px){.vids{grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr}.vids .big{grid-row:span 2;aspect-ratio:auto;min-height:100%}}
.vids2{display:grid;gap:1.25rem;margin-top:1.25rem}@media (min-width:700px){.vids2{grid-template-columns:repeat(3,minmax(0,1fr))}}
.chan{list-style:none;margin:1.5rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:0 1.5rem}
.chan a{min-height:44px;display:inline-flex;align-items:center}

/* Songs */
.songs{display:grid;gap:2.5rem}
@media (min-width:900px){.songs{grid-template-columns:26rem 1fr;gap:4.5rem;align-items:start}}
.tracks{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.tracks li{display:grid;grid-template-columns:2.2rem 1fr auto;align-items:center;gap:.2rem .8rem;min-height:60px;padding:.35rem 0;border-bottom:1px solid var(--line)}
.tracks .n{color:var(--faint);font-variant-numeric:tabular-nums;font-size:.9rem}
.tracks b{font-weight:600;font-size:1.08rem}
.tracks .tag{display:block;font-size:.82rem;color:var(--muted)}
.tracks .go{min-height:44px;min-width:44px;display:inline-flex;align-items:center;justify-content:flex-end;gap:.4rem;font-size:.88rem;font-weight:600;text-decoration:none;color:var(--accent)}
.tracks .go svg{width:14px;height:14px}
.tracks .len{color:var(--faint);font-size:.9rem;font-variant-numeric:tabular-nums}

/* Algarve split */
.split{display:grid;grid-template-columns:minmax(0,1fr);gap:2rem;align-items:center}.split>*,.songs>*,.words>*,.livegrid>*,.solo>*,.bandgrid>*,.ghead>*{min-width:0}
.split .ph img{width:100%;aspect-ratio:4/5;object-fit:cover}
@media (min-width:900px){.split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:5rem}.split.rev .ph{order:2}}
.rmap{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:4px;margin-top:1.25rem}
.rmap text{paint-order:stroke;stroke:#0e1620;stroke-width:4px}

/* Live: photo band */
.live{position:relative;overflow:hidden}
.live>picture>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 20%;opacity:.38}
.live::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--bg) 0,rgba(11,15,20,.55) 30%,rgba(11,15,20,.8) 100%)}
.live .wrap{position:relative}
.livegrid{display:grid;gap:2.5rem}@media (min-width:900px){.livegrid{grid-template-columns:7fr 5fr;gap:5rem}}
.stages{list-style:none;padding:0;margin:0}
.stages li{padding:.8rem 0;border-bottom:1px solid rgba(167,176,186,.25)}
.stages time{display:block;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.stages b{font-weight:600}
.book{background:rgba(19,26,34,.92);border:1px solid var(--line);padding:1.6rem;border-radius:4px}
.book h3{font-size:1.5rem;letter-spacing:-.02em;margin-bottom:.6rem}
.formats{list-style:none;padding:0;margin:1rem 0;display:grid;gap:.5rem}
.formats li{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line);padding:.45rem 0;font-size:.95rem}
.formats span{color:var(--muted);text-align:right}
.mail{display:inline-flex;align-items:center;min-height:44px;font-size:clamp(1.05rem,4.6vw,1.3rem);font-weight:700;word-break:break-all}

/* Sources and footer */
.sources{padding-top:3rem;padding-bottom:2rem;font-size:.85rem;color:var(--muted)}
.sources h2{font-size:.75rem;letter-spacing:.22em;text-transform:uppercase;color:var(--faint);margin-bottom:.6rem}
.sources ol{padding-left:1.6rem;margin:.5rem 0}
.sources li a{color:var(--muted);display:inline-flex;align-items:center;min-height:44px;line-height:1.35}
@media (min-width:900px){.sources ol{columns:2;column-gap:3rem}.sources li{break-inside:avoid}}
.foot{border-top:1px solid var(--line);background:#080b0f;padding:3rem 0 2.5rem}
.foot .name{font-weight:800;letter-spacing:.18em;text-transform:uppercase;margin:0 0 .2rem}
.foot .row{display:flex;flex-wrap:wrap;gap:0 1.4rem;margin:.8rem 0}
.foot .row a{min-height:44px;display:inline-flex;align-items:center;font-size:.95rem}
.foot .credit{font-size:.82rem;color:var(--muted);border-top:1px solid var(--line);padding-top:1rem;margin-top:1.5rem}
.foot .quiet{font-size:.78rem;color:var(--faint)}.foot .quiet a{color:inherit;display:inline-flex;align-items:center;min-height:44px}
.mock{background:#e2a878;color:#1b1009;font:600 13px/1.4 var(--sans);text-align:center;padding:.5rem var(--g)}

/* About */
.ahead{display:grid;gap:0}
.ahead .ph img{width:100%;aspect-ratio:1/1;object-fit:cover;object-position:50% 30%}
.ahead .tx{padding:2.2rem var(--g) 0}
.ahead h1{font-size:clamp(3.4rem,15vw,6.5rem);line-height:.9;letter-spacing:-.045em;font-weight:800;margin-bottom:1.2rem}
@media (min-width:900px){.ahead{grid-template-columns:1fr 1fr;align-items:center;max-width:var(--wrap);margin:0 auto;padding:4rem var(--g) 0;gap:5rem}.ahead .tx{padding:0}.ahead .ph img{aspect-ratio:4/5}}
.story h2{font-size:clamp(1.8rem,5.5vw,2.8rem);line-height:1.05;letter-spacing:-.03em;font-weight:750;margin-bottom:1rem}
.pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.75rem;margin-top:0}.pair img{aspect-ratio:1/1;object-fit:cover;width:100%}
.qband{position:relative;min-height:34rem;display:flex;align-items:flex-end;overflow:hidden}
.qband>picture>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 40%}
.qband::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,9,12,.97) 0,rgba(6,9,12,.9) 60%,rgba(6,9,12,.2) 92%)}
.qband .wrap{position:relative;z-index:2;padding-top:6rem;padding-bottom:3.5rem}
.qband .q{font-size:clamp(1.35rem,4.2vw,2.2rem);max-width:52rem}
@media (min-width:900px){.qband::after{background:linear-gradient(90deg,rgba(6,9,12,.96) 0,rgba(6,9,12,.88) 52%,rgba(6,9,12,.2) 82%)}.qband{min-height:40rem;align-items:center}.qband .q,.qband .pt,.qband figcaption{max-width:40rem}}
.bio{display:grid;gap:1.5rem}
.bio div p{margin:0 0 .4rem}
.bio .ptx{font-family:var(--serif);font-style:italic;color:var(--muted)}
@media (min-width:900px){.bio div{display:grid;grid-template-columns:1fr 1fr;gap:3rem}}
.gal{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.75rem}
.gal figure{margin:0}.gal img{width:100%;aspect-ratio:4/5;object-fit:cover}
.gal figcaption{padding:.45rem 0 0;font-size:.8rem;line-height:1.4}
.gal a{display:block;text-decoration:none;color:inherit}
@media (min-width:900px){.gal{grid-template-columns:repeat(3,1fr);gap:1.5rem}.gal li.w{grid-column:span 2}.gal li.w img{aspect-ratio:auto;height:100%;max-height:none}}
/* Lyric lines (change 3) */
.lyr{margin:0 0 2rem}.lyr blockquote{margin:0 0 .5rem;font-family:var(--serif);font-style:italic;font-size:clamp(1.45rem,5vw,2.4rem);line-height:1.2;max-width:46rem;color:var(--ink)}
.lyr blockquote::before{content:"\\201C";color:var(--accent)}.lyr blockquote::after{content:"\\201D";color:var(--accent)}
.lyr figcaption{font-size:.85rem}
.lyrs{display:grid;gap:.5rem 3rem}.lyrs .lyr{border-top:1px solid var(--line);padding-top:1.2rem}.lyrs .lyr blockquote{font-size:clamp(1.3rem,4.4vw,1.8rem)}
@media (min-width:900px){.lyrs{grid-template-columns:1fr 1fr}}
/* Watch him play (change 1) */
.watch{background:linear-gradient(#0b0f14,#0e141b 30%,#0b0f14)}
.tabs{display:flex;gap:.5rem;overflow-x:auto;scrollbar-width:none;margin:0 calc(var(--g)*-1) 2rem;padding:0 var(--g)}
.tabs a{flex:none;display:inline-flex;align-items:center;min-height:44px;padding:0 1.1rem;border-radius:999px;border:1px solid var(--line);background:var(--s1);text-decoration:none;font-weight:600;font-size:.92rem;white-space:nowrap}
.tabs a[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.group{padding:1.6rem 0 2.4rem;border-top:1px solid var(--line)}
.group[hidden]{display:none}
.ghead{display:grid;gap:.6rem 2rem;align-items:end;margin-bottom:1.3rem}
.ghead h3{font-size:clamp(1.6rem,5vw,2.4rem);letter-spacing:-.03em;font-weight:750;line-height:1.05;margin-bottom:.5rem}
.ghead .eyebrow{margin-bottom:.5rem}.ghead p.muted{margin:0;max-width:44rem}
@media (min-width:900px){.ghead{grid-template-columns:1fr auto}}
.vc{position:relative;display:block;text-decoration:none;color:var(--ink)}
.vimg{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;border-radius:4px;background:#000}
.vimg img{width:100%;height:100%;object-fit:cover;transition:transform .6s,opacity .3s;opacity:.9}
.vc:hover .vimg img,.vc:focus-visible .vimg img{transform:scale(1.04);opacity:1}
.vc .pb{top:50%;width:52px;height:52px}.vc .pb svg{width:20px;height:20px}
.vc.xl .pb{width:76px;height:76px}.vc.xl .pb svg{width:28px;height:28px}
.vc:hover .pb{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.vt{display:block;padding:.6rem 0 0}.vt b{display:block;font-size:1rem;line-height:1.25}.vc.xl .vt b{font-size:clamp(1.15rem,2.6vw,1.5rem)}
.vt small{display:block;color:var(--muted);font-size:.82rem;margin-top:.15rem}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.bandgrid{display:grid;gap:1.4rem}@media (min-width:900px){.bandgrid{grid-template-columns:1.35fr 1fr;align-items:start}}
.solo{display:grid;gap:1.4rem}@media (min-width:900px){.solo{grid-template-columns:1.2fr 1fr;align-items:start}}
.rail{list-style:none;margin:0;padding:0 var(--g) .4rem;display:grid;grid-auto-flow:column;grid-auto-columns:62%;gap:.9rem;overflow-x:auto;scroll-snap-type:x mandatory;margin-left:calc(var(--g)*-1);margin-right:calc(var(--g)*-1);scroll-padding:0 var(--g)}
.rail li{scroll-snap-align:start}
@media (min-width:900px){.solo .rail{grid-auto-flow:row;grid-template-columns:1fr 1fr;grid-auto-columns:auto;overflow:visible;margin:0;padding:0}.solo .rail li:nth-child(n+5){display:none}.rail.wide{grid-auto-columns:calc((100% - 3*.9rem)/4);margin:0;padding:0}}
.sofa{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.9rem}
@media (min-width:900px){.sofa{grid-template-columns:repeat(4,minmax(0,1fr));gap:1.2rem}}
.vc.tall .vimg{aspect-ratio:4/5}
.player{width:min(70rem,calc(100% - 16px));padding:0;border:1px solid var(--line);border-radius:8px;background:#000;color:var(--ink)}
.player::backdrop{background:rgba(3,5,8,.9)}
.pl-head{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.4rem .4rem .4rem 1rem;background:var(--s1)}
.pl-head p{margin:0;font-weight:600;font-size:.95rem}
.pbox{aspect-ratio:16/9;background:#000}.pbox iframe{width:100%;height:100%;border:0;display:block}
.pl-note{margin:0;padding:.5rem 1rem;font-size:.8rem;color:var(--muted);background:var(--s1)}.pl-note a{display:inline-flex;min-height:44px;align-items:center}
.vids-in{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.25rem}
.vids-in a{display:inline-flex;align-items:center;gap:.3rem;min-height:44px;padding:0 .6rem;border:1px solid var(--line);border-radius:999px;font-size:.75rem;text-decoration:none;color:var(--muted)}
.vids-in a:hover{border-color:var(--accent);color:var(--accent)}.vids-in svg{width:10px;height:10px}
/* Designs control and dialog (change 2) */
.dsw-btn{display:inline-flex;align-items:center;gap:.5rem;min-height:44px;padding:0 1rem;border:1px solid rgba(242,237,230,.45);border-radius:999px;text-decoration:none;font-size:.88rem;font-weight:600;letter-spacing:.04em;background:rgba(11,15,20,.35)}
.dsw-btn svg{width:14px;height:14px;fill:var(--accent)}
.dsw-btn:hover{border-color:var(--accent)}
@media (max-width:899px){.top .brand{order:1}.dsw-btn{order:2}.top nav{order:3;width:100%}}
.dlg{width:min(66rem,calc(100% - 24px));max-height:calc(100svh - 24px);padding:0;border:1px solid var(--line);border-radius:10px;background:var(--s1);color:var(--ink);box-shadow:0 30px 80px rgba(0,0,0,.6)}
.dlg::backdrop{background:rgba(3,5,8,.78);backdrop-filter:blur(6px)}
.dlg-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding:1.3rem 1.3rem .4rem}
.dlg-head h2{font-size:1.7rem;letter-spacing:-.02em;font-weight:750}.dlg-head p{margin:.2rem 0 0;color:var(--muted);font-size:.92rem}
.x{min-height:44px;min-width:44px;padding:0 1rem;border-radius:999px;border:1px solid var(--line);background:var(--s2);color:var(--ink);font:600 .88rem var(--sans);cursor:pointer}
.x:hover{border-color:var(--accent)}
.dgrid{list-style:none;margin:0;padding:.8rem 1.3rem;display:grid;gap:.6rem}
.dgrid a{display:grid;grid-template-columns:8.5rem minmax(0,1fr);grid-template-rows:auto 1fr;gap:.15rem .9rem;padding:.5rem;border:1px solid var(--line);border-radius:8px;text-decoration:none;color:var(--ink);background:var(--bg)}
.dgrid img{grid-row:span 2;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:4px}
.dgrid .dn{display:flex;flex-wrap:wrap;align-items:baseline;gap:.2rem .6rem}.dgrid b{font-size:1.02rem}
.dgrid .cur{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}.dgrid .cur.dim{color:var(--faint)}
.dgrid .di{font-size:.82rem;line-height:1.4;color:var(--muted)}
.dgrid a:hover,.dgrid a[aria-current]{border-color:var(--accent)}
.dgrid a:hover img{filter:brightness(1.08)}
.dlg-foot{padding:0 1.3rem 1rem;margin:0}
@media (min-width:700px){.dgrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:1.1rem}.dgrid a{grid-template-columns:1fr;grid-template-rows:auto;padding:.6rem .6rem .9rem}.dgrid img{grid-row:auto;margin-bottom:.5rem}.dlg-head{padding:1.6rem 1.6rem .4rem}.dgrid{padding:1rem 1.6rem}.dlg-foot{padding:0 1.6rem 1.3rem}}
`;

const ALLD = [{ id: 'editorial', name: 'Editorial', idea: 'Dark and photo-led: his label\'s photographs lead, and his videos and album play in the page.', proposed: true }, ...L.DESIGNS];
const dialog = cur => `<dialog id="designs" class="dlg" aria-labelledby="dlg-h">
<div class="dlg-head"><div><h2 id="dlg-h">Designs</h2><p>The same facts about Marc Noah, laid out ${ALLD.length} ways. Choose one to see it.</p></div>
<form method="dialog"><button class="x" type="submit">Close</button></form></div>
<ul class="dgrid">
${ALLD.map(d => `<li><a href="#"${d.id === cur ? ' aria-current="page"' : ''}><img src="thumb-${d.id}.jpg" width="480" height="300" alt="" loading="lazy"><span class="dn"><b>${esc(d.name)}</b>${d.id === cur ? '<span class="cur">Showing</span>' : d.proposed ? '<span class="cur">Proposed home</span>' : d.default ? '<span class="cur dim">Home in round 1</span>' : ''}</span><span class="di">${esc(d.idea)}</span></a></li>`).join('\n')}
</ul>
<p class="dlg-foot"><a class="more" href="#">All designs on one page</a></p>
</dialog>`;
const nav = path => `<header class="top${path === '/' ? ' over' : ''}"><div class="wrap">
<a class="brand" href="#"${path === '/' ? ' aria-current="page"' : ''}>Marc Noah</a>
<nav aria-label="Main">${L.NAV.map(([h, t, s]) => `<a href="#"${h === path ? ' aria-current="page"' : ''}>${s ? `<span class="lg">${esc(t)}</span><span class="sm">${esc(s)}</span>` : esc(t)}</a>`).join('')}</nav>
<a class="dsw-btn" href="#" data-dialog="designs" aria-haspopup="dialog"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>Designs</a>
</div></header>
${dialog(path === '/' ? 'editorial' : null)}`;
const foot = c => `<footer class="foot"><div class="wrap">
<p class="name">${esc(FOOTER.name)}</p>
<p class="muted">${esc(FOOTER.line)}${c(FOOTER.src)}</p>
<p class="row">${LISTEN.filter(l => !/^Epopeia/.test(l.name)).map(l => `<a href="${esc(l.url)}">${esc(l.name)}</a>`).join('')}</p>
<p class="row"><a href="mailto:${CONTACT.email}">Bookings: ${CONTACT.email}</a>${c(CONTACT.src)}<a href="${esc(BOOKING.url)}">Epopeia Records</a></p>
<p class="credit">${esc(PHOTO_CREDIT)}${c('photos')}</p>
<p class="quiet">About this site: <a href="#">sources</a> · <a href="#">five designs</a> · <a href="#">use with AI</a> · <a href="#">llms.txt</a> · <a href="#">behind the scenes</a> · <a href="#">source code</a> · version v0.1.N · ${esc(FOOTER.approve)} Code Apache-2.0, text CC BY 4.0; the photographs are not covered.</p>
</div></footer>`;
const doc = (title, body) => `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="Round 2 design mock-up for the Marc Noah site, built from data/facts.mjs and data/photos.mjs.">
<style>${CSS}</style></head><body>
${body}
${PLAYER}
${SCRIPT}
</body></html>
`;

// Dark palette for the route map (proposal change 4: a palette option on routeMap()).
const darkMap = svg => svg.replace(/#cfe6ee/g, '#0e1620').replace(/#efe3cc/g, '#1c2530').replace(/#c9b48f/g, '#3a4654')
  .replace(/fill="#1f2328"/g, 'fill="#ece6dc"').replace(/#11607a/g, '#e2a878').replace(/#a8541a/g, '#c98d5e').replace(/#5d5a55/g, '#8b95a1').replace(/#4f4c47/g, '#a7b0ba').replace(/stroke="#fff"/g, 'stroke="#0b0f14"');

const T = n => TRACKS.find(t => t.title === n);
const rt = T('Roadtrip');

// ---------------- Watch him play (change 1): the videos, grouped by how you can book him ----------------
// Posters: YouTube's own poster frames, resized and kept in mockups/posters/ (the build self-hosts them
// under src/assets/video/). 6yUpmlZzrk0's frame carries a lyric line that is not cleared: cropped out.
const PSIZE = { 'S85R1WgyKJ0': [960, 540], 'q2P-ScNIL7w': [960, 540], 'OyvGbs1fg7g': [960, 540], 'ZBwgJ7Lg7-o': [960, 540], '5H8PBg1tQHc': [960, 540], 'RRTVycYkcOo': [960, 540], '6yUpmlZzrk0': [432, 540] };
const poster = (id, pos = '') => { const [w, h] = PSIZE[id] || [480, 270]; return `<img src="posters/${id}.jpg" width="${w}" height="${h}" alt="" loading="lazy" decoding="async"${pos ? ` style="object-position:${pos}"` : ''}>`; };
const vcard = (id, { title, sub, cls = '', pos = '' } = {}) => { const v = V(id); return `<a class="vc ${cls}" href="https://www.youtube.com/watch?v=${id}" data-yt="${id}" data-title="${esc(v.title)}">
<span class="vimg">${poster(id, pos)}<span class="pb">${PLAYI}</span></span>
<span class="vt"><b><span class="vh">Play </span>${esc(title || v.song || v.title)}</b><small>${esc(sub || v.channel)}</small></span></a>`; };
const fmt = n => FORMATS.find(f => f.name === n);
const srcOfV = ids => [...new Set(ids.flatMap(id => V(id).src))];
const ghead = (id, eyebrow, head, text, c, ids, book) => `<div class="ghead"><div><p class="eyebrow">${esc(eyebrow)}</p><h3 id="${id}">${esc(head)}</h3><p class="muted">${text}${c(srcOfV(ids))}</p></div>${book ? `<a class="btn line" href="#book">${esc(book)}</a>` : ''}</div>`;
const watch = c => {
  const band = ['S85R1WgyKJ0', 'q2P-ScNIL7w'];
  const soloSet = ['QyZMI8sPgow', 'f__TLj6ccQI', 'GdY-l97_vCU', 'RgJHbdZNpLM', '0u0iQvyGcCg', 'ANPCpT8ufMA', 'JB0jvIitE9I'];
  const sofa = [['ZBwgJ7Lg7-o', 'At home, the green chair', '50% 50%'], ['5H8PBg1tQHc', 'Among pine trees', '50% 50%'], ['RRTVycYkcOo', 'On a seafront promenade', '45% 50%'], ['6yUpmlZzrk0', 'By a lighthouse, on a jetty', '50% 50%']];
  const official = VIDEOS.filter(v => v.kind === 'official');
  const B = fmt('Band'), S = fmt('Solo'), D = fmt('Duo');
  return `<section class="band watch" id="watch" aria-labelledby="wth"><div class="wrap">
<p class="eyebrow">Watch</p>
<h2 class="sec" id="wth">Watch him play</h2>
<p class="lede muted" style="margin-bottom:1.4rem">With his band, on his own, on a green chair around the Algarve, and in his videos. ${VIDEOS.length} films; each plays here when you press it.</p>
<nav class="tabs" aria-label="Show videos"><a href="#g-all" data-f="all" aria-pressed="true">All</a><a href="#g-band" data-f="band" aria-pressed="false">With the band</a><a href="#g-solo" data-f="solo" aria-pressed="false">Solo</a><a href="#g-sofa" data-f="sofa" aria-pressed="false">Green Sofa</a><a href="#g-videos" data-f="videos" aria-pressed="false">Videos</a></nav>
<div class="group" data-g="band" id="g-band">
${ghead('gb', `Band · ${B.mins} min`, 'With the band', `${esc(B.people)}, ${esc(B.on.toLowerCase())}, as his label lists the format.${c(FORMATS_SRC)} On film: a full set at the Teatro Municipal de Portimão, and Sons no Castelo in Loulé, August 2026.`, c, band, 'Book the band')}
<div class="bandgrid">
${vcard('S85R1WgyKJ0', { title: 'Choque Frontal ao Vivo', sub: 'Full set · TEMPO, Portimão · 13 December 2023 · Alvor FM', cls: 'xl' })}
${vcard('q2P-ScNIL7w', { title: 'Sons no Castelo, Loulé', sub: 'Concert · August 2026 · his own channel', cls: 'xl' })}
</div></div>
<div class="group" data-g="solo" id="g-solo">
${ghead('gs', `Solo · ${S.mins} min · duo ${D.mins} min`, 'On his own', `Voice and acoustic guitar: ${esc(S.people)}, ${esc(S.on.toLowerCase())}; or as a duo.${c(FORMATS_SRC)} On film: the 9.º Festival Acústico, and a song-by-song set for Alvor FM. No duo film is listed yet.`, c, ['OyvGbs1fg7g', ...soloSet], 'Book him solo or as a duo')}
<div class="solo">
${vcard('OyvGbs1fg7g', { title: '9.º Festival Acústico', sub: 'Solo set · TEMPO, Portimão · 4 October 2023 · Alvor FM', cls: 'xl' })}
<ul class="rail" aria-label="Song by song, for Alvor FM">${soloSet.map(id => `<li>${vcard(id, { sub: 'Live · Alvor FM' })}</li>`).join('')}</ul>
</div></div>
<div class="group" data-g="sofa" id="g-sofa">
${ghead('gf', 'Green Sofa Sessions', 'One chair, one guitar', `The live versions of his first EP, filmed as the Green Sofa Sessions on the green sofa from his living room, then taken outdoors.`, c, sofa.map(s => s[0]), '')}
<ul class="sofa">${sofa.map(([id, where, pos]) => `<li>${vcard(id, { sub: where, cls: 'tall', pos })}</li>`).join('')}</ul>
</div>
<div class="group" data-g="videos" id="g-videos">
${ghead('gv', 'Videos', 'His videos', `Music and lyric videos on his label's Vevo channel, newest first.`, c, official.map(v => v.id), '')}
<ul class="rail wide">${official.map(v => `<li>${vcard(v.id, { title: v.title.replace(/^Marc Noah - /, '').replace(/ - /g, ', ').replace(/[()]/g, ''), sub: v.published ? fmtDate(v.published) : 'Vevo' })}</li>`).join('')}</ul>
</div>
<p class="small" style="margin-top:1.4rem">${esc(VIDEOS_NOTE)}${c(F.VIDEOS_SRC)} Captions and subtitles are YouTube's.</p>
</div></section>`;
};
const PLAYER = `<dialog id="player" class="player" aria-labelledby="pl-t">
<div class="pl-head"><p id="pl-t">Video</p><form method="dialog"><button class="x" type="submit">Close</button></form></div>
<div class="pbox"></div>
<p class="pl-note">Playing from YouTube (youtube-nocookie.com). <a id="pl-yt" href="#">Open on YouTube</a></p>
</dialog>`;

// ---------------- home ----------------
{
  const { c, list } = citer();
  const q = COMPOSER.quoteShort;
  const enQ = esc(q.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>');
  const body = `${nav('/')}
<main id="main">
<section class="hero" aria-labelledby="h">
${img('chair-dark', { eager: true })}
<div class="wrap">
<p class="eyebrow">${esc(PERSON.tagline)}</p>
<h1 id="h"><span>Marc</span><span>Noah</span></h1>
<p class="lede">${esc(HERO.line)}${c(HERO.src)}</p>
<p class="btns"><a class="btn" href="https://www.youtube.com/watch?v=S85R1WgyKJ0" data-yt="S85R1WgyKJ0" data-title="${esc(V('S85R1WgyKJ0').title)}"><span class="disc">${PLAYI}</span><span>Watch him live with his band<small>Choque Frontal ao Vivo, Portimão, December 2023</small></span></a></p>
<p class="small" style="margin:.6rem 0 0">Filmed by Alvor FM.${c(V('S85R1WgyKJ0').src)} <a class="more" href="#watch" style="color:var(--ink)">Or choose: band, solo, sessions, videos</a></p>
</div>
</section>

${watch(c)}

<section class="band rule" aria-labelledby="wh"><div class="wrap words">
<div class="frame">${img('portrait-bw', { sizes: '(min-width:900px) 30vw, 100vw' })}</div>
<div>
<p class="eyebrow" id="wh">${esc(COMPOSER.head)}</p>
<figure><blockquote class="q" style="margin:0 0 1.2rem">${enQ}</blockquote>
<p class="pt" lang="pt-PT">${esc(q.pt)}</p>
<figcaption>${esc(q.caption)}${c(q.src)}</figcaption></figure>
<p style="margin-top:1.5rem" class="muted">${L.ptWord(COMPOSER.labelLine.text, COMPOSER.labelLine.ptWord)}${c(COMPOSER.labelLine.src)}</p>
<a class="more" href="#">His story</a>
</div></div></section>

<section class="band rule" aria-labelledby="sh"><div class="wrap">
<p class="eyebrow">Listen</p>
<h2 class="sec" id="sh">${esc(ALBUM.title)}</h2>
${lyr(LY('Roadtrip'), c)}
<p class="lede muted" style="margin-bottom:2rem">${esc(ALBUM_LINE.text)}${c(ALBUM_LINE.src)}</p>
<div class="songs">
<div>${spFacade()}
<p class="btns"><a class="btn line" href="${esc(ALBUM.listen[1].url)}">Apple Music</a><a class="btn line" href="${esc(ALBUM.listen[2].url)}">YouTube</a></p></div>
<div><ol class="tracks">
${TRACKS.map(t => { const vs = VIDEOS.filter(v => v.song === t.title); const lab = { official: 'Video', live: 'Live', session: 'Sofa' }; return `<li><span class="n">${String(t.n).padStart(2, '0')}</span><span><b>${esc(t.title)}</b>${t.tag ? `<span class="tag">${esc(t.tag.text)}${c(t.tag.src)}</span>` : ''}${vs.length ? `<span class="vids-in">${vs.map(v => `<a href="https://www.youtube.com/watch?v=${v.id}" data-yt="${v.id}" data-title="${esc(v.title)}" aria-label="Play ${esc(v.title)}">${PLAYI}${/Lyric/.test(v.title) ? 'Lyric video' : lab[v.kind]}</a>`).join('')}</span>` : ''}</span><span class="len">${esc(t.len)}</span></li>`; }).join('\n')}
</ol>
<p class="small" style="margin-top:1rem">Track order from Apple Music; under each song, its videos, live versions and sessions, each playing here.${c(TRACKS_SRC)} <a class="more" href="#">All the songs, the singles and the EP</a></p></div>
</div></div></section>

<section class="band rule" aria-labelledby="ah"><div class="wrap split">
<div class="ph">${img('sofa-session-quarteira', { sizes: '(min-width:900px) 45vw, 100vw' })}</div>
<div>
<p class="eyebrow">Home</p>
<h2 class="sec" id="ah">The Algarve</h2>
<p class="lede">${esc(STORY[0].text)}${c(STORY[0].src)}</p>
<figure style="margin:0">${darkMap(routeMap({ id: 'hm', ...FEATURE.map }))}
<figcaption style="margin-top:.5rem">${esc(FEATURE.map.caption)} ${esc(FEATURE.map.scale)}${c(FEATURE.map.src)}</figcaption></figure>
<a class="more" href="#">Every place he has played</a>
</div></div></section>

<section class="band live" aria-labelledby="lh">
${img('live-acoustic')}
<div class="wrap">
<p class="eyebrow">Live</p>
<h2 class="sec" id="lh">On stage</h2>
<div class="livegrid">
<div><p class="lede">${esc(LIVE.count.text)}${c(LIVE.count.src)}</p>
<ul class="stages">${STAGES.map(g => `<li><time datetime="${g.date}">${fmtDate(g.date)}</time><b>${esc(g.venue)}</b>, ${esc(g.place)}${c(g.src)}</li>`).join('')}</ul>
<a class="more" href="#">Every date, with its source</a></div>
<div class="book" id="book"><h3>Book him</h3>
<p class="muted">His label, Epopeia Records, takes bookings for concerts and festivals.${c(BOOKING.src)}</p>
<ul class="formats">${FORMATS.map(f => `<li><b>${esc(f.name)}</b><span>${f.mins} min, ${esc(f.on.toLowerCase())}${f.name === 'Band' ? `<br>${esc(f.people)}` : ''}</span></li>`).join('')}</ul>
<p class="small">Formats as his label lists them.${c(FORMATS_SRC)}</p>
<p style="margin:1.2rem 0 .2rem" class="small">Write to</p>
<p><a class="mail" href="mailto:${CONTACT.email}">${CONTACT.email}</a>${c(CONTACT.src)}</p>
<p class="btns"><a class="btn line" href="${esc(BOOKING.url)}">His artist page at Epopeia</a></p>
</div></div></div></section>
</main>
${list()}
<p class="mock">Mock-up, round 2 (designer.marc-noah@AgentiCCells.dinis, 17 November 2026). Not the live site; links inside the site are placeholders.</p>
${foot(c)}`;
  writeFileSync(`${OUT}/home.html`, doc('Marc Noah, singer-songwriter, Algarve (round 2 mock-up)', body));
}

// ---------------- about ----------------
{
  const { c, list } = citer();
  const q = COMPOSER.quoteShort;
  const Q0 = QUOTES[0];
  const gallery = [['towers-bridges-piano', 'w'], ['green-sofa-session', ''], ['live-acoustic', ''], ['roadtrip-road', 'w'], ['autumn-leaves-tour', ''], ['green-sofa-session-ep', 'w']];
  const body = `${nav('/about/')}
<main id="main">
<section class="ahead" aria-labelledby="h">
<div class="ph">${img('portrait-bw', { eager: true, sizes: '(min-width:900px) 45vw, 100vw' })}</div>
<div class="tx">
<p class="eyebrow">About</p>
<h1 id="h">Marc Noah</h1>
<p class="lede">${esc(PERSON.oneLine)}${c(['epopeia', 'dinis'])}</p>
<figure style="margin:2rem 0 0;border-left:2px solid var(--accent);padding-left:1.2rem"><blockquote class="q" style="font-size:clamp(1.3rem,3.8vw,1.75rem);margin:0 0 .6rem">${esc(q.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>')}</blockquote>
<figcaption>${esc(q.caption)}${c(q.src)}</figcaption></figure>
</div></section>

<section class="band story" aria-labelledby="s1"><div class="wrap split">
<div class="ph">${img('sofa-session-quarteira', { sizes: '(min-width:900px) 45vw, 100vw' })}</div>
<div><p class="eyebrow">01</p><h2 id="s1">${esc(STORY[0].head)}</h2><p class="lede">${esc(STORY[0].text)}${c(STORY[0].src)}</p></div>
</div></section>

<section class="band story rule" aria-labelledby="s2"><div class="wrap split rev">
<div class="ph">${img('chair-dark', { sizes: '(min-width:900px) 45vw, 100vw', style: 'object-position:62% 50%' })}</div>
<div><p class="eyebrow">02</p><h2 id="s2">${esc(STORY[1].head)}</h2><p class="lede">${L.ptWord(STORY[1].text, 'cantautor')}${c(STORY[1].src)}</p></div>
</div></section>

<section class="band story rule" aria-labelledby="s3"><div class="wrap split">
<div class="pair">${img('giant-little-victories-cover', { sizes: '(min-width:900px) 22vw, 50vw' })}${img('green-sofa-session-ep', { sizes: '(min-width:900px) 22vw, 50vw' })}</div>
<div><p class="eyebrow">03</p><h2 id="s3">${esc(STORY[2].head)}</h2><p class="lede">${esc(STORY[2].text)}${c(STORY[2].src)}</p><a class="more" href="#">The songs, and the album to play</a></div>
</div></section>

<section class="qband" aria-labelledby="qh">
${img('towers-bridges-clouds')}
<div class="wrap">
<p class="eyebrow" id="qh">In his own words, on ${esc(Q0.about)}</p>
<figure style="margin:0"><blockquote class="q">${esc(Q0.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>')}</blockquote>
<p class="pt" lang="pt-PT">${esc(Q0.pt)}</p>
<figcaption>Marc Noah (our translation)${c(Q0.src)}</figcaption></figure>
</div></section>

<section class="band" aria-labelledby="lyh"><div class="wrap">
<p class="eyebrow">In his songs</p>
<h2 class="sec" id="lyh">Lines he wrote</h2>
<div class="lyrs">${LYRIC_LINES.map(l => lyr(l, c)).join('\n')}</div>
</div></section>
<section class="band" aria-labelledby="bh"><div class="wrap">
<p class="eyebrow">His label's words</p>
<h2 class="sec" id="bh">His story, as his label tells it</h2>
<p class="muted" style="max-width:40rem">From his artist page at Epopeia Records, in Portuguese as published, with our translation beside each paragraph.${c('epopeia')}</p>
<div class="bio">${BIO_PT.map(b => `<div><p class="ptx" lang="pt-PT">${esc(b.pt)}</p><p>${esc(b.en)}</p></div>`).join('\n')}</div>
<p class="small" style="margin-top:1.5rem">${esc(BIO_NOTE)}</p>
</div></section>

<section class="band rule" aria-labelledby="gh"><div class="wrap">
<p class="eyebrow">Photographs</p>
<h2 class="sec" id="gh">From his label</h2>
<ul class="gal">${gallery.map(([id, w]) => `<li class="${w}"><a href="${fn(P[id].file)}"><figure>${img(id, { sizes: w ? '(min-width:900px) 60vw, 50vw' : '(min-width:900px) 30vw, 50vw' })}<figcaption class="muted">${esc(P[id].alt.replace(/^Marc Noah,? /, '').replace(/^./, s => s.toUpperCase()))}</figcaption></figure></a></li>`).join('\n')}</ul>
<p class="small" style="margin-top:1.2rem">${esc(PHOTO_CREDIT)}${c('photos')}</p>
</div></section>

<section class="band rule" aria-labelledby="vh2"><div class="wrap" style="max-width:52rem;margin-left:auto;margin-right:auto">
<p class="eyebrow">His sound</p>
<h2 class="sec" id="vh2">His sound and his voice</h2>
<p class="lede">His label puts it as a gentle mix of pop, indie and rock. The Algarve press writes of an intimate sound and a husky voice (<i lang="pt">voz rouca</i>) that has become one of his marks.${c(['epopeia', 'avoz'])}</p>
<p class="btns"><a class="btn" href="${esc(rt.video.url)}"><span class="disc">${PLAYI}</span><span>Hear it: Roadtrip<small>${esc(rt.video.kind)} · ${esc(rt.len)}</small></span></a></p>
</div></section>
</main>
${list()}
<p class="mock">Mock-up, round 2 (designer.marc-noah@AgentiCCells.dinis, 17 November 2026). Not the live site; links inside the site are placeholders.</p>
${foot(c)}`;
  writeFileSync(`${OUT}/about.html`, doc('About Marc Noah (round 2 mock-up)', body));
}
console.log('ok');
