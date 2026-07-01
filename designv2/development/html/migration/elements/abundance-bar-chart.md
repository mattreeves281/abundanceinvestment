# .abundance-bar-chart

## Corrected HTML Fragment

```html
<div class="abundance-bar-chart">
  <div class="abundance-bar-chart__row">
    <span class="abundance-bar-chart__label abundance-body-compact">Label</span>
    <span class="abundance-bar-chart__track"><span class="abundance-bar-chart__fill abundance-action-text" style="--abv2-bar-value:70%">70%</span></span>
  </div>
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-bar-chart{
  display:grid;
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
}

.abundance-bar-chart__row{
  display:grid;
  grid-template-columns:minmax(180px, .34fr) minmax(0, 1fr);
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  align-items:center;
}

.abundance-bar-chart__label{
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

.abundance-bar-chart__track{
  position:relative;
  min-height:50px;
  border-radius:999px;
  background:var(--abv2-grey-light); /* Sass: $abundance-neutral-300 */
  overflow:hidden;
}

.abundance-bar-chart__fill{
  position:absolute;
  inset:0 auto 0 0;
  width:var(--abv2-bar-value, 0%); /* Sass: component local custom property; set in HTML */
  display:flex;
  align-items:center;
  min-width:142px;
  padding-inline:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  border-radius:999px;
  background:var(--abv2-bar-colour, var(--abv2-pink-light)); /* Sass: component local custom property; fallback $abundance-pink-light; $abundance-pink-light */
  color:var(--abv2-bar-text, var(--abv2-blue)); /* Sass: component local custom property; fallback $abundance-blue; $abundance-blue */
  white-space:nowrap;
}

.abundance-bar-chart--compact .abundance-bar-chart__track{
  min-height:38px;
}

.abundance-bar-chart--compact .abundance-bar-chart__fill{
  min-width:min(118px, 100%);
  padding-inline:var(--abv2-space-14, 14px); /* Sass: $abv2-space-14 */
}

@media (max-width:759px){
  .abundance-bar-chart__row{
    grid-template-columns:1fr;
    gap:var(--abv2-space-8, 8px); /* Sass: $spacer-3xs */
  }

  .abundance-bar-chart__track{
    min-height:42px;
  }

  .abundance-bar-chart__fill{
    min-width:110px;
  }

  .abundance-bar-chart--compact .abundance-bar-chart__track{
    min-height:36px;
  }

  .abundance-bar-chart--compact .abundance-bar-chart__fill{
    min-width:min(100px, 100%);
  }
}
```

## SASS Variable Reference

- `$spacer-2xs`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$abundance-neutral-300`
- `$abundance-pink-light`
- `$abundance-blue`
- `$abv2-space-14`
- `$spacer-3xs`
