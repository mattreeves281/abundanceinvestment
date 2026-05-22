# .abundance-ed-figure

## Corrected HTML Fragment

```html
<figure class="abundance-ed-figure">
  <div class="abundance-media-frame abundance-media-frame--editorial m-x--auto"><img src="..." alt=""></div>
  <figcaption class="abundance-body-compact m-t-spacer-xs">Caption text.</figcaption>
</figure>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
/* Allow iframe use inside shared media frame */
.abundance-media-frame iframe{
  display:block;
  width:100%;
  height:100%;
  border:0;
}

/* =========================================================
   ABV2 editorial figure
   Content-page media + caption treatment
   ========================================================= */

.abundance-ed-figure{
  margin:0;
}

.abundance-media-frame--editorial{
  width:100%;
  max-width:760px;
  aspect-ratio:1.55 / 1;
  border-radius:36px;
}

.abundance-ed-figure figcaption{
  max-width:760px;
  margin-inline:auto;
  color:var(--abv2-text); /* Sass: $abundance-neutral-800 / $si-color-text-secondary */
}

@media (max-width:767px){
  .abundance-media-frame--editorial{
    max-width:100%;
    border-radius:28px;
  }
}
```

## SASS Variable Reference

- `$abundance-neutral-800`
- `$si-color-text-secondary`
