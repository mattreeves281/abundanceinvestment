# CMS JS Output Manifest

Generated from `v2-local/pages/*.html` and `v2-local/assets/js/*.js`.
Each `.js` file is paste-ready for the CMS and deliberately excludes wrapping `<script>` tags.

| Page source | CMS JS file | Includes |
| --- | --- | --- |
| `about-abundance.html` | `about-abundance.js` | `_live-stats.js` |
| `about-municipal-lending.html` | None | No page-specific JS needed |
| `council-bristol.html` | `council-bristol.js` | `council-hub-programme.js` |
| `council-camden.html` | `council-camden.js` | `council-hub-legacy.js` |
| `council-cotswold.html` | `council-cotswold.js` | `council-hub-legacy.js` |
| `council-edinburgh.html` | `council-edinburgh.js` | `council-edinburgh.js` |
| `council-glasgow.html` | `council-glasgow.js` | `council-hub-programme.js` |
| `council-greenwich.html` | `council-greenwich.js` | `council-hub-programme.js` |
| `council-hackney.html` | `council-hackney.js` | `council-hub-programme.js` |
| `council-hammersmith-and-fulham.html` | `council-hammersmith-and-fulham.js` | `council-hub-programme.js` |
| `council-hounslow.html` | `council-hounslow.js` | `council-hub-programme.js` |
| `council-hub-legacy.html` | `council-hub-legacy.js` | `council-hub-legacy.js` |
| `council-islington.html` | `council-islington.js` | `council-hub-legacy.js` |
| `council-lewisham.html` | `council-lewisham.js` | `council-hub-legacy.js` |
| `council-oxfordshire.html` | `council-oxfordshire.js` | `council-hub-legacy.js` |
| `council-sheffield.html` | `council-sheffield.js` | `council-hub-programme.js` |
| `council-southwark.html` | `council-southwark.js` | `council-hub-programme.js` |
| `council-suffolk.html` | `council-suffolk.js` | `council-hub-legacy.js` |
| `council-telford-and-wrekin.html` | `council-telford-and-wrekin.js` | `council-hub-legacy.js` |
| `council-warrington.html` | `council-warrington.js` | `council-hub-legacy.js` |
| `council-west-berkshire.html` | `council-west-berkshire.js` | `council-hub-legacy.js` |
| `council-westminster.html` | `council-westminster.js` | `council-hub-programme.js` |
| `councils-we-work-with.html` | `councils-we-work-with.js` | `_live-stats.js`, `councils-we-work-with.js` |
| `green-social-finance-framework.html` | None | No page-specific JS needed |
| `how-it-works-no-auto.html` | `how-it-works-no-auto.js` | `_live-stats.js`, `how-it-works-no-auto.js` |
| `how-it-works.html` | `how-it-works.js` | `_live-stats.js`, `how-it-works.js` |
| `index.html` | `index.js` | `_live-stats.js`, `index.js` |
| `invest-now copy.html` | None | No page-specific JS needed |
| `invest-now-no-auto.html` | `invest-now-no-auto.js` | `_live-stats.js`, `invest-now-no-auto.js` |
| `invest-now.html` | `invest-now.js` | `_live-stats.js`, `invest-now.js` |
| `make-a-positive-difference.html` | `make-a-positive-difference.js` | `_live-stats.js`, `make-a-positive-difference.js` |
| `news-16-million-boost-for-municipal-investments.html` | None | No page-specific JS needed |
| `news-advertising-award-london.html` | None | No page-specific JS needed |
| `news-and-insight.html` | `news-and-insight.js` | `news-and-insight.js` |
| `news-bristol-launch-eu-grant.html` | None | No page-specific JS needed |
| `news-glasgow-launch-first-scottish-cmi.html` | None | No page-specific JS needed |
| `news-h-and-f-reaches-5m-target.html` | None | No page-specific JS needed |
| `news-pilot-cmi-fully-repaid.html` | None | No page-specific JS needed |
| `our-partners.html` | None | No page-specific JS needed |
| `tax-free-isa-investing-no-auto.html` | `tax-free-isa-investing-no-auto.js` | `_live-stats.js` |
| `tax-free-isa-investing.html` | `tax-free-isa-investing.js` | `_live-stats.js` |
| `understanding-the-risks.html` | None | No page-specific JS needed |
| `v2-navigation.html` | None | No page-specific JS needed |

## Notes
- Council programme pages resolve to `council-hub-programme.js` plus `_live-stats.js` where needed.
- Legacy council pages resolve to `council-hub-legacy.js`.
- Pages with live stat placeholders but no page script get a small file containing `_live-stats.js`.
- `news-and-insight.html` still needs its in-page JSON block from the HTML source as well as the generated JS.
