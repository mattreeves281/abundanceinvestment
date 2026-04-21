const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INCOMING_DIR = path.join(ROOT, "incoming");
const SCSS_DIR = path.join(ROOT, "scss");

const SOURCE_FILES = [
  {
    filename: "1 - hompeage base responsive.html",
    route: "homepage",
  },
  {
    filename: "2 - council hub page.html",
    route: "council",
  },
  {
    filename: "3- homepage components.html",
    route: "homepage",
  },
  {
    filename: "4 - editorial components.html",
    route: "editorial",
  },
];

const FOUNDATION_ORDER = ["tokens", "base", "shell", "type", "layout", "buttons"];
const ROUTE_ROOTS = new Set([
  "abv2-home",
  "abv2-editorial",
  "ai-council-page",
  "ai-scope",
  "ai-open-bg",
  "ai-custom",
]);
const LAYOUT_ROOTS = new Set([
  "abv2-wrap",
  "abv2-sec",
  "abv2-stack",
  "abv2-editorial-wrap",
  "abv2-ed-section",
  "abv2-ed-rail",
  "abv2-ed-copy",
]);

const generatedFiles = new Set(["main.scss"]);

function extractStyle(html, filename) {
  const matches = [];
  const regex = /<style>([\s\S]*?)<\/style>/gi;
  let match;

  while ((match = regex.exec(html))) {
    matches.push(match[1]);
  }

  if (matches.length === 0) {
    throw new Error(`No <style> blocks found in ${filename}`);
  }
  return matches.join("\n\n");
}

function parseCss(css) {
  return parseBlock(css, 0, null).nodes;
}

function parseBlock(css, startIndex, endChar) {
  const nodes = [];
  let i = startIndex;

  while (i < css.length) {
    if (endChar && css[i] === endChar) {
      return { nodes, index: i + 1 };
    }

    if (/\s/.test(css[i])) {
      i += 1;
      continue;
    }

    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      const raw = css.slice(i, end + 2);
      nodes.push({ type: "comment", raw });
      i = end + 2;
      continue;
    }

    if (css[i] === "@") {
      const headerEnd = findHeaderEnd(css, i);
      const header = css.slice(i, headerEnd).trim();
      const atName = header.split(/\s+/)[0];

      if (css[headerEnd] === ";") {
        nodes.push({
          type: "atrule",
          name: atName,
          header,
          raw: css.slice(i, headerEnd + 1).trim(),
        });
        i = headerEnd + 1;
        continue;
      }

      const blockEnd = findMatchingBrace(css, headerEnd);
      const raw = css.slice(i, blockEnd + 1).trim();

      if (isNestedAtRule(atName)) {
        const innerCss = css.slice(headerEnd + 1, blockEnd);
        const inner = parseBlock(innerCss, 0, null);
        nodes.push({
          type: "atrule",
          name: atName,
          header,
          children: inner.nodes,
        });
        i = blockEnd + 1;
        continue;
      }

      nodes.push({
        type: "atrule",
        name: atName,
        header,
        raw,
      });
      i = blockEnd + 1;
      continue;
    }

    const headerEnd = findHeaderEnd(css, i);
    const selector = css.slice(i, headerEnd).trim();
    const blockEnd = findMatchingBrace(css, headerEnd);
    const raw = css.slice(i, blockEnd + 1).trim();
    nodes.push({ type: "rule", selector, raw });
    i = blockEnd + 1;
  }

  return { nodes, index: i };
}

function isNestedAtRule(name) {
  return name === "@media" || name === "@supports";
}

function findHeaderEnd(css, startIndex) {
  let i = startIndex;

  while (i < css.length) {
    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      i = end + 2;
      continue;
    }

    if (css[i] === "{") {
      return i;
    }

    if (css[i] === ";") {
      return i;
    }

    if (css[i] === '"' || css[i] === "'") {
      i = skipString(css, i);
      continue;
    }

    i += 1;
  }

  throw new Error(`Unterminated header near: ${css.slice(startIndex, startIndex + 80)}`);
}

function findMatchingBrace(css, openIndex) {
  let depth = 1;
  let i = openIndex + 1;

  while (i < css.length) {
    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      i = end + 2;
      continue;
    }

    if (css[i] === '"' || css[i] === "'") {
      i = skipString(css, i);
      continue;
    }

    if (css[i] === "{") {
      depth += 1;
    } else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }

    i += 1;
  }

  throw new Error(`Unterminated block near: ${css.slice(openIndex, openIndex + 80)}`);
}

function skipString(css, quoteIndex) {
  const quote = css[quoteIndex];
  let i = quoteIndex + 1;
  while (i < css.length) {
    if (css[i] === "\\") {
      i += 2;
      continue;
    }
    if (css[i] === quote) {
      return i + 1;
    }
    i += 1;
  }
  return i;
}

function normalizeComment(rawComment) {
  const inner = rawComment.slice(2, -2);
  const text = inner
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!/[A-Za-z]/.test(text)) {
    return null;
  }

  return text
    .replace(/^[=\- ]+/, "")
    .replace(/[=\- ]+$/, "")
    .trim();
}

function getRoots(selector) {
  const matches = selector.match(/\.(?:abv2|ai|cbc)-[A-Za-z0-9_-]+/g) || [];
  const roots = [];

  for (const match of matches) {
    let root = match.slice(1);
    root = root.replace(/__(.+)$/, "");
    root = root.replace(/--(.+)$/, "");
    root = root.replace(/__$/, "");
    root = root.replace(/--$/, "");
    if (!roots.includes(root)) {
      roots.push(root);
    }
  }

  return roots;
}

function sanitizeRootForFile(root) {
  return root.replace(/__/g, "-");
}

function routeFile(sourceMeta) {
  return `${sourceMeta.route}.scss`;
}

function resolveDestination(selector, sourceMeta) {
  if (/@font-face\b/.test(selector) || /^:root\b/.test(selector)) {
    return "tokens.scss";
  }

  if (/(^|,)\s*html\b|(^|,)\s*body\b|\.main-content\b|\.page-content\b|\.content-wrapper\b/.test(selector)) {
    return "base.scss";
  }

  if (/\.site-navbar\b/.test(selector)) {
    return "_site-navbar.scss";
  }

  if (/\.footer\b|\.bg-colour--neutral--300\.bg-mask\.bg-mask--t-convex\b/.test(selector)) {
    return "_footer.scss";
  }

  if (/\.abv2-h1\b|\.abv2-h2\b|\.abv2-h3\b|\.abv2-body\b/.test(selector)) {
    return "type.scss";
  }

  if (/\.abv2-btn\b/.test(selector)) {
    return "buttons.scss";
  }

  if (/\.abv2-wrap(?:--|\b)|\.abv2-sec\b|\.abv2-stack\b|\.abv2-ed-section\b|\.abv2-ed-rail\b|\.abv2-ed-copy\b/.test(selector)) {
    return "layout.scss";
  }

  const roots = getRoots(selector);

  if (roots.length === 0) {
    return routeFile(sourceMeta);
  }

  if (roots.length === 1) {
    const root = roots[0];

    if (ROUTE_ROOTS.has(root)) {
      return routeFile(sourceMeta);
    }

    if (LAYOUT_ROOTS.has(root)) {
      return "layout.scss";
    }

    return `_${sanitizeRootForFile(root)}.scss`;
  }

  return routeFile(sourceMeta);
}

function addChunk(fileMap, orderMap, destination, sourceLabel, chunk) {
  if (!fileMap.has(destination)) {
    fileMap.set(destination, []);
  }
  if (!orderMap.has(destination)) {
    orderMap.set(destination, orderMap.size);
  }
  fileMap.get(destination).push({ sourceLabel, chunk });
}

function processNodes(nodes, sourceMeta, fileMap, orderMap, currentLabelRef, atRuleStack = []) {
  for (const node of nodes) {
    if (node.type === "comment") {
      const normalized = normalizeComment(node.raw);
      if (normalized) {
        currentLabelRef.current = `${sourceMeta.filename} / ${normalized}`;
      }
      continue;
    }

    if (node.type === "rule") {
      const destination = resolveDestination(node.selector, sourceMeta);
      addChunk(
        fileMap,
        orderMap,
        destination,
        currentLabelRef.current,
        wrapInAtRules(atRuleStack, node.raw)
      );
      continue;
    }

    if (node.type === "atrule" && node.children) {
      processAtRule(node, sourceMeta, fileMap, orderMap, currentLabelRef, atRuleStack);
      continue;
    }

    if (node.type === "atrule") {
      const destination = resolveDestination(node.header, sourceMeta);
      addChunk(
        fileMap,
        orderMap,
        destination,
        currentLabelRef.current,
        wrapInAtRules(atRuleStack, node.raw)
      );
    }
  }
}

function processAtRule(node, sourceMeta, fileMap, orderMap, currentLabelRef, atRuleStack) {
  const nestedLabelRef = { current: currentLabelRef.current };
  processNodes(node.children, sourceMeta, fileMap, orderMap, nestedLabelRef, [
    ...atRuleStack,
    node.header,
  ]);
}

function indent(raw) {
  return raw
    .split("\n")
    .map((line) => (line.length ? `  ${line}` : line))
    .join("\n");
}

function wrapInAtRules(atRuleStack, raw) {
  if (atRuleStack.length === 0) {
    return raw;
  }

  let wrapped = raw;

  for (let i = atRuleStack.length - 1; i >= 0; i -= 1) {
    wrapped = `${atRuleStack[i]}{\n${indent(wrapped)}\n}`;
  }

  return wrapped;
}

function fileHeader(destination) {
  const component = destination.replace(/^_/, "").replace(/\.scss$/, "");

  if (destination.startsWith("_")) {
    return [
      "/* ========================================",
      `COMPONENT: ${component}`,
      "Status: unrefined (contains duplicates)",
      "======================================== */",
      "",
    ].join("\n");
  }

  return "";
}

function sourceHeader(sourceLabel) {
  return [
    "/* =========================================================",
    `SOURCE: ${sourceLabel}`,
    "========================================================= */",
    "",
  ].join("\n");
}

function renderFile(destination, entries) {
  let out = fileHeader(destination);
  let previousSource = null;

  for (const entry of entries) {
    if (entry.sourceLabel !== previousSource) {
      if (out && !out.endsWith("\n\n")) {
        out += "\n";
      }
      out += sourceHeader(entry.sourceLabel);
      previousSource = entry.sourceLabel;
    }

    out += `${entry.chunk}\n\n`;
  }

  return `${out.trimEnd()}\n`;
}

function importPathFromFile(filename) {
  return `@import "${filename.replace(/\.scss$/, "")}";`;
}

function buildMainScss(destinations, orderMap) {
  const foundationFiles = FOUNDATION_ORDER.map((name) => `${name}.scss`).filter((file) =>
    destinations.includes(file)
  );
  const remainingFiles = destinations
    .filter((file) => !foundationFiles.includes(file))
    .sort((a, b) => orderMap.get(a) - orderMap.get(b));

  const ordered = [...foundationFiles, ...remainingFiles];

  return `${ordered.map(importPathFromFile).join("\n")}\n`;
}

function cleanGeneratedFiles() {
  for (const entry of fs.readdirSync(SCSS_DIR)) {
    if (generatedFiles.has(entry)) {
      continue;
    }
    if (entry.endsWith(".scss")) {
      fs.unlinkSync(path.join(SCSS_DIR, entry));
    }
  }
}

function main() {
  fs.mkdirSync(SCSS_DIR, { recursive: true });
  cleanGeneratedFiles();

  const fileMap = new Map();
  const orderMap = new Map();

  for (const sourceMeta of SOURCE_FILES) {
    const filepath = path.join(INCOMING_DIR, sourceMeta.filename);
    const html = fs.readFileSync(filepath, "utf8");
    const css = extractStyle(html, sourceMeta.filename);
    const nodes = parseCss(css);
    const labelRef = { current: sourceMeta.filename };
    processNodes(nodes, sourceMeta, fileMap, orderMap, labelRef);
  }

  const destinations = Array.from(fileMap.keys());

  for (const destination of destinations) {
    const content = renderFile(destination, fileMap.get(destination));
    fs.writeFileSync(path.join(SCSS_DIR, destination), content);
    generatedFiles.add(destination);
  }

  const mainScss = buildMainScss(destinations, orderMap);
  fs.writeFileSync(path.join(SCSS_DIR, "main.scss"), mainScss);
}

main();
