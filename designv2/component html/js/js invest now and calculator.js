  (function () {
    const keyTermsData = {
      "hammersmith-fulham": {
        investmentName: "H&F Green Investment",
        borrower: "Hammersmith & Fulham Council",
        useOfFunds: "Urban greening projects and green energy",
        interestRate: "4.85%",
        investmentTerm: "5 years",
        maturityDate: "31 July 2031",
        maturityDateShort: "31 Jul 2031",
        interestPaid: "Every June and December",
        capitalRepaid: "Original investment repaid on maturity date",
        minimumInvestment: "£5",
        closeDate: "3 September 2026",
        termPeriod: "5 years after the end of the initial interest period",
        offerOpenDate: "2 March 2026",
        offerCloseDate: "3 September 2026",
        offerCloseDateNote: "The Loan Opportunity may be withdrawn before the Offer Close Date at the Borrower's discretion subject to it posting notice of withdrawal on the Abundance website.",
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
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/hf-loan-conditions.pdf",
        investUrl: "#invest-hammersmith-fulham"
      },

      "southwark": {
        investmentName: "Southwark Green Investment",
        borrower: "London Borough of Southwark",
        useOfFunds: "Energy efficiency upgrades, heat network improvements and green infrastructure",
        interestRate: "4.70%",
        investmentTerm: "6 years",
        maturityDate: "30 September 2032",
        maturityDateShort: "30 Sep 2032",
        interestPaid: "Every March and September",
        capitalRepaid: "Original investment repaid on maturity date",
        minimumInvestment: "£5",
        closeDate: "15 October 2026",
        termPeriod: "6 years after the end of the initial interest period",
        offerOpenDate: "15 April 2026",
        offerCloseDate: "15 October 2026",
        offerCloseDateNote: "The Loan Opportunity may be withdrawn before the Offer Close Date at the Borrower's discretion subject to it posting notice of withdrawal on the Abundance website.",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£2 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 September 2026.",
        interestPeriods: "From 1 October to 31 March and 1 April to 30 September each year, starting from 1 October 2026.",
        returnStructure: "12 semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.10% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 9 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/southwark-loan-conditions.pdf",
        investUrl: "#invest-southwark"
      },

      "west-berkshire": {
        investmentName: "West Berkshire Green Investment",
        borrower: "West Berkshire Council",
        useOfFunds: "Solar power, building retrofit and low-carbon transport projects",
        interestRate: "4.55%",
        investmentTerm: "5 years",
        maturityDate: "31 May 2031",
        maturityDateShort: "31 May 2031",
        interestPaid: "Every May and November",
        capitalRepaid: "Original investment repaid on maturity date",
        minimumInvestment: "£5",
        closeDate: "20 August 2026",
        termPeriod: "5 years after the end of the initial interest period",
        offerOpenDate: "20 February 2026",
        offerCloseDate: "20 August 2026",
        offerCloseDateNote: "The Loan Opportunity may be withdrawn before the Offer Close Date at the Borrower's discretion subject to it posting notice of withdrawal on the Abundance website.",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£750,000",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 November 2026.",
        interestPeriods: "From 1 December to 31 May and 1 June to 30 November each year, starting from 1 December 2026.",
        returnStructure: "10 semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.25% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 12 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/west-berkshire-loan-conditions.pdf",
        investUrl: "#invest-west-berkshire"
      },

      "glasgow": {
        investmentName: "Glasgow Green Investment",
        borrower: "Glasgow City Council",
        useOfFunds: "Funding Eligible Green Projects under the Green Finance Framework",
        interestRate: "4.00%",
        investmentTerm: "5 years",
        maturityDate: "30 June 2031",
        maturityDateShort: "30 Jun 2031",
        interestPaid: "Every June and December",
        capitalRepaid: "Lump sum on maturity",
        minimumInvestment: "£5",
        closeDate: "1 June 2026",
        termPeriod: "5 years after the end of the initial interest period",
        offerOpenDate: "2 March 2026",
        offerCloseDate: "1 June 2026",
        offerCloseDateNote: "The Loan Opportunity may be withdrawn before the Offer Close Date at the Borrower's discretion subject to it posting notice of withdrawal on the Abundance website.",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£1 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 30 June 2026.",
        interestPeriods: "From 1 July to 30 December and 1 January to 30 June each year, starting from 1 July 2026.",
        returnStructure: "10 semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.20% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 12 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/glasgow-loan-conditions.pdf",
        investUrl: "#invest-glasgow"
      },

      "hackney": {
        investmentName: "Hackney Green Investment",
        borrower: "London Borough of Hackney",
        useOfFunds: "School energy upgrades, public building retrofit and community climate projects",
        interestRate: "4.95%",
        investmentTerm: "7 years",
        maturityDate: "31 December 2033",
        maturityDateShort: "31 Dec 2033",
        interestPaid: "Every June and December",
        capitalRepaid: "Original investment repaid on maturity date",
        minimumInvestment: "£5",
        closeDate: "30 November 2026",
        termPeriod: "7 years after the end of the initial interest period",
        offerOpenDate: "1 May 2026",
        offerCloseDate: "30 November 2026",
        offerCloseDateNote: "The Loan Opportunity may be withdrawn before the Offer Close Date at the Borrower's discretion subject to it posting notice of withdrawal on the Abundance website.",
        minimumBorrowingAmount: "£5.00",
        maximumBorrowingAmount: "£2.5 million",
        initialInterestPeriod: "This will start on the date the lender makes their investment and ends on 31 December 2026.",
        interestPeriods: "From 1 January to 30 June and 1 July to 31 December each year, starting from 1 January 2027.",
        returnStructure: "14 semi-annual payments of Interest on the last day of each Interest Period. Capital is repaid as a lump sum on the Maturity Date.",
        arrangementFee: "1.15% of the total loan amount raised",
        arrangementFeeNote: "This is the fee paid to Abundance in its role as Arranger. The interest rate above is quoted after fees.",
        managementFee: "0.10% of the outstanding loan amount, per year",
        managementFeeNote: "This is the fee paid to Abundance in its role as Agent. The interest rate above is quoted after fees.",
        earlyRepaymentOptions: "The Borrower has the option to make a full early repayment of the Loans by giving notice to Abundance. An early repayment fee equal to 6 months' Interest will apply.",
        loanConditionsUrl: "https://www.abundanceinvestment.com/example/hackney-loan-conditions.pdf",
        investUrl: "#invest-hackney"
      }
    };

    function setText(el, value) {
      if (value === undefined || value === null || value === "") return;
      el.textContent = value;
    }

    function setHref(el, value) {
      if (value === undefined || value === null || value === "") return;
      el.setAttribute("href", value);
    }

    function renderKeyTerms(key) {
      const data = keyTermsData[key];

      if (!data) {
        console.warn("No key terms data found for:", key);
        return;
      }

      document.querySelectorAll("[data-keyterms-field]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-field");
        setText(el, data[field]);
      });

      document.querySelectorAll("[data-keyterms-href]").forEach(function (el) {
        const field = el.getAttribute("data-keyterms-href");
        setHref(el, data[field]);
      });
    }

    function initKeyTermsSelector() {
      const select = document.querySelector("[data-abv2-keyterms-select]");
      if (!select) return;

      select.addEventListener("change", function () {
        renderKeyTerms(select.value);
      });

      renderKeyTerms(select.value);
    }

    function initNativeDialogs() {
      document.addEventListener("click", function (event) {
        const trigger = event.target.closest("[data-modal-open]");
        if (!trigger) return;

        const modalId = trigger.getAttribute("data-modal-open");
        const modal = document.getElementById(modalId);

        if (!modal || typeof modal.showModal !== "function") return;

        event.preventDefault();
        modal.showModal();
      });

      document.addEventListener("click", function (event) {
        const modal = event.target.closest("dialog.si-modal");

        if (!modal || event.target !== modal) return;

        modal.close();
      });
    }

    initKeyTermsSelector();
    initNativeDialogs();
  })();

  (function () {
    function formatGBP(value, includePence) {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: includePence ? 2 : 0,
        maximumFractionDigits: includePence ? 2 : 0
      }).format(value);
    }

    function formatGBPFlexible(value) {
      const pennies = Math.round(value * 100);
      const hasPence = pennies % 100 !== 0;

      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: hasPence ? 2 : 0,
        maximumFractionDigits: hasPence ? 2 : 0
      }).format(value);
    }

    function setCalcField(scope, field, value) {
      scope.querySelectorAll('[data-abv2-calc-field="' + field + '"]').forEach(function (el) {
        el.textContent = value;
      });
    }

    function formatRate(ratePercent) {
      return ratePercent.toFixed(2).replace(".00", "") + "%";
    }

    function formatTerm(termYears) {
      return termYears + (termYears === 1 ? " year" : " years");
    }

    function renderCalculator(calc) {
      if (!calc) return;

      const input = calc.querySelector("[data-abv2-calc-input]");
      if (!input) return;

      const ratePercent = parseFloat(calc.getAttribute("data-rate")) || 0;
      const termYears = parseFloat(calc.getAttribute("data-term-years")) || 0;
      const interestDate1 = calc.getAttribute("data-interest-date-1") || "";
      const interestDate2 = calc.getAttribute("data-interest-date-2") || "";

      const investedAmount = parseFloat(input.value) || 0;
      const rate = ratePercent / 100;

      const annualInterest = investedAmount * rate;
      const totalInterest = annualInterest * termYears;
      const interestPayment = annualInterest / 2;
      const totalReturned = investedAmount + totalInterest;

      setCalcField(calc, "rate", formatRate(ratePercent));
      setCalcField(calc, "termYears", formatTerm(termYears));
      setCalcField(calc, "amount", formatGBPFlexible(investedAmount));
      setCalcField(calc, "totalInterest", formatGBP(totalInterest, true));
      setCalcField(calc, "totalReturned", formatGBP(totalReturned, true));
      setCalcField(calc, "interestPayment", formatGBP(interestPayment, true));
      setCalcField(calc, "capitalRepaid", formatGBPFlexible(investedAmount));
      setCalcField(calc, "interestDate1", interestDate1);
      setCalcField(calc, "interestDate2", interestDate2);
    }

    function renderClosestCalculatorFromInput(input) {
      const calc = input.closest("[data-abv2-calc-config]");
      renderCalculator(calc);
    }

    document.addEventListener("input", function (event) {
      const input = event.target.closest("[data-abv2-calc-input]");
      if (!input) return;

      renderClosestCalculatorFromInput(input);
    });

    document.addEventListener("change", function (event) {
      const input = event.target.closest("[data-abv2-calc-input]");
      if (!input) return;

      renderClosestCalculatorFromInput(input);
    });

    document.addEventListener("keyup", function (event) {
      const input = event.target.closest("[data-abv2-calc-input]");
      if (!input) return;

      renderClosestCalculatorFromInput(input);
    });

    document.addEventListener("blur", function (event) {
      const input = event.target.closest("[data-abv2-calc-input]");
      if (!input) return;

      renderClosestCalculatorFromInput(input);
    }, true);

    document.querySelectorAll("[data-abv2-calc-config]").forEach(function (calc) {
      renderCalculator(calc);
    });
  })();