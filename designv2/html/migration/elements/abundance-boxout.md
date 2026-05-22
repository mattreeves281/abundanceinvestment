# .abundance-boxout

## Corrected HTML Fragment

```html
<section class="abundance-boxout abundance-boxout--teal" aria-labelledby="boxout-title">...</section>
```

## Corrected CSS

Source: `designv2/scss handover/_new-buy-final.scss`

```scss
.abundance-boxout{
  padding:var(--abv2-space-24); /* Sass: $spacer-xs */
  border:1.5px solid var(--abv2-border-subtle); /* Sass: $abv2-border-subtle */
  border-radius:22px;
  background:var(--abv2-white); /* Sass: $pure-white */
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
}

.abundance-boxout--teal{
  border-color:var(--abv2-teal-a22); /* Sass: $abv2-teal-a22 */
  background:var(--abv2-teal-very-light); /* Sass: $abundance-cyan-surface */
}

.abundance-boxout--yellow{
  border-color:var(--abv2-yellow-a24); /* Sass: $abv2-yellow-a24 */
  background:var(--abv2-yellow-light); /* Sass: $abundance-yellow-light */
}

.abundance-boxout--compact{
  padding:var(--abv2-space-20); /* Sass: $abv2-space-20 */
  border-radius:18px;
}

@media (max-width:759px){
  .abundance-boxout{
    padding:var(--abv2-space-20); /* Sass: $abv2-space-20 */
    border-radius:18px;
  }

  .abundance-boxout--compact{
    padding:var(--abv2-space-16); /* Sass: $spacer-2xs */
    border-radius:16px;
  }
}
```

## SASS Variable Reference

- `$spacer-xs`
- `$abv2-border-subtle`
- `$pure-white`
- `$abundance-neutral-900`
- `$si-color-text-primary`
- `$abv2-teal-a22`
- `$abundance-cyan-surface`
- `$abv2-yellow-a24`
- `$abundance-yellow-light`
- `$abv2-space-20`
- `$spacer-2xs`
