# SCSS Non-Hex Colour Audit

This audit covers non-hex colour usage in `/Users/mattreeves/abundanceinvestment/designv2/scss`, restricted to colour-bearing properties such as `color`, `background`, `border`, `box-shadow`, and related declarations.

## Summary

- Files with non-hex colour usage: `73`
- `rgba(...)` uses: `232`
- `transparent`: `38`
- `currentColor`: `3`
- `inherit` on colour properties: `5`
- gradient declarations with non-hex stops: `3`
- `rgb(...)`, `hsl(...)`, `hsla(...)`: `0`

## Can These All Become Hex?

Not all of them should become plain hex tokens.

### Yes, clean candidates for tokenisation
- Repeated `rgba(...)` colours are good candidates for tokenisation, but usually as alpha-aware tokens rather than plain solid hex tokens.

### Not ideal as plain hex
- `rgba(...)` with alpha: better as semantic alpha tokens or channel-based tokens than raw 8-digit hex.
- `transparent`: should usually stay `transparent`.
- `currentColor`: should usually stay `currentColor`.
- `inherit`: should usually stay `inherit`.
- gradients: tokenise the colour stops, not the whole gradient as a single hex token.

## Most Common Non-Hex Values

- `transparent` -> `38`
- `rgba(38,38,37,.08)` -> `31`
- `rgba(38,38,37,.10)` -> `16`
- `rgba(15,23,42,.08)` -> `10`
- `rgba(38,38,37,.04)` -> `7`
- `rgba(38,38,37,.12)` -> `7`
- `rgba(38,38,37,.78)` -> `7`
- `inherit` -> `5`
- `rgba(15,23,42,.06)` -> `5`
- `rgba(223,115,173,.45)` -> `5`
- `rgba(38,38,37,.1)` -> `5`
- `rgba(38,38,37,.14)` -> `5`
- `rgba(38,38,37,.72)` -> `5`
- `rgba(18,169,187,.12)` -> `4`
- `rgba(223,115,173,.08)` -> `4`
- `rgba(255,255,255,.12)` -> `4`
- `rgba(255,255,255,.84)` -> `4`
- `rgba(38,38,37,.18)` -> `4`
- `rgba(38,38,37,.62)` -> `4`
- `currentColor` -> `3`

## Hotspot Files

- [_abv2-open-card.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss) -> `41`
- [_site-navbar.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_site-navbar.scss) -> `21`
- [_abv2-egp.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss) -> `19`
- [_council-bar-chart.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_council-bar-chart.scss) -> `14`
- [_abv2-council-live.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-live.scss) -> `8`
- [_abv2-ed-open-invest.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss) -> `8`
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss) -> `8`
- [buttons.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss) -> `8`
- [_abv2-compare.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss) -> `7`
- [_abv2-card.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-card.scss) -> `6`

## Special Cases

### `currentColor`
- Usually intentional, especially on button borders.
- [buttons.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:10) `1.8px solid currentColor`
- [buttons.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:64) `1.8px solid currentColor`
- [buttons.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/buttons.scss:106) `1.8px solid currentColor`

### `inherit`
- Usually behavioural and should stay as-is.
- [_abv2-egp.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss:128) `inherit`
- [_abv2-legalnotes.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-legalnotes.scss:41) `inherit`
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:178) `inherit`
- [council.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/council.scss:22) `inherit`
- [homepage.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/homepage.scss:22) `inherit`

### Gradients with tokenisable stops
- [_abv2-ed-open-invest.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss:13) `linear-gradient(180deg, var(--abv2-cream-fffdfa) 0%, var(--abv2-white) 100%)`
- [_abv2-ed-open-invest.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss:165) `linear-gradient(90deg, rgba(226,109,166,.24), rgba(18,169,187,.12), rgba(239,181,42,.18))`
- [_abv2-egp.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss:332) `linear-gradient(90deg, var(--abv2-stone-f6f2ef) 25%, var(--abv2-stone-efe9e5) 50%, var(--abv2-stone-f6f2ef) 75%)`

## Recommendation

1. Create alpha-aware colour tokens for repeated `rgba(...)` values.
2. Keep `transparent`, `currentColor`, and `inherit` as-is.
3. Tokenise gradient stops individually where they recur.