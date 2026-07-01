# Config v3 ABV2 Layout + Token Coverage Audit

Source audited: `designv2/config/v3`

Compared against current handover/new SCSS usage in:

- `designv2/scss handover/_new-helpers.scss`
- `designv2/scss handover/_new-content-page-assets.scss`
- `designv2/scss handover/_new-landing-page-assets.scss`
- `designv2/scss handover/_new-buy-final.scss`
- `designv2/scss handover/_new-cards.scss`
- `designv2/scss handover/_new-type.scss`
- `designv2/scss handover/_new-dirty-overrides.scss`

## Executive Summary

The v3 config stack captures the core ABV2 system well for colour palette, platform colour aliases, typography, buttons and cards. It does not yet fully capture the layout/asset helper layer. Several values currently used by the new handover SCSS still exist only as CSS custom-property comments or raw component values, not as v3 Sass variables/mixins.

Most important gaps are:

- ABV2 alpha/semantic tokens such as borders, shadows and translucent whites are not defined as `$abundance-*` Sass variables.
- Exact non-platform spacing tokens such as 6px, 10px, 12px, 14px, 20px and 22px are not defined in v3.
- Layout primitives for masks, blobs, media frames, link cards, route-choice cards, boxouts and bar charts remain in handover SCSS rather than config/v3 mixin output.
- `$abundance-neutral-850` is declared after it is used in `_config abundance revised v2.scss`; it should be moved above the button colour aliases if retained.
- Handover comments still reference `$abv2-*` Sass names. The build-team convention now wants new variables prefixed `$abundance-*`, so those comments/variable plans need renaming.

## Captured In v3

### Colour Palette

Captured in `_config abundance revised v2.scss`:

- White/black primitives.
- ABV2 neutral scale: `$abundance-neutral-000` through `$abundance-neutral-900`, plus `$abundance-neutral-850`.
- Brand colours: pink, cyan/teal, yellow, green, blue and indigo families.
- Platform semantic aliases for text, surfaces, borders, focus, icons and state colours.
- Button colour aliases now map to outline-first v2 behaviour.

Status: mostly captured.

Caveat: alpha tokens and semantic aliases like `border-subtle`, `shadow-card`, etc. are not yet captured as first-class variables.

### Spacing + Breakpoints

Captured in `_config abundance revised v2.scss`:

- Existing platform spacer scale: `$spacer-3xs` = 8px, `$spacer-2xs` = 16px, `$spacer-xs` = 24px, `$spacer-sm` = 32px, etc.
- Existing mobile spacer scale.
- Platform breakpoints: `$screen-sm: 768px`, `$screen-md: 992px`, `$screen-lg: 1200px`, `$screen-xl: 1600px`.

Status: platform layout scale captured.

Caveat: exact ABV2 spacing tokens used in handover CSS are not fully captured.

Missing exact spacing tokens currently referenced by handover SCSS comments:

- `$abv2-space-6` -> should become `$abundance-space-6` or map to a platform token if acceptable.
- `$abv2-space-10` -> should become `$abundance-space-10`.
- `$abv2-space-12` -> should become `$abundance-space-12` unless using `$spacer-mobile-xs` is acceptable.
- `$abv2-space-14` -> should become `$abundance-space-14`.
- `$abv2-space-20` -> should become `$abundance-space-20`.
- `$abv2-space-22` -> should become `$abundance-space-22`.
- `$abv2-space-28` exists in token comments but is not currently referenced by the reduced handover SCSS.

### Typography

Captured in `type v2.scss`:

- Platform body classes, heading classes, label classes, caption classes and table-header classes.
- ABV2 heading sizes and mobile sizes.
- ABV2 line-height overrides per heading level.
- ABV2 custom roles: `.abundance-eyebrow`, `.abundance-body-compact`, `.abundance-action-text`, `.abundance-stat`, `.abundance-heading-display`, `.abundance-card-copy`.

Status: captured.

Caveat: handover comments reference `$si-font-tertiary`, but v3 currently uses `$abundance-font-ui`. That is functionally fine if intentional, but the naming is inconsistent for handover/build instructions.

### Buttons

Captured in `buttons v2.scss`:

- Platform `.si-btn` base, size modifiers and primary/secondary/tertiary variants.
- Outline-first v2 button colours via config aliases.
- ABV2 white outline role as `.abundance-btn-white` and `.si-btn--white`.

Status: captured.

Caveat: if the requested convention is “do not use ABV2 names”, this is OK; all new public output is `abundance-*`.

### Cards

Captured in `card v2.scss`:

- Platform `.si-card` shell, padding variants and primary/secondary/tertiary roles.
- Updated `.si-card--secondary` values.
- ABV2 soft card role: `.abundance-card-soft`, `.abundance-card-soft-bordered`.
- ABV2 colour cards: neutral, pink, teal, yellow, green, pink-light, teal-light.

Status: captured.

Caveat: colour-card values are captured, but supporting helper-level internals such as blob numbers and warning-list composition remain outside config/v3.

## Not Yet Captured In v3

These are currently still defined only in handover SCSS. If the goal is for config/v3 to deliver all ABV2 layout/token primitives, these need variables and/or `abundance-*` mixins/classes.

### Generic Helpers / Assets

- `.text-colour--yellow`
- `.bg-colour--yellow`
- `.bg-colour--abundance-white-soft`
- `.bg-mask--abundance-top`
- `.bg-mask--abundance-bottom`
- `.bg-mask--abundance-footer-peak`
- `.bg-mask--abundance-ed-rise`
- `.bg-mask--abundance-ed-right`
- `.bg-mask--abundance-ed-fall`
- `.bg-blob--abundance-dot`
- `.abundance-step-num`, `.abundance-step-num--lg`
- `.abundance-card-blob-num`
- `.abundance-ed-band`, `.abundance-ed-band--tight`, `.abundance-ed-band--loose`

Recommendation: move to a v3 helper/assets partial if these are intended platform-facing primitives. Tokenize dot-mask SVG and mask sizing/margins.

### Landing / Content / Buy Layout Elements

- `.abundance-link-card`
- `.abundance-chip-link`
- `.abundance-warning-list` and items
- `.abundance-inline-disclaimer`
- `.abundance-ed-note`
- `.abundance-ed-quote`
- `.abundance-ed-figure`
- `.abundance-support-link`
- `.abundance-media-frame` variants
- `.abundance-hero-art-nudge`
- `.abundance-related-link`
- `.abundance-council-uof-bars` family
- `.abundance-field-white` family
- `.abundance-bar-chart` family
- `.abundance-route-choice` family
- `.abundance-buy-invest-item` family
- `.abundance-boxout` variants
- `.abundance-buy-step`

Recommendation: split these into either:

- component layer: route choice, buy invest item, media frame, field white, bar chart; or
- helper/assets layer: support link, related link, chip link, ed band, masks, blob dot, boxout.

## Missing Sass Variables Referenced By Handover Comments

The current handover SCSS references 55 Sass variable names in comments. 24 are present in v3, and 31 are not.

Variables missing from v3, using the old `$abv2-*` naming:

- `$abv2-border-default` (designv2/scss handover/_new-buy-final.scss, designv2/scss handover/_new-cards.scss)
- `$abv2-border-soft` (designv2/scss handover/_new-content-page-assets.scss)
- `$abv2-border-subtle` (designv2/scss handover/_new-content-page-assets.scss, designv2/scss handover/_new-buy-final.scss, designv2/scss handover/_new-cards.scss)
- `$abv2-dot-mask` (designv2/scss handover/_new-helpers.scss, designv2/scss handover/_new-buy-final.scss)
- `$abv2-ink-a05` (designv2/scss handover/_new-buy-final.scss, designv2/scss handover/_new-cards.scss)
- `$abv2-ink-a18` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-ink-a78` (designv2/scss handover/_new-type.scss)
- `$abv2-pink-a05` (designv2/scss handover/_new-buy-final.scss)
- `$abv2-pink-a34` (designv2/scss handover/_new-content-page-assets.scss)
- `$abv2-shadow-card` (designv2/scss handover/_new-cards.scss)
- `$abv2-shadow-default` (designv2/scss handover/_new-content-page-assets.scss)
- `$abv2-space-10` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-space-12` (designv2/scss handover/_new-helpers.scss, designv2/scss handover/_new-content-page-assets.scss, designv2/scss handover/_new-landing-page-assets.scss, designv2/scss handover/_new-buy-final.scss)
- `$abv2-space-14` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-space-20` (designv2/scss handover/_new-helpers.scss, designv2/scss handover/_new-content-page-assets.scss, designv2/scss handover/_new-landing-page-assets.scss, designv2/scss handover/_new-buy-final.scss)
- `$abv2-space-22` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-space-6` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-teal-a06` (designv2/scss handover/_new-content-page-assets.scss)
- `$abv2-teal-a22` (designv2/scss handover/_new-buy-final.scss)
- `$abv2-teal-a38` (designv2/scss handover/_new-content-page-assets.scss)
- `$abv2-white-a08` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a14` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a16` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a18` (designv2/scss handover/_new-helpers.scss)
- `$abv2-white-a20` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a22` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a28` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a62` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-white-a72` (designv2/scss handover/_new-landing-page-assets.scss)
- `$abv2-yellow-a24` (designv2/scss handover/_new-buy-final.scss)
- `$si-font-tertiary` (designv2/scss handover/_new-type.scss)

Recommended rename pattern:

- `$abv2-border-subtle` -> `$abundance-border-subtle`
- `$abv2-shadow-card` -> `$abundance-shadow-card`
- `$abv2-white-a14` -> `$abundance-white-a14`
- `$abv2-space-20` -> `$abundance-space-20`
- `$abv2-dot-mask` -> `$abundance-dot-mask`

## Priority Fixes

1. Move `$abundance-neutral-850` above any use of it in `_config abundance revised v2.scss`. It is currently used in tertiary button aliases before the variable is declared.
2. Add a small ABV2 semantic token block using `$abundance-*` names for alpha colours, borders, shadows and exact spacing tokens.
3. Decide whether masks/blob/media/link-card/boxout/bar-chart/route-choice belong in config/v3 as new `abundance-*` mixin/class partials, or stay in the handover component SCSS.
4. Rename the handover Sass-reference comments from `$abv2-*` to the final `$abundance-*` variable names once naming is agreed.
5. Consider adding `$abundance-font-ui` comments in place of `$si-font-tertiary`, unless the build team prefers an alias variable.

## Overall Assessment

Config/v3 is strong for the platform-facing foundations: colours, typography, buttons and cards are mostly represented in the new format. It is not yet complete as the sole ABV2 source of truth for layout/helper primitives. The remaining work is mostly token plumbing and deciding ownership of the new layout/component helpers rather than reworking the core type/button/card system.
