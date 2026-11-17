// Shared helpers for scripts/generate.mjs. Code Apache-2.0.
import { SITE, SOURCES, PLACES, SOURCES_NOTE, READ, PERSON, FOOTER, LISTEN, FORMATS, STAGES, FEATURE } from '../data/facts.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtDate = d => { const [y, m, dd] = d.split('-').map(Number); return `${dd} ${MONTHS[m - 1]} ${y}`; };
export const monShort = d => MONTHS[Number(d.split('-')[1]) - 1].slice(0, 3);

// Short labels for markers and source lists come from the facts file (SOURCES[id].short).
export const SHORT = Object.fromEntries(Object.entries(SOURCES).map(([id, s]) => [id, s.short || s.title]));
// A compact source line: every fact on the site carries one.
export const cite = (ids, cls = 'cite') => {
  const list = [].concat(ids).filter(Boolean);
  for (const id of list) if (!SOURCES[id]) throw new Error(`unknown source ${id}`);
  return `<small class="${cls}">Source${list.length > 1 ? 's' : ''}: ${list.map(id => `<a href="${esc(SOURCES[id].url)}">${esc(SHORT[id])}</a>`).join(', ')}; read ${SOURCES[list[0]].read.slice(0, 10)}.</small>`;
};
export const citeMd = ids => `(Source${[].concat(ids).length > 1 ? 's' : ''}: ${[].concat(ids).map(id => `[${SHORT[id]}](${SOURCES[id].url})`).join(', ')})`;

// Numbered source markers and one source list per page (round 1, change 5).
// c(...ids) returns small numbered links, each with an accessible name ("Source 4: Epopeia Jornal,
// 28 Feb 2025"); list() returns the page's source list, numbered in order of first use, with the
// read date once and each exception written plainly.
export function citer() {
  const order = [];
  const num = id => {
    if (!SOURCES[id]) throw new Error(`unknown source ${id}`);
    let i = order.indexOf(id);
    if (i < 0) { order.push(id); i = order.length - 1; }
    return i + 1;
  };
  const c = (...ids) => {
    const list = [...new Set(ids.flat(2).filter(Boolean))];
    if (!list.length) return '';
    return `<span class="fn">${list.map(id => { const n = num(id); return `<a href="#src-${n}" aria-label="Source ${n}: ${esc(SHORT[id])}">${n}</a>`; }).join('')}</span>`;
  };
  const list = () => {
    if (!order.length) return '';
    const exceptions = order.filter(id => SOURCES[id].read !== READ)
      .map(id => (SOURCES_NOTE.exceptions && SOURCES_NOTE.exceptions[id]) || `${SOURCES[id].title}: read ${SOURCES[id].read}.`);
    return `<section class="sources" aria-labelledby="srch">
<h2 id="srch">Sources</h2>
<p>${esc(SOURCES_NOTE.readOnce)}${exceptions.map(e => ` ${esc(e)}`).join('')} The full register is on <a href="/sources/">the sources page</a>.</p>
<ol>
${order.map((id, i) => `<li id="src-${i + 1}"><a href="${esc(SOURCES[id].url)}">${esc(SOURCES[id].title)}</a></li>`).join('\n')}
</ol>
</section>`;
  };
  return { c, list, used: () => [...order] };
}

// The main menu and footer, shared by generate.mjs and behind.mjs (change 6).
// Each label is whole words in one text node; the short label shows under 600 px.
export const REPO = 'https://github.com/AgentiCCells/AgentiCCells__Site__Marc-Noah';
export const NAV = [['/songs/', 'Songs'], ['/algarve/', 'The Algarve', 'Algarve'], ['/live/', 'Live'], ['/about/', 'About'], ['/listen/', 'Listen and book', 'Book']];
export const siteNav = path => `<a class="skip" href="#main">Skip to content</a>
<header class="top wrap">
<a class="brand" href="/"${path === '/' ? ' aria-current="page"' : ''}>Marc Noah</a>
<nav aria-label="Main">
${NAV.map(([h, t, s]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ''}>${s ? `<span class="lg">${esc(t)}</span><span class="sm">${esc(s)}</span>` : esc(t)}</a>`).join('\n')}
</nav>
</header>`;
export const siteFoot = c => `<footer class="foot">
<div class="wrap">
<p class="who">${esc(FOOTER.name)}<span>${esc(FOOTER.line)}${c(FOOTER.src)}</span></p>
<p class="row">${LISTEN.filter(l => !/^Epopeia/.test(l.name)).map(l => `<a href="${esc(l.url)}">${esc(l.name)}</a>`).join('\n')}</p>
<p class="row"><a href="${esc(FOOTER.bookUrl)}">${esc(FOOTER.book)}</a></p>
<p class="quiet">About this site: <a href="/sources/">sources</a> · <a href="/d/">five designs</a> · <a href="/agents/">use with AI</a> · <a href="/llms.txt">llms.txt</a> · <a href="/index.md">index.md</a> · <a href="/behind-the-scenes/">behind the scenes</a> · <a href="${REPO}">source code</a> · version __VERSION__ · ${esc(FOOTER.approve)} ${esc(FOOTER.noCopies)} ${esc(FOOTER.factory)} Code Apache-2.0, text and drawings CC BY 4.0.</p>
</div>
</footer>`;
// One main page: menu, main (body, then the page's source list), footer.
// body is a string or a function of c (the page's marker function).
export function sitePage({ path, title, description, image = PERSON.share, body, css = '' }) {
  const C = citer();
  const main = typeof body === 'function' ? body(C.c) : body;
  const foot = siteFoot(C.c);
  return `${head({ title, description, path, image, extra: css ? `<style>${css}</style>\n` : '' })}
<body>
${siteNav(path)}
<main id="main" class="wrap">
${main}
${C.list()}
</main>
${foot}
</body>
</html>
`;
}

export function head({ title, description, path, image, extra = '', css = '/style.css', canonical }) {
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
<meta name="theme-color" content="#11607a">
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
<meta property="og:image:alt" content="Marc Noah, singer-songwriter, Algarve: the words, set over a drawn sun and Atlantic sea.">
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
export function algarveMap({ land = '#e9dcc4', stroke = '#c9b48f', sea = '#cfe6ee', ink = '#1f2328', pin = '#d9822b', home = '#11607a', seaInk = '#11607a', font = 'inherit', id = 'm' } = {}) {
  const pts = COAST.map(([a, b]) => `${X(a)},${Y(b)}`).join(' ');
  const pins = PLACES.filter(p => p.algarve).map(p => {
    const x = X(p.lon), y = Y(p.lat), [dx, dy, an, short] = LABEL[p.id] || [12, -8, 'start'];
    const r = p.home ? 13 : 8;
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${p.home ? home : pin}" stroke="#fff" stroke-width="3"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an}" font-weight="${p.home ? 700 : 600}">${esc(p.home ? p.name + ' (home)' : short || p.name)}</text></g>`;
  }).join('\n');
  return `<svg class="map" viewBox="0 0 1000 340" role="img" aria-labelledby="${id}t ${id}d" style="font-family:${font}">
<title id="${id}t">Drawn map of the Algarve</title>
<desc id="${id}d">A sketch of the Algarve coast from Sagres in the west to the Spanish border, marking Quarteira, where Marc Noah lives, and the towns where he has played: ${PLACES.filter(p => p.algarve && !p.home).map(p => p.name).join(', ')}. Not to scale.</desc>
<rect width="1000" height="340" fill="${sea}"/>
<polygon points="0,0 ${pts} 1000,0 1000,0" fill="${land}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>
<text x="500" y="326" text-anchor="middle" font-size="24" font-style="italic" fill="${seaInk}">Atlantic Ocean</text>
<text x="990" y="30" text-anchor="end" font-size="20" fill="${ink}" opacity=".7">The Algarve, Portugal · a sketch, not to scale</text>
<g font-size="25" fill="${ink}">
${pins}
</g>
</svg>`;
}

// The close map of the central Algarve (round 1, change 2): Quarteira largest and alone in
// sea-blue, Loulé marked, a dashed line joining the given places in the given order (the order
// is ours; the caption says so). Labels at 21 units render at about 17 px at 390 px.
const RLABEL = { quarteira: [-18, 34, 'end'], salir: [14, 7, 'start'], loule: [13, 7, 'start'], faro: [-8, -32, 'middle'], olhao: [-2, -16, 'middle'] };
export function routeMap({ id = 'rm', route, home, homeLabel, title, desc, marked = ['loule'] }) {
  const P = Object.fromEntries(PLACES.map(p => [p.id, p]));
  for (const r of [...route, home, ...marked]) if (!P[r]) throw new Error(`routeMap: unknown place ${r}`);
  const pts = COAST.map(([a, b]) => `${X(a)},${Y(b)}`).join(' ');
  const line = route.map(r => `${X(P[r].lon)},${Y(P[r].lat)}`).join(' ');
  const pin = (r, kind) => {
    const p = P[r], x = X(p.lon), y = Y(p.lat), [dx, dy, an] = RLABEL[r] || [12, 7, 'start'];
    const isHome = kind === 'home';
    const fill = isHome ? '#11607a' : kind === 'route' ? '#a8541a' : '#5d5a55';
    const label = isHome ? homeLabel : p.name.replace(/ \(.*\)$/, '');
    return `<circle cx="${x}" cy="${y}" r="${isHome ? 13 : kind === 'route' ? 8 : 7}" fill="${fill}" stroke="#fff" stroke-width="3"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an}" font-weight="${isHome ? 700 : 600}"${isHome ? ' fill="#11607a" font-size="23"' : ''}>${esc(label)}</text>`;
  };
  return `<svg class="rmap" viewBox="360 34 430 250" role="img" aria-labelledby="${id}t ${id}d">
<title id="${id}t">${esc(title)}</title>
<desc id="${id}d">${esc(desc)}</desc>
<rect x="0" y="0" width="1000" height="340" fill="#cfe6ee"/>
<polygon points="0,0 ${pts} 1000,0" fill="#efe3cc" stroke="#c9b48f" stroke-width="3" stroke-linejoin="round"/>
<polyline points="${line}" fill="none" stroke="#a8541a" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round" stroke-linejoin="round"/>
<g font-size="21" fill="#1f2328" font-family="system-ui,sans-serif">
${marked.filter(m => m !== home && !route.includes(m)).map(m => pin(m, 'marked')).join('\n')}
${route.filter(r => r !== home).map(r => pin(r, 'route')).join('\n')}
${pin(home, 'home')}
<text x="420" y="270" font-size="20" font-style="italic" fill="#4f4c47">Atlantic Ocean</text>
</g>
</svg>`;
}

// Fragments shared by the main pages and the Coast design (round 1).
export const PLAY = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".18"/><path d="M9.5 7.5v9l7-4.5z" fill="currentColor"/></svg>';
// pt words set in italics with lang="pt", the rest escaped.
export const ptWord = (text, word) => word ? esc(text).replace(word, `<i lang="pt">${esc(word)}</i>`) : esc(text);
export const formatChips = () => `<ul class="formats">${FORMATS.map(f => `<li><b>${esc(f.name)}</b> ${f.mins} min, ${esc(f.on.toLowerCase())}${f.name === 'Band' ? `, ${esc(f.people)}` : ''}</li>`).join('')}</ul>`;
export const stageList = c => `<ul class="stages">${STAGES.map(g => `<li><time datetime="${g.date}">${fmtDate(g.date)}</time><b>${esc(g.venue)}</b>, ${esc(g.place)}${c(g.src)}</li>`).join('')}</ul>`;
export const mapFigure = (c, id) => `<figure class="fig">${routeMap({ id, ...FEATURE.map })}<figcaption>${esc(FEATURE.map.caption)} ${esc(FEATURE.map.scale)}${c(FEATURE.map.src)} <a class="more" href="/algarve/">Every place he has played</a></figcaption></figure>`;

export const DESIGNS = [
  { id: 'coast', name: 'The Coast', idea: 'Sun, sand and Atlantic blue: the drawn map of the Algarve leads, and his songs follow.', default: true },
  { id: 'azulejo', name: 'Azulejo', idea: 'Portuguese blue and white tiles: each of his eight songs is a tile.' },
  { id: 'poster', name: 'Tour Poster', idea: 'A screen-printed gig poster: the dates and the towns lead, loud and close.' },
  { id: 'songbook', name: 'The Songbook', idea: 'A songwriter’s ruled notebook: one entry per song, in the order he released them.' },
  { id: 'cassette', name: 'Side A, Side B', idea: 'A cassette inlay card for the 1980s and 1990s music that shaped his sound: the album as Side A and Side B.' },
];
