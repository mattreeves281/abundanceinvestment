import fs from "node:fs";

const cssPath = new URL("../assets/css/abundance-main-css.css", import.meta.url);
const outputDir = new URL("./", import.meta.url);
const dividerDir = new URL("./dividers/", import.meta.url);

fs.mkdirSync(dividerDir, { recursive: true });

const css = fs.readFileSync(cssPath, "utf8");
const colourPattern = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;

function normaliseColour(value) {
  let colour = value.toLowerCase().replace(/\s+/g, "");
  if (/^#[0-9a-f]{3}$/.test(colour)) {
    colour = `#${colour[1]}${colour[1]}${colour[2]}${colour[2]}${colour[3]}${colour[3]}`;
  }
  return colour;
}

const colours = new Map();

for (const chunk of css.split("}")) {
  const openingBrace = chunk.lastIndexOf("{");
  if (openingBrace < 0) continue;

  const selector = chunk
    .slice(0, openingBrace)
    .replace(/@media[^{}]*$/, " ")
    .trim()
    .replace(/\s+/g, " ");
  const declarations = chunk.slice(openingBrace + 1).trim();

  if (!selector || !declarations) continue;

  for (const declaration of declarations.split(";").filter(Boolean)) {
    const matches = declaration.match(colourPattern);
    if (!matches) continue;

    const property = declaration.split(":")[0].trim();

    for (const match of matches) {
      const colour = normaliseColour(match);
      if (!colours.has(colour)) {
        colours.set(colour, { count: 0, uses: new Map() });
      }

      const entry = colours.get(colour);
      entry.count += 1;

      const use = `${property} | ${selector.slice(-160)}`.replace(/"/g, "'");
      entry.uses.set(use, (entry.uses.get(use) || 0) + 1);
    }
  }
}

const colourRows = ["colour,count,common uses"];
for (const [colour, entry] of [...colours.entries()].sort((a, b) => b[1].count - a[1].count)) {
  const uses = [...entry.uses.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([use, count]) => `${use} (${count})`)
    .join("; ")
    .replace(/"/g, "'");

  colourRows.push(`"${colour}",${entry.count},"${uses}"`);
}

fs.writeFileSync(new URL("./colours-extracted.csv", outputDir), colourRows.join("\n"));

const dividerPaths = {
  "abundance-mask-top.svg": "M0 360L1850 684L6000 24V700H0V360Z",
  "abundance-mask-bottom.svg": "M0 0H6000V340L4200 16L0 684V0Z",
  "abundance-divider-rise-left.svg": "M0 588L0 700L1980 252L6000 532L6000 420L1980 140Z",
  "abundance-divider-rise-right.svg": "M0 546L0 658L3960 210L6000 336L6000 224L3960 98Z",
  "abundance-divider-fall-left.svg": "M0 210L0 322L1980 574L6000 294L6000 182L1980 462Z",
};

for (const [name, path] of Object.entries(dividerPaths)) {
  const title = name.replace(/\.svg$/, "").replace(/-/g, " ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6000 700" preserveAspectRatio="none" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  <rect width="6000" height="700" fill="#faf8f8"/>
  <path fill="#363635" d="${path}"/>
</svg>
`;

  fs.writeFileSync(new URL(`./dividers/${name}`, outputDir), svg);
}

console.log(`Wrote ${colours.size} colours and ${Object.keys(dividerPaths).length} divider SVGs.`);
