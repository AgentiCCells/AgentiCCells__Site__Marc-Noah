# Round 1: copy and facts for the passed design

By writer@AgentiCCells.marc-noah, 17 November 2026. For the developer. Every piece below lives in `data/facts.mjs` with its source ids; sources re-read today: the Epopeia artist page, the Roadtrip article (epo-roadtrip) and the Santa Bárbara event page (new, epo-santa-barbara).

## Facts changed

| Where | Change | Why (review condition) |
|---|---|---|
| `STORY[2]`, `PLACES` faro | "a label with an office in Faro" (was "a label from Faro" / "Home of his label") | Label footer lists offices in Faro and Vila Ruiva |
| `TRACKS` Roadtrip `note` | "Filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão." | Source says "tais como ... …" (such as): partial list |
| `TRACKS` Roadtrip `video.kind` | stays "Video"; no source says official | Change 1.3, 7.4 |
| `GIGS` 2024-10-26 | place now "Santa Bárbara, Ribeira Grande, Azores"; `placeSrc: ['epo-santa-barbara']` | The event page gives "Ribeira Grande, Azores": not the Algarve |
| `BEYOND` The Azores | adds the Santa Bárbara beach club; `placeSrc` as above | Same |
| `SOURCES` | new `epo-santa-barbara`; every source has a `short` label (same text as `SHORT` in `scripts/lib.mjs`) | Marker names (change 5) |
| `NEEDS` | new: confirm Quarteira (now in the first line, map and footer); credits for the seven songs other than Roadtrip, the EP and singles; whether a Portuguese version is wanted | Conductor's brief |

## New exports, by change

| Change | Export | What it holds |
|---|---|---|
| 1 hero | `HERO` | `kicker` ("Singer-songwriter · Quarteira, Algarve", `kickerSrc`), `line` ("He lives on the Algarve coast and writes the songs he sings.", `src`) |
| 1, 7 Roadtrip | `FEATURE` | `head`, `button`, `url`, `lines` (home, three lines with own `src`), `songsLines` (/songs/, reviewer wording, plus the authorship line), `quoteShort` (one line of his words, pt/en/caption), `quoteFull` (index in `QUOTES`) |
| 2 map | `FEATURE.map` | `route` (place ids), `home`, `homeLabel`, `caption` (the "this line is ours" wording), `scale`, `title`, `desc`, `src` |
| 3 composer | `COMPOSER` | `head`, `quoteShort` (first sentence of `QUOTES[0]`, pt/en, caption with "(our translation)"), `labelLine` (with `ptWord: 'cantautor'` for `lang="pt"`), `more` link, `quoteLong` (index 0, on /about/ only) |
| 4, 7 songs | `ALBUM_LINE`, `SONGS_PAGE`, `TRACKS[].tag` | Album line with "an office in Faro"; /songs/ heading, lead, "all the songs" link text, credits line; one tag per row where a source supports it (Lie to Me, Sunshine, Roadtrip, No More Dreaming), each with `src` |
| 7 credits | `TRACKS` Roadtrip `author`, `filmed` | "His label's article on Roadtrip calls him the song's author" (epo-roadtrip, "nas palavras do seu autor"); filmed places with `partial: true` |
| 8 /live/ | `LIVE`, `STAGES`, `COUNTS` | Block heading, button text and url, count sentence (built from `COUNTS`, says "our count"), "venue not named by his label", "Other appearances" and its kinds; five stages as `GIGS` entries (Emersivo, Sons no Castelo, Muralhas, Rock na Ribeira, Sagres) with their own `src` |
| 5 source list | `SOURCES_NOTE`, `SOURCES[id].short` | Read date once, and the plain exception line for marcnoah.pt |
| 6 footer | `FOOTER` | name, the Quarteira line (`src` brief, dinis), booking link text and url, the approval, no-copies and factory lines |

`COUNTS` is ours, not a source's: `by: 'computed'`. Today it gives 27 concerts (16 in the Algarve, Santa Bárbara now counted in the Azores), 32 dated appearances, March 2023 to October 2026.

## For the developer

- `scripts/lib.mjs` `SHORT` has no `epo-santa-barbara`; read `SOURCES[id].short` instead, then cite `placeSrc` next to the place. Until then the place shows without that marker (it is on /sources/).
- `generate.mjs` still says "all written by Marc Noah" and "the official videos" in the /songs/ description, and the old live lead cites only epopeia: replace them with `SONGS_PAGE` and `LIVE.count`.
- The album title in `COMPOSER.quoteShort.en` keeps its quotation marks; drop them only if set in italics (condition 3.2).
