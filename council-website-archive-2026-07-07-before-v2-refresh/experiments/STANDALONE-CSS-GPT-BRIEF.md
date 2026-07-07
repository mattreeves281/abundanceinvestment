# Abundance Design v2 Standalone CSS Brief

Use this brief with the existing `FINAL - homepage.html`, `FINAL - content.html`, and `FINAL - buy.html` examples when designing a related corporate website without supplying the full CSS.

The standalone CSS combines Bootstrap/Foundation layout utilities, ShareIn platform components, and Abundance v2 overrides. Prefer the Abundance v2 classes for brand language, the `si-*` classes for structured platform primitives, and Bootstrap-style utilities for layout.

## Design Tokens

The CSS exposes Abundance v2 custom properties on `:root`.

- `--abv2-white`, `--abv2-ink`, `--abv2-text`: white, primary ink, and body text.
- `--abv2-grey`, `--abv2-grey-light`, `--abv2-grey-very-light`, `--abv2-grey-ui`: neutral support surfaces and borders.
- `--abv2-pink`, `--abv2-pink-dark`, `--abv2-pink-light`: primary brand/accent family.
- `--abv2-teal`, `--abv2-teal-dark`, `--abv2-teal-light`, `--abv2-teal-very-light`: secondary brand/accent family.
- `--abv2-yellow`, `--abv2-yellow-dark`, `--abv2-yellow-light`: warm highlight/action support.
- `--abv2-green`, `--abv2-blue`, `--abv2-indigo`: supporting semantic/deep tones.
- `--abv2-*-aNN`: alpha tokens for subtle borders, shadows, overlays, and hover states.
- `--abv2-border-subtle`, `--abv2-border-soft`, `--abv2-border-default`, `--abv2-border-strong`: preferred border aliases.
- `--abv2-shadow-soft`, `--abv2-shadow-default`, `--abv2-shadow-card`: preferred shadow aliases.
- `--abv2-space-2` through `--abv2-space-96`: spacing tokens used by newer components.
- `--abv2-serif`, `--abv2-sans`, `--abv2-ui`: typography roles.

## Layout Utilities

These behave like a Bootstrap-style flexible layout layer.

- `.container`, `.container-fluid`, `.container-sm`, `.container-md`, `.container-lg`: page containers.
- `.container-medium`: medium content container used in editorial pages.
- `.row`: flex grid row.
- `.col`, `.col-auto`, `.col-1` to `.col-12`: base columns.
- `.col-sm-*`, `.col-md-*`, `.col-lg-*`: responsive columns.
- `.row-cols-1`, `.row-cols-2`, `.row-cols-sm-*`, `.row-cols-md-*`, `.row-cols-lg-*`: repeated item grids.
- `.offset-md-1` and other offset utilities: grid indentation.
- `.g-*`, `.gx-*`, `.gy-*`: grid gutters. The design examples use sizes such as `2xs`, `xs`, `sm`, `md`, and `lg`.
- `.choke-300` through `.choke-1200`: max-width wrappers.
- `.text-choke--640`, `.text-choke--960`: readable line-length constraints.
- `.m-x--auto`, `.mx-auto`: horizontal centering.

## Spacing Utilities

Use spacer utilities instead of ad hoc margins.

- `.m-t-spacer-*`, `.m-b-spacer-*`, `.m-r-spacer-*`, `.m-l-spacer-*`: directional margins.
- `.p-t-spacer-*`, `.p-b-spacer-*`, `.p-x-spacer-*`, `.p-y-spacer-*`, `.p-all-spacer-*`: directional padding.
- Common sizes: `0`, `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`.
- Examples: `.m-b-spacer-0`, `.m-t-spacer-sm`, `.p-x-spacer-xs`, `.p-y-spacer-lg`.

## Display And Flex Utilities

- `.d-none`, `.d-block`, `.d-flex`, `.d-grid`: display control.
- `.d-sm-*`, `.d-md-*`, `.d-lg-*`: responsive display control.
- `.flex-column`, `.flex-md-row`: stack on mobile, row on larger screens.
- `.justify-content-center`, `.justify-content-md-between`, `.justify-content-md-start`: horizontal alignment.
- `.align-items-start`, `.align-items-center`, `.align-items-end`, `.align-items-md-center`: vertical alignment.
- `.h-100`, `.w-100`, `.mw-100`: common sizing helpers.
- `.position-relative`, `.position-absolute`, `.sticky-top`: positioning helpers.

## Typography Classes

- `.si-heading-1`: largest standard heading.
- `.si-heading-2`: major section heading.
- `.si-heading-3`: subsection heading.
- `.si-heading-4`: card/compact section heading.
- `.si-heading-5`: small heading.
- `.si-heading-6`: smallest heading if needed.
- `.abundance-heading-display`: expressive hero/editorial display heading.
- `.body--xl`: large supporting copy.
- `.body--lg`: lead/body intro copy.
- `.body--md`: default body copy.
- `.body--sm`, `.body--xs`: smaller utility copy.
- `.abundance-eyebrow`: uppercase label/metadata.
- `.abundance-body-compact`: compact secondary body text.
- `.abundance-action-text`: small bold action/metadata text.
- `.abundance-stat`: numeric/statistic display.
- `.abundance-card-copy`: card-oriented body copy.
- `.text-white`: white text for dark/brand sections.
- `.text-center`, `.text-left`, `.text-md-start`, `.text-sm-end`: text alignment.
- `.text-colour--yellow`: yellow text accent.
- `.brand-primary`: primary pink colour.
- `.brand-secondary`: secondary teal colour.
- `.type-black`: ink/black text in contexts that inherit white.

## Backgrounds, Masks, And Colour Helpers

- `.bg-white`: white background.
- `.bg-colour--white`: white design-system background.
- `.bg-colour--primary`: pink brand background.
- `.bg-colour--secondary`: teal brand background.
- `.bg-colour--yellow`: yellow background.
- `.bg-colour--neutral--300`: light neutral background.
- `.bg-colour--abundance-white-soft`: translucent white surface.
- `.bg-mask`: base class for clipped section dividers.
- `.bg-mask--abundance-top`: angled mask entering a coloured section.
- `.bg-mask--abundance-bottom`: angled mask leaving a coloured section.
- `.bg-mask--abundance-footer-peak`: yellow footer peak divider.
- `.bg-mask--abundance-ed-rise`, `.bg-mask--abundance-ed-fall`, `.bg-mask--abundance-ed-right`: editorial mask variants.
- `.bg-blob`: base decorative blob helper.
- `.bg-blob--abundance-dot`: Abundance organic dot mask.

## Buttons And Links

- `.si-btn`: base button class. Always pair with size and variant.
- `.si-btn--lg`: large button used in page CTAs.
- `.si-btn--md`, `.si-btn--sm`: smaller button sizes available.
- `.si-btn--primary`: pink outline/action button.
- `.si-btn--secondary`: teal outline/action button.
- `.si-btn--tertiary`: neutral outline button.
- `.abundance-btn-white`: white outline button for coloured sections.
- `.abundance-support-link`: understated underlined support/navigation link.
- `.abundance-related-link`: large related-content link, often on coloured backgrounds.
- `.abundance-chip-link`: compact pill/chip link for jump links or tags.
- `.abundance-link-card`: clickable card with title, copy, and action text.

## Cards And Panels

- `.si-card`: base card shell.
- `.si-card--primary`, `.si-card--secondary`, `.si-card--tertiary`: card surface variants.
- `.si-card--0`, `.si-card--2xs`, `.si-card--xs`, `.si-card--sm`, `.si-card--md`, `.si-card--lg`: card padding sizes.
- `.si-card--full-height`: make card fill available height.
- `.si-card--no-border-radius`: square card variant.
- `.abundance-card-soft`: soft white card with larger radius and shadow.
- `.abundance-card-soft-bordered`: bordered/less elevated soft card.
- `.abundance-colour-card`: base coloured card.
- `.abundance-colour-card-neutral`: neutral colour card.
- `.abundance-colour-card-pink`: pink colour card.
- `.abundance-colour-card-teal`: teal colour card.
- `.abundance-colour-card-yellow`: yellow colour card.
- `.abundance-colour-card-green`: green colour card.
- `.abundance-colour-card-pink-light`: pale pink card.
- `.abundance-colour-card-teal-light`: pale teal card.
- `.abundance-boxout`: contained note/panel.
- `.abundance-boxout--compact`: smaller boxout.
- `.abundance-boxout--teal`: teal-tinted boxout.
- `.abundance-boxout--yellow`: yellow-tinted boxout.

## Media And Image Frames

- `.img-fluid`: responsive image.
- `.img-responsive`: legacy responsive image helper.
- `.abundance-media-frame`: rounded responsive media frame.
- `.abundance-media-frame--square`: square logo/icon/image frame.
- `.abundance-media-frame--case-square`: larger square case-study image frame.
- `.abundance-media-frame--wide`: wide image frame.
- `.abundance-media-frame--editorial`: editorial article media frame.
- `.abundance-ed-figure`: figure reset for editorial media.

## Editorial Components

- `.abundance-ed-band`: editorial section band.
- `.abundance-ed-band--tight`: tighter editorial band spacing.
- `.abundance-ed-band--loose`: looser editorial band spacing.
- `.abundance-ed-note`: small editorial note panel.
- `.abundance-ed-quote`: editorial quote treatment.
- `.abundance-inline-disclaimer`: risk/legal disclaimer block.
- `.abundance-warning-list`: grid list for warnings/checks.
- `.abundance-warning-list__item`: warning list row.
- `.abundance-warning-list__item--soft`: softer warning item background.
- `.abundance-card-blob-num`: blob-shaped numbered marker used in editorial cards.
- `.abundance-step-num`: blob-shaped step number.
- `.abundance-step-num--lg`: larger step number variant.
- `.brand-blockquote`: legacy brand quote style.

## Data And Stats Components

- `.abundance-bar-chart`: compact horizontal bar chart.
- `.abundance-bar-chart--compact`: tighter bar chart variant.
- `.abundance-bar-chart__row`: one chart row.
- `.abundance-bar-chart__label`: chart label.
- `.abundance-bar-chart__track`: chart background track.
- `.abundance-bar-chart__fill`: chart fill.
- `.si-table`: base table.
- `.si-table--sm`: small table.
- `.si-table--sm-compact`: compact small table.
- `.si-table--borders-between-rows`: row divider treatment.
- `.si-horizontal-rule`: horizontal divider.
- `.si-horizontal-rule--thick`: thicker divider.
- `.si-horizontal-rule--invert`: divider for dark/coloured sections.
- `.si-horizontal-rule--2xs`: compact divider spacing.

## Accordion

Accordion markup relies on Bootstrap collapse JavaScript.

- `.si-accordion`: accordion wrapper.
- `.abundance-accordion--sm`: smaller accordion spacing wrapper.
- `.si-accordion-item__header`: header wrapper.
- `.si-accordion-item__header-btn`: clickable header button.
- `.si-accordion-item__header-interior`: flex interior of the header.
- `.si-accordion-item__header-text-container`: title text container.
- `.si-accordion-item__heading`: accordion title.
- `.si-accordion-item__header-icon-container`: icon container.
- `.si-accordion-item__icon`: icon element.
- `.accordion-collapse`: Bootstrap collapse wrapper.
- `.collapse`: hidden collapsed state.
- `.collapsed`: collapsed button state.
- `.si-accordion-item__body`: revealed body content.

## Forms And Choice Controls

- `.si-form`: form wrapper.
- `.si-form-row`: form row.
- `.si-form-group`: field group.
- `.si-fieldset`: fieldset wrapper.
- `.si-fieldset__legend`: visible or structured fieldset legend.
- `.si-fieldset__input-container`: input group area.
- `.si-fieldset__input-container--vertical`: vertical option stack.
- `.si-input`: input/select/radio base.
- `.si-input-label`: label base.
- `.si-input-label--lg`: larger label.
- `.si-choice-form-group`: radio/checkbox choice row.
- `.si-choice-form-group__input`: choice input.
- `.si-choice-form-group__labels-container`: label text wrapper.
- `.si-choice-form-group__label`: choice label.
- `.abundance-field-white`: white field treatment on dark/brand backgrounds.
- `.abundance-field-white--select`: select variant.
- `.abundance-field-white__prefix`: prefix element inside field.

## Buy-Journey Components

- `.abundance-route-choice`: clickable route/radio card wrapper.
- `.abundance-route-choice__input`: hidden radio input.
- `.abundance-route-choice__card`: visible route card.
- `.abundance-route-choice--pink`: pink route accent.
- `.abundance-route-choice--teal`: teal route accent.
- `.abundance-route-choice__rule`: accent divider.
- `.abundance-route-choice__list`: benefit list inside card.
- `.abundance-route-choice__tick`: selected-state tick.
- `.abundance-buy-invest-list`: investment amount list.
- `.abundance-buy-invest-item`: one investment amount row/card.
- `.abundance-buy-invest-item__main`: title/details column.
- `.abundance-buy-invest-item__amount`: amount input column.
- `.abundance-buy-invest-item__amount-grid`: currency/input grid.
- `.abundance-buy-step`: used by the example HTML as a step wrapper; no substantive CSS treatment is required.

## Example-Only Or Missing-In-CSS Wrapper Classes

These appear in the example HTML but are intentionally light or absent from the source CSS. They can be retained as hooks, but do not rely on them for visual design unless you define them in the new system.

- `.abundance-buy-step`: buy-flow wrapper.
- `.abundance-hero-art-nudge`: image positioning hook.
- `.abundance-mock-spacer`: preview spacing hook.
- `.abundance-council-uof-bars`, `.abundance-council-uof-row`, `.abundance-council-uof-label`, `.abundance-council-uof-track`, `.abundance-council-uof-fill`, `.abundance-council-uof-fill--pink`, `.abundance-council-uof-fill--teal`, `.abundance-council-uof-fill--yellow`: example-specific “use of funds” chart classes.

## Icons And Accessibility

- `.si-icon`: base icon element.
- `.si-icon--sm`: small icon.
- `.sr-only`: screen-reader-only content.
- `.visually-hidden`, `.visually-hidden-focusable`: Bootstrap accessibility helpers.
- `.visible-desktop`: legacy visibility helper.

## Corporate Website Direction

For a related corporate site, keep the underlying grammar but adjust the palette and component emphasis:

- Keep the grid, spacing, typography scale, soft cards, editorial bands, media frames, accordions, and tables.
- Retain `.si-*` primitives as the structural contract.
- Use `.abundance-*` classes as inspiration for reusable component naming and behaviour.
- Re-skin tokens first: colour, font roles, radius, shadow, and spacing.
- Prefer restrained corporate surfaces over heavy brand colour floods.
- Use pink/teal/yellow equivalents as accent roles, not as a one-note palette.
- Keep page composition modular: full-width bands, constrained inner wrappers, repeated cards, and clear CTA rows.
- Use the HTML examples as canonical composition patterns.

