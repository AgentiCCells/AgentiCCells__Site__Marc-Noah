# Hand-over: conductor.marc-noah@AgentiCCells.dinis, 2026-11-17

## Brief

Started by cells@AgentiCCells.dinis at Dinis Cruz's word (about 22:00 UTC): a dedicated conductor and team, with a policy for each role, running rounds of design and development to take Marc Noah's website "to the next level". Story to drive home: he lives in the Algarve, he is the composer, he wrote these songs. Every later word from Dinis is in `team/WORKFLOW.md` with its time.

## State

- Live: https://marc-noah.agenticcells.site (check `/version.json`). Three rounds done; reports in `team/rounds/1.md`, `2.md` and `3.md`, each with before and after screenshots. Round 3 (v0.1.33) brought his photographs and films into the other five designs, at Dinis's request.
- The team: `team/<role>/ROLE.md` and `POLICY.md` for conductor, designer, critic, reviewer, writer, developer, named `role.marc-noah@AgentiCCells.dinis`. Policies are proposals (0.1.2) in the AgentiCCells ABP format, checked by `scripts/abp-check.mjs` inside `validate.mjs`. `team/scopes.json` and `scripts/role-scope.mjs` fail a release whose commit touches a path outside its role.
- The site: generated from `data/facts.mjs` (facts, each with a source and read date), `data/photos.mjs` (13 photographs from his label, cleared by Dinis with Marc's authorisation, credited to Epopeia Records) and `scripts/generate.mjs` and `scripts/designs.mjs`. /behind-the-scenes/ is generated at build time by `scripts/behind.mjs` from `team/` and git log.
- Home: the Editorial design (photo-led, dark), videos as the centrepiece (21 films, click to play, posters hosted here), a designs pop-up on every page (six designs), Spotify album player, booking with the contact his own site publishes.

## Open

- Round 3 follow-ups: Songbook track numbers at 2.04:1; empty space beside the tour artwork on Tour Poster at 1366 px.

- For Marc, through Dinis (also in the questions list on the site): which photograph leads; whether the Alvor FM single-song films are from the band show (our inference from their frames); songwriting credits beyond Roadtrip; a Portuguese version; whether marcnoah.pt is still his site.
- Not checked: the Sons no Castelo film's orientation (nobody played it); six Alvor FM films have no date (YouTube refused the lookups).
- Known limit: once a YouTube film takes focus, Esc does not close the player (a cross-origin iframe); Close is first in the dialog and one Shift+Tab away.
- Reaching sources: marcnoah.pt and web.archive.org cannot be reached from this environment; Arquivo.pt can. Cutting frames from the videos was refused by this session's permission check; the site uses each video's YouTube poster frame instead.
- Policy gaps (in each POLICY.md): sub-agents inherit every tool of the conductor's session; one signing key for all roles, so the Agent trailer is self-asserted; `dev` is unprotected, so the gates run after a push and before deploy.
- One earlier public commit (16f729e) names a photographer in a file name; current files do not. History was not rewritten.

## How to run another round

Read `team/WORKFLOW.md`. Write the aim at the top of `team/rounds/N.md`, take before screenshots with `node scripts/shots.mjs`, then run critic, designer, reviewer, writer, developer as sub-agents, each briefed with its ROLE.md and POLICY.md; release with `scripts/release.sh`; reviewer checks live; write the report; one line to cells@AgentiCCells.dinis.
