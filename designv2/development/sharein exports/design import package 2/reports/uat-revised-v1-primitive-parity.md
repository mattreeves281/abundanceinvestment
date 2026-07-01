# Primitive Value Parity

This compares compiled package 2 primitive/component declarations against `designv2/sharein exports/uat revised v1.css`.

Renamed card classes are compared as old spec selector -> new UAT selector.

## Summary

- Primitive selectors checked: 43
- Exact declaration matches: 16
- Non-exact / needs audit: 27

## Non-Exact Selectors

- **differs**: `.body--sm`
  - missing @media(max-width:767px) `line-height: 1.45`
  - mismatch base `letter-spacing`: expected `.006em`, actual `normal`
- **differs**: `.body--md`
  - mismatch base `letter-spacing`: expected `.005em`, actual `normal`
- **differs**: `.body--lg`
  - mismatch base `line-height`: expected `1.55`, actual `1.5`
  - mismatch base `letter-spacing`: expected `.004em`, actual `normal`
- **differs**: `.body--xl`
  - mismatch base `letter-spacing`: expected `.002em`, actual `normal`
- **differs**: `.si-heading-1`
  - missing base `letter-spacing: -.03em`
  - missing @media(max-width:767px) `line-height: .94`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.si-heading-2`
  - missing base `letter-spacing: -.03em`
  - missing @media(max-width:767px) `line-height: .96`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.si-heading-3`
  - missing base `letter-spacing: -.03em`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.si-heading-4`
  - missing base `letter-spacing: -.03em`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.si-heading-5`
  - missing base `letter-spacing: -.03em`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.si-heading-6`
  - missing base `letter-spacing: -.03em`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.label--xs`
  - mismatch base `line-height`: expected `1.2`, actual `1`
  - mismatch base `color`: expected `#363635`, actual `#4d4a46`
- **differs**: `.label--sm`
  - mismatch base `line-height`: expected `1.2`, actual `1`
  - mismatch base `color`: expected `#363635`, actual `#4d4a46`
- **differs**: `.label--md`
  - mismatch base `line-height`: expected `1.2`, actual `1`
  - mismatch base `color`: expected `#363635`, actual `#4d4a46`
- **differs**: `.label--lg`
  - mismatch base `line-height`: expected `1.2`, actual `1`
  - mismatch base `color`: expected `#363635`, actual `#4d4a46`
  - mismatch base `font-size`: expected `1.125rem`, actual `1.25rem`
- **differs**: `.abundance-stat`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **differs**: `.abundance-heading-display`
  - mismatch base `font-weight`: expected `600`, actual `700`
- **candidate-missing**: `.abundance-card-copy`
  - missing base `font-family: "sohne buch",system-ui,-apple-system,blinkmacsystemfont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif`
  - missing base `font-size: 1.05rem`
  - missing base `line-height: 1.55`
  - missing base `color: rgba(54,54,53,.78)`
- **matches-with-extra**: `.si-card`
  - extra base `background-color: #fff`
  - extra base `border: 1.5px solid rgba(54,54,53,.12)`
  - extra base `border-radius: 24px`
  - extra base `box-shadow: 0 10px 30px rgba(54,54,53,.05)`
  - extra base `font-family: "sohne buch",system-ui,-apple-system,blinkmacsystemfont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif`
  - extra base `font-size: 1.05rem`
  - extra base `line-height: 1.55`
  - extra base `color: rgba(54,54,53,.78)`
- **differs**: `.abundance-card-soft-bordered` -> `.abundance-card--soft-bordered`
  - mismatch base `box-shadow`: expected `0 12px 34px rgba(54,54,53,.05)`, actual `0 10px 30px rgba(54,54,53,.05)`
  - extra base `background: #fff`
  - extra base `border-radius: 28px`
  - extra @media(max-width:767px) `border-radius: 24px`
- **differs**: `.abundance-colour-card` -> `.abundance-card--color-card`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-neutral` -> `.abundance-card--color-neutral`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-pink` -> `.abundance-card--color-pink`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - mismatch base `background`: expected `#c1658b`, actual `#f27fae`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-teal` -> `.abundance-card--color-teal`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-yellow` -> `.abundance-card--color-yellow`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-green` -> `.abundance-card--color-green`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-pink-light` -> `.abundance-card--color-pink-light`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - extra base `border: none`
- **differs**: `.abundance-colour-card-teal-light` -> `.abundance-card--color-teal-light`
  - missing base `min-height: 160px`
  - missing base `padding: 1rem`
  - mismatch base `background`: expected `#00a4b6`, actual `#4cbfcb`
  - extra base `border: none`

## Exact Selectors

- `.body--xs`
- `.abundance-eyebrow`
- `.abundance-body-compact`
- `.abundance-action-text`
- `.si-card--primary`
- `.si-card--secondary`
- `.si-card--tertiary`
- `.si-card--0`
- `.si-card--2xs`
- `.si-card--xs`
- `.si-card--sm`
- `.si-card--md`
- `.si-card--lg`
- `.si-card--no-border-radius`
- `.si-card--full-height`
- `.abundance-card-soft` -> `.abundance-card--soft`
