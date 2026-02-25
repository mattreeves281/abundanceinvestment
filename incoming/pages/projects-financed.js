(function () {
  var COUNCIL_DATA_URL = "https://data.abundanceinvestment.com/councils";

  // All councils badge config
  var ALL_COUNCILS_BADGE_LOGO =
    "https://cdn4.sharein.com/abundance/8d9c1ba3-6b73-4bfc-9671-ffc5cee387aa.png";
  var ALL_COUNCILS_BADGE_BG = "#f8d9e8";

  var CATEGORY_META = [
    { jsonKey: "renewableEnergySpend", label: "Renewable energy" },
    { jsonKey: "energyEfficiencySpend", label: "Energy efficiency" },
    { jsonKey: "cleanTransportationSpend", label: "Clean transportation" },
    { jsonKey: "pollutionPreventionSpend", label: "Pollution prevention and control" },
    { jsonKey: "climateChangeAdaptationSpend", label: "Climate change adaptation" },
    { jsonKey: "livingNationalResourcesSpend", label: "Living and natural resources" }
  ];

  function initCouncilBarChart() {
    var container = document.getElementById("council-bar-chart");
    if (!container) return;

    container.innerHTML =
      '<div class="cbc-card">' +
        '<div class="cbc-controls">' +
          '<label for="cbc-select">Show data for:</label>' +
          '<select id="cbc-select"></select>' +
        '</div>' +
        '<section class="cbc-summary" id="cbc-summary" aria-live="polite"></section>' +
        '<div class="cbc-chart" id="cbc-chart"></div>' +
        '<p id="cbc-loading" style="margin:6px 0 0;color:#6b7280;">Loading data…</p>' +
      "</div>";

    var loading = document.getElementById("cbc-loading");
    var summary = document.getElementById("cbc-summary");
    var chart = document.getElementById("cbc-chart");
    var select = document.getElementById("cbc-select");

    loadCouncilData(function (result) {
      if (loading && loading.parentNode) loading.parentNode.removeChild(loading);

      buildControlsAndInitialRender(
        select,
        chart,
        summary,
        result.dataByCouncil,
        result.logosByCouncil,
        result.logoLinksByCouncil
      );
    });
  }

  function loadCouncilData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", COUNCIL_DATA_URL, true);

    xhr.onload = function () {
      var out = { dataByCouncil: {}, logosByCouncil: {}, logoLinksByCouncil: {} };
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          out = parseCouncilData(xhr.responseText);
        } else {
          console.error("Council data load failed, status:", xhr.status);
        }
      } catch (e) {
        console.error("Error parsing council data JSON:", e);
      }
      callback(out);
    };

    xhr.onerror = function () {
      console.error("Network error loading council data JSON");
      callback({ dataByCouncil: {}, logosByCouncil: {}, logoLinksByCouncil: {} });
    };

    xhr.send();
  }

  function parseNumber(value) {
    if (value === undefined || value === null || value === "") return 0;
    if (typeof value === "number") return value;
    var n = parseFloat(String(value).replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  }
  
  function isComingSoonStatus(raiseStatus) {
  // Coming soon payload is always exactly: ["Coming soon"]
  return (
    Object.prototype.toString.call(raiseStatus) === "[object Array]" &&
    raiseStatus.length === 1 &&
    raiseStatus[0] === "Coming soon"
  );
}

  function parseCouncilData(jsonText) {
    var parsed = JSON.parse(jsonText);
    var records = parsed.records || [];

    var dataByCouncil = {};
    var totalsByCategory = {};
    var logosByCouncil = {};
    var logoLinksByCouncil = {};

    var globalTotalRaised = 0;
    var globalNumberOfLoans = 0;
    var globalTotalSpent = 0;
    var globalProjectsFunded = 0;

    for (var t = 0; t < CATEGORY_META.length; t++) {
      totalsByCategory[CATEGORY_META[t].label] = { value: 0 };
    }

    for (var i = 0; i < records.length; i++) {
      var fields = records[i].fields || {};
      
      // ✅ Hide "Coming soon" councils everywhere (including the pick list)
  if (isComingSoonStatus(fields["raiseStatus"])) continue;

  var council = (fields["issuingCouncil"] || "").trim();
  if (!council) continue;
      var council = (fields["issuingCouncil"] || "").trim();
      if (!council) continue;

      var hex = (fields["hex"] || "").trim();
      var whiteLogo = (fields["whiteLogo"] || "").trim();
      var hub = (fields["councilHub"] || "").trim();

      if (hex || whiteLogo) {
        logosByCouncil[council] = { bgHex: hex, whiteLogoUrl: whiteLogo };
      }
      if (hub) {
        logoLinksByCouncil[council] = hub;
      }

      var entries = [];
      var computedSpent = 0;

      for (var j = 0; j < CATEGORY_META.length; j++) {
        var cat = CATEGORY_META[j];
        var value = parseNumber(fields[cat.jsonKey]);
        computedSpent += value;
        totalsByCategory[cat.label].value += value;
        if (value > 0) entries.push({ name: cat.label, value: value });
      }

      var totalRaised = parseNumber(fields["totalRaised"]);
      var numberOfLoans = parseNumber(fields["loans"]);
      var projectsFunded = parseNumber(fields["projectsFunded"]);

      var totalSpent =
        (fields["totalSpent"] !== undefined && fields["totalSpent"] !== null && fields["totalSpent"] !== "")
          ? parseNumber(fields["totalSpent"])
          : computedSpent;

      globalTotalRaised += totalRaised;
      globalNumberOfLoans += numberOfLoans;
      globalTotalSpent += totalSpent;
      globalProjectsFunded += projectsFunded;

      dataByCouncil[council] = {
        entries: entries,
        totalRaised: totalRaised,
        numberOfLoans: numberOfLoans,
        totalSpent: totalSpent,
        projectsFunded: projectsFunded
      };
    }

    var allList = [];
    for (var k = 0; k < CATEGORY_META.length; k++) {
      var label = CATEGORY_META[k].label;
      var catTotal = (totalsByCategory[label] && totalsByCategory[label].value) || 0;
      allList.push({ name: label, value: catTotal });
    }

    dataByCouncil["All councils"] = {
      entries: allList,
      totalRaised: globalTotalRaised,
      numberOfLoans: globalNumberOfLoans,
      totalSpent: globalTotalSpent,
      projectsFunded: globalProjectsFunded
    };

    return {
      dataByCouncil: dataByCouncil,
      logosByCouncil: logosByCouncil,
      logoLinksByCouncil: logoLinksByCouncil
    };
  }

  function buildControlsAndInitialRender(
    select,
    chart,
    summarySection,
    dataByCouncil,
    logosByCouncil,
    logoLinksByCouncil
  ) {
    if (dataByCouncil["All councils"]) {
      select.insertAdjacentHTML("beforeend", '<option value="All councils">All councils</option>');
    }

    var councils = [];
    for (var name in dataByCouncil) {
      if (!dataByCouncil.hasOwnProperty(name)) continue;
      if (name === "All councils") continue;
      councils.push(name);
    }
    councils.sort();

    for (var i = 0; i < councils.length; i++) {
      var c = councils[i];
      select.insertAdjacentHTML("beforeend", '<option value="' + c + '">' + c + "</option>");
    }

    function formatPoundsShort(v) {
      if (typeof v !== "number") return "";
      if (v >= 1000000) return "£" + (v / 1000000).toFixed(2) + "m";
      if (v >= 1000) return "£" + (v / 1000).toFixed(0) + "k";
      return "£" + Math.round(v).toLocaleString("en-GB");
    }
    function formatPoundsFull(v) {
      if (typeof v !== "number") v = 0;
      return "£" + Math.round(v).toLocaleString("en-GB");
    }

    function pluralize(count, singular, plural) {
      count = Math.round(count || 0);
      if (count === 1) return "1 " + singular;
      return count.toLocaleString("en-GB") + " " + (plural || singular + "s");
    }

    function renderSummary(council) {
      var data = dataByCouncil[council];
      if (!data) {
        summarySection.style.display = "none";
        summarySection.innerHTML = "";
        return;
      }

      var isAll = council === "All councils";

      var badgeHtml = "";
      if (isAll) {
        badgeHtml =
          '<div class="cbc-logo-badge" style="background:' + ALL_COUNCILS_BADGE_BG + ';">' +
            '<img src="' + ALL_COUNCILS_BADGE_LOGO + '" alt="All councils">' +
          "</div>";
      } else {
        var logoData = logosByCouncil && logosByCouncil[council] ? logosByCouncil[council] : null;
        var logoHref = logoLinksByCouncil && logoLinksByCouncil[council] ? logoLinksByCouncil[council] : "";

        var bgHex = logoData && logoData.bgHex ? logoData.bgHex : "#f3f4f6";
        var whiteLogoUrl = logoData && logoData.whiteLogoUrl ? logoData.whiteLogoUrl : "";

        var inner =
          '<div class="cbc-logo-badge" style="background:' + bgHex + ';">' +
            (whiteLogoUrl ? '<img src="' + whiteLogoUrl + '" alt="' + council + ' logo">' : "") +
          "</div>";

        badgeHtml = logoHref
          ? '<a class="cbc-summary-logo-link" href="' + logoHref + '" target="_blank" rel="noopener">' + inner + "</a>"
          : inner;
      }

      var investmentsLine = pluralize(data.numberOfLoans, "investment");
      var spentLine = formatPoundsShort(data.totalSpent) + " spent";
      var projectsLine = pluralize(data.projectsFunded, "project financed", "projects financed");

      summarySection.style.display = "block";
      summarySection.innerHTML =
  '<div class="cbc-summary-inner">' +
    '<div class="cbc-summary-logo">' + badgeHtml + "</div>" +
    '<div class="cbc-summary-lines" role="list">' +
      '<div class="cbc-summary-line" role="listitem">' + investmentsLine + "</div>" +
      '<div class="cbc-summary-line" role="listitem">' + spentLine + "</div>" +
      '<div class="cbc-summary-line" role="listitem">' + projectsLine + "</div>" +
    "</div>" +
  "</div>";

    }

    function renderChart(council) {
      var councilData = dataByCouncil[council] || { entries: [] };
      var existing = councilData.entries || [];
      chart.innerHTML = "";

      var map = {};
      for (var m = 0; m < existing.length; m++) map[existing[m].name] = existing[m].value;

      var rows = [];
      for (var c = 0; c < CATEGORY_META.length; c++) {
        var label = CATEGORY_META[c].label;
        var value = map.hasOwnProperty(label) ? map[label] : 0;
        rows.push({ name: label, value: value });
      }

      var max = 0;
      for (var i = 0; i < rows.length; i++) if (rows[i].value > max) max = rows[i].value;

      if (max <= 0) {
        chart.innerHTML =
          '<div class="cbc-empty">This council has not yet reported data on how they have spent the money raised. Please check again later.</div>';
        return;
      }

      var colors = ["#f7d7e7", "#37ebff", "#f1ca8d", "#fabe80", "#b191cb", "#21e0f4"];

      for (var j = 0; j < rows.length; j++) {
        var item = rows[j];
        var pct = max > 0 ? (item.value / max) * 100 : 0;
        if (pct < 10 && item.value > 0) pct = 10;

        chart.insertAdjacentHTML(
          "beforeend",
          '<div class="cbc-row">' +
            '<div class="cbc-label">' + item.name + "</div>" +
            '<div class="cbc-bar-wrapper">' +
              '<div class="cbc-bar-fill" data-final-width="' + pct + '" style="width:0%;background:' + colors[j % colors.length] + ';">' +
                '<span class="cbc-bar-value">' + formatPoundsShort(item.value) + "</span>" +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }

      var fills = chart.querySelectorAll(".cbc-bar-fill");
      for (var k = 0; k < fills.length; k++) {
        (function (el, index) {
          var target = el.getAttribute("data-final-width");
          setTimeout(function () {
            el.style.width = target + "%";
          }, index * 120);
        })(fills[k], k);
      }
    }

    function renderAll(council) {
      renderSummary(council);
      renderChart(council);
    }

    var initial = dataByCouncil["All councils"] ? "All councils" : (councils[0] || "");
    if (!initial) return;

    select.value = initial;
    renderAll(initial);

    select.addEventListener("change", function () {
      renderAll(this.value);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCouncilBarChart);
  } else {
    initCouncilBarChart();
  }
})();
