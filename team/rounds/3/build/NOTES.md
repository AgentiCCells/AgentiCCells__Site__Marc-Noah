# Round 3: build notes

By developer.marc-noah@AgentiCCells.dinis, 18 November 2026. Built from `team/rounds/3/design/PROPOSAL.md` as passed in `team/rounds/3/review/DESIGN.md`, with every condition applied. `board/HOLD.md` did not exist. Not pushed.

## What changed

- `scripts/lib.mjs`: `lazyPhoto(id, { sizes })`, the deferred form of `photo()` (a `<picture>` with the 800 px file under 700 px, a blank of the photograph's own shape until the script sets the real files 200 px before the viewport, `photo()` in `<noscript>`); `still(id, { sizes })` for film stills (`alt=""`, deferred). The one shared `SCRIPT` now also sets a deferred `<source>`'s `srcset`; no second script.
- `scripts/designs.mjs`: the player's styles in `DLG_CSS`; `playerDialog()` on all five pages; `dfoot()` carries `PHOTO_CREDIT` with its source on all five, and `STILLS_CREDIT` on the four that show a still (Tour Poster shows none, as the proposal and review set); the five designs as passed.
- `src/assets/coast.css`: the postcard, film cards and live photograph rules.
- `src/assets/designs/*.jpg`: the Designs pop-up previews, regenerated (`cards.mjs --designs`), each under 25 KB.
- Generated pages under `src/` through `node scripts/generate.mjs` only.

## The review's conditions

- **R1.** No `aria-label` on any new film link. Where the visible words do not name the film, a hidden span follows them ("Filmed: watch" + caption; "Play the video here" + caption). The Coast film cards read "caption, play the film"; Songbook and Side A, Side B links show the caption in full. Azulejo's still repeats the link under it, so it is `aria-hidden` and out of the tab order.
- **1a.** The Coast postcard sits beside the line, never on the map: at 900, 1024, 1199 and 1366 px it does not overlap the map (45 px gap, measured). **1b.** Heading "Green Sofa Sessions".
- **3a.** "See the show" sits under the print with a gap, not on it (measured: no overlap at 390 and 1366); the print has no caption. **3b.** Tagline and line `#1b1b1b`, 4.57:1. Stamp text black on cream, 15.35:1. Band set S85R1WgyKJ0. **3c.** `filmOf(g)`: a `VIDEOS` entry with the row's date whose event the venue names, the full set (no `song`) first; one link per row. Exactly three rows link.
- **4.** Polaroid `min(36%,13rem)`: text beside it 13.4 rem at 390 px (measured).
- **5.** `flipOf(t)`: a `band` film and no `official` video (Slowtalk, No More Dreaming), plus one data list `FLIP_ALSO` for To The Bone with its reason. Songbook films by rule too: a session film for a track the EP's `OTHER_RELEASES` text names (Towers and Bridges has a session film but is not on the EP). Azulejo's three films are a checked data map.

## Checks (local, 2026-11-18)

- `generate`, `build`, `validate` OK; leak scan OK (131 files).
- Playwright, `_site` on localhost:8080: no horizontal overflow on any of the five at 390 and 1366 px; no request to any other host before a press; a press opens the dialog with `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0`. First load at 390 px: one hero per design (`*-800.jpg`); Tour Poster also loads the tour artwork and Side A, Side B the first flip-side still (both within 200 px, as the proposal allowed). Every new film link is at least 44 px tall.
- Contrast (computed colours): no text sits on a photograph or still. Captions and links 5.90:1 to 17.22:1; the poster name 3.36:1 (large text).
- Screenshots: `shots/`, top 2000 px of each page (`--max-height=2000`), 1.6 MB.

## Open

- Esc does not close the player once YouTube's frame has the keyboard (known since round 2; Shift and Tab reach Close).
- The live review should check the dark scheme of The Coast and the designs pop-up previews on the live site.
