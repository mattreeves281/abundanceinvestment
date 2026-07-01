# Abundance v2 Class Migration Mapping

This file records the public class renames applied to the migration HTML and handover SCSS. Remaining `.abv2-*` names in the HTML are component-specific assets/primitives and were not renamed in this pass unless listed below.

| Previous class | New class | Purpose |
| --- | --- | --- |
| `.si-eyebrow` | `.abundance-eyebrow` | Repeated v2 eyebrow text role. |
| `.si-body-compact` | `.abundance-body-compact` | Compact supporting body copy role. |
| `.si-action-text` | `.abundance-action-text` | Strong/action text role used for links, labels and small calls to action. |
| `.si-stat` | `.abundance-stat` | Serif statistic/value role. |
| `.si-heading-display` | `.abundance-heading-display` | Large editorial display heading role. |
| `.abv2-card-copy` | `.abundance-card-copy` | Editorial/card supporting copy role. |
| `.si-btn--white` | `.abundance-btn-white` | White outline/inverted button modifier. |
| `.abv2-card-soft` | `.abundance-card-soft` | Soft white card shell. |
| `.abv2-card-soft--bordered` | `.abundance-card-soft-bordered` | Bordered variant for soft white card shell. |
| `.abv2-colour-card-neutral` | `.abundance-colour-card-neutral` | Neutral colour card. |
| `.abv2-colour-card-pink` | `.abundance-colour-card-pink` | Pink colour card. |
| `.abv2-colour-card-teal` | `.abundance-colour-card-teal` | Teal colour card. |
| `.abv2-colour-card-yellow` | `.abundance-colour-card-yellow` | Yellow colour card. |
| `.abv2-colour-card-green` | `.abundance-colour-card-green` | Green colour card. |
| `.abv2-colour-card-pink-light` | `.abundance-colour-card-pink-light` | Light pink colour card. |
| `.abv2-colour-card-teal-light` | `.abundance-colour-card-teal-light` | Light teal colour card. |

## Updated Files

- `designv2/scss handover/_new-helpers.scss`
- `designv2/scss handover/_new-content-page-assets.scss`
- `designv2/scss handover/_new-landing-page-assets.scss`
- `designv2/scss handover/_new-buy-final.scss`
- `designv2/scss handover/_new-cards.scss`
- `designv2/scss handover/_new-type.scss`
- `designv2/html/migration/FINAL - homepage.html`
- `designv2/html/migration/FINAL - content.html`
- `designv2/html/migration/FINAL - buy.html`

## Source Of Truth

- Type roles: `designv2/config/v3/type v2.scss`
- Button role: `designv2/config/v3/buttons v2.scss`
- Card roles: `designv2/config/v3/card v2.scss`
