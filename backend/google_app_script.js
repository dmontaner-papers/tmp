const version = 'v1.13';

function doGet(e) {
  Logger.log('En el GET');

  if (e.parameter && e.parameter.type === 'json') {
    return ContentService.createTextOutput(JSON.stringify({message: 'Hello, json world! - ' + version}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (e.parameter && e.parameter.type === 'text') {
    return ContentService.createTextOutput('Hello, text world! - ' + version);
  }

  return HtmlService.createHtmlOutput('Hello, html world! - ' + version);
}

function doPost(e) {
  try {
    const data = e.parameter; // Form data comes in as parameters, not postData
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    const ts = new Date();
    const row = [ts, data.consent || '', data.consent_timestamp || ''];
    const questionIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];
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
                          .setMimeType(ContentService.MimeType.JSON);
  }
}
