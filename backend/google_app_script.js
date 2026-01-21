function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
    
    const ts = new Date();
    const row = [ts, data.consent || '', data.consent_timestamp || ''];
    // const questionIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];
    const questionIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13"];
    for (let id of questionIds) {
      row.push(data[id] || '');
    }
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
                          .setMimeType(ContentService.MimeType.JSON)
                          .setHeaders({
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, OPTIONS',
                            'Access-Control-Allow-Headers': 'Content-Type'
                          });
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", error: err.toString()}))
                          .setMimeType(ContentService.MimeType.JSON)
                          .setHeaders({
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, OPTIONS',
                            'Access-Control-Allow-Headers': 'Content-Type'
                          });
  }
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doGet(e) {
  // Handle preflight OPTIONS request
  return doOptions(e);
}
