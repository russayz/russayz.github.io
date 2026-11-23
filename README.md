# russayz.github.io

Personal site of Russell Yom: equity research and a personal track record.
Live at https://russayz.github.io (pages carry a `noindex` tag, so search engines do not list them).

## Layout

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `research/` | Research list and one folder per pitch |
| `track-record/` | My Portfolio page: performance, percentages only |
| `about/` | Background, experience, competitions, contact |
| `files/` | Pitch decks (PDF) |
| `assets/css/site.css` | All styles |
| `assets/js/performance-data.js` | My Portfolio numbers (edit this to update the chart) |
| `assets/js/charts.js` | Chart drawing code |
| `assets/img/`, `assets/fonts/` | Images and self-hosted fonts (Newsreader, IBM Plex Sans, both under the SIL Open Font License) |

## Editing

See **EDITING.md** for step-by-step instructions. The `.html` files are the master copy: edit them directly.

## Updating the track record

Open `assets/js/performance-data.js`, add the new month to `months`, add one value to each series,
and update the `reported` figures. Then update the matching numbers in `index.html` and
`track-record/index.html`. Never add account values: the site shows percentages only.
