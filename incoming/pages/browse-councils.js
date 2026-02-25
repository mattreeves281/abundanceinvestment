(function () {
  var ENDPOINT = "https://data.abundanceinvestment.com/councils";

  var OPEN_CONTAINER_ID = "ai-open-councils";
  var ALL_CONTAINER_ID  = "ai-all-councils";

  var STAT_SELECTORS = {
    totalInvested:  '[data-ai-stat="totalInvested"]',
    totalReturned:  '[data-ai-stat="totalReturned"]',
    totalCouncils:  '[data-ai-stat="totalCouncils"]'
  };

  function getFields(obj) {
    return (obj && obj.fields && typeof obj.fields === "object") ? obj.fields : obj;
  }

  function getValue(obj, key) {
    var f = getFields(obj);
    return f ? f[key] : undefined;
  }

  function getUrl(obj, key) {
    var v = getValue(obj, key);
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Object.prototype.toString.call(v) === "[object Array]" && v.length) {
      if (v[0] && v[0].url) return v[0].url;
    }
    if (v.url) return v.url;
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

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normaliseStatusItem(item) {
    var v = item && (item.name || item.value || item);
    return String(v || "").trim().toLowerCase();
  }

  function includesOpen(raiseStatus) {
    if (!raiseStatus) return false;

    if (typeof raiseStatus === "string") {
      return normaliseStatusItem(raiseStatus) === "open";
    }

    if (Object.prototype.toString.call(raiseStatus) === "[object Array]") {
      for (var i = 0; i < raiseStatus.length; i++) {
        if (normaliseStatusItem(raiseStatus[i]) === "open") return true;
      }
    }

    return false;
  }

  // Exact match for your canonical payload: ["Coming soon"]
  function isComingSoon(raiseStatus) {
    if (!raiseStatus) return false;

    if (typeof raiseStatus === "string") {
      return normaliseStatusItem(raiseStatus) === "coming soon";
    }

    if (Object.prototype.toString.call(raiseStatus) === "[object Array]") {
      for (var i = 0; i < raiseStatus.length; i++) {
        if (normaliseStatusItem(raiseStatus[i]) === "coming soon") return true;
      }
    }

    return false;
  }

  // ✅ Exclude if coming soon OR missing hub (fallback for when raiseStatus is null in live payload)
  function shouldExcludeCouncil(record) {
    var rs = getValue(record, "raiseStatus");
    if (isComingSoon(rs)) return true;

    var hub = getValue(record, "councilHub");
    if (!hub || String(hub).trim() === "") return true;

    return false;
  }

  function pillHtml(type, text) {
    var cls = "ai-invest-tick__badge--yellow";
    if (type === "raised") cls = "ai-invest-tick__badge--pink";
    if (type === "projects") cls = "ai-invest-tick__badge--blue";
    return '<span class="ai-invest-tick__badge ' + cls + '">' + escapeHtml(text) + "</span>";
  }

  function buildTileHtml(record) {
    // Belt + braces: never render excluded councils
    if (shouldExcludeCouncil(record)) return "";

    var name = getValue(record, "issuingCouncil") || "Council";
    var desc = getValue(record, "councilDescription") || "";
    var href = getValue(record, "councilHub") || "#";
    var bg   = getValue(record, "hex") || "#0f172a";
    var logo = getUrl(record, "whiteLogo");

    href = String(href || "#");

    var pills = [];

    if (getValue(record, "totalRaised") != null) {
      pills.push(pillHtml("raised", formatGBPCompact(getValue(record, "totalRaised")) + " raised"));
    }
    if (getValue(record, "projectsFunded") != null) {
      pills.push(pillHtml("projects", formatInt(getValue(record, "projectsFunded")) + " projects financed"));
    }
    if (getValue(record, "totalSpent") != null) {
      pills.push(pillHtml("spent", formatGBPCompact(getValue(record, "totalSpent")) + " spent"));
    }

    return (
      '<article class="ai-invest-tick ai-invest-tick--clickable">' +
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

  function setStat(selector, valueText) {
    var el = document.querySelector(selector);
    if (el) el.textContent = valueText;
  }

  function init() {
    var openWrap = document.getElementById(OPEN_CONTAINER_ID);
    var allWrap  = document.getElementById(ALL_CONTAINER_ID);

    if (!openWrap || !allWrap) return;

    openWrap.innerHTML = '<p class="body--lg">Loading councils...</p>';
    allWrap.innerHTML = "";

    fetch(ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var rawRecords = Array.isArray(data) ? data : (data.records || []);

        var excludedCount = 0;
        var records = rawRecords.filter(function (rec) {
          var ex = shouldExcludeCouncil(rec);
          if (ex) excludedCount++;
          return !ex;
        });

        // Debug marker (safe to remove later)
        openWrap.setAttribute("data-ai-script", "browse-councils-filter-v6");
        openWrap.setAttribute("data-ai-excluded-count", String(excludedCount));

        var totalInvested = 0;
        var totalReturned = 0;

        for (var i = 0; i < records.length; i++) {
          totalInvested += safeNumber(getValue(records[i], "totalRaised"));
          totalReturned += safeNumber(getValue(records[i], "totalReturned"));
        }

        setStat(STAT_SELECTORS.totalInvested, formatGBPCompact(totalInvested, 1));
        setStat(STAT_SELECTORS.totalReturned, formatGBPCompact(totalReturned, 1));
        setStat(STAT_SELECTORS.totalCouncils, records.length);

        var open = [];
        var other = [];

        for (var j = 0; j < records.length; j++) {
          if (includesOpen(getValue(records[j], "raiseStatus"))) open.push(records[j]);
          else other.push(records[j]);
        }

        openWrap.innerHTML = open.length
          ? open.map(buildTileHtml).join("")
          : '<p class="body--lg">There are no councils with open investments right now. Please check again later.</p>';

        allWrap.innerHTML = other.map(buildTileHtml).join("");
      })
      .catch(function () {
        openWrap.innerHTML = '<p class="body--lg">Sorry — we couldn’t load councils right now.</p>';
        allWrap.innerHTML = "";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
