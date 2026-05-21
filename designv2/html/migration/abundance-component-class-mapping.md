# Abundance Component Class Rename Mapping

Generated from actual `.abv2-*` class selectors found in the handover partials:

- `designv2/scss handover/_new-helpers.scss`
- `designv2/scss handover/_new-content-page-assets.scss`
- `designv2/scss handover/_new-landing-page-assets.scss`
- `designv2/scss handover/_new-buy-final.scss`

Only class names were renamed. CSS custom properties such as `var(--abv2-ink)` and HTML IDs were left unchanged.

| Previous class | New class |
| --- | --- |
| `.abv2-bar-chart` | `.abundance-bar-chart` |
| `.abv2-bar-chart__fill` | `.abundance-bar-chart__fill` |
| `.abv2-bar-chart__label` | `.abundance-bar-chart__label` |
| `.abv2-bar-chart__row` | `.abundance-bar-chart__row` |
| `.abv2-bar-chart__track` | `.abundance-bar-chart__track` |
| `.abv2-bar-chart--compact` | `.abundance-bar-chart--compact` |
| `.abv2-boxout` | `.abundance-boxout` |
| `.abv2-boxout--compact` | `.abundance-boxout--compact` |
| `.abv2-boxout--teal` | `.abundance-boxout--teal` |
| `.abv2-boxout--yellow` | `.abundance-boxout--yellow` |
| `.abv2-buy-invest-item` | `.abundance-buy-invest-item` |
| `.abv2-buy-invest-item__amount` | `.abundance-buy-invest-item__amount` |
| `.abv2-buy-invest-item__amount-grid` | `.abundance-buy-invest-item__amount-grid` |
| `.abv2-buy-invest-item__main` | `.abundance-buy-invest-item__main` |
| `.abv2-buy-invest-list` | `.abundance-buy-invest-list` |
| `.abv2-card-blob-num` | `.abundance-card-blob-num` |
| `.abv2-chip-link` | `.abundance-chip-link` |
| `.abv2-council-uof-bars` | `.abundance-council-uof-bars` |
| `.abv2-council-uof-bars--compact` | `.abundance-council-uof-bars--compact` |
| `.abv2-council-uof-fill` | `.abundance-council-uof-fill` |
| `.abv2-council-uof-fill--pink` | `.abundance-council-uof-fill--pink` |
| `.abv2-council-uof-fill--teal` | `.abundance-council-uof-fill--teal` |
| `.abv2-council-uof-fill--yellow` | `.abundance-council-uof-fill--yellow` |
| `.abv2-council-uof-label` | `.abundance-council-uof-label` |
| `.abv2-council-uof-row` | `.abundance-council-uof-row` |
| `.abv2-council-uof-track` | `.abundance-council-uof-track` |
| `.abv2-ed-band` | `.abundance-ed-band` |
| `.abv2-ed-band--loose` | `.abundance-ed-band--loose` |
| `.abv2-ed-band--tight` | `.abundance-ed-band--tight` |
| `.abv2-ed-figure` | `.abundance-ed-figure` |
| `.abv2-ed-note` | `.abundance-ed-note` |
| `.abv2-ed-quote` | `.abundance-ed-quote` |
| `.abv2-field-white` | `.abundance-field-white` |
| `.abv2-field-white__prefix` | `.abundance-field-white__prefix` |
| `.abv2-field-white--select` | `.abundance-field-white--select` |
| `.abv2-hero-art-nudge` | `.abundance-hero-art-nudge` |
| `.abv2-inline-disclaimer` | `.abundance-inline-disclaimer` |
| `.abv2-link-card` | `.abundance-link-card` |
| `.abv2-media-frame` | `.abundance-media-frame` |
| `.abv2-media-frame--case-square` | `.abundance-media-frame--case-square` |
| `.abv2-media-frame--editorial` | `.abundance-media-frame--editorial` |
| `.abv2-media-frame--square` | `.abundance-media-frame--square` |
| `.abv2-media-frame--wide` | `.abundance-media-frame--wide` |
| `.abv2-mock-spacer` | `.abundance-mock-spacer` |
| `.abv2-related-link` | `.abundance-related-link` |
| `.abv2-route-choice` | `.abundance-route-choice` |
| `.abv2-route-choice__card` | `.abundance-route-choice__card` |
| `.abv2-route-choice__input` | `.abundance-route-choice__input` |
| `.abv2-route-choice__list` | `.abundance-route-choice__list` |
| `.abv2-route-choice__rule` | `.abundance-route-choice__rule` |
| `.abv2-route-choice__tick` | `.abundance-route-choice__tick` |
| `.abv2-route-choice--pink` | `.abundance-route-choice--pink` |
| `.abv2-route-choice--teal` | `.abundance-route-choice--teal` |
| `.abv2-step-num` | `.abundance-step-num` |
| `.abv2-step-num--lg` | `.abundance-step-num--lg` |
| `.abv2-support-link` | `.abundance-support-link` |
| `.abv2-warning-list` | `.abundance-warning-list` |
| `.abv2-warning-list__item` | `.abundance-warning-list__item` |
| `.abv2-warning-list__item--soft` | `.abundance-warning-list__item--soft` |

## Embedded Helper Class Renames

These platform-style helper names contained `abv2` inside the class name rather than at the start.

| Previous class | New class |
| --- | --- |
| `.bg-blob--abv2-dot` | `.bg-blob--abundance-dot` |
| `.bg-colour--abv2-white-soft` | `.bg-colour--abundance-white-soft` |
| `.bg-mask--abv2-bottom` | `.bg-mask--abundance-bottom` |
| `.bg-mask--abv2-ed-fall` | `.bg-mask--abundance-ed-fall` |
| `.bg-mask--abv2-ed-right` | `.bg-mask--abundance-ed-right` |
| `.bg-mask--abv2-ed-rise` | `.bg-mask--abundance-ed-rise` |
| `.bg-mask--abv2-footer-peak` | `.bg-mask--abundance-footer-peak` |
| `.bg-mask--abv2-top` | `.bg-mask--abundance-top` |

## Additional Migration HTML Class Renames

These were present in migration HTML but not defined in the four target partials. They were renamed to keep public v2 classes on the `abundance-*` convention.

| Previous class | New class |
| --- | --- |
| `.abv2-buy-step` | `.abundance-buy-step` |
| `.abv2-council-quote` | `.abundance-council-quote` |
