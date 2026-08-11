import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const inboundDirs = [
  path.join(root, "hub pages", "programme"),
  path.join(root, "hub pages", "open loan")
];
const pagesDir = path.join(root, "v2-local", "pages");
const dividerColours = ["bg-colour--yellow", "bg-colour--pink", "bg-colour--secondary"];
const heroLogoTweaks = {
  "council-bristol": {
    src: "https://shareinmicrosite.blob.core.windows.net/abundance/9dc1154d-54a7-4433-9ee2-9af3344aae06.png",
    maxWidth: "280px"
  },
  "council-glasgow": {
    maxWidth: "360px",
    align: "right"
  },
  "council-hounslow": {
    src: "https://shareinmicrosite.blob.core.windows.net/abundance/2a1651b5-2b79-4094-bd95-359229cb153a.png"
  },
  "council-sheffield": {
    src: "https://shareinmicrosite.blob.core.windows.net/abundance/dd083d49-4f06-4110-a7df-defeb3f5ec7b.png",
    maxWidth: "300px"
  }
};

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
      tagName: tagName.toLowerCase(),
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
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\swidth="[^"]*"/gi, "")
    .replace(/\sheight="[^"]*"/gi, "")
    .replace(/<a\b([^>]*)>/gi, (match) => {
      const href = attr(match, "href");
      const target = attr(match, "target");
      const rel = attr(match, "rel");
      return `<a class="si-link si-link--accent"${href ? ` href="${escapeAttr(href)}"` : ""}${target ? ` target="${escapeAttr(target)}"` : ""}${rel ? ` rel="${escapeAttr(rel)}"` : ""}>`;
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

function visibleBlocks(source) {
  return extractContentBlocks(source)
    .filter((block) => !block.hiddenField)
    .filter((block) => ["h1", "h2", "p", "span", "figcaption", "div"].includes(block.tagName))
    .map((block) => ({
      tagName: block.tagName,
      inner: block.inner
    }));
}

function heroColor(source) {
  const heroSectionStart = source.indexOf("ai-hero");
  const heroSlice = heroSectionStart >= 0 ? source.slice(heroSectionStart, heroSectionStart + 500) : "";
  return ((heroSlice.match(/background:\s*([^;"']+)/i) || [])[1] || "#00aec2").trim();
}

function firstHeroLogo(images) {
  return images.find((image) => {
    const alt = String(image.alt || "").toLowerCase();
    return image.src && alt.includes("logo");
  }) || images[0] || {};
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

function finalImage(images) {
  return [...images].reverse().find((image) => {
    const alt = String(image.alt || "").toLowerCase();
    return image.src && !alt.includes("logo");
  }) || images[images.length - 1] || {};
}

function quoteMarkup(aboutHtml) {
  const match = aboutHtml.match(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/i);
  if (!match) return "";

  const quoteText = (match[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "";
  const footer = (match[1].match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i) || [])[1] || "";
  const image = (footer.match(/<img\b[^>]*>/i) || [])[0] || "";
  const imageSrc = image ? attr(image, "src") : "";
  const imageAlt = image ? attr(image, "alt") : "";
  const imageTitle = image ? attr(image, "title") : "";
  const footerName = (footer.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "";
  const footerRole = (footer.match(/<cite\b[^>]*>([\s\S]*?)<\/cite>/i) || [])[1] || "";

  if (!quoteText) return "";

  return `<blockquote class="brand-blockquote">
    <p class="body--lg">${cleanInlineHtml(quoteText)}</p>
    ${footer ? `<footer>
      ${imageSrc ? `<img loading="lazy" src="${escapeAttr(imageSrc)}" alt="${escapeAttr(imageAlt)}" title="${escapeAttr(imageTitle)}">` : ""}
      <div>
        ${footerName ? `<p>${cleanInlineHtml(footerName)}</p>` : ""}
        ${footerRole ? `<cite>${cleanInlineHtml(footerRole)}</cite>` : ""}
      </div>
    </footer>` : ""}
  </blockquote>`;
}

function aboutCopyMarkup(aboutHtml) {
  const withoutQuote = aboutHtml.replace(/<blockquote\b[^>]*>[\s\S]*?<\/blockquote>/i, "");
  return paragraphMarkup(withoutQuote);
}

function deriveAboutHeading(openHeading, noOpenHeader, heroTitle) {
  const openText = textOnly(openHeading);
  const noOpenText = textOnly(noOpenHeader);
  const investmentName = openText
    .replace(/^Invest in\s+/i, "")
    .replace(/\s+today$/i, "")
    .trim();

  if (investmentName && !investmentName.includes("[investment name]")) {
    return `About ${investmentName}`;
  }

  const learnedName = noOpenText
    .replace(/^Learn more about\s+/i, "")
    .trim();

  if (learnedName) {
    return `About ${learnedName}`;
  }

  return `About ${textOnly(heroTitle)}`;
}

function placeholderCopy() {
  return "Placeholder";
}

function firstMatch(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1] : "";
}

function existingImageOverrides(source) {
  if (!source) return {};

  const contentImages = [...source.matchAll(/<img\b[^>]*class="[^"]*\bsi-image\b[^"]*"[^>]*\bsrc="([^"]+)"/gi)]
    .map((match) => match[1]);

  return {
    heroLogoSrc: firstMatch(source, /<div class="col-12 col-md-5">[\s\S]*?<img\b[^>]*\bsrc="([^"]+)"/i),
    useImageSrc: contentImages[0] || "",
    finalImageSrc: contentImages[1] || ""
  };
}

function withExistingSrc(image, src) {
  return src ? { ...image, src } : image;
}

function pageData(fileName, source, pageIndex, existingPage = "") {
  const blocks = extractContentBlocks(source);
  const hidden = hiddenFields(blocks);
  const visible = visibleBlocks(source);
  const images = extractImages(source);
  const existingImages = existingImageOverrides(existingPage);

  const heroTitle = visible.find((block) => block.tagName === "h1");
  const heroIntro = visible.find((block) => block.tagName === "p");
  const aboutBlock = visible.find((block) => block.tagName === "div");
  const headings = visible.filter((block) => block.tagName === "h2");
  const copyBlocks = visible.filter((block) => block.tagName === "span");
  const captions = visible.filter((block) => block.tagName === "figcaption");
  const useImage = firstIllustrativeImage(images);
  const final = finalImage(images);

  const openHeading = headings[0] ? headings[0].inner : "Invest today";
  const noOpenHeader = hidden["no-open-header"];

  return {
    slug: fileName,
    recordId: hidden["council-reference"],
    noOpenHeader,
    noOpenWords: hidden["no-open-words"],
    noOpenButtonText: hidden["no-open-button-text"] || "Sign up for updates",
    noOpenButtonUrl: hidden["no-open-button-url"] || "/signup-for-updates",
    noChartImage: hidden["no-chart-img-url"],
    noChartAlt: hidden["no-chart-img-alt"],
    noChartCaption: hidden["no-chart-img-caption"],
    heroTitle: heroTitle ? heroTitle.inner : fileName,
    heroIntro: heroIntro ? heroIntro.inner : "",
    aboutCopy: aboutBlock ? aboutCopyMarkup(aboutBlock.inner) : "",
    quote: aboutBlock ? quoteMarkup(aboutBlock.inner) : "",
    openHeading,
    aboutHeading: deriveAboutHeading(openHeading, noOpenHeader, heroTitle ? heroTitle.inner : fileName),
    useHeading: headings[1] ? headings[1].inner : "How your money is being used",
    useCopy: copyBlocks[0] ? copyBlocks[0].inner : "",
    finalHeading: headings[2] ? headings[2].inner : "Climate strategy",
    finalCopy: copyBlocks[1] ? copyBlocks[1].inner : placeholderCopy(),
    finalCaption: captions[0] ? captions[0].inner : "",
    heroLogo: withExistingSrc(firstHeroLogo(images), heroLogoTweaks[fileName]?.src || existingImages.heroLogoSrc),
    useImage: withExistingSrc(useImage, existingImages.useImageSrc),
    finalImage: withExistingSrc(final, existingImages.finalImageSrc),
    heroColor: heroColor(source),
    dividerColour: dividerColours[pageIndex % dividerColours.length],
    heroLogoTweak: heroLogoTweaks[fileName] || {}
  };
}

function heroLogoWrapperStyle(data) {
  const maxWidth = data.heroLogoTweak.maxWidth || "360px";
  const align = data.heroLogoTweak.align === "right"
    ? "margin-left:auto;margin-right:0;"
    : "margin-left:auto;margin-right:auto;";

  return `width:100%;max-width:${maxWidth};${align}`;
}

function statBlock(label, field, fallback = "-") {
  return `<div>
    <hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
    <div class="abundance-eyebrow text-color--primary">${label}</div>
    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
    <div class="abundance-stat text-color--primary" data-abv2-programme-field="${field}">${fallback}</div>
  </div>`;
}

function historySection(data, state) {
  const stateAttr = state === "open" ? "data-abv2-open-history" : "data-abv2-no-open-history";
  return `<div class="abundance-mask abundance-mask--top bg-colour--pink" aria-hidden="true" ${stateAttr} hidden></div>
  <section class="position-relative p-y-spacer-lg bg-colour--pink" id="investment-history-${state}" ${stateAttr} hidden style="margin-top:-1px;">
    <div class="choke-1200 m-x--auto p-x-spacer-xs">
      <div class="choke-600 m-x--auto text-center m-b-spacer-md">
        <h2 class="si-heading-2 text-color--primary m-b-spacer-0">
          Investment history
        </h2>
        <p class="body--lg text-color--primary text-choke--640 m-x--auto m-t-spacer-xs m-b-spacer-0">
          Previous ${cleanInlineHtml(data.heroTitle)} investments on the platform.
        </p>
      </div>
      <div class="choke-1000 m-x--auto">
        <div class="si-card abundance-card--soft p-all-spacer-sm">
          <div tabindex="0" aria-label="Investment history table">
            <table class="si-table si-table--sm-compact si-table--borders-between-rows">
              <thead>
                <tr>
                  <th>Investment</th>
                  <th>Use of funds</th>
                  <th>Interest rate</th>
                  <th>Amount raised</th>
                  <th>Close date</th>
                </tr>
              </thead>
              <tbody data-abv2-investment-history-body></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="abundance-mask abundance-mask--bottom bg-colour--pink" aria-hidden="true" ${stateAttr} hidden></div>`;
}

function calculatorSection() {
  return `<div class="abundance-mask abundance-mask--top bg-colour--secondary" aria-hidden="true" data-abv2-open-state hidden></div>
  <section
    class="position-relative p-y-spacer-lg bg-colour--secondary"
    id="payment-example-helper-test"
    data-abv2-open-state
    data-abv2-calc-config=""
    data-rate="4.5"
    data-term-years="5"
    data-interest-date-1="June"
    data-interest-date-2="December"
    style="margin-top:-1px;"
    hidden>
    <div class="choke-1200 m-x--auto p-x-spacer-xs">
      <div class="row gx-lg gy-md align-items-center">
        <div class="col-12 col-md-6">
          <div class="choke-700">
            <h2 class="si-heading-2 text-color--primary m-b-spacer-0">
              See what you could earn
            </h2>
            <p class="body--lg text-color--primary m-t-spacer-xs m-b-spacer-0 choke-600">
              Enter an amount to see your regular interest payments and the total returned over the full investment term.
            </p>
            <div class="m-t-spacer-md choke-500">
              <div class="si-form-group abundance-form-group abundance-form-group--neutral">
                <label class="si-input-label" for="abv2-payment-example-amount-test">
                  Enter your investment amount
                </label>
                <div class="si-input-wrapper">
                  <input
                    class="si-input si-input--has-prefix"
                    id="abv2-payment-example-amount-test"
                    type="number"
                    min="0"
                    step="100"
                    value="5000"
                    inputmode="decimal"
                    currency="GBP"
                    data-abv2-calc-input="">
                  <div class="si-input-prefix">£</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <article class="si-card abundance-card--soft p-all-spacer-md" aria-live="polite">
            <article class="si-card si-card--secondary p-all-spacer-sm">
              <div class="row row-cols-1 row-cols-md-2 gx-xs gy-xs align-items-stretch" aria-label="Payment example assumptions">
                <div>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <div class="abundance-eyebrow text-color--primary">Interest rate</div>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <div class="abundance-stat text-color--primary"><span data-abv2-calc-field="rate">4.5%</span></div>
                </div>
                <div>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <div class="abundance-eyebrow text-color--primary">Investment term</div>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <div class="abundance-stat text-color--primary"><span data-abv2-calc-field="termYears">5 years</span></div>
                </div>
              </div>
            </article>
            <div class="p-t-spacer-xs" aria-hidden="true"></div>
            <div class="row row-cols-1 row-cols-md-2 gx-xs gy-xs align-items-stretch">
              <div>
                <article class="si-card si-card--secondary p-all-spacer-sm h-100">
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <p class="abundance-eyebrow brand-primary">Total returned over term</p>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <p class="si-heading-3 m-b-spacer-0" data-abv2-calc-field="totalReturned">£6,125</p>
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <hr class="si-horizontal-rule abundance-horizontal-rule--ink m-t-spacer-sm m-b-spacer-sm">
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <div>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="abundance-eyebrow">Capital repaid at maturity</p>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="si-heading-4 m-b-spacer-2xs" data-abv2-calc-field="capitalRepaid">£5,000</p>
                  </div>
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <hr class="si-horizontal-rule abundance-horizontal-rule--ink m-t-spacer-sm m-b-spacer-sm">
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <div>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="abundance-eyebrow">Total interest paid</p>
                    <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                    <p class="si-heading-4 m-b-spacer-2xs" data-abv2-calc-field="totalInterest">£1,125</p>
                  </div>
                </article>
              </div>
              <div>
                <article class="si-card si-card--secondary p-all-spacer-sm h-100">
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <p class="abundance-eyebrow brand-secondary">Regular interest payments</p>
                  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
                  <p class="si-heading-3 m-b-spacer-0"><span data-abv2-calc-field="interestPayment">£112.50</span></p>
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <hr class="si-horizontal-rule abundance-horizontal-rule--ink m-t-spacer-sm m-b-spacer-sm">
                  <div class="p-t-spacer-xs" aria-hidden="true"></div>
                  <p class="abundance-body-compact m-b-spacer-xs">
                    Interest is paid 6-monthly in
                    <span data-abv2-calc-field="interestDate1">June</span>
                    and
                    <span data-abv2-calc-field="interestDate2">December</span>.
                  </p>
                </article>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
  <div class="abundance-mask abundance-mask--bottom bg-colour--secondary" aria-hidden="true" data-abv2-open-state hidden></div>`;
}

function programmePageTemplate(data) {
  return `<div class="bg-white min-vh-100" id="top">
  <div
    data-abv2-programme-hub-config
    data-council-record-id="${escapeAttr(data.recordId)}"
    data-councils-endpoint="https://data.abundanceinvestment.com/councils"
    data-loans-endpoint="https://data.abundanceinvestment.com/loans"
    hidden>
  </div>

  <section class="position-relative p-y-spacer-xl bg-colour--white">
    <div class="choke-1200 m-x--auto p-x-spacer-xs">
      <div class="row gx-md gy-md align-items-md-center align-items-start">
        <div class="col-12 col-md-7">
          <h1 class="si-heading-1 m-b-spacer-0" data-abv2-programme-field="councilName">
            ${cleanInlineHtml(data.heroTitle)}
          </h1>
          <p class="body--xl text-choke--640 m-t-spacer-xs m-b-spacer-0">
            ${cleanInlineHtml(data.heroIntro)}
          </p>
        </div>
        <div class="col-12 col-md-5">
          <div style="${heroLogoWrapperStyle(data)}">
            <img
              class="img-fluid"
              src="${escapeAttr(data.heroLogo.src)}"
              alt="${escapeAttr(data.heroLogo.alt || textOnly(data.heroTitle))}"
              loading="lazy"
              decoding="async">
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="abundance-mask abundance-mask--top bg-colour--pink" aria-hidden="true" data-abv2-open-state hidden></div>
  <section class="position-relative p-y-spacer-lg bg-colour--pink" id="live-investment" data-abv2-open-state hidden style="margin-top:-1px;">
    <div class="choke-1200 m-x--auto p-x-spacer-xs">
      <div class="row gx-lg gy-md align-items-start">
        <div class="col-12 col-lg-6">
          <div class="choke-700">
            <h2 class="si-heading-2 text-color--primary m-b-spacer-0">
              ${cleanInlineHtml(data.openHeading)}
            </h2>
            <p class="body--lg text-color--primary m-t-spacer-xs m-b-spacer-0 choke-500" data-abv2-programme-field="openInvestmentCopy">
              ${cleanInlineHtml(data.useCopy)}
            </p>
            <div class="row row-cols-1 row-cols-sm-3 gx-xs gy-xs m-t-spacer-md choke-600" aria-label="Investment headline details">
              ${statBlock("Interest rate", "currentInterestRate")}
              ${statBlock("Investment term", "investmentTerm")}
              ${statBlock("Capital repaid", "capitalRepaid", "At maturity")}
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <article class="si-card abundance-card--soft p-all-spacer-md">
            <p class="abundance-eyebrow brand-primary m-b-spacer-2xs" data-abv2-programme-field="openInvestmentName">
              Investment summary
            </p>
            <h3 class="si-heading-3 m-b-spacer-0">
              Investment summary
            </h3>
            <div class="p-t-spacer-sm" aria-hidden="true"></div>
            <div>
              <div class="row row-cols-1 row-cols-sm-2 gx-2xs gy-0">
                <div><div style="border-top:1px solid #e2e2e2"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow">Borrower</span><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-abv2-programme-field="councilName">${cleanInlineHtml(data.heroTitle)}</p><div class="p-t-spacer-3xs" aria-hidden="true"></div></div></div>
                <div><div style="border-top:1px solid #e2e2e2"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow">Interest paid</span><p class="body--md m-t-spacer-3xs m-b-spacer-0">Every June and December</p><div class="p-t-spacer-3xs" aria-hidden="true"></div></div></div>
              </div>
              <div class="row row-cols-1 row-cols-sm-2 gx-2xs gy-0">
                <div><div style="border-top:1px solid #e2e2e2"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow">Minimum investment</span><p class="body--md m-t-spacer-3xs m-b-spacer-0">£5</p><div class="p-t-spacer-3xs" aria-hidden="true"></div></div></div>
                <div><div style="border-top:1px solid #e2e2e2"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow">Close date</span><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-abv2-programme-field="offerCloseDate">-</p><div class="p-t-spacer-3xs" aria-hidden="true"></div></div></div>
              </div>
            </div>
            <div class="p-t-spacer-sm" aria-hidden="true"></div>
            <div class="display--flex flex-wrap--wrap flex-align-content--center flex-gap--xs">
              <a class="si-btn si-btn--primary si-btn--lg" href="/invest-now" data-abv2-invest-button>
                Invest now
              </a>
              <a
                class="si-btn-link body--md"
                href="#keyterms-modal"
                role="button"
                data-modal-open="keyterms-modal"
                aria-haspopup="dialog"
                aria-controls="keyterms-modal">
                View key terms
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
  <div class="abundance-mask abundance-mask--bottom bg-colour--pink" aria-hidden="true" data-abv2-open-state hidden></div>

  <div class="abundance-mask abundance-mask--top bg-colour--pink" aria-hidden="true" data-abv2-no-open-state hidden></div>
  <section class="position-relative p-y-spacer-lg bg-colour--pink" data-abv2-no-open-state hidden style="margin-top:-1px;">
    <div class="choke-1200 m-x--auto p-x-spacer-xs">
      <div class="row gx-lg gy-md align-items-center">
        <div class="col-12 col-lg-6">
          <h2 class="si-heading-2 text-color--primary m-b-spacer-0">
            ${cleanInlineHtml(data.noOpenHeader)}
          </h2>
          <p class="body--lg text-color--primary m-t-spacer-xs m-b-spacer-0 choke-600">
            ${cleanInlineHtml(data.noOpenWords)}
          </p>
          <div class="p-t-spacer-sm" aria-hidden="true"></div>
          <a class="si-btn si-btn--tertiary si-btn--lg" href="${escapeAttr(data.noOpenButtonUrl)}">
            ${cleanInlineHtml(data.noOpenButtonText)}
          </a>
        </div>
        <div class="col-12 col-lg-6">
          <div class="row row-cols-1 row-cols-sm-2 gx-xs gy-xs">
            ${statBlock("Amount raised so far", "amountRaised", "£0")}
            ${statBlock("Last investment closed", "investmentClosed")}
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="abundance-mask abundance-mask--bottom bg-colour--pink" aria-hidden="true" data-abv2-no-open-state hidden></div>

  <section class="position-relative p-y-spacer-lg bg-colour--white">
    <div class="container-medium p-x-spacer-xs">
      <div class="choke-900">
        <h2 class="si-heading-2 m-b-spacer-0">
          ${cleanInlineHtml(data.aboutHeading)}
        </h2>
        <div class="p-t-spacer-xs" aria-hidden="true"></div>
        ${data.aboutCopy}
        ${data.quote}
      </div>
    </div>
  </section>

  ${historySection(data, "no-open")}

  ${calculatorSection()}

  <section class="position-relative p-y-spacer-lg bg-colour--white" id="use-of-funds" data-abv2-use-of-funds-content>
    <div class="container-medium position-relative" style="z-index:2;">
      <div class="choke-800 m-x--auto p-x-spacer-xs position-relative">
        <h2 class="si-heading-2 m-b-spacer-0">
          How the council has used the money raised
        </h2>
        <div class="p-t-spacer-2xs" aria-hidden="true"></div>
        ${data.useCopy ? paragraphMarkup(data.useCopy, "body--lg m-t-spacer-0 m-b-spacer-0") : `<p class="body--lg m-t-spacer-0 m-b-spacer-0">${placeholderCopy()}</p>`}
        <div class="p-t-spacer-sm" aria-hidden="true"></div>
        <article class="si-card si-card--secondary p-all-spacer-md">
          <section class="si-card si-card--secondary p-all-spacer-sm" aria-live="polite">
            <div class="row gx-sm gy-xs align-items-center flex-nowrap">
              <div class="col-auto">
                <div data-abv2-council-logo-tile style="width:88px;height:88px;border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:0 0 88px;background:${escapeAttr(data.heroColor)};">
                  <img data-abv2-council-logo src="${escapeAttr(data.heroLogo.src)}" alt="${escapeAttr(textOnly(data.heroTitle))}" style="max-width:72%;max-height:72%;">
                </div>
              </div>
              <div class="col">
                <div class="row row-cols-1 row-cols-sm-3 gx-xs gy-xs align-items-start">
                  ${statBlock("Amount spent", "amountSpent", "£0")}
                  ${statBlock("Projects financed", "projectsFinanced", "0")}
                  ${statBlock("Investments", "investmentsCount", "0")}
                </div>
              </div>
            </div>
          </section>
          <div class="p-t-spacer-sm" aria-hidden="true"></div>
          <div class="abundance-bar-chart abundance-bar-chart--compact" aria-live="polite" data-abv2-use-of-funds-chart></div>
        </article>
      </div>
    </div>
  </section>

  <section class="position-relative p-y-spacer-xl bg-colour--white" id="use-of-funds-fallback" data-abv2-no-spend-content hidden>
    <div class="container-medium p-x-spacer-xs text-center">
      <div class="choke-900 m-x--auto">
        <h2 class="si-heading-2 m-b-spacer-0">
          ${cleanInlineHtml(data.useHeading)}
        </h2>
        ${paragraphMarkup(data.useCopy, "body--lg m-x--auto m-t-spacer-xs m-b-spacer-0")}
        <figure class="m-t-spacer-md m-b-spacer-0">
          <div class="m-x--auto choke-700">
            <img
              class="si-image si-image--3-2 border-radius--4xl"
              src="${escapeAttr(data.noChartImage || data.useImage.src || data.finalImage.src)}"
              alt="${escapeAttr(data.noChartAlt || data.useImage.alt || data.finalImage.alt || textOnly(data.useHeading))}"
              loading="lazy"
              decoding="async">
          </div>
          ${(data.noChartCaption || data.finalCaption) ? `<figcaption class="abundance-body-compact m-t-spacer-xs">${cleanInlineHtml(data.noChartCaption || data.finalCaption)}</figcaption>` : ""}
        </figure>
      </div>
    </div>
  </section>

  <div class="abundance-dividers abundance-dividers--rise-left ${data.dividerColour}" aria-hidden="true" data-abv2-no-open-state></div>
  ${historySection(data, "open")}
  <section class="position-relative p-y-spacer-xl bg-colour--white">
    <div class="container-medium p-x-spacer-xs text-center">
      <div class="choke-900 m-x--auto">
        <h2 class="si-heading-2 m-b-spacer-0">
          ${cleanInlineHtml(data.finalHeading)}
        </h2>
        ${paragraphMarkup(data.finalCopy, "body--lg m-x--auto m-t-spacer-xs m-b-spacer-0")}
        <figure class="m-t-spacer-md m-b-spacer-0">
          <div class="m-x--auto choke-700">
            <img
              class="si-image si-image--3-2 border-radius--4xl"
              src="${escapeAttr(data.finalImage.src || data.useImage.src)}"
              alt="${escapeAttr(data.finalImage.alt || data.useImage.alt || textOnly(data.finalHeading))}"
              loading="lazy"
              decoding="async">
          </div>
          ${data.finalCaption ? `<figcaption class="abundance-body-compact m-t-spacer-xs">${cleanInlineHtml(data.finalCaption)}</figcaption>` : ""}
        </figure>
      </div>
    </div>
  </section>

  <dialog class="si-modal si-modal--large" id="keyterms-modal" aria-labelledby="keyterms-modal-title">
    <form method="dialog" class="si-modal__close-button-form">
      <button class="si-btn si-btn--tertiary si-btn--sm" type="submit" aria-label="Close key terms">
        Close
      </button>
    </form>
    <div class="si-modal__interior">
      <header>
        <div class="p-t-spacer-3xs" aria-hidden="true"></div>
        <p class="abundance-eyebrow brand-primary" data-keyterms-field="investmentName">Investment</p>
        <div class="p-t-spacer-3xs" aria-hidden="true"></div>
        <h2 id="keyterms-modal-title" class="si-heading-2 m-b-spacer-0">
          Key terms
        </h2>
        <p class="body--md m-t-spacer-xs m-b-spacer-0 choke-700">
          These key terms summarise the main investment terms.
        </p>
      </header>
      <div class="si-modal__scroll-content">
        <div class="p-t-spacer-sm" aria-hidden="true"></div>
        <div class="row row-cols-1 row-cols-md-2 gx-2xs gy-0">
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Borrower</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-keyterms-field="borrower">${cleanInlineHtml(data.heroTitle)}</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Use of funds</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-keyterms-field="useOfFunds">${cleanInlineHtml(data.useCopy)}</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Interest rate</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-keyterms-field="interestRate">-</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Term period</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-keyterms-field="termPeriod">-</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Minimum investment</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0">£5.00</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Offer close date</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0" data-keyterms-field="offerCloseDate">-</p></div></div>
          <div><div style="border-top:1px solid #e2e2e2;"><div class="p-t-spacer-3xs" aria-hidden="true"></div><span class="abundance-eyebrow d-block">Capital repayment</span><div class="p-t-spacer-3xs" aria-hidden="true"></div><p class="body--md m-t-spacer-3xs m-b-spacer-0">Original investment repaid on maturity date</p></div></div>
        </div>
      </div>
    </div>
  </dialog>
</div>
`;
}

async function main() {
  if (process.env.ALLOW_COUNCIL_REGEN !== "1") {
    console.error("Refusing to regenerate programme council pages. Set ALLOW_COUNCIL_REGEN=1 to overwrite v2-local/pages/council-*.html from inbound hub pages.");
    process.exit(1);
  }

  await mkdir(pagesDir, { recursive: true });

  let pageIndex = 0;
  for (const inboundDir of inboundDirs) {
    const files = (await readdir(inboundDir))
      .filter((file) => !file.startsWith("."))
      .sort();

    for (const file of files) {
      const source = await readFile(path.join(inboundDir, file), "utf8");
      const pagePath = path.join(pagesDir, `${file}.html`);
      let existingPage = "";

      try {
        existingPage = await readFile(pagePath, "utf8");
      } catch {
        existingPage = "";
      }

      const data = pageData(file, source, pageIndex, existingPage);
      await writeFile(pagePath, programmePageTemplate(data));
      console.log(`Wrote ${data.slug}.html (${data.recordId})`);
      pageIndex += 1;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
