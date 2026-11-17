// The five designs of the home page. Same facts, five layouts. Code Apache-2.0.
import * as F from '../data/facts.mjs';
import { esc, fmtDate, monShort, cite, head, algarveMap, DESIGNS, citer, siteNav, siteFoot, PLAY, ptWord, formatChips, stageList, mapFigure } from './lib.mjs';

const { PERSON, STORY, QUOTES, ALBUM, TRACKS, TRACKS_SRC, OTHER_RELEASES, LISTEN, FORMATS, FORMATS_SRC, PLACES, BEYOND, GIGS, GIGS_NOTE, GIGS_NOTE_SRC, BOOKING,
  HERO, FEATURE, COMPOSER, ALBUM_LINE, SONGS_PAGE, LIVE } = F;
const concerts = GIGS.filter(g => g.kind === 'concert');
const algarveTowns = PLACES.filter(p => p.algarve);

const switcher = id => `<nav class="dsw" aria-label="Designs"><span>Design:</span> ${DESIGNS.map(d => d.id === id ? `<b aria-current="page">${esc(d.name)}</b>` : `<a href="/d/${d.id}/">${esc(d.name)}</a>`).join(' · ')} · <a href="/d/">choose</a> · <a href="/">main site</a></nav>`;
const dfoot = id => `<footer class="dfoot">
<p>Every fact names its public source and the date it was read: see <a href="/sources/">sources</a>. No photos, audio or lyrics are copied here. Marc approves every change about him.</p>
<p>Pages: <a href="/songs/">songs</a> · <a href="/algarve/">the Algarve</a> · <a href="/live/">live</a> · <a href="/about/">about</a> · <a href="/listen/">listen and book</a> · <a href="/agents/">use with AI</a> · <a href="/index.md">index.md</a> · <a href="/behind-the-scenes/">behind the scenes</a></p>
<p>Made with the AgentiCCells site factory; a first version, materials to follow. Version __VERSION__ · design ${esc(DESIGNS.find(d => d.id === id).name)} · code Apache-2.0, text and drawings CC BY 4.0</p>
</footer>`;
const shell = (id, opts, css, body) => `${head({ title: `Marc Noah, singer-songwriter, Algarve (${DESIGNS.find(d => d.id === id).name})`, description: opts.description, path: `/d/${id}/`, image: opts.image, css: null, extra: `<style>${css}\n.dsw{font:14px/1.5 system-ui,sans-serif;padding:.5rem 1rem;display:flex;flex-wrap:wrap;gap:.25rem .4rem;align-items:baseline}.dsw a{color:inherit;display:inline-flex;align-items:center;min-height:44px}.dfoot{font:14px/1.6 system-ui,sans-serif;padding:1.5rem 1rem 3rem;max-width:60rem;margin:0 auto}.dfoot a{color:inherit}.cite{display:block;font:12px/1.4 system-ui,sans-serif;opacity:.75;margin-top:.25rem}.cite a{color:inherit}*{box-sizing:border-box}body{margin:0}img,svg{max-width:100%}</style>\n` })}
<body class="d-${id}">
${switcher(id)}
<main id="main">
${body}
</main>
${dfoot(id)}
</body>
</html>
`;
const quote0 = (cls = 'q') => `<figure class="${cls}"><blockquote lang="pt-PT">${esc(QUOTES[0].pt)}</blockquote><figcaption>${esc(QUOTES[0].en)} <i>(Marc Noah on his first album; our translation)</i> ${cite(QUOTES[0].src)}</figcaption></figure>`;
const vid = t => t.video ? `<a href="${t.video.url}">${esc(t.video.kind.toLowerCase())}</a>` : '';
const listenLinks = (sep = ' · ') => ALBUM.listen.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join(sep);
const channels = (sep = ' · ') => LISTEN.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join(sep);
const bookBlock = (tag = 'h2') => `<${tag}>Book Marc</${tag}><p>${esc(BOOKING.text)}</p><p>${FORMATS.map(f => `<b>${f.name}</b> ${f.mins} min, ${f.on.toLowerCase()}`).join(' · ')}</p>${cite([BOOKING.src])}<p><a href="${BOOKING.url}">Book through Epopeia Records</a> · <a href="https://www.marcnoah.pt/">marcnoah.pt</a></p>`;
const gigLine = g => `<time datetime="${g.date}">${fmtDate(g.date)}</time> · <b>${esc(g.place)}</b> · ${esc(g.venue)}${g.kind !== 'concert' ? ` (${g.kind})` : ''}`;

// ---------------- The Coast (the home page; round 1 design) ----------------
// Same coast() for / and /d/coast/: the home gets the main menu and footer, /d/coast/ keeps
// its design switcher, dfoot('coast') and the "four other designs" line (review condition 1.6).
function coast(opts) {
  const C = citer(), c = C.c;
  const q = COMPOSER.quoteShort;
  const enQuote = esc(q.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>'); // the title in italics, not in quotes (condition 3.2)
  const body = `
<section class="hero">
<div>
<p class="kick">${esc(HERO.kicker)}${c(HERO.kickerSrc)}</p>
<h1>${esc(PERSON.name)}</h1>
<p class="lead">${esc(HERO.line)}${c(HERO.src)}</p>
<article class="song" aria-labelledby="feat">
<p class="over">${esc(FEATURE.head)}</p>
<h2 id="feat">${esc(FEATURE.title)}</h2>
<p>${FEATURE.lines.map(l => `${esc(l.text)}${c(l.src)}`).join(' ')}</p>
<blockquote>“${esc(FEATURE.quoteShort.en)}”</blockquote>
<p class="cap">${esc(FEATURE.quoteShort.caption)}${c(FEATURE.quoteShort.src)}</p>
<p class="btns"><a class="btn" href="${esc(FEATURE.url)}">${PLAY}${esc(FEATURE.button)}</a><a class="btn alt" href="${esc(ALBUM.listen[0].url)}">Album on ${esc(ALBUM.listen[0].name)}</a><a class="btn alt" href="${esc(ALBUM.listen[1].url)}">${esc(ALBUM.listen[1].name)}</a></p>
</article>
</div>
${mapFigure(c, opts.home ? 'hm' : 'cm')}
</section>
<section class="block" aria-labelledby="w">
<h2 class="h" id="w">${esc(COMPOSER.head)}</h2>
<div class="words">
<figure class="pull">
<blockquote>${enQuote}</blockquote>
<p class="pt" lang="pt-PT">${esc(q.pt)}</p>
<figcaption>${esc(q.caption)}${c(q.src)}</figcaption>
</figure>
<p>${ptWord(COMPOSER.labelLine.text, COMPOSER.labelLine.ptWord)}${c(COMPOSER.labelLine.src)} <a class="more" href="${esc(COMPOSER.more.href)}">${esc(COMPOSER.more.text)}</a></p>
</div>
</section>
<section class="block" aria-labelledby="s">
<div class="albumhead"><h2 class="h" id="s">His songs: ${esc(ALBUM.title)}</h2>
<p>${esc(ALBUM_LINE.text)}${c(ALBUM_LINE.src)}</p></div>
<ol class="tracks">
${TRACKS.map(t => `<li><span class="n">${t.n}</span><span><b>${esc(t.title)}</b>${t.tag ? `<span class="tag">${esc(t.tag.text)}${c(t.tag.src)}</span>` : ''}</span>${t.video ? `<a class="go" href="${esc(t.video.url)}" aria-label="Watch ${esc(t.title)} on YouTube">${PLAY}Watch</a>` : `<span class="len">${esc(t.len)}</span>`}</li>`).join('\n')}
</ol>
<p class="btns">${ALBUM.listen.map((l, i) => `<a class="btn${i ? ' alt' : ''}" href="${esc(l.url)}">${i ? '' : PLAY}${esc(l.name)}</a>`).join('')}</p>
<p class="small-note">Track order from Apple Music; videos from his YouTube channel.${c(TRACKS_SRC)} <a class="more" href="/songs/">${esc(SONGS_PAGE.allLink)}</a></p>
</section>
<section class="block cols" aria-labelledby="l">
<div><h2 class="h" id="l">On stage</h2>
<p>${esc(LIVE.count.text)}${c(LIVE.count.src)} Some of the stages:</p>
${stageList(c)}
<p><a class="more" href="/live/">Every date, with its source</a></p>
</div>
<div><h2 class="h" id="book">Book him</h2>
<p>His label, Epopeia Records, takes bookings for concerts and festivals. He plays in three formats:${c(BOOKING.src, FORMATS_SRC)}</p>
${formatChips()}
<p class="btns"><a class="btn" href="${esc(LIVE.url)}">${esc(LIVE.button)}</a></p>
<p><a class="more" href="/live/">How he plays, and every date</a></p>
</div>
</section>
${opts.home ? '' : `<p class="c-designs">This page in four other designs: ${DESIGNS.filter(d => d.id !== 'coast').map(d => `<a class="more" href="/d/${d.id}/">${esc(d.name)}</a>`).join(' · ')}.</p>`}`;
  const foot = opts.home ? siteFoot(c) : dfoot('coast');
  return `${head({ title: 'Marc Noah, singer-songwriter, Algarve', description: opts.description, path: opts.home ? '/' : '/d/coast/', image: opts.image, canonical: '/', extra: opts.home ? '' : `<style>.dsw{font:14px/1.5 system-ui,sans-serif;padding:.5rem 1rem;display:flex;flex-wrap:wrap;gap:.25rem .4rem;align-items:center}.dsw a{color:inherit;display:inline-flex;align-items:center;min-height:44px}.dfoot{font:14px/1.6 system-ui,sans-serif;padding:1.5rem 1rem 3rem;max-width:60rem;margin:0 auto}.dfoot a{color:inherit}</style>\n` })}
<body>
${opts.home ? siteNav('/') : switcher('coast')}
<main id="main" class="wrap">
${body}
${C.list()}
</main>
${foot}
</body>
</html>
`;
}

// ---------------- Azulejo ----------------
const tile = (i, c1 = '#1d4f91') => {
  const shapes = [
    `<circle cx="50" cy="50" r="22" fill="none" stroke="${c1}" stroke-width="5"/><path d="M50 0v28M50 72v28M0 50h28M72 50h28" stroke="${c1}" stroke-width="5"/>`,
    `<path d="M50 8 92 50 50 92 8 50Z" fill="none" stroke="${c1}" stroke-width="5"/><circle cx="50" cy="50" r="10" fill="${c1}"/>`,
    `<path d="M0 0q50 30 100 0M0 100q50-30 100 0M0 0q30 50 0 100M100 0q-30 50 0 100" fill="none" stroke="${c1}" stroke-width="5"/><circle cx="50" cy="50" r="8" fill="${c1}"/>`,
    `<path d="M50 14c10 20 26 26 36 36-10 10-26 16-36 36-10-20-26-26-36-36 10-10 26-16 36-36Z" fill="${c1}"/>`,
  ];
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#fbfaf6"/>${shapes[i % 4]}<rect x="2" y="2" width="96" height="96" fill="none" stroke="${c1}" stroke-width="2" opacity=".5"/></svg>`;
};
function azulejo(opts) {
  const css = `body{background:#fbfaf6;color:#122a4d;font:17px/1.6 Georgia,"Times New Roman",serif}a{color:#1d4f91}
.a-band{height:56px;background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><rect width="56" height="56" fill="#1d4f91"/><path d="M28 6 50 28 28 50 6 28Z" fill="none" stroke="#fbfaf6" stroke-width="3"/><circle cx="28" cy="28" r="6" fill="#fbfaf6"/></svg>')}");background-size:56px}
.a-wrap{max-width:62rem;margin:0 auto;padding:0 1rem}.a-hero{text-align:center;padding:2.5rem 1rem 2rem;border:3px double #1d4f91;margin:2rem 0;background:#fff}
.a-hero h1{font-size:clamp(2.8rem,11vw,5.5rem);margin:0;font-weight:400;letter-spacing:.04em}.a-hero .t{font-variant:small-caps;letter-spacing:.2em;font-size:1.05rem}
.a-hero .l{font-size:1.3rem;max-width:36rem;margin:1rem auto}
.a-story{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:0;border:2px solid #1d4f91}.a-story article{padding:1.2rem;border:1px solid #1d4f91;background:#fff}.a-story h2{font-weight:400;font-size:1.35rem;margin:0 0 .4rem;color:#1d4f91}
h2.a-h{text-align:center;font-weight:400;font-size:2rem;margin:3rem 0 1rem;color:#1d4f91}h2.a-h::before,h2.a-h::after{content:" ✦ ";font-size:1rem;vertical-align:middle}
.a-tiles{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(13.5rem,1fr));gap:6px;background:#1d4f91;border:6px solid #1d4f91}
.a-tiles li{background:#fff;padding:.8rem;display:flex;flex-direction:column;gap:.2rem}.a-tiles svg{width:64px;height:64px}.a-tiles h3{margin:.2rem 0 0;font-weight:400;font-size:1.3rem}.a-tiles .m{font:13px/1.4 system-ui,sans-serif;color:#41577a}
.a-q{background:#fff;border:2px solid #1d4f91;padding:1.25rem;margin:1.5rem 0}.a-q blockquote{margin:0;font-style:italic;font-size:1.1rem}.a-q figcaption{margin-top:.6rem;color:#41577a}
.a-places{columns:2 18rem;column-gap:2rem;padding-left:1.1rem}.a-places li{break-inside:avoid;margin:.4rem 0}
.a-gigs{list-style:none;padding:0;columns:2 20rem;column-gap:2rem;font-size:.95rem}.a-gigs li{break-inside:avoid;padding:.3rem 0;border-bottom:1px dotted #1d4f91}
.a-box{background:#fff;border:2px solid #1d4f91;padding:1.25rem;margin:2rem 0}.a-btns a{display:inline-block;margin:.25rem;padding:.5rem 1rem;border:2px solid #1d4f91;text-decoration:none;background:#1d4f91;color:#fff}
.a-map{border:6px solid #1d4f91}`;
  const body = `<div class="a-band" aria-hidden="true"></div>
<div class="a-wrap">
<section class="a-hero"><p class="t">${esc(PERSON.tagline)}</p><h1>Marc Noah</h1><p class="l">He lives in the Algarve, he writes his own songs, and these eight tiles are his first album.</p><p class="a-btns">${ALBUM.listen.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join('')}</p></section>
<section class="a-story">${STORY.map(s => `<article><h2>${esc(s.head)}</h2><p>${esc(s.text)}</p>${cite(s.src)}</article>`).join('')}</section>
<h2 class="a-h">${ALBUM.title}</h2>
<p style="text-align:center">${ALBUM.kind}, ${ALBUM.released}, ${ALBUM.label}. ${esc(ALBUM.note)}</p>
<ul class="a-tiles">
${TRACKS.map((t, i) => `<li>${tile(i)}<h3>${esc(t.title)}</h3><span class="m">Track ${t.n} · ${t.len} · first out ${fmtDate(t.first)}</span>${t.video ? `<span class="m">${vid(t)}</span>` : ''}</li>`).join('\n')}
</ul>
${cite(TRACKS_SRC)}
${quote0('a-q')}
<p>Before the album: ${OTHER_RELEASES.map(r => `<b>${esc(r.title)}</b> (${r.kind.toLowerCase()}): ${esc(r.text)}`).join(' ')} ${cite(['epopeia', 'apple'])}</p>
<h2 class="a-h">His Algarve</h2>
<div class="a-map">${algarveMap({ id: 'am', land: '#fff', stroke: '#1d4f91', sea: '#dbe6f5', ink: '#122a4d', pin: '#1d4f91', home: '#c0392b', seaInk: '#1d4f91', font: 'Georgia,serif' })}</div>
<ul class="a-places">${algarveTowns.map(p => `<li><b>${esc(p.name)}</b>${p.home ? ' (home)' : ''}: ${esc(p.text)} ${cite(p.src)}</li>`).join('')}</ul>
<p>${BEYOND.map(b => `<b>${esc(b.name)}</b>: ${esc(b.text)}`).join(' ')} ${cite(['epopeia', 'epo-roadtrip'])}</p>
<h2 class="a-h">On stage</h2>
<ul class="a-gigs">${concerts.map(g => `<li>${gigLine(g)}</li>`).join('')}</ul>
<p>${esc(GIGS_NOTE)} ${cite(['epopeia', 'avoz', 'postal', 'maisalgarve'])}</p>
<section class="a-box">${bookBlock()}<h2>Follow</h2><p>${channels()}</p></section>
</div>
<div class="a-band" aria-hidden="true"></div>`;
  return shell('azulejo', opts, css, body);
}

// ---------------- Tour Poster ----------------
function poster(opts) {
  const css = `body{background:#f4e9d8;color:#1b1b1b;font:16px/1.5 "Arial Narrow","Helvetica Neue",Arial,sans-serif}a{color:inherit}
.p-sheet{max-width:58rem;margin:1rem auto;background:#f9f1e3;border:10px solid #1b1b1b;position:relative;overflow:hidden}
.p-top{background:#e2552b;color:#f9f1e3;padding:1.5rem 1.25rem 1rem;position:relative}
.p-top h1{font:900 clamp(3.5rem,17vw,9rem)/.85 Impact,"Arial Black","Helvetica Neue",sans-serif;text-transform:uppercase;margin:0;letter-spacing:-.01em}
.p-top .t{font-weight:700;text-transform:uppercase;letter-spacing:.3em;margin:0 0 .5rem}.p-top .l{font-size:clamp(1.1rem,3.5vw,1.5rem);font-weight:700;max-width:30rem;margin:.75rem 0 0}
.p-sun{position:absolute;right:-3rem;top:-3rem;width:16rem;height:16rem;border-radius:50%;background:repeating-radial-gradient(circle,#f2b134 0 10px,#e2552b 10px 18px);opacity:.9}
.p-top>*{position:relative}
.p-band{background:#1b1b1b;color:#f2b134;font:900 1.1rem/1 Impact,"Arial Black",sans-serif;text-transform:uppercase;letter-spacing:.15em;padding:.6rem 1rem;white-space:nowrap;overflow:hidden}
.p-body{padding:1.25rem}.p-dates{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:0 1.5rem}
.p-dates li{display:grid;grid-template-columns:4.2rem 1fr;gap:.6rem;align-items:baseline;border-bottom:2px solid #1b1b1b;padding:.45rem 0}
.p-dates .d{font:900 1.35rem/1 Impact,"Arial Black",sans-serif;text-transform:uppercase}.p-dates .d small{display:block;font:700 .75rem/1.2 Arial,sans-serif;letter-spacing:.1em}
.p-dates b{text-transform:uppercase;font-size:1.05rem;display:block}.p-dates .v{font-size:.9rem}
.p-h{font:900 clamp(1.8rem,6vw,3rem)/1 Impact,"Arial Black",sans-serif;text-transform:uppercase;margin:1.75rem 0 .75rem;border-top:6px solid #1b1b1b;padding-top:.5rem}
.p-story{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1.25rem}.p-story h3{font:900 1.5rem/1.05 Impact,"Arial Black",sans-serif;text-transform:uppercase;margin:0 0 .35rem;color:#e2552b}
.p-tracks{counter-reset:t;list-style:none;padding:0;columns:2 15rem}.p-tracks li{font:900 1.5rem/1.25 Impact,"Arial Black",sans-serif;text-transform:uppercase;break-inside:avoid}.p-tracks small{font:600 .8rem Arial,sans-serif;text-transform:none;display:block;margin-bottom:.4rem}
.p-q{background:#1b1b1b;color:#f9f1e3;padding:1.25rem;margin:1.25rem 0}.p-q blockquote{margin:0;font-size:1.1rem;font-weight:700}.p-q a{color:#f2b134}
.p-stamp{display:inline-block;border:4px solid #e2552b;color:#e2552b;padding:.4rem .8rem;transform:rotate(-4deg);font:900 1.2rem Impact,"Arial Black",sans-serif;text-transform:uppercase;text-decoration:none}`;
  const towns = [...new Set(concerts.map(g => g.place.replace(/, Azores$/, '')))];
  const body = `<div class="p-sheet">
<section class="p-top"><span class="p-sun" aria-hidden="true"></span><p class="t">${esc(PERSON.tagline)} · live</p><h1>Marc<br>Noah</h1><p class="l">Lives in the Algarve. Writes his own songs. Has played them in ${towns.length} places since 2023.</p></section>
<div class="p-band" aria-hidden="true">${towns.map(esc).join(' ★ ')}</div>
<div class="p-body">
<h2 class="p-h">Every date</h2>
<ul class="p-dates">
${GIGS.map(g => `<li><span class="d">${g.date.slice(8)} ${monShort(g.date)}<small>${g.date.slice(0, 4)}${g.time ? ` · ${esc(g.time)}` : ''}</small></span><span><b>${esc(g.place)}</b><span class="v">${esc(g.venue)}${g.kind !== 'concert' ? ` (${g.kind})` : ''}</span></span></li>`).join('\n')}
</ul>
${cite(['epopeia', 'maisalgarve', 'postal', 'epo-ribeira', 'avoz'])}
<p>No future dates listed as of ${F.READ}. ${esc(GIGS_NOTE)}</p>
<h2 class="p-h">The story</h2>
<div class="p-story">${STORY.map(s => `<div><h3>${esc(s.head)}</h3><p>${esc(s.text)}</p>${cite(s.src)}</div>`).join('')}</div>
<h2 class="p-h">The songs: ${ALBUM.title}</h2>
<p>${ALBUM.kind}, ${ALBUM.released}, ${ALBUM.label}. Listen: ${listenLinks()}</p>
<ol class="p-tracks">${TRACKS.map(t => `<li>${esc(t.title)}<small>${t.len} · first out ${fmtDate(t.first)}${t.video ? ` · ${vid(t)}` : ''}</small></li>`).join('')}</ol>
${cite(TRACKS_SRC)}
<p>Before the album: ${OTHER_RELEASES.map(r => `${esc(r.title)} (${r.kind.toLowerCase()})`).join(', ')}. ${cite(['epopeia', 'apple'])}</p>
${quote0('p-q')}
<h2 class="p-h">Where</h2>
<p>${algarveTowns.map(p => `<b>${esc(p.name)}</b>${p.home ? ' (home)' : ''}`).join(' · ')}. Also ${BEYOND.map(b => esc(b.name)).join(', ')}. <a href="/algarve/">The map, with sources</a></p>
${cite(['brief', 'epopeia'])}
<h2 class="p-h">Book him</h2>
<p>${esc(BOOKING.text)}</p><p>${FORMATS.map(f => `<b>${f.name.toUpperCase()}</b> ${f.mins} min`).join(' · ')}</p>${cite(BOOKING.src)}
<p><a class="p-stamp" href="${BOOKING.url}">Book through Epopeia</a></p>
<p>Follow: ${channels()}</p>
</div></div>`;
  return shell('poster', opts, css, body);
}

// ---------------- The Songbook ----------------
function songbook(opts) {
  const byDate = [...TRACKS].sort((a, b) => a.first.localeCompare(b.first) || a.n - b.n);
  const css = `body{background:#d9cdb8;color:#2b2a27;font:18px/1.75 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif}a{color:#8a3b12}
.s-book{max-width:46rem;margin:1.5rem auto;background:#fdfbf4;background-image:linear-gradient(#fdfbf4 1.70rem,#cfe0ee 1.70rem,#cfe0ee 1.75rem);background-size:100% 1.75rem;border-left:3px double #e0a3a3;box-shadow:0 1px 0 #bbb,0 6px 20px rgba(0,0,0,.15);padding:1.75rem 1.25rem 2rem 2.25rem}
.s-book h1{font-weight:400;font-style:italic;font-size:clamp(2.6rem,10vw,4rem);line-height:1.05;margin:0 0 .25rem}
.s-book h2{font-weight:400;font-style:italic;font-size:1.8rem;margin:2rem 0 .25rem;color:#8a3b12;line-height:1.2}.s-book h3{font-weight:700;font-size:1.25rem;margin:1.5rem 0 0;line-height:1.75rem}
.s-ink{color:#1f3d7a}.s-meta{font:13px/1.75rem ui-monospace,Menlo,Consolas,monospace;color:#555}
.s-entry{border-top:1px dashed #b9a98c;padding-top:.25rem;margin-top:1.75rem}.s-entry .no{float:right;font:700 2rem/1 Georgia,serif;color:#e0a3a3}
.s-q blockquote{margin:0;font-style:italic;color:#1f3d7a}.s-q figcaption{font-size:.95rem}
.s-list{padding-left:1.25rem}.s-list li{margin:0}`;
  const body = `<article class="s-book">
<p class="s-meta">notebook · ${esc(PERSON.tagline.toLowerCase())}</p>
<h1>Marc Noah</h1>
<p class="s-ink">He lives in the Algarve and writes the songs he sings. This notebook keeps them in the order he put them out.</p>
${cite(['epopeia', 'dinis'])}
${STORY.map(s => `<h2>${esc(s.head)}</h2><p>${esc(s.text)}</p>${cite(s.src)}`).join('\n')}
<h2>In his words</h2>
${quote0('s-q')}
<h2>The songs, in the order he put them out</h2>
<p>From the first single in February 2023 to the album in November 2024: ${ALBUM.title}, ${ALBUM.label}. Listen: ${listenLinks()}. ${cite(['apple', 'epo-glv'])}</p>
${byDate.map((t, i) => `<section class="s-entry"><span class="no">${i + 1}</span><h3>${esc(t.title)}</h3><p class="s-meta">first out ${fmtDate(t.first)}${t.single ? ' as a single' : ''} · album track ${t.n} · ${t.len}</p>${t.note ? `<p>${esc(t.note)}</p>${cite(t.src)}` : ''}${t.video ? `<p>Watch: <a href="${t.video.url}">${esc(t.video.kind.toLowerCase())}</a> (${fmtDate(t.video.date)})${t.video2 ? `, <a href="${t.video2.url}">${esc(t.video2.kind.toLowerCase())}</a>` : ''}</p>` : ''}</section>`).join('\n')}
${cite(TRACKS_SRC)}
<h2>Also</h2>
<ul class="s-list">${OTHER_RELEASES.map(r => `<li><b>${esc(r.title)}</b>, ${r.kind.toLowerCase()}: ${esc(r.text)}</li>`).join('')}</ul>
${cite(['epopeia', 'apple'])}
<h2>Where he writes and plays</h2>
<ul class="s-list">${algarveTowns.map(p => `<li><b>${esc(p.name)}</b>${p.home ? ' (home)' : ''}: ${esc(p.text)}</li>`).join('')}${BEYOND.map(b => `<li><b>${esc(b.name)}</b>: ${esc(b.text)}</li>`).join('')}</ul>
${cite(['brief', 'epopeia', 'epo-roadtrip', 'postal', 'maisalgarve', 'epo-ribeira'])}
<h2>Dates</h2>
<ul class="s-list">${GIGS.map(g => `<li>${gigLine(g)}</li>`).join('')}</ul>
${cite(['epopeia', 'maisalgarve', 'postal'])}
<p class="s-meta">${esc(GIGS_NOTE)}</p>
${bookBlock('h2')}
<h2>Follow</h2><p>${channels()}</p>
</article>`;
  return shell('songbook', opts, css, body);
}

// ---------------- Side A, Side B ----------------
function cassette(opts) {
  const A = TRACKS.slice(0, 4), B = TRACKS.slice(4);
  const css = `body{background:#23202b;color:#f1ece2;font:16px/1.55 "Courier New",ui-monospace,monospace}a{color:#ffd166}
.k-wrap{max-width:60rem;margin:0 auto;padding:0 1rem}
.k-tape{margin:1.5rem 0;background:#3a3644;border-radius:18px;padding:1rem;box-shadow:inset 0 0 0 3px #4d485a}
.k-label{background:repeating-linear-gradient(90deg,#ef476f 0 25%,#ffd166 0 50%,#06d6a0 0 75%,#118ab2 0);border-radius:8px;padding:6px}
.k-label>div{background:#f8f3e6;color:#23202b;border-radius:4px;padding:1rem 1.25rem}
.k-label h1{font:700 clamp(2.4rem,10vw,4.8rem)/1 "Arial Black",Impact,sans-serif;margin:0;letter-spacing:-.02em}.k-label .t{margin:0;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.k-reels{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin:1rem 2rem .25rem}.k-reels svg{width:5.5rem;height:5.5rem}.k-window{flex:1;height:2.4rem;border-radius:6px;background:#15131a;border:3px solid #4d485a}
.k-sides{display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;margin:1.5rem 0}
.k-side{background:#f8f3e6;color:#23202b;border-radius:6px;padding:1rem 1.25rem;background-image:linear-gradient(transparent 1.45rem,#e7dcc6 1.45rem,#e7dcc6 1.55rem);background-size:100% 1.55rem}
.k-side h2{font:700 1.6rem "Arial Black",Impact,sans-serif;margin:0 0 .5rem}.k-side h2 span{display:inline-block;background:#ef476f;color:#fff;border-radius:50%;width:2.2rem;height:2.2rem;text-align:center;line-height:2.2rem;margin-right:.4rem}
.k-side.b h2 span{background:#118ab2}.k-side ol{margin:0;padding-left:1.6rem}.k-side li{margin:.2rem 0}.k-side small{display:block;color:#5d5866}.k-side a{color:#8a3b12}
.k-h{font:700 1.5rem "Arial Black",Impact,sans-serif;margin:2rem 0 .5rem;color:#ffd166}
.k-story{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem}.k-story div{border:2px dashed #6a6478;border-radius:8px;padding:1rem}.k-story h3{margin:0 0 .4rem;color:#06d6a0}
.k-q{border-left:6px solid #ef476f;padding:.5rem 1rem;margin:1.5rem 0}.k-q blockquote{margin:0;font-style:italic}
.k-list{columns:2 18rem;column-gap:2rem;padding-left:1.2rem}.k-list li{break-inside:avoid}
.k-spine{background:#f8f3e6;color:#23202b;font:700 1rem "Arial Black",sans-serif;letter-spacing:.15em;text-transform:uppercase;padding:.5rem 1rem;border-radius:4px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem}`;
  const reel = `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#f8f3e6"/><circle cx="50" cy="50" r="18" fill="#3a3644"/>${[0, 60, 120, 180, 240, 300].map(a => `<rect x="47" y="30" width="6" height="12" fill="#f8f3e6" transform="rotate(${a} 50 50)"/>`).join('')}</svg>`;
  const side = (cls, letter, list) => `<section class="k-side ${cls}"><h2><span>${letter}</span>Side ${letter}</h2><ol start="${list[0].n}">${list.map(t => `<li><b>${esc(t.title)}</b> ${t.len}<small>first out ${fmtDate(t.first)}${t.video ? ` · ${vid(t)}` : ''}</small></li>`).join('')}</ol></section>`;
  const body = `<div class="k-wrap">
<div class="k-tape"><div class="k-label"><div><p class="t">${esc(PERSON.tagline)}</p><h1>Marc Noah</h1><p>${ALBUM.title} · ${ALBUM.released} · ${ALBUM.label}</p></div></div>
<div class="k-reels">${reel}<span class="k-window" aria-hidden="true"></span>${reel}</div></div>
<p>His label says he is influenced by the music of the 1980s and 1990s, from pop to grunge, from musicals to rock. He lives in the Algarve and writes his own songs. Here is his first album, as a tape. ${cite(['epopeia', 'dinis'])}</p>
<div class="k-sides">${side('a', 'A', A)}${side('b', 'B', B)}</div>
<p>The sides are our layout; the album is released digitally, in this track order. Listen: ${listenLinks()}. ${cite(TRACKS_SRC.concat('epo-glv'))}</p>
<p>Before the album: ${OTHER_RELEASES.map(r => `<b>${esc(r.title)}</b> (${r.kind.toLowerCase()})`).join(', ')}. ${cite(['epopeia', 'apple'])}</p>
<h2 class="k-h">Liner notes</h2>
<div class="k-story">${STORY.map(s => `<div><h3>${esc(s.head)}</h3><p>${esc(s.text)}</p>${cite(s.src)}</div>`).join('')}</div>
${quote0('k-q')}
<h2 class="k-h">Recorded and played in</h2>
<ul class="k-list">${algarveTowns.map(p => `<li><b>${esc(p.name)}</b>${p.home ? ' (home)' : ''}: ${esc(p.text)}</li>`).join('')}${BEYOND.map(b => `<li><b>${esc(b.name)}</b>: ${esc(b.text)}</li>`).join('')}</ul>
${cite(['brief', 'epopeia', 'epo-roadtrip', 'postal', 'maisalgarve', 'epo-ribeira'])}
<h2 class="k-h">Tour dates</h2>
<ul class="k-list">${GIGS.map(g => `<li>${gigLine(g)}</li>`).join('')}</ul>
${cite(['epopeia', 'maisalgarve', 'postal'])}
<h2 class="k-h">Book and follow</h2>
${bookBlock('h3')}
<p>${channels()}</p>
<p class="k-spine"><span>Marc Noah</span><span>${ALBUM.title}</span><span>Algarve</span></p>
</div>`;
  return shell('cassette', opts, css, body);
}

export function renderDesign(id, opts) {
  return { coast, azulejo, poster, songbook, cassette }[id](opts);
}
