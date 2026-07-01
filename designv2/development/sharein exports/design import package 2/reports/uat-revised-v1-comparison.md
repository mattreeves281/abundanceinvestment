# UAT Revised v1 CSS Comparison

Reference package: `designv2/sharein exports/design import package 2`

Candidate CSS: `designv2/sharein exports/uat revised v1.css`

Generated reference CSS: `/var/folders/3_/qpy6kcfs2hjfqm16prhb2n_80000gn/T/abundance-uat-css-compare/package2-reference.css`

## Summary

- HTML classes in package 2 examples: 251
- Reference classes audited: 278
- Candidate classes found: 4777
- Exact class-name matches: 209
- Non-exact fallback candidates: 31
- Unmatched / low-confidence classes: 38
- Raw missing reference `--abv2-*` custom properties: 99 (informational only; exact token names are not required)
- HTML token functions needing audit: 3

## Important Caveat

This is a machine first pass. Since class names are allowed to differ, non-exact matches are scored by declaration similarity within broad functional families. Treat high-confidence matches as likely fallbacks and low-confidence matches as manual audit items.

## HTML Token Function Coverage

This replaces the earlier raw custom-property failure lens. Exact `--abv2-*` property names are not required; what matters is whether package HTML styling can be rebuilt using available helper/component classes.

- **covered**: red/error text
  - HTML tokens: `--bs-red`
  - Candidate helpers: `.text-danger`
  - Notes: HTML warning placeholders can be expressed with Bootstrap text-danger.
- **covered**: separator border
  - HTML tokens: `--abv2-border-subtle`, `--abv2-border-soft`
  - Candidate helpers: `.si-horizontal-rule`, `.border-top`, `.border-bottom`
  - Notes: si-horizontal-rule is the closest Abundance helper; Bootstrap borders are also available for div-based separators.
- **covered**: pale neutral surface
  - HTML tokens: `--abv2-grey-very-light`
  - Candidate helpers: `.bg-colour--neutral--100`, `.body--offwhite`, `.bg-light`
  - Notes: Covers the inline pale panel background function.
- **covered**: white text
  - HTML tokens: `--abv2-white`
  - Candidate helpers: `.text-white`, `.text-color--invert-primary`
  - Notes: Available for dark/coloured surfaces.
- **needs-audit**: yellow action text
  - HTML tokens: `--abv2-yellow-dark`
  - Candidate helpers: `.text-warning`
  - Notes: Bootstrap text-warning exists if accepted as a compromise, but no exact Abundance yellow text helper was found.
- **needs-audit**: teal action text
  - HTML tokens: `--abv2-teal-dark`
  - Candidate helpers: `.text-info`
  - Notes: Bootstrap text-info exists if accepted as a compromise, but no exact Abundance teal text helper was found.
- **needs-audit**: bar-chart value and per-row colours
  - HTML tokens: `--abv2-bar-value`, `--abv2-bar-colour`, `--abv2-bar-text`, `--abv2-pink-light`, `--abv2-teal-light`, `--abv2-yellow-light`, `--abv2-indigo`, `--abv2-green`
  - Candidate helpers: `.abundance-bar-chart__bar`, `.abundance-bar-chart__bar-fill`, `.abundance-bar-chart__value`
  - Notes: Structural bar-chart classes are present under new names, but candidate CSS did not appear to consume value/colour variables or provide percentage/colour modifiers.

## HTML Token Usage Inventory

- bar-chart row value/colour: 10 occurrence(s); tokens `--abv2-bar-colour`, `--abv2-bar-text`, `--abv2-bar-value`, `--abv2-green`, `--abv2-indigo`, `--abv2-pink-light`, `--abv2-teal-light`, `--abv2-white`, `--abv2-yellow-light`
- pale surface background: 1 occurrence(s); tokens `--abv2-grey-very-light`
- separator border: 31 occurrence(s); tokens `--abv2-border-soft`, `--abv2-border-subtle`
- text colour --abv2-teal-dark: 2 occurrence(s); tokens `--abv2-teal-dark`
- text colour --abv2-yellow-dark: 3 occurrence(s); tokens `--abv2-yellow-dark`
- text colour --bs-red: 12 occurrence(s); tokens `--bs-red`

## Type And Card Primitive Audit

### Type Classes

- **present**: `.body--xs`
- **present**: `.body--sm`
- **present**: `.body--md`
- **present**: `.body--lg`
- **present**: `.body--xl`
- **present**: `.si-heading-1`
- **present**: `.si-heading-2`
- **present**: `.si-heading-3`
- **present**: `.si-heading-4`
- **present**: `.si-heading-5`
- **present**: `.si-heading-6`
- **present**: `.label--xs`
- **present**: `.label--sm`
- **present**: `.label--md`
- **present**: `.label--lg`
- **present**: `.abundance-eyebrow`
- **present**: `.abundance-body-compact`
- **present**: `.abundance-action-text`
- **present**: `.abundance-stat`
- **present**: `.abundance-heading-display`
- **missing**: `.abundance-card-copy`

### Core Card Classes

- **present**: `.si-card`
- **present**: `.si-card--primary`
- **present**: `.si-card--secondary`
- **present**: `.si-card--tertiary`
- **present**: `.si-card--0`
- **present**: `.si-card--2xs`
- **present**: `.si-card--xs`
- **present**: `.si-card--sm`
- **present**: `.si-card--md`
- **present**: `.si-card--lg`
- **present**: `.si-card--no-border-radius`
- **present**: `.si-card--full-height`

### Card Renames

- **renamed**: `.abundance-card-soft` -> `.abundance-card--soft`
- **renamed**: `.abundance-card-soft-bordered` -> `.abundance-card--soft-bordered`
- **renamed**: `.abundance-colour-card` -> `.abundance-card--color-card`
- **renamed**: `.abundance-colour-card-neutral` -> `.abundance-card--color-neutral`
- **renamed**: `.abundance-colour-card-pink` -> `.abundance-card--color-pink`
- **renamed**: `.abundance-colour-card-teal` -> `.abundance-card--color-teal`
- **renamed**: `.abundance-colour-card-yellow` -> `.abundance-card--color-yellow`
- **renamed**: `.abundance-colour-card-green` -> `.abundance-card--color-green`
- **renamed**: `.abundance-colour-card-pink-light` -> `.abundance-card--color-pink-light`
- **renamed**: `.abundance-colour-card-teal-light` -> `.abundance-card--color-teal-light`

### Primitive Notes

- abundance-card-copy is used in package HTML and was not found in the candidate CSS.
- Type classes are generally present, but the machine check does not assert exact letter-spacing parity.
- si-card variants are present, but the base shell should be visually audited because legacy rules also target si-card.

## Unmatched / Low-Confidence Classes

- `.abundance-boxout` (cards/panels, used in HTML)
- `.abundance-boxout--compact` (cards/panels, used in HTML)
- `.abundance-boxout--teal` (cards/panels, used in HTML)
- `.abundance-boxout--yellow` (cards/panels, used in HTML)
- `.abundance-btn-white` (buttons/links, used in HTML)
- `.abundance-buy-invest-item` (buy-flow, used in HTML)
- `.abundance-buy-invest-item__amount` (buy-flow, used in HTML)
- `.abundance-buy-invest-item__amount-grid` (buy-flow, used in HTML)
- `.abundance-buy-invest-item__main` (buy-flow, used in HTML)
- `.abundance-buy-invest-list` (buy-flow, used in HTML)
- `.abundance-buy-step` (buy-flow, used in HTML)
- `.abundance-card-blob-num` (cards/panels, used in HTML)
- `.abundance-card-copy` (type/colour, used in HTML)
- `.abundance-chip-link` (buttons/links, used in HTML)
- `.abundance-ed-figure` (media/masks, used in HTML)
- `.abundance-field-white` (forms, used in HTML)
- `.abundance-field-white--select` (forms, used in HTML)
- `.abundance-field-white__prefix` (forms, used in HTML)
- `.abundance-hero-art-nudge` (other, used in HTML)
- `.abundance-link-card` (buttons/links, used in HTML)
- `.abundance-media-frame` (media/masks, used in HTML)
- `.abundance-media-frame--case-square` (media/masks, used in HTML)
- `.abundance-media-frame--editorial` (media/masks, used in HTML)
- `.abundance-media-frame--square` (media/masks, used in HTML)
- `.abundance-media-frame--wide` (media/masks, used in HTML)
- `.abundance-mock-spacer` (other, used in HTML)
- `.abundance-route-choice__list` (buy-flow, used in HTML)
- `.abundance-step-num` (buy-flow, used in HTML)
- `.abundance-step-num--lg` (buy-flow, used in HTML)
- `.abundance-support-link` (buttons/links, used in HTML)
- `.abundance-warning-list` (editorial/accordion, used in HTML)
- `.abundance-warning-list__item` (editorial/accordion, used in HTML)
- `.abundance-warning-list__item--soft` (editorial/accordion, used in HTML)
- `.bg-colour--abundance-white-soft` (layout/helper)
- `.bg-colour--yellow` (layout/helper, used in HTML)
- `.bg-mask--abundance-footer-peak` (layout/helper, used in HTML)
- `.si-accordion-item__header` (editorial/accordion, used in HTML)
- `.text-colour--yellow` (layout/helper, used in HTML)

## Likely Old -> New Fallbacks

- `.abundance-bar-chart__fill` -> `.abundance-bar-chart__bar-fill` (0.9) [used in HTML]
- `.abundance-bar-chart__track` -> `.abundance-bar-chart__bar` (0.9) [used in HTML]
- `.abundance-card-soft` -> `.abundance-card--soft` (0.9) [used in HTML]
- `.abundance-card-soft-bordered` -> `.abundance-card--soft-bordered` (0.9) [used in HTML]
- `.abundance-colour-card` -> `.abundance-card--color-card` (0.9)
- `.abundance-colour-card-green` -> `.abundance-card--color-green` (0.9) [used in HTML]
- `.abundance-colour-card-neutral` -> `.abundance-card--color-neutral` (0.9) [used in HTML]
- `.abundance-colour-card-pink` -> `.abundance-card--color-pink` (0.9) [used in HTML]
- `.abundance-colour-card-pink-light` -> `.abundance-card--color-pink-light` (0.9) [used in HTML]
- `.abundance-colour-card-teal` -> `.abundance-card--color-teal` (0.9) [used in HTML]
- `.abundance-colour-card-teal-light` -> `.abundance-card--color-teal-light` (0.9) [used in HTML]
- `.abundance-colour-card-yellow` -> `.abundance-card--color-yellow` (0.9) [used in HTML]
- `.abundance-ed-band` -> `.abundance-dividers` (0.9) [used in HTML]
- `.abundance-ed-band--loose` -> `.abundance-dividers` (0.9) [used in HTML]
- `.abundance-ed-band--tight` -> `.abundance-dividers` (0.9) [used in HTML]
- `.abundance-ed-note` -> `.abundance-note` (0.9) [used in HTML]
- `.abundance-ed-quote` -> `.abundance-quote` (0.9) [used in HTML]
- `.abundance-inline-disclaimer` -> `.abundance-disclaimer` (0.9) [used in HTML]
- `.abundance-route-choice` -> `.abundance-radio-card` (0.9) [used in HTML]
- `.abundance-route-choice--pink` -> `.abundance-radio-card--primary` (0.9) [used in HTML]
- `.abundance-route-choice--teal` -> `.abundance-radio-card--secondary` (0.9) [used in HTML]
- `.abundance-route-choice__card` -> `.abundance-radio-card__label` (0.9) [used in HTML]
- `.abundance-route-choice__input` -> `.abundance-radio-card__input` (0.9) [used in HTML]
- `.abundance-route-choice__rule` -> `.abundance-radio-card__indicator` (0.9) [used in HTML]
- `.abundance-route-choice__tick` -> `.abundance-radio-card__tick` (0.9) [used in HTML]
- `.bg-blob--abundance-dot` -> `.abundance-blob` (0.9) [used in HTML]
- `.bg-mask--abundance-bottom` -> `.abundance-mask--bottom` (0.9) [used in HTML]
- `.bg-mask--abundance-ed-fall` -> `.abundance-dividers--fall-left` (0.9) [used in HTML]
- `.bg-mask--abundance-ed-right` -> `.abundance-dividers--rise-right` (0.9) [used in HTML]
- `.bg-mask--abundance-ed-rise` -> `.abundance-dividers--rise-left` (0.9) [used in HTML]
- `.bg-mask--abundance-top` -> `.abundance-mask--top` (0.9) [used in HTML]

## Raw Missing Reference Custom Properties

Informational only. These are no longer treated as direct failures because the migration target may expose equivalent helper classes instead of preserving the `--abv2-*` property names.

- `--abv2-bg`
- `--abv2-blue`
- `--abv2-border-default`
- `--abv2-border-soft`
- `--abv2-border-strong`
- `--abv2-border-subtle`
- `--abv2-green`
- `--abv2-grey`
- `--abv2-grey-light`
- `--abv2-grey-ui`
- `--abv2-grey-very-light`
- `--abv2-indigo`
- `--abv2-ink`
- `--abv2-ink-a04`
- `--abv2-ink-a05`
- `--abv2-ink-a06`
- `--abv2-ink-a08`
- `--abv2-ink-a10`
- `--abv2-ink-a12`
- `--abv2-ink-a14`
- `--abv2-ink-a18`
- `--abv2-ink-a35`
- `--abv2-ink-a62`
- `--abv2-ink-a72`
- `--abv2-ink-a78`
- `--abv2-ink-rgb`
- `--abv2-pink`
- `--abv2-pink-a05`
- `--abv2-pink-a07`
- `--abv2-pink-a08`
- `--abv2-pink-a12`
- `--abv2-pink-a18`
- `--abv2-pink-a34`
- `--abv2-pink-a45`
- `--abv2-pink-a62`
- `--abv2-pink-dark`
- `--abv2-pink-light`
- `--abv2-pink-rgb`
- `--abv2-route-accent`
- `--abv2-route-bg`
- `--abv2-sans`
- `--abv2-serif`
- `--abv2-shadow-card`
- `--abv2-shadow-default`
- `--abv2-shadow-soft`
- `--abv2-space-10`
- `--abv2-space-12`
- `--abv2-space-14`
- `--abv2-space-16`
- `--abv2-space-2`
- `--abv2-space-20`
- `--abv2-space-22`
- `--abv2-space-24`
- `--abv2-space-28`
- `--abv2-space-32`
- `--abv2-space-4`
- `--abv2-space-40`
- `--abv2-space-48`
- `--abv2-space-56`
- `--abv2-space-6`
- `--abv2-space-64`
- `--abv2-space-72`
- `--abv2-space-8`
- `--abv2-space-84`
- `--abv2-space-96`
- `--abv2-teal`
- `--abv2-teal-a06`
- `--abv2-teal-a10`
- `--abv2-teal-a12`
- `--abv2-teal-a16`
- `--abv2-teal-a22`
- `--abv2-teal-a38`
- `--abv2-teal-dark`
- `--abv2-teal-light`
- `--abv2-teal-rgb`
- `--abv2-teal-very-light`
- `--abv2-text`
- `--abv2-ui`
- `--abv2-white`
- `--abv2-white-a06`
- `--abv2-white-a08`
- `--abv2-white-a12`
- `--abv2-white-a14`
- `--abv2-white-a16`
- `--abv2-white-a18`
- `--abv2-white-a20`
- `--abv2-white-a22`
- `--abv2-white-a28`
- `--abv2-white-a62`
- `--abv2-white-a72`
- `--abv2-white-a84`
- `--abv2-white-rgb`
- `--abv2-yellow`
- `--abv2-yellow-a14`
- `--abv2-yellow-a20`
- `--abv2-yellow-a24`
- `--abv2-yellow-dark`
- `--abv2-yellow-light`
- `--abv2-yellow-rgb`

## Changed Custom Properties

None.

## Outputs

- Full class mapping CSV: `uat-revised-v1-class-mapping.csv`
- Machine-readable JSON: `uat-revised-v1-comparison.json`
