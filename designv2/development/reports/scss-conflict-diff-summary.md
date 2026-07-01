# SCSS Conflict Diff Summary

This report summarises the main property-level differences in the largest conflict files, so winner selection can focus on what actually changes between repeated blocks.

## _abv2-open-card.scss

### `.abv2-open-card`
- Context: `base`
- Lines: `9, 244, 494, 744, 989, 1145`
- Differing property count: `16`
- Main differences:
  align-items: (missing) | (missing) | (missing) | center | (missing) | center
  background: var(--abv2-white) | var(--abv2-white) | var(--abv2-white) | transparent | (missing) | (missing)
  border: 1px solid rgba(38,38,37,.09) | 1px solid rgba(38,38,37,.08) | 1px solid rgba(38,38,37,.08) | 0 | (missing) | (missing)
  border-bottom: (missing) | (missing) | (missing) | 1px solid rgba(38,38,37,.12) | (missing) | (missing)
  border-radius: 24px | 28px | 26px | 0 | (missing) | (missing)
  box-shadow: 0 8px 24px rgba(38,38,37,.04) | 0 8px 24px rgba(38,38,37,.04) | 0 6px 20px rgba(38,38,37,.035) | none | (missing) | (missing)
  column-gap: (missing) | (missing) | (missing) | (missing) | 38px | 42px
  display: grid | grid | grid | grid | (missing) | (missing)

### `.abv2-open-card__meta`
- Context: `base`
- Lines: `110, 334, 584, 839, 1015, 1216`
- Differing property count: `12`
- Main differences:
  align-items: (missing) | center | (missing) | (missing) | (missing) | (missing)
  color: (missing) | (missing) | var(--abv2-text) | var(--abv2-text) | (missing) | (missing)
  display: flex | flex | flex | flex | (missing) | (missing)
  flex-wrap: wrap | wrap | wrap | wrap | (missing) | (missing)
  font-family: (missing) | (missing) | var(--abv2-ui) | var(--abv2-ui) | (missing) | (missing)
  font-size: (missing) | (missing) | .82rem | .78rem | (missing) | .8rem
  gap: 10px | 12px | 0 | 0 | (missing) | (missing)
  line-height: (missing) | (missing) | 1.35 | 1.35 | (missing) | (missing)

### `.abv2-open-card__cta`
- Context: `base`
- Lines: `150, 376, 631, 876, 1019, 1225`
- Differing property count: `12`
- Main differences:
  background: (missing) | (missing) | (missing) | (missing) | transparent | transparent
  border: (missing) | (missing) | (missing) | (missing) | 1.5px solid rgba(223,115,173,.45) | 1.8px solid var(--abv2-pink)
  border-radius: (missing) | (missing) | (missing) | (missing) | 999px | 999px
  color: var(--abv2-ink) | var(--abv2-ink) | var(--abv2-ink) | var(--abv2-ink) | var(--abv2-ink) | var(--abv2-pink)
  display: flex | inline-flex | inline-flex | inline-flex | inline-flex | inline-flex
  font-size: .84rem | .84rem | .82rem | .8rem | .76rem | .8rem
  gap: 10px | 10px | 10px | 8px | (missing) | (missing)
  justify-content: (missing) | (missing) | (missing) | (missing) | center | center

### `.abv2-open-card__media`
- Context: `base`
- Lines: `38, 264, 514, 768, 1061, 1153`
- Differing property count: `11`
- Main differences:
  align-items: center | center | center | center | (missing) | (missing)
  background: var(--card-bg, var(--abv2-navy-0f172a)) | var(--card-bg, var(--abv2-navy-0f172a)) | var(--card-bg, var(--abv2-navy-0f172a)) | var(--card-bg, var(--abv2-navy-0f172a)) | (missing) | (missing)
  border-radius: (missing) | (missing) | (missing) | 24px | (missing) | 30px
  display: flex | flex | flex | flex | (missing) | (missing)
  height: (missing) | (missing) | (missing) | 116px | 108px | 164px
  justify-content: center | center | center | center | (missing) | (missing)
  margin-left: (missing) | (missing) | (missing) | 8px | (missing) | 10px
  overflow: (missing) | (missing) | (missing) | hidden | (missing) | hidden

### `.abv2-open-card__title`
- Context: `base`
- Lines: `91, 314, 564, 819, 1001, 1199`
- Differing property count: `11`
- Main differences:
  color: var(--abv2-ink) | var(--abv2-ink) | var(--abv2-ink) | var(--abv2-ink) | (missing) | (missing)
  font-family: var(--abv2-serif) | var(--abv2-serif) | var(--abv2-serif) | var(--abv2-serif) | (missing) | (missing)
  font-size: clamp(1.32rem, 1.8vw, 1.72rem) | clamp(1.45rem, 2vw, 2rem) | clamp(1.32rem, 1.8vw, 1.72rem) | clamp(1.18rem, 1.55vw, 1.48rem) | clamp(1.16rem, 1.45vw, 1.42rem) | clamp(1.22rem, 1.45vw, 1.54rem)
  font-weight: 600 | 600 | 600 | 600 | (missing) | (missing)
  letter-spacing: -.03em | -.03em | -.03em | -.03em | (missing) | (missing)
  line-height: .98 | .95 | .94 | .95 | .96 | .96
  margin: 0 0 10px | 0 0 10px | 0 0 8px | 0 0 6px | (missing) | 0 0 8px
  max-width: (missing) | 18ch | 16ch | 18ch | none | none

### `.abv2-open-card__pill`
- Context: `base`
- Lines: `119, 344, 597, 852`
- Differing property count: `10`
- Main differences:
  background: (missing) | (missing) | transparent !important | transparent !important
  border: 1px solid transparent | 1px solid transparent | 0 | 0
  border-radius: 999px | 999px | 0 | 0
  font: (missing) | (missing) | inherit | inherit
  font-family: var(--abv2-ui) | var(--abv2-ui) | (missing) | (missing)
  font-size: .78rem | .82rem | (missing) | (missing)
  justify-content: (missing) | center | (missing) | (missing)
  line-height: 1 | 1 | (missing) | (missing)

### `.abv2-open-card__meta`
- Context: `@media (max-width:759px)`
- Lines: `220, 470, 719, 968, 1391`
- Differing property count: `10`
- Main differences:
  -webkit-overflow-scrolling: touch | touch | (missing) | (missing) | (missing)
  display: (missing) | (missing) | block | block | block
  flex-wrap: nowrap | nowrap | (missing) | (missing) | (missing)
  font-size: (missing) | (missing) | .8rem | .76rem | .76rem
  gap: (missing) | 10px | (missing) | (missing) | (missing)
  line-height: (missing) | (missing) | 1.45 | 1.42 | 1.42
  margin-bottom: (missing) | (missing) | 12px | 8px | 10px
  overflow-x: auto | auto | (missing) | (missing) | (missing)

### `.abv2-open-card__media::after`
- Context: `base`
- Lines: `47, 273, 523, 781, 1173`
- Differing property count: `8`
- Main differences:
  background: rgba(255,255,255,.12) | rgba(255,255,255,.14) | rgba(255,255,255,.14) | rgba(255,255,255,.12) | (missing)
  border-radius: 999px | 999px | 999px | 999px | 30px
  bottom: (missing) | 20px | 18px | 12px | (missing)
  box-shadow: (missing) | (missing) | (missing) | (missing) | inset 0 0 0 1px rgba(255,255,255,.06)
  height: 54px | 66px | 54px | 34px | (missing)
  inset: auto auto 16px 16px | (missing) | (missing) | (missing) | 0
  left: (missing) | 20px | 18px | 12px | (missing)
  width: 54px | 66px | 54px | 34px | (missing)

### `.abv2-open-card__body`
- Context: `base`
- Lines: `66, 293, 543, 801, 996, 1187`
- Differing property count: `8`
- Main differences:
  display: flex | flex | flex | (missing) | (missing) | flex
  flex-direction: column | column | column | (missing) | (missing) | column
  justify-content: space-between | center | center | (missing) | (missing) | center
  max-width: (missing) | (missing) | (missing) | (missing) | 620px | 620px
  min-width: 0 | 0 | 0 | 0 | (missing) | (missing)
  padding: 22px 24px 22px 22px | 28px 30px 26px 28px | 20px 24px 18px 22px | 0 4px 0 0 | 0 | 0
  position: relative | relative | relative | relative | (missing) | (missing)
  z-index: 2 | 2 | 2 | 2 | (missing) | (missing)

### `.abv2-open-card__kicker`
- Context: `base`
- Lines: `80, 303, 553, 808, 1195`
- Differing property count: `8`
- Main differences:
  color: var(--abv2-pink) | var(--abv2-pink) | var(--abv2-pink) | var(--abv2-pink) | (missing)
  display: inline-block | inline-block | inline-block | inline-block | (missing)
  font-family: var(--abv2-ui) | var(--abv2-ui) | var(--abv2-ui) | var(--abv2-ui) | (missing)
  font-size: .74rem | .74rem | .72rem | .7rem | (missing)
  letter-spacing: .04em | .04em | .04em | .05em | (missing)
  line-height: 1 | 1 | 1 | 1 | (missing)
  margin: 0 0 12px | 0 0 12px | 0 0 8px | 0 0 6px | 0 0 7px
  text-transform: uppercase | uppercase | uppercase | uppercase | (missing)

## _council-bar-chart.scss

### `#council-bar-chart .cbc-bar-fill`
- Context: `base`
- Lines: `125, 484`
- Differing property count: `12`
- Main differences:
  align-items: center | (missing)
  border-radius: 999px | (missing)
  bottom: 0 | (missing)
  box-shadow: (missing) | none !important
  box-sizing: border-box | (missing)
  display: flex | (missing)
  left: 0 | (missing)
  padding-left: 14px | (missing)

### `#council-bar-chart .cbc-proj__pill`
- Context: `base`
- Lines: `276, 392`
- Differing property count: `12`
- Main differences:
  align-items: center | (missing)
  border: (missing) | 1px solid rgba(17,24,39,.10)
  border-radius: 999px | (missing)
  box-shadow: (missing) | 0 1px 0 rgba(0,0,0,.06)
  color: var(--abv2-white) | var(--abv2-navy-111827)
  display: inline-flex | (missing)
  font-size: .82rem | (missing)
  font-weight: 800 | (missing)

### `#council-bar-chart .cbc-summary-line`
- Context: `base`
- Lines: `79, 458`
- Differing property count: `11`
- Main differences:
  align-items: center | (missing)
  border-radius: 999px | (missing)
  box-shadow: (missing) | none
  color: var(--abv2-white) | (missing)
  display: inline-flex | (missing)
  font-size: .9rem | .86rem
  font-weight: 700 | (missing)
  line-height: 1.2 | (missing)

### `#council-bar-chart .cbc-logo-badge`
- Context: `base`
- Lines: `46, 444`
- Differing property count: `10`
- Main differences:
  align-items: center | (missing)
  background: var(--abv2-grey-f3f4f6) | var(--abv2-white)
  border: 1px solid rgba(15,23,42,.06) | 1px solid rgba(15,23,42,.08)
  border-radius: 22px | 20px
  box-shadow: 0 8px 20px rgba(15,23,42,.08) | none
  display: flex | (missing)
  height: 112px | 96px
  justify-content: center | (missing)

### `#council-bar-chart .cbc-empty`
- Context: `base`
- Lines: `151, 493`
- Differing property count: `8`
- Main differences:
  background: var(--abv2-grey-f9fafb) | transparent
  border: (missing) | 1px solid rgba(15,23,42,.08)
  border-radius: 16px | 18px
  color: var(--abv2-neutral-454543) | (missing)
  font-size: 1.1rem | (missing)
  font-weight: 500 | (missing)
  padding: 64px 14px | (missing)
  text-align: center | (missing)

### `#council-bar-chart .cbc-summary-inner`
- Context: `base`
- Lines: `28, 432`
- Differing property count: `7`
- Main differences:
  align-items: start | center
  background: var(--abv2-white) | transparent
  border-radius: 14px | (missing)
  column-gap: 28px | 22px
  display: grid | (missing)
  grid-template-columns: 128px minmax(0, 1fr) | (missing)
  padding: 10px 8px | 0

### `#council-bar-chart .cbc-summary-lines`
- Context: `base`
- Lines: `69, 453`
- Differing property count: `7`
- Main differences:
  align-items: flex-start !important | (missing)
  display: flex !important | (missing)
  flex-direction: column !important | (missing)
  gap: 10px !important | 8px !important
  justify-content: flex-start !important | (missing)
  padding-top: 6px | 0
  text-align: left !important | (missing)

### `#council-bar-chart .cbc-summary-logo`
- Context: `base`
- Lines: `38, 439`
- Differing property count: `5`
- Main differences:
  align-items: flex-start | (missing)
  display: flex | (missing)
  height: 128px | 108px
  justify-content: flex-start | (missing)
  width: 128px | 108px

### `#council-bar-chart .cbc-bar-wrapper`
- Context: `base`
- Lines: `116, 478`
- Differing property count: `5`
- Main differences:
  background: var(--abv2-grey-f3f4f6) | var(--abv2-stone-f3efee)
  flex: 1 1 auto | (missing)
  height: 42px | 38px
  overflow: hidden | (missing)
  position: relative | (missing)

### `#council-bar-chart .cbc-card`
- Context: `base`
- Lines: `19, 413`
- Differing property count: `4`
- Main differences:
  background: var(--abv2-white) | transparent
  border-radius: 18px | 0
  box-shadow: 0 10px 30px rgba(15,23,42,.06) | none
  padding: 22px 24px | 0

## _abv2-teal.scss

### `.abv2-teal__frame`
- Context: `base`
- Lines: `37, 280, 427`
- Differing property count: `3`
- Main differences:
  border-radius: 48px | 48px | 12px
  transform: translateY(0) | translateY(0) | (missing)
  width: min(100%, 500px) | min(100%, 500px) | min(100%, 520px)

### `.abv2-teal__grid`
- Context: `@media (max-width:759px)`
- Lines: `203, 366, 483`
- Differing property count: `3`
- Main differences:
  display: grid | grid | (missing)
  gap: 22px !important | 22px !important | 22px
  grid-template-columns: 1fr !important | 1fr !important | 1fr

### `.abv2-teal`
- Context: `base`
- Lines: `9, 257, 405`
- Differing property count: `2`
- Main differences:
  padding-bottom: 188px | 188px | 210px
  padding-top: 198px | 198px | 220px

### `.abv2-teal__grid`
- Context: `base`
- Lines: `24, 267, 415`
- Differing property count: `2`
- Main differences:
  gap: 52px | 52px | 56px
  grid-template-columns: minmax(320px,.82fr) minmax(0,1.18fr) | minmax(320px,.82fr) minmax(0,1.18fr) | minmax(320px,.88fr) minmax(0,1.12fr)

### `.abv2-teal`
- Context: `@media (max-width:759px)`
- Lines: `195, 358, 475`
- Differing property count: `2`
- Main differences:
  padding-bottom: 84px | 84px | 96px
  padding-top: 114px | 114px | 116px

### `.abv2-teal__frame`
- Context: `@media (max-width:759px)`
- Lines: `220, 383, 498`
- Differing property count: `2`
- Main differences:
  border-radius: 48px | 48px | (missing)
  max-width: none | none | (missing)

### `.abv2-teal__media`
- Context: `base`
- Lines: `31, 274, 422`
- Differing property count: `1`
- Main differences:
  align-items: center | center | (missing)

### `.abv2-teal__frame img`
- Context: `base`
- Lines: `45, 288, 434`
- Differing property count: `1`
- Main differences:
  border-radius: 48px | 48px | (missing)

### `.abv2-teal__copy`
- Context: `base`
- Lines: `52, 295, 440`
- Differing property count: `1`
- Main differences:
  max-width: 680px | 680px | 740px

### `.abv2-teal__copy.abv2-stack > * + *`
- Context: `base`
- Lines: `56, 299, 444`
- Differing property count: `1`
- Main differences:
  margin-top: 24px | 24px | 28px

## _abv2-features.scss

### `.abv2-features__inner::after`
- Context: `base`
- Lines: `23, 218, 348, 463`
- Differing property count: `16`
- Main differences:
  -webkit-mask-image: var(--abv2-dot-mask) | var(--abv2-dot-mask) | (missing) | var(--abv2-dot-mask)
  -webkit-mask-position: center | center | (missing) | center
  -webkit-mask-repeat: no-repeat | no-repeat | (missing) | no-repeat
  -webkit-mask-size: contain | contain | (missing) | contain
  background-image: (missing) | (missing) | var(--abv2-dot-svg) | (missing)
  background-position: (missing) | (missing) | center | (missing)
  background-repeat: (missing) | (missing) | no-repeat | (missing)
  background-size: (missing) | (missing) | contain | (missing)

### `.abv2-features__grid`
- Context: `@media (max-width:759px)`
- Lines: `189, 319, 446`
- Differing property count: `8`
- Main differences:
  display: block !important | block !important | (missing)
  gap: (missing) | (missing) | 22px
  grid-template-columns: (missing) | (missing) | 1fr
  justify-items: (missing) | (missing) | center
  margin: 0 auto !important | 0 auto !important | (missing)
  max-width: none !important | none !important | (missing)
  padding: 0 !important | 0 !important | (missing)
  width: 100% !important | 100% !important | (missing)

### `.abv2-features`
- Context: `base`
- Lines: `9, 209, 339`
- Differing property count: `3`
- Main differences:
  margin-top: -92px | -92px | -102px
  padding-bottom: 84px | 84px | 100px
  padding-top: 78px | 78px | 86px

### `.abv2-features__inner::after`
- Context: `@media (max-width:759px)`
- Lines: `175, 308, 438, 489`
- Differing property count: `3`
- Main differences:
  right: 8px | 8px | 14px | 14px
  top: -78px | -78px | -74px | -74px
  width: min(58vw, 210px) | min(58vw, 210px) | min(50vw, 184px) | min(50vw, 184px)

### `.abv2-features__cta`
- Context: `@media (max-width:759px)`
- Lines: `199, 329, 454`
- Differing property count: `3`
- Main differences:
  margin: 36px auto 0 !important | 36px auto 0 !important | 24px auto 0
  text-align: center !important | center !important | center
  width: 100% !important | 100% !important | (missing)

### `.abv2-features`
- Context: `@media (max-width:759px)`
- Lines: `167, 300, 430`
- Differing property count: `2`
- Main differences:
  margin-top: -28px | -28px | -44px
  padding-top: 52px | 52px | 44px

### `.abv2-features__intro`
- Context: `base`
- Lines: `50, 238, 367`
- Differing property count: `1`
- Main differences:
  margin-bottom: 34px | 34px | 44px

### `.abv2-features__grid`
- Context: `base`
- Lines: `60, 244, 373`
- Differing property count: `1`
- Main differences:
  gap: 22px | 22px | 28px

### `.abv2-features__cta`
- Context: `base`
- Lines: `68, 252, 384`
- Differing property count: `1`
- Main differences:
  margin-top: 28px | 28px | 38px

## _abv2-open-now.scss

### `.abv2-open-now__grid`
- Context: `base`
- Lines: `27, 112, 183, 254, 304, 320`
- Differing property count: `5`
- Main differences:
  display: grid | grid | grid | grid | (missing) | (missing)
  gap: 24px | 22px | 18px | (missing) | (missing) | (missing)
  grid-template-columns: repeat(2, minmax(0, 1fr)) | 1fr | 1fr | 1fr | (missing) | (missing)
  margin: 0 auto | 0 auto | 0 auto | 0 auto | (missing) | (missing)
  width: min(100%, 1040px) | min(100%, 1060px) | min(100%, 1020px) | min(100%, 1020px) | min(100%, 980px) | min(100%, 1040px)

### `.abv2-open-now__grid`
- Context: `@media (max-width:979px)`
- Lines: `58, 312, 328`
- Differing property count: `3`
- Main differences:
  grid-template-columns: 1fr | (missing) | (missing)
  max-width: 760px | (missing) | (missing)
  width: (missing) | min(100%, 920px) | min(100%, 940px)

### `.abv2-open-now`
- Context: `base`
- Lines: `9, 98, 169, 240`
- Differing property count: `1`
- Main differences:
  padding-bottom: 120px | 120px | 110px | 108px

### `.abv2-open-now__intro`
- Context: `base`
- Lines: `17, 106, 177, 248`
- Differing property count: `1`
- Main differences:
  margin: 0 auto 34px | 0 auto 34px | 0 auto 30px | 0 auto 28px

### `.abv2-open-now__empty, .abv2-open-now__loading, .abv2-open-now__error`
- Context: `base`
- Lines: `35, 120, 191, 261`
- Differing property count: `1`
- Main differences:
  padding: 28px 30px | 28px 30px | 24px 28px | 24px 28px

### `.abv2-open-now`
- Context: `@media (max-width:979px)`
- Lines: `51, 136, 207, 277`
- Differing property count: `1`
- Main differences:
  padding-bottom: 96px | 96px | 92px | 90px

### `.abv2-open-now`
- Context: `@media (max-width:759px)`
- Lines: `65, 143, 214, 284`
- Differing property count: `1`
- Main differences:
  padding-bottom: 82px | 82px | 80px | 78px

### `.abv2-open-now__intro`
- Context: `@media (max-width:759px)`
- Lines: `72, 150, 221, 291`
- Differing property count: `1`
- Main differences:
  margin: 0 auto 24px | 0 auto 24px | 0 auto 22px | 0 auto 20px

### `.abv2-open-now__grid`
- Context: `@media (max-width:759px)`
- Lines: `80, 158, 229`
- Differing property count: `1`
- Main differences:
  gap: 18px | 18px | 16px

## _abv2-pink.scss

### `.abv2-pink`
- Context: `base`
- Lines: `9, 232, 361`
- Differing property count: `2`
- Main differences:
  padding-bottom: 170px | 170px | 180px
  padding-top: 248px | 248px | 260px

### `.abv2-pink__art`
- Context: `base`
- Lines: `49, 263, 392`
- Differing property count: `2`
- Main differences:
  align-items: flex-end | flex-end | flex-start
  padding-top: 0 | 0 | (missing)

### `.abv2-pink__art img`
- Context: `base`
- Lines: `56, 270, 398`
- Differing property count: `2`
- Main differences:
  transform: translate(10px, 34px) | translate(10px, 34px) | translateY(-8px)
  width: min(100%, 180px) | min(100%, 180px) | min(100%, 220px)

### `.abv2-pink`
- Context: `@media (max-width:759px)`
- Lines: `191, 327, 438`
- Differing property count: `2`
- Main differences:
  padding-bottom: 86px | 86px | 90px
  padding-top: 138px | 138px | 132px

### `.abv2-pink__stats`
- Context: `@media (max-width:759px)`
- Lines: `215, 344, 452`
- Differing property count: `2`
- Main differences:
  margin-bottom: 22px | 22px | (missing)
  margin-top: 16px | 16px | (missing)

### `.abv2-pink__art`
- Context: `@media (max-width:759px)`
- Lines: `224, 353, 459`
- Differing property count: `2`
- Main differences:
  display: none | none | (missing)
  justify-content: (missing) | (missing) | center

### `.abv2-pink__grid`
- Context: `base`
- Lines: `25, 243, 372`
- Differing property count: `1`
- Main differences:
  gap: 36px | 36px | 54px

### `.abv2-pink__copy`
- Context: `base`
- Lines: `32, 250, 379`
- Differing property count: `1`
- Main differences:
  max-width: 720px | 720px | 780px

### `.abv2-pink__stats`
- Context: `base`
- Lines: `40, 254, 383`
- Differing property count: `1`
- Main differences:
  margin-bottom: 30px | 30px | 26px
