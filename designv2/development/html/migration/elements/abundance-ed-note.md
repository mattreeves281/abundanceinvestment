# .abundance-ed-note

## Corrected HTML Fragment

```html
<div class="abundance-ed-note abundance-body-compact">
  <strong class="abundance-action-text">Note:</strong> body copy.
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-ed-note{
  padding:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  border-radius:18px;
  background:var(--abv2-grey-very-light); /* Sass: $abundance-neutral-200 */
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

.abundance-ed-note strong{
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
}
```

## SASS Variable Reference

- `$spacer-2xs`
- `$abundance-neutral-200`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$abundance-neutral-900`
- `$si-color-text-primary`
