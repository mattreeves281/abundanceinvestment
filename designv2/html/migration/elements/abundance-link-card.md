# .abundance-link-card

## Corrected HTML Fragment

```html
<a class="abundance-link-card h-100" href="#">
  <span class="abundance-eyebrow brand-secondary">Guide</span>
  <p class="abundance-body-compact m-b-spacer-0">Supporting copy.</p>
  <span class="abundance-action-text brand-primary m-t-spacer-xs">Read more</span>
</a>
```

## Corrected CSS

Source: `designv2/scss handover/_new-content-page-assets.scss`

```scss
.abundance-link-card{
  display:flex;
  flex-direction:column;
  min-height:100%;
  padding:var(--abv2-space-20, 20px) var(--abv2-space-20, 20px) var(--abv2-space-16, 16px); /* Sass: $abv2-space-20; $spacer-2xs */
  border:1.5px solid var(--abv2-border-subtle); /* Sass: $abv2-border-subtle */
  border-radius:18px;
  background:var(--abv2-white); /* Sass: $pure-white */
  color:inherit;
  text-decoration:none;
  transition:
    transform .18s ease,
    border-color .18s ease,
    box-shadow .18s ease,
    background-color .18s ease;
}

.abundance-link-card:hover,
.abundance-link-card:focus-visible{
  transform:translateY(-1px);
  border-color:var(--abv2-pink-a34); /* Sass: $abv2-pink-a34 */
  box-shadow:0 10px 24px var(--abv2-shadow-default); /* Sass: $abv2-shadow-default */
  text-decoration:none;
}

.abundance-link-card:focus-visible{
  outline:2px solid var(--abv2-pink); /* Sass: $abundance-pink */
  outline-offset:3px;
}

.abundance-link-card .abundance-action-text{
  display:block;
  margin-top:auto;
  padding-top:var(--abv2-space-16, 16px); /* Sass: $spacer-2xs */
}

@media (max-width:767px){
  .abundance-link-card{
    border-radius:16px;
  }
}
```

## SASS Variable Reference

- `$abv2-space-20`
- `$spacer-2xs`
- `$abv2-border-subtle`
- `$pure-white`
- `$abv2-pink-a34`
- `$abv2-shadow-default`
- `$abundance-pink`
