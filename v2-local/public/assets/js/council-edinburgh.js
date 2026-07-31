<script>
  (function () {
    const keyTermsData = {
      edinburgh: {
        investmentName: "Edinburgh Green Investment",
        borrower: "City of Edinburgh Council",
        useOfFunds: "Tree planting and sustainable urban drainage projects",
        interestRate: "4.85%",
        interestRateNote: "",
        termPeriod: "5 years after the end of the initial interest period",
        maturityDate: "31 December 2031",
        capitalRepaid: "Original investment repaid on maturity date",
        offerOpenDate: "1 June 2026",
        offerCloseDate: "1 December 2026",
        offerCloseDateNote: "",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£1 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 31 December 2026.",
        interestPeriods: "From 1 January to 30 June and 1 July to 31 December each year, starting from 1 January 2027.",
        returnStructure: "Semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.20% of the total loan amount raised",
        arrangementFeeNote: "",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/edinburgh-loan-conditions.pdf"
      }
    };

    function setText(el, value) {
      el.textContent = value === undefined || value === null ? "" : value;
    }

    function setHref(el, value) {
      el.setAttribute("href", value || "#");
    }

    function renderKeyTerms(key) {
      const data = keyTermsData[key];
      if (!data) return;

      document.querySelectorAll("[data-keyterms-field]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-field");
        if (data[field] !== undefined) {
          setText(el, data[field]);
        }
      });

      document.querySelectorAll("[data-keyterms-href]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-href");
        if (data[field] !== undefined) {
          setHref(el, data[field]);
        }
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
        setText(el, value);
      });
    }

    function initNativeDialogs() {
      document.addEventListener("click", function (event) {
        const trigger = event.target.closest("[data-modal-open]");
        if (!trigger) return;

        const key = trigger.getAttribute("data-keyterms-trigger");
        if (key) {
          renderKeyTerms(key);
        }

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

    function init() {
      initPaymentCalculator();
      initNativeDialogs();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();
</script>
