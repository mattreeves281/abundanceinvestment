(function () {
  const COUNCILS_ENDPOINT = "https://data.abundanceinvestment.com/councils";
  const LOANS_ENDPOINT = "https://data.abundanceinvestment.com/loans";

  let councilsPromise;
  let loansPromise;

  function recordsFromResponse(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.records)) return data.records;
    return [];
  }

  function getFields(record) {
    return record && record.fields && typeof record.fields === "object" ? record.fields : record || {};
  }

  function getValue(record, key) {
    return getFields(record)[key];
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

  function roundTo(value, decimals) {
    const places = Math.pow(10, decimals);
    return Math.round(value * places) / places;
  }

  function formatMoneyCompact(value, decimals) {
    const number = safeNumber(value);
    const abs = Math.abs(number);
    const dp = typeof decimals === "number" ? decimals : 1;

    if (abs >= 1000000000) return "£" + roundTo(number / 1000000000, dp).toFixed(dp).replace(/\.0+$/, "") + "bn";
    if (abs >= 1000000) return "£" + roundTo(number / 1000000, dp).toFixed(dp).replace(/\.0+$/, "") + "m";
    if (abs >= 1000) return "£" + roundTo(number / 1000, 1).toFixed(1).replace(/\.0$/, "") + "k";
    return "£" + Math.round(number).toLocaleString("en-GB");
  }

  function formatInt(value) {
    return Math.round(safeNumber(value)).toLocaleString("en-GB");
  }

  function formatPercentFromDecimal(value) {
    return (safeNumber(value) * 100).toFixed(2) + "%";
  }

  function parseDate(value) {
    const date = new Date(String(value || ""));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function normaliseStatusItem(item) {
    const value = item && (item.name || item.value || item);
    return String(value || "").trim().toLowerCase();
  }

  function includesStatus(raiseStatus, target) {
    const normalisedTarget = String(target || "").trim().toLowerCase();

    if (!raiseStatus) return false;
    if (typeof raiseStatus === "string") return normaliseStatusItem(raiseStatus) === normalisedTarget;

    if (Array.isArray(raiseStatus)) {
      return raiseStatus.some(function (item) {
        return normaliseStatusItem(item) === normalisedTarget;
      });
    }

    return false;
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

  function loanHasLiveOrClosedStatus(record) {
    const raiseStatus = getValue(record, "raiseStatus");
    return includesStatus(raiseStatus, "open") || includesStatus(raiseStatus, "closed");
  }

  function loanCouncilIds(record) {
    const fields = getFields(record);
    return []
      .concat(valueList(fields.councilID))
      .concat(valueList(fields.councilIds))
      .concat(valueList(fields.councilRecordId));
  }

  function eligibleCouncilIdsFromLoans(loans) {
    const ids = new Set();

    loans
      .filter(loanHasLiveOrClosedStatus)
      .forEach(function (loan) {
        loanCouncilIds(loan).forEach(function (id) {
          ids.add(id);
        });
      });

    return ids;
  }

  function filterCouncilsWithEligibleLoans(councils, loans) {
    const eligibleCouncilIds = eligibleCouncilIdsFromLoans(loans || []);

    return councils.filter(function (record) {
      return record && record.id && eligibleCouncilIds.has(record.id);
    });
  }

  function shouldExcludeCouncil(record) {
    const hub = getValue(record, "councilHub");
    return !hub || String(hub).trim() === "";
  }

  function fetchRecords(endpoint, cacheKey) {
    if (cacheKey === "councils" && councilsPromise) return councilsPromise;
    if (cacheKey === "loans" && loansPromise) return loansPromise;

    const request = fetch(endpoint, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error(endpoint + " returned " + response.status);
        return response.json();
      })
      .then(recordsFromResponse);

    if (cacheKey === "councils") councilsPromise = request;
    if (cacheKey === "loans") loansPromise = request;

    return request;
  }

  function setStats(values) {
    Object.keys(values).forEach(function (key) {
      document.querySelectorAll('[data-abv2-stat="' + key + '"]').forEach(function (element) {
        element.textContent = values[key];
      });
    });
  }

  function councilStats(records, loans) {
    const eligibleCouncils = Array.isArray(loans)
      ? filterCouncilsWithEligibleLoans(records, loans)
      : records;

    const visibleCouncils = eligibleCouncils.filter(function (record) {
      return !shouldExcludeCouncil(record);
    });

    const projectTotals = records.reduce(function (acc, record) {
      acc.totalSpent += safeNumber(getValue(record, "totalSpent"));
      acc.projectsFunded += safeNumber(getValue(record, "projectsFunded"));
      return acc;
    }, {
      totalSpent: 0,
      projectsFunded: 0
    });

    const totalRaised = visibleCouncils.reduce(function (total, record) {
      return total + safeNumber(getValue(record, "totalRaised"));
    }, 0);

    return {
      projectsFinanced: formatInt(projectTotals.projectsFunded),
      spentOnProjects: formatMoneyCompact(projectTotals.totalSpent, 1),
      totalInvested: formatMoneyCompact(totalRaised, 1),
      uniqueCouncils: formatInt(visibleCouncils.length)
    };
  }

  function loanStats(records) {
    const loansWithRates = records
      .map(function (record) {
        return {
          openDate: parseDate(getValue(record, "openDate")),
          rateOfReturn: safeNumber(getValue(record, "rateOfReturn")),
          raiseStatus: getValue(record, "raiseStatus")
        };
      })
      .filter(function (loan) {
        return loan.openDate && loan.rateOfReturn > 0;
      });

    const mostRecentOpen = loansWithRates
      .filter(function (loan) {
        return includesStatus(loan.raiseStatus, "open");
      })
      .sort(function (a, b) {
        return b.openDate - a.openDate;
      })[0];

    function averageForYear(year) {
      const start = new Date(Date.UTC(year, 0, 1));
      const end = new Date(Date.UTC(year + 1, 0, 1));
      const matches = loansWithRates.filter(function (loan) {
        return loan.openDate >= start && loan.openDate < end;
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    function averageForPastMonths(months) {
      const end = new Date();
      const start = new Date(end);
      start.setMonth(start.getMonth() - months);

      const matches = loansWithRates.filter(function (loan) {
        return loan.openDate >= start && loan.openDate <= end;
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    function averageForAllHistoric() {
      const matches = loansWithRates.filter(function (loan) {
        return !includesStatus(loan.raiseStatus, "open");
      });

      if (!matches.length) return "";

      const average = matches.reduce(function (total, loan) {
        return total + loan.rateOfReturn;
      }, 0) / matches.length;

      return formatPercentFromDecimal(average);
    }

    return {
      investTodayRate: mostRecentOpen ? formatPercentFromDecimal(mostRecentOpen.rateOfReturn) : "",
      investTodayRateDecimal: mostRecentOpen ? mostRecentOpen.rateOfReturn : null,
      averageRatePast12Months: averageForPastMonths(12),
      averageRate2026: averageForYear(2026),
      averageRate2025: averageForYear(2025),
      averageRateAllHistoric: averageForAllHistoric(),
      averageRate2024: averageForYear(2024)
    };
  }

  function initCouncilStats() {
    if (!document.querySelector("[data-abv2-stat]")) return false;

    Promise.all([
      fetchRecords(COUNCILS_ENDPOINT, "councils"),
      fetchRecords(LOANS_ENDPOINT, "loans")
    ])
      .then(function ([councils, loans]) {
        setStats(councilStats(councils, loans));
      })
      .catch(function (error) {
        console.error("Council stats failed:", error);
      });

    return true;
  }

  let councilStatsObserver;

  function initCouncilStatsWhenReady() {
    if (initCouncilStats()) {
      if (councilStatsObserver) {
        councilStatsObserver.disconnect();
        councilStatsObserver = null;
      }

      return;
    }

    if (councilStatsObserver || !document.body) return;

    councilStatsObserver = new MutationObserver(function () {
      initCouncilStatsWhenReady();
    });

    councilStatsObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.AbundanceLiveStats = {
    councilStats: councilStats,
    refreshCouncilStats: initCouncilStatsWhenReady,
    fetchCouncils: function () {
      return fetchRecords(COUNCILS_ENDPOINT, "councils");
    },
    eligibleCouncilIdsFromLoans: eligibleCouncilIdsFromLoans,
    filterCouncilsWithEligibleLoans: filterCouncilsWithEligibleLoans,
    fetchLoans: function () {
      return fetchRecords(LOANS_ENDPOINT, "loans");
    },
    loanStats: loanStats,
    setStats: setStats
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCouncilStatsWhenReady);
  } else {
    initCouncilStatsWhenReady();
  }

  window.addEventListener("pageshow", function () {
    initCouncilStatsWhenReady();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      initCouncilStatsWhenReady();
    }
  });
})();

<script>
(function () {
  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getStories() {
    const dataEl = document.getElementById("abv2-news-data");

    if (!dataEl) {
      console.warn("News data block not found");
      return [];
    }

    try {
      return JSON.parse(dataEl.textContent);
    } catch (error) {
      console.error("Could not parse news data", error);
      return [];
    }
  }

  function getCurrentPage(totalPages) {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"), 10);

    if (!page || page < 1) return 1;
    if (page > totalPages) return totalPages;

    return page;
  }

  function getPageHref(page) {
    const url = new URL(window.location.href);

    if (page === 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", page);
    }

    return url.pathname + url.search + url.hash;
  }

  function createStoryHTML(story) {
    const title = escapeHTML(story.title);
    const description = escapeHTML(story.description);
    const url = escapeHTML(story.url);
    const displayDate = escapeHTML(story.displayDate);
    const date = escapeHTML(story.date);
    const thumbnail = escapeHTML(story.thumbnail);
    const imageFit = story.imageFit === "contain" ? "contain" : "cover";
    const imageHTML = imageFit === "contain"
      ? `
            <div
              class="border-radius--4xl d-flex align-items-center justify-content-center"
              style="aspect-ratio:1 / 1; overflow:hidden;"
            >
              <img
                class="img-fluid"
                src="${thumbnail}"
                alt=""
                loading="lazy"
                decoding="async"
                style="width:100%; height:100%; object-fit:contain;">
            </div>
        `
      : `
            <img
              class="si-image si-image--1-1 border-radius--4xl"
              src="${thumbnail}"
              alt=""
              loading="lazy"
              decoding="async">
        `;

    return `
      <article class="row gx-sm gy-sm align-items-start">

        <div class="col-5 col-sm-4 col-md-3">
          <a href="${url}" aria-label="Read ${title}">
            ${imageHTML}
          </a>
        </div>

        <div class="col-7 col-sm-8 col-md-9">
          <div class="p-t-spacer-3xs" aria-hidden="true"></div>
          <p class="abundance-eyebrow brand-secondary">
            <time datetime="${date}">${displayDate}</time>
          </p>
          <div class="p-t-spacer-3xs" aria-hidden="true"></div>

          <h2 class="si-heading-3 m-b-spacer-0">
            <a class="si-link si-link--accent" href="${url}">
              ${title}
            </a>
          </h2>

          <p class="body--md m-t-spacer-xs m-b-spacer-0">
            ${description}
          </p>
        </div>

      </article>
    `;
  }

  function createDividerHTML() {
    return `
      <div class="p-t-spacer-md" aria-hidden="true"></div>
      <hr class="si-horizontal-rule abundance-horizontal-rule--ink">
      <div class="p-t-spacer-md" aria-hidden="true"></div>
    `;
  }

  function createPaginationHTML(currentPage, totalPages) {
    if (totalPages <= 1) return "";

    let links = "";

    if (currentPage > 1) {
      links += `
        <div>
          <a class="si-btn-link body--md" href="${getPageHref(currentPage - 1)}">
            Previous
          </a>
        </div>
      `;
    }

    for (let page = 1; page <= totalPages; page++) {
      const isCurrent = page === currentPage;

      links += `
        <div>
          <a
            class="si-btn-link body--md"
            href="${getPageHref(page)}"
            ${isCurrent ? 'aria-current="page"' : ""}>
            ${page}
          </a>
        </div>
      `;
    }

    if (currentPage < totalPages) {
      links += `
        <div>
          <a class="si-btn-link body--md" href="${getPageHref(currentPage + 1)}">
            Next
          </a>
        </div>
      `;
    }

    return `
      <div class="p-t-spacer-lg" aria-hidden="true"></div>

      <nav aria-label="News pagination">
        <div class="row row-cols-auto gx-2xs gy-2xs align-items-center">
          ${links}
        </div>
      </nav>
    `;
  }

  function renderNewsList() {
    const container = document.getElementById("abv2-news-list");
    if (!container) return;

    const stories = getStories();

    const sortedStories = stories.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    const pageSize = parseInt(container.getAttribute("data-news-page-size"), 10) || 10;
    const totalPages = Math.max(1, Math.ceil(sortedStories.length / pageSize));
    const currentPage = getCurrentPage(totalPages);

    const start = (currentPage - 1) * pageSize;
    const pageStories = sortedStories.slice(start, start + pageSize);

    if (!pageStories.length) {
      container.innerHTML = `
        <p class="body--md m-b-spacer-0">
          No news stories found.
        </p>
      `;
      return;
    }

    const storyHTML = pageStories.map(function (story, index) {
      const divider = index < pageStories.length - 1 ? createDividerHTML() : "";
      return createStoryHTML(story) + divider;
    }).join("");

    container.innerHTML = storyHTML + createPaginationHTML(currentPage, totalPages);
  }

  renderNewsList();
})();
</script>
