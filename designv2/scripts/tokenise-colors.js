const fs = require("fs");
const path = require("path");

const SCSS_DIR = path.resolve(__dirname, "..", "scss");

const EXISTING_TOKEN_BY_HEX = {
  "ffffff": "--abv2-white",
  "fff": "--abv2-white",
  "262625": "--abv2-ink",
  "4d4a46": "--abv2-text",
  "df73ad": "--abv2-pink",
  "efb52a": "--abv2-yellow",
  "12a9bb": "--abv2-teal",
};

const ADDITIONAL_TOKEN_BY_HEX = {
  "000": "--abv2-black-000",
  "00a4b6": "--abv2-teal-00a4b6",
  "07828f": "--abv2-teal-07828f",
  "0f172a": "--abv2-navy-0f172a",
  "0f7d8b": "--abv2-teal-0f7d8b",
  "111": "--abv2-black-111",
  "111827": "--abv2-navy-111827",
  "1ea4b8": "--abv2-teal-1ea4b8",
  "207f8e": "--abv2-teal-207f8e",
  "454543": "--abv2-neutral-454543",
  "4c4c4a": "--abv2-neutral-4c4c4a",
  "6a6661": "--abv2-neutral-6a6661",
  "6b7280": "--abv2-grey-6b7280",
  "724795": "--abv2-purple-724795",
  "7c5b0a": "--abv2-ochre-7c5b0a",
  "8d6707": "--abv2-ochre-8d6707",
  "8f3d69": "--abv2-plum-8f3d69",
  "9c6b00": "--abv2-ochre-9c6b00",
  "a87509": "--abv2-ochre-a87509",
  "a93f77": "--abv2-pink-a93f77",
  "a93f78": "--abv2-pink-a93f78",
  "b24e82": "--abv2-pink-b24e82",
  "b8dde3": "--abv2-teal-b8dde3",
  "d8eef1": "--abv2-teal-d8eef1",
  "dcead9": "--abv2-green-dcead9",
  "ddd7d2": "--abv2-stone-ddd7d2",
  "dff1f3": "--abv2-teal-dff1f3",
  "dff4f6": "--abv2-teal-dff4f6",
  "e26da6": "--abv2-pink-e26da6",
  "e2961c": "--abv2-ochre-e2961c",
  "e5e1dc": "--abv2-stone-e5e1dc",
  "e6f0e3": "--abv2-green-e6f0e3",
  "e774ad": "--abv2-pink-e774ad",
  "e8e3e2": "--abv2-stone-e8e3e2",
  "e9e4e3": "--abv2-stone-e9e4e3",
  "edd9a2": "--abv2-ochre-edd9a2",
  "efbfd1": "--abv2-pink-efbfd1",
  "efcfdf": "--abv2-pink-efcfdf",
  "efe9e5": "--abv2-stone-efe9e5",
  "efebea": "--abv2-stone-efebea",
  "f3edf9": "--abv2-purple-f3edf9",
  "f3efee": "--abv2-stone-f3efee",
  "f3f3f3": "--abv2-grey-f3f3f3",
  "f3f4f6": "--abv2-grey-f3f4f6",
  "f3f9fa": "--abv2-teal-f3f9fa",
  "f6e7c8": "--abv2-ochre-f6e7c8",
  "f6f2ef": "--abv2-stone-f6f2ef",
  "f6f3f2": "--abv2-stone-f6f3f2",
  "f8d9e8": "--abv2-pink-f8d9e8",
  "f8dfe9": "--abv2-pink-f8dfe9",
  "f8ebc8": "--abv2-ochre-f8ebc8",
  "f8f5f7": "--abv2-pink-f8f5f7",
  "f9fafb": "--abv2-grey-f9fafb",
  "faf8f6": "--abv2-stone-faf8f6",
  "faf8f8": "--abv2-stone-faf8f8",
  "fff6d9": "--abv2-yellow-fff6d9",
  "fffdfa": "--abv2-cream-fffdfa",
};

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
