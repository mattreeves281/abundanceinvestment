# Abundance CMS Builder Guide

This guide explains how the new Abundance page HTML is assembled using two layers:

- **Existing UAT/platform classes** for layout, spacing, grids, type, buttons, cards, forms and standard helpers.
- **New Abundance classes** for visual treatments that are specific to the new page system.

It is intended for CMS editors, developers and AI tools generating new page blocks from the supplied FINAL HTML examples.

Reference HTML:

- `html/FINAL - homepage.html`
- `html/FINAL - content.html`
- `html/FINAL - buy.html`

Reference CSS:

- `css new components/_new-helpers.scss`
- `css new components/_new-landing-page-assets.scss`
- `css new components/_new-content-page-assets.scss`
- `css new components/_new-buy-final.scss`

## 1. Core Principle

Use platform/UAT helper classes first.

Only use `abundance-*` classes where the layout or visual treatment is genuinely new to the Abundance system, such as:

- page masks
- dot/blob motifs
- media frames
- editorial bands
- route-choice cards
- colour cards
- specialist card/link treatments
- compact Abundance text roles

Do not create new component CSS for normal layout, columns, spacing, text sizing, centring or buttons if an existing platform helper already exists.

## 2. Page Structure

A typical page is built from full-width sections:

```html
<div class="bg-white">
  <section class="position-relative p-y-spacer-lg bg-colour--white">
    <div class="container">
      ...
    </div>
  </section>
</div>
```

Use:

- `bg-white` on the outer wrapper when the whole page should sit on white.
- `section` for each major page band.
- `position-relative` on sections that contain masks, blobs, overlapping art or positioned assets.
- `bg-colour--white`, `bg-colour--primary`, `bg-colour--secondary`, `bg-colour--yellow` for section backgrounds.
- `p-y-spacer-*`, `p-t-spacer-*`, `p-b-spacer-*` for vertical rhythm.

## 3. Containers, Rails And Chokes

Use platform containers and choke helpers for page width.

Common patterns:

```html
<div class="container">
  ...
</div>
```

```html
<div class="container-medium p-x-spacer-xs">
  ...
</div>
```

```html
<div class="choke-1000 m-x--auto p-x-spacer-xs">
  ...
</div>
```

```html
<div class="choke-700 mx-0">
  ...
</div>
```

Use:

- `container` for standard platform width.
- `container-medium` for a slightly narrower page rail.
- `choke-300` through `choke-1200` for precise content width.
- `m-x--auto` or `mx-auto` for horizontal centring.
- `p-x-spacer-xs` to protect content from viewport edges.

Avoid creating new wrapper classes just to set `max-width`, `width` or horizontal padding.

## 4. Grid And Columns

Use the platform grid:

```html
<div class="row gx-md gy-md align-items-center">
  <div class="col-12 col-md-6">...</div>
  <div class="col-12 col-md-6">...</div>
</div>
```

Common grid helpers:

- `row`
- `col-12`
- `col-md-4`, `col-md-5`, `col-md-6`, `col-md-7`, `col-md-8`
- `offset-md-1`
- `row-cols-1`
- `row-cols-sm-2`
- `row-cols-md-2`, `row-cols-md-3`, `row-cols-md-4`
- `row-cols-lg-3`, `row-cols-lg-4`
- `gx-*`, `gy-*`, `g-*` for gutters

Example 3-up card or feature layout:

```html
<div class="row row-cols-1 row-cols-md-3 gy-md gx-md">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

## 5. Spacing

Use platform spacer helpers, not component-local margin/padding.

Common vertical spacing:

- `p-y-spacer-sm`
- `p-y-spacer-md`
- `p-y-spacer-lg`
- `p-y-spacer-xl`
- `m-t-spacer-xs`
- `m-t-spacer-sm`
- `m-t-spacer-md`
- `m-b-spacer-0`
- `m-b-spacer-xs`
- `m-b-spacer-md`
- `m-b-spacer-lg`

Small structural gaps often use empty spacer divs in CMS HTML:

```html
<div class="p-t-spacer-2xs" aria-hidden="true"></div>
```

This is acceptable where the CMS cannot easily apply spacing to the next element. Mark these spacer divs `aria-hidden="true"`.

## 6. Typography

Use platform type helpers for most text.

Headings:

```html
<h1 class="si-heading-1">...</h1>
<h2 class="si-heading-2">...</h2>
<h3 class="si-heading-3">...</h3>
<h3 class="si-heading-5">Card heading</h3>
```

Body text:

```html
<p class="body--lg text-choke--640 m-t-spacer-xs">...</p>
<p class="body--md m-b-spacer-0">...</p>
```

New Abundance text roles:

```html
<p class="abundance-eyebrow brand-primary m-b-spacer-2xs">Article body</p>
<p class="abundance-body-compact m-b-spacer-0">Compact supporting copy.</p>
<span class="abundance-action-text brand-primary">Read guide</span>
<div class="abundance-stat text-white">£9.6m</div>
<h1 class="abundance-heading-display choke-700">...</h1>
```

Use `text-white`, `brand-primary`, `brand-secondary`, `type-black` and `text-colour--yellow` for colour. Do not add inline colour unless there is no helper.

Do not put spacing into type classes. Combine type classes with spacing helpers.

## 7. Buttons

Use platform button structure:

```html
<a href="#" class="si-btn si-btn--primary si-btn--lg">Continue</a>
<a href="#" class="si-btn si-btn--secondary si-btn--lg">Back</a>
```

Use the new white outline role on coloured sections:

```html
<a href="#" class="si-btn abundance-btn-white si-btn--lg">Learn More</a>
```

Rule of thumb:

- `si-btn` is the base.
- `si-btn--lg` controls size.
- `si-btn--primary` / `si-btn--secondary` control standard variants.
- `abundance-btn-white` is for white text and white outline on coloured Abundance backgrounds.

## 8. Cards And Panels

Use platform cards for normal card shells:

```html
<article class="si-card si-card--secondary p-all-spacer-md">
  ...
</article>
```

Common platform card pattern:

```html
<section class="si-card si-card--secondary si-card--md">
  ...
</section>
```

Use Abundance card classes for new visual roles:

```html
<article class="abundance-card-soft">
  ...
</article>
```

```html
<article class="abundance-link-card h-100">
  <span class="abundance-eyebrow brand-secondary">Guide</span>
  <h2 class="si-heading-4 m-b-spacer-0">...</h2>
  <p class="body--md m-b-spacer-0">...</p>
  <span class="abundance-action-text brand-primary m-t-spacer-xs">Read guide</span>
</article>
```

Colour cards are finite Abundance components:

```html
<article class="abundance-colour-card-pink">
  <p class="abundance-eyebrow">Primary</p>
  <p class="abundance-body-compact m-t-spacer-2xs m-b-spacer-0">...</p>
</article>
```

Available colour-card roles:

- `abundance-colour-card-neutral`
- `abundance-colour-card-pink`
- `abundance-colour-card-teal`
- `abundance-colour-card-yellow`
- `abundance-colour-card-green`
- `abundance-colour-card-pink-light`
- `abundance-colour-card-teal-light`

## 9. Masks And Coloured Bands

Masked page sections use a mask element before and after the coloured section.

```html
<span class="bg-colour--primary bg-mask bg-mask--abundance-top" aria-hidden="true"></span>

<section class="position-relative p-y-spacer-lg bg-colour--primary">
  ...
</section>

<span class="bg-colour--primary bg-mask bg-mask--abundance-bottom" aria-hidden="true"></span>
```

Rules:

- Use the same `bg-colour--*` on the mask and the section.
- Add `aria-hidden="true"` to decorative mask spans.
- Use `bg-mask--abundance-top` above the section.
- Use `bg-mask--abundance-bottom` below the section.

Editorial band masks use:

```html
<div
  class="abundance-ed-band brand-primary abundance-ed-band--tight bg-mask--abundance-ed-rise"
  aria-hidden="true">
</div>
```

Editorial mask options:

- `bg-mask--abundance-ed-rise`
- `bg-mask--abundance-ed-fall`
- `bg-mask--abundance-ed-right`
- `abundance-ed-band--tight`
- `abundance-ed-band--loose`

## 10. Blobs, Step Numbers And Motifs

Use platform `bg-blob` with the new Abundance dot mask:

```html
<span
  class="bg-blob bg-blob--abundance-dot bg-colour--primary abundance-step-num abundance-step-num--lg mx-auto mx-md-0 m-b-spacer-xs"
  aria-hidden="true">
  1
</span>
```

Colour comes from the background helper:

- `bg-colour--primary`
- `bg-colour--secondary`
- `bg-colour--yellow`
- `bg-colour--neutral--300`

Number sizes:

- `abundance-step-num`
- `abundance-step-num--lg`
- `abundance-card-blob-num`

Use blobs as decorative content with `aria-hidden="true"` unless the number or icon is meaningful.

## 11. Media And Images

Use platform image helpers for ordinary responsive images:

```html
<img class="img-fluid" src="..." alt="" loading="lazy">
```

Use Abundance media frames for shaped/cropped page images:

```html
<div class="abundance-media-frame">
  <img class="img-responsive" src="..." alt="">
</div>
```

Available media frame modifiers:

- `abundance-media-frame--square`
- `abundance-media-frame--wide`
- `abundance-media-frame--case-square`
- `abundance-media-frame--editorial`

Always provide useful `alt` text for meaningful images. Use `alt=""` for decorative images.

## 12. Editorial Page Pattern

Editorial pages use a narrower reading rail with occasional visual breaks.

```html
<section class="position-relative p-y-spacer-md">
  <div class="choke-1000 m-x--auto p-x-spacer-xs">
    <div class="row gx-0 gy-0 align-items-start">
      <div class="col-12 col-md-8 offset-md-1 position-relative">
        <div class="choke-700 mx-0">
          <p class="abundance-eyebrow brand-secondary m-b-spacer-2xs">Article body</p>
          <h2 class="si-heading-2 m-b-spacer-0">...</h2>
          <p class="body--lg m-t-spacer-sm m-b-spacer-0">...</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

Editorial support components:

- `abundance-ed-quote`
- `abundance-ed-note`
- `abundance-ed-figure`
- `abundance-inline-disclaimer`
- `abundance-warning-list`
- `abundance-chip-link`
- `abundance-related-link`

## 13. Buy Flow Pattern

Buy flow steps are wrapped in `abundance-buy-step` and use platform card/form controls.

```html
<div class="abundance-buy-step" aria-labelledby="buy-step-title">
  <div class="choke-800 m-x--auto p-x-spacer-xs p-y-spacer-xl">
    <section class="si-card si-card--secondary si-card--md" aria-labelledby="buy-step-title">
      <header>
        <h1 id="buy-step-title" class="si-heading-1 m-b-spacer-0">Before you invest</h1>
      </header>
    </section>
  </div>
</div>
```

Use platform forms:

```html
<form class="si-form">
  <fieldset class="si-fieldset">
    <legend class="si-fieldset__legend">
      <span class="abundance-eyebrow brand-primary">1/2</span>
      <span class="si-heading-4 d-block">Question text</span>
    </legend>

    <div class="si-fieldset__input-container si-fieldset__input-container--vertical">
      <div class="si-choice-form-group">
        <input class="si-input si-choice-form-group__input" type="radio">
        <div class="si-choice-form-group__labels-container">
          <label class="si-choice-form-group__label body--md">...</label>
        </div>
      </div>
    </div>
  </fieldset>
</form>
```

Use new route-choice cards only for the bespoke investment route selector:

```html
<label class="abundance-route-choice abundance-route-choice--pink" for="investment-type-regular">
  <input class="abundance-route-choice__input" type="radio" name="investment_type">
  <span class="abundance-route-choice__card">
    <span class="si-heading-4 m-b-spacer-0">Make a regular investment</span>
    <span class="abundance-route-choice__rule" aria-hidden="true"></span>
    <span class="body--md">...</span>
    <span class="abundance-route-choice__tick" aria-hidden="true"></span>
  </span>
</label>
```

## 14. Tables And Data

Use platform table classes:

```html
<table class="si-table si-table--sm si-table--sm-compact si-table--borders-between-rows">
  ...
</table>
```

Use an Abundance wrapper only where a new surrounding treatment is required, such as:

- `abundance-bar-chart`
- `abundance-council-uof-bars`
- `abundance-buy-invest-list`

## 15. Accessibility Rules

Use semantic HTML first:

- Use real headings in order.
- Use `section`, `article`, `header`, `figure`, `figcaption`, `blockquote`, `cite`, `form`, `fieldset`, `legend`.
- Add `aria-labelledby` where a section/card is titled by an internal heading.
- Use `sr-only` for screen-reader-only instructions.
- Mark decorative masks, blobs and spacers with `aria-hidden="true"`.
- Use empty `alt=""` only for decorative images.

## 16. AI / CMS Generation Rules

When generating a new page or block:

1. Start with the nearest existing FINAL HTML block.
2. Keep UAT/platform classes for layout, grid, spacing, type and forms.
3. Use `abundance-*` only for the specific visual/component role.
4. Do not invent new class names.
5. Do not add inline styles unless the FINAL examples already use them for one-off decorative positioning.
6. Keep class combinations explicit in HTML.
7. Prefer `si-heading-*`, `body--*`, `si-btn`, `si-card`, `row`, `col-*`, `choke-*`, `p-y-spacer-*`, `m-t-spacer-*`.
8. Use `aria-hidden="true"` on purely decorative elements.
9. Do not move spacing into type classes.
10. If a platform helper can do the job, use the platform helper.

## 17. Quick Pattern Library

### Standard White Section

```html
<section class="position-relative p-y-spacer-md bg-colour--white">
  <div class="container-medium p-x-spacer-xs">
    <h2 class="si-heading-2">Section heading</h2>
    <p class="body--lg text-choke--640 m-t-spacer-xs">Section copy.</p>
  </div>
</section>
```

### Masked Colour Section

```html
<span class="bg-colour--secondary bg-mask bg-mask--abundance-top" aria-hidden="true"></span>
<section class="position-relative p-y-spacer-lg bg-colour--secondary">
  <div class="container">
    <h2 class="si-heading-2 text-white">Heading</h2>
    <p class="body--lg text-white text-choke--640">Copy.</p>
  </div>
</section>
<span class="bg-colour--secondary bg-mask bg-mask--abundance-bottom" aria-hidden="true"></span>
```

### Two-Column Media And Copy

```html
<div class="row gy-md gx-md align-items-center">
  <div class="col-12 col-md-5">
    <div class="abundance-media-frame">
      <img class="img-responsive" src="..." alt="">
    </div>
  </div>
  <div class="col-12 col-md-7">
    <h2 class="si-heading-2">Heading</h2>
    <p class="body--lg text-choke--640 m-t-spacer-xs">Copy.</p>
  </div>
</div>
```

### Card Grid

```html
<div class="row row-cols-1 row-cols-md-3 gy-md gx-md">
  <div>
    <article class="si-card si-card--secondary p-all-spacer-md h-100">
      <h3 class="si-heading-5 m-b-spacer-0">Card title</h3>
      <p class="body--md m-t-spacer-2xs m-b-spacer-0">Card copy.</p>
    </article>
  </div>
</div>
```

### Link Card

```html
<a class="abundance-link-card h-100" href="#">
  <span class="abundance-eyebrow brand-primary">Guide</span>
  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
  <h3 class="si-heading-4 m-b-spacer-0">Link title</h3>
  <div class="p-t-spacer-3xs" aria-hidden="true"></div>
  <p class="body--md m-b-spacer-0">Link description.</p>
  <span class="abundance-action-text brand-primary m-t-spacer-xs">Read guide</span>
</a>
```

## 18. Final Checklist

Before publishing or handing a block to CMS:

- Does every layout use platform grid/container/choke classes?
- Are headings using `si-heading-*` or approved Abundance display roles?
- Are paragraphs using `body--*` or approved compact roles?
- Are buttons built from `si-btn` plus size/variant?
- Are custom `abundance-*` classes limited to real Abundance components?
- Are masks paired correctly above and below coloured sections?
- Are decorative elements hidden from assistive tech?
- Are image `alt` attributes correct?
- Are there no invented class names?
- Are inline styles limited to exceptional decorative positioning?
