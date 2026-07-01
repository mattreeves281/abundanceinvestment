const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const sourcePath = path.join(root, "designv2/incoming/1 - hompeage base responsive.html");
const buildPath = path.join(root, "designv2/build/main.css");
const auditPath = path.join(root, "designv2/reports/homepage-base-responsive-tablet-logic-diff.md");

const WIDTH = 800;

function extractStyle(html) {
  const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (!match) throw new Error("No <style> block found in source HTML");
  return match[1];
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function splitTopLevel(input, delimiter) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let quote = null;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const prev = input[i - 1];
    if (quote) {
      if (ch === quote && prev !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth = Math.max(0, depth - 1);
    else if (ch === delimiter && depth === 0) {
      parts.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = input.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

function findMatchingBrace(css, openIndex) {
  let depth = 0;
  let quote = null;
  for (let i = openIndex; i < css.length; i++) {
    const ch = css[i];
    const prev = css[i - 1];
    if (quote) {
      if (ch === quote && prev !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function parseDecls(block) {
  const decls = [];
  for (const part of splitTopLevel(block, ";")) {
    const colon = part.indexOf(":");
    if (colon <= 0) continue;
    const property = part.slice(0, colon).trim();
    let value = part.slice(colon + 1).trim();
    if (!property || !value || property.includes("{") || property.startsWith("@")) continue;
    const important = /!important\s*$/i.test(value);
    value = value.replace(/\s*!important\s*$/i, "").trim();
    decls.push({ property, value, important });
  }
  return decls;
}

function expandBoxValues(value) {
  const parts = splitTopLevel(value, " ");
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0], parts[1], parts[2], parts[3]];
}

function expandDecl(decl) {
  if (decl.property !== "margin" && decl.property !== "padding") return [decl];
  const [top, right, bottom, left] = expandBoxValues(decl.value);
  return [
    decl,
    { ...decl, property: `${decl.property}-top`, value: top },
    { ...decl, property: `${decl.property}-right`, value: right },
    { ...decl, property: `${decl.property}-bottom`, value: bottom },
    { ...decl, property: `${decl.property}-left`, value: left },
  ];
}

function parseCss(css, inheritedMedia = null, rules = [], orderRef = { value: 0 }) {
  css = stripComments(css);
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    const prelude = css.slice(i, open).trim();
    const close = findMatchingBrace(css, open);
    if (close === -1) break;
    const block = css.slice(open + 1, close);
    if (prelude.startsWith("@media")) {
      const media = inheritedMedia ? `${inheritedMedia} and ${prelude}` : prelude;
      parseCss(block, media, rules, orderRef);
    } else if (prelude.startsWith("@")) {
      // Ignore @font-face, @keyframes, etc. for this selector/property diff.
    } else {
      const selectors = splitTopLevel(prelude, ",");
      const decls = parseDecls(block);
      for (const selector of selectors) {
        if (!selector) continue;
        rules.push({ selector, decls, media: inheritedMedia, order: orderRef.value++ });
      }
    }
    i = close + 1;
  }
  return rules;
}

function mediaApplies(media, width) {
  if (!media) return true;
  const maxes = [...media.matchAll(/max-width\s*:\s*([0-9.]+)px/g)].map((m) => Number(m[1]));
  const mins = [...media.matchAll(/min-width\s*:\s*([0-9.]+)px/g)].map((m) => Number(m[1]));
  return maxes.every((v) => width <= v) && mins.every((v) => width >= v);
}

function specificity(selector) {
  const cleaned = selector
    .replace(/:where\([^)]*\)/g, "")
    .replace(/::?[\w-]+(?:\([^)]*\))?/g, "");
  const ids = (cleaned.match(/#[\w-]+/g) || []).length;
  const classes = (cleaned.match(/\.[\w-]+|\[[^\]]+\]/g) || []).length;
  const elements = (cleaned.replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|[>+~*]/g, " ").match(/\b[a-zA-Z][\w-]*\b/g) || []).length;
  return [ids, classes, elements];
}

function compareSpec(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

function buildWinningMap(rules, width) {
  const wins = new Map();
  for (const rule of rules) {
    if (!mediaApplies(rule.media, width)) continue;
    const spec = specificity(rule.selector);
    for (const rawDecl of rule.decls) {
      for (const decl of expandDecl(rawDecl)) {
      const key = `${rule.selector}||${decl.property}`;
      const candidate = { ...decl, selector: rule.selector, media: rule.media, order: rule.order, spec };
      const current = wins.get(key);
      if (!current) {
        wins.set(key, candidate);
        continue;
      }
      if (current.important !== candidate.important) {
        if (candidate.important) wins.set(key, candidate);
        continue;
      }
      const specCmp = compareSpec(candidate.spec, current.spec);
      if (specCmp > 0 || (specCmp === 0 && candidate.order >= current.order)) {
        wins.set(key, candidate);
      }
      }
    }
  }
  return wins;
}

function rootVars(rules, width) {
  const vars = {};
  for (const rule of rules) {
    if (rule.selector !== ":root" || !mediaApplies(rule.media, width)) continue;
    for (const decl of rule.decls) {
      if (decl.property.startsWith("--")) vars[decl.property] = decl.value;
    }
  }
  return vars;
}

function normalizeValue(value, vars) {
  let out = value.replace(/\s+/g, " ").trim();
  for (let pass = 0; pass < 4; pass++) {
    out = out.replace(/var\((--[\w-]+)\)/g, (_, name) => vars[name] || `var(${name})`);
  }
  out = out
    .replace(/calc\(([^()]+)\)/g, "$1")
    .replace(/\b0\.(\d+)/g, ".$1")
    .replace(/\b(\d+)\.0(px|rem|vw|%)\b/g, "$1$2")
    .replace(/,\s+/g, ", ")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")");
  return out;
}

function key(selector, property) {
  return `${selector}||${property}`;
}

const sourceCss = extractStyle(fs.readFileSync(sourcePath, "utf8"));
const buildCss = fs.readFileSync(buildPath, "utf8");
const tabletAuditCss = fs.readFileSync(path.join(root, "designv2/reports/homepage-base-responsive-tablet-rules-audit.scss"), "utf8");

const sourceRules = parseCss(sourceCss);
const buildRules = parseCss(buildCss);
const auditRules = parseCss(tabletAuditCss);
const sourceWins = buildWinningMap(sourceRules, WIDTH);
const buildWins = buildWinningMap(buildRules, WIDTH);
const sourceVars = rootVars(sourceRules, WIDTH);
const buildVars = rootVars(buildRules, WIDTH);

const targetKeys = new Set();
for (const rule of auditRules) {
  for (const decl of rule.decls) targetKeys.add(key(rule.selector, decl.property));
}

const diffs = [];
const missing = [];
const matches = [];

for (const k of [...targetKeys].sort()) {
  const source = sourceWins.get(k);
  const build = buildWins.get(k);
  if (!source) continue;
  if (!build) {
    missing.push({ key: k, source });
    continue;
  }
  const sourceNorm = normalizeValue(source.value, sourceVars);
  const buildNorm = normalizeValue(build.value, buildVars);
  if (sourceNorm === buildNorm && source.important === build.important) {
    matches.push({ key: k, source, build, value: sourceNorm });
  } else {
    const [selector, property] = k.split("||");
    diffs.push({
      selector,
      property,
      source,
      build,
      sourceNorm,
      buildNorm,
    });
  }
}

function sourceLabel(item) {
  if (!item.media) return "base";
  return item.media.replace(/^@media\s*/, "");
}

const bySelector = new Map();
for (const diff of diffs) {
  if (!bySelector.has(diff.selector)) bySelector.set(diff.selector, []);
  bySelector.get(diff.selector).push(diff);
}

const lines = [];
lines.push("# Homepage Base Responsive Tablet Logic Diff");
lines.push("");
lines.push(`Viewport sampled: ${WIDTH}px`);
lines.push("");
lines.push("Target source: `designv2/incoming/1 - hompeage base responsive.html`");
lines.push("");
lines.push("Rebuilt CSS: `designv2/build/main.css`");
lines.push("");
lines.push("Scope: selector/property pairs declared in the extracted source tablet audit block. Values are compared after resolving simple `:root` custom properties such as spacing tokens.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- Target tablet declarations checked: ${targetKeys.size}`);
lines.push(`- Matching final declarations: ${matches.length}`);
lines.push(`- Different final declarations: ${diffs.length}`);
lines.push(`- Missing from rebuilt final CSS: ${missing.length}`);
lines.push("");

lines.push("## Differences");
lines.push("");
if (!diffs.length) {
  lines.push("No differences found for the audited tablet declarations.");
} else {
  for (const [selector, selectorDiffs] of bySelector) {
    lines.push(`### \`${selector}\``);
    lines.push("");
    lines.push("| Property | Source winning value | Build winning value | Build winner media |");
    lines.push("| --- | --- | --- | --- |");
    for (const diff of selectorDiffs) {
      const sourceValue = `${diff.sourceNorm}${diff.source.important ? " !important" : ""}`;
      const buildValue = `${diff.buildNorm}${diff.build.important ? " !important" : ""}`;
      lines.push(`| \`${diff.property}\` | \`${sourceValue}\` | \`${buildValue}\` | \`${sourceLabel(diff.build)}\` |`);
    }
    lines.push("");
  }
}

if (missing.length) {
  lines.push("## Missing");
  lines.push("");
  for (const item of missing) {
    const [selector, property] = item.key.split("||");
    lines.push(`- \`${selector}\` / \`${property}\`: source winning value \`${normalizeValue(item.source.value, sourceVars)}\``);
  }
  lines.push("");
}

lines.push("## Likely Cascade Causes");
lines.push("");
const causeSelectors = [
  ".abv2-hero__grid",
  ".abv2-pink__grid",
  ".abv2-teal__grid",
  ".abv2-features",
  ".abv2-features__inner::after",
  ".abv2-features__grid",
  ".abv2-investments",
  ".abv2-investments__inner",
  ".abv2-investments__grid",
  ".abv2-investments__tile img",
];
for (const selector of causeSelectors) {
  const related = diffs.filter((d) => d.selector === selector);
  if (!related.length) continue;
  const mediaSet = [...new Set(related.map((d) => sourceLabel(d.build)))].join("; ");
  lines.push(`- \`${selector}\`: rebuilt value is being won by later applicable rule(s), usually \`${mediaSet}\`.`);
}
lines.push("");
lines.push("## Matching Declarations");
lines.push("");
lines.push(`The remaining ${matches.length} audited declarations currently resolve to the same final value at ${WIDTH}px.`);
lines.push("");

fs.writeFileSync(auditPath, `${lines.join("\n")}\n`);

console.log(`Wrote ${auditPath}`);
console.log(`Checked ${targetKeys.size}; matching ${matches.length}; different ${diffs.length}; missing ${missing.length}`);
