# Page title

Slug: case-studies
Template: base off components.html

## Content

## Case studies


Our municipal investments are more than just an exciting vision for the future. They have been delivering real benefits for councils since 2020 - creating communities of citizen investors and saving councils money on their borrowing.

// use the HTML construction for page jump links used on the main website:

<nav class="m-t-spacer-sm" aria-label="On this page"><p class="abundance-eyebrow m-b-spacer-2xs">On this page</p><div class="body--md" style="display:flex;flex-wrap:wrap;align-items:baseline;column-gap:12px;row-gap:6px"><a class="si-link si-link--accent" style="display:inline-flex;width:auto" href="#risk-checklist">Key risks</a> <span aria-hidden="" style="opacity:.35">/</span> <a class="si-link si-link--accent" style="display:inline-flex;width:auto" href="#capital-risk">What's the risk of losing your money?</a></div></nav>

//

On this page:

Councils we are working with

Real case studies

// grey masked section like homepage top section with stats

## **Councils we are working with**

We have worked with councils of all political colours. Among others, Sheffield, Bristol, Glasgow, Edinburgh and nine London boroughs have launched investments as part of a long term vision to build communities of citizen investors.

---

**18**

Councils have offered investments

---

**£25.1m**

Invested so far

---

£9.6m
Spent on projects so far


// we have a construction for this on the main site. I have put the JS at the bottom of the page. For this I want something much more compact. Just a list of councils, total raised maybe and link to the main site URL to learn more


// divider, then content section. I think this is a 2 up. Header, stat blocks and copy on the right. Image on the left. Unless that looks too cramped. Image = https://cdn4.sharein.com/abundance/cms/37e692ab-d18b-4a22-9ad6-35e733d78612.jpg . I think maybe we do it as 2 column with image underneath? So header, stats on the left. Copy on the right. Then blockquote, then image? //

**Case study: Southwark Council**

Stats:

- £3.5m
Raised to date
- 1,100
Investors
- 20bp
Saving vs PWLB Certainty rate

[image of a project]

Southwark Council has issued four separate loans since 2024, to fund projects as diverse as urban greening, recycling and reuse hubs, energy efficient lighting and cycle hangars. Over 30% of funds have come from more than 200 local individuals and businesses, demonstrating tangible community participation alongside national support.

“Our green investment programme has been a real win-win. We’ve engaged hundreds of people in our community as investors, and it has strengthened understanding of how we are delivering local infrastructure.”

Tom Sharland, Head of Climate Change & Sustainability

// divider, then same as above. img/advertising-example

**Case study: Bristol City Council**

Stats:

- £2.0m
Raised to date
- 750
Investors
- 23bp
Saving vs PWLB Certainty rate

[image of an ad]

Bristol City Council has launched two investment rounds so far, and has more than 750 investors. It was the first council to launch an investment supported by a communications campaign - funded by EU grant [details] - which got its green investment message seen over [xxx] times in the Bristol area.

“The council is delighted to be at the forefront of the rebirth of UK municipal investment market. What is exciting for us is that the model is so simple to use and scalable, and we are looking forward to realising even greater benefits as the citizen investor community grows. It really deepens community engagement by giving residents a real stake in local climate projects, helping wealth stay and grow within Bristol.”

Councillor Martin Fodor, Chair of the Environment and Sustainability Committee





(function () {
  const OPEN_GRID_ID = "abv2-council-grid";
  const OTHER_GRID_ID = "abv2-council-grid-2";
  const DEFAULT_ENDPOINT = "https://data.abundanceinvestment.com/councils";

  const openGrid = document.getElementById(OPEN_GRID_ID);
  const otherGrid = document.getElementById(OTHER_GRID_ID);

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

  function isComingSoon(record) {
    return includesStatus(getValue(record, "raiseStatus"), "coming soon");
  }

  function shouldExcludeCouncil(record) {
    const hub = getValue(record, "councilHub");

    if (isComingSoon(record)) return true;
    if (!hub || String(hub).trim() === "") return true;

    return false;
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
    const url = fields.councilHub || "#";
    const hex = fields.hex || "#363635";
    const logo = getUrl(record, "whiteLogo");

    const raised = formatShortMoney(fields.totalRaised);
    const spent = formatShortMoney(fields.totalSpent);
    const projects = safeNumber(fields.projectsFunded);

    const stats = [
      statRow("Raised", raised),
      projects > 0 ? statRow("Projects financed", formatInt(projects)) : "",
      spent ? statRow("Spent so far", spent) : statRow("", "No spend reported so far")
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

  async function init() {
    loadingState(openGrid);
    loadingState(otherGrid);

    try {
      const response = await fetch(endpoint, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Council endpoint returned " + response.status);
      }

      const data = await response.json();

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data.records)
          ? data.records
          : [];

      const visibleCouncils = records
        .filter(function (record) {
          return !shouldExcludeCouncil(record);
        })
        .sort(function (a, b) {
          const nameA = getValue(a, "issuingCouncil") || "";
          const nameB = getValue(b, "issuingCouncil") || "";
          return nameA.localeCompare(nameB);
        });

      const openCouncils = visibleCouncils.filter(isOpen);
      const otherCouncils = visibleCouncils.filter(function (record) {
        return !isOpen(record);
      });

      renderGrid(
        openGrid,
        openCouncils,
        "There are no councils with open investments right now. Please check again later."
      );

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