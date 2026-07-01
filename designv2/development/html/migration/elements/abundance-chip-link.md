# .abundance-chip-link

## Corrected HTML Fragment

```html
<a class="abundance-chip-link abundance-action-text" href="#section">Section</a>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-chip-link{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:40px;
  padding:var(--abv2-space-12, 12px) var(--abv2-space-16, 16px); /* Sass: $abv2-space-12; $spacer-2xs */
  border:1.5px solid var(--abv2-border-soft); /* Sass: $abv2-border-soft */
  border-radius:999px;
  background:var(--abv2-white); /* Sass: $pure-white */
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
  text-decoration:none;
  transition:
    border-color .18s ease,
    background-color .18s ease,
    color .18s ease;
}

.abundance-chip-link:hover,
.abundance-chip-link:focus-visible{
  border-color:var(--abv2-teal-a38); /* Sass: $abv2-teal-a38 */
  background:var(--abv2-teal-a06); /* Sass: $abv2-teal-a06 */
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
  text-decoration:none;
}

.abundance-chip-link:focus-visible{
  outline:2px solid var(--abv2-teal); /* Sass: $abundance-cyan */
  outline-offset:3px;
}
```

## SASS Variable Reference

- `$abv2-space-12`
- `$spacer-2xs`
- `$abv2-border-soft`
- `$pure-white`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$abv2-teal-a38`
- `$abv2-teal-a06`
- `$abundance-neutral-900`
- `$si-color-text-primary`
- `$abundance-cyan`
