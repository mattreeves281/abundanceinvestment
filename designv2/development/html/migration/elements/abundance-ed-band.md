# .abundance-ed-band

## Corrected HTML Fragment

```html
<div class="abundance-ed-band brand-primary abundance-ed-band--tight bg-mask--abundance-ed-rise" aria-hidden="true"></div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-helpers.scss`

```scss
.abundance-ed-band{
  padding-top:9.6%;
  min-height:70px;
  margin:var(--abv2-space-20, 20px) 0 var(--abv2-space-24, 24px); /* Sass: $abv2-space-20; $spacer-xs */
  background:currentColor;

  -webkit-mask-size:100% 100%;
  mask-size:100% 100%;
  -webkit-mask-position:0 0;
  mask-position:0 0;
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
}

.abundance-ed-band--tight{
  margin-top:var(--abv2-space-8, 8px); /* Sass: $spacer-3xs */
  margin-bottom:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
}

.abundance-ed-band--loose{
  margin-top:var(--abv2-space-32, 32px); /* Sass: $spacer-sm */
  margin-bottom:var(--abv2-space-32, 32px); /* Sass: $spacer-sm */
}

/* Rise shape */
.bg-mask--abundance-ed-rise{
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 588L0 700L1980 252L6000 532L6000 420L1980 140Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 588L0 700L1980 252L6000 532L6000 420L1980 140Z'/%3E%3C/svg%3E");
}

/* Right-weighted shape */
.bg-mask--abundance-ed-right{
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 546L0 658L3960 210L6000 336L6000 224L3960 98Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 546L0 658L3960 210L6000 336L6000 224L3960 98Z'/%3E%3C/svg%3E");
}

/* Fall shape */
.bg-mask--abundance-ed-fall{
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 210L0 322L1980 574L6000 294L6000 182L1980 462Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 210L0 322L1980 574L6000 294L6000 182L1980 462Z'/%3E%3C/svg%3E");
}

@media (max-width:759px){
  .abundance-ed-band{
    padding-top:14%;
    margin-top:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
    margin-bottom:var(--abv2-space-20, 20px); /* Sass: $abv2-space-20 */
  }
}
```

## SASS Variable Reference

- `$abv2-space-20`
- `$spacer-xs`
- `$spacer-3xs`
- `$abv2-space-12`
- `$spacer-sm`
- `$spacer-2xs`
