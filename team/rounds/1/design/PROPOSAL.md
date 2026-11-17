# Round 1: design proposal

By designer@AgentiCCells.marc-noah, 17 November 2026. **Status: proposal**, for the reviewer and the critic, then the developer once passed. Marc approves every change about him, through Dinis.

Read for this proposal: `team/rounds/1.md`, `team/rounds/1/critic/NOTES.md`, `data/facts.mjs`, `data/sources.md`, `scripts/generate.mjs`, `scripts/designs.mjs`, `scripts/lib.mjs`, `src/style.css`, the r1-before screenshots, and the model sites yiheng-wang.agenticcells.site and gabriel-dacruz.agenticcells.site (read 2026-11-17, as material).

## The idea in one line

On a phone, the first screen says who he is in one plain sentence, hands you one of his songs to play, and shows the stretch of coast he lives on and filmed that song in. Everything else (his own words, the eight songs, the stages, booking) follows in that order, and the sources sit in small numbered markers with one list at the foot of the page.

## Mock-ups

All in `team/rounds/1/design/mockups/`, built only from `data/facts.mjs`, our own CSS and inline SVG, no files from other hosts. Links inside the site are `#` placeholders; links out are the real ones from the facts. Each page carries a strip saying it is a mock-up.

| File | What it shows |
|---|---|
| `home.html` | The proposed home (changes 1 to 6) |
| `home-390.jpg`, `home-1366.jpg` | Full page at 390 px and 1366 px |
| `home-390-first-screen.jpg`, `home-1366-first-screen.jpg` | What shows before any scroll (390 x 844, 1366 x 768) |
| `songs.html` | The proposed /songs/ (change 7), with the same header, footer and source list |
| `songs-390.jpg`, `songs-1366.jpg`, `songs-*-first-screen.jpg` | The same at both widths |

Measured on the mock-ups with Playwright (2026-11-17): no horizontal scroll at 390 or 1366 px; every link outside running text at least 44 px high.

## The changes, ranked

### 1. Home, first screen: one song to play, in the hero

- **What changes.** The hero of the Coast design (`coast()` in `scripts/designs.mjs`) becomes: a small kicker "Singer-songwriter · Quarteira, Algarve"; the name; one plain sentence, "He lives on the Algarve coast and writes the songs he sings."; then a featured-song panel: "Start with this song", **Roadtrip**, one line on it (from his first album, filmed in Sydney, Salir, Quarteira, Faro and Olhão, the most played song in his label's catalogue in March 2025), one line of his words on it, and a primary button "Watch Roadtrip on YouTube" (the official video link), with "Album on Spotify" and "Apple Music" as quieter buttons. The old three-claim line and "Book Marc" button leave the hero (booking stays lower on the page and in the menu).
- **Why.** Critic note 1 (nothing to press that plays a song). Roadtrip rather than No More Dreaming because it is the one song for which the facts hold a direct official link (a video), and it carries the Algarve and his own words at once. A button that opens the album on Spotify is not "play a song".
- **Facts.** `PERSON`, `STORY[0]` and `STORY[1]` (sources dinis, brief, epopeia), `TRACKS` n 6 (`video.url`, `note`, src epo-roadtrip, epo-top-mar), `QUOTES[1]` (second sentence, epo-roadtrip), `ALBUM.listen`.
- **Cost.** `scripts/designs.mjs` (`coast()` body and CSS), small. No new facts.
- **Accept when.** At 390 x 844, with the header, the name, the sentence, the word "Roadtrip" and the "Watch Roadtrip on YouTube" button are all visible without scrolling. The button goes to `TRACKS[5].video.url`, is at least 48 px high, and its text contrast is at least 4.5:1. At 1366 x 768 the hero text and the map (change 2) sit side by side above the fold. No embedded player.

### 2. The Algarve, felt: a close map of his coast with the Roadtrip route, as the hero picture

- **What changes.** A new cropped map of the central Algarve (Albufeira side to Olhão), drawn from the same coast points as `algarveMap()`: Quarteira the largest pin, labelled "Quarteira, home", in the sea-blue; Loulé marked; a dashed line joining the Algarve places of the Roadtrip video (Salir, Quarteira, Faro, Olhão). Caption: "Home in Quarteira; the dashed line joins the Algarve places of the Roadtrip video", with a link to /algarve/. It takes the hero's picture slot (beside the text at 1366, under the song panel at 390). The full-coast map moves off the home page to /algarve/, where it already is. The figure is the page's single image slot (`.hero-figure`): when Marc supplies a photo, the photo goes there and the map moves to the band below. No empty "photo coming" box is shown in the meantime.
- **Why.** Critic note 2 (the map is the strongest picture and comes fourth). At 390 px the current full map renders its town names at about 9 px (25 viewBox units at 358/1000 scale); the crop makes them about 17 px (21 units at 358/430) and gives Quarteira the eye first. The route joins "he lives here" to "this is his song".
- **Facts.** `PLACES` quarteira, salir, faro, olhao, loule (sources brief, epopeia, epo-roadtrip); `TRACKS` n 6 `note`.
- **Cost.** `scripts/lib.mjs`: add a `routeMap()` (or a `crop` and `route` option on `algarveMap()`; the existing calls in the other four designs must stay unchanged). `scripts/designs.mjs` to place it.
- **Accept when.** Map labels render at 16 px or larger at 390 px; Quarteira's pin and label are the largest and the only ones in sea-blue; the SVG has a title and a description naming the places; the route links only places whose `PLACES.text` or `TRACKS[5].note` names the Roadtrip video; "a sketch, not to scale" is on the map; the four other designs still render their full map as before.

### 3. The composer, in his own words, instead of the three cards

- **What changes.** The three equal cards leave the home page. In their place, one section "The composer, in his own words": a large pull quote in English, "My first album, Giant Little Victories, is a message of personal overcoming and of celebration.", with the Portuguese opening line under it in smaller italic type and the caption "Marc Noah, on Giant Little Victories (our translation)"; beside it one line from his label: he is a *cantautor*, and his songs come from real episodes in a darker period of his life; then "His story", to /about/. The full 70-word quote, in both languages, lives on /about/ only. /about/ keeps the three story headings (they are the site's spine), so nothing is lost.
- **Why.** Critic notes 3, 8 and 9: the claim now reads in his own first-person voice, not second-hand; the cards stop repeating; the long quote stops filling a phone screen twice.
- **Facts.** `QUOTES[0]` (first sentence only, epopeia), `STORY[1]` (epopeia, dinis), `BIO_PT` for the label line.
- **Cost.** `scripts/designs.mjs` (`coast()`), `scripts/generate.mjs` (the /songs/ page drops `QUOTES[0]`, see change 7). No new facts.
- **Accept when.** The pull quote is the first sentence of `QUOTES[0].en`, unchanged except for the quotation marks around the album title; the Portuguese line is the matching start of `QUOTES[0].pt`; the full quote appears on /about/ and nowhere else among the main pages; no songwriting credit is stated beyond the label's *cantautor* and Dinis's brief; the home no longer contains the `STORY` card text word for word.

### 4. Home: the songs lead the rest of the page, as rows you can tap

- **What changes.** The album section comes straight after the composer section, before the stages. Each of the eight songs is one row, at least 56 px tall: number, title, at most one short tag (for example "single, February 2023" or "most played in his label's catalogue, April 2025") and, where an official video exists, a "Watch" link with a small play mark at the right edge; songs without a video show their length. "First out" dates and video types go to /songs/. Under the list: the three album buttons and one link "All the songs, with the singles and the EP".
- **Why.** Round aim (the songs lead) and critic notes 1 and 5. A booker or listener sees eight songs and seven things to press, not a list of dates.
- **Facts.** `TRACKS` (title, len, single, first, video, note), `ALBUM`, sources apple, youtube, epo-top-mar, epo-top-apr.
- **Cost.** `scripts/designs.mjs` (`coast()` track list and CSS).
- **Accept when.** Eight rows in album order; each Watch link equals that track's `video.url`; each row and each Watch link is at least 44 px tall at 390 px; the two "most played" tags carry their own source markers; the album section appears above "On stage" in the page order.

### 5. Citations step back: numbered markers and one source list per page

- **What changes.** The sentence "Sources: ...; read 2026-11-17." after each item gives way to small grey numbered markers after the fact (as on the gabriel-dacruz site), each a link to its entry in a "Sources" list at the foot of the page, numbered in order of first use. The list states the read date once ("Every source was read on 17 November 2026, except where noted") and names the exception (marcnoah.pt, read by the factory). Each marker has an accessible name, "Source 4: Epopeia Jornal, 28 Feb 2025". The /sources/ page stays as the full register.
- **Why.** Critic note 4 and the round aim (the sourcing stays but steps back).
- **Facts.** `SOURCES`, and the `src` of every fact already in use (no change to the facts).
- **Cost.** `scripts/lib.mjs`: a per-page `citer()` returning `c(...ids)` for markers and `list()` for the source list, alongside the current `cite()`. `scripts/generate.mjs`: `page()` creates a citer per page and appends `list()` before the footer; each page's `cite(...)` calls become `c(...)`. `scripts/designs.mjs`: `renderDesign` passes a citer to each design and `shell()` appends the list, so the five designs keep working. Medium. If the four non-home designs cannot be moved in this round, they may keep `cite()` for one more round; they must still build and validate.
- **Accept when.** On every page that uses markers, each fact that had a source line has a marker; every marker resolves to an entry on the same page whose link is that source's `url`; the read date shows once per page plus the exception; no "Sources: ... read" sentence remains on home, /songs/, /live/ or /about/; markers' text contrast is at least 4.5:1; `node scripts/validate.mjs` prints OK.

### 6. Header and footer about him, not the site

- **What changes.** Main menu: Songs, The Algarve, Live, About, Listen and book (at under 600 px the labels shorten to Songs, Algarve, Live, About, Book so the menu is one row). "Five designs" and "Use with AI" leave the menu. The brand loses its second line (the hero now says it). Footer, first lines: "Marc Noah", "Singer-songwriter. Lives in Quarteira, on the Algarve coast.", his listening and social links, "Book him through Epopeia Records". Then one quiet small line: sources, five designs, use with AI, version, licences, "Marc approves every change about him". The "made with the site factory" and "no photos, audio or lyrics are copied here" notes move into that line or onto /sources/; the boxed note on /songs/ goes.
- **Why.** Critic note 7.
- **Facts.** `PERSON`, `LISTEN`, `BOOKING`, `PLACES` quarteira.
- **Cost.** `scripts/generate.mjs` (`NAV`, `nav`, `foot`), `src/style.css` (menu and footer rules). The /d/ design switcher and `dfoot` are unchanged this round.
- **Accept when.** At 390 px the menu is one row of five links, each at least 44 px tall, no horizontal scroll; "Five designs", "Use with AI" and "factory" do not appear in the header; /d/, /agents/, /llms.txt and /sources/ are each still linked from the footer; the footer's first line is his name.

### 7. /songs/: Roadtrip featured, with its route and his words

- **What changes.** /songs/ opens with "He writes the songs he sings", the album line and the three album buttons; then a featured Roadtrip block: what the label says about where it was filmed, the March 2025 chart line, his full Roadtrip quote (Portuguese and English), the Watch button, and the same route map as change 2, linked to /algarve/. Then the eight songs as rows (length, tags, video type and date in small type, Watch link). The line "Who wrote what, track by track, waits for Marc's word" sits under the list. The album quote (`QUOTES[0]`) moves to /about/. Singles and the EP stay below as now.
- **Why.** Critic note 5 (Roadtrip is the best story on the site and joins the Algarve to the songs) and note 9.
- **Facts.** `TRACKS`, `QUOTES[1]`, `ALBUM`, `OTHER_RELEASES`, `PLACES`, sources epo-roadtrip, epo-top-mar, epo-top-apr, apple, youtube.
- **Cost.** `scripts/generate.mjs` (the songs page), reusing the row and map from changes 2 and 4.
- **Accept when.** Roadtrip is the first song named on /songs/ and its Watch button shows in the first two screens at 390 px; the page carries no songwriting credit for any single track; the route map is the same component as on the home.

### 8. /live/: two minutes for a programmer, and a cleaner list

- **What changes.** /live/ opens with one block: the three formats as compact chips (solo 60 min, duo 70 min, band 75 min with 6 musicians and 4 crew), five stages he has played (Festival Emersivo and Sons no Castelo in Loulé, Festival Muralhas in Faro, Rock na Ribeira in Pechão, the Fortaleza de Sagres opening), and one button straight to his Epopeia artist page. The home's "On stage" and "Book him" sections are the same block in short. In the list, where the source names no venue (venue equal to place, as on 25 July 2025), the row reads "venue not named by his label"; the jury seat, radio slots, video premiere and album release move to a separate short list "Other appearances", so the concert count and the list agree.
- **Why.** Critic notes 6 and 10.
- **Facts.** `FORMATS`, `GIGS` (the five dated entries above, sources epopeia, epo-emersivo, avoz, epo-ribeira, postal), `BOOKING`.
- **Cost.** `scripts/generate.mjs` (live page, `gigRow`), `scripts/designs.mjs` (home section). No change to the facts file.
- **Accept when.** At 390 px the booking button shows in the first screen of /live/; the list headed with the concert count holds only `kind: 'concert'` rows; no row names its town twice; each of the five stages has its marker.

## Not taken this round, and why

- **Each design leading with its own thing** (critic note 8, second half): worth a round of its own; this round the four other designs only need to keep building with changes 2 and 5.
- **A Portuguese version** (critic note 9): a decision for Dinis; noted, not designed.
- **Per-song credits** (critic note 3): open with Marc (`NEEDS`); nothing is designed that implies a credit.

## Open questions this proposal surfaces

- The facts hold no per-song Spotify or Apple Music links, so "play a song" means the YouTube video. If the writer adds the official per-track links (sources spotify, apple), the featured-song panel can offer them too. A writer task, not a design change.
- When Marc's photos arrive, change 2's picture slot takes the first one.
