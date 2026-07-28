import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/mattreeves/abundanceinvestment/outputs/growth-calculator-audit";
const previewDir = "/Users/mattreeves/abundanceinvestment/tmp/growth-calculator-audit/previews";
const outputPath = `${outputDir}/abundance-growth-calculator-audit-model.xlsx`;

const workbook = Workbook.create();

const summary = workbook.worksheets.add("Summary");
const assumptions = workbook.worksheets.add("Assumptions");
const monthly = workbook.worksheets.add("Monthly Model");
const oneOff = workbook.worksheets.add("One-Off Model");
const checks = workbook.worksheets.add("Checks");

for (const sheet of [summary, assumptions, monthly, oneOff, checks]) {
  sheet.showGridLines = false;
}

function setTitle(sheet, range, title, subtitle) {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format.fill = { color: "#17324D" };
  sheet.getRange(range).format.font = { color: "#FFFFFF", bold: true, size: 16 };
  sheet.getRange(range).format.wrapText = true;

  const subtitleAddress = range.replace(/1/g, "2");
  const subtitleRange = sheet.getRange(subtitleAddress);
  subtitleRange.merge();
  subtitleRange.values = [[subtitle]];
  subtitleRange.format.fill = { color: "#EAF3F8" };
  subtitleRange.format.font = { color: "#17324D", italic: true };
  subtitleRange.format.wrapText = true;
}

function styleHeader(range) {
  range.format.fill = { color: "#DCEBF2" };
  range.format.font = { bold: true, color: "#17324D" };
  range.format.borders = { preset: "outside", style: "thin", color: "#9FB7C5" };
  range.format.wrapText = true;
}

function styleInput(range) {
  range.format.font = { color: "#0000FF" };
  range.format.fill = { color: "#FFF2CC" };
  range.format.borders = { preset: "outside", style: "thin", color: "#D6B656" };
}

function styleBody(range) {
  range.format.borders = {
    insideHorizontal: { style: "thin", color: "#E5E7EB" },
    insideVertical: { style: "thin", color: "#EEF2F7" },
    bottom: { style: "thin", color: "#CBD5E1" }
  };
}

function applySheetWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidth = width;
  });
}

setTitle(
  summary,
  "A1:H1",
  "Abundance Growth Calculator Audit Model",
  "Formula-driven Excel version of the browser calculator: 5-year tranches, 6-month coupon payments, £5 auto-invest threshold, and reinvested matured principal."
);

summary.getRange("A4:B11").values = [
  ["Output", "Value"],
  ["Monthly input", null],
  ["Monthly total paid in", null],
  ["Monthly value after 10 years", null],
  ["Monthly residual cash below £5", null],
  ["One-off input", null],
  ["One-off total paid in", null],
  ["One-off value after 10 years", null]
];
summary.getRange("B5:B11").formulas = [
  ["='Assumptions'!B4"],
  ["=SUM('Monthly Model'!D8:D128)"],
  ["=INDEX('Monthly Model'!L8:L128,MATCH('Assumptions'!B6*12,'Monthly Model'!A8:A128,0))"],
  ["=INDEX('Monthly Model'!J8:J128,MATCH('Assumptions'!B6*12,'Monthly Model'!A8:A128,0))"],
  ["='Assumptions'!B5"],
  ["=SUM('One-Off Model'!D8:D128)"],
  ["=INDEX('One-Off Model'!L8:L128,MATCH('Assumptions'!B6*12,'One-Off Model'!A8:A128,0))"]
];
styleHeader(summary.getRange("A4:B4"));
styleBody(summary.getRange("A5:B11"));
summary.getRange("B5:B11").setNumberFormat('"£"#,##0');

summary.getRange("D4:H11").values = [
  ["How to read this workbook", "", "", "", ""],
  ["1. Change editable blue/yellow inputs on the Assumptions tab.", "", "", "", ""],
  ["2. Review the month-by-month cash and tranche schedules on the model tabs.", "", "", "", ""],
  ["3. Coupons and matured principal enter cash first, then reinvest only when cash is at least £5.", "", "", "", ""],
  ["4. Final value equals active invested principal plus any residual cash.", "", "", "", ""],
  ["5. The Checks tab confirms that the workbook matches the current browser model defaults.", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];
summary.getRange("D4:H4").merge();
summary.getRange("D4:H4").format.fill = { color: "#17324D" };
summary.getRange("D4:H4").format.font = { color: "#FFFFFF", bold: true };
summary.getRange("D5:H9").merge(true);
summary.getRange("D5:H9").format.wrapText = true;
summary.getRange("D5:H9").format.fill = { color: "#F8FAFC" };
summary.getRange("D5:H9").format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };

setTitle(
  assumptions,
  "A1:E1",
  "Assumptions",
  "Editable inputs are shown in blue text with yellow fill. Rates are nominal annual coupon rates paid every 6 months."
);
assumptions.getRange("A4:B8").values = [
  ["Monthly payment", 100],
  ["One-off deposit", 10000],
  ["Projection years", 10],
  ["Investment term months", 60],
  ["Coupon interval months", 6]
];
assumptions.getRange("A9:B9").values = [["Minimum auto-invest balance", 5]];
assumptions.getRange("A11:B21").values = [
  ["Projection year", "Annual rate"],
  [1, 0.04],
  [2, 0.038],
  [3, 0.036],
  [4, 0.034],
  [5, 0.032],
  [6, 0.03],
  [7, 0.03],
  [8, 0.03],
  [9, 0.03],
  [10, 0.03]
];
styleHeader(assumptions.getRange("A11:B11"));
styleBody(assumptions.getRange("A4:B9"));
styleBody(assumptions.getRange("A12:B21"));
styleInput(assumptions.getRange("B4:B9"));
styleInput(assumptions.getRange("B12:B21"));
assumptions.getRange("B4:B5").setNumberFormat('"£"#,##0');
assumptions.getRange("B6:B9").setNumberFormat("#,##0");
assumptions.getRange("B12:B21").setNumberFormat("0.0%");

function buildModelSheet(sheet, title, subtitle, externalFormula) {
  setTitle(sheet, "A1:O1", title, subtitle);
  const headers = [
    "Month",
    "Projection year",
    "New tranche annual rate",
    "External money",
    "Opening cash",
    "Coupon receipts",
    "Matured principal",
    "Cash before investment",
    "New tranche principal",
    "Ending cash",
    "Active invested principal",
    "Total value",
    "Investment event count",
    "Audit note",
    ""
  ];
  sheet.getRange("A7:O7").values = [headers];
  styleHeader(sheet.getRange("A7:O7"));

  const values = [];
  const formulas = [];

  for (let month = 0; month <= 120; month++) {
    const row = 8 + month;
    const prevRow = row - 1;
    const firstRow = 8;
    const modelRow = [
      month,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    values.push(modelRow);

    const couponTerms = [];

    for (let offset = 6; offset <= 60; offset += 6) {
      const sourceRow = row - offset;
      couponTerms.push(
        sourceRow >= firstRow ? `I${sourceRow}*C${sourceRow}/2` : "0"
      );
    }

    const couponFormula = `=${couponTerms.join("+")}`;
    const maturitySourceRow = row - 60;
    const maturityFormula = maturitySourceRow >= firstRow ? `=I${maturitySourceRow}` : "=0";
    const activeFormula = row === firstRow ? `=I${row}-G${row}` : `=K${prevRow}+I${row}-G${row}`;
    const countFormula = row === firstRow ? `=IF(I${row}>=5,1,0)` : `=M${prevRow}+IF(I${row}>=5,1,0)`;

    formulas.push([
      null,
      `=INT(A${row}/12)+1`,
      `=INDEX('Assumptions'!$B$12:$B$21,MIN(B${row},ROWS('Assumptions'!$B$12:$B$21)))`,
      externalFormula(row),
      row === firstRow ? "=0" : `=J${prevRow}`,
      couponFormula,
      maturityFormula,
      `=E${row}+D${row}+F${row}+G${row}`,
      `=H${row}*(H${row}>='Assumptions'!$B$9)`,
      `=H${row}-I${row}`,
      activeFormula,
      `=J${row}+K${row}`,
      countFormula,
      `=IF(I${row}>0,"Invest cash as new 5-year tranche",IF(J${row}>0,"Carry cash until £5 threshold",""))`,
      null
    ]);
  }

  sheet.getRange("A8:O128").values = values;
  sheet.getRange("A8:O128").formulas = formulas;
  styleBody(sheet.getRange("A8:O128"));
  sheet.getRange("C8:C128").setNumberFormat("0.0%");
  sheet.getRange("D8:L128").setNumberFormat('"£"#,##0.00');
  sheet.getRange("A8:B128").setNumberFormat("#,##0");
  sheet.getRange("M8:M128").setNumberFormat("#,##0");
  sheet.getRange("N8:N128").format.wrapText = true;
  sheet.freezePanes.freezeRows(7);
}

buildModelSheet(
  monthly,
  "Monthly Model",
  "Each monthly payment enters cash, then the full cash balance is invested whenever it reaches £5. Coupon receipts and matured principal follow the same rule.",
  (row) => `=IF(A${row}<'Assumptions'!$B$6*12,'Assumptions'!$B$4,0)`
);

buildModelSheet(
  oneOff,
  "One-Off Model",
  "The one-off deposit is invested at month 0 if it is at least £5. Coupons and matured principal then enter cash and reinvest at the £5 threshold.",
  (row) => `=IF(A${row}=0,'Assumptions'!$B$5,0)`
);

setTitle(
  checks,
  "A1:F1",
  "Checks",
  "Checks reconcile the spreadsheet formulas to the current browser-model default outputs and key business rules."
);
checks.getRange("A4:F11").values = [
  ["Check", "Actual", "Expected", "Difference", "Tolerance", "Status"],
  ["Monthly final value", null, 14132.595448671775, null, 0.01, null],
  ["One-off final value", null, 14151.439248129587, null, 0.01, null],
  ["Monthly ending cash below £5", null, 5, null, 0, null],
  ["One-off ending cash below £5", null, 5, null, 0, null],
  ["Minimum investment assumption", null, 5, null, 0, null],
  ["Monthly display rounded to £", null, 14133, null, 0, null],
  ["One-off display rounded to £", null, 14151, null, 0, null]
];
checks.getRange("B5:B11").formulas = [
  ["='Summary'!B7"],
  ["='Summary'!B11"],
  ["=INDEX('Monthly Model'!J8:J128,MATCH('Assumptions'!B6*12,'Monthly Model'!A8:A128,0))"],
  ["=INDEX('One-Off Model'!J8:J128,MATCH('Assumptions'!B6*12,'One-Off Model'!A8:A128,0))"],
  ["='Assumptions'!B9"],
  ["=ROUND('Summary'!B7,0)"],
  ["=ROUND('Summary'!B11,0)"]
];
checks.getRange("D5:D11").formulas = [
  ["=B5-C5"],
  ["=B6-C6"],
  ["=MAX(0,B7-C7)"],
  ["=MAX(0,B8-C8)"],
  ["=B9-C9"],
  ["=B10-C10"],
  ["=B11-C11"]
];
checks.getRange("F5:F11").formulas = [
  ["=IF(ABS(D5)<=E5,\"OK\",\"Review\")"],
  ["=IF(ABS(D6)<=E6,\"OK\",\"Review\")"],
  ["=IF(D7<=E7,\"OK\",\"Review\")"],
  ["=IF(D8<=E8,\"OK\",\"Review\")"],
  ["=IF(ABS(D9)<=E9,\"OK\",\"Review\")"],
  ["=IF(ABS(D10)<=E10,\"OK\",\"Review\")"],
  ["=IF(ABS(D11)<=E11,\"OK\",\"Review\")"]
];
styleHeader(checks.getRange("A4:F4"));
styleBody(checks.getRange("A5:F11"));
checks.getRange("B5:E11").setNumberFormat('"£"#,##0.00');
checks.getRange("F5:F11").format.fill = { color: "#E2F0D9" };
checks.getRange("F5:F11").format.font = { bold: true, color: "#006100" };

applySheetWidths(summary, [24, 20, 4, 12, 46, 12, 12, 12]);
applySheetWidths(assumptions, [34, 18, 4, 4, 4]);
applySheetWidths(monthly, [10, 14, 18, 16, 16, 16, 16, 18, 20, 20, 16, 20, 16, 18, 34]);
applySheetWidths(oneOff, [10, 14, 18, 16, 16, 16, 16, 18, 20, 20, 16, 20, 16, 18, 34]);
applySheetWidths(checks, [34, 18, 18, 18, 14, 14]);

for (const sheet of [summary, assumptions, monthly, oneOff, checks]) {
  sheet.getUsedRange().format.font = { name: "Arial", size: 10 };
  sheet.getUsedRange().format.autofitRows();
}

summary.getRange("A1:H2").format.font = { name: "Arial" };
assumptions.getRange("A1:E2").format.font = { name: "Arial" };
monthly.getRange("A1:O2").format.font = { name: "Arial" };
oneOff.getRange("A1:O2").format.font = { name: "Arial" };
checks.getRange("A1:F2").format.font = { name: "Arial" };

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const summaryInspect = await workbook.inspect({
  kind: "table",
  range: "Summary!A4:B11",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 4
});
console.log(summaryInspect.ndjson);

const checkInspect = await workbook.inspect({
  kind: "table",
  range: "Checks!A4:F11",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 8
});
console.log(checkInspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan"
});
console.log(errors.ndjson);

for (const sheetName of ["Summary", "Assumptions", "Monthly Model", "One-Off Model", "Checks"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  const previewBytes = new Uint8Array(await preview.arrayBuffer());
  await fs.writeFile(`${previewDir}/${sheetName.replaceAll(" ", "-").toLowerCase()}.png`, previewBytes);
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(`Saved ${outputPath}`);
