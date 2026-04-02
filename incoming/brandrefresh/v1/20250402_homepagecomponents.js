(function () {
  var ENDPOINT = "https://data.abundanceinvestment.com/loans";
  var CONTAINER_ID = "ai-open-now-grid";

  function getValue(obj, key) {
    if (!obj) return undefined;
    if (obj.fields && typeof obj.fields === "object" && Object.prototype.hasOwnProperty.call(obj.fields, key)) {
      return obj.fields[key];
    }
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj[key];
    }
    return undefined;
  }

  function getFirstString(v) {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v.length && typeof v[0] === "string") return v[0];
    return "";
  }

  function getUrl(obj, key) {
    var v = getValue(obj, key);
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v.length) {
      if (v[0] && typeof v[0] === "object" && v[0].url) return v[0].url;
      if (typeof v[0] === "string") return v[0];
    }
    if (v && v.url) return v.url;
    return "";
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
    return roundTo(safeNumber(dec) * 100, typeof dp === "number" ? dp : 1);
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

  function isOpenStatus(v) {
    return String(v || "").toLowerCase() === "open";
  }

  function buildPill(type, text) {
    return '<span class="ai-open-card__pill ai-open-card__pill--' + type + '">' + escapeHtml(text) + "</span>";
  }

  function buildCard(record) {
    var name = getValue(record, "investmentName") || "Investment";
    var desc = getValue(record, "strapline") || "Municipal investment opportunity";
    var href = getValue(record, "url") || "/invest-now";
    var bg = getFirstString(getValue(record, "hex")) || "#0f172a";
    var logo = getUrl(record, "whiteLogo");

    var pills = [];

    var rate = getValue(record, "rateOfReturn");
    if (rate !== null && rate !== undefined && rate !== "") {
      pills.push(buildPill("rate", percentFromDecimal(rate, 1) + "% a year"));
    }

    var term = safeNumber(getValue(record, "termLength"));
    if (term) {
      pills.push(buildPill("term", term + " year term"));
    }

    var cap = String(getValue(record, "capitalRepayment") || "").toLowerCase();
    if (cap === "maturity") {
      pills.push(buildPill("capital", "Capital at maturity"));
    } else if (cap === "annuity") {
      pills.push(buildPill("capital", "Capital 6 monthly"));
    }

    return (
      '<article class="ai-open-card">' +
        '<a class="ai-open-card__link" href="' + escapeHtml(href) + '" aria-label="Go to ' + escapeHtml(name) + '">' + escapeHtml(name) + "</a>" +
        '<div class="ai-open-card__media" style="--card-bg:' + escapeHtml(bg) + ';">' +
          (logo ? '<img class="ai-open-card__logo" src="' + escapeHtml(logo) + '" alt="' + escapeHtml(name) + ' logo">' : "") +
        "</div>" +
        '<div class="ai-open-card__body">' +
          '<div class="ai-open-card__top">' +
            '<div class="ai-open-card__kicker">Open now</div>' +
            '<h3 class="ai-open-card__title">' + escapeHtml(name) + "</h3>" +
            '<p class="ai-open-card__desc">' + escapeHtml(desc) + "</p>" +
          "</div>" +
          '<div class="ai-open-card__bottom">' +
            (pills.length ? '<div class="ai-open-card__meta">' + pills.join("") + "</div>" : "") +
            '<div class="ai-open-card__cta">View investment</div>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function init() {
    var container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    container.innerHTML = '<div class="ai-open-now__loading">Loading open municipal investments...</div>';

    fetch(ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);
        var open = records.filter(function (record) {
          return isOpenStatus(getValue(record, "raiseStatus"));
        });

        container.innerHTML = open.length
          ? open.map(buildCard).join("")
          : '<div class="ai-open-now__empty">There are no open municipal investments at the moment. Please check again later.</div>';
      })
      .catch(function () {
        container.innerHTML = '<div class="ai-open-now__error">Sorry — we couldn’t load municipal investments right now.</div>';
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
