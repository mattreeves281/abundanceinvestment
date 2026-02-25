(function () {
  var ENDPOINT = "https://data.abundanceinvestment.com/councils";

  var STAT_SELECTORS = {
    spentOnProjects:  '[data-ai-stat="spentOnProjects"]',
    projectsFinanced: '[data-ai-stat="projectsFinanced"]'
  };

  function getFields(obj) {
    return (obj && obj.fields && typeof obj.fields === "object") ? obj.fields : obj;
  }

  function getValue(obj, key) {
    var f = getFields(obj);
    return f ? f[key] : undefined;
  }

  function safeNumber(v) {
    if (typeof v === "number" && isFinite(v)) return v;
    if (typeof v === "string") {
      var cleaned = v.replace(/[^0-9.\-]/g, "");
      var n = Number(cleaned);
      return isFinite(n) ? n : 0;
    }
    return 0;
  }

  function roundTo(num, dp) {
    var p = Math.pow(10, dp);
    return Math.round(num * p) / p;
  }

  function formatGBPCompact(value, decimals) {
    var n = safeNumber(value);
    var abs = Math.abs(n);
    var dp = typeof decimals === "number" ? decimals : 2;

    if (abs >= 1000000000) return "£" + roundTo(n / 1000000000, dp) + "bn";
    if (abs >= 1000000)    return "£" + roundTo(n / 1000000, dp) + "m";
    if (abs >= 1000)       return "£" + roundTo(n / 1000, 1) + "k";
    return "£" + roundTo(n, dp);
  }

  function formatInt(v) {
    return String(Math.round(safeNumber(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function setStat(selector, valueText) {
    var el = document.querySelector(selector);
    if (el) el.textContent = valueText;
  }

  function init() {
    fetch(ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);

        var spentSum = 0;
        var projectsSum = 0;

        for (var i = 0; i < records.length; i++) {
          spentSum += safeNumber(getValue(records[i], "totalSpent"));
          projectsSum += safeNumber(getValue(records[i], "projectsFunded"));
        }

        // Money = 1dp, count = integer
        setStat(STAT_SELECTORS.spentOnProjects, formatGBPCompact(spentSum, 1));
        setStat(STAT_SELECTORS.projectsFinanced, formatInt(projectsSum));
      })
      .catch(function () {
        // If you prefer: leave existing hardcoded values untouched on failure
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

(function () {
  var ENDPOINT = "https://data.abundanceinvestment.com/loans";
  var CONTAINER_ID = "ai-open-councils";

  function getFields(obj) {
    return (obj && obj.fields && typeof obj.fields === "object") ? obj.fields : obj;
  }

  function getValue(obj, key) {
  if (!obj) return undefined;

  // Prefer Airtable-style: record.fields[key]
  if (obj.fields && typeof obj.fields === "object" && Object.prototype.hasOwnProperty.call(obj.fields, key)) {
    return obj.fields[key];
  }

  // Fallback: top-level record[key]
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }

  return undefined;
}


  function getUrl(obj, key) {
    var v = getValue(obj, key);
    if (!v) return "";
    if (typeof v === "string") return v;

    if (Object.prototype.toString.call(v) === "[object Array]" && v.length) {
      if (v[0] && typeof v[0] === "object" && v[0].url) return v[0].url;
      if (typeof v[0] === "string") return v[0];
    }

    if (v.url) return v.url;
    return "";
  }

  function getFirstString(v) {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Object.prototype.toString.call(v) === "[object Array]" && v.length && typeof v[0] === "string") {
      return v[0];
    }
    return "";
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeNumber(v) {
    if (typeof v === "number" && isFinite(v)) return v;
    if (typeof v === "string") {
      var cleaned = v.replace(/[^0-9.\-]/g, "");
      var n = Number(cleaned);
      return isFinite(n) ? n : 0;
    }
    return 0;
  }

  function roundTo(num, dp) {
    var p = Math.pow(10, dp);
    return Math.round(num * p) / p;
  }

  function percentFromDecimal(dec, dp) {
    return roundTo(safeNumber(dec) * 100, (typeof dp === "number" ? dp : 1));
  }

  function isOpenStatus(v) {
    return String(v || "").toLowerCase() === "open";
  }

  function pillHtml(type, text) {
    var cls = "ai-invest-tick__badge--yellow";
    if (type === "rate") cls = "ai-invest-tick__badge--pink";
    if (type === "term") cls = "ai-invest-tick__badge--blue";
    return '<span class="ai-invest-tick__badge ' + cls + '">' + escapeHtml(text) + "</span>";
  }

  function buildTileHtml(record) {
  var name = getValue(record, "investmentName") || "Investment";

  // ✅ NEW: pull from API
  var desc = getValue(record, "strapline") || "[Description coming soon]";
var href = getValue(record, "url") || "#";

  var bg = getFirstString(getValue(record, "hex")) || "#0f172a";
  var logo = getUrl(record, "whiteLogo");

  var pills = [];

  // Pink: rateOfReturn (0.041 => 4.1%)
  var rate = getValue(record, "rateOfReturn");
  if (rate != null && rate !== "") {
    pills.push(pillHtml("rate", percentFromDecimal(rate, 1) + "% a year"));
  }

  // Blue: termLength -> ALWAYS "year" per spec ("5 year term")
  var term = safeNumber(getValue(record, "termLength"));
  if (term) {
    pills.push(pillHtml("term", term + " year term"));
  }

  // Yellow: capitalRepayment mapping
  var cap = String(getValue(record, "capitalRepayment") || "");
  if (cap) {
    var capLower = cap.toLowerCase();
    var capText =
      (capLower === "maturity") ? "Capital at maturity" :
      (capLower === "annuity")  ? "Capital 6 monthly" :
      "";

    if (capText) pills.push(pillHtml("capital", capText));
  }

  // Optional: if url missing, don’t pretend it’s clickable
  var clickableClass = (href && href !== "#") ? " ai-invest-tick--clickable" : "";

  return (
    '<article class="ai-invest-tick' + clickableClass + '">' +
      '<a class="ai-invest-tick__link" href="' + escapeHtml(href) + '" aria-label="Go to ' +
        escapeHtml(name) + '">' + escapeHtml(name) + '</a>' +
      '<div class="ai-invest-tick__media ai-logo-tile" style="--tile-bg:' + escapeHtml(bg) + ';">' +
        (logo ? '<img class="ai-logo-tile__logo" src="' + escapeHtml(logo) + '" alt="' + escapeHtml(name) + ' logo">' : '') +
      '</div>' +
      '<div class="ai-invest-tick__content">' +
        (pills.length ? '<div class="ai-invest-tick__stats">' + pills.join("") + '</div>' : '') +
        '<h3 class="ai-invest-tick__title">' + escapeHtml(name) + '</h3>' +
        (desc ? '<p class="ai-invest-tick__desc">' + escapeHtml(desc) + '</p>' : '') +
      '</div>' +
      '<span class="ai-invest-tick__chevron">›</span>' +
    '</article>'
  );
}


  function init() {
    var wrap = document.getElementById(CONTAINER_ID);
    if (!wrap) return;

    // ✅ Loading copy styled to match site
    wrap.innerHTML = '<p class="body--lg">Loading municipal investments...</p>';

// We add a timestamp (?t=1715...) to the URL.
// This makes every single request look unique, forcing the browser to bypass its cache.
fetch(ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);
        console.log("first record fields:", (records[0] && records[0].fields) ? records[0].fields : records[0]);
console.log("strapline:", getValue(records[0], "strapline"));
console.log("url:", getValue(records[0], "url"));

        var open = [];
        for (var i = 0; i < records.length; i++) {
          if (isOpenStatus(getValue(records[i], "raiseStatus"))) open.push(records[i]);
        }

        wrap.innerHTML = open.length
          ? open.map(buildTileHtml).join("")
          : "<p>There are no open municipal investments at the moment. Please check again later</p>";
      })
      .catch(function () {
        wrap.innerHTML = "<p>Sorry — we couldn’t load municipal investments right now.</p>";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
