# Founder's Office Associate — Neuroid

Single-page hiring landing page + application form for the **Founder's Office Associate** role at Neuroid. Mirrors the design system of the Content Strategist page (dark theme, lime accent, Syne + DM Sans).

- Submissions post URL-encoded data to a Google Apps Script Web App.
- The Apps Script appends each submission as a row in the bound Google Sheet.

---

## 1. Google Sheet headers (paste into row 1)

Copy the line below, click cell **A1** in your Google Sheet, and paste — Sheets will split it across columns automatically.

```
Timestamp	Full Name	Email	Phone	City	LinkedIn	Portfolio	Experience	Current Role	Current Company	Resume	Notice Period	Why Founder's Office	AI Tools	Wildest System Shipped	Camera Comfort	Pitch (2 Lines)	CV Won't Tell Us	Ops & Finance Comfort	Hybrid in New Delhi	Earliest Start Date	Expected CTC	How They Found Us	Additional Info
```

That's **24 columns**. Order matters — it must match the `appendRow` array in `apps-script.gs`.

---

## 2. Deploy the Apps Script

The script is bound to the active Sheet, so there's no Sheet ID to set.

1. In your Google Sheet → **Extensions → Apps Script**.
2. Delete any boilerplate, paste the contents of `apps-script.gs`, save.
3. **Deploy → New deployment** → click the gear → **Web app**:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
4. **Authorize** when prompted (Advanced → Go to … → Allow — it's your own script).
5. Copy the resulting **Web app URL**.

Test it: paste the URL into a browser tab. You should see `{"status":"success"}` (an empty `appendRow` will write a blank row — that's fine, delete it).

---

## 3. Wire the URL into the page

Open `index.html` and find this line in the `<script>` block near the bottom:

```js
const APPS_SCRIPT_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_WEB_APP_URL';
```

Replace the placeholder with the Web App URL. Save.

---

## 4. Deploy to Vercel

This is a static site (one HTML file), so Vercel auto-detects it.

**Via GitHub (recommended):**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → *Import Git Repository* → pick `founders-office`.
3. Framework preset: **Other**. Build command: empty. Output directory: empty.
4. **Deploy.** Vercel hands you a `https://founders-office-xxx.vercel.app` URL.
5. Add a custom domain via Project → Settings → Domains if you want.

**Via Vercel CLI:**
```bash
npm i -g vercel
vercel --prod
```

Re-deploys are automatic on every push to your default branch.

---

## 5. Test the end-to-end flow

1. Open the deployed page.
2. Fill the form with junk values.
3. Hit **Send it →**.
4. Success overlay + toast should appear.
5. Refresh the Sheet — your row is there.

If nothing lands: open the browser console for client errors, and check **Apps Script → Executions** for server errors.

---

## File structure

```
founders-office/
├── index.html          # full landing page + application form
├── apps-script.gs      # Google Apps Script — paste into the bound script editor
└── README.md           # this file
```

---

## Tweaking copy / fields

All copy lives in `index.html`. Role-description sections are inside `<article class="card">` blocks. If you add or remove a form field, update three places in lockstep:

1. The `<input>` / `<select>` / `<textarea>` `name=` attribute in `index.html`.
2. The `appendRow([...])` array in `apps-script.gs`.
3. The header row in your Google Sheet.

Same name, same order, every time.
