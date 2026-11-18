# Round 3: design proposal, photos and films in the five other designs

By designer.marc-noah@AgentiCCells.dinis, 17 November 2026. **Status: proposal**, for the reviewer and the critic, then the developer once passed. Marc approves every change about him, through Dinis.

Read for this proposal: `team/rounds/3.md`, `team/WORKFLOW.md`, my `ROLE.md` and `POLICY.md`, `CLAUDE.md`, round 2's `design/PROPOSAL.md` and `review/LIVE.md`, `data/photos.mjs` (the 13 photographs, viewed), `data/facts.mjs` (`VIDEOS` with `format` and `caption`, `GIGS`, `TRACKS`, `OTHER_RELEASES`, `LYRIC_LINES`), the 21 posters in `src/assets/video/` (viewed), `scripts/designs.mjs`, `scripts/lib.mjs` (`photo()`, `playAttrs()`, `playerDialog()`, `SCRIPT`, `designsDialog()`), `src/style.css`, `src/assets/coast.css`, the "before" screenshots in `team/rounds/img/r3-before/` (viewed) and the five designs live (`/d/coast/`, `/d/azulejo/`, `/d/poster/`, `/d/songbook/`, `/d/cassette/`, all 200 on 2026-11-17).

## Dinis's words this round

Dinis, about 23:55 UTC, 17 November 2026, in the conductor's session: "First design is amazing!! Are you adding some of those pics and video to the other designs? (They don't need to be video and image heavy than the first one)".

## The idea in one line

Each design takes his photographs and films the way its own object would: a postcard on the coast map, a portrait painted in cobalt tiles, a halftone gig photo with a "See the show" stamp, a polaroid taped into the notebook, a portrait on the cassette's j-card. At most three photographs and three films per design, one hero picture, every film in the same click-to-play player as Editorial.

## Mock-ups

In `team/rounds/3/design/mockups/`, made by `tools/mockups.mjs` from the live code: it calls `renderDesign()` from `scripts/designs.mjs` (so every fact, date, caption and alt text is the real one) and inserts this proposal's pieces with our own CSS; `tools/shots.mjs` takes the screenshots (Playwright, JPEG quality 65). Each page says at its foot that it is a mock-up. The player works in the mock-ups: a press opens the site's own `<dialog>` with the `youtube-nocookie.com` film.

| File | What it shows |
|---|---|
| `coast.html`, `coast-390.jpg`, `coast-1366.jpg` | The Coast, first screen at 390 x 844 and 1366 x 768 |
| `azulejo.html`, `azulejo-390.jpg` | Azulejo, first screen at 390 x 844 |
| `poster.html`, `poster-390.jpg`, `poster-1366.jpg` | Tour Poster, first screen at 390 x 844 and 1366 x 768 |
| `songbook.html`, `songbook-390.jpg` | The Songbook, first screen at 390 x 844 |
| `cassette.html`, `cassette-390.jpg` | Side A, Side B, first screen at 390 x 844 |
| `../tools/mockups.mjs`, `../tools/shots.mjs` | How the files above were made (run `node team/rounds/3/design/tools/mockups.mjs`, then `NODE_PATH=$(npm root -g) node team/rounds/3/design/tools/shots.mjs`) |

Measured on the mock-ups with Playwright (2026-11-17): no horizontal page scroll on any of the seven views; no request to any host before a press (all seven views); after a press on "See the show" the dialog opens with `https://www.youtube-nocookie.com/embed/S85R1WgyKJ0?autoplay=1&rel=0` and Esc closes it; on first load at 390 px each design fetches only its hero photograph, plus at most one picture that sits within 200 px of the first screen (Tour Poster: the tour artwork; Side A, Side B: the first flip-side still). Every new link and button is at least 44 px tall. The links under 44 px that the log lists are round 1's links inside running text and source lines, unchanged here.

Notes: (1) the brief's relative path `../../../../` from `mockups/` reaches `team/`; the repository root is five levels up, so the mock-ups use `../../../../../src/assets/`, as in round 2. (2) The folder is 0.6 MB, under the 2.5 MB asked. (3) If the writer changes a fact, run the two tools again.

## Rules common to the five designs

These hold for every design below, and each design's acceptance criteria include them.

- **C1. One player, the same as Editorial's.** Each `/d/` page gains `playerDialog()` before `SCRIPT` (the script is already on these pages and already handles `a[data-yt]`), and `DLG_CSS` in `scripts/designs.mjs` gains the player's styles (the round 2 values from `style.css`, written out as colours because these pages do not load `/style.css`; the mock-ups carry them as `PLAYER_CSS`). Every film is a link built with `playAttrs(v)` from `VIDEOS`: without JS it opens the video on YouTube; with JS it opens the dialog. Its accessible name is "Play " and the film's `caption` from `VIDEOS`. Nothing from YouTube loads before a press.
- **C2. Photographs and stills: our copies, CSS only.** Treatments are CSS (`filter`, `mix-blend-mode`, gradients, borders, transforms) on the files already in `src/assets/photos/` and `src/assets/video/`; no new image files, no edited pixels. The album cover, the EP sleeve and the tour artwork are shown as published, untreated, because they are his label's artwork. No text is set over a photograph or a still, so contrast never depends on a picture.
- **C3. Alt text and credit.** Every photograph's `alt` comes from `PHOTOS` (through `photo()` or the same data); every still has `alt=""` because its link names the film (round 2 review). Captions say only what the picture shows. `dfoot()` gains, on every design that shows a photograph or a still, `PHOTO_CREDIT` with `cite('photos')` and `STILLS_CREDIT` with `cite('yt-frames')`, as the main pages carry them.
- **C4. Light and fast.** At most three photographs and three films with a picture per design, one hero picture. The hero is the only eager image (`fetchpriority="high"`, the 800 px file under 700 px through `photo()`). Every other photograph and still is deferred the way the round 2 posters are: `class="lz"`, a blank `src`, the real file in `data-src`/`data-srcset`, set by the existing script when it comes within 200 px of the viewport, with a `<noscript>` copy. Target: the first screen at 390 px loads the hero photograph and at most one more picture.
- **C5. Readable.** Every text pair at least 4.5:1 (large display text at least 3:1); measured pairs are listed per design. Targets at least 44 px, source markers 24 px as before.
- **C6. Everything else stays.** The Designs button and pop-up, the switcher, each design's own fonts, colours and order, the source lines and markers, and `dfoot()`'s links. Film text uses only `VIDEOS` (caption, event, place, date, channel); no lyric line beyond `LYRIC_LINES`, and the words inside the 6yUpmlZzrk0 frame are never written out.

The build cost of C1, C3 and C4 is shared: about 30 lines in `scripts/designs.mjs` (player styles in `DLG_CSS`, `playerDialog()` in `shell()` and in `coast()`, the credit line in `dfoot()`) and two small helpers in `scripts/lib.mjs`: `lazyPhoto(id, sizes)` (the deferred form of `photo()`) and a `stillImg(id, { eager })` for posters, both written out in `tools/mockups.mjs` as `lzPhoto` and `poster`.

## 1. The Coast: the green chair by the sea, and two coast films beside the map

- **What.** Under the line "He lives on the Algarve coast and writes the songs he sings.", a postcard: **sofa-session-quarteira** in a white card with a 4:3 crop, turned 1.2 degrees, a soft shadow in the sea colour and the caption "On the green chair, on the seafront promenade" (what the picture shows; the label's file name says Quarteira, but no source does, as round 2 decided). At 1366 px the postcard sits on the drawn map's empty top-left, near "Quarteira, home", like a card dropped on the sketch, 12.5 rem wide; at 390 px it sits between the line and the Roadtrip card, so the first screen shows name, line and photograph. The Roadtrip card's button "Watch Roadtrip on YouTube" becomes "Watch the Roadtrip video" with "plays here", opening the player. Under the map: "Filmed on the coast: Green Sofa Sessions", two cards (4:5 on a phone, 16:10 at 1366 px). In "On stage", **live-acoustic** at the top of the column, 3:2, deferred.
- **Photos (2).** sofa-session-quarteira (hero), live-acoustic.
- **Films (3).** adbD0f2FYLA (Official video for Roadtrip; the button, no picture), 6yUpmlZzrk0 (Towers and Bridges, by a lighthouse on a jetty), RRTVycYkcOo (Mother, on the sofa on a seafront promenade).
- **Treatment.** A warm light on the postcard only: a `linear-gradient(160deg, rgba(243,180,93,.28), transparent)` overlay in `mix-blend-mode: soft-light` and `saturate(1.06)`, the sun colour already in `coast.css`. The stills are untreated.
- **Why.** The Coast leads with the map; the one photograph of him by the sea, and the two sessions filmed on the coast, put him on that map. Roadtrip is the card's own song, so its film belongs on the card's button.
- **Facts.** `HERO`, `FEATURE` (Roadtrip), `VIDEOS` (captions, `own-gss`, `yt-own`, `youtube`), `PHOTOS`. No new fact.
- **Files.** `scripts/designs.mjs` (`coast()`), `src/assets/coast.css` (about 15 rules: `.c-card`, `.c-films`, `.c-film`, `.c-live`). Coast's own dark mode keeps working: the postcard has its own white ground.
- **Contrast.** Caption `#5a5650` on white 7.3:1; film captions in `--ink` on sand 13.8:1; button text white on `#11607a` 7.1:1.
- **Accept when.** C1 to C6 hold; at 390 x 844 the name, the line and the postcard are in the first screen; at 1366 x 768 the postcard covers no map label (Salir, Loulé, Faro, Olhão, "Quarteira, home") and the Roadtrip button and both coast films are in the first screen; the Roadtrip button opens adbD0f2FYLA in the dialog; on first load at 390 px only `sofa-session-quarteira-800.jpg` is fetched among photos and stills; the caption names no place.

## 2. Azulejo: his portrait painted in cobalt tiles, and three song tiles that play

- **What.** At the top of the hero box, **portrait-bw** in a tile frame: a 12 px border of the design's own diamond tile, the photograph square, turned cobalt and white, and cut by thin white grout lines into nine tiles, as if painted across a panel. In the album section, the first tile of the grid is the album cover (**giant-little-victories-cover**, untreated, in a white tile border), captioned "The album cover, from his label". Three song tiles swap their drawn pattern for the film's still, also painted cobalt, which turns to full colour on hover or focus; under each, "Play the video here" opens the player. The other song tiles keep their pattern and their round 1 link to YouTube.
- **Photos (2).** portrait-bw (hero), giant-little-victories-cover.
- **Films (3).** K8795UoBqTg (Official video for Towers & Bridges), JMd-r6okn80 (Official lyric video for Mother), adbD0f2FYLA (Official video for Roadtrip): the three official videos whose stills read best in blue and white.
- **Treatment.** The parent is `#1d4f91` with `isolation: isolate`; the image is `grayscale(1) contrast(1.12) brightness(1.06)` in `mix-blend-mode: screen`, so black becomes cobalt and white stays white. Grout: two `linear-gradient` lines in `#fbfaf6` at `background-size: 33.34%` on a `::after` over the portrait only. On hover or focus a still drops the filter, so the film's real colours show before a press.
- **Why.** The idea of Azulejo is that each song is a tile; painting him and three films in the tiles' own blue keeps the page one object.
- **Facts.** `TRACKS`, `VIDEOS`, `PHOTOS`, `ALBUM`. No new fact.
- **Files.** `scripts/designs.mjs` (`azulejo()`: the hero figure, a cover `<li>`, a film branch in the tile map; about 12 CSS rules).
- **Contrast.** All text stays on white or `#fbfaf6`: `#122a4d` 13.7:1, `#41577a` (tile meta) 7.3:1, `#1d4f91` (links) 8.1:1.
- **Accept when.** C1 to C6 hold; at 390 x 844 the painted portrait, the tagline and the name are in the first screen; the portrait's `alt` is the `PHOTOS` text for portrait-bw (the blue is our styling, not described as his); exactly three tiles carry a still, each opening its film; on first load at 390 px only `portrait-bw-800.jpg` is fetched among photos and stills; with CSS blend modes unsupported the photograph still shows (in grey).

## 3. Tour Poster: a halftone live photo, and "See the show"

- **What.** In the orange top, under the name and line, **live-acoustic** as a screen print: orange and black duotone with a halftone dot screen, in a 5 px black frame. On its lower edge, a cream stamp turned like the existing "Book through Epopeia" stamp: "See the show", and under it "With his band, TEMPO, Portimão, 13 December 2023", opening the band set in the player. At 1366 px the top becomes two columns (words left, print right, the rings of the sun behind it); at 390 px the print follows the line, and the rings are hidden so they never sit behind the name. In "Every date", **autumn-leaves-tour** pasted up above the list (untreated, white border, turned 2 degrees), captioned "His label's poster for the autumn 2024 tour". The three dates that were filmed get "Filmed: watch" in their row.
- **Photos (2).** live-acoustic (hero), autumn-leaves-tour.
- **Films (3).** S85R1WgyKJ0 (the stamp, and the 13 December 2023 Choque Frontal row), OyvGbs1fg7g (the 4 October 2023 9.º Festival Acústico row), q2P-ScNIL7w (the 7 August 2026 Sons no Castelo row). Each film's event and date in `VIDEOS` matches its `GIGS` row; the build links them by date and event, not by a list in the code.
- **Treatment.** Parent `#e2552b`, `isolation: isolate`; image `grayscale(1) contrast(1.45) brightness(1.08)` in `mix-blend-mode: multiply` (white becomes orange, black stays black); a `::after` of `radial-gradient(circle, #1b1b1b .9px, transparent 1.3px)` at 4 px, `multiply`, opacity .55, for the dots.
- **Readability fix.** Today the tagline and the line are cream on orange, 3.36:1, under 4.5:1 for text that small. This proposal sets them in the poster's black `#1b1b1b` (4.57:1); the name stays cream (large text, 3.36:1 passes 3:1). The stamp text is black on cream (15.4:1), the "Filmed: watch" links `#a33a14` on cream (5.9:1).
- **Why.** A gig poster uses one strong photograph, printed cheaply in its own two inks; and a poster lists dates, so a film belongs on the date it shows. The live photograph is not captioned as any of the filmed shows, because no source says where it was taken.
- **Facts.** `VIDEOS` (event, place, date, `yt-choque`, `yt-acustico`, `yt-own`), `GIGS`, `PHOTOS`. No new fact.
- **Files.** `scripts/designs.mjs` (`poster()`: wrap the top's words, the print and stamp, a film link in the date row when a `VIDEOS` entry has the same date; about 14 CSS rules; `.p-top>.p-sun` made absolute, which it was meant to be: a later `.p-top>*{position:relative}` overrides it today).
- **Accept when.** C1 to C6 hold; at 390 x 844 the name, line, print and "See the show" are in the first screen; at 1366 x 768 the print sits beside the name and covers none of it; the tagline and line measure at least 4.5:1; the stamp opens S85R1WgyKJ0; the three filmed rows, and only those, carry "Filmed: watch"; no caption ties live-acoustic to a date or a stage.

## 4. The Songbook: a polaroid taped in, and the three Green Sofa Sessions on their song pages

- **What.** Beside "Marc Noah" on the notebook's first page, a polaroid of **portrait-grey** (square crop on his face, white frame with a wider foot, "Marc Noah" written under it in the notebook's ink colour, a strip of translucent tape across the top, turned 2.5 degrees), floated right so the opening lines run beside it. On the song entries for Lie to Me, Sunshine and Mother, a small taped snapshot of the film's still with "Watch the Green Sofa Session:" and the caption, opening the player. Under "Also", beside the Green Sofa Session EP, its sleeve (**green-sofa-session-ep**) taped in, untreated.
- **Photos (2).** portrait-grey (hero), green-sofa-session-ep.
- **Films (3).** ZBwgJ7Lg7-o (Lie To Me, at home on the green sofa), 5H8PBg1tQHc (Sunshine, on the green sofa among trees), RRTVycYkcOo (Mother, on the sofa on a seafront promenade). These are the three songs of the EP, whose live versions `OTHER_RELEASES` says were filmed as the Green Sofa Sessions.
- **Treatment.** Polaroid image `sepia(.18) contrast(1.04)`; snapshots `sepia(.12)`; the tape is a `::before` in `rgba(240,224,170,.78)`. Every picture keeps to the ruled lines' column; nothing sits on the margin rule.
- **Why.** A songwriter's notebook keeps a photograph tucked in the front and notes of where a song was played; the sofa sessions are the songs as he plays them at home.
- **Facts.** `TRACKS`, `OTHER_RELEASES`, `VIDEOS`, `PHOTOS`. No new fact.
- **Files.** `scripts/designs.mjs` (`songbook()`: a figure before the `h1`, a film line in the entry template when `filmsOf(title)` has a `session` film, the EP figure; about 10 CSS rules).
- **Contrast.** Polaroid caption `#1f3d7a` on white 10.5:1; film links `#8a3b12` on `#fdfbf4` 7.5:1; body unchanged.
- **Accept when.** C1 to C6 hold; at 390 x 844 the polaroid, the name and the opening lines are in the first screen, and the text beside the polaroid is at least 11 rem wide; the polaroid's `alt` is the `PHOTOS` text for portrait-grey (the handwritten "Marc Noah" is a caption, not the alt); exactly the three EP songs carry a session film; on first load at 390 px only `portrait-grey-800.jpg` is fetched among photos and stills.

## 5. Side A, Side B: a j-card with his portrait, and three films as flip sides

- **What.** The cassette's label becomes a j-card: on its left, **roadtrip-car** (him at the wheel of a vintage car, in sunglasses) as the front panel, 3:4, with a strip of the design's four stripe colours along its foot; on the right the tagline, "Marc Noah" and the album line as now. Under three tracks with no official video of their own, a "Flip side" line: a small still with two reel marks drawn over it and "live at Choque Frontal ao Vivo, Portimão, filmed by Alvor FM", opening the player. In "Liner notes", **towers-bridges-piano** as a photocopied insert in the dashed box style the notes already use.
- **Photos (2).** roadtrip-car (hero), towers-bridges-piano.
- **Films (3).** GdY-l97_vCU (To The Bone, live), JB0jvIitE9I (Slowtalk, live), f__TLj6ccQI (No More Dreaming, live): Slowtalk and No More Dreaming have no official video, so these are their only films; To The Bone's is the live set beside its lyric video.
- **Treatment.** Front panel `saturate(.85) contrast(1.08) sepia(.12)`, like a printed inlay; liner photo `grayscale(1) contrast(1.25)`, like a photocopy; the reel marks are two `radial-gradient` circles over the still, which keep the face clear.
- **Why.** The design's idea is the album as a tape for the 1980s and 1990s music that shaped him; a tape's j-card has a picture on its front, and a flip side is where a tape keeps its extras. "Flip side" is used, not "B-side", because Side B is already the design's name for tracks 5 to 8.
- **Facts.** `TRACKS`, `VIDEOS` (captions, `yt-alvor`, `yt-frames`), `PHOTOS`. To The Bone's live film is undated in `VIDEOS`, so no date is shown on any flip side.
- **Files.** `scripts/designs.mjs` (`cassette()`: the j-card grid, a flip-side line in `side()` when the track has a `band` film and no official video, or is To The Bone; about 10 CSS rules, and the tagline set at `.08em` tracking under 600 px so "Singer-songwriter," does not break mid-word).
- **Contrast.** Flip-side text `#8a3b12` and `#23202b` on `#f8f3e6`: 7.0:1 and 14.4:1; label text unchanged (14.4:1).
- **Accept when.** C1 to C6 hold; at 390 x 844 the j-card with photograph, tagline, name and album line is in the first screen; the hyphenated tagline breaks only at its hyphen or space; exactly three flip sides, each opening its film; on first load at 390 px at most the hero and the first flip-side still are fetched among photos and stills.

## What each design loads and shows (proposal)

| Design | Hero | Other photographs | Films with a picture | Films without a picture |
|---|---|---|---|---|
| The Coast | sofa-session-quarteira (postcard) | live-acoustic | 6yUpmlZzrk0, RRTVycYkcOo | adbD0f2FYLA (Roadtrip button) |
| Azulejo | portrait-bw (cobalt tiles) | giant-little-victories-cover | K8795UoBqTg, JMd-r6okn80, adbD0f2FYLA | none |
| Tour Poster | live-acoustic (halftone duotone) | autumn-leaves-tour | none (stamp and date links) | S85R1WgyKJ0, OyvGbs1fg7g, q2P-ScNIL7w |
| The Songbook | portrait-grey (polaroid) | green-sofa-session-ep | ZBwgJ7Lg7-o, 5H8PBg1tQHc, RRTVycYkcOo | none |
| Side A, Side B | roadtrip-car (j-card) | towers-bridges-piano | GdY-l97_vCU, JB0jvIitE9I, f__TLj6ccQI | none |

No design uses chair-dark, Editorial's hero, so each design keeps a face of its own. Every design stays under Editorial's weight: two photographs and three films against the Editorial home's five photographs and 21 films (counted in `editorial()` and `watchGroups()` in `scripts/designs.mjs` and `scripts/lib.mjs`).

## Not taken this round, and why

- **A film for every Azulejo tile** (the brief's example): six of the eight songs have an official video, which would pass the three-film limit; the other tiles keep their round 1 link to YouTube. Making those links open the player too would add no picture and no weight; I leave it to the reviewer whether that counts against the limit.
- **Hero video loops or animated stills:** they would load YouTube or extra files before a press.
- **New image files** (pre-tinted duotones, cut-out portraits): CSS treatments on our existing copies do the same with no new files and no change to the pictures.

## Open questions

1. **Azulejo song links** (above): keep round 1's links to YouTube, or open them in the player.
2. **Tour Poster type colour:** this proposal sets the tagline and line in black to reach 4.5:1; the alternative is a deeper orange `#b8401c` (cream text 4.94:1), which changes the poster's colour. Reviewer to choose.
3. **The Coast's postcard over the map** at 900 to 1199 px is 10 rem wide to clear the labels; the developer should check it at 900, 1024 and 1199 px.
