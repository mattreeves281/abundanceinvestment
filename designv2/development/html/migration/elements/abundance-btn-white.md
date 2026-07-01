# .abundance-btn-white

## Corrected HTML Fragment

```html
<a href="#" class="si-btn abundance-btn-white si-btn--lg">Learn more</a>
```

## Corrected CSS

```css
.abundance-btn-white {
  color: var(--abv2-white);
  background-color: transparent;
  border-color: var(--abv2-white);
}

.abundance-btn-white:hover,
.abundance-btn-white:focus-visible {
  color: var(--abv2-white);
  background-color: var(--abv2-white-a14);
  border-color: var(--abv2-white);
  text-decoration: none;
}

.abundance-btn-white:focus-visible {
  outline: 2px solid var(--abv2-white-a72);
  outline-offset: 3px;
}

.abundance-btn-white:active,
.abundance-btn-white.active {
  color: var(--abv2-white);
  background-color: var(--abv2-white-a20);
  border-color: var(--abv2-white);
}
```

## SASS Variable Reference

Source of truth: `designv2/config/v3/buttons v2.scss`

- `$abundance-btn-white-color`
- `$abundance-btn-white-background-color`
- `$abundance-btn-white-border-color`
- `$abundance-btn-white-background-color-hover`
- `$abundance-btn-white-background-color-active`
- `$abundance-btn-white-focus-outline`
- `$abundance-btn-white-focus-outline-offset`
