# Round 2 copy: his own site via Arquivo.pt, videos to embed, biography

writer@AgentiCCells.marc-noah, 17 November 2026. Every fact below is in `data/facts.mjs` with a source id and the date read (2026-11-17); each source is listed in `data/sources.md`.

## What changed

- **His own site is read.** marcnoah.pt still cannot be reached live, so we read the copies kept by Arquivo.pt (captured 2024-02-07 to 2025-12-15). New source ids: `own-site` (Sobre, 2025-12-15), `own-contact`, `own-gss`, `own-agenda` (2024-02-07), and seven press pages (`own-ttb`, `own-espiga`, `own-espiga2`, `own-cachopo`, `own-choque`, `own-nye`, `own-nye2`, captured 2025-03-11).
- **Quarteira and his influences now rest on his own words** (`own-site`) in STORY, HERO, FOOTER, PLACES and the map. `brief` stays in SOURCES as a secondary reading and is no longer cited.
- **Contact:** BOOKING now gives geral@epopeia-records.pt, the one address his own site publishes (`own-contact`), alongside his Epopeia page.
- **Green Sofa Session:** released at the end of 2023; three songs (Lie to Me, Sunshine, Mother), each in a studio and a live version; his first physical release.
- **Dates:** 14 new GIGS from his archived agenda, press pages and Alvor FM videos, 2022 to 2024. Festival F now has a date: Faro, 9 September 2023 (`own-agenda`). Private shows are left out; so is "Saison, Manchester" (13 October 2023), whose place is unclear. Our concert count goes from 27 to 40 (26 in the Algarve). Cachopo carries `algarve: true` because it is not on the map.
- **Two new quotes from him** (QUOTES): on writing To The Bone (`own-ttb`), and on the green sofa (`own-gss`). Both are prose, not lyrics.
- **Lyric lines:** Dinis cleared these at about 23:10 UTC on 2026-11-17 (relayed by the conductor): "Yes, you could also quote lyric lines because he actually has some great lyrics." LYRIC_LINES holds only the four short lines his own site uses as headlines on /sobre, exactly as published (his spelling and spacing kept). No full lyrics. I found no other lyric lines on his archived pages.
- **His label's page, re-read:** nothing new in the text about the Autumn Leaves tour, the Quarteira session or an interview. One new press line is recorded (PRESS, from Algarve Informativo, issue 407, as the label quotes it).
- **NEEDS:** I took out the items that are now answered (reading his site, the date of Festival F, permission for photos and embeds). New questions: how to credit photographers; which photo he wants first; whether he is happy with the lyric lines; whether to mention his Tavira roots; whether marcnoah.pt is still live.
- FOOTER.noCopies now says that the photographs come from his label, used with permission, and that lyric lines are quoted only as his own site shows them.

## New exports in data/facts.mjs

| Export | What |
|---|---|
| `BIO_EN` | The English biography: `paras` (three short paragraphs for /about/) and `short` (one paragraph for home), each with its sources. |
| `OWN_DESC` | His own description from his Sobre page, in Portuguese, with our translation. |
| `LYRIC_LINES` | Four lyric lines: song, text, `own-site`, captured 2025-12-15. |
| `VIDEOS`, `VIDEOS_NOTE`, `VIDEOS_SRC` | The videos to embed (below). |
| `PRESS` | One press line, quoted, with our translation. |
| `CONTACT` | geral@epopeia-records.pt, with his site's wording and our translation. |
| `BOOKING.email`, `BOOKING.emailSrc` | The same address on the booking object. |
| `SOURCES_NOTE.archived` | A line for the sources page explaining the Arquivo.pt copies. |

## Biography (BIO_EN.short, for home)

> Marc Noah is a Portuguese-Australian singer-songwriter based in Quarteira, in the Algarve. Shaped by the music of the 1980s and 1990s, he released the EP Green Sofa Session at the end of 2023 and his first album, Giant Little Victories, in November 2024 on Epopeia Records.

Sources: own-site, epo-glv, apple, epopeia. For /about/, use `BIO_EN.paras`. They quote his own Portuguese ("músico cantautor"; "fortemente influenciado pelas sonoridades dos anos 80 e 90") with our translation in brackets. Show `OWN_DESC` next to them as his own words: Portuguese in `lang="pt-PT"`, with the translation.

## Videos (VIDEOS)

All IDs, titles and channels come from YouTube's public oEmbed, read 2026-11-17. A dash means not read.

| ID | Title (as YouTube gives it) | Kind | Channel | Published | Recorded / event |
|---|---|---|---|---|---|
| adbD0f2FYLA | Marc Noah - Roadtrip | official | marcnoahVEVO | 2025-03-12 | - |
| ll9tQ_BhrCA | Marc Noah - To The Bone (Official Lyric Video) | official | marcnoahVEVO | 2024-06-12 | - |
| K8795UoBqTg | Marc Noah - Towers & Bridges | official | marcnoahVEVO | 2023-11-04 | - |
| JMd-r6okn80 | Marc Noah - Mother - Official Lyric Video | official | marcnoahVEVO | 2023-08-27 | - |
| SaiC6jdsCy8 | Marc Noah - Sunshine - Official Lyric Video | official | marcnoahVEVO | 2023-05-05 | - |
| oyE1KP8hUFU | Marc Noah - Lie to Me - Official Music Video | official | marcnoahVEVO | 2023-03-04 | - |
| wvsYVb5d1xQ | Marc Noah - Lie to Me - Official Lyric Video | official | marcnoahVEVO | 2023-02-23 | - |
| S85R1WgyKJ0 | Marc Noah no Choque Frontal ao Vivo | live (full show) | Alvor FM | 2024-01-04 | 2023-12-13, TEMPO, Portimão |
| OyvGbs1fg7g | Marc Noah | live (full show) | Alvor FM | 2024-01-14 | 2023-10-04, 9.º Festival Acústico, TEMPO, Portimão |
| QyZMI8sPgow | Marc Noah - Lie To Me | live | Alvor FM | 2024-01-04 | 2023-12-13, Choque Frontal ao Vivo |
| f__TLj6ccQI | Marc Noah - No More Dreaming | live | Alvor FM | - | - |
| GdY-l97_vCU | Marc Noah - To The Bone | live | Alvor FM | - | - |
| RgJHbdZNpLM | Marc Noah - Sunshine | live | Alvor FM | - | - |
| 0u0iQvyGcCg | Marc Noah - Mother | live | Alvor FM | - | - |
| ANPCpT8ufMA | Marc Noah - Towers & Bridges | live | Alvor FM | - | - |
| JB0jvIitE9I | Marc Noah - Slowtalk | live | Alvor FM | - | - |
| ZBwgJ7Lg7-o | Green Sofa Session #1 Lie To Me | session | @marcnoahmusic | - | - |
| 5H8PBg1tQHc | Green Sofa Session #2 Sunshine | session | @marcnoahmusic | - | - |
| RRTVycYkcOo | "Mother" Green Sofa Sessions | session | @marcnoahmusic | - | - |
| 6yUpmlZzrk0 | Sofa Sessions #4   Towers And Bridges | session | @marcnoahmusic | - | - |
| q2P-ScNIL7w | Concerto Marc Noah - Sons Do Castelo Agosto 26 | live | @marcnoahmusic | 2026-08-28 | Sons no Castelo, Loulé, August 2026 |

Notes for the developer:

- The Alvor FM single-song videos came from a YouTube search for "Marc Noah Alvor FM". YouTube then refused further page reads (rate limit), so their event and date are not read. Label them "Live, Alvor FM" with no date. Do not say which festival they come from.
- The two full shows give dates for GIGS: 9.º Festival Acústico (4 October 2023) and Choque Frontal ao Vivo (13 December 2023). Both are at TEMPO, Teatro Municipal de Portimão.
- Load every embed from youtube-nocookie.com, and only when the visitor presses play (EMBEDS.youtube in data/photos.mjs).

## Not done

- No Spotify track IDs were added. EMBEDS already covers the album and the artist.

## Video formats, events and captions (change 1)

writer.marc-noah@AgentiCCells.dinis, 17 November 2026. Each `VIDEOS` entry now has `format`, `caption`, and where known `event`, `place` and `date` (the performance date; `recorded` is renamed `date`), each with a `*Src` list. New source `yt-frames`: the videos' own poster frames, viewed for what they show.

| Format | Videos | Rests on |
|---|---|---|
| band (9) | S85R1WgyKJ0 (Choque Frontal, 13 Dec 2023), q2P-ScNIL7w (Sons no Castelo, Loulé, 7 Aug 2026), and the seven Alvor FM single songs | frames; for Sons no Castelo the stage screen reads "Dia 7 Marc Noah" (epo-castelo, avoz) |
| solo (1) | OyvGbs1fg7g (9.º Festival Acústico, 4 Oct 2023) | frame: him alone on stage |
| session (4) | the Green Sofa Sessions | own-gss; settings as seen: at home (his living room, own-gss), among trees, a seafront promenade, a jetty by a lighthouse. No place named. |
| official (7) | the Vevo videos | youtube |

No video shows the duo, so nothing is filed as duo.

**A correction to the brief.** The seven Alvor FM single-song frames each carry the "Choque Frontal ao Vivo" mark, and show the same stage and shirt as the band set. They are clips of his band show, filmed close on him, not a solo set. I filed them `band`, marked `formatBasis: 'inferred'` with a note. The design's "On his own" rail of seven Alvor FM songs should hold only OyvGbs1fg7g unless Marc says otherwise (new question for Marc).

**Dates.** A second gentle try at the six undated single-song pages was refused again by YouTube (a "sorry" page); oEmbed gives no date. They stay `date: null`, with a note that the frame matches the 13 December 2023 show. Lie To Me keeps its read date.

**Captions** are our own, under 12 words, e.g. "His set with his band at TEMPO, Portimão"; "Alone with his guitar at the 9.º Festival Acústico, Portimão"; "Towers and Bridges, by a lighthouse on a jetty".
