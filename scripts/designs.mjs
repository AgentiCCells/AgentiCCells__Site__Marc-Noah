// The designs of the home page. Same facts, six layouts; Editorial (round 2) is the home. Code Apache-2.0.
import * as F from '../data/facts.mjs';
import { esc, fmtDate, monShort, cite, head, algarveMap, DESIGNS, DCOUNT, citer, siteNav, siteFoot, PLAY, ptWord, formatChips, stageList, mapFigure, photo, watchGroups, trackRows, spotifyFacade, lyricFor, lyricLine, bookCard, countMark, V, vSrc, playAttrs, PLAYICON, DARK_MAP, designsButton, designsDialog, SCRIPT, playerDialog, lazyPhoto, still, filmsOf, STILLS_CREDIT } from './lib.mjs';
import { PHOTO_CREDIT } from '../data/photos.mjs';

const { PERSON, STORY, QUOTES, ALBUM, TRACKS, TRACKS_SRC, OTHER_RELEASES, LISTEN, FORMATS, FORMATS_SRC, PLACES, BEYOND, GIGS, GIGS_NOTE, GIGS_NOTE_SRC, BOOKING,
  HERO, FEATURE, COMPOSER, ALBUM_LINE, SONGS_PAGE, LIVE, STAGES, VIDEOS } = F;
const concerts = GIGS.filter(g => g.kind === 'concert');
const algarveTowns = PLACES.filter(p => p.algarve);

// The design bar of the older designs: the Designs button (opens the dialog, or goes to /d/ without JS),
// then the names. Its links are 44 px tall, and the source links of cite() 24 x 24 px (round 1 follow-up 4).
const switcher = id => `<nav class="dsw" aria-label="Designs">${designsButton()} ${DESIGNS.map(d => d.id === id ? `<b aria-current="page">${esc(d.name)}</b>` : `<a href="${d.default ? '/' : `/d/${d.id}/`}">${esc(d.name)}</a>`).join(' · ')} · <a href="/">main site</a></nav>
${designsDialog(id)}`;
// The dialog and button styles for pages without /style.css (the older designs carry their own CSS).
const DLG_CSS = `.dsw{font:14px/1.5 system-ui,sans-serif;padding:.5rem 1rem;display:flex;flex-wrap:wrap;gap:.25rem .4rem;align-items:center}.dsw a{color:inherit;display:inline-flex;align-items:center;min-height:44px}
.dsw .dsw-btn{display:inline-flex;align-items:center;gap:.5rem;min-height:44px;padding:0 1rem;margin-right:.4rem;border:1px solid currentColor;border-radius:999px;text-decoration:none;font-weight:600}.dsw-btn svg{width:14px;height:14px;fill:currentColor}
.dlg{width:min(66rem,calc(100% - 24px));max-height:calc(100svh - 24px);padding:0;border:1px solid #2a3440;border-radius:10px;background:#131a22;color:#f2ede6;font:16px/1.5 system-ui,sans-serif}.dlg::backdrop{background:rgba(3,5,8,.78)}
.dlg a{color:#f2ede6}.dlg-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding:1.3rem 1.3rem .4rem}.dlg-head h2{font-size:1.7rem;margin:0}.dlg-head p{margin:.2rem 0 0;color:#a7b0ba;font-size:.92rem}
.x{min-height:44px;min-width:44px;padding:0 1rem;border-radius:999px;border:1px solid #5b6774;background:#1a222c;color:#f2ede6;font:600 .88rem system-ui,sans-serif;cursor:pointer}
.dgrid{list-style:none;margin:0;padding:.8rem 1.3rem;display:grid;gap:.6rem}.dgrid a{display:grid;grid-template-columns:8.5rem minmax(0,1fr);grid-template-rows:auto 1fr;gap:.15rem .9rem;padding:.5rem;border:1px solid #2a3440;border-radius:8px;text-decoration:none;background:#0b0f14}
.dgrid img{grid-row:span 2;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:4px;display:block}.dgrid .dn{display:flex;flex-wrap:wrap;align-items:baseline;gap:.2rem .6rem}
.dgrid .cur{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#e2a878}.dgrid .cur.dim{color:#8b95a1}.dgrid .di{font-size:.82rem;line-height:1.4;color:#a7b0ba}.dgrid a:hover,.dgrid a[aria-current]{border-color:#e2a878}
.dlg-foot{padding:0 1.3rem 1rem;margin:0}.dlg-foot a{display:inline-flex;align-items:center;min-height:44px;font-weight:600}
@media (min-width:700px){.dgrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:1.1rem}.dgrid a{grid-template-columns:1fr;grid-template-rows:auto}.dgrid img{grid-row:auto;margin-bottom:.5rem}}
.dfoot{font:14px/1.6 system-ui,sans-serif;padding:1.5rem 1rem 3rem;max-width:60rem;margin:0 auto}.dfoot a{color:inherit;display:inline-flex;align-items:center;min-height:44px}
.cite{display:block;font:12px/1.4 system-ui,sans-serif;opacity:.85;margin-top:.25rem}.cite a{color:inherit;display:inline-block;min-height:24px;line-height:24px;padding:0 2px}
.player{width:min(70rem,calc(100% - 16px));max-height:calc(100svh - 16px);padding:0;border:1px solid #2a3440;border-radius:8px;background:#000;color:#f2ede6;font:16px/1.5 system-ui,sans-serif}.player::backdrop{background:rgba(3,5,8,.9)}
.pl-head{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.4rem .4rem .4rem 1rem;background:#131a22}.pl-head h2{margin:0;font-weight:600;font-size:.95rem;color:#f2ede6}
.pbox{aspect-ratio:16/9;max-height:calc(100svh - 140px);background:#000}.pbox iframe{width:100%;height:100%;border:0;display:block}
.pl-note{margin:0;padding:0 1rem;font-size:.8rem;color:#a7b0ba;background:#131a22}.pl-note a{color:#f2ede6;display:inline-flex;min-height:44px;align-items:center}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.pb{position:absolute;z-index:2;left:50%;top:50%;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.62);color:#fff;border:2px solid #fff}.pb svg{width:20px;height:20px;margin-left:3px}
.dfoot .dcredit{font-size:13px}`;
// Round 3 (rule C1): a film link opens the one player; without JS it goes to YouTube. Its accessible name
// begins with its visible words (review R1): extra words for screen readers go in a hidden span after them.
const playMark = `<span class="pb">${PLAYICON}</span>`;
// hidden: a picture that repeats a visible film link beside it, kept out of the tab order and the reading order.
const filmLink = (id, cls, inner, { hidden = false } = {}) => `<a class="${cls}" ${playAttrs(V(id))}${hidden ? ' aria-hidden="true" tabindex="-1"' : ''}>${inner}</a>`;
const vh = t => `<span class="vh">${esc(t)}</span>`;
// The credit lines (rule C3): his label's photographs on every design; the stills line where a still is shown.
const credits = stills => `<p class="dcredit">${esc(PHOTO_CREDIT)} ${cite('photos')}${stills ? `${esc(STILLS_CREDIT)} ${cite('yt-frames')}` : ''}</p>`;
const STILLS = { coast: true, azulejo: true, poster: false, songbook: true, cassette: true };
const dfoot = id => `<footer class="dfoot">
<p>Every fact names its public source and the date it was read: see <a href="/sources/">sources</a>. ${esc(F.FOOTER.noCopies)} Marc approves every change about him.</p>
<p>Pages: <a href="/songs/">songs</a> · <a href="/algarve/">the Algarve</a> · <a href="/live/">live</a> · <a href="/about/">about</a> · <a href="/listen/">listen and book</a> · <a href="/videos/">every film</a> · <a href="/agents/">use with AI</a> · <a href="/index.md">index.md</a> · <a href="/behind-the-scenes/">behind the scenes</a></p>
${STILLS[id] === undefined ? '' : credits(STILLS[id])}
<p>Made with the AgentiCCells site factory. Version __VERSION__ · design ${esc(DESIGNS.find(d => d.id === id).name)} · code Apache-2.0, text and drawings CC BY 4.0</p>
</footer>`;
const shell = (id, opts, css, body) => `${head({ title: `Marc Noah, singer-songwriter, Algarve (${DESIGNS.find(d => d.id === id).name})`, description: opts.description, path: `/d/${id}/`, image: opts.image, imageAlt: TYPE_ALT, css: null, extra: `<style>${css}\n${DLG_CSS}*{box-sizing:border-box}body{margin:0}img,svg{max-width:100%}</style>\n` })}
<body class="d-${id}">
${switcher(id)}
<main id="main">
${body}
</main>
${dfoot(id)}
${playerDialog()}
${SCRIPT}
</body>
</html>
`;
const TYPE_ALT = 'Marc Noah, singer-songwriter, Algarve: the words, set in the colours of this design.';
const quote0 = (cls = 'q') => `<figure class="${cls}"><blockquote lang="pt-PT">${esc(QUOTES[0].pt)}</blockquote><figcaption>${esc(QUOTES[0].en)} <i>(Marc Noah on his first album; our translation)</i> ${cite(QUOTES[0].src)}</figcaption></figure>`;
const vid = t => t.video ? `<a href="${t.video.url}">${esc(t.video.kind.toLowerCase())}</a>` : '';
const listenLinks = (sep = ' · ') => ALBUM.listen.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join(sep);
const channels = (sep = ' · ') => LISTEN.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join(sep);
const bookBlock = (tag = 'h2') => `<${tag}>Book Marc</${tag}><p>${esc(BOOKING.text)}</p><p>${FORMATS.map(f => `<b>${f.name}</b> ${f.mins} min, ${f.on.toLowerCase()}`).join(' · ')}</p>${cite([BOOKING.src])}<p><a href="${BOOKING.url}">Book through Epopeia Records</a> · <a href="https://www.marcnoah.pt/">marcnoah.pt</a></p>`;
const gigLine = g => `<time datetime="${g.date}">${fmtDate(g.date)}</time> · <b>${esc(g.place)}</b> · ${esc(g.venue)}${g.kind !== 'concert' ? ` (${g.kind})` : ''}`;

// ---------------- The Coast (round 1's home) ----------------
// Round 1's home, kept as it was at /d/coast/ (round 2 review, change 3) with its own stylesheet,
// /assets/coast.css, its design switcher, dfoot('coast') and the "other designs" line.
function coast(opts) {
  const C = citer(), c = C.c;
  const q = COMPOSER.quoteShort;
  const enQuote = esc(q.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>'); // the title in italics, not in quotes (condition 3.2)
  // Round 3, change 1: a postcard of him by the sea beside the line (never on the map: review 1a), the Roadtrip
  // button opening the player, the two seaside sofa sessions under the map, and the live photograph in "On stage".
  const roadtrip = V(new URL(FEATURE.url).searchParams.get('v'));
  const coastFilms = ['6yUpmlZzrk0', 'RRTVycYkcOo'].map(V);
  const body = `
<section class="hero">
<div>
<p class="kick">${esc(HERO.kicker)}${c(HERO.kickerSrc)}</p>
<h1>${esc(PERSON.name)}</h1>
<div class="c-intro">
<p class="lead">${esc(HERO.line)}${c(HERO.src)}</p>
<figure class="c-card">${photo('sofa-session-quarteira', { eager: true })}<figcaption>On the green chair, on the seafront promenade</figcaption></figure>
</div>
<article class="song" aria-labelledby="feat">
<p class="over">${esc(FEATURE.head)}</p>
<h2 id="feat">${esc(FEATURE.title)}</h2>
<p>${FEATURE.lines.map(l => `${esc(l.text)}${c(l.src)}`).join(' ')}</p>
<blockquote>“${esc(FEATURE.quoteShort.en)}”</blockquote>
<p class="cap">${esc(FEATURE.quoteShort.caption)}${c(FEATURE.quoteShort.src)}</p>
<p class="btns">${filmLink(roadtrip.id, 'btn', `${PLAY}Watch the Roadtrip video<span class="c-here">plays here</span>`)}<a class="btn alt" href="${esc(ALBUM.listen[0].url)}">Album on ${esc(ALBUM.listen[0].name)}</a><a class="btn alt" href="${esc(ALBUM.listen[1].url)}">${esc(ALBUM.listen[1].name)}</a></p>
</article>
</div>
<div class="c-side">
${mapFigure(c, 'cm')}
<div class="c-films"><p class="kick">Green Sofa Sessions</p>
<ul>${coastFilms.map(v => `<li>${filmLink(v.id, 'c-film', `<span class="c-pic">${still(v.id, { sizes: '(min-width:900px) 260px, 45vw' })}${playMark}</span><span class="c-cap">${esc(v.caption)}${vh(', play the film')}</span>`)}</li>`).join('')}</ul>
${c(vSrc(coastFilms))}</div>
</div>
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
<figure class="c-live">${lazyPhoto('live-acoustic', { sizes: '(min-width:900px) 520px, 92vw' })}</figure>
<p>${esc(LIVE.count.text)}${countMark} Some of the stages:</p>
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
<p class="c-designs">This page in ${['', 'one', 'two', 'three', 'four', 'five', 'six'][DESIGNS.length - 1]} other designs: ${DESIGNS.filter(d => d.id !== 'coast').map(d => `<a class="more" href="/d/${d.id}/">${esc(d.name)}</a>`).join(' · ')}.</p>`;
  return `${head({ title: 'Marc Noah, singer-songwriter, Algarve (The Coast)', description: opts.description, path: '/d/coast/', image: opts.image, imageAlt: TYPE_ALT, canonical: '/', css: '/assets/coast.css', theme: '#11607a', extra: `<style>${DLG_CSS}</style>\n` })}
<body>
${switcher('coast')}
<main id="main" class="wrap">
${body}
${C.list()}
</main>
${dfoot('coast')}
${playerDialog()}
${SCRIPT}
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
// Round 3, change 2: three song tiles carry their official video's still, painted cobalt (the conductor's
// choice of three, recorded in the review); the other tiles keep their drawn pattern and their link to YouTube.
const AZ_FILMS = { 'Towers and Bridges': 'K8795UoBqTg', Mother: 'JMd-r6okn80', Roadtrip: 'adbD0f2FYLA' };
for (const [t, id] of Object.entries(AZ_FILMS)) if (V(id).song !== t || V(id).format !== 'official') throw new Error(`AZ_FILMS: ${id} is not the official video of ${t}`);
function azulejo(opts) {
  const css = `body{background:#fbfaf6;color:#122a4d;font:17px/1.6 Georgia,"Times New Roman",serif}a{color:#1d4f91}
.a-band{height:56px;background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><rect width="56" height="56" fill="#1d4f91"/><path d="M28 6 50 28 28 50 6 28Z" fill="none" stroke="#fbfaf6" stroke-width="3"/><circle cx="28" cy="28" r="6" fill="#fbfaf6"/></svg>')}");background-size:56px}
.a-wrap{max-width:62rem;margin:0 auto;padding:0 1rem}.a-hero{text-align:center;padding:2.5rem 1rem 2rem;border:3px double #1d4f91;margin:2rem 0;background:#fff}
.a-hero h1{font-size:clamp(2.8rem,11vw,5.5rem);margin:0;font-weight:400;letter-spacing:.04em}.a-hero .t{font-variant:small-caps;letter-spacing:.2em;font-size:1.05rem}
.a-hero .l{font-size:1.3rem;max-width:36rem;margin:1rem auto}
.a-story{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:0;border:2px solid #1d4f91}.a-story article{padding:1.2rem;border:1px solid #1d4f91;background:#fff}.a-story h2{font-weight:400;font-size:1.35rem;margin:0 0 .4rem;color:#1d4f91}
h2.a-h{text-align:center;font-weight:400;font-size:2rem;margin:3rem 0 1rem;color:#1d4f91}h2.a-h::before,h2.a-h::after{content:" ✦ ";font-size:1rem;vertical-align:middle}
.a-tiles{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(13.5rem,1fr));gap:6px;background:#1d4f91;border:6px solid #1d4f91}
.a-tiles li{background:#fff;padding:.8rem;display:flex;flex-direction:column;gap:.2rem}.a-tiles svg{width:64px;height:64px}.a-tiles .m a{display:inline-flex;align-items:center;min-height:44px}.a-tiles h3{margin:.2rem 0 0;font-weight:400;font-size:1.3rem}.a-tiles .m{font:13px/1.4 system-ui,sans-serif;color:#41577a}
.a-q{background:#fff;border:2px solid #1d4f91;padding:1.25rem;margin:1.5rem 0}.a-q blockquote{margin:0;font-style:italic;font-size:1.1rem}.a-q figcaption{margin-top:.6rem;color:#41577a}
.a-places{columns:2 18rem;column-gap:2rem;padding-left:1.1rem}.a-places li{break-inside:avoid;margin:.4rem 0}
.a-gigs{list-style:none;padding:0;columns:2 20rem;column-gap:2rem;font-size:.95rem}.a-gigs li{break-inside:avoid;padding:.3rem 0;border-bottom:1px dotted #1d4f91}
.a-box{background:#fff;border:2px solid #1d4f91;padding:1.25rem;margin:2rem 0}.a-btns a{display:inline-block;margin:.25rem;padding:.5rem 1rem;border:2px solid #1d4f91;text-decoration:none;background:#1d4f91;color:#fff}
.a-map{border:6px solid #1d4f91}
.a-ph{margin:0 auto 1.1rem;width:min(15rem,66vw);padding:12px;background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#1d4f91"/><path d="M12 3 21 12 12 21 3 12Z" fill="none" stroke="#fbfaf6" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" fill="#fbfaf6"/></svg>')}");background-size:24px}
.a-paint{display:block;position:relative;background:#1d4f91;isolation:isolate;overflow:hidden}.a-paint picture{display:block}
.a-paint img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;filter:grayscale(1) contrast(1.12) brightness(1.06);mix-blend-mode:screen}
.a-ph .a-paint::after{content:"";position:absolute;inset:0;background-image:linear-gradient(90deg,#fbfaf6 3px,transparent 3px),linear-gradient(#fbfaf6 3px,transparent 3px);background-size:33.34% 33.34%;background-position:-1.5px -1.5px}
.a-cov{justify-content:center}.a-cov picture{display:block}.a-cov img{display:block;width:100%;height:auto;border:6px solid #fff;outline:2px solid #1d4f91}
.a-film{position:relative;display:block;width:100%;border:2px solid #1d4f91;padding:4px;background:#fff}.a-film .a-paint img{aspect-ratio:16/10}
.a-tiles li:hover .a-paint img,.a-tiles li:focus-within .a-paint img{filter:none;mix-blend-mode:normal}
.a-tiles .m a.a-play{font-weight:600}`;
  const body = `<div class="a-band" aria-hidden="true"></div>
<div class="a-wrap">
<section class="a-hero"><figure class="a-ph"><span class="a-paint">${photo('portrait-bw', { eager: true })}</span></figure><p class="t">${esc(PERSON.tagline)}</p><h1>Marc Noah</h1><p class="l">He lives in the Algarve, he writes his own songs, and these eight tiles are his first album.</p><p class="a-btns">${ALBUM.listen.map(l => `<a href="${l.url}">${esc(l.name)}</a>`).join('')}</p></section>
<section class="a-story">${STORY.map(s => `<article><h2>${esc(s.head)}</h2><p>${esc(s.text)}</p>${cite(s.src)}</article>`).join('')}</section>
<h2 class="a-h">${ALBUM.title}</h2>
<p style="text-align:center">${ALBUM.kind}, ${ALBUM.released}, ${ALBUM.label}. ${esc(ALBUM.note)}</p>
<ul class="a-tiles">
<li class="a-cov">${lazyPhoto('giant-little-victories-cover', { sizes: '(min-width:700px) 240px, 90vw' })}<span class="m">The album cover, from his label</span></li>
${TRACKS.map((t, i) => { const v = AZ_FILMS[t.title] && V(AZ_FILMS[t.title]); return v
    ? `<li>${filmLink(v.id, 'a-film', `<span class="a-paint">${still(v.id, { sizes: '(min-width:700px) 220px, 85vw' })}</span>${playMark}`, { hidden: true })}<h3>${esc(t.title)}</h3><span class="m">Track ${t.n} · ${t.len} · first out ${fmtDate(t.first)}</span><span class="m">${filmLink(v.id, 'a-play', `Play the video here${vh(`: ${v.caption}`)}`)}</span></li>`
    : `<li>${tile(i)}<h3>${esc(t.title)}</h3><span class="m">Track ${t.n} · ${t.len} · first out ${fmtDate(t.first)}</span>${t.video ? `<span class="m">${vid(t)}</span>` : ''}</li>`; }).join('\n')}
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
.p-stamp{display:inline-block;border:4px solid #e2552b;color:#e2552b;padding:.4rem .8rem;transform:rotate(-4deg);font:900 1.2rem Impact,"Arial Black",sans-serif;text-transform:uppercase;text-decoration:none}
.p-top .t,.p-top .l{color:#1b1b1b}
.p-top>.p-sun{position:absolute;display:none}
.p-art{margin-top:1.1rem}
.p-photo{margin:0;position:relative;background:#e2552b;isolation:isolate;border:5px solid #1b1b1b;overflow:hidden}.p-photo picture{display:block}
.p-photo img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:50% 35%;filter:grayscale(1) contrast(1.45) brightness(1.08);mix-blend-mode:multiply}
.p-photo::after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#1b1b1b .9px,transparent 1.3px);background-size:4px 4px;mix-blend-mode:multiply;opacity:.55}
.p-show{display:inline-flex;flex-direction:column;margin:1.1rem 0 .3rem .3rem;background:#f9f1e3;color:#1b1b1b;border-color:#1b1b1b;min-height:44px;line-height:1.05;padding:.5rem .8rem;transform:rotate(-3deg)}
.p-show small{font:700 .78rem/1.3 Arial,sans-serif;text-transform:none;letter-spacing:0;margin-top:.2rem;color:#1b1b1b}
.p-show:hover,.p-show:focus-visible{background:#1b1b1b;color:#f9f1e3}.p-show:hover small,.p-show:focus-visible small{color:#f9f1e3}
.p-film{display:inline-flex;align-items:center;gap:.35rem;min-height:44px;font:900 .95rem Impact,"Arial Black",sans-serif;text-transform:uppercase;color:#a33a14;text-decoration:none}.p-film svg{width:16px;height:16px;flex:none}
.p-film:hover{text-decoration:underline}
.p-dates .v{display:block}
.p-paste{width:min(62%,15rem);margin:0 0 1.4rem .4rem;transform:rotate(2deg);background:#fff;padding:6px;box-shadow:0 2px 0 #1b1b1b}.p-paste picture{display:block}.p-paste img{display:block;width:100%;height:auto}.p-paste figcaption{font-size:.8rem;line-height:1.3;padding-top:.3rem;color:#1b1b1b}
@media (min-width:900px){.p-top>.p-sun{display:block}.p-top{display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:center;padding:2rem 2rem 2rem}.p-art{margin:0}}`;
  const towns = [...new Set(concerts.map(g => g.place.replace(/, Azores$/, '')))];
  // Round 3, change 3: the film of a date, by rule (review 3c): a VIDEOS entry with the row's date whose event
  // the row's venue names; where a show has its full set and single songs, the full set (the entry with no song).
  const filmOf = g => VIDEOS.filter(v => v.date === g.date && v.event && g.venue.includes(v.event.split(',')[0])).sort((a, b) => !!a.song - !!b.song)[0];
  const show = V('S85R1WgyKJ0');
  const body = `<div class="p-sheet">
<section class="p-top"><span class="p-sun" aria-hidden="true"></span><div class="p-words"><p class="t">${esc(PERSON.tagline)} · live</p><h1>Marc<br>Noah</h1><p class="l">Lives in the Algarve. Writes his own songs. Has played them in ${towns.length} places since 2023.</p></div>
<div class="p-art"><figure class="p-photo">${photo('live-acoustic', { eager: true })}</figure>
${filmLink(show.id, 'p-stamp p-show', `See the show<small>With his band, TEMPO, Portimão, ${fmtDate(show.date)}</small>`)}</div></section>
<div class="p-band" aria-hidden="true">${towns.map(esc).join(' ★ ')}</div>
<div class="p-body">
<h2 class="p-h">Every date</h2>
<figure class="p-paste">${lazyPhoto('autumn-leaves-tour', { sizes: '240px' })}<figcaption>His label’s poster for the autumn 2024 tour</figcaption></figure>
<ul class="p-dates">
${GIGS.map(g => { const v = filmOf(g); return `<li><span class="d">${g.date.slice(8)} ${monShort(g.date)}<small>${g.date.slice(0, 4)}${g.time ? ` · ${esc(g.time)}` : ''}</small></span><span><b>${esc(g.place)}</b><span class="v">${esc(g.venue)}${g.kind !== 'concert' ? ` (${g.kind})` : ''}</span>${v ? filmLink(v.id, 'p-film', `${PLAYICON}Filmed: watch${vh(` ${v.caption}`)}`) : ''}</span></li>`; }).join('\n')}
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
// Round 3, change 4: the songs of the Green Sofa Session EP (the track titles its OTHER_RELEASES entry names)
// carry their Green Sofa Session film, by rule: an EP song with a session film.
const EP = OTHER_RELEASES.find(r => r.kind === 'EP');
const sessionOf = t => EP.text.includes(t.title) && filmsOf(t.title).find(v => v.format === 'session');
function songbook(opts) {
  const byDate = [...TRACKS].sort((a, b) => a.first.localeCompare(b.first) || a.n - b.n);
  const css = `body{background:#d9cdb8;color:#2b2a27;font:18px/1.75 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif}a{color:#8a3b12}
.s-book{max-width:46rem;margin:1.5rem auto;background:#fdfbf4;background-image:linear-gradient(#fdfbf4 1.70rem,#cfe0ee 1.70rem,#cfe0ee 1.75rem);background-size:100% 1.75rem;border-left:3px double #e0a3a3;box-shadow:0 1px 0 #bbb,0 6px 20px rgba(0,0,0,.15);padding:1.75rem 1.25rem 2rem 2.25rem}
.s-book h1{font-weight:400;font-style:italic;font-size:clamp(2.6rem,10vw,4rem);line-height:1.05;margin:0 0 .25rem}
.s-book h2{font-weight:400;font-style:italic;font-size:1.8rem;margin:2rem 0 .25rem;color:#8a3b12;line-height:1.2}.s-book h3{font-weight:700;font-size:1.25rem;margin:1.5rem 0 0;line-height:1.75rem}
.s-ink{color:#1f3d7a}.s-meta{font:13px/1.75rem ui-monospace,Menlo,Consolas,monospace;color:#555}
.s-entry{border-top:1px dashed #b9a98c;padding-top:.25rem;margin-top:1.75rem}.s-entry .no{float:right;font:700 2rem/1 Georgia,serif;color:#e0a3a3}
.s-q blockquote{margin:0;font-style:italic;color:#1f3d7a}.s-q figcaption{font-size:.95rem}
.s-list{padding-left:1.25rem}.s-list li{margin:0}
.s-pola{float:right;width:min(36%,13rem);margin:.2rem -.2rem .6rem .75rem;background:#fff;padding:6px 6px 0;box-shadow:0 2px 6px rgba(0,0,0,.18);transform:rotate(2.5deg);position:relative}
.s-pola::before,.s-tape::before{content:"";position:absolute;left:50%;top:-12px;width:64px;height:22px;margin-left:-32px;background:rgba(240,224,170,.78);transform:rotate(-4deg);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.s-pola picture,.s-tape picture{display:block}
.s-pola img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;object-position:50% 30%;filter:sepia(.18) contrast(1.04)}
.s-pola figcaption{font:italic 1rem/1.75rem "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;color:#1f3d7a;text-align:center;padding:0 0 .1rem}
.s-film{display:grid;grid-template-columns:8.5rem minmax(0,1fr);gap:.8rem;align-items:center;margin:.5rem 0 .25rem;color:#8a3b12;text-decoration:none;min-height:44px}
.s-snap{position:relative;display:block;background:#fff;padding:4px;box-shadow:0 1px 4px rgba(0,0,0,.18);transform:rotate(-2deg)}.s-snap img{display:block;width:100%;height:auto;filter:sepia(.12)}
.s-snap .pb{width:36px;height:36px;margin:-18px 0 0 -18px}.s-snap .pb svg{width:14px;height:14px}
.s-fcap{font-size:1rem;line-height:1.4;text-decoration:underline}
.s-tape{position:relative;background:#fff;padding:6px;box-shadow:0 2px 6px rgba(0,0,0,.15);margin:1rem 0}.s-ep{width:min(70%,20rem);transform:rotate(-1.5deg)}.s-tape img{display:block;width:100%;height:auto}`;
  const body = `<article class="s-book">
<p class="s-meta">notebook · ${esc(PERSON.tagline.toLowerCase())}</p>
<figure class="s-pola">${photo('portrait-grey', { eager: true })}<figcaption>Marc Noah</figcaption></figure>
<h1>Marc Noah</h1>
<p class="s-ink">He lives in the Algarve and writes the songs he sings. This notebook keeps them in the order he put them out.</p>
${cite(['epopeia', 'dinis'])}
${STORY.map(s => `<h2>${esc(s.head)}</h2><p>${esc(s.text)}</p>${cite(s.src)}`).join('\n')}
<h2>In his words</h2>
${quote0('s-q')}
<h2>The songs, in the order he put them out</h2>
<p>From the first single in February 2023 to the album in November 2024: ${ALBUM.title}, ${ALBUM.label}. Listen: ${listenLinks()}. ${cite(['apple', 'epo-glv'])}</p>
${byDate.map((t, i) => `<section class="s-entry"><span class="no">${i + 1}</span><h3>${esc(t.title)}</h3><p class="s-meta">first out ${fmtDate(t.first)}${t.single ? ' as a single' : ''} · album track ${t.n} · ${t.len}</p>${sessionOf(t) ? filmLink(sessionOf(t).id, 's-film', `<span class="s-snap">${still(sessionOf(t).id, { sizes: '136px' })}${playMark}</span><span class="s-fcap">Watch the Green Sofa Session: ${esc(sessionOf(t).caption)}</span>`) : ''}${t.note ? `<p>${esc(t.note)}</p>${cite(t.src)}` : ''}${t.video ? `<p>Watch: <a href="${t.video.url}">${esc(t.video.kind.toLowerCase())}</a> (${fmtDate(t.video.date)})${t.video2 ? `, <a href="${t.video2.url}">${esc(t.video2.kind.toLowerCase())}</a>` : ''}</p>` : ''}</section>`).join('\n')}
${cite(TRACKS_SRC)}
<h2>Also</h2>
<figure class="s-tape s-ep">${lazyPhoto('green-sofa-session-ep', { sizes: '320px' })}</figure>
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
// Round 3, change 5: a "Flip side" under a track, by the review's data rule (condition 5): the track has a film
// of him with his band and no official video, so the live film is its only film. One exception, as data:
const FLIP_ALSO = [
  { song: 'To The Bone', id: 'GdY-l97_vCU', why: 'it has an official lyric video too, so the rule leaves it out; the passed proposal and review (round 3, condition 5) keep its live film as the third flip side' },
];
const flipOf = t => {
  const also = FLIP_ALSO.find(x => x.song === t.title);
  if (also) return V(also.id);
  const vs = filmsOf(t.title);
  return !vs.some(v => v.format === 'official') && vs.find(v => v.format === 'band');
};
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
.k-spine{background:#f8f3e6;color:#23202b;font:700 1rem "Arial Black",sans-serif;letter-spacing:.15em;text-transform:uppercase;padding:.5rem 1rem;border-radius:4px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
.k-jcard{display:grid;grid-template-columns:minmax(0,44%) minmax(0,1fr);gap:1rem;align-items:center}
.k-front{margin:0;position:relative;border:3px solid #23202b}.k-front picture{display:block}.k-front::after{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:repeating-linear-gradient(90deg,#ef476f 0 25%,#ffd166 0 50%,#06d6a0 0 75%,#118ab2 0)}
.k-front img{display:block;width:100%;height:auto;aspect-ratio:3/4;object-fit:cover;object-position:62% 40%;filter:saturate(.85) contrast(1.08) sepia(.12)}
.k-label h1{font-size:clamp(2rem,9vw,4.8rem)}
@media (max-width:599px){.k-label .t{letter-spacing:.08em;font-size:.82rem;line-height:1.35}.k-label>div{padding:.8rem}}
.k-flip{display:flex;gap:.6rem;align-items:center;margin:.35rem 0 .5rem;min-height:44px;color:#8a3b12;text-decoration:none;font-size:.88rem;line-height:1.3}
.k-flip:hover span:last-child{text-decoration:underline}
.k-thumb{flex:none;width:5.5rem;border:2px solid #23202b;border-radius:3px;overflow:hidden;position:relative}.k-thumb img{display:block;width:100%;height:auto}
.k-thumb::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,#f8f3e6 0 6px,#23202b 6px 8px,transparent 8px) 22% 50%/40% 70% no-repeat,radial-gradient(circle,#f8f3e6 0 6px,#23202b 6px 8px,transparent 8px) 78% 50%/40% 70% no-repeat;opacity:.9}
.k-flip b{color:#23202b}
.k-liner{margin:0 0 1rem;max-width:34rem;border:2px dashed #6a6478;border-radius:8px;padding:8px}.k-liner picture{display:block}.k-liner img{display:block;width:100%;height:auto;filter:grayscale(1) contrast(1.25)}`;
  const reel = `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#f8f3e6"/><circle cx="50" cy="50" r="18" fill="#3a3644"/>${[0, 60, 120, 180, 240, 300].map(a => `<rect x="47" y="30" width="6" height="12" fill="#f8f3e6" transform="rotate(${a} 50 50)"/>`).join('')}</svg>`;
  const side = (cls, letter, list) => `<section class="k-side ${cls}"><h2><span>${letter}</span>Side ${letter}</h2><ol start="${list[0].n}">${list.map(t => `<li><b>${esc(t.title)}</b> ${t.len}<small>first out ${fmtDate(t.first)}${t.video ? ` · ${vid(t)}` : ''}</small>${flipOf(t) ? filmLink(flipOf(t).id, 'k-flip', `<span class="k-thumb">${still(flipOf(t).id, { sizes: '88px' })}</span><span><b>Flip side</b> ${esc(flipOf(t).caption)}, filmed by ${esc(flipOf(t).channel)}</span>`) : ''}</li>`).join('')}</ol></section>`;
  const body = `<div class="k-wrap">
<div class="k-tape"><div class="k-label"><div class="k-jcard"><figure class="k-front">${photo('roadtrip-car', { eager: true })}</figure><div><p class="t">${esc(PERSON.tagline)}</p><h1>Marc Noah</h1><p>${ALBUM.title} · ${ALBUM.released} · ${ALBUM.label}</p></div></div></div>
<div class="k-reels">${reel}<span class="k-window" aria-hidden="true"></span>${reel}</div></div>
<p>His label says he is influenced by the music of the 1980s and 1990s, from pop to grunge, from musicals to rock. He lives in the Algarve and writes his own songs. Here is his first album, as a tape. ${cite(['epopeia', 'dinis'])}</p>
<div class="k-sides">${side('a', 'A', A)}${side('b', 'B', B)}</div>
<p>The sides are our layout; the album is released digitally, in this track order. Listen: ${listenLinks()}. ${cite(TRACKS_SRC.concat('epo-glv'))}</p>
<p>Before the album: ${OTHER_RELEASES.map(r => `<b>${esc(r.title)}</b> (${r.kind.toLowerCase()})`).join(', ')}. ${cite(['epopeia', 'apple'])}</p>
<h2 class="k-h">Liner notes</h2>
<figure class="k-liner">${lazyPhoto('towers-bridges-piano', { sizes: '(min-width:900px) 544px, 90vw' })}</figure>
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

// ---------------- Editorial (round 2; the home page) ----------------
// The passed design (round 2 PROPOSAL changes 1 to 8, with the review's conditions): his label's
// photographs lead, the films are the centrepiece, the album plays in the page. Same page for / and
// /d/editorial/ (canonical /). Uses /style.css, the system every main page shares.
function editorial(opts) {
  const C = citer(), c = C.c;
  const path = opts.home ? '/' : '/d/editorial/';
  const q = COMPOSER.quoteShort;
  const enQ = esc(q.en).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>'); // the title in italics, not in quotes
  const bandSet = V('S85R1WgyKJ0');
  const body = `
<section class="hero" aria-labelledby="h">
${photo('chair-dark', { eager: true, cls: 'hp' })}
<div class="wrap">
<p class="eyebrow">${esc(PERSON.tagline)}</p>
<h1 id="h"><span>Marc</span> <span>Noah</span></h1>
<p class="lede">${esc(HERO.line)}${c(HERO.src)}</p>
<p><a class="btn" ${playAttrs(bandSet)}><span class="disc">${PLAYICON}</span><span>Watch him live with his band<small>${esc(bandSet.event)}, Portimão, ${fmtDate(bandSet.date)}</small></span></a></p>
<p class="small">Filmed by ${esc(bandSet.channel)}.${c(vSrc([bandSet]))} <a class="more" href="#watch">Or choose: band, solo, sessions, videos</a></p>
</div>
</section>

<section class="band watch" id="watch" aria-labelledby="wth"><div class="wrap">
<p class="eyebrow">Watch</p>
<h2 class="sec" id="wth">Watch him play</h2>
<p class="lede muted">With his band, on his own, on a green sofa, and in his videos: ${VIDEOS.length} films, each playing here when you press it.</p>
${watchGroups(c)}
<p class="small">${esc(F.VIDEOS_NOTE)}${c(F.VIDEOS_SRC)} <a class="more" href="/videos/">Every film on one page</a></p>
</div></section>

<section class="band rule" aria-labelledby="wh"><div class="wrap words">
<div class="frame">${photo('portrait-bw')}</div>
<div>
<h2 class="eyebrow" id="wh">${esc(COMPOSER.head)}</h2>
<figure><blockquote class="q">${enQ}</blockquote>
<p class="pt" lang="pt-PT">${esc(q.pt)}</p>
<figcaption>${esc(q.caption)}${c(q.src)}</figcaption></figure>
<p class="muted" style="margin-top:1.5rem">${ptWord(COMPOSER.labelLine.text, COMPOSER.labelLine.ptWord)}${c(COMPOSER.labelLine.src)}</p>
<a class="more" href="${esc(COMPOSER.more.href)}">${esc(COMPOSER.more.text)}</a>
</div></div></section>

<section class="band rule" aria-labelledby="sh"><div class="wrap">
<p class="eyebrow">Listen</p>
<h2 class="sec" id="sh">${esc(ALBUM.title)}</h2>
${lyricLine(lyricFor('Roadtrip'), c)}
<p class="lede muted">${esc(ALBUM_LINE.text)}${c(ALBUM_LINE.src)}</p>
<div class="songs">
<div>${spotifyFacade(ALBUM)}
<p class="btns"><a class="btn line" href="${esc(ALBUM.listen[1].url)}">${esc(ALBUM.listen[1].name)}</a><a class="btn line" href="${esc(ALBUM.listen[2].url)}">${esc(ALBUM.listen[2].name)}</a></p></div>
<div>${trackRows(TRACKS, c)}
<p class="small" style="margin-top:1rem">Track order and lengths from Apple Music; under each song, its videos, live versions and sessions, each playing here.${c(TRACKS_SRC)} <a class="more" href="/songs/">${esc(SONGS_PAGE.allLink)}</a></p></div>
</div></div></section>

<section class="band rule" aria-labelledby="ah"><div class="wrap split">
<div class="ph">${photo('sofa-session-quarteira')}</div>
<div>
<p class="eyebrow">Home</p>
<h2 class="sec" id="ah">The Algarve</h2>
<p class="lede">${esc(STORY[0].text)}${c(STORY[0].src)}</p>
${mapFigure(c, 'hm', DARK_MAP)}
</div></div></section>

<section class="band live" aria-labelledby="lh">
${photo('live-acoustic')}
<div class="wrap">
<p class="eyebrow">Live</p>
<h2 class="sec" id="lh">On stage</h2>
<div class="livegrid">
<div><p class="lede">${esc(LIVE.count.text)}${countMark}</p>
<p><a class="more" href="/live/">Every date, with its source</a></p>
<h3>${esc(LIVE.stagesHead)}</h3>
${stageList(c)}
</div>
${bookCard(c)}
</div></div></section>`;
  const foot = siteFoot(c);
  return `${head({ title: 'Marc Noah, singer-songwriter, Algarve', description: opts.description, path, image: opts.image, canonical: '/' })}
<body>
${siteNav(path, { over: true })}
<main id="main">
${body}
<div class="wrap">${C.list()}</div>
</main>
${foot}
${playerDialog()}
${SCRIPT}
</body>
</html>
`;
}

export function renderDesign(id, opts) {
  return { editorial, coast, azulejo, poster, songbook, cassette }[id](opts);
}
