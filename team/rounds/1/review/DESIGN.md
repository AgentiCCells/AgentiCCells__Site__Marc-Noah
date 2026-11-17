# Round 1: review of the design proposal

By reviewer@AgentiCCells.marc-noah, 17 November 2026. Reviewed: `team/rounds/1/design/PROPOSAL.md` (commit 59a07ef), the mock-ups `home.html` and `songs.html` and their eight JPEGs, against `data/facts.mjs`, `data/sources.md`, the critic's notes, `team/WORKFLOW.md`, `CLAUDE.md` and my role and policy.

**Sources opened for this review (2026-11-17):** the Epopeia artist page, Epopeia Jornal 28 February 2025 (Roadtrip), 1 April 2025 (March top) and 2 May 2025 (April top), all HTTP 200 and read in full; YouTube oEmbed for the six video links in `TRACKS`. marcnoah.pt/sobre could not be reached (the proxy could not connect to the host), as for the factory.

**Measured on the mock-ups (Playwright, 2026-11-17):** no horizontal scroll at 390 or 1366 px on either page; menu one row of five at both widths, each link 44 px tall; citation markers 14 to 24 px wide and 4 to 7 px tall; source-list links 17 px tall per line.

## Verdicts

| # | Change | Verdict |
|---|---|---|
| 1 | Home hero: Roadtrip to play | Pass with changes |
| 2 | Close map with the Roadtrip places | Pass with changes |
| 3 | The composer, in his own words | Pass with changes |
| 4 | Songs as tappable rows on home | Pass with changes |
| 5 | Numbered source markers, one list per page | Pass with changes |
| 6 | Header and footer about him | Pass with changes |
| 7 | /songs/ with Roadtrip featured | Pass with changes |
| 8 | /live/ for programmers, cleaner list | Pass with changes (no mock-up; checked at build) |

Nothing is rejected. No change copies a photo, audio or lyrics, embeds a player, publishes an email address, or names anyone beyond Marc Noah, Dinis Cruz, the label, venues and events as the sources name them. No em dash in the proposal or the mock-ups. Contrast passes for every text pair in the mock-ups (table under change 5), with one exception noted there.

## Facts checked against the sources

| Claim in the mock-ups | Source says | Finding |
|---|---|---|
| Roadtrip "filmed ... Sydney, Salir, Quarteira, Faro and Olhão" | epo-roadtrip: "gravado em diversas localizações que têm vindo a marcar o seu caminho tais como Sydney, Salir, Quarteira, Faro, Olhão…" | **Says more than the source.** "tais como ... …" means "such as": the list is not complete. Write "among them" (change 1, 2, 7). |
| "Filmed where his path runs" | "places that have marked his path" | Paraphrase drifts; use the facts' wording, "places that marked his path". |
| "The most played song in his label's catalogue in March 2025" | epo-top-mar: "foi a música mais ouvida do catálogo Epopeia durante o mês de Março" (article dated 1 April 2025) | Holds. |
| No More Dreaming, most played, April 2025 | epo-top-apr: "foi o tema mais ouvido durante o passado mês" in the label's Monthly on Top, 2 May 2025 | Holds. |
| His Roadtrip words, and "which he calls a turning point" | epo-roadtrip: "nas palavras do seu autor, um ponto de viragem", then his quote | Holds; Portuguese in `QUOTES[1].pt` matches the source; translation is ours and says so. |
| Album quote, first sentence | Epopeia artist page, first person, matches `QUOTES[0].pt` | Holds. |
| *cantautor*; songs from real episodes of a darker period | Artist page: "O cantautor luso-australiano ...", "as suas músicas têm origem em episódios da vida real de um período mais sombrio" | Holds. |
| "Epopeia Records, a label from Faro" | The artist page footer lists two addresses, Faro and Vila Ruiva | **Says more than the source.** Write "a label with an office in Faro" (writer to change `STORY[2]` too). |
| "Roadtrip ... is the one song for which the facts hold a direct official link" (proposal, change 1 rationale) | `TRACKS` 1 to 6 all carry `video.url`; oEmbed shows all six on the marcnoahVEVO channel | **Wrong.** Six of eight songs have a video link; only Slowtalk and No More Dreaming have none. Roadtrip is still the right choice (his words, the Algarve places, the March top), but the rationale must be corrected in the record. The Roadtrip video's `kind` is "Video", so the page must not call it "official". |
| "27 concerts since March 2023, most of them in the Algarve" (home, On stage) | Our count of `GIGS` with `kind: 'concert'` (27; first 2023-03-25, last 2026-10-10), drawn from epopeia, postal, maisalgarve and others | **A derived number cited to one source.** Generate it from `GIGS` and label it as our count of the dates his label and the Algarve press list. Algarve count is 16 or 17 of 27: "Santa Bárbara" (Beach Club Surf & Snack, 26 October 2024) sits in the Azores run of 23 to 25 October and may be Ribeira Grande, not the Algarve; writer to check. "Most" holds either way. |
| "Quarteira, home", the kicker "Quarteira, Algarve", footer "Lives in Quarteira" | Only `brief` (marcnoah.pt/sobre as read by the factory, not re-read); still unreachable today | Allowed, as the live site already states it, but the proposal makes it the most prominent fact on the page. Every Quarteira claim carries marker for `brief`; see "for the conductor". |
| "Sons no Castelo, Castelo de Loulé" | `GIGS`: "Sons no Castelo, Alcaidaria do Castelo de Loulé" | Use the venue as the facts hold it. |

## Per-change notes and conditions for the developer

### 1. Home hero: pass with changes

Fits the story (Algarve, composer, his songs) and puts a song to play in the first screen at 390 px (checked on `home-390-first-screen.jpg`: kicker, name, sentence, "Roadtrip" and the Watch button all visible above 844 px).

Conditions:
1. Roadtrip line reads: "From his first album. Filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão. The most played song in his label's catalogue in March 2025." with markers for epo-roadtrip and epo-top-mar.
2. The kicker "Quarteira, Algarve" carries the `brief` marker, or the kicker says "Algarve" only and Quarteira stays in the lead and map, which carry it.
3. Button text stays "Watch Roadtrip on YouTube"; no "official" on the page for this video. Button 48 px tall, href `TRACKS[5].video.url`, generated from the facts, not typed.
4. No embedded player; links only (NEEDS still open on embeds).
5. The designer corrects the change 1 rationale in `PROPOSAL.md` (designer's scope, not the developer's).
6. `/d/coast/` is rendered by the same `coast()`: it must keep its design switcher, `dfoot('coast')` and the "four other designs" line.

### 2. Close map: pass with changes

Good: title and description present, Quarteira largest and alone in sea-blue, labels at 21 viewBox units render about 17.5 px at 390 px.

Conditions:
1. Caption and `<desc>` say the list is partial and the order is ours: "Home in Quarteira. The dashed line joins four Algarve places named for the Roadtrip video; the label does not give the order, and this line is ours." Same on /songs/. A line without that caption reads as the route of the video, which no source states.
2. "a sketch, not to scale" (16 units, about 13 px at 390) and "Atlantic Ocean" (19 units, about 16 px) render at 16 px or more at 390 px, or the scale note moves into the caption text.
3. The "Faro" label sits across the coastline; place it wholly on land or wholly on sea (contrast holds on both fills, 12.4:1 and 12.2:1, but it should read cleanly).
4. Caption markers on every page that shows the map (the /songs/ caption has none): `brief`, epo-roadtrip.
5. The SVG `id`s for `title` and `desc` are unique per page if a page ever shows two maps.
6. The full map keeps rendering unchanged in Azulejo, Tour Poster, Songbook and Cassette; `algarveMap()` callers untouched. "Loulé, the town he has played most" is our count (5 concerts in `GIGS`); it may stay in `desc` as it is already in `PLACES.loule.text` with sources.
7. The map keeps its own light fills in dark mode (fine as drawn); the border uses `--line`.

### 3. The composer, in his own words: pass with changes

Conditions:
1. Move `<h2>` out of the `<figure>`: heading, then the figure (blockquote, Portuguese line, caption).
2. The English pull quote is the first sentence of `QUOTES[0].en`; the album title may lose its quotation marks only if set in italics; nothing else changes. Portuguese line keeps `lang="pt-PT"` and is the matching start of `QUOTES[0].pt`; caption keeps "(our translation)".
3. The label line keeps *cantautor* with `lang="pt"` and its epopeia marker. No songwriting credit per track.
4. Full quote, both languages, on /about/ with `lang="pt-PT"` on the Portuguese.

### 4. Songs as rows: pass with changes

Conditions:
1. Rows, Watch links (`aria-label="Watch <title> on YouTube"`, visible text "Watch" inside the name) and lengths generated from `TRACKS`; Lie to Me uses `video`, not `video2`.
2. Album line: "His first album, eight songs, November 2024, on Epopeia Records, a label with an office in Faro." (see the facts table).
3. Rows at least 56 px, Watch links at least 44 x 44 px at 390 px (as mocked).
4. Each tag ("single, February 2023", "most played ... March 2025", "... April 2025") keeps its own marker.

### 5. Source markers: pass with changes

The direction is right, but the markers as mocked are not usable on a phone: 14 to 24 px wide and 4 to 7 px tall (`.fn` has `line-height:0` and the link only `0.2em` padding), so a finger cannot hit "4" without hitting "5".

Conditions:
1. Each marker's hit area is at least 24 x 24 px (WCAG 2.2 target size, minimum), with no overlap between neighbouring markers; achieve it with padding and negative margin or a pseudo-element so line spacing does not jump. Where a fact has three markers, keep a visible gap between them. (The site's 44 px rule cannot be met inline without breaking the text; see "for the conductor".)
2. Accessible name per marker as mocked, "Source 4: Epopeia Jornal, 28 Feb 2025", generated from `SOURCES`, with the visible number in the name.
3. Each source-list link is at least 44 px tall (now 17 px per line): give each `li a` `display:inline-block; min-height:44px` or padding.
4. Read date once per page, plus each exception written plainly: "His own site, marcnoah.pt/sobre: read for the factory brief on 17 November 2026, not re-read." No nested brackets as in the mock.
5. `/sources/` keeps every source with its own read date; `index.md` and `llms.txt` keep source ids and dates, so every fact keeps a reachable source and read date, including on the four designs that may keep `cite()` this round.
6. Focus visible: a `:focus-visible` outline (3 px, offset 2 px, in `--ink` or `--sea`) on markers, buttons and links; do not rely on the background change alone, and never `outline:none`.
7. `node scripts/validate.mjs` prints OK.

Contrast, computed for the mock-up colours (WCAG relative luminance):

| Pair | Ratio |
|---|---|
| ink #1f2328 on sand #f7efe2 / paper #fffaf2 | 13.84 / 15.20 |
| muted #5a5650 on sand / paper (markers, tags, footer line) | 6.39 / 7.01 |
| sea #11607a on sand / paper (links, kicker) | 6.18 / 6.79 |
| white on sea (primary button) | 7.05 |
| rust #a8541a on sand / paper (track numbers, /songs/ kicker) | 4.66 / 5.12 |
| map: ink on land #efe3cc / on sea #cfe6ee | 12.43 / 12.19 |
| map: sea on sea fill ("Quarteira, home", "Atlantic Ocean") | 5.44 |
| map: grey #5d5a55 on land (scale note) | 5.40 |
| dark: ink #ece6dc / muted #b3ada4 / sea #7cc8de / rust #f0a56b on #14181b | 14.38 / 8.02 / 9.50 / 8.76 |
| dark: muted / sea on paper #1d2327 | 7.13 / 8.45 |
| dark: button text #0e1416 on #7cc8de | 9.89 |
| **dark via `[data-theme="dark"]`: white on #7cc8de** | **1.88, fails** |

The dark button override sits only inside the `prefers-color-scheme` query. If the build keeps a `[data-theme="dark"]` rule, it must carry the same `.btn` text override. Rust on sand at 4.66 passes with little room: do not lighten it.

### 6. Header and footer: pass with changes

Conditions:
1. **Fix "TheAlgarve" at 1366 px.** Cause: the nav `a` is `display:flex`, so `<span class="lg">The </span>` becomes a flex item and its trailing space is dropped. Use complete alternative labels, `<span class="lg">The Algarve</span><span class="sm">Algarve</span>`, and the same for "Listen and book" / "Book". The mock splits the word ("Listen and b" + "ook"); Playwright reads the link text as "B ook" at 390 px, which a screen reader may speak in two parts. Each label must be whole words in one text node.
2. At 390 px: one row of five links, each at least 44 px tall, no horizontal scroll (as measured on the mock).
3. Footer first line "Marc Noah"; booking as a link to his Epopeia artist page only, no email address copied; "His own site" links marcnoah.pt.
4. The quiet line links (sources, five designs, use with AI, /agents/, /llms.txt) each at least 44 px tall; the version number comes from the build, not typed.
5. `/d/`, `/agents/`, `/llms.txt`, `/sources/` and the new `/behind-the-scenes/` are each linked from the footer on every main page.

### 7. /songs/: pass with changes

The Watch button falls at about 1,100 px at 390 px, inside the first two screens, as the acceptance asks.

Conditions:
1. Roadtrip text: "His label says the video was filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão." Keep "In March 2025 it was the most played song in the label's catalogue." with markers.
2. The map caption carries markers and the "order is ours" wording from change 2.
3. Heading "He writes the songs he sings" is backed in the lead by markers for epopeia (*cantautor*) and dinis, as mocked; no per-track credit; "Who wrote what, track by track, waits for Marc's word" stays.
4. Video types in the tags come from `TRACKS[].video.kind` ("Video" for Roadtrip and Towers and Bridges, not "official").
5. Track numbers in rust keep at least 4.5:1.

### 8. /live/: pass with changes

No mock-up of /live/; the home "On stage" and "Book him" blocks stand in for it. I check /live/ at 390 px in `LIVE.md`.

Conditions:
1. The concert count is generated from `GIGS` (`kind: 'concert'`) and worded as our count with markers for every source used, for example "27 concerts listed by his label and the Algarve press since March 2023 (our count)". No hand-typed number.
2. Rows where `venue === place` read "venue not named by his label"; the jury seat, two radio slots, video premiere and album release go under "Other appearances".
3. Formats chips from `FORMATS` (with musicians and crew for the band); five stages, each with its marker, venue as the facts hold it ("Sons no Castelo, Alcaidaria do Castelo de Loulé").
4. Booking button to `BOOKING.url`, in the first screen of /live/ at 390 px, at least 44 px.

## /behind-the-scenes/: acceptance criteria

Dinis's request (2026-11-17, about 22:05 UTC, recorded in `team/WORKFLOW.md`) is not in the proposal. The build must meet these before release:

1. **Generated, not hand-written.** `scripts/behind.mjs` builds the section at build time from `git log`, `team/WORKFLOW.md`, `team/*/ROLE.md`, `team/*/POLICY.md`, `team/scopes.json` and `team/rounds/`. A rebuild after a new commit changes the page with no hand edit. CI already checks out full history (`fetch-depth: 0` in `pages.yml`); keep it.
2. **Commit timeline.** One row per commit: date, the `Agent:` trailer as written, the subject line, and a link to the commit. If the repository is not public, show the short hash without a link rather than a link that fails. A commit without an `Agent:` trailer shows "no Agent trailer", not a guessed role. Newest first, grouped by round where the subject names one.
3. **Truthful, no invented numbers.** Every count on the page (commits, rounds, roles, checks) is computed at build time from the same files; no "about", no estimates, no time or cost figures unless a file records them with a source. Policies show their real status: "proposal, binds from 17 November 2026, approved only when Dinis says so", and their phase "observe". The open gaps G1 to G3 are stated, not hidden. Nothing claims a check blocks what it only observes.
4. **Team and policies in plain words.** One short paragraph per role from its `ROLE.md` (objective, what it may change, when it stops), with a link to the full `ROLE.md` and `POLICY.md`. Plain British English, no em dash, no hype words; the wording check passes on the generated HTML.
5. **Flow diagram.** Inline SVG (no image file, no external script) of the eight steps in `team/WORKFLOW.md`, with `role="img"`, a `<title>` and a `<desc>`, and the same steps as an ordered list in the HTML next to it, so the text alternative is full, not a summary. Text in the SVG at least 16 px at 390 px, contrast at least 4.5:1 in light and dark; at 390 px the diagram stacks vertically or scales without horizontal scroll and without text below 16 px.
6. **Round reports as pages.** One page per `team/rounds/N.md`, with its before and after screenshots from `team/rounds/img/`, each with alt text saying which page and width it shows. Screenshots are of our own site only. Images sized for the page (width and height attributes, lazy loading); the whole section adds no file over 300 KB.
7. **How this was made.** A short note linking https://agenticcells.ai and https://hub.agenticcells.site, saying the site is written by agents from one facts file and checked by gates, and that Marc approves every change about him through Dinis.
8. **Names and secrets.** Only Marc Noah, Dinis Cruz and agent identities appear; commit messages and round files are shown as written, so the leak scan and the name check run on the generated pages; a commit message that would put a secret or a third person's name on the page fails the build rather than being edited by hand.
9. **Layout and access.** At 390 and 1366 px: no horizontal scroll (long hashes and trailers wrap), links at least 44 px tall, headings in order (one `h1`, then `h2` per part), focus visible. Linked from the footer of every main page and from `/agents/`; listed in `llms.txt`.
10. **Keeps the rest working.** The five designs under `/d/` and every existing page still build; `node scripts/validate.mjs` prints OK; `role-scope.mjs` passes (the developer writes only `scripts/behind.mjs` and `src/`).

## For the conductor (Dinis or Marc to decide)

1. **Quarteira.** The proposal makes Quarteira the first fact on the page (kicker, map, footer), resting on a reading of marcnoah.pt/sobre that no session has repeated; I could not reach the site either. Ask Marc to confirm (already in `NEEDS`), or decide that the kicker says "Algarve" until he does.
2. **Inline citation markers and the 44 px rule.** Markers inside a sentence cannot reach 44 px without breaking the text. I ask for 24 x 24 px (WCAG 2.2 minimum) inline, with 44 px for every other link. Dinis to accept or overrule.
3. **Per-song credits.** The Roadtrip article calls him the song's author ("nas palavras do seu autor"), a source for Roadtrip only. Credits for the rest still wait for Marc.
4. **Commit links on /behind-the-scenes/.** Link each commit to GitHub only if the repository is public; Dinis to say whether it is, or should be.
5. **A Portuguese version** (critic note 9): still open with Dinis.
6. **Writer tasks** arising from this review: "a label with an office in Faro" in `STORY[2]`; where the Santa Bárbara concert of 26 October 2024 was.
