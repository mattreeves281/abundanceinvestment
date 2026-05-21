# Abundance v2 Config Variable Audit

Compared `designv2/config/_config.scss` against `designv2/config/_config abundance revised.scss`.

The audit checks every SCSS variable assignment found in both files. "Changed" means the revised file has a different literal assignment and/or a different resolved effective value after following variable references.

## Summary

| Check | Count |
| --- | ---: |
| Variables in original file | 348 |
| Variables in revised file | 414 |
| Variables present in both files | 348 |
| Shared variables with changed assignment or effective value | 130 |
| Shared variables unchanged | 218 |
| New variables added in revised file | 66 |
| Original variables absent from revised file | 0 |

## Headline Findings

- The revised file does contain new v2 values: 130 shared variables changed either directly or through dependency resolution.
- 66 variables were added in the revised file.
- 99 existing Abundance/platform variables are still unchanged. Some may be intentionally retained compatibility or functional colours, but they should be reviewed if the expectation is that every Abundance/platform variable receives a v2 value.
- 119 unchanged variables are fallback primitives/palettes such as pure black/white and legacy functional palettes. These appear intentionally retained.
- Confirmed: every variable present in the original file is also present in the Abundance v2 file.

## Changed Shared Variables

| Variable | Audit status | Original assignment | Revised assignment | Original resolved value | Revised resolved value |
| --- | --- | --- | --- | --- | --- |
| `$abundance-grey` | Changed | `#505d5a` | `#71716e` | `#505d5a` | `#71716e` |
| `$abundance-neutral-400` | Changed | `#e9e4e3` | `#e2e2e2` | `#e9e4e3` | `#e2e2e2` |
| `$abundance-neutral-500` | Changed | `#e9e4e3` | `#d8d3d2` | `#e9e4e3` | `#d8d3d2` |
| `$abundance-neutral-800` | Changed | `#454543` | `#4d4a46` | `#454543` | `#4d4a46` |
| `$abundance-pink` | Changed | `#c54483` | `#f27fae` | `#c54483` | `#f27fae` |
| `$abundance-pink-dark` | Changed | `#ab336e` | `#c1658b` | `#ab336e` | `#c1658b` |
| `$abundance-pink-light` | Changed | `#e26da6` | `#f7d9e8` | `#e26da6` | `#f7d9e8` |
| `$abundance-pink-surface` | Changed | `#f8d9e8` | `#f7d9e8` | `#f8d9e8` | `#f7d9e8` |
| `$abundance-cyan` | Changed | `#07828f` | `#00a4b6` | `#07828f` | `#00a4b6` |
| `$abundance-cyan-dark` | Changed | `#07828f` | `#008391` | `#07828f` | `#008391` |
| `$abundance-cyan-light` | Changed | `#00a4b6` | `#4cbfcb` | `#00a4b6` | `#4cbfcb` |
| `$abundance-cyan-surface` | Changed | `#cdedf1` | `#cdebf0` | `#cdedf1` | `#cdebf0` |
| `$abundance-green-dark` | Changed | `#258d2c` | `#1f8f26` | `#258d2c` | `#1f8f26` |
| `$abundance-green-extra-dark` | Changed | `#227728` | `#176f1d` | `#227728` | `#176f1d` |
| `$abundance-green-light` | Changed | `#ccf0cf` | `#d9f3db` | `#ccf0cf` | `#d9f3db` |
| `$abundance-yellow` | Changed | `#e2961c` | `#ffb72c` | `#e2961c` | `#ffb72c` |
| `$abundance-yellow-dark` | Changed | `#95610e` | `#cc9223` | `#95610e` | `#cc9223` |
| `$abundance-yellow-light` | Changed | `#ffb72c` | `#ffeecd` | `#ffb72c` | `#ffeecd` |
| `$abundance-yellow-surface` | Changed | `#ffedcc` | `#ffeecd` | `#ffedcc` | `#ffeecd` |
| `$abundance-red-surface` | Changed | `#ffd1d6` | `#ffd9dd` | `#ffd1d6` | `#ffd9dd` |
| `$abundance-orange-light` | Changed | `#fccaa2` | `#fbd7bb` | `#fccaa2` | `#fbd7bb` |
| `$abundance-blue` | Changed | `#185f8c` | `#151943` | `#185f8c` | `#151943` |
| `$abundance-blue-surface` | Changed | `#e4f0fa` | `#eceaf1` | `#e4f0fa` | `#eceaf1` |
| `$abundance-general-portfolio-surface` | Effective value changed via dependency | `$abundance-orange-light` | `$abundance-orange-light` | `#fccaa2` | `#fbd7bb` |
| `$abundance-isa-portfolio` | Effective value changed via dependency | `$abundance-green-extra-dark` | `$abundance-green-extra-dark` | `#227728` | `#176f1d` |
| `$abundance-isa-portfolio-surface` | Effective value changed via dependency | `$abundance-green-light` | `$abundance-green-light` | `#ccf0cf` | `#d9f3db` |
| `$si-color-focus` | Effective value changed via dependency | `$abundance-pink-dark` | `$abundance-pink-dark` | `#ab336e` | `#c1658b` |
| `$outline` | Effective value changed via dependency | `2px solid $si-color-focus` | `2px solid $si-color-focus` | `2px solid #ab336e` | `2px solid #c1658b` |
| `$si-color-text-secondary` | Effective value changed via dependency | `$abundance-neutral-800` | `$abundance-neutral-800` | `#454543` | `#4d4a46` |
| `$si-color-text-invert-secondary` | Changed | `$pure-white` | `rgba($pure-white, 0.88)` | `#ffffff` | `rgba(#ffffff, 0.88)` |
| `$si-color-text-accent` | Effective value changed via dependency | `$abundance-pink` | `$abundance-pink` | `#c54483` | `#f27fae` |
| `$si-color-border-primary` | Changed | `$abundance-neutral-200` | `$abundance-neutral-300` | `#f1eeed` | `#e9e4e3` |
| `$si-color-border-secondary` | Changed | `$abundance-neutral-300` | `$abundance-neutral-400` | `#e9e4e3` | `#e2e2e2` |
| `$si-color-border-invert-primary` | Changed | `$pure-white` | `rgba($pure-white, 0.72)` | `#ffffff` | `rgba(#ffffff, 0.72)` |
| `$si-color-border-invert-secondary` | Changed | `$pure-white` | `rgba($pure-white, 0.36)` | `#ffffff` | `rgba(#ffffff, 0.36)` |
| `$si-color-border-interactive` | Changed | `$abundance-neutral-600` | `$abundance-cyan` | `#90908d` | `#00a4b6` |
| `$si-color-surface-secondary` | Changed | `$abundance-pink-surface` | `$abundance-neutral-100` | `#f8d9e8` | `#faf8f8` |
| `$si-color-surface-tertiary` | Changed | `$abundance-cyan-surface` | `$abundance-pink-surface` | `#cdedf1` | `#f7d9e8` |
| `$si-color-surface-invert-primary` | Changed | `$si-color-text-primary` | `$abundance-blue` | `#282827` | `#151943` |
| `$si-color-surface-invert-secondary` | Changed | `$si-color-text-secondary` | `$abundance-neutral-900` | `#454543` | `#282827` |
| `$si-color-surface-accent` | Effective value changed via dependency | `$si-color-text-accent` | `$si-color-text-accent` | `#c54483` | `#f27fae` |
| `$si-color-surface-risk-warning` | Effective value changed via dependency | `$abundance-cyan-dark` | `$abundance-cyan-dark` | `#07828f` | `#008391` |
| `$si-color-button-surface-primary` | Changed | `$si-color-text-primary` | `transparent` | `#282827` | `transparent` |
| `$si-color-button-surface-primary-hover` | Changed | `$si-color-focus` | `rgba($abundance-neutral-900, 0.06)` | `#ab336e` | `rgba(#282827, 0.06)` |
| `$si-color-button-surface-primary-active` | Changed | `$si-color-button-surface-primary` | `rgba($abundance-neutral-900, 0.1)` | `#282827` | `rgba(#282827, 0.1)` |
| `$si-color-button-border-primary` | Changed | `$si-color-button-surface-primary` | `$abundance-pink` | `#282827` | `#f27fae` |
| `$si-color-button-border-primary-hover` | Changed | `$si-color-button-surface-primary-hover` | `$abundance-pink` | `#ab336e` | `#f27fae` |
| `$si-color-button-border-primary-active` | Changed | `$si-color-button-surface-primary` | `$abundance-pink-dark` | `#282827` | `#c1658b` |
| `$si-color-button-text-primary` | Changed | `$pure-white` | `$abundance-pink` | `#ffffff` | `#f27fae` |
| `$si-color-button-text-primary-hover` | Changed | `$pure-white` | `$abundance-pink` | `#ffffff` | `#f27fae` |
| `$si-color-button-text-primary-active` | Changed | `$pure-white` | `$abundance-pink-dark` | `#ffffff` | `#c1658b` |
| `$si-color-button-surface-secondary` | Changed | `$abundance-cyan-light` | `transparent` | `#00a4b6` | `transparent` |
| `$si-color-button-surface-secondary-hover` | Changed | `$si-color-surface-risk-warning` | `rgba($abundance-neutral-900, 0.06)` | `#07828f` | `rgba(#282827, 0.06)` |
| `$si-color-button-surface-secondary-active` | Changed | `$si-color-button-surface-secondary` | `rgba($abundance-neutral-900, 0.1)` | `#00a4b6` | `rgba(#282827, 0.1)` |
| `$si-color-button-border-secondary` | Changed assignment only | `$si-color-button-surface-secondary` | `$abundance-cyan` | `#00a4b6` | `#00a4b6` |
| `$si-color-button-border-secondary-hover` | Changed | `$si-color-button-surface-secondary-hover` | `$abundance-cyan` | `#07828f` | `#00a4b6` |
| `$si-color-button-border-secondary-active` | Changed | `$si-color-button-surface-secondary-hover` | `$abundance-cyan-dark` | `#07828f` | `#008391` |
| `$si-color-button-text-secondary` | Changed | `$pure-white` | `$abundance-cyan` | `#ffffff` | `#00a4b6` |
| `$si-color-button-text-secondary-hover` | Changed | `$pure-white` | `$abundance-cyan` | `#ffffff` | `#00a4b6` |
| `$si-color-button-text-secondary-active` | Changed | `$pure-white` | `$abundance-cyan-dark` | `#ffffff` | `#008391` |
| `$si-color-button-surface-tertiary-hover` | Changed | `$si-color-border-secondary` | `rgba($abundance-neutral-900, 0.06)` | `#e9e4e3` | `rgba(#282827, 0.06)` |
| `$si-color-button-surface-tertiary-active` | Changed | `$si-color-border-secondary` | `rgba($abundance-neutral-900, 0.1)` | `#e9e4e3` | `rgba(#282827, 0.1)` |
| `$si-color-button-border-tertiary` | Changed | `transparent` | `$abundance-neutral-850` | `transparent` | `#454543` |
| `$si-color-button-border-tertiary-hover` | Changed | `transparent` | `$abundance-neutral-900` | `transparent` | `#282827` |
| `$si-color-button-border-tertiary-active` | Changed assignment only | `$si-color-text-primary` | `$abundance-neutral-900` | `#282827` | `#282827` |
| `$si-color-button-text-tertiary` | Changed assignment only | `$si-color-text-secondary` | `$abundance-neutral-850` | `#454543` | `#454543` |
| `$si-color-button-text-tertiary-hover` | Changed | `$si-color-text-secondary` | `$abundance-neutral-900` | `#454543` | `#282827` |
| `$si-color-button-text-tertiary-active` | Changed | `$si-color-text-secondary` | `$abundance-neutral-900` | `#454543` | `#282827` |
| `$si-color-icon-accent` | Effective value changed via dependency | `$si-color-text-accent` | `$si-color-text-accent` | `#c54483` | `#f27fae` |
| `$si-border-radius-round` | Changed | `50px` | `999px` | `50px` | `999px` |
| `$si-font-primary` | Changed | `("Inter Display", $si-font-fallback)` | `("Sohne Buch", $si-font-fallback)` | `("Inter Display", $si-font-fallback)` | `("Sohne Buch", $si-font-fallback)` |
| `$si-font-secondary` | Changed | `("Euclid Circular B", "Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` | `("Euclid Circular B", "Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-font-weight-medium` | Changed | `700` | `600` | `700` | `600` |
| `$si-font-weight-semibold` | Changed | `700` | `600` | `700` | `600` |
| `$si-font-weight-bold` | Changed | `700` | `600` | `700` | `600` |
| `$si-body-md-size` | Changed | `rem-calc(16)` | `rem-calc(19)` | `rem-calc(16)` | `rem-calc(19)` |
| `$si-body-line-height` | Changed | `1.5` | `1.62` | `1.5` | `1.62` |
| `$si-body-text-color` | Effective value changed via dependency | `$si-color-text-secondary` | `$si-color-text-secondary` | `#454543` | `#4d4a46` |
| `$si-body-text-font` | Effective value changed via dependency | `$si-font-primary` | `$si-font-primary` | `("Inter Display", $si-font-fallback)` | `("Sohne Buch", $si-font-fallback)` |
| `$si-heading-1-size` | Changed | `rem-calc(64)` | `rem-calc(51)` | `rem-calc(64)` | `rem-calc(51)` |
| `$si-heading-2-size` | Changed | `rem-calc(48)` | `rem-calc(46)` | `rem-calc(48)` | `rem-calc(46)` |
| `$si-heading-2-size-mobile` | Changed | `rem-calc(28)` | `rem-calc(32)` | `rem-calc(28)` | `rem-calc(32)` |
| `$si-heading-3-size` | Changed | `rem-calc(36)` | `rem-calc(32)` | `rem-calc(36)` | `rem-calc(32)` |
| `$si-heading-4-size` | Changed | `rem-calc(28)` | `rem-calc(24)` | `rem-calc(28)` | `rem-calc(24)` |
| `$si-heading-5-size` | Changed | `rem-calc(24)` | `rem-calc(20)` | `rem-calc(24)` | `rem-calc(20)` |
| `$si-heading-line-height` | Changed | `1.25` | `1.08` | `1.25` | `1.08` |
| `$si-heading-font-weight` | Changed | `$si-font-weight-bold` | `$si-font-weight-semibold` | `700` | `600` |
| `$si-heading-text-font` | Changed | `$si-font-primary` | `$si-font-secondary` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-1-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-2-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-3-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-4-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-5-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-6-font-weight` | Effective value changed via dependency | `$si-heading-font-weight` | `$si-heading-font-weight` | `700` | `600` |
| `$si-heading-1-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-2-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-3-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-4-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-5-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$si-heading-6-font` | Effective value changed via dependency | `$si-heading-text-font` | `$si-heading-text-font` | `("Inter Display", $si-font-fallback)` | `("New Kansas", Georgia, serif)` |
| `$label-lg-size` | Changed | `rem-calc(20)` | `rem-calc(18)` | `rem-calc(20)` | `rem-calc(18)` |
| `$label-xl-size` | Changed | `rem-calc(24)` | `rem-calc(20)` | `rem-calc(24)` | `rem-calc(20)` |
| `$label-2xl-size` | Changed | `rem-calc(32)` | `rem-calc(24)` | `rem-calc(32)` | `rem-calc(24)` |
| `$label-2xl-size-mobile` | Changed | `rem-calc(24)` | `rem-calc(22)` | `rem-calc(24)` | `rem-calc(22)` |
| `$label-3xl-size` | Changed | `rem-calc(40)` | `rem-calc(32)` | `rem-calc(40)` | `rem-calc(32)` |
| `$label-4xl-size` | Changed | `rem-calc(48)` | `rem-calc(40)` | `rem-calc(48)` | `rem-calc(40)` |
| `$si-label-line-height` | Changed | `1` | `1.2` | `1` | `1.2` |
| `$si-label-text-color` | Changed | `$si-color-text-secondary` | `$si-color-text-primary` | `#454543` | `#282827` |
| `$si-label-text-font` | Effective value changed via dependency | `$si-font-primary` | `$si-font-primary` | `("Inter Display", $si-font-fallback)` | `("Sohne Buch", $si-font-fallback)` |
| `$si-table-header-line-height` | Changed | `1.125` | `1.15` | `1.125` | `1.15` |
| `$si-table-header-font-weight` | Changed | `$si-font-weight-bold` | `$si-font-weight-semibold` | `700` | `600` |
| `$si-table-header-text-font` | Changed | `$si-font-primary` | `$si-font-tertiary` | `("Inter Display", $si-font-fallback)` | `("Sohne Kraftig", $si-font-fallback)` |
| `$si-caption-sm-size` | Changed | `rem-calc(14)` | `rem-calc(12)` | `rem-calc(14)` | `rem-calc(12)` |
| `$si-caption-sm-size-mobile` | Changed | `rem-calc(14)` | `rem-calc(12)` | `rem-calc(14)` | `rem-calc(12)` |
| `$si-caption-md-size` | Changed | `rem-calc(16)` | `rem-calc(14)` | `rem-calc(16)` | `rem-calc(14)` |
| `$si-caption-md-size-mobile` | Changed | `rem-calc(16)` | `rem-calc(14)` | `rem-calc(16)` | `rem-calc(14)` |
| `$si-caption-lg-size` | Changed | `rem-calc(20)` | `rem-calc(16)` | `rem-calc(20)` | `rem-calc(16)` |
| `$si-caption-lg-size-mobile` | Changed | `rem-calc(18)` | `rem-calc(16)` | `rem-calc(18)` | `rem-calc(16)` |
| `$si-caption-line-height` | Changed | `1` | `1.35` | `1` | `1.35` |
| `$si-caption-text-color` | Effective value changed via dependency | `$si-color-text-secondary` | `$si-color-text-secondary` | `#454543` | `#4d4a46` |
| `$si-caption-text-font` | Effective value changed via dependency | `$si-font-primary` | `$si-font-primary` | `("Inter Display", $si-font-fallback)` | `("Sohne Buch", $si-font-fallback)` |
| `$si-caption-text-transform` | Changed | `uppercase` | `none` | `uppercase` | `none` |
| `$si-card-padding-default` | Changed | `$si-card-padding-md` | `$si-card-padding-xs` | `3rem` | `1.5rem` |
| `$si-card-secondary-bg-color` | Changed | `$si-color-surface-secondary` | `$abundance-neutral-100` | `#f8d9e8` | `#faf8f8` |
| `$si-card-tertiary-bg-color` | Changed | `$si-color-surface-tertiary` | `$abundance-pink-surface` | `#cdedf1` | `#f7d9e8` |
| `$si-card-primary-border-radius` | Changed | `$si-border-radius-xl` | `$si-border-radius-3xl` | `16px` | `24px` |
| `$si-card-secondary-border-radius` | Changed | `$si-border-radius-xl` | `$si-border-radius-3xl` | `16px` | `24px` |
| `$si-card-tertiary-border-radius` | Changed | `$si-border-radius-md` | `$si-border-radius-2xl` | `8px` | `20px` |
| `$si-card-primary-border` | Changed | `1px solid $si-color-border-primary` | `1.5px solid rgba($abundance-neutral-900, 0.12)` | `1px solid #f1eeed` | `1.5px solid rgba(#282827, 0.12)` |
| `$si-card-primary-shadow` | Changed | `0px 4px 32px 0px rgba(#241f33, 4%)` | `0 10px 30px rgba($abundance-neutral-900, 0.05)` | `0px 4px 32px 0px rgba(#241f33, 4%)` | `0 10px 30px rgba(#282827, 0.05)` |

## Added Variables In Revised File

| Variable | Revised assignment | Resolved value | Revised line |
| --- | --- | --- | --- |
| `$abundance-neutral-850` | `#454543` | `#454543` | 178 |
| `$abundance-indigo` | `#443668` | `#443668` | 214 |
| `$abundance-indigo-surface` | `#eceaf1` | `#eceaf1` | 215 |
| `$si-font-tertiary` | `("Sohne Kraftig", $si-font-fallback)` | `("Sohne Kraftig", $si-font-fallback)` | 456 |
| `$si-heading-letter-spacing` | `-0.03em` | `-0.03em` | 534 |
| `$si-heading-1-line-height` | `0.95` | `0.95` | 536 |
| `$si-heading-2-line-height` | `0.98` | `0.98` | 537 |
| `$si-heading-3-line-height` | `1.08` | `1.08` | 538 |
| `$si-heading-4-line-height` | `1.08` | `1.08` | 539 |
| `$si-heading-5-line-height` | `1.08` | `1.08` | 540 |
| `$si-heading-6-line-height` | `1.08` | `1.08` | 541 |
| `$si-heading-1-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 571 |
| `$si-heading-2-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 572 |
| `$si-heading-3-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 573 |
| `$si-heading-4-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 574 |
| `$si-heading-5-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 575 |
| `$si-heading-6-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 576 |
| `$si-heading-compact-size` | `rem-calc(20)` | `rem-calc(20)` | 582 |
| `$si-heading-compact-size-mobile` | `rem-calc(18)` | `rem-calc(18)` | 583 |
| `$si-heading-compact-line-height` | `1.08` | `1.08` | 584 |
| `$si-heading-compact-font-weight` | `$si-heading-font-weight` | `600` | 585 |
| `$si-heading-compact-text-transform` | `$si-heading-text-transform` | `none` | 586 |
| `$si-heading-compact-color` | `$si-heading-color` | `#282827` | 587 |
| `$si-heading-compact-font` | `$si-heading-text-font` | `("New Kansas", Georgia, serif)` | 588 |
| `$si-heading-compact-letter-spacing` | `$si-heading-letter-spacing` | `-0.03em` | 589 |
| `$si-btn-text-transform` | `none` | `none` | 672 |
| `$si-btn-border-radius` | `$si-border-radius-round` | `999px` | 673 |
| `$si-btn-border-width` | `2px` | `2px` | 674 |
| `$si-btn-border-style` | `solid` | `solid` | 675 |
| `$si-btn-font-family` | `$si-font-tertiary` | `("Sohne Kraftig", $si-font-fallback)` | 676 |
| `$si-btn-font-weight` | `$si-font-weight-semibold` | `600` | 677 |
| `$si-btn-line-height` | `1` | `1` | 678 |
| `$si-btn-transition` | `background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease` | `background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease` | 679 |
| `$si-btn-sm-padding-x` | `rem-calc(16)` | `rem-calc(16)` | 681 |
| `$si-btn-sm-padding-y` | `rem-calc(8)` | `rem-calc(8)` | 682 |
| `$si-btn-sm-padding` | `$si-btn-sm-padding-y $si-btn-sm-padding-x` | `rem-calc(8) rem-calc(16)` | 683 |
| `$si-btn-sm-font-size` | `rem-calc(13)` | `rem-calc(13)` | 684 |
| `$si-btn-sm-min-height` | `rem-calc(40)` | `rem-calc(40)` | 685 |
| `$si-btn-md-padding-x` | `rem-calc(20)` | `rem-calc(20)` | 687 |
| `$si-btn-md-padding-y` | `rem-calc(12)` | `rem-calc(12)` | 688 |
| `$si-btn-md-padding` | `$si-btn-md-padding-y $si-btn-md-padding-x` | `rem-calc(12) rem-calc(20)` | 689 |
| `$si-btn-md-font-size` | `rem-calc(13.5)` | `rem-calc(13.5)` | 690 |
| `$si-btn-md-min-height` | `rem-calc(44)` | `rem-calc(44)` | 691 |
| `$si-btn-lg-padding-x` | `rem-calc(24)` | `rem-calc(24)` | 693 |
| `$si-btn-lg-padding-y` | `rem-calc(14)` | `rem-calc(14)` | 694 |
| `$si-btn-lg-padding` | `$si-btn-lg-padding-y $si-btn-lg-padding-x` | `rem-calc(14) rem-calc(24)` | 695 |
| `$si-btn-lg-font-size` | `rem-calc(15)` | `rem-calc(15)` | 696 |
| `$si-btn-lg-min-height` | `rem-calc(48)` | `rem-calc(48)` | 697 |
| `$si-btn-box-shadow` | `none` | `none` | 699 |
| `$si-btn-primary-box-shadow` | `$si-btn-box-shadow` | `none` | 700 |
| `$si-btn-primary-box-shadow-hover` | `$si-btn-box-shadow` | `none` | 701 |
| `$si-btn-primary-box-shadow-active` | `$si-btn-box-shadow` | `none` | 702 |
| `$si-btn-secondary-box-shadow` | `$si-btn-box-shadow` | `none` | 703 |
| `$si-btn-secondary-box-shadow-hover` | `$si-btn-box-shadow` | `none` | 704 |
| `$si-btn-secondary-box-shadow-active` | `$si-btn-box-shadow` | `none` | 705 |
| `$si-btn-tertiary-box-shadow` | `none` | `none` | 706 |
| `$si-btn-tertiary-box-shadow-hover` | `$si-btn-box-shadow` | `none` | 707 |
| `$si-btn-tertiary-box-shadow-active` | `none` | `none` | 708 |
| `$si-btn-invert-box-shadow` | `none` | `none` | 709 |
| `$si-btn-invert-box-shadow-hover` | `none` | `none` | 710 |
| `$si-btn-invert-box-shadow-active` | `none` | `none` | 711 |
| `$si-icon-btn-md-padding` | `rem-calc(10)` | `rem-calc(10)` | 713 |
| `$si-icon-btn-md-icon-size` | `rem-calc(22)` | `rem-calc(22)` | 714 |
| `$si-btn-with-icon-md-gap` | `$spacer-3xs` | `0.5rem` | 716 |
| `$si-btn-with-icon-md-icon-size` | `rem-calc(20)` | `rem-calc(20)` | 717 |
| `$si-btn-group-gap` | `$spacer-2xs` | `1rem` | 718 |

## Original Variables Absent From Revised File

_None. Every variable present in the original file is also present in the Abundance v2 file._

## Unchanged Abundance And Platform Variables To Review

These are shared variables whose assigned and resolved values are identical in both files. Compatibility/state tokens may be intentionally unchanged, but this is the main checklist for confirming whether every expected v2 variable has moved.

| Variable | Value in both files |
| --- | --- |
| `$abundance-neutral-000` | `#ffffff` |
| `$abundance-neutral-100` | `#faf8f8` |
| `$abundance-neutral-200` | `#f1eeed` |
| `$abundance-neutral-300` | `#e9e4e3` |
| `$abundance-neutral-600` | `#90908d` |
| `$abundance-neutral-700` | `#71716e` |
| `$abundance-neutral-900` | `#282827` |
| `$abundance-green` | `#25ab2d` |
| `$abundance-red` | `#c10c21` |
| `$abundance-orange` | `#e1873f` |
| `$abundance-orange-dark` | `#c25600` |
| `$abundance-orange-extra-dark` | `#964300` |
| `$abundance-lewisham` | `#009eb3` |
| `$abundance-suffolk` | `#a2bd30` |
| `$abundance-westminster` | `#0b2265` |
| `$abundance-general-portfolio` | `$abundance-orange-extra-dark` |
| `$si-color-error` | `$roman-700` |
| `$si-color-error-surface` | `$roman-100` |
| `$si-color-info` | `$picton-blue-700` |
| `$si-color-info-surface` | `$picton-blue-100` |
| `$si-color-success` | `$conifer-700` |
| `$si-color-success-surface` | `$conifer-100` |
| `$si-color-warning` | `#a95214` |
| `$si-color-warning-surface` | `#fbf0ca` |
| `$si-color-focus-invert` | `$pure-white` |
| `$outline-invert` | `2px solid $si-color-focus-invert` |
| `$outline-offset` | `2px` |
| `$si-color-text-primary` | `$abundance-neutral-900` |
| `$si-color-text-invert-primary` | `$pure-white` |
| `$si-color-text-risk-warning` | `$pure-white` |
| `$si-color-border-invert-interactive` | `$pure-white` |
| `$si-color-surface-primary` | `$pure-white` |
| `$si-color-surface-backdrop` | `rgba($si-color-text-primary, 0.6)` |
| `$si-color-button-surface-tertiary` | `transparent` |
| `$si-border-radius-0` | `0` |
| `$si-border-radius-xs` | `2px` |
| `$si-border-radius-sm` | `4px` |
| `$si-border-radius-md` | `8px` |
| `$si-border-radius-lg` | `12px` |
| `$si-border-radius-xl` | `16px` |
| `$si-border-radius-2xl` | `20px` |
| `$si-border-radius-3xl` | `24px` |
| `$si-border-radius-4xl` | `32px` |
| `$si-font-weight-light` | `400` |
| `$si-font-weight-regular` | `400` |
| `$si-body-xs-size` | `rem-calc(12)` |
| `$si-body-xs-size-mobile` | `rem-calc(12)` |
| `$si-body-sm-size` | `rem-calc(14)` |
| `$si-body-sm-size-mobile` | `rem-calc(14)` |
| `$si-body-md-size-mobile` | `rem-calc(16)` |
| `$si-body-lg-size` | `rem-calc(20)` |
| `$si-body-lg-size-mobile` | `rem-calc(18)` |
| `$si-body-xl-size` | `rem-calc(24)` |
| `$si-body-xl-size-mobile` | `rem-calc(20)` |
| `$si-body-2xl-size` | `rem-calc(32)` |
| `$si-body-2xl-size-mobile` | `rem-calc(24)` |
| `$si-body-font-weight` | `$si-font-weight-regular` |
| `$si-body-text-letter-spacing` | `normal` |
| `$si-heading-1-size-mobile` | `rem-calc(36)` |
| `$si-heading-3-size-mobile` | `rem-calc(24)` |
| `$si-heading-4-size-mobile` | `rem-calc(20)` |
| `$si-heading-5-size-mobile` | `rem-calc(18)` |
| `$si-heading-6-size` | `rem-calc(18)` |
| `$si-heading-6-size-mobile` | `rem-calc(16)` |
| `$si-heading-text-transform` | `none` |
| `$si-heading-color` | `$si-color-text-primary` |
| `$si-heading-1-text-transform` | `$si-heading-text-transform` |
| `$si-heading-2-text-transform` | `$si-heading-text-transform` |
| `$si-heading-3-text-transform` | `$si-heading-text-transform` |
| `$si-heading-4-text-transform` | `$si-heading-text-transform` |
| `$si-heading-5-text-transform` | `$si-heading-text-transform` |
| `$si-heading-6-text-transform` | `$si-heading-text-transform` |
| `$si-heading-1-color` | `$si-heading-color` |
| `$si-heading-2-color` | `$si-heading-color` |
| `$si-heading-3-color` | `$si-heading-color` |
| `$si-heading-4-color` | `$si-heading-color` |
| `$si-heading-5-color` | `$si-heading-color` |
| `$si-heading-6-color` | `$si-heading-color` |
| `$si-label-font-weight` | `$si-font-weight-regular` |
| `$si-table-header-sm-size` | `rem-calc(14)` |
| `$si-table-header-sm-size-mobile` | `rem-calc(14)` |
| `$si-table-header-md-size` | `rem-calc(16)` |
| `$si-table-header-md-size-mobile` | `rem-calc(16)` |
| `$si-table-header-lg-size` | `rem-calc(18)` |
| `$si-table-header-lg-size-mobile` | `rem-calc(18)` |
| `$si-table-header-text-color` | `$si-color-text-primary` |
| `$si-caption-font-weight` | `$si-font-weight-regular` |
| `$si-caption-letter-spacing` | `normal` |
| `$si-card-padding-2xs` | `$spacer-2xs` |
| `$si-card-padding-xs` | `$spacer-xs` |
| `$si-card-padding-sm` | `$spacer-sm` |
| `$si-card-padding-md` | `$spacer-md` |
| `$si-card-padding-lg` | `$spacer-lg` |
| `$si-card-mobile-padding` | `$spacer-xs` |
| `$si-card-primary-bg-color` | `$si-color-surface-primary` |
| `$si-card-secondary-border` | `none` |
| `$si-card-tertiary-border` | `none` |
| `$si-card-secondary-shadow` | `none` |
| `$si-card-tertiary-shadow` | `none` |

## Unchanged Fallback Primitives And Palettes

These appear to be retained fallback primitives/palettes rather than Abundance v2 brand mappings.

| Variable | Value in both files |
| --- | --- |
| `$pure-white` | `#ffffff` |
| `$pure-black` | `#000000` |
| `$conifer-50` | `#f8fce9` |
| `$conifer-100` | `#eff8cf` |
| `$conifer-200` | `#dff1a5` |
| `$conifer-300` | `#c7e670` |
| `$conifer-400` | `#aed744` |
| `$conifer-500` | `#90bd25` |
| `$conifer-600` | `#6f961a` |
| `$conifer-700` | `#557318` |
| `$conifer-800` | `#455b19` |
| `$conifer-900` | `#3b4e19` |
| `$conifer-950` | `#1d2b08` |
| `$gunsmoke-50` | `#f6f6f6` |
| `$gunsmoke-100` | `#e7e7e7` |
| `$gunsmoke-200` | `#d1d1d1` |
| `$gunsmoke-300` | `#b0b0b0` |
| `$gunsmoke-400` | `#888888` |
| `$gunsmoke-500` | `#767676` |
| `$gunsmoke-600` | `#5d5d5d` |
| `$gunsmoke-700` | `#4f4f4f` |
| `$gunsmoke-800` | `#454545` |
| `$gunsmoke-900` | `#3d3d3d` |
| `$gunsmoke-950` | `#262626` |
| `$roman-50` | `#fdf3f3` |
| `$roman-100` | `#fce4e4` |
| `$roman-200` | `#fbcdcd` |
| `$roman-300` | `#f7aaaa` |
| `$roman-400` | `#f07979` |
| `$roman-500` | `#e54c4c` |
| `$roman-600` | `#d23030` |
| `$roman-700` | `#b02525` |
| `$roman-800` | `#922222` |
| `$roman-900` | `#792323` |
| `$roman-950` | `#420d0d` |
| `$tulip-tree-50` | `#fdf9e9` |
| `$tulip-tree-100` | `#fbf1c6` |
| `$tulip-tree-200` | `#f7e291` |
| `$tulip-tree-300` | `#f2cb52` |
| `$tulip-tree-400` | `#eeb731` |
| `$tulip-tree-500` | `#dd9a15` |
| `$tulip-tree-600` | `#bf760f` |
| `$tulip-tree-700` | `#985410` |
| `$tulip-tree-800` | `#7e4415` |
| `$tulip-tree-900` | `#6c3717` |
| `$tulip-tree-950` | `#3f1b09` |
| `$picton-blue-50` | `#f2f9fd` |
| `$picton-blue-100` | `#e4f0fa` |
| `$picton-blue-200` | `#c3e1f4` |
| `$picton-blue-300` | `#8ecaeb` |
| `$picton-blue-400` | `#52aede` |
| `$picton-blue-500` | `#2c94cb` |
| `$picton-blue-600` | `#1d76ac` |
| `$picton-blue-700` | `#185f8c` |
| `$picton-blue-800` | `#185174` |
| `$picton-blue-900` | `#194361` |
| `$picton-blue-950` | `#112b40` |
| `$boulder-50` | `#f6f6f6` |
| `$boulder-100` | `#e7e7e7` |
| `$boulder-200` | `#d1d1d1` |
| `$boulder-300` | `#b0b0b0` |
| `$boulder-400` | `#888888` |
| `$boulder-500` | `#767676` |
| `$boulder-600` | `#5d5d5d` |
| `$boulder-700` | `#4f4f4f` |
| `$boulder-800` | `#454545` |
| `$boulder-900` | `#3d3d3d` |
| `$boulder-950` | `#262626` |
| `$spacer-0` | `0` |
| `$spacer-5xs` | `0.125rem` |
| `$spacer-4xs` | `0.25rem` |
| `$spacer-3xs` | `0.5rem` |
| `$spacer-2xs` | `1rem` |
| `$spacer-xs` | `1.5rem` |
| `$spacer-sm` | `2rem` |
| `$spacer-md` | `3rem` |
| `$spacer-lg` | `4rem` |
| `$spacer-xl` | `5rem` |
| `$spacer-2xl` | `6rem` |
| `$spacer-4xl` | `8rem` |
| `$spacer-6xl` | `16rem` |
| `$spacer-8xl` | `16rem` |
| `$cap` | `0.9ex` |
| `$spacer-desktop-mult` | `2` |
| `$spacing-style` | `"legacy"` |
| `$spacer-mobile-0` | `0` |
| `$spacer-mobile-5xs` | `0.063rem` |
| `$spacer-mobile-4xs` | `0.125rem` |
| `$spacer-mobile-3xs` | `0.25rem` |
| `$spacer-mobile-2xs` | `0.5rem` |
| `$spacer-mobile-xs` | `0.75rem` |
| `$spacer-mobile-sm` | `1rem` |
| `$spacer-mobile-md` | `1.5rem` |
| `$spacer-mobile-lg` | `2rem` |
| `$spacer-mobile-xl` | `2.5rem` |
| `$spacer-mobile-2xl` | `3rem` |
| `$spacer-mobile-4xl` | `4rem` |
| `$spacer-mobile-6xl` | `8rem` |
| `$screen-sm` | `768px` |
| `$screen-md` | `992px` |
| `$screen-lg` | `1200px` |
| `$screen-xl` | `1600px` |
| `$mobile-vw` | `768px` |
| `$nav-toggle` | `1200px` |
| `$label-xs-size` | `rem-calc(12)` |
| `$label-xs-size-mobile` | `rem-calc(12)` |
| `$label-sm-size` | `rem-calc(14)` |
| `$label-sm-size-mobile` | `rem-calc(14)` |
| `$label-md-size` | `rem-calc(16)` |
| `$label-md-size-mobile` | `rem-calc(16)` |
| `$label-lg-size-mobile` | `rem-calc(18)` |
| `$label-xl-size-mobile` | `rem-calc(20)` |
| `$label-3xl-size-mobile` | `rem-calc(28)` |
| `$label-4xl-size-mobile` | `rem-calc(32)` |
| `$hover-text-decoration` | `none` |
| `$list-gap` | `$spacer-3xs` |
| `$list-mobile-gap` | `$spacer-mobile-2xs` |
| `$list-padding-left` | `$spacer-md` |
| `$list-mobile-padding-left` | `$spacer-mobile-md` |
