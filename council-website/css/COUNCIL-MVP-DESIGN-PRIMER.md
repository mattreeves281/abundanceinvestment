# Council MVP Design Parity Primer

This is a lightweight styling primer for an MVP app that will sit alongside the council website. It is not a full design system. The goal is enough visual parity that the app feels related to the council site: same type, same core palette, similar cards, and matching button behaviour.

## Fonts

Use the shared CDN font files below. Headings use `New Kansas`; body text, labels, forms, and most UI text use `Sohne Buch`; stronger UI labels and buttons use `Sohne Kraftig`.

```css
@font-face {
  font-family: "Sohne Buch";
  src: url("https://cdn4.sharein.com/abundance/assets/fonts/soehne-buch.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sohne Kraftig";
  src: url("https://cdn4.sharein.com/abundance/assets/fonts/soehne-kraftig.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "New Kansas";
  src: url("https://cdn4.sharein.com/abundance/assets/fonts/NewKansas-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

Recommended stacks:

```css
:root {
  --font-display: "New Kansas", Georgia, serif;
  --font-body: "Sohne Buch", system-ui, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
  --font-strong: "Sohne Kraftig", system-ui, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
}
```

## Type Scale

Use `#363635` as the default text colour. Do not add extra negative tracking to body text. Headings intentionally use tight tracking.

| Role | Family | Weight | Desktop | Mobile | Line-height | Letter spacing |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| H1 | New Kansas | 700 | 51px | 36px | 0.95 desktop, 0.94 mobile | -0.03em |
| H2 | New Kansas | 700 | 46px | 32px | 0.98 desktop, 0.96 mobile | -0.03em |
| H3 | New Kansas | 700 | 32px | 24px | 1.08 | -0.03em |
| H4 | New Kansas | 700 | 24px | 20px | 1.08 | -0.03em |
| H5 | New Kansas | 700 | 20px | 18px | 1.08 | -0.03em |
| H6 | New Kansas | 700 | 18px | 16px | 1.08 | -0.03em |
| Body large | Sohne Buch | 400 | 19px | 18px | 1.55 | 0.004em |
| Body default | Sohne Buch | 400 | 16px | 16px | 1.5 | 0.005em |
| Body small | Sohne Buch | 400 | 14px | 14px | 1.5 desktop, 1.45 mobile | 0.006em |
| Body compact | Sohne Buch | 400 | 15px | 15px | 1.48 | normal |
| Eyebrow | Sohne Kraftig | 700 | 12px | 12px | 1 | 0.05em |
| Stat figure | New Kansas | 700 | 28px | 24px | 0.96 desktop, 0.98 mobile | -0.03em |

Eyebrows are uppercase and should use `#363635`, not a bright accent colour.

## Colour Palette

### Core

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#363635` | Primary text, eyebrows, neutral controls |
| Secondary text | `#4d4a46` | Supporting copy where a softer tone is needed |
| White | `#ffffff` | Page and card surfaces |
| Off white | `#faf8f8` | Very soft page backgrounds |
| Border soft | `#e2e2e2` | Card borders and subtle dividers |
| Warm grey light | `#e9e4e3` | Council masked sections and soft panels |
| Warm grey very light | `#f1eeed` | Very soft fills |

### Council Accents

| Token | Hex | Use |
| --- | --- | --- |
| Civic pink | `#f27fae` | Full-tone divider/accent option |
| Civic pink dark | `#c1658b` | Primary button, links, pink stat-card accent |
| Civic pink light | `#f7d9e8` | Decorative blobs and soft accents |
| Civic teal | `#00a4b6` | Full-tone divider/accent option, masked section option |
| Civic teal dark | `#008391` | Darker teal text/accent where needed |
| Civic teal light | `#cdebf0` | Decorative blobs and soft accents |
| Civic indigo | `#443668` | Secondary button and full-tone divider/accent option |
| Civic grey | `#71716e` | Neutral functional accent option |

Usage rules:

- For accents prefer: full-tone pink `#f27fae`, teal `#00a4b6`, or indigo `#443668`.
- Links and other text accents: prefer pink dark `#c1658b`.

## Base Card Style

For the purposes of consistency this is the card style used in the main council website system, in case it is useful for preseriving visual parity.

```css
.app-card {
  position: relative;
  padding: 24px;
  border: 1px solid #e2e2e2;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(54, 54, 53, 0.06);
  overflow: hidden;
}

.app-card::before {
  content: "";
  display: block;
  height: 5px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: var(--card-accent, #c1658b);
}

.app-card--pink { --card-accent: #c1658b; }
.app-card--teal { --card-accent: #00a4b6; }
.app-card--indigo { --card-accent: #443668; }
.app-card--grey { --card-accent: #71716e; }
```

For larger content containers, the site also uses a softer card:

```css
.content-card {
  background: #ffffff;
  border: 1.5px solid rgba(54, 54, 53, 0.12);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(54, 54, 53, 0.05);
}
```

## Base Button Style

Buttons are pill-shaped, outlined by default, and use `Sohne Kraftig`. The council site uses a transparent primary button that fills on hover/focus.

```css
.app-button {
  display: inline-block;
  align-self: start;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: #c1658b;
  font-family: "Sohne Kraftig", system-ui, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.app-button--small {
  font-size: 13px;
  padding: 8px 16px;
}

.app-button--medium {
  font-size: 13.5px;
  padding: 12px 20px;
}

.app-button--large {
  font-size: 15px;
  padding: 14px 24px;
}

.app-button--primary {
  color: #c1658b;
  border-color: #c1658b;
}

.app-button--primary:hover,
.app-button--primary:focus {
  color: #ffffff;
  background: #c1658b;
  border-color: #c1658b;
}

.app-button--secondary {
  color: #443668;
  border-color: #443668;
}

.app-button--secondary:hover,
.app-button--secondary:focus {
  color: #ffffff;
  background: #443668;
  border-color: #443668;
}

.app-button:focus-visible {
  outline: 2px solid #c1658b;
  outline-offset: 2px;
}

.app-button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
```

