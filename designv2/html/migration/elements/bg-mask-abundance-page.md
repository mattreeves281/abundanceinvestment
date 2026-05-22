# .bg-mask--abundance-top / bottom / footer-peak

## Corrected HTML Fragment

```html
<div class="bg-mask bg-mask--abundance-top bg-colour--yellow"></div>
<div class="bg-mask bg-mask--abundance-bottom bg-colour--yellow"></div>
<div class="bg-mask--abundance-footer-peak"></div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-helpers.scss`

```scss
.bg-mask--abundance-top,
.bg-mask--abundance-bottom{
  padding-top:11.5%;
  -webkit-mask-size:100% 100%;
  mask-size:100% 100%;
  -webkit-mask-position:0 0;
  mask-position:0 0;
}

.bg-mask--abundance-top{
  margin-bottom:-0.0625rem;
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 360L1850 684L6000 24V700H0V360Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 360L1850 684L6000 24V700H0V360Z'/%3E%3C/svg%3E");
}

.bg-mask--abundance-bottom{
  margin-top:-0.0625rem;
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 0H6000V340L4200 16L0 684V0Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 0H6000V340L4200 16L0 684V0Z'/%3E%3C/svg%3E");
}

/* ----------------------------------------
   ABV2 mask helper: footer/top inverted peak
   Same peak point as .bg-mask--abundance-top, inverted for footer entry.
   ---------------------------------------- */

   /* ----------------------------------------
   ABV2 footer mask: fixed Abundance yellow
   Footer-only peak mask for page-to-footer transition.
   ---------------------------------------- */

.bg-mask--abundance-footer-peak{
  display:block;
  padding-top:11.5%;
  margin-bottom:-0.0625rem;
  background:var(--abv2-yellow); /* Sass: $abundance-yellow */

  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 430L1850 70L6000 430V700H0V430Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6000 700' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 430L1850 70L6000 430V700H0V430Z'/%3E%3C/svg%3E");

  -webkit-mask-size:100% 100%;
  mask-size:100% 100%;
  -webkit-mask-position:0 0;
  mask-position:0 0;
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
}

@media (max-width:767px){
  .bg-mask--abundance-footer-peak{
    padding-top:16%;
  }
}

@media (max-width:767px){
  .bg-mask--abundance-top,
  .bg-mask--abundance-bottom{
    padding-top:16%;
  }
}
```

## SASS Variable Reference

- `$abundance-yellow`
