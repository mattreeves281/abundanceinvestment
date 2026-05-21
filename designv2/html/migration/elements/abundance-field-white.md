# .abundance-field-white

## Corrected HTML Fragment

```html
<label class="abundance-field-white">
  <span class="abundance-field-white__prefix abundance-action-text">£</span>
  <input class="si-input" type="text">
</label>
```

## Corrected CSS

Source: `designv2/scss handover/_new-landing-page-assets.scss`

```scss
.abundance-field-white{
  position:relative;
  display:flex;
  align-items:center;
  min-height:54px;
  border:1.8px solid var(--abv2-white); /* Sass: $pure-white */
  border-radius:999px;
  background:var(--abv2-white-a16); /* Sass: $abv2-white-a16 */
  overflow:hidden;
  transition:background .2s ease, box-shadow .2s ease;
}

.abundance-field-white:focus-within{
  background:var(--abv2-white-a22); /* Sass: $abv2-white-a22 */
  box-shadow:0 0 0 3px var(--abv2-white-a28); /* Sass: $abv2-white-a28 */
}

.abundance-field-white .si-input{
  width:100%;
  min-height:54px;
  border:0;
  border-radius:0;
  background:transparent;
  box-shadow:none;
  color:var(--abv2-white); /* Sass: $pure-white */
}

.abundance-field-white .si-input:focus,
.abundance-field-white .si-input:focus-visible{
  outline:none !important;
  box-shadow:none;
}

.abundance-field-white__prefix{
  flex:0 0 auto;
  padding-left:var(--abv2-space-20, 20px); /* Sass: $abv2-space-20 */
  color:var(--abv2-white); /* Sass: $pure-white */
}

.abundance-field-white--select::after{
  content:"";
  position:absolute;
  right:var(--abv2-space-20, 20px); /* Sass: $abv2-space-20 */
  top:50%;
  width:10px;
  height:10px;
  border-right:2px solid currentColor;
  border-bottom:2px solid currentColor;
  color:var(--abv2-white); /* Sass: $pure-white */
  transform:translateY(-65%) rotate(45deg);
  pointer-events:none;
}

.abundance-field-white--select .si-input{
  padding-right:calc(var(--abv2-space-20, 20px) + 22px); /* Sass: $abv2-space-20 */
  appearance:none;
  cursor:pointer;
}

.abundance-field-white--select .si-input option{
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
  background:var(--abv2-white); /* Sass: $pure-white */
}

@media (max-width:759px){
  .abundance-field-white,
  .abundance-field-white .si-input{
    min-height:52px;
  }
}
```

## SASS Variable Reference

- `$pure-white`
- `$abv2-white-a16`
- `$abv2-white-a22`
- `$abv2-white-a28`
- `$abv2-space-20`
- `$abundance-neutral-900`
- `$si-color-text-primary`
