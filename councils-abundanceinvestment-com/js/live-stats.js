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
      const number = Number(value.replace(/[^0-9.\-]/g, ""));
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
        if (values[key]) element.textContent = values[key];
      });
    });
  }

  function councilName(record) {
    return firstValue(getValue(record, "issuingCouncil")) ||
      firstValue(getValue(record, "councilName")) ||
      firstValue(getValue(record, "name")) ||
      "";
  }

  function councilSlug(record) {
    return councilName(record)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function councilStats(councils, loans) {
    const eligibleCouncilIds = Array.isArray(loans) ? eligibleCouncilIdsFromLoans(loans) : null;

    const eligibleCouncils = eligibleCouncilIds
      ? councils.filter(function (record) {
        return record && record.id && eligibleCouncilIds.has(record.id);
      })
      : councils;

    const visibleCouncils = eligibleCouncils.filter(function (record) {
      return !shouldExcludeCouncil(record);
    });

    const totals = councils.reduce(function (acc, record) {
      acc.totalSpent += safeNumber(getValue(record, "totalSpent"));
      acc.projectsFunded += safeNumber(getValue(record, "projectsFunded"));
      return acc;
    }, {
      totalSpent: 0,
      projectsFunded: 0
    });

    const totalRaised = visibleCouncils.reduce(function (sum, record) {
      return sum + safeNumber(getValue(record, "totalRaised"));
    }, 0);

    const stats = {
      projectsFinanced: formatInt(totals.projectsFunded),
      spentOnProjects: formatMoneyCompact(totals.totalSpent, 1),
      totalInvested: formatMoneyCompact(totalRaised, 1),
      uniqueCouncils: formatInt(visibleCouncils.length)
    };

    councils.forEach(function (record) {
      const slug = councilSlug(record);
      if (!slug) return;
      stats["councilRaised:" + slug] = formatMoneyCompact(getValue(record, "totalRaised"), 1);
    });

    return stats;
  }

  function refresh() {
    if (!document.querySelector("[data-abv2-stat]")) return;

    Promise.all([
      fetchRecords(COUNCILS_ENDPOINT, "councils"),
      fetchRecords(LOANS_ENDPOINT, "loans")
    ])
      .then(function ([councils, loans]) {
        setStats(councilStats(councils, loans));
      })
      .catch(function (error) {
        console.error("Council live stats failed:", error);
      });
  }

  window.AbundanceCouncilLiveStats = {
    refresh: refresh,
    fetchCouncils: function () {
      return fetchRecords(COUNCILS_ENDPOINT, "councils");
    },
    fetchLoans: function () {
      return fetchRecords(LOANS_ENDPOINT, "loans");
    },
    councilStats: councilStats
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refresh);
  } else {
    refresh();
  }

  window.addEventListener("pageshow", refresh);
})();
