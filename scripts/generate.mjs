// Generate every page under src/ from data/facts.mjs. Run: node scripts/generate.mjs
// Then the usual gates: node scripts/build.mjs && node scripts/validate.mjs && node scripts/leak-scan.mjs
// Code Apache-2.0; the text it writes is CC BY 4.0.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as F from '../data/facts.mjs';
import { esc, fmtDate, citeMd, algarveMap, DESIGNS, DCOUNT, sitePage, ptWord, formatChips, stageList, mapFigure, photo, photoById, watchGroups, trackRows, spotifyFacade, lyricFor, lyricLine, bookCard, countMark, V, vSrc, vLabel, ytUrl, videoCard, playAttrs, PLAYICON, DARK_MAP, ALLSRC, SHORT, STILLS_CREDIT, listenLinks } from './lib.mjs';
import { PHOTOS, PHOTO_CREDIT, PHOTO_SOURCE } from '../data/photos.mjs';
import { renderDesign } from './designs.mjs';

const { SITE, SOURCES, SOURCES_NOTE, PERSON, STORY, BIO_PT, BIO_NOTE, BIO_EN, OWN_DESC, QUOTES, ALBUM, TRACKS, TRACKS_SRC, OTHER_RELEASES, LISTEN, FORMATS, FORMATS_SRC, PLACES, BEYOND, GIGS, GIGS_NOTE, GIGS_NOTE_SRC, BOOKING, NEEDS,
  COUNTS, FEATURE, COMPOSER, ALBUM_LINE, SONGS_PAGE, LIVE, STAGES, VIDEOS, VIDEOS_NOTE, LYRIC_LINES, CONTACT } = F;
const out = (p, s) => { const f = `src/${p}`; mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const card = id => `${SITE}/assets/share/${id}-1200x630.jpg`;
const MAIN_CARD = card('marc-noah');
const page = opts => sitePage({ image: MAIN_CARD, ...opts });

// ---------- fragments shared by the main pages ----------
const ptQuote = (q, c) => `<figure class="ptq"><blockquote lang="pt-PT">${esc(q.pt)}</blockquote><figcaption>${esc(q.en)} (our translation)${c(q.src || 'epopeia')}</figcaption></figure>`;
const venueText = g => g.venue === g.place ? `<span class="nv">${esc(LIVE.noVenue)}</span>` : esc(g.venue);
const gigRow = (g, c) => `<li><time datetime="${g.date}">${fmtDate(g.date)}</time> <b>${esc(g.place)}</b>${c(g.placeSrc)}, ${venueText(g)}${g.time ? `, ${esc(g.time)}` : ''}${g.kind !== 'concert' ? ` <span class="kind">${g.kind}</span>` : ''}${g.note ? ` <span class="gnote">${esc(g.note)}</span>` : ''}${c(g.src)}</li>`;
const enTitle = s => esc(s).replace(/&quot;([^&]+)&quot;/, '<i>$1</i>'); // a title in italics, not in quotes

// ---------- pages ----------
const homeDesc = 'Marc Noah lives on the Algarve coast and writes the songs he sings. Watch him play with his band and on his own, play his first album, Giant Little Victories (2024), and see where he plays and how to book him.';
out('index.html', renderDesign('editorial', { home: true, image: MAIN_CARD, description: homeDesc }));

const rt = TRACKS.find(t => t.n === FEATURE.n);
const rtVideo = VIDEOS.find(v => v.id === new URL(rt.video.url).searchParams.get('v'));
const gss = OTHER_RELEASES.find(r => r.kind === 'EP');
out('songs/index.html', page({ path: '/songs/', title: 'The songs of Marc Noah', description: `${SONGS_PAGE.head}: the eight songs of Giant Little Victories, his first album (November 2024), to play here from Spotify, with every film of each song, Roadtrip, and the EP Green Sofa Session.`, body: c => `
<p class="eyebrow" style="margin-top:2.5rem">The songs of Marc Noah</p>
<h1 style="margin-top:0">${esc(SONGS_PAGE.head)}</h1>
<p class="lede">${ptWord(SONGS_PAGE.lead.text, SONGS_PAGE.lead.ptWord)}${c(SONGS_PAGE.lead.src)} ${esc(ALBUM_LINE.text)}${c(ALBUM_LINE.src)}</p>
<div class="songs" style="margin-top:2rem">
<div>${spotifyFacade(ALBUM)}
<p class="btns"><a class="btn line" href="${esc(ALBUM.listen[1].url)}">${esc(ALBUM.listen[1].name)}</a><a class="btn line" href="${esc(ALBUM.listen[2].url)}">${esc(ALBUM.listen[2].name)}</a></p></div>
<div><h2 id="all" style="margin-top:0">The eight songs</h2>
${trackRows(TRACKS, c, { lyrics: true }).replace(lyricLine(lyricFor('Roadtrip'), c, 'sm'), '')}
<p class="small" style="margin-top:1rem">Track order, lengths and video dates from Apple Music and his YouTube channel.${c(TRACKS_SRC)} ${esc(ALBUM.note)}${c(ALBUM.src)} ${esc(SONGS_PAGE.credits)} Lyric lines as his own site shows them.</p></div>
</div>
<section class="part" aria-labelledby="rt"><div class="split">
<div class="ph">${photo('roadtrip-car')}</div>
<div>
<p class="eyebrow">Featured song · track ${rt.n}</p>
<h2 class="sec" id="rt">${esc(FEATURE.title)}</h2>
${lyricLine(lyricFor('Roadtrip'), c)}
<p>${FEATURE.songsLines.map(l => `${esc(l.text)}${c(l.src)}`).join(' ')}</p>
<figure class="ptq"><blockquote>${esc(QUOTES[FEATURE.quoteFull].en)}</blockquote>
<p class="pt" lang="pt-PT">${esc(QUOTES[FEATURE.quoteFull].pt)}</p>
<figcaption>Marc Noah, on ${esc(QUOTES[FEATURE.quoteFull].about)} (our translation)${c(QUOTES[FEATURE.quoteFull].src)}</figcaption></figure>
<p class="btns"><a class="btn" ${playAttrs(rtVideo)}><span class="disc">${PLAYICON}</span><span>Watch the video<small>Roadtrip · song, ${esc(rt.len)}</small></span></a></p>
</div></div>
${mapFigure(c, 'sm', DARK_MAP)}
</section>
<section class="part" aria-labelledby="gss"><div class="split rev">
<div class="ph wide">${photo('green-sofa-session-ep')}</div>
<div>
<p class="eyebrow">${esc(gss.kind)}</p>
<h2 class="sec" id="gss">${esc(gss.title)}</h2>
<p>${esc(gss.text)}${c(gss.src)}</p>
<figure class="ptq"><blockquote>${esc(QUOTES[3].en)}</blockquote><p class="pt" lang="pt-PT">${esc(QUOTES[3].pt)}</p><figcaption>Marc Noah, on ${esc(QUOTES[3].about)} (our translation)${c(QUOTES[3].src)}</figcaption></figure>
</div></div>
<h3 style="margin-top:2rem">The sessions on film</h3>
<ul class="sofa">${VIDEOS.filter(v => v.format === 'session').map(v => `<li>${videoCard(v, { cls: 'tall' })}</li>`).join('')}</ul>
${c(vSrc(VIDEOS.filter(v => v.format === 'session')))}
</section>
<section class="part" aria-labelledby="singles">
<h2 id="singles">Singles before the album</h2>
<ul class="cards">
${OTHER_RELEASES.filter(r => r.kind === 'Single').map(r => `<li class="card"><p class="kind">${esc(r.kind)}</p><h3>${esc(r.title)}</h3><p>${esc(r.text)}${c(r.src)}</p>${r.url ? `<p><a class="more" href="${esc(r.url)}">Listen on Apple Music</a></p>` : ''}</li>`).join('\n')}
</ul>
</section>
` }));

out('algarve/index.html', page({ path: '/algarve/', title: 'Marc Noah in the Algarve', description: 'Where Marc Noah lives and plays: a drawn map of the Algarve, from Sagres to Pechão, with every town named in his label’s list, his own site and the press.', body: c => `
<h1>The Algarve</h1>
<p class="lede">${esc(STORY[0].text)}${c(STORY[0].src)}</p>
<div class="split" style="margin:2rem 0">
<div class="ph">${photo('sofa-session-quarteira')}</div>
<div>${algarveMap({ id: 'am', land: DARK_MAP.land, stroke: DARK_MAP.stroke, sea: DARK_MAP.sea, ink: DARK_MAP.ink, pin: DARK_MAP.route, home: DARK_MAP.home, seaInk: DARK_MAP.seaInk, ring: DARK_MAP.ring })}</div>
</div>
<h2>Places</h2>
<ul class="cards">
${PLACES.map(p => `<li class="card${p.home ? ' home' : ''}" id="${p.id}"><p class="kind">${p.home ? 'Home' : 'Played'}</p><h3>${esc(p.name)}</h3><p>${esc(p.text)}${c(p.src)}</p></li>`).join('\n')}
</ul>
<h2>Beyond the Algarve</h2>
<ul class="cards">
${BEYOND.map(p => `<li class="card"><h3>${esc(p.name)}</h3><p>${esc(p.text)}${c(p.src, p.placeSrc)}</p></li>`).join('\n')}
</ul>
<p class="note">Quarteira comes from his own site, marcnoah.pt, as archived by Arquivo.pt on 15 December 2025; the live site could not be reached on ${F.READ}.${c('own-site')} <a class="more" href="/sources/">All the sources</a></p>
` }));

const concerts = GIGS.filter(g => g.kind === 'concert');
const others = GIGS.filter(g => LIVE.otherKinds.includes(g.kind));
const years = [...new Set(concerts.map(g => g.date.slice(0, 4)))];
out('live/index.html', page({ path: '/live/', title: 'Marc Noah live', description: `How to book Marc Noah, films of each way he plays, and every dated concert in his label’s list, his own site and the press: ${COUNTS.concerts} from ${COUNTS.first.slice(0, 4)} to ${COUNTS.last.slice(0, 4)} (our count).`, body: c => `
<h1>Live</h1>
<div class="livegrid">
${bookCard(c, { tag: 'h2', head: LIVE.head })}
<div><p class="lede">${esc(LIVE.count.text)}${countMark}</p>
<p><a class="more" href="#concerts">Every date, with its source</a></p>
<h2 style="margin-top:1rem">${esc(LIVE.stagesHead)}</h2>
${stageList(c)}</div>
</div>
<section class="part watch" id="watch" aria-labelledby="films">
<h2 id="films">What each format looks like</h2>
${watchGroups(c, { groups: ['band', 'solo'], chips: false })}
<p class="small"><a class="more" href="/videos/">Every film, with the Green Sofa Sessions and his videos</a></p>
</section>
<h2>Coming up</h2>
<p class="note">No future dates are listed by his label as of 17 November 2026.${c(BOOKING.src)} <a class="more" href="${esc(BOOKING.url)}">Check his artist page at Epopeia</a></p>
<h2 id="concerts">Concerts</h2>
<p>${esc(LIVE.count.text)}${countMark}</p>
${years.map(y => `<h3>${y}</h3>\n<ul class="gigs">\n${concerts.filter(g => g.date.startsWith(y)).map(g => gigRow(g, c)).join('\n')}\n</ul>`).join('\n')}
<h2>${esc(LIVE.otherHead)}</h2>
<ul class="gigs">
${others.map(g => gigRow(g, c)).join('\n')}
</ul>
<p class="note">${esc(GIGS_NOTE)}${c(GIGS_NOTE_SRC)}</p>
` }));

const Q0 = QUOTES[0];
const GALLERY = ['towers-bridges-piano', 'green-sofa-session', 'live-acoustic', 'roadtrip-road', 'autumn-leaves-tour', 'green-sofa-session-ep'];
out('about/index.html', page({ path: '/about/', title: 'About Marc Noah', description: 'Marc Noah, Portuguese-Australian singer-songwriter living in the Algarve: his story, his own words, lines from his songs, his label’s biography in Portuguese with a translation, and his label’s photographs.', body: c => `
<section class="ahead" aria-labelledby="h">
<div class="ph">${photo('portrait-bw', { eager: true })}</div>
<div class="tx">
<p class="eyebrow">About</p>
<h1 id="h">Marc Noah</h1>
<p class="lede">${esc(PERSON.oneLine)}${c(['epopeia', 'dinis'])}</p>
<figure style="margin:2rem 0 0;border-left:2px solid var(--accent);padding-left:1.2rem"><blockquote class="q" style="font-size:clamp(1.3rem,3.8vw,1.75rem);margin:0 0 .6rem;border:0;padding:0">${enTitle(COMPOSER.quoteShort.en)}</blockquote>
<figcaption>${esc(COMPOSER.quoteShort.caption)}${c(COMPOSER.quoteShort.src)}</figcaption></figure>
</div></section>
<section class="part story" aria-labelledby="s1"><div class="split">
<div class="ph">${photo('sofa-session-quarteira')}</div>
<div><p class="eyebrow">01</p><h2 id="s1">${esc(STORY[0].head)}</h2><p class="lede">${esc(STORY[0].text)}${c(STORY[0].src)}</p></div>
</div></section>
<section class="part story" aria-labelledby="s2"><div class="split rev">
<div class="ph">${photo('chair-dark', { pos: '62% 50%' })}</div>
<div><p class="eyebrow">02</p><h2 id="s2">${esc(STORY[1].head)}</h2><p class="lede">${ptWord(STORY[1].text, 'cantautor')}${c(STORY[1].src)}</p></div>
</div></section>
<section class="part story" aria-labelledby="s3"><div class="split">
<div class="pair">${photo('giant-little-victories-cover')}${photo('green-sofa-session-ep')}</div>
<div><p class="eyebrow">03</p><h2 id="s3">${esc(STORY[2].head)}</h2><p class="lede">${esc(STORY[2].text)}${c(STORY[2].src)}</p><a class="more" href="/songs/">The songs, and the album to play</a></div>
</div></section>
<section class="part" aria-labelledby="qh"><div class="split rev">
<div class="ph wide">${photo('towers-bridges-clouds')}</div>
<div><p class="eyebrow">In his own words</p><h2 id="qh">On ${esc(Q0.about)}</h2>
<figure style="margin:0"><blockquote class="q" style="font-size:clamp(1.25rem,3.4vw,1.7rem);border:0;padding:0">${enTitle(Q0.en)}</blockquote>
<p class="pt" lang="pt-PT">${esc(Q0.pt)}</p>
<figcaption>Marc Noah (our translation)${c(Q0.src)}</figcaption></figure></div>
</div></section>
<section class="part" aria-labelledby="bio">
<h2 id="bio">${esc(BIO_EN.head)}</h2>
${BIO_EN.paras.map(p => `<p class="lede">${esc(p.text)}${c(p.src)}</p>`).join('\n')}
<figure class="ptq"><blockquote lang="pt-PT">${esc(OWN_DESC.pt)}</blockquote><figcaption>${esc(OWN_DESC.en)} ${esc(OWN_DESC.caption)}${c(OWN_DESC.src)}</figcaption></figure>
</section>
<section class="part" aria-labelledby="lyh">
<p class="eyebrow">In his songs</p>
<h2 id="lyh" style="margin-top:0">Lines he wrote</h2>
<p class="small">Short lines from his songs, exactly as his own site shows them.</p>
<div class="lyrs">${LYRIC_LINES.map(l => lyricLine(l, c)).join('\n')}</div>
</section>
<section class="part" aria-labelledby="lbl">
<h2 id="lbl">His story, as his label tells it</h2>
<p>From his artist page at Epopeia Records, in Portuguese as published, with our translation beside each paragraph.${c('epopeia')}</p>
<div class="bio">${BIO_PT.map(b => `<div><p class="ptx" lang="pt-PT">${esc(b.pt)}</p><p>${esc(b.en)}</p></div>`).join('\n')}</div>
<p class="small">${esc(BIO_NOTE)}</p>
</section>
<section class="part" aria-labelledby="own">
<h2 id="own">More in his own words</h2>
${QUOTES.slice(1).map(q => `<h3>On ${esc(q.about)}</h3>${ptQuote(q, c)}`).join('\n')}
</section>
<section class="part" aria-labelledby="gal">
<h2 id="gal">From his label</h2>
<ul class="gal">${GALLERY.map(id => `<li><a href="${photoById(id).file}"><figure>${photo(id)}<figcaption>${esc(photoById(id).alt)}</figcaption></figure></a></li>`).join('')}</ul>
<p class="small" style="margin-top:1rem">${esc(PHOTO_CREDIT)}${c('photos')}</p>
</section>
<section class="part" aria-labelledby="snd">
<h2 id="snd">His sound and his voice</h2>
<p>His label puts it as a gentle mix of pop, indie and rock. The Algarve press writes of an intimate sound and a husky voice (<i lang="pt">voz rouca</i>) that has become one of his marks.${c(['epopeia', 'avoz'])}</p>
<p class="btns"><a class="btn" ${playAttrs(V('S85R1WgyKJ0'))}><span class="disc">${PLAYICON}</span><span>Hear him live with his band<small>${esc(V('S85R1WgyKJ0').caption)}</small></span></a></p>
</section>
` }));

out('listen/index.html', page({ path: '/listen/', title: 'Listen to Marc Noah, and book him', description: 'Where to listen to Marc Noah (Spotify, Apple Music, YouTube), his album to play here, and how to book him: geral@epopeia-records.pt or his label’s artist page.', body: c => `
<h1>Listen and book</h1>
<div class="songs" style="margin-top:2rem">
<div>${spotifyFacade(ALBUM)}</div>
<div><h2 style="margin-top:0">Listen</h2>
<ul class="cards">
${listenLinks().map(l => `<li class="card"><h3><a href="${esc(l.url)}">${esc(l.name)}</a>${c(l.src)}</h3></li>`).join('\n')}
</ul></div>
</div>
<h2 id="book">Book Marc</h2>
<p>${esc(BOOKING.text)}${c(BOOKING.src, BOOKING.emailSrc)}</p>
<p><a class="mail" href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a>${c(CONTACT.src)}</p>
<figure class="ptq"><blockquote lang="pt-PT">${esc(CONTACT.pt)}</blockquote><figcaption>${esc(CONTACT.en)}: his own site’s contact page (our translation)${c(CONTACT.src)}</figcaption></figure>
<p class="actions"><a class="btn line" href="${esc(BOOKING.url)}">His artist page at Epopeia Records</a></p>
${formatChips()}<p class="small">Formats as his label lists them.${c(FORMATS_SRC)} <a class="more" href="/live/#films">See each format on film</a></p>
` }));

out('videos/index.html', page({ path: '/videos/', title: 'Watch Marc Noah play', description: `All ${VIDEOS.length} films of Marc Noah: with his band, on his own, the Green Sofa Sessions and his music videos, each playing here from YouTube when you press it.`, body: c => `
<p class="eyebrow" style="margin-top:2.5rem">Watch</p>
<h1 style="margin-top:0">Watch him play</h1>
<p class="lede muted">With his band, on his own, on a green sofa, and in his videos: ${VIDEOS.length} films, each playing here when you press it, filed by the way you can book him.</p>
<div class="watch" id="watch">
${watchGroups(c, { book: '/live/#book', h: 2, eager: true })}
</div>
<p class="small">${esc(VIDEOS_NOTE)}${c(F.VIDEOS_SRC)} ${esc(STILLS_CREDIT)}${c('yt-frames')}</p>
` }));

out('sources/index.html', page({ path: '/sources/', title: 'Sources for the Marc Noah site', description: 'Every public source behind the Marc Noah site, with the date each was read, how we counted his concerts, what photographs and films the site uses and on whose word, and what could not be read.', body: c => `
<h1>Sources</h1>
<p class="lead">Every fact on this site comes from one of these, each read on the date shown. On each page, small numbers after a fact link to that page’s own source list.</p>
<h2 id="all-sources">Every source</h2>
<ul class="cards">
${Object.entries(ALLSRC).map(([id, s]) => `<li class="card" id="${id}"><h3><a href="${esc(s.url)}">${esc(s.title)}</a></h3><p class="meta">Read ${esc(s.read)}${s.captured ? `; archived copy of ${esc(s.captured)}` : ''}</p></li>`).join('\n')}
</ul>
<h2 id="photos-video">Photographs and video</h2>
<p>The thirteen photographs come from his label’s artist page and are credited to Epopeia Records, at Dinis Cruz’s word on 17 November 2026 (about 22:45 to 23:00 UTC, recorded in the repository’s team/WORKFLOW.md): Marc has authorised their use.${c('photos')} ${esc(PHOTO_CREDIT)}</p>
<p>The films are embedded from YouTube and the album from Spotify, at Dinis’s word of the same evening (about 22:45 UTC). Nothing loads from YouTube or Spotify until a visitor presses play. The still on each film card is that video’s own YouTube poster frame, kept on this site so that YouTube is not contacted before a press (Dinis, about 23:25 UTC). ${esc(STILLS_CREDIT)} The frames were viewed for what they show; they are listed above as a source, not loaded from YouTube.${c('yt-frames')}</p>
<p>Lyric lines: only the four short lines his own site shows as headlines, each attributed to its song (Dinis, about 23:10 UTC).${c('own-site')}</p>
<h2 id="counts">Our own counts</h2>
<p>${esc(COUNTS.how)} Today: ${COUNTS.concerts} concerts, ${COUNTS.concertsAlgarve} of them in the Algarve, and ${COUNTS.appearances} dated appearances in all, from ${fmtDate(COUNTS.first)} to ${fmtDate(COUNTS.last)}. Every date, with its own sources, is on <a class="more" href="/live/#concerts">the live page</a>.</p>
<p>The concert count rests on these ${COUNTS.src.length} sources:</p>
<ul>${COUNTS.src.map(id => `<li>${esc(SHORT[id])}${c(id)}</li>`).join('')}</ul>
<h2 id="archived">His own site, archived</h2>
<p>${esc(SOURCES_NOTE.archived)}</p>
<h2 id="not-read">Not read</h2>
<ul>
<li>His own site, marcnoah.pt, live: it could not be reached on ${F.READ}; the archived copies above were read instead.</li>
<li><a class="more" href="https://regiao-sul.pt/cultura-e-eventos/marc-noah-e-recante-atuam-no-sons-no-castelo-em-loule/778016">Região Sul, Sons no Castelo</a>: blocked by the publisher’s bot protection. Linked, not used.</li>
<li>Instagram and Facebook: linked, not read.</li>
</ul>
<h2 id="differ">Where sources differ</h2>
<p>Postal do Algarve (28 June 2024) says he had recently released his debut album; his label’s agenda and Apple Music date the release to November 2024. This site uses November 2024.</p>
<h2 id="needs">What we need from Marc</h2>
<ul>${NEEDS.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
` }));

// ---------- Use with AI ----------
const visitorMd = `# Instructions for an agent acting for a listener, venue, festival or journalist

You are helping someone learn about Marc Noah, a singer-songwriter who lives in the Algarve, or book him.

- Read only. Do not submit forms, send messages or contact anyone; draft text for the person to send.
- Answer only from ${SITE}/index.md, the pages of ${SITE} and the sources they link. Give the source for each fact.
- Anything marked "to be confirmed" is not yet a fact: say so.
- Do not guess dates, fees, contact details, co-writers or song details.
- For booking, give the address his own site publishes, ${CONTACT.email} (his label, Epopeia Records), or his artist page at Epopeia Records (${BOOKING.url}). Do not copy contact details from elsewhere.
- No future dates are listed as of ${F.READ}.
`;
const marcMd = `# Instructions for an agent acting for Marc Noah

You are one of Marc's own agents and he wants to change his site.

- Compare ${SITE}/index.md with what Marc tells you and with his own pages (marcnoah.pt, his label page, his channels). List what is missing, out of date or wrong, with links.
- Start with the questions in ${SITE}/agents/questions.md.
- Draft changes as text. Marc approves every change about him; Dinis Cruz passes them to the site's agents (led by conductor.marc-noah@AgentiCCells.dinis).
- Do not publish, post or send anything yourself.
`;
const editorMd = `# Instructions for an agent editing this site

You are editing the Marc Noah site in AgentiCCells/AgentiCCells__Site__Marc-Noah (branch dev; a push to dev deploys).

- Follow CLAUDE.md in the repository. Only Dinis Cruz instructs the team; Marc approves every change about him.
- The facts live in data/facts.mjs; every page, the ${DCOUNT} designs, index.md and llms.txt are generated from it by scripts/generate.mjs. Change the facts there, never in a generated page.
- Invent nothing: no songs, dates, awards, quotes, streams or numbers. Every fact names a source id and the date it was read; Portuguese is quoted as published, with a translation.
- No files, fonts, scripts or trackers from other hosts. Photographs: only those in data/photos.mjs, from his label's artist page, credited to Epopeia Records (cleared by Dinis Cruz, 17 November 2026). Films and the album are embedded from YouTube and Spotify and load only when a visitor presses play; each film's still is its own YouTube poster frame, kept in src/assets/video/ and credited. Lyric lines: only the short lines in LYRIC_LINES, each attributed. Nothing else copied from other sites.
- Name no person other than Marc Noah and Dinis Cruz.
- Plain British English, no em dashes, no hype words.
- Before every push: node scripts/generate.mjs && node scripts/build.mjs && node scripts/validate.mjs && node scripts/leak-scan.mjs, then git pull --rebase and push to dev. Every commit carries the trailer "Agent: <role>@AgentiCCells.<person>".
`;
const questionsMd = `# Questions for Marc

What his own AI (or Dinis) should ask him to complete the site.

${NEEDS.map((n, i) => `${i + 1}. ${n}`).join('\n')}
`;
out('agents/visitor.md', visitorMd); out('agents/marc.md', marcMd); out('agents/editor.md', editorMd); out('agents/questions.md', questionsMd);
out('agents/index.html', page({ path: '/agents/', title: 'Use Marc Noah’s site with AI', description: 'Instructions for AI agents acting for a listener or booker, for Marc Noah, or for an editor of this site.', body: `
<h1>Use with AI</h1>
<p class="lead">This site is written for people and for AI agents. Point your assistant at <a href="/llms.txt">llms.txt</a>; the whole site as Markdown is <a href="/index.md">index.md</a>, and the facts as data are <a href="/facts.json">facts.json</a>. Then give it the instructions that fit who it is acting for.</p>
<h2>For a listener, venue, festival or journalist</h2>
<p><a class="more" href="/agents/visitor.md">visitor.md</a></p>
<pre>${esc(visitorMd)}</pre>
<h2>For Marc</h2>
<p><a class="more" href="/agents/marc.md">marc.md</a> and <a class="more" href="/agents/questions.md">questions.md</a></p>
<pre>${esc(marcMd)}</pre>
<h2>For an editor of this site</h2>
<p><a class="more" href="/agents/editor.md">editor.md</a></p>
<pre>${esc(editorMd)}</pre>
<h2>How this site is made</h2>
<p>A team of AI agents writes and checks this site in rounds, from one facts file, and Marc approves every change about him through Dinis Cruz. See the team, their policies, the flow and every commit on <a href="/behind-the-scenes/">behind the scenes</a>.</p>
<h2>What we need from Marc</h2>
<ul>${NEEDS.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
` }));

// ---------- designs ----------
const dUrl = d => d.default ? '/' : `/d/${d.id}/`;
for (const d of DESIGNS) out(`d/${d.id}/index.html`, renderDesign(d.id, { image: d.default ? MAIN_CARD : card(d.id), description: `${d.name}: ${d.idea} The same facts about Marc Noah, singer-songwriter in the Algarve.` }));
out('designs.json', JSON.stringify({ about: `The same facts about Marc Noah, laid out ${DCOUNT} ways. Editorial is the home page. The master copy is /index.md.`, designs: DESIGNS.map(d => ({ id: d.id, name: d.name, idea: d.idea, url: `${SITE}/d/${d.id}/`, home: d.default ? `${SITE}/` : undefined, default: !!d.default, preview: `${SITE}/assets/designs/${d.id}.jpg`, share_card: d.default ? MAIN_CARD : card(d.id) })) }, null, 2) + '\n');
out('d/index.html', page({ path: '/d/', title: `Marc Noah, in ${DCOUNT} designs`, description: `The same facts about Marc Noah laid out ${DCOUNT} ways: ${DESIGNS.map(d => d.name).join(', ')}.`, body: `
<h1>Choose a design</h1>
<p class="lead">The same facts and the same sources, laid out ${DCOUNT} ways. Editorial is the home page; The Coast was the home in round 1. The facts never change between them. The master copy is <a href="/index.md">index.md</a>.</p>
<ul class="designs">
${DESIGNS.map(d => `<li><a href="/d/${d.id}/"${d.default ? ' aria-current="page"' : ''}><img src="/assets/designs/${d.id}.jpg" width="480" height="300" alt="" loading="lazy" decoding="async"><b>${esc(d.name)}</b>${d.default ? ' <span class="kind">the home page, and the system of every main page</span>' : d.round1 ? ' <span class="kind">the home in round 1</span>' : ''}<span class="di">${esc(d.idea)}</span></a></li>`).join('\n')}
</ul>
<p class="small">As data: <a class="more" href="/designs.json">designs.json</a>. Each design has its own link preview card.</p>
` }));

// ---------- index.md, llms.txt, facts.json ----------
const md = `# Marc Noah

${PERSON.tagline}. ${PERSON.oneLine}

Every fact below names its public source; each was read on ${F.READ}. Marc approves every change about him. Version __VERSION__.

## His story

${STORY.map(s => `### ${s.head}\n\n${s.text} ${citeMd(s.src)}`).join('\n\n')}

## Watch him play

${VIDEOS_NOTE} ${citeMd(F.VIDEOS_SRC)}

${[['band', 'With the band'], ['solo', 'On his own'], ['session', 'Green Sofa Sessions'], ['official', 'His videos']].map(([f, h]) => `### ${h}

${VIDEOS.filter(v => v.format === f).map(v => `- [${v.caption}](${ytUrl(v.id)})${v.date ? `, ${fmtDate(v.date)}` : ''}, ${v.channel} ${citeMd(vSrc([v]))}`).join('\n')}`).join('\n\n')}

The duo format is real, but we have not found a film of him as a duo yet.

## Lines he wrote

Short lines from his songs, exactly as his own site shows them:

${LYRIC_LINES.map(l => `> ${l.text}\n\nFrom ${l.song} ${citeMd(l.src)}`).join('\n\n')}

## His songs

**${ALBUM.title}**, ${ALBUM.kind.toLowerCase()}, ${ALBUM.released}, ${ALBUM.label}. ${ALBUM.note} ${citeMd(ALBUM.src)}

Listen: ${ALBUM.listen.map(l => `[${l.name}](${l.url})`).join(', ')}.

${TRACKS.map(t => `${t.n}. ${t.title} (${t.len}; first released ${fmtDate(t.first)}${t.single ? ' as a single' : ''})${t.video ? `. [${t.video.kind}](${t.video.url})` : ''}${t.note ? `. ${t.note} ${citeMd(t.src)}` : ''}`).join('\n')}

${citeMd(TRACKS_SRC)}

Before the album:

${OTHER_RELEASES.map(r => `- ${r.title} (${r.kind}): ${r.text} ${citeMd(r.src)}`).join('\n')}

## In his own words

${QUOTES.map(q => `On ${q.about}:\n\n> ${q.pt}\n\n${q.en} (our translation) ${citeMd(q.src)}`).join('\n\n')}

## His story, as his label tells it

${BIO_PT.map(b => `> ${b.pt}\n\n${b.en}`).join('\n\n')}

${BIO_NOTE} ${citeMd('epopeia')}

## Where he lives and plays

${PLACES.map(p => `- **${p.name}**${p.home ? ' (home)' : ''}: ${p.text} ${citeMd(p.src)}`).join('\n')}
${BEYOND.map(p => `- **${p.name}**: ${p.text} ${citeMd(p.src)}`).join('\n')}

## Live

No future dates are listed by his label as of ${F.READ}.

Formats: ${FORMATS.map(f => `${f.name}, ${f.mins} minutes, ${f.on.toLowerCase()}, ${f.people}`).join('; ')}. ${citeMd(FORMATS_SRC)}

${GIGS.map(g => `- ${fmtDate(g.date)}: ${g.place}, ${g.venue}${g.time ? `, ${g.time}` : ''}${g.kind !== 'concert' ? ` (${g.kind})` : ''}${g.note ? `. ${g.note}` : ''} ${citeMd(g.src)}`).join('\n')}

${GIGS_NOTE} ${citeMd(GIGS_NOTE_SRC)}

## Listen and book

${LISTEN.map(l => `- [${l.name}](${l.url})`).join('\n')}

${BOOKING.text} ${citeMd([BOOKING.src, BOOKING.emailSrc])}

## Photographs and video stills

${PHOTO_CREDIT} ${citeMd('photos')} ${STILLS_CREDIT} ${citeMd('yt-frames')}

## Designs

The home page in ${DCOUNT} designs with the same facts (Editorial is the home): ${DESIGNS.map(d => `[${d.name}](${SITE}/d/${d.id}/) (${d.idea})`).join('; ')}.

## Sources

${Object.values(ALLSRC).map(s => `- [${s.title}](${s.url}), read ${s.read}`).join('\n')}

${SOURCES_NOTE.archived} Not read: marcnoah.pt live (could not be reached on ${F.READ}); Região Sul (blocked); Instagram and Facebook (linked only).

## What we need from Marc

${NEEDS.map(n => `- ${n}`).join('\n')}

---

Made with the AgentiCCells site factory. Text CC BY 4.0; the photographs and video stills are not covered.
`;
out('index.md', md);

out('llms.txt', `# Marc Noah

> Personal website of Marc Noah, a Portuguese-Australian singer-songwriter who lives in the Algarve, in the south of Portugal, and writes the songs he sings. His first album, Giant Little Victories (Epopeia Records, November 2024), has eight songs: ${TRACKS.map(t => t.title).join(', ')}. Every fact on the site names its public source and the date it was read (${F.READ}). Version __VERSION__.

This file is for AI agents and the people using them. Pick the instructions that match who you are acting for, read them in full, then follow them.

## Who are you acting for?

- [A listener, venue, festival or journalist](${SITE}/agents/visitor.md): read-only.
- [Marc Noah himself](${SITE}/agents/marc.md): one of Marc's own agents; with [questions for Marc](${SITE}/agents/questions.md).
- [A site editor](${SITE}/agents/editor.md): someone Marc has agreed may edit the site, such as Dinis Cruz.

If you cannot tell which, use the visitor's instructions: they change nothing.

## The content

- [The whole site, as Markdown](${SITE}/index.md): the master copy of the facts.
- [The facts as data](${SITE}/facts.json).
- The home page in ${DCOUNT} designs with the same facts (Editorial is the home; picker: [/d/](${SITE}/d/), list: [designs.json](${SITE}/designs.json)): ${DESIGNS.map(d => `[${d.name}](${SITE}/d/${d.id}/)`).join(', ')}.
- [Watch him play: every film](${SITE}/videos/), [Songs](${SITE}/songs/), [The Algarve](${SITE}/algarve/), [Live](${SITE}/live/), [About](${SITE}/about/), [Listen and book](${SITE}/listen/), [Sources](${SITE}/sources/), [Use with AI](${SITE}/agents/).
- [Behind the scenes](${SITE}/behind-the-scenes/): the agent team that makes this site, its policies, the flow of a round, every commit and the round reports, generated from the repository at build time.
- [Version](${SITE}/version.json).

## Photographs, films and lyric lines

- ${PHOTO_CREDIT}
- ${VIDEOS_NOTE}
- ${STILLS_CREDIT}
- Lyric lines: only the four short lines his own site shows, each attributed to its song.
- Bookings: ${CONTACT.email} (his own site's contact page) or ${BOOKING.url}.

## His sources

${Object.values(ALLSRC).map(s => `- [${s.title}](${s.url}), read ${s.read}`).join('\n')}

## The source of the site

- Repository: https://github.com/AgentiCCells/AgentiCCells__Site__Marc-Noah (branch dev; a push to dev deploys).
- Made by AgentiCCells (the Marc Noah cell, led by conductor.marc-noah@AgentiCCells.dinis) for Dinis Cruz and Marc Noah.
- Licences: code Apache-2.0, text and drawings CC BY 4.0; the photographs and video stills are not covered.
`);

out('facts.json', JSON.stringify({ person: PERSON, story: STORY, album: ALBUM, tracks: TRACKS, other_releases: OTHER_RELEASES, places: PLACES, beyond: BEYOND, gigs: GIGS, formats: FORMATS, listen: LISTEN, booking: BOOKING, contact: CONTACT, videos: VIDEOS, lyric_lines: LYRIC_LINES, photos: { credit: PHOTO_CREDIT, source: PHOTO_SOURCE, list: PHOTOS }, sources: ALLSRC, needs: NEEDS }, null, 2) + '\n');
out('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0b0f14"/><circle cx="32" cy="26" r="12" fill="#e2a878"/><path d="M0 44c10-6 22-6 32 0s22 6 32 0v20H0z" fill="#1c2530"/></svg>\n');
console.log('generated src/');
