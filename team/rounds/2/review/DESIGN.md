# Round 2: review of the design proposal

By reviewer.marc-noah@AgentiCCells.dinis, 17 November 2026. Reviewed: `team/rounds/2/design/PROPOSAL.md` (commit 7cec00c), its mock-ups (`home.html`, `about.html`, every JPEG, the six previews, `tools/mockups.mjs`), `team/rounds/2/copy/COPY.md`, `data/facts.mjs` and `data/sources.md` as the writer left them in commit c425acd ("video formats, events and captions"), `data/photos.mjs`, the 21 poster frames in `/tmp/claude-0/yt/` with the contact sheet, `team/WORKFLOW.md` (Dinis's words up to about 23:25 UTC), `CLAUDE.md`, my ROLE and POLICY, and my round 1 reviews. `board/HOLD.md` does not exist.

Sources checked for this review: the 21 YouTube poster frames (viewed, `yt-frames`); `VIDEOS`, `FORMATS`, `GIGS`, `COUNTS`, `LIVE.count`, `LYRIC_LINES`, `BIO_EN`, `OWN_DESC`, `CONTACT`, `FOOTER` in `data/facts.mjs`; the `avoz` row of `data/sources.md`. I tried to read three YouTube video pages for their descriptions (GdY-l97_vCU, f__TLj6ccQI, OyvGbs1fg7g); YouTube returned a 438-byte refusal page each time, so nothing in this review rests on a description I did not read.

Contrast figures are computed (WCAG 2 relative luminance) from the proposal's tokens, and, for text on photographs, from pixels of the mock-up JPEGs; JPEG pixels are approximate, so the developer measures again on the build.

## Verdicts

| # | Change | Verdict |
|---|---|---|
| 1 | Watch him play: videos as the centrepiece, filed by format | **Pass with changes** |
| 2 | Designs button and pop-up on every page | **Pass with changes** |
| 3 | Full-bleed photo hero on a new Editorial design | **Pass with changes** |
| 4 | Dark type and colour system, lyric lines | **Pass with changes** |
| 5 | Spotify album player beside the eight songs | **Pass** |
| 6 | Photographs through /about/ and /songs/ | **Pass with changes** |
| 7 | /live/ and booking: films as proof, photo, address | **Pass with changes** |
| 8 | Header and footer, photo credit | **Pass with changes** |

Nothing is rejected. The direction answers Dinis's words of 22:30, 22:45, 23:05, 23:10 and 23:25 UTC, and the story (Algarve, composer, his songs) stays in the first screen and in every section.

## Decisions asked of me

- **The 40-concert count's markers (change 7, open question 3).** One marker, as the designer proposes, with conditions: (a) the marker's accessible name is "Source: our count, how it was made" and it links to an "Our own counts" note on /sources/; (b) that note is generated from `COUNTS` and lists every source id in `COUNTS.src`, with its number, and says how we counted (`COUNTS.how`); (c) the link "Every date, with its source" stays directly after the count, so each date is one tap away with its own markers; (d) the count still says "(our count)". The count is our arithmetic, not any source's claim, so it is sourced by the method and the rows, not by 17 markers in a line.
- **The poster of 6yUpmlZzrk0.** Recorded as the conductor decided: it is Marc's own published thumbnail, so the self-hosted poster is his frame as published, uncropped, and the mock-up's 4:5 crop is not needed (a centred `object-fit` crop for the card shape is fine). Condition: the words in that frame are never written out as text anywhere (no alt text, caption, title or `llms.txt` line transcribes them); the card image keeps `alt=""` because the link names the video. Only `LYRIC_LINES` are quoted as text.
- **Mock-up folder size (4.0 MB).** Accepted for the record, as the conductor said.

## Conditions per change

### 1. Watch him play: pass with changes

What holds: one player for the site; nothing from YouTube in the page before a press (I checked `home.html` and `about.html`: every `src` is local; YouTube appears only in `href`s and in the iframe the script creates on click); without JS each card is a plain link to `youtube.com/watch?v=<id>`; the player is a `<dialog>` opened with `showModal()`; closing removes the iframe; `youtube-nocookie.com` with `rel=0`. The band film in the hero is the right first film: its frame shows him with guitarists and a drummer.

1.1 **Group by `VIDEOS[].format`, not by the mock-up's lists.** The mock-up files the seven Alvor FM single songs under "On his own". Their poster frames all carry the **Choque Frontal ao Vivo** mark (contact sheet, row 2 to 4), the show of 13 December 2023 that `GIGS` and `own-choque` give as "with his band", and the S85R1WgyKJ0 frame shows the band. The writer has since recorded them as `format: 'band'`, `formatBasis: 'inferred'` (c425acd). So: "With the band" holds S85R1WgyKJ0 (large), q2P-ScNIL7w, then the seven songs as a rail captioned from `VIDEOS[].caption` ("<song>, live at Choque Frontal ao Vivo, Portimão"); "On his own" holds OyvGbs1fg7g only. The rail heading says what is true: "Song by song from the same show, filmed by Alvor FM". Do not write that the band plays on each song: the frames show only him.
1.2 **Captions and sub-lines from `VIDEOS` only.** Remove words the facts do not hold: "Full set" (S85R1WgyKJ0) and "Solo set" (OyvGbs1fg7g) are not in `VIDEOS`; use `caption`, `event`, `place` and `date` (and "Alvor FM" from `channel`). "Voice and acoustic guitar" in the solo heading is not in `FORMATS`; use `FORMATS` as written ("1 musician, 2 technical crew, indoor"). The Sons no Castelo date is 7 August 2026 (`date`, from `epo-castelo`, `avoz` and the frame's "Dia 7"), not "August 2026"; the published date is 28 August 2026, and the page must not mix the two. Six of the seven songs have `date: null`: show no date for them.
1.3 **OyvGbs1fg7g as "solo" rests on the frame alone** (him alone in frame, an acoustic festival). That is enough to file it under "On his own", but mark it as the other inferred formats are: the writer adds `formatBasis: 'inferred'`, or someone watches the film and records "seen in the film". Until then the caption may say what the frame shows ("Alone with his guitar") but the heading must not say "a solo set" as a fact.
1.4 **Duo, honestly.** Replace "No duo film is listed yet" with "We have not found a film of him as a duo yet." ("listed" suggests a list exists somewhere.) Keep the duo row and its "Book" button: the format is real (`FORMATS`, `epopeia`).
1.5 **Sessions.** Captions from `VIDEOS[].caption` (the writer's: "Lie To Me, at home on the green sofa", "Sunshine, on the green sofa among trees", "Mother, on the sofa on a seafront promenade", "Towers and Bridges, by a lighthouse on a jetty"). No place names (none is sourced). The lead "then taken outdoors" goes unless the writer adds it to the facts as seen in the frames.
1.6 **Filter chips.** `aria-pressed` is not allowed on a link. Without JS they are anchor links; when the script runs it turns each into `<button type="button" aria-pressed>` (or gives it `role="button"` and handles Space). The pressed state must not rely on colour alone (it does not: fill plus text colour, 8.99:1).
1.7 **Song-row chips (change 5).** The accessible name must contain the visible label (WCAG 2.5.3): "Live: play Marc Noah - Lie To Me, Alvor FM", "Sofa: play Green Sofa Session #1 Lie To Me", "Lyric video: play ...". Each name must differ within a row.
1.8 **The player.** Heading and iframe `title` use our label, not the bare YouTube title (OyvGbs1fg7g is titled only "Marc Noah"): "<song or event>, <channel>, YouTube". On close, focus returns to the card or chip that opened it (set it explicitly; do not rely on the browser). The "Open on YouTube" link stays in the dialog. q2P-ScNIL7w is a vertical film: the player must not crop it.
1.9 **Posters.** Self-hosted under `src/assets/video/`, 480 px for cards and rails (960 px only for the two large cards), `loading="lazy"`, width and height set; nothing from `i.ytimg.com` at run time. The home must not load all 21 posters in the first screen. The frames keep their channel marks (Vevo, Alvor FM).
1.10 **Credit for the stills** (they are not Epopeia's photographs): see 8.2.
1.11 **Markers.** Each group carries the markers of the facts it states: `FORMATS_SRC` for the format line; each card's `src`, `eventSrc` and `dateSrc` in the group's marker set; `yt-frames` wherever a caption or format rests on the frame. The writer's NEEDS question about the seven songs goes to Marc through Dinis.

### 2. Designs pop-up: pass with changes

What holds: a real `<dialog>` labelled by its heading, Close as a `form method="dialog"` button, Esc closes, the preview images have `alt=""` and each card is one link named by the design, "Showing" on the current one, a link to `/d/` without JS.

2.1 The button is a real link to `/d/` in the HTML (the mock-up has `href="#"`).
2.2 Focus returns to the Designs button on close; the backdrop click closes only when the click is outside the dialog's box (test against the dialog's bounding rectangle, not `e.target === dialog`, which also fires on the dialog's own padding).
2.3 Tags: on the built site Editorial is the home, so its tag is "Home" (not "Proposed home"); Coast becomes "Home in round 1". On every main page (not only `/`), Editorial carries "Showing" and `aria-current="page"`, since every main page uses its system.
2.4 The previews are rendered by the build from the current pages on every release. The mock-up's Tour Poster preview reads "Has played them in 25 places since 2023", a round 1 figure; a preview must never show a figure the facts no longer give.
2.5 The six previews are `loading="lazy"` inside the closed dialog and under 40 KB each, as proposed. Round 1 follow-up 4 applies to the five older designs now that the pop-up leads people to them (see "Carried forward").

### 3. Photo hero, Editorial: pass with changes

What holds: chair-dark is from `data/photos.mjs` with its alt; the play action is in the first screen at 390 x 844 and 1366 x 768; the line and its markers are `HERO.line`; `/d/coast/` keeps round 1.

3.1 **Contrast on the photo fails in the mock-up and must be fixed.** Measured on mock-up pixels: at 390 px the eyebrow (accent, 12 px) sits over his arm and vest at about **3.5:1** (rows 352 to 370), not the 7:1 the proposal states; at 1366 px the name "Marc Noah" runs over his arm and clasped hands, with background pixels from (129, 134, 127) to (143, 152, 149), about **2.5 to 3.2:1** against `#f2ede6`, below even the 3:1 for large text. Fix by keeping all hero text over the dark part of the gradient (at 390 px the gradient at least 0.88 opaque behind the eyebrow; at 1366 px a narrower name, or the photo set further right, so the name ends before his arm) and measure every hero text pair at 4.5:1 on the build, at both widths, as the proposal's own acceptance asks.
3.2 `/d/editorial/` carries `rel="canonical"` to `/`, as `/d/coast/` does today.
3.3 The eyebrow uses `PERSON.tagline` ("Singer-songwriter, Algarve"), which names no town, so it needs no marker; if Quarteira is added back (as in `HERO.kicker`), its markers (`own-site`, `dinis`) come with it.
3.4 The photo credit shows on the home (change 8 covers it in the footer).

### 4. Dark system: pass with changes

Computed, confirming the proposal: text 16.5 / 15.0 / 13.8:1 on background / surface / raised surface; muted 8.75 / 7.98 / 7.30; faint 6.33 / 5.77 / 5.28; accent 9.25 / 8.43 / 7.72; text on accent 8.99; map labels 12.47. All pass 4.5:1 on solid surfaces. System fonts only, no font request: good.

4.1 The line colour `#2a3440` is 1.52:1 on the background. Where a border is the only thing that shows a control's edge and the control has no text inside it, raise it to at least 3:1 (for example `#5b6774`, about 3.2:1 on `#0b0f14`); outline buttons with text inside may keep it. The focus ring stays the accent (9.25:1).
4.2 Text on photographs is measured on the photographs, not on the tokens (see 3.1, 6.1, 7.2). The faint colour is for solid surfaces only.
4.3 Lyric lines: only from `LYRIC_LINES`, exactly as stored (his spelling, his double space in the Lie To Me line may collapse in HTML, which is fine), never joined, each with "From <song>" and the `own-site` marker, as the mock-ups show. Never more than these four lines anywhere (home, /about/, /songs/, `llms.txt`, `index.md`).
4.4 `theme-color` `#0b0f14`; `color-scheme: dark`. The wording check passes.

### 5. Spotify: pass

The facade is a link to the album on Spotify without JS; the iframe comes only on a press, 352 px tall, with a title naming the album; the button's name begins with its visible text ("Play the album Giant Little Victories on Spotify"). The developer checks the network log as the proposal's acceptance says.

### 6. Photographs on /about/ and /songs/: pass with changes

What holds: every photograph is one of the 13 in `data/photos.mjs`; alt text from `PHOTOS`; captions say what the picture shows (no "Quarteira" from a file name); the credit line under the gallery; Portuguese in `lang="pt-PT"`; the lyric lines attributed.

6.1 **The quotation band fails contrast at 390 px.** Over towers-bridges-clouds, the eyebrow "In his own words, on Giant Little Victories" and the first lines of the quote sit on near-white sky (pixels up to 255, 255, 255), about **1.3:1**. At 390 px place the photograph above the text, or make the overlay at least 0.9 opaque behind every line of text; measure on the build. The same at 1366 px.
6.2 "Hear it: Roadtrip · Video · 3:37" labels the track length as the video's length. Say "Song, 3:37" or drop the length. That button opens the video in the player like every other film, not a new tab.
6.3 The writer's `BIO_EN.paras` and `OWN_DESC` (his own description, Portuguese with our translation) are not in the /about/ mock-up. Either use them (the copy asks for them on /about/) or the developer records why not in the build notes. If used, `OWN_DESC.pt` keeps `lang="pt-PT"`.
6.4 The gallery's links open the 1600 px files from our own assets; the 800 px files serve under 700 px; the "Photos will be added" note goes in the same release (round 1 follow-up 5).

### 7. /live/ and booking: pass with changes

What holds: the address only as `CONTACT.email` with the `own-contact` marker, as a `mailto:` link; formats from `FORMATS` with `FORMATS_SRC`; the five stages from `STAGES`; "our count" kept; the films before the list of dates.

7.1 The count markers: one marker, on the conditions under "Decisions asked of me".
7.2 **The band over live-acoustic fails for the markers.** With the photo at 0.38 opacity and the overlay at 0.55 at 30 % height, a light pixel gives a background near (53, 55, 58): faint markers about **3.9:1**, muted 5.4:1, accent 5.8:1. Raise the overlay to at least 0.7 wherever text sits (faint then about 4.75:1), or set markers on that band in the muted colour; measure on the build.
7.3 The count sentence says "listed by his label, his own site and the press"; the count also includes the 9.º Festival Acústico, which rests only on Alvor FM's video (`yt-acustico`). Writer: add "and Alvor FM" (or "and a radio station's video") to `LIVE.count`.
7.4 "His artist page at Epopeia" and the address are block links at least 44 px tall (round 1 follow-up 2 for the old inline "his artist page" in "Coming up").

### 8. Header and footer: pass with changes

What holds: the photo credit line with its marker on every page that shows a photograph; the old "No photos, audio or lyrics are copied here" goes; /sources/ gains "Photographs and video"; the footer links stay.

8.1 The old line and the /about/ "Photos will be added" note change in the **same release** as the first photograph (round 1 follow-up 5). `FOOTER.noCopies` as the writer now has it is true; keep it.
8.2 **Video stills need their own credit and licence line.** The posters are each video's own YouTube frame, from marcnoahVEVO, Alvor FM and his own channel, not Epopeia's photographs, and `PHOTO_CREDIT` does not cover them. Add one line (writer's words), for example "Video stills: each video's own YouTube frame, from its channel. Not covered by this site's licence.", with the `yt-frames` marker, wherever stills show; and the licence line ends "the photographs and video stills are not covered". /sources/ "Photographs and video" says on whose word each is used (Dinis, 22:45 to 23:25 UTC, `team/WORKFLOW.md`), and lists `yt-frames` as a source viewed, not loaded (it must be a link there, never an `<img>`).
8.3 "His own site" in `LISTEN` links to marcnoah.pt, which could not be reached on 17 November 2026 and is an open NEEDS question. Until Marc answers, link the Arquivo.pt copy (`own-site`) and say "archived", or leave the link out.
8.4 The header Designs button is at least 44 px at both widths and on the first row at 390 px, as mocked.

## Carried forward from round 1 (all for this release)

1. **Small inline links** (LIVE follow-up 2): "the sources page" in the read-date note on every page (17 px in round 1, still inline in the mock-up) and "his artist page" in /live/ "Coming up" (19 px): pad to 44 px or make them block links.
2. **/sources/ heading order** (follow-up 3): the source groups become `h2` (round 1 had `h1` then `h3`). The new "Photographs and video" and "Our own counts" parts are `h2` too.
3. **Older designs' source links** (follow-up 4): `cite()` links of 15 px in the five older designs and the 17 px `/d/coast/` design footer links. The pop-up now sends people there; bring them to the 24 x 24 px marker system and 44 px footer links in this release, or the developer declares it open in the build notes with the count of affected links.
4. **The footer line about no photos copied** (follow-up 5): must change in the same release as the photographs (8.1).
5. Still open for Marc through Dinis: per-song writing credits; a Portuguese version; whether he is happy with the four lyric lines; whether marcnoah.pt is live.

## For the conductor

- Three text-on-photo places fail contrast in the mock-ups (hero at both widths, the /about/ quotation band, the On stage band). None needs a new design, only stronger overlays or moved text, but each must be measured on the build before release.
- The mock-up filed the seven Alvor FM songs as solo; their frames say Choque Frontal, a band show. The writer's c425acd already fixes the data; the build must group by `format`.
- Video stills are a second kind of borrowed image and need their own credit and licence line (8.2).
- My POLICY's N5 still reads "Copy images, audio or lyrics from another site ... Marc and Dinis have not cleared any". Since 22:45 to 23:25 UTC Dinis has cleared the label's photographs, embeds, poster stills and short lyric lines (`team/WORKFLOW.md`). The policies (mine and the other roles') should say what is cleared and what is not; only you may change them. I reviewed against WORKFLOW.md, the stricter current record of Dinis's words.
- After the build I will check in LIVE.md: the network log before any press, the dialogs with keyboard only, every text pair on photographs at 390 and 1366 px, and that no photograph or still comes from anywhere but our own assets.
