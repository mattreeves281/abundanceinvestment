# UAT Revised v1 CSS Additions Report


| Problem | Solution |
|---|---|
| Boxout-style cards need softer teal and yellow surfaces, but the current colour-card set only provides stronger colour fills. | Add soft colour-card variants for pale teal and pale yellow. |
| Existing `.abundance-blob` covers the small `44px` card/blob use case, but not the larger step-number use cases. | Add medium and large size modifiers to `.abundance-blob`. |
| Solid yellow background is needed for mask/background use cases. UAT has yellow surface helpers, but not the plain solid yellow helper required here. | Add `.bg-colour--yellow` with the canonical solid yellow value. |
| Chip/pill navigation links are required for editorial/in-page navigation. | Add chip link styling as agreed. |

## Suggested CSS

### Soft Colour Card Variants

```css
.abundance-card--color-teal-very-light {
  border: none;
  border-radius: 14px;
  color: #363635;
  background: #cdebf0;
}

.abundance-card--color-yellow-light {
  border: none;
  border-radius: 14px;
  color: #363635;
  background: #ffeecd;
}
```

These are literal values from the revised design package config.

### Blob Size Modifiers

I'm not surprised these slipped through, as I only showed the single use case for these on the component playgound page. But if we can provide for a size modifier on the blob that will solve this easily.

```css
.abundance-blob--md {
  width: 3.5rem;
  height: 3.5rem;
  min-width: 3.5rem;
  min-height: 3.5rem;
  font-size: 1.75rem;
}

.abundance-blob--lg {
  width: 5.25rem;
  height: 5.25rem;
  min-width: 5.25rem;
  min-height: 5.25rem;
  font-size: 2.35rem;
}

@media (max-width: 767px) {
  .abundance-blob--md {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    font-size: 1.45rem;
  }

  .abundance-blob--lg {
    width: 4.5rem;
    height: 4.5rem;
    min-width: 4.5rem;
    min-height: 4.5rem;
    font-size: 2rem;
  }
}
```

### Solid Yellow Background Helper

```css
.bg-colour--yellow {
  background-color: #ffb72c;
}
```

### Chip Link

```css
.abundance-chip-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 12px 16px;
  border: 1.5px solid rgba(54, 54, 53, 0.16);
  border-radius: 999px;
  background: #fff;
  color: #4d4a46;
  text-decoration: none;
  transition: border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease;
}

.abundance-chip-link:hover,
.abundance-chip-link:focus-visible {
  border-color: rgba(0, 164, 182, 0.38);
  background: rgba(0, 164, 182, 0.06);
  color: #363635;
  text-decoration: none;
}

.abundance-chip-link:focus-visible {
  outline: 2px solid #00a4b6;
  outline-offset: 3px;
}
```

## Deliberately Out Of Scope

These items do not need UAT CSS additions from this report:

- Buy / investment list: covered inside the React app.
- White button and white field variants: not required; existing accessible UAT options will be used instead.
- Yellow text helper: not required because yellow text fails accessibility.
- Footer peak mask: already covered by `.footer-mask`.
