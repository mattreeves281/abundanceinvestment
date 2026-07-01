# UAT CSS Class Inventory

Source: `designv2/incoming/abundanceuat-css.css`. Parsed 7277 CSS rules and 4014 unique class selectors from the minified UAT stylesheet.

Updated classification note: classes beginning with `.abundance-` are treated as **Abundance v1 design-system components**. They are first-party component candidates, not random page-specific selectors and not Abundance v2 primitives by default.

## Category Summary

| Category | Class count | Reuse signal | Examples |
|---|---:|---|---|
| Abundance v1 design-system components | 41 | First-party v1 component layer: useful reference/reuse candidates, but not v2 primitives by default | `.abundance-accordion--sm`, `.abundance-badge`, `.abundance-badge--framed`, `.abundance-badge--general-portfolio`, `.abundance-badge--isa-portfolio`, `.abundance-card--general-portfolio`, `.abundance-card--isa-portfolio`, `.abundance-card--isa-portfolio-allowance`, `.abundance-dashboard-chart`, `.abundance-dashboard-chart__container`, `.abundance-dashboard-chart__data-chunk-container`, `.abundance-dashboard-chart__tooltip` ... (+29 more) |
| SI cards | 18 | High: platform card component family | `.si-card`, `.si-card--0`, `.si-card--2xs`, `.si-card--contrast`, `.si-card--full-height`, `.si-card--lg`, `.si-card--md`, `.si-card--no-border-radius`, `.si-card--primary`, `.si-card--secondary`, `.si-card--sm`, `.si-card--tertiary` ... (+6 more) |
| SI tables | 13 | High: platform table component family | `.si-table`, `.si-table--borders-all`, `.si-table--borders-below-rows`, `.si-table--borders-between-rows`, `.si-table--md`, `.si-table--md-compact`, `.si-table--mobile-stack`, `.si-table--mobile-stack-compact`, `.si-table--sm`, `.si-table--sm-compact`, `.si-table__cell--align-right`, `.si-table__row--ignore-mobile-stack` ... (+1 more) |
| Buttons | 78 | High/medium: inspect variant semantics | `.brand-btn`, `.brand-btn--block`, `.brand-btn--lg`, `.brand-btn--md`, `.brand-btn--no-border`, `.brand-btn--placeholder-animation`, `.brand-btn--sm`, `.brand-btn--xl`, `.brand-btn-disabled`, `.brand-btn-grey--bordered`, `.brand-btn-grey--floating`, `.brand-btn-primary` ... (+66 more) |
| Forms | 36 | Medium: form controls often have behaviour/state coupling | `.checkbox`, `.checkbox-inline`, `.checkbox-round`, `.field-validation-error`, `.field-validation-error-additional`, `.field-validation-valid`, `.form-check`, `.form-check-inline`, `.form-check-input`, `.form-check-label`, `.form-control`, `.form-control-color` ... (+24 more) |
| Alerts | 6 | Medium/high: reusable feedback components | `.alert`, `.alert--no-frame`, `.toast`, `.toast-body`, `.toast-container`, `.toast-header` |
| Modals | 26 | Medium: Bootstrap/platform modal coupling likely | `.modal`, `.modal-backdrop`, `.modal-body`, `.modal-content`, `.modal-content--cool-off`, `.modal-content--full-risk`, `.modal-content--no-scroll`, `.modal-dialog`, `.modal-dialog--cool-off`, `.modal-dialog--personalised-risk`, `.modal-dialog-centered`, `.modal-dialog-scrollable` ... (+14 more) |
| Accordions | 8 | Medium: behaviour coupling likely | `.accordion`, `.accordion--list`, `.accordion__collapsible-content`, `.accordion__main-content`, `.accordion__summary-item`, `.accordion__toggle-icon`, `.collapse`, `.collapsing` |
| Tabs/navigation | 26 | Medium: navigation patterns, inspect markup requirements | `.nav`, `.nav-fill`, `.nav-item`, `.nav-justified`, `.nav-link`, `.nav-pills`, `.nav-tabs`, `.navbar`, `.navbar-brand`, `.navbar-collapse`, `.navbar-dark`, `.navbar-expand` ... (+14 more) |
| Breadcrumbs | 11 | High: conventional navigation component | `.breadcrumb`, `.breadcrumb-item`, `.breadcrumbs`, `.breadcrumbs-inner-text`, `.breadcrumbs-inner-text-display-mobile`, `.breadcrumbs-link`, `.breadcrumbs-link--ifisa`, `.breadcrumbs-link-disabled`, `.breadcrumbs-list`, `.breadcrumbs-list-item`, `.breadcrumbs-list-item--active` |
| Progress | 4 | Medium: conventional but inspect colours/states | `.progress`, `.progress-bar`, `.progress-bar-animated`, `.progress-bar-striped` |
| Lists | 22 | Medium/high: often reusable | `.list-group`, `.list-group-flush`, `.list-group-horizontal`, `.list-group-horizontal-lg`, `.list-group-horizontal-md`, `.list-group-horizontal-sm`, `.list-group-item`, `.list-group-item-action`, `.list-group-item-danger`, `.list-group-item-dark`, `.list-group-item-heading`, `.list-group-item-info` ... (+10 more) |
| Icons | 100 | High: icon helpers, check asset/font dependency | `.fa-10x`, `.fa-1x`, `.fa-2x`, `.fa-3x`, `.fa-4x`, `.fa-5x`, `.fa-6x`, `.fa-7x`, `.fa-8x`, `.fa-9x`, `.fa-border`, `.fa-fw` ... (+88 more) |
| Spacing utilities | 486 | High: utility/helper layer | `.m-0`, `.m-1`, `.m-2`, `.m-3`, `.m-4`, `.m-5`, `.m-all-spacer-0`, `.m-all-spacer-2xl`, `.m-all-spacer-2xs`, `.m-all-spacer-3xs`, `.m-all-spacer-4xl`, `.m-all-spacer-4xs` ... (+474 more) |
| Layout/grid | 148 | High/medium: platform layout primitives | `.col`, `.col--over-ten-digit-account-value`, `.col--over-thirty-four-digit-row-value`, `.col-1`, `.col-10`, `.col-11`, `.col-12`, `.col-2`, `.col-3`, `.col-4`, `.col-5`, `.col-6` ... (+136 more) |
| Display/flex utilities | 174 | High: utility/helper layer | `.align-baseline`, `.align-bottom`, `.align-content-around`, `.align-content-between`, `.align-content-center`, `.align-content-end`, `.align-content-lg-around`, `.align-content-lg-between`, `.align-content-lg-center`, `.align-content-lg-end`, `.align-content-lg-start`, `.align-content-lg-stretch` ... (+162 more) |
| Typography utilities | 43 | High/medium: check v2 type roles before reuse | `.body--lg`, `.body--md`, `.body--offwhite`, `.body--sm`, `.body--xl`, `.body--xs`, `.caption-top`, `.font-monospace`, `.font-primary`, `.font-secondary`, `.h1`, `.h2` ... (+31 more) |
| Width/choke utilities | 35 | High: utility/helper layer | `.choke-100`, `.choke-1000`, `.choke-1100`, `.choke-1200`, `.choke-1300`, `.choke-200`, `.choke-300`, `.choke-400`, `.choke-500`, `.choke-600`, `.choke-700`, `.choke-800` ... (+23 more) |
| Colour/surface utilities | 60 | Medium: check token compatibility | `.bg-blob`, `.bg-blob--cyan`, `.bg-blob--mobile`, `.bg-blob--red`, `.bg-blob--yellow`, `.bg-body`, `.bg-cap`, `.bg-cap--b-concave-white`, `.bg-cap--b-convex-white`, `.bg-cap--t-concave-white`, `.bg-cap--t-convex-neutral-300`, `.bg-cap--t-convex-white` ... (+48 more) |
| Visibility utilities | 15 | High: utility/helper layer | `.d-lg-none`, `.d-md-none`, `.d-sm-none`, `.hidden-form`, `.hidden-md`, `.hiddenForm`, `.hide`, `.invisible`, `.show`, `.sr-only`, `.visible`, `.visible-desktop` ... (+3 more) |
| Media/image utilities | 14 | Medium/high: inspect ratio/fit assumptions | `.img-fluid`, `.img-hero--mobile`, `.img-hero-council--mobile`, `.img-responsive`, `.img-thumbnail`, `.ratio`, `.ratio-16x9`, `.ratio-1x1`, `.ratio-21x9`, `.ratio-4x3`, `.video-card`, `.video-iframe-container-16-9` ... (+2 more) |
| Bootstrap JS components | 27 | Medium/low: JS/markup coupling likely | `.carousel`, `.carousel-caption`, `.carousel-control-next`, `.carousel-control-next-icon`, `.carousel-control-prev`, `.carousel-control-prev-icon`, `.carousel-dark`, `.carousel-fade`, `.carousel-indicators`, `.carousel-inner`, `.carousel-item`, `.carousel-item-end` ... (+15 more) |
| Platform/product components | 33 | Medium/low: product-coupled, inspect before reuse | `.admin-banner`, `.admin-banner-wrapper`, `.admin-banner__btn`, `.admin-banner__text`, `.bank-description`, `.cookie`, `.cookie-banner`, `.cookie-information`, `.cookie-setting__item--checkmark`, `.cookie-setting__item--label`, `.cookie-settings`, `.cookie-settings--confirmation` ... (+21 more) |
| Current/experimental v2 or page-specific | 42 | Low: page/prototype-specific | `.brand-blockquote`, `.brand-danger`, `.brand-dropdown`, `.brand-dropdown--companies`, `.brand-dropdown--councils`, `.brand-dropdown-menu`, `.brand-dropdown-menu-toggle`, `.brand-dropdown-menu__item`, `.brand-figure`, `.brand-grey`, `.brand-image`, `.brand-image-container` ... (+30 more) |
| Other component families | 1020 | Manual review | `.PitchCard-banner--resale`, `.appropriateness-test__title`, `.arrow-icon--left`, `.arrow-icon--right`, `.body-no-scroll--desktop`, `.checkmark--rounded`, `.display--sm`, `.display--sm-only`, `.display-block--important`, `.display-block--md`, `.display-block--md-only`, `.display-none--important` ... (+1008 more) |
| Other / unclassified | 1528 | Manual review | `.PagedList-skipToNext`, `.PagedList-skipToPrevious`, `.PitchCard-banner`, `.PitchCard-resale-wrapper`, `.PitchInvesment-amount`, `.PitchInvesment-content`, `.PitchInvesment-heading`, `.PitchInvesment-image`, `.PitchInvesment-image-bg`, `.PitchInvestment-amount`, `.PitchInvestment-cancel`, `.PitchInvestment-content` ... (+1516 more) |

## Abundance v1 Component Families

Found 41 `.abundance-*` classes across 13 apparent component families. These are first-party v1 component patterns and are strong reuse/reference candidates where v2 does not require a new component contract.

| Family | Count | Example selectors | Main properties observed |
|---|---:|---|---|
| `abundance-dashboard` | 15 | `.abundance-dashboard__card-body-text`, `.abundance-dashboard__card-body-text--bold`, `.abundance-dashboard__card-body-text--negative`, `.abundance-dashboard__card-body-text--positive`, `.abundance-dashboard__card-body-text--semi-bold`, `.abundance-dashboard__card-body-text--sm`, `.abundance-dashboard__card-heading`, `.abundance-dashboard__card-heading-link` ... (+7 more) | color: #4d4a46; font-family: "Sohne Buch",system-ui,-apple-system,BlinkMacSystemFont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif; font-size: .875rem; font-weight: 400; letter-spacing: normal; line-height: 1.62 |
| `abundance-dashboard-chart` | 7 | `.abundance-dashboard-chart`, `.abundance-dashboard-chart__container`, `.abundance-dashboard-chart__data-chunk-container`, `.abundance-dashboard-chart__tooltip`, `.abundance-dashboard-chart__tooltip-footer`, `.abundance-dashboard-chart__tooltip-label`, `.abundance-dashboard-chart__tooltip-title` | max-height: 400px; max-width: 400px |
| `abundance-badge` | 4 | `.abundance-badge`, `.abundance-badge--framed`, `.abundance-badge--general-portfolio`, `.abundance-badge--isa-portfolio` | border: 1px solid; border-radius: 50px; color: #282827; font-family: "Sohne Buch",system-ui,-apple-system,BlinkMacSystemFont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif; font-size: .75rem; font-weight: 400; line-height: 1.2; padding: .5rem 1rem |
| `abundance-card` | 3 | `.abundance-card--general-portfolio`, `.abundance-card--isa-portfolio`, `.abundance-card--isa-portfolio-allowance` | background-color: #f7d9e8; color: #c1658b |
| `abundance-dashboard-counter` | 3 | `.abundance-dashboard-counter`, `.abundance-dashboard-counter__heading`, `.abundance-dashboard-counter__item` | counter-reset: step |
| `abundance-dashboard-communication-post` | 2 | `.abundance-dashboard-communication-post`, `.abundance-dashboard-communication-post__content` | flex: 1 1 200px; max-width: calc(50% - 3rem); min-width: 100% |
| `abundance-accordion` | 1 | `.abundance-accordion--sm` | align-items: center; color: #282827 / #4d4a46; font-family: "New Kansas",Georgia,serif / "Sohne Buch",system-ui,-apple-system,BlinkMacSystemFont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif; font-size: 1.125rem / 1rem / .875rem; font-weight: 600 / 400; letter-spacing: normal; line-height: 1.08 / 1.62; text-transform: none |
| `abundance-dashboard-communication-posts` | 1 | `.abundance-dashboard-communication-posts` | align-items: start; display: flex; flex-wrap: wrap; gap: 3rem |
| `abundance-dashboard-council-image` | 1 | `.abundance-dashboard-council-image` | border: 1px solid #e2e2e2; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1019607843); position: absolute |
| `abundance-dashboard-council-info-card` | 1 | `.abundance-dashboard-council-info-card__image-container` | height: 64px; object-fit: contain; width: 64px |
| `abundance-dashboard-councils-animation` | 1 | `.abundance-dashboard-councils-animation__container` | align-items: center; display: flex; height: 100%; position: relative; transform-style: preserve-3d |
| `abundance-dashboard-isa-allowance-data-chunk-label` | 1 | `.abundance-dashboard-isa-allowance-data-chunk-label` | color: #282827; font-family: "Sohne Buch",system-ui,-apple-system,BlinkMacSystemFont,"avenir next",avenir,"helvetica neue",helvetica,ubuntu,roboto,noto,"segoe ui",arial,sans-serif; font-size: .875rem; font-weight: 400 / 600; line-height: 1.2 |
| `abundance-dashboard-list` | 1 | `.abundance-dashboard-list` | display: flex; flex-direction: column; gap: 3rem; padding: 0 |

## Reuse-Oriented Component Inventory

### Abundance v1 design-system components (41)

First-party v1 component layer: useful reference/reuse candidates, but not v2 primitives by default.

`.abundance-accordion--sm`, `.abundance-badge`, `.abundance-badge--framed`, `.abundance-badge--general-portfolio`, `.abundance-badge--isa-portfolio`, `.abundance-card--general-portfolio`, `.abundance-card--isa-portfolio`, `.abundance-card--isa-portfolio-allowance`

`.abundance-dashboard-chart`, `.abundance-dashboard-chart__container`, `.abundance-dashboard-chart__data-chunk-container`, `.abundance-dashboard-chart__tooltip`, `.abundance-dashboard-chart__tooltip-footer`, `.abundance-dashboard-chart__tooltip-label`, `.abundance-dashboard-chart__tooltip-title`, `.abundance-dashboard-communication-post`

`.abundance-dashboard-communication-post__content`, `.abundance-dashboard-communication-posts`, `.abundance-dashboard-council-image`, `.abundance-dashboard-council-info-card__image-container`, `.abundance-dashboard-councils-animation__container`, `.abundance-dashboard-counter`, `.abundance-dashboard-counter__heading`, `.abundance-dashboard-counter__item`

`.abundance-dashboard-isa-allowance-data-chunk-label`, `.abundance-dashboard-list`, `.abundance-dashboard__card-body-text`, `.abundance-dashboard__card-body-text--bold`, `.abundance-dashboard__card-body-text--negative`, `.abundance-dashboard__card-body-text--positive`, `.abundance-dashboard__card-body-text--semi-bold`, `.abundance-dashboard__card-body-text--sm`

`.abundance-dashboard__card-heading`, `.abundance-dashboard__card-heading-link`, `.abundance-dashboard__card-heading-link--general-portfolio`, `.abundance-dashboard__card-heading-link--isa-portfolio`, `.abundance-dashboard__card-subheading`, `.abundance-dashboard__content-group`, `.abundance-dashboard__content-group--space-between`, `.abundance-dashboard__table--borderless`

`.abundance-dashboard__table--text-sm`

### SI cards (18)

High: platform card component family.

`.si-card`, `.si-card--0`, `.si-card--2xs`, `.si-card--contrast`, `.si-card--full-height`, `.si-card--lg`, `.si-card--md`, `.si-card--no-border-radius`

`.si-card--primary`, `.si-card--secondary`, `.si-card--sm`, `.si-card--tertiary`, `.si-card--xs`, `.si-card-notice`, `.si-card-summary`, `.si-card-summary--ruler`

`.si-card-summary--table`, `.si-card-summary--table-container`

### SI tables (13)

High: platform table component family.

`.si-table`, `.si-table--borders-all`, `.si-table--borders-below-rows`, `.si-table--borders-between-rows`, `.si-table--md`, `.si-table--md-compact`, `.si-table--mobile-stack`, `.si-table--mobile-stack-compact`

`.si-table--sm`, `.si-table--sm-compact`, `.si-table__cell--align-right`, `.si-table__row--ignore-mobile-stack`, `.si-table__vertical-cell-content`

### Buttons (78)

High/medium: inspect variant semantics.

`.brand-btn`, `.brand-btn--block`, `.brand-btn--lg`, `.brand-btn--md`, `.brand-btn--no-border`, `.brand-btn--placeholder-animation`, `.brand-btn--sm`, `.brand-btn--xl`

`.brand-btn-disabled`, `.brand-btn-grey--bordered`, `.brand-btn-grey--floating`, `.brand-btn-primary`, `.brand-btn-secondary`, `.brand-btn-yellow`, `.brand-btn-yellow--bordered`, `.brand-btn-yellow--floating`

`.btn`, `.btn--block`, `.btn--delete`, `.btn--lg`, `.btn--md`, `.btn--no-border`, `.btn--sm`, `.btn--xl`

`.btn-block`, `.btn-block-mobile`, `.btn-check`, `.btn-close`, `.btn-close-white`, `.btn-copy-to-clipboard`, `.btn-copy-to-clipboard--placeholder-animation`, `.btn-copy-to-clipboard__container`

`.btn-copy-to-clipboard__success`, `.btn-copy-to-clipboard__tooltip`, `.btn-danger`, `.btn-dark`, `.btn-disabled`, `.btn-group`, `.btn-group-lg`, `.btn-group-sm`

`.btn-group-vertical`, `.btn-info`, `.btn-lg`, `.btn-light`, `.btn-link`, `.btn-link--no-padding`, `.btn-outline-danger`, `.btn-outline-dark`

`.btn-outline-info`, `.btn-outline-light`, `.btn-outline-primary`, `.btn-outline-secondary`, `.btn-outline-success`, `.btn-outline-warning`, `.btn-pitch-doc`, `.btn-primary`

`.btn-primary--bordered`, `.btn-primary--floating`, `.btn-ps22`, `.btn-secondary`, `.btn-secondary--bordered`, `.btn-secondary--floating`, `.btn-sm`, `.btn-success`

`.btn-toolbar`, `.btn-transfer-out`, `.btn-warning`, `.si-btn`, `.si-btn--block`, `.si-btn--lg`, `.si-btn--md`, `.si-btn--no-border`

`.si-btn--primary`, `.si-btn--secondary`, `.si-btn--sm`, `.si-btn--tertiary`, `.si-btn--wrap`, `.si-btn--xl`

### Forms (36)

Medium: form controls often have behaviour/state coupling.

`.checkbox`, `.checkbox-inline`, `.checkbox-round`, `.field-validation-error`, `.field-validation-error-additional`, `.field-validation-valid`, `.form-check`, `.form-check-inline`

`.form-check-input`, `.form-check-label`, `.form-control`, `.form-control-color`, `.form-control-lg`, `.form-control-plaintext`, `.form-control-sm`, `.form-floating`

`.form-label`, `.form-range`, `.form-select`, `.form-select-lg`, `.form-select-sm`, `.form-switch`, `.form-text`, `.input-group`

`.input-group-addon`, `.input-group-lg`, `.input-group-sm`, `.input-group-text`, `.input-symbol-pound`, `.input-validation-error`, `.label--lg`, `.label--md`

`.label--sm`, `.label--xs`, `.label--xxs`, `.radio`

### Alerts (6)

Medium/high: reusable feedback components.

`.alert`, `.alert--no-frame`, `.toast`, `.toast-body`, `.toast-container`, `.toast-header`

### Modals (26)

Medium: Bootstrap/platform modal coupling likely.

`.modal`, `.modal-backdrop`, `.modal-body`, `.modal-content`, `.modal-content--cool-off`, `.modal-content--full-risk`, `.modal-content--no-scroll`, `.modal-dialog`

`.modal-dialog--cool-off`, `.modal-dialog--personalised-risk`, `.modal-dialog-centered`, `.modal-dialog-scrollable`, `.modal-dialog-timer`, `.modal-footer`, `.modal-footer--bordered`, `.modal-fullscreen`

`.modal-fullscreen-lg-down`, `.modal-fullscreen-md-down`, `.modal-fullscreen-sm-down`, `.modal-header`, `.modal-header--single-item`, `.modal-lg`, `.modal-sm`, `.modal-static`

`.modal-title`, `.modal-xl`

### Accordions (8)

Medium: behaviour coupling likely.

`.accordion`, `.accordion--list`, `.accordion__collapsible-content`, `.accordion__main-content`, `.accordion__summary-item`, `.accordion__toggle-icon`, `.collapse`, `.collapsing`

### Tabs/navigation (26)

Medium: navigation patterns, inspect markup requirements.

`.nav`, `.nav-fill`, `.nav-item`, `.nav-justified`, `.nav-link`, `.nav-pills`, `.nav-tabs`, `.navbar`

`.navbar-brand`, `.navbar-collapse`, `.navbar-dark`, `.navbar-expand`, `.navbar-expand-lg`, `.navbar-expand-md`, `.navbar-expand-sm`, `.navbar-is-collapsed`

`.navbar-light`, `.navbar-main`, `.navbar-nav`, `.navbar-nav-scroll`, `.navbar-text`, `.navbar-toggler`, `.navbar-toggler-icon`, `.tab--active`

`.tab-content`, `.tab-pane`

### Breadcrumbs (11)

High: conventional navigation component.

`.breadcrumb`, `.breadcrumb-item`, `.breadcrumbs`, `.breadcrumbs-inner-text`, `.breadcrumbs-inner-text-display-mobile`, `.breadcrumbs-link`, `.breadcrumbs-link--ifisa`, `.breadcrumbs-link-disabled`

`.breadcrumbs-list`, `.breadcrumbs-list-item`, `.breadcrumbs-list-item--active`

### Progress (4)

Medium: conventional but inspect colours/states.

`.progress`, `.progress-bar`, `.progress-bar-animated`, `.progress-bar-striped`

### Lists (22)

Medium/high: often reusable.

`.list-group`, `.list-group-flush`, `.list-group-horizontal`, `.list-group-horizontal-lg`, `.list-group-horizontal-md`, `.list-group-horizontal-sm`, `.list-group-item`, `.list-group-item-action`

`.list-group-item-danger`, `.list-group-item-dark`, `.list-group-item-heading`, `.list-group-item-info`, `.list-group-item-light`, `.list-group-item-primary`, `.list-group-item-secondary`, `.list-group-item-success`

`.list-group-item-text`, `.list-group-item-warning`, `.list-group-numbered`, `.list-inline`, `.list-inline-item`, `.list-unstyled`

### Icons (100)

High: icon helpers, check asset/font dependency.

`.fa-10x`, `.fa-1x`, `.fa-2x`, `.fa-3x`, `.fa-4x`, `.fa-5x`, `.fa-6x`, `.fa-7x`

`.fa-8x`, `.fa-9x`, `.fa-border`, `.fa-fw`, `.fa-layers`, `.fa-layers-bottom-left`, `.fa-layers-bottom-right`, `.fa-layers-counter`

`.fa-layers-text`, `.fa-layers-top-left`, `.fa-layers-top-right`, `.fa-lg`, `.fa-li`, `.fa-pull-left`, `.fa-pull-right`, `.fa-sm`

`.fa-ul`, `.fa-w-1`, `.fa-w-10`, `.fa-w-11`, `.fa-w-12`, `.fa-w-13`, `.fa-w-14`, `.fa-w-15`

`.fa-w-16`, `.fa-w-17`, `.fa-w-18`, `.fa-w-19`, `.fa-w-2`, `.fa-w-20`, `.fa-w-3`, `.fa-w-4`

`.fa-w-5`, `.fa-w-6`, `.fa-w-7`, `.fa-w-8`, `.fa-w-9`, `.fa-xs`, `.icon`, `.icon--2xl`

`.icon--approve`, `.icon--arrow-right-accent`, `.icon--bank`, `.icon--bin`, `.icon--book-reading`, `.icon--checkmark`, `.icon--clipboard`, `.icon--coin-pink`

`.icon--cta`, `.icon--decline`, `.icon--down-arrow--grey`, `.icon--down-chevron-dark-grey`, `.icon--error`, `.icon--factory-yellow`, `.icon--feed`, `.icon--feed-icon`

`.icon--growth-chart`, `.icon--info`, `.icon--info-red`, `.icon--information`, `.icon--investing-and-banking`, `.icon--left-arrow--dark-grey`, `.icon--left-arrow--pink`, `.icon--lg`

`.icon--lightbulb-cyan`, `.icon--lightbulb-pink`, `.icon--location`, `.icon--lock-pink`, `.icon--md`, `.icon--messages-icon`, `.icon--phone`, `.icon--play-red`

`.icon--portfolio-icon`, `.icon--right-arrow`, `.icon--right-arrow--green`, `.icon--right-arrow--grey`, `.icon--right-arrow--orange`, `.icon--right-arrow--pink`, `.icon--sm`, `.icon--statement`

`.icon--success`, `.icon--up-arrow--grey`, `.icon--verified`, `.icon--warning`, `.icon--xl`, `.icon--xs`, `.icon-md--2xl`, `.icon-md--lg`

`.icon-md--md`, `.icon-md--sm`, `.icon-md--xl`, `.icon-md--xs`

### Spacing utilities (486)

High: utility/helper layer.

`.m-0`, `.m-1`, `.m-2`, `.m-3`, `.m-4`, `.m-5`, `.m-all-spacer-0`, `.m-all-spacer-2xl`

`.m-all-spacer-2xs`, `.m-all-spacer-3xs`, `.m-all-spacer-4xl`, `.m-all-spacer-4xs`, `.m-all-spacer-5xs`, `.m-all-spacer-6xl`, `.m-all-spacer-8xl`, `.m-all-spacer-lg`

`.m-all-spacer-md`, `.m-all-spacer-sm`, `.m-all-spacer-xl`, `.m-all-spacer-xs`, `.m-auto`, `.m-b-0--mobile`, `.m-b-spacer-0`, `.m-b-spacer-2xl`

`.m-b-spacer-2xl--mobile`, `.m-b-spacer-2xs`, `.m-b-spacer-2xs--mobile`, `.m-b-spacer-3xs`, `.m-b-spacer-4xl`, `.m-b-spacer-4xl--mobile`, `.m-b-spacer-4xs`, `.m-b-spacer-5xs`

`.m-b-spacer-6xl`, `.m-b-spacer-6xl--mobile`, `.m-b-spacer-8xl`, `.m-b-spacer-8xl--mobile`, `.m-b-spacer-auto`, `.m-b-spacer-lg`, `.m-b-spacer-lg--mobile`, `.m-b-spacer-md`

`.m-b-spacer-md--mobile`, `.m-b-spacer-sm`, `.m-b-spacer-sm--mobile`, `.m-b-spacer-xl`, `.m-b-spacer-xl--mobile`, `.m-b-spacer-xs`, `.m-b-spacer-xs--mobile`, `.m-l-spacer-0`

`.m-l-spacer-2xl`, `.m-l-spacer-2xs`, `.m-l-spacer-3xs`, `.m-l-spacer-4xl`, `.m-l-spacer-4xs`, `.m-l-spacer-5xs`, `.m-l-spacer-6xl`, `.m-l-spacer-8xl`

`.m-l-spacer-auto`, `.m-l-spacer-lg`, `.m-l-spacer-md`, `.m-l-spacer-sm`, `.m-l-spacer-xl`, `.m-l-spacer-xs`, `.m-lg-0`, `.m-lg-1`

`.m-lg-2`, `.m-lg-3`, `.m-lg-4`, `.m-lg-5`, `.m-lg-auto`, `.m-md-0`, `.m-md-1`, `.m-md-2`

`.m-md-3`, `.m-md-4`, `.m-md-5`, `.m-md-auto`, `.m-r-spacer-0`, `.m-r-spacer-2xl`, `.m-r-spacer-2xs`, `.m-r-spacer-3xs`

`.m-r-spacer-4xl`, `.m-r-spacer-4xs`, `.m-r-spacer-5xs`, `.m-r-spacer-6xl`, `.m-r-spacer-8xl`, `.m-r-spacer-auto`, `.m-r-spacer-lg`, `.m-r-spacer-md`

`.m-r-spacer-sm`, `.m-r-spacer-xl`, `.m-r-spacer-xs`, `.m-sm-0`, `.m-sm-1`, `.m-sm-2`, `.m-sm-3`, `.m-sm-4`

`.m-sm-5`, `.m-sm-auto`, `.m-t-0--mobile`, `.m-t-spacer-0`, `.m-t-spacer-2xl`, `.m-t-spacer-2xl--mobile`, `.m-t-spacer-2xs`, `.m-t-spacer-2xs--mobile`

`.m-t-spacer-3xs`, `.m-t-spacer-4xl`, `.m-t-spacer-4xl--mobile`, `.m-t-spacer-4xs`, `.m-t-spacer-5xs`, `.m-t-spacer-6xl`, `.m-t-spacer-6xl--mobile`, `.m-t-spacer-8xl`

`.m-t-spacer-8xl--mobile`, `.m-t-spacer-auto`, `.m-t-spacer-lg`, `.m-t-spacer-lg--mobile`, `.m-t-spacer-md`, `.m-t-spacer-md--mobile`, `.m-t-spacer-sm`, `.m-t-spacer-sm--mobile`

`.m-t-spacer-xl`, `.m-t-spacer-xl--mobile`, `.m-t-spacer-xs`, `.m-t-spacer-xs--mobile`, `.m-x--auto`, `.m-x-spacer-0`, `.m-x-spacer-2xl`, `.m-x-spacer-2xs`

`.m-x-spacer-3xs`, `.m-x-spacer-4xl`, `.m-x-spacer-4xs`, `.m-x-spacer-5xs`, `.m-x-spacer-6xl`, `.m-x-spacer-8xl`, `.m-x-spacer-auto`, `.m-x-spacer-lg`

`.m-x-spacer-md`, `.m-x-spacer-sm`, `.m-x-spacer-xl`, `.m-x-spacer-xs`, `.m-y-spacer-0`, `.m-y-spacer-2xl`, `.m-y-spacer-2xs`, `.m-y-spacer-3xs`

`.m-y-spacer-4xl`, `.m-y-spacer-4xs`, `.m-y-spacer-5xs`, `.m-y-spacer-6xl`, `.m-y-spacer-8xl`, `.m-y-spacer-auto`, `.m-y-spacer-lg`, `.m-y-spacer-md`

`.m-y-spacer-sm`, `.m-y-spacer-xl`, `.m-y-spacer-xs`, `.mb-0`, `.mb-1`, `.mb-2`, `.mb-3`, `.mb-4`

`.mb-5`, `.mb-auto`, `.mb-lg-0`, `.mb-lg-1`, `.mb-lg-2`, `.mb-lg-3`, `.mb-lg-4`, `.mb-lg-5`

`.mb-lg-auto`, `.mb-md-0`, `.mb-md-1`, `.mb-md-2`, `.mb-md-3`, `.mb-md-4`, `.mb-md-5`, `.mb-md-auto`

`.mb-sm-0`, `.mb-sm-1`, `.mb-sm-2`, `.mb-sm-3`, `.mb-sm-4`, `.mb-sm-5`, `.mb-sm-auto`, `.mt-0`

`.mt-1`, `.mt-2`, `.mt-3`, `.mt-4`, `.mt-5`, `.mt-auto`, `.mt-lg-0`, `.mt-lg-1`

`.mt-lg-2`, `.mt-lg-3`, `.mt-lg-4`, `.mt-lg-5`, `.mt-lg-auto`, `.mt-md-0`, `.mt-md-1`, `.mt-md-2`

`.mt-md-3`, `.mt-md-4`, `.mt-md-5`, `.mt-md-auto`, `.mt-sm-0`, `.mt-sm-1`, `.mt-sm-2`, `.mt-sm-3`

`.mt-sm-4`, `.mt-sm-5`, `.mt-sm-auto`, `.mx-0`, `.mx-1`, `.mx-2`, `.mx-3`, `.mx-4`

`.mx-5`, `.mx-auto`, `.mx-auto--md`, `.mx-lg-0`, `.mx-lg-1`, `.mx-lg-2`, `.mx-lg-3`, `.mx-lg-4`

`.mx-lg-5`, `.mx-lg-auto`, `.mx-md-0`, `.mx-md-1`, `.mx-md-2`, `.mx-md-3`, `.mx-md-4`, `.mx-md-5`

`.mx-md-auto`, `.mx-sm-0`, `.mx-sm-1`, `.mx-sm-2`, `.mx-sm-3`, `.mx-sm-4`, `.mx-sm-5`, `.mx-sm-auto`

`.my-0`, `.my-1`, `.my-2`, `.my-3`, `.my-4`, `.my-5`, `.my-auto`, `.my-lg-0`

`.my-lg-1`, `.my-lg-2`, `.my-lg-3`, `.my-lg-4`, `.my-lg-5`, `.my-lg-auto`, `.my-md-0`, `.my-md-1`

`.my-md-2`, `.my-md-3`, `.my-md-4`, `.my-md-5`, `.my-md-auto`, `.my-sm-0`, `.my-sm-1`, `.my-sm-2`

`.my-sm-3`, `.my-sm-4`, `.my-sm-5`, `.my-sm-auto`, `.p-0`, `.p-1`, `.p-2`, `.p-3`

`.p-4`, `.p-5`, `.p-all-spacer-0`, `.p-all-spacer-2xl`, `.p-all-spacer-2xs`, `.p-all-spacer-3xs`, `.p-all-spacer-4xl`, `.p-all-spacer-4xs`

`.p-all-spacer-5xs`, `.p-all-spacer-6xl`, `.p-all-spacer-8xl`, `.p-all-spacer-lg`, `.p-all-spacer-md`, `.p-all-spacer-sm`, `.p-all-spacer-xl`, `.p-all-spacer-xs`

`.p-b-spacer-0`, `.p-b-spacer-2xl`, `.p-b-spacer-2xs`, `.p-b-spacer-3xs`, `.p-b-spacer-4xl`, `.p-b-spacer-4xs`, `.p-b-spacer-5xs`, `.p-b-spacer-6xl`

`.p-b-spacer-8xl`, `.p-b-spacer-lg`, `.p-b-spacer-md`, `.p-b-spacer-sm`, `.p-b-spacer-xl`, `.p-b-spacer-xs`, `.p-l-spacer-0`, `.p-l-spacer-2xl`

`.p-l-spacer-2xs`, `.p-l-spacer-3xs`, `.p-l-spacer-4xl`, `.p-l-spacer-4xs`, `.p-l-spacer-5xs`, `.p-l-spacer-6xl`, `.p-l-spacer-8xl`, `.p-l-spacer-lg`

`.p-l-spacer-md`, `.p-l-spacer-sm`, `.p-l-spacer-xl`, `.p-l-spacer-xs`, `.p-lg-0`, `.p-lg-1`, `.p-lg-2`, `.p-lg-3`

`.p-lg-4`, `.p-lg-5`, `.p-md-0`, `.p-md-1`, `.p-md-2`, `.p-md-3`, `.p-md-4`, `.p-md-5`

`.p-r-spacer-0`, `.p-r-spacer-2xl`, `.p-r-spacer-2xs`, `.p-r-spacer-3xs`, `.p-r-spacer-4xl`, `.p-r-spacer-4xs`, `.p-r-spacer-5xs`, `.p-r-spacer-6xl`

`.p-r-spacer-8xl`, `.p-r-spacer-lg`, `.p-r-spacer-md`, `.p-r-spacer-sm`, `.p-r-spacer-xl`, `.p-r-spacer-xs`, `.p-sm-0`, `.p-sm-1`

`.p-sm-2`, `.p-sm-3`, `.p-sm-4`, `.p-sm-5`, `.p-t-spacer-0`, `.p-t-spacer-2xl`, `.p-t-spacer-2xs`, `.p-t-spacer-3xs`

`.p-t-spacer-4xl`, `.p-t-spacer-4xs`, `.p-t-spacer-5xs`, `.p-t-spacer-6xl`, `.p-t-spacer-8xl`, `.p-t-spacer-lg`, `.p-t-spacer-md`, `.p-t-spacer-sm`

`.p-t-spacer-xl`, `.p-t-spacer-xs`, `.p-x-spacer-0`, `.p-x-spacer-2xl`, `.p-x-spacer-2xs`, `.p-x-spacer-3xs`, `.p-x-spacer-4xl`, `.p-x-spacer-4xs`

`.p-x-spacer-5xs`, `.p-x-spacer-6xl`, `.p-x-spacer-8xl`, `.p-x-spacer-lg`, `.p-x-spacer-md`, `.p-x-spacer-sm`, `.p-x-spacer-xl`, `.p-x-spacer-xs`

`.p-y-spacer-0`, `.p-y-spacer-2xl`, `.p-y-spacer-2xs`, `.p-y-spacer-3xs`, `.p-y-spacer-4xl`, `.p-y-spacer-4xs`, `.p-y-spacer-5xs`, `.p-y-spacer-6xl`

`.p-y-spacer-8xl`, `.p-y-spacer-lg`, `.p-y-spacer-md`, `.p-y-spacer-sm`, `.p-y-spacer-xl`, `.p-y-spacer-xs`, `.pb-0`, `.pb-1`

`.pb-2`, `.pb-3`, `.pb-4`, `.pb-5`, `.pb-lg-0`, `.pb-lg-1`, `.pb-lg-2`, `.pb-lg-3`

`.pb-lg-4`, `.pb-lg-5`, `.pb-md-0`, `.pb-md-1`, `.pb-md-2`, `.pb-md-3`, `.pb-md-4`, `.pb-md-5`

`.pb-sm-0`, `.pb-sm-1`, `.pb-sm-2`, `.pb-sm-3`, `.pb-sm-4`, `.pb-sm-5`, `.pt-0`, `.pt-1`

`.pt-2`, `.pt-3`, `.pt-4`, `.pt-5`, `.pt-lg-0`, `.pt-lg-1`, `.pt-lg-2`, `.pt-lg-3`

`.pt-lg-4`, `.pt-lg-5`, `.pt-md-0`, `.pt-md-1`, `.pt-md-2`, `.pt-md-3`, `.pt-md-4`, `.pt-md-5`

`.pt-sm-0`, `.pt-sm-1`, `.pt-sm-2`, `.pt-sm-3`, `.pt-sm-4`, `.pt-sm-5`, `.px-0`, `.px-1`

`.px-2`, `.px-3`, `.px-4`, `.px-5`, `.px-lg-0`, `.px-lg-1`, `.px-lg-2`, `.px-lg-3`

`.px-lg-4`, `.px-lg-5`, `.px-md-0`, `.px-md-1`, `.px-md-2`, `.px-md-3`, `.px-md-4`, `.px-md-5`

`.px-sm-0`, `.px-sm-1`, `.px-sm-2`, `.px-sm-3`, `.px-sm-4`, `.px-sm-5`, `.py-0`, `.py-1`

`.py-2`, `.py-3`, `.py-4`, `.py-5`, `.py-lg-0`, `.py-lg-1`, `.py-lg-2`, `.py-lg-3`

`.py-lg-4`, `.py-lg-5`, `.py-md-0`, `.py-md-1`, `.py-md-2`, `.py-md-3`, `.py-md-4`, `.py-md-5`

`.py-sm-0`, `.py-sm-1`, `.py-sm-2`, `.py-sm-3`, `.py-sm-4`, `.py-sm-5`

### Layout/grid (148)

High/medium: platform layout primitives.

`.col`, `.col--over-ten-digit-account-value`, `.col--over-thirty-four-digit-row-value`, `.col-1`, `.col-10`, `.col-11`, `.col-12`, `.col-2`

`.col-3`, `.col-4`, `.col-5`, `.col-6`, `.col-7`, `.col-8`, `.col-9`, `.col-auto`

`.col-form-label`, `.col-form-label-lg`, `.col-form-label-sm`, `.col-lg`, `.col-lg-1`, `.col-lg-10`, `.col-lg-11`, `.col-lg-12`

`.col-lg-2`, `.col-lg-3`, `.col-lg-4`, `.col-lg-5`, `.col-lg-6`, `.col-lg-7`, `.col-lg-8`, `.col-lg-9`

`.col-lg-auto`, `.col-md`, `.col-md-1`, `.col-md-10`, `.col-md-11`, `.col-md-12`, `.col-md-2`, `.col-md-3`

`.col-md-4`, `.col-md-5`, `.col-md-6`, `.col-md-7`, `.col-md-8`, `.col-md-9`, `.col-md-auto`, `.col-sm`

`.col-sm-1`, `.col-sm-10`, `.col-sm-11`, `.col-sm-12`, `.col-sm-2`, `.col-sm-3`, `.col-sm-4`, `.col-sm-5`

`.col-sm-6`, `.col-sm-7`, `.col-sm-8`, `.col-sm-9`, `.col-sm-auto`, `.container`, `.container--large`, `.container-fluid`

`.container-lg`, `.container-md`, `.container-medium`, `.container-sm`, `.offset-1`, `.offset-10`, `.offset-11`, `.offset-2`

`.offset-3`, `.offset-4`, `.offset-5`, `.offset-6`, `.offset-7`, `.offset-8`, `.offset-9`, `.offset-lg-0`

`.offset-lg-1`, `.offset-lg-10`, `.offset-lg-11`, `.offset-lg-2`, `.offset-lg-3`, `.offset-lg-4`, `.offset-lg-5`, `.offset-lg-6`

`.offset-lg-7`, `.offset-lg-8`, `.offset-lg-9`, `.offset-md-0`, `.offset-md-1`, `.offset-md-10`, `.offset-md-11`, `.offset-md-2`

`.offset-md-3`, `.offset-md-4`, `.offset-md-5`, `.offset-md-6`, `.offset-md-7`, `.offset-md-8`, `.offset-md-9`, `.offset-sm-0`

`.offset-sm-1`, `.offset-sm-10`, `.offset-sm-11`, `.offset-sm-2`, `.offset-sm-3`, `.offset-sm-4`, `.offset-sm-5`, `.offset-sm-6`

`.offset-sm-7`, `.offset-sm-8`, `.offset-sm-9`, `.order-0`, `.order-1`, `.order-2`, `.order-3`, `.order-4`

`.order-5`, `.order-first`, `.order-last`, `.order-lg-0`, `.order-lg-1`, `.order-lg-2`, `.order-lg-3`, `.order-lg-4`

`.order-lg-5`, `.order-lg-first`, `.order-lg-last`, `.order-md-0`, `.order-md-1`, `.order-md-2`, `.order-md-3`, `.order-md-4`

`.order-md-5`, `.order-md-first`, `.order-md-last`, `.order-sm-0`, `.order-sm-1`, `.order-sm-2`, `.order-sm-3`, `.order-sm-4`

`.order-sm-5`, `.order-sm-first`, `.order-sm-last`, `.row`

### Display/flex utilities (174)

High: utility/helper layer.

`.align-baseline`, `.align-bottom`, `.align-content-around`, `.align-content-between`, `.align-content-center`, `.align-content-end`, `.align-content-lg-around`, `.align-content-lg-between`

`.align-content-lg-center`, `.align-content-lg-end`, `.align-content-lg-start`, `.align-content-lg-stretch`, `.align-content-md-around`, `.align-content-md-between`, `.align-content-md-center`, `.align-content-md-end`

`.align-content-md-start`, `.align-content-md-stretch`, `.align-content-sm-around`, `.align-content-sm-between`, `.align-content-sm-center`, `.align-content-sm-end`, `.align-content-sm-start`, `.align-content-sm-stretch`

`.align-content-start`, `.align-content-stretch`, `.align-items-baseline`, `.align-items-center`, `.align-items-end`, `.align-items-lg-baseline`, `.align-items-lg-center`, `.align-items-lg-end`

`.align-items-lg-start`, `.align-items-lg-stretch`, `.align-items-md-baseline`, `.align-items-md-center`, `.align-items-md-end`, `.align-items-md-start`, `.align-items-md-stretch`, `.align-items-sm-baseline`

`.align-items-sm-center`, `.align-items-sm-end`, `.align-items-sm-start`, `.align-items-sm-stretch`, `.align-items-start`, `.align-items-stretch`, `.align-middle`, `.align-self-auto`

`.align-self-baseline`, `.align-self-center`, `.align-self-end`, `.align-self-lg-auto`, `.align-self-lg-baseline`, `.align-self-lg-center`, `.align-self-lg-end`, `.align-self-lg-start`

`.align-self-lg-stretch`, `.align-self-md-auto`, `.align-self-md-baseline`, `.align-self-md-center`, `.align-self-md-end`, `.align-self-md-start`, `.align-self-md-stretch`, `.align-self-sm-auto`

`.align-self-sm-baseline`, `.align-self-sm-center`, `.align-self-sm-end`, `.align-self-sm-start`, `.align-self-sm-stretch`, `.align-self-start`, `.align-self-stretch`, `.align-text-bottom`

`.align-text-top`, `.align-top`, `.d-block`, `.d-flex`, `.d-grid`, `.d-inline`, `.d-inline-block`, `.d-inline-flex`

`.d-none`, `.flex`, `.flex--between`, `.flex-align-center`, `.flex-align-end`, `.flex-align-start`, `.flex-between`, `.flex-center`

`.flex-center--md`, `.flex-center--wrapped`, `.flex-column`, `.flex-column-reverse`, `.flex-content`, `.flex-content-wrap`, `.flex-end`, `.flex-fill`

`.flex-grow`, `.flex-grow-0`, `.flex-grow-1`, `.flex-helper-between`, `.flex-helper-even`, `.flex-lg-column`, `.flex-lg-column-reverse`, `.flex-lg-fill`

`.flex-lg-grow-0`, `.flex-lg-grow-1`, `.flex-lg-row`, `.flex-lg-row-reverse`, `.flex-lg-shrink-0`, `.flex-lg-shrink-1`, `.flex-md-column`, `.flex-md-column-reverse`

`.flex-md-fill`, `.flex-md-grow-0`, `.flex-md-grow-1`, `.flex-md-row`, `.flex-md-row-reverse`, `.flex-md-shrink-0`, `.flex-md-shrink-1`, `.flex-no-wrap`

`.flex-overide`, `.flex-row`, `.flex-row-reverse`, `.flex-shrink-0`, `.flex-shrink-1`, `.flex-sm-column`, `.flex-sm-column-reverse`, `.flex-sm-fill`

`.flex-sm-grow-0`, `.flex-sm-grow-1`, `.flex-sm-row`, `.flex-sm-row-reverse`, `.flex-sm-shrink-0`, `.flex-sm-shrink-1`, `.flex-start`, `.flex-start--md`

`.flex-wrap`, `.flex-wrap-lg-nowrap`, `.flex-wrap-lg-wrap`, `.flex-wrap-lg-wrap-reverse`, `.flex-wrap-md-nowrap`, `.flex-wrap-md-wrap`, `.flex-wrap-md-wrap-reverse`, `.flex-wrap-nowrap`

`.flex-wrap-sm-nowrap`, `.flex-wrap-sm-wrap`, `.flex-wrap-sm-wrap-reverse`, `.flex-wrap-wrap`, `.flex-wrap-wrap-reverse`, `.flex-wrapping--wrap`, `.justify-content-around`, `.justify-content-between`

`.justify-content-center`, `.justify-content-end`, `.justify-content-evenly`, `.justify-content-lg-around`, `.justify-content-lg-between`, `.justify-content-lg-center`, `.justify-content-lg-end`, `.justify-content-lg-evenly`

`.justify-content-lg-start`, `.justify-content-md-around`, `.justify-content-md-between`, `.justify-content-md-center`, `.justify-content-md-end`, `.justify-content-md-evenly`, `.justify-content-md-start`, `.justify-content-sm-around`

`.justify-content-sm-between`, `.justify-content-sm-center`, `.justify-content-sm-end`, `.justify-content-sm-evenly`, `.justify-content-sm-start`, `.justify-content-start`

### Typography utilities (43)

High/medium: check v2 type roles before reuse.

`.body--lg`, `.body--md`, `.body--offwhite`, `.body--sm`, `.body--xl`, `.body--xs`, `.caption-top`, `.font-monospace`

`.font-primary`, `.font-secondary`, `.h1`, `.h2`, `.h3`, `.h4`, `.h5`, `.h6`

`.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`, `.heading-5`, `.heading-6`, `.lead`, `.small`

`.text-black-50`, `.text-capitalize`, `.text-center`, `.text-center--md`, `.text-danger`, `.text-dark`, `.text-info`, `.text-left`

`.text-light`, `.text-lowercase`, `.text-muted`, `.text-primary`, `.text-right`, `.text-secondary`, `.text-success`, `.text-uppercase`

`.text-warning`, `.text-white`, `.text-white-50`

### Width/choke utilities (35)

High: utility/helper layer.

`.choke-100`, `.choke-1000`, `.choke-1100`, `.choke-1200`, `.choke-1300`, `.choke-200`, `.choke-300`, `.choke-400`

`.choke-500`, `.choke-600`, `.choke-700`, `.choke-800`, `.choke-900`, `.h-0`, `.h-100`, `.h-25`

`.h-50`, `.h-75`, `.h-auto`, `.h-full`, `.mh-100`, `.min-vw-100`, `.mw-100`, `.text-choke--640`

`.text-choke--960`, `.text-choke-md--640`, `.text-choke-md--960`, `.vw-100`, `.w-0`, `.w-100`, `.w-25`, `.w-50`

`.w-75`, `.w-auto`, `.w-full`

### Colour/surface utilities (60)

Medium: check token compatibility.

`.bg-blob`, `.bg-blob--cyan`, `.bg-blob--mobile`, `.bg-blob--red`, `.bg-blob--yellow`, `.bg-body`, `.bg-cap`, `.bg-cap--b-concave-white`

`.bg-cap--b-convex-white`, `.bg-cap--t-concave-white`, `.bg-cap--t-convex-neutral-300`, `.bg-cap--t-convex-white`, `.bg-colour--black`, `.bg-colour--grey`, `.bg-colour--lewisham`, `.bg-colour--neutral--100`

`.bg-colour--neutral--300`, `.bg-colour--primary`, `.bg-colour--primary-dark`, `.bg-colour--primary-light`, `.bg-colour--primary-mid`, `.bg-colour--primary-surface`, `.bg-colour--secondary`, `.bg-colour--secondary--surface`

`.bg-colour--secondary-dark`, `.bg-colour--secondary-light`, `.bg-colour--secondary-mid`, `.bg-colour--suffolk`, `.bg-colour--tertiary`, `.bg-colour--tertiary--surface`, `.bg-colour--tertiary-dark`, `.bg-colour--tertiary-light`

`.bg-colour--tertiary-mid`, `.bg-colour--westminster`, `.bg-colour--white`, `.bg-colour--yellow-surface`, `.bg-danger`, `.bg-dark`, `.bg-gradient`, `.bg-info`

`.bg-light`, `.bg-mask`, `.bg-mask--b-convex`, `.bg-mask--t-convex`, `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-transparent`

`.bg-warning`, `.bg-white`, `.border-danger`, `.border-dark`, `.border-info`, `.border-light`, `.border-primary`, `.border-secondary`

`.border-success`, `.border-warning`, `.border-white`, `.primary`

### Visibility utilities (15)

High: utility/helper layer.

`.d-lg-none`, `.d-md-none`, `.d-sm-none`, `.hidden-form`, `.hidden-md`, `.hiddenForm`, `.hide`, `.invisible`

`.show`, `.sr-only`, `.visible`, `.visible-desktop`, `.visible-mobile`, `.visually-hidden`, `.visually-hidden-focusable`

### Media/image utilities (14)

Medium/high: inspect ratio/fit assumptions.

`.img-fluid`, `.img-hero--mobile`, `.img-hero-council--mobile`, `.img-responsive`, `.img-thumbnail`, `.ratio`, `.ratio-16x9`, `.ratio-1x1`

`.ratio-21x9`, `.ratio-4x3`, `.video-card`, `.video-iframe-container-16-9`, `.video-iframe-container-4-3`, `.video-iframe-container-square`

### Bootstrap JS components (27)

Medium/low: JS/markup coupling likely.

`.carousel`, `.carousel-caption`, `.carousel-control-next`, `.carousel-control-next-icon`, `.carousel-control-prev`, `.carousel-control-prev-icon`, `.carousel-dark`, `.carousel-fade`

`.carousel-indicators`, `.carousel-inner`, `.carousel-item`, `.carousel-item-end`, `.carousel-item-next`, `.carousel-item-prev`, `.carousel-item-start`, `.dropdown`

`.dropdown-menu`, `.dropdown-option`, `.dropdown-toggle`, `.dropdown-toggle-split`, `.popover`, `.popover-arrow`, `.popover-body`, `.popover-header`

`.tooltip`, `.tooltip-arrow`, `.tooltip-inner`

### Platform/product components (33)

Medium/low: product-coupled, inspect before reuse.

`.admin-banner`, `.admin-banner-wrapper`, `.admin-banner__btn`, `.admin-banner__text`, `.bank-description`, `.cookie`, `.cookie-banner`, `.cookie-information`

`.cookie-setting__item--checkmark`, `.cookie-setting__item--label`, `.cookie-settings`, `.cookie-settings--confirmation`, `.cookie-settings__item`, `.cookie__actions`, `.cookie__content`, `.file-attachment-list`

`.file-attachment-list__label`, `.file-attachment-loader`, `.file-attachment-svg`, `.file-drop-area`, `.file-drop-area--add-top`, `.file-drop-area--left`, `.file-drop-area--ml-0`, `.file-drop-area__btn`

`.file-drop-area__btn-container`, `.file-drop-area__btn-text`, `.file-drop-area__hint`, `.file-input`, `.file-msg`, `.user-nav`, `.user-select-all`, `.user-select-auto`

`.user-select-none`

### Current/experimental v2 or page-specific (42)

Low: page/prototype-specific.

`.brand-blockquote`, `.brand-danger`, `.brand-dropdown`, `.brand-dropdown--companies`, `.brand-dropdown--councils`, `.brand-dropdown-menu`, `.brand-dropdown-menu-toggle`, `.brand-dropdown-menu__item`

`.brand-figure`, `.brand-grey`, `.brand-image`, `.brand-image-container`, `.brand-link--accent`, `.brand-margin-spacer`, `.brand-margin-spacer--192`, `.brand-margin-spacer--256`

`.brand-margin-spacer--96`, `.brand-media-box`, `.brand-media-box--reverse`, `.brand-media-box__img`, `.brand-navbar`, `.brand-navbar--account-partial`, `.brand-navbar-header`, `.brand-navbar-nav`

`.brand-navbar-nav__parent-item`, `.brand-navbar-nav__parent-item-link`, `.brand-navbar__auth-btn-wrapper`, `.brand-navbar__hamburger-label`, `.brand-navbar__hamburger-toggle`, `.brand-navbar__login-btn`, `.brand-navbar__login-btn-disabled`, `.brand-navbar__login-btn-primary`

`.brand-navbar__login-btn-secondary`, `.brand-period`, `.brand-period--yellow`, `.brand-primary`, `.brand-secondary`, `.brand-table`, `.brand-table__head`, `.brand-table__summary-column`

`.hero-header__icon`, `.hero-header__illustration`

### Other component families (1020)

Manual review.

`.PitchCard-banner--resale`, `.appropriateness-test__title`, `.arrow-icon--left`, `.arrow-icon--right`, `.body-no-scroll--desktop`, `.checkmark--rounded`, `.display--sm`, `.display--sm-only`

`.display-block--important`, `.display-block--md`, `.display-block--md-only`, `.display-none--important`, `.dob-input--four-char`, `.dob-input--two-char`, `.entity-investor__title`, `.faq-item__title`

`.footer-copyright__icon`, `.footer-copyright__left`, `.footer-copyright__right`, `.forum-header--messages`, `.forum-new-wrapper--isa`, `.forum-topic-footer__inner`, `.forum-topic-msg__body`, `.forum-topic-msg__header`

`.forum-topic-stats--inverted`, `.forum-topic__item`, `.forum-topics__item`, `.framework-accordion__content`, `.framework-accordion__item`, `.framework-accordion__title`, `.framework-accordion__toggle`, `.framework-horizontal-timeline__dit`

`.framework-horizontal-timeline__item`, `.framework-skeleton__list-item`, `.framework-skeleton__text`, `.home-hero__illustration`, `.inline-counter__bg`, `.instant-bank-transfer-page__iframe-container`, `.investor-card__title`, `.investor-type__title`

`.is-dropdown__menu`, `.is-dropdown__submenu`, `.is-radio--test`, `.isa-breadcrumbs__list`, `.item-row--left`, `.iti__selected-country`, `.link--arrowed`, `.link--arrowed--left`

`.loading-spinner--full`, `.loading-spinner--inner`, `.loading-spinner--large`, `.loading-spinner--replacement`, `.loading-spinner--white`, `.loading-spinner__full-container`, `.loading-spinner__full-container--show`, `.make-investment-page__error-container`

`.make-investment-page__error-message-text`, `.make-investment-page__page-content`, `.make-investment-page__page-content-container`, `.make-investment-page__radio-btn-container`, `.new-isa-transfer__form`, `.pitch-card__attributes--council`, `.pitch-card__body`, `.pitch-card__button`

`.pitch-card__flex-between`, `.pitch-card__footer--council`, `.pitch-card__ruler--council`, `.pitch-card__text`, `.pitch-card__thumbnail`, `.pitch-card__title`, `.pitch-page-accordion-files__link`, `.pitch-page-accordion-header__btn`

`.pitch-page-accordion-header__date`, `.pitch-page-accordion-header__interior`, `.pitch-page-accordion-header__text`, `.pitch-page-accordion__item`, `.pitch-page-board-chunk__btn`, `.pitch-page-board-chunk__link`, `.pitch-page-board-chunk__subtext`, `.pitch-page-board-chunk__text`

`.pitch-page-board-chunk__text--l`, `.pitch-page-board-chunk__text--xl`, `.pitch-page-board-chunk__title`, `.pitch-page-content--investment-details`, `.pitch-page-hero--company`, `.pitch-page-hero--council`, `.pitch-page-hero-back-link__text`, `.pitch-page-hero-content__info`

`.pitch-page-hero-content__title`, `.pitch-page-hero-cta__register`, `.pitch-page-hero-details__circle`, `.pitch-page-hero-details__circle--company`, `.pitch-page-hero-details__circle--council`, `.pitch-page-hero-details__value`, `.pitch-page-hero-img__wrapper--md`, `.pitch-page-hero-img__wrapper--md-only`

`.pitch-page-hero-summary__value`, `.pitch-page-hero-summary__value-label`, `.pitch-page-hero-summary__value-text`, `.pitch-page-highlight-box__data`, `.pitch-page-highlight-box__data-container`, `.pitch-page-highlight-box__data-label`, `.pitch-page-highlight-box__flex-row`, `.pitch-page-highlight-box__note`

`.pitch-page-tabcontent__investment-details`, `.pitch-page-tabcontent__main-paragraph`, `.pitch-page-tabcontent__panel`, `.pitch-page-tabcontent__title`, `.pitch-page-tabcontent__title--document`, `.pitch-page-table__row--alt`, `.pitch-page-tablist--vertical`, `.pitch-page-tablist__btn`

`.pitch-page-tabpanel__dropdown-panel`, `.pitch-page-tabpanel__mobile-filter`, `.pitch-panel--council`, `.placeholder-text--10`, `.placeholder-text--15`, `.placeholder-text--25`, `.placeholder-text--5`, `.policy-main--alpha`

`.powered-by-mangopay__link`, `.readiness-antiMoney__title`, `.readiness-card__svg`, `.risk-mini-bond-popup__backdrop`, `.risk-mini-bond-popup__close-button`, `.risk-mini-bond-popup__close-button--icon`, `.risk-mini-bond-popup__close-button--wrapper`, `.risk-mini-bond-popup__content`

`.risk-warning--again`, `.risk-warning--footer`, `.risk-warning-dsk--header`, `.risk-warning-dsk__container`, `.risk-warning-dsk__link`, `.risk-warning-dsk__text`, `.risk-warning-dsk__text--supplementary`, `.risk-warning-modal__wrapper`

`.row--flex`, `.row--flex-f`, `.shine-animation--primary-surface`, `.si-accordion-item__body`, `.si-accordion-item__header-btn`, `.si-accordion-item__header-icon-container`, `.si-accordion-item__header-interior`, `.si-accordion-item__header-summary`

`.si-accordion-item__header-text-container`, `.si-accordion-item__heading`, `.si-accordion-item__icon`, `.si-alert--error`, `.si-alert--info`, `.si-alert--no-frame`, `.si-alert--success`, `.si-alert--warning`

`.si-alert__copy`, `.si-alert__title`, `.si-auth-account-dropdown__checkmark`, `.si-auth-account-dropdown__menu`, `.si-auth-account-dropdown__menu-link`, `.si-auth-account-dropdown__menu-link-black`, `.si-auth-account-dropdown__menu-link-logoff`, `.si-auth-account-dropdown__name`

`.si-auth-account-dropdown__status`, `.si-auth-account-menu__checkmark`, `.si-auth-account-menu__interior`, `.si-auth-account-menu__link`, `.si-auth-account-menu__link--logoff`, `.si-auth-account-menu__note`, `.si-auth-account-menu__status`, `.si-auth-account-menu__submenu`

`.si-auth-account-menu__user-name`, `.si-auth-app-test__question`, `.si-auth-app-test__question-note`, `.si-auth-app-test__question-number`, `.si-auth-app-test__title`, `.si-auth-breadcrumbs__checkmark`, `.si-auth-breadcrumbs__connect-line`, `.si-auth-breadcrumbs__list`

`.si-auth-breadcrumbs__list-connect`, `.si-auth-breadcrumbs__list-item`, `.si-auth-breadcrumbs__list-item--middle`, `.si-auth-breadcrumbs__list-item--middle-xl`, `.si-auth-breadcrumbs__signs`, `.si-auth-breadcrumbs__text`, `.si-auth-button--invert`, `.si-auth-button--push-right`

`.si-auth-button--standard`, `.si-auth-button--with-icon`, `.si-auth-button-container--flex-end`, `.si-auth-button-container--stack-mobile`, `.si-auth-card--ir`, `.si-auth-card--onboarding`, `.si-auth-card--quiz-mode`, `.si-auth-card__headline`

`.si-auth-card__link-container`, `.si-auth-checkbox__container`, `.si-auth-checkbox__group`, `.si-auth-checkbox__label`, `.si-auth-checkbox__note`, `.si-auth-file-drop--full`, `.si-auth-file-drop__button`, `.si-auth-file-drop__button--with-text`

`.si-auth-file-drop__button-container`, `.si-auth-file-drop__button-label`, `.si-auth-footer__copyright`, `.si-auth-footer__copyright-icon`, `.si-auth-footer__copyright-text`, `.si-auth-footer__risk`, `.si-auth-form--ir`, `.si-auth-form-group--lg`

`.si-auth-form-group--sm`, `.si-auth-form-label--minor`, `.si-auth-form-label--with-placeholder`, `.si-auth-icon--accepted`, `.si-auth-icon--back-arrow`, `.si-auth-icon--button-arrow`, `.si-auth-icon--check-mark`, `.si-auth-icon--denied`

`.si-auth-icon--information-icon`, `.si-auth-icon--information-icon-lg`, `.si-auth-icon--validation`, `.si-auth-icon__header-icon`, `.si-auth-icon__header-icon--success`, `.si-auth-identity-doc__heading`, `.si-auth-identity-doc__heading--invalid`, `.si-auth-identity-doc__heading--valid`

`.si-auth-identity-doc__icon`, `.si-auth-identity-doc__image-container`, `.si-auth-identity-doc__image-container--invalid`, `.si-auth-identity-doc__image-container--valid`, `.si-auth-identity-doc__image-item`, `.si-auth-identity-doc__upload`, `.si-auth-input--password`, `.si-auth-input--valid-input`

`.si-auth-input__group`, `.si-auth-input__note`, `.si-auth-input__valid-input-icon`, `.si-auth-invest__alert`, `.si-auth-invest__label`, `.si-auth-invest__legend`, `.si-auth-ir-step3__manual-address`, `.si-auth-note__heading`

`.si-auth-password-validation__checkbox`, `.si-auth-password-validation__checkbox-text`, `.si-auth-password-validation__error-message`, `.si-auth-progress-bar--completed`, `.si-auth-progress-bar--investor`, `.si-auth-progress-bar__label`, `.si-auth-progress-bar__overall`, `.si-auth-progress-bar__progress`

`.si-auth-radio--no-margin`, `.si-auth-ruler--bottom-only`, `.si-auth-ruler--test`, `.si-auth-ruler--top-only`, `.si-auth-spacer--sm`, `.si-auth-tab__headline`, `.si-auth-tab__label`, `.si-auth-text--emphasised`

`.si-auth-text--faded`, `.si-auth-text--invalid`, `.si-auth-text--minor`, `.si-auth-text--no-margin`, `.si-auth-text--valid`, `.si-auth-warning__text`, `.si-auth__link`, `.si-badge--Failed`

`.si-badge--Pending`, `.si-badge--Refunded`, `.si-badge--Succeeded`, `.si-badge--TransferCreated`, `.si-badge--TransferFailed`, `.si-badge--WaitingForFunds`, `.si-badge--circle`, `.si-badge--circle-bordered`

`.si-badge--circle-xs`, `.si-badge--failure`, `.si-badge--paid`, `.si-badge--pending`, `.si-badge--refunded`, `.si-badge--success`, `.si-badge__exterior`, `.si-badge__exterior--bordered`

`.si-badge__exterior--bordered-default`, `.si-badge__exterior--bordered-failure`, `.si-badge__exterior--bordered-late`, `.si-badge__exterior--bordered-paid`, `.si-badge__exterior--bordered-pending`, `.si-badge__exterior--general-portfolio`, `.si-badge__exterior--ifisa-portfolio`, `.si-badge__font`

`.si-badge__font--Failed`, `.si-badge__font--Pending`, `.si-badge__font--Refunded`, `.si-badge__font--Succeeded`, `.si-badge__font--TransferCreated`, `.si-badge__font--TransferFailed`, `.si-badge__font--WaitingForFunds`, `.si-badge__font--failure`

`.si-badge__font--paid`, `.si-badge__font--pending`, `.si-badge__font--success`, `.si-breadcrumbs__exterior`, `.si-btn-group--space-between`, `.si-btn-group--stretch`, `.si-btn-link--no-padding`, `.si-btn-primary--bordered`

`.si-btn-primary--floating`, `.si-btn-secondary--bordered`, `.si-btn-secondary--floating`, `.si-btn-with-icon--before`, `.si-choice-form-group__input`, `.si-choice-form-group__label`, `.si-choice-form-group__labels-container`, `.si-content--comfy`

`.si-content--compact`, `.si-content--horizontal`, `.si-content--horizontal-full`, `.si-content--no-gap`, `.si-content--space-between-vertical`, `.si-data-chunk--2xl`, `.si-data-chunk--align-right`, `.si-data-chunk--lg`

`.si-data-chunk--md`, `.si-data-chunk--sm`, `.si-data-chunk--value-first`, `.si-data-chunk-list--stacked`, `.si-data-chunk-list--with-border`, `.si-ellipsis-loader--brand`, `.si-ellipsis-loader__anim`, `.si-ellipsis-loader__text`

`.si-embedded-caption--lg`, `.si-embedded-caption--sm`, `.si-empty-state__text`, `.si-fieldset__input-container`, `.si-fieldset__input-container--horizontal`, `.si-fieldset__input-container--vertical`, `.si-fieldset__legend`, `.si-fieldset__legend--lg`

`.si-fieldset__legend-container`, `.si-form-control--isa`, `.si-form-control__textarea`, `.si-form-group--last`, `.si-form-hint--xs`, `.si-form-input__group`, `.si-form-row--dob`, `.si-form-row--full-width`

`.si-form-row--half`, `.si-form-row--post-code`, `.si-form-row--with-button`, `.si-form-row__btn-container`, `.si-horizontal-rule--2xs`, `.si-horizontal-rule--invert`, `.si-horizontal-rule--lg`, `.si-horizontal-rule--md`

`.si-horizontal-rule--sm`, `.si-horizontal-rule--thick`, `.si-horizontal-rule--xs`, `.si-icon--2xl`, `.si-icon--3xl`, `.si-icon--4xl`, `.si-icon--5xl`, `.si-icon--account-close-btn-primary`

`.si-icon--account-open-btn-primary`, `.si-icon--approve`, `.si-icon--arrow-left-accent`, `.si-icon--arrow-right-accent`, `.si-icon--bank`, `.si-icon--bin`, `.si-icon--book-reading`, `.si-icon--checkmark`

`.si-icon--chevron-left`, `.si-icon--chevron-right`, `.si-icon--clipboard`, `.si-icon--coin-pink`, `.si-icon--cta`, `.si-icon--decline`, `.si-icon--down-arrow--grey`, `.si-icon--down-chevron-dark-grey`

`.si-icon--download-btn-primary`, `.si-icon--download-btn-secondary`, `.si-icon--download-file-accent`, `.si-icon--ellipsis`, `.si-icon--error`, `.si-icon--factory-yellow`, `.si-icon--feed`, `.si-icon--growth-chart`

`.si-icon--info`, `.si-icon--info-red`, `.si-icon--information`, `.si-icon--investing-and-banking`, `.si-icon--left-arrow--dark-grey`, `.si-icon--left-arrow--pink`, `.si-icon--lg`, `.si-icon--lightbulb-cyan`

`.si-icon--lightbulb-pink`, `.si-icon--location`, `.si-icon--lock-pink`, `.si-icon--md`, `.si-icon--menu-close-btn-primary`, `.si-icon--menu-open-btn-primary`, `.si-icon--navigation-stepper-active`, `.si-icon--navigation-stepper-complete`

`.si-icon--navigation-stepper-failed`, `.si-icon--navigation-stepper-pending`, `.si-icon--open-banking-login`, `.si-icon--open-banking-mobile`, `.si-icon--open-banking-pointer`, `.si-icon--password-requirement-error`, `.si-icon--password-requirement-pending`, `.si-icon--password-requirement-success`

`.si-icon--phone`, `.si-icon--play-red`, `.si-icon--return`, `.si-icon--right-arrow`, `.si-icon--right-arrow--green`, `.si-icon--right-arrow--grey`, `.si-icon--right-arrow--orange`, `.si-icon--right-arrow--pink`

`.si-icon--sm`, `.si-icon--speech-bubble-accent`, `.si-icon--statement`, `.si-icon--success`, `.si-icon--up-arrow--grey`, `.si-icon--warning`, `.si-icon--x-close`, `.si-icon--xl`

`.si-icon--xs`, `.si-icon-link--md`, `.si-icon-md--2xl`, `.si-icon-md--3xl`, `.si-icon-md--4xl`, `.si-icon-md--5xl`, `.si-icon-md--lg`, `.si-icon-md--md`

`.si-icon-md--sm`, `.si-icon-md--xl`, `.si-icon-md--xs`, `.si-icon-mobile--2xl`, `.si-icon-mobile--3xl`, `.si-icon-mobile--4xl`, `.si-icon-mobile--5xl`, `.si-icon-mobile--lg`

`.si-icon-mobile--md`, `.si-icon-mobile--sm`, `.si-icon-mobile--xl`, `.si-icon-mobile--xs`, `.si-image--1-1`, `.si-image--1-2`, `.si-image--16-9`, `.si-image--2-1`

`.si-image--3-1`, `.si-image--3-2`, `.si-image--3-4`, `.si-image--4-3`, `.si-image--border-radius-lg`, `.si-image--border-radius-mobile-lg`, `.si-image--border-radius-mobile-xl`, `.si-image--border-radius-xl`

`.si-image--contain`, `.si-image--contain-fixed-height`, `.si-image--hero`, `.si-image--mobile-1-1`, `.si-image--mobile-1-2`, `.si-image--mobile-16-9`, `.si-image--mobile-2-1`, `.si-image--mobile-3-1`

`.si-image--mobile-3-2`, `.si-image--mobile-3-4`, `.si-image--mobile-4-3`, `.si-image--mobile-hero`, `.si-impact-feed__balance`, `.si-impact-feed__btn`, `.si-impact-feed__button-container`, `.si-impact-feed__button-containera`

`.si-impact-feed__card`, `.si-impact-feed__card--margin`, `.si-impact-feed__card--primary`, `.si-impact-feed__card--secondary`, `.si-impact-feed__card--user-details`, `.si-impact-feed__card-balance`, `.si-impact-feed__card-balance--main`, `.si-impact-feed__card-description`

`.si-impact-feed__card-notice`, `.si-impact-feed__card-notice--impact`, `.si-impact-feed__card-notice--investment`, `.si-impact-feed__card-notice--news`, `.si-impact-feed__card-notice--welcome`, `.si-impact-feed__card-notice-background-icon`, `.si-impact-feed__card-notice-body`, `.si-impact-feed__card-notice-content`

`.si-impact-feed__card-notice-fore-text`, `.si-impact-feed__card-notice-icon`, `.si-impact-feed__card-notice-subtitle`, `.si-impact-feed__card-notice-subtitle--portfolio`, `.si-impact-feed__card-notice-thumb`, `.si-impact-feed__card-notice-thumb-container`, `.si-impact-feed__card-notice-title`, `.si-impact-feed__card-notice-welcome-header`

`.si-impact-feed__card-notice-welcome-header-logo`, `.si-impact-feed__card-notice-welcome-title`, `.si-impact-feed__event-post`, `.si-impact-feed__flex-wrap`, `.si-impact-feed__label`, `.si-impact-feed__link`, `.si-impact-feed__link-icon`, `.si-impact-feed__link-text`

`.si-impact-feed__main`, `.si-impact-feed__nav`, `.si-impact-feed__nav-icon`, `.si-impact-feed__nav-item`, `.si-impact-feed__nav-label`, `.si-impact-feed__news-post`, `.si-impact-feed__news-post-content`, `.si-impact-feed__news-post-date`

`.si-impact-feed__news-post-wrapper`, `.si-impact-feed__page`, `.si-impact-feed__post-author`, `.si-impact-feed__post-author-group`, `.si-impact-feed__post-author-hide-mobile`, `.si-impact-feed__post-author-name`, `.si-impact-feed__post-date`, `.si-impact-feed__post-header-group`

`.si-impact-feed__post-logo`, `.si-impact-feed__post-risk-foot`, `.si-impact-feed__post-thumbnail`, `.si-impact-feed__post-thumbnail--impact-post`, `.si-impact-feed__post-thumbnail-interior`, `.si-impact-feed__ruler`, `.si-impact-feed__share-link`, `.si-impact-feed__share-link-icon`

`.si-impact-feed__share-link-icon--close`, `.si-impact-feed__share-link-label`, `.si-impact-feed__title`, `.si-impact-feed__title--small`, `.si-impact-feed__verified-icon`, `.si-impact-feed__wrapper`, `.si-input--bank-account-number`, `.si-input--has-prefix`

`.si-input--invest-amount`, `.si-input--national-insurance`, `.si-input--phone-number`, `.si-input--sort-code`, `.si-input--swift-code`, `.si-input--uk-postcode`, `.si-input-button--hide-password`, `.si-input-button--show-password`

`.si-input-label--lg`, `.si-input__validation`, `.si-invest-card-item--left`, `.si-invest-input-currency-group__input`, `.si-invest-input-currency-group__input-group`, `.si-invest-input-currency-group__text`, `.si-invest-summary-box__item`, `.si-invest-summary-box__item-label`

`.si-invest-summary-box__item-value`, `.si-invest-values__exterior`, `.si-invest__date`, `.si-invest__form-group-wrapper`, `.si-invest__heading`, `.si-invest__heading--lg`, `.si-invest__heading--margin-xl`, `.si-invest__heading--minor`

`.si-invest__heading--sm`, `.si-invest__heading--split`, `.si-invest__heading--xs`, `.si-invest__heading-placeholder`, `.si-invest__hint`, `.si-invest__hint--primary`, `.si-invest__radio`, `.si-invest__step`

`.si-invest__step-header`, `.si-invest__step-header-title`, `.si-link--accent`, `.si-link--invert`, `.si-link--navigation`, `.si-link--no-decoration`, `.si-list--with-steps`, `.si-mega-menu--not-verified`

`.si-mega-menu__backdrop`, `.si-mega-menu__card`, `.si-mega-menu__checkmark`, `.si-mega-menu__checkmark--not-verified`, `.si-mega-menu__content`, `.si-mega-menu__dropdown-btn`, `.si-mega-menu__exterior`, `.si-mega-menu__investor-name`

`.si-mega-menu__item`, `.si-mega-menu__item--border`, `.si-mega-menu__item--small-margin`, `.si-mega-menu__item-text`, `.si-mega-menu__link`, `.si-mega-menu__link--green`, `.si-mega-menu__link--orange`, `.si-mega-menu__link--padding-mobile`

`.si-mega-menu__link--portfolio`, `.si-mega-menu__main-link`, `.si-mega-menu__mobile-dropdown-link`, `.si-mega-menu__overview`, `.si-mega-menu__portfolio-amount`, `.si-mega-menu__reverse-mobile`, `.si-mega-menu__scroll-container`, `.si-mega-menu__status`

`.si-mega-menu__status-wrapper`, `.si-mega-menu__submenu`, `.si-mega-menu__submenu--dark`, `.si-mega-menu__submenu--overview`, `.si-mega-menu__submenu--portfolio`, `.si-mega-menu__submenu-background-item`, `.si-mega-menu__submenu-heading`, `.si-mega-menu__submenu-portfolio-amount`

`.si-mega-menu__submenu-portfolio-amount-wrapper`, `.si-mega-menu__submenu-portfolio-caption`, `.si-mega-menu__submenu-portfolio-link`, `.si-navigation-list--horizontal`, `.si-navigation-list--lg`, `.si-navigation-list--md`, `.si-navigation-list--nav-collapse`, `.si-navigation-list--vertical`

`.si-navigation-step--active`, `.si-navigation-step__icon`, `.si-note--login`, `.si-page-accordion--classification`, `.si-page-btn-wrapper--column`, `.si-page-btn-wrapper--mobile-column`, `.si-page-btn-wrapper--offer-doc`, `.si-page-card--invest`

`.si-page-card--offer-doc`, `.si-page-card--transfer`, `.si-page-card-interior__content`, `.si-page-card-interior__heading-3`, `.si-page-card-interior__heading-4`, `.si-page-card-interior__icon`, `.si-page-card-interior__icon--add-money-green`, `.si-page-card-interior__icon--add-money-orange`

`.si-page-card-interior__icon--address`, `.si-page-card-interior__icon--id-status`, `.si-page-card-interior__icon--isa`, `.si-page-card-interior__icon--linked-bank-account`, `.si-page-card-interior__icon--maintenance`, `.si-page-card-interior__icon--marketing-pref`, `.si-page-card-interior__icon--password`, `.si-page-card-interior__icon--pending-payin-green`

`.si-page-card-interior__icon--pending-payin-orange`, `.si-page-card-interior__icon--repayments-destination`, `.si-page-card-interior__icon--standing-order-green`, `.si-page-card-interior__icon--standing-order-orange`, `.si-page-card-interior__icon--submitted-investment`, `.si-page-card-interior__icon--transfer-money-green`, `.si-page-card-interior__icon--transfer-money-orange`, `.si-page-card-interior__icon--withdraw-money-green`

`.si-page-card-interior__icon--withdraw-money-orange`, `.si-page-card-interior__title`, `.si-page-data--highlighted`, `.si-page-data__chunk`, `.si-page-data__container`, `.si-page-data__label`, `.si-page-dropdown__menu`, `.si-page-dropdown__menu-btn`

`.si-page-dropdown__toggle`, `.si-page-header__section`, `.si-page-header__title`, `.si-page-heading--2xl`, `.si-page-heading--hint-lg`, `.si-page-heading--hint-md`, `.si-page-heading--lg`, `.si-page-heading--md`

`.si-page-heading--sm`, `.si-page-heading--xl`, `.si-page-highlight-box--isa`, `.si-page-highlight-box--isa-messages`, `.si-page-highlight-box--pendingpayin`, `.si-page-highlight-box__button-container`, `.si-page-highlight-box__data`, `.si-page-highlight-box__data--green`

`.si-page-highlight-box__data--orange`, `.si-page-highlight-box__data-container`, `.si-page-highlight-box__data-label`, `.si-page-information__box`, `.si-page-information__title`, `.si-page-list--no-marker`, `.si-page-list__exterior`, `.si-page-modal--isa`

`.si-page-pitch-investment__amount`, `.si-page-pitch-investment__chunk`, `.si-page-pitch-investment__content`, `.si-page-pitch-investment__divider`, `.si-page-pitch-investment__heading`, `.si-page-pitch-investment__hint`, `.si-page-pitch-investment__label`, `.si-page-pitch-investment__pitch-bg`

`.si-page-pitch-investment__wrapper`, `.si-page-radio__container`, `.si-page-radio__container--investment-details`, `.si-page-radio__content`, `.si-page-radio__description`, `.si-page-radio__error-message`, `.si-page-section--invest`, `.si-page-section--lg`

`.si-page-step__container`, `.si-page-step__item`, `.si-page-step__number`, `.si-page-table--kyc`, `.si-page-table--portfolio`, `.si-page-table--resale`, `.si-page-table--sm-only-compact`, `.si-page-table--statement`

`.si-page-table--top-border`, `.si-page-table__tbody--returns`, `.si-page-table__tbody-td`, `.si-page-table__tbody-td--align-right`, `.si-page-table__tbody-td--income-amount`, `.si-page-table__tbody-td--income-description`, `.si-page-table__tbody-td--income-issue`, `.si-page-table__tbody-td--income-status`

`.si-page-table__tbody-td--kyc-doc-path`, `.si-page-table__tbody-td--resale`, `.si-page-table__tbody-td--resale-capital`, `.si-page-table__tbody-td--resale-cta`, `.si-page-table__tbody-td--resale-investment`, `.si-page-table__tbody-td--resale-investment-date`, `.si-page-table__tbody-td--resale-investment-name`, `.si-page-table__tbody-td--resale-investment-type`

`.si-page-table__tbody-td--resale-purchase`, `.si-page-table__tbody-td--resale-selling`, `.si-page-table__tbody-td--returns`, `.si-page-table__tbody-td--returns-capital`, `.si-page-table__tbody-td--returns-date`, `.si-page-table__tbody-td--returns-income`, `.si-page-table__tbody-td--returns-investment`, `.si-page-table__tbody-td--returns-status`

`.si-page-table__tbody-td--returns-total`, `.si-page-table__tbody-td--statement`, `.si-page-table__tbody-td--statement-action-link`, `.si-page-table__tbody-td--statement-balance`, `.si-page-table__tbody-td--statement-date`, `.si-page-table__tbody-td--statement-description`, `.si-page-table__tbody-td--statement-description-action`, `.si-page-table__tbody-td--statement-description-detail`

`.si-page-table__tbody-td--statement-value`, `.si-page-table__tbody-th--income-amount`, `.si-page-table__tbody-tr`, `.si-page-table__tbody-tr--current-end`, `.si-page-table__tbody-tr--current-start`, `.si-page-table__tbody-tr--resale`, `.si-page-table__tbody-tr--returns`, `.si-page-table__thead`

`.si-page-table__thead--resale`, `.si-page-table__thead-th`, `.si-page-table__thead-th--align-right`, `.si-page-table__thead-th--income-amount`, `.si-page-table__thead-th--income-status`, `.si-page-table__thead-th--kyc`, `.si-page-table__thead-th--resale`, `.si-page-table__thead-th--resale-capital`

`.si-page-table__thead-th--resale-purchase`, `.si-page-table__thead-th--resale-selling`, `.si-page-table__thead-th--returns`, `.si-page-table__thead-th--statement`, `.si-page-table__thead-tr`, `.si-page-table__thead-tr--resale`, `.si-page-validation__error`, `.si-page__body`

`.si-page__body--compact`, `.si-page__body--default`, `.si-page__body--portfolio`, `.si-page__body--restricted-nav`, `.si-page__body-text`, `.si-page__dashboard-heading`, `.si-page__heading`, `.si-page__heading--sm`

`.si-page__input-group`, `.si-page__input-group--hide-border`, `.si-page__input-group--withdraw-input`, `.si-page__interior`, `.si-page__interior--compact`, `.si-page__interior--extra-extra-large`, `.si-page__interior--extra-large`, `.si-page__interior--large`

`.si-page__minor-heading`, `.si-page__panel`, `.si-page__panel--0`, `.si-page__panel--2xs`, `.si-page__panel--compact`, `.si-page__panel--full-height`, `.si-page__panel--lg`, `.si-page__panel--md`

`.si-page__panel--no-border-radius`, `.si-page__panel--sm`, `.si-page__panel--xs`, `.si-page__subheading`, `.si-page__top`, `.si-page__top--messages`, `.si-page__top--portfolio`, `.si-page__top--restricted-nav`

`.si-page__withdraw-amount-preview`, `.si-page__withdraw-amount-preview-data`, `.si-portfolio-account__col`, `.si-portfolio-document-link__inner`, `.si-portfolio-hero__account`, `.si-portfolio-hero__balance`, `.si-portfolio-hero__balance--xs`, `.si-portfolio-hero__balance-heading`

`.si-portfolio-hero__balance-heading--sm`, `.si-portfolio-hero__balance-heading--xl`, `.si-portfolio-hero__balance-heading--xxs`, `.si-portfolio-hero__balance-hint`, `.si-portfolio-hero__balance-hint--neutral-700`, `.si-portfolio-hero__balance-hint--sm`, `.si-portfolio-hero__balance-hint--xxs`, `.si-portfolio-hero__cta`

`.si-portfolio-hero__cta-btn`, `.si-portfolio-hero__cta-btn--resale`, `.si-portfolio-hero__cta-link`, `.si-portfolio-hero__cta-link--ifisa`, `.si-portfolio-hero__cta-link--main`, `.si-portfolio-hero__cta-links`, `.si-portfolio-hero__heading`, `.si-portfolio-hero__hr`

`.si-portfolio-hero__icon`, `.si-portfolio-hero__icon--ifisa`, `.si-portfolio-hero__icon--main`, `.si-portfolio-hero__icon--secondary-market`, `.si-portfolio-hero__icon-wrapper`, `.si-portfolio-hero__main-hero`, `.si-portfolio-hero__side-hero`, `.si-portfolio-hero__wrapper`

`.si-portfolio-investments-tab-menu--portfolio`, `.si-portfolio-investments-tab-menu--resale`, `.si-portfolio-investments-tab-menu__btn`, `.si-portfolio-investments-tab-menu__btn--dropdown`, `.si-portfolio-investments-tab-menu__dropdown-menu`, `.si-portfolio-link--accent`, `.si-portfolio-link--disabled`, `.si-portfolio-link--funds`

`.si-portfolio-link--green`, `.si-portfolio-link--inverted`, `.si-portfolio-link--lg`, `.si-portfolio-link--orange`, `.si-portfolio-listing--with-button`, `.si-portfolio-listing__card`, `.si-portfolio-listing__chunk`, `.si-portfolio-listing__chunk--btn-desktop`

`.si-portfolio-listing__chunk--current-holding`, `.si-portfolio-listing__chunk--w-15`, `.si-portfolio-listing__chunk--w-20`, `.si-portfolio-listing__chunk--w-25`, `.si-portfolio-listing__chunk--w-30`, `.si-portfolio-listing__chunk--w-33`, `.si-portfolio-listing__chunk-label`, `.si-portfolio-listing__chunk-offer-type`

`.si-portfolio-listing__chunk-value`, `.si-portfolio-listing__chunk-wrapper`, `.si-portfolio-listing__investment`, `.si-portfolio-listing__investment-date`, `.si-portfolio-listing__investment-name`, `.si-portfolio-listing__investment-name--no-underline`, `.si-portfolio-listing__investment-type`, `.si-portfolio-listing__thumbnail`

`.si-portfolio-return-accordion-header__btn`, `.si-portfolio-return-accordion-header__date`, `.si-portfolio-return-accordion-header__interior`, `.si-portfolio-return-accordion-header__text`, `.si-portfolio-return-accordion-item--overview`, `.si-portfolio-return-accordion-item__header`, `.si-portfolio-return-accordion-item__header-group`, `.si-portfolio-return-accordion-item__payments`

`.si-portfolio-return-accordion-item__year`, `.si-portfolio-return-wallet-dropdown__btn`, `.si-portfolio-return-wallet-dropdown__btn--general`, `.si-portfolio-return-wallet-dropdown__btn--ifisa`, `.si-portfolio-return-wallet-dropdown__btn--toggle`, `.si-portfolio-submenu--isa-transfers-counter`, `.si-portfolio-submenu__list-item`, `.si-portfolio-submenu__list-item--active`

`.si-portfolio-table-tr--failure`, `.si-portfolio-table-tr--hide-mobile`, `.si-portfolio__col--highlighted`, `.si-portfolio__col-actions`, `.si-portfolio__col-cash`, `.si-portfolio__heading`, `.si-portfolio__heading--bold`, `.si-portfolio__investments-header`

`.si-portfolio__label-text`, `.si-portfolio__label-text--medium`, `.si-portfolio__wrapper`, `.si-resale-buy__card`, `.si-resale-buy__listing-radio`, `.si-resale-buy__listing-radio-input`, `.si-resale-buy__step`, `.si-resale-listing-summary__wrapper`

`.si-resale-listing__card`, `.si-resale-listing__card-exterior`, `.si-resale-summary-card__blurb`, `.si-resale-summary-card__image-container`, `.si-resale-summary-card__text--highlighted`, `.si-resale-summary-card__text-container`, `.si-resale-summary-card__title`, `.si-resale__account-card`

`.si-resale__account-select`, `.si-resale__account-wrapper`, `.si-resale__actions--wrapper`, `.si-resale__available-investments`, `.si-resale__available-investments-options`, `.si-resale__card`, `.si-resale__card-content`, `.si-resale__card-footnote`

`.si-resale__card-title`, `.si-resale__confirm-delete`, `.si-resale__empty-list`, `.si-resale__empty-state`, `.si-resale__form-group-wrapper`, `.si-resale__heading`, `.si-resale__hint`, `.si-resale__info-wrapper`

`.si-resale__listing-toggle`, `.si-resale__message--success`, `.si-resale__message--warning`, `.si-resale__pending-table`, `.si-resale__pitch`, `.si-resale__pitch--confirm`, `.si-resale__pitch-banner`, `.si-resale__pitch-banner-wrapper`

`.si-resale__pitch-image`, `.si-resale__select`, `.si-resale__select--amount`, `.si-resale__select--investment`, `.si-resale__table--action`, `.si-resale__table--actions`, `.si-resale__table--name`, `.si-resale__table--price`

`.si-resale__table--qty`, `.si-resale__table-header`, `.si-resale__table-row`, `.si-resale__tabs`, `.si-resale__unit-input`, `.si-standing-order__box`, `.si-standing-order__icon`, `.si-standing-order__icon-bg`

`.si-standing-order__item`, `.si-standing-order__step`, `.si-statement-page-section__description`, `.si-statement-page-section__header`, `.si-tab-content--timeline`, `.si-tablist--dark`, `.si-transaction-statement-dropdown-menu__btn`, `.si-transaction-statement-dropdown__panel`

`.si-transaction-statement-new__download-exterior`, `.si-transaction-statement__btn-dropdown`, `.si-transaction-statement__btn-input`, `.si-transaction-statement__datepicker`, `.si-transaction-statement__heading`, `.si-transaction-statement__heading-balance`, `.si-transaction-statement__isa-sub`, `.si-transaction-statement__row--filter`

`.si-transaction-statement__table`, `.si-transaction-statement__table-container`, `.si-transaction-statement__table-td--description-action`, `.si-transaction-statement__table-td--description-detail`, `.si-transaction-statement__table-td--value`, `.si-transaction-statement__table-tr--CapitalRepayment`, `.si-transaction-statement__table-tr--Deposit`, `.si-transaction-statement__table-tr--InterestPayment`

`.si-transaction-statement__table-tr--money-in`, `.si-transaction-statement__table-tr--pending`, `.si-transaction-statement__type-select-group`, `.si-transaction-statement__type-select-wrapper`, `.si-transfer-money__direction`, `.si-transfer-money__divider`, `.si-transfer-money__form`, `.si-transfer-money__group`

`.si-transfer-money__group-item`, `.si-transfer-money__header`, `.si-transfer-money__input`, `.si-transfer-money__input-result`, `.si-transfer-money__label`, `.si-transfer-money__row`, `.si-transfer-money__title`, `.si-withdraw-group--lg`

`.si-withdraw__warning-modal`, `.signup-links__title`, `.standard-card--lg`, `.standard-card--md`, `.standard-card__title`, `.standard-card__title--hr`, `.styled-checkbox--rounded`, `.styled-checkbox--sm`

`.styled-select__option`, `.styled-select__option-group`, `.styled-select__option-group--isa`, `.styled-select__option-group--main`, `.styled-select__option-group--show`, `.styled-select__wrapper`, `.submit-isa-request__address-box`, `.submit-isa-request__submit-button`

`.success-message__close`, `.svg-inline--fa`, `.timeline-horizontal-step--completed`, `.timeline-horizontal-step__item`, `.timeline-horizontal__date`, `.timeline-horizontal__details`, `.timeline-horizontal__heading`, `.timeline-marker--grey`

`.timeline-marker--incompleted`, `.toggleEl--block`, `.toggleEl--none`, `.type-md--12`, `.type-md--14`, `.type-md--16`, `.type-md--18`, `.type-md--20`

`.type-md--24`, `.type-md--28`, `.type-md--32`, `.type-md--40`, `.update-badge--accent`, `.vertical-stepper__content-collapsible`, `.vertical-stepper__content-selected`, `.vertical-stepper__header`

`.vertical-stepper__step-container`, `.vertical-stepper__step-expand`, `.vertical-stepper__step-number`, `.vertical-stepper__step-title`

## Potential v2 Reuse Map

### A. Strong candidates to reuse

Spacing, layout/grid, display/flex, visibility, width/choke, media/image, breadcrumbs, basic lists, icon helpers, SI cards and SI tables where their markup and token values fit v2.

### B. Reuse with caution

Abundance v1 design-system components, buttons, typography utilities, forms, alerts, modals, accordions, tabs/navigation, colour/surface helpers and Bootstrap JS components. These may save design/build work, but should be checked against v2 tokens, markup expectations and behaviour.

### C. Do not treat as reusable system by default

Platform/product components, current/page-specific classes and unclassified selectors. Some may still be useful references, but they likely encode account, dashboard, homepage or campaign-specific behaviour.

### D. Likely missing or worth validating before adding v2 classes

Before creating new v2 component classes, validate whether existing `.abundance-*`, `.si-card*`, `.si-table*`, `.btn*`, spacing, layout, type, width/choke and surface helpers already cover the intended design. The clearest gap remains v2-specific component contracts where new structure exists in SCSS but is absent from UAT CSS, for example `.si-card__inner` from the newer card partial.

## Notes

- This is a selector-level inventory from compiled CSS. It confirms class availability, not whether every class is currently used in templates.
- Minified CSS can obscure source ownership; categories are heuristic and should be used as a triage map for design reuse.
- `.abundance-*` is now explicitly classified as first-party custom v1 design-system work, which makes it a useful comparison layer for v2 rationalisation.
