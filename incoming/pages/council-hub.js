(function () {
  // =========================================================
  // Endpoints + mounts
  // =========================================================
  var COUNCILS_ENDPOINT = "https://data.abundanceinvestment.com/councils";
  var LOANS_ENDPOINT = "https://data.abundanceinvestment.com/loans";
  var PROJECTS_ENDPOINT = "https://data.abundanceinvestment.com/projects"; // ✅ NEW

  var LOANS_CONTAINER_ID = "ai-open-councils";
  var USE_OF_FUNDS_MOUNT_ID = "ai-use-of-funds";
  var PAST_INVESTMENTS_MOUNT_ID = "ai-past-investments";
  var SCOPE_WRAP_ID = "ai-scope-wrap";

  var CATEGORY_META = [
    { jsonKey: "renewableEnergySpend", label: "Renewable energy" },
    { jsonKey: "energyEfficiencySpend", label: "Energy efficiency" },
    { jsonKey: "cleanTransportationSpend", label: "Clean transportation" },
    { jsonKey: "pollutionPreventionSpend", label: "Pollution prevention and control" },
    { jsonKey: "climateChangeAdaptationSpend", label: "Climate change adaptation" },
    { jsonKey: "livingNationalResourcesSpend", label: "Living and natural resources" }
  ];

  // =========================================================
  // Loading control (wrapper + scope reveal)
  // =========================================================
  try { document.documentElement.classList.add("ai-loading"); } catch (e) {}

  function finishLoading() {
    // Reveal wrapper
    try {
      var wrap = document.getElementById(SCOPE_WRAP_ID);
      if (wrap) wrap.removeAttribute("hidden");
    } catch (e) {}

    // Unhide any ai-scope elements you may have marked hidden
    try {
      var scopeNodes = document.querySelectorAll(".ai-scope[hidden]");
      for (var i = 0; i < scopeNodes.length; i++) scopeNodes[i].removeAttribute("hidden");
    } catch (e) {}

    try { document.documentElement.classList.remove("ai-loading"); } catch (e) {}
  }

  // Safety net: never trap the page forever
  setTimeout(function () {
    try {
      var wrap = document.getElementById(SCOPE_WRAP_ID);
      if (wrap && wrap.hasAttribute("hidden")) finishLoading();
    } catch (e) {}
  }, 8000);

  // =========================================================
  // Helpers
  // =========================================================
  function getFields(obj) {
    return (obj && obj.fields && typeof obj.fields === "object") ? obj.fields : obj;
  }
  function getTextFromEl(selector) {
    var el = document.querySelector(selector);
    return el ? (el.textContent || "").trim() : "";
  }
  function setText(el, value) {
    if (!el) return;
    el.textContent = (value == null ? "" : String(value));
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
  function statusHasValue(v, wanted) {
    if (!v || !wanted) return false;
    var w = String(wanted).toLowerCase();
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) if (String(v[i] || "").toLowerCase() === w) return true;
      return false;
    }
    return String(v).toLowerCase() === w;
  }
  function statusHasOpen(v) { return statusHasValue(v, "Open"); }
  function statusHasClosed(v) { return statusHasValue(v, "Closed"); }

  // ✅ safely read first element from Airtable array fields
  function getFirstId(v) {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v.length) return String(v[0] || "");
    return "";
  }

  function runAll(promises) {
    return Promise.all((promises || []).map(function (p) {
      return Promise.resolve(p).catch(function () { return null; });
    }));
  }

  // =========================================================
  // Section show/hide + masks
  // =========================================================
  function showHideNoOpenBlock(noOpenSection, show) {
    if (!noOpenSection) return;
    var topMask = noOpenSection.previousElementSibling;
    var bottomMask = noOpenSection.nextElementSibling;

    if (topMask && topMask.classList && topMask.classList.contains("bg-mask--t-convex")) topMask.style.display = show ? "" : "none";
    if (bottomMask && bottomMask.classList && bottomMask.classList.contains("bg-mask--b-convex")) bottomMask.style.display = show ? "" : "none";
    noOpenSection.style.display = show ? "" : "none";
  }

  function setNoOpenBg(noOpenSection, show, hex) {
    if (!noOpenSection) return;
    var topMask = noOpenSection.previousElementSibling;
    var bottomMask = noOpenSection.nextElementSibling;

    if (show) {
      if (hex) {
        noOpenSection.style.backgroundColor = hex;
        if (topMask) topMask.style.backgroundColor = hex;
        if (bottomMask) bottomMask.style.backgroundColor = hex;
      }
    } else {
      noOpenSection.style.backgroundColor = "";
      if (topMask) topMask.style.backgroundColor = "";
      if (bottomMask) bottomMask.style.backgroundColor = "";
    }
  }

  function findOpenInvestmentsSection() {
    var wrap = document.getElementById(LOANS_CONTAINER_ID);
    if (!wrap) return null;
    var node = wrap;
    while (node && node !== document.body) {
      if (node.tagName && node.tagName.toLowerCase() === "section") return node;
      node = node.parentNode;
    }
    return null;
  }

  function showHideOpenBlock(openSection, show) {
    if (!openSection) return;
    openSection.style.display = show ? "" : "none";

    // Also toggle the grey convex masks for open-investments area
    var openMasks = document.querySelectorAll(".ai-open-bg.bg-mask");
    for (var i = 0; i < openMasks.length; i++) {
      openMasks[i].style.display = show ? "" : "none";
    }
  }

  // =========================================================
  // Open investment tiles
  // =========================================================
  function getValue(obj, key) {
    var f = getFields(obj);
    return f ? f[key] : undefined;
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
    if (Object.prototype.toString.call(v) === "[object Array]" && v.length && typeof v[0] === "string") return v[0];
    return "";
  }

  function pillHtml(type, text) {
    var cls = "ai-invest-tick__badge--yellow";
    if (type === "rate") cls = "ai-invest-tick__badge--pink";
    if (type === "term") cls = "ai-invest-tick__badge--blue";
    return '<span class="ai-invest-tick__badge ' + cls + '">' + escapeHtml(text) + "</span>";
  }

  // strapline + url + optional clickability
  function buildTileHtml(record) {
    var name = getValue(record, "investmentName") || "Investment";

    var desc = getValue(record, "strapline") || "";
    var href = getValue(record, "url") || "#";

    var bg = getFirstString(getValue(record, "hex")) || "#0f172a";
    var logo = getUrl(record, "whiteLogo");

    var pills = [];

    var rate = getValue(record, "rateOfReturn");
    if (rate != null && rate !== "") {
      pills.push(pillHtml("rate", percentFromDecimal(rate, 1) + "% a year"));
    }

    var term = safeNumber(getValue(record, "termLength"));
    if (term) {
      pills.push(pillHtml("term", term + " year term"));
    }

    var cap = String(getValue(record, "capitalRepayment") || "");
    if (cap) {
      var capLower = cap.toLowerCase();
      var capText =
        (capLower === "maturity") ? "Capital at maturity" :
        (capLower === "annuity")  ? "Capital 6 monthly" :
        "";
      if (capText) pills.push(pillHtml("capital", capText));
    }

    var clickable = (href && href !== "#");
    var clickableClass = clickable ? " ai-invest-tick--clickable" : "";
    var linkHtml = clickable
      ? ('<a class="ai-invest-tick__link" href="' + escapeHtml(href) + '" aria-label="Go to ' + escapeHtml(name) + '">' + escapeHtml(name) + '</a>')
      : "";

    return (
      '<article class="ai-invest-tick' + clickableClass + '">' +
        linkHtml +
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

/* ===== Top projects helpers (required) ===== */

/* Keep in sync with your chart colours */
var CHART_COLORS = ["#f7d7e7", "#37ebff", "#f1ca8d", "#fabe80", "#b191cb", "#21e0f4"];

function formatGBP2(v) {
  var n = parseNumber(v);
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(n);
  } catch (e) {
    return "£" + (n || 0).toFixed(2);
  }
}

function normalizeCategoryKey(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCategoryColorMap() {
  // 1:1 mapping in the same order as CATEGORY_META (same as bar chart)
  var map = {};
  for (var i = 0; i < CATEGORY_META.length; i++) {
    var c = CHART_COLORS[i % CHART_COLORS.length];
    map[normalizeCategoryKey(CATEGORY_META[i].label)] = c;
  }
  return map;
}

function hexToRgb(hex) {
  hex = String(hex || "").replace("#", "");
  if (hex.length === 3) hex = hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2];
  var n = parseInt(hex, 16);
  if (!isFinite(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function isDarkColor(hex) {
  var rgb = hexToRgb(hex);
  if (!rgb) return false;

  // WCAG relative luminance
  var rs = rgb.r / 255, gs = rgb.g / 255, bs = rgb.b / 255;
  var r = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  var g = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  var b = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  var L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Lower = darker
  return L < 0.45;
}

function ensureProjectsHolder() {
  var mount = document.getElementById(USE_OF_FUNDS_MOUNT_ID);
  if (!mount) return null;

  var card = mount.querySelector("#council-bar-chart .cbc-card");
  var parent = card || mount;

  var holder = parent.querySelector(".cbc-projects");
  if (!holder) {
    holder = document.createElement("section");
    holder.className = "cbc-projects";
    parent.appendChild(holder);
  }
  return holder;
}


  // join loans by councilID
  function renderLoansForCouncilAsync(councilId) {
    var wrap = document.getElementById(LOANS_CONTAINER_ID);
    if (!wrap) return Promise.resolve();

    wrap.innerHTML = '<p class="body--lg">Loading municipal investments...</p>';

    var targetId = String(councilId || "").trim();
    if (!targetId) {
      wrap.innerHTML = "<p>There are no open municipal investments for this council at the moment.</p>";
      return Promise.resolve();
    }

    return fetch(LOANS_ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);

        var open = [];
        for (var i = 0; i < records.length; i++) {
          var f = getFields(records[i]);
          if (!statusHasOpen(f.raiseStatus)) continue;

          var loanCouncilId = getFirstId(f.councilID);
          if (!loanCouncilId || loanCouncilId !== targetId) continue;

          open.push(records[i]);
        }

        wrap.innerHTML = open.length
          ? open.map(buildTileHtml).join("")
          : "<p>There are no open municipal investments for this council at the moment.</p>";
      })
      .catch(function () {
        wrap.innerHTML = "<p>Sorry — we couldn’t load municipal investments right now.</p>";
      });
  }

  // =========================================================
  // Use of funds (single council)
  // =========================================================
  function parseNumber(value) {
    if (value === undefined || value === null || value === "") return 0;
    if (typeof value === "number") return value;
    var n = parseFloat(String(value).replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  }

  function formatPoundsShort(v) {
    v = (typeof v === "number") ? v : parseNumber(v);
    if (v >= 1000000) return "£" + (v / 1000000).toFixed(2) + "m";
    if (v >= 1000) return "£" + (v / 1000).toFixed(0) + "k";
    return "£" + Math.round(v).toLocaleString("en-GB");
  }

  function pluralize(count, singular, plural) {
    count = Math.round(count || 0);
    if (count === 1) return "1 " + singular;
    return count.toLocaleString("en-GB") + " " + (plural || singular + "s");
  }

  function computeCouncilSpent(fields) {
    var computed = 0;
    for (var i = 0; i < CATEGORY_META.length; i++) computed += parseNumber(fields[CATEGORY_META[i].jsonKey]);
    var explicit =
      (fields.totalSpent !== undefined && fields.totalSpent !== null && fields.totalSpent !== "")
        ? parseNumber(fields.totalSpent)
        : computed;
    return { used: explicit };
  }

  function renderUseOfFundsChartForCouncil(fields) {
    var mount = document.getElementById(USE_OF_FUNDS_MOUNT_ID);
    if (!mount) return;

    var spentInfo = computeCouncilSpent(fields);

    // NO chart -> show fallback image (from hidden vars)
    if (!(spentInfo.used > 0)) {
      var imgUrl = getTextFromEl("[data-ai-no-chart-img-url]");
      var imgAlt = getTextFromEl("[data-ai-no-chart-img-alt]");
      var imgCap = getTextFromEl("[data-ai-no-chart-img-caption]");

      if (imgUrl) {
        mount.innerHTML =
          '<figure class="brand-figure w-100">' +
            '<img src="' + escapeHtml(imgUrl) + '" width="800" height="450" alt="' + escapeHtml(imgAlt || "") + '" loading="lazy">' +
            (imgCap ? '<figcaption>' + escapeHtml(imgCap) + '</figcaption>' : "") +
          '</figure>';
      } else {
        mount.innerHTML = "";
      }
      return;
    }

    // Chart container expected by your CSS
    mount.innerHTML =
      '<div id="council-bar-chart">' +
        '<div class="cbc-card">' +
          '<section class="cbc-summary" id="cbc-summary" aria-live="polite"></section>' +
          '<div class="cbc-chart" id="cbc-chart"></div>' +
        '</div>' +
      "</div>";

    var summary = mount.querySelector("#cbc-summary");
    var chart = mount.querySelector("#cbc-chart");

    var councilName = (fields.issuingCouncil || "").trim();
    var bgHex = (fields.hex || "").trim() || "#f3f4f6";
    var whiteLogoUrl = (fields.whiteLogo || "").trim();
    var logoHref = (fields.councilHub || "").trim();

    var badgeInner =
      '<div class="cbc-logo-badge" style="background:' + escapeHtml(bgHex) + ';">' +
        (whiteLogoUrl ? '<img src="' + escapeHtml(whiteLogoUrl) + '" alt="' + escapeHtml(councilName) + ' logo">' : "") +
      "</div>";

    var badgeHtml = logoHref
      ? '<a class="cbc-summary-logo-link" href="' + escapeHtml(logoHref) + '" target="_blank" rel="noopener">' + badgeInner + "</a>"
      : badgeInner;

    var investmentsLine = pluralize(parseNumber(fields.loans), "investment");
    var spentLine = formatPoundsShort(spentInfo.used) + " spent";
    var projectsLine = pluralize(parseNumber(fields.projectsFunded), "project financed", "projects financed");

    summary.innerHTML =
      '<div class="cbc-summary-inner">' +
        '<div class="cbc-summary-logo">' + badgeHtml + "</div>" +
        '<div class="cbc-summary-lines" role="list">' +
          '<div class="cbc-summary-line" role="listitem">' + escapeHtml(investmentsLine) + "</div>" +
          '<div class="cbc-summary-line" role="listitem">' + escapeHtml(spentLine) + "</div>" +
          '<div class="cbc-summary-line" role="listitem">' + escapeHtml(projectsLine) + "</div>" +
        "</div>" +
      "</div>";

    // Chart rows
    var rows = [];
    for (var i = 0; i < CATEGORY_META.length; i++) {
      rows.push({ name: CATEGORY_META[i].label, value: parseNumber(fields[CATEGORY_META[i].jsonKey]) });
    }

    var max = 0;
    for (var m = 0; m < rows.length; m++) if (rows[m].value > max) max = rows[m].value;

    if (max <= 0) {
      chart.innerHTML =
        '<div class="cbc-empty">This council has not yet reported data on how they have spent the money raised. Please check again later.</div>';
      return;
    }

    // Chart rows — now % of total spent
    var totalSpent = parseNumber(spentInfo.used);

    // If total is zero, keep the existing empty message behaviour
    if (!(totalSpent > 0)) {
      chart.innerHTML =
        '<div class="cbc-empty">This council has not yet reported data on how they have spent the money raised. Please check again later.</div>';
      return;
    }

    // Keep the same colour scheme per category (fixed mapping)
    var colors = ["#f7d7e7", "#37ebff", "#f1ca8d", "#fabe80", "#b191cb", "#21e0f4"];
    var colorByLabel = {};
    for (var c = 0; c < CATEGORY_META.length; c++) {
      colorByLabel[CATEGORY_META[c].label] = colors[c % colors.length];
    }

    function formatPct(p) {
      // 1dp, but drop trailing .0 for nicer labels
      var n = roundTo(p, 1);
      var s = String(n);
      if (s.indexOf(".") > -1 && s.slice(-2) === ".0") s = s.slice(0, -2);
      return s + "%";
    }

    // Build rows as % of total, hide zeros
    var rows = [];
    for (var i = 0; i < CATEGORY_META.length; i++) {
      var label = CATEGORY_META[i].label;
      var value = parseNumber(fields[CATEGORY_META[i].jsonKey]);
      if (!(value > 0)) continue; // ✅ hide 0 spend categories

      var pctOfTotal = (value / totalSpent) * 100;
      rows.push({
        name: label,
        pct: pctOfTotal,
        color: colorByLabel[label] || "#e5e7eb"
      });
    }

    // If all categories are zero (or missing), show empty
    if (!rows.length) {
      chart.innerHTML =
        '<div class="cbc-empty">This council has not yet reported data on how they have spent the money raised. Please check again later.</div>';
      return;
    }

    // ✅ sort by descending % so biggest at the top
    rows.sort(function (a, b) { return b.pct - a.pct; });

    // ✅ bar width represents % of total; 100% is full width
    for (var j = 0; j < rows.length; j++) {
      var item = rows[j];
      var widthPct = Math.max(0, Math.min(100, item.pct)); // clamp for safety

      chart.insertAdjacentHTML(
        "beforeend",
        '<div class="cbc-row">' +
          '<div class="cbc-label">' + escapeHtml(item.name) + "</div>" +
          '<div class="cbc-bar-wrapper">' +
            '<div class="cbc-bar-fill" data-final-width="' + widthPct + '" style="width:0%;background:' + escapeHtml(item.color) + ';">' +
              '<span class="cbc-bar-value">' + escapeHtml(formatPct(item.pct)) + '</span>' +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }
    

    var fills = chart.querySelectorAll(".cbc-bar-fill");
    for (var k = 0; k < fills.length; k++) {
      (function (el, index) {
        var target = el.getAttribute("data-final-width");
        setTimeout(function () { el.style.width = target + "%"; }, index * 120);
      })(fills[k], k);
    }
  }

  function renderTopProjectsBySpendForCouncilAsync(councilId) {
  var holder = ensureProjectsHolder();
  if (!holder) return Promise.resolve();

  var targetId = String(councilId || "").trim();
  if (!targetId) { holder.innerHTML = ""; return Promise.resolve(); }

  holder.innerHTML =
    '<h3 class="cbc-projects__title">Top projects financed</h3>' +
    '<div class="cbc-projects__list">' +
      '<p class="body--md" style="margin:14px 16px;">Loading…</p>' +
    '</div>';

  var catColorMap = buildCategoryColorMap();

  return fetch(PROJECTS_ENDPOINT, { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var records = Array.isArray(data) ? data : (data.records || []);

      // Filter to council
      var matches = [];
      for (var i = 0; i < records.length; i++) {
        var f = getFields(records[i]);
        var pid = getFirstId(f.councilID);
        if (!pid || pid !== targetId) continue;
        matches.push(records[i]);
      }

      // Sort by totalSpent (descending); tie-break by createdTime (most recent first)
      matches.sort(function (a, b) {
        var fa = getFields(a), fb = getFields(b);
        var sa = parseNumber(fa.totalSpent);
        var sb = parseNumber(fb.totalSpent);
        if (sb !== sa) return sb - sa;

        var ta = new Date(a.createdTime).getTime();
        var tb = new Date(b.createdTime).getTime();
        return (isNaN(tb) ? 0 : tb) - (isNaN(ta) ? 0 : ta);
      });

      var top = matches.slice(0, 3);
      if (!top.length) { holder.innerHTML = ""; return; }

      var items = "";
      for (var j = 0; j < top.length; j++) {
        var rec = top[j];
        var f2 = getFields(rec);

        var name = (f2.projectName || "Project").trim();
        var cat = (f2.category || "").trim();
        var desc = (f2.description || "").trim();

        var spentText = formatGBP2(f2.totalSpent);

        var catKey = normalizeCategoryKey(cat);
        var pillBg = catColorMap[catKey] || "#e5e7eb";

        var dark = isDarkColor(pillBg);
        var textColor = dark ? "#ffffff" : "#111827";
        var borderColor = dark ? "rgba(255,255,255,.25)" : "rgba(17,24,39,.10)";

        var pillHtml =
          cat
            ? '<div class="cbc-proj__pill" style="background:' + escapeHtml(pillBg) +
                ';color:' + textColor +
                ';border:1px solid ' + borderColor + ';">' +
                escapeHtml(cat) +
              '</div>'
            : "";

        items +=
          '<details class="cbc-proj">' +
            '<summary class="cbc-proj__sum">' +
              pillHtml +
              '<div class="cbc-proj__titleRow">' +
                '<h4 class="cbc-proj__name">' + escapeHtml(name) + '</h4>' +
                '<div class="cbc-proj__right">' +
                  '<span class="cbc-proj__spent">' + escapeHtml(spentText) + '</span>' +
                  '<svg class="cbc-proj__chev" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
                    '<path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"/>' +
                  '</svg>' +
                '</div>' +
              '</div>' +
            '</summary>' +
            (desc
  ? '<div class="cbc-proj__body">' +
      escapeHtml(desc)
        .split(/\n+/)
        .map(function(p) {
          return '<p>' + p + '</p>';
        })
        .join("") +
    '</div>'
  : ''
)
 +
          '</details>';
      }

      holder.innerHTML =
        '<h3 class="cbc-projects__title">Top projects financed</h3>' +
        '<div class="cbc-projects__list">' + items + '</div>';
    })
    .catch(function () {
      holder.innerHTML = "";
    });
}




  // =========================================================
  // Past investments (Closed loans) → table OR CTA
  // =========================================================
  function formatGBP(v) {
    var n = safeNumber(v);
    try {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
    } catch (e) {
      return "£" + Math.round(n).toLocaleString("en-GB");
    }
  }

  function formatCloseDate(v) {
    if (!v) return "";
    var d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    try {
      return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d);
    } catch (e) {
      return d.toDateString();
    }
  }

  function parseDateForSort(v) {
    var d = new Date(v);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  // join closed loans by councilID
  function renderPastInvestmentsForCouncilAsync(councilId, emptyCta) {
    var mount = document.getElementById(PAST_INVESTMENTS_MOUNT_ID);
    if (!mount) return Promise.resolve();

    mount.innerHTML = '<p class="body--lg">Loading investment history…</p>';

    var targetId = String(councilId || "").trim();

    return fetch(LOANS_ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);

        var closed = [];
        for (var i = 0; i < records.length; i++) {
          var f = getFields(records[i]);
          if (!statusHasClosed(f.raiseStatus)) continue;

          var loanCouncilId = getFirstId(f.councilID);
          if (!loanCouncilId || loanCouncilId !== targetId) continue;

          closed.push(records[i]);
        }

        if (!closed.length) {
          var h = (emptyCta && emptyCta.header) ? emptyCta.header : "";
          var c = (emptyCta && emptyCta.copy) ? emptyCta.copy : "";
          var url = (emptyCta && emptyCta.buttonUrl) ? emptyCta.buttonUrl : "";
          var txt = (emptyCta && emptyCta.buttonText) ? emptyCta.buttonText : "";

          mount.innerHTML =
            '<div class="flex-center"><h2 class="text-center m-b-spacer-sm">' + escapeHtml(h) + '</h2></div>' +
            '<div class="flex-center"><p class="body--lg text-center choke-800 m-b-spacer-sm">' + escapeHtml(c) + '</p></div>' +
            (url && txt
              ? '<p class="body--md text-center m-t-spacer-md"><a href="' + escapeHtml(url) + '" class="brand-btn-grey--bordered brand-btn-grey--bordered--bordered btn btn--lg btn--icon">' + escapeHtml(txt) + '</a></p>'
              : ""
            );
          return;
        }

        closed.sort(function (a, b) {
          var fa = getFields(a), fb = getFields(b);
          return parseDateForSort(fb.closeDate) - parseDateForSort(fa.closeDate);
        });

        var rowsHtml = "";
        for (var j = 0; j < closed.length; j++) {
          var f2 = getFields(closed[j]);
          var name = f2.investmentName || "Investment";
          var href = getValue(closed[j], "url") || "#";
          var rate = (f2.rateOfReturn != null && f2.rateOfReturn !== "") ? (percentFromDecimal(f2.rateOfReturn, 1) + "% p.a.") : "";
          var term = safeNumber(f2.termLength);
          var termText = term ? (term + (term === 1 ? " year" : " years")) : "";
          var amount = (f2.loanAmount != null && f2.loanAmount !== "") ? formatGBP(f2.loanAmount) : "";
          var closeDateText = formatCloseDate(f2.closeDate);

          rowsHtml +=
            "<tr>" +
              '<td headers="investment" data-title="Investment"><a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' + escapeHtml(name) + "</a></td>" +
              '<td headers="interest" data-title="Interest">' + escapeHtml(rate) + "</td>" +
              '<td headers="term" data-title="Term">' + escapeHtml(termText) + "</td>" +
              '<td headers="amount" data-title="Amount raised">' + escapeHtml(amount) + "</td>" +
              '<td headers="close date" data-title="Close date">' + escapeHtml(closeDateText) + "</td>" +
            "</tr>";
        }

        mount.innerHTML =
          '<div class="flex-center"><h2 class="text-center m-b-spacer-sm">Investment history</h2></div>' +
          '<div class="flex-center"><div class="ai-past-table-choke">' +
            '<table class="brand-table">' +
              "<caption>Investment history</caption>" +
              "<thead><tr>" +
                '<th class="brand-table__head" scope="col"><strong>Investment</strong></th>' +
                '<th class="brand-table__head" scope="col"><strong>Interest</strong></th>' +
                '<th class="brand-table__head" scope="col"><strong>Term</strong></th>' +
                '<th class="brand-table__head" scope="col"><strong>Amount raised</strong></th>' +
                '<th class="brand-table__head" scope="col"><strong>Close date</strong></th>' +
              "</tr></thead>" +
              "<tbody>" + rowsHtml + "</tbody>" +
            "</table>" +
          "</div></div>";
      })
      .catch(function () { mount.innerHTML = ""; });
  }

  // =========================================================
  // INIT
  // =========================================================
  function init() {
    var councilRef = getTextFromEl("[data-ai-council-reference]");
    if (!councilRef) { finishLoading(); return; }

    // No-open copy + button
    var noOpenHeader = getTextFromEl("[data-ai-no-open-header]");
    var noOpenWords = getTextFromEl("[data-ai-no-open-words]");
    var noOpenBtnText = getTextFromEl("[data-ai-no-open-button-text]");
    var noOpenBtnUrl  = getTextFromEl("[data-ai-no-open-button-url]");

    // No-past CTA
    var emptyPastCta = {
      header: getTextFromEl("[data-ai-no-past-invest-header]"),
      copy: getTextFromEl("[data-ai-no-past-invest-copy]"),
      buttonUrl: getTextFromEl("[data-ai-no-past-invest-button-url]"),
      buttonText: getTextFromEl("[data-ai-no-past-invest-button-text]")
    };

    var noOpenSection = document.querySelector("section.ai-no-open");
    var openSection = findOpenInvestmentsSection();

    fetch(COUNCILS_ENDPOINT, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var records = Array.isArray(data) ? data : (data.records || []);
        var rec = null;
        for (var i = 0; i < records.length; i++) {
          if (records[i] && records[i].id === councilRef) { rec = records[i]; break; }
        }
        if (!rec) { finishLoading(); return; }

        var fields = getFields(rec);

        // Toggle open vs no-open
        var isOpen = statusHasOpen(fields.raiseStatus);
        showHideNoOpenBlock(noOpenSection, !isOpen);
        showHideOpenBlock(openSection, isOpen);

        // NO OPEN: set background to #ffedcc and populate copy + button
        setNoOpenBg(noOpenSection, !isOpen, "#ffedcc");

        if (!isOpen && noOpenSection) {
          var h2 = noOpenSection.querySelector("h2");
          var pWords = noOpenSection.querySelector("p.body--lg");

          if (noOpenHeader) setText(h2, noOpenHeader);
          if (noOpenWords) setText(pWords, noOpenWords);

          // Fix duplicate buttons: remove any existing buttons inside the section
          var existingLinks = noOpenSection.querySelectorAll("a.brand-btn-grey--bordered");
          for (var z = 0; z < existingLinks.length; z++) {
            if (existingLinks[z] && existingLinks[z].parentNode) {
              existingLinks[z].parentNode.removeChild(existingLinks[z]);
            }
          }

          // Remove existing injected wrapper if present
          var existingBtn = noOpenSection.querySelector(".ai-no-open-btn-wrap");
          if (existingBtn && existingBtn.parentNode) existingBtn.parentNode.removeChild(existingBtn);

          if (noOpenBtnText && noOpenBtnUrl) {
            var btnWrap = document.createElement("div");
            btnWrap.className = "flex-center ai-no-open-btn-wrap";
            btnWrap.innerHTML =
              '<a href="' + escapeHtml(noOpenBtnUrl) + '" class="brand-btn-grey--bordered brand-btn-grey--bordered--bordered btn btn--lg m-y-spacer-md btn--icon" style="border-color:#4c4c4a;color:#4c4c4a">' +
                escapeHtml(noOpenBtnText) +
              '</a>';
            var col = noOpenSection.querySelector(".container .row .col-12");
            if (col) col.appendChild(btnWrap);
          }
        }

        // Use-of-funds (chart OR fallback image)
        // Use-of-funds (chart OR fallback image)
renderUseOfFundsChartForCouncil(fields);

// Async tasks (define BEFORE pushing!)
var tasks = [];

// ✅ Projects: top 3 by spend
tasks.push(renderTopProjectsBySpendForCouncilAsync(councilRef));

// Existing behaviours
if (isOpen) tasks.push(renderLoansForCouncilAsync(councilRef));
tasks.push(renderPastInvestmentsForCouncilAsync(councilRef, emptyPastCta));


        runAll(tasks).then(function () {
          finishLoading();
        }).catch(function () {
          finishLoading();
        });
      })
      .catch(function () {
        finishLoading();
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
