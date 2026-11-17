// Generate every page under src/ from data/facts.mjs. Run: node scripts/generate.mjs
// Then the usual gates: node scripts/build.mjs && node scripts/validate.mjs && node scripts/leak-scan.mjs
// Code Apache-2.0; the text it writes is CC BY 4.0.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as F from '../data/facts.mjs';
import { esc, fmtDate, cite, citeMd, head, algarveMap, DESIGNS, SHORT } from './lib.mjs';
import { renderDesign } from './designs.mjs';

const { SITE, SOURCES, PERSON, STORY, BIO_PT, BIO_NOTE, QUOTES, ALBUM, TRACKS, TRACKS_SRC, OTHER_RELEASES, LISTEN, FORMATS, FORMATS_SRC, PLACES, BEYOND, GIGS, GIGS_NOTE, GIGS_NOTE_SRC, BOOKING, NEEDS } = F;
const out = (p, s) => { const f = `src/${p}`; mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const card = id => `${SITE}/assets/share/${id}-1200x630.jpg`;
const MAIN_CARD = card('marc-noah');

const NAV = [['/', 'Home'], ['/songs/', 'Songs'], ['/algarve/', 'The Algarve'], ['/live/', 'Live'], ['/about/', 'About'], ['/listen/', 'Listen and book'], ['/d/', 'Five designs'], ['/agents/', 'Use with AI']];
const nav = path => `<a class="skip" href="#main">Skip to content</a>
<header class="top">
<a class="brand" href="/">Marc Noah <span>singer-songwriter, Algarve</span></a>
<nav aria-label="Main">
${NAV.map(([h, t]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ''}>${t}</a>`).join('\n')}
</nav>
</header>`;
const foot = `<footer>
<p>Every fact on this site names its public source and the date it was read: see <a href="/sources/">sources</a>. Marc approves every change about him. No photos, audio or lyrics are copied here; follow the links to listen.</p>
<p>Made with the AgentiCCells site factory; a first version, materials to follow.</p>
<p class="muted">Version __VERSION__ · <a href="/agents/">Use with AI</a> · <a href="/llms.txt">llms.txt</a> · <a href="/index.md">index.md</a> · <a href="https://github.com/AgentiCCells/AgentiCCells__Site__Marc-Noah">Source</a> · Code Apache-2.0, text and drawings CC BY 4.0</p>
</footer>`;
const page = ({ path, title, description, body, image = MAIN_CARD }) => `${head({ title, description, path, image })}
<body>
${nav(path)}
<main id="main">
${body}
</main>
${foot}
</body>
</html>
`;

// ---------- fragments shared by the main pages ----------
const trackRow = t => `<li class="track">
<span class="n">${t.n}</span>
<div><h3>${esc(t.title)}</h3>
<p class="meta">${t.len} · first released ${fmtDate(t.first)}${t.single ? ' as a single' : ''}</p>
${t.note ? `<p>${esc(t.note)} ${cite(t.src)}</p>` : ''}
${t.video ? `<p class="links"><a href="${t.video.url}">${t.video.kind}</a> (${fmtDate(t.video.date)})${t.video2 ? ` · <a href="${t.video2.url}">${t.video2.kind}</a> (${fmtDate(t.video2.date)})` : ''}</p>` : ''}
</div>
</li>`;
const listenBtns = (links) => links.map(l => `<a class="btn" href="${l.url}">${esc(l.name)}</a>`).join('\n');
const gigRow = g => `<li><time datetime="${g.date}">${fmtDate(g.date)}</time> <b>${esc(g.place)}</b>, ${esc(g.venue)}${g.time ? `, ${esc(g.time)}` : ''}${g.kind !== 'concert' ? ` <span class="kind">${g.kind}</span>` : ''}${g.note ? ` <span class="gnote">${esc(g.note)}</span>` : ''} ${cite(g.src)}</li>`;
const ptQuote = q => `<figure class="pt"><blockquote lang="pt-PT">${esc(q.pt)}</blockquote><figcaption><span class="en">${esc(q.en)}</span> (our translation) ${cite(q.src || 'epopeia')}</figcaption></figure>`;

// ---------- pages ----------
const homeDesc = 'Marc Noah lives in the Algarve and writes the songs he sings. His first album, Giant Little Victories (2024), its eight songs, where he plays and how to listen and book him.';
out('index.html', renderDesign('coast', { home: true, nav, foot, image: MAIN_CARD, description: homeDesc }));

out('songs/index.html', page({ path: '/songs/', title: 'The songs of Marc Noah', description: 'The eight songs of Giant Little Victories, his first album (2024), with the singles, the EP Green Sofa Session and the official videos, all written by Marc Noah.', body: `
<h1>The songs</h1>
<p class="lead">Marc Noah is a <i lang="pt">cantautor</i>: he writes the songs he sings. These are his. ${cite(['epopeia', 'dinis'])}</p>
<section class="album">
<p class="kind">${ALBUM.kind} · ${ALBUM.released} · ${ALBUM.label}</p>
<h2>${ALBUM.title}</h2>
<p>${esc(ALBUM.note)} ${cite(ALBUM.src)}</p>
${ptQuote(QUOTES[0])}
<p class="actions">${listenBtns(ALBUM.listen)}</p>
<ol class="tracks">
${TRACKS.map(trackRow).join('\n')}
</ol>
${cite(TRACKS_SRC)}
</section>
<h2>Before the album</h2>
<ul class="cards">
${OTHER_RELEASES.map(r => `<li class="card"><p class="kind">${r.kind}</p><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>${r.url ? `<p><a href="${r.url}">Listen on Apple Music</a></p>` : ''}${cite(r.src)}</li>`).join('\n')}
</ul>
<h2>Roadtrip, in his words</h2>
${ptQuote(QUOTES[1])}
<p class="note">No lyrics, audio or cover art is copied here. The links go to his official pages on Spotify, Apple Music and YouTube.</p>
` }));

out('algarve/index.html', page({ path: '/algarve/', title: 'Marc Noah in the Algarve', description: 'Where Marc Noah lives and plays: a drawn map of the Algarve, from Sagres to Pechão, with every town named in his label’s list and the press.', body: `
<h1>The Algarve</h1>
<p class="lead">Marc lives on the Algarve coast, in Quarteira, and most of his concerts are in the towns around it. ${cite(['brief', 'dinis', 'epopeia'])}</p>
${algarveMap()}
<h2>Places</h2>
<ul class="cards">
${PLACES.map(p => `<li class="card${p.home ? ' home' : ''}" id="${p.id}"><p class="kind">${p.home ? 'Home' : 'Played'}</p><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p>${cite(p.src)}</li>`).join('\n')}
</ul>
<h2>Beyond the Algarve</h2>
<ul class="cards">
${BEYOND.map(p => `<li class="card"><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p>${cite(p.src)}</li>`).join('\n')}
</ul>
<p class="note">Quarteira comes from his own site as read for the factory brief; this session could not reach marcnoah.pt to read it again. See <a href="/sources/">sources</a>.</p>
` }));

const years = [...new Set(GIGS.map(g => g.date.slice(0, 4)))];
out('live/index.html', page({ path: '/live/', title: 'Marc Noah live', description: `Every dated appearance of Marc Noah in his label’s list and the Algarve press: ${GIGS.filter(g => g.kind === 'concert').length} concerts from 2023 to 2026, in the Algarve, the Azores and across Portugal.`, body: `
<h1>Live</h1>
<p class="lead">${GIGS.filter(g => g.kind === 'concert').length} concerts from March 2023 to October 2026, most of them in the Algarve, as listed by his label and the press. ${cite(['epopeia'])}</p>
<h2>Coming up</h2>
<p class="note">No future dates are listed by his label as of ${F.READ}. Check <a href="https://www.epopeia.eu/artistas/marc-noah">his artist page</a> and his own channels.</p>
<h2>How he plays</h2>
<ul class="cards">
${FORMATS.map(f => `<li class="card"><h3>${f.name}</h3><p>${f.mins} minutes · ${f.on} · ${f.people}</p></li>`).join('\n')}
</ul>
${cite(FORMATS_SRC)}
${years.map(y => `<h2>${y}</h2>\n<ul class="gigs">\n${GIGS.filter(g => g.date.startsWith(y)).map(gigRow).join('\n')}\n</ul>`).join('\n')}
<p class="note">${esc(GIGS_NOTE)} ${cite(GIGS_NOTE_SRC)}</p>
` }));

out('about/index.html', page({ path: '/about/', title: 'About Marc Noah', description: 'Marc Noah, Portuguese-Australian singer and composer living in the Algarve: his story as his label tells it, in Portuguese with a translation.', body: `
<h1>About Marc</h1>
<p class="lead">${esc(PERSON.oneLine)} ${cite(['epopeia', 'dinis'])}</p>
${STORY.map(s => `<h2>${esc(s.head)}</h2><p>${esc(s.text)} ${cite(s.src)}</p>`).join('\n')}
<h2>His story, as his label tells it</h2>
<p>From his artist page at Epopeia Records, in Portuguese as published, with our translation under each paragraph.</p>
${BIO_PT.map(b => `<figure class="pt"><blockquote lang="pt-PT">${esc(b.pt)}</blockquote><figcaption class="en">${esc(b.en)}</figcaption></figure>`).join('\n')}
<p class="muted">${esc(BIO_NOTE)} ${cite('epopeia')}</p>
<h2>In his own words</h2>
${QUOTES.map(q => `<h3>On ${esc(q.about)}</h3>${ptQuote(q)}`).join('\n')}
<h2>His sound and his voice</h2>
<p>His label puts it as a gentle mix of pop, indie and rock. The Algarve press writes of an intimate sound and a husky voice (<i lang="pt">voz rouca</i>) that has become one of his marks. ${cite(['epopeia', 'avoz'])}</p>
<h2 id="photos">Photos and videos</h2>
<p>More is coming. Photos will be added when Marc supplies them or confirms which may be used. His official videos are listed on <a href="/songs/">the songs page</a>.</p>
` }));

out('listen/index.html', page({ path: '/listen/', title: 'Listen to Marc Noah, and book him', description: 'Where to listen to Marc Noah (Spotify, Apple Music, YouTube) and how to book him for a concert or festival.', body: `
<h1>Listen and book</h1>
<h2>Listen</h2>
<ul class="cards">
${LISTEN.map(l => `<li class="card"><h3><a href="${l.url}">${esc(l.name)}</a></h3>${cite(l.src)}</li>`).join('\n')}
</ul>
<h2>Start with the album</h2>
<p class="actions">${listenBtns(ALBUM.listen)}</p>
<h2 id="book">Book Marc</h2>
<p>${esc(BOOKING.text)} ${cite(BOOKING.src)}</p>
<p class="actions"><a class="btn" href="${BOOKING.url}">His artist page at Epopeia Records</a> <a class="btn alt" href="https://www.marcnoah.pt/">marcnoah.pt</a></p>
<ul class="cards">
${FORMATS.map(f => `<li class="card"><h3>${f.name}</h3><p>${f.mins} minutes · ${f.on} · ${f.people}</p></li>`).join('\n')}
</ul>
${cite(FORMATS_SRC)}
<p class="note">No email or phone number is copied here: this site gives contact details only as his own site publishes them.</p>
` }));

out('sources/index.html', page({ path: '/sources/', title: 'Sources for the Marc Noah site', description: 'Every public source behind the Marc Noah site, with the date each was read, and what could not be read.', body: `
<h1>Sources</h1>
<p class="lead">Every fact on this site comes from one of these, each read on the date shown.</p>
<ul class="cards">
${Object.entries(SOURCES).map(([id, s]) => `<li class="card" id="${id}"><h3><a href="${s.url}">${esc(s.title)}</a></h3><p class="meta">Read ${esc(s.read)}</p></li>`).join('\n')}
</ul>
<h2>Not read</h2>
<ul>
<li><a href="https://www.marcnoah.pt/sobre">marcnoah.pt/sobre</a>, his own site: this session could not reach it on ${F.READ}. Quarteira, and the words <i lang="pt">luso-australiano</i> and <i lang="pt">cantautor</i>, are as the factory brief read it; the last two also appear on his label page.</li>
<li><a href="https://regiao-sul.pt/cultura-e-eventos/marc-noah-e-recante-atuam-no-sons-no-castelo-em-loule/778016">Região Sul, Sons no Castelo</a>: blocked by the publisher’s bot protection. Linked, not used.</li>
<li>Instagram and Facebook: linked, not read.</li>
</ul>
<h2>Where sources differ</h2>
<p>Postal do Algarve (28 June 2024) says he had recently released his debut album; his label’s agenda and Apple Music date the release to November 2024. This site uses November 2024.</p>
<h2>What we need from Marc</h2>
<ul>${NEEDS.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
` }));

// ---------- Use with AI ----------
const visitorMd = `# Instructions for an agent acting for a listener, venue, festival or journalist

You are helping someone learn about Marc Noah, a singer-songwriter who lives in the Algarve, or book him.

- Read only. Do not submit forms, send messages or contact anyone; draft text for the person to send.
- Answer only from ${SITE}/index.md, the pages of ${SITE} and the sources they link. Give the source for each fact.
- Anything marked "to be confirmed" is not yet a fact: say so.
- Do not guess dates, fees, contact details, co-writers or song details.
- For booking, point to his artist page at Epopeia Records (${BOOKING.url}) or his own site (https://www.marcnoah.pt/). Do not copy contact details from elsewhere.
- No future dates are listed as of ${F.READ}.
`;
const marcMd = `# Instructions for an agent acting for Marc Noah

You are one of Marc's own agents and he wants to change his site.

- Compare ${SITE}/index.md with what Marc tells you and with his own pages (marcnoah.pt, his label page, his channels). List what is missing, out of date or wrong, with links.
- Start with the questions in ${SITE}/agents/questions.md.
- Draft changes as text. Marc approves every change about him; Dinis Cruz passes them to the site's agent (site@AgentiCCells.marc-noah).
- Do not publish, post or send anything yourself.
`;
const editorMd = `# Instructions for an agent editing this site

You are editing the Marc Noah site in AgentiCCells/AgentiCCells__Site__Marc-Noah (branch dev; a push to dev deploys).

- Follow CLAUDE.md in the repository. Only Dinis Cruz instructs the team; Marc approves every change about him.
- The facts live in data/facts.mjs; every page, the five designs, index.md and llms.txt are generated from it by scripts/generate.mjs. Change the facts there, never in a generated page.
- Invent nothing: no songs, dates, awards, quotes, streams or numbers. Every fact names a source id and the date it was read; Portuguese is quoted as published, with a translation.
- No files, fonts, scripts or trackers from other hosts. No images, audio or lyrics copied from other sites until Marc or Dinis confirms they may be used; typography, CSS and inline SVG only.
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
<p><a href="/agents/visitor.md">visitor.md</a></p>
<pre>${esc(visitorMd)}</pre>
<h2>For Marc</h2>
<p><a href="/agents/marc.md">marc.md</a> and <a href="/agents/questions.md">questions.md</a></p>
<pre>${esc(marcMd)}</pre>
<h2>For an editor of this site</h2>
<p><a href="/agents/editor.md">editor.md</a></p>
<pre>${esc(editorMd)}</pre>
<h2>What we need from Marc</h2>
<ul>${NEEDS.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
` }));

// ---------- designs ----------
for (const d of DESIGNS) out(`d/${d.id}/index.html`, renderDesign(d.id, { image: card(d.id), description: `${d.name}: ${d.idea} The same facts about Marc Noah, singer-songwriter in the Algarve.` }));
out('designs.json', JSON.stringify({ about: 'The same facts about Marc Noah, laid out five ways. The master copy is /index.md.', designs: DESIGNS.map(d => ({ id: d.id, name: d.name, idea: d.idea, url: `${SITE}/d/${d.id}/`, default: !!d.default, share_card: card(d.id) })) }, null, 2) + '\n');
out('d/index.html', page({ path: '/d/', title: 'Marc Noah, in five designs', description: `The same facts about Marc Noah laid out five ways: ${DESIGNS.map(d => d.name).join(', ')}.`, body: `
<h1>Choose a design</h1>
<p class="lead">The same facts, the same sources and the same drawn map, laid out five ways. Pick the one that suits him; the facts never change between them. The master copy is <a href="/index.md">index.md</a>.</p>
<ul class="designs">
${DESIGNS.map(d => `<li><a href="/d/${d.id}/"><span class="swatch sw-${d.id}" aria-hidden="true"></span><b>${esc(d.name)}</b>${d.default ? ' <span class="kind">the home page</span>' : ''}<span>${esc(d.idea)}</span></a></li>`).join('\n')}
</ul>
<p class="muted">As data: <a href="/designs.json">designs.json</a>. Each design has its own link preview card.</p>
` }));

// ---------- index.md, llms.txt, facts.json ----------
const md = `# Marc Noah

${PERSON.tagline}. ${PERSON.oneLine}

Every fact below names its public source; each was read on ${F.READ}. Marc approves every change about him. Version __VERSION__.

## His story

${STORY.map(s => `### ${s.head}\n\n${s.text} ${citeMd(s.src)}`).join('\n\n')}

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

${BOOKING.text} ${citeMd(BOOKING.src)}

## Designs

The home page in five designs with the same facts: ${DESIGNS.map(d => `[${d.name}](${SITE}/d/${d.id}/) (${d.idea})`).join('; ')}.

## Sources

${Object.values(SOURCES).map(s => `- [${s.title}](${s.url}), read ${s.read}`).join('\n')}

Not read: marcnoah.pt (could not be reached from this session on ${F.READ}); Região Sul (blocked); Instagram and Facebook (linked only).

## What we need from Marc

${NEEDS.map(n => `- ${n}`).join('\n')}

---

Made with the AgentiCCells site factory; a first version, materials to follow. Text CC BY 4.0.
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
- The home page in five designs with the same facts (picker: [/d/](${SITE}/d/), list: [designs.json](${SITE}/designs.json)): ${DESIGNS.map(d => `[${d.name}](${SITE}/d/${d.id}/)`).join(', ')}.
- [Songs](${SITE}/songs/), [The Algarve](${SITE}/algarve/), [Live](${SITE}/live/), [About](${SITE}/about/), [Listen and book](${SITE}/listen/), [Sources](${SITE}/sources/), [Use with AI](${SITE}/agents/).
- [Version](${SITE}/version.json).

## His sources

${Object.values(SOURCES).map(s => `- [${s.title}](${s.url}), read ${s.read}`).join('\n')}

## The source of the site

- Repository: https://github.com/AgentiCCells/AgentiCCells__Site__Marc-Noah (branch dev; a push to dev deploys).
- Made by AgentiCCells (site@AgentiCCells.marc-noah) for Dinis Cruz and Marc Noah.
- Licences: code Apache-2.0, text and drawings CC BY 4.0.
`);

out('facts.json', JSON.stringify({ person: PERSON, story: STORY, album: ALBUM, tracks: TRACKS, other_releases: OTHER_RELEASES, places: PLACES, beyond: BEYOND, gigs: GIGS, formats: FORMATS, listen: LISTEN, booking: BOOKING, sources: SOURCES, needs: NEEDS }, null, 2) + '\n');
out('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#11607a"/><circle cx="32" cy="26" r="12" fill="#f3b45d"/><path d="M0 44c10-6 22-6 32 0s22 6 32 0v20H0z" fill="#cfe6ee"/></svg>\n');
console.log('generated src/');
