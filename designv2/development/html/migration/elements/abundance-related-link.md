# .abundance-related-link

## Corrected HTML Fragment

```html
<a class="abundance-related-link" href="#"><span class="abundance-action-text text-white">Related link</span></a>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-related-link{
  position:relative;
  display:block;
  min-height:100%;
  padding:var(--abv2-space-24, 24px) var(--abv2-space-12, 12px) var(--abv2-space-12, 12px); /* Sass: $spacer-xs; $abv2-space-12 */
  border-radius:18px;
  color:inherit;
  text-decoration:none;
  transition:background .2s ease, color .2s ease;
}

.abundance-related-link::before{
  content:"";
  position:absolute;
  left:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
  top:var(--abv2-space-12, 12px); /* Sass: $abv2-space-12 */
  width:38px;
  height:1px;
  background:var(--abv2-white-a28); /* Sass: $abv2-white-a28 */
  transition:width .2s ease, background .2s ease;
}

.abundance-related-link:hover,
.abundance-related-link:focus-visible{
  background:var(--abv2-white-a08); /* Sass: $abv2-white-a08 */
  text-decoration:none;
}

.abundance-related-link:hover::before,
.abundance-related-link:focus-visible::before{
  width:46px;
  background:var(--abv2-white-a62); /* Sass: $abv2-white-a62 */
}

.abundance-related-link:focus-visible{
  outline:2px solid var(--abv2-white-a62); /* Sass: $abv2-white-a62 */
  outline-offset:3px;
}

@media (max-width:759px){
  .abundance-related-link{
    padding:var(--abv2-space-22, 22px) var(--abv2-space-10, 10px) var(--abv2-space-10, 10px); /* Sass: $abv2-space-22; $abv2-space-10 */
    border-radius:16px;
  }

  .abundance-related-link::before{
    left:var(--abv2-space-10, 10px); /* Sass: $abv2-space-10 */
    top:var(--abv2-space-10, 10px); /* Sass: $abv2-space-10 */
  }
}
```

## SASS Variable Reference

- `$spacer-xs`
- `$abv2-space-12`
- `$abv2-white-a28`
- `$abv2-white-a08`
- `$abv2-white-a62`
- `$abv2-space-22`
- `$abv2-space-10`
