/**
 * Neuroid — Founder's Office Associate Application Receiver
 *
 * Deploy this as a Google Apps Script Web App and paste the resulting
 * URL into index.html (`APPS_SCRIPT_URL` constant).
 *
 * Setup:
 *   1. Create a Google Sheet, paste the row-1 headers from README.md.
 *   2. In that Sheet → Extensions → Apps Script → paste this file.
 *   3. Set SHEET_ID below to the Sheet's ID (the long string in its URL).
 *      Optionally update SHEET_NAME if your tab isn't named "Applications".
 *   4. Deploy → New deployment → Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   5. Copy the Web App URL → paste into index.html.
 */

const SHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';
const SHEET_NAME = 'Applications';

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    sheet.appendRow([
      new Date(),                 // Timestamp
      p.fullName            || '',
      p.email               || '',
      p.phone               || '',
      p.location            || '',
      p.linkedin            || '',
      p.portfolio           || '',
      p.experience          || '',
      p.currentRole         || '',
      p.currentCompany      || '',
      p.resumeLink          || '',
      p.noticePeriod        || '',
      p.whyFoundersOffice   || '',
      p.aiTools             || '',
      p.wildestSystem       || '',
      p.messyProblem        || '',
      p.cameraComfort       || '',
      p.pitchLines          || '',
      p.hiddenSuperpower    || '',
      p.opsFinanceComfort   || '',
      p.hybridOk            || '',
      p.startDate           || '',
      p.expectedCtc         || '',
      p.howFound            || '',
      p.anythingElse        || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'Founder’s Office endpoint is alive.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
