import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const inboundDir = path.join(root, "hub pages", "legacy");
const pagesDir = path.join(root, "v2-local", "pages");
const dividerColours = ["bg-colour--yellow", "bg-colour--pink", "bg-colour--secondary"];

function findMatchingClose(source, openStart, tagName) {
  const openEnd = source.indexOf(">", openStart);
  const pattern = new RegExp(`<\\s*(/?)\\s*${tagName}\\b[^>]*>`, "gi");

  pattern.lastIndex = openEnd + 1;

  let depth = 1;
  let match;

  while ((match = pattern.exec(source))) {
    depth += match[1] ? -1 : 1;

    if (depth === 0) {
      return {
        openEnd,
        closeStart: match.index,
        closeEnd: pattern.lastIndex
      };
    }
  }

  return null;
}

function extractContentBlocks(source) {
  const blocks = [];
  const marker = /data-content="([^"]*)"/g;
  let match;

  while ((match = marker.exec(source))) {
    const openStart = source.lastIndexOf("<", match.index);
    const openEnd = source.indexOf(">", openStart);
    const open = source.slice(openStart, openEnd + 1);
    const tagName = (open.match(/^<\s*([a-z0-9]+)/i) || [])[1];

    if (!tagName) continue;

    const close = findMatchingClose(source, openStart, tagName);
    if (!close) continue;

    blocks.push({
      contentId: match[1],
      tagName,
      open,
      inner: source.slice(close.openEnd + 1, close.closeStart),
      full: source.slice(openStart, close.closeEnd),
      hiddenField: /\bdata-ai-/.test(open)
    });

  }

  return blocks;
}

function attr(html, name) {
  const match = html.match(new RegExp(`${name}="([^"]*)"`));
  return match ? match[1] : "";
}

function extractImages(source) {
  return [...source.matchAll(/<img\b[^>]*>/gi)].map((match) => {
    const tag = match[0];
    return {
      src: attr(tag, "src"),
      alt: attr(tag, "alt"),
      title: attr(tag, "title")
    };
  });
}

function firstIllustrativeImage(images) {
  return images.find((image) => {
    const alt = String(image.alt || "").toLowerCase();
    return image.src && image.src.includes("/cms/") && !alt.includes("logo");
  }) || images.find((image) => {
    const alt = String(image.alt || "").toLowerCase();
    return image.src && !alt.includes("logo");
  }) || {};
}

function captionForUseOfFundsImage(image, data) {
  if (!image || !image.src) return "";

  if (data.finalImage && image.src === data.finalImage.src) {
    return data.finalCaption || "";
  }

  if (data.noChartImage && image.src === data.noChartImage) {
    return data.noChartCaption || "";
  }

  return "";
}

function textOnly(html) {
  return html
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function cleanInlineHtml(html) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/\sdata-content="[^"]*"/g, "")
    .replace(/\sdata-[a-z0-9-]+="[^"]*"/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/<a\b([^>]*)>/gi, (match, attrs) => {
      const href = attr(match, "href");
      const target = attr(match, "target");
      const rel = attr(match, "rel");
      const title = attr(match, "title");
      return `<a class="si-link si-link--accent"${href ? ` href="${escapeAttr(href)}"` : ""}${target ? ` target="${escapeAttr(target)}"` : ""}${rel ? ` rel="${escapeAttr(rel)}"` : ""}${title ? ` title="${escapeAttr(title)}"` : ""}>`;
    })
    .trim();
}

function paragraphMarkup(innerHtml, className = "body--lg m-t-spacer-sm m-b-spacer-0") {
  const cleaned = cleanInlineHtml(innerHtml);
  const paragraphMatches = [...cleaned.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];

  if (paragraphMatches.length) {
    return paragraphMatches
      .map((match) => `<p class="${className}">${cleanInlineHtml(match[1])}</p>`)
      .join("\n");
  }

  return `<p class="${className}">${cleaned}</p>`;
}

function hiddenFields(blocks) {
  const values = {};

  blocks
    .filter((block) => block.hiddenField)
    .forEach((block) => {
      const field = (block.open.match(/\bdata-ai-([^=\s]+)(?:=""|\s|>)/) || [])[1];
      if (field) values[field] = cleanInlineHtml(block.inner);
    });

  return values;
}

function firstFigcaption(source) {
  const match = source.match(/<figcaption\b[^>]*data-content="[^"]*"[^>]*>([\s\S]*?)<\/figcaption>/i);
  return match ? match[1] : "";
}

function visibleBlocks(source) {
  return extractContentBlocks(source)
    .filter((block) => !block.hiddenField)
    .filter((block) => ["h1", "h2", "p", "span", "figcaption"].includes(block.tagName))
    .map((block) => ({
      tagName: block.tagName.toLowerCase(),
      inner: block.inner
    }));
}

function pageData(fileName, source, pageIndex) {
  const blocks = extractContentBlocks(source);
  const hidden = hiddenFields(blocks);
  const visible = visibleBlocks(source);
  const images = extractImages(source);

  const heroTitle = visible.find((block) => block.tagName === "h1");
  const heroIntro = visible.find((block) => block.tagName === "p");
  const headings = visible.filter((block) => block.tagName === "h2");
  const copyBlocks = visible.filter((block) => block.tagName === "span");
  const caption = firstFigcaption(source);

  const heroSectionStart = source.indexOf("ai-hero");
  const heroSlice = heroSectionStart >= 0 ? source.slice(heroSectionStart, heroSectionStart + 500) : "";
  const heroColor = (heroSlice.match(/background:\s*([^;"']+)/i) || [])[1] || "#00aec2";

  const useOfFundsImage = firstIllustrativeImage(images);
  const data = {
    slug: fileName,
    recordId: hidden["council-reference"],
    noChartImage: hidden["no-chart-img-url"],
    noChartAlt: hidden["no-chart-img-alt"],
    noChartCaption: hidden["no-chart-img-caption"],
    heroTitle: heroTitle ? heroTitle.inner : fileName,
    heroIntro: heroIntro ? heroIntro.inner : "",
    howHeading: headings[1] ? headings[1].inner : "How investors' money has been used",
    howCopy: copyBlocks[0] ? copyBlocks[0].inner : "",
    finalHeading: headings[2] ? headings[2].inner : "",
    finalCopy: copyBlocks[1] ? copyBlocks[1].inner : "",
    finalCaption: caption,
    heroLogo: images[0] || {},
    useOfFundsImage,
    finalImage: images[images.length - 1] || {},
    heroColor: heroColor.trim(),
    dividerColour: dividerColours[pageIndex % dividerColours.length]
  };

  data.useOfFundsCaption = captionForUseOfFundsImage(useOfFundsImage, data);

  return data;
}

function legacyPageTemplate(data) {
  return `<div class="bg-white min-vh-100" id="top">
  <div
    data-abv2-council-hub-config
    data-council-record-id="${escapeAttr(data.recordId)}"
    data-councils-endpoint="https://data.abundanceinvestment.com/councils"
    data-loans-endpoint="https://data.abundanceinvestment.com/loans"
    hidden>
  </div>

  <section class="position-relative p-y-spacer-lg bg-colour--white">
    <div class="container-medium p-x-spacer-xs position-relative" style="z-index:2;">
      <div class="choke-760">
        <h1 class="abundance-heading-display m-b-spacer-0" data-abv2-council-field="councilName">
          ${cleanInlineHtml(data.heroTitle)}
        </h1>
        <p class="body--lg m-t-spacer-sm m-b-spacer-0" data-abv2-council-field="councilDescription">
          ${cleanInlineHtml(data.heroIntro)}
        </p>

        <div class="row row-cols-1 row-cols-sm-3 gx-sm gy-sm m-t-spacer-md">
          <div>
            <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-eyebrow">Amount raised</div>
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-stat" data-abv2-council-field="amountRaised">£0</div>
          </div>
          <div>
            <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-eyebrow">Investment closed</div>
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-stat" data-abv2-council-field="investmentClosed">-</div>
          </div>
          <div>
            <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-eyebrow">Spent so far</div>
            <div class="p-t-spacer-3xs" aria-hidden="true"></div>
            <div class="abundance-stat" data-abv2-council-field="spentSoFar">£0</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="abundance-dividers abundance-dividers--rise-left ${data.dividerColour}" aria-hidden="true"></div>

  <section class="position-relative p-y-spacer-lg bg-colour--white">
    <div class="container-medium p-x-spacer-xs text-center">
      <div class="choke-900 m-x--auto">
        <h2 class="si-heading-2 text-color--primary m-b-spacer-0">
          ${cleanInlineHtml(data.howHeading)}
        </h2>
        ${paragraphMarkup(data.howCopy, "body--lg m-x--auto m-t-spacer-sm m-b-spacer-0")}
        <div class="p-t-spacer-sm" aria-hidden="true"></div>
        <div class="choke-700 m-x--auto">
          <figure class="m-b-spacer-0">
            <img
              class="si-image si-image--3-2 border-radius--4xl"
              loading="lazy"
              decoding="async"
              src="${escapeAttr(data.useOfFundsImage.src || data.noChartImage || data.finalImage.src)}"
              alt="${escapeAttr(data.useOfFundsImage.alt || data.noChartAlt || data.finalImage.alt || textOnly(data.howHeading))}">
            ${data.useOfFundsCaption ? `<figcaption class="abundance-body-compact m-t-spacer-xs">${cleanInlineHtml(data.useOfFundsCaption)}</figcaption>` : ""}
          </figure>
        </div>
      </div>
    </div>
  </section>

  <div class="abundance-dividers abundance-dividers--rise-left ${data.dividerColour}" aria-hidden="true"></div>

  <section class="position-relative p-y-spacer-md bg-colour--white">
    <div class="container-medium position-relative" style="z-index:2;">
      <div class="choke-800 m-x--auto p-x-spacer-xs position-relative">
        <article class="si-card si-card--secondary p-all-spacer-md" id="abv2-use-of-funds" data-abv2-use-of-funds-content>
          <h2 class="si-heading-2 m-b-spacer-0">
            Use of funds
          </h2>
          <div class="p-t-spacer-2xs" aria-hidden="true"></div>
          <p class="body--md m-t-spacer-0 m-b-spacer-0">
            The chart below shows how reported project spending has been allocated across eligible green project categories for <span data-abv2-council-field="councilName">${cleanInlineHtml(data.heroTitle)}</span>.
          </p>
          <div class="p-t-spacer-sm" aria-hidden="true"></div>
          <section class="si-card si-card--secondary p-all-spacer-sm" aria-live="polite">
            <div class="row gx-sm gy-xs align-items-center flex-nowrap">
              <div class="col-auto">
                <div data-abv2-council-logo-tile style="width:88px;height:88px;border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:0 0 88px;background:${escapeAttr(data.heroColor)};">
                  <img data-abv2-council-logo src="${escapeAttr(data.heroLogo.src)}" alt="${escapeAttr(textOnly(data.heroTitle))}" style="max-width:72%;max-height:72%;">
                </div>
              </div>
              <div class="col">
                <div class="row row-cols-1 row-cols-sm-3 gx-xs gy-xs align-items-start">
                  <div>
                    <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-eyebrow">Amount spent</div>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat" data-abv2-council-field="amountSpent">£0</div>
                  </div>
                  <div>
                    <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-eyebrow">Projects financed</div>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat" data-abv2-council-field="projectsFinanced">0</div>
                  </div>
                  <div>
                    <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-eyebrow">Investments</div>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <div class="abundance-stat" data-abv2-council-field="investmentsCount">0</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="p-t-spacer-sm" aria-hidden="true"></div>
          <div class="abundance-bar-chart abundance-bar-chart--compact" aria-live="polite" data-abv2-use-of-funds-chart></div>
        </article>

        <section data-abv2-no-spend-content hidden>
          <div class="choke-900 m-x--auto text-center">
            ${data.finalHeading ? `<h2 class="si-heading-2 m-b-spacer-0">${cleanInlineHtml(data.finalHeading)}</h2>` : `<h2 class="si-heading-2 m-b-spacer-0">Use of funds</h2>`}
            ${data.finalCopy ? paragraphMarkup(data.finalCopy, "body--lg m-x--auto m-t-spacer-sm m-b-spacer-0") : `<p class="body--lg m-x--auto m-t-spacer-sm m-b-spacer-0">${cleanInlineHtml(data.noChartCaption || "No spend data is available yet.")}</p>`}
            <div class="p-t-spacer-sm" aria-hidden="true"></div>
            <div class="choke-700 m-x--auto">
              <figure class="m-b-spacer-0">
                <img
                  class="si-image si-image--3-2 border-radius--4xl"
                  loading="lazy"
                  decoding="async"
                  src="${escapeAttr(data.finalImage.src || data.noChartImage)}"
                  alt="${escapeAttr(data.finalImage.alt || data.noChartAlt || "Project image")}">
                ${data.finalCaption ? `<figcaption class="abundance-body-compact m-t-spacer-xs">${cleanInlineHtml(data.finalCaption)}</figcaption>` : ""}
              </figure>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>

</div>
`;
}

async function main() {
  if (process.env.ALLOW_COUNCIL_REGEN !== "1") {
    console.error("Refusing to regenerate legacy council pages. Set ALLOW_COUNCIL_REGEN=1 to overwrite v2-local/pages/council-*.html from inbound hub pages.");
    process.exit(1);
  }

  await mkdir(pagesDir, { recursive: true });

  const files = (await readdir(inboundDir))
    .filter((file) => !file.startsWith("."))
    .sort();

  for (const [index, file] of files.entries()) {
    const source = await readFile(path.join(inboundDir, file), "utf8");
    const data = pageData(file, source, index);
    await writeFile(path.join(pagesDir, `${data.slug}.html`), legacyPageTemplate(data));
    console.log(`Wrote ${data.slug}.html (${data.recordId})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
