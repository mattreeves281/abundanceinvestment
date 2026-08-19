/* Page script: news-and-insight.js */
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
