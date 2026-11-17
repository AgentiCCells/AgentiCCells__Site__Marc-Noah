# Round 1: review of the live site

By reviewer@AgentiCCells.marc-noah, 17 November 2026. Checked: https://marc-noah.agenticcells.site, which served v0.1.14 (commit da41c3f) when I started and v0.1.15 (commit ef2f60a, "Round 2 aim") by the end; `/version.json` read at both times. Neither of those two later commits changes the round 1 pages as built; I checked what was live. Measured with Playwright (Chromium) and curl, at 390 x 844 and 1366 x 768, light and dark.

## Verdict

**Pass with follow-ups.** Every design-review condition for changes 1 to 8 holds on the live site, and the ten /behind-the-scenes/ criteria hold except one already declared by the developer (four "before" screenshots over 300 KB are linked, not shown). Nothing found is untrue, unsourced, unreadable on a phone or against the rules. The follow-ups are small and go to round 2.

## Screenshots (the round's "after" set)

Taken with `node scripts/shots.mjs --max-height=2600 https://marc-noah.agenticcells.site team/rounds/1/review/after / /songs/ /live/ /about/ /behind-the-scenes/`; JPEG quality 70; the top 2,600 px of each page, as every page is taller than that (real heights below). Total 2.2 MB.

| Page | 390 px | 1366 px |
|---|---|---|
| Home | [home-390.jpg](after/home-390.jpg) (of 5,292 px) | [home-1366.jpg](after/home-1366.jpg) (of 3,691 px) |
| /songs/ | [songs-390.jpg](after/songs-390.jpg) (of 4,493 px) | [songs-1366.jpg](after/songs-1366.jpg) (of 3,157 px) |
| /live/ | [live-390.jpg](after/live-390.jpg) (of 5,608 px) | [live-1366.jpg](after/live-1366.jpg) (of 4,021 px) |
| /about/ | [about-390.jpg](after/about-390.jpg) (of 5,557 px) | [about-1366.jpg](after/about-1366.jpg) (of 3,073 px) |
| /behind-the-scenes/ | [behind-the-scenes-390.jpg](after/behind-the-scenes-390.jpg) (of 16,644 px) | [behind-the-scenes-1366.jpg](after/behind-the-scenes-1366.jpg) (of 8,569 px) |

## Measured across the site

Pages checked at both widths: `/`, `/songs/`, `/live/`, `/about/`, `/algarve/`, `/sources/`, `/agents/`, `/behind-the-scenes/`, `/behind-the-scenes/rounds/1/`, `/d/`, `/d/coast/`, `/d/azulejo/`, `/d/poster/`, `/d/songbook/`, `/d/cassette/`. All HTTP 200.

| Check | Result |
|---|---|
| Horizontal overflow at 390 px | 0 px on every page |
| One `h1` per page | Yes, every page |
| Headings in order | Yes, except `/sources/` (h1 then h3; follow-up 3) |
| Menu at 390 px | One row of five (Songs, Algarve, Live, About, Book), each 44 px tall; at 1366 px "The Algarve" and "Listen and book" read as whole words |
| Citation markers | Every marker 24 x 24 px; 42 on home, 27 on /songs/, 63 on /live/, 17 on /about/; every marker's `href` reaches an element on the same page (0 broken); accessible name "Source N: ..." |
| Source-list links | 44 px tall |
| Footer | Every page checked links `/behind-the-scenes/`; footer links all 44 px; version comes from the build (v0.1.15) |
| Focus | `:focus-visible` outline 3 px solid, `--ink` |
| Em dash (U+2014) in page text | None on our pages |
| `lang` | `pt-PT` on the Portuguese quotes, `pt` on single words (*cantautor*) |
| Dark mode button | Text #0e1416 on #7cc8de, 9.89:1, set in both the media query and `[data-theme="dark"]` (the 1.88:1 failure from the design review is gone) |

**Contrast of colours new since the design review.** The live `style.css` adds one token, `--sun:#f3b45d`, which no rule uses, so no text sits on it. The flow diagram uses the page tokens: ink on paper 15.20:1 (light), #ece6dc on #1d2327 12.80:1 (dark). Every other pair is as in the table in `DESIGN.md`, all at least 4.5:1.

## Condition by condition

### 1. Home hero: holds
Roadtrip line as worded, with markers for epo-roadtrip and epo-top-mar; the kicker "Quarteira, Algarve" carries markers 1 and 2 (marcnoah.pt via the brief, Dinis); button "Watch Roadtrip on YouTube", 48 px, ends inside the first screen at 390 px (top at 590 px); no "official"; no player. `/d/coast/` keeps its switcher and design footer.

### 2. Close map: holds
Caption says the list is partial and the line is ours, with "a sketch, not to scale" in the caption and markers 1 and 4; same caption on /songs/. Faro's label sits on land. Labels read at 17 px or more at 390 px. The four other designs keep the full map.

### 3. The composer, in his own words: holds
Heading before the figure; first sentence only, album title in italics; Portuguese line `lang="pt-PT"`; "(our translation)"; *cantautor* with `lang="pt"`. The full quote in both languages is on /about/.

### 4. Songs as rows: holds
Eight rows from the facts, Watch links 44 px with names per song, lengths for Slowtalk and No More Dreaming, album line "a label with an office in Faro", each tag with its own marker.

### 5. Source markers: holds
24 x 24 px targets, no overlap, named, reach the list; list links 44 px; read date once and the marcnoah.pt exception in plain words; focus visible. One inline link in that note, "the sources page", is 17 px tall (follow-up 2).

### 6. Header and footer: holds
"TheAlgarve" is fixed; whole-word labels; footer starts "Marc Noah", booking through his Epopeia page, no email address; the quiet line links are 44 px and include sources, five designs, use with AI, llms.txt, index.md, behind the scenes and source code.

### 7. /songs/: holds
Roadtrip text as worded with markers; the line "His label's article on it calls him the song's author" (marker 5) says no more than the source ("nas palavras do seu autor"); map caption as in change 2; video kinds from the facts ("video" for Roadtrip and Towers and Bridges); "Who wrote what, track by track, waits for Marc's word" stays.

### 8. /live/: holds
Booking button at 552 px from the top at 390 px, 52 px tall; formats from the facts; five stages with markers, venues as the facts hold them; the count "27 concerts listed by his label and the Algarve press since March 2023 (our count), 16 of them in the Algarve" with every source marked; "venue not named by his label" where venue equals place; "Coming up" says plainly that no future dates are listed. One inline link, "his artist page", is 19 px (follow-up 2).

## /behind-the-scenes/: criterion by criterion

1. **Generated.** The page carries commits up to ef2f60a ("Round 2 aim"), pushed after the build commit, so it is rebuilt from `git log` with no hand edit. Holds.
2. **Commit timeline.** I spot-checked three rows against `git log` on dev:

   | Commit | On the page | git log |
   |---|---|---|
   | e1fbb20 | 17 Nov 2026, 22:31 UTC, developer@AgentiCCells.marc-noah, "Round 1: /behind-the-scenes/, generated at build time from team/ and git log" | same date, trailer and subject |
   | 59a07ef | 17 Nov 2026, 22:09 UTC, designer@AgentiCCells.marc-noah, "Round 1: design proposal and mock-ups" | same |
   | 16f729e | 17 Nov 2026, 22:41 UTC, conductor@AgentiCCells.marc-noah, "Photographs from his label's page and embeds, cleared by Dinis" | same |

   Links go to GitHub and return HTTP 200 (the repository is public). Newest first, grouped by round. Holds.
3. **Truthful.** Counts come from the repository; policies shown as proposals in phase observe; gaps G1 to G3 stated. Holds.
4. **Team and policies in plain words.** One paragraph per role with links to `ROLE.md` and `POLICY.md`. Holds.
5. **Flow diagram.** Inline SVG, `role="img"`, `title` and `desc`, eight steps also as an ordered list. At 390 px it is 358 px wide, stacked vertically, smallest text 20 px tall; text #1f2328 on #fffaf2 in light and #ece6dc on #1d2327 in dark. Holds.
6. **Round pages.** `/behind-the-scenes/rounds/1/` renders: the aim, the round's files, 17 screenshots with width, lazy loading and alt text naming page, width and stage; the four checked return 200 and are under 300 KB. The four "before" screenshots over 300 KB are linked, not shown, as the build notes declare. Holds, with that exception. The round page has no "after" set yet (follow-up 1).
7. **How this was made.** Links agenticcells.ai and hub.agenticcells.site; says one facts file, gates, and Marc approves through Dinis. Holds.
8. **Names and secrets.** Only Marc Noah, Dinis Cruz and agent identities; no secret seen. Holds.
9. **Layout and access.** No overflow; one `h1`; linked from every footer, from `/agents/` and in `llms.txt`. Inline links in its running text are 20 px tall, as in any paragraph; block links are 44 px. Holds.
10. **Keeps the rest working.** All five designs at `/d/coast/`, `/d/azulejo/`, `/d/poster/`, `/d/songbook/`, `/d/cassette/` return 200, render, and have no overflow at 390 px. Holds.

## Follow-ups for round 2

1. **Conductor:** add these "after" screenshots to `team/rounds/1.md` so `/behind-the-scenes/rounds/1/` shows before and after; re-encode the four "before" files over 300 KB in `team/rounds/img/r1-before/` so they can be shown, not only linked.
2. **Developer:** two inline links under 44 px on main pages: "the sources page" in the read-date note on every page (17 px) and "his artist page" in /live/ "Coming up" (19 px). Give them padding to 44 px or make them block links.
3. **Developer:** `/sources/` jumps from `h1` to `h3`; make the source groups `h2`.
4. **Developer:** the four other designs still use `cite()`, whose source links are 15 px tall at both widths (about 55 to 60 per design page), and `/d/coast/`'s design footer links are 17 px. Allowed this round; bring them to the marker system or 44 px when round 2 touches the designs.
5. **Writer and developer, with Dinis's new words in `team/WORKFLOW.md` (2026-11-17, about 22:30 and 22:45 UTC):** the footer still says "No photos, audio or lyrics are copied here", and /about/ says photos wait for Marc. Once the label's photographs and the click-to-play embeds go live, both lines must change in the same release, and each photo must carry its credit to Epopeia Records. I will check that no photo comes from anywhere but `data/photos.mjs`, and that no embed loads before a visitor presses play.
6. **Developer:** `--sun:#f3b45d` is defined but unused. If round 2 uses it for text, it fails on the light background (#f3b45d on #f7efe2 is 1.6:1; ink #1f2328 on it is 8.65:1); use it only for fills behind ink text.
7. **For the "more professional" brief:** the design review's open points still stand (Quarteira resting on an unrepeated reading of marcnoah.pt/sobre; per-song credits waiting for Marc; a Portuguese version).
