# Internal HTML Class Mapping Notes

This is the working memory for rebuilding the design package HTML against UAT revised v1 CSS.

Do not share this as the supplier-facing additions report. It preserves old-class to new-pattern decisions so the HTML can be remapped later without reopening each audit thread.

## Mapping Decisions

| Old HTML class / group | Rewrite decision | New UAT class / pattern |
|---|---|---|
| `.abundance-card-copy` | Remove/ignore when inside cards | Use default `.si-card` copy styling |
| `.si-accordion-item__header` | Replace wrapper class | `.si-accordion-item` |
| `.abundance-boxout` | Replace with bordered white card | `.si-card si-card--secondary p-all-spacer-md` |
| `.abundance-boxout--compact` | Replace with smaller padding | Use `p-all-spacer-sm` instead of `p-all-spacer-md` |
| `.abundance-boxout--teal` | Replace once UAT adds soft colour-card variant | `.abundance-card--color-teal-very-light p-all-spacer-md` |
| `.abundance-boxout--yellow` | Replace once UAT adds soft colour-card variant | `.abundance-card--color-yellow-light p-all-spacer-md` |
| `.abundance-boxout--yellow.abundance-boxout--compact` | Replace once UAT adds soft colour-card variant | `.abundance-card--color-yellow-light p-all-spacer-sm` |
| `.abundance-link-card` | Replace with composite card pattern | `.si-card si-card--md abundance-card--interactive card-with-main-action h-100` |
| `.abundance-chip-link` | Replace after agreed UAT addition lands | `.abundance-chip-link` or final agreed chip-link class name |
| `.abundance-btn-white` | Do not map | Use existing accessible UAT button variants |
| `.abundance-field-white` | Do not map | Use existing UAT form controls |
| `.abundance-field-white--select` | Do not map | Use existing UAT select/form-control styling |
| `.abundance-field-white__prefix` | Do not map | Use existing UAT input group/prefix pattern if needed |
| `.abundance-warning-list` | Replace with generic layout | `.display--flex flex-direction--column flex-gap--sm` |
| `.abundance-warning-list__item` | Replace with card plus inner flex row | Outer: `.si-card si-card--2xs abundance-card--color-neutral-light`; inner: `.display--flex flex-align-content--start flex-gap--sm` |
| `.abundance-warning-list__item--soft` | Replace with neutral-light colour card | `.abundance-card--color-neutral-light` |
| `.abundance-buy-invest-list` | Do not map in static HTML rewrite unless needed | Covered inside React app |
| `.abundance-buy-invest-item` | Do not map in static HTML rewrite unless needed | Covered inside React app |
| `.abundance-buy-invest-item__main` | Do not map in static HTML rewrite unless needed | Covered inside React app |
| `.abundance-buy-invest-item__amount` | Do not map in static HTML rewrite unless needed | Covered inside React app |
| `.abundance-buy-invest-item__amount-grid` | Do not map in static HTML rewrite unless needed | Covered inside React app |
| `.abundance-card-blob-num` | Replace with base blob | `.abundance-blob abundance-blob--yellow/pink/teal` |
| `.abundance-step-num` | Replace after UAT blob size modifier lands | `.abundance-blob abundance-blob--[colour] abundance-blob--md` |
| `.abundance-step-num--lg` | Replace after UAT blob size modifier lands | `.abundance-blob abundance-blob--[colour] abundance-blob--lg` |
| `.bg-colour--yellow` | Keep once UAT helper lands | `.bg-colour--yellow` |
| `.text-colour--yellow` | Do not map | Avoid; fails accessibility |
| `.bg-mask--abundance-footer-peak` | Replace with UAT footer mask | `.footer-mask` |
| `.abundance-media-frame` | Replace wrapper frame with UAT image classes on the image itself | `.si-image si-image--3-2 border-radius--4xl` or `.si-image si-image--4-3 border-radius--4xl`, depending crop |
| `.abundance-media-frame--wide` | Replace with UAT image aspect/radius helpers | `.si-image si-image--3-2 border-radius--4xl` |
| `.abundance-media-frame--editorial` | Replace with UAT image aspect/radius helpers | `.si-image si-image--3-2 border-radius--4xl` |
| `.abundance-media-frame--square` | Replace with UAT square image helper | `.si-image si-image--1-1 border-radius--4xl` or `.si-image si-image--1-1 border-radius--5xl`, depending desired fidelity |
| `.abundance-media-frame--case-square` | Replace with UAT square image helper and largest radius | `.si-image si-image--1-1 border-radius--5xl` |
| `.abundance-ed-figure` | Keep as semantic `figure`; map image frame inside it | Use UAT image classes for image; retain/replace caption spacing with existing text/layout helpers if required |
| `.abundance-bar-chart__track` | Replace with UAT bar track class | `.abundance-bar-chart__bar` |
| `.abundance-bar-chart__fill` | Replace with UAT fill class and move dynamic values inline | `.abundance-bar-chart__bar-fill` with inline `width: NN%; background-color: #hex;` |
| `--abv2-bar-value` | Do not use in rewritten HTML | CMS-managed inline `width: NN%;` on `.abundance-bar-chart__bar-fill` |
| `--abv2-bar-colour` | Do not use in rewritten HTML | CMS-managed inline `background-color: #hex;` on `.abundance-bar-chart__bar-fill` |
| `--abv2-bar-text` | Avoid if possible | Use UAT `.abundance-bar-chart__value` treatment and accessible text colour/placement |
| Page/body white background | Add page-level background helper during rewrite | Prefer `.bg-color--primary` or `.bg-colour--white`; use `.bg-white` only if an override is needed |

## Notes For Later Rewrite

- Do not change HTML yet.
- Re-check final UAT class names after the agreed additions land, especially chip link and blob size modifiers.
- Re-check final radius utility values after the agreed image-radius extension lands. Working assumption: `.border-radius--4xl` becomes `36px` and `.border-radius--5xl` is added at `48px`.
- Rewrite bar chart rows to use UAT `__bar` / `__bar-fill` / `__value` structure. Bar fill width and colour should be inline literals managed by CMS, not old `--abv2-*` custom properties.
- Add a page/frame white background helper in the HTML rewrite where needed. Preferred class is `.bg-color--primary`; `.bg-colour--white` is also available. Avoid `.bg-white` unless `!important` is required.
- The buy/investment list pattern is currently out of scope for static HTML mapping because it is covered inside the React app.
- Type/spec parity snags are tracked separately in `uat-type-spec-snag-report.md`; they are not blockers for remapping HTML classes.
