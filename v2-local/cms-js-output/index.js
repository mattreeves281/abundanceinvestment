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
    if (!document.querySelector("[data-abv2-stat]")) return false;

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

    return true;
  }

  let councilStatsObserver;

  function initCouncilStatsWhenReady() {
    if (initCouncilStats()) {
      if (councilStatsObserver) {
        councilStatsObserver.disconnect();
        councilStatsObserver = null;
      }

      return;
    }

    if (councilStatsObserver || !document.body) return;

    councilStatsObserver = new MutationObserver(function () {
      initCouncilStatsWhenReady();
    });

    councilStatsObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.AbundanceLiveStats = {
    councilStats: councilStats,
    refreshCouncilStats: initCouncilStatsWhenReady,
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
    document.addEventListener("DOMContentLoaded", initCouncilStatsWhenReady);
  } else {
    initCouncilStatsWhenReady();
  }

  window.addEventListener("pageshow", function () {
    initCouncilStatsWhenReady();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      initCouncilStatsWhenReady();
    }
  });
})();

(function () {
  const forceNoOpenLoansForPreview = false;
  const listSelector = "[data-abv2-open-investments-list]";
  let openInvestmentsObserver;

  function getList() {
    return document.querySelector(listSelector);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getFields(record) {
    return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
  }

  function getValue(record, key) {
    return getFields(record)[key];
  }

  function firstValue(value) {
    if (!value) return "";
    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
      return value.length ? firstValue(value[0]) : "";
    }

    if (typeof value === "object") {
      return value.url || value.src || value.name || value.value || "";
    }

    return String(value);
  }

  function valueList(value) {
    if (!value) return [];
    return Array.isArray(value) ? value.map(firstValue).filter(Boolean) : [firstValue(value)].filter(Boolean);
  }

  function normaliseText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normaliseStatusItem(item) {
    return normaliseText(firstValue(item) || item);
  }

  function includesStatus(raiseStatus, target) {
    const normalisedTarget = normaliseText(target);

    if (!raiseStatus) return false;
    if (typeof raiseStatus === "string") return normaliseStatusItem(raiseStatus) === normalisedTarget;

    if (Array.isArray(raiseStatus)) {
      return raiseStatus.some(function (item) {
        return normaliseStatusItem(item) === normalisedTarget;
      });
    }

    return normaliseStatusItem(raiseStatus) === normalisedTarget;
  }

  function normaliseCouncilUrl(value, councilName) {
    const raw = String(value || "").trim();
    let pathname = raw;

    if (raw && raw !== "#") {
      try {
        const parsed = new URL(raw, window.location.origin);
        pathname = parsed.pathname || "/";
      } catch {
        pathname = raw.split("?")[0].split("#")[0] || raw;
      }

      pathname = pathname.replace(/\/+$/, "") || "/";

      if (/^\/council-[^/]+$/.test(pathname)) {
        return pathname.replace(/^\/council-/, "/council/");
      }

      return pathname;
    }

    const slug = normaliseText(councilName)
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug ? "/council/" + slug : "#";
  }

  function councilName(record) {
    return firstValue(getValue(record, "issuingCouncil")) ||
      firstValue(getValue(record, "councilName")) ||
      firstValue(getValue(record, "name")) ||
      "Council";
  }

  function councilKey(record) {
    return normaliseText(councilName(record)).replace(/&/g, "and");
  }

  function loanCouncilIds(record) {
    const fields = getFields(record);
    return []
      .concat(valueList(fields.councilID))
      .concat(valueList(fields.councilIds))
      .concat(valueList(fields.councilRecordId));
  }

  function loanCouncilNames(record) {
    const fields = getFields(record);
    return []
      .concat(valueList(fields.council))
      .concat(valueList(fields.councilName))
      .concat(valueList(fields.issuingCouncil))
      .concat(valueList(fields.borrower))
      .map(function (value) {
        return normaliseText(value).replace(/&/g, "and");
      })
      .filter(Boolean);
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .map(function (word) {
        return word.charAt(0).toUpperCase();
      })
      .join("");
  }

  function renderFallback() {
    const list = getList();
    if (!list) return;

    list.innerHTML = `
      <div class="col-12">
        <p class="body--lg text-center m-b-spacer-0">
          There are no municipal investments open at the moment. Please check again soon.
        </p>
      </div>
    `;
  }

  function renderTile(record) {
    const fields = getFields(record);
    const name = councilName(record);
    const url = normaliseCouncilUrl(firstValue(fields.councilHub), name);
    const bgHex = firstValue(fields.hex) || "#363635";
    const logo = firstValue(fields.whiteLogo);
    const label = "View " + name;

    return `
      <div class="col-auto">
        <a
          href="${escapeHtml(url)}"
          class="d-flex align-items-center justify-content-center text-decoration-none"
          aria-label="${escapeHtml(label)}"
          style="width:min(42vw, 220px); aspect-ratio:1 / 1; border-radius:36px; background:${escapeHtml(bgHex)}; overflow:hidden;"
        >
          ${
            logo
              ? `
                <img
                  src="${escapeHtml(logo)}"
                  alt="${escapeHtml(name)}"
                  loading="lazy"
                  decoding="async"
                  style="max-width:72%; max-height:72%; object-fit:contain;"
                >
              `
              : `
                <span class="abundance-action-text text-color--invert-primary">
                  ${escapeHtml(initials(name))}
                </span>
              `
          }
        </a>
      </div>
    `;
  }

  function findCouncilForLoan(loan, byId, byName) {
    const ids = loanCouncilIds(loan);

    for (const id of ids) {
      if (byId.has(id)) return byId.get(id);
    }

    const names = loanCouncilNames(loan);

    for (const name of names) {
      if (byName.has(name)) return byName.get(name);
    }

    return null;
  }

  function renderOpenInvestments() {
    const list = getList();
    if (!list || !window.AbundanceLiveStats) return false;

    Promise.all([
      window.AbundanceLiveStats.fetchCouncils(),
      window.AbundanceLiveStats.fetchLoans()
    ])
      .then(function ([councils, loans]) {
        const councilsById = new Map();
        const councilsByName = new Map();

        councils.forEach(function (record) {
          if (record && record.id) councilsById.set(record.id, record);
          councilsByName.set(councilKey(record), record);
        });

        const openCouncils = [];
        const seen = new Set();

        loans
          .filter(function (loan) {
            return includesStatus(getValue(loan, "raiseStatus"), "open");
          })
          .forEach(function (loan) {
            const council = findCouncilForLoan(loan, councilsById, councilsByName);
            if (!council) return;

            const key = council.id || councilKey(council);
            if (seen.has(key)) return;

            seen.add(key);
            openCouncils.push(council);
          });

        if (forceNoOpenLoansForPreview || !openCouncils.length) {
          renderFallback();
          return;
        }

        const currentList = getList();
        if (currentList) currentList.innerHTML = openCouncils.map(renderTile).join("");
      })
      .catch(function (error) {
        console.error("Open investments failed:", error);
        renderFallback();
      });

    return true;
  }

  function refreshHomepageData() {
    if (window.AbundanceLiveStats && window.AbundanceLiveStats.refreshCouncilStats) {
      window.AbundanceLiveStats.refreshCouncilStats();
    }

    if (renderOpenInvestments()) {
      if (openInvestmentsObserver) {
        openInvestmentsObserver.disconnect();
        openInvestmentsObserver = null;
      }

      return;
    }

    watchForOpenInvestmentsList();
  }

  function watchForOpenInvestmentsList() {
    if (openInvestmentsObserver || !document.body) return;

    openInvestmentsObserver = new MutationObserver(function () {
      refreshHomepageData();
    });

    openInvestmentsObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshHomepageData);
  } else {
    refreshHomepageData();
  }

  window.addEventListener("pageshow", function () {
    window.setTimeout(refreshHomepageData, 0);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      window.setTimeout(refreshHomepageData, 0);
    }
  });
})();
