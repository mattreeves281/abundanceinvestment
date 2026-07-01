const fs = require("fs");
const path = require("path");
const os = require("os");
const childProcess = require("child_process");

const root = path.resolve(__dirname, "../..");
const packageDir = path.join(root, "designv2/sharein exports/design import package 2");
const candidateCssPath = path.join(root, "designv2/sharein exports/uat revised v1.css");
const reportDir = path.join(packageDir, "reports");
const tmpDir = path.join(os.tmpdir(), "abundance-uat-css-compare");

const primitiveFiles = [
  "primitives/_config abundance revised v2.scss",
  "primitives/type v2.scss",
  "primitives/buttons v2.scss",
  "primitives/card v2.scss",
];

const componentFiles = [
  "css new components/_new-helpers.scss",
  "css new components/_new-landing-page-assets.scss",
  "css new components/_new-content-page-assets.scss",
  "css new components/_new-buy-final.scss",
];

const htmlFiles = [
  "html/FINAL - homepage.html",
  "html/FINAL - content.html",
  "html/FINAL - buy.html",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function stripUse(text) {
  return text
    .replace(/^@use\s+[^;]+;\s*$/gm, "")
    .replace(/##([0-9a-fA-F]{3,8})/g, "#$1")
    .replace(/\/\* required to create a grey line, used in UI elements \/\*/g, "/* required to create a grey line, used in UI elements */");
}

function buildReferenceCss() {
  fs.mkdirSync(tmpDir, { recursive: true });
  const chunks = [...primitiveFiles, ...componentFiles].map((rel) => {
    const full = path.join(packageDir, rel);
    return `\n/* Source: ${rel} */\n${stripUse(read(full))}\n`;
  });

  const helper = `@use "sass:math";

$font-fallback: (system-ui, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif) !default;

$abundance-pink-dark: #c1658b !default;
$abundance-pink-light: #f7d9e8 !default;
$abundance-green: #25ab2d !default;
$abundance-red: #c10c21 !default;
$abundance-orange: #e1873f !default;
$abundance-orange-dark: #c25600 !default;
$abundance-orange-extra-dark: #964300 !default;

@function rem-calc($value, $base: 16) {
  @if math.is-unitless($value) {
    @return math.div($value, $base) * 1rem;
  }
  @return $value;
}

@mixin breakpoint($point) {
  @if $point == mobile-only {
    @media (max-width: ($screen-sm - 1px)) { @content; }
  } @else if $point == tablet-up {
    @media (min-width: $screen-sm) { @content; }
  } @else if $point == desktop-up {
    @media (min-width: $screen-md) { @content; }
  } @else {
    @content;
  }
}

@mixin status {
  &:hover, &:focus, &:active, &:active:hover, &:active:focus { @content; }
}

@mixin focus-outline {
  outline: $outline;
  outline-offset: $outline-offset;
}

@mixin apply-styles($styles) {
  @each $property, $value in $styles {
    @if $property == font-size-mobile {
      @include breakpoint(mobile-only) { font-size: $value; }
    } @else if $property != font-size-mobile {
      #{$property}: $value;
    }
  }
}
`;

  const tokenRoot = `
$abundance-pink-dark: $abundance-v2-pink-dark !default;
$abundance-pink-light: $abundance-v2-pink-light !default;
$abundance-green: #25ab2d !default;
$abundance-red: #c10c21 !default;
$abundance-orange: #e1873f !default;
$abundance-orange-dark: #c25600 !default;
$abundance-orange-extra-dark: #964300 !default;

:root {
  --abv2-bg: #{$pure-white};
  --abv2-white: #{$pure-white};
  --abv2-white-rgb: 255, 255, 255;
  --abv2-ink: #{$abundance-neutral-900};
  --abv2-ink-rgb: 54, 54, 53;
  --abv2-text: #{$abundance-neutral-800};
  --abv2-grey: #{$abundance-grey};
  --abv2-grey-light: #{$abundance-neutral-300};
  --abv2-grey-very-light: #{$abundance-neutral-200};
  --abv2-grey-ui: #{$abundance-neutral-400};
  --abv2-pink: #{$abundance-pink};
  --abv2-pink-rgb: 242, 127, 174;
  --abv2-pink-dark: #{$abundance-pink-dark};
  --abv2-pink-light: #{$abundance-pink-light};
  --abv2-teal: #{$abundance-cyan};
  --abv2-teal-rgb: 0, 164, 182;
  --abv2-teal-dark: #{$abundance-cyan-dark};
  --abv2-teal-light: #{$abundance-cyan-light};
  --abv2-teal-very-light: #{$abundance-cyan-surface};
  --abv2-yellow: #{$abundance-yellow};
  --abv2-yellow-rgb: 255, 183, 44;
  --abv2-yellow-dark: #{$abundance-yellow-dark};
  --abv2-yellow-light: #{$abundance-yellow-light};
  --abv2-green: #{$abundance-green};
  --abv2-blue: #{$abundance-blue};
  --abv2-indigo: #443668;
  --abv2-ink-a04: rgba(var(--abv2-ink-rgb), 0.04);
  --abv2-ink-a05: #{$abundance-ink-a05};
  --abv2-ink-a06: #{$abundance-ink-a06};
  --abv2-ink-a08: #{$abundance-ink-a08};
  --abv2-ink-a10: #{$abundance-ink-a10};
  --abv2-ink-a12: #{$abundance-ink-a12};
  --abv2-ink-a14: rgba(var(--abv2-ink-rgb), 0.14);
  --abv2-ink-a18: #{$abundance-ink-a18};
  --abv2-ink-a35: rgba(var(--abv2-ink-rgb), 0.35);
  --abv2-ink-a62: rgba(var(--abv2-ink-rgb), 0.62);
  --abv2-ink-a72: rgba(var(--abv2-ink-rgb), 0.72);
  --abv2-ink-a78: #{$abundance-ink-a78};
  --abv2-white-a06: rgba(var(--abv2-white-rgb), 0.06);
  --abv2-white-a08: #{$abundance-white-a08};
  --abv2-white-a12: rgba(var(--abv2-white-rgb), 0.12);
  --abv2-white-a14: #{$abundance-white-a14};
  --abv2-white-a16: #{$abundance-white-a16};
  --abv2-white-a18: #{$abundance-white-a18};
  --abv2-white-a20: #{$abundance-white-a20};
  --abv2-white-a22: #{$abundance-white-a22};
  --abv2-white-a28: #{$abundance-white-a28};
  --abv2-white-a62: #{$abundance-white-a62};
  --abv2-white-a72: #{$abundance-white-a72};
  --abv2-white-a84: rgba(var(--abv2-white-rgb), 0.84);
  --abv2-pink-a05: #{$abundance-pink-a05};
  --abv2-pink-a07: rgba(var(--abv2-pink-rgb), 0.07);
  --abv2-pink-a08: rgba(var(--abv2-pink-rgb), 0.08);
  --abv2-pink-a12: rgba(var(--abv2-pink-rgb), 0.12);
  --abv2-pink-a18: rgba(var(--abv2-pink-rgb), 0.18);
  --abv2-pink-a34: #{$abundance-pink-a34};
  --abv2-pink-a45: rgba(var(--abv2-pink-rgb), 0.45);
  --abv2-pink-a62: rgba(var(--abv2-pink-rgb), 0.62);
  --abv2-teal-a06: #{$abundance-teal-a06};
  --abv2-teal-a10: rgba(var(--abv2-teal-rgb), 0.10);
  --abv2-teal-a12: rgba(var(--abv2-teal-rgb), 0.12);
  --abv2-teal-a16: rgba(var(--abv2-teal-rgb), 0.16);
  --abv2-teal-a22: #{$abundance-teal-a22};
  --abv2-teal-a38: #{$abundance-teal-a38};
  --abv2-yellow-a14: rgba(var(--abv2-yellow-rgb), 0.14);
  --abv2-yellow-a20: rgba(var(--abv2-yellow-rgb), 0.20);
  --abv2-yellow-a24: #{$abundance-yellow-a24};
  --abv2-border-subtle: #{$abundance-border-subtle};
  --abv2-border-soft: #{$abundance-border-soft};
  --abv2-border-default: #{$abundance-border-default};
  --abv2-border-strong: rgba(var(--abv2-ink-rgb), 0.14);
  --abv2-shadow-soft: rgba(var(--abv2-ink-rgb), 0.04);
  --abv2-shadow-default: #{$abundance-shadow-default};
  --abv2-shadow-card: #{$abundance-shadow-card};
  --abv2-space-2: 2px;
  --abv2-space-4: 4px;
  --abv2-space-6: #{$abundance-space-6};
  --abv2-space-8: #{$spacer-3xs};
  --abv2-space-10: #{$abundance-space-10};
  --abv2-space-12: #{$abundance-space-12};
  --abv2-space-14: #{$abundance-space-14};
  --abv2-space-16: #{$spacer-2xs};
  --abv2-space-20: #{$abundance-space-20};
  --abv2-space-22: #{$abundance-space-22};
  --abv2-space-24: #{$spacer-xs};
  --abv2-space-28: #{$abundance-space-28};
  --abv2-space-32: #{$spacer-sm};
  --abv2-space-40: 40px;
  --abv2-space-48: #{$spacer-md};
  --abv2-space-56: 56px;
  --abv2-space-64: #{$spacer-lg};
  --abv2-space-72: 72px;
  --abv2-space-84: 84px;
  --abv2-space-96: #{$spacer-2xl};
  --abv2-serif: "New Kansas", Georgia, serif;
  --abv2-sans: "Sohne Buch", system-ui, sans-serif;
  --abv2-ui: "Sohne Kraftig", system-ui, sans-serif;
}
`;

  const emitted = `
.body--xs { @include si-body-xs; }
.body--sm { @include si-body-sm; }
.body--md { @include si-body-md; }
.body--lg { @include si-body-lg; }
.body--xl { @include si-body-xl; }

.si-heading-1 { @include si-heading-1; }
.si-heading-2 { @include si-heading-2; }
.si-heading-3 { @include si-heading-3; }
.si-heading-4 { @include si-heading-4; }
.si-heading-5 { @include si-heading-5; }
.si-heading-6 { @include si-heading-6; }

.label--xs { @include si-label-xs; }
.label--sm { @include si-label-sm; }
.label--md { @include si-label-md; }
.label--lg { @include si-label-lg; }

.si-card { @include card-base; }
.si-card--primary { @include card-primary; }
.si-card--secondary { @include card-secondary; }
.si-card--tertiary { @include card-tertiary; }
`;

  const scss = helper + chunks[0] + tokenRoot + chunks[1] + emitted.replace(/\.si-card[\s\S]*$/, "") + chunks[2] + chunks[3] + emitted.match(/\.si-card[\s\S]*$/)[0] + chunks.slice(4).join("\n");
  const scssPath = path.join(tmpDir, "package2-reference.scss");
  const cssPath = path.join(tmpDir, "package2-reference.css");
  write(scssPath, scss);
  childProcess.execFileSync(path.join(root, "node_modules/.bin/sass"), [scssPath, cssPath, "--no-source-map"], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  return cssPath;
}

function splitRules(input) {
  const rules = [];
  let i = 0;
  while (i < input.length) {
    while (i < input.length && /\s/.test(input[i])) i++;
    if (i >= input.length) break;
    const start = i;
    const brace = input.indexOf("{", i);
    if (brace === -1) break;
    const prelude = input.slice(start, brace).trim();
    let depth = 1;
    i = brace + 1;
    const bodyStart = i;
    while (i < input.length && depth > 0) {
      if (input[i] === "{") depth++;
      else if (input[i] === "}") depth--;
      i++;
    }
    rules.push({ prelude, body: input.slice(bodyStart, i - 1) });
  }
  return rules;
}

function walkCss(input, wrappers = [], out = []) {
  for (const rule of splitRules(input)) {
    if (rule.prelude.startsWith("@")) {
      walkCss(rule.body, wrappers.concat(rule.prelude), out);
    } else {
      out.push({ context: wrappers.join(" | "), selector: rule.prelude, body: rule.body });
    }
  }
  return out;
}

function normalizeValue(value) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ",")
    .replace(/0\.(\d+)/g, ".$1")
    .replace(/#ffffff\b/gi, "#fff")
    .trim()
    .toLowerCase();
}

function declarations(body) {
  const result = [];
  body = body.replace(/\/\*[\s\S]*?\*\//g, "");
  let current = "";
  let depth = 0;
  for (const ch of body) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === ";" && depth === 0) {
      const idx = current.indexOf(":");
      if (idx > 0) {
        const prop = current.slice(0, idx).trim().toLowerCase();
        const value = normalizeValue(current.slice(idx + 1));
        if (prop && value) result.push(`${prop}:${value}`);
      }
      current = "";
    } else {
      current += ch;
    }
  }
  const idx = current.indexOf(":");
  if (idx > 0) {
    const prop = current.slice(0, idx).trim().toLowerCase();
    const value = normalizeValue(current.slice(idx + 1));
    if (prop && value) result.push(`${prop}:${value}`);
  }
  return result;
}

function classesIn(text) {
  return [...new Set([...text.matchAll(/\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g)].map((m) => m[1]))];
}

function cssClassIndex(css) {
  const rules = walkCss(css);
  const index = new Map();
  const classSet = new Set();
  for (const rule of rules) {
    const decls = declarations(rule.body);
    const selectorClasses = classesIn(rule.selector);
    for (const cls of selectorClasses) {
      classSet.add(cls);
      if (!index.has(cls)) index.set(cls, new Set());
      const bucket = index.get(cls);
      for (const decl of decls) bucket.add(`${rule.context}||${decl}`);
    }
  }
  return { rules, index, classSet };
}

function htmlClasses() {
  const found = new Set();
  for (const rel of htmlFiles) {
    const html = read(path.join(packageDir, rel));
    for (const match of html.matchAll(/class\s*=\s*"([^"]+)"/g)) {
      for (const cls of match[1].split(/\s+/).filter(Boolean)) found.add(cls);
    }
  }
  return found;
}

function classFamily(cls) {
  if (/^(row|col|container|g-|gx-|gy-|d-|flex|justify|align|m-|p-|h-|w-|position|text-|bg-|sr-only|img-|offset|mx|my)/.test(cls)) return "layout/helper";
  if (/^(body--|si-heading|abundance-heading|abundance-eyebrow|abundance-body|abundance-action|abundance-stat|abundance-card-copy|brand-primary|brand-secondary|text-white|type-black)/.test(cls)) return "type/colour";
  if (/^(si-btn|abundance-btn|abundance-support-link|abundance-related-link|abundance-chip-link|abundance-link-card)/.test(cls)) return "buttons/links";
  if (/^(si-card|abundance-card|abundance-colour-card|abundance-boxout)/.test(cls)) return "cards/panels";
  if (/^(abundance-media|abundance-ed-figure|bg-mask|bg-blob)/.test(cls)) return "media/masks";
  if (/^(abundance-ed|abundance-warning|abundance-inline|abundance-accordion|si-accordion|accordion|collapse|collapsed)/.test(cls)) return "editorial/accordion";
  if (/^(si-form|si-fieldset|si-input|si-choice|abundance-field)/.test(cls)) return "forms";
  if (/^(si-table|si-horizontal-rule|abundance-bar-chart|abundance-council-uof)/.test(cls)) return "data/tables";
  if (/^(abundance-route|abundance-buy|abundance-step)/.test(cls)) return "buy-flow";
  return "other";
}

function jaccard(a, b) {
  if (!a || !b || a.size === 0 || b.size === 0) return 0;
  let intersect = 0;
  for (const item of a) if (b.has(item)) intersect++;
  return intersect / (a.size + b.size - intersect);
}

function bestMatches(cls, refIndex, candidateIndex, candidateClasses) {
  const refDecls = refIndex.get(cls);
  if (!refDecls || refDecls.size === 0) return [];
  const family = classFamily(cls);
  const candidates = [...candidateClasses].filter((candidate) => classFamily(candidate) === family || candidate === cls);
  const scored = [];
  for (const candidate of candidates) {
    const score = jaccard(refDecls, candidateIndex.get(candidate));
    if (score > 0) scored.push({ className: candidate, score });
  }
  scored.sort((a, b) => b.score - a.score || a.className.localeCompare(b.className));
  return scored.slice(0, 5);
}

const manualClassMap = new Map(Object.entries({
  "abundance-bar-chart__fill": "abundance-bar-chart__bar-fill",
  "abundance-bar-chart__track": "abundance-bar-chart__bar",
  "abundance-card-soft": "abundance-card--soft",
  "abundance-card-soft-bordered": "abundance-card--soft-bordered",
  "abundance-colour-card": "abundance-card--color-card",
  "abundance-colour-card-green": "abundance-card--color-green",
  "abundance-colour-card-neutral": "abundance-card--color-neutral",
  "abundance-colour-card-pink": "abundance-card--color-pink",
  "abundance-colour-card-pink-light": "abundance-card--color-pink-light",
  "abundance-colour-card-teal": "abundance-card--color-teal",
  "abundance-colour-card-teal-light": "abundance-card--color-teal-light",
  "abundance-colour-card-yellow": "abundance-card--color-yellow",
  "abundance-ed-note": "abundance-note",
  "abundance-ed-quote": "abundance-quote",
  "abundance-inline-disclaimer": "abundance-disclaimer",
  "abundance-route-choice": "abundance-radio-card",
  "abundance-route-choice--pink": "abundance-radio-card--primary",
  "abundance-route-choice--teal": "abundance-radio-card--secondary",
  "abundance-route-choice__input": "abundance-radio-card__input",
  "abundance-route-choice__tick": "abundance-radio-card__tick",
  "abundance-route-choice__card": "abundance-radio-card__label",
  "abundance-route-choice__rule": "abundance-radio-card__indicator",
  "bg-blob--abundance-dot": "abundance-blob",
  "bg-mask": "abundance-mask",
  "bg-mask--abundance-top": "abundance-mask--top",
  "bg-mask--abundance-bottom": "abundance-mask--bottom",
  "bg-mask--abundance-ed-rise": "abundance-dividers--rise-left",
  "bg-mask--abundance-ed-right": "abundance-dividers--rise-right",
  "bg-mask--abundance-ed-fall": "abundance-dividers--fall-left",
  "abundance-ed-band": "abundance-dividers",
  "abundance-ed-band--tight": "abundance-dividers",
  "abundance-ed-band--loose": "abundance-dividers",
}));

function customProperties(css) {
  const props = new Map();
  for (const match of css.matchAll(/(--[a-zA-Z0-9_-]+)\s*:\s*([^;{}]+)/g)) {
    props.set(match[1], normalizeValue(match[2]));
  }
  return props;
}

function cssHasClass(candidate, cls) {
  return candidate.classSet.has(cls);
}

function htmlTokenFunctions() {
  const tokenMap = new Map();
  for (const rel of htmlFiles) {
    const html = read(path.join(packageDir, rel));
    for (const match of html.matchAll(/style\s*=\s*"([^"]+)"/g)) {
      const style = match[1].replace(/\s+/g, " ").trim();
      if (!style.includes("--abv2-") && !style.includes("--bs-red")) continue;

      const tokens = [...new Set([...style.matchAll(/--(?:abv2|bs)-[a-zA-Z0-9_-]+/g)].map((m) => m[0]))];
      const key = style.includes("--abv2-bar-value")
        ? "bar-chart row value/colour"
        : style.includes("border-top") || style.includes("border-bottom")
          ? "separator border"
          : style.includes("background:")
            ? "pale surface background"
            : style.includes("color:")
              ? `text colour ${tokens.join(", ")}`
              : tokens.join(", ");

      if (!tokenMap.has(key)) tokenMap.set(key, { function: key, occurrences: 0, tokens: new Set(), examples: new Set() });
      const entry = tokenMap.get(key);
      entry.occurrences += 1;
      tokens.forEach((token) => entry.tokens.add(token));
      entry.examples.add(`${rel}: ${style}`);
    }
  }

  return [...tokenMap.values()].map((entry) => ({
    function: entry.function,
    occurrences: entry.occurrences,
    tokens: [...entry.tokens].sort(),
    examples: [...entry.examples].slice(0, 5),
  })).sort((a, b) => a.function.localeCompare(b.function));
}

function tokenFunctionCoverage(candidate) {
  const has = (cls) => cssHasClass(candidate, cls);
  return [
    {
      function: "red/error text",
      htmlTokens: ["--bs-red"],
      status: has("text-danger") ? "covered" : "missing",
      helpers: ["text-danger"].filter(has),
      notes: "HTML warning placeholders can be expressed with Bootstrap text-danger.",
    },
    {
      function: "separator border",
      htmlTokens: ["--abv2-border-subtle", "--abv2-border-soft"],
      status: has("si-horizontal-rule") || has("border-top") ? "covered" : "missing",
      helpers: ["si-horizontal-rule", "border-top", "border-bottom"].filter(has),
      notes: "si-horizontal-rule is the closest Abundance helper; Bootstrap borders are also available for div-based separators.",
    },
    {
      function: "pale neutral surface",
      htmlTokens: ["--abv2-grey-very-light"],
      status: has("bg-colour--neutral--100") || has("body--offwhite") ? "covered" : "missing",
      helpers: ["bg-colour--neutral--100", "body--offwhite", "bg-light"].filter(has),
      notes: "Covers the inline pale panel background function.",
    },
    {
      function: "white text",
      htmlTokens: ["--abv2-white"],
      status: has("text-white") || has("text-color--invert-primary") ? "covered" : "missing",
      helpers: ["text-white", "text-color--invert-primary"].filter(has),
      notes: "Available for dark/coloured surfaces.",
    },
    {
      function: "yellow action text",
      htmlTokens: ["--abv2-yellow-dark"],
      status: has("text-colour--yellow") ? "covered" : "needs-audit",
      helpers: ["text-colour--yellow", "text-warning"].filter(has),
      notes: "Bootstrap text-warning exists if accepted as a compromise, but no exact Abundance yellow text helper was found.",
    },
    {
      function: "teal action text",
      htmlTokens: ["--abv2-teal-dark"],
      status: has("text-colour--teal") || has("text-colour--secondary") ? "covered" : "needs-audit",
      helpers: ["text-colour--teal", "text-colour--secondary", "text-info"].filter(has),
      notes: "Bootstrap text-info exists if accepted as a compromise, but no exact Abundance teal text helper was found.",
    },
    {
      function: "bar-chart value and per-row colours",
      htmlTokens: ["--abv2-bar-value", "--abv2-bar-colour", "--abv2-bar-text", "--abv2-pink-light", "--abv2-teal-light", "--abv2-yellow-light", "--abv2-indigo", "--abv2-green"],
      status: "needs-audit",
      helpers: ["abundance-bar-chart__bar", "abundance-bar-chart__bar-fill", "abundance-bar-chart__value"].filter(has),
      notes: "Structural bar-chart classes are present under new names, but candidate CSS did not appear to consume value/colour variables or provide percentage/colour modifiers.",
    },
  ];
}

function typeAndCardAudit(candidate) {
  const expectedType = [
    "body--xs", "body--sm", "body--md", "body--lg", "body--xl",
    "si-heading-1", "si-heading-2", "si-heading-3", "si-heading-4", "si-heading-5", "si-heading-6",
    "label--xs", "label--sm", "label--md", "label--lg",
    "abundance-eyebrow", "abundance-body-compact", "abundance-action-text", "abundance-stat", "abundance-heading-display", "abundance-card-copy",
  ];
  const expectedCards = [
    "si-card", "si-card--primary", "si-card--secondary", "si-card--tertiary",
    "si-card--0", "si-card--2xs", "si-card--xs", "si-card--sm", "si-card--md", "si-card--lg",
    "si-card--no-border-radius", "si-card--full-height",
  ];
  const cardRenames = [
    ["abundance-card-soft", "abundance-card--soft"],
    ["abundance-card-soft-bordered", "abundance-card--soft-bordered"],
    ["abundance-colour-card", "abundance-card--color-card"],
    ["abundance-colour-card-neutral", "abundance-card--color-neutral"],
    ["abundance-colour-card-pink", "abundance-card--color-pink"],
    ["abundance-colour-card-teal", "abundance-card--color-teal"],
    ["abundance-colour-card-yellow", "abundance-card--color-yellow"],
    ["abundance-colour-card-green", "abundance-card--color-green"],
    ["abundance-colour-card-pink-light", "abundance-card--color-pink-light"],
    ["abundance-colour-card-teal-light", "abundance-card--color-teal-light"],
  ];

  return {
    type: expectedType.map((cls) => ({ className: cls, status: cssHasClass(candidate, cls) ? "present" : "missing" })),
    cards: expectedCards.map((cls) => ({ className: cls, status: cssHasClass(candidate, cls) ? "present" : "missing" })),
    cardRenames: cardRenames.map(([oldClass, newClass]) => ({
      oldClass,
      newClass,
      oldPresent: cssHasClass(candidate, oldClass),
      newPresent: cssHasClass(candidate, newClass),
      status: cssHasClass(candidate, oldClass) ? "old-present" : cssHasClass(candidate, newClass) ? "renamed" : "missing",
    })),
    notes: [
      "abundance-card-copy is used in package HTML and was not found in the candidate CSS.",
      "Type classes are generally present, but the machine check does not assert exact letter-spacing parity.",
      "si-card variants are present, but the base shell should be visually audited because legacy rules also target si-card.",
    ],
  };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function selectorAppliesToClassElement(selector, cls) {
  selector = selector.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const classNeedle = `.${cls}`;
  const idx = selector.indexOf(classNeedle);
  if (idx === -1) return false;
  const before = idx === 0 ? "" : selector[idx - 1];
  const after = selector[idx + classNeedle.length] || "";
  const prefix = selector.slice(0, idx).trim();
  if (prefix !== "") return false;
  if (before && !/[\s>+~([]/.test(before)) return false;
  if (after && /[A-Za-z0-9_-]/.test(after)) return false;

  const tail = selector.slice(idx + classNeedle.length).trim();
  return tail === "" || /^[.:#\[]/.test(tail);
}

function normalizeContext(context) {
  return context
    .replace(/\s+/g, " ")
    .replace(/@media\s+/g, "@media")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*\(\s*/g, "(")
    .replace(/\s*\)\s*/g, ")")
    .trim()
    .toLowerCase();
}

function declarationRecord(css, cls) {
  const record = new Map();
  const rules = walkCss(css);

  for (const rule of rules) {
    const selectors = rule.selector.split(",").map((selector) => selector.trim());
    if (!selectors.some((selector) => selectorAppliesToClassElement(selector, cls))) continue;

    const context = normalizeContext(rule.context || "base") || "base";
    for (const decl of declarations(rule.body)) {
      const idx = decl.indexOf(":");
      const prop = decl.slice(0, idx);
      const value = decl.slice(idx + 1);
      record.set(`${context}||${prop}`, { context, property: prop, value });
    }
  }

  return record;
}

function primitiveParity(referenceCss, candidateCss) {
  const comparisons = [
    ...[
      "body--xs", "body--sm", "body--md", "body--lg", "body--xl",
      "si-heading-1", "si-heading-2", "si-heading-3", "si-heading-4", "si-heading-5", "si-heading-6",
      "label--xs", "label--sm", "label--md", "label--lg",
      "abundance-eyebrow", "abundance-body-compact", "abundance-action-text", "abundance-stat", "abundance-heading-display", "abundance-card-copy",
      "si-card", "si-card--primary", "si-card--secondary", "si-card--tertiary",
      "si-card--0", "si-card--2xs", "si-card--xs", "si-card--sm", "si-card--md", "si-card--lg",
      "si-card--no-border-radius", "si-card--full-height",
    ].map((cls) => ({ referenceClass: cls, candidateClass: cls, group: cls.startsWith("si-card") || cls.startsWith("abundance-card") ? "cards" : "type" })),
    ...[
      ["abundance-card-soft", "abundance-card--soft"],
      ["abundance-card-soft-bordered", "abundance-card--soft-bordered"],
      ["abundance-colour-card", "abundance-card--color-card"],
      ["abundance-colour-card-neutral", "abundance-card--color-neutral"],
      ["abundance-colour-card-pink", "abundance-card--color-pink"],
      ["abundance-colour-card-teal", "abundance-card--color-teal"],
      ["abundance-colour-card-yellow", "abundance-card--color-yellow"],
      ["abundance-colour-card-green", "abundance-card--color-green"],
      ["abundance-colour-card-pink-light", "abundance-card--color-pink-light"],
      ["abundance-colour-card-teal-light", "abundance-card--color-teal-light"],
    ].map(([referenceClass, candidateClass]) => ({ referenceClass, candidateClass, group: "cards" })),
  ];

  return comparisons.map((comparison) => {
    const reference = declarationRecord(referenceCss, comparison.referenceClass);
    const candidate = declarationRecord(candidateCss, comparison.candidateClass);
    const missing = [];
    const mismatched = [];
    const matching = [];
    const extra = [];

    for (const [key, expected] of reference) {
      const actual = candidate.get(key);
      if (!actual) {
        missing.push({ context: expected.context, property: expected.property, expected: expected.value, actual: "" });
      } else if (actual.value !== expected.value) {
        mismatched.push({ context: expected.context, property: expected.property, expected: expected.value, actual: actual.value });
      } else {
        matching.push({ context: expected.context, property: expected.property, value: expected.value });
      }
    }

    for (const [key, actual] of candidate) {
      if (!reference.has(key)) {
        extra.push({ context: actual.context, property: actual.property, value: actual.value });
      }
    }

    const status = reference.size === 0
      ? "reference-missing"
      : candidate.size === 0
        ? "candidate-missing"
        : missing.length === 0 && mismatched.length === 0
          ? extra.length === 0 ? "exact" : "matches-with-extra"
          : "differs";

    return {
      ...comparison,
      status,
      expectedDeclarationCount: reference.size,
      candidateDeclarationCount: candidate.size,
      matchingDeclarationCount: matching.length,
      missing,
      mismatched,
      extra,
    };
  });
}

function primitiveParityCsv(rows) {
  const lines = [["group", "reference_class", "candidate_class", "status", "issue", "context", "property", "expected", "actual"].join(",")];
  for (const row of rows) {
    const issues = [
      ...row.missing.map((issue) => ({ ...issue, issue: "missing" })),
      ...row.mismatched.map((issue) => ({ ...issue, issue: "mismatch" })),
      ...row.extra.map((issue) => ({ ...issue, issue: "extra", expected: "", actual: issue.value })),
    ];
    if (issues.length === 0) {
      issues.push({ issue: "none", context: "", property: "", expected: "", actual: "" });
    }
    for (const issue of issues) {
      lines.push([
        row.group,
        row.referenceClass,
        row.candidateClass,
        row.status,
        issue.issue,
        issue.context || "",
        issue.property || "",
        issue.expected || "",
        issue.actual || "",
      ].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","));
    }
  }
  return lines.join("\n");
}

function primitiveParityMarkdown(rows) {
  const failing = rows.filter((row) => row.status !== "exact");
  const exact = rows.filter((row) => row.status === "exact");
  return `# Primitive Value Parity

This compares compiled package 2 primitive/component declarations against \`${path.relative(root, candidateCssPath)}\`.

Renamed card classes are compared as old spec selector -> new UAT selector.

## Summary

- Primitive selectors checked: ${rows.length}
- Exact declaration matches: ${exact.length}
- Non-exact / needs audit: ${failing.length}

## Non-Exact Selectors

${failing.length ? failing.map((row) => {
    const issueLines = [
      ...row.missing.slice(0, 12).map((issue) => `  - missing ${issue.context} \`${issue.property}: ${issue.expected}\``),
      ...row.mismatched.slice(0, 12).map((issue) => `  - mismatch ${issue.context} \`${issue.property}\`: expected \`${issue.expected}\`, actual \`${issue.actual}\``),
      ...row.extra.slice(0, 8).map((issue) => `  - extra ${issue.context} \`${issue.property}: ${issue.value}\``),
    ];
    const remaining = row.missing.length + row.mismatched.length + row.extra.length - issueLines.length;
    return `- **${row.status}**: \`.${row.referenceClass}\`${row.referenceClass !== row.candidateClass ? ` -> \`.${row.candidateClass}\`` : ""}
${issueLines.join("\n")}${remaining > 0 ? `\n  - ...${remaining} more issue(s) in CSV/JSON` : ""}`;
  }).join("\n") : "None."}

## Exact Selectors

${exact.length ? exact.map((row) => `- \`.${row.referenceClass}\`${row.referenceClass !== row.candidateClass ? ` -> \`.${row.candidateClass}\`` : ""}`).join("\n") : "None."}
`;
}

function main() {
  const referenceCssPath = buildReferenceCss();
  const referenceCss = read(referenceCssPath);
  const candidateCss = read(candidateCssPath);
  const reference = cssClassIndex(referenceCss);
  const candidate = cssClassIndex(candidateCss);
  const usedHtmlClasses = htmlClasses();

  const relevantReferenceClasses = [...new Set([
    ...usedHtmlClasses,
    ...[...reference.classSet].filter((cls) => /^(abundance|si-btn|si-card|si-heading|body--|label--|bg-mask|bg-colour|text-colour|brand-primary|brand-secondary)/.test(cls)),
  ])].sort();

  const mapping = [];
  const unmatched = [];
  const fallbackCandidates = [];

  for (const cls of relevantReferenceClasses) {
    const exact = candidate.classSet.has(cls);
    const manual = manualClassMap.get(cls);
    const manualExists = manual ? candidate.classSet.has(manual) : false;
    const matches = exact
      ? [{ className: cls, score: 1, source: "exact" }]
      : manualExists
        ? [{ className: manual, score: 0.9, source: "manual" }]
        : bestMatches(cls, reference.index, candidate.index, candidate.classSet);
    const row = {
      oldClass: cls,
      family: classFamily(cls),
      exact,
      suggestedNewClass: matches[0]?.className || "",
      confidence: matches[0] ? Number(matches[0].score.toFixed(3)) : 0,
      source: matches[0]?.source || (exact ? "exact" : "similarity"),
      alternatives: matches.slice(1).map((m) => `${m.className} (${m.score.toFixed(3)})`),
      usedInHtml: usedHtmlClasses.has(cls),
    };
    mapping.push(row);
    if (!exact && row.confidence < 0.35) unmatched.push(row);
    else if (!exact) fallbackCandidates.push(row);
  }

  const refProps = customProperties(referenceCss);
  const candProps = customProperties(candidateCss);
  const abv2Props = [...refProps.keys()].filter((p) => p.startsWith("--abv2-")).sort();
  const missingCustomProperties = abv2Props.filter((p) => !candProps.has(p));
  const changedCustomProperties = abv2Props
    .filter((p) => candProps.has(p) && candProps.get(p) !== refProps.get(p))
    .map((p) => ({ property: p, reference: refProps.get(p), candidate: candProps.get(p) }));
  const htmlTokenFunctionUsage = htmlTokenFunctions();
  const htmlTokenFunctionCoverage = tokenFunctionCoverage(candidate);
  const uncoveredTokenFunctions = htmlTokenFunctionCoverage.filter((entry) => entry.status !== "covered");
  const primitiveAudit = typeAndCardAudit(candidate);
  const primitiveParityRows = primitiveParity(referenceCss, candidateCss);

  const csv = [
    ["old_class", "family", "used_in_html", "exact_match", "suggested_new_class", "confidence", "source", "alternatives"].join(","),
    ...mapping.map((r) => [
      r.oldClass,
      r.family,
      r.usedInHtml ? "yes" : "no",
      r.exact ? "yes" : "no",
      r.suggestedNewClass,
      r.confidence,
      r.source,
      r.alternatives.join(" | "),
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  const md = `# UAT Revised v1 CSS Comparison

Reference package: \`${path.relative(root, packageDir)}\`

Candidate CSS: \`${path.relative(root, candidateCssPath)}\`

Generated reference CSS: \`${referenceCssPath}\`

## Summary

- HTML classes in package 2 examples: ${usedHtmlClasses.size}
- Reference classes audited: ${relevantReferenceClasses.length}
- Candidate classes found: ${candidate.classSet.size}
- Exact class-name matches: ${mapping.filter((r) => r.exact).length}
- Non-exact fallback candidates: ${fallbackCandidates.length}
- Unmatched / low-confidence classes: ${unmatched.length}
- Raw missing reference \`--abv2-*\` custom properties: ${missingCustomProperties.length} (informational only; exact token names are not required)
- HTML token functions needing audit: ${uncoveredTokenFunctions.length}

## Important Caveat

This is a machine first pass. Since class names are allowed to differ, non-exact matches are scored by declaration similarity within broad functional families. Treat high-confidence matches as likely fallbacks and low-confidence matches as manual audit items.

## HTML Token Function Coverage

This replaces the earlier raw custom-property failure lens. Exact \`--abv2-*\` property names are not required; what matters is whether package HTML styling can be rebuilt using available helper/component classes.

${htmlTokenFunctionCoverage.map((entry) => `- **${entry.status}**: ${entry.function}
  - HTML tokens: ${entry.htmlTokens.map((token) => `\`${token}\``).join(", ")}
  - Candidate helpers: ${entry.helpers.length ? entry.helpers.map((helper) => `\`.${helper}\``).join(", ") : "none found"}
  - Notes: ${entry.notes}`).join("\n")}

## HTML Token Usage Inventory

${htmlTokenFunctionUsage.map((entry) => `- ${entry.function}: ${entry.occurrences} occurrence(s); tokens ${entry.tokens.map((token) => `\`${token}\``).join(", ")}`).join("\n")}

## Type And Card Primitive Audit

### Type Classes

${primitiveAudit.type.map((entry) => `- **${entry.status}**: \`.${entry.className}\``).join("\n")}

### Core Card Classes

${primitiveAudit.cards.map((entry) => `- **${entry.status}**: \`.${entry.className}\``).join("\n")}

### Card Renames

${primitiveAudit.cardRenames.map((entry) => `- **${entry.status}**: \`.${entry.oldClass}\` -> \`.${entry.newClass}\``).join("\n")}

### Primitive Notes

${primitiveAudit.notes.map((note) => `- ${note}`).join("\n")}

## Unmatched / Low-Confidence Classes

${unmatched.length ? unmatched.map((r) => `- \`.${r.oldClass}\` (${r.family}${r.usedInHtml ? ", used in HTML" : ""})`).join("\n") : "None."}

## Likely Old -> New Fallbacks

${fallbackCandidates.length ? fallbackCandidates.slice(0, 120).map((r) => `- \`.${r.oldClass}\` -> \`.${r.suggestedNewClass}\` (${r.confidence})${r.usedInHtml ? " [used in HTML]" : ""}`).join("\n") : "None."}

## Raw Missing Reference Custom Properties

Informational only. These are no longer treated as direct failures because the migration target may expose equivalent helper classes instead of preserving the \`--abv2-*\` property names.

${missingCustomProperties.length ? missingCustomProperties.map((p) => `- \`${p}\``).join("\n") : "None."}

## Changed Custom Properties

${changedCustomProperties.length ? changedCustomProperties.map((p) => `- \`${p.property}\`: reference \`${p.reference}\`, candidate \`${p.candidate}\``).join("\n") : "None."}

## Outputs

- Full class mapping CSV: \`uat-revised-v1-class-mapping.csv\`
- Machine-readable JSON: \`uat-revised-v1-comparison.json\`
`;

  fs.mkdirSync(reportDir, { recursive: true });
  write(path.join(reportDir, "uat-revised-v1-class-mapping.csv"), csv);
  write(path.join(reportDir, "uat-revised-v1-comparison.json"), JSON.stringify({
    summary: {
      htmlClassCount: usedHtmlClasses.size,
      auditedReferenceClassCount: relevantReferenceClasses.length,
      candidateClassCount: candidate.classSet.size,
      exactMatchCount: mapping.filter((r) => r.exact).length,
      fallbackCandidateCount: fallbackCandidates.length,
      unmatchedCount: unmatched.length,
      missingCustomPropertyCount: missingCustomProperties.length,
      changedCustomPropertyCount: changedCustomProperties.length,
      htmlTokenFunctionNeedsAuditCount: uncoveredTokenFunctions.length,
    },
    htmlTokenFunctionUsage,
    htmlTokenFunctionCoverage,
    primitiveAudit,
    primitiveParity: primitiveParityRows,
    unmatched,
    fallbackCandidates,
    missingCustomProperties,
    changedCustomProperties,
    mapping,
  }, null, 2));
  write(path.join(reportDir, "uat-revised-v1-comparison.md"), md);
  write(path.join(reportDir, "uat-revised-v1-primitive-parity.csv"), primitiveParityCsv(primitiveParityRows));
  write(path.join(reportDir, "uat-revised-v1-primitive-parity.md"), primitiveParityMarkdown(primitiveParityRows));
  write(path.join(reportDir, "uat-revised-v1-primitive-parity.json"), JSON.stringify(primitiveParityRows, null, 2));

  console.log(JSON.stringify({
    report: path.join(reportDir, "uat-revised-v1-comparison.md"),
    csv: path.join(reportDir, "uat-revised-v1-class-mapping.csv"),
    json: path.join(reportDir, "uat-revised-v1-comparison.json"),
    primitiveParityReport: path.join(reportDir, "uat-revised-v1-primitive-parity.md"),
    unmatchedCount: unmatched.length,
    fallbackCandidateCount: fallbackCandidates.length,
    missingCustomPropertyCount: missingCustomProperties.length,
    changedCustomPropertyCount: changedCustomProperties.length,
    primitiveParityNonExactCount: primitiveParityRows.filter((row) => row.status !== "exact").length,
  }, null, 2));
}

main();
