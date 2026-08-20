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

    list.innerHTML = `
      <div class="col-12">
        <p class="body--lg text-center m-b-spacer-0">
          There are no municipal investments open at the moment. Please check again soon.
        </p>
      </div>
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
          renderFallback();
          return;
        }

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
