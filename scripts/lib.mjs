// Shared helpers for scripts/generate.mjs, scripts/designs.mjs and scripts/behind.mjs. Code Apache-2.0.
import { SITE, SOURCES, PLACES, SOURCES_NOTE, READ, PERSON, FOOTER, LISTEN, FORMATS, STAGES, FEATURE, VIDEOS, CONTACT, BOOKING, LYRIC_LINES, FORMATS_SRC } from '../data/facts.mjs';
import { PHOTOS, PHOTO_CREDIT, PHOTO_SOURCE, EMBEDS } from '../data/photos.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtDate = d => { const [y, m, dd] = d.split('-').map(Number); return `${dd} ${MONTHS[m - 1]} ${y}`; };
export const monShort = d => MONTHS[Number(d.split('-')[1]) - 1].slice(0, 3);

// Every source a marker may name: the facts file's SOURCES, plus the photographs' source from
// data/photos.mjs (id "photos"), which the footer's photo credit cites (round 2, change 8).
export const ALLSRC = { ...SOURCES, photos: PHOTO_SOURCE };
// Short labels for markers and source lists come from the facts file (SOURCES[id].short).
export const SHORT = Object.fromEntries(Object.entries(ALLSRC).map(([id, s]) => [id, s.short || s.title]));
// A compact source line, used by the four older designs. Its links are 24 px targets (round 1 follow-up 4).
export const cite = (ids, cls = 'cite') => {
  const list = [].concat(ids).filter(Boolean);
  for (const id of list) if (!ALLSRC[id]) throw new Error(`unknown source ${id}`);
  return `<small class="${cls}">Source${list.length > 1 ? 's' : ''}: ${list.map(id => `<a href="${esc(ALLSRC[id].url)}">${esc(SHORT[id])}</a>`).join(', ')}; read ${ALLSRC[list[0]].read.slice(0, 10)}.</small>`;
};
export const citeMd = ids => `(Source${[].concat(ids).length > 1 ? 's' : ''}: ${[].concat(ids).map(id => `[${SHORT[id]}](${ALLSRC[id].url})`).join(', ')})`;

// Numbered source markers and one source list per page (round 1, change 5).
// c(...ids) returns small numbered links, each with an accessible name ("Source 4: Epopeia Jornal,
// 28 Feb 2025"); list() returns the page's source list, numbered in order of first use, with the
// read date once and each exception written plainly.
export function citer() {
  const order = [];
  const num = id => {
    if (!ALLSRC[id]) throw new Error(`unknown source ${id}`);
    let i = order.indexOf(id);
    if (i < 0) { order.push(id); i = order.length - 1; }
    return i + 1;
  };
  const c = (...ids) => {
    const list = [...new Set(ids.flat(2).filter(Boolean))];
    if (!list.length) return '';
    return `<span class="fn">${list.map(id => { const n = num(id); return `<a href="#src-${n}" aria-label="Source ${n}: ${esc(SHORT[id])}">${n}</a>`; }).join('')}</span>`;
  };
  const list = (cls = '') => {
    if (!order.length) return '';
    const exceptions = order.filter(id => ALLSRC[id].read !== READ)
      .map(id => (SOURCES_NOTE.exceptions && SOURCES_NOTE.exceptions[id]) || `${ALLSRC[id].title}: read ${ALLSRC[id].read}.`);
    return `<section class="sources${cls ? ` ${cls}` : ''}" aria-labelledby="srch">
<h2 id="srch">Sources</h2>
<p>${esc(SOURCES_NOTE.readOnce)}${exceptions.map(e => ` ${esc(e)}`).join('')}</p>
<p><a class="more" href="/sources/">The full register is on the sources page</a></p>
<ol>
${order.map((id, i) => `<li id="src-${i + 1}"><a href="${esc(ALLSRC[id].url)}">${esc(ALLSRC[id].title)}</a></li>`).join('\n')}
</ol>
</section>`;
  };
  return { c, list, used: () => [...order] };
}
// Our own count of concerts: one marker that links to the "Our own counts" note on /sources/
// (round 2 review, decision on the count's markers).
export const countMark = '<span class="fn"><a href="/sources/#counts" aria-label="Source: our count, how it was made">how</a></span>';

// ---------- photographs (round 2, changes 3, 6, 7) ----------
const P = Object.fromEntries(PHOTOS.map(p => [p.id, p]));
// <picture>: the 800 px file under 700 px whatever the pixel density, the full file above; width,
// height and alt from PHOTOS; lazy unless eager (only the first-screen picture is eager).
export const photo = (id, { eager = false, cls = '', pos = '', alt } = {}) => {
  const p = P[id]; if (!p) throw new Error(`unknown photo ${id}`);
  const [w, h] = p.size;
  return `<picture><source media="(max-width:699px)" srcset="${p.small}"><img src="${p.file}" width="${w}" height="${h}" alt="${esc(alt ?? p.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${cls ? ` class="${cls}"` : ''}${pos ? ` style="object-position:${pos}"` : ''}></picture>`;
};
export const photoById = id => P[id];

// ---------- videos (round 2, change 1) ----------
// Posters: each video's own YouTube poster frame, self-hosted in src/assets/video/ (<id>.jpg 1280 px,
// <id>-640.jpg 640 px; made by scripts/cards.mjs --posters). Nothing is fetched from YouTube before a press.
export const V = id => { const v = VIDEOS.find(x => x.id === id); if (!v) throw new Error(`unknown video ${id}`); return v; };
const chan = v => /VEVO/.test(v.channel) ? 'marcnoahVEVO' : /Alvor/.test(v.channel) ? 'Alvor FM' : 'his own channel';
// Our label for the player heading and the iframe title (review 1.8): "<caption>, <channel>, YouTube".
export const vLabel = v => `${v.caption}, ${chan(v)}, YouTube`;
export const ytUrl = id => `https://www.youtube.com/watch?v=${id}`;
// Every source a video card states: the video, its event, place, date and format.
export const vSrc = list => [...new Set(list.flatMap(v => [...(v.src || []), ...(v.eventSrc || []), ...(v.placeSrc || []), ...(v.dateSrc || []), ...(v.formatSrc || [])]))];
const PLAYI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
export const PLAYICON = PLAYI;
// A link that opens the one player of the page. Without JS it is a plain link to the video on YouTube.
export const playAttrs = v => `href="${ytUrl(v.id)}" data-yt="${esc(EMBEDS.youtube(v.id))}" data-title="${esc(vLabel(v))}"`;
// A video card: poster, play mark, title and a line built from VIDEOS only (review 1.2).
export const videoCard = (v, { cls = '', big = false } = {}) => {
  const title = v.song || (v.event ? v.event.split(',')[0] : v.title);
  const sub = [v.caption, v.date ? fmtDate(v.date) : '', chan(v) === 'his own channel' ? 'his own channel' : chan(v)].filter(Boolean).join(' · ');
  return `<a class="vc${big ? ' xl' : ''}${cls ? ` ${cls}` : ''}" ${playAttrs(v)}>
<span class="vimg"><img src="/assets/video/${v.id}-640.jpg" srcset="/assets/video/${v.id}-640.jpg 640w, /assets/video/${v.id}.jpg 1280w" sizes="${big ? '(min-width:900px) 50vw, 100vw' : '(min-width:900px) 25vw, 70vw'}" width="640" height="360" alt="" loading="lazy" decoding="async"><span class="pb">${PLAYI}</span></span>
<span class="vt"><b><span class="vh">Play </span>${esc(title)}</b><small>${esc(sub)}</small></span></a>`;
};
// The one player of the site: a <dialog>; our script inserts the iframe on a press and removes it on close.
export const playerDialog = () => `<dialog id="player" class="player" aria-labelledby="pl-t">
<div class="pl-head"><h2 id="pl-t">Video</h2><form method="dialog"><button class="x" type="submit">Close</button></form></div>
<div class="pbox"></div>
<p class="pl-note">Playing from YouTube (youtube-nocookie.com). <a id="pl-yt" href="https://www.youtube.com/@marcnoahmusic">Open on YouTube</a></p>
</dialog>`;
// The Spotify album: the cover as a link to the album; our script swaps in Spotify's player on a press.
export const spotifyFacade = album => `<div class="sp" id="sp-album">
<a class="spf" href="${esc(album.listen[0].url)}" data-sp="${esc(EMBEDS.spotifyAlbum)}" data-title="${esc(album.title)}, Marc Noah, on Spotify" aria-label="Play the album ${esc(album.title)} on Spotify">
${photo('giant-little-victories-cover', { alt: '' })}
<span class="pb">${PLAYI}</span>
<span class="ft"><b>Play the album</b><small>${esc(album.title)} · 8 songs · plays from Spotify</small></span>
</a></div>`;

// ---------- lyric lines (round 2, change 4): only LYRIC_LINES, each attributed ----------
const norm = s => s.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ').trim();
export const lyricFor = song => LYRIC_LINES.find(l => norm(l.song) === norm(song));
export const lyricLine = (l, c, cls = '') => `<figure class="lyr${cls ? ` ${cls}` : ''}"><blockquote>${esc(l.text)}</blockquote><figcaption>From <b>${esc(l.song)}</b>${c(l.src)}</figcaption></figure>`;

// ---------- designs (change 2) ----------
export const DESIGNS = [
  { id: 'editorial', name: 'Editorial', idea: 'Dark and photo-led: his label’s photographs lead, and his videos and album play in the page.', default: true },
  { id: 'coast', name: 'The Coast', idea: 'Sun, sand and Atlantic blue: the drawn map of the Algarve leads, and his songs follow.', round1: true },
  { id: 'azulejo', name: 'Azulejo', idea: 'Portuguese blue and white tiles: each of his eight songs is a tile.' },
  { id: 'poster', name: 'Tour Poster', idea: 'A screen-printed gig poster: the dates and the towns lead, loud and close.' },
  { id: 'songbook', name: 'The Songbook', idea: 'A songwriter’s ruled notebook: one entry per song, in the order he released them.' },
  { id: 'cassette', name: 'Side A, Side B', idea: 'A cassette inlay card for the 1980s and 1990s music that shaped his sound: the album as Side A and Side B.' },
];
const NUMW = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const DCOUNT = NUMW[DESIGNS.length] || String(DESIGNS.length);
const GRID = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>';
// The Designs button: a real link to /d/; our script opens the dialog instead when it runs.
export const designsButton = () => `<a class="dsw-btn" href="/d/" data-dialog="designs" aria-haspopup="dialog">${GRID}Designs</a>`;
// cur: the design being shown ("editorial" on every main page, since they all use its system).
export const designsDialog = cur => `<dialog id="designs" class="dlg" aria-labelledby="dlg-h">
<div class="dlg-head"><div><h2 id="dlg-h">Designs</h2><p>The same facts about Marc Noah, laid out ${DCOUNT} ways. Choose one to see it.</p></div>
<form method="dialog"><button class="x" type="submit">Close</button></form></div>
<ul class="dgrid">
${DESIGNS.map(d => {
    const href = d.default ? '/' : `/d/${d.id}/`;
    const tags = [d.id === cur ? '<span class="cur">Showing</span>' : '', d.default ? '<span class="cur dim">Home</span>' : '', d.round1 ? '<span class="cur dim">Home in round 1</span>' : ''].join('');
    return `<li><a href="${href}"${d.id === cur ? ' aria-current="page"' : ''}><img src="/assets/designs/${d.id}.jpg" width="480" height="300" alt="" loading="lazy" decoding="async"><span class="dn"><b>${esc(d.name)}</b>${tags}</span><span class="di">${esc(d.idea)}</span></a></li>`;
  }).join('\n')}
</ul>
<p class="dlg-foot"><a class="more" href="/d/">All designs on one page</a></p>
</dialog>`;

// Our own script, inline on every page: click to play (YouTube in the one player, Spotify in place),
// the Designs dialog, the video filters. Nothing loads from YouTube or Spotify until a press.
export const SCRIPT = `<script>
(function(){var d=document,op=null;
function frame(src,title){var f=d.createElement('iframe');f.src=src;f.title=title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';return f;}
function open(dl,from){op=from;dl.showModal();}
d.querySelectorAll('.chips a[data-f]').forEach(function(a){var b=d.createElement('button');b.type='button';b.className='chip';b.textContent=a.textContent;b.setAttribute('data-f',a.getAttribute('data-f'));b.setAttribute('aria-pressed',a.getAttribute('data-f')==='all'?'true':'false');a.replaceWith(b);});
d.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;var a=t.closest('[data-dialog]'),mod=e.metaKey||e.ctrlKey||e.shiftKey;
if(a){var dl=d.getElementById(a.getAttribute('data-dialog'));if(dl&&dl.showModal){e.preventDefault();open(dl,a);}return;}
a=t.closest('a[data-yt]');if(a&&!mod){var p=d.getElementById('player');if(!p||!p.showModal)return;e.preventDefault();
p.querySelector('.pbox').replaceChildren(frame(a.getAttribute('data-yt'),a.getAttribute('data-title')));p.querySelector('#pl-t').textContent=a.getAttribute('data-title');p.querySelector('#pl-yt').href=a.href;
if(p.open)p.close();open(p,a);return;}
a=t.closest('a[data-sp]');if(a&&!mod){e.preventDefault();var f=frame(a.getAttribute('data-sp'),a.getAttribute('data-title'));f.height='352';a.parentNode.classList.add('open');a.replaceWith(f);f.focus();return;}
var b=t.closest('button[data-f]');if(b){var w=b.closest('.watch'),g=b.getAttribute('data-f');w.querySelectorAll('button[data-f]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
w.querySelectorAll('.group[data-g]').forEach(function(x){x.hidden=!(g==='all'||x.getAttribute('data-g')===g);});}});
d.querySelectorAll('dialog').forEach(function(dl){dl.addEventListener('click',function(e){if(e.target!==dl)return;var r=dl.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dl.close();});
dl.addEventListener('close',function(){var b=dl.querySelector('.pbox');if(b)b.replaceChildren();if(op){op.focus();op=null;}});});})();
</script>`;

// ---------- the main menu and footer, shared by generate.mjs, designs.mjs and behind.mjs ----------
// Each label is whole words in one text node; the short label shows under 600 px.
export const REPO = 'https://github.com/AgentiCCells/AgentiCCells__Site__Marc-Noah';
export const NAV = [['/songs/', 'Songs'], ['/algarve/', 'The Algarve', 'Algarve'], ['/live/', 'Live'], ['/about/', 'About'], ['/listen/', 'Listen and book', 'Book']];
// over: the header sits transparent over the home photograph. cur: the design marked in the dialog.
export const siteNav = (path, { over = false, cur = 'editorial' } = {}) => `<a class="skip" href="#main">Skip to content</a>
<header class="top${over ? ' over' : ''}"><div class="wrap">
<a class="brand" href="/"${path === '/' ? ' aria-current="page"' : ''}>Marc Noah</a>
<nav aria-label="Main">
${NAV.map(([h, t, s]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ''}>${s ? `<span class="lg">${esc(t)}</span><span class="sm">${esc(s)}</span>` : esc(t)}</a>`).join('\n')}
</nav>
${designsButton()}
</div></header>
${designsDialog(cur)}`;
// The credit lines for what the site borrows (review 8.2): the label's photographs and the video stills.
export const STILLS_CREDIT = 'Video stills: each video’s own YouTube frame, from its channel. Not covered by this site’s licence.';
// "His own site" links the Arquivo.pt copy until Marc says marcnoah.pt is live (review 8.3).
export const listenLinks = () => LISTEN.map(l => l.src === 'own-site' ? { ...l, name: 'His own site (archived)', url: SOURCES['own-site'].url } : l);
export const siteFoot = c => `<footer class="foot"><div class="wrap">
<p class="name">${esc(FOOTER.name)}</p>
<p class="muted">${esc(FOOTER.line)}${c(FOOTER.src)}</p>
<p class="row">${listenLinks().filter(l => !/^Epopeia/.test(l.name)).map(l => `<a href="${esc(l.url)}">${esc(l.name)}</a>`).join('\n')}</p>
<p class="row"><a href="mailto:${esc(CONTACT.email)}">Bookings: ${esc(CONTACT.email)}</a>${c(CONTACT.src)}<a href="${esc(BOOKING.url)}">Epopeia Records</a></p>
<p class="credit">${esc(PHOTO_CREDIT)}${c('photos')}<br>${esc(STILLS_CREDIT)}${c('yt-frames')}</p>
<p class="quiet">About this site: <a href="/sources/">sources</a> · <a href="/d/">${DCOUNT} designs</a> · <a href="/videos/">every film</a> · <a href="/agents/">use with AI</a> · <a href="/llms.txt">llms.txt</a> · <a href="/index.md">index.md</a> · <a href="/behind-the-scenes/">behind the scenes</a> · <a href="${REPO}">source code</a> · version __VERSION__ · ${esc(FOOTER.approve)} ${esc(FOOTER.noCopies)} ${esc(FOOTER.factory)} Code Apache-2.0, text and drawings CC BY 4.0; the photographs and video stills are not covered.</p>
</div></footer>`;
// One main page: menu, main (body, then the page's source list), footer, the player and our script.
// body is a string or a function of c (the page's marker function).
export function sitePage({ path, title, description, image = PERSON.share, imageAlt, body, css = '', wrap = true }) {
  const C = citer();
  const main = typeof body === 'function' ? body(C.c) : body;
  const foot = siteFoot(C.c);
  return `${head({ title, description, path, image, imageAlt, extra: css ? `<style>${css}</style>\n` : '' })}
<body>
${siteNav(path)}
<main id="main"${wrap ? ' class="wrap"' : ''}>
${main}
${wrap ? C.list() : `<div class="wrap">${C.list()}</div>`}
</main>
${foot}
${playerDialog()}
${SCRIPT}
</body>
</html>
`;
}

export const SHARE_ALT = 'Marc Noah sitting in an armchair against a dark background, with his name and the words singer-songwriter, Algarve. Photograph: Epopeia Records.';
export function head({ title, description, path, image, imageAlt = SHARE_ALT, extra = '', css = '/style.css', canonical, theme = '#0b0f14' }) {
  const url = `${SITE}${path}`;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical ? SITE + canonical : url)}">
<link rel="alternate" type="text/markdown" href="/index.md">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="${theme}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Marc Noah">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
${css ? `<link rel="stylesheet" href="${css}">\n` : ''}${extra}</head>`;
}

// The drawn map of the Algarve: an equirectangular sketch, not to scale.
const X = lon => Math.round((lon + 9.02) * 617), Y = lat => Math.round((37.33 - lat) * 763);
const COAST = [[-8.80, 37.45], [-8.86, 37.30], [-8.92, 37.17], [-8.99, 37.03], [-8.94, 37.00], [-8.88, 37.03], [-8.80, 37.05], [-8.67, 37.08], [-8.60, 37.11], [-8.53, 37.11], [-8.45, 37.09], [-8.36, 37.09], [-8.25, 37.08], [-8.15, 37.07], [-8.10, 37.06], [-8.02, 37.03], [-7.97, 37.00], [-7.90, 36.97], [-7.84, 37.00], [-7.75, 37.05], [-7.65, 37.11], [-7.55, 37.15], [-7.42, 37.18], [-7.43, 37.45]];
const LABEL = { quarteira: [-4, 40, 'end'], loule: [14, 8, 'start'], salir: [14, 8, 'start'], boliqueime: [0, -18, 'middle'], albufeira: [6, -18, 'end', 'Guia'], faro: [0, 36, 'middle'], olhao: [8, 36, 'start'], pechao: [14, 6, 'start'], portimao: [0, -18, 'middle'], raposeira: [14, 6, 'start'], sagres: [12, 30, 'start'] };
export function algarveMap({ land = '#e9dcc4', stroke = '#c9b48f', sea = '#cfe6ee', ink = '#1f2328', pin = '#d9822b', home = '#11607a', seaInk = '#11607a', font = 'inherit', id = 'm', ring = '#fff' } = {}) {
  const pts = COAST.map(([a, b]) => `${X(a)},${Y(b)}`).join(' ');
  const pins = PLACES.filter(p => p.algarve).map(p => {
    const x = X(p.lon), y = Y(p.lat), [dx, dy, an, short] = LABEL[p.id] || [12, -8, 'start'];
    const r = p.home ? 13 : 8;
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${p.home ? home : pin}" stroke="${ring}" stroke-width="3"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an}" font-weight="${p.home ? 700 : 600}">${esc(p.home ? p.name + ' (home)' : short || p.name)}</text></g>`;
  }).join('\n');
  return `<svg class="map" viewBox="0 0 1000 340" role="img" aria-labelledby="${id}t ${id}d" style="font-family:${font}">
<title id="${id}t">Drawn map of the Algarve</title>
<desc id="${id}d">A sketch of the Algarve coast from Sagres in the west to the Spanish border, marking Quarteira, where Marc Noah lives, and the towns where he has played: ${PLACES.filter(p => p.algarve && !p.home).map(p => p.name).join(', ')}. Not to scale.</desc>
<rect width="1000" height="340" fill="${sea}"/>
<polygon points="0,0 ${pts} 1000,0 1000,0" fill="${land}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>
<text x="500" y="326" text-anchor="middle" font-size="24" font-style="italic" fill="${seaInk}">Atlantic Ocean</text>
<text x="990" y="30" text-anchor="end" font-size="20" fill="${ink}" opacity=".85">The Algarve, Portugal · a sketch, not to scale</text>
<g font-size="25" fill="${ink}">
${pins}
</g>
</svg>`;
}
// The dark palette of the round 2 system (change 4): map labels #ece6dc on land #1c2530, 12.5:1.
export const DARK_MAP = { land: '#1c2530', sea: '#0e1620', stroke: '#3a4654', ink: '#ece6dc', home: '#e2a878', route: '#c98d5e', marked: '#8b95a1', ring: '#0b0f14', seaInk: '#a7b0ba' };
export const LIGHT_MAP = { land: '#efe3cc', sea: '#cfe6ee', stroke: '#c9b48f', ink: '#1f2328', home: '#11607a', route: '#a8541a', marked: '#5d5a55', ring: '#fff', seaInk: '#4f4c47' };

// The close map of the central Algarve (round 1, change 2): Quarteira largest, Loulé marked, a dashed
// line joining the given places in the given order (the order is ours; the caption says so).
const RLABEL = { quarteira: [-18, 34, 'end'], salir: [14, 7, 'start'], loule: [13, 7, 'start'], faro: [-8, -32, 'middle'], olhao: [-2, -16, 'middle'] };
export function routeMap({ id = 'rm', route, home, homeLabel, title, desc, marked = ['loule'], pal = LIGHT_MAP }) {
  const P = Object.fromEntries(PLACES.map(p => [p.id, p]));
  for (const r of [...route, home, ...marked]) if (!P[r]) throw new Error(`routeMap: unknown place ${r}`);
  const pts = COAST.map(([a, b]) => `${X(a)},${Y(b)}`).join(' ');
  const line = route.map(r => `${X(P[r].lon)},${Y(P[r].lat)}`).join(' ');
  const pin = (r, kind) => {
    const p = P[r], x = X(p.lon), y = Y(p.lat), [dx, dy, an] = RLABEL[r] || [12, 7, 'start'];
    const isHome = kind === 'home';
    const fill = isHome ? pal.home : kind === 'route' ? pal.route : pal.marked;
    const label = isHome ? homeLabel : p.name.replace(/ \(.*\)$/, '');
    return `<circle cx="${x}" cy="${y}" r="${isHome ? 13 : kind === 'route' ? 8 : 7}" fill="${fill}" stroke="${pal.ring}" stroke-width="3"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an}" font-weight="${isHome ? 700 : 600}"${isHome ? ` fill="${pal.home}" font-size="23"` : ''}>${esc(label)}</text>`;
  };
  return `<svg class="rmap" viewBox="360 34 430 250" role="img" aria-labelledby="${id}t ${id}d">
<title id="${id}t">${esc(title)}</title>
<desc id="${id}d">${esc(desc)}</desc>
<rect x="0" y="0" width="1000" height="340" fill="${pal.sea}"/>
<polygon points="0,0 ${pts} 1000,0" fill="${pal.land}" stroke="${pal.stroke}" stroke-width="3" stroke-linejoin="round"/>
<polyline points="${line}" fill="none" stroke="${pal.route}" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round" stroke-linejoin="round"/>
<g font-size="21" fill="${pal.ink}" font-family="system-ui,sans-serif">
${marked.filter(m => m !== home && !route.includes(m)).map(m => pin(m, 'marked')).join('\n')}
${route.filter(r => r !== home).map(r => pin(r, 'route')).join('\n')}
${pin(home, 'home')}
<text x="420" y="270" font-size="20" font-style="italic" fill="${pal.seaInk}">Atlantic Ocean</text>
</g>
</svg>`;
}

// Fragments shared by the main pages and the designs.
export const PLAY = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".18"/><path d="M9.5 7.5v9l7-4.5z" fill="currentColor"/></svg>';
// pt words set in italics with lang="pt", the rest escaped.
export const ptWord = (text, word) => word ? esc(text).replace(word, `<i lang="pt">${esc(word)}</i>`) : esc(text);
export const formatChips = () => `<ul class="formats">${FORMATS.map(f => `<li><b>${esc(f.name)}</b> ${f.mins} min, ${esc(f.on.toLowerCase())}${f.name === 'Band' ? `, ${esc(f.people)}` : ''}</li>`).join('')}</ul>`;
export const stageList = c => `<ul class="stages">${STAGES.map(g => `<li><time datetime="${g.date}">${fmtDate(g.date)}</time><b>${esc(g.venue)}</b>, ${esc(g.place)}${c(g.src)}</li>`).join('')}</ul>`;
export const mapFigure = (c, id, pal = LIGHT_MAP) => `<figure class="fig">${routeMap({ id, ...FEATURE.map, pal })}<figcaption>${esc(FEATURE.map.caption)} ${esc(FEATURE.map.scale)}${c(FEATURE.map.src)} <a class="more" href="/algarve/">Every place he has played</a></figcaption></figure>`;

// ---------- booking (round 2, change 7): the three formats, each with the film that shows it ----------
export const DUO_LINE = 'We have not found a film of him as a duo yet.';
const FILM_FOR = { Band: 'S85R1WgyKJ0', Solo: 'OyvGbs1fg7g' };
export const bookCard = (c, { id = 'book', head = 'Book him', tag = 'h3' } = {}) => `<div class="book" id="${id}"><${tag}>${esc(head)}</${tag}>
<p class="muted">His label, Epopeia Records, takes bookings for concerts and festivals.${c(BOOKING.src)}</p>
<p class="small" style="margin:1rem 0 .1rem">Write to</p>
<p style="margin:0"><a class="mail" href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a>${c(CONTACT.src)}</p>
<p class="small">${esc(CONTACT.text)}</p>
<ul class="formats">${FORMATS.map(f => { const v = FILM_FOR[f.name] && V(FILM_FOR[f.name]); return `<li><span class="fh"><b>${esc(f.name)}</b><span>${f.mins} min, ${esc(f.on.toLowerCase())}; ${esc(f.people)}</span></span>${v ? `<a class="film" ${playAttrs(v)}>${PLAYI}<span>Watch: ${esc(v.caption)}</span></a>` : `<span class="nofilm">${esc(DUO_LINE)}</span>`}</li>`; }).join('')}</ul>
<p class="small">Formats as his label lists them.${c(FORMATS_SRC)} Films: ${esc(V('S85R1WgyKJ0').caption)}${c(vSrc([V('S85R1WgyKJ0')]))}; ${esc(V('OyvGbs1fg7g').caption)}${c(vSrc([V('OyvGbs1fg7g')]))}.</p>
<p class="btns"><a class="btn line" href="${esc(BOOKING.url)}">His artist page at Epopeia</a></p>
</div>`;

// ---------- Watch him play (round 2, change 1): the films grouped by VIDEOS[].format ----------
// groups: which formats to show; chips: the filter (anchor links without JS, buttons with it);
// book: where the "Book" buttons go. Headings are h3 (the block sits under an h2).
const fmt = n => FORMATS.find(f => f.name === n);
export function watchGroups(c, { groups = ['band', 'solo', 'session', 'official'], book = '#book', chips = true } = {}) {
  const of = f => VIDEOS.filter(v => v.format === f);
  const B = fmt('Band'), S = fmt('Solo'), D = fmt('Duo');
  const band = of('band'), sets = band.filter(v => v.event && !v.formatBasis), songs = band.filter(v => v.formatBasis);
  const solo = of('solo'), sofa = of('session');
  const official = of('official').sort((a, b) => b.published.localeCompare(a.published));
  const ghead = (id, eyebrow, h, text, btn) => `<div class="ghead"><div><p class="eyebrow">${esc(eyebrow)}</p><h3 id="${id}">${esc(h)}</h3><p class="muted">${text}</p></div>${btn ? `<a class="btn line" href="${book}">${esc(btn)}</a>` : ''}</div>`;
  const G = {
    band: () => `<div class="group" data-g="band" id="g-band">
${ghead('gh-band', `Band · ${B.mins} min`, 'With the band', `${esc(B.people)}, ${esc(B.on.toLowerCase())}, as his label lists the format.${c(FORMATS_SRC)}`, 'Book the band')}
<div class="bandgrid">${sets.map(v => videoCard(v, { big: true })).join('\n')}</div>
${c(vSrc(sets))}
<h4 class="railh">Song by song from the same show, filmed by Alvor FM</h4>
<p class="small">Their frames carry the Choque Frontal ao Vivo mark and show him close up; we file them with the band set from that.${c(vSrc(songs))}</p>
<ul class="rail">${songs.map(v => `<li>${videoCard(v)}</li>`).join('')}</ul>
</div>`,
    solo: () => `<div class="group" data-g="solo" id="g-solo">
${ghead('gh-solo', `Solo · ${S.mins} min · duo ${D.mins} min`, 'On his own', `Solo: ${esc(S.people)}, ${esc(S.on.toLowerCase())}. Duo: ${esc(D.people)}, ${esc(D.on.toLowerCase())}.${c(FORMATS_SRC)} ${esc(DUO_LINE)}`, 'Book him solo or as a duo')}
<div class="solo">${solo.map(v => videoCard(v, { big: true })).join('\n')}
<p class="small">Filed as solo from what its poster frame shows: ${esc(solo.map(v => v.formatNote.replace(/^The poster frame shows /, '').replace(/\.$/, '')).join('; '))}.${c(vSrc(solo))}</p></div>
</div>`,
    session: () => `<div class="group" data-g="session" id="g-session">
${ghead('gh-session', 'Green Sofa Sessions', 'One chair, one guitar', `The live versions of his first EP were filmed as the Green Sofa Sessions, on the green sofa from his living room.${c(['own-gss'])}`, '')}
<ul class="sofa">${sofa.map(v => `<li>${videoCard(v, { cls: 'tall' })}</li>`).join('')}</ul>
${c(vSrc(sofa))}
</div>`,
    official: () => `<div class="group" data-g="official" id="g-official">
${ghead('gh-official', 'Videos', 'His videos', `Music and lyric videos on his label’s Vevo channel, newest first.`, '')}
<ul class="rail wide">${official.map(v => `<li>${videoCard(v)}</li>`).join('')}</ul>
${c(vSrc(official))}
</div>`,
  };
  const label = { band: 'With the band', solo: 'Solo', session: 'Green Sofa', official: 'Videos' };
  return `${chips ? `<nav class="chips" aria-label="Show films"><a href="#watch" data-f="all">All</a>${groups.map(g => `<a href="#g-${g}" data-f="${g}">${label[g]}</a>`).join('')}</nav>` : ''}
${groups.map(g => G[g]()).join('\n')}`;
}

// ---------- song rows with their films (round 2, changes 1 and 5) ----------
// Each chip's accessible name starts with its visible label and differs within a row (review 1.7).
const chipLabel = v => v.kind === 'official' ? (/lyric/i.test(v.title) ? 'Lyric video' : 'Video') : v.kind === 'live' ? 'Live' : 'Sofa';
export const filmsOf = title => VIDEOS.filter(v => v.song && norm(v.song) === norm(title));
export const trackRows = (tracks, c, { lyrics = false } = {}) => `<ol class="tracks">
${tracks.map(t => {
    const vs = filmsOf(t.title);
    const ly = lyrics && lyricFor(t.title);
    return `<li><span class="n">${String(t.n).padStart(2, '0')}</span><div><b>${esc(t.title)}</b>${t.tag ? `<span class="tag">${esc(t.tag.text)}${c(t.tag.src)}</span>` : ''}${ly ? lyricLine(ly, c, 'sm') : ''}${vs.length ? `<span class="vids-in">${vs.map(v => `<a ${playAttrs(v)} aria-label="${esc(chipLabel(v))}: play ${esc(v.title)}${v.kind === 'live' ? `, ${esc(chan(v))}` : ''}">${PLAYI}${esc(chipLabel(v))}</a>`).join('')}</span>` : ''}</div><span class="len">${esc(t.len)}</span></li>`;
  }).join('\n')}
</ol>`;
