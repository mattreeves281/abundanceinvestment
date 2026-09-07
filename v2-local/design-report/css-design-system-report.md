# Abundance v2 sandbox CSS report

Source CSS: `v2-local/assets/css/abundance-main-css.css`

Generated supporting files:

- `colours-extracted.csv` contains every colour value found in the sandbox CSS, including Bootstrap/framework leftovers.
- `dividers/` contains standalone SVG versions of the Abundance mask and divider shapes.

## Colour Palette

The sandbox CSS contains 348 colour values in total. Most of these come from the inherited framework, browser resets, validation states, and Bootstrap. The table below focuses on the visible v2 page system colours and the helper classes used in the current sandbox pages.

| Colour | Role | Common usage |
| --- | --- | --- |
| `#363635` | Primary ink | Main text via `.text-color--primary`, heading colour, stat colour, dark rules, icon strokes. |
| `#4d4a46` | Secondary text | Softer body text via `.text-color--secondary`, captions, navigation supporting text, hover/focus link colour in inherited rules. |
| `#ffffff` | White | Page/card surfaces, inverse text, buttons on coloured backgrounds. |
| `#faf8f8` | Warm off-white | Neutral page background via `.bg-colour--neutral--100`, `.bg-color--secondary`, nav surfaces. |
| `#f1eeed` | Soft neutral tint | Notes, disclaimers, input prefixes, figure captions, light-grey blobs. |
| `#e9e4e3` | Neutral 300 | Deeper neutral surface via `.bg-colour--neutral--300`, grey bordered/filled controls. |
| `#e2e2e2` | Border neutral | Horizontal rules, table borders, colour-card neutral. |
| `#c1658b` | Brand accent / older primary pink | `.text-color--accent`, primary button colour, accent links, legacy brand accent states. |
| `#f27fae` | V2 pink | `.bg-colour--pink`, `.abundance-card--color-pink`, `.abundance-blob--pink`, disclaimer and quote left rules. |
| `#f7d9e8` | Pink surface tint | `.bg-colour--primary-surface`, `.abundance-card--color-pink-light`, bordered primary button hover surface. |
| `#00aec2` | V2 cyan / secondary | `.bg-colour--secondary`, `.abundance-card--color-cyan`, `.abundance-blob--cyan`, secondary buttons and selected accents. |
| `#cdebf0` | Cyan surface tint | `.bg-colour--secondary--surface`, secondary bordered/floating button hover surface. |
| `#008391` | Dark cyan / risk warning | `.bg-color--risk-warning`, secondary button hover text/borders, file input button state. |
| `#ffb72c` | Yellow | `.bg-colour--yellow`, `.abundance-blob--yellow`, yellow buttons and dividers. |
| `#ffeecd` | Yellow surface tint | `.bg-colour--yellow-surface`, yellow-tint content surfaces. |
| `rgba(54,54,53,.06)` | Low ink wash | Soft interactive card focus/hover shadows and button hover washes. |
| `rgba(54,54,53,.6)` | Backdrop overlay | Modal backdrops, nav backdrops, loading overlays. |
| `hsla(0,0%,100%,.18)` | Soft white overlay | `.abundance-blob--white-soft`. |

## Colour Use Notes

- Page bands use `bg-colour--pink`, `bg-colour--secondary`, and `bg-colour--yellow` with matching `abundance-mask` wrappers.
- Divider colours are applied by setting the background colour on the divider element, while the shape itself is created by CSS `mask-image`.
- Cards use three visible colour families: pink, cyan, yellow, plus neutral and light variants.
- Text generally remains `#363635` even on pink, cyan, and yellow sections.
- Accent links use the brand pink family, most commonly `#c1658b`.
- Disclaimers and quote rules use `#f27fae` as a left accent line with `#f1eeed` as the background.

## Type Assets

The CSS declares three web fonts:

| Font family | Weight | Role | Source |
| --- | --- | --- | --- |
| `New Kansas` | `600` | Headings and large stats | `NewKansas-SemiBold.woff2` |
| `Sohne Buch` | `400` | Body copy, captions, form labels, general UI | `soehne-buch.woff2` |
| `Sohne Kraftig` | `600` | Eyebrows and stronger UI labels | `soehne-kraftig.woff2` |

All font faces use `font-display: swap`.

## Heading Scale

The `.si-heading-*` classes mirror the base `.heading-*` scale.

| Class | Desktop size | Mobile size | Line-height | Weight | Family | Letter spacing |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| `.si-heading-1` / `.heading-1` | `3.1875rem` | `2.25rem` | `.95` desktop, `.94` mobile | `700` | `New Kansas`, Georgia, serif | `-0.03em` |
| `.si-heading-2` / `.heading-2` | `2.875rem` | `2rem` | `.98` desktop, `.96` mobile | `700` | `New Kansas`, Georgia, serif | `-0.03em` |
| `.si-heading-3` / `.heading-3` | `2rem` | `1.5rem` | `1.08` | `700` | `New Kansas`, Georgia, serif | `-0.03em` |
| `.si-heading-4` / `.heading-4` | `1.5rem` | `1.25rem` | `1.08` | `700` | `New Kansas`, Georgia, serif | `-0.03em` |
| `.si-heading-5` / `.heading-5` | `1.25rem` | `1.125rem` | `1.08` | `700` | `New Kansas`, Georgia, serif | `-0.03em` |
| `.si-heading-6` / `.heading-6` | `1.125rem` | `1rem` | `1.08` | `700` | `New Kansas`, Georgia, serif | `-0.03em` |

Heading text transform is explicitly `none`.

## Body Scale

| Class | Desktop size | Mobile size | Line-height | Weight | Family | Letter spacing |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| `.body--xl` | `1.5rem` | `1.25rem` | `1.5` | `400` | `Sohne Buch`, system sans | `.002em` |
| `.body--lg` | `1.185rem` | `1.125rem` | `1.55` | `400` | `Sohne Buch`, system sans | `.004em` |
| `.body--md` | `1rem` | `1rem` | `1.5` | `400` | `Sohne Buch`, system sans | `.005em` |
| `.body--sm` | `.875rem` | `.875rem` | `1.5` desktop, `1.45` mobile | `400` | `Sohne Buch`, system sans | `.006em` |
| `.body--xs` | `.75rem` | `.75rem` | `1.5` | `400` | `Sohne Buch`, system sans | `normal` |

Body text defaults to `#363635`.

## Abundance-Specific Text Formats

| Class | Setup | Use |
| --- | --- | --- |
| `.abundance-eyebrow` | `Sohne Kraftig`; `.75rem`; `700`; line-height `1`; letter-spacing `.05em`; uppercase. | Section labels, stat labels, card labels. |
| `.abundance-stat` | `New Kansas`; desktop `1.75rem`; mobile `1.5rem`; `700`; line-height `.96` desktop / `.98` mobile; letter-spacing `-0.03em`; colour `#363635`. | Numeric stats and calculator results. |
| `.abundance-body-compact` | `Sohne Buch`; `.9375rem`; `400`; line-height `1.48`; normal letter spacing; colour `#363635`. | Compact explanatory copy under stats and in cards. |
| `.si-btn-link`, `.btn-link` | `Sohne Buch`; `1rem`; `400`; line-height `1.5`; letter-spacing `.005em`. | Text-style buttons and modal links. |
| `.si-btn--lg` | `.9375rem`; padding `.875rem 1.5rem` in the later v2 rule. | Large pill buttons in current page layouts. |

## Layout Spacing Notes

- The sandbox uses spacer helper classes such as `p-t-spacer-3xs`, `p-t-spacer-2xs`, `p-t-spacer-sm`, `m-t-spacer-xs`, and `m-b-spacer-0` rather than page-specific CSS.
- Eyebrow spacing has been handled in HTML with explicit spacer divs where needed.
- Page sections commonly use `p-y-spacer-lg`.
- Common content width helpers in the page system include `choke-600`, `choke-800`, `choke-1000`, and `choke-1200`.

## Divider And Mask Shapes

All divider and mask elements use a `6000 x 700` SVG coordinate system with `preserveAspectRatio="none"`. The CSS gives the elements `width: 100%`, `height: 0`, and `padding-top: 11.5%`, then applies these paths as `mask-image`.

| CSS class | SVG output |
| --- | --- |
| `.abundance-mask--top` | `dividers/abundance-mask-top.svg` |
| `.abundance-mask--bottom` | `dividers/abundance-mask-bottom.svg` |
| `.abundance-dividers--rise-left` | `dividers/abundance-divider-rise-left.svg` |
| `.abundance-dividers--rise-right` | `dividers/abundance-divider-rise-right.svg` |
| `.abundance-dividers--fall-left` | `dividers/abundance-divider-fall-left.svg` |

The exported SVGs use `#363635` on `#faf8f8` so the shape is visible when opened directly. In production, the visible colour comes from the element background colour.
