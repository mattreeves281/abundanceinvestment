# SCSS Non-Hex Colour Audit

This audit covers non-hex colour usage in `/Users/mattreeves/abundanceinvestment/designv2/scss`, restricted to colour-bearing properties such as `color`, `background`, `border`, `box-shadow`, and related declarations.

## Summary

- Files with non-hex colour usage: `65`
- `rgba(...)` uses: `211`
- `transparent`: `36`
- `currentColor`: `3`
- `inherit` on colour properties: `5`
- gradient declarations with non-hex stops: `3`
- `rgb(...)`, `hsl(...)`, `hsla(...)`: `0`

## Can These All Become Hex?

Not all of them should become plain hex tokens.

### Yes, clean candidates for tokenisation
- Solid colours that are currently expressed as semi-system overlays and text tones, for example:
  - `rgba(38,38,37,.08)`
  - `rgba(38,38,37,.10)`
  - `rgba(38,38,37,.72)`
  - `rgba(38,38,37,.78)`
  - `rgba(223,115,173,.08)`
  - `rgba(223,115,173,.45)`
- These should usually become named tokens, but probably as alpha-aware tokens rather than plain solid-colour tokens.

### Not ideal as plain hex
- `rgba(...)` values with alpha:
  - can technically become 8-digit hex, but that is usually harder to read and maintain
  - better options are:
    - explicit alpha tokens like `--abv2-ink-08`
    - or RGB channel tokens combined with `rgba(var(--token-rgb), .08)` if you want a scalable system
- `transparent`
  - should usually stay `transparent`
  - it is semantic and does not represent a design colour choice
- `currentColor`
  - should stay `currentColor`
  - it is intentionally linked to the current text colour
- `inherit`
  - should stay `inherit`
  - it is behavioural, not a colour value
- gradients
  - the stops inside them can be tokenised
  - but the gradient itself is not replaceable by a single hex token

## Most Common Non-Hex Values

- `transparent` -> `36`
- `rgba(38,38,37,.08)` -> `27`
- `rgba(38,38,37,.10)` -> `16`
- `rgba(15,23,42,.08)` -> `10`
- `rgba(38,38,37,.04)` -> `7`
- `rgba(38,38,37,.78)` -> `7`
- `inherit` -> `5`
- `rgba(15,23,42,.06)` -> `5`
- `rgba(223,115,173,.45)` -> `5`
- `rgba(38,38,37,.14)` -> `5`
- `rgba(38,38,37,.72)` -> `5`
- `rgba(18,169,187,.12)` -> `4`
- `rgba(223,115,173,.08)` -> `4`
- `rgba(255,255,255,.12)` -> `4`
- `rgba(38,38,37,.12)` -> `4`

## Hotspot Files

These are the main files to inspect first:

- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss` -> `41`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_site-navbar.scss` -> `21`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss` -> `19`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_council-bar-chart.scss` -> `14`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss` -> `11`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss` -> `8`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss` -> `8`

## Notable Patterns

### Ink overlays and borders
- Repeated across many components:
  - `rgba(38,38,37,.04)`
  - `rgba(38,38,37,.08)`
  - `rgba(38,38,37,.10)`
  - `rgba(38,38,37,.12)`
  - `rgba(38,38,37,.14)`
  - `rgba(38,38,37,.18)`
- These look like strong candidates for a consistent alpha-token ladder based on ink.

### Ink text tones
- Repeated text colours:
  - `rgba(38,38,37,.54)`
  - `rgba(38,38,37,.62)`
  - `rgba(38,38,37,.64)`
  - `rgba(38,38,37,.68)`
  - `rgba(38,38,37,.72)`
  - `rgba(38,38,37,.78)`
  - `rgba(38,38,37,.80)`
  - `rgba(38,38,37,.82)`
- These are good candidates for semantic text tokens.

### Brand tint overlays
- Pink:
  - `rgba(223,115,173,.08)`
  - `rgba(223,115,173,.16)`
  - `rgba(223,115,173,.45)`
- Teal:
  - `rgba(18,169,187,.12)`
  - `rgba(0,164,182,.04)`
  - `rgba(0,164,182,.06)`
  - `rgba(0,164,182,.12)`
  - `rgba(0,164,182,.15)`
- Yellow:
  - `rgba(239,181,42,.14)`
  - `rgba(239,181,42,.16)`
  - `rgba(239,181,42,.18)`
  - `rgba(239,181,42,.22)`

### White alpha
- Repeated white-on-dark treatments:
  - `rgba(255,255,255,.12)`
  - `rgba(255,255,255,.14)`
  - `rgba(255,255,255,.16)`
  - `rgba(255,255,255,.28)`
  - `rgba(255,255,255,.82)`
  - `rgba(255,255,255,.84)`
  - `rgba(255,255,255,.88)`
  - `rgba(255,255,255,.90)`

### Dark neutral shadows
- Used mainly in chart and AI-related components:
  - `rgba(15,23,42,.06)`
  - `rgba(15,23,42,.08)`
  - `rgba(15,23,42,.24)`
  - `rgba(0,0,0,.04)`
  - `rgba(0,0,0,.06)`
  - `rgba(0,0,0,.08)`
  - `rgba(0,0,0,.12)`
  - `rgba(0,0,0,.14)`
  - `rgba(0,0,0,.45)`

## Special Cases

### `currentColor`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:10`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:64`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:106`

These should stay as `currentColor` unless you intentionally want to break the border from the text colour.

### `inherit`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss:128`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-legalnotes.scss:41`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:178`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/council.scss:22`
- `/Users/mattreeves/abundanceinvestment/designv2/scss/homepage.scss:22`

These should stay as `inherit`.

### Gradient with tokenisable stops
- `/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss:165`

This is the main place where colour is embedded inside a gradient:

- `linear-gradient(90deg, rgba(226,109,166,.24), rgba(18,169,187,.12), rgba(239,181,42,.18))`

The stops can be tokenised, but the gradient itself is not a single colour token.

## Recommendation

For a cleanup pass, the safest approach is:

1. Create alpha-aware colour tokens for repeated `rgba(...)` values.
2. Keep `transparent`, `currentColor`, and `inherit` as-is.
3. Tokenise gradient stops individually where they recur.
4. Consider a semantic token layer for muted ink text values and soft borders/shadows.
