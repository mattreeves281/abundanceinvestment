# Home Green Investing UAT Class Declaration Audit

Source CSS:

- `designv2/incoming/abundanceuat-css.css`

Source HTML under review:

```html
<section class="home-green-investing position-relative p-y-spacer-xs bg-colour--yellow-surface">
  <div class="container">
    <div class="row brand-media-box brand-media-box--reverse">
      <div class="col-md-4 col-12">
        <div class="flex-center m-b-spacer-md--mobile">
          <img
            loading="lazy"
            width="256"
            height="256"
            src="https://cdn4.sharein.com/abundance/cms/5d0ef308-e999-4ce0-bec0-29f52854a3f2.png"
            class="m-b-spacer-md"
          >
        </div>
      </div>
      <div class="col-md-7 offset-md-1 col-12">
        <h2 class="text-center--md" data-content="1-140087">
          Municipal investment marketplace
        </h2>
        <p class="body--lg text-choke--640 m-b-spacer-md text-center--md">
          <span data-content="2-140097">
            <span>
              Our marketplace is a place where investors can buy and sell their existing investments.
              This gives buyers another way to diversify their portfolio, and sellers a way to access
              the money they have invested before they are due to be repaid.
            </span>
          </span>
        </p>
        <div class="m-t-spacer-md flex-center--md">
          <a
            href="/councils/marketplace"
            class="brand-btn-grey--bordered brand-btn-grey--bordered--bordered btn btn--lg m-b-spacer-xs btn--icon"
            data-content="1-140088"
          >
            View marketplace
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Executive Summary

This section is already mostly composed from existing UAT/platform helper classes:

- Bootstrap/platform grid: `container`, `row`, `col-*`, `offset-*`
- spacing helpers: `p-y-spacer-xs`, `m-b-spacer-md`, `m-t-spacer-md`, `m-b-spacer-xs`
- flex/alignment helpers: `flex-center`, `flex-center--md`, `text-center--md`
- type helper: `body--lg`
- width/choke helper: `text-choke--640`
- surface helper: `bg-colour--yellow-surface`
- button classes: `btn`, `btn--lg`, `brand-btn-grey--bordered`

Classes present in the HTML but with no matching UAT declarations found:

- `home-green-investing`
- `brand-btn-grey--bordered--bordered`
- `btn--icon`

Those appear to be either semantic hooks, redundant classes, or expected to be styled elsewhere.

## Section Shell

### `.position-relative`

```css
.position-relative {
  position: relative !important;
}
```

### `.p-y-spacer-xs`

```css
.p-y-spacer-xs {
  padding-top: 1.05rem;
  padding-bottom: 1.05rem;
}

@media (min-width: 768px) {
  .p-y-spacer-xs {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
```

Likely related variables from revised config:

```scss
$spacer-xs: 1.5rem; // 24px
$spacer-mobile-xs: 0.75rem; // 12px
$screen-sm: 768px;
```

Note: the compiled mobile value is `1.05rem`, which suggests the platform spacing utility may apply a multiplier rather than using `$spacer-mobile-xs` directly.

### `.bg-colour--yellow-surface`

```css
.bg-colour--yellow-surface {
  background-color: #ffeecd;
}
```

Likely variable:

```scss
$abundance-yellow-surface: #ffeecd;
```

In the original config this was:

```scss
$abundance-yellow-surface: #ffedcc;
```

## Container And Grid

### `.container`

```css
.container,
.container-fluid,
.container-lg,
.container-md,
.container-sm {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1170px;
  }
}
```

Additional contextual UAT rules also exist:

```css
.site-navbar > .container {
  max-width: 1440px;
  padding: 0;
}

.si-impact-feed .container {
  width: 100%;
  max-width: 1300px;
}

.si-page .container {
  max-width: 1320px;
}
```

These are scoped and should not apply unless the section is inside those parent contexts.

### `.row`

```css
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -0.5);
  margin-left: calc(var(--bs-gutter-x) * -0.5);
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: var(--bs-gutter-y);
}
```

### Column Classes

```css
.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

@media (min-width: 992px) {
  .col-md-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }

  .col-md-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }

  .offset-md-1 {
    margin-left: 8.33333333%;
  }
}
```

Likely breakpoint variables:

```scss
$screen-sm: 768px;
$screen-md: 992px;
$screen-lg: 1200px;
```

## Brand Media Box

### `.brand-media-box`

```css
.brand-media-box {
  flex-direction: column-reverse;
}

@media (min-width: 992px) {
  .brand-media-box {
    flex-direction: row;
    margin-bottom: 0;
  }
}
```

### `.brand-media-box--reverse`

```css
.brand-media-box--reverse {
  flex-direction: column;
}
```

Interpretation:

- `row` supplies `display:flex`.
- `brand-media-box` changes the flex direction.
- `brand-media-box--reverse` changes the mobile ordering to `column`.
- At desktop, `.brand-media-box` switches the row back to `flex-direction: row`.

## Flex And Alignment

### `.flex-center`

```css
.flex-center {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
}
```

### `.flex-center--md`

```css
@media (max-width: 991px) {
  .flex-center--md {
    display: flex;
    justify-content: center;
  }
}
```

### `.text-center--md`

```css
@media (max-width: 991px) {
  .text-center--md {
    text-align: center !important;
  }
}
```

## Spacing Helpers

### `.m-b-spacer-md`

```css
.m-b-spacer-md {
  margin-bottom: 2.1rem;
}

@media (min-width: 768px) {
  .m-b-spacer-md {
    margin-bottom: 3rem;
  }
}
```

### `.m-b-spacer-md--mobile`

```css
.m-b-spacer-md--mobile {
  margin-bottom: 3rem !important;
}
```

### `.m-t-spacer-md`

```css
.m-t-spacer-md {
  margin-top: 2.1rem;
}

@media (min-width: 768px) {
  .m-t-spacer-md {
    margin-top: 3rem;
  }
}
```

### `.m-b-spacer-xs`

```css
.m-b-spacer-xs {
  margin-bottom: 1.05rem;
}

@media (min-width: 768px) {
  .m-b-spacer-xs {
    margin-bottom: 1.5rem;
  }
}
```

Likely variables:

```scss
$spacer-xs: 1.5rem;
$spacer-md: 3rem;
$screen-sm: 768px;
```

Again, the `2.1rem` and `1.05rem` mobile-ish compiled values suggest the platform spacing utilities apply a scale/multiplier.

## Type And Text Width

### `.body--lg`

```css
.body--lg {
  line-height: 1.62;
  font-weight: 400;
  font-family: "Sohne Buch", system-ui, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
  color: #4d4a46;
  letter-spacing: normal;
  font-size: 1.25rem;
}

@media (max-width: 767px) {
  .body--lg {
    font-size: 1.125rem;
  }
}
```

Likely variables:

```scss
$si-font-primary: ("Sohne Buch", $si-font-fallback);
$si-body-lg-size: rem-calc(20);        // 1.25rem
$si-body-lg-size-mobile: rem-calc(18); // 1.125rem
$si-color-text-secondary: $abundance-neutral-800; // #4d4a46
$si-font-weight-regular: 400;
```

### `.text-choke--640`

```css
.text-choke--640 {
  max-width: 640px;
}
```

## Button Classes

The CTA button uses:

```html
class="brand-btn-grey--bordered brand-btn-grey--bordered--bordered btn btn--lg m-b-spacer-xs btn--icon"
```

The classes with actual matching UAT declarations are:

- `btn`
- `btn--lg`
- `brand-btn-grey--bordered`
- `m-b-spacer-xs`

No matching UAT declarations were found for:

- `brand-btn-grey--bordered--bordered`
- `btn--icon`

### `.btn`

Base Bootstrap/platform button:

```css
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
```

Additional `.btn` rules exist for states and grouped contexts. The main base declaration above is the relevant one for this standalone link button.

### `.btn--lg`

```css
.btn,
.btn--lg,
.si-btn,
.si-btn--lg,
.brand-btn,
.brand-btn--lg {
  font-size: 1.125rem;
  padding: .9375rem 1.5rem;
}

@media (min-width: 768px) {
  .btn,
  .btn--lg,
  .si-btn,
  .si-btn--lg,
  .brand-btn,
  .brand-btn--lg {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
}
```

### `.brand-btn-grey--bordered`

```css
.brand-btn-grey--bordered {
  background-color: transparent;
  border-color: #4d4a46;
  color: #4d4a46;
}

.brand-btn-grey--bordered:hover {
  background-color: #e9e4e3;
  border-color: #4d4a46;
  color: #4d4a46;
}

.brand-btn-grey--bordered:active {
  background-color: #e9e4e3 !important;
  border-color: #282827;
  color: #4d4a46;
}

.brand-btn-grey--bordered:focus {
  background-color: transparent;
  border-color: #4d4a46;
  color: #4d4a46;
  outline: 2px solid #c1658b !important;
  outline-offset: 2px;
}

.brand-btn-grey--bordered:disabled {
  opacity: .6;
}
```

Likely colour variables:

```scss
$abundance-neutral-800: #4d4a46;
$abundance-neutral-900: #282827;
$abundance-neutral-300: #e9e4e3;
$si-color-focus: $abundance-pink-dark; // #c1658b
```

## Classes With No Matching UAT Declarations

### `.home-green-investing`

No UAT CSS rule found.

Likely role:

- semantic section hook
- JS/test hook
- legacy class retained from template
- currently not styling anything in UAT CSS

### `.brand-btn-grey--bordered--bordered`

No UAT CSS rule found.

Likely role:

- redundant/typo-like modifier
- old naming artefact
- does not appear to change styling in UAT CSS

### `.btn--icon`

No UAT CSS rule found.

Likely role:

- old modifier class
- expected icon-specific styling that is absent from UAT
- no effect unless other CSS outside UAT targets it

## Net Rendered Behaviour

The section is a yellow-surface band with relatively small vertical padding:

```css
background-color: #ffeecd;
padding-top: 1.05rem;    /* mobile/default */
padding-bottom: 1.05rem;
position: relative;
```

At `min-width: 768px`, the section padding increases:

```css
padding-top: 1.5rem;
padding-bottom: 1.5rem;
```

Inside it:

- `.container` constrains and centres content using Bootstrap-style max widths.
- `.row` creates a flex grid.
- `.brand-media-box` and `.brand-media-box--reverse` control image/text order.
- `.col-md-4`, `.col-md-7`, and `.offset-md-1` create a 4-column image area and 7-column text area with a 1-column offset at `min-width: 992px`.
- `.flex-center` centres the image wrapper.
- `.text-center--md` centres text up to `991px`.
- `.body--lg` applies the large body text role.
- `.text-choke--640` limits paragraph width.
- `.brand-btn-grey--bordered` creates the grey outlined button style.

## Interpretation

This HTML is already strongly aligned with the existing UAT helper/component system. It does not appear to need new v2 helper CSS for its core layout, spacing, type, colour or button styling.

Potential cleanup candidates:

- Remove `home-green-investing` if it is not used as a semantic/test/JS hook.
- Remove `brand-btn-grey--bordered--bordered` unless another stylesheet or CMS behaviour depends on it.
- Remove `btn--icon` unless an icon is expected and the missing rule is intentional.

Potential design-system note:

- The section uses `p-y-spacer-xs`, which is quite tight for a content band. If this is visually too compressed, a larger existing UAT utility such as `p-y-spacer-md`, `p-y-spacer-lg`, or `p-y-spacer-xl` may be more appropriate without adding new v2 CSS.
