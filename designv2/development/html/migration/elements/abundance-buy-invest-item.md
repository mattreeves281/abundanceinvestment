# .abundance-buy-invest-item

## Corrected HTML Fragment

```html
<div class="abundance-buy-invest-list">
  <div class="abundance-buy-invest-item">
    <div class="abundance-buy-invest-item__main">Investment name</div>
    <div class="abundance-buy-invest-item__amount">£100</div>
  </div>
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-buy-final.scss`

```scss
.abundance-buy-invest-list{
  display:grid;
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
}

.abundance-buy-invest-item{
  display:grid;
  grid-template-columns:minmax(0, 1fr) 220px;
  gap:var(--abv2-space-24, 24px); /* Sass: $spacer-xs */
  align-items:center;
  min-height:0;
  height:auto;
  padding:var(--abv2-space-24, 24px); /* Sass: $spacer-xs */
  border:1.5px solid var(--abv2-border-subtle); /* Sass: $abv2-border-subtle */
  border-radius:22px;
  background:var(--abv2-white); /* Sass: $pure-white */
}

.abundance-buy-invest-item__main{
  min-width:0;
}

.abundance-buy-invest-item__amount{
  min-width:0;
}

.abundance-buy-invest-item__amount-grid{
  display:grid;
  grid-template-columns:auto minmax(0, 1fr);
  gap:var(--abv2-space-8, 8px); /* Sass: $spacer-3xs */
  align-items:center;
}

@media (max-width:767px){
  .abundance-buy-invest-item{
    grid-template-columns:1fr;
    gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
    padding:var(--abv2-space-20, 20px); /* Sass: $abv2-space-20 */
    border-radius:18px;
  }
}
```

## SASS Variable Reference

- `$spacer-2xs`
- `$spacer-xs`
- `$abv2-border-subtle`
- `$pure-white`
- `$spacer-3xs`
- `$abv2-space-20`
