# Night Cove Files — Nightmare Circus

A portable, complete browser investigation for Taste My Nightmare. Entry: `dist/index.html`. No dependencies, build, backend, account, external fonts, or remote asset requests. Modern browsers with native HTML dialog support are required.

The runtime includes 27 dated sources, six evidence-supported deductions, staged source requests, search, pinning, a chronology puzzle, evidence-supported final reconstruction, family closure, and the Voice supplement. Five other files are clearly marked coming soon.

The downloadable folder contains the contents of dist under `night-cove-files/`, plus install and play-test instructions. Keep creator solution notes outside the publicly hosted folder. The 2016 case is an unofficial, non-canon Coraline fan story.

## Source structure
- `dist/index.html`: semantic shell and archive cabinet.
- `dist/css/game.css`: responsive room, document reader, controls, contrast, print, and reduced-motion styles.
- `dist/cases/nightmare-circus.js`: all case sources, characters, deductions, and chronology.
- `dist/js/rules.js`: availability, evidence checks, finale, and save validation.
- `dist/js/app.js`: interface, focus, local saves, export/import, and optional sound effects.
- `dist/assets/`: archive and circus set artwork.
- `tests/case-rules.cjs`: meaningful rules, reachability, negative-path, and save-restoration checks.
- `docs/`: installation, play-test, and creator material.

Run rule verification with `node tests/case-rules.cjs`. The static game also works when index.html is opened directly; browser local-file storage behaviour varies, so use exports or a static site for reliable continued play. Origin changes create a new storage location. Export and import transfer a save.

All player notes remain in the browser. Imported notes are escaped before rendering. Imported data is capped and validated against the case schema. A save is for convenience, not anti-cheat or authentication. As a static game, the solution exists in client-side source.

## Verification
27 October 2026: rules passed for every reachable deduction, wrong and incomplete source sets, gated finale, and malformed save restoration. Browser run completed all six findings, rejected an incorrect explanation and incorrect final suspect, completed chronology and Voice recovery, persisted notes across reload, exported a save, reset, and successfully imported that completed save. Width-390 layout visually inspected for cabinet, case cover, and evidence reader. Actual hardware/screen-reader and Safari/Firefox testing remains for user play-testing. Duration is an hour target, not a measured first-time completion result. Record that during blind testing.
