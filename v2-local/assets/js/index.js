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
    setInvestmentsHeading("Recent investments");

    list.innerHTML = `
      <div class="col-12">
        <p class="body--lg text-center choke-800 m-x--auto m-b-spacer-sm">
          There are no municipal investments open at the moment. We are expecting to launch new investments with a number of councils on 2 December 2026.
        </p>
      </div>
    `;
  }

  function setInvestmentsHeading(text) {
    const wrapper = document.querySelector("[data-abv2-open-investments]");
    const section = wrapper ? wrapper.closest("section") : null;
    const heading = section ? section.querySelector("h2") : null;
    if (heading) heading.textContent = text;
  }

  function parseLoanDate(value) {
    const raw = firstValue(value);
    if (!raw) return null;
    const time = Date.parse(raw);
    return Number.isFinite(time) ? new Date(time) : null;
  }

  function formatLongDate(value) {
    const date = parseLoanDate(value);
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
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

  function formatShortMoney(value) {
    const number = safeNumber(value);
    const abs = Math.abs(number);

    if (abs >= 1000000000) return "£" + (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "bn";
    if (abs >= 1000000) return "£" + (number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
    if (abs >= 1000) return "£" + (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return "£" + Math.round(number).toLocaleString("en-GB");
  }

  function loanAmount(record) {
    const fields = getFields(record);
    return safeNumber(fields.totalRaised || fields.loanAmount || fields.targetAmount);
  }

  function statRow(label, value) {
    if (value === null || value === undefined || value === "") return "";

    return `
      <p
        class="abundance-body-compact m-b-spacer-3xs"
        style="display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:.75rem; align-items:baseline;"
      >
        <span>${escapeHtml(label)}</span>
        <strong style="text-align:right;">${escapeHtml(value)}</strong>
      </p>
    `;
  }

  function isClosedLoanWithPastCloseDate(loan) {
    if (!includesStatus(getValue(loan, "raiseStatus"), "closed")) return false;

    const closeDate = parseLoanDate(getValue(loan, "closeDate"));
    if (!closeDate) return false;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return closeDate <= today;
  }

  function renderRecentlyClosedTile(loan, council) {
    const fields = getFields(loan);
    const councilFields = getFields(council);
    const name = firstValue(fields.investmentName) || "Municipal investment";
    const councilTitle = council ? councilName(council) : firstValue(fields.issuingCouncil) || "Council";
    const url = normaliseCouncilUrl(firstValue(councilFields.councilHub), councilTitle);
    const bgHex = firstValue(fields.hex) || firstValue(councilFields.hex) || "#363635";
    const logo = firstValue(fields.whiteLogo) || firstValue(councilFields.whiteLogo);
    const amount = loanAmount(loan);
    const stats = [
      statRow("Closed", formatLongDate(fields.closeDate)),
      statRow("Interest rate", formatLoanRate(fields.rateOfReturn)),
      amount ? statRow("Invested", formatShortMoney(amount)) : ""
    ].filter(Boolean).join("");

    return `
      <div class="col d-flex">
        <a
          class="si-card si-card--2xs abundance-card--interactive card-with-main-action h-100 w-100 d-flex flex-column text-start text-decoration-none"
          href="${escapeHtml(url)}"
          aria-label="View ${escapeHtml(councilTitle)}"
        >
          <div
            class="d-flex align-items-center justify-content-center border-radius--lg p-all-spacer-xs"
            style="height:104px; background:${escapeHtml(bgHex)};"
          >
            ${
              logo
                ? `
                  <img
                    src="${escapeHtml(logo)}"
                    alt="${escapeHtml(councilTitle)}"
                    loading="lazy"
                    decoding="async"
                    class="img-fluid"
                    style="max-height:58px; max-width:78%; object-fit:contain;"
                  >
                `
                : `<span class="abundance-action-text text-color--invert-primary">${escapeHtml(initials(councilTitle))}</span>`
            }
          </div>

          <div class="p-t-spacer-sm" aria-hidden="true"></div>
          <p class="abundance-eyebrow brand-primary">${escapeHtml(name)}</p>
          <div class="p-t-spacer-3xs" aria-hidden="true"></div>
          <h3 class="si-heading-5 m-b-spacer-0" style="min-height:2.35em;">
            ${escapeHtml(councilTitle)}
          </h3>

          <div class="m-t-spacer-xs" style="min-height:5.8em;">
            ${stats}
          </div>
        </a>
      </div>
    `;
  }

  function renderRecentlyClosedInvestments(loans, councilsById, councilsByName) {
    const list = getList();
    if (!list) return;
    setInvestmentsHeading("Recent investments");

    const closedLoans = loans
      .filter(isClosedLoanWithPastCloseDate)
      .sort(function (a, b) {
        const dateDiff = parseLoanDate(getValue(b, "closeDate")) - parseLoanDate(getValue(a, "closeDate"));
        if (dateDiff) return dateDiff;

        const councilA = findCouncilForLoan(a, councilsById, councilsByName);
        const councilB = findCouncilForLoan(b, councilsById, councilsByName);
        const nameA = councilA ? councilName(councilA) : firstValue(getValue(a, "issuingCouncil"));
        const nameB = councilB ? councilName(councilB) : firstValue(getValue(b, "issuingCouncil"));

        return nameB.localeCompare(nameA, "en-GB", { sensitivity: "base" }) ||
          firstValue(getValue(b, "investmentName")).localeCompare(firstValue(getValue(a, "investmentName")), "en-GB", { sensitivity: "base" });
      })
      .slice(0, 3);

    if (!closedLoans.length) {
      renderFallback();
      return;
    }

    list.innerHTML = `
      <div class="col-12">
        <p class="body--lg text-center choke-800 m-x--auto m-b-spacer-sm">
          There are no municipal investments open at the moment. We are expecting to launch new investments with a number of councils on 2 December 2026.
        </p>
      </div>

      ${closedLoans.map(function (loan) {
        return renderRecentlyClosedTile(loan, findCouncilForLoan(loan, councilsById, councilsByName));
      }).join("")}
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
          renderRecentlyClosedInvestments(loans, councilsById, councilsByName);
          return;
        }

        setInvestmentsHeading("Investments open now");

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
