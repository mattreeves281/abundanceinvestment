# .abundance-council-uof-bars

## Corrected HTML Fragment

```html
<div class="abundance-council-uof-bars">
  <div class="abundance-council-uof-row">
    <span class="abundance-council-uof-label abundance-body-compact">Category</span>
    <span class="abundance-council-uof-track"><span class="abundance-council-uof-fill abundance-council-uof-fill--pink abundance-action-text" style="width:60%">60%</span></span>
  </div>
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-council-uof-bars{
  display:grid;
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
}

.abundance-council-uof-row{
  display:grid;
  grid-template-columns:minmax(180px, .34fr) minmax(0, 1fr);
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  align-items:center;
}

.abundance-council-uof-label{
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

.abundance-council-uof-track{
  position:relative;
  min-height:50px;
  border-radius:999px;
  background:var(--abv2-grey-light); /* Sass: $abundance-neutral-300 */
  overflow:hidden;
}

.abundance-council-uof-fill{
  position:absolute;
  inset:0 auto 0 0;
  display:flex;
  align-items:center;
  min-width:142px;
  padding-inline:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  border-radius:999px;
  color:var(--abv2-blue); /* Sass: $abundance-blue */
  white-space:nowrap;
}

.abundance-council-uof-fill--pink{
  background:var(--abv2-pink-light); /* Sass: $abundance-pink-light */
}

.abundance-council-uof-fill--teal{
  background:var(--abv2-teal-light); /* Sass: $abundance-cyan-light */
}

.abundance-council-uof-fill--yellow{
  background:var(--abv2-yellow-light); /* Sass: $abundance-yellow-light */
}

.abundance-council-uof-bars--compact .abundance-council-uof-track{
  min-height:38px;
}

.abundance-council-uof-bars--compact .abundance-council-uof-fill{
  min-width:min(118px, 100%);
  padding-inline:var(--abv2-space-14, 14px); /* Sass: $abv2-space-14 */
}

@media (max-width:759px){

  .abundance-council-uof-row{
    grid-template-columns:1fr;
    gap:var(--abv2-space-8, 8px); /* Sass: $spacer-3xs */
  }

  .abundance-council-uof-track{
    min-height:42px;
  }

  .abundance-council-uof-fill{
    min-width:110px;
  }

  .abundance-council-uof-bars--compact .abundance-council-uof-track{
    min-height:36px;
  }

  .abundance-council-uof-bars--compact .abundance-council-uof-fill{
    min-width:min(100px, 100%);
  }
}
```

## SASS Variable Reference

- `$spacer-2xs`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$abundance-neutral-300`
- `$abundance-blue`
- `$abundance-pink-light`
- `$abundance-cyan-light`
- `$abundance-yellow-light`
- `$abv2-space-14`
- `$spacer-3xs`
