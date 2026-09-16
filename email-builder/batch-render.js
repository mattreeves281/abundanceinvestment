const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const inputDir = path.resolve(repoRoot, process.argv[2] || "system-emails/email-builder-json");
const outputDir = path.resolve(repoRoot, process.argv[3] || "system-emails/email-builder-html");
const shouldRenderPermutations = process.argv.includes("--permutations");

function createElement() {
  return {
    value: "",
    checked: false,
    files: [],
    innerHTML: "",
    textContent: "",
    srcdoc: "",
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
    append() {},
    appendChild() {},
    remove() {},
    select() {},
    querySelector() { return createElement(); },
    querySelectorAll() { return []; },
    setAttribute() {}
  };
}

const store = new Map();
const windowObject = {
  open() { return null; },
  addEventListener() {},
  AbundanceEmailLibrary: null
};

const context = {
  console,
  window: windowObject,
  document: {
    body: createElement(),
    addEventListener() {},
    createElement,
    execCommand() {},
    getElementById() { return createElement(); },
    querySelector() { return createElement(); },
    querySelectorAll() { return []; }
  },
  localStorage: {
    getItem(key) { return store.get(key) || null; },
    setItem(key, value) { store.set(key, String(value)); },
    removeItem(key) { store.delete(key); }
  },
  navigator: { clipboard: { writeText: async () => {} } },
  setTimeout,
  clearTimeout,
  URL,
  Blob
};
context.global = context;
context.window.window = context.window;
context.window.document = context.document;
context.window.localStorage = context.localStorage;
context.window.navigator = context.navigator;

vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "component-library.js"), "utf8"), context, { filename: "component-library.js" });
vm.runInContext(fs.readFileSync(path.join(__dirname, "app.js"), "utf8"), context, { filename: "app.js" });

if (typeof context.renderEmailHtml !== "function") {
  throw new Error("Could not load email builder renderer.");
}

fs.mkdirSync(outputDir, { recursive: true });

const files = findJsonFiles(inputDir);
let rendered = 0;
let permutationFiles = 0;

for (const inputPath of files) {
  const relativePath = path.relative(inputDir, inputPath);
  const outputSubdir = path.join(outputDir, path.dirname(relativePath));
  fs.mkdirSync(outputSubdir, { recursive: true });
  const email = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const normalized = normalizeEmail(email);
  fs.writeFileSync(path.join(outputSubdir, path.basename(relativePath).replace(/\.json$/i, ".html")), context.renderEmailHtml(normalized));
  rendered += 1;

  if (shouldRenderPermutations) {
    const tags = conditionTags(email);
    for (const variant of tagPermutations(tags)) {
      const variantEmail = normalizeEmail(email);
      const html = context.renderEmailHtml(variantEmail, { previewTags: new Set(variant.presentTags) });
      const outputName = `${path.basename(relativePath, ".json")}${variant.suffix}.html`;
      fs.writeFileSync(path.join(outputSubdir, outputName), html);
      permutationFiles += 1;
    }
  }
}

const permutationSummary = shouldRenderPermutations ? ` plus ${permutationFiles} tag preview variants` : "";
console.log(`Rendered ${rendered} emails${permutationSummary} to ${path.relative(repoRoot, outputDir)}`);

function normalizeEmail(email) {
  const copy = JSON.parse(JSON.stringify(email));
  return typeof context.normalizeState === "function" ? context.normalizeState(copy) : copy;
}

function findJsonFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findJsonFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".json")) return [fullPath];
    return [];
  });
}

function conditionTags(email) {
  const tags = new Set();
  for (const block of email.blocks || []) {
    const condition = block.condition || {};
    if (!["show", "hide"].includes(condition.mode)) continue;
    for (const tag of parseTags(condition.tags)) tags.add(tag);
  }
  return [...tags].sort();
}

function parseTags(value) {
  return String(value || "")
    .split(/[\n,]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function tagPermutations(tags) {
  if (!tags.length) return [];
  const variants = [];
  const total = 2 ** tags.length;
  for (let mask = 0; mask < total; mask += 1) {
    const presentTags = [];
    const parts = [];
    tags.forEach((tag, index) => {
      const isPresent = Boolean(mask & (1 << index));
      if (isPresent) presentTags.push(tag);
      parts.push(`${isPresent ? "with" : "without"}-${slugPart(tag)}`);
    });
    variants.push({ presentTags, suffix: `--${parts.join("--")}` });
  }
  return variants;
}

function slugPart(value) {
  return String(value || "")
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
