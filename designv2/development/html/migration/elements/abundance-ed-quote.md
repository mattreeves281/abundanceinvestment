# .abundance-ed-quote

## Corrected HTML Fragment

```html
<blockquote class="abundance-ed-quote">
  <p>Quote text goes here.</p>
  <cite>Attribution</cite>
</blockquote>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-ed-quote{
  margin:0;
  padding-left:var(--abv2-space-24, 24px); /* Sass: $spacer-xs */
  border-left:4px solid var(--abv2-pink); /* Sass: $abundance-pink */
}

/* Serif quote treatment */
.abundance-ed-quote > p{
  font-family:var(--abv2-serif); /* Sass: $si-font-secondary */
  font-weight:600;
  font-size:1.75rem;
  line-height:1.12;
  letter-spacing:-0.025em;
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
}

.abundance-ed-quote cite{
  display:block;
  margin-top:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
  font-family:var(--abv2-sans); /* Sass: $si-font-primary */
  font-style:normal;
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

@media (max-width:767px){
  .abundance-ed-quote{
    padding-left:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
  }

  .abundance-ed-quote > p{
    font-size:1.5rem;
    line-height:1.14;
  }
}
```

## SASS Variable Reference

- `$spacer-xs`
- `$abundance-pink`
- `$si-font-secondary`
- `$abundance-neutral-900`
- `$si-color-text-primary`
- `$abv2-space-12`
- `$si-font-primary`
- `$abundance-neutral-800`
- `$si-color-text-secondary`
- `$spacer-2xs`
