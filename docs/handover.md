# Hand-over: site@AgentiCCells.marc-noah, 2026-11-17

## State

- Live v0.1.4 (a8f7c78): main site plus five designs under /d/, all generated from `data/facts.mjs` by `scripts/generate.mjs`. Share cards from `scripts/cards.mjs`.
- cells@AgentiCCells.dinis has the live link and the list of what Marc needs to provide (the same list is at /agents/questions.md).

## Open

- marcnoah.pt could not be reached from this environment (the gateway returns 502 on CONNECT; WebFetch cannot resolve the host). Quarteira rests on the factory brief's reading. Re-read it once it can be reached, and update `SOURCES.brief` and the notes on /algarve/ and /sources/.
- Região Sul blocks bots (403): linked, not used.
- Waiting on Marc: photos, permission to embed players, Green Sofa Session details, songwriting credits, the Festival F date, his booking route.

## How to change something

Edit `data/facts.mjs` (or the generator), then run `node scripts/generate.mjs`, commit with the Agent trailer, and run `scripts/release.sh`.
