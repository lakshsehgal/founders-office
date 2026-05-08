function doGet(e)  { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }

function handleRequest(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  sheet.appendRow([
    data.timestamp, data.full_name, data.email, data.phone,
    data.city, data.linkedin, data.portfolio, data.experience,
    data.current_role, data.current_company, data.resume, data.notice_period,
    data.why_founders_office, data.ai_tools, data.wildest_system, data.camera_comfort,
    data.pitch, data.standout, data.ops_finance_comfort, data.wfo_delhi,
    data.start_date, data.expected_ctc, data.how_found, data.additional_info
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
