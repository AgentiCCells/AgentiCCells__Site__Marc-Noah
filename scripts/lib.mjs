// Shared helpers for scripts/generate.mjs. Code Apache-2.0.
import { SITE, SOURCES, PLACES } from '../data/facts.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtDate = d => { const [y, m, dd] = d.split('-').map(Number); return `${dd} ${MONTHS[m - 1]} ${y}`; };
export const monShort = d => MONTHS[Number(d.split('-')[1]) - 1].slice(0, 3);

export const SHORT = {
  epopeia: 'Epopeia artist page', 'epo-roadtrip': 'Epopeia Jornal, 28 Feb 2025', 'epo-top-mar': 'Epopeia Jornal, 1 Apr 2025',
  'epo-top-apr': 'Epopeia Jornal, 2 May 2025', 'epo-ribeira': 'Epopeia Jornal, 3 Jun 2025', 'epo-glv': 'Epopeia agenda, album release',
  'epo-castelo': 'Epopeia agenda, 7 Aug 2026', 'epo-emersivo': 'Epopeia agenda, 10 Oct 2026', avoz: 'A Voz do Algarve, 5 Aug 2026',
  maisalgarve: 'Mais Algarve, 22 Mar 2023', postal: 'Postal do Algarve, 28 Jun 2024', apple: 'Apple Music', spotify: 'Spotify',
  youtube: 'YouTube (marcnoahVEVO)', dinis: 'Dinis Cruz, 17 Nov 2026', brief: 'marcnoah.pt, via the factory brief',
};
// A compact source line: every fact on the site carries one.
export const cite = (ids, cls = 'cite') => {
  const list = [].concat(ids).filter(Boolean);
  for (const id of list) if (!SOURCES[id]) throw new Error(`unknown source ${id}`);
  return `<small class="${cls}">Source${list.length > 1 ? 's' : ''}: ${list.map(id => `<a href="${esc(SOURCES[id].url)}">${esc(SHORT[id])}</a>`).join(', ')}; read ${SOURCES[list[0]].read.slice(0, 10)}.</small>`;
};
export const citeMd = ids => `(Source${[].concat(ids).length > 1 ? 's' : ''}: ${[].concat(ids).map(id => `[${SHORT[id]}](${SOURCES[id].url})`).join(', ')})`;

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

export const DESIGNS = [
  { id: 'coast', name: 'The Coast', idea: 'Sun, sand and Atlantic blue: the drawn map of the Algarve leads, and his songs follow.', default: true },
  { id: 'azulejo', name: 'Azulejo', idea: 'Portuguese blue and white tiles: each of his eight songs is a tile.' },
  { id: 'poster', name: 'Tour Poster', idea: 'A screen-printed gig poster: the dates and the towns lead, loud and close.' },
  { id: 'songbook', name: 'The Songbook', idea: 'A songwriter’s ruled notebook: one entry per song, in the order he released them.' },
  { id: 'cassette', name: 'Side A, Side B', idea: 'A cassette inlay card for the 1980s and 1990s music that shaped his sound: the album as Side A and Side B.' },
];
