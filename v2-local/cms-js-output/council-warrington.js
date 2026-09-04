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
    const CONFIG_SELECTOR = "[data-abv2-council-hub-config]";
    const DEFAULT_COUNCILS_ENDPOINT = "https://data.abundanceinvestment.com/councils";
    const DEFAULT_LOANS_ENDPOINT = "https://data.abundanceinvestment.com/loans";

    const CATEGORY_META = [
      { jsonKey: "renewableEnergySpend", label: "Renewable energy", color: "#f7d9e8" },
      { jsonKey: "energyEfficiencySpend", label: "Energy efficiency", color: "#ccedf0" },
      { jsonKey: "cleanTransportationSpend", label: "Clean transportation", color: "#ffeecd" },
      { jsonKey: "pollutionPreventionSpend", label: "Pollution prevention and control", color: "#f7c9a0" },
      { jsonKey: "climateChangeAdaptationSpend", label: "Climate change adaptation", color: "#d8c4eb" },
      { jsonKey: "livingNationalResourcesSpend", label: "Living and natural resources", color: "#bfeff4" }
    ];

    function getFields(record) {
      return record && record.fields && typeof record.fields === "object"
        ? record.fields
        : record || {};
    }

    function recordsFromResponse(data) {
      return Array.isArray(data) ? data : Array.isArray(data && data.records) ? data.records : [];
    }

    function safeNumber(value) {
      if (typeof value === "number" && Number.isFinite(value)) return value;

      if (typeof value === "string") {
        const number = Number(value.replace(/[^0-9.\-]/g, ""));
        return Number.isFinite(number) ? number : 0;
      }

      return 0;
    }

    function firstValue(value) {
      if (Array.isArray(value)) return value.length ? value[0] : "";
      return value || "";
    }

    function councilIdForLoan(record) {
      return String(firstValue(getFields(record).councilID) || "").trim();
    }

    function loanAmount(record) {
      const fields = getFields(record);
      return safeNumber(fields.totalRaised || fields.loanAmount || fields.targetAmount);
    }

    function parseDate(value) {
      const time = Date.parse(value || "");
      return Number.isFinite(time) ? time : 0;
    }

    function latestCloseDate(loans) {
      return loans.reduce(function (latest, loan) {
        const closeDate = getFields(loan).closeDate;
        return parseDate(closeDate) > parseDate(latest) ? closeDate : latest;
      }, "");
    }

    function computedSpent(fields) {
      const categoriesTotal = CATEGORY_META.reduce(function (total, category) {
        return total + safeNumber(fields[category.jsonKey]);
      }, 0);

      return safeNumber(fields.totalSpent) || categoriesTotal;
    }

    function formatShortMoney(value) {
      const number = safeNumber(value);
      if (!(number > 0)) return "£0";

      if (number >= 1000000) {
        const millions = number / 1000000;
        return "£" + (millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)) + "m";
      }

      if (number >= 1000) {
        const thousands = number / 1000;
        return "£" + (thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)) + "k";
      }

      return "£" + Math.round(number).toLocaleString("en-GB");
    }

    function formatMonthYear(value) {
      const time = parseDate(value);
      if (!time) return "";

      return new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric"
      }).format(new Date(time));
    }

    function formatPercent(value) {
      const rounded = Math.round(value * 10) / 10;
      return String(rounded).replace(/\.0$/, "") + "%";
    }

    function setText(field, value) {
      document.querySelectorAll('[data-abv2-council-field="' + field + '"]').forEach(function (element) {
        element.textContent = value;
      });
    }

    function setLogo(fields) {
      const logo = firstValue(fields.whiteLogo);
      const name = fields.issuingCouncil || "Council";
      const hex = firstValue(fields.hex);

      if (hex) {
        document.querySelectorAll("[data-abv2-council-logo-tile]").forEach(function (tile) {
          tile.style.background = hex;
        });
      }

      if (!logo) return;

      document.querySelectorAll("[data-abv2-council-logo]").forEach(function (image) {
        image.src = logo;
        image.alt = name;
      });
    }

    function renderChart(fields, totalSpent) {
      const chart = document.querySelector("[data-abv2-use-of-funds-chart]");
      if (!chart) return;

      const rows = CATEGORY_META.map(function (category) {
        const value = safeNumber(fields[category.jsonKey]);
        return {
          label: category.label,
          value: value,
          percent: totalSpent > 0 ? (value / totalSpent) * 100 : 0,
          color: category.color
        };
      })
        .filter(function (row) {
          return row.value > 0;
        })
        .sort(function (a, b) {
          return b.value - a.value;
        });

      if (!rows.length) {
        chart.innerHTML = "";
        return;
      }

      chart.innerHTML = rows.map(function (row) {
        const width = Math.max(1, Math.min(100, row.percent));

        return `
          <div class="abundance-bar-chart__row">
            <span class="abundance-bar-chart__label abundance-body-compact">
              ${row.label}
            </span>
            <div class="abundance-bar-chart__bar">
              <span class="abundance-bar-chart__bar-fill" style="width:${width}%; background-color:${row.color};" aria-hidden="true"></span>
              <span class="abundance-bar-chart__value abundance-action-text">
                ${formatPercent(row.percent)}
              </span>
            </div>
          </div>
        `;
      }).join("");
    }

    function setUseOfFundsState(totalSpent) {
      const chartContent = document.querySelector("[data-abv2-use-of-funds-content]");
      const noSpendContent = document.querySelector("[data-abv2-no-spend-content]");
      const hasSpend = totalSpent > 0;

      if (chartContent) {
        chartContent.hidden = !hasSpend;
      }

      if (noSpendContent) {
        noSpendContent.hidden = hasSpend;
      }
    }

    async function fetchJson(endpoint) {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(endpoint + " returned " + response.status);
      }

      return response.json();
    }

    async function init() {
      const config = document.querySelector(CONFIG_SELECTOR);
      if (!config) return;

      const councilRecordId = String(config.dataset.councilRecordId || "").trim();
      if (!councilRecordId) return;

      const councilsEndpoint = config.dataset.councilsEndpoint || DEFAULT_COUNCILS_ENDPOINT;
      const loansEndpoint = config.dataset.loansEndpoint || DEFAULT_LOANS_ENDPOINT;

      try {
        const [councilsData, loansData] = await Promise.all([
          fetchJson(councilsEndpoint),
          fetchJson(loansEndpoint)
        ]);

        const council = recordsFromResponse(councilsData).find(function (record) {
          return record.id === councilRecordId;
        });

        if (!council) return;

        const councilFields = getFields(council);
        const councilLoans = recordsFromResponse(loansData).filter(function (record) {
          return councilIdForLoan(record) === councilRecordId;
        });

        const amountRaised = councilLoans.reduce(function (total, loan) {
          return total + loanAmount(loan);
        }, 0);
        const investmentClosed = latestCloseDate(councilLoans);
        const spentSoFar = computedSpent(councilFields);

        setText("councilName", councilFields.issuingCouncil || "Council");
        if (councilFields.councilDescription) {
          setText("councilDescription", councilFields.councilDescription);
        }
        setText("amountRaised", formatShortMoney(amountRaised));
        setText("investmentClosed", formatMonthYear(investmentClosed));
        setText("spentSoFar", formatShortMoney(spentSoFar));
        setText("amountSpent", formatShortMoney(spentSoFar));
        setText("projectsFinanced", Math.round(safeNumber(councilFields.projectsFunded)).toLocaleString("en-GB"));
        setText("investmentsCount", councilLoans.length.toLocaleString("en-GB"));
        setLogo(councilFields);
        setUseOfFundsState(spentSoFar);
        renderChart(councilFields, spentSoFar);
      } catch (error) {
        console.error(error);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();
