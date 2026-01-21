function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
    
    const ts = new Date();
    const row = [ts, data.role || '', data.age || ''];
    for (let i = 1; i <= 15; i++) {
      row.push(data["q" + i] || '');
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
