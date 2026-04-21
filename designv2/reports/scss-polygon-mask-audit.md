# SCSS Polygon And Mask Audit

This audit identifies the SCSS assets and component files that use polygon clips, SVG masks, or path-based clip shapes, so they can be normalised consistently.

## Main Finding

The homepage pink and teal sections already have shared tokenised polygon clips in `tokens.scss`, but both files also contain hard-coded polygon overrides at tablet/desktop breakpoints. That is the main source of drift.

## Shared Shape Tokens

Defined in [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss):

- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:44) `--abv2-pink-clip`
- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:53) `--abv2-teal-clip`
- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:62) `--abv2-pink-clip-mobile`
- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:71) `--abv2-teal-clip-mobile`
- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:80) `--abv2-dot-mask`

These token blocks are repeated across multiple `:root` provenance groups in the same file as part of the current unrefined import state.

## Homepage Polygon Sections

### Pink family using shared clip tokens

- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:17) `clip-path: var(--abv2-pink-clip);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:197) `clip-path: var(--abv2-pink-clip-mobile);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:240) `clip-path: var(--abv2-pink-clip);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:333) `clip-path: var(--abv2-pink-clip-mobile);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:369) `clip-path: var(--abv2-pink-clip);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:410) `clip-path: var(--abv2-pink-clip-mobile);`
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:444) `clip-path: var(--abv2-pink-clip-mobile);`

### Pink family with hard-coded polygon overrides

- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:66) desktop/tablet hard-coded polygon
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss:129) tablet hard-coded polygon

### Other pink-section derivatives using shared clip tokens

- [_abv2-how.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how.scss:16) `var(--abv2-pink-clip)`
- [_abv2-how.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how.scss:63) `var(--abv2-pink-clip-mobile)`
- [_abv2-how.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how.scss:84) `var(--abv2-pink-clip-mobile)`
- [_abv2-cta-band.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-cta-band.scss:16) `var(--abv2-pink-clip)`
- [_abv2-cta-band.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-cta-band.scss:87) `var(--abv2-pink-clip-mobile)`
- [_abv2-cta-band.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-cta-band.scss:108) `var(--abv2-pink-clip-mobile)`
- [_abv2-feature-illo.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-feature-illo.scss:16) `var(--abv2-pink-clip)`
- [_abv2-feature-illo.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-feature-illo.scss:74) `var(--abv2-pink-clip-mobile)`
- [_abv2-feature-illo.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-feature-illo.scss:89) `var(--abv2-pink-clip-mobile)`

### Teal family using shared clip tokens

- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:16) `clip-path: var(--abv2-teal-clip);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:198) `clip-path: var(--abv2-teal-clip-mobile);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:264) `clip-path: var(--abv2-teal-clip);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:361) `clip-path: var(--abv2-teal-clip-mobile);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:412) `clip-path: var(--abv2-teal-clip);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:455) `clip-path: var(--abv2-teal-clip-mobile);`
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:478) `clip-path: var(--abv2-teal-clip-mobile);`

### Teal family with hard-coded polygon overrides

- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:69) desktop/tablet hard-coded polygon
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss:128) tablet hard-coded polygon

### Other teal-section derivatives using shared clip tokens

- [_abv2-case.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-case.scss:16) `var(--abv2-teal-clip)`
- [_abv2-case.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-case.scss:88) `var(--abv2-teal-clip-mobile)`
- [_abv2-case.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-case.scss:110) `var(--abv2-teal-clip-mobile)`
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:16) `var(--abv2-teal-clip)`
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:110) `var(--abv2-teal-clip-mobile)`
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:131) `var(--abv2-teal-clip-mobile)`

## Other Inline Polygon Clips

These use `clip-path: polygon(...)` directly rather than the shared pink/teal clip tokens:

- [_home-cta.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_home-cta.scss:18)
- [_home-cta.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_home-cta.scss:30)
- [_abv2-ed-shell.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-shell.scss:20)
- [_abv2-ed-shell.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-shell.scss:44)
- [_abv2-ed-shell.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-shell.scss:56)
- [_abv2-ed-shell.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-shell.scss:68)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:23)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:43)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:64)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:85)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:127)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:160)
- [_abv2-footer-wedge.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-footer-wedge.scss:184)

## Path-Based Clip Shapes

These are not polygon clips; they use explicit `clip-path: path(...)` chip/blob shapes:

- [_abv2-risk-primary.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-risk-primary.scss:34)
- [_abv2-warning.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-warning.scss:36)
- [_abv2-egp.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss:311)

These are the closest match to what you described as chip paths.

## Dot Mask Asset Consumers

These files use the shared blob-style SVG mask token `--abv2-dot-mask`:

- [_abv2-blob-anchor.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-blob-anchor.scss)
- [_abv2-compare.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss)
- [_abv2-decision.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-decision.scss)
- [_abv2-details.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-details.scss)
- [_abv2-ed-copy.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-copy.scss)
- [_abv2-ed-divider.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-divider.scss)
- [_abv2-ed-illus-top.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-illus-top.scss)
- [_abv2-ed-open-invest.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss)
- [_abv2-ed-panel.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-panel.scss)
- [_abv2-editorial-list-markers.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-editorial-list-markers.scss)
- [_abv2-egp.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-egp.scss)
- [_abv2-end-cta.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-end-cta.scss)
- [_abv2-faq.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-faq.scss)
- [_abv2-feature.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-feature.scss)
- [_abv2-features.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-features.scss)
- [_abv2-how-step.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how-step.scss)
- [_abv2-invest-insert.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-invest-insert.scss)
- [_abv2-path.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-path.scss)
- [_abv2-quote.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-quote.scss)
- [_abv2-ed-rhs-lino-spacer.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-rhs-lino-spacer.scss)

## Chip-Related Variables

The mobile menu chip sizing tokens are in [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss):

- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:86) `--abv2-mobile-menu-chip-h`
- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss:87) `--abv2-mobile-menu-chip-pad-x`

They are consumed in:

- [_site-navbar.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_site-navbar.scss:306)
- [_site-navbar.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_site-navbar.scss:458)
- [_site-navbar.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_site-navbar.scss:607)

These are chip sizing tokens only, not clip paths.

## Normalisation Priorities

If the goal is to make pink and teal section polygons consistent, the priority files are:

- [tokens.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/tokens.scss)
- [_abv2-pink.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-pink.scss)
- [_abv2-teal.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-teal.scss)
- [_abv2-how.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how.scss)
- [_abv2-cta-band.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-cta-band.scss)
- [_abv2-feature-illo.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-feature-illo.scss)
- [_abv2-case.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-case.scss)
- [_abv2-related.scss](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss)

The likely cleanup move later is:

1. Decide the canonical pink and teal polygon shapes by breakpoint.
2. Move those breakpoint variants into shared tokens.
3. Replace the hard-coded polygon overrides in `_abv2-pink.scss` and `_abv2-teal.scss` with token references.
