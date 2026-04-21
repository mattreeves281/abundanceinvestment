# SCSS Conflict Diff Summary

This report summarises the main property-level differences in the largest conflict files, so winner selection can focus on what actually changes between repeated blocks.

## _abv2-open-card.scss

### `.abv2-open-card`
- Lines: `9, 244, 494, 744, 989, 1145`
- Main differences:
  - `background`: white vs transparent vs missing
  - `border`: `1px solid rgba(...)` vs `0` vs missing
  - `border-bottom`: present only in one variant
  - `border-radius`: `24px`, `28px`, `26px`, `0`, or missing
  - `box-shadow`: present with varying strength vs `none`
  - `align-items`: present only in some variants
  - `column-gap`: `38px` vs `42px` in later variants
  - `display`: `grid` vs missing

### `.abv2-open-card__media`
- Lines: `38, 264, 514, 768, 1061, 1153`
- Main differences:
  - `height`: `116px`, `108px`, `164px`, or missing
  - `border-radius`: `24px`, `30px`, or missing
  - `margin-left`: `8px`, `10px`, or missing
  - `overflow`: `hidden` vs missing
  - later variants drop the original flex centering/background setup

### `.abv2-open-card__title`
- Lines: `91, 314, 564, 819, 1001, 1199`
- Main differences:
  - `font-size`: several `clamp(...)` variants
  - `line-height`: `.94` to `.98`
  - `margin-bottom`: `10px`, `8px`, `6px`, or missing
  - `max-width`: `18ch`, `16ch`, `none`, or missing
  - later variants drop explicit typography props entirely

### `.abv2-open-card__meta`
- Lines: `110, 334, 584, 839, 1015, 1216`
- Main differences:
  - `gap`: `10px`, `12px`, `0`, or missing
  - `font-size`: `.82rem`, `.78rem`, `.8rem`, or missing
  - `color`, `font-family`, `line-height`: present only in some variants
  - later variants drop the flex meta styling almost entirely

### `.abv2-open-card__cta`
- Lines: `150, 376, 631, 876, 1019, 1225`
- Main differences:
  - `border`: no border vs pink bordered pill treatment
  - `color`: ink vs pink
  - `display`: `flex` vs `inline-flex`
  - `font-size`: `.84rem`, `.82rem`, `.8rem`, `.76rem`
  - `gap`: `10px`, `8px`, or missing
  - later variants add `background: transparent`, `justify-content: center`, and pill borders

### `.abv2-open-card__pill`
- Lines: `119, 344, 597, 852`
- Main differences:
  - pill treatment vs stripped treatment
  - `border-radius`: `999px` vs `0`
  - `border`: transparent border vs `0`
  - `background`: transparent forced in later variants
  - typography moves from explicit UI font sizing to inherited font

### Mobile conflict pattern
- Repeated on most child selectors under `@media (max-width:759px)`
- Main differences are:
  - card spacing and padding
  - whether meta stays horizontal scroller vs becomes block
  - title/description sizing
  - CTA presence and style

Overall reading:
- This file contains materially different component designs, not just token tweaks. It likely needs a deliberate winner pass rather than mechanical cleanup.

## _council-bar-chart.scss

### Core chart shell selectors
- `#council-bar-chart` lines `14, 408`
- `.cbc-card` lines `19, 413`
- `.cbc-summary` lines `26, 420`
- `.cbc-summary-inner` lines `28, 432`
- `.cbc-summary-logo` lines `38, 439`
- `.cbc-logo-badge` lines `46, 444`

Main differences:
- top-level chart/card sizing and spacing
- summary layout
- branding/logo placement
- project pill styling overlaps with chart styles later in file

### Content row selectors
- `.cbc-summary-lines` lines `69, 453`
- `.cbc-summary-line` lines `79, 458`
- `.cbc-chart` lines `101, 464`
- `.cbc-row` lines `103, 468`
- `.cbc-label` lines `109, 472`
- `.cbc-bar-wrapper` lines `116, 478`
- `.cbc-bar-fill` lines `125, 484`
- `.cbc-bar-wrapper:hover .cbc-bar-fill` lines `143, 488`
- `.cbc-empty` lines `151, 493`

Main differences:
- spacing rhythm and layout dimensions
- bar styling and hover behaviour
- summary/project presentation merged into one file

### Mobile summary selectors
- `.cbc-summary-inner` lines `173, 507`
- `.cbc-summary-logo` lines `180, 514`
- `.cbc-logo-badge` lines `184, 521`

Main differences:
- mobile arrangement of summary and logo elements

Overall reading:
- This looks like two substantive chart implementations/skins layered together rather than light overrides.

## _abv2-teal.scss

### `.abv2-teal`
- Lines: `9, 257, 405`
- Main differences:
  - `padding-top`: `198px` vs `220px`
  - `padding-bottom`: `188px` vs `210px`

### `.abv2-teal__grid`
- Lines: `24, 267, 415`
- Main differences:
  - `gap`: `52px` vs `56px`
  - `grid-template-columns`: `minmax(320px,.82fr) minmax(0,1.18fr)` vs `minmax(320px,.88fr) minmax(0,1.12fr)`

### `.abv2-teal__copy`
- Lines: `52, 295, 440`
- Main differences:
  - `max-width`: `680px` vs `740px`

### `.abv2-teal__copy.abv2-stack > * + *`
- Lines: `56, 299, 444`
- Main differences:
  - `margin-top`: `24px` vs `28px`

### `.abv2-teal__frame` / `.abv2-teal__frame img`
- Lines: `37, 280, 427` and `45, 288, 434`
- Main differences:
  - border radius present in two variants, missing in the third

### Mobile selectors
- `.abv2-teal` lines `195, 358, 475`
- `.abv2-teal__grid` lines `203, 366, 483`
- `.abv2-teal__media` lines `212, 375, 491`
- `.abv2-teal__frame` lines `220, 383, 498`

Main differences:
- mobile top/bottom spacing
- `!important` usage vs plain declarations
- some later variants remove centering and frame radius

Overall reading:
- This is mostly one component drifting through spacing/layout revisions, with a smaller styling branch where frame rounding/centering is dropped.

## _abv2-features.scss

### `.abv2-features`
- Lines: `9, 209, 339`
- Main differences:
  - `margin-top`: `-92px` vs `-102px`
  - `padding-top`: `78px` vs `86px`
  - `padding-bottom`: `84px` vs `100px`

### `.abv2-features__inner::after`
- Lines: `23, 218, 348, 463`
- Main differences:
  - mask-based blob implementation vs `background-image: var(--abv2-dot-svg)`
  - same decorative element rendered via different techniques

### `.abv2-features__intro`
- Lines: `50, 238, 367`
- Main differences:
  - `margin-bottom`: `34px` vs `44px`

### `.abv2-features__grid`
- Lines: `60, 244, 373`
- Main differences:
  - `gap`: `22px` vs `28px`

### `.abv2-features__cta`
- Lines: `68, 252, 384`
- Main differences:
  - `margin-top`: `28px` vs `38px`

### Mobile differences
- `.abv2-features` lines `167, 300, 430`
- `.abv2-features__inner::after` lines `175, 308, 438, 489`
- `.abv2-features__grid` lines `189, 319, 446`
- `.abv2-features__cta` lines `199, 329, 454`

Main differences:
- mobile section spacing
- decorative blob placement/size
- hard reset mobile grid (`display:block !important`, width/max-width resets) vs simpler grid layout
- CTA margin and width treatment

Overall reading:
- Mostly spacing/system drift, except for the decorative `::after` implementation and the stronger mobile reset version.

## _abv2-open-now.scss

### `.abv2-open-now`
- Lines: `9, 98, 169, 240`
- Main differences:
  - `padding-bottom`: `120px`, `110px`, `108px`

### `.abv2-open-now__intro`
- Lines: `17, 106, 177, 248`
- Main differences:
  - intro bottom margin: `34px`, `30px`, `28px`

### `.abv2-open-now__grid`
- Lines: `27, 112, 183, 254, 304, 320`
- Main differences:
  - `gap`: `24px`, `22px`, `18px`, or missing
  - columns: `repeat(2, ...)` vs `1fr`
  - width: `980px` to `1060px`
  - some later variants only set width, not grid properties

### Empty/loading/error states
- Lines: `35, 120, 191, 261`
- Main differences:
  - `padding`: `28px 30px` vs `24px 28px`

### Tablet/mobile differences
- section bottom padding reduces incrementally across revisions
- mobile intro margin reduces from `24px` to `20px`
- mobile grid gap reduces from `18px` to `16px`

Overall reading:
- This is mostly iterative spacing and width adjustment, with the main decision being whether the base grid should be two-column or single-column.

## _abv2-pink.scss

### `.abv2-pink`
- Lines: `9, 232, 361`
- Main differences:
  - `padding-top`: `248px` vs `260px`
  - `padding-bottom`: `170px` vs `180px`

### `.abv2-pink__grid`
- Lines: `25, 243, 372`
- Main differences:
  - `gap`: `36px` vs `54px`

### `.abv2-pink__copy`
- Lines: `32, 250, 379`
- Main differences:
  - `max-width`: `720px` vs `780px`

### `.abv2-pink__stats`
- Lines: `40, 254, 383`
- Main differences:
  - `margin-bottom`: `30px` vs `26px`

### `.abv2-pink__art`
- Lines: `49, 263, 392`
- Main differences:
  - `align-items`: `flex-end` vs `flex-start`
  - `padding-top`: explicit `0` vs missing

### `.abv2-pink__art img`
- Lines: `56, 270, 398`
- Main differences:
  - `transform`: `translate(10px, 34px)` vs `translateY(-8px)`
  - `width`: `180px` vs `220px`

### Mobile differences
- `.abv2-pink` lines `191, 327, 438`
- `.abv2-pink__stats` lines `215, 344, 452`
- `.abv2-pink__art` lines `224, 353, 459`

Main differences:
- mobile spacing shifts
- one branch hides art entirely, another keeps it and centers it

Overall reading:
- Mostly spacing/layout variation, but the art treatment diverges meaningfully and likely needs an explicit design choice.
