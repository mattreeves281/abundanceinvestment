# Abundance V2 Design System Briefing For AI Agents

This document is an implementation brief for generating HTML that fits the Abundance V2 visual system. It is intended for AI agents that do not have the full CSS source, but do have access to this briefing and the example component HTML catalogue.

Use this document together with:

- `README.md`
- `ATOMIC-CROSSWALK.md`
- `page-scaffolds/01-homepage-page-scaffold.html`
- `page-scaffolds/02-content-page-scaffold-with-chip-nav.html`
- the complete snippets in `homepage/`, `content/`, and `buy-flow/`
- the small reusable snippets in `atomic/`

## Core Instruction

Generate HTML by composing existing classes and patterns from the examples. Do not invent new classes. If a layout cannot be achieved with the available classes, flag the gap rather than creating a new class name.

Prefer complete component snippets over atomic snippets when building pages. Atomic snippets are useful for single cards, rows, fields, and repeated sub-elements, but complete snippets show the intended spacing, gutters, wrappers, and responsive structure.

## Visual Character

The system should feel:

- civic, calm, and trustworthy
- editorial rather than sales-led
- clear enough for financial decision support
- warm, human, and place-based
- spacious, but not sparse
- accessible and legible

Avoid:

- generic SaaS/marketing hero layouts
- dark, high-contrast, or overly corporate styling
- custom decorative classes
- solid legacy buttons such as `brand-btn`, `btn-primary`, `si-btn-primary`, or `brand-btn-yellow`
- old `abv2-*` class patterns unless they already appear in a supplied scaffold or snippet

## Page Scaffolds

Use page scaffolds before composing individual components.

For a homepage, start from:

```html
page-scaffolds/01-homepage-page-scaffold.html
```

For an editorial/content page, start from:

```html
page-scaffolds/02-content-page-scaffold-with-chip-nav.html
```

Content pages should normally include:

- an outer `div` using `bg-white min-vh-100`
- a `header` with `container-medium p-x-spacer-xs`
- a hero content choke such as `choke-700`
- an intro paragraph using `body--lg`
- a chip-link navigation row before the first divider
- an `abundance-dividers` divider before the first main content section
- main content inside `choke-800 m-x--auto p-x-spacer-xs` or `choke-1000 m-x--auto p-x-spacer-xs`

Homepage pages should normally include:

- an outer `div` using `bg-white vw-100`
- a first-screen hero with `choke-1200 m-x--auto p-x-spacer-xs`
- Bootstrap rows/columns for layout
- coloured bands with matching top and bottom `abundance-mask` elements
- content sections using `container`, `container-medium`, or `choke-*` wrappers

## Layout And Containers

Use the grid and helper classes already present in the examples.

Common containers:

- `container`
- `container-medium`
- `choke-300`
- `choke-400`
- `choke-600`
- `choke-700`
- `choke-800`
- `choke-900`
- `choke-1000`
- `choke-1100`
- `choke-1200`
- `text-choke--640`
- `text-choke--960`

Typical wrappers:

```html
<section class="position-relative p-y-spacer-md bg-colour--white">
  <div class="choke-800 m-x--auto p-x-spacer-xs">
    ...
  </div>
</section>
```

```html
<section class="position-relative p-y-spacer-xl bg-colour--white">
  <div class="container">
    ...
  </div>
</section>
```

Use Bootstrap column patterns for responsive layout:

- `row`
- `col-12`
- `col-md-6`
- `col-md-7`
- `col-md-8`
- `offset-md-1`
- `row-cols-1`
- `row-cols-sm-auto`
- `row-cols-md-2`
- `gy-*`
- `gx-*`

For mobile stacking, use larger vertical gutters where needed:

- `gy-md`
- `gy-lg`
- `gy-4xl`

## Spacing

Use spacer utilities, not custom CSS.

Common section spacing:

- `p-y-spacer-sm`
- `p-y-spacer-md`
- `p-y-spacer-lg`
- `p-y-spacer-xl`

Common internal spacing:

- `p-all-spacer-xs`
- `p-all-spacer-sm`
- `p-all-spacer-md`
- `p-x-spacer-xs`
- `p-t-spacer-2xs`
- `p-t-spacer-xs`
- `p-t-spacer-sm`
- `p-b-spacer-md`

Common margin spacing:

- `m-t-spacer-3xs`
- `m-t-spacer-2xs`
- `m-t-spacer-xs`
- `m-t-spacer-sm`
- `m-t-spacer-md`
- `m-t-spacer-lg`
- `m-b-spacer-0`
- `m-b-spacer-2xs`
- `m-b-spacer-xs`
- `m-b-spacer-md`
- `m-x--auto`

Do not create new spacer classes. If the spacing looks wrong, choose a nearby existing spacer from the snippets.

## Typography

Use the system heading and body classes.

Primary headings:

- `abundance-heading-display` for large editorial display headings
- `si-heading-1` for homepage/major hero headings
- `si-heading-2` for section headings
- `si-heading-3` for subsection headings
- `si-heading-5` for card headings

Body text:

- `body--xl` for large quote or display copy
- `body--lg` for intro and main editorial copy
- `body--md` for standard card and UI copy
- `body-sm` for compact card/supporting copy
- `abundance-body-compact` for compact stats, metadata, and card descriptions

Labels and emphasis:

- `abundance-eyebrow` for short uppercase/label copy
- `abundance-stat` for large numeric values
- `abundance-action-text` for text CTAs inside cards
- `type-bold` for bold body text
- `brand-primary` for pink accent text
- `brand-secondary` for cyan/teal accent text

Recommended heading hierarchy:

```html
<h1 class="abundance-heading-display choke-700">Page heading</h1>
<p class="body--lg choke-600 m-t-spacer-sm">Introductory copy.</p>

<h2 class="si-heading-2 m-b-spacer-0">Section heading</h2>
<p class="body--lg m-t-spacer-sm m-b-spacer-0">Section copy.</p>

<h3 class="si-heading-3 m-t-spacer-lg m-b-spacer-0">Subsection heading</h3>
```

Do not use oversized display heading classes inside compact cards. Use `si-heading-5` for most card headings.

## Colour

Use background and text helper classes from the examples.

Background helpers:

- `bg-colour--white`
- `bg-colour--pink`
- `bg-colour--secondary`
- `bg-colour--yellow`
- `bg-colour--primary`
- `bg-colour--primary-surface`
- `bg-colour--yellow-surface`

Card colour helpers:

- `abundance-card--color-cyan`
- `abundance-card--color-yellow`
- `abundance-card--color-pink`
- `abundance-card--color-neutral-light`
- `abundance-card--soft`
- `abundance-card--soft-bordered`

Text helpers:

- `text-color--primary` for dark ink text, especially on colour backgrounds
- `brand-primary` for pink accent text
- `brand-secondary` for cyan/teal accent text

On pink, cyan/teal, and yellow sections, prefer dark ink text using `text-color--primary`. Do not use white text on bright colour backgrounds unless the source snippet already does so and contrast has been checked.

## Sections, Masks And Dividers

Use masks for large coloured bands on homepage-style pages:

```html
<div class="abundance-mask abundance-mask--top bg-colour--pink" aria-hidden="true"></div>
<section class="position-relative p-y-spacer-lg bg-colour--pink">
  ...
</section>
<div class="abundance-mask abundance-mask--bottom bg-colour--pink" aria-hidden="true"></div>
```

Use dividers for editorial/content page transitions:

```html
<div
  class="abundance-dividers abundance-dividers--rise-left bg-colour--pink"
  aria-hidden="true">
</div>
```

Divider direction options used in the examples:

- `abundance-dividers--rise-left`
- `abundance-dividers--rise-right`
- `abundance-dividers--fall-left`

Divider colours used in the examples:

- `bg-colour--pink`
- `bg-colour--secondary`
- `bg-colour--yellow`
- `bg-colour--primary-surface`

Horizontal rules:

```html
<hr class="si-horizontal-rule si-horizontal-rule--thick abundance-horizontal-rule--ink si-horizontal-rule--2xs">
```

Use `abundance-horizontal-rule--ink` when a dark ink line is required.

## Buttons And Links

Use the new `si-btn` system for buttons.

Preferred buttons:

```html
<a href="#" class="si-btn si-btn--primary si-btn--lg">Primary action</a>
<a href="#" class="si-btn si-btn--secondary si-btn--lg">Secondary action</a>
<a href="#" class="si-btn si-btn--tertiary si-btn--lg">Tertiary action</a>
```

Use `si-btn--tertiary` on pink or cyan/teal colour sections where the button needs to sit cleanly on colour.

For text-style links:

```html
<a class="si-btn-link abundance-action-text" href="#">Text action</a>
```

For chip-link navigation:

```html
<a class="abundance-chip-link abundance-action-text" href="#section-id">
  Section label
</a>
```

Avoid legacy button classes:

- `brand-btn`
- `brand-btn-primary`
- `brand-btn-secondary`
- `brand-btn-yellow`
- `btn-primary`
- `btn-secondary`
- `si-btn-primary`
- `si-btn-secondary`

If legacy HTML contains these, remap it to `si-btn si-btn--primary`, `si-btn si-btn--secondary`, or `si-btn si-btn--tertiary`.

## Cards

Use `si-card` for framed card surfaces.

Common card sizes:

- `si-card--2xs`
- `si-card--xs`
- `si-card--secondary`

Common card modifiers:

- `abundance-card--interactive`
- `card-with-main-action`
- `abundance-card--color-neutral-light`
- `abundance-card--soft`
- `abundance-card--soft-bordered`

Clickable card pattern:

```html
<a class="si-card si-card--xs abundance-card--interactive card-with-main-action h-100 text-decoration-none" href="#">
  <span class="abundance-eyebrow brand-secondary">Guide</span>
  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
  <h4 class="si-heading-5 m-b-spacer-0">Card heading</h4>
  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
  <p class="abundance-body-compact m-b-spacer-0">Card body copy.</p>
  <span class="abundance-action-text brand-primary m-t-spacer-xs">Read more</span>
</a>
```

Related link card pattern:

```html
<div class="abundance-related-link h-100">
  <div class="si-content">
    <a class="si-link main-card-action heading-5" href="#" aria-describedby="related-link-desc">
      Related link
    </a>
    <p id="related-link-desc">Related link body copy.</p>
  </div>
</div>
```

Warning list pattern:

Use the complete card group in:

```html
content/11-warning-list-blob-cards.html
```

Single warning item:

```html
atomic/04-warning-blob-card.html
```

## Colour Cards

Use colour cards for compact benefits, stats, and editorial emphasis.

Examples:

- `content/07-benefit-stack-colour-cards.html`
- `content/08-quick-view-stats-colour-cards.html`
- `atomic/02-benefit-colour-card.html`
- `atomic/03-stat-colour-card.html`

Use dark ink text on colour cards. Keep card headings compact, usually `si-heading-5`.

Do not overpad colour cards on desktop. Use the spacing shown in the snippets, with enough padding on mobile to avoid cramped text.

## Blobs

Use `abundance-blob` for numbered or decorative blob markers.

Colour modifiers:

- `abundance-blob--pink`
- `abundance-blob--yellow`
- `abundance-blob--cyan`
- `abundance-blob--light-grey`

Size modifiers:

- `abundance-blob--sm`
- `abundance-blob--md`
- `abundance-blob--lg`

Examples:

```html
<span class="abundance-blob abundance-blob--pink abundance-blob--md">1</span>
```

```html
<div class="abundance-blob abundance-blob--light-grey abundance-blob--md" style="color:#363635;">
  1
</div>
```

Use `style="color:#363635;"` only where needed to force dark blob numerals in prototype HTML.

## Forms And Inputs

Use the native form group/input structure.

Currency input:

```html
<div class="si-form-group abundance-form-group abundance-form-group--neutral">
  <label class="si-input-label" for="amount">Amount</label>
  <div class="si-input-wrapper">
    <input
      class="si-input si-input--has-prefix"
      min="0"
      inputmode="decimal"
      step="0.01"
      currency="GBP"
      id="amount"
      aria-describedby="amount-desc"
      type="number">
    <div class="si-input-prefix">£</div>
  </div>
</div>
```

Select:

```html
<div class="si-form-group abundance-form-group abundance-form-group--neutral">
  <label class="si-input-label" for="select-id">Label text</label>
  <select class="si-input" id="select-id">
    <option>Option A</option>
    <option>Option B</option>
  </select>
</div>
```

## Radio Cards

Use `abundance-radio-card` for large radio choices.

Primary radio cards use pink selection:

```html
<div class="abundance-radio-card abundance-radio-card--primary">
  ...
</div>
```

Secondary radio cards use cyan/teal selection:

```html
<div class="abundance-radio-card abundance-radio-card--secondary">
  ...
</div>
```

Use the exact markup pattern from:

- `atomic/06-radio-card-primary.html`
- `atomic/07-radio-card-secondary.html`
- `buy-flow/03-investment-type-radio-cards.html`
- `buy-flow/04-portfolio-type-radio-cards.html`

Use normal bullets inside radio card copy where needed. Do not invent coloured bullet components.

## Accordions

Use the Bootstrap collapse-compatible accordion structure from:

```html
content/10-accordion-faq-card.html
```

The header button should use:

```html
class="si-accordion-item__header-btn collapsed"
```

The collapsible region should use:

```html
class="accordion-collapse collapse"
```

The body should use:

```html
class="si-accordion-item__body"
```

Do not change the data attributes unless wiring different IDs.

## Tables

Use table examples from:

- `content/16-simple-terms-comparison-table-card.html`
- `atomic/13-simple-terms-table.html`
- `atomic/14-compact-history-table.html`

Tables should sit inside a card or a controlled content module. Do not leave dense tables floating without a wrapper.

## Bar Charts

Use bar chart rows from:

- `content/17-spend-allocation-bar-chart-card.html`
- `atomic/15-bar-chart-row.html`

For data-driven bars, inline width and colour values are acceptable because the CMS or page data can control them.

Example:

```html
<div class="abundance-bar-chart__bar-fill" style="width: 64%; background-color: #f27fae;"></div>
```

Do not create a custom class per data value.

## Images

Use native image classes and radius helpers.

Common patterns:

```html
<img class="img-fluid border-radius--3xl si-image" src="..." alt="">
```

Use `img-fluid` for responsive images. Use border radius helpers rather than custom CSS where possible.

For framed/editorial images, copy from:

- `homepage/09-image-frame-and-editorial-copy.html`
- `content/04-illustration-section-with-quote-and-note.html`

## Content Page Composition Recipe

For a new content page:

1. Start with `page-scaffolds/02-content-page-scaffold-with-chip-nav.html`.
2. Set the page `h1` and intro copy.
3. Update chip links to match the page sections.
4. Use `abundance-dividers` between major editorial modules.
5. Place regular editorial copy inside `choke-800 m-x--auto p-x-spacer-xs`.
6. Use complete content snippets for cards, warnings, accordions, tables, and council grids.
7. Keep section copy mostly `body--lg`.
8. Use `si-heading-2` for major sections and `si-heading-3` for subsections.
9. Use `si-card` variants for all framed content.

## Homepage Composition Recipe

For a new homepage:

1. Start with `page-scaffolds/01-homepage-page-scaffold.html`.
2. Use `si-heading-1` for the hero headline.
3. Use colour bands with matching `abundance-mask` top and bottom elements.
4. Use `text-color--primary` for text on pink, cyan/teal, and yellow backgrounds.
5. Use `si-btn--tertiary` for buttons on bright colour backgrounds.
6. Use `si-btn--primary` or `si-btn--secondary` on white backgrounds.
7. Use `homepage/12-cyan-related-links.html` for related link groups.
8. Use `homepage/13-use-of-funds-three-cards.html` and `homepage/17-investment-history-timeline.html` for data-rich sections.

## Buy Flow Composition Recipe

For buy-flow or decision-flow pages:

1. Use the complete flow snippets in `buy-flow/`.
2. Keep each frame in its own card-like page block.
3. Use `abundance-radio-card` for major user choices.
4. Use `si-form-group`, `si-input`, and `si-input-wrapper` for form fields.
5. Use white `si-card` surfaces for review/confirmation content unless a cyan summary card is specifically needed.
6. Use `si-btn si-btn--primary` for the main continue/proceed action and `si-btn si-btn--secondary` for back/change actions.

## Accessibility And Semantics

Use semantic HTML:

- `header` for page or frame headers
- `main` for primary page content
- `section` for major page sections
- `article` for self-contained cards
- `nav` with `aria-label` for navigation groups
- `button` for JS actions
- `a` for navigation links

For decorative masks, dividers and blobs:

```html
aria-hidden="true"
```

For cards with one main link, prefer wrapping the card in a single anchor only when the whole card is clickable.

For forms, every input needs a `label` or an accessible hidden label.

## What Not To Do

Do not:

- invent new class names
- use old `brand-btn` or `btn-primary` button families
- use old `abv2-*` component classes as a foundation
- create custom CSS for spacing that can be solved with spacer helpers
- create custom colour classes
- place text directly on colour backgrounds without checking contrast
- use white text on pink/cyan/yellow sections by default
- use huge heading classes inside compact cards
- mix multiple unrelated card systems in one component
- use a floating card inside another card

## Useful Complete References

Use these when unsure:

- `content/06-follow-on-reading-card-grid.html` for interactive card grids and chip-link navigation
- `content/11-warning-list-blob-cards.html` for warning/checklist cards
- `content/16-simple-terms-comparison-table-card.html` for tables
- `content/17-spend-allocation-bar-chart-card.html` for inline data visualisation
- `homepage/12-cyan-related-links.html` for related links on colour sections
- `homepage/13-use-of-funds-three-cards.html` for data/card combinations
- `buy-flow/03-investment-type-radio-cards.html` for radio choice cards
- `buy-flow/07-investment-review-summary.html` for review and confirmation panels

## Output Standard For AI Agents

When asked to generate a new design:

1. Pick the closest scaffold.
2. Compose from complete snippets first.
3. Use atomic snippets only for repeated small units.
4. Use only known class names from this briefing and the example HTML.
5. Keep markup readable and semantic.
6. If a required component is missing, state the missing capability clearly.
7. Do not silently invent CSS.
