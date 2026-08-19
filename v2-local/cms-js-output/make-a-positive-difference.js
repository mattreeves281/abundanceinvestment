/* Shared live stats helper: _live-stats.js */
(function () {
  const COUNCILS_ENDPOINT = "https://data.abundanceinvestment.com/councils";
  const LOANS_ENDPOINT = "https://data.abundanceinvestment.com/loans";

  let councilsPromise;
  let loansPromise;

  function recordsFromResponse(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.records)) return data.records;
    return [];
  }

  function getFields(record) {
    return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
  }

  function getValue(record, key) {
    return getFields(record)[key];
  }

  function safeNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
      const cleaned = value.replace(/[^0-9.\-]/g, "");
      const number = Number(cleaned);
      return Number.isFinite(number) ? number : 0;
    }

    return 0;
  }

  function roundTo(value, decimals) {
    const places = Math.pow(10, decimals);
    return Math.round(value * places) / places;
  }

  function formatMoneyCompact(value, decimals) {
    const number = safeNumber(value);
    const abs = Math.abs(number);
    const dp = typeof decimals === "number" ? decimals : 1;

    if (abs >= 1000000000) return "£" + roundTo(number / 1000000000, dp).toFixed(dp).replace(/\.0+$/, "") + "bn";
    if (abs >= 1000000) return "£" + roundTo(number / 1000000, dp).toFixed(dp).replace(/\.0+$/, "") + "m";
    if (abs >= 1000) return "£" + roundTo(number / 1000, 1).toFixed(1).replace(/\.0$/, "") + "k";
    return "£" + Math.round(number).toLocaleString("en-GB");
  }

  function formatInt(value) {
    return Math.round(safeNumber(value)).toLocaleString("en-GB");
  }

  function formatPercentFromDecimal(value) {
    return (safeNumber(value) * 100).toFixed(2) + "%";
  }

  function parseDate(value) {
    const date = new Date(String(value || ""));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function normaliseStatusItem(item) {
    const value = item && (item.name || item.value || item);
    return String(value || "").trim().toLowerCase();
  }

  function includesStatus(raiseStatus, target) {
    const normalisedTarget = String(target || "").trim().toLowerCase();

    if (!raiseStatus) return false;
    if (typeof raiseStatus === "string") return normaliseStatusItem(raiseStatus) === normalisedTarget;

    if (Array.isArray(raiseStatus)) {
      return raiseStatus.some(function (item) {
        return normaliseStatusItem(item) === normalisedTarget;
      });
    }

    return false;
  }

  function firstValue(value) {
    if (!value) return "";
    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
      return value.length ? firstValue(value[0]) : "";
    }

    if (typeof value === "object") {
      return value.id || value.url || value.src || value.name || value.value || "";
    }

    return String(value);
  }

  function valueList(value) {
    if (!value) return [];
    return Array.isArray(value) ? value.map(firstValue).filter(Boolean) : [firstValue(value)].filter(Boolean);
  }

  function loanHasLiveOrClosedStatus(record) {
    const raiseStatus = getValue(record, "raiseStatus");
    return includesStatus(raiseStatus, "open") || includesStatus(raiseStatus, "closed");
  }

  function loanCouncilIds(record) {
    const fields = getFields(record);
    return []
      .concat(valueList(fields.councilID))
      .concat(valueList(fields.councilIds))
      .concat(valueList(fields.councilRecordId));
  }

  function eligibleCouncilIdsFromLoans(loans) {
    const ids = new Set();

    loans
      .filter(loanHasLiveOrClosedStatus)
      .forEach(function (loan) {
        loanCouncilIds(loan).forEach(function (id) {
          ids.add(id);
        });
      });

    return ids;
  }

  function filterCouncilsWithEligibleLoans(councils, loans) {
    const eligibleCouncilIds = eligibleCouncilIdsFromLoans(loans || []);

    return councils.filter(function (record) {
      return record && record.id && eligibleCouncilIds.has(record.id);
    });
  }

  function shouldExcludeCouncil(record) {
    const hub = getValue(record, "councilHub");
    return !hub || String(hub).trim() === "";
  }

  function fetchRecords(endpoint, cacheKey) {
    if (cacheKey === "councils" && councilsPromise) return councilsPromise;
    if (cacheKey === "loans" && loansPromise) return loansPromise;

    const request = fetch(endpoint, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error(endpoint + " returned " + response.status);
        return response.json();
      })
      .then(recordsFromResponse);

    if (cacheKey === "councils") councilsPromise = request;
    if (cacheKey === "loans") loansPromise = request;

    return request;
  }

  function setStats(values) {
    Object.keys(values).forEach(function (key) {
      document.querySelectorAll('[data-abv2-stat="' + key + '"]').forEach(function (element) {
        element.textContent = values[key];
      });
    });
  }

  function councilStats(records, loans) {
    const eligibleCouncils = Array.isArray(loans)
      ? filterCouncilsWithEligibleLoans(records, loans)
      : records;

    const visibleCouncils = eligibleCouncils.filter(function (record) {
      return !shouldExcludeCouncil(record);
    });

    const projectTotals = records.reduce(function (acc, record) {
      acc.totalSpent += safeNumber(getValue(record, "totalSpent"));
      acc.projectsFunded += safeNumber(getValue(record, "projectsFunded"));
      return acc;
    }, {
      totalSpent: 0,
      projectsFunded: 0
    });

    const totalRaised = visibleCouncils.reduce(function (total, record) {
      return total + safeNumber(getValue(record, "totalRaised"));
    }, 0);

    return {
      projectsFinanced: formatInt(projectTotals.projectsFunded),
      spentOnProjects: formatMoneyCompact(projectTotals.totalSpent, 1),
      totalInvested: formatMoneyCompact(totalRaised, 1),
      uniqueCouncils: formatInt(visibleCouncils.length)
    };
  }

  function loanStats(records) {
    const loansWithRates = records
      .map(function (record) {
        return {
          openDate: parseDate(getValue(record, "openDate")),
          rateOfReturn: safeNumber(getValue(record, "rateOfReturn")),
          raiseStatus: getValue(record, "raiseStatus")
        };
      })
      .filter(function (loan) {
        return loan.openDate && loan.rateOfReturn > 0;
      });

    const mostRecentOpen = loansWithRates
      .filter(function (loan) {
        return includesStatus(loan.raiseStatus, "open");
      })
      .sort(function (a, b) {
        return b.openDate - a.openDate;
      })[0];

    function averageForYear(year) {
      const start = new Date(Date.UTC(year, 0, 1));
      const end = new Date(Date.UTC(year + 1, 0, 1));
      const matches = loansWithRates.filter(function (loan) {
        return loan.openDate >= start && loan.openDate < end;
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    function averageForPastMonths(months) {
      const end = new Date();
      const start = new Date(end);
      start.setMonth(start.getMonth() - months);

      const matches = loansWithRates.filter(function (loan) {
        return loan.openDate >= start && loan.openDate <= end;
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    function averageForAllHistoric() {
      const matches = loansWithRates.filter(function (loan) {
        return !includesStatus(loan.raiseStatus, "open");
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    return {
      investTodayRate: mostRecentOpen ? formatPercentFromDecimal(mostRecentOpen.rateOfReturn) : "",
      investTodayRateDecimal: mostRecentOpen ? mostRecentOpen.rateOfReturn : null,
      averageRatePast12Months: averageForPastMonths(12),
      averageRate2026: averageForYear(2026),
      averageRate2025: averageForYear(2025),
      averageRateAllHistoric: averageForAllHistoric(),
      averageRate2024: averageForYear(2024)
    };
  }

  function initCouncilStats() {
    if (!document.querySelector("[data-abv2-stat]")) return;

    Promise.all([
      fetchRecords(COUNCILS_ENDPOINT, "councils"),
      fetchRecords(LOANS_ENDPOINT, "loans")
    ])
      .then(function ([councils, loans]) {
        setStats(councilStats(councils, loans));
      })
      .catch(function (error) {
        console.error("Council stats failed:", error);
      });
  }

  window.AbundanceLiveStats = {
    councilStats: councilStats,
    fetchCouncils: function () {
      return fetchRecords(COUNCILS_ENDPOINT, "councils");
    },
    eligibleCouncilIdsFromLoans: eligibleCouncilIdsFromLoans,
    filterCouncilsWithEligibleLoans: filterCouncilsWithEligibleLoans,
    fetchLoans: function () {
      return fetchRecords(LOANS_ENDPOINT, "loans");
    },
    loanStats: loanStats,
    setStats: setStats
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCouncilStats);
  } else {
    initCouncilStats();
  }
})();

/* Page script: make-a-positive-difference.js */
(function () {
  var COUNCIL_DATA_URL = "https://data.abundanceinvestment.com/councils";
  var LOANS_DATA_URL = "https://data.abundanceinvestment.com/loans";

  var ALL_COUNCILS_BADGE_LOGO =
    "https://cdn4.sharein.com/abundance/8d9c1ba3-6b73-4bfc-9671-ffc5cee387aa.png";

  var ALL_COUNCILS_BADGE_BG = "#f8d9e8";

  var CATEGORY_META = [
    {
      jsonKey: "renewableEnergySpend",
      label: "Renewable energy",
      colour: "#f7d9e8"
    },
    {
      jsonKey: "energyEfficiencySpend",
      label: "Energy efficiency",
      colour: "#ccedf0"
    },
    {
      jsonKey: "cleanTransportationSpend",
      label: "Clean transportation",
      colour: "#ffeecd"
    },
    {
      jsonKey: "pollutionPreventionSpend",
      label: "Pollution prevention and control",
      colour: "#ffeecd"
    },
    {
      jsonKey: "climateChangeAdaptationSpend",
      label: "Climate change adaptation",
      colour: "#f7d9e8"
    },
    {
      jsonKey: "livingNationalResourcesSpend",
      label: "Living and natural resources",
      colour: "#ccedf0"
    }
  ];

  function initUseOfFunds() {
    var components = document.querySelectorAll("[data-abv2-use-of-funds]");
    if (!components.length) return;

    loadUseOfFundsData(function (result) {
      components.forEach(function (component) {
        var select = component.querySelector("[data-abv2-use-of-funds-select]");
        var summary = component.querySelector("[data-abv2-use-of-funds-summary]");
        var chart = component.querySelector("[data-abv2-use-of-funds-chart]");

        if (!select || !summary || !chart) return;

        if (!result || !result.dataByCouncil || !Object.keys(result.dataByCouncil).length) {
          select.innerHTML = '<option value="">Unable to load data</option>';
          summary.innerHTML =
            '<p class="abundance-body-compact m-b-spacer-0">Unable to load spend data at the moment.</p>';
          chart.innerHTML = "";
          return;
        }

        buildControlsAndRender(select, summary, chart, result);
      });
    });
  }

  function loadUseOfFundsData(callback) {
    Promise.all([
      loadJson(COUNCIL_DATA_URL),
      loadJson(LOANS_DATA_URL)
    ])
      .then(function (responses) {
        callback(parseCouncilData(responses[0], responses[1]));
      })
      .catch(function (error) {
        console.error("Use of funds data load failed:", error);
        callback(emptyResult());
      });
  }

  function loadJson(url) {
    return fetch(url, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error(url + " returned " + response.status);
      }

      return response.json();
    });
  }

  function emptyResult() {
    return {
      dataByCouncil: {},
      logosByCouncil: {},
      logoLinksByCouncil: {}
    };
  }

  function recordsFromResponse(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.records)) return data.records;
    return [];
  }

  function parseCouncilData(councilResponse, loanResponse) {
    var records = recordsFromResponse(councilResponse);
    var closedCouncilIds = closedCouncilIdsFromLoans(recordsFromResponse(loanResponse));

    var dataByCouncil = {};
    var logosByCouncil = {};
    var logoLinksByCouncil = {};
    var totalsByCategory = {};

    var globalTotalRaised = 0;
    var globalNumberOfLoans = 0;
    var globalTotalSpent = 0;
    var globalProjectsFunded = 0;

    CATEGORY_META.forEach(function (category) {
      totalsByCategory[category.label] = 0;
    });

    records.forEach(function (record) {
      var fields = record.fields || {};

      if (isComingSoonStatus(fields.raiseStatus)) return;
      if (!record.id || !closedCouncilIds[record.id]) return;

      var council = String(fields.issuingCouncil || "").trim();
      if (!council) return;

      var hex = String(fields.hex || "").trim();
      var whiteLogo = String(fields.whiteLogo || "").trim();
      var hub = normalizeCouncilHubUrl(fields.councilHub);

      if (hex || whiteLogo) {
        logosByCouncil[council] = {
          bgHex: hex,
          whiteLogoUrl: whiteLogo
        };
      }

      if (hub) {
        logoLinksByCouncil[council] = hub;
      }

      var entries = [];
      var computedSpent = 0;

      CATEGORY_META.forEach(function (category) {
        var value = parseNumber(fields[category.jsonKey]);

        computedSpent += value;
        totalsByCategory[category.label] += value;

        if (value > 0) {
          entries.push({
            name: category.label,
            value: value
          });
        }
      });

      var totalRaised = parseNumber(fields.totalRaised);
      var numberOfLoans = parseNumber(fields.loans);
      var projectsFunded = parseNumber(fields.projectsFunded);

      var totalSpent =
        fields.totalSpent !== undefined &&
        fields.totalSpent !== null &&
        fields.totalSpent !== ""
          ? parseNumber(fields.totalSpent)
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
    });

    dataByCouncil["All councils"] = {
      entries: CATEGORY_META.map(function (category) {
        return {
          name: category.label,
          value: totalsByCategory[category.label] || 0
        };
      }),
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

  function firstValue(value) {
    if (!value) return "";
    if (typeof value === "string") return value;

    if (Object.prototype.toString.call(value) === "[object Array]") {
      return value.length ? firstValue(value[0]) : "";
    }

    if (typeof value === "object") {
      return value.id || value.url || value.src || value.name || value.value || "";
    }

    return String(value);
  }

  function valueList(value) {
    if (!value) return [];
    return Object.prototype.toString.call(value) === "[object Array]"
      ? value.map(firstValue).filter(Boolean)
      : [firstValue(value)].filter(Boolean);
  }

  function statusMatches(raiseStatus, target) {
    var normalisedTarget = String(target || "").trim().toLowerCase();

    if (!raiseStatus) return false;

    if (typeof raiseStatus === "string") {
      return String(raiseStatus).trim().toLowerCase() === normalisedTarget;
    }

    if (Object.prototype.toString.call(raiseStatus) === "[object Array]") {
      return raiseStatus.some(function (item) {
        return String(firstValue(item) || item || "").trim().toLowerCase() === normalisedTarget;
      });
    }

    return String(firstValue(raiseStatus) || raiseStatus || "").trim().toLowerCase() === normalisedTarget;
  }

  function loanCouncilIds(record) {
    var fields = record.fields || record || {};
    return []
      .concat(valueList(fields.councilID))
      .concat(valueList(fields.councilIds))
      .concat(valueList(fields.councilRecordId));
  }

  function closedCouncilIdsFromLoans(loans) {
    var ids = {};

    loans.forEach(function (loan) {
      var fields = loan.fields || loan || {};
      if (!statusMatches(fields.raiseStatus, "closed")) return;

      loanCouncilIds(loan).forEach(function (id) {
        ids[id] = true;
      });
    });

    return ids;
  }

  function normalizeCouncilHubUrl(value) {
    var raw = String(value || "").trim();

    if (!raw || raw === "#") return raw || "#";

    var pathname = raw;

    try {
      pathname = new URL(raw, window.location.origin).pathname || "/";
    } catch (error) {
      pathname = raw.split("?")[0].split("#")[0] || raw;
    }

    pathname = pathname.replace(/\/+$/, "") || "/";

    if (/^\/council-[^/]+$/.test(pathname)) {
      return pathname.replace(/^\/council-/, "/council/");
    }

    return pathname;
  }

  function buildControlsAndRender(select, summary, chart, result) {
    var dataByCouncil = result.dataByCouncil;
    var logosByCouncil = result.logosByCouncil;
    var logoLinksByCouncil = result.logoLinksByCouncil;

    var councils = Object.keys(dataByCouncil)
      .filter(function (name) {
        return name !== "All councils";
      })
      .sort();

    select.innerHTML = "";

    if (dataByCouncil["All councils"]) {
      select.insertAdjacentHTML(
        "beforeend",
        '<option value="All councils">All councils</option>'
      );
    }

    councils.forEach(function (council) {
      select.insertAdjacentHTML(
        "beforeend",
        '<option value="' + escapeHtml(council) + '">' + escapeHtml(council) + "</option>"
      );
    });

    var initial = dataByCouncil["All councils"] ? "All councils" : councils[0];

    if (!initial) {
      select.innerHTML = '<option value="">No spend data available</option>';
      summary.innerHTML =
        '<p class="abundance-body-compact m-b-spacer-0">No spend data is available yet.</p>';
      chart.innerHTML = "";
      return;
    }

    select.value = initial;
    renderAll(initial, summary, chart, dataByCouncil, logosByCouncil, logoLinksByCouncil);

    select.addEventListener("change", function () {
      renderAll(select.value, summary, chart, dataByCouncil, logosByCouncil, logoLinksByCouncil);
    });
  }

  function renderAll(council, summary, chart, dataByCouncil, logosByCouncil, logoLinksByCouncil) {
    renderSummary(council, summary, dataByCouncil, logosByCouncil, logoLinksByCouncil);
    renderChart(council, chart, dataByCouncil);
  }

  function renderSummary(council, summary, dataByCouncil, logosByCouncil, logoLinksByCouncil) {
  var data = dataByCouncil[council];

  if (!data) {
    summary.innerHTML =
      '<p class="abundance-body-compact m-b-spacer-0">No data available.</p>';
    return;
  }

  var isAll = council === "All councils";
  var badgeHtml = getBadgeHtml(council, isAll, logosByCouncil, logoLinksByCouncil);

  summary.innerHTML =
    '<div class="row gx-sm gy-xs align-items-center flex-nowrap">' +

      '<div class="col-auto">' +
        badgeHtml +
      '</div>' +

      '<div class="col">' +
        '<div class="row row-cols-1 row-cols-sm-3 gx-xs gy-xs align-items-start">' +

          '<div>' +
            '<hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-eyebrow">Amount spent</div>' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-stat">' + escapeHtml(formatPoundsShort(data.totalSpent)) + '</div>' +
          '</div>' +

          '<div>' +
            '<hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-eyebrow">Projects financed</div>' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-stat">' + escapeHtml(formatNumber(data.projectsFunded)) + '</div>' +
          '</div>' +

          '<div>' +
            '<hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-eyebrow">Investments</div>' +
            '<div class="p-t-spacer-3xs" aria-hidden="true"></div>' +
            '<div class="abundance-stat">' + escapeHtml(formatNumber(data.numberOfLoans)) + '</div>' +
          '</div>' +

        '</div>' +
      '</div>' +

    '</div>';
}

  function getBadgeHtml(council, isAll, logosByCouncil, logoLinksByCouncil) {
    var sizeStyle =
      "width:88px;height:88px;border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:0 0 88px;";

    if (isAll) {
      return (
        '<div style="' + sizeStyle + 'background:' + ALL_COUNCILS_BADGE_BG + ';">' +
          '<img src="' + ALL_COUNCILS_BADGE_LOGO + '" alt="All councils" style="max-width:72%;max-height:72%;">' +
        '</div>'
      );
    }

    var logoData = logosByCouncil[council] || {};
    var logoHref = logoLinksByCouncil[council] || "";
    var bgHex = logoData.bgHex || "#f1eeed";
    var whiteLogoUrl = logoData.whiteLogoUrl || "";

    var badge =
      '<div style="' + sizeStyle + 'background:' + escapeHtml(bgHex) + ';">' +
        (
          whiteLogoUrl
            ? '<img src="' + escapeHtml(whiteLogoUrl) + '" alt="' + escapeHtml(council) + ' logo" style="max-width:74%;max-height:74%;">'
            : '<span class="abundance-action-text">' + escapeHtml(getInitials(council)) + '</span>'
        ) +
      '</div>';

    if (!logoHref) return badge;

    return (
      '<a href="' + escapeHtml(logoHref) + '" target="_blank" rel="noopener" aria-label="' + escapeHtml(council) + ' council page">' +
        badge +
      '</a>'
    );
  }

  function renderChart(council, chart, dataByCouncil) {
    var data = dataByCouncil[council] || { entries: [] };
    var valueMap = {};

    data.entries.forEach(function (entry) {
      valueMap[entry.name] = entry.value;
    });

    var rows = CATEGORY_META.map(function (category) {
      return {
        name: category.label,
        value: valueMap[category.label] || 0,
        colour: category.colour
      };
    });

    var max = rows.reduce(function (highest, row) {
      return row.value > highest ? row.value : highest;
    }, 0);

    chart.innerHTML = "";

    if (max <= 0) {
      chart.innerHTML =
        '<div class="si-card si-card--secondary p-all-spacer-sm">' +
          '<p class="abundance-body-compact m-b-spacer-0">' +
            'This council has not yet reported data on how the money has been spent. Please check again later.' +
          '</p>' +
        '</div>';
      return;
    }

    rows.forEach(function (row) {
      var pct = row.value > 0 ? Math.max((row.value / max) * 100, 10) : 0;

      chart.insertAdjacentHTML(
        "beforeend",
        '<div class="abundance-bar-chart__row">' +
          '<span class="abundance-bar-chart__label abundance-body-compact">' +
            escapeHtml(row.name) +
          '</span>' +

          '<div class="abundance-bar-chart__bar">' +
            '<span class="abundance-bar-chart__bar-fill" style="width:' + pct.toFixed(2) + '%; background-color:' + row.colour + ';" aria-hidden="true"></span>' +
            '<span class="abundance-bar-chart__value abundance-action-text">' +
              escapeHtml(formatPoundsShort(row.value)) +
            '</span>' +
          '</div>' +
        '</div>'
      );
    });
  }

  function isComingSoonStatus(raiseStatus) {
    return (
      Object.prototype.toString.call(raiseStatus) === "[object Array]" &&
      raiseStatus.length === 1 &&
      raiseStatus[0] === "Coming soon"
    );
  }

  function parseNumber(value) {
    if (value === undefined || value === null || value === "") return 0;
    if (typeof value === "number") return value;

    var n = parseFloat(String(value).replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  }

  function formatPoundsShort(value) {
    var v = Number(value) || 0;

    if (v >= 1000000) {
      return "£" + (v / 1000000).toFixed(2).replace(/\.00$/, "") + "m";
    }

    if (v >= 1000) {
      return "£" + Math.round(v / 1000).toLocaleString("en-GB") + "k";
    }

    return "£" + Math.round(v).toLocaleString("en-GB");
  }

  function formatNumber(value) {
    return Math.round(Number(value) || 0).toLocaleString("en-GB");
  }

  function getInitials(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0).toUpperCase();
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUseOfFunds);
  } else {
    initUseOfFunds();
  }
})();
