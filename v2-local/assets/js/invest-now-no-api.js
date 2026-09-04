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

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPaymentCalculator);
    } else {
      initPaymentCalculator();
    }
  })();
