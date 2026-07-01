# .abundance-hero-art-nudge

## Corrected HTML Fragment

```html
<div class="abundance-hero-art-nudge"><img src="..." alt=""></div>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-hero-art-nudge img{
  display:block;
  transform:translateY(clamp(76px, 6.8vw, 132px));
}

@media (max-width:991px) and (min-width:768px){
  .abundance-hero-art-nudge{
    max-width:350px;
    margin-left:auto;
    margin-right:auto;
  }
}

@media (max-width:767px){
  .abundance-hero-art-nudge img{
    transform:none;
  }
}
```

## SASS Variable Reference

- No Sass variables were annotated in this CSS block.
