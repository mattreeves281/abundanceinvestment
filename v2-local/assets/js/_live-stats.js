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
