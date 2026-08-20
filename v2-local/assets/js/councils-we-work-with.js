<script>
(function () {
  const OPEN_GRID_ID = "abv2-council-grid";
  const OTHER_GRID_ID = "abv2-council-grid-2";
  const DEFAULT_ENDPOINT = "https://data.abundanceinvestment.com/councils";
  const DEFAULT_LOANS_ENDPOINT = "https://data.abundanceinvestment.com/loans";

  const openGrid = document.getElementById(OPEN_GRID_ID);
  const otherGrid = document.getElementById(OTHER_GRID_ID);
  const openCard = document.querySelector("[data-abv2-open-councils-card]");
  const openCardSpacer = document.querySelector("[data-abv2-open-councils-card-spacer]");

  if (!openGrid || !otherGrid) return;

  const endpoint = openGrid.dataset.endpoint || otherGrid.dataset.endpoint || DEFAULT_ENDPOINT;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getFields(record) {
    return record && record.fields && typeof record.fields === "object"
      ? record.fields
      : record || {};
  }

  function getValue(record, key) {
    return getFields(record)[key];
  }

  function getUrl(record, key) {
    const value = getValue(record, key);

    if (!value) return "";

    if (typeof value === "string") return value;

    if (Array.isArray(value) && value.length) {
      if (value[0] && value[0].url) return value[0].url;
      if (typeof value[0] === "string") return value[0];
    }

    if (value.url) return value.url;

    return "";
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

  function normalizeCouncilHubUrl(value) {
    const raw = String(value || "").trim();

    if (!raw || raw === "#") return raw || "#";

    let pathname = raw;

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

  function safeNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
      const cleaned = value.replace(/[^0-9.\-]/g, "");
      const number = Number(cleaned);
      return Number.isFinite(number) ? number : 0;
    }

    return 0;
  }

  function formatShortMoney(value) {
    const number = safeNumber(value);

    if (!Number.isFinite(number) || number <= 0) return null;

    const rounded = Math.max(100000, Math.round(number / 100000) * 100000);
    const millions = rounded / 1000000;

    return "£" + (millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)) + "m";
  }

  function formatInt(value) {
    return Math.round(safeNumber(value)).toLocaleString("en-GB");
  }

  function normaliseStatusItem(item) {
    const value = item && (item.name || item.value || item);
    return String(value || "").trim().toLowerCase();
  }

  function includesStatus(raiseStatus, target) {
    const normalisedTarget = String(target || "").trim().toLowerCase();

    if (!raiseStatus) return false;

    if (typeof raiseStatus === "string") {
      return normaliseStatusItem(raiseStatus) === normalisedTarget;
    }

    if (Array.isArray(raiseStatus)) {
      return raiseStatus.some(function (item) {
        return normaliseStatusItem(item) === normalisedTarget;
      });
    }

    return false;
  }

  function isOpen(record) {
    return includesStatus(getValue(record, "raiseStatus"), "open");
  }

  function isClosed(record) {
    return includesStatus(getValue(record, "raiseStatus"), "closed");
  }

  function shouldExcludeCouncil(record) {
    const hub = getValue(record, "councilHub");

    if (!hub || String(hub).trim() === "") return true;

    return false;
  }

  function loanCouncilIds(record) {
    const fields = getFields(record);
    return []
      .concat(valueList(fields.councilID))
      .concat(valueList(fields.councilIds))
      .concat(valueList(fields.councilRecordId));
  }

  function councilIdsFromLoans(loans, matcher) {
    const ids = new Set();

    loans
      .filter(matcher)
      .forEach(function (loan) {
        loanCouncilIds(loan).forEach(function (id) {
          ids.add(id);
        });
      });

    return ids;
  }

  function recordsFromResponse(data) {
    return Array.isArray(data)
      ? data
      : Array.isArray(data.records)
        ? data.records
        : [];
  }

  function statRow(label, value) {
    if (value === null || value === undefined || value === "") return "";

    if (label === null || label === undefined || label === "") {
      return `
        <p class="abundance-body-compact m-b-spacer-3xs">
          ${escapeHtml(value)}
        </p>
      `;
    }

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

  function councilCard(record) {
    const fields = getFields(record);

    const name = fields.issuingCouncil || "Council";
    const url = normalizeCouncilHubUrl(fields.councilHub);
    const hex = fields.hex || "#363635";
    const logo = getUrl(record, "whiteLogo");

    const raised = formatShortMoney(fields.totalRaised);
    const spent = formatShortMoney(fields.totalSpent);
    const projects = safeNumber(fields.projectsFunded);

    const stats = [
      statRow("Raised", raised),
      projects > 0 ? statRow("Projects financed", formatInt(projects)) : "",
      spent ? statRow("Spent", spent) : ""
    ].filter(Boolean).join("");

    return `
      <div class="col d-flex">
        <a
          class="si-card si-card--2xs abundance-card--interactive card-with-main-action h-100 w-100 d-flex flex-column text-decoration-none"
          href="${escapeHtml(url)}"
          aria-label="View ${escapeHtml(name)}"
        >
          <div
            class="d-flex align-items-center justify-content-center border-radius--lg p-all-spacer-xs"
            style="height:104px; background:${escapeHtml(hex)};"
          >
            ${
              logo
                ? `
                  <img
                    src="${escapeHtml(logo)}"
                    alt="${escapeHtml(name)}"
                    loading="lazy"
                    decoding="async"
                    class="img-fluid"
                    style="max-height:58px; object-fit:contain;"
                  >
                `
                : ""
            }
          </div>

          <div class="p-t-spacer-sm" aria-hidden="true"></div>

          <h3 class="si-heading-5 m-b-spacer-0" style="min-height:2.35em;">
            ${escapeHtml(name)}
          </h3>

          <div class="m-t-spacer-xs" style="min-height:4.8em;">
            ${stats}
          </div>
        </a>
      </div>
    `;
  }

  function loadingState(grid) {
    grid.innerHTML = `
      <div class="col d-flex">
        <div class="si-card si-card--2xs abundance-card--interactive card-with-main-action h-100 text-decoration-none w-100">
          <p class="abundance-body-compact m-b-spacer-0">
            Loading councils…
          </p>
        </div>
      </div>
    `;
  }

  function emptyState(grid, message) {
    grid.innerHTML = `
      <div class="col d-flex">
        <div class="si-card si-card--2xs abundance-card--interactive card-with-main-action h-100 text-decoration-none w-100">
          <p class="abundance-body-compact m-b-spacer-0">
            ${escapeHtml(message)}
          </p>
        </div>
      </div>
    `;
  }

  function errorState() {
    emptyState(openGrid, "Sorry, we could not load councils right now.");
    emptyState(otherGrid, "Sorry, we could not load councils right now.");
  }

  function renderGrid(grid, councils, emptyMessage) {
    if (!councils.length) {
      emptyState(grid, emptyMessage);
      return;
    }

    grid.innerHTML = councils.map(councilCard).join("");
  }

  function setOpenCardVisible(isVisible) {
    if (openCard) openCard.hidden = !isVisible;
    if (openCardSpacer) openCardSpacer.hidden = !isVisible;
  }

  async function init() {
    loadingState(openGrid);
    loadingState(otherGrid);

    try {
      const [records, loans] = await Promise.all([
        window.AbundanceLiveStats && window.AbundanceLiveStats.fetchCouncils
          ? window.AbundanceLiveStats.fetchCouncils()
          : fetch(endpoint, { cache: "no-store" })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Council endpoint returned " + response.status);
            }

            return response.json();
          })
          .then(recordsFromResponse),
        window.AbundanceLiveStats && window.AbundanceLiveStats.fetchLoans
          ? window.AbundanceLiveStats.fetchLoans()
          : fetch(DEFAULT_LOANS_ENDPOINT, { cache: "no-store" })
            .then(function (response) {
              if (!response.ok) {
                throw new Error("Loans endpoint returned " + response.status);
              }

              return response.json();
            })
            .then(recordsFromResponse)
      ]);

      const eligibleCouncilIds = window.AbundanceLiveStats && window.AbundanceLiveStats.eligibleCouncilIdsFromLoans
        ? window.AbundanceLiveStats.eligibleCouncilIdsFromLoans(loans)
        : councilIdsFromLoans(loans, function (loan) {
          return isOpen(loan) || isClosed(loan);
        });

      const openCouncilIds = councilIdsFromLoans(loans, isOpen);

      const visibleCouncils = records
        .filter(function (record) {
          return record && record.id && eligibleCouncilIds.has(record.id) && !shouldExcludeCouncil(record);
        })
        .sort(function (a, b) {
          const nameA = getValue(a, "issuingCouncil") || "";
          const nameB = getValue(b, "issuingCouncil") || "";
          return nameA.localeCompare(nameB);
        });

      const openCouncils = visibleCouncils.filter(function (record) {
        return openCouncilIds.has(record.id);
      });

      const otherCouncils = visibleCouncils.filter(function (record) {
        return !openCouncilIds.has(record.id);
      });

      setOpenCardVisible(openCouncils.length > 0);

      if (openCouncils.length > 0) {
        renderGrid(
          openGrid,
          openCouncils,
          "There are no councils with open investments right now. Please check again later."
        );
      }

      renderGrid(
        otherGrid,
        otherCouncils,
        "No other councils are available at the moment."
      );

      openGrid.setAttribute("data-abv2-script", "council-grid-open-and-other-v1");
      otherGrid.setAttribute("data-abv2-script", "council-grid-open-and-other-v1");
    } catch (error) {
      console.error(error);
      errorState();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>
