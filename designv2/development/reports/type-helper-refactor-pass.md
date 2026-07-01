# Abundance v2 Type Helper Refactor Pass

## Shared helpers added

Added repeated component roles to `designv2/scss/type.scss`:

- `.si-eyebrow`: uppercase UI eyebrow, `0.75rem / 1`, `700`, `0.05em`
- `.si-eyebrow-sm`: smaller uppercase UI eyebrow, `0.6875rem / 1`, `700`, `0.05em`
- `.si-body-compact`: compact body copy, `0.9375rem / 1.48`
- `.si-note`: note/support copy, `0.875rem / 1.45`
- `.si-meta`: UI/meta text, `0.875rem / 1.3`, `600`
- `.si-action-text`: small action/link text, `0.875rem / 1.2`, `700`
- `.si-stat`: serif stat value, `1.75rem / 0.96`, mobile `1.5rem / 0.98`

No spacing, margin or padding was added to type helpers.

## Component mappings

### `_abv2-case.scss`

- `.abv2-case__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-compare.scss`

- `.abv2-compare__kicker`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-compare__body`
- Removed local font declarations: sans family, `1rem`, `1.52`
- Required HTML helper: `.si-body-md` or `.body--md`
- Visual risk: low

- `.abv2-compare__term`
- Removed local font declarations: UI family, `0.82rem`, `1.25`
- Required HTML helper: `.si-meta`
- Visual risk: review, font changes to `0.875rem` and line-height to `1.3`

- `.abv2-compare__value`
- Removed local font declarations: sans family, `0.94rem`, `1.48`, mobile `0.9rem`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

### `_abv2-cta-band.scss`

- `.abv2-cta-band__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-path.scss`

- `.abv2-path__kicker`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-council-waitlist.scss`

- `.abv2-council-waitlist__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-how.scss`

- `.abv2-how__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-how-step__content .abv2-body`
- Removed local font declarations: `0.98rem`, `1.48`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

### `_abv2-related.scss`

- `.abv2-related__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-related__label`
- Removed local font declarations: UI family, `0.92rem`, `1.22`
- Required HTML helper: `.si-action-text`
- Visual risk: low

- `.abv2-related__desc`
- Removed local font declarations: sans family, `0.94rem`, `1.48`, mobile `0.9rem`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

### `_abv2-proof-band.scss`

- `.abv2-proof-band__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-proof-band__value`
- Removed local font declarations: serif family, `clamp(1.56rem, 2vw, 2.08rem)`, `600`, `0.94`, `-0.03em`, mobile clamp
- Required HTML helper: `.si-stat`
- Visual risk: high, fixed helper `1.75rem` differs from old max `2.08rem`

- `.abv2-proof-band__label`
- Removed local font declarations: sans family, `0.95rem`, `1.42`, mobile `0.88rem / 1.42`
- Required HTML helper: `.si-body-compact`
- Visual risk: review, line-height changes from `1.42` to `1.48`

### `_abv2-end-cta.scss`

- `.abv2-end-cta__eyebrow`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-end-cta__kicker`
- Removed local font declarations: UI family, `0.76rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-modal.scss`

- `.abv2-modal__eyebrow`
- Removed local font declarations: UI family, `0.74rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-modal__table th`
- Removed local font declarations: UI family, `0.78rem`, `1.2`, `700`, `0.04em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: review, line-height changes from `1.2` to `1`

- `.abv2-modal__table td`
- Removed local font declarations: sans family, `0.98rem`, `1.5`
- Required HTML helper: `.si-body-md` or `.body--md`
- Visual risk: low

- `.abv2-modal__note`
- Removed local font declarations: sans family, `0.9rem`, `1.5`
- Required HTML helper: `.si-note`
- Visual risk: low

### `_abv2-panel-cta.scss`

- `.abv2-panel-cta__kicker`
- Removed local font declarations: UI family, `0.72rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-council-proof.scss`

- `.abv2-council-proof__eyebrow`
- Removed local font declarations: UI family, `0.74rem`, `1`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

### `_abv2-editorial-related.scss`

- `.abv2-editorial-related__type`
- Removed local font declarations: UI family, `0.72rem`, `1`, `700`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-editorial-related__desc`
- Removed local font declarations: sans family, `0.94rem`, `1.48`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

- `.abv2-editorial-related__cta`
- Removed local font declarations: UI family, `0.82rem`, `1.2`, `700`
- Required HTML helper: `.si-action-text`
- Visual risk: review, font changes to `0.875rem`

### `_abv2-compare-editorial.scss`

- `.abv2-editorial-compare__label`
- Removed local font declarations: UI family, `0.78rem`, `1`, `700`, `0.05em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-editorial-compare__note`
- Removed local font declarations: sans family, `0.95rem`, `1.5`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

- `.abv2-editorial-compare__list`
- Removed local font declarations: sans family, `1rem`, `1.45`
- Required HTML helper: `.si-body-md` or `.body--md`
- Visual risk: review, line-height changes from `1.45` to `1.5`

### `_abv2-6-up-block.scss`

- `.abv2-benefit-block__eyebrow`
- Removed local font declarations: UI family, `0.74rem`, `1`, `700`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow`
- Visual risk: low

- `.abv2-benefit-block__body`
- Removed local font declarations: sans family, `1rem`, `1.55`
- Required HTML helper: `.si-body-md` or `.body--md`
- Visual risk: review, line-height changes from `1.55` to `1.5`

- `.abv2-benefit-card__kicker`
- Removed local font declarations: UI family, `0.66rem`, `1`, `700`, `0.06em`, uppercase
- Required HTML helper: `.si-eyebrow-sm`
- Visual risk: low

- `.abv2-benefit-card__title`
- Removed local font declarations: serif family, `1.15rem`, `0.98`, `600`, `-0.03em`
- Required HTML helper: `.si-heading-5`
- Visual risk: high, helper is `1.25rem / 1.08` desktop and `1.125rem / 1.08` mobile

- `.abv2-benefit-card__text`
- Removed local font declarations: sans family, `0.92rem`, `1.45`
- Required HTML helper: `.si-body-compact`
- Visual risk: low

## Typography intentionally left component-owned

- Large clamp-based hero/section headings where no approved helper matches closely.
- Small bespoke card titles where `.si-heading-5` would visibly change scale or rhythm, except the old compact card heading case called out above.
- Icon/control typography such as modal close button sizing.
- Component-specific responsive art/type pairings where the value appears visually tied to the layout.

## Second strict pass update

After review, the migration was tightened to remove remaining component-local type declarations from the non-experiment v2 SCSS partials.

Removed declaration types:

- `font-family`
- `font-size`
- `font-weight`
- `font-style`
- `line-height`
- `letter-spacing`
- `text-transform`

Excluded layers:

- `type.scss`
- `base.scss`
- `buttons.scss`
- `tokens.scss`
- `additional_tokens.scss`
- `layout.scss`
- `landing.scss`
- `overrides.scss`
- files under `designv2/scss/experiments`

The component partials now include inline SCSS audit comments in the form:

```scss
// .old-selector type removed. Instead use si-* helper in the HTML.
```

Validation command:

```bash
rg -n "font-(family|size|weight)|line-height|letter-spacing|text-transform" designv2/scss -g '*.scss' -g '!**/experiments/**' -g '!type.scss' -g '!base.scss' -g '!buttons.scss' -g '!tokens.scss' -g '!additional_tokens.scss' -g '!layout.scss' -g '!landing.scss' -g '!overrides.scss'
```

Result: no remaining component-local type declarations in the checked scope.

Colour-only selector blocks were also removed where the rule only existed to set `color`. Those removals are marked with inline comments recommending SI/UAT text colour helpers in HTML.

Important follow-up: the SCSS now expects the equivalent SI/platform type helpers to be added in HTML. Until the markup is updated, the removed component-owned typography will no longer be applied by those old selectors.
