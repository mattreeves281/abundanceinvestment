# .abundance-council-quote

## Corrected HTML Fragment

```html
<section class="abundance-council-quote position-relative p-y-spacer-md bg-colour--white">...</section>
```

## Corrected CSS

Source: `designv2/scss handover/_new-dirty-overrides.scss`

```scss
.abundance-council-quote blockquote.brand-blockquote > p.body--lg{
  font-family:var(--abv2-sans); /* Sass: $si-font-primary */
  font-size:1.5rem;
  font-weight:400;
  line-height:1.5;
  letter-spacing:normal;
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
  margin-bottom:0;
}

@media (max-width:767px){
  .abundance-council-quote blockquote.brand-blockquote > p.body--lg{
    font-size:1.25rem;
    line-height:1.5;
  }
}
```

## SASS Variable Reference

- `$si-font-primary`
- `$abundance-neutral-800`
- `$si-color-text-secondary`

## Notes

The matching selector is in dirty overrides rather than the four target partials.
