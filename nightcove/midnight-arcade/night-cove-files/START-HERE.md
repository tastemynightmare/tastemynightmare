# Connect the Night Cove Files cabinet

1. Unzip the download. Open the folder named `night-cove-files` and check that `index.html`, `css`, `js`, `cases`, and `assets` are directly inside it.
2. Put that whole folder inside your site's existing `nightcove/midnight-arcade/` directory. Keep every file and folder name unchanged.
3. On `nightcove/midnight-arcade/games.html`, point the Night Cove Files cabinet's existing link to `night-cove-files/index.html`.

Example link (reuse your cabinet's current markup and classes):

```html
<a href="night-cove-files/index.html" aria-label="Play Night Cove Files: Nightmare Circus">
  Night Cove Files
</a>
```

If your existing cabinet uses a button with a click handler, change that handler's destination to `night-cove-files/index.html` instead. Do not place a button inside a link.

Publish the repository through your usual GitHub Pages workflow. The resulting location is `/nightcove/midnight-arcade/night-cove-files/index.html` on your domain. This package does not edit games.html or the live portfolio automatically.

## Test before publishing

Double-click `night-cove-files/index.html` to open the game, or use VS Code's existing Live Server workflow. There is no install or build step. Scripts use ordinary relative paths and no fetch calls, so the game does not require an application server. Browser storage for local files varies; use Export progress to keep a reliable copy.

## Keep progress when moving

In the private preview, open Notebook and Export progress. On your own domain, open Notebook and Import progress. Confirm that the eight-findings count and notes carry across. Browser saves do not automatically move between domains.

## What is included

One complete Nightmare Circus case. The other five drawers are coming soon. Recording evidence is delivered as readable transcripts; optional sound is a quiet interface effect, not voiced dialogue. No vital clue relies on sound, colour, tiny images, dragging, or a timer.

For another case, keep content in its own file and add its own save key and rule checks. Avoid replacing this case's schema without versioning existing saves.

## Replacing the earlier build

Replace the entire existing `night-cove-files` folder with this folder, keeping the same cabinet link. Do not mix the previous case-data or rule files with this edition.

Edition 2 changes the evidence and solution path, so it begins a separate save. Earlier browser saves are retained under their previous key, but old exports cannot be imported into this edition. Export new progress only after starting this version.

## Editing in VS Code

Open `night-cove-files` as a folder. The HTML, CSS, and JavaScript are fully expanded. Case text and puzzle answers are in `cases/nightmare-circus.js`; layout is in `css/game.css`; rule validation is in `js/rules.js`; screen renderers and events are in `js/app.js`. No files are minified. `.editorconfig` and `.prettierrc.json` keep formatting consistent if your editor supports them.

The optional `creator-notes` folder is for you, outside the folder you host. It contains the solution and the dependency-free rule checks. From the extracted ZIP’s top directory, run `node creator-notes/tests/case-rules.cjs` if Node is installed.
