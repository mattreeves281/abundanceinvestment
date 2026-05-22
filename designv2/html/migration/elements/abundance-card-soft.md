# .abundance-card-soft

## Corrected HTML Fragment

```html
<article class="si-card abundance-card-soft p-all-spacer-md">...</article>
```

## Corrected CSS

```css
.abundance-card-soft.si-card,
.abundance-card-soft {
  background: var(--abv2-white);
  border: 0;
  border-radius: 28px;
  box-shadow: 0 18px 38px var(--abv2-shadow-card);
}

@media (max-width: 759px) {
  .abundance-card-soft.si-card,
  .abundance-card-soft {
    border-radius: 24px;
  }
}
```

## SASS Variable Reference

Source of truth: `designv2/config/v3/card v2.scss`

- `$abundance-card-soft-bg-color`
- `$abundance-card-soft-border`
- `$abundance-card-soft-border-radius`
- `$abundance-card-soft-border-radius-mobile`
- `$abundance-card-soft-shadow`
