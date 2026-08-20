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

/* Page script: how-it-works-no-auto.js */
(function () {
    const defaultAnnualRate = 0.0455;
    const defaultAnnualRatePercent = "4.55";
    const defaultYears = 10;
    const termMonths = 5 * 12;
    const couponIntervalMonths = 6;
    const minimumInvestment = 5;
    let hasEditedRateInput = false;

    function formatMoney(value, options) {
      const decimals = options && Number.isFinite(options.decimals) ? options.decimals : 0;

      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    }

    function parseRawNumber(value) {
      const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
      return Number.isFinite(number) ? number : 0;
    }

    function parseContribution(value) {
      const number = parseRawNumber(value);
      if (number === 0) return 0;
      return number >= minimumInvestment ? number : 0;
    }

    function roundedGrowthDisplayAmounts(paidIn, futureValue) {
      const showPence = Math.abs(futureValue) < 1000;
      const factor = showPence ? 100 : 1;
      const decimals = showPence ? 2 : 0;
      const paidInDisplayValue = Math.round(paidIn * factor) / factor;
      const returnDisplayValue = Math.round((futureValue - paidIn) * factor) / factor;
      const futureDisplayValue = paidInDisplayValue + returnDisplayValue;

      return {
        paidIn: formatMoney(paidInDisplayValue, { decimals: decimals }),
        futureValue: formatMoney(futureDisplayValue, { decimals: decimals }),
        returnValue: formatMoney(returnDisplayValue, { decimals: decimals })
      };
    }

    function isBelowMinimumContribution(value) {
      const trimmed = String(value || "").trim();
      if (trimmed === "") return false;

      const number = parseRawNumber(value);
      return number !== 0 && number < minimumInvestment;
    }

    function parseAnnualRate() {
      const input = document.querySelector("[data-abv2-growth-rate-input]");
      if (!input) return defaultAnnualRate;

      const rate = parseRawNumber(input.value);
      return rate >= 0 ? rate / 100 : defaultAnnualRate;
    }

    function selectedYears() {
      const input = document.querySelector("[data-abv2-growth-term-input]");
      const pressedButton = document.querySelector('[data-abv2-growth-term-button][aria-pressed="true"]');
      const value = parseRawNumber(input && input.value ? input.value : pressedButton && pressedButton.dataset.termYears);
      return [3, 5, 10].includes(value) ? value : defaultYears;
    }

    function setSelectedYears(years) {
      const validYears = [3, 5, 10].includes(years) ? years : defaultYears;
      const input = document.querySelector("[data-abv2-growth-term-input]");

      if (input) {
        input.value = String(validYears);
      }

      document.querySelectorAll("[data-abv2-growth-term-button]").forEach(function (button) {
        const isSelected = parseRawNumber(button.dataset.termYears) === validYears;
        button.setAttribute("aria-pressed", isSelected ? "true" : "false");
        button.setAttribute("aria-current", isSelected ? "true" : "false");
        button.style.borderColor = isSelected ? "#00aec2" : "";
        button.style.backgroundColor = isSelected ? "#e5f7f9" : "";
        button.style.color = isSelected ? "#363635" : "";
      });
    }

    function futureValueTranches(options) {
      const projectionMonths = options.years * 12;
      const tranches = new Map();
      let cashBalance = 0;
      const annualRate = Number.isFinite(options.annualRate) ? options.annualRate : defaultAnnualRate;

      function getTrancheKey(tranche) {
        return [
          tranche.annualRate,
          tranche.nextCouponMonth,
          tranche.maturityMonth
        ].join("|");
      }

      function addTranche(principal, startMonth) {
        if (!Number.isFinite(principal) || principal < minimumInvestment) return;

        const tranche = {
          principal: principal,
          annualRate: annualRate,
          nextCouponMonth: startMonth + couponIntervalMonths,
          maturityMonth: startMonth + termMonths
        };
        const key = getTrancheKey(tranche);
        const existingTranche = tranches.get(key);

        if (existingTranche) {
          existingTranche.principal += principal;
        } else {
          tranches.set(key, tranche);
        }
      }

      function investCashBalance(month) {
        if (cashBalance < minimumInvestment) return;

        addTranche(cashBalance, month);
        cashBalance = 0;
      }

      cashBalance += options.initialAmount || 0;
      investCashBalance(0);

      for (let month = 0; month <= projectionMonths; month++) {
        if (month < projectionMonths) {
          cashBalance += options.monthlyPayment || 0;
        }

        const dueTranches = Array.from(tranches.entries()).filter(function (entry) {
          const tranche = entry[1];
          return tranche.nextCouponMonth === month || tranche.maturityMonth === month;
        });

        dueTranches.forEach(function (entry) {
          const key = entry[0];
          const tranche = entry[1];

          if (tranches.get(key) !== tranche) return;
          tranches.delete(key);

          if (tranche.nextCouponMonth === month) {
            cashBalance += tranche.principal * tranche.annualRate / 2;
          }

          if (tranche.maturityMonth === month) {
            cashBalance += tranche.principal;
          } else {
            tranche.nextCouponMonth += couponIntervalMonths;

            const nextKey = getTrancheKey(tranche);
            const existingTranche = tranches.get(nextKey);

            if (existingTranche) {
              existingTranche.principal += tranche.principal;
            } else {
              tranches.set(nextKey, tranche);
            }
          }
        });

        investCashBalance(month);
      }

      return Array.from(tranches.values()).reduce(function (total, tranche) {
        return total + tranche.principal;
      }, cashBalance);
    }

    function setText(selector, value) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.textContent = value;
      });
    }

    function updateGrowthRateLabel() {
      const input = document.querySelector("[data-abv2-growth-rate-input]");
      const rate = input ? parseRawNumber(input.value) : defaultAnnualRate * 100;
      const label = (rate > 0 ? rate : defaultAnnualRate * 100).toFixed(2).replace(/\.?0+$/, "") + "%";
      setText("[data-abv2-growth-rate-label]", label);
    }

    function setInputError(input, selector) {
      if (!input) return;

      const hasError = isBelowMinimumContribution(input.value);
      input.setAttribute("aria-invalid", hasError ? "true" : "false");

      document.querySelectorAll(selector).forEach(function (el) {
        el.hidden = !hasError;
      });
    }

    function updateGrowthCalculator() {
      const monthlyInput = document.querySelector("[data-abv2-growth-regular-input]");
      const lumpSumInput = document.querySelector("[data-abv2-growth-single-input]");
      if (!monthlyInput || !lumpSumInput) return;

      setInputError(monthlyInput, "[data-abv2-growth-regular-error]");
      setInputError(lumpSumInput, "[data-abv2-growth-single-error]");

      const years = selectedYears();
      const monthlyAmount = parseContribution(monthlyInput.value);
      const lumpSum = parseContribution(lumpSumInput.value);
      const annualRate = parseAnnualRate();
      const paidIn = lumpSum + (monthlyAmount * 12 * years);
      const futureValue = futureValueTranches({
        initialAmount: lumpSum,
        monthlyPayment: monthlyAmount,
        annualRate: annualRate,
        years: years
      });

      const displayAmounts = roundedGrowthDisplayAmounts(paidIn, futureValue);

      setText("[data-abv2-growth-term-label]", years + " years");
      setText("[data-abv2-growth-paid-in]", displayAmounts.paidIn);
      setText("[data-abv2-growth-result]", displayAmounts.futureValue);
      setText("[data-abv2-growth-return]", displayAmounts.returnValue);
    }

    function initGrowthCalculator() {
      const monthlyInput = document.querySelector("[data-abv2-growth-regular-input]");
      const lumpSumInput = document.querySelector("[data-abv2-growth-single-input]");
      const rateInput = document.querySelector("[data-abv2-growth-rate-input]");

      [monthlyInput, lumpSumInput].forEach(function (input) {
        if (!input) return;
        input.addEventListener("input", updateGrowthCalculator);
        input.addEventListener("change", updateGrowthCalculator);
      });

      if (rateInput) {
        rateInput.addEventListener("input", function () {
          hasEditedRateInput = true;
          updateGrowthCalculator();
        });
        rateInput.addEventListener("change", function () {
          hasEditedRateInput = true;
          updateGrowthCalculator();
        });
      }

      document.querySelectorAll("[data-abv2-growth-term-button]").forEach(function (button) {
        button.addEventListener("click", function () {
          setSelectedYears(parseRawNumber(button.dataset.termYears));
          updateGrowthCalculator();
        });
      });

      setSelectedYears(selectedYears());
      updateGrowthCalculator();
    }

    function getFields(record) {
      return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
    }

    function field(record, key) {
      return getFields(record)[key];
    }

    function normaliseStatusItem(value) {
      if (value && typeof value === "object") return normaliseStatusItem(value.name || value.value || "");
      return String(value || "").trim().toLowerCase();
    }

    function hasStatus(value, target) {
      const normalisedTarget = normaliseStatusItem(target);
      if (Array.isArray(value)) {
        return value.some(function (item) {
          return normaliseStatusItem(item) === normalisedTarget;
        });
      }

      return normaliseStatusItem(value) === normalisedTarget;
    }

    function historicRateSummary(records) {
      const rates = records.reduce(function (acc, record) {
        if (hasStatus(field(record, "raiseStatus"), "Open")) return acc;

        const rate = parseRawNumber(field(record, "rateOfReturn"));
        if (!(rate > 0)) return acc;

        acc.push(rate);
        return acc;
      }, []);

      if (!rates.length) {
        return {
          average: null,
          min: null,
          max: null
        };
      }

      return {
        average: rates.reduce(function (total, rate) {
          return total + rate;
        }, 0) / rates.length,
        min: Math.min.apply(null, rates),
        max: Math.max.apply(null, rates)
      };
    }

    function setRateStat(key, value) {
      if (!value) return;

      document.querySelectorAll('[data-abv2-rate-stat="' + key + '"]').forEach(function (element) {
        element.textContent = value;
      });
    }

    function defaultRateInputValue(rate) {
      return (rate * 100).toFixed(2).replace(/\.?0+$/, "");
    }

    function updateHistoricGrowthRateLabels(summary) {
      if (!summary) return;

      if (Number.isFinite(summary.average) && summary.average > 0) {
        setText("[data-abv2-growth-rate-label]", defaultRateInputValue(summary.average) + "%");
      }

      if (Number.isFinite(summary.min) && summary.min > 0) {
        setText("[data-abv2-growth-min-rate-label]", defaultRateInputValue(summary.min) + "%");
      }

      if (Number.isFinite(summary.max) && summary.max > 0) {
        setText("[data-abv2-growth-max-rate-label]", defaultRateInputValue(summary.max) + "%");
      }
    }

    function updateDefaultGrowthRate(rate) {
      if (!Number.isFinite(rate) || rate <= 0 || hasEditedRateInput) return;

      const value = defaultRateInputValue(rate);
      const input = document.querySelector("[data-abv2-growth-rate-input]");

      if (input && (String(input.value || "").trim() === defaultAnnualRatePercent || String(input.value || "").trim() === "")) {
        input.value = value;
      }

      updateGrowthCalculator();
    }

    function initHistoricRateStats() {
      if (!window.AbundanceLiveStats || !window.AbundanceLiveStats.fetchLoans) return;

      window.AbundanceLiveStats.fetchLoans()
        .then(function (records) {
          const stats = window.AbundanceLiveStats.loanStats(records);

          Object.keys(stats).forEach(function (key) {
            setRateStat(key, stats[key]);
          });

          const summary = historicRateSummary(records);
          updateHistoricGrowthRateLabels(summary);
          updateDefaultGrowthRate(summary.average);
        })
        .catch(function (error) {
          console.error("Historic rate stats failed:", error);
        });
    }

    function initPage() {
      initGrowthCalculator();
      initHistoricRateStats();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPage);
    } else {
      initPage();
    }
  })();
