# .abundance-inline-disclaimer

## Corrected HTML Fragment

```html
<div class="abundance-inline-disclaimer abundance-body-compact">
  <strong class="abundance-action-text">Important:</strong> disclaimer copy.
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-inline-disclaimer{
  padding:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  border-left:4px solid var(--abv2-pink); /* Sass: $abundance-pink */
  border-radius:0 14px 14px 0;
  background:var(--abv2-grey-very-light); /* Sass: $abundance-neutral-200 */
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

.abundance-inline-disclaimer strong{
  display:inline;
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
}
```

## SASS Variable Reference

- `$spacer-2xs`
- `$abundance-pink`
- `$abundance-neutral-200`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$abundance-neutral-900`
- `$si-color-text-primary`
