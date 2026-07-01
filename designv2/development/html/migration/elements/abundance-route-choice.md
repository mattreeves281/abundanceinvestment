# .abundance-route-choice

## Corrected HTML Fragment

```html
<label class="abundance-route-choice abundance-route-choice--pink" for="choice-a">
  <input class="abundance-route-choice__input" id="choice-a" name="choice" type="radio">
  <span class="abundance-route-choice__card">
    <span class="abundance-route-choice__rule" aria-hidden="true"></span>
    <span class="abundance-route-choice__tick" aria-hidden="true"></span>
  </span>
</label>
```

## Corrected CSS

Source: `designv2/scss handover/_new-buy-final.scss`

```scss
.abundance-route-choice{
  position:relative;
  display:block;
  height:100%;
  cursor:pointer;
}

.abundance-route-choice__input{
  position:absolute;
  opacity:0;
  pointer-events:none;
}

.abundance-route-choice__card{
  position:relative;
  display:flex;
  flex-direction:column;
  min-height:100%;
  padding:var(--abv2-space-24); /* Sass: $spacer-xs */
  padding-bottom:calc(var(--abv2-space-24) + 48px); /* Sass: $spacer-xs */
  border:1.5px solid var(--abv2-border-default); /* Sass: $abv2-border-default */
  border-radius:22px;
  background:var(--abv2-white); /* Sass: $pure-white */
  color:var(--abv2-ink); /* Sass: $abundance-neutral-900 / $si-color-text-primary */
  transition:border-color .18s ease, background-color .18s ease, box-shadow .18s ease, transform .18s ease;
}

.abundance-route-choice:hover .abundance-route-choice__card,
.abundance-route-choice__input:focus-visible + .abundance-route-choice__card{
  transform:translateY(-1px);
  box-shadow:0 10px 28px var(--abv2-ink-a05); /* Sass: $abv2-ink-a05 */
}

.abundance-route-choice__rule{
  display:block;
  width:100%;
  height:2px;
  margin:var(--abv2-space-12) 0 var(--abv2-space-16); /* Sass: $abv2-space-12; $spacer-2xs */
  border-radius:999px;
  background:var(--abv2-route-accent); /* Sass: component local custom property; set from $abundance-pink / $abundance-cyan */
}

.abundance-route-choice__list{
  display:grid;
  gap:var(--abv2-space-12); /* Sass: $abv2-space-12 */
  margin:var(--abv2-space-20) 0 0; /* Sass: $abv2-space-20 */
  padding:0;
  list-style:none;
}

.abundance-route-choice__list span{
  position:relative;
  display:block;
  padding-left:var(--abv2-space-20); /* Sass: $abv2-space-20 */
}

.abundance-route-choice__list span::before{
  content:"";
  position:absolute;
  left:0;
  top:.62em;
  width:7px;
  height:7px;
  border-radius:999px;
  background:var(--abv2-route-accent); /* Sass: component local custom property; set from $abundance-pink / $abundance-cyan */
}

.abundance-route-choice__tick{
  position:absolute;
  right:var(--abv2-space-20); /* Sass: $abv2-space-20 */
  bottom:var(--abv2-space-20); /* Sass: $abv2-space-20 */
  display:grid;
  place-items:center;
  width:40px;
  height:40px;
  color:var(--abv2-white); /* Sass: $pure-white */
  background:var(--abv2-grey-light); /* Sass: $abundance-neutral-300 */
  opacity:.72;
  transform:scale(.9);
  -webkit-mask-image:var(--abv2-dot-mask); /* Sass: $abv2-dot-mask */
  mask-image:var(--abv2-dot-mask); /* Sass: $abv2-dot-mask */
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
  -webkit-mask-position:center;
  mask-position:center;
  -webkit-mask-size:contain;
  mask-size:contain;
  transition:background-color .18s ease, opacity .18s ease, transform .18s ease;
}

.abundance-route-choice__tick::before{
  content:"";
  width:20px;
  height:20px;
  background:currentColor;
  opacity:0;
  transform:scale(.7);
  -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9.55 15.35 5.8 11.6l-1.4 1.4 5.15 5.15L20.1 7.6l-1.4-1.4-9.15 9.15Z'/%3E%3C/svg%3E");
  mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9.55 15.35 5.8 11.6l-1.4 1.4 5.15 5.15L20.1 7.6l-1.4-1.4-9.15 9.15Z'/%3E%3C/svg%3E");
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
  -webkit-mask-position:center;
  mask-position:center;
  -webkit-mask-size:contain;
  mask-size:contain;
  transition:opacity .18s ease, transform .18s ease;
}

.abundance-route-choice--pink{
  --abv2-route-accent:var(--abv2-pink); /* Sass: $abundance-pink */
  --abv2-route-bg:var(--abv2-pink-a05); /* Sass: $abv2-pink-a05 */
}

.abundance-route-choice--teal{
  --abv2-route-accent:var(--abv2-teal); /* Sass: $abundance-cyan */
  --abv2-route-bg:var(--abv2-teal-very-light); /* Sass: $abundance-cyan-surface */
}

.abundance-route-choice__input:checked + .abundance-route-choice__card{
  border-color:var(--abv2-route-accent); /* Sass: component local custom property; set from $abundance-pink / $abundance-cyan */
  background:var(--abv2-route-bg); /* Sass: component local custom property; set from $abv2-pink-a05 / $abundance-cyan-surface */
}

.abundance-route-choice__input:checked + .abundance-route-choice__card .abundance-route-choice__tick{
  background:var(--abv2-route-accent); /* Sass: component local custom property; set from $abundance-pink / $abundance-cyan */
  opacity:1;
  transform:scale(1);
}

.abundance-route-choice__input:checked + .abundance-route-choice__card .abundance-route-choice__tick::before{
  opacity:1;
  transform:scale(1);
}

@media (max-width:759px){
  .abundance-route-choice__card{
    padding:var(--abv2-space-20); /* Sass: $abv2-space-20 */
    padding-bottom:calc(var(--abv2-space-20) + 46px); /* Sass: $abv2-space-20 */
    border-radius:18px;
  }

  .abundance-route-choice__tick{
    right:var(--abv2-space-16); /* Sass: $spacer-2xs */
    bottom:var(--abv2-space-16); /* Sass: $spacer-2xs */
    width:38px;
    height:38px;
  }
}
```

## SASS Variable Reference

- `$spacer-xs`
- `$abv2-border-default`
- `$pure-white`
- `$abundance-neutral-900`
- `$si-color-text-primary`
- `$abv2-ink-a05`
- `$abv2-space-12`
- `$spacer-2xs`
- `$abundance-cyan`
- `$abv2-space-20`
- `$abundance-neutral-300`
- `$abv2-dot-mask`
- `$abundance-pink`
- `$abv2-pink-a05`
- `$abundance-cyan-surface`
