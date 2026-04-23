const fs = require("fs");
const path = require("path");

const SCSS_DIR = path.resolve(__dirname, "..", "scss");

const EXISTING_TOKEN_BY_HEX = {
  "ffffff": "--abv2-white",
  "fff": "--abv2-white",
  "282827": "--abv2-ink",
  "4d4a46": "--abv2-text",
  "71716e": "--abv2-grey",
  "e9e4e3": "--abv2-grey-light",
  "e2e2e2": "--abv2-grey-ui",
  "f27fae": "--abv2-pink",
  "c1658b": "--abv2-pink-dark",
  "f498be": "--abv2-pink-light",
  "00a4b6": "--abv2-teal",
  "008391": "--abv2-teal-dark",
  "4cbfcb": "--abv2-teal-light",
  "ffb72c": "--abv2-yellow",
  "cc9223": "--abv2-yellow-dark",
  "ffc556": "--abv2-yellow-light",
  "25ab2d": "--abv2-green",
  "151943": "--abv2-blue",
  "443668": "--abv2-indigo",
};

const ADDITIONAL_TOKEN_BY_HEX = {};

const TOKEN_BY_HEX = { ...EXISTING_TOKEN_BY_HEX, ...ADDITIONAL_TOKEN_BY_HEX };
const TOKEN_FILES = new Set(["tokens.scss", "additional_tokens.scss"]);
const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

function normalizeHex(hex) {
  return hex.replace(/^#/, "").toLowerCase();
}

function tokenForHex(hex) {
  const normalized = normalizeHex(hex);
  return TOKEN_BY_HEX[normalized];
}

function buildAdditionalTokensContent() {
  if (Object.keys(ADDITIONAL_TOKEN_BY_HEX).length === 0) {
    return [
      "/* =========================================================",
      "SOURCE: Generated additional colour tokens",
      "========================================================= */",
      "/* No additional colour tokens currently required. */",
      "",
    ].join("\n");
  }

  const lines = [
    "/* =========================================================",
    "SOURCE: Generated additional colour tokens",
    "========================================================= */",
    ":root{",
  ];

  Object.keys(ADDITIONAL_TOKEN_BY_HEX)
    .sort()
    .forEach((hex) => {
      lines.push(`  ${ADDITIONAL_TOKEN_BY_HEX[hex]}:#${hex};`);
    });

  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

function updateMainScss() {
  const mainPath = path.join(SCSS_DIR, "main.scss");
  const content = fs.readFileSync(mainPath, "utf8").split("\n");
  const importLine = '@import "additional_tokens";';

  if (content.includes(importLine)) {
    return;
  }

  const index = content.indexOf('@import "tokens";');
  if (index === -1) {
    throw new Error("Could not find tokens import in main.scss");
  }

  content.splice(index + 1, 0, importLine);
  fs.writeFileSync(mainPath, `${content.join("\n").replace(/\n+$/, "\n")}`);
}

function replaceHexesInFile(filename) {
  const filePath = path.join(SCSS_DIR, filename);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const updated = lines.map((line) => {
    const trimmed = line.trim();
    const isCustomPropertyDefinition = /^--[a-z0-9-]+\s*:/.test(trimmed);

    if (isCustomPropertyDefinition) {
      const match = trimmed.match(/^--([a-z0-9-]+)\s*:\s*(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b)(\s*;.*)$/);
      if (match) {
        const property = `--${match[1]}`;
        const token = tokenForHex(match[2]);

        if (token && token !== property) {
          return line.replace(match[2], `var(${token})`);
        }
      }

      return line;
    }

    return line.replace(HEX_PATTERN, (hex) => {
      const token = tokenForHex(hex);
      if (!token) {
        throw new Error(`No token mapping for ${hex} in ${filename}`);
      }
      return `var(${token})`;
    });
  });

  fs.writeFileSync(filePath, `${updated.join("\n").replace(/\n+$/, "\n")}`);
}

function main() {
  fs.writeFileSync(path.join(SCSS_DIR, "additional_tokens.scss"), buildAdditionalTokensContent());
  updateMainScss();

  fs.readdirSync(SCSS_DIR)
    .filter((filename) => filename.endsWith(".scss"))
    .forEach((filename) => {
      if (TOKEN_FILES.has(filename) || filename === "main.scss") {
        return;
      }
      replaceHexesInFile(filename);
    });

  replaceHexesInFile("tokens.scss");
}

main();
