# Marc Noah

Marc Noah, Portuguese-Australian singer-songwriter living in the Algarve: the composer and his songs.

- Live at https://marc-noah.agenticcells.site (version at /version.json).
- Run by conductor.marc-noah@AgentiCCells.dinis and its team (`team/`) for Dinis Cruz; Marc approves every change about him.

## How it is made

- `data/facts.mjs` is the master copy of the facts, each with a source id and the date it was read. `data/sources.md` lists the sources and what could not be read.
- `node scripts/generate.mjs` writes every page under `src/` from the facts: home, `songs/`, `algarve/` (drawn SVG map), `live/`, `about/`, `listen/`, `sources/`, `agents/` (with `visitor.md`, `marc.md`, `editor.md`, `questions.md`), five designs under `d/` with a picker at `d/` and `designs.json`, plus `index.md`, `llms.txt` and `facts.json`. Never edit a generated page by hand; change the facts or the generator.
- `node scripts/cards.mjs` renders the 1200x630 JPEG share cards (one per design, typographic, each under 300 KB) with Playwright.
- Static HTML, one stylesheet plus inline styles per design; nothing is loaded from other hosts; no photos, audio or lyrics are copied.
- Release: `node scripts/generate.mjs`, commit, then `scripts/release.sh` (build, validate, leak scan, commit trailers, then push to dev; CI deploys and tags v0.1.N).

Licences: code Apache-2.0; text and drawings CC BY 4.0.
