# How to edit your site

The `.html` files in this repository **are** the website. Edit them directly and your changes go live
1 to 10 minutes after you commit. Nothing else needs to be run or rebuilt.

---

## Two ways to edit

### A. Quick text change (on github.com)
1. Go to https://github.com/russayz/russayz.github.io
2. Click through to the file you want (see "Where everything lives" below).
3. Click the **pencil icon** ("Edit this file") at the top right of the file.
4. Press Ctrl+F (Cmd+F on Mac) to find the words you want to change. Change only the text.
5. Click **Commit changes...**, then **Commit changes** again.
6. Wait 1 to 10 minutes, then hard-refresh the site (Ctrl+Shift+R, or Cmd+Shift+R on Mac).

### B. Bigger changes, several files at once (github.dev)
1. On the repository page, press the **.** (full stop) key. A code editor opens in your browser.
2. Files are listed on the left. Click one to edit it.
3. To search every file at once (for example, to change your email everywhere), click the magnifier icon on the left.
4. To upload a file, drag it from your computer onto a folder in the left panel.
5. When done, click the **Source Control** icon on the left (the branch-shaped one), type a short note such as "Update October returns", and click **Commit & Push**.

### Uploading PDFs or images only
Open the folder on github.com (for example `files`), click **Add file > Upload files**, drag the file in, and click **Commit changes**.

---

## Where everything lives

| What you see on the site | File to edit |
|---|---|
| Home page: name, intro, buttons, quick facts, My Portfolio panel, research cards, short bio | `index.html` |
| Research list and the "At a glance" table | `research/index.html` |
| FTAI pitch page | `research/ftai-aviation/index.html` |
| Boot Barn pitch page | `research/boot-barn/index.html` |
| DISCO pitch page | `research/disco/index.html` |
| My Portfolio page: stats, contributors, notes (the web address stays /track-record/) | `track-record/index.html` |
| Chart numbers (portfolio and benchmarks) | `assets/js/performance-data.js` |
| About page: experience, education, competitions, contact | `about/index.html` |
| Pitch decks | `files/` |
| Slide images and the link-preview image | `assets/img/` |
| Colors, fonts, spacing | `assets/css/site.css` |

Notes in the files that look like `<!-- ===== MY PORTFOLIO PANEL ... ===== -->` are signposts for you.
Visitors never see them.

---

## Rules that keep the page from breaking

- Change the words **between** tags, for example `<p>change this text</p>`. Do not delete `<`, `>`, quote marks or closing tags like `</p>`.
- Write `&amp;` where you want an ampersand: `S&amp;P 500` shows as "S&P 500".
- For negative numbers, a normal hyphen works (`-3.2%`). The site uses the true minus sign (−), which you can copy from any page.
- The header and footer are repeated on every page. To change something in them (such as your email), use github.dev's search (method B) and change every copy.
- Make one change at a time, commit, and check the live site before the next one.

### Undo a mistake
1. On github.com, open the file and click **History** (top right).
2. Click the last version that worked, then **...** > **View file**, then **Raw**. Copy everything.
3. Open the current file, click the pencil, select all, paste, and commit.

---

## Common jobs

### 1. Update My Portfolio each month
Do all three steps so the numbers agree everywhere.

**a. Chart data: `assets/js/performance-data.js`**
- Add the new month to the end of `months`, for example `"2026-11"`.
- Add one number to the end of each of the four `values` lists (portfolio, S&P 500, VT, EFA). These are **cumulative** returns since May 2024, in percent, not the month's return.
  - New cumulative = (1 + old cumulative ÷ 100) × (1 + month's return ÷ 100) − 1, then × 100.
  - Example: old 84.64, November +2.0% → 1.8464 × 1.02 − 1 = 0.8833 → **88.33**.
- Update `asOf` and the `reported` figures.

**b. Home page: `index.html`**, in the MY PORTFOLIO PANEL block
- The big number, "May 2024 to Oct 2026", the two legend values, the four risk stats (Sharpe, drawdown, best and worst month), and the sentence inside `<noscript>`.

**c. My Portfolio page: `track-record/index.html`**
- The opening paragraph (return and lead over the S&P 500), the ten STATS (including Sortino ratio and average holding duration), the chart subtitle ("Month-end values, May 2024 to ..."), the contributors if they changed, and the notes at the bottom.
- Contributor bars: each `width: 100.0%` is that holding's contribution divided by the largest contribution on the page, times 100. For example 7.13 ÷ 8.28 × 100 = 86.1%.

Never add account values or dollar balances. The site shows percentages only.

### 2. Add a new pitch
1. **Deck:** upload the PDF to `files/`. Use a name without spaces, for example `Team-Company-long.pdf`.
2. **Images:** in PowerPoint, use File > Export to save the cover slide and the summary slide as JPEGs. Upload both to `assets/img/` (for example `company-cover.jpg` and `company-summary.jpg`).
3. **Page:** in github.dev, create a new file named `research/company-name/index.html`. Open an existing pitch page, select all, copy, and paste into the new file. Then change the title, call (Long or Short), ticker, figures, every section, the PDF and image paths, and the "Next:" link at the bottom.
4. **Cards:** in `index.html` and `research/index.html`, copy one research card (from `<li class="research-item">` down to its `</li>`, marked by a "Research card" note) and edit it. In `research/index.html`, also copy one row of the "At a glance" table (`<tr>` to `</tr>`).
5. **Links:** to keep the "Next:" links in a loop, point the previous pitch's "Next:" link at your new page.

### 3. Edit your bio, experience or contact details
- About page: `about/index.html`.
- Short bio and quick facts on the home page: `index.html` (HERO and ABOUT blocks).
- Email and LinkedIn also appear in the home page buttons and in every page's footer.

### 4. Let Google list the site (optional)
Delete these two lines from the top of every `.html` file:
```
<meta name="robots" content="noindex, nofollow">
<meta name="googlebot" content="noindex, nofollow">
```
To let Google index the PDF decks as well, delete the `Disallow: /files/` line in `robots.txt`.

---

## Optional: preview changes before they go live
1. Install GitHub Desktop and Visual Studio Code.
2. In GitHub Desktop, clone `russayz/russayz.github.io` to your computer and open the folder in VS Code.
3. Install the VS Code extension "Live Server", right-click `index.html`, and choose **Open with Live Server**. The site opens in your browser and refreshes as you save.
4. When it looks right, commit and push from GitHub Desktop.
