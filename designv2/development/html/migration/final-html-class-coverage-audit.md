# FINAL HTML Class Coverage Audit

Source HTML files checked:

- `designv2/html/migration/FINAL - homepage.html`
- `designv2/html/migration/FINAL - content.html`
- `designv2/html/migration/FINAL - buy.html`

Class sources checked:

- UAT compiled CSS: `designv2/incoming/abundanceuat-css.css`
- v3 config primitives: `designv2/config/v3/type v2.scss`, `buttons v2.scss`, `card v2.scss`, `_config abundance revised v2.scss`
- New handover SCSS: non-experiment handover partials, including helpers, type, cards, landing/content/buy assets, dirty overrides and modal partial

## Result

No misses found after correction.

| Source | Distinct classes covered |
| --- | ---: |
| UAT/platform CSS | 174 |
| v3 config primitives | 16 |
| New SCSS elements | 70 |
| Missing | undefined |
| Total HTML classes | 260 |

## Corrections Made During Audit

- Replaced `m-x-0` with UAT-native `mx-0` in `FINAL - content.html`. UAT has `.mx-0`, `.mx-md-0` and `.m-x--auto`, but not `.m-x-0`.
- Added a minimal `.abundance-buy-step { display:block; }` rule to `designv2/scss handover/_new-buy-final.scss` so the buy-step wrapper used in `FINAL - buy.html` is formally covered by the new SCSS elements.

## New SCSS Classes Used By The Pages

- `abundance-bar-chart`
- `abundance-bar-chart__fill`
- `abundance-bar-chart__label`
- `abundance-bar-chart__row`
- `abundance-bar-chart__track`
- `abundance-boxout`
- `abundance-boxout--compact`
- `abundance-boxout--teal`
- `abundance-boxout--yellow`
- `abundance-buy-invest-item`
- `abundance-buy-invest-item__amount`
- `abundance-buy-invest-item__amount-grid`
- `abundance-buy-invest-item__main`
- `abundance-buy-invest-list`
- `abundance-buy-step`
- `abundance-card-blob-num`
- `abundance-chip-link`
- `abundance-council-quote`
- `abundance-council-uof-bars`
- `abundance-council-uof-bars--compact`
- `abundance-council-uof-fill`
- `abundance-council-uof-fill--pink`
- `abundance-council-uof-fill--teal`
- `abundance-council-uof-fill--yellow`
- `abundance-council-uof-label`
- `abundance-council-uof-row`
- `abundance-council-uof-track`
- `abundance-ed-band`
- `abundance-ed-band--loose`
- `abundance-ed-band--tight`
- `abundance-ed-figure`
- `abundance-ed-note`
- `abundance-ed-quote`
- `abundance-field-white`
- `abundance-field-white--select`
- `abundance-field-white__prefix`
- `abundance-hero-art-nudge`
- `abundance-inline-disclaimer`
- `abundance-link-card`
- `abundance-media-frame`
- `abundance-media-frame--case-square`
- `abundance-media-frame--editorial`
- `abundance-media-frame--square`
- `abundance-media-frame--wide`
- `abundance-mock-spacer`
- `abundance-related-link`
- `abundance-route-choice`
- `abundance-route-choice--pink`
- `abundance-route-choice--teal`
- `abundance-route-choice__card`
- `abundance-route-choice__input`
- `abundance-route-choice__list`
- `abundance-route-choice__rule`
- `abundance-route-choice__tick`
- `abundance-step-num`
- `abundance-step-num--lg`
- `abundance-support-link`
- `abundance-warning-list`
- `abundance-warning-list__item`
- `abundance-warning-list__item--soft`
- `bg-blob--abundance-dot`
- `bg-colour--yellow`
- `bg-mask--abundance-bottom`
- `bg-mask--abundance-ed-fall`
- `bg-mask--abundance-ed-right`
- `bg-mask--abundance-ed-rise`
- `bg-mask--abundance-footer-peak`
- `bg-mask--abundance-top`
- `si-accordion-item__header`
- `text-colour--yellow`

## v3 Config Primitive Classes Used By The Pages

- `abundance-action-text`
- `abundance-body-compact`
- `abundance-btn-white`
- `abundance-card-copy`
- `abundance-card-soft`
- `abundance-card-soft-bordered`
- `abundance-colour-card-green`
- `abundance-colour-card-neutral`
- `abundance-colour-card-pink`
- `abundance-colour-card-pink-light`
- `abundance-colour-card-teal`
- `abundance-colour-card-teal-light`
- `abundance-colour-card-yellow`
- `abundance-eyebrow`
- `abundance-heading-display`
- `abundance-stat`

## Notes

- CSS custom properties such as `--abv2-*`, data attributes such as `data-abv2-*`, and HTML IDs were outside this class-coverage audit.
- The audit is class-token based: it verifies that every class used in the FINAL HTML exists in one of the accepted CSS sources.
