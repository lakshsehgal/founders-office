# Founder's Office Associate — Neuroid

A single-page hiring landing page + application form for the **Founder's Office Associate** role at Neuroid. Mirrors the design system of the Content Strategist page (dark theme, lime accent, Syne + DM Sans).

- **Live form** posts URL-encoded data to a Google Apps Script Web App.
- **Apps Script** appends each submission as a row in a Google Sheet.

---

## 1. Google Sheet headers (paste into row 1)

Copy the line below and paste it into cell **A1** of a new Google Sheet — Sheets will split it across columns automatically.

```
Timestamp	Full Name	Email	Phone	Current City	LinkedIn	Portfolio	Years of Experience	Current Role	Current Company	Resume Link	Notice Period	Why Founder's Office	AI Tools Used	Wildest System Shipped	Messy Problem Untangled	Camera Comfort	Pitch in 2 Lines	CV Won't Tell Us	Ops & Finance Comfort	Hybrid in New Delhi	Earliest Start Date	Expected CTC	How They Found Us	Anything Else
```

That's **25 columns** (Timestamp + 24 form fields). Order matters — it must match the `appendRow` array in `apps-script.gs`.

Recommended sheet/tab name: **`Applications`**.

---

## 2. Deploy the Apps Script

1. In your Google Sheet → **Extensions → Apps Script**.
2. Delete any boilerplate code, paste the contents of `apps-script.gs`.
3. Replace `REPLACE_WITH_YOUR_SHEET_ID` with your Sheet's ID — it's the long string in the Sheet URL between `/d/` and `/edit`.
4. (Optional) Change `SHEET_NAME` if your tab isn't named `Applications`.
5. **Save** the project (give it any name, e.g. `Neuroid Founders Office`).
6. **Deploy → New deployment**:
   - Click the gear → **Web app**
   - **Description:** anything.
   - **Execute as:** *Me* (your account)
   - **Who has access:** *Anyone*
7. **Authorize** when prompted (Google will warn since the script is unverified — it's your own script, click *Advanced → Go to … (unsafe)*).
8. Copy the resulting **Web app URL** — that's what you'll paste into `index.html`.

> You can re-test with the URL in a browser; `doGet` returns a small JSON heartbeat.

---

## 3. Wire the URL into the page

Open `index.html` and find this line (inside the `<script>` block near the bottom):

```js
const APPS_SCRIPT_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_WEB_APP_URL';
```

Replace the placeholder string with the Web App URL you copied. Save. That's it.

---

## 4. Deploy to Vercel

This is a static site (one HTML file), so Vercel auto-detects it.

**Option A — via GitHub (recommended):**
1. Push this repo to GitHub (you've already done this).
2. Go to [vercel.com/new](https://vercel.com/new) → *Import Git Repository* → pick `founders-office`.
3. Framework preset: **Other** (it's a plain static site).
4. Root directory: `/` · Build command: leave empty · Output directory: leave empty.
5. **Deploy.**
6. Vercel will give you a `https://founders-office-xxx.vercel.app` URL. Add a custom domain from Project → Settings → Domains if you want.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel --prod
```

> Re-deploys are automatic on every push to your default branch.

---

## 5. Test the end-to-end flow

1. Open the deployed page.
2. Fill in the form (you can use junk values).
3. Hit **Send it →**.
4. You should see the success overlay + toast.
5. Open the Google Sheet — your row should be there.

If nothing lands: check the browser console, then check **Apps Script → Executions** for errors.

---

## File structure

```
founders-office/
├── index.html          # full landing page + application form
├── apps-script.gs      # Google Apps Script — paste into the Sheet
└── README.md           # this file
```

---

## Tweaking copy / fields

- All copy lives in `index.html`. The role description sections are inside `<article class="card">` blocks under the `<section class="content">` element.
- If you add or remove a form field, you **must** update three places in lockstep:
  1. The `<input>` / `<select>` / `<textarea>` in `index.html` (its `name=` attribute).
  2. The `appendRow([...])` array in `apps-script.gs`.
  3. The header row in your Google Sheet.

Same name, same order, every time.
