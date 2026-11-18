# Round 3: review of the live site

By reviewer.marc-noah@AgentiCCells.dinis, 18 November 2026. Checked: https://marc-noah.agenticcells.site, `version.json` v0.1.33, commit f01d53b, against `team/rounds/3/review/DESIGN.md` and `team/rounds/3/build/NOTES.md`. `board/HOLD.md` does not exist.

Method: `node scripts/shots.mjs --max-height=2000` on the five designs and the home (folder `after/`, 2.1 MB, all viewed), and a Playwright script run against the live site at 390 and 1366 px, light and dark scheme: overflow, every request host, the player, the Designs pop-up, the conditions, the footer credits, and computed text contrast over every visible text node (no text over a photograph is counted, and none was found).

## Verdict

**Pass.** Every round 3 condition holds on the live site. One contrast failure remains on The Songbook; it dates from round 1, not this round, and is a follow-up (F1).

## Checks, all six pages (home, coast, azulejo, poster, songbook, cassette)

| Check | Result |
|---|---|
| Horizontal overflow at 390 and 1366 px | 0 px on all six |
| Requests to any other host before a press (YouTube, ytimg, Spotify or any) | none on all six, in both schemes |
| A press on the first film | the player opens with `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0`; YouTube hosts load only after it |
| Designs pop-up (home and all five) | opens, focus moves into it, fits at 390 and 1366 px, all six new previews load, Esc closes it, nothing from another host |
| Credits | Epopeia Records photo credit in the footer on all six; the video stills credit on the home and the four designs with stills; Tour Poster shows no still and carries none, as set |
| Film links | every new film link at least 44 px tall; no `aria-label` on any of them, so the visible words are the name (R1) |
| `lang`, headings | `en-GB`, one `h1` on each page |
| Broken images | none |
| Contrast, light | home 5.77:1 lowest; coast 4.66; azulejo 7.32; poster 3.36 (the name, large text, passes 3:1); cassette 3.62 (large text, passes); songbook: F1 |
| Contrast, dark scheme at 1366 px | home 5.77; The Coast 7.13 (its dark scheme works, `after/d_coast-1366-dark.jpg`); the other designs keep their own colours and give the same results as light |

## The design review's conditions

| Condition | Live result |
|---|---|
| R1, visible text in the accessible name | holds: no `aria-label` on any film link; visible words plus a hidden caption where needed (Azulejo "Play the video here : Official video for ...", Poster "Filmed: watch ...") |
| 1a, Coast postcard clear of the map | holds at 900, 1024, 1199 and 1366 px: no overlap with the map or any label, 45 px gap (measured) |
| 1b, heading | "Green Sofa Sessions" (a `p.kick` label, not a heading element; acceptable) |
| 2, Azulejo films | K8795UoBqTg, JMd-r6okn80, adbD0f2FYLA, as decided |
| 3a, "See the show" clear of the print | holds: no overlap, 9 px gap, the print has no caption |
| 3b, black small text on orange | holds (no failing text on the poster) |
| 3c, one link per filmed row | exactly three rows link: 7 Aug 2026 Sons no Castelo (q2P-ScNIL7w), 13 Dec 2023 Choque Frontal (S85R1WgyKJ0, the full set, not Lie To Me), 4 Oct 2023 9.º Festival Acústico (OyvGbs1fg7g) |
| 4, Songbook text beside the polaroid at 390 px | over 11 rem (measured 15.7 rem to the polaroid's edge; the build notes give 13.4 rem of text) |
| 5, Side A, Side B flip sides | GdY-l97_vCU, JB0jvIitE9I, f__TLj6ccQI, as passed |
| 390 px first screen | each design shows the name, the Algarve and that he writes his songs, with the hero picture (screenshots) |

## Follow-ups (not blocking)

- **F1. The Songbook track numbers fail contrast.** `.no` (`#e0a3a3` on `#fdfbf4`, 2.04:1; large text needs 3:1), the eight numbers 1 to 8 in `src/d/songbook/index.html` from `scripts/designs.mjs`. Present since round 1 (commit a8f7c78). Darken the colour to 3:1 or more, or mark the numbers `aria-hidden` if the list already numbers them.
- **F2. Esc does not close the player once the film has the keyboard.** Measured on most pages after 1.5 s of play; the Close button and the hidden note (Shift and Tab to Close) are in place. Known since round 2.
- **F3. Tour Poster at 1366 px:** the tour artwork sits alone above the dates with a wide empty area beside it (`after/d_poster-1366.jpg`). Layout only; for the designer.
