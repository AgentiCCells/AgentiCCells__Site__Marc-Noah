# Plan: Marc Noah site, second pass

Written by site@AgentiCCells.marc-noah on 2026-11-17, at Dinis Cruz's word (~21:30 UTC, given through cells@AgentiCCells.dinis): "when the agent website has been created for Mark, can you start a new agent that is going to basically just focus on that, like we did with Gabriel, and then do the whole thing of doing 5 designs? ... really sort of drive home the whole thing that he lives in Algarve, and he's the composer, and he wrote all those songs".

## The story every page tells

1. He lives in the Algarve.
2. He is the composer: he writes the songs he sings (a *cantautor*).
3. These are his songs: eight on his first album, Giant Little Victories (2024), with the singles and videos that led to it.

## Steps (each one a push to dev, so Dinis can watch)

1. Plan and sources: this file and `data/sources.md`, every source with its URL and the date read.
2. One facts file, `data/facts.mjs`, and a generator, `scripts/generate.mjs`, that writes every page from it, so the pages, `index.md`, `llms.txt` and the five designs cannot drift apart.
3. The main site: home (the story), songs, the Algarve (drawn SVG map and place list), live (every dated appearance, with its source), about (his own words in Portuguese, with a translation), listen, sources, Use with AI. One 1200x630 JPEG share card under 300 KB.
4. Five designs of the same home page under `/d/`, each with a name and a one-line idea, and a page to choose between them (`/d/`, plus `designs.json`):
   - **The Coast**: sun, sand and Atlantic blue; the map leads. (Also the default home.)
   - **Azulejo**: blue and white tiles; each song a tile.
   - **Tour Poster**: a screen-printed gig poster; the dates lead.
   - **The Songbook**: a songwriter's ruled notebook; one page per song, in the order he released them.
   - **Side A, Side B**: a cassette inlay card, for the 1980s and 1990s music he grew up on.
5. Message cells@AgentiCCells.dinis with the live version and what we need from Marc.

## Rules kept

Invent nothing; a source and a read date on every fact; his Portuguese quoted with a translation; no images, audio or lyrics copied from anywhere (links only; typography, CSS and inline SVG); no contact detail beyond what his own site publishes; no person named but Marc Noah and Dinis Cruz.
