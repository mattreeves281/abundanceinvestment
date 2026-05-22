# .abundance-step-num

## Corrected HTML Fragment

```html
<span class="bg-blob bg-blob--abundance-dot bg-colour--primary abundance-step-num abundance-step-num--lg">1</span>
```

## Corrected CSS

Source: `designv2/scss handover/_new-helpers.scss`

```scss
.abundance-step-num{
  display:grid;
  place-items:center;
  width:56px;
  height:56px;
  color:var(--abv2-white); /* Sass: $pure-white */
  font-family:var(--abv2-serif); /* Sass: $si-font-secondary */
  font-size:1.75rem;
  font-weight:600;
  line-height:1;
}

.abundance-step-num svg{
  display:block;
  width:55%;
  height:55%;
  fill:currentColor;
}

.abundance-step-num.type-black{
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
}

@media (max-width:991px){
  .abundance-step-num{
    width:54px;
    height:54px;
    font-size:1.6rem;
  }
}

@media (max-width:767px){
  .abundance-step-num{
    width:48px;
    height:48px;
    font-size:1.45rem;
  }
}

@media (max-width:420px){
  .abundance-step-num{
    width:42px;
    height:42px;
    font-size:1.3rem;
  }
}

.abundance-step-num--lg{
  width:84px;
  height:84px;
  font-size:2.35rem;
}

@media (max-width:767px){
  .abundance-step-num--lg{
    width:72px;
    height:72px;
    font-size:2rem;
  }
}
```

## SASS Variable Reference

- `$pure-white`
- `$si-font-secondary`
- `$abundance-neutral-900`
- `$si-color-text-primary`
