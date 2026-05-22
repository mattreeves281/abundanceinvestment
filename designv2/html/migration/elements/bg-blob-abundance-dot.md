# .bg-blob--abundance-dot

## Corrected HTML Fragment

```html
<span class="bg-blob bg-blob--abundance-dot bg-colour--primary abundance-step-num">1</span>
```

## Corrected CSS

Source: `designv2/scss handover/_new-helpers.scss`

```scss
.bg-blob--abundance-dot{
  background-image:none;
  -webkit-mask-image:var(--abv2-dot-mask); /* Sass: $abv2-dot-mask */
  mask-image:var(--abv2-dot-mask); /* Sass: $abv2-dot-mask */
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
  -webkit-mask-position:center;
  mask-position:center;
  -webkit-mask-size:contain;
  mask-size:contain;
}
```

## SASS Variable Reference

- `$abv2-dot-mask`
