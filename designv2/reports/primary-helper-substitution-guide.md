# Primary Helper Substitution Guide

Source context:

- UAT CSS: `designv2/incoming/abundanceuat-css.css`
- Primary v2 SCSS candidates: `designv2/scss/landing.scss`, `designv2/scss/layout.scss`, `designv2/scss/editorial.scss`

Purpose: provide clean candidate UAT helper substitutions so the primary SCSS files can be temporarily suppressed and the HTML updated for a practical breakage test.

No source files have been changed.

## Summary

Several primary v2 rules are generic enough to test as markup-level UAT helper classes. The strongest candidates are wrappers, section spacing, image responsiveness and simple positioning.

Not every rule has a safe helper equivalent. Scoped link resets, editorial heading safety and horizontal overflow clipping should be tested carefully because they protect against platform/default CSS rather than expressing ordinary layout.

## Candidate Substitutions

| Current v2 class / rule | Closest UAT helper substitution | Confidence | Notes |
|---|---|---:|---|
| `.abv2-wrap` | `choke-1200 mx-auto p-x-spacer-xs` | Medium | Closest to `width:min(calc(100% - 36px), 1180px)`. `choke-1200` is 1200px, so slightly wider than v2. Padding approximates the 36px total gutter. |
| `.abv2-wrap--narrow` | `choke-1000 mx-auto p-x-spacer-xs` | Medium | Closest to `width:min(calc(100% - 36px), 980px)`. `choke-1000` is 1000px, so slightly wider. |
| `.abv2-sec` | `position-relative p-y-spacer-xl` | Medium | `p-y-spacer-xl` is close to the v2 section rhythm: about 80px desktop and 56px mobile, versus v2 84px desktop and 56px mobile/tablet. |
| `.abv2-sec` alternate | `position-relative p-y-spacer-2xl` | Low/Medium | Larger than v2: about 96px desktop and 67px mobile. Use only if pages feel too tight with `p-y-spacer-xl`. |
| `.abv2-stack > * + *` | Manual child classes such as `m-t-spacer-sm` or `m-t-spacer-md` | Low | No exact structural stack helper found. This changes from automatic child rhythm to explicit per-child spacing. |
| `.abv2-editorial__wrap` | `choke-1200 mx-auto p-t-spacer-sm p-x-spacer-xs position-relative` | Medium | Closest to editorial wrap. `p-t-spacer-sm` gives about 32px desktop top padding. Width is slightly wider than the v2 1180px rail. |
| `.abv2-landing { position:relative; background:white; }` | `position-relative bg-colour--white` | Medium | Covers only part of the root rule. Does not cover `overflow-x:hidden` or text colour. |
| `.abv2-landing img` | `img-responsive` | High if markup-controlled | UAT `.img-responsive` matches `display:block; max-width:100%; height:auto`. |
| `.abv2-editorial img` | `img-responsive` | High if markup-controlled | Same as landing images. Keep scoped rule if CMS images cannot reliably receive classes. |
| `.abv2-landing a` | Use explicit link/button classes per link | Medium | No direct scoped helper equivalent found for “all links inherit colour and remove underline”. Use existing scoped inline-link/button classes where appropriate. |
| `.abv2-editorial h1`-`h5` | Apply explicit v2/SI type classes in markup | Low/Medium | Useful only where heading markup is controlled. CMS-rendered raw headings may still need scoped heading safety. |

## Suggested HTML Test Patterns

### Standard Wide Wrap

Current:

```html
<div class="abv2-wrap">
  ...
</div>
```

Candidate:

```html
<div class="choke-1200 mx-auto p-x-spacer-xs">
  ...
</div>
```

### Narrow Wrap

Current:

```html
<div class="abv2-wrap abv2-wrap--narrow">
  ...
</div>
```

Candidate:

```html
<div class="choke-1000 mx-auto p-x-spacer-xs">
  ...
</div>
```

### Section Spacing

Current:

```html
<section class="abv2-sec">
  ...
</section>
```

Candidate:

```html
<section class="position-relative p-y-spacer-xl">
  ...
</section>
```

Larger spacing candidate:

```html
<section class="position-relative p-y-spacer-2xl">
  ...
</section>
```

### Editorial Wrap

Current:

```html
<div class="abv2-editorial__wrap">
  ...
</div>
```

Candidate:

```html
<div class="choke-1200 mx-auto p-t-spacer-sm p-x-spacer-xs position-relative">
  ...
</div>
```

### Landing Root

Current:

```html
<main class="abv2-landing">
  ...
</main>
```

Candidate:

```html
<main class="position-relative bg-colour--white">
  ...
</main>
```

Important: this does not replicate `overflow-x:hidden`, inherited text colour or scoped link reset.

### Responsive Images

Current:

```html
<img src="..." alt="">
```

Candidate:

```html
<img class="img-responsive" src="..." alt="">
```

## Rules With No Clean Helper Equivalent

### Scoped Landing Link Reset

Current:

```css
.abv2-landing a {
  color: inherit;
  text-decoration: none;
}
```

This is not just layout. It prevents platform/default links becoming blue and underlined inside landing pages.

Replacement approach:

- Use explicit button classes for CTA links.
- Use existing inline-link classes where text links should remain styled as links.
- Review every landing anchor after suppressing `landing.scss`.

### Landing Horizontal Overflow

Current:

```css
.abv2-landing {
  overflow-x: hidden;
}
```

UAT has `.overflow-hidden`, but that is stronger because it clips vertical overflow as well. There does not appear to be a clean `overflow-x-hidden` helper.

Replacement approach:

- Suppress and test.
- If horizontal scroll appears, restore a targeted page/root overflow-x rule.

### Editorial Heading Safety

Current:

```css
.abv2-editorial h1,
.abv2-editorial h2,
.abv2-editorial h3,
.abv2-editorial h4,
.abv2-editorial h5 {
  font-family: var(--abv2-serif);
  font-weight: 600;
  letter-spacing: -.03em;
  color: var(--abv2-ink);
}
```

This protects raw CMS headings from Bootstrap/platform heading defaults. It can be removed only if editorial heading markup reliably carries explicit type classes.

Replacement approach:

- Use explicit type classes for authored/static HTML.
- Keep scoped heading safety for CMS-rendered editorial content unless proven unnecessary.

### Page Background Overrides

Current:

```css
.abv2-editorial-page .main-content,
.abv2-editorial-page .page-content,
.abv2-editorial-page .content-wrapper {
  background: var(--abv2-editorial-bg) !important;
}
```

This counters platform wrapper backgrounds. There is no exact helper replacement because it targets existing wrapper classes.

Replacement approach:

- Suppress and check whether platform wrappers turn white.
- Restore only if the editorial background breaks.

## Recommended Suppression Test Order

1. Suppress `landing.scss`.
2. Replace landing images with `img-responsive` where practical.
3. Replace obvious landing wrappers/sections with `choke-*`, `mx-auto`, `p-x-spacer-*`, and `p-y-spacer-*`.
4. Check links, horizontal overflow, page background and heading style.
5. Suppress `layout.scss`.
6. Replace `.abv2-wrap`, `.abv2-wrap--narrow`, `.abv2-sec`, and `.abv2-stack` usage in templates.
7. Suppress `editorial.scss` only after checking whether CMS heading and image classes can be controlled.

## Manual Review Checklist

- Check desktop and mobile rails after replacing `.abv2-wrap` with `choke-1200`.
- Check whether `p-x-spacer-xs` creates too much horizontal inset on desktop.
- Check section rhythm with `p-y-spacer-xl` first, then try `p-y-spacer-2xl` if too tight.
- Check every landing anchor for unintended blue/underlined Bootstrap styling.
- Check whether any decorative section creates horizontal scroll without `overflow-x:hidden`.
- Check CMS editorial headings without scoped heading safety.
- Check editorial page wrapper backgrounds after removing the page-level override.
