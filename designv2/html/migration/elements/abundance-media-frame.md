# .abundance-media-frame

## Corrected HTML Fragment

```html
<div class="abundance-media-frame abundance-media-frame--wide">
  <img src="..." alt="">
</div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss + _new-content-page-assets.scss`

```scss
.abundance-media-frame{
  display:block;
  width:min(100%, 500px);
  aspect-ratio:1.45 / 1;
  border-radius:48px;
  overflow:hidden;
  text-decoration:none;
}

.abundance-media-frame img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}

.abundance-media-frame--square{
  width:228px;
  max-width:100%;
  aspect-ratio:1 / 1;
  border-radius:14px;
}

.abundance-media-frame--case-square{
  width:min(100%, 460px);
  aspect-ratio:1 / 1;
  border-radius:48px;
}

.abundance-media-frame--wide{
  width:min(100%, 540px);
  aspect-ratio:1.55 / 1;
  border-radius:36px;
}

@media (max-width:1199px) and (min-width:992px){
  .abundance-media-frame--square{
    width:184px;
  }

  .abundance-media-frame--case-square{
    width:min(100%, 400px);
    border-radius:40px;
  }
}

@media (max-width:991px) and (min-width:768px){
  .abundance-media-frame--square{
    width:172px;
  }
}

@media (max-width:991px){
  .abundance-media-frame--case-square{
    width:min(100%, 340px);
    border-radius:36px;
  }
}

@media (max-width:767px){
  .abundance-media-frame--square{
    width:min(100%, 168px, 300px);
    border-radius:18px;
  }

  .abundance-media-frame--case-square{
    width:100%;
    border-radius:36px;
  }

  .abundance-media-frame--wide{
    width:100%;
    border-radius:28px;
  }
}

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
