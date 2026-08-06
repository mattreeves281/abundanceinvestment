import { copyFile, cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "pages");
const includesDir = path.join(root, "_includes");
const assetsDir = path.join(root, "assets");
const publicDir = path.join(root, "public");

const noindex = '<meta name="robots" content="noindex,nofollow">';

function titleFromBody(slug, body) {
  const match = body.match(/<h1\b[^>]*>\s*([\s\S]*?)\s*<\/h1>/i);
  if (!match) {
    return titleFromSlug(slug);
  }

  const text = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text || titleFromSlug(slug);
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function readIfExists(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return "";
    }

    throw error;
  }
}

async function pageJsForSlug(slug, body = "") {
  const pageJs = await readIfExists(path.join(assetsDir, "js", `${slug}.js`));

  if (pageJs) {
    return pageJs;
  }

  if (body.includes("data-abv2-programme-hub-config")) {
    return readIfExists(path.join(assetsDir, "js", "council-hub-programme.js"));
  }

  if (slug.startsWith("council-") && !slug.startsWith("council-hub-")) {
    return readIfExists(path.join(assetsDir, "js", "council-hub-legacy.js"));
  }

  return "";
}

function jsSnippetMarkup(snippet) {
  const trimmed = snippet.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.startsWith("<script") ? trimmed : `<script>\n${trimmed}\n</script>`;
}

function localPreviewScript() {
  return `<script>
  (function () {
    if (!window.$) {
      window.$ = function (selector) {
        return {
          toggleClass: function (className) {
            document.querySelectorAll(selector).forEach(function (element) {
              element.classList.toggle(className);
            });
          }
        };
      };
    }

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("[data-bs-toggle='dropdown']");
      if (toggle) {
        event.preventDefault();
        if (window.matchMedia("(min-width: 1080px)").matches) {
          return;
        }

        var item = toggle.closest(".dropdown");
        var menu = item ? item.querySelector(".dropdown-menu") : null;
        document.querySelectorAll(".brand-navbar .brand-dropdown.show").forEach(function (openItem) {
          if (openItem !== item) openItem.classList.remove("show");
        });
        document.querySelectorAll(".brand-navbar .dropdown-menu.show").forEach(function (openMenu) {
          if (openMenu !== menu) openMenu.classList.remove("show");
        });
        if (item) item.classList.toggle("show");
        if (menu) menu.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(menu ? menu.classList.contains("show") : false));
      }

      var collapse = event.target.closest("[data-bs-toggle='collapse']");
      if (collapse) {
        event.preventDefault();
        var target = document.querySelector(collapse.getAttribute("data-bs-target"));
        if (target) {
          target.classList.toggle("show");
          collapse.setAttribute("aria-expanded", String(target.classList.contains("show")));
        }
      }
    });
  })();
</script>`;
}

function renderPage({ slug, title, header, footer, body, sharedJs, pageJs }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${noindex}
  <title>${title} | Abundance local preview</title>
  <link rel="stylesheet" href="/assets/css/abundance-main-css.css">
</head>
<body>
${header}
<main id="main-content">
${body}
</main>
${footer}
${localPreviewScript()}
${jsSnippetMarkup(sharedJs)}
${jsSnippetMarkup(pageJs)}
</body>
</html>
`;
}

function councilAliasFromSlug(slug) {
  if (!slug.startsWith("council-") || slug.startsWith("council-hub-")) {
    return null;
  }

  return slug.replace(/^council-/, "");
}

async function build() {
  await rm(publicDir, { force: true, recursive: true });
  await mkdir(publicDir, { recursive: true });
  await cp(assetsDir, path.join(publicDir, "assets"), {
    recursive: true,
    filter: (source) => path.basename(source) !== ".DS_Store",
  });
  await mkdir(path.join(publicDir, "assets", "img"), { recursive: true });
  await copyFile(
    path.join(includesDir, "Abundance-Logo-2026-on-white-v2.png"),
    path.join(publicDir, "assets", "img", "Abundance-Logo-2026-on-white-v2.png"),
  );

  const [header, footer, pageFiles, sharedJs] = await Promise.all([
    readFile(path.join(includesDir, "header.html"), "utf8"),
    readFile(path.join(includesDir, "footer.html"), "utf8"),
    readdir(pagesDir),
    readIfExists(path.join(assetsDir, "js", "_live-stats.js")),
  ]);

  const htmlFiles = pageFiles
    .filter((file) => file.endsWith(".html") && !file.startsWith("."))
    .sort();

  const links = [];

  for (const file of htmlFiles) {
    const slug = path.basename(file, ".html");
    const body = await readFile(path.join(pagesDir, file), "utf8");
    const pageJs = await pageJsForSlug(slug, body);
    const title = titleFromBody(slug, body);
    const output = renderPage({ slug, title, header, footer, body, sharedJs, pageJs });

    if (slug === "index") {
      await writeFile(path.join(publicDir, "index.html"), output);
    } else {
      const outputDir = path.join(publicDir, slug);

      await mkdir(outputDir, { recursive: true });
      await writeFile(path.join(outputDir, "index.html"), output);

      const councilAlias = councilAliasFromSlug(slug);
      if (councilAlias) {
        const aliasDir = path.join(publicDir, "council", councilAlias);
        await mkdir(aliasDir, { recursive: true });
        await writeFile(path.join(aliasDir, "index.html"), output);
      }

      links.push({ slug, title });
    }
  }

  console.log(`Built ${htmlFiles.length} pages to ${path.relative(process.cwd(), publicDir)}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
