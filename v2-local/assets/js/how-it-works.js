<script>
  (function () {
    const defaultAnnualRate = 0.042;
    const years = 10;
    const projectionMonths = years * 12;
    const termMonths = 5 * 12;
    const couponIntervalMonths = 6;
    const minimumInvestment = 5;

    function formatMoney(value) {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0
      }).format(value);
    }

    function parseAmount(value) {
      const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
      return Number.isFinite(number) && number >= minimumInvestment ? number : 0;
    }

    function roundToNearestPound(value) {
      return Math.round(value);
    }

    function isBelowMinimumInvestment(value) {
      const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
      return String(value || "").trim() !== "" && (!Number.isFinite(number) || number < minimumInvestment);
    }

    function parseAnnualRate(selector) {
      const input = document.querySelector(selector);
      if (!input) return defaultAnnualRate;

      const rate = Number(String(input.value || "").replace(/[^0-9.-]/g, ""));
      return Number.isFinite(rate) && rate >= 0 ? rate / 100 : defaultAnnualRate;
    }

    function futureValueTranches(options) {
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

    function futureValueLumpSum(lumpSum, annualRate) {
      return futureValueTranches({
        initialAmount: lumpSum,
        monthlyPayment: 0,
        annualRate: annualRate
      });
    }

    function futureValueMonthly(monthlyPayment, annualRate) {
      return futureValueTranches({
        initialAmount: 0,
        monthlyPayment: monthlyPayment,
        annualRate: annualRate
      });
    }

    function setText(selector, value) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.textContent = value;
      });
    }

    function setInputError(input, selector) {
      const hasError = isBelowMinimumInvestment(input.value);

      input.setAttribute("aria-invalid", hasError ? "true" : "false");

      document.querySelectorAll(selector).forEach(function (el) {
        el.hidden = !hasError;
      });
    }

    function updateRegularCalculator() {
      const input = document.querySelector("[data-abv2-growth-regular-input]");
      if (!input) return;

      setInputError(input, "[data-abv2-growth-regular-error]");

      const monthlyAmount = parseAmount(input.value);
      const annualRate = parseAnnualRate("[data-abv2-growth-regular-rate-input]");
      const paidIn = monthlyAmount * 12 * years;
      const futureValue = futureValueMonthly(monthlyAmount, annualRate);

      setText(
        "[data-abv2-growth-regular-paid-in]",
        formatMoney(roundToNearestPound(paidIn))
      );

      setText(
        "[data-abv2-growth-regular-result]",
        formatMoney(roundToNearestPound(futureValue))
      );
    }

    function updateSingleCalculator() {
      const input = document.querySelector("[data-abv2-growth-single-input]");
      if (!input) return;

      setInputError(input, "[data-abv2-growth-single-error]");

      const lumpSum = parseAmount(input.value);
      const annualRate = parseAnnualRate("[data-abv2-growth-single-rate-input]");
      const paidIn = lumpSum;
      const futureValue = futureValueLumpSum(lumpSum, annualRate);

      setText(
        "[data-abv2-growth-single-paid-in]",
        formatMoney(roundToNearestPound(paidIn))
      );

      setText(
        "[data-abv2-growth-single-result]",
        formatMoney(roundToNearestPound(futureValue))
      );
    }

    function updateGrowthCalculator() {
      updateRegularCalculator();
      updateSingleCalculator();
    }

    function initGrowthCalculator() {
      const regularInput = document.querySelector("[data-abv2-growth-regular-input]");
      const singleInput = document.querySelector("[data-abv2-growth-single-input]");
      const regularRateInput = document.querySelector("[data-abv2-growth-regular-rate-input]");
      const singleRateInput = document.querySelector("[data-abv2-growth-single-rate-input]");

      if (regularInput) {
        regularInput.addEventListener("input", updateRegularCalculator);
        regularInput.addEventListener("change", updateRegularCalculator);
      }

      if (singleInput) {
        singleInput.addEventListener("input", updateSingleCalculator);
        singleInput.addEventListener("change", updateSingleCalculator);
      }

      if (regularRateInput) {
        regularRateInput.addEventListener("input", updateRegularCalculator);
        regularRateInput.addEventListener("change", updateRegularCalculator);
      }

      if (singleRateInput) {
        singleRateInput.addEventListener("input", updateSingleCalculator);
        singleRateInput.addEventListener("change", updateSingleCalculator);
      }

      updateGrowthCalculator();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initGrowthCalculator);
    } else {
      initGrowthCalculator();
    }
  })();
</script>
