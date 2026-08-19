/* Page script: council-hub-legacy.js */
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
