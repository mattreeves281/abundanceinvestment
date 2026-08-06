<script>
  (function () {
    const keyTermsData = {
      "hammersmith-fulham": {
        investmentName: "H&F Green Investment",
        borrower: "Hammersmith & Fulham Council",
        useOfFunds: "Urban greening projects and green energy",
        interestRate: "4.5%",
        termPeriod: "5 years after the end of the initial interest period",
        maturityDate: "31 July 2031",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "2 March 2026",
        offerCloseDate: "3 September 2026",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£1.5 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 31 December 2026.",
        interestPeriods: "From 1 January to 30 June and 1 July to 31 December each year, starting from 1 January 2027.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.20% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 12 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/hf-loan-conditions.pdf"
      },
      "west-berkshire": {
        investmentName: "West Berkshire Green Investment",
        borrower: "West Berkshire Council",
        useOfFunds: "Solar power, building retrofit and low-carbon transport projects",
        interestRate: "4.5%",
        termPeriod: "5 years after the end of the initial interest period",
        maturityDate: "31 May 2031",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "20 February 2026",
        offerCloseDate: "3 September 2026",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£750,000",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 November 2026.",
        interestPeriods: "From 1 December to 31 May and 1 June to 30 November each year, starting from 1 December 2026.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.25% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 12 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/west-berkshire-loan-conditions.pdf"
      },
      "glasgow": {
        investmentName: "Glasgow Green Investment",
        borrower: "Glasgow City Council",
        useOfFunds: "Funding eligible green projects under the Green Finance Framework",
        interestRate: "4.5%",
        termPeriod: "5 years after the end of the initial interest period",
        maturityDate: "30 June 2031",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "2 March 2026",
        offerCloseDate: "3 September 2026",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£1 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 June 2026.",
        interestPeriods: "From 1 July to 30 December and 1 January to 30 June each year, starting from 1 July 2026.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.20% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 12 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/glasgow-loan-conditions.pdf"
      },
      "southwark": {
        investmentName: "Southwark Green Investment",
        borrower: "London Borough of Southwark",
        useOfFunds: "Energy efficiency upgrades, heat network improvements and green infrastructure",
        interestRate: "4.1%",
        termPeriod: "10 years after the end of the initial interest period",
        maturityDate: "30 September 2036",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "15 April 2026",
        offerCloseDate: "3 September 2026",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£2 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 September 2026.",
        interestPeriods: "From 1 October to 31 March and 1 April to 30 September each year, starting from 1 October 2026.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.10% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 9 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/southwark-loan-conditions.pdf"
      },
      "hackney": {
        investmentName: "Hackney Green Investment",
        borrower: "London Borough of Hackney",
        useOfFunds: "School energy upgrades, public building retrofit and community climate projects",
        interestRate: "4.1%",
        termPeriod: "10 years after the end of the initial interest period",
        maturityDate: "31 December 2036",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "1 May 2026",
        offerCloseDate: "3 September 2026",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£2.5 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 31 December 2026.",
        interestPeriods: "From 1 January to 30 June and 1 July to 31 December each year, starting from 1 January 2027.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.15% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 6 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/hackney-loan-conditions.pdf"
      }
    };

    function renderKeyTerms(key) {
      const data = keyTermsData[key];
      if (!data) return;

      document.querySelectorAll("[data-keyterms-field]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-field");
        if (data[field] !== undefined) {
          el.textContent = data[field];
        }
      });

      document.querySelectorAll("[data-keyterms-href]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-href");
        if (data[field]) {
          el.setAttribute("href", data[field]);
        }
      });
    }

    function getFields(record) {
      return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
    }

    function firstValue(value) {
      if (!value) return "";
      if (typeof value === "string") return value.trim();

      if (Array.isArray(value)) {
        return value.length ? firstValue(value[0]) : "";
      }

      if (typeof value === "object") {
        return String(value.url || value.src || value.name || value.value || "").trim();
      }

      return String(value).trim();
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function hasStatus(value, target) {
      const normalisedTarget = String(target || "").trim().toLowerCase();

      if (Array.isArray(value)) {
        return value.some(function (item) {
          return firstValue(item).toLowerCase() === normalisedTarget;
        });
      }

      return firstValue(value).toLowerCase() === normalisedTarget;
    }

    function normalizeUrl(value, fallback) {
      const raw = firstValue(value);
      if (!raw) return fallback || "#";

      try {
        const parsed = new URL(raw, window.location.origin);
        return (parsed.pathname || "/").replace(/\/+$/, "") || "/";
      } catch {
        return raw.replace(/^https?:\/\/www\.abundanceinvestment\.com/i, "").replace(/\/+$/, "") || fallback || "#";
      }
    }

    function safeNumber(value) {
      if (typeof value === "number" && Number.isFinite(value)) return value;
      const number = parseFloat(String(firstValue(value)).replace(/[^\d.-]/g, ""));
      return Number.isFinite(number) ? number : 0;
    }

    function formatLoanRate(value) {
      const number = safeNumber(value);
      const rate = number > 0 && number < 1 ? number * 100 : number;
      return rate.toFixed(2).replace(/\.00$/, "").replace(/0$/, "") + "%";
    }

    function formatLoanTerm(value) {
      const years = safeNumber(value);
      if (years > 0) return years === 1 ? "1 year" : years + " years";
      return firstValue(value) || "-";
    }

    function formatLongDate(value) {
      const time = Date.parse(firstValue(value));
      if (!Number.isFinite(time)) return "-";

      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(new Date(time));
    }

    function councilIdForLoan(loan) {
      return firstValue(getFields(loan).councilID);
    }

    function councilNameForLoan(loan, council) {
      const loanFields = getFields(loan);
      const councilFields = getFields(council);

      return firstValue(loanFields.issuingCouncil) ||
        firstValue(councilFields.issuingCouncil) ||
        "Council";
    }

    function councilUrl(council, councilName) {
      const url = normalizeUrl(getFields(council).councilHub, "");
      if (url) return url;

      const slug = String(councilName || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      return slug ? "/council/" + slug : "#";
    }

    function renderOpenLoansFallback(container) {
      container.innerHTML = `
        <div class="choke-700">
          <h2 class="si-heading-2 m-b-spacer-0">
            Open municipal investments
          </h2>
        </div>

        <p class="body--lg text-center m-t-spacer-md m-b-spacer-0">
          There are no municipal investments open at the moment.
        </p>
      `;
    }

    function renderLoanRow(loan, council) {
      const fields = getFields(loan);
      const councilFields = getFields(council);
      const name = firstValue(fields.investmentName) || "Open municipal investment";
      const councilName = councilNameForLoan(loan, council);
      const strapline = firstValue(fields.strapline) || firstValue(fields.useOfFunds) || "";
      const hex = firstValue(fields.hex) || firstValue(councilFields.hex) || "#f1eeed";
      const logo = firstValue(fields.whiteLogo) || firstValue(councilFields.whiteLogo);
      const aboutUrl = councilUrl(council, councilName);

      return `
        <article class="si-card si-card--2xs h-100">
          <div class="row gx-xs gy-2xs align-items-center">
            <div class="col-12 col-md-2">
              <div
                class="d-flex align-items-center justify-content-center border-radius--lg p-all-spacer-2xs p-y-spacer-xs"
                style="height:160px; background:${escapeHtml(hex)};"
              >
                <div class="m-x--auto d-flex align-items-center justify-content-center" style="width:112px; height:112px;">
                  ${
                    logo
                      ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(councilName)}" loading="lazy" decoding="async" style="max-width:100%; max-height:100%; object-fit:contain;">`
                      : ""
                  }
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="p-t-spacer-3xs" aria-hidden="true"></div>
              <p class="abundance-eyebrow brand-primary">${escapeHtml(name)}</p>
              <div class="p-t-spacer-3xs" aria-hidden="true"></div>
              <h4 class="si-heading-5 m-b-spacer-0">${escapeHtml(councilName)}</h4>
              ${
                strapline
                  ? `<p class="body--md m-t-spacer-2xs m-b-spacer-0">${escapeHtml(strapline)}</p>`
                  : ""
              }
            </div>
            <div class="col-12 col-md-2">
              <a class="si-btn-link body--md d-block" href="#keyterms-modal" role="button" data-modal-open="keyterms-modal" data-keyterms-trigger="glasgow" aria-haspopup="dialog" aria-controls="keyterms-modal">View key terms</a>
              <a class="si-btn-link body--md d-block m-t-spacer-3xs" href="${escapeHtml(aboutUrl)}">About council</a>
            </div>
          </div>
        </article>
      `;
    }

    function renderLoanGroup(group) {
      const investUrl = "https://abundance-buy-journey.netlify.app/";

      return `
        <article class="si-card si-card--secondary p-all-spacer-md m-t-spacer-md">
          <div class="p-all-spacer-2xs">
            <div class="row gx-xs gy-xs align-items-end">
              <div class="col-12 col-md-10">
                <div class="row row-cols-1 row-cols-sm-3 gx-xs gy-xs">
                  <div>
                    <hr class="si-horizontal-rule abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="abundance-eyebrow brand-primary">Interest rate</p>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat text-color--primary">${escapeHtml(group.rate)}</div>
                  </div>
                  <div>
                    <hr class="si-horizontal-rule abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="abundance-eyebrow brand-primary">Term</p>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat text-color--primary">${escapeHtml(group.term)}</div>
                  </div>
                  <div>
                    <hr class="si-horizontal-rule abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="abundance-eyebrow brand-primary">Capital repaid</p>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat text-color--primary">At maturity</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-2">
                <a href="${escapeHtml(investUrl)}" class="si-btn si-btn--primary si-btn--lg">Invest now</a>
              </div>
            </div>
          </div>

          <div class="p-t-spacer-sm" aria-hidden="true"></div>

          ${group.loans.map(function (loan, index) {
            const row = renderLoanRow(loan, group.councils[index]);
            return index === 0 ? row : '<div class="p-t-spacer-xs" aria-hidden="true"></div>' + row;
          }).join("")}
        </article>
      `;
    }

    function initOpenLoans() {
      const container = document.querySelector("[data-abv2-open-loans-list]");
      if (!container || !window.AbundanceLiveStats) return;

      Promise.all([
        window.AbundanceLiveStats.fetchCouncils(),
        window.AbundanceLiveStats.fetchLoans()
      ])
        .then(function ([councils, loans]) {
          const councilsById = new Map();
          councils.forEach(function (council) {
            if (council && council.id) councilsById.set(council.id, council);
          });

          const openLoans = loans.filter(function (loan) {
            return hasStatus(getFields(loan).raiseStatus, "open");
          });

          if (!openLoans.length) {
            renderOpenLoansFallback(container);
            return;
          }

          const groups = new Map();

          openLoans.forEach(function (loan) {
            const fields = getFields(loan);
            const council = councilsById.get(councilIdForLoan(loan)) || {};
            const rate = formatLoanRate(fields.rateOfReturn);
            const term = formatLoanTerm(fields.termLength || fields.term || fields.loanTerm || fields.termYears);
            const closeDate = formatLongDate(fields.closeDate);
            const key = rate + "|" + term + "|" + closeDate;

            if (!groups.has(key)) {
              groups.set(key, {
                rate: rate,
                term: term,
                closeDate: closeDate,
                loans: [],
                councils: []
              });
            }

            groups.get(key).loans.push(loan);
            groups.get(key).councils.push(council);
          });

          const groupList = Array.from(groups.values());
          const closeDate = groupList.length === 1 ? groupList[0].closeDate : "";

          container.innerHTML = `
            <div class="choke-700">
              <h2 class="si-heading-2 m-b-spacer-0">
                Open municipal investments
              </h2>
              ${
                closeDate && closeDate !== "-"
                  ? `
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <span class="abundance-eyebrow text-nowrap brand-secondary d-block">
                      Investments close ${escapeHtml(closeDate)}
                    </span>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  `
                  : ""
              }
            </div>

            ${groupList.map(renderLoanGroup).join("")}
          `;
        })
        .catch(function (error) {
          console.error("Open loans failed:", error);
          renderOpenLoansFallback(container);
        });
    }

    function parseNumber(value) {
      const number = parseFloat(String(value || "").replace(/[^\d.-]/g, ""));
      return Number.isFinite(number) ? number : 0;
    }

    function formatRate(value) {
      const number = parseNumber(value);
      return number.toFixed(2).replace(/\.00$/, "") + "%";
    }

    function formatYears(value) {
      const years = parseNumber(value);
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

    function initPaymentCalculator() {
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

    function updatePaymentCalculator(calculator) {
      const input = calculator.querySelector("[data-abv2-calc-input]");
      if (!input) return;

      const amount = parseNumber(input.value);
      const rate = parseNumber(calculator.getAttribute("data-rate"));
      const termYears = parseNumber(calculator.getAttribute("data-term-years"));
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

    function setCalcField(calculator, field, value) {
      calculator.querySelectorAll('[data-abv2-calc-field="' + field + '"]').forEach(function (el) {
        el.textContent = value === undefined || value === null ? "" : value;
      });
    }

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest("[data-keyterms-trigger]");
      if (!trigger) return;

      renderKeyTerms(trigger.getAttribute("data-keyterms-trigger"));
    });

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest("[data-modal-open]");
      if (!trigger) return;

      const modal = document.getElementById(trigger.getAttribute("data-modal-open"));
      if (!modal || typeof modal.showModal !== "function") return;

      event.preventDefault();
      modal.showModal();
    });

    document.addEventListener("click", function (event) {
      const modal = event.target.closest("dialog.si-modal");
      if (modal && event.target === modal) {
        modal.close();
      }
    });

    function initInvestNowPage() {
      initPaymentCalculator();
      initOpenLoans();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initInvestNowPage);
    } else {
      initInvestNowPage();
    }
  })();
</script>
