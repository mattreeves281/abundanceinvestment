# .abundance-warning-list

## Corrected HTML Fragment

```html
<div class="abundance-warning-list">
  <div class="abundance-warning-list__item abundance-warning-list__item--soft">
    <span class="bg-blob bg-blob--abundance-dot bg-colour--yellow abundance-card-blob-num abundance-action-text text-white">1</span>
    <p class="abundance-body-compact m-b-spacer-0">Warning copy.</p>
  </div>
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-warning-list{
  display:grid;
  gap:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
}

.abundance-warning-list__item{
  display:grid;
  grid-template-columns:44px minmax(0, 1fr);
  gap:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  align-items:start;
  min-height:0;
}

@media (max-width:767px){
  .abundance-warning-list__item{
    grid-template-columns:40px minmax(0, 1fr);
    gap:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
  }

  .abundance-warning-list__item .abundance-card-blob-num{
    width:40px;
    height:40px;
  }
}

.abundance-warning-list__item--soft{
  background:var(--abv2-grey-very-light); /* Sass: $abundance-neutral-200 */
}
```

## SASS Variable Reference

- `$abv2-space-12`
- `$spacer-2xs`
- `$abundance-neutral-200`
