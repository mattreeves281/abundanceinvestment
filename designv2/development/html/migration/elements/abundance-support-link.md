# .abundance-support-link

## Corrected HTML Fragment

```html
<a class="abundance-support-link abundance-action-text" href="#">Support link</a>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-support-link{
  appearance:none;
  display:inline-flex;
  align-items:center;
  width:auto;
  min-height:0;
  margin:0;
  padding:0 0 var(--abv2-space-8, 8px); /* Sass: $spacer-3xs */
  border:0;
  border-bottom:1px solid var(--abv2-ink-a18); /* Sass: $abv2-ink-a18 */
  background:none;
  border-radius:0;
  cursor:pointer;
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
  text-align:left;
  text-decoration:none;
  transition:color .2s ease, border-color .2s ease;
}

.abundance-support-link:hover,
.abundance-support-link:focus-visible{
  color:var(--abv2-pink); /* Sass: $abundance-pink */
  border-color:var(--abv2-pink); /* Sass: $abundance-pink */
  text-decoration:none;
  outline:none;
}

.abundance-support-link:focus-visible{
  outline:2px solid var(--abv2-pink); /* Sass: $abundance-pink */
  outline-offset:4px;
  border-radius:4px;
}

@media (max-width:759px){
  .abundance-support-link{
    padding-bottom:var(--abv2-space-6, 6px); /* Sass: $abv2-space-6 */
  }
}
```

## SASS Variable Reference

- `$spacer-3xs`
- `$abv2-ink-a18`
- `$abundance-neutral-900`
- `$si-color-text-primary`
- `$abundance-pink`
- `$abv2-space-6`
