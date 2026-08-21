import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const includesDir = path.join(root, "_includes");
const publicDir = path.join(root, "public");

const allowIndexing = process.env.ALLOW_INDEXING === "true";
const siteUrl = (process.env.SITE_URL || "https://councils.abundanceinvestment.com").replace(/\/+$/, "");
const sitemapPages = [
  "index.html",
  "our-vision.html",
  "benefits-today.html",
  "how-it-works.html",
  "case-studies.html",
  "about-abundance.html"
];

function pagePathForHref(file) {
  return file === "index.html" ? "/" : `/${file}`;
}

function activateCurrentNav(header, file) {
  return header.replace(/\saria-current="page"/g, "").replace(
    new RegExp(`(<a\\b(?=[^>]*class="[^"]*abundance-civic-nav__link)(?=[^>]*href="\\./${escapeRegExp(file)}")[^>]*)>`, "i"),
    '$1 aria-current="page">'
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderPage(source, file, includes) {
  let html = source
    .replace("<!-- @include header -->", activateCurrentNav(includes.header, file))
    .replace("<!-- @include footer -->", includes.footer);

  if (allowIndexing) {
    html = html.replace(/\n\s*<meta name="robots" content="noindex, nofollow, noarchive">/g, "");
  }

  return html;
}

async function copyIfExists(from, to) {
  try {
    await cp(from, to, {
      recursive: true,
      filter: (source) => path.basename(source) !== ".DS_Store"
    });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function build() {
  const includes = {
    header: await readFile(path.join(includesDir, "header.html"), "utf8"),
    footer: await readFile(path.join(includesDir, "footer.html"), "utf8")
  };

  await rm(publicDir, { force: true, recursive: true });
  await mkdir(publicDir, { recursive: true });

  await copyIfExists(path.join(root, "css"), path.join(publicDir, "css"));
  await copyIfExists(path.join(root, "img"), path.join(publicDir, "img"));
  await copyIfExists(path.join(root, "js"), path.join(publicDir, "js"));

  const files = (await readdir(srcDir)).filter((file) => file.endsWith(".html")).sort();

  for (const file of files) {
    const source = await readFile(path.join(srcDir, file), "utf8");
    await writeFile(path.join(publicDir, file), renderPage(source, file, includes));
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapPages.map((file) => `  <url><loc>${siteUrl}${pagePathForHref(file)}</loc></url>`),
    "</urlset>",
    ""
  ].join("\n");

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemap);

  const robots = allowIndexing
    ? ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n")
    : ["User-agent: *", "Disallow: /", ""].join("\n");

  await writeFile(path.join(publicDir, "robots.txt"), robots);

  if (!allowIndexing) {
    await writeFile(path.join(publicDir, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n");
  }

  console.log(
    `Built ${files.length} pages to ${path.relative(process.cwd(), publicDir)} (${allowIndexing ? "indexing allowed" : "indexing blocked"})`
  );
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
