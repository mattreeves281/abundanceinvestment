<script>
  (function () {
    const CONFIG_SELECTOR = "[data-abv2-programme-hub-config]";
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
      return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
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

    function sortByDateDesc(records, key) {
      return records.slice().sort(function (a, b) {
        return parseDate(getFields(b)[key]) - parseDate(getFields(a)[key]);
      });
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

    function formatMoney(value) {
      const number = safeNumber(value);
      if (!(number > 0)) return "-";
      return "£" + Math.round(number).toLocaleString("en-GB");
    }

    function formatMonthYear(value) {
      const time = parseDate(value);
      if (!time) return "-";

      return new Intl.DateTimeFormat("en-GB", {
        month: "short",
        year: "numeric"
      }).format(new Date(time));
    }

    function formatLongDate(value) {
      const time = parseDate(value);
      if (!time) return "-";

      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(new Date(time));
    }

    function formatPercentRate(value) {
      const number = safeNumber(value);
      const percent = number > 0 && number < 1 ? number * 100 : number;
      if (!(percent > 0)) return "-";
      return (Math.round(percent * 100) / 100).toFixed(2).replace(/\.?0+$/, "") + "%";
    }

    function formatRate(value) {
      const number = safeNumber(value);
      return number.toFixed(2).replace(/\.00$/, "") + "%";
    }

    function formatYears(value) {
      const years = safeNumber(value);
      return years === 1 ? "1 year" : years + " years";
    }

    function formatGBP(value, options) {
      const number = Number(value) || 0;
      const decimals = options && typeof options.decimals === "number"
        ? options.decimals
        : (Math.round(number) === number ? 0 : 2);

      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(number);
    }

    function formatTerm(fields) {
      const value = fields.termLength || fields.term || fields.loanTerm || fields.termYears || fields.duration || "";
      const number = safeNumber(value);
      if (number > 0) return number + (number === 1 ? " year" : " years");
      return value || "-";
    }

    function textValue(fields, keys, fallback) {
      for (const key of keys) {
        const value = firstValue(fields[key]);
        if (value) return String(value);
      }
      return fallback || "";
    }

    function setText(field, value) {
      document.querySelectorAll('[data-abv2-programme-field="' + field + '"]').forEach(function (element) {
        element.textContent = value;
      });
    }

    function setCalcField(calculator, field, value) {
      calculator.querySelectorAll('[data-abv2-calc-field="' + field + '"]').forEach(function (element) {
        element.textContent = value === undefined || value === null ? "" : value;
      });
    }

    function setKeyTermsField(field, value) {
      document.querySelectorAll('[data-keyterms-field="' + field + '"]').forEach(function (element) {
        element.textContent = value === undefined || value === null ? "" : value;
      });
    }

    function setVisible(selector, visible) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.hidden = !visible;
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
                ${Math.round(row.percent * 10) / 10}%
              </span>
            </div>
          </div>
        `;
      }).join("");
    }

    function setUseOfFundsState(totalSpent) {
      setVisible("[data-abv2-use-of-funds-content]", totalSpent > 0);
      setVisible("[data-abv2-no-spend-content]", !(totalSpent > 0));
    }

    function renderInvestmentHistory(loans, showUseOfFunds) {
      const bodies = document.querySelectorAll("[data-abv2-investment-history-body]");
      if (!bodies.length) return;

      if (!loans.length) {
        bodies.forEach(function (tbody) {
          tbody.innerHTML = '<tr><td colspan="5">No previous investments to show yet.</td></tr>';
        });
        return;
      }

      const html = sortByDateDesc(loans, "closeDate").map(function (loan) {
        const fields = getFields(loan);
        const name = textValue(fields, ["investmentName", "name", "loanName"], "Investment");
        const useOfFunds = textValue(fields, ["strapline", "useOfFunds", "loanUseOfFunds", "investmentUseOfFunds", "description"], "-");

        return `
          <tr>
            <td data-label="Investment">${name}</td>
            ${showUseOfFunds ? '<td data-label="Use of funds">' + useOfFunds + "</td>" : ""}
            <td data-label="Interest rate">${formatPercentRate(fields.rateOfReturn)}</td>
            <td data-label="Amount raised">${formatMoney(loanAmount(loan))}</td>
            <td data-label="Close date">${formatMonthYear(fields.closeDate)}</td>
          </tr>
        `;
      }).join("");

      bodies.forEach(function (tbody) {
        tbody.innerHTML = html;
      });
    }

    function updatePaymentCalculator(calculator) {
      const input = calculator.querySelector("[data-abv2-calc-input]");
      if (!input) return;

      const amount = safeNumber(input.value);
      const rate = safeNumber(calculator.getAttribute("data-rate"));
      const termYears = safeNumber(calculator.getAttribute("data-term-years"));
      const interestDate1 = calculator.getAttribute("data-interest-date-1") || "June";
      const interestDate2 = calculator.getAttribute("data-interest-date-2") || "December";

      const paymentCount = termYears * 2;
      const interestPayment = amount * (rate / 100) / 2;
      const totalInterest = interestPayment * paymentCount;
      const capitalRepaid = amount;
      const totalReturned = capitalRepaid + totalInterest;

      setCalcField(calculator, "rate", formatRate(rate));
      setCalcField(calculator, "termYears", formatYears(termYears));
      setCalcField(calculator, "amount", formatGBP(amount, { decimals: 0 }));
      setCalcField(calculator, "interestPayment", formatGBP(interestPayment));
      setCalcField(calculator, "totalInterest", formatGBP(totalInterest));
      setCalcField(calculator, "capitalRepaid", formatGBP(capitalRepaid, { decimals: 0 }));
      setCalcField(calculator, "totalReturned", formatGBP(totalReturned));
      setCalcField(calculator, "interestDate1", interestDate1);
      setCalcField(calculator, "interestDate2", interestDate2);
      setCalcField(calculator, "paymentCount", paymentCount);
    }

    function initPaymentCalculators() {
      document.querySelectorAll("[data-abv2-calc-config]").forEach(function (calculator) {
        const input = calculator.querySelector("[data-abv2-calc-input]");
        if (!input) return;

        input.addEventListener("input", function () {
          updatePaymentCalculator(calculator);
        });

        input.addEventListener("change", function () {
          updatePaymentCalculator(calculator);
        });

        updatePaymentCalculator(calculator);
      });
    }

    function updateCalculatorTerms(openLoan) {
      if (!openLoan) return;
      const fields = getFields(openLoan);
      const rate = safeNumber(fields.rateOfReturn) > 0 && safeNumber(fields.rateOfReturn) < 1
        ? safeNumber(fields.rateOfReturn) * 100
        : safeNumber(fields.rateOfReturn);
      const term = safeNumber(fields.termLength || fields.term || fields.loanTerm || fields.termYears || fields.duration || 5);

      document.querySelectorAll("[data-abv2-calc-config]").forEach(function (calculator) {
        calculator.setAttribute("data-rate", rate || 0);
        calculator.setAttribute("data-term-years", term || 0);
        updatePaymentCalculator(calculator);
      });
    }

    function updateKeyTerms(openLoan, councilFields) {
      if (!openLoan) return;
      const fields = getFields(openLoan);
      const rate = formatPercentRate(fields.rateOfReturn);
      const term = formatTerm(fields);
      const name = textValue(fields, ["investmentName", "name", "loanName"], "Investment");
      const useOfFunds = textValue(fields, ["strapline", "useOfFunds", "loanUseOfFunds", "investmentUseOfFunds", "description"], "");

      setKeyTermsField("investmentName", name);
      setKeyTermsField("borrower", councilFields.issuingCouncil || "Council");
      if (useOfFunds) setKeyTermsField("useOfFunds", useOfFunds);
      setKeyTermsField("interestRate", rate);
      setKeyTermsField("termPeriod", term);
      setKeyTermsField("offerCloseDate", formatLongDate(fields.closeDate));
    }

    function initNativeDialogs() {
      document.addEventListener("click", function (event) {
        const trigger = event.target.closest("[data-modal-open]");
        if (!trigger) return;

        const modalId = trigger.getAttribute("data-modal-open");
        const modal = document.getElementById(modalId);
        if (!modal) return;

        event.preventDefault();

        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.setAttribute("open", "");
        }
      });

      document.addEventListener("click", function (event) {
        const modal = event.target.closest("dialog.si-modal");
        if (!modal || event.target !== modal) return;
        modal.close();
      });
    }

    function updateOpenInvestment(openLoan, councilFields) {
      if (!openLoan) return;
      const fields = getFields(openLoan);
      const rate = formatPercentRate(fields.rateOfReturn);
      const term = formatTerm(fields);
      const name = textValue(fields, ["investmentName", "name", "loanName"], "Open investment");
      const useOfFunds = textValue(fields, ["strapline", "useOfFunds", "loanUseOfFunds", "investmentUseOfFunds", "description"], "");
      const closeDate = formatLongDate(fields.closeDate);

      setText("openInvestmentName", name);
      if (useOfFunds) {
        setText("openInvestmentCopy", useOfFunds);
      }
      setText("currentInterestRate", rate);
      setText("investmentTerm", term);
      setText("offerCloseDate", closeDate);
      setText("capitalRepaid", "At maturity");
      updateCalculatorTerms(openLoan);
      updateKeyTerms(openLoan, councilFields || {});

      const investUrl = textValue(fields, ["loanUrl", "url", "shareInUrl", "investmentUrl"], "/invest-now").trim();
      document.querySelectorAll("[data-abv2-invest-button]").forEach(function (link) {
        link.href = investUrl.replace(/^https?:\/\/www\.abundanceinvestment\.com/, "");
      });
    }

    async function fetchJson(endpoint) {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error(endpoint + " returned " + response.status);
      return response.json();
    }

    async function init() {
      const config = document.querySelector(CONFIG_SELECTOR);
      if (!config) return;

      const councilRecordId = String(config.dataset.councilRecordId || "").trim();
      if (!councilRecordId) return;

      const councilsEndpoint = config.dataset.councilsEndpoint || DEFAULT_COUNCILS_ENDPOINT;
      const loansEndpoint = config.dataset.loansEndpoint || DEFAULT_LOANS_ENDPOINT;
      const showUseOfFundsColumn = config.dataset.historyUseOfFunds !== "false";

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
        const openLoans = sortByDateDesc(councilLoans.filter(function (loan) {
          return hasStatus(getFields(loan).raiseStatus, "Open");
        }), "openDate");
        const closedLoans = councilLoans.filter(function (loan) {
          return !hasStatus(getFields(loan).raiseStatus, "Open") && getFields(loan).closeDate;
        });
        const hasOpenLoan = openLoans.length > 0;
        const amountRaised = councilLoans.reduce(function (total, loan) {
          return total + loanAmount(loan);
        }, 0);
        const spentSoFar = computedSpent(councilFields);

        setText("councilName", councilFields.issuingCouncil || "Council");
        setText("amountRaised", formatShortMoney(amountRaised));
        setText("investmentClosed", formatMonthYear(latestCloseDate(councilLoans)));
        setText("spentSoFar", formatShortMoney(spentSoFar));
        setText("amountSpent", formatShortMoney(spentSoFar));
        setText("projectsFinanced", Math.round(safeNumber(councilFields.projectsFunded)).toLocaleString("en-GB"));
        setText("investmentsCount", councilLoans.length.toLocaleString("en-GB"));
        setLogo(councilFields);
        setUseOfFundsState(spentSoFar);
        renderChart(councilFields, spentSoFar);

        setVisible("[data-abv2-open-state]", hasOpenLoan);
        setVisible("[data-abv2-no-open-state]", !hasOpenLoan);
        updateOpenInvestment(openLoans[0], councilFields);

        setVisible("[data-abv2-no-open-history]", !hasOpenLoan && closedLoans.length > 0);
        setVisible("[data-abv2-open-history]", hasOpenLoan && closedLoans.length > 1);
        renderInvestmentHistory(closedLoans, showUseOfFundsColumn);
        initPaymentCalculators();
        initNativeDialogs();
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
</script>
