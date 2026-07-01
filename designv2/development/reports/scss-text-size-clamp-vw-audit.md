# SCSS Text Sizing Clamp/VW Audit

Audited SCSS partials under `designv2/scss`, meaning underscore-prefixed `.scss` files including `designv2/scss/experiments`. Entry files such as `main.scss`, `landing.scss`, and config files were not included.

This report flags direct `font-size` declarations using `clamp()` and/or viewport units such as `vw`, `vmin`, or `vmax`, instead of fixed `px`/`rem` sizing.

## Summary

| Check | Count |
| --- | ---: |
| SCSS partial files scanned | 129 |
| Direct `font-size` declarations using `clamp()`/viewport units | 53 |
| Main partial matches | 40 |
| Experimental partial matches | 13 |
| Files with matching text-size declarations | 33 |

## Matches By File

| File | Matches |
| --- | ---: |
| `designv2/scss/_abv2-open-card.scss` | 6 |
| `designv2/scss/_abv2-council-calc.scss` | 4 |
| `designv2/scss/_abv2-ed-copy.scss` | 4 |
| `designv2/scss/_abv2-council-live.scss` | 3 |
| `designv2/scss/_abv2-end-cta.scss` | 3 |
| `designv2/scss/_abv2-stat.scss` | 3 |
| `designv2/scss/_abv2-hero.scss` | 2 |
| `designv2/scss/_abv2-proof-band.scss` | 2 |
| `designv2/scss/experiments/_abv2-egp.scss` | 2 |
| `designv2/scss/_abv2-6-up-block.scss` | 1 |
| `designv2/scss/_abv2-card.scss` | 1 |
| `designv2/scss/_abv2-case-stat.scss` | 1 |
| `designv2/scss/_abv2-compare.scss` | 1 |
| `designv2/scss/_abv2-council-quote.scss` | 1 |
| `designv2/scss/_abv2-decision.scss` | 1 |
| `designv2/scss/_abv2-ed-divider.scss` | 1 |
| `designv2/scss/_abv2-ed-hero.scss` | 1 |
| `designv2/scss/_abv2-ed-open-invest.scss` | 1 |
| `designv2/scss/_abv2-how.scss` | 1 |
| `designv2/scss/_abv2-related.scss` | 1 |
| `designv2/scss/_abv2-stat-editorial.scss` | 1 |
| `designv2/scss/_home-cta.scss` | 1 |
| `designv2/scss/experiments/_abv2-end-cta-editorial.scss` | 1 |
| `designv2/scss/experiments/_abv2-feature-stat.scss` | 1 |
| `designv2/scss/experiments/_abv2-invest-insert.scss` | 1 |
| `designv2/scss/experiments/_abv2-quote.scss` | 1 |
| `designv2/scss/experiments/_abv2-subnav.scss` | 1 |
| `designv2/scss/experiments/_ai-council-hero2.scss` | 1 |
| `designv2/scss/experiments/_ai-council-history.scss` | 1 |
| `designv2/scss/experiments/_ai-council-open.scss` | 1 |
| `designv2/scss/experiments/_ai-council-spend.scss` | 1 |
| `designv2/scss/experiments/_home-choice-v2.scss` | 1 |
| `designv2/scss/experiments/_home-choice.scss` | 1 |

## Main Partials

| Location | Selector/context | `font-size` value |
| --- | --- | --- |
| [designv2/scss/_abv2-6-up-block.scss:35](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-6-up-block.scss:35) | `.abv2-benefit-block__title` | `clamp(1.5rem, 2vw, 2rem)` |
| [designv2/scss/_abv2-card.scss:52](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-card.scss:52) | `.abv2-card__title` | `clamp(1.45rem,2.1vw,1.9rem)` |
| [designv2/scss/_abv2-case-stat.scss:18](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-case-stat.scss:18) | `.abv2-case-stat__value` | `clamp(1.35rem, 2vw, 1.9rem)` |
| [designv2/scss/_abv2-compare.scss:82](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss:82) | `.abv2-compare__heading` | `clamp(1.45rem, 1.8vw, 1.86rem)` |
| [designv2/scss/_abv2-council-calc.scss:32](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-calc.scss:32) | `.abv2-council-calc__copy .abv2-h2` | `clamp(2rem, 2.9vw, 3rem)` |
| [designv2/scss/_abv2-council-calc.scss:142](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-calc.scss:142) | `.abv2-council-calc__cardTitle` | `clamp(1.45rem, 2vw, 1.95rem)` |
| [designv2/scss/_abv2-council-calc.scss:177](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-calc.scss:177) | `.abv2-council-calc__resultValue` | `clamp(1.55rem, 2.5vw, 2.35rem)` |
| [designv2/scss/_abv2-council-calc.scss:185](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-calc.scss:185) | `.abv2-council-calc__result--hero .abv2-council-calc__resultValue` | `clamp(2rem, 3vw, 3rem)` |
| [designv2/scss/_abv2-council-live.scss:32](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-live.scss:32) | `.abv2-council-live__copy .abv2-h2` | `clamp(2rem, 2.9vw, 3rem)` |
| [designv2/scss/_abv2-council-live.scss:113](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-live.scss:113) | `.abv2-council-live__cardTitle` | `clamp(1.45rem, 2vw, 1.95rem)` |
| [designv2/scss/_abv2-council-live.scss:399](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-live.scss:399) | `/* Mobile */ @media (max-width:759px) > .abv2-council-live__metricValue` | `clamp(1rem, 5vw, 1.26rem)` |
| [designv2/scss/_abv2-council-quote.scss:71](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-quote.scss:71) | `.abv2-council-quote__text` | `clamp(1.7rem, 2.6vw, 2.55rem)` |
| [designv2/scss/_abv2-decision.scss:82](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-decision.scss:82) | `.abv2-decision__path .abv2-h3` | `clamp(1.28rem, 1.56vw, 1.52rem)` |
| [designv2/scss/_abv2-ed-copy.scss:77](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-copy.scss:77) | `.abv2-ed-copy > h2` | `clamp(1.8rem, 3vw, 2.45rem)` |
| [designv2/scss/_abv2-ed-copy.scss:83](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-copy.scss:83) | `.abv2-ed-copy > h3` | `clamp(1.45rem, 2.2vw, 1.9rem)` |
| [designv2/scss/_abv2-ed-copy.scss:89](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-copy.scss:89) | `.abv2-ed-copy > h4` | `clamp(1.18rem, 1.6vw, 1.35rem)` |
| [designv2/scss/_abv2-ed-copy.scss:187](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-copy.scss:187) | `.abv2-ed-copy > blockquote > p` | `clamp(1.2rem, 1.8vw, 1.45rem)` |
| [designv2/scss/_abv2-ed-divider.scss:61](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-divider.scss:61) | `/* Title */ .abv2-ed-divider__title` | `clamp(2.15rem, 3.2vw, 3rem)` |
| [designv2/scss/_abv2-ed-hero.scss:30](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-hero.scss:30) | `.abv2-ed-hero__title` | `clamp(2.7rem, 5.1vw, 4.35rem)` |
| [designv2/scss/_abv2-ed-open-invest.scss:63](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-ed-open-invest.scss:63) | `.abv2-ed-open-invest__title` | `clamp(1.65rem, 2.4vw, 2.25rem)` |
| [designv2/scss/_abv2-end-cta.scss:43](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-end-cta.scss:43) | `.abv2-end-cta__title` | `clamp(2rem, 3.2vw, 3.05rem)` |
| [designv2/scss/_abv2-end-cta.scss:106](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-end-cta.scss:106) | `.abv2-end-cta__card-title` | `clamp(1.56rem, 2vw, 2.08rem)` |
| [designv2/scss/_abv2-end-cta.scss:170](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-end-cta.scss:170) | `/* Tablet */ @media (max-width:979px) and (min-width:760px) > .abv2-end-cta__card-title` | `clamp(1.42rem, 2.6vw, 1.72rem)` |
| [designv2/scss/_abv2-hero.scss:112](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-hero.scss:112) | `.abv2-hero__copy .abv2-h1` | `clamp(1.96rem, 2.35vw, 2.24rem)` |
| [designv2/scss/_abv2-hero.scss:118](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-hero.scss:118) | `.abv2-hero__copy .abv2-body` | `clamp(1rem, 1vw, 1.02rem)` |
| [designv2/scss/_abv2-how.scss:95](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-how.scss:95) | `/* Tune inherited typography inside the steps */ .abv2-how-step__content .abv2-h3` | `clamp(1.08rem, 1.25vw, 1.24rem)` |
| [designv2/scss/_abv2-open-card.scss:95](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:95) | `.abv2-open-card__title` | `clamp(1.32rem, 1.8vw, 1.72rem)` |
| [designv2/scss/_abv2-open-card.scss:319](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:319) | `.abv2-open-card__title` | `clamp(1.45rem, 2vw, 2rem)` |
| [designv2/scss/_abv2-open-card.scss:569](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:569) | `.abv2-open-card__title` | `clamp(1.32rem, 1.8vw, 1.72rem)` |
| [designv2/scss/_abv2-open-card.scss:824](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:824) | `.abv2-open-card__title` | `clamp(1.18rem, 1.55vw, 1.48rem)` |
| [designv2/scss/_abv2-open-card.scss:1003](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:1003) | `.abv2-open-card__title` | `clamp(1.16rem, 1.45vw, 1.42rem)` |
| [designv2/scss/_abv2-open-card.scss:1202](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-open-card.scss:1202) | `.abv2-open-card__title` | `clamp(1.22rem, 1.45vw, 1.54rem)` |
| [designv2/scss/_abv2-proof-band.scss:68](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-proof-band.scss:68) | `.abv2-proof-band__value` | `clamp(1.56rem, 2vw, 2.08rem)` |
| [designv2/scss/_abv2-proof-band.scss:127](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-proof-band.scss:127) | `/* Mobile */ @media (max-width:759px) > .abv2-proof-band__value` | `clamp(1.36rem, 8vw, 1.64rem)` |
| [designv2/scss/_abv2-related.scss:28](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-related.scss:28) | `.abv2-related__title` | `clamp(1.6rem, 2.2vw, 2.24rem)` |
| [designv2/scss/_abv2-stat-editorial.scss:48](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-stat-editorial.scss:48) | `.abv2-editorial-stat__value` | `clamp(1.55rem, 2vw, 2rem)` |
| [designv2/scss/_abv2-stat.scss:10](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-stat.scss:10) | `/* ======================================== Homepage / landing stat ======================================== */ .abv2-stat__label` | `clamp(1.04rem, 1.4vw, 1.32rem)` |
| [designv2/scss/_abv2-stat.scss:20](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-stat.scss:20) | `.abv2-stat__value` | `clamp(1.95rem, 2.35vw, 2.5rem)` |
| [designv2/scss/_abv2-stat.scss:35](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-stat.scss:35) | `/* Tablet */ @media (max-width: 979px) and (min-width: 760px) > .abv2-stat__value` | `clamp(1.8rem, 3.4vw, 2.2rem)` |
| [designv2/scss/_home-cta.scss:83](/Users/mattreeves/abundanceinvestment/designv2/scss/_home-cta.scss:83) | `.home-cta__title` | `clamp(2.2rem, 4vw, 3rem)` |

## Experimental Partials

| Location | Selector/context | `font-size` value |
| --- | --- | --- |
| [designv2/scss/experiments/_abv2-egp.scss:35](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-egp.scss:35) | `.abv2-egp__title` | `clamp(1.3rem, 2vw, 1.7rem)` |
| [designv2/scss/experiments/_abv2-egp.scss:84](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-egp.scss:84) | `.abv2-egp__stat-value` | `clamp(1.35rem,1.8vw,1.8rem)` |
| [designv2/scss/experiments/_abv2-end-cta-editorial.scss:21](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-end-cta-editorial.scss:21) | `.abv2-editorial-end-cta__title` | `clamp(1.3rem, 2vw, 1.6rem)` |
| [designv2/scss/experiments/_abv2-feature-stat.scss:67](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-feature-stat.scss:67) | `.abv2-feature-stat__value` | `clamp(2rem, 3vw, 3rem)` |
| [designv2/scss/experiments/_abv2-invest-insert.scss:75](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-invest-insert.scss:75) | `.abv2-invest-insert__title` | `clamp(1.18rem,1.8vw,1.42rem)` |
| [designv2/scss/experiments/_abv2-quote.scss:55](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-quote.scss:55) | `.abv2-quote__text` | `clamp(1.9rem, 3vw, 3rem)` |
| [designv2/scss/experiments/_abv2-subnav.scss:44](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_abv2-subnav.scss:44) | `.abv2-subnav__title` | `clamp(1.5rem, 2vw, 2rem)` |
| [designv2/scss/experiments/_ai-council-hero2.scss:40](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_ai-council-hero2.scss:40) | `.ai-council-hero2__title` | `clamp(2.2rem,4vw,3.6rem)` |
| [designv2/scss/experiments/_ai-council-history.scss:24](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_ai-council-history.scss:24) | `.ai-council-history__title` | `clamp(2rem,3vw,2.5rem)` |
| [designv2/scss/experiments/_ai-council-open.scss:28](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_ai-council-open.scss:28) | `.ai-council-open__intro h2` | `clamp(2rem,3vw,2.5rem)` |
| [designv2/scss/experiments/_ai-council-spend.scss:23](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_ai-council-spend.scss:23) | `.ai-council-spend__title` | `clamp(2rem,3vw,2.5rem)` |
| [designv2/scss/experiments/_home-choice-v2.scss:24](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_home-choice-v2.scss:24) | `/* ========================================================= ========================================================= */ .home-choice-v2__title` | `clamp(2.4rem, 3.6vw, 3.2rem)` |
| [designv2/scss/experiments/_home-choice.scss:21](/Users/mattreeves/abundanceinvestment/designv2/scss/experiments/_home-choice.scss:21) | `.home-choice__title` | `clamp(2.2rem, 3.5vw, 3rem)` |

## Related Non-Text Viewport/Clamp Uses

These are not `font-size` declarations, but they also use `clamp()` and/or viewport units in the same partial set. Included for awareness only.

| Location | Declaration/source |
| --- | --- |
| [designv2/scss/_abv2-compare.scss:16](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss:16) | `margin-left: clamp(var(--abv2-space-40), 10vw, 140px);` |
| [designv2/scss/_abv2-compare.scss:28](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss:28) | `width: min(100% - clamp(40px, 10vw, 140px), 940px);` |
| [designv2/scss/_abv2-compare.scss:29](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-compare.scss:29) | `margin-left: clamp(var(--abv2-space-40), 10vw, 140px);` |
| [designv2/scss/_abv2-council-features.scss:50](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-features.scss:50) | `margin-left:clamp(var(--abv2-space-56), 10vw, 140px);` |
| [designv2/scss/_abv2-council-features.scss:57](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-features.scss:57) | `width:min(100% - clamp(52px, 10vw, 140px), 980px);` |
| [designv2/scss/_abv2-council-features.scss:58](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-features.scss:58) | `margin-left:clamp(var(--abv2-space-56), 10vw, 140px);` |
| [designv2/scss/_abv2-council-hero.scss:17](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-council-hero.scss:17) | `gap:clamp(var(--abv2-space-40), 5vw, var(--abv2-space-72));` |
| [designv2/scss/_abv2-end-cta.scss:61](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-end-cta.scss:61) | `gap:clamp(var(--abv2-space-40), 5vw, 88px);` |
| [designv2/scss/_abv2-features.scss:50](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-features.scss:50) | `margin-left:clamp(var(--abv2-space-40), 10vw, 140px);` |
| [designv2/scss/_abv2-features.scss:65](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-features.scss:65) | `width:min(100% - clamp(40px, 10vw, 140px), 940px);` |
| [designv2/scss/_abv2-features.scss:66](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-features.scss:66) | `margin-left:clamp(var(--abv2-space-40), 10vw, 140px);` |
| [designv2/scss/_abv2-features.scss:72](/Users/mattreeves/abundanceinvestment/designv2/scss/_abv2-features.scss:72) | `margin-left:clamp(var(--abv2-space-40), 10vw, 140px);` |
