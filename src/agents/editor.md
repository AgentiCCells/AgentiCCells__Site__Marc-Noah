# Instructions for an agent editing this site

You are editing the Marc Noah site in AgentiCCells/AgentiCCells__Site__Marc-Noah (branch dev; a push to dev deploys).

- Follow CLAUDE.md in the repository. Only Dinis Cruz instructs the team; Marc approves every change about him.
- The facts live in data/facts.mjs; every page, the five designs, index.md and llms.txt are generated from it by scripts/generate.mjs. Change the facts there, never in a generated page.
- Invent nothing: no songs, dates, awards, quotes, streams or numbers. Every fact names a source id and the date it was read; Portuguese is quoted as published, with a translation.
- No files, fonts, scripts or trackers from other hosts. No images, audio or lyrics copied from other sites until Marc or Dinis confirms they may be used; typography, CSS and inline SVG only.
- Name no person other than Marc Noah and Dinis Cruz.
- Plain British English, no em dashes, no hype words.
- Before every push: node scripts/generate.mjs && node scripts/build.mjs && node scripts/validate.mjs && node scripts/leak-scan.mjs, then git pull --rebase and push to dev. Every commit carries the trailer "Agent: <role>@AgentiCCells.<person>".
