# Round 3: review of the design proposal

By reviewer.marc-noah@AgentiCCells.dinis, 18 November 2026. Reviewed: `team/rounds/3/design/PROPOSAL.md`, the seven mock-up screenshots (viewed) and the five mock-up HTML files, against `data/facts.mjs` (`VIDEOS`, `GIGS`, `OTHER_RELEASES`, `TRACKS`), `data/photos.mjs`, `scripts/lib.mjs` (`STILLS_CREDIT`), `team/WORKFLOW.md` and `CLAUDE.md`. `board/HOLD.md` does not exist.

Conductor's decisions, applied here: the Tour Poster's small text on orange is black `#1b1b1b` (4.57:1, measured); Azulejo has three films, not one per tile.

## Verdicts

| # | Design | Verdict |
|---|---|---|
| C1 to C6 | Rules for all five | pass with changes (R1) |
| 1 | The Coast | pass with changes |
| 2 | Azulejo | pass with changes (R1 only) |
| 3 | Tour Poster | pass with changes |
| 4 | The Songbook | pass with changes |
| 5 | Side A, Side B | pass with changes |

## What I checked and found right

- **Films against `VIDEOS` and `GIGS`.** Every caption and accessible name in the mock-ups is the `caption` in `VIDEOS`. The three Tour Poster "Filmed" rows are exactly the three `GIGS` rows whose date and event a `VIDEOS` entry records: 13 December 2023 Choque Frontal (S85R1WgyKJ0), 4 October 2023 9.º Festival Acústico (OyvGbs1fg7g), 7 August 2026 Sons no Castelo (q2P-ScNIL7w). The stamp's "With his band, TEMPO, Portimão, 13 December 2023" matches S85R1WgyKJ0 (format band, place, date). Side A, Side B shows no date, right, since the three flip-side films are undated in `VIDEOS`; "filmed by Alvor FM" matches their channel. The Songbook's three session films are the three EP songs that `OTHER_RELEASES` says were filmed as the Green Sofa Sessions.
- **Player.** No `<iframe>` in any mock-up; every film is an `a[data-yt]` to `youtube-nocookie.com` with a YouTube fallback link. Nothing from YouTube loads before a press.
- **Photos.** Every photograph is from `data/photos.mjs` with its `alt`; stills have `alt=""`; each mock-up carries `PHOTO_CREDIT` (Epopeia Records); the four designs with stills carry `STILLS_CREDIT`. Album cover, EP sleeve and tour artwork untreated. Duotone, cobalt and sepia treatments are styling only and fine.
- **Contrast.** No text over a photograph or still. Measured: `#1b1b1b` on `#e2552b` 4.57:1; `#a33a14` on the poster's cream 5.8:1; `#5a5650` on white 7.3:1; `#41577a` on white 7.3:1; `#8a3b12` on `#f8f3e6` 7.0:1; `#1f3d7a` on white 10.5:1; white on `#11607a` 7.1:1. The poster name (cream on orange, 3.36:1) is large text and passes 3:1.
- **Loading.** Each mock-up has one `fetchpriority="high"` hero; every other photo and still is `class="lz"` with `loading="lazy"`.
- **390 px first screen.** All five show the name, the Algarve and that he writes his own songs, with the hero picture.

## Conditions

**R1 (all five). Visible text must be part of the accessible name** (WCAG 2.5.3). The mock-ups set `aria-label="Play <caption>"` on links whose visible text is different: "See the show", "Filmed: watch", "Play the video here", "Watch the Green Sofa Session: ...", "Flip side ...". Either drop the `aria-label` where the visible text already names the film, or begin it with the visible words, for example "Filmed: watch His set with his band at TEMPO, Portimão".

**1. The Coast.**
- 1a. At 1366 px the postcard must not sit at or point to the "Quarteira, home" marker. In the mock-up it touches the marker, which tells the reader the photograph was taken in Quarteira; no source says so (round 2 decided this). Put it on the map's open sea or empty land away from every place label, or beside the map.
- 1b. Change the heading "Filmed on the coast: Green Sofa Sessions" to "Green Sofa Sessions" (or "Green Sofa Sessions, by the sea"). Under an Algarve map, "on the coast" places the jetty and promenade on that coast; `VIDEOS` gives only the setting from the frames, not where.

**2. Azulejo.** R1 only. Three films as the conductor decided (K8795UoBqTg, JMd-r6okn80, adbD0f2FYLA). Open question 1: keep round 1's plain links to YouTube on the other tiles; they are links, not embeds, and add no weight.

**3. Tour Poster.**
- 3a. The "See the show" stamp must not sit on the live photograph. On the print, "With his band, TEMPO, Portimão, 13 December 2023" reads as the photograph's caption, but `PHOTOS` describes live-acoustic as "an outdoor stage at dusk" and no source dates or places it, while TEMPO is a theatre. Set the stamp clear of the print (below or beside it, with a visible gap), and give the print no date or place.
- 3b. The tagline and line in black `#1b1b1b`, as decided; open question 2 closed.
- 3c. The 13 December 2023 row matches two `VIDEOS` entries (S85R1WgyKJ0 and QyZMI8sPgow, Lie To Me). The join must pick the full set (the entry with no `song`) by rule, and show one link per row.

**4. The Songbook.** At 390 px the text beside the polaroid measures about 10.9 rem in the mock-up, under the proposal's own 11 rem; shrink or move the polaroid until it holds. Plus R1.

**5. Side A, Side B.** The three films are right (GdY-l97_vCU, JB0jvIitE9I, f__TLj6ccQI). Select Slowtalk and No More Dreaming by the data rule (a `band` film and no `official` video), and name the To The Bone exception in one data list with its reason, not as a title test inside `side()`. Plus R1.

## For the live review (LIVE.md)

Check on the built site: no request to YouTube or any other host before a press; first-load images at 390 px as the proposal measured; The Coast postcard at 900, 1024 and 1199 px clear of all labels (open question 3); every new target at least 44 px; no horizontal scroll at 390 and 1366 px.
