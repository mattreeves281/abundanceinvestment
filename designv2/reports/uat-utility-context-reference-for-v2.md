# UAT Utility Context Reference for v2 Refactoring

Source: `designv2/incoming/abundanceuat-css.css`

This is a curated reference for replacing bespoke `abv2` layout utilities with existing UAT/platform helpers where the behaviour is close enough. It is not a full selector dump.

## 1. Recommended Safe Utility Subset

### Containers / rails

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.container` | Standard platform rail with Bootstrap-style side gutters. | `width:100%`; side padding `var(--bs-gutter-x, .75rem)`; `margin-left/right:auto`; max-width `750px` at `sm`, `970px` at `md`, `1170px` at `lg`. In `.si-page` it becomes `1320px` at `1600px`. | Yes, for normal platform sections. | Also appears in navbar and component contexts. Use as direct section/grid container, not as a generic class inside old components without checking. |
| `.container-medium` | Narrower centred block. | `display:block`; `max-width:940px`; auto left/right margins. | Yes. | No built-in side padding; pair with `.p-x-spacer-xs` or similar when used as a page rail. |
| `.container--large` | Large fixed rail. | At `min-width:1500px`: `width:1440px !important`; `max-width:1440px`. | Caution. | Uses `!important`; only applies from `1500px`; can fight responsive v2 rails. |
| `.choke-400` to `.choke-1300` | Max-width clamps for custom rails and content wrappers. | `400=25rem`, `500=31.25rem`, `600=37.5rem`, `700=43.75rem`, `800=50rem`, `900=56.25rem`, `1000=62.5rem`, `1100=68.75rem`, `1200=75rem`, `1300=81.25rem`. | Yes. | They only set `max-width`; pair with `.mx-auto` / `.m-x--auto` and horizontal padding. |
| `.mx-auto`, `.m-x--auto`, `.m-x-spacer-auto` | Horizontal centring. | `margin-left:auto`; `margin-right:auto`. `.mx-auto` also appears with `!important`. | Yes. | Prefer `.m-x--auto` or `.m-x-spacer-auto` if avoiding Bootstrap `!important`. |
| `.p-x-spacer-xs`, `.p-x-spacer-sm`, `.p-x-spacer-md` | Horizontal inset padding. | `xs: 1.05rem -> 1.5rem`; `sm: 1.4rem -> 2rem`; `md: 2.1rem -> 3rem` at `min-width:768px`. | Yes. | Platform spacing is 70% mobile/default then full desktop. This may differ from exact v2 rails such as `calc(100% - 36px)`. |

### Grid / columns

Breakpoints: `sm = 768px`, `md = 992px`, `lg = 1200px`.

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.row` | Flex row wrapper for grid columns. | `display:flex`; `flex-wrap:wrap`; default `--bs-gutter-x:1.5rem`; `--bs-gutter-y:0`; negative half-gutter margins. | Yes. | Must wrap direct `.col-*` children to get expected column padding. |
| `.col-12` | Full-width column. | `flex:0 0 auto`; `width:100%`. | Yes. | Good mobile default. |
| `.col-sm-*` | 12-column widths from `768px`. | `1=8.333%` through `12=100%`; `auto` available. | Yes. | Use with `.col-12` for mobile fallback. |
| `.col-md-*` | 12-column widths from `992px`. | Same 12-column percentages; common layout examples: `.col-md-4`, `.col-md-6`, `.col-md-7`, `.col-md-8`. | Yes. | This is the usual platform breakpoint for two-column desktop layouts. |
| `.col-lg-*` | 12-column widths from `1200px`. | Same 12-column percentages. | Yes. | Useful when tablet should remain stacked. |
| `.offset-sm-*`, `.offset-md-*`, `.offset-lg-*` | Left offsets on the 12-column grid. | `1=8.333%`, `2=16.667%`, `3=25%`, etc.; responsive from each breakpoint. | Yes. | Use sparingly; offsets are layout-coupled and can be awkward in CMS editing. |
| `.row-cols-*`, `.row-cols-sm-*`, `.row-cols-md-*`, `.row-cols-lg-*` | Equal-width child columns. | `1=100%`, `2=50%`, `3=33.333%`, `4=25%`, `5=20%`, `6=16.667%`; `auto` available. | Yes. | Good for repeated card grids. Combine with `.g-*` / `.gy-*`. |

### Gutters

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.g-*` | Sets both row and column gutter CSS vars. | `0=0`, `3xs=.5rem`, `2xs=1rem`, `xs=1.5rem`, `sm=2rem`, `md=3rem`, `lg=4rem`, `xl=5rem`, `2xl=6rem`, `4xl=8rem`. | Yes. | Applies through `.row` because child padding uses `--bs-gutter-x/y`. |
| `.gx-*` | Horizontal gutter only. | Same scale as `.g-*`. | Yes. | Useful when vertical rhythm is handled by cards/spacing utilities. |
| `.gy-*` | Vertical gutter only. | Same scale as `.g-*`. | Yes. | Useful for card grids. |
| `.g-sm-*`, `.g-md-*`, `.g-lg-*` and matching `.gx-*` / `.gy-*` | Responsive gutters. | Apply from `768px`, `992px`, or `1200px`. | Yes. | Use when mobile needs compact gutters and desktop needs a wider layout. |

### Section and element spacing

Platform spacer utilities exist for all sides: `.p-y-spacer-*`, `.p-t-spacer-*`, `.p-b-spacer-*`, `.p-x-spacer-*`, `.p-all-spacer-*`, `.m-t-spacer-*`, `.m-b-spacer-*`, `.m-x-spacer-*`, `.m-y-spacer-*`, `.m-all-spacer-*`.

| Scale | Default/mobile compiled value | Desktop value at `min-width:768px` | Notes |
|---|---:|---:|---|
| `5xs` | `.0875rem` | `.125rem` | Tiny nudge. |
| `4xs` | `.175rem` | `.25rem` | Tiny nudge. |
| `3xs` | `.35rem` | `.5rem` | Small element gap. |
| `2xs` | `.7rem` | `1rem` | Compact element gap. |
| `xs` | `1.05rem` | `1.5rem` | Common small section/card gap. |
| `sm` | `1.4rem` | `2rem` | Medium element gap. |
| `md` | `2.1rem` | `3rem` | Common block spacing. |
| `lg` | `2.8rem` | `4rem` | Section-level spacing. |
| `xl` | `3.5rem` | `5rem` | Large section spacing. |
| `2xl` | `4.2rem` | `6rem` | Large section spacing. |
| `4xl` | `5.6rem` | `8rem` | Extra-large section spacing. |
| `6xl` / `8xl` | `11.2rem` | `16rem` | Very large page rhythm. |

Safe examples: `.p-y-spacer-xs`, `.p-y-spacer-xl`, `.p-t-spacer-md`, `.p-b-spacer-lg`, `.p-x-spacer-xs`, `.m-b-spacer-md`, `.m-t-spacer-sm`.

Mobile-only examples: `.m-b-spacer-md--mobile` sets `margin-bottom:3rem !important` at `max-width:767px`; similar `--mobile` variants exist for `xs`, `sm`, `lg`, `xl`, `2xl`, `4xl`, `6xl`, `8xl`.

Safe to reuse: yes for outer rhythm and CMS-authored spacing. Caveat: `--mobile` helpers use `!important`; use them deliberately.

### Width / text measure

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.text-choke--640` | Text measure clamp. | `max-width:640px`. | Yes. | Does not centre by itself. |
| `.text-choke--960` | Wider text/content measure. | `max-width:960px`. | Yes. | Does not centre by itself. |
| `.text-choke-md--640` | Text measure at `md` and up. | `max-width:640px` from `992px`. | Yes. | Mobile remains unconstrained unless paired with other wrappers. |
| `.text-choke-md--960` | Wider measure at `md` and up. | `max-width:960px` from `992px`. | Yes. | Same caveat. |
| `.choke-400` to `.choke-1300` | General max-width utilities. | See container section. | Yes. | Pair with `.m-x--auto` / `.mx-auto`. |
| `.m-x--auto`, `.mx-auto`, `.m-x-spacer-auto` | Centre a constrained block. | Auto left/right margins. | Yes. | `.mx-auto` can be `!important`. |

### Flex / alignment / display

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.d-flex`, `.d-block`, `.d-grid` | Display helpers. | `display:flex/block/grid !important`. | Yes. | Bootstrap-style `!important`. |
| `.align-items-center`, `.align-items-start`, `.align-items-end` | Cross-axis alignment. | `align-items:center/flex-start/flex-end !important`. | Yes. | Requires flex/grid context. |
| `.justify-content-center`, `.justify-content-between`, `.justify-content-start`, `.justify-content-end` | Main-axis alignment. | `justify-content:* !important`. | Yes. | Requires flex/grid context; `!important`. |
| `.flex-center` | Platform centre helper. | `display:flex`; `align-items:center`; `justify-content:center`; includes old flexbox prefixes. | Yes. | No `!important`; useful where component CSS should still win. |
| `.flex-center--md` | Centre on tablet/mobile only. | At `max-width:991px`: `display:flex`; `justify-content:center`. | Yes. | Does not set `align-items`. |
| `.text-center--md` | Centre text on tablet/mobile. | At `max-width:991px`: `text-align:center !important`. | Yes. | Mobile/tablet only; `!important`. |
| `.position-relative` | Establish positioning context. | `position:relative !important`. | Yes. | Uses `!important`. |

### Image / media

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.img-fluid` | Responsive image. | `max-width:100%`; `height:auto`. | Yes. | Does not set `display:block`. |
| `.img-responsive` | Legacy responsive image. | `display:block`; `max-width:100%`; `height:auto`. | Yes. | Good replacement for scoped `img{display:block;max-width:100%;height:auto}`. |
| `.ratio` | Aspect-ratio wrapper. | `position:relative`; `width:100%`; pseudo-element uses `padding-top:var(--bs-aspect-ratio)`; direct child is absolutely positioned full size. | Yes. | Child must be direct child. |
| `.ratio-1x1` | Square ratio. | `--bs-aspect-ratio:100%`. | Yes. |  |
| `.ratio-4x3` | 4:3 ratio. | `--bs-aspect-ratio:75%`. | Yes. |  |
| `.ratio-16x9` | 16:9 ratio. | `--bs-aspect-ratio:56.25%`. | Yes. |  |
| `.ratio-21x9` | 21:9 ratio. | `--bs-aspect-ratio:42.8571428571%`. | Yes. |  |

Missing media needs likely still required for v2: bespoke rounded media frames, overlapping image compositions, dot motifs, and any non-standard aspect ratios.

### Type helpers

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.heading-1` to `.heading-6` | Public heading/header scale. | New Kansas, Georgia, serif; `line-height:1.125`; `font-weight:600` except smaller headings also `500`; sizes: H1 `2.5rem -> 4rem`, H2 `2rem -> 3rem`, H3 `1.75rem -> 2.5rem`, H4 `1.5rem -> 1.75rem`, H5 `1.25rem -> 1.5rem`, H6 `1.125rem -> 1.25rem` at `768px`. | Yes for platform-consistent headings. | Also applies globally to `h1`-`h6`; may not match exact v2 editorial hierarchy. |
| `.si-heading-1` to `.si-heading-6` | SI component heading/header scale. | New Kansas, Georgia, serif; colour `#282827`; `line-height:1.08`; `font-weight:600`; `text-transform:none`. Desktop/mobile sizes: H1 `3.1875rem / 2.25rem`, H2 `2.875rem / 2rem`, H3 `2rem / 1.5rem`, H4 `1.5rem / 1.25rem`, H5 `1.25rem / 1.125rem`, H6 `1.125rem / 1rem`. Mobile breakpoint is `max-width:767px`. | Caution. | More SI-app/component flavoured than public marketing/page classes. Useful if the target is an SI component, but compare against v2 type spec. |
| `.body--xl`, `.body--lg`, `.body--md`, `.body--sm`, `.body--xs` | Public paragraph/body text roles. | Sohne Buch/system sans; `line-height:1.62`; `font-weight:400`; colour `#4d4a46`; sizes: `xl 1.5rem / 1.25rem mobile`, `lg 1.25rem / 1.125rem mobile`, `md 1.1875rem / 1rem mobile`, `sm .875rem`, `xs .75rem`. | Yes. | Best match for generic paragraphs. v2 may need tighter or more editorial-specific roles. |
| `.si-page-hero-paragraph` | Larger hero paragraph role. | Same body family/colour as `.body--lg`; `font-size:1.25rem`, mobile `1.125rem`; links inside become `#c1658b`. | Caution. | Link styling is scoped inside the class, so it brings more than paragraph sizing. |
| `.si-page__body`, `.si-page__body--default`, `.si-page__body--compact` | Page body wrappers, not paragraph text. | Default page body sets background/padding: desktop top `6rem`, bottom `8rem`; mobile bg `#fff`, top `1.5rem`, bottom `3rem`. Compact uses `1.5rem` top/bottom. | Avoid as text helper. | Useful context reference only; these are page shells, not type classes. |
| `.label--lg`, `.label--md`, `.label--sm`, `.label--xs`, `.label--xxs` | Label text roles. | Sohne/system sans; `line-height:1.2`; colour `#282827`; sizes from `1.125rem` down. | Yes. | Use for labels/captions, not decorative v2 eyebrow unless visually verified. |
| `.si-embedded-caption`, `.si-embedded-caption--lg`, `.si-embedded-caption--sm` | Caption text roles. | Sohne/system sans; colour `#4d4a46`; `line-height:1.35`; sizes: base `.875rem`, lg `1rem`, sm `.75rem`; mobile sizes unchanged. | Yes. | Good for media captions/small supporting text. |
| `.lead`, `.small` | Bootstrap text helpers. | `.lead`: `font-size:1.25rem`, `font-weight:300`; `.small`/`small`: `font-size:.875em`. | Caution. | Bootstrap-flavoured; `.lead` weight may not match Abundance v2. |
| `.display-1` to `.display-6` | Bootstrap display headings. | Fluid `calc(... + vw)` until `1200px`; final sizes range `5rem` down to `2.5rem`; `font-weight:300`; `line-height:1.2`. | Avoid for v2 unless explicitly wanted. | Uses viewport-based sizing and Bootstrap display tone, which likely conflicts with the v2 fixed type system. |
| `.font-primary` | Sans font helper. | System/Sohne-like stack. | Caution. | Name is misleading because platform also uses New Kansas as a brand face. |
| `.font-secondary` | Serif font helper. | New Kansas, Georgia, serif with `!important`. | Caution. | Uses `!important`. |
| `.text-start`, `.text-center`, `.text-end`, `.text-left`, `.text-right`, `.text-center--md` | Text alignment. | Bootstrap helpers use `!important`; legacy `.text-left/right` do not. | Yes. | Prefer explicit responsive classes where needed. |
| `.text-uppercase`, `.text-lowercase`, `.text-capitalize`, `.text-decoration-none`, `.text-decoration-underline` | Text transform/decoration utilities. | Bootstrap-style `!important`. | Yes. | Avoid if component state needs to override decoration. |
| `.text-primary`, `.text-secondary`, `.text-muted`, `.text-body`, `.text-dark`, `.text-white` | Bootstrap text colour helpers. | `primary #0d6efd`, `secondary/muted #6c757d`, `body/dark #212529`, `white #fff`; all `!important`. | Caution. | These are Bootstrap colours, not Abundance brand/v2 colours. Avoid for v2 brand text unless deliberately matching Bootstrap. |

### Button helpers

| Class / pattern | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.btn` | Base button shell. | Inline-block, centre text, transparent bg/border by default; later platform rule sets shared `.btn/.btn--lg/.si-btn/.si-btn--lg` to `font-size:1.125rem`, `padding:.9375rem 1.5rem`; at `768px`: `1.2rem`, `1rem 2rem`. | Yes, for platform buttons. | Bootstrap base also exists earlier; final cascade matters. |
| `.btn--sm`, `.btn--md`, `.btn--lg`, `.btn--xl` | Platform size modifiers. | `sm .875rem / .5625rem 1rem`; `md 1rem / .75rem 1rem`; `lg 1.125rem / .9375rem 1.5rem -> 1.2rem / 1rem 2rem`; `xl 1.25rem / 1.125rem 2rem`. | Yes. | Size only; pair with a visual variant. |
| `.btn--block`, `.brand-btn--block`, `.si-btn--block` | Full/block button. | `display:block`. | Yes. | Does not necessarily set width `100%`. |
| `.brand-btn-grey--bordered` | Grey outline brand button. | Transparent bg; border `#4d4a46`; text `#4d4a46`; hover/active bg `#e9e4e3`; focus outline `2px solid #c1658b`. | Yes. | Good available outline button, but not v2-specific unless accepted visually. |
| `.brand-btn-primary` | Filled primary brand button. | White text; bg/border `#f27fae`; hover/focus/active darken through platform states. | Caution. | Pink may be old/v1 platform primary, not necessarily v2 button spec. |
| `.brand-btn-secondary` | Filled secondary brand button. | White text; bg/border `#00a4b6`. | Caution. | Check against v2 teal button treatment. |
| `.brand-btn-yellow` | Filled yellow surface button. | Bg/border `#ffeecd`; text `#4d4a46`. | Caution. | Surface-like button; may not meet contrast/intent for v2 CTAs. |
| `.brand-btn-yellow--bordered` | Yellow outline button. | Transparent bg; border `#ffb72c`; text `#cc9223`. | Caution. | Old yellow/orange styling. |
| `.si-btn--primary`, `.si-btn--secondary`, `.si-btn--tertiary` | SI outline button variants. | Transparent bg; border/text `#f27fae`, `#00a4b6`, or `#454543`; box-shadow none. | Caution. | Useful platform controls, but not a substitute for v2 CTA styling without visual check. |

### Background colour / surface helpers

| Class | Value | Safe to reuse? | Caveats |
|---|---:|---|---|
| `.bg-colour--white` | `#fff` | Yes |  |
| `.bg-colour--black` | `#282827` | Yes | Platform ink/black. |
| `.bg-colour--grey` | `#71716e` | Caution | Mid grey, not a neutral surface. |
| `.bg-colour--neutral--100` | `#faf8f8` | Yes | Useful soft off-white surface. |
| `.bg-colour--neutral--300` | `#e9e4e3` | Yes | Useful border/soft surface tone. |
| `.bg-colour--yellow-surface` | `#ffeecd` | Yes | Confirmed updated UAT value. |
| `.bg-colour--primary`, `--primary-light`, `--primary-mid`, `--primary-dark`, `--primary-surface` | `#f27fae` | Caution | All collapse to the same pink value in UAT. |
| `.bg-colour--secondary`, `--secondary-light`, `--secondary-mid`, `--secondary-dark`, `--secondary--surface` | `#00a4b6` | Caution | All collapse to the same teal value in UAT. |
| `.bg-colour--tertiary` | `#ffce4e` | Caution | Yellow/brand accent. |
| `.bg-colour--tertiary-light/mid/dark/surface` | mostly `#00a4b6` in UAT | Avoid until verified | Naming/value mismatch. |
| `.bg-colour--lewisham`, `.bg-colour--suffolk`, `.bg-colour--westminster` | `#009eb3`, `#a2bd30`, `#0b2265` | Caution | Council/place-specific. |

Missing v2 colour helpers likely required: separate v2 pink surface, teal surface, soft/strong variants, and any exact v2 editorial backgrounds if they differ from current platform values.

### Mask helpers

| Class | What it does | Key values | Safe to reuse? | Caveats |
|---|---|---|---|---|
| `.bg-mask` | Base mask element. | `display:block`; `width:100%`; `height:0`; `mask-size/repeat/position: cover/no-repeat/center`; same `-webkit-` properties. | Yes. | Needs a directional modifier and normally sits as an empty divider element. |
| `.bg-mask--b-convex` | Bottom convex divider. | `padding-top:7%`; inline SVG data URI mask; `margin-top:-.0625rem`. | Yes for existing yellow/legacy sections. | Shape is old platform mask, not necessarily v2. |
| `.bg-mask--t-convex` | Top convex divider. | `padding-top:7%`; inline SVG data URI mask. | Yes for existing platform sections. | New v2 mask variants may still be required if the curves differ. |

## 2. Avoid / Use With Caution

| Class / pattern | Recommendation | Why |
|---|---|---|
| `.col` by itself | Use with caution. | It has the expected Bootstrap `flex:1 0 0%`, but is also overloaded by portfolio/component rules with extra padding, margins and min-widths. Prefer explicit `.col-12`, `.col-md-*`, `.col-lg-*`. |
| `.container-fluid` | Use with caution. | Base helper is fine, but it is also targeted inside navbar selectors. For v2 sections, `.container` plus choke/padding helpers is usually clearer. |
| `.container--large` | Use with caution. | Uses `!important` and only applies at very wide screens. |
| `.flex` | Avoid as a generic v2 helper. | It appears as a generic-sounding name but is not as clean/predictable as `.d-flex` or `.flex-center`. |
| `.flex-wrap` | Avoid. | It is a page wrapper: `position:relative`, `display:flex`, `flex-direction:column`, `min-height:100vh`, `overflow-x:clip`, and admin/feed margin rules. Not a flex-wrap utility. |
| `.flex-between` | Use with caution. | Legacy helper coupled with `.row--flex` behaviour and pseudo-element resets. Prefer `.d-flex justify-content-between align-items-center`. |
| `.show` | Avoid as utility. | Bootstrap state class with many unrelated declarations across buttons, dropdowns, nav, overlays and mobile states. |
| `.hide` | Use only for legacy state behaviour. | Can be `display:none` or `display:none !important` depending on context/breakpoint. Prefer `.d-none` for intentional display control. |
| `.visible` | Use with caution. | Has both `visibility:visible !important` and contextual overflow behaviour in component selectors. |
| `.font-secondary` | Use with caution. | Forces New Kansas with `!important`. Good for hard overrides, poor for flexible component styling. |
| `.order-*` helpers | Use with caution. | They are useful, but all use `!important`; can fight component-specific responsive ordering. |
| `.m-*/.p-*` Bootstrap numeric spacing | Use with caution. | They use `!important` and a different scale (`.25rem`, `.5rem`, `1rem`, `1.5rem`, `3rem`) from platform spacer classes. Prefer `*-spacer-*` for v2 rhythm. |
| Council/place classes | Avoid for general v2. | `.bg-colour--lewisham`, `.bg-colour--suffolk`, `.bg-colour--westminster` are content/site-specific. |

## 3. Suggested v2 Refactor Usage Rules

- Use UAT utilities for outer layout, containers, rows, columns, gutters, section spacing, text measure, alignment and order.
- Keep bespoke `abv2` CSS for genuine v2 identity: masks, dot motifs, media frames, card styling, decorative assets, specialist type hierarchy and exact responsive art behaviour.
- Prefer explicit CMS HTML utility classes over generic `abv2` stack utilities where possible.
- Use `.img-responsive` instead of scoped `img` resets where that is the only behaviour needed.
- Use `.body--*`, `.heading-*`, `.text-*` helpers only when the visual result matches the v2 exemplar.
- Do not use overloaded helpers unless manually verified.
- If a UAT helper causes visual drift from the production v2 exemplar, keep or restore the `abv2` rule.

## 4. Practical Starter Combos

```html
<!-- Standard v2-ish section wrapper -->
<section class="position-relative p-y-spacer-xl bg-colour--neutral--100">
  <div class="container">
    ...
  </div>
</section>
```

```html
<!-- Wide centred wrapper close to a 1200px rail -->
<div class="choke-1200 m-x--auto p-x-spacer-xs">
  ...
</div>
```

```html
<!-- Narrow centred wrapper close to an editorial rail -->
<div class="container-medium p-x-spacer-xs">
  ...
</div>
```

```html
<!-- Two-column media / copy layout -->
<div class="container">
  <div class="row g-md-lg align-items-center">
    <div class="col-12 col-md-6">
      <img class="img-responsive" src="..." alt="">
    </div>
    <div class="col-12 col-md-6">
      ...
    </div>
  </div>
</div>
```

```html
<!-- Reversed two-column layout at desktop -->
<div class="container">
  <div class="row g-md-lg align-items-center">
    <div class="col-12 col-md-6 order-md-2">
      <img class="img-responsive" src="..." alt="">
    </div>
    <div class="col-12 col-md-6 order-md-1">
      ...
    </div>
  </div>
</div>
```

```html
<!-- 3-up card grid -->
<div class="container">
  <div class="row row-cols-1 row-cols-md-3 gy-md gx-md">
    <div>...</div>
    <div>...</div>
    <div>...</div>
  </div>
</div>
```

```html
<!-- 4-up card grid -->
<div class="container">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-md gx-md">
    <div>...</div>
    <div>...</div>
    <div>...</div>
    <div>...</div>
  </div>
</div>
```

```html
<!-- Centred copy block -->
<div class="text-choke--640 m-x--auto text-center">
  <h2 class="heading-2">...</h2>
  <p class="body--lg">...</p>
</div>
```

```html
<!-- Masked colour section using existing bg-mask architecture -->
<section class="position-relative bg-colour--yellow-surface">
  <span class="bg-mask bg-mask--t-convex" aria-hidden="true"></span>
  <div class="container p-y-spacer-xl">
    ...
  </div>
  <span class="bg-mask bg-mask--b-convex" aria-hidden="true"></span>
</section>
```

```html
<!-- Responsive media frame using available helpers -->
<div class="ratio ratio-16x9">
  <img class="img-responsive" src="..." alt="">
</div>
```

```html
<!-- Mobile/tablet centred CTA row -->
<div class="m-t-spacer-md flex-center--md">
  <a class="btn btn--lg brand-btn-grey--bordered" href="...">View marketplace</a>
</div>
```

## 5. Missing Additions Likely Needed For v2

| Addition | Why it is probably needed | Layer |
|---|---|---|
| v2 pink and teal surface colour helpers | UAT has pink/teal helpers, but light/mid/dark/surface variants currently collapse to single values. Exact v2 soft surfaces should be explicit. | Primitives/tokens plus utility/helper layer |
| v2 mask variants | Existing `.bg-mask--t-convex` and `--b-convex` are old platform curves using inline SVG data URIs. | Utility/helper layer or decorative component layer |
| v2 media frame / rounded image treatment | UAT has responsive image and ratio helpers, but not the v2-specific image frame/art direction. | Component layer |
| v2 benefit/card visual treatment | Layout can use UAT grid/spacing, but card shell, radius, border, shadow, inner padding and icon/dot treatment are v2 identity. | Component layer |
| v2 heading / eyebrow helpers | Platform `.heading-*`, `.body-*`, `.label-*` exist, but v2 may need exact editorial roles and letter-spacing/weight. | Utility/helper layer if reusable; component layer if local |
| v2 button variants | UAT has platform and brand button variants, but exact v2 CTA colours/radius/states may not be represented. | Component layer, backed by tokens |
| Custom aspect ratios | UAT has `1x1`, `4x3`, `16x9`, `21x9`; v2 may need portrait, editorial or asset-specific ratios. | Utility/helper layer |
