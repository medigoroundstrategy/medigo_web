// 이 코드를 Google Apps Script에 붙여넣으세요
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      data.name    || "",
      data.phone   || "",
      data.email   || "",
      data.service || "",
      data.message || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
