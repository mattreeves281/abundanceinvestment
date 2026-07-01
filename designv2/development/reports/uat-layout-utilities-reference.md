# UAT Layout Utilities Reference

Source: `designv2/incoming/abundanceuat-css.css`

Purpose: inventory the compiled UAT layout utility classes available for Abundance v2 design work. This is extracted from the CSS actually present in UAT, not inferred from source partials.

## Notes

- Breakpoints in this CSS include Bootstrap-style `768px`, `992px`, and `1200px`, plus platform mobile helpers around `767px`/`991px`.
- Some utility selectors are scoped or overloaded by component contexts. Check the “Example selector(s)” column before reusing a class globally.
- Spacing utilities often compile to a smaller default value and a larger `@media (min-width: 768px)` value.
- Classes with `!important` will be hard to override inside v2 components.

## Summary Counts

| Family | Count |
|---|---:|
| Spacing: margin | 155 |
| Spacing: padding | 122 |
| Grid: containers | 7 |
| Grid: rows and gutters | 151 |
| Grid: columns | 61 |
| Grid: offsets/order | 79 |
| Width/choke | 35 |
| Display utilities | 50 |
| Flex utilities | 167 |
| Position utilities | 26 |
| Text alignment/layout | 4 |
| Image/media layout | 10 |
| Visibility/layout helpers | 12 |

### Grid: containers (7)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.container` | width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 750px / 970px / 1170px / 1440px / 1300px / 1320px; display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between; padding: 0<br>@media (min-width: 1200px): width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 1170px<br>@media (min-width: 768px): max-width: 750px / 1440px / 1300px; width: 100%<br>@media (min-width: 992px): max-width: 970px<br>@media (prefers-reduced-motion: reduce): display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between<br>@media (max-width: 1199px): padding: 0<br>@media (min-width: 1600px): max-width: 1320px | `.container,.container-fluid,.container-lg,.container-md,.container-sm`<br>`.container-sm,.container`<br>`.container-md,.container-sm,.container` |
| `.container--large` | width: 1440px !important; max-width: 1440px<br>@media only screen and (min-width: 1500px): width: 1440px !important; max-width: 1440px | `.container--large` |
| `.container-fluid` | width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between<br>@media (min-width: 1200px): width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto<br>@media (prefers-reduced-motion: reduce): display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between | `.container,.container-fluid,.container-lg,.container-md,.container-sm`<br>`.navbar>.container,.navbar>.container-fluid,.navbar>.container-sm,.navbar>.container-md,.navbar>.container-lg` |
| `.container-lg` | width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 1170px; display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between<br>@media (min-width: 1200px): width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 1170px<br>@media (prefers-reduced-motion: reduce): display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between | `.container,.container-fluid,.container-lg,.container-md,.container-sm`<br>`.container-lg,.container-md,.container-sm,.container`<br>`.navbar>.container,.navbar>.container-fluid,.navbar>.container-sm,.navbar>.container-md,.navbar>.container-lg` |
| `.container-md` | width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 970px / 1170px; display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between<br>@media (min-width: 1200px): width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 1170px<br>@media (min-width: 992px): max-width: 970px<br>@media (prefers-reduced-motion: reduce): display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between | `.container,.container-fluid,.container-lg,.container-md,.container-sm`<br>`.container-md,.container-sm,.container`<br>`.container-lg,.container-md,.container-sm,.container` |
| `.container-medium` | display: block; max-width: 940px; margin-right: auto; margin-left: auto<br>@media (max-width: 991px): display: block; max-width: 940px; margin-right: auto; margin-left: auto | `.container-medium` |
| `.container-sm` | width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 750px / 970px / 1170px; display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between<br>@media (min-width: 1200px): width: 100%; padding-right: var(--bs-gutter-x, 0.75rem); padding-left: var(--bs-gutter-x, 0.75rem); margin-right: auto; margin-left: auto; max-width: 1170px<br>@media (min-width: 768px): max-width: 750px<br>@media (min-width: 992px): max-width: 970px<br>@media (prefers-reduced-motion: reduce): display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between | `.container,.container-fluid,.container-lg,.container-md,.container-sm`<br>`.container-sm,.container`<br>`.container-md,.container-sm,.container` |

### Grid: rows and gutters (151)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.g-0` | --bs-gutter-x: 0; --bs-gutter-y: 0<br>@media (min-width: 1200px): --bs-gutter-x: 0; --bs-gutter-y: 0 | `.g-0,.gx-0`<br>`.g-0,.gy-0` |
| `.g-2xl` | --bs-gutter-x: 6rem; --bs-gutter-y: 6rem<br>@media (min-width: 1200px): --bs-gutter-x: 6rem; --bs-gutter-y: 6rem | `.g-2xl,.gx-2xl`<br>`.g-2xl,.gy-2xl` |
| `.g-2xs` | --bs-gutter-x: 1rem; --bs-gutter-y: 1rem<br>@media (min-width: 1200px): --bs-gutter-x: 1rem; --bs-gutter-y: 1rem | `.g-2xs,.gx-2xs`<br>`.g-2xs,.gy-2xs` |
| `.g-3xs` | --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem | `.g-3xs,.gx-3xs`<br>`.g-3xs,.gy-3xs` |
| `.g-4xl` | --bs-gutter-x: 8rem; --bs-gutter-y: 8rem<br>@media (min-width: 1200px): --bs-gutter-x: 8rem; --bs-gutter-y: 8rem | `.g-4xl,.gx-4xl`<br>`.g-4xl,.gy-4xl` |
| `.g-lg` | --bs-gutter-x: 4rem; --bs-gutter-y: 4rem<br>@media (min-width: 1200px): --bs-gutter-x: 4rem; --bs-gutter-y: 4rem | `.g-lg,.gx-lg`<br>`.g-lg,.gy-lg` |
| `.g-lg-0` | --bs-gutter-x: 0; --bs-gutter-y: 0<br>@media (min-width: 1200px): --bs-gutter-x: 0; --bs-gutter-y: 0 | `.g-lg-0,.gx-lg-0`<br>`.g-lg-0,.gy-lg-0` |
| `.g-lg-2xl` | --bs-gutter-x: 6rem; --bs-gutter-y: 6rem<br>@media (min-width: 1200px): --bs-gutter-x: 6rem; --bs-gutter-y: 6rem | `.g-lg-2xl,.gx-lg-2xl`<br>`.g-lg-2xl,.gy-lg-2xl` |
| `.g-lg-2xs` | --bs-gutter-x: 1rem; --bs-gutter-y: 1rem<br>@media (min-width: 1200px): --bs-gutter-x: 1rem; --bs-gutter-y: 1rem | `.g-lg-2xs,.gx-lg-2xs`<br>`.g-lg-2xs,.gy-lg-2xs` |
| `.g-lg-3xs` | --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem | `.g-lg-3xs,.gx-lg-3xs`<br>`.g-lg-3xs,.gy-lg-3xs` |
| `.g-lg-4xl` | --bs-gutter-x: 8rem; --bs-gutter-y: 8rem<br>@media (min-width: 1200px): --bs-gutter-x: 8rem; --bs-gutter-y: 8rem | `.g-lg-4xl,.gx-lg-4xl`<br>`.g-lg-4xl,.gy-lg-4xl` |
| `.g-lg-lg` | --bs-gutter-x: 4rem; --bs-gutter-y: 4rem<br>@media (min-width: 1200px): --bs-gutter-x: 4rem; --bs-gutter-y: 4rem | `.g-lg-lg,.gx-lg-lg`<br>`.g-lg-lg,.gy-lg-lg` |
| `.g-lg-md` | --bs-gutter-x: 3rem; --bs-gutter-y: 3rem<br>@media (min-width: 1200px): --bs-gutter-x: 3rem; --bs-gutter-y: 3rem | `.g-lg-md,.gx-lg-md`<br>`.g-lg-md,.gy-lg-md` |
| `.g-lg-sm` | --bs-gutter-x: 2rem; --bs-gutter-y: 2rem<br>@media (min-width: 1200px): --bs-gutter-x: 2rem; --bs-gutter-y: 2rem | `.g-lg-sm,.gx-lg-sm`<br>`.g-lg-sm,.gy-lg-sm` |
| `.g-lg-xl` | --bs-gutter-x: 5rem; --bs-gutter-y: 5rem<br>@media (min-width: 1200px): --bs-gutter-x: 5rem; --bs-gutter-y: 5rem | `.g-lg-xl,.gx-lg-xl`<br>`.g-lg-xl,.gy-lg-xl` |
| `.g-lg-xs` | --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem | `.g-lg-xs,.gx-lg-xs`<br>`.g-lg-xs,.gy-lg-xs` |
| `.g-md` | --bs-gutter-x: 3rem; --bs-gutter-y: 3rem<br>@media (min-width: 1200px): --bs-gutter-x: 3rem; --bs-gutter-y: 3rem | `.g-md,.gx-md`<br>`.g-md,.gy-md` |
| `.g-md-0` | --bs-gutter-x: 0; --bs-gutter-y: 0<br>@media (min-width: 992px): --bs-gutter-x: 0; --bs-gutter-y: 0 | `.g-md-0,.gx-md-0`<br>`.g-md-0,.gy-md-0` |
| `.g-md-2xl` | --bs-gutter-x: 6rem; --bs-gutter-y: 6rem<br>@media (min-width: 992px): --bs-gutter-x: 6rem; --bs-gutter-y: 6rem | `.g-md-2xl,.gx-md-2xl`<br>`.g-md-2xl,.gy-md-2xl` |
| `.g-md-2xs` | --bs-gutter-x: 1rem; --bs-gutter-y: 1rem<br>@media (min-width: 992px): --bs-gutter-x: 1rem; --bs-gutter-y: 1rem | `.g-md-2xs,.gx-md-2xs`<br>`.g-md-2xs,.gy-md-2xs` |
| `.g-md-3xs` | --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem<br>@media (min-width: 992px): --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem | `.g-md-3xs,.gx-md-3xs`<br>`.g-md-3xs,.gy-md-3xs` |
| `.g-md-4xl` | --bs-gutter-x: 8rem; --bs-gutter-y: 8rem<br>@media (min-width: 992px): --bs-gutter-x: 8rem; --bs-gutter-y: 8rem | `.g-md-4xl,.gx-md-4xl`<br>`.g-md-4xl,.gy-md-4xl` |
| `.g-md-lg` | --bs-gutter-x: 4rem; --bs-gutter-y: 4rem<br>@media (min-width: 992px): --bs-gutter-x: 4rem; --bs-gutter-y: 4rem | `.g-md-lg,.gx-md-lg`<br>`.g-md-lg,.gy-md-lg` |
| `.g-md-md` | --bs-gutter-x: 3rem; --bs-gutter-y: 3rem<br>@media (min-width: 992px): --bs-gutter-x: 3rem; --bs-gutter-y: 3rem | `.g-md-md,.gx-md-md`<br>`.g-md-md,.gy-md-md` |
| `.g-md-sm` | --bs-gutter-x: 2rem; --bs-gutter-y: 2rem<br>@media (min-width: 992px): --bs-gutter-x: 2rem; --bs-gutter-y: 2rem | `.g-md-sm,.gx-md-sm`<br>`.g-md-sm,.gy-md-sm` |
| `.g-md-xl` | --bs-gutter-x: 5rem; --bs-gutter-y: 5rem<br>@media (min-width: 992px): --bs-gutter-x: 5rem; --bs-gutter-y: 5rem | `.g-md-xl,.gx-md-xl`<br>`.g-md-xl,.gy-md-xl` |
| `.g-md-xs` | --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem<br>@media (min-width: 992px): --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem | `.g-md-xs,.gx-md-xs`<br>`.g-md-xs,.gy-md-xs` |
| `.g-sm` | --bs-gutter-x: 2rem; --bs-gutter-y: 2rem<br>@media (min-width: 1200px): --bs-gutter-x: 2rem; --bs-gutter-y: 2rem | `.g-sm,.gx-sm`<br>`.g-sm,.gy-sm` |
| `.g-sm-0` | --bs-gutter-x: 0; --bs-gutter-y: 0<br>@media (min-width: 768px): --bs-gutter-x: 0; --bs-gutter-y: 0 | `.g-sm-0,.gx-sm-0`<br>`.g-sm-0,.gy-sm-0` |
| `.g-sm-2xl` | --bs-gutter-x: 6rem; --bs-gutter-y: 6rem<br>@media (min-width: 768px): --bs-gutter-x: 6rem; --bs-gutter-y: 6rem | `.g-sm-2xl,.gx-sm-2xl`<br>`.g-sm-2xl,.gy-sm-2xl` |
| `.g-sm-2xs` | --bs-gutter-x: 1rem; --bs-gutter-y: 1rem<br>@media (min-width: 768px): --bs-gutter-x: 1rem; --bs-gutter-y: 1rem | `.g-sm-2xs,.gx-sm-2xs`<br>`.g-sm-2xs,.gy-sm-2xs` |
| `.g-sm-3xs` | --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem<br>@media (min-width: 768px): --bs-gutter-x: 0.5rem; --bs-gutter-y: 0.5rem | `.g-sm-3xs,.gx-sm-3xs`<br>`.g-sm-3xs,.gy-sm-3xs` |
| `.g-sm-4xl` | --bs-gutter-x: 8rem; --bs-gutter-y: 8rem<br>@media (min-width: 768px): --bs-gutter-x: 8rem; --bs-gutter-y: 8rem | `.g-sm-4xl,.gx-sm-4xl`<br>`.g-sm-4xl,.gy-sm-4xl` |
| `.g-sm-lg` | --bs-gutter-x: 4rem; --bs-gutter-y: 4rem<br>@media (min-width: 768px): --bs-gutter-x: 4rem; --bs-gutter-y: 4rem | `.g-sm-lg,.gx-sm-lg`<br>`.g-sm-lg,.gy-sm-lg` |
| `.g-sm-md` | --bs-gutter-x: 3rem; --bs-gutter-y: 3rem<br>@media (min-width: 768px): --bs-gutter-x: 3rem; --bs-gutter-y: 3rem | `.g-sm-md,.gx-sm-md`<br>`.g-sm-md,.gy-sm-md` |
| `.g-sm-sm` | --bs-gutter-x: 2rem; --bs-gutter-y: 2rem<br>@media (min-width: 768px): --bs-gutter-x: 2rem; --bs-gutter-y: 2rem | `.g-sm-sm,.gx-sm-sm`<br>`.g-sm-sm,.gy-sm-sm` |
| `.g-sm-xl` | --bs-gutter-x: 5rem; --bs-gutter-y: 5rem<br>@media (min-width: 768px): --bs-gutter-x: 5rem; --bs-gutter-y: 5rem | `.g-sm-xl,.gx-sm-xl`<br>`.g-sm-xl,.gy-sm-xl` |
| `.g-sm-xs` | --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem<br>@media (min-width: 768px): --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem | `.g-sm-xs,.gx-sm-xs`<br>`.g-sm-xs,.gy-sm-xs` |
| `.g-xl` | --bs-gutter-x: 5rem; --bs-gutter-y: 5rem<br>@media (min-width: 1200px): --bs-gutter-x: 5rem; --bs-gutter-y: 5rem | `.g-xl,.gx-xl`<br>`.g-xl,.gy-xl` |
| `.g-xs` | --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 1.5rem; --bs-gutter-y: 1.5rem | `.g-xs,.gx-xs`<br>`.g-xs,.gy-xs` |
| `.gx-0` | --bs-gutter-x: 0<br>@media (min-width: 1200px): --bs-gutter-x: 0 | `.g-0,.gx-0` |
| `.gx-2xl` | --bs-gutter-x: 6rem<br>@media (min-width: 1200px): --bs-gutter-x: 6rem | `.g-2xl,.gx-2xl` |
| `.gx-2xs` | --bs-gutter-x: 1rem<br>@media (min-width: 1200px): --bs-gutter-x: 1rem | `.g-2xs,.gx-2xs` |
| `.gx-3xs` | --bs-gutter-x: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 0.5rem | `.g-3xs,.gx-3xs` |
| `.gx-4xl` | --bs-gutter-x: 8rem<br>@media (min-width: 1200px): --bs-gutter-x: 8rem | `.g-4xl,.gx-4xl` |
| `.gx-lg` | --bs-gutter-x: 4rem<br>@media (min-width: 1200px): --bs-gutter-x: 4rem | `.g-lg,.gx-lg` |
| `.gx-lg-0` | --bs-gutter-x: 0<br>@media (min-width: 1200px): --bs-gutter-x: 0 | `.g-lg-0,.gx-lg-0` |
| `.gx-lg-2xl` | --bs-gutter-x: 6rem<br>@media (min-width: 1200px): --bs-gutter-x: 6rem | `.g-lg-2xl,.gx-lg-2xl` |
| `.gx-lg-2xs` | --bs-gutter-x: 1rem<br>@media (min-width: 1200px): --bs-gutter-x: 1rem | `.g-lg-2xs,.gx-lg-2xs` |
| `.gx-lg-3xs` | --bs-gutter-x: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 0.5rem | `.g-lg-3xs,.gx-lg-3xs` |
| `.gx-lg-4xl` | --bs-gutter-x: 8rem<br>@media (min-width: 1200px): --bs-gutter-x: 8rem | `.g-lg-4xl,.gx-lg-4xl` |
| `.gx-lg-lg` | --bs-gutter-x: 4rem<br>@media (min-width: 1200px): --bs-gutter-x: 4rem | `.g-lg-lg,.gx-lg-lg` |
| `.gx-lg-md` | --bs-gutter-x: 3rem<br>@media (min-width: 1200px): --bs-gutter-x: 3rem | `.g-lg-md,.gx-lg-md` |
| `.gx-lg-sm` | --bs-gutter-x: 2rem<br>@media (min-width: 1200px): --bs-gutter-x: 2rem | `.g-lg-sm,.gx-lg-sm` |
| `.gx-lg-xl` | --bs-gutter-x: 5rem<br>@media (min-width: 1200px): --bs-gutter-x: 5rem | `.g-lg-xl,.gx-lg-xl` |
| `.gx-lg-xs` | --bs-gutter-x: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 1.5rem | `.g-lg-xs,.gx-lg-xs` |
| `.gx-md` | --bs-gutter-x: 3rem<br>@media (min-width: 1200px): --bs-gutter-x: 3rem | `.g-md,.gx-md` |
| `.gx-md-0` | --bs-gutter-x: 0<br>@media (min-width: 992px): --bs-gutter-x: 0 | `.g-md-0,.gx-md-0` |
| `.gx-md-2xl` | --bs-gutter-x: 6rem<br>@media (min-width: 992px): --bs-gutter-x: 6rem | `.g-md-2xl,.gx-md-2xl` |
| `.gx-md-2xs` | --bs-gutter-x: 1rem<br>@media (min-width: 992px): --bs-gutter-x: 1rem | `.g-md-2xs,.gx-md-2xs` |
| `.gx-md-3xs` | --bs-gutter-x: 0.5rem<br>@media (min-width: 992px): --bs-gutter-x: 0.5rem | `.g-md-3xs,.gx-md-3xs` |
| `.gx-md-4xl` | --bs-gutter-x: 8rem<br>@media (min-width: 992px): --bs-gutter-x: 8rem | `.g-md-4xl,.gx-md-4xl` |
| `.gx-md-lg` | --bs-gutter-x: 4rem<br>@media (min-width: 992px): --bs-gutter-x: 4rem | `.g-md-lg,.gx-md-lg` |
| `.gx-md-md` | --bs-gutter-x: 3rem<br>@media (min-width: 992px): --bs-gutter-x: 3rem | `.g-md-md,.gx-md-md` |
| `.gx-md-sm` | --bs-gutter-x: 2rem<br>@media (min-width: 992px): --bs-gutter-x: 2rem | `.g-md-sm,.gx-md-sm` |
| `.gx-md-xl` | --bs-gutter-x: 5rem<br>@media (min-width: 992px): --bs-gutter-x: 5rem | `.g-md-xl,.gx-md-xl` |
| `.gx-md-xs` | --bs-gutter-x: 1.5rem<br>@media (min-width: 992px): --bs-gutter-x: 1.5rem | `.g-md-xs,.gx-md-xs` |
| `.gx-sm` | --bs-gutter-x: 2rem<br>@media (min-width: 1200px): --bs-gutter-x: 2rem | `.g-sm,.gx-sm` |
| `.gx-sm-0` | --bs-gutter-x: 0<br>@media (min-width: 768px): --bs-gutter-x: 0 | `.g-sm-0,.gx-sm-0` |
| `.gx-sm-2xl` | --bs-gutter-x: 6rem<br>@media (min-width: 768px): --bs-gutter-x: 6rem | `.g-sm-2xl,.gx-sm-2xl` |
| `.gx-sm-2xs` | --bs-gutter-x: 1rem<br>@media (min-width: 768px): --bs-gutter-x: 1rem | `.g-sm-2xs,.gx-sm-2xs` |
| `.gx-sm-3xs` | --bs-gutter-x: 0.5rem<br>@media (min-width: 768px): --bs-gutter-x: 0.5rem | `.g-sm-3xs,.gx-sm-3xs` |
| `.gx-sm-4xl` | --bs-gutter-x: 8rem<br>@media (min-width: 768px): --bs-gutter-x: 8rem | `.g-sm-4xl,.gx-sm-4xl` |
| `.gx-sm-lg` | --bs-gutter-x: 4rem<br>@media (min-width: 768px): --bs-gutter-x: 4rem | `.g-sm-lg,.gx-sm-lg` |
| `.gx-sm-md` | --bs-gutter-x: 3rem<br>@media (min-width: 768px): --bs-gutter-x: 3rem | `.g-sm-md,.gx-sm-md` |
| `.gx-sm-sm` | --bs-gutter-x: 2rem<br>@media (min-width: 768px): --bs-gutter-x: 2rem | `.g-sm-sm,.gx-sm-sm` |
| `.gx-sm-xl` | --bs-gutter-x: 5rem<br>@media (min-width: 768px): --bs-gutter-x: 5rem | `.g-sm-xl,.gx-sm-xl` |
| `.gx-sm-xs` | --bs-gutter-x: 1.5rem<br>@media (min-width: 768px): --bs-gutter-x: 1.5rem | `.g-sm-xs,.gx-sm-xs` |
| `.gx-xl` | --bs-gutter-x: 5rem<br>@media (min-width: 1200px): --bs-gutter-x: 5rem | `.g-xl,.gx-xl` |
| `.gx-xs` | --bs-gutter-x: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-x: 1.5rem | `.g-xs,.gx-xs` |
| `.gy-0` | --bs-gutter-y: 0<br>@media (min-width: 1200px): --bs-gutter-y: 0 | `.g-0,.gy-0` |
| `.gy-2xl` | --bs-gutter-y: 6rem<br>@media (min-width: 1200px): --bs-gutter-y: 6rem | `.g-2xl,.gy-2xl` |
| `.gy-2xs` | --bs-gutter-y: 1rem<br>@media (min-width: 1200px): --bs-gutter-y: 1rem | `.g-2xs,.gy-2xs` |
| `.gy-3xs` | --bs-gutter-y: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-y: 0.5rem | `.g-3xs,.gy-3xs` |
| `.gy-4xl` | --bs-gutter-y: 8rem<br>@media (min-width: 1200px): --bs-gutter-y: 8rem | `.g-4xl,.gy-4xl` |
| `.gy-lg` | --bs-gutter-y: 4rem<br>@media (min-width: 1200px): --bs-gutter-y: 4rem | `.g-lg,.gy-lg` |
| `.gy-lg-0` | --bs-gutter-y: 0<br>@media (min-width: 1200px): --bs-gutter-y: 0 | `.g-lg-0,.gy-lg-0` |
| `.gy-lg-2xl` | --bs-gutter-y: 6rem<br>@media (min-width: 1200px): --bs-gutter-y: 6rem | `.g-lg-2xl,.gy-lg-2xl` |
| `.gy-lg-2xs` | --bs-gutter-y: 1rem<br>@media (min-width: 1200px): --bs-gutter-y: 1rem | `.g-lg-2xs,.gy-lg-2xs` |
| `.gy-lg-3xs` | --bs-gutter-y: 0.5rem<br>@media (min-width: 1200px): --bs-gutter-y: 0.5rem | `.g-lg-3xs,.gy-lg-3xs` |
| `.gy-lg-4xl` | --bs-gutter-y: 8rem<br>@media (min-width: 1200px): --bs-gutter-y: 8rem | `.g-lg-4xl,.gy-lg-4xl` |
| `.gy-lg-lg` | --bs-gutter-y: 4rem<br>@media (min-width: 1200px): --bs-gutter-y: 4rem | `.g-lg-lg,.gy-lg-lg` |
| `.gy-lg-md` | --bs-gutter-y: 3rem<br>@media (min-width: 1200px): --bs-gutter-y: 3rem | `.g-lg-md,.gy-lg-md` |
| `.gy-lg-sm` | --bs-gutter-y: 2rem<br>@media (min-width: 1200px): --bs-gutter-y: 2rem | `.g-lg-sm,.gy-lg-sm` |
| `.gy-lg-xl` | --bs-gutter-y: 5rem<br>@media (min-width: 1200px): --bs-gutter-y: 5rem | `.g-lg-xl,.gy-lg-xl` |
| `.gy-lg-xs` | --bs-gutter-y: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-y: 1.5rem | `.g-lg-xs,.gy-lg-xs` |
| `.gy-md` | --bs-gutter-y: 3rem<br>@media (min-width: 1200px): --bs-gutter-y: 3rem | `.g-md,.gy-md` |
| `.gy-md-0` | --bs-gutter-y: 0<br>@media (min-width: 992px): --bs-gutter-y: 0 | `.g-md-0,.gy-md-0` |
| `.gy-md-2xl` | --bs-gutter-y: 6rem<br>@media (min-width: 992px): --bs-gutter-y: 6rem | `.g-md-2xl,.gy-md-2xl` |
| `.gy-md-2xs` | --bs-gutter-y: 1rem<br>@media (min-width: 992px): --bs-gutter-y: 1rem | `.g-md-2xs,.gy-md-2xs` |
| `.gy-md-3xs` | --bs-gutter-y: 0.5rem<br>@media (min-width: 992px): --bs-gutter-y: 0.5rem | `.g-md-3xs,.gy-md-3xs` |
| `.gy-md-4xl` | --bs-gutter-y: 8rem<br>@media (min-width: 992px): --bs-gutter-y: 8rem | `.g-md-4xl,.gy-md-4xl` |
| `.gy-md-lg` | --bs-gutter-y: 4rem<br>@media (min-width: 992px): --bs-gutter-y: 4rem | `.g-md-lg,.gy-md-lg` |
| `.gy-md-md` | --bs-gutter-y: 3rem<br>@media (min-width: 992px): --bs-gutter-y: 3rem | `.g-md-md,.gy-md-md` |
| `.gy-md-sm` | --bs-gutter-y: 2rem<br>@media (min-width: 992px): --bs-gutter-y: 2rem | `.g-md-sm,.gy-md-sm` |
| `.gy-md-xl` | --bs-gutter-y: 5rem<br>@media (min-width: 992px): --bs-gutter-y: 5rem | `.g-md-xl,.gy-md-xl` |
| `.gy-md-xs` | --bs-gutter-y: 1.5rem<br>@media (min-width: 992px): --bs-gutter-y: 1.5rem | `.g-md-xs,.gy-md-xs` |
| `.gy-sm` | --bs-gutter-y: 2rem<br>@media (min-width: 1200px): --bs-gutter-y: 2rem | `.g-sm,.gy-sm` |
| `.gy-sm-0` | --bs-gutter-y: 0<br>@media (min-width: 768px): --bs-gutter-y: 0 | `.g-sm-0,.gy-sm-0` |
| `.gy-sm-2xl` | --bs-gutter-y: 6rem<br>@media (min-width: 768px): --bs-gutter-y: 6rem | `.g-sm-2xl,.gy-sm-2xl` |
| `.gy-sm-2xs` | --bs-gutter-y: 1rem<br>@media (min-width: 768px): --bs-gutter-y: 1rem | `.g-sm-2xs,.gy-sm-2xs` |
| `.gy-sm-3xs` | --bs-gutter-y: 0.5rem<br>@media (min-width: 768px): --bs-gutter-y: 0.5rem | `.g-sm-3xs,.gy-sm-3xs` |
| `.gy-sm-4xl` | --bs-gutter-y: 8rem<br>@media (min-width: 768px): --bs-gutter-y: 8rem | `.g-sm-4xl,.gy-sm-4xl` |
| `.gy-sm-lg` | --bs-gutter-y: 4rem<br>@media (min-width: 768px): --bs-gutter-y: 4rem | `.g-sm-lg,.gy-sm-lg` |
| `.gy-sm-md` | --bs-gutter-y: 3rem<br>@media (min-width: 768px): --bs-gutter-y: 3rem | `.g-sm-md,.gy-sm-md` |
| `.gy-sm-sm` | --bs-gutter-y: 2rem<br>@media (min-width: 768px): --bs-gutter-y: 2rem | `.g-sm-sm,.gy-sm-sm` |
| `.gy-sm-xl` | --bs-gutter-y: 5rem<br>@media (min-width: 768px): --bs-gutter-y: 5rem | `.g-sm-xl,.gy-sm-xl` |
| `.gy-sm-xs` | --bs-gutter-y: 1.5rem<br>@media (min-width: 768px): --bs-gutter-y: 1.5rem | `.g-sm-xs,.gy-sm-xs` |
| `.gy-xl` | --bs-gutter-y: 5rem<br>@media (min-width: 1200px): --bs-gutter-y: 5rem | `.g-xl,.gy-xl` |
| `.gy-xs` | --bs-gutter-y: 1.5rem<br>@media (min-width: 1200px): --bs-gutter-y: 1.5rem | `.g-xs,.gy-xs` |
| `.row` | --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex; flex-wrap: wrap; margin-top: calc(var(--bs-gutter-y)*-1) / var(--bs-gutter-y); margin-right: calc(var(--bs-gutter-x)*-0.5); margin-left: calc(var(--bs-gutter-x)*-0.5); flex-shrink: 0; width: 100%; max-width: 100%; padding-right: calc(var(--bs-gutter-x)*.5); padding-left: calc(var(--bs-gutter-x)*.5); align-items: center<br>@media (min-width: 1200px): --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex; flex-wrap: wrap; margin-top: calc(var(--bs-gutter-y)*-1) / var(--bs-gutter-y); margin-right: calc(var(--bs-gutter-x)*-0.5); margin-left: calc(var(--bs-gutter-x)*-0.5); flex-shrink: 0; width: 100%; max-width: 100%; padding-right: calc(var(--bs-gutter-x)*.5); padding-left: calc(var(--bs-gutter-x)*.5)<br>@media (max-width: 767px): align-items: center | `.row`<br>`.row>*`<br>`.si-portfolio__col--highlighted .row` |
| `.row--flex` | display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / ""<br>@media (max-width: 768px): display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / "" | `.row--flex,.flex-center--wrapped,.flex-between`<br>`.row--flex:before,.flex-center--wrapped:before,.flex-between:before`<br>`.row--flex:after,.flex-center--wrapped:after,.flex-between:after` |
| `.row--flex-f` | content: none; flex: 1<br>@media (max-width: 768px): content: none; flex: 1 | `.row--flex-f:after` |
| `.row-cols-1` | flex: 0 0 auto; width: 100%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 100% | `.row-cols-1>*` |
| `.row-cols-2` | flex: 0 0 auto; width: 50%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 50% | `.row-cols-2>*` |
| `.row-cols-3` | flex: 0 0 auto; width: 33.3333333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 33.3333333333% | `.row-cols-3>*` |
| `.row-cols-4` | flex: 0 0 auto; width: 25%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 25% | `.row-cols-4>*` |
| `.row-cols-5` | flex: 0 0 auto; width: 20%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 20% | `.row-cols-5>*` |
| `.row-cols-6` | flex: 0 0 auto; width: 16.6666666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 16.6666666667% | `.row-cols-6>*` |
| `.row-cols-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 1200px): flex: 0 0 auto; width: auto | `.row-cols-auto>*` |
| `.row-cols-lg-1` | flex: 0 0 auto; width: 100%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 100% | `.row-cols-lg-1>*` |
| `.row-cols-lg-2` | flex: 0 0 auto; width: 50%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 50% | `.row-cols-lg-2>*` |
| `.row-cols-lg-3` | flex: 0 0 auto; width: 33.3333333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 33.3333333333% | `.row-cols-lg-3>*` |
| `.row-cols-lg-4` | flex: 0 0 auto; width: 25%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 25% | `.row-cols-lg-4>*` |
| `.row-cols-lg-5` | flex: 0 0 auto; width: 20%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 20% | `.row-cols-lg-5>*` |
| `.row-cols-lg-6` | flex: 0 0 auto; width: 16.6666666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 16.6666666667% | `.row-cols-lg-6>*` |
| `.row-cols-lg-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 1200px): flex: 0 0 auto; width: auto | `.row-cols-lg-auto>*` |
| `.row-cols-md-1` | flex: 0 0 auto; width: 100%<br>@media (min-width: 992px): flex: 0 0 auto; width: 100% | `.row-cols-md-1>*` |
| `.row-cols-md-2` | flex: 0 0 auto; width: 50%<br>@media (min-width: 992px): flex: 0 0 auto; width: 50% | `.row-cols-md-2>*` |
| `.row-cols-md-3` | flex: 0 0 auto; width: 33.3333333333%<br>@media (min-width: 992px): flex: 0 0 auto; width: 33.3333333333% | `.row-cols-md-3>*` |
| `.row-cols-md-4` | flex: 0 0 auto; width: 25%<br>@media (min-width: 992px): flex: 0 0 auto; width: 25% | `.row-cols-md-4>*` |
| `.row-cols-md-5` | flex: 0 0 auto; width: 20%<br>@media (min-width: 992px): flex: 0 0 auto; width: 20% | `.row-cols-md-5>*` |
| `.row-cols-md-6` | flex: 0 0 auto; width: 16.6666666667%<br>@media (min-width: 992px): flex: 0 0 auto; width: 16.6666666667% | `.row-cols-md-6>*` |
| `.row-cols-md-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 992px): flex: 0 0 auto; width: auto | `.row-cols-md-auto>*` |
| `.row-cols-sm-1` | flex: 0 0 auto; width: 100%<br>@media (min-width: 768px): flex: 0 0 auto; width: 100% | `.row-cols-sm-1>*` |
| `.row-cols-sm-2` | flex: 0 0 auto; width: 50%<br>@media (min-width: 768px): flex: 0 0 auto; width: 50% | `.row-cols-sm-2>*` |
| `.row-cols-sm-3` | flex: 0 0 auto; width: 33.3333333333%<br>@media (min-width: 768px): flex: 0 0 auto; width: 33.3333333333% | `.row-cols-sm-3>*` |
| `.row-cols-sm-4` | flex: 0 0 auto; width: 25%<br>@media (min-width: 768px): flex: 0 0 auto; width: 25% | `.row-cols-sm-4>*` |
| `.row-cols-sm-5` | flex: 0 0 auto; width: 20%<br>@media (min-width: 768px): flex: 0 0 auto; width: 20% | `.row-cols-sm-5>*` |
| `.row-cols-sm-6` | flex: 0 0 auto; width: 16.6666666667%<br>@media (min-width: 768px): flex: 0 0 auto; width: 16.6666666667% | `.row-cols-sm-6>*` |
| `.row-cols-sm-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 768px): flex: 0 0 auto; width: auto | `.row-cols-sm-auto>*` |

### Grid: columns (61)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.col` | flex: 1 0 0% / 1 0 auto / auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto; position: relative; min-height: 1px; padding-right: 15px; padding-left: 15px; width: 100%; min-width: 175px; margin: 10px 0 / 0; margin-top: 25px / 0; margin-bottom: 0<br>@media (min-width: 1200px): flex: 1 0 0%; margin-top: 25px<br>@media (max-width: 768px): flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto; position: relative; min-height: 1px; padding-right: 15px; padding-left: 15px<br>@media (max-width: 991px): width: 100%; min-width: 175px; margin: 10px 0; flex: 1 0 auto<br>@media (min-width: 768px): flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto<br>@media (min-width: 992px): margin: 0<br>@media (max-width: 767px): flex: auto; margin-top: 0; margin-bottom: 0 | `.col`<br>`.flex-between .col`<br>`.si-portfolio-profile-card .col:first-child` |
| `.col--over-ten-digit-account-value` | margin-top: 25px / 0<br>@media (min-width: 992px): margin-top: 25px<br>@media (min-width: 1200px): margin-top: 0 | `.si-portfolio-account-row .col--over-ten-digit-account-value` |
| `.col--over-thirty-four-digit-row-value` | margin-top: 25px<br>@media (min-width: 992px): margin-top: 25px | `.si-portfolio-account-row .col--over-thirty-four-digit-row-value` |
| `.col-1` | flex: 0 0 auto; width: 8.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 8.33333333% | `.col-1` |
| `.col-2` | flex: 0 0 auto; width: 16.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 16.66666667% | `.col-2` |
| `.col-3` | flex: 0 0 auto; width: 25%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 25% | `.col-3` |
| `.col-4` | flex: 0 0 auto; width: 33.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 33.33333333% | `.col-4` |
| `.col-5` | flex: 0 0 auto; width: 41.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 41.66666667% | `.col-5` |
| `.col-6` | flex: 0 0 auto; width: 50%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 50% | `.col-6` |
| `.col-7` | flex: 0 0 auto; width: 58.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 58.33333333% | `.col-7` |
| `.col-8` | flex: 0 0 auto; width: 66.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 66.66666667% | `.col-8` |
| `.col-9` | flex: 0 0 auto; width: 75%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 75% | `.col-9` |
| `.col-10` | flex: 0 0 auto; width: 83.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 83.33333333% | `.col-10` |
| `.col-11` | flex: 0 0 auto; width: 91.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 91.66666667% | `.col-11` |
| `.col-12` | flex: 0 0 auto; width: 100%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 100% | `.col-12` |
| `.col-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 1200px): flex: 0 0 auto; width: auto | `.col-auto` |
| `.col-form-label` | padding-top: calc(0.375rem + 1px); padding-bottom: calc(0.375rem + 1px); margin-bottom: 0; font-size: inherit; line-height: 1.5<br>@media (max-width: 1199.98px): padding-top: calc(0.375rem + 1px); padding-bottom: calc(0.375rem + 1px); margin-bottom: 0; font-size: inherit; line-height: 1.5 | `.col-form-label` |
| `.col-form-label-lg` | padding-top: calc(0.5rem + 1px); padding-bottom: calc(0.5rem + 1px); font-size: 1.25rem<br>@media (max-width: 1199.98px): padding-top: calc(0.5rem + 1px); padding-bottom: calc(0.5rem + 1px); font-size: 1.25rem | `.col-form-label-lg` |
| `.col-form-label-sm` | padding-top: calc(0.25rem + 1px); padding-bottom: calc(0.25rem + 1px); font-size: 0.875rem<br>@media (max-width: 1199.98px): padding-top: calc(0.25rem + 1px); padding-bottom: calc(0.25rem + 1px); font-size: 0.875rem | `.col-form-label-sm` |
| `.col-lg` | flex: 1 0 0%<br>@media (min-width: 1200px): flex: 1 0 0% | `.col-lg` |
| `.col-lg-1` | flex: 0 0 auto; width: 8.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 8.33333333% | `.col-lg-1` |
| `.col-lg-2` | flex: 0 0 auto; width: 16.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 16.66666667% | `.col-lg-2` |
| `.col-lg-3` | flex: 0 0 auto; width: 25%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 25% | `.col-lg-3` |
| `.col-lg-4` | flex: 0 0 auto; width: 33.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 33.33333333% | `.col-lg-4` |
| `.col-lg-5` | flex: 0 0 auto; width: 41.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 41.66666667% | `.col-lg-5` |
| `.col-lg-6` | flex: 0 0 auto; width: 50%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 50% | `.col-lg-6` |
| `.col-lg-7` | flex: 0 0 auto; width: 58.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 58.33333333% | `.col-lg-7` |
| `.col-lg-8` | flex: 0 0 auto; width: 66.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 66.66666667% | `.col-lg-8` |
| `.col-lg-9` | flex: 0 0 auto; width: 75%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 75% | `.col-lg-9` |
| `.col-lg-10` | flex: 0 0 auto; width: 83.33333333%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 83.33333333% | `.col-lg-10` |
| `.col-lg-11` | flex: 0 0 auto; width: 91.66666667%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 91.66666667% | `.col-lg-11` |
| `.col-lg-12` | flex: 0 0 auto; width: 100%<br>@media (min-width: 1200px): flex: 0 0 auto; width: 100% | `.col-lg-12` |
| `.col-lg-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 1200px): flex: 0 0 auto; width: auto | `.col-lg-auto` |
| `.col-md` | flex: 1 0 0%<br>@media (min-width: 992px): flex: 1 0 0% | `.col-md` |
| `.col-md-1` | flex: 0 0 auto; width: 8.33333333%<br>@media (min-width: 992px): flex: 0 0 auto; width: 8.33333333% | `.col-md-1` |
| `.col-md-2` | flex: 0 0 auto; width: 16.66666667%<br>@media (min-width: 992px): flex: 0 0 auto; width: 16.66666667% | `.col-md-2` |
| `.col-md-3` | flex: 0 0 auto; width: 25%<br>@media (min-width: 992px): flex: 0 0 auto; width: 25% | `.col-md-3` |
| `.col-md-4` | flex: 0 0 auto; width: 33.33333333%<br>@media (min-width: 992px): flex: 0 0 auto; width: 33.33333333% | `.col-md-4` |
| `.col-md-5` | flex: 0 0 auto; width: 41.66666667%<br>@media (min-width: 992px): flex: 0 0 auto; width: 41.66666667% | `.col-md-5` |
| `.col-md-6` | flex: 0 0 auto; width: 50%<br>@media (min-width: 992px): flex: 0 0 auto; width: 50% | `.col-md-6` |
| `.col-md-7` | flex: 0 0 auto; width: 58.33333333%<br>@media (min-width: 992px): flex: 0 0 auto; width: 58.33333333% | `.col-md-7` |
| `.col-md-8` | flex: 0 0 auto; width: 66.66666667%<br>@media (min-width: 992px): flex: 0 0 auto; width: 66.66666667% | `.col-md-8` |
| `.col-md-9` | flex: 0 0 auto; width: 75%<br>@media (min-width: 992px): flex: 0 0 auto; width: 75% | `.col-md-9` |
| `.col-md-10` | flex: 0 0 auto; width: 83.33333333%<br>@media (min-width: 992px): flex: 0 0 auto; width: 83.33333333% | `.col-md-10` |
| `.col-md-11` | flex: 0 0 auto; width: 91.66666667%<br>@media (min-width: 992px): flex: 0 0 auto; width: 91.66666667% | `.col-md-11` |
| `.col-md-12` | flex: 0 0 auto; width: 100%<br>@media (min-width: 992px): flex: 0 0 auto; width: 100% | `.col-md-12` |
| `.col-md-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 992px): flex: 0 0 auto; width: auto | `.col-md-auto` |
| `.col-sm` | flex: 1 0 0%<br>@media (min-width: 768px): flex: 1 0 0% | `.col-sm` |
| `.col-sm-1` | flex: 0 0 auto; width: 8.33333333%<br>@media (min-width: 768px): flex: 0 0 auto; width: 8.33333333% | `.col-sm-1` |
| `.col-sm-2` | flex: 0 0 auto; width: 16.66666667%<br>@media (min-width: 768px): flex: 0 0 auto; width: 16.66666667% | `.col-sm-2` |
| `.col-sm-3` | flex: 0 0 auto; width: 25%<br>@media (min-width: 768px): flex: 0 0 auto; width: 25% | `.col-sm-3` |
| `.col-sm-4` | flex: 0 0 auto; width: 33.33333333%<br>@media (min-width: 768px): flex: 0 0 auto; width: 33.33333333% | `.col-sm-4` |
| `.col-sm-5` | flex: 0 0 auto; width: 41.66666667%<br>@media (min-width: 768px): flex: 0 0 auto; width: 41.66666667% | `.col-sm-5` |
| `.col-sm-6` | flex: 0 0 auto; width: 50%<br>@media (min-width: 768px): flex: 0 0 auto; width: 50% | `.col-sm-6` |
| `.col-sm-7` | flex: 0 0 auto; width: 58.33333333%<br>@media (min-width: 768px): flex: 0 0 auto; width: 58.33333333% | `.col-sm-7` |
| `.col-sm-8` | flex: 0 0 auto; width: 66.66666667%<br>@media (min-width: 768px): flex: 0 0 auto; width: 66.66666667% | `.col-sm-8` |
| `.col-sm-9` | flex: 0 0 auto; width: 75%<br>@media (min-width: 768px): flex: 0 0 auto; width: 75% | `.col-sm-9` |
| `.col-sm-10` | flex: 0 0 auto; width: 83.33333333%<br>@media (min-width: 768px): flex: 0 0 auto; width: 83.33333333% | `.col-sm-10` |
| `.col-sm-11` | flex: 0 0 auto; width: 91.66666667%<br>@media (min-width: 768px): flex: 0 0 auto; width: 91.66666667% | `.col-sm-11` |
| `.col-sm-12` | flex: 0 0 auto; width: 100%<br>@media (min-width: 768px): flex: 0 0 auto; width: 100% | `.col-sm-12` |
| `.col-sm-auto` | flex: 0 0 auto; width: auto<br>@media (min-width: 768px): flex: 0 0 auto; width: auto | `.col-sm-auto` |

### Grid: offsets/order (79)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.offset-1` | margin-left: 8.33333333%<br>@media (min-width: 1200px): margin-left: 8.33333333% | `.offset-1` |
| `.offset-2` | margin-left: 16.66666667%<br>@media (min-width: 1200px): margin-left: 16.66666667% | `.offset-2` |
| `.offset-3` | margin-left: 25%<br>@media (min-width: 1200px): margin-left: 25% | `.offset-3` |
| `.offset-4` | margin-left: 33.33333333%<br>@media (min-width: 1200px): margin-left: 33.33333333% | `.offset-4` |
| `.offset-5` | margin-left: 41.66666667%<br>@media (min-width: 1200px): margin-left: 41.66666667% | `.offset-5` |
| `.offset-6` | margin-left: 50%<br>@media (min-width: 1200px): margin-left: 50% | `.offset-6` |
| `.offset-7` | margin-left: 58.33333333%<br>@media (min-width: 1200px): margin-left: 58.33333333% | `.offset-7` |
| `.offset-8` | margin-left: 66.66666667%<br>@media (min-width: 1200px): margin-left: 66.66666667% | `.offset-8` |
| `.offset-9` | margin-left: 75%<br>@media (min-width: 1200px): margin-left: 75% | `.offset-9` |
| `.offset-10` | margin-left: 83.33333333%<br>@media (min-width: 1200px): margin-left: 83.33333333% | `.offset-10` |
| `.offset-11` | margin-left: 91.66666667%<br>@media (min-width: 1200px): margin-left: 91.66666667% | `.offset-11` |
| `.offset-lg-0` | margin-left: 0<br>@media (min-width: 1200px): margin-left: 0 | `.offset-lg-0` |
| `.offset-lg-1` | margin-left: 8.33333333%<br>@media (min-width: 1200px): margin-left: 8.33333333% | `.offset-lg-1` |
| `.offset-lg-2` | margin-left: 16.66666667%<br>@media (min-width: 1200px): margin-left: 16.66666667% | `.offset-lg-2` |
| `.offset-lg-3` | margin-left: 25%<br>@media (min-width: 1200px): margin-left: 25% | `.offset-lg-3` |
| `.offset-lg-4` | margin-left: 33.33333333%<br>@media (min-width: 1200px): margin-left: 33.33333333% | `.offset-lg-4` |
| `.offset-lg-5` | margin-left: 41.66666667%<br>@media (min-width: 1200px): margin-left: 41.66666667% | `.offset-lg-5` |
| `.offset-lg-6` | margin-left: 50%<br>@media (min-width: 1200px): margin-left: 50% | `.offset-lg-6` |
| `.offset-lg-7` | margin-left: 58.33333333%<br>@media (min-width: 1200px): margin-left: 58.33333333% | `.offset-lg-7` |
| `.offset-lg-8` | margin-left: 66.66666667%<br>@media (min-width: 1200px): margin-left: 66.66666667% | `.offset-lg-8` |
| `.offset-lg-9` | margin-left: 75%<br>@media (min-width: 1200px): margin-left: 75% | `.offset-lg-9` |
| `.offset-lg-10` | margin-left: 83.33333333%<br>@media (min-width: 1200px): margin-left: 83.33333333% | `.offset-lg-10` |
| `.offset-lg-11` | margin-left: 91.66666667%<br>@media (min-width: 1200px): margin-left: 91.66666667% | `.offset-lg-11` |
| `.offset-md-0` | margin-left: 0<br>@media (min-width: 992px): margin-left: 0 | `.offset-md-0` |
| `.offset-md-1` | margin-left: 8.33333333%<br>@media (min-width: 992px): margin-left: 8.33333333% | `.offset-md-1` |
| `.offset-md-2` | margin-left: 16.66666667%<br>@media (min-width: 992px): margin-left: 16.66666667% | `.offset-md-2` |
| `.offset-md-3` | margin-left: 25%<br>@media (min-width: 992px): margin-left: 25% | `.offset-md-3` |
| `.offset-md-4` | margin-left: 33.33333333%<br>@media (min-width: 992px): margin-left: 33.33333333% | `.offset-md-4` |
| `.offset-md-5` | margin-left: 41.66666667%<br>@media (min-width: 992px): margin-left: 41.66666667% | `.offset-md-5` |
| `.offset-md-6` | margin-left: 50%<br>@media (min-width: 992px): margin-left: 50% | `.offset-md-6` |
| `.offset-md-7` | margin-left: 58.33333333%<br>@media (min-width: 992px): margin-left: 58.33333333% | `.offset-md-7` |
| `.offset-md-8` | margin-left: 66.66666667%<br>@media (min-width: 992px): margin-left: 66.66666667% | `.offset-md-8` |
| `.offset-md-9` | margin-left: 75%<br>@media (min-width: 992px): margin-left: 75% | `.offset-md-9` |
| `.offset-md-10` | margin-left: 83.33333333%<br>@media (min-width: 992px): margin-left: 83.33333333% | `.offset-md-10` |
| `.offset-md-11` | margin-left: 91.66666667%<br>@media (min-width: 992px): margin-left: 91.66666667% | `.offset-md-11` |
| `.offset-sm-0` | margin-left: 0<br>@media (min-width: 768px): margin-left: 0 | `.offset-sm-0` |
| `.offset-sm-1` | margin-left: 8.33333333%<br>@media (min-width: 768px): margin-left: 8.33333333% | `.offset-sm-1` |
| `.offset-sm-2` | margin-left: 16.66666667%<br>@media (min-width: 768px): margin-left: 16.66666667% | `.offset-sm-2` |
| `.offset-sm-3` | margin-left: 25%<br>@media (min-width: 768px): margin-left: 25% | `.offset-sm-3` |
| `.offset-sm-4` | margin-left: 33.33333333%<br>@media (min-width: 768px): margin-left: 33.33333333% | `.offset-sm-4` |
| `.offset-sm-5` | margin-left: 41.66666667%<br>@media (min-width: 768px): margin-left: 41.66666667% | `.offset-sm-5` |
| `.offset-sm-6` | margin-left: 50%<br>@media (min-width: 768px): margin-left: 50% | `.offset-sm-6` |
| `.offset-sm-7` | margin-left: 58.33333333%<br>@media (min-width: 768px): margin-left: 58.33333333% | `.offset-sm-7` |
| `.offset-sm-8` | margin-left: 66.66666667%<br>@media (min-width: 768px): margin-left: 66.66666667% | `.offset-sm-8` |
| `.offset-sm-9` | margin-left: 75%<br>@media (min-width: 768px): margin-left: 75% | `.offset-sm-9` |
| `.offset-sm-10` | margin-left: 83.33333333%<br>@media (min-width: 768px): margin-left: 83.33333333% | `.offset-sm-10` |
| `.offset-sm-11` | margin-left: 91.66666667%<br>@media (min-width: 768px): margin-left: 91.66666667% | `.offset-sm-11` |
| `.order-0` | order: 0 !important<br>@media (min-width: 1200px): order: 0 !important | `.order-0` |
| `.order-1` | order: 1 !important<br>@media (min-width: 1200px): order: 1 !important | `.order-1` |
| `.order-2` | order: 2 !important<br>@media (min-width: 1200px): order: 2 !important | `.order-2` |
| `.order-3` | order: 3 !important<br>@media (min-width: 1200px): order: 3 !important | `.order-3` |
| `.order-4` | order: 4 !important<br>@media (min-width: 1200px): order: 4 !important | `.order-4` |
| `.order-5` | order: 5 !important<br>@media (min-width: 1200px): order: 5 !important | `.order-5` |
| `.order-first` | order: -1 !important<br>@media (min-width: 1200px): order: -1 !important | `.order-first` |
| `.order-last` | order: 6 !important<br>@media (min-width: 1200px): order: 6 !important | `.order-last` |
| `.order-lg-0` | order: 0 !important<br>@media (min-width: 1200px): order: 0 !important | `.order-lg-0` |
| `.order-lg-1` | order: 1 !important<br>@media (min-width: 1200px): order: 1 !important | `.order-lg-1` |
| `.order-lg-2` | order: 2 !important<br>@media (min-width: 1200px): order: 2 !important | `.order-lg-2` |
| `.order-lg-3` | order: 3 !important<br>@media (min-width: 1200px): order: 3 !important | `.order-lg-3` |
| `.order-lg-4` | order: 4 !important<br>@media (min-width: 1200px): order: 4 !important | `.order-lg-4` |
| `.order-lg-5` | order: 5 !important<br>@media (min-width: 1200px): order: 5 !important | `.order-lg-5` |
| `.order-lg-first` | order: -1 !important<br>@media (min-width: 1200px): order: -1 !important | `.order-lg-first` |
| `.order-lg-last` | order: 6 !important<br>@media (min-width: 1200px): order: 6 !important | `.order-lg-last` |
| `.order-md-0` | order: 0 !important<br>@media (min-width: 992px): order: 0 !important | `.order-md-0` |
| `.order-md-1` | order: 1 !important<br>@media (min-width: 992px): order: 1 !important | `.order-md-1` |
| `.order-md-2` | order: 2 !important<br>@media (min-width: 992px): order: 2 !important | `.order-md-2` |
| `.order-md-3` | order: 3 !important<br>@media (min-width: 992px): order: 3 !important | `.order-md-3` |
| `.order-md-4` | order: 4 !important<br>@media (min-width: 992px): order: 4 !important | `.order-md-4` |
| `.order-md-5` | order: 5 !important<br>@media (min-width: 992px): order: 5 !important | `.order-md-5` |
| `.order-md-first` | order: -1 !important<br>@media (min-width: 992px): order: -1 !important | `.order-md-first` |
| `.order-md-last` | order: 6 !important<br>@media (min-width: 992px): order: 6 !important | `.order-md-last` |
| `.order-sm-0` | order: 0 !important<br>@media (min-width: 768px): order: 0 !important | `.order-sm-0` |
| `.order-sm-1` | order: 1 !important<br>@media (min-width: 768px): order: 1 !important | `.order-sm-1` |
| `.order-sm-2` | order: 2 !important<br>@media (min-width: 768px): order: 2 !important | `.order-sm-2` |
| `.order-sm-3` | order: 3 !important<br>@media (min-width: 768px): order: 3 !important | `.order-sm-3` |
| `.order-sm-4` | order: 4 !important<br>@media (min-width: 768px): order: 4 !important | `.order-sm-4` |
| `.order-sm-5` | order: 5 !important<br>@media (min-width: 768px): order: 5 !important | `.order-sm-5` |
| `.order-sm-first` | order: -1 !important<br>@media (min-width: 768px): order: -1 !important | `.order-sm-first` |
| `.order-sm-last` | order: 6 !important<br>@media (min-width: 768px): order: 6 !important | `.order-sm-last` |

### Width/choke (35)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.choke-100` | max-width: 6.25rem<br>@media (max-width: 991px): max-width: 6.25rem | `.choke-100` |
| `.choke-200` | max-width: 12.5rem<br>@media (max-width: 991px): max-width: 12.5rem | `.choke-200` |
| `.choke-300` | max-width: 18.75rem<br>@media (max-width: 991px): max-width: 18.75rem | `.choke-300` |
| `.choke-400` | max-width: 25rem<br>@media (max-width: 991px): max-width: 25rem | `.choke-400` |
| `.choke-500` | max-width: 31.25rem<br>@media (max-width: 991px): max-width: 31.25rem | `.choke-500` |
| `.choke-600` | max-width: 37.5rem<br>@media (max-width: 991px): max-width: 37.5rem | `.choke-600` |
| `.choke-700` | max-width: 43.75rem<br>@media (max-width: 991px): max-width: 43.75rem | `.choke-700` |
| `.choke-800` | max-width: 50rem<br>@media (max-width: 991px): max-width: 50rem | `.choke-800` |
| `.choke-900` | max-width: 56.25rem<br>@media (max-width: 991px): max-width: 56.25rem | `.choke-900` |
| `.choke-1000` | max-width: 62.5rem<br>@media (max-width: 991px): max-width: 62.5rem | `.choke-1000` |
| `.choke-1100` | max-width: 68.75rem<br>@media (max-width: 991px): max-width: 68.75rem | `.choke-1100` |
| `.choke-1200` | max-width: 75rem<br>@media (max-width: 991px): max-width: 75rem | `.choke-1200` |
| `.choke-1300` | max-width: 81.25rem<br>@media (max-width: 991px): max-width: 81.25rem | `.choke-1300` |
| `.h-0` | height: 0<br>@media (max-width: 991px): height: 0 | `.h-0` |
| `.h-25` | height: 25% !important<br>@media (min-width: 1200px): height: 25% !important | `.h-25` |
| `.h-50` | height: 50% !important<br>@media (min-width: 1200px): height: 50% !important | `.h-50` |
| `.h-75` | height: 75% !important<br>@media (min-width: 1200px): height: 75% !important | `.h-75` |
| `.h-100` | height: 100% !important / 100%<br>@media (min-width: 1200px): height: 100% !important<br>@media (max-width: 991px): height: 100% | `.h-100` |
| `.h-auto` | height: auto !important<br>@media (min-width: 1200px): height: auto !important | `.h-auto` |
| `.h-full` | height: 100vh<br>@media (max-width: 991px): height: 100vh | `.h-full` |
| `.mh-100` | max-height: 100% !important<br>@media (min-width: 1200px): max-height: 100% !important | `.mh-100` |
| `.min-vw-100` | min-width: 100vw !important<br>@media (min-width: 1200px): min-width: 100vw !important | `.min-vw-100` |
| `.mw-100` | max-width: 100% !important<br>@media (min-width: 1200px): max-width: 100% !important | `.mw-100` |
| `.text-choke--640` | max-width: 640px<br>@media (max-width: 767px): max-width: 640px | `.text-choke--640` |
| `.text-choke--960` | max-width: 960px<br>@media (max-width: 767px): max-width: 960px | `.text-choke--960` |
| `.text-choke-md--640` | max-width: 640px<br>@media (min-width: 992px): max-width: 640px | `.text-choke-md--640` |
| `.text-choke-md--960` | max-width: 960px<br>@media (min-width: 992px): max-width: 960px | `.text-choke-md--960` |
| `.vw-100` | width: 100vw !important<br>@media (min-width: 1200px): width: 100vw !important | `.vw-100` |
| `.w-0` | width: 0<br>@media (max-width: 991px): width: 0 | `.w-0` |
| `.w-25` | width: 25% !important<br>@media (min-width: 1200px): width: 25% !important | `.w-25` |
| `.w-50` | width: 50% !important<br>@media (min-width: 1200px): width: 50% !important | `.w-50` |
| `.w-75` | width: 75% !important<br>@media (min-width: 1200px): width: 75% !important | `.w-75` |
| `.w-100` | width: 100% !important / 100%<br>@media (min-width: 1200px): width: 100% !important<br>@media (max-width: 991px): width: 100% | `.w-100` |
| `.w-auto` | width: auto !important<br>@media (min-width: 1200px): width: auto !important | `.w-auto` |
| `.w-full` | width: 100vw<br>@media (max-width: 991px): width: 100vw | `.w-full` |

### Spacing: padding (122)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.p-0` | padding: 0 !important<br>@media (min-width: 1200px): padding: 0 !important | `.p-0` |
| `.p-1` | padding: .25rem !important<br>@media (min-width: 1200px): padding: .25rem !important | `.p-1` |
| `.p-2` | padding: .5rem !important<br>@media (min-width: 1200px): padding: .5rem !important | `.p-2` |
| `.p-3` | padding: 1rem !important<br>@media (min-width: 1200px): padding: 1rem !important | `.p-3` |
| `.p-4` | padding: 1.5rem !important<br>@media (min-width: 1200px): padding: 1.5rem !important | `.p-4` |
| `.p-5` | padding: 3rem !important<br>@media (min-width: 1200px): padding: 3rem !important | `.p-5` |
| `.p-all-spacer-0` | padding: 0<br>@media (min-width: 768px): padding: 0 | `.p-all-spacer-0` |
| `.p-all-spacer-2xl` | padding: 4.2rem / 6rem<br>@media (min-width: 768px): padding: 4.2rem / 6rem | `.p-all-spacer-2xl` |
| `.p-all-spacer-2xs` | padding: .7rem / 1rem<br>@media (min-width: 768px): padding: .7rem / 1rem | `.p-all-spacer-2xs` |
| `.p-all-spacer-3xs` | padding: .35rem / .5rem<br>@media (min-width: 768px): padding: .35rem / .5rem | `.p-all-spacer-3xs` |
| `.p-all-spacer-4xl` | padding: 5.6rem / 8rem<br>@media (min-width: 768px): padding: 5.6rem / 8rem | `.p-all-spacer-4xl` |
| `.p-all-spacer-4xs` | padding: .175rem / .25rem<br>@media (min-width: 768px): padding: .175rem / .25rem | `.p-all-spacer-4xs` |
| `.p-all-spacer-5xs` | padding: .0875rem / .125rem<br>@media (min-width: 768px): padding: .0875rem / .125rem | `.p-all-spacer-5xs` |
| `.p-all-spacer-6xl` | padding: 11.2rem / 16rem<br>@media (min-width: 768px): padding: 11.2rem / 16rem | `.p-all-spacer-6xl` |
| `.p-all-spacer-8xl` | padding: 11.2rem / 16rem<br>@media (min-width: 768px): padding: 11.2rem / 16rem | `.p-all-spacer-8xl` |
| `.p-all-spacer-lg` | padding: 2.8rem / 4rem<br>@media (min-width: 768px): padding: 2.8rem / 4rem | `.p-all-spacer-lg` |
| `.p-all-spacer-md` | padding: 2.1rem / 3rem<br>@media (min-width: 768px): padding: 2.1rem / 3rem | `.p-all-spacer-md` |
| `.p-all-spacer-sm` | padding: 1.4rem / 2rem<br>@media (min-width: 768px): padding: 1.4rem / 2rem | `.p-all-spacer-sm` |
| `.p-all-spacer-xl` | padding: 3.5rem / 5rem<br>@media (min-width: 768px): padding: 3.5rem / 5rem | `.p-all-spacer-xl` |
| `.p-all-spacer-xs` | padding: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding: 1.05rem / 1.5rem | `.p-all-spacer-xs` |
| `.p-b-spacer-0` | padding-bottom: 0<br>@media (min-width: 768px): padding-bottom: 0 | `.p-b-spacer-0` |
| `.p-b-spacer-2xl` | padding-bottom: 4.2rem / 6rem<br>@media (min-width: 768px): padding-bottom: 4.2rem / 6rem | `.p-b-spacer-2xl` |
| `.p-b-spacer-2xs` | padding-bottom: .7rem / 1rem<br>@media (min-width: 768px): padding-bottom: .7rem / 1rem | `.p-b-spacer-2xs` |
| `.p-b-spacer-3xs` | padding-bottom: .35rem / .5rem<br>@media (min-width: 768px): padding-bottom: .35rem / .5rem | `.p-b-spacer-3xs` |
| `.p-b-spacer-4xl` | padding-bottom: 5.6rem / 8rem<br>@media (min-width: 768px): padding-bottom: 5.6rem / 8rem | `.p-b-spacer-4xl` |
| `.p-b-spacer-4xs` | padding-bottom: .175rem / .25rem<br>@media (min-width: 768px): padding-bottom: .175rem / .25rem | `.p-b-spacer-4xs` |
| `.p-b-spacer-5xs` | padding-bottom: .0875rem / .125rem<br>@media (min-width: 768px): padding-bottom: .0875rem / .125rem | `.p-b-spacer-5xs` |
| `.p-b-spacer-6xl` | padding-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): padding-bottom: 11.2rem / 16rem | `.p-b-spacer-6xl` |
| `.p-b-spacer-8xl` | padding-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): padding-bottom: 11.2rem / 16rem | `.p-b-spacer-8xl` |
| `.p-b-spacer-lg` | padding-bottom: 2.8rem / 4rem<br>@media (min-width: 768px): padding-bottom: 2.8rem / 4rem | `.p-b-spacer-lg` |
| `.p-b-spacer-md` | padding-bottom: 2.1rem / 3rem<br>@media (min-width: 768px): padding-bottom: 2.1rem / 3rem | `.p-b-spacer-md` |
| `.p-b-spacer-sm` | padding-bottom: 1.4rem / 2rem<br>@media (min-width: 768px): padding-bottom: 1.4rem / 2rem | `.p-b-spacer-sm` |
| `.p-b-spacer-xl` | padding-bottom: 3.5rem / 5rem<br>@media (min-width: 768px): padding-bottom: 3.5rem / 5rem | `.p-b-spacer-xl` |
| `.p-b-spacer-xs` | padding-bottom: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-bottom: 1.05rem / 1.5rem | `.p-b-spacer-xs` |
| `.p-l-spacer-0` | padding-left: 0<br>@media (min-width: 768px): padding-left: 0 | `.p-l-spacer-0` |
| `.p-l-spacer-2xl` | padding-left: 4.2rem / 6rem<br>@media (min-width: 768px): padding-left: 4.2rem / 6rem | `.p-l-spacer-2xl` |
| `.p-l-spacer-2xs` | padding-left: .7rem / 1rem<br>@media (min-width: 768px): padding-left: .7rem / 1rem | `.p-l-spacer-2xs` |
| `.p-l-spacer-3xs` | padding-left: .35rem / .5rem<br>@media (min-width: 768px): padding-left: .35rem / .5rem | `.p-l-spacer-3xs` |
| `.p-l-spacer-4xl` | padding-left: 5.6rem / 8rem<br>@media (min-width: 768px): padding-left: 5.6rem / 8rem | `.p-l-spacer-4xl` |
| `.p-l-spacer-4xs` | padding-left: .175rem / .25rem<br>@media (min-width: 768px): padding-left: .175rem / .25rem | `.p-l-spacer-4xs` |
| `.p-l-spacer-5xs` | padding-left: .0875rem / .125rem<br>@media (min-width: 768px): padding-left: .0875rem / .125rem | `.p-l-spacer-5xs` |
| `.p-l-spacer-6xl` | padding-left: 11.2rem / 16rem<br>@media (min-width: 768px): padding-left: 11.2rem / 16rem | `.p-l-spacer-6xl` |
| `.p-l-spacer-8xl` | padding-left: 11.2rem / 16rem<br>@media (min-width: 768px): padding-left: 11.2rem / 16rem | `.p-l-spacer-8xl` |
| `.p-l-spacer-lg` | padding-left: 2.8rem / 4rem<br>@media (min-width: 768px): padding-left: 2.8rem / 4rem | `.p-l-spacer-lg` |
| `.p-l-spacer-md` | padding-left: 2.1rem / 3rem<br>@media (min-width: 768px): padding-left: 2.1rem / 3rem | `.p-l-spacer-md` |
| `.p-l-spacer-sm` | padding-left: 1.4rem / 2rem<br>@media (min-width: 768px): padding-left: 1.4rem / 2rem | `.p-l-spacer-sm` |
| `.p-l-spacer-xl` | padding-left: 3.5rem / 5rem<br>@media (min-width: 768px): padding-left: 3.5rem / 5rem | `.p-l-spacer-xl` |
| `.p-l-spacer-xs` | padding-left: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-left: 1.05rem / 1.5rem | `.p-l-spacer-xs` |
| `.p-lg-0` | padding: 0 !important<br>@media (min-width: 1200px): padding: 0 !important | `.p-lg-0` |
| `.p-lg-1` | padding: .25rem !important<br>@media (min-width: 1200px): padding: .25rem !important | `.p-lg-1` |
| `.p-lg-2` | padding: .5rem !important<br>@media (min-width: 1200px): padding: .5rem !important | `.p-lg-2` |
| `.p-lg-3` | padding: 1rem !important<br>@media (min-width: 1200px): padding: 1rem !important | `.p-lg-3` |
| `.p-lg-4` | padding: 1.5rem !important<br>@media (min-width: 1200px): padding: 1.5rem !important | `.p-lg-4` |
| `.p-lg-5` | padding: 3rem !important<br>@media (min-width: 1200px): padding: 3rem !important | `.p-lg-5` |
| `.p-md-0` | padding: 0 !important<br>@media (min-width: 992px): padding: 0 !important | `.p-md-0` |
| `.p-md-1` | padding: .25rem !important<br>@media (min-width: 992px): padding: .25rem !important | `.p-md-1` |
| `.p-md-2` | padding: .5rem !important<br>@media (min-width: 992px): padding: .5rem !important | `.p-md-2` |
| `.p-md-3` | padding: 1rem !important<br>@media (min-width: 992px): padding: 1rem !important | `.p-md-3` |
| `.p-md-4` | padding: 1.5rem !important<br>@media (min-width: 992px): padding: 1.5rem !important | `.p-md-4` |
| `.p-md-5` | padding: 3rem !important<br>@media (min-width: 992px): padding: 3rem !important | `.p-md-5` |
| `.p-r-spacer-0` | padding-right: 0<br>@media (min-width: 768px): padding-right: 0 | `.p-r-spacer-0` |
| `.p-r-spacer-2xl` | padding-right: 4.2rem / 6rem<br>@media (min-width: 768px): padding-right: 4.2rem / 6rem | `.p-r-spacer-2xl` |
| `.p-r-spacer-2xs` | padding-right: .7rem / 1rem<br>@media (min-width: 768px): padding-right: .7rem / 1rem | `.p-r-spacer-2xs` |
| `.p-r-spacer-3xs` | padding-right: .35rem / .5rem<br>@media (min-width: 768px): padding-right: .35rem / .5rem | `.p-r-spacer-3xs` |
| `.p-r-spacer-4xl` | padding-right: 5.6rem / 8rem<br>@media (min-width: 768px): padding-right: 5.6rem / 8rem | `.p-r-spacer-4xl` |
| `.p-r-spacer-4xs` | padding-right: .175rem / .25rem<br>@media (min-width: 768px): padding-right: .175rem / .25rem | `.p-r-spacer-4xs` |
| `.p-r-spacer-5xs` | padding-right: .0875rem / .125rem<br>@media (min-width: 768px): padding-right: .0875rem / .125rem | `.p-r-spacer-5xs` |
| `.p-r-spacer-6xl` | padding-right: 11.2rem / 16rem<br>@media (min-width: 768px): padding-right: 11.2rem / 16rem | `.p-r-spacer-6xl` |
| `.p-r-spacer-8xl` | padding-right: 11.2rem / 16rem<br>@media (min-width: 768px): padding-right: 11.2rem / 16rem | `.p-r-spacer-8xl` |
| `.p-r-spacer-lg` | padding-right: 2.8rem / 4rem<br>@media (min-width: 768px): padding-right: 2.8rem / 4rem | `.p-r-spacer-lg` |
| `.p-r-spacer-md` | padding-right: 2.1rem / 3rem<br>@media (min-width: 768px): padding-right: 2.1rem / 3rem | `.p-r-spacer-md` |
| `.p-r-spacer-sm` | padding-right: 1.4rem / 2rem<br>@media (min-width: 768px): padding-right: 1.4rem / 2rem | `.p-r-spacer-sm` |
| `.p-r-spacer-xl` | padding-right: 3.5rem / 5rem<br>@media (min-width: 768px): padding-right: 3.5rem / 5rem | `.p-r-spacer-xl` |
| `.p-r-spacer-xs` | padding-right: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-right: 1.05rem / 1.5rem | `.p-r-spacer-xs` |
| `.p-sm-0` | padding: 0 !important<br>@media (min-width: 768px): padding: 0 !important | `.p-sm-0` |
| `.p-sm-1` | padding: .25rem !important<br>@media (min-width: 768px): padding: .25rem !important | `.p-sm-1` |
| `.p-sm-2` | padding: .5rem !important<br>@media (min-width: 768px): padding: .5rem !important | `.p-sm-2` |
| `.p-sm-3` | padding: 1rem !important<br>@media (min-width: 768px): padding: 1rem !important | `.p-sm-3` |
| `.p-sm-4` | padding: 1.5rem !important<br>@media (min-width: 768px): padding: 1.5rem !important | `.p-sm-4` |
| `.p-sm-5` | padding: 3rem !important<br>@media (min-width: 768px): padding: 3rem !important | `.p-sm-5` |
| `.p-t-spacer-0` | padding-top: 0<br>@media (max-width: 767px): padding-top: 0<br>@media (min-width: 768px): padding-top: 0 | `.p-t-spacer-0` |
| `.p-t-spacer-2xl` | padding-top: 4.2rem / 6rem<br>@media (min-width: 768px): padding-top: 4.2rem / 6rem | `.p-t-spacer-2xl` |
| `.p-t-spacer-2xs` | padding-top: .7rem / 1rem<br>@media (min-width: 768px): padding-top: .7rem / 1rem | `.p-t-spacer-2xs` |
| `.p-t-spacer-3xs` | padding-top: .35rem / .5rem<br>@media (min-width: 768px): padding-top: .35rem / .5rem | `.p-t-spacer-3xs` |
| `.p-t-spacer-4xl` | padding-top: 5.6rem / 8rem<br>@media (min-width: 768px): padding-top: 5.6rem / 8rem | `.p-t-spacer-4xl` |
| `.p-t-spacer-4xs` | padding-top: .175rem / .25rem<br>@media (min-width: 768px): padding-top: .175rem / .25rem | `.p-t-spacer-4xs` |
| `.p-t-spacer-5xs` | padding-top: .0875rem / .125rem<br>@media (min-width: 768px): padding-top: .0875rem / .125rem | `.p-t-spacer-5xs` |
| `.p-t-spacer-6xl` | padding-top: 11.2rem / 16rem<br>@media (min-width: 768px): padding-top: 11.2rem / 16rem | `.p-t-spacer-6xl` |
| `.p-t-spacer-8xl` | padding-top: 11.2rem / 16rem<br>@media (min-width: 768px): padding-top: 11.2rem / 16rem | `.p-t-spacer-8xl` |
| `.p-t-spacer-lg` | padding-top: 2.8rem / 4rem<br>@media (min-width: 768px): padding-top: 2.8rem / 4rem | `.p-t-spacer-lg` |
| `.p-t-spacer-md` | padding-top: 2.1rem / 3rem<br>@media (min-width: 768px): padding-top: 2.1rem / 3rem | `.p-t-spacer-md` |
| `.p-t-spacer-sm` | padding-top: 1.4rem / 2rem<br>@media (min-width: 768px): padding-top: 1.4rem / 2rem | `.p-t-spacer-sm` |
| `.p-t-spacer-xl` | padding-top: 3.5rem / 5rem<br>@media (min-width: 768px): padding-top: 3.5rem / 5rem | `.p-t-spacer-xl` |
| `.p-t-spacer-xs` | padding-top: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-top: 1.05rem / 1.5rem | `.p-t-spacer-xs` |
| `.p-x-spacer-0` | padding-right: 0; padding-left: 0<br>@media (min-width: 768px): padding-right: 0; padding-left: 0 | `.p-x-spacer-0` |
| `.p-x-spacer-2xl` | padding-right: 4.2rem / 6rem; padding-left: 4.2rem / 6rem<br>@media (min-width: 768px): padding-right: 4.2rem / 6rem; padding-left: 4.2rem / 6rem | `.p-x-spacer-2xl` |
| `.p-x-spacer-2xs` | padding-right: .7rem / 1rem; padding-left: .7rem / 1rem<br>@media (min-width: 768px): padding-right: .7rem / 1rem; padding-left: .7rem / 1rem | `.p-x-spacer-2xs` |
| `.p-x-spacer-3xs` | padding-right: .35rem / .5rem; padding-left: .35rem / .5rem<br>@media (min-width: 768px): padding-right: .35rem / .5rem; padding-left: .35rem / .5rem | `.p-x-spacer-3xs` |
| `.p-x-spacer-4xl` | padding-right: 5.6rem / 8rem; padding-left: 5.6rem / 8rem<br>@media (min-width: 768px): padding-right: 5.6rem / 8rem; padding-left: 5.6rem / 8rem | `.p-x-spacer-4xl` |
| `.p-x-spacer-4xs` | padding-right: .175rem / .25rem; padding-left: .175rem / .25rem<br>@media (min-width: 768px): padding-right: .175rem / .25rem; padding-left: .175rem / .25rem | `.p-x-spacer-4xs` |
| `.p-x-spacer-5xs` | padding-right: .0875rem / .125rem; padding-left: .0875rem / .125rem<br>@media (min-width: 768px): padding-right: .0875rem / .125rem; padding-left: .0875rem / .125rem | `.p-x-spacer-5xs` |
| `.p-x-spacer-6xl` | padding-right: 11.2rem / 16rem; padding-left: 11.2rem / 16rem<br>@media (min-width: 768px): padding-right: 11.2rem / 16rem; padding-left: 11.2rem / 16rem | `.p-x-spacer-6xl` |
| `.p-x-spacer-8xl` | padding-right: 11.2rem / 16rem; padding-left: 11.2rem / 16rem<br>@media (min-width: 768px): padding-right: 11.2rem / 16rem; padding-left: 11.2rem / 16rem | `.p-x-spacer-8xl` |
| `.p-x-spacer-lg` | padding-right: 2.8rem / 4rem; padding-left: 2.8rem / 4rem<br>@media (min-width: 768px): padding-right: 2.8rem / 4rem; padding-left: 2.8rem / 4rem | `.p-x-spacer-lg` |
| `.p-x-spacer-md` | padding-right: 2.1rem / 3rem; padding-left: 2.1rem / 3rem<br>@media (min-width: 768px): padding-right: 2.1rem / 3rem; padding-left: 2.1rem / 3rem | `.p-x-spacer-md` |
| `.p-x-spacer-sm` | padding-right: 1.4rem / 2rem; padding-left: 1.4rem / 2rem<br>@media (min-width: 768px): padding-right: 1.4rem / 2rem; padding-left: 1.4rem / 2rem | `.p-x-spacer-sm` |
| `.p-x-spacer-xl` | padding-right: 3.5rem / 5rem; padding-left: 3.5rem / 5rem<br>@media (min-width: 768px): padding-right: 3.5rem / 5rem; padding-left: 3.5rem / 5rem | `.p-x-spacer-xl` |
| `.p-x-spacer-xs` | padding-right: 1.05rem / 1.5rem; padding-left: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-right: 1.05rem / 1.5rem; padding-left: 1.05rem / 1.5rem | `.p-x-spacer-xs` |
| `.p-y-spacer-0` | padding-top: 0; padding-bottom: 0<br>@media (min-width: 768px): padding-top: 0; padding-bottom: 0 | `.p-y-spacer-0` |
| `.p-y-spacer-2xl` | padding-top: 4.2rem / 6rem; padding-bottom: 4.2rem / 6rem<br>@media (min-width: 768px): padding-top: 4.2rem / 6rem; padding-bottom: 4.2rem / 6rem | `.p-y-spacer-2xl` |
| `.p-y-spacer-2xs` | padding-top: .7rem / 1rem; padding-bottom: .7rem / 1rem<br>@media (min-width: 768px): padding-top: .7rem / 1rem; padding-bottom: .7rem / 1rem | `.p-y-spacer-2xs` |
| `.p-y-spacer-3xs` | padding-top: .35rem / .5rem; padding-bottom: .35rem / .5rem<br>@media (min-width: 768px): padding-top: .35rem / .5rem; padding-bottom: .35rem / .5rem | `.p-y-spacer-3xs` |
| `.p-y-spacer-4xl` | padding-top: 5.6rem / 8rem; padding-bottom: 5.6rem / 8rem<br>@media (min-width: 768px): padding-top: 5.6rem / 8rem; padding-bottom: 5.6rem / 8rem | `.p-y-spacer-4xl` |
| `.p-y-spacer-4xs` | padding-top: .175rem / .25rem; padding-bottom: .175rem / .25rem<br>@media (min-width: 768px): padding-top: .175rem / .25rem; padding-bottom: .175rem / .25rem | `.p-y-spacer-4xs` |
| `.p-y-spacer-5xs` | padding-top: .0875rem / .125rem; padding-bottom: .0875rem / .125rem<br>@media (min-width: 768px): padding-top: .0875rem / .125rem; padding-bottom: .0875rem / .125rem | `.p-y-spacer-5xs` |
| `.p-y-spacer-6xl` | padding-top: 11.2rem / 16rem; padding-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): padding-top: 11.2rem / 16rem; padding-bottom: 11.2rem / 16rem | `.p-y-spacer-6xl` |
| `.p-y-spacer-8xl` | padding-top: 11.2rem / 16rem; padding-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): padding-top: 11.2rem / 16rem; padding-bottom: 11.2rem / 16rem | `.p-y-spacer-8xl` |
| `.p-y-spacer-lg` | padding-top: 2.8rem / 4rem; padding-bottom: 2.8rem / 4rem<br>@media (min-width: 768px): padding-top: 2.8rem / 4rem; padding-bottom: 2.8rem / 4rem | `.p-y-spacer-lg` |
| `.p-y-spacer-md` | padding-top: 2.1rem / 3rem; padding-bottom: 2.1rem / 3rem<br>@media (min-width: 768px): padding-top: 2.1rem / 3rem; padding-bottom: 2.1rem / 3rem | `.p-y-spacer-md` |
| `.p-y-spacer-sm` | padding-top: 1.4rem / 2rem; padding-bottom: 1.4rem / 2rem<br>@media (min-width: 768px): padding-top: 1.4rem / 2rem; padding-bottom: 1.4rem / 2rem | `.p-y-spacer-sm` |
| `.p-y-spacer-xl` | padding-top: 3.5rem / 5rem; padding-bottom: 3.5rem / 5rem<br>@media (min-width: 768px): padding-top: 3.5rem / 5rem; padding-bottom: 3.5rem / 5rem | `.p-y-spacer-xl` |
| `.p-y-spacer-xs` | padding-top: 1.05rem / 1.5rem; padding-bottom: 1.05rem / 1.5rem<br>@media (min-width: 768px): padding-top: 1.05rem / 1.5rem; padding-bottom: 1.05rem / 1.5rem | `.p-y-spacer-xs` |

### Spacing: margin (155)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.m-0` | margin: 0 !important<br>@media (min-width: 1200px): margin: 0 !important | `.m-0` |
| `.m-1` | margin: .25rem !important<br>@media (min-width: 1200px): margin: .25rem !important | `.m-1` |
| `.m-2` | margin: .5rem !important<br>@media (min-width: 1200px): margin: .5rem !important | `.m-2` |
| `.m-3` | margin: 1rem !important<br>@media (min-width: 1200px): margin: 1rem !important | `.m-3` |
| `.m-4` | margin: 1.5rem !important<br>@media (min-width: 1200px): margin: 1.5rem !important | `.m-4` |
| `.m-5` | margin: 3rem !important<br>@media (min-width: 1200px): margin: 3rem !important | `.m-5` |
| `.m-all-spacer-0` | margin: 0<br>@media (min-width: 768px): margin: 0 | `.m-all-spacer-0` |
| `.m-all-spacer-2xl` | margin: 4.2rem / 6rem<br>@media (min-width: 768px): margin: 4.2rem / 6rem | `.m-all-spacer-2xl` |
| `.m-all-spacer-2xs` | margin: .7rem / 1rem<br>@media (min-width: 768px): margin: .7rem / 1rem | `.m-all-spacer-2xs` |
| `.m-all-spacer-3xs` | margin: .35rem / .5rem<br>@media (min-width: 768px): margin: .35rem / .5rem | `.m-all-spacer-3xs` |
| `.m-all-spacer-4xl` | margin: 5.6rem / 8rem<br>@media (min-width: 768px): margin: 5.6rem / 8rem | `.m-all-spacer-4xl` |
| `.m-all-spacer-4xs` | margin: .175rem / .25rem<br>@media (min-width: 768px): margin: .175rem / .25rem | `.m-all-spacer-4xs` |
| `.m-all-spacer-5xs` | margin: .0875rem / .125rem<br>@media (min-width: 768px): margin: .0875rem / .125rem | `.m-all-spacer-5xs` |
| `.m-all-spacer-6xl` | margin: 11.2rem / 16rem<br>@media (min-width: 768px): margin: 11.2rem / 16rem | `.m-all-spacer-6xl` |
| `.m-all-spacer-8xl` | margin: 11.2rem / 16rem<br>@media (min-width: 768px): margin: 11.2rem / 16rem | `.m-all-spacer-8xl` |
| `.m-all-spacer-lg` | margin: 2.8rem / 4rem<br>@media (min-width: 768px): margin: 2.8rem / 4rem | `.m-all-spacer-lg` |
| `.m-all-spacer-md` | margin: 2.1rem / 3rem<br>@media (min-width: 768px): margin: 2.1rem / 3rem | `.m-all-spacer-md` |
| `.m-all-spacer-sm` | margin: 1.4rem / 2rem<br>@media (min-width: 768px): margin: 1.4rem / 2rem | `.m-all-spacer-sm` |
| `.m-all-spacer-xl` | margin: 3.5rem / 5rem<br>@media (min-width: 768px): margin: 3.5rem / 5rem | `.m-all-spacer-xl` |
| `.m-all-spacer-xs` | margin: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin: 1.05rem / 1.5rem | `.m-all-spacer-xs` |
| `.m-auto` | margin: auto !important<br>@media (min-width: 1200px): margin: auto !important | `.m-auto` |
| `.m-b-0--mobile` | margin-bottom: 0 !important<br>@media (max-width: 767px): margin-bottom: 0 !important | `.m-b-0--mobile` |
| `.m-b-spacer-0` | margin-bottom: 0<br>@media (min-width: 768px): margin-bottom: 0 | `.m-b-spacer-0` |
| `.m-b-spacer-2xl` | margin-bottom: 4.2rem / 6rem<br>@media (min-width: 768px): margin-bottom: 4.2rem / 6rem | `.m-b-spacer-2xl` |
| `.m-b-spacer-2xl--mobile` | margin-bottom: 6rem !important<br>@media (max-width: 767px): margin-bottom: 6rem !important | `.m-b-spacer-2xl--mobile` |
| `.m-b-spacer-2xs` | margin-bottom: .7rem / 1rem<br>@media (min-width: 768px): margin-bottom: .7rem / 1rem | `.m-b-spacer-2xs` |
| `.m-b-spacer-2xs--mobile` | margin-bottom: 1rem !important<br>@media (max-width: 767px): margin-bottom: 1rem !important | `.m-b-spacer-2xs--mobile` |
| `.m-b-spacer-3xs` | margin-bottom: .35rem / .5rem<br>@media (min-width: 768px): margin-bottom: .35rem / .5rem | `.m-b-spacer-3xs` |
| `.m-b-spacer-4xl` | margin-bottom: 5.6rem / 8rem<br>@media (min-width: 768px): margin-bottom: 5.6rem / 8rem | `.m-b-spacer-4xl` |
| `.m-b-spacer-4xl--mobile` | margin-bottom: 8rem !important<br>@media (max-width: 767px): margin-bottom: 8rem !important | `.m-b-spacer-4xl--mobile` |
| `.m-b-spacer-4xs` | margin-bottom: .175rem / .25rem<br>@media (min-width: 768px): margin-bottom: .175rem / .25rem | `.m-b-spacer-4xs` |
| `.m-b-spacer-5xs` | margin-bottom: .0875rem / .125rem<br>@media (min-width: 768px): margin-bottom: .0875rem / .125rem | `.m-b-spacer-5xs` |
| `.m-b-spacer-6xl` | margin-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): margin-bottom: 11.2rem / 16rem | `.m-b-spacer-6xl` |
| `.m-b-spacer-6xl--mobile` | margin-bottom: 16rem !important<br>@media (max-width: 767px): margin-bottom: 16rem !important | `.m-b-spacer-6xl--mobile` |
| `.m-b-spacer-8xl` | margin-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): margin-bottom: 11.2rem / 16rem | `.m-b-spacer-8xl` |
| `.m-b-spacer-8xl--mobile` | margin-bottom: 16rem !important<br>@media (max-width: 767px): margin-bottom: 16rem !important | `.m-b-spacer-8xl--mobile` |
| `.m-b-spacer-auto` | margin-bottom: auto<br>@media (min-width: 768px): margin-bottom: auto | `.m-b-spacer-auto` |
| `.m-b-spacer-lg` | margin-bottom: 2.8rem / 4rem<br>@media (min-width: 768px): margin-bottom: 2.8rem / 4rem | `.m-b-spacer-lg` |
| `.m-b-spacer-lg--mobile` | margin-bottom: 4rem !important<br>@media (max-width: 767px): margin-bottom: 4rem !important | `.m-b-spacer-lg--mobile` |
| `.m-b-spacer-md` | margin-bottom: 2.1rem / 3rem<br>@media (min-width: 768px): margin-bottom: 2.1rem / 3rem | `.m-b-spacer-md` |
| `.m-b-spacer-md--mobile` | margin-bottom: 3rem !important<br>@media (max-width: 767px): margin-bottom: 3rem !important | `.m-b-spacer-md--mobile` |
| `.m-b-spacer-sm` | margin-bottom: 1.4rem / 2rem<br>@media (min-width: 768px): margin-bottom: 1.4rem / 2rem | `.m-b-spacer-sm` |
| `.m-b-spacer-sm--mobile` | margin-bottom: 2rem !important<br>@media (max-width: 767px): margin-bottom: 2rem !important | `.m-b-spacer-sm--mobile` |
| `.m-b-spacer-xl` | margin-bottom: 3.5rem / 5rem<br>@media (min-width: 768px): margin-bottom: 3.5rem / 5rem | `.m-b-spacer-xl` |
| `.m-b-spacer-xl--mobile` | margin-bottom: 5rem !important<br>@media (max-width: 767px): margin-bottom: 5rem !important | `.m-b-spacer-xl--mobile` |
| `.m-b-spacer-xs` | margin-bottom: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-bottom: 1.05rem / 1.5rem | `.m-b-spacer-xs` |
| `.m-b-spacer-xs--mobile` | margin-bottom: 1.5rem !important<br>@media (max-width: 767px): margin-bottom: 1.5rem !important | `.m-b-spacer-xs--mobile` |
| `.m-l-spacer-0` | margin-left: 0<br>@media (min-width: 768px): margin-left: 0 | `.m-l-spacer-0` |
| `.m-l-spacer-2xl` | margin-left: 4.2rem / 6rem<br>@media (min-width: 768px): margin-left: 4.2rem / 6rem | `.m-l-spacer-2xl` |
| `.m-l-spacer-2xs` | margin-left: .7rem / 1rem<br>@media (min-width: 768px): margin-left: .7rem / 1rem | `.m-l-spacer-2xs` |
| `.m-l-spacer-3xs` | margin-left: .35rem / .5rem<br>@media (min-width: 768px): margin-left: .35rem / .5rem | `.m-l-spacer-3xs` |
| `.m-l-spacer-4xl` | margin-left: 5.6rem / 8rem<br>@media (min-width: 768px): margin-left: 5.6rem / 8rem | `.m-l-spacer-4xl` |
| `.m-l-spacer-4xs` | margin-left: .175rem / .25rem<br>@media (min-width: 768px): margin-left: .175rem / .25rem | `.m-l-spacer-4xs` |
| `.m-l-spacer-5xs` | margin-left: .0875rem / .125rem<br>@media (min-width: 768px): margin-left: .0875rem / .125rem | `.m-l-spacer-5xs` |
| `.m-l-spacer-6xl` | margin-left: 11.2rem / 16rem<br>@media (min-width: 768px): margin-left: 11.2rem / 16rem | `.m-l-spacer-6xl` |
| `.m-l-spacer-8xl` | margin-left: 11.2rem / 16rem<br>@media (min-width: 768px): margin-left: 11.2rem / 16rem | `.m-l-spacer-8xl` |
| `.m-l-spacer-auto` | margin-left: auto<br>@media (min-width: 768px): margin-left: auto | `.m-l-spacer-auto` |
| `.m-l-spacer-lg` | margin-left: 2.8rem / 4rem<br>@media (min-width: 768px): margin-left: 2.8rem / 4rem | `.m-l-spacer-lg` |
| `.m-l-spacer-md` | margin-left: 2.1rem / 3rem<br>@media (min-width: 768px): margin-left: 2.1rem / 3rem | `.m-l-spacer-md` |
| `.m-l-spacer-sm` | margin-left: 1.4rem / 2rem<br>@media (min-width: 768px): margin-left: 1.4rem / 2rem | `.m-l-spacer-sm` |
| `.m-l-spacer-xl` | margin-left: 3.5rem / 5rem<br>@media (min-width: 768px): margin-left: 3.5rem / 5rem | `.m-l-spacer-xl` |
| `.m-l-spacer-xs` | margin-left: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-left: 1.05rem / 1.5rem | `.m-l-spacer-xs` |
| `.m-lg-0` | margin: 0 !important<br>@media (min-width: 1200px): margin: 0 !important | `.m-lg-0` |
| `.m-lg-1` | margin: .25rem !important<br>@media (min-width: 1200px): margin: .25rem !important | `.m-lg-1` |
| `.m-lg-2` | margin: .5rem !important<br>@media (min-width: 1200px): margin: .5rem !important | `.m-lg-2` |
| `.m-lg-3` | margin: 1rem !important<br>@media (min-width: 1200px): margin: 1rem !important | `.m-lg-3` |
| `.m-lg-4` | margin: 1.5rem !important<br>@media (min-width: 1200px): margin: 1.5rem !important | `.m-lg-4` |
| `.m-lg-5` | margin: 3rem !important<br>@media (min-width: 1200px): margin: 3rem !important | `.m-lg-5` |
| `.m-lg-auto` | margin: auto !important<br>@media (min-width: 1200px): margin: auto !important | `.m-lg-auto` |
| `.m-md-0` | margin: 0 !important<br>@media (min-width: 992px): margin: 0 !important | `.m-md-0` |
| `.m-md-1` | margin: .25rem !important<br>@media (min-width: 992px): margin: .25rem !important | `.m-md-1` |
| `.m-md-2` | margin: .5rem !important<br>@media (min-width: 992px): margin: .5rem !important | `.m-md-2` |
| `.m-md-3` | margin: 1rem !important<br>@media (min-width: 992px): margin: 1rem !important | `.m-md-3` |
| `.m-md-4` | margin: 1.5rem !important<br>@media (min-width: 992px): margin: 1.5rem !important | `.m-md-4` |
| `.m-md-5` | margin: 3rem !important<br>@media (min-width: 992px): margin: 3rem !important | `.m-md-5` |
| `.m-md-auto` | margin: auto !important<br>@media (min-width: 992px): margin: auto !important | `.m-md-auto` |
| `.m-r-spacer-0` | margin-right: 0<br>@media (min-width: 768px): margin-right: 0 | `.m-r-spacer-0` |
| `.m-r-spacer-2xl` | margin-right: 4.2rem / 6rem<br>@media (min-width: 768px): margin-right: 4.2rem / 6rem | `.m-r-spacer-2xl` |
| `.m-r-spacer-2xs` | margin-right: .7rem / 1rem<br>@media (min-width: 768px): margin-right: .7rem / 1rem | `.m-r-spacer-2xs` |
| `.m-r-spacer-3xs` | margin-right: .35rem / .5rem<br>@media (min-width: 768px): margin-right: .35rem / .5rem | `.m-r-spacer-3xs` |
| `.m-r-spacer-4xl` | margin-right: 5.6rem / 8rem<br>@media (min-width: 768px): margin-right: 5.6rem / 8rem | `.m-r-spacer-4xl` |
| `.m-r-spacer-4xs` | margin-right: .175rem / .25rem<br>@media (min-width: 768px): margin-right: .175rem / .25rem | `.m-r-spacer-4xs` |
| `.m-r-spacer-5xs` | margin-right: .0875rem / .125rem<br>@media (min-width: 768px): margin-right: .0875rem / .125rem | `.m-r-spacer-5xs` |
| `.m-r-spacer-6xl` | margin-right: 11.2rem / 16rem<br>@media (min-width: 768px): margin-right: 11.2rem / 16rem | `.m-r-spacer-6xl` |
| `.m-r-spacer-8xl` | margin-right: 11.2rem / 16rem<br>@media (min-width: 768px): margin-right: 11.2rem / 16rem | `.m-r-spacer-8xl` |
| `.m-r-spacer-auto` | margin-right: auto<br>@media (min-width: 768px): margin-right: auto | `.m-r-spacer-auto` |
| `.m-r-spacer-lg` | margin-right: 2.8rem / 4rem<br>@media (min-width: 768px): margin-right: 2.8rem / 4rem | `.m-r-spacer-lg` |
| `.m-r-spacer-md` | margin-right: 2.1rem / 3rem<br>@media (min-width: 768px): margin-right: 2.1rem / 3rem | `.m-r-spacer-md` |
| `.m-r-spacer-sm` | margin-right: 1.4rem / 2rem<br>@media (min-width: 768px): margin-right: 1.4rem / 2rem | `.m-r-spacer-sm` |
| `.m-r-spacer-xl` | margin-right: 3.5rem / 5rem<br>@media (min-width: 768px): margin-right: 3.5rem / 5rem | `.m-r-spacer-xl` |
| `.m-r-spacer-xs` | margin-right: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-right: 1.05rem / 1.5rem | `.m-r-spacer-xs` |
| `.m-sm-0` | margin: 0 !important<br>@media (min-width: 768px): margin: 0 !important | `.m-sm-0` |
| `.m-sm-1` | margin: .25rem !important<br>@media (min-width: 768px): margin: .25rem !important | `.m-sm-1` |
| `.m-sm-2` | margin: .5rem !important<br>@media (min-width: 768px): margin: .5rem !important | `.m-sm-2` |
| `.m-sm-3` | margin: 1rem !important<br>@media (min-width: 768px): margin: 1rem !important | `.m-sm-3` |
| `.m-sm-4` | margin: 1.5rem !important<br>@media (min-width: 768px): margin: 1.5rem !important | `.m-sm-4` |
| `.m-sm-5` | margin: 3rem !important<br>@media (min-width: 768px): margin: 3rem !important | `.m-sm-5` |
| `.m-sm-auto` | margin: auto !important<br>@media (min-width: 768px): margin: auto !important | `.m-sm-auto` |
| `.m-t-0--mobile` | margin-top: 0 !important<br>@media (max-width: 767px): margin-top: 0 !important | `.m-t-0--mobile` |
| `.m-t-spacer-0` | margin-top: 0<br>@media (min-width: 768px): margin-top: 0 | `.m-t-spacer-0` |
| `.m-t-spacer-2xl` | margin-top: 4.2rem / 6rem<br>@media (min-width: 768px): margin-top: 4.2rem / 6rem | `.m-t-spacer-2xl` |
| `.m-t-spacer-2xl--mobile` | margin-top: 6rem !important<br>@media (max-width: 767px): margin-top: 6rem !important | `.m-t-spacer-2xl--mobile` |
| `.m-t-spacer-2xs` | margin-top: .7rem / 1rem<br>@media (min-width: 768px): margin-top: .7rem / 1rem | `.m-t-spacer-2xs` |
| `.m-t-spacer-2xs--mobile` | margin-top: 1rem !important<br>@media (max-width: 767px): margin-top: 1rem !important | `.m-t-spacer-2xs--mobile` |
| `.m-t-spacer-3xs` | margin-top: .35rem / .5rem<br>@media (min-width: 768px): margin-top: .35rem / .5rem | `.m-t-spacer-3xs` |
| `.m-t-spacer-4xl` | margin-top: 5.6rem / 8rem<br>@media (min-width: 768px): margin-top: 5.6rem / 8rem | `.m-t-spacer-4xl` |
| `.m-t-spacer-4xl--mobile` | margin-top: 8rem !important<br>@media (max-width: 767px): margin-top: 8rem !important | `.m-t-spacer-4xl--mobile` |
| `.m-t-spacer-4xs` | margin-top: .175rem / .25rem<br>@media (min-width: 768px): margin-top: .175rem / .25rem | `.m-t-spacer-4xs` |
| `.m-t-spacer-5xs` | margin-top: .0875rem / .125rem<br>@media (min-width: 768px): margin-top: .0875rem / .125rem | `.m-t-spacer-5xs` |
| `.m-t-spacer-6xl` | margin-top: 11.2rem / 16rem<br>@media (min-width: 768px): margin-top: 11.2rem / 16rem | `.m-t-spacer-6xl` |
| `.m-t-spacer-6xl--mobile` | margin-top: 16rem !important<br>@media (max-width: 767px): margin-top: 16rem !important | `.m-t-spacer-6xl--mobile` |
| `.m-t-spacer-8xl` | margin-top: 11.2rem / 16rem<br>@media (min-width: 768px): margin-top: 11.2rem / 16rem | `.m-t-spacer-8xl` |
| `.m-t-spacer-8xl--mobile` | margin-top: 16rem !important<br>@media (max-width: 767px): margin-top: 16rem !important | `.m-t-spacer-8xl--mobile` |
| `.m-t-spacer-auto` | margin-top: auto<br>@media (min-width: 768px): margin-top: auto | `.m-t-spacer-auto` |
| `.m-t-spacer-lg` | margin-top: 2.8rem / 4rem<br>@media (min-width: 768px): margin-top: 2.8rem / 4rem | `.m-t-spacer-lg` |
| `.m-t-spacer-lg--mobile` | margin-top: 4rem !important<br>@media (max-width: 767px): margin-top: 4rem !important | `.m-t-spacer-lg--mobile` |
| `.m-t-spacer-md` | margin-top: 2.1rem / 3rem<br>@media (min-width: 768px): margin-top: 2.1rem / 3rem | `.m-t-spacer-md` |
| `.m-t-spacer-md--mobile` | margin-top: 3rem !important<br>@media (max-width: 767px): margin-top: 3rem !important | `.m-t-spacer-md--mobile` |
| `.m-t-spacer-sm` | margin-top: 1.4rem / 2rem<br>@media (min-width: 768px): margin-top: 1.4rem / 2rem | `.m-t-spacer-sm` |
| `.m-t-spacer-sm--mobile` | margin-top: 2rem !important<br>@media (max-width: 767px): margin-top: 2rem !important | `.m-t-spacer-sm--mobile` |
| `.m-t-spacer-xl` | margin-top: 3.5rem / 5rem<br>@media (min-width: 768px): margin-top: 3.5rem / 5rem | `.m-t-spacer-xl` |
| `.m-t-spacer-xl--mobile` | margin-top: 5rem !important<br>@media (max-width: 767px): margin-top: 5rem !important | `.m-t-spacer-xl--mobile` |
| `.m-t-spacer-xs` | margin-top: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-top: 1.05rem / 1.5rem | `.m-t-spacer-xs` |
| `.m-t-spacer-xs--mobile` | margin-top: 1.5rem !important<br>@media (max-width: 767px): margin-top: 1.5rem !important | `.m-t-spacer-xs--mobile` |
| `.m-x--auto` | margin-left: auto; margin-right: auto<br>@media (max-width: 991px): margin-left: auto; margin-right: auto | `.m-x--auto` |
| `.m-x-spacer-0` | margin-left: 0; margin-right: 0<br>@media (min-width: 768px): margin-left: 0; margin-right: 0 | `.m-x-spacer-0` |
| `.m-x-spacer-2xl` | margin-left: 4.2rem / 6rem; margin-right: 4.2rem / 6rem<br>@media (min-width: 768px): margin-left: 4.2rem / 6rem; margin-right: 4.2rem / 6rem | `.m-x-spacer-2xl` |
| `.m-x-spacer-2xs` | margin-left: .7rem / 1rem; margin-right: .7rem / 1rem<br>@media (min-width: 768px): margin-left: .7rem / 1rem; margin-right: .7rem / 1rem | `.m-x-spacer-2xs` |
| `.m-x-spacer-3xs` | margin-left: .35rem / .5rem; margin-right: .35rem / .5rem<br>@media (min-width: 768px): margin-left: .35rem / .5rem; margin-right: .35rem / .5rem | `.m-x-spacer-3xs` |
| `.m-x-spacer-4xl` | margin-left: 5.6rem / 8rem; margin-right: 5.6rem / 8rem<br>@media (min-width: 768px): margin-left: 5.6rem / 8rem; margin-right: 5.6rem / 8rem | `.m-x-spacer-4xl` |
| `.m-x-spacer-4xs` | margin-left: .175rem / .25rem; margin-right: .175rem / .25rem<br>@media (min-width: 768px): margin-left: .175rem / .25rem; margin-right: .175rem / .25rem | `.m-x-spacer-4xs` |
| `.m-x-spacer-5xs` | margin-left: .0875rem / .125rem; margin-right: .0875rem / .125rem<br>@media (min-width: 768px): margin-left: .0875rem / .125rem; margin-right: .0875rem / .125rem | `.m-x-spacer-5xs` |
| `.m-x-spacer-6xl` | margin-left: 11.2rem / 16rem; margin-right: 11.2rem / 16rem<br>@media (min-width: 768px): margin-left: 11.2rem / 16rem; margin-right: 11.2rem / 16rem | `.m-x-spacer-6xl` |
| `.m-x-spacer-8xl` | margin-left: 11.2rem / 16rem; margin-right: 11.2rem / 16rem<br>@media (min-width: 768px): margin-left: 11.2rem / 16rem; margin-right: 11.2rem / 16rem | `.m-x-spacer-8xl` |
| `.m-x-spacer-auto` | margin-right: auto; margin-left: auto<br>@media (min-width: 768px): margin-right: auto; margin-left: auto | `.m-x-spacer-auto` |
| `.m-x-spacer-lg` | margin-left: 2.8rem / 4rem; margin-right: 2.8rem / 4rem<br>@media (min-width: 768px): margin-left: 2.8rem / 4rem; margin-right: 2.8rem / 4rem | `.m-x-spacer-lg` |
| `.m-x-spacer-md` | margin-left: 2.1rem / 3rem; margin-right: 2.1rem / 3rem<br>@media (min-width: 768px): margin-left: 2.1rem / 3rem; margin-right: 2.1rem / 3rem | `.m-x-spacer-md` |
| `.m-x-spacer-sm` | margin-left: 1.4rem / 2rem; margin-right: 1.4rem / 2rem<br>@media (min-width: 768px): margin-left: 1.4rem / 2rem; margin-right: 1.4rem / 2rem | `.m-x-spacer-sm` |
| `.m-x-spacer-xl` | margin-left: 3.5rem / 5rem; margin-right: 3.5rem / 5rem<br>@media (min-width: 768px): margin-left: 3.5rem / 5rem; margin-right: 3.5rem / 5rem | `.m-x-spacer-xl` |
| `.m-x-spacer-xs` | margin-left: 1.05rem / 1.5rem; margin-right: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-left: 1.05rem / 1.5rem; margin-right: 1.05rem / 1.5rem | `.m-x-spacer-xs` |
| `.m-y-spacer-0` | margin-top: 0; margin-bottom: 0<br>@media (min-width: 768px): margin-top: 0; margin-bottom: 0 | `.m-y-spacer-0` |
| `.m-y-spacer-2xl` | margin-top: 4.2rem / 6rem; margin-bottom: 4.2rem / 6rem<br>@media (min-width: 768px): margin-top: 4.2rem / 6rem; margin-bottom: 4.2rem / 6rem | `.m-y-spacer-2xl` |
| `.m-y-spacer-2xs` | margin-top: .7rem / 1rem; margin-bottom: .7rem / 1rem<br>@media (min-width: 768px): margin-top: .7rem / 1rem; margin-bottom: .7rem / 1rem | `.m-y-spacer-2xs` |
| `.m-y-spacer-3xs` | margin-top: .35rem / .5rem; margin-bottom: .35rem / .5rem<br>@media (min-width: 768px): margin-top: .35rem / .5rem; margin-bottom: .35rem / .5rem | `.m-y-spacer-3xs` |
| `.m-y-spacer-4xl` | margin-top: 5.6rem / 8rem; margin-bottom: 5.6rem / 8rem<br>@media (min-width: 768px): margin-top: 5.6rem / 8rem; margin-bottom: 5.6rem / 8rem | `.m-y-spacer-4xl` |
| `.m-y-spacer-4xs` | margin-top: .175rem / .25rem; margin-bottom: .175rem / .25rem<br>@media (min-width: 768px): margin-top: .175rem / .25rem; margin-bottom: .175rem / .25rem | `.m-y-spacer-4xs` |
| `.m-y-spacer-5xs` | margin-top: .0875rem / .125rem; margin-bottom: .0875rem / .125rem<br>@media (min-width: 768px): margin-top: .0875rem / .125rem; margin-bottom: .0875rem / .125rem | `.m-y-spacer-5xs` |
| `.m-y-spacer-6xl` | margin-top: 11.2rem / 16rem; margin-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): margin-top: 11.2rem / 16rem; margin-bottom: 11.2rem / 16rem | `.m-y-spacer-6xl` |
| `.m-y-spacer-8xl` | margin-top: 11.2rem / 16rem; margin-bottom: 11.2rem / 16rem<br>@media (min-width: 768px): margin-top: 11.2rem / 16rem; margin-bottom: 11.2rem / 16rem | `.m-y-spacer-8xl` |
| `.m-y-spacer-auto` | margin-top: auto; margin-bottom: auto<br>@media (min-width: 768px): margin-top: auto; margin-bottom: auto | `.m-y-spacer-auto` |
| `.m-y-spacer-lg` | margin-top: 2.8rem / 4rem; margin-bottom: 2.8rem / 4rem<br>@media (min-width: 768px): margin-top: 2.8rem / 4rem; margin-bottom: 2.8rem / 4rem | `.m-y-spacer-lg` |
| `.m-y-spacer-md` | margin-top: 2.1rem / 3rem; margin-bottom: 2.1rem / 3rem<br>@media (min-width: 768px): margin-top: 2.1rem / 3rem; margin-bottom: 2.1rem / 3rem | `.m-y-spacer-md` |
| `.m-y-spacer-sm` | margin-top: 1.4rem / 2rem; margin-bottom: 1.4rem / 2rem<br>@media (min-width: 768px): margin-top: 1.4rem / 2rem; margin-bottom: 1.4rem / 2rem | `.m-y-spacer-sm` |
| `.m-y-spacer-xl` | margin-top: 3.5rem / 5rem; margin-bottom: 3.5rem / 5rem<br>@media (min-width: 768px): margin-top: 3.5rem / 5rem; margin-bottom: 3.5rem / 5rem | `.m-y-spacer-xl` |
| `.m-y-spacer-xs` | margin-top: 1.05rem / 1.5rem; margin-bottom: 1.05rem / 1.5rem<br>@media (min-width: 768px): margin-top: 1.05rem / 1.5rem; margin-bottom: 1.05rem / 1.5rem | `.m-y-spacer-xs` |

### Display utilities (50)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.d-block` | display: block !important<br>@media (min-width: 1200px): display: block !important | `.d-block` |
| `.d-flex` | display: flex !important<br>@media (min-width: 1200px): display: flex !important | `.d-flex` |
| `.d-grid` | display: grid !important<br>@media (min-width: 1200px): display: grid !important | `.d-grid` |
| `.d-inline` | display: inline !important<br>@media (min-width: 1200px): display: inline !important | `.d-inline` |
| `.d-inline-block` | display: inline-block !important<br>@media (min-width: 1200px): display: inline-block !important | `.d-inline-block` |
| `.d-inline-flex` | display: inline-flex !important<br>@media (min-width: 1200px): display: inline-flex !important | `.d-inline-flex` |
| `.d-lg-block` | display: block !important<br>@media (min-width: 1200px): display: block !important | `.d-lg-block` |
| `.d-lg-flex` | display: flex !important<br>@media (min-width: 1200px): display: flex !important | `.d-lg-flex` |
| `.d-lg-grid` | display: grid !important<br>@media (min-width: 1200px): display: grid !important | `.d-lg-grid` |
| `.d-lg-inline` | display: inline !important<br>@media (min-width: 1200px): display: inline !important | `.d-lg-inline` |
| `.d-lg-inline-block` | display: inline-block !important<br>@media (min-width: 1200px): display: inline-block !important | `.d-lg-inline-block` |
| `.d-lg-inline-flex` | display: inline-flex !important<br>@media (min-width: 1200px): display: inline-flex !important | `.d-lg-inline-flex` |
| `.d-lg-none` | display: none !important<br>@media (min-width: 1200px): display: none !important | `.d-lg-none` |
| `.d-lg-table` | display: table !important<br>@media (min-width: 1200px): display: table !important | `.d-lg-table` |
| `.d-lg-table-cell` | display: table-cell !important<br>@media (min-width: 1200px): display: table-cell !important | `.d-lg-table-cell` |
| `.d-lg-table-row` | display: table-row !important<br>@media (min-width: 1200px): display: table-row !important | `.d-lg-table-row` |
| `.d-md-block` | display: block !important<br>@media (min-width: 992px): display: block !important | `.d-md-block` |
| `.d-md-flex` | display: flex !important<br>@media (min-width: 992px): display: flex !important | `.d-md-flex` |
| `.d-md-grid` | display: grid !important<br>@media (min-width: 992px): display: grid !important | `.d-md-grid` |
| `.d-md-inline` | display: inline !important<br>@media (min-width: 992px): display: inline !important | `.d-md-inline` |
| `.d-md-inline-block` | display: inline-block !important<br>@media (min-width: 992px): display: inline-block !important | `.d-md-inline-block` |
| `.d-md-inline-flex` | display: inline-flex !important<br>@media (min-width: 992px): display: inline-flex !important | `.d-md-inline-flex` |
| `.d-md-none` | display: none !important<br>@media (min-width: 992px): display: none !important | `.d-md-none` |
| `.d-md-table` | display: table !important<br>@media (min-width: 992px): display: table !important | `.d-md-table` |
| `.d-md-table-cell` | display: table-cell !important<br>@media (min-width: 992px): display: table-cell !important | `.d-md-table-cell` |
| `.d-md-table-row` | display: table-row !important<br>@media (min-width: 992px): display: table-row !important | `.d-md-table-row` |
| `.d-none` | display: none !important<br>@media (min-width: 1200px): display: none !important | `.d-none` |
| `.d-print-block` | display: block !important<br>@media print: display: block !important | `.d-print-block` |
| `.d-print-flex` | display: flex !important<br>@media print: display: flex !important | `.d-print-flex` |
| `.d-print-grid` | display: grid !important<br>@media print: display: grid !important | `.d-print-grid` |
| `.d-print-inline` | display: inline !important<br>@media print: display: inline !important | `.d-print-inline` |
| `.d-print-inline-block` | display: inline-block !important<br>@media print: display: inline-block !important | `.d-print-inline-block` |
| `.d-print-inline-flex` | display: inline-flex !important<br>@media print: display: inline-flex !important | `.d-print-inline-flex` |
| `.d-print-none` | display: none !important<br>@media print: display: none !important | `.d-print-none` |
| `.d-print-table` | display: table !important<br>@media print: display: table !important | `.d-print-table` |
| `.d-print-table-cell` | display: table-cell !important<br>@media print: display: table-cell !important | `.d-print-table-cell` |
| `.d-print-table-row` | display: table-row !important<br>@media print: display: table-row !important | `.d-print-table-row` |
| `.d-sm-block` | display: block !important<br>@media (min-width: 768px): display: block !important | `.d-sm-block` |
| `.d-sm-flex` | display: flex !important<br>@media (min-width: 768px): display: flex !important | `.d-sm-flex` |
| `.d-sm-grid` | display: grid !important<br>@media (min-width: 768px): display: grid !important | `.d-sm-grid` |
| `.d-sm-inline` | display: inline !important<br>@media (min-width: 768px): display: inline !important | `.d-sm-inline` |
| `.d-sm-inline-block` | display: inline-block !important<br>@media (min-width: 768px): display: inline-block !important | `.d-sm-inline-block` |
| `.d-sm-inline-flex` | display: inline-flex !important<br>@media (min-width: 768px): display: inline-flex !important | `.d-sm-inline-flex` |
| `.d-sm-none` | display: none !important<br>@media (min-width: 768px): display: none !important | `.d-sm-none` |
| `.d-sm-table` | display: table !important<br>@media (min-width: 768px): display: table !important | `.d-sm-table` |
| `.d-sm-table-cell` | display: table-cell !important<br>@media (min-width: 768px): display: table-cell !important | `.d-sm-table-cell` |
| `.d-sm-table-row` | display: table-row !important<br>@media (min-width: 768px): display: table-row !important | `.d-sm-table-row` |
| `.d-table` | display: table !important<br>@media (min-width: 1200px): display: table !important | `.d-table` |
| `.d-table-cell` | display: table-cell !important<br>@media (min-width: 1200px): display: table-cell !important | `.d-table-cell` |
| `.d-table-row` | display: table-row !important<br>@media (min-width: 1200px): display: table-row !important | `.d-table-row` |

### Flex utilities (167)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.align-baseline` | vertical-align: baseline !important<br>@media (min-width: 1200px): vertical-align: baseline !important | `.align-baseline` |
| `.align-bottom` | vertical-align: bottom !important<br>@media (min-width: 1200px): vertical-align: bottom !important | `.align-bottom` |
| `.align-content-around` | align-content: space-around !important<br>@media (min-width: 1200px): align-content: space-around !important | `.align-content-around` |
| `.align-content-between` | align-content: space-between !important<br>@media (min-width: 1200px): align-content: space-between !important | `.align-content-between` |
| `.align-content-center` | align-content: center !important<br>@media (min-width: 1200px): align-content: center !important | `.align-content-center` |
| `.align-content-end` | align-content: flex-end !important<br>@media (min-width: 1200px): align-content: flex-end !important | `.align-content-end` |
| `.align-content-lg-around` | align-content: space-around !important<br>@media (min-width: 1200px): align-content: space-around !important | `.align-content-lg-around` |
| `.align-content-lg-between` | align-content: space-between !important<br>@media (min-width: 1200px): align-content: space-between !important | `.align-content-lg-between` |
| `.align-content-lg-center` | align-content: center !important<br>@media (min-width: 1200px): align-content: center !important | `.align-content-lg-center` |
| `.align-content-lg-end` | align-content: flex-end !important<br>@media (min-width: 1200px): align-content: flex-end !important | `.align-content-lg-end` |
| `.align-content-lg-start` | align-content: flex-start !important<br>@media (min-width: 1200px): align-content: flex-start !important | `.align-content-lg-start` |
| `.align-content-lg-stretch` | align-content: stretch !important<br>@media (min-width: 1200px): align-content: stretch !important | `.align-content-lg-stretch` |
| `.align-content-md-around` | align-content: space-around !important<br>@media (min-width: 992px): align-content: space-around !important | `.align-content-md-around` |
| `.align-content-md-between` | align-content: space-between !important<br>@media (min-width: 992px): align-content: space-between !important | `.align-content-md-between` |
| `.align-content-md-center` | align-content: center !important<br>@media (min-width: 992px): align-content: center !important | `.align-content-md-center` |
| `.align-content-md-end` | align-content: flex-end !important<br>@media (min-width: 992px): align-content: flex-end !important | `.align-content-md-end` |
| `.align-content-md-start` | align-content: flex-start !important<br>@media (min-width: 992px): align-content: flex-start !important | `.align-content-md-start` |
| `.align-content-md-stretch` | align-content: stretch !important<br>@media (min-width: 992px): align-content: stretch !important | `.align-content-md-stretch` |
| `.align-content-sm-around` | align-content: space-around !important<br>@media (min-width: 768px): align-content: space-around !important | `.align-content-sm-around` |
| `.align-content-sm-between` | align-content: space-between !important<br>@media (min-width: 768px): align-content: space-between !important | `.align-content-sm-between` |
| `.align-content-sm-center` | align-content: center !important<br>@media (min-width: 768px): align-content: center !important | `.align-content-sm-center` |
| `.align-content-sm-end` | align-content: flex-end !important<br>@media (min-width: 768px): align-content: flex-end !important | `.align-content-sm-end` |
| `.align-content-sm-start` | align-content: flex-start !important<br>@media (min-width: 768px): align-content: flex-start !important | `.align-content-sm-start` |
| `.align-content-sm-stretch` | align-content: stretch !important<br>@media (min-width: 768px): align-content: stretch !important | `.align-content-sm-stretch` |
| `.align-content-start` | align-content: flex-start !important<br>@media (min-width: 1200px): align-content: flex-start !important | `.align-content-start` |
| `.align-content-stretch` | align-content: stretch !important<br>@media (min-width: 1200px): align-content: stretch !important | `.align-content-stretch` |
| `.align-items-baseline` | align-items: baseline !important<br>@media (min-width: 1200px): align-items: baseline !important | `.align-items-baseline` |
| `.align-items-center` | align-items: center !important<br>@media (min-width: 1200px): align-items: center !important | `.align-items-center` |
| `.align-items-end` | align-items: flex-end !important<br>@media (min-width: 1200px): align-items: flex-end !important | `.align-items-end` |
| `.align-items-lg-baseline` | align-items: baseline !important<br>@media (min-width: 1200px): align-items: baseline !important | `.align-items-lg-baseline` |
| `.align-items-lg-center` | align-items: center !important<br>@media (min-width: 1200px): align-items: center !important | `.align-items-lg-center` |
| `.align-items-lg-end` | align-items: flex-end !important<br>@media (min-width: 1200px): align-items: flex-end !important | `.align-items-lg-end` |
| `.align-items-lg-start` | align-items: flex-start !important<br>@media (min-width: 1200px): align-items: flex-start !important | `.align-items-lg-start` |
| `.align-items-lg-stretch` | align-items: stretch !important<br>@media (min-width: 1200px): align-items: stretch !important | `.align-items-lg-stretch` |
| `.align-items-md-baseline` | align-items: baseline !important<br>@media (min-width: 992px): align-items: baseline !important | `.align-items-md-baseline` |
| `.align-items-md-center` | align-items: center !important<br>@media (min-width: 992px): align-items: center !important | `.align-items-md-center` |
| `.align-items-md-end` | align-items: flex-end !important<br>@media (min-width: 992px): align-items: flex-end !important | `.align-items-md-end` |
| `.align-items-md-start` | align-items: flex-start !important<br>@media (min-width: 992px): align-items: flex-start !important | `.align-items-md-start` |
| `.align-items-md-stretch` | align-items: stretch !important<br>@media (min-width: 992px): align-items: stretch !important | `.align-items-md-stretch` |
| `.align-items-sm-baseline` | align-items: baseline !important<br>@media (min-width: 768px): align-items: baseline !important | `.align-items-sm-baseline` |
| `.align-items-sm-center` | align-items: center !important<br>@media (min-width: 768px): align-items: center !important | `.align-items-sm-center` |
| `.align-items-sm-end` | align-items: flex-end !important<br>@media (min-width: 768px): align-items: flex-end !important | `.align-items-sm-end` |
| `.align-items-sm-start` | align-items: flex-start !important<br>@media (min-width: 768px): align-items: flex-start !important | `.align-items-sm-start` |
| `.align-items-sm-stretch` | align-items: stretch !important<br>@media (min-width: 768px): align-items: stretch !important | `.align-items-sm-stretch` |
| `.align-items-start` | align-items: flex-start !important<br>@media (min-width: 1200px): align-items: flex-start !important | `.align-items-start` |
| `.align-items-stretch` | align-items: stretch !important<br>@media (min-width: 1200px): align-items: stretch !important | `.align-items-stretch` |
| `.align-middle` | vertical-align: middle !important<br>@media (min-width: 1200px): vertical-align: middle !important | `.align-middle` |
| `.align-self-auto` | align-self: auto !important<br>@media (min-width: 1200px): align-self: auto !important | `.align-self-auto` |
| `.align-self-baseline` | align-self: baseline !important<br>@media (min-width: 1200px): align-self: baseline !important | `.align-self-baseline` |
| `.align-self-center` | align-self: center !important<br>@media (min-width: 1200px): align-self: center !important | `.align-self-center` |
| `.align-self-end` | align-self: flex-end !important<br>@media (min-width: 1200px): align-self: flex-end !important | `.align-self-end` |
| `.align-self-lg-auto` | align-self: auto !important<br>@media (min-width: 1200px): align-self: auto !important | `.align-self-lg-auto` |
| `.align-self-lg-baseline` | align-self: baseline !important<br>@media (min-width: 1200px): align-self: baseline !important | `.align-self-lg-baseline` |
| `.align-self-lg-center` | align-self: center !important<br>@media (min-width: 1200px): align-self: center !important | `.align-self-lg-center` |
| `.align-self-lg-end` | align-self: flex-end !important<br>@media (min-width: 1200px): align-self: flex-end !important | `.align-self-lg-end` |
| `.align-self-lg-start` | align-self: flex-start !important<br>@media (min-width: 1200px): align-self: flex-start !important | `.align-self-lg-start` |
| `.align-self-lg-stretch` | align-self: stretch !important<br>@media (min-width: 1200px): align-self: stretch !important | `.align-self-lg-stretch` |
| `.align-self-md-auto` | align-self: auto !important<br>@media (min-width: 992px): align-self: auto !important | `.align-self-md-auto` |
| `.align-self-md-baseline` | align-self: baseline !important<br>@media (min-width: 992px): align-self: baseline !important | `.align-self-md-baseline` |
| `.align-self-md-center` | align-self: center !important<br>@media (min-width: 992px): align-self: center !important | `.align-self-md-center` |
| `.align-self-md-end` | align-self: flex-end !important<br>@media (min-width: 992px): align-self: flex-end !important | `.align-self-md-end` |
| `.align-self-md-start` | align-self: flex-start !important<br>@media (min-width: 992px): align-self: flex-start !important | `.align-self-md-start` |
| `.align-self-md-stretch` | align-self: stretch !important<br>@media (min-width: 992px): align-self: stretch !important | `.align-self-md-stretch` |
| `.align-self-sm-auto` | align-self: auto !important<br>@media (min-width: 768px): align-self: auto !important | `.align-self-sm-auto` |
| `.align-self-sm-baseline` | align-self: baseline !important<br>@media (min-width: 768px): align-self: baseline !important | `.align-self-sm-baseline` |
| `.align-self-sm-center` | align-self: center !important<br>@media (min-width: 768px): align-self: center !important | `.align-self-sm-center` |
| `.align-self-sm-end` | align-self: flex-end !important<br>@media (min-width: 768px): align-self: flex-end !important | `.align-self-sm-end` |
| `.align-self-sm-start` | align-self: flex-start !important<br>@media (min-width: 768px): align-self: flex-start !important | `.align-self-sm-start` |
| `.align-self-sm-stretch` | align-self: stretch !important<br>@media (min-width: 768px): align-self: stretch !important | `.align-self-sm-stretch` |
| `.align-self-start` | align-self: flex-start !important<br>@media (min-width: 1200px): align-self: flex-start !important | `.align-self-start` |
| `.align-self-stretch` | align-self: stretch !important<br>@media (min-width: 1200px): align-self: stretch !important | `.align-self-stretch` |
| `.align-text-bottom` | vertical-align: text-bottom !important<br>@media (min-width: 1200px): vertical-align: text-bottom !important | `.align-text-bottom` |
| `.align-text-top` | vertical-align: text-top !important<br>@media (min-width: 1200px): vertical-align: text-top !important | `.align-text-top` |
| `.align-top` | vertical-align: top !important<br>@media (min-width: 1200px): vertical-align: top !important | `.align-top` |
| `.flex` | display: -webkit-box / -ms-flexbox / flex; justify-content: space-between<br>@media (min-width: 768px): display: -webkit-box / -ms-flexbox / flex; justify-content: space-between | `.flex`<br>`.si-transfer-money__group.flex` |
| `.flex--between` | display: flex; justify-content: space-between<br>@media (min-width: 992px): display: flex; justify-content: space-between | `.flex--between` |
| `.flex-align-center` | -webkit-align-items: center; align-items: center<br>@media (max-width: 768px): -webkit-align-items: center; align-items: center | `.flex-align-center` |
| `.flex-align-end` | -webkit-box-align: flex-end; -ms-flex-align: flex-end; align-items: flex-end; justify-content: flex-end; -webkit-box-pack: flex-end; -ms-flex-pack: flex-end<br>@media (max-width: 768px): -webkit-box-align: flex-end; -ms-flex-align: flex-end; align-items: flex-end; justify-content: flex-end; -webkit-box-pack: flex-end; -ms-flex-pack: flex-end | `.flex-align-end` |
| `.flex-align-start` | -webkit-box-align: flex-start; -ms-flex-align: flex-start; align-items: flex-start; justify-content: flex-start; -webkit-box-pack: flex-start; -ms-flex-pack: flex-start<br>@media (max-width: 768px): -webkit-box-align: flex-start; -ms-flex-align: flex-start; align-items: flex-start; justify-content: flex-start; -webkit-box-pack: flex-start; -ms-flex-pack: flex-start | `.flex-align-start` |
| `.flex-between` | -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: space-between; -webkit-box-pack: space-between; -ms-flex-pack: space-between; flex-direction: column; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto; display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / ""<br>@media (max-width: 768px): -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: space-between; -webkit-box-pack: space-between; -ms-flex-pack: space-between; flex-direction: column; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto; display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / "" | `.flex-between`<br>`.flex-between span`<br>`.flex-between .col` |
| `.flex-center` | display: -webkit-box / -ms-flexbox / flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: center; -webkit-box-pack: center; -ms-flex-pack: center<br>@media (min-width: 768px): display: -webkit-box / -ms-flexbox / flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: center; -webkit-box-pack: center; -ms-flex-pack: center | `.flex-center` |
| `.flex-center--md` | display: flex; justify-content: center<br>@media (max-width: 991px): display: flex; justify-content: center | `.flex-center--md` |
| `.flex-center--wrapped` | -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: center; -webkit-box-pack: center; -ms-flex-pack: center; flex-direction: column; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / ""<br>@media (min-width: 768px): -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-content: center; -webkit-box-pack: center; -ms-flex-pack: center<br>@media (max-width: 768px): flex-direction: column; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; display: -webkit-box / -ms-flexbox / flex; -ms-flex-wrap: wrap; flex-wrap: wrap; content: none / "" | `.flex-center--wrapped`<br>`.row--flex,.flex-center--wrapped,.flex-between`<br>`.row--flex:before,.flex-center--wrapped:before,.flex-between:before` |
| `.flex-column` | flex-direction: column !important / column; display: -webkit-box / -ms-flexbox / flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column<br>@media (min-width: 1200px): flex-direction: column !important<br>@media (max-width: 991px): display: -webkit-box / -ms-flexbox / flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column | `.flex-column` |
| `.flex-column-reverse` | flex-direction: column-reverse !important<br>@media (min-width: 1200px): flex-direction: column-reverse !important | `.flex-column-reverse` |
| `.flex-content` | flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto<br>@media (max-width: 767px): flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto | `.flex-content` |
| `.flex-content-wrap` | -ms-flex-wrap: wrap; flex-wrap: wrap<br>@media (min-width: 768px): -ms-flex-wrap: wrap; flex-wrap: wrap | `.flex-content-wrap` |
| `.flex-end` | display: -webkit-box / -ms-flexbox / flex; -webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end<br>@media (max-width: 768px): display: -webkit-box / -ms-flexbox / flex; -webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end | `.flex-end` |
| `.flex-fill` | flex: 1 1 auto !important<br>@media (min-width: 1200px): flex: 1 1 auto !important | `.flex-fill` |
| `.flex-grow` | flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto<br>@media (min-width: 768px): flex: 1 0 auto; -webkit-box-flex: 1; -ms-flex: 1 0 auto | `.flex-grow` |
| `.flex-grow-0` | flex-grow: 0 !important<br>@media (min-width: 1200px): flex-grow: 0 !important | `.flex-grow-0` |
| `.flex-grow-1` | flex-grow: 1 !important<br>@media (min-width: 1200px): flex-grow: 1 !important | `.flex-grow-1` |
| `.flex-helper-between` | -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between<br>@media (max-width: 768px): -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between | `.flex-helper-between` |
| `.flex-helper-even` | -webkit-box-pack: space-evenly; -ms-flex-pack: space-evenly; justify-content: space-evenly<br>@media (max-width: 768px): -webkit-box-pack: space-evenly; -ms-flex-pack: space-evenly; justify-content: space-evenly | `.flex-helper-even` |
| `.flex-lg-column` | flex-direction: column !important<br>@media (min-width: 1200px): flex-direction: column !important | `.flex-lg-column` |
| `.flex-lg-column-reverse` | flex-direction: column-reverse !important<br>@media (min-width: 1200px): flex-direction: column-reverse !important | `.flex-lg-column-reverse` |
| `.flex-lg-fill` | flex: 1 1 auto !important<br>@media (min-width: 1200px): flex: 1 1 auto !important | `.flex-lg-fill` |
| `.flex-lg-grow-0` | flex-grow: 0 !important<br>@media (min-width: 1200px): flex-grow: 0 !important | `.flex-lg-grow-0` |
| `.flex-lg-grow-1` | flex-grow: 1 !important<br>@media (min-width: 1200px): flex-grow: 1 !important | `.flex-lg-grow-1` |
| `.flex-lg-row` | flex-direction: row !important<br>@media (min-width: 1200px): flex-direction: row !important | `.flex-lg-row` |
| `.flex-lg-row-reverse` | flex-direction: row-reverse !important<br>@media (min-width: 1200px): flex-direction: row-reverse !important | `.flex-lg-row-reverse` |
| `.flex-lg-shrink-0` | flex-shrink: 0 !important<br>@media (min-width: 1200px): flex-shrink: 0 !important | `.flex-lg-shrink-0` |
| `.flex-lg-shrink-1` | flex-shrink: 1 !important<br>@media (min-width: 1200px): flex-shrink: 1 !important | `.flex-lg-shrink-1` |
| `.flex-md-column` | flex-direction: column !important<br>@media (min-width: 992px): flex-direction: column !important | `.flex-md-column` |
| `.flex-md-column-reverse` | flex-direction: column-reverse !important<br>@media (min-width: 992px): flex-direction: column-reverse !important | `.flex-md-column-reverse` |
| `.flex-md-fill` | flex: 1 1 auto !important<br>@media (min-width: 992px): flex: 1 1 auto !important | `.flex-md-fill` |
| `.flex-md-grow-0` | flex-grow: 0 !important<br>@media (min-width: 992px): flex-grow: 0 !important | `.flex-md-grow-0` |
| `.flex-md-grow-1` | flex-grow: 1 !important<br>@media (min-width: 992px): flex-grow: 1 !important | `.flex-md-grow-1` |
| `.flex-md-row` | flex-direction: row !important<br>@media (min-width: 992px): flex-direction: row !important | `.flex-md-row` |
| `.flex-md-row-reverse` | flex-direction: row-reverse !important<br>@media (min-width: 992px): flex-direction: row-reverse !important | `.flex-md-row-reverse` |
| `.flex-md-shrink-0` | flex-shrink: 0 !important<br>@media (min-width: 992px): flex-shrink: 0 !important | `.flex-md-shrink-0` |
| `.flex-md-shrink-1` | flex-shrink: 1 !important<br>@media (min-width: 992px): flex-shrink: 1 !important | `.flex-md-shrink-1` |
| `.flex-no-wrap` | -ms-flex-wrap: nowrap; flex-wrap: nowrap<br>@media (max-width: 768px): -ms-flex-wrap: nowrap; flex-wrap: nowrap | `.flex-no-wrap` |
| `.flex-overide` | display: -webkit-box !important / -ms-flexbox !important / flex !important; -webkit-box-orient: vertical !important; -webkit-box-direction: normal !important; -ms-flex-direction: column !important; flex-direction: column !important; margin: 0 !important; height: 100% !important<br>@media (max-width: 991px): display: -webkit-box !important / -ms-flexbox !important / flex !important; -webkit-box-orient: vertical !important; -webkit-box-direction: normal !important; -ms-flex-direction: column !important; flex-direction: column !important; margin: 0 !important; height: 100% !important | `.flex-overide` |
| `.flex-row` | flex-direction: row !important<br>@media (min-width: 1200px): flex-direction: row !important | `.flex-row` |
| `.flex-row-reverse` | flex-direction: row-reverse !important<br>@media (min-width: 1200px): flex-direction: row-reverse !important | `.flex-row-reverse` |
| `.flex-shrink-0` | flex-shrink: 0 !important<br>@media (min-width: 1200px): flex-shrink: 0 !important | `.flex-shrink-0` |
| `.flex-shrink-1` | flex-shrink: 1 !important<br>@media (min-width: 1200px): flex-shrink: 1 !important | `.flex-shrink-1` |
| `.flex-sm-column` | flex-direction: column !important<br>@media (min-width: 768px): flex-direction: column !important | `.flex-sm-column` |
| `.flex-sm-column-reverse` | flex-direction: column-reverse !important<br>@media (min-width: 768px): flex-direction: column-reverse !important | `.flex-sm-column-reverse` |
| `.flex-sm-fill` | flex: 1 1 auto !important<br>@media (min-width: 768px): flex: 1 1 auto !important | `.flex-sm-fill` |
| `.flex-sm-grow-0` | flex-grow: 0 !important<br>@media (min-width: 768px): flex-grow: 0 !important | `.flex-sm-grow-0` |
| `.flex-sm-grow-1` | flex-grow: 1 !important<br>@media (min-width: 768px): flex-grow: 1 !important | `.flex-sm-grow-1` |
| `.flex-sm-row` | flex-direction: row !important<br>@media (min-width: 768px): flex-direction: row !important | `.flex-sm-row` |
| `.flex-sm-row-reverse` | flex-direction: row-reverse !important<br>@media (min-width: 768px): flex-direction: row-reverse !important | `.flex-sm-row-reverse` |
| `.flex-sm-shrink-0` | flex-shrink: 0 !important<br>@media (min-width: 768px): flex-shrink: 0 !important | `.flex-sm-shrink-0` |
| `.flex-sm-shrink-1` | flex-shrink: 1 !important<br>@media (min-width: 768px): flex-shrink: 1 !important | `.flex-sm-shrink-1` |
| `.flex-start` | display: -webkit-box / -ms-flexbox / flex; -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start<br>@media (max-width: 768px): display: -webkit-box / -ms-flexbox / flex; -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start | `.flex-start` |
| `.flex-start--md` | justify-content: flex-start<br>@media (max-width: 991px): justify-content: flex-start | `.flex-start--md` |
| `.flex-wrap` | position: relative; display: flex; flex-direction: column; min-height: 100vh; overflow-x: clip; margin-bottom: 72px / 0<br>@media (max-width: 767px): position: relative; display: flex; flex-direction: column; min-height: 100vh; overflow-x: clip; margin-bottom: 72px / 0 | `.flex-wrap`<br>`.is-admin .flex-wrap`<br>`.page-feed .flex-wrap` |
| `.flex-wrap-lg-nowrap` | flex-wrap: nowrap !important<br>@media (min-width: 1200px): flex-wrap: nowrap !important | `.flex-wrap-lg-nowrap` |
| `.flex-wrap-lg-wrap` | flex-wrap: wrap !important<br>@media (min-width: 1200px): flex-wrap: wrap !important | `.flex-wrap-lg-wrap` |
| `.flex-wrap-lg-wrap-reverse` | flex-wrap: wrap-reverse !important<br>@media (min-width: 1200px): flex-wrap: wrap-reverse !important | `.flex-wrap-lg-wrap-reverse` |
| `.flex-wrap-md-nowrap` | flex-wrap: nowrap !important<br>@media (min-width: 992px): flex-wrap: nowrap !important | `.flex-wrap-md-nowrap` |
| `.flex-wrap-md-wrap` | flex-wrap: wrap !important<br>@media (min-width: 992px): flex-wrap: wrap !important | `.flex-wrap-md-wrap` |
| `.flex-wrap-md-wrap-reverse` | flex-wrap: wrap-reverse !important<br>@media (min-width: 992px): flex-wrap: wrap-reverse !important | `.flex-wrap-md-wrap-reverse` |
| `.flex-wrap-nowrap` | flex-wrap: nowrap !important<br>@media (min-width: 1200px): flex-wrap: nowrap !important | `.flex-wrap-nowrap` |
| `.flex-wrap-sm-nowrap` | flex-wrap: nowrap !important<br>@media (min-width: 768px): flex-wrap: nowrap !important | `.flex-wrap-sm-nowrap` |
| `.flex-wrap-sm-wrap` | flex-wrap: wrap !important<br>@media (min-width: 768px): flex-wrap: wrap !important | `.flex-wrap-sm-wrap` |
| `.flex-wrap-sm-wrap-reverse` | flex-wrap: wrap-reverse !important<br>@media (min-width: 768px): flex-wrap: wrap-reverse !important | `.flex-wrap-sm-wrap-reverse` |
| `.flex-wrap-wrap` | flex-wrap: wrap !important<br>@media (min-width: 1200px): flex-wrap: wrap !important | `.flex-wrap-wrap` |
| `.flex-wrap-wrap-reverse` | flex-wrap: wrap-reverse !important<br>@media (min-width: 1200px): flex-wrap: wrap-reverse !important | `.flex-wrap-wrap-reverse` |
| `.flex-wrapping--wrap` | flex-wrap: wrap<br>@media (min-width: 768px): flex-wrap: wrap | `.flex-wrapping--wrap` |
| `.justify-content-around` | justify-content: space-around !important<br>@media (min-width: 1200px): justify-content: space-around !important | `.justify-content-around` |
| `.justify-content-between` | justify-content: space-between !important<br>@media (min-width: 1200px): justify-content: space-between !important | `.justify-content-between` |
| `.justify-content-center` | justify-content: center !important / center<br>@media (min-width: 1200px): justify-content: center !important<br>@media (max-width: 991px): justify-content: center | `.justify-content-center` |
| `.justify-content-end` | justify-content: flex-end !important<br>@media (min-width: 1200px): justify-content: flex-end !important | `.justify-content-end` |
| `.justify-content-evenly` | justify-content: space-evenly !important<br>@media (min-width: 1200px): justify-content: space-evenly !important | `.justify-content-evenly` |
| `.justify-content-lg-around` | justify-content: space-around !important<br>@media (min-width: 1200px): justify-content: space-around !important | `.justify-content-lg-around` |
| `.justify-content-lg-between` | justify-content: space-between !important<br>@media (min-width: 1200px): justify-content: space-between !important | `.justify-content-lg-between` |
| `.justify-content-lg-center` | justify-content: center !important<br>@media (min-width: 1200px): justify-content: center !important | `.justify-content-lg-center` |
| `.justify-content-lg-end` | justify-content: flex-end !important<br>@media (min-width: 1200px): justify-content: flex-end !important | `.justify-content-lg-end` |
| `.justify-content-lg-evenly` | justify-content: space-evenly !important<br>@media (min-width: 1200px): justify-content: space-evenly !important | `.justify-content-lg-evenly` |
| `.justify-content-lg-start` | justify-content: flex-start !important<br>@media (min-width: 1200px): justify-content: flex-start !important | `.justify-content-lg-start` |
| `.justify-content-md-around` | justify-content: space-around !important<br>@media (min-width: 992px): justify-content: space-around !important | `.justify-content-md-around` |
| `.justify-content-md-between` | justify-content: space-between !important<br>@media (min-width: 992px): justify-content: space-between !important | `.justify-content-md-between` |
| `.justify-content-md-center` | justify-content: center !important<br>@media (min-width: 992px): justify-content: center !important | `.justify-content-md-center` |
| `.justify-content-md-end` | justify-content: flex-end !important<br>@media (min-width: 992px): justify-content: flex-end !important | `.justify-content-md-end` |
| `.justify-content-md-evenly` | justify-content: space-evenly !important<br>@media (min-width: 992px): justify-content: space-evenly !important | `.justify-content-md-evenly` |
| `.justify-content-md-start` | justify-content: flex-start !important<br>@media (min-width: 992px): justify-content: flex-start !important | `.justify-content-md-start` |
| `.justify-content-sm-around` | justify-content: space-around !important<br>@media (min-width: 768px): justify-content: space-around !important | `.justify-content-sm-around` |
| `.justify-content-sm-between` | justify-content: space-between !important<br>@media (min-width: 768px): justify-content: space-between !important | `.justify-content-sm-between` |
| `.justify-content-sm-center` | justify-content: center !important<br>@media (min-width: 768px): justify-content: center !important | `.justify-content-sm-center` |
| `.justify-content-sm-end` | justify-content: flex-end !important<br>@media (min-width: 768px): justify-content: flex-end !important | `.justify-content-sm-end` |
| `.justify-content-sm-evenly` | justify-content: space-evenly !important<br>@media (min-width: 768px): justify-content: space-evenly !important | `.justify-content-sm-evenly` |
| `.justify-content-sm-start` | justify-content: flex-start !important<br>@media (min-width: 768px): justify-content: flex-start !important | `.justify-content-sm-start` |
| `.justify-content-start` | justify-content: flex-start !important<br>@media (min-width: 1200px): justify-content: flex-start !important | `.justify-content-start` |

### Position utilities (26)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.bottom-0` | bottom: 0 !important<br>@media (min-width: 1200px): bottom: 0 !important | `.bottom-0` |
| `.bottom-50` | bottom: 50% !important<br>@media (min-width: 1200px): bottom: 50% !important | `.bottom-50` |
| `.bottom-100` | bottom: 100% !important<br>@media (min-width: 1200px): bottom: 100% !important | `.bottom-100` |
| `.end-0` | right: 0 !important<br>@media (min-width: 1200px): right: 0 !important | `.end-0` |
| `.end-50` | right: 50% !important<br>@media (min-width: 1200px): right: 50% !important | `.end-50` |
| `.end-100` | right: 100% !important<br>@media (min-width: 1200px): right: 100% !important | `.end-100` |
| `.end-adornment` | position: absolute; padding: 11px 10px; color: #00a4b6; font-size: 11px; right: 0; bottom: 3px<br>@media (min-width: 1200px): position: absolute; padding: 11px 10px; color: #00a4b6<br>@media (max-width: 767px): font-size: 11px; right: 0; bottom: 3px | `.si-resale__available-investments-options .with-adornments .start-adornment,.si-resale__available-investments-options .with-adornments .end-adornment`<br>`.si-resale__available-investments-options .with-adornments .end-adornment` |
| `.fixed-bottom` | position: fixed; right: 0; bottom: 0; left: 0; z-index: 1030<br>@media (prefers-reduced-motion: reduce): position: fixed; right: 0; bottom: 0; left: 0; z-index: 1030 | `.fixed-bottom` |
| `.fixed-top` | position: fixed; top: 0; right: 0; left: 0; z-index: 1030<br>@media (prefers-reduced-motion: reduce): position: fixed; top: 0; right: 0; left: 0; z-index: 1030 | `.fixed-top` |
| `.position-absolute` | position: absolute !important<br>@media (min-width: 1200px): position: absolute !important | `.position-absolute` |
| `.position-fixed` | position: fixed !important<br>@media (min-width: 1200px): position: fixed !important | `.position-fixed` |
| `.position-relative` | position: relative !important<br>@media (min-width: 1200px): position: relative !important | `.position-relative` |
| `.position-static` | position: static !important<br>@media (min-width: 1200px): position: static !important | `.position-static` |
| `.position-sticky` | position: sticky !important<br>@media (min-width: 1200px): position: sticky !important | `.position-sticky` |
| `.start-0` | left: 0 !important<br>@media (min-width: 1200px): left: 0 !important | `.start-0` |
| `.start-50` | left: 50% !important<br>@media (min-width: 1200px): left: 50% !important | `.start-50` |
| `.start-100` | left: 100% !important<br>@media (min-width: 1200px): left: 100% !important | `.start-100` |
| `.start-adornment` | position: absolute; padding: 15px 10px / 11px 10px; font-weight: 500; font-size: .75rem / .6875rem; left: 0; top: 0 / 28px / 20px; color: #00a4b6<br>@media (max-width: 767px): position: absolute; padding: 15px 10px; font-weight: 500; font-size: .75rem; left: 0; top: 0 / 20px<br>@media (min-width: 1200px): position: absolute; padding: 11px 10px; color: #00a4b6; left: 0; top: 28px; font-size: .6875rem | `.si-resale__unit-input .with-adornments .start-adornment`<br>`.si-resale__available-investments-options .with-adornments .start-adornment,.si-resale__available-investments-options .with-adornments .end-adornment`<br>`.si-resale__available-investments-options .with-adornments .start-adornment` |
| `.sticky-lg-top` | position: sticky; top: 0; z-index: 1020<br>@media (min-width: 1200px): position: sticky; top: 0; z-index: 1020 | `.sticky-lg-top` |
| `.sticky-md-top` | position: sticky; top: 0; z-index: 1020<br>@media (min-width: 992px): position: sticky; top: 0; z-index: 1020 | `.sticky-md-top` |
| `.sticky-sm-top` | position: sticky; top: 0; z-index: 1020<br>@media (min-width: 768px): position: sticky; top: 0; z-index: 1020 | `.sticky-sm-top` |
| `.sticky-top` | position: sticky; top: 0; z-index: 1020<br>@media (prefers-reduced-motion: reduce): position: sticky; top: 0; z-index: 1020 | `.sticky-top` |
| `.sticky-wrapper` | height: 0 !important<br>@media only screen and (max-width: 768px): height: 0 !important | `.sticky-wrapper` |
| `.top-0` | top: 0 !important<br>@media (min-width: 1200px): top: 0 !important | `.top-0` |
| `.top-50` | top: 50% !important<br>@media (min-width: 1200px): top: 50% !important | `.top-50` |
| `.top-100` | top: 100% !important<br>@media (min-width: 1200px): top: 100% !important | `.top-100` |

### Text alignment/layout (4)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.text-center` | text-align: center !important / center<br>@media (min-width: 1200px): text-align: center !important<br>@media (max-width: 991px): text-align: center | `.text-center` |
| `.text-center--md` | text-align: center !important<br>@media (max-width: 991px): text-align: center !important | `.text-center--md` |
| `.text-left` | text-align: left<br>@media (max-width: 991px): text-align: left | `.text-left` |
| `.text-right` | text-align: right<br>@media (max-width: 991px): text-align: right | `.text-right` |

### Image/media layout (10)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.img-fluid` | max-width: 100%; height: auto<br>@media (min-width: 1200px): max-width: 100%; height: auto | `.img-fluid` |
| `.img-hero--mobile` | max-width: 12.5rem; max-height: 12.5rem; margin-bottom: 3.5rem / 5rem<br>@media (max-width: 991px): max-width: 12.5rem; max-height: 12.5rem; margin-bottom: 3.5rem<br>@media (max-width: 991px)and (min-width: 768px): margin-bottom: 5rem | `.img-hero--mobile` |
| `.img-hero-council--mobile` | max-width: 18.75rem; margin-bottom: 2.8rem / 4rem<br>@media (max-width: 767px): max-width: 18.75rem; margin-bottom: 2.8rem<br>@media (max-width: 767px)and (min-width: 768px): margin-bottom: 4rem | `.img-hero-council--mobile` |
| `.img-responsive` | display: block; max-width: 100%; height: auto<br>@media (min-width: 1200px): display: block; max-width: 100%; height: auto | `.img-responsive` |
| `.img-thumbnail` | padding: .25rem; background-color: #fff; border: 1px solid #dee2e6; border-radius: .25rem; max-width: 100%; height: auto<br>@media (min-width: 1200px): padding: .25rem; background-color: #fff; border: 1px solid #dee2e6; border-radius: .25rem; max-width: 100%; height: auto | `.img-thumbnail` |
| `.ratio` | position: relative / absolute; width: 100%; display: block; padding-top: var(--bs-aspect-ratio); content: ""; top: 0; left: 0; height: 100%<br>@media (prefers-reduced-motion: reduce): position: relative / absolute; width: 100%; display: block; padding-top: var(--bs-aspect-ratio); content: ""; top: 0; left: 0; height: 100% | `.ratio`<br>`.ratio::before`<br>`.ratio>*` |
| `.ratio-1x1` | --bs-aspect-ratio: 100%<br>@media (prefers-reduced-motion: reduce): --bs-aspect-ratio: 100% | `.ratio-1x1` |
| `.ratio-4x3` | --bs-aspect-ratio: 75%<br>@media (prefers-reduced-motion: reduce): --bs-aspect-ratio: 75% | `.ratio-4x3` |
| `.ratio-16x9` | --bs-aspect-ratio: 56.25%<br>@media (prefers-reduced-motion: reduce): --bs-aspect-ratio: 56.25% | `.ratio-16x9` |
| `.ratio-21x9` | --bs-aspect-ratio: 42.8571428571%<br>@media (prefers-reduced-motion: reduce): --bs-aspect-ratio: 42.8571428571% | `.ratio-21x9` |

### Visibility/layout helpers (12)

| Class | Actual declarations found | Example selector(s) |
|---|---|---|
| `.hidden-form` | transition: max-height 1s ease-in-out; overflow: hidden / visible; max-height: 0 / 1000px<br>@media (min-width: 992px): transition: max-height 1s ease-in-out; overflow: hidden / visible; max-height: 0 / 1000px | `.hidden-form`<br>`.hidden-form.opening`<br>`.hidden-form.open` |
| `.hidden-md` | display: none !important<br>@media (max-width: 991px): display: none !important | `.hidden-md` |
| `.hiddenForm` | transition: max-height 1s ease; overflow: hidden; max-height: 0 / 1000px<br>@media (max-width: 991px): transition: max-height 1s ease; overflow: hidden; max-height: 0 / 1000px | `.hiddenForm`<br>`.hiddenForm.active` |
| `.hide` | display: none / none !important<br>@media (min-width: 1200px): display: none<br>@media (min-width: 992px): display: none !important<br>@media (min-width: 768px): display: none | `.toast.hide`<br>`.hide`<br>`.si-resale-listing__card-exterior.hide` |
| `.invisible` | visibility: hidden !important<br>@media (min-width: 1200px): visibility: hidden !important | `.invisible` |
| `.show` | color: #fff / #000 / #495057 / rgba(0,0,0,.9); background-color: rgb(10.4,88,202.4) / rgb(86.4,93.6,100) / rgb(20,108,67.2) / rgb(61.4,212.6,243) / rgb(255,205.4,56.6) / rgb(176,42.4,55.2) / rgb(249.4,250.2,251) / rgb(26.4,29.6,32.8) / #0d6efd / #6c757d / #198754 / #0dcaf0 / #ffc107 / #dc3545 / #f8f9fa / #212529 / #fff / rgba(40,40,39,.2) / rgba(40,40,39,.6); border-color: rgb(9.75,82.5,189.75) / rgb(81,87.75,93.75) / rgb(18.75,101.25,63) / rgb(37.2,207.3,241.5) / rgb(255,199.2,31.8) / rgb(165,39.75,51.75) / rgb(248.7,249.6,250.5) / rgb(24.75,27.75,30.75) / #0d6efd / #6c757d / #198754 / #0dcaf0 / #ffc107 / #dc3545 / #f8f9fa / #212529 / #dee2e6 #dee2e6 #fff / rgba(0,0,0,0); box-shadow: 0 0 0 .25rem rgba(49.3,131.75,253.3,.5) / 0 0 0 .25rem rgba(130.05,137.7,144.5,.5) / 0 0 0 .25rem rgba(59.5,153,109.65,.5) / 0 0 0 .25rem rgba(11.05,171.7,204,.5) / 0 0 0 .25rem rgba(216.75,164.05,5.95,.5) / 0 0 0 .25rem rgba(225.25,83.3,96.9,.5) / 0 0 0 .25rem rgba(210.8,211.65,212.5,.5) / 0 0 0 .25rem rgba(66.3,69.7,73.1,.5) / 0 0 0 .25rem rgba(13,110,253,.5) / 0 0 0 .25rem rgba(108,117,125,.5) / 0 0 0 .25rem rgba(25,135,84,.5) / 0 0 0 .25rem rgba(13,202,240,.5) / 0 0 0 .25rem rgba(255,193,7,.5) / 0 0 0 .25rem rgba(220,53,69,.5) / 0 0 0 .25rem rgba(248,249,250,.5) / 0 0 0 .25rem rgba(33,37,41,.5); opacity: 0 / .5 / .9 / 1; display: none / block / flex; transform: none / rotateZ(45deg) / rotateZ(-45deg) / rotate(180deg); content: " " / none; float: right; border-width: 5px; border-style: solid; width: 0 / 100vw; height: 0 / 100vh; margin-top: 5px / 7px; border-top-color: #ccc / #282827; border-bottom-width: 0px; position: absolute / fixed; top: 27px / 31px / 0 / 8rem / 13rem; right: 24px / 30px; background: rgba(0,0,0,0); left: 0; pointer-events: auto; border: unset; rotate: 180deg; flex-direction: column; gap: 1rem; z-index: 9999 / 10<br>@media (prefers-reduced-motion: reduce): color: #fff / #000 / #495057; background-color: rgb(10.4,88,202.4) / rgb(86.4,93.6,100) / rgb(20,108,67.2) / rgb(61.4,212.6,243) / rgb(255,205.4,56.6) / rgb(176,42.4,55.2) / rgb(249.4,250.2,251) / rgb(26.4,29.6,32.8) / #0d6efd / #6c757d / #198754 / #0dcaf0 / #ffc107 / #dc3545 / #f8f9fa / #212529 / #fff; border-color: rgb(9.75,82.5,189.75) / rgb(81,87.75,93.75) / rgb(18.75,101.25,63) / rgb(37.2,207.3,241.5) / rgb(255,199.2,31.8) / rgb(165,39.75,51.75) / rgb(248.7,249.6,250.5) / rgb(24.75,27.75,30.75) / #0d6efd / #6c757d / #198754 / #0dcaf0 / #ffc107 / #dc3545 / #f8f9fa / #212529 / #dee2e6 #dee2e6 #fff; box-shadow: 0 0 0 .25rem rgba(49.3,131.75,253.3,.5) / 0 0 0 .25rem rgba(130.05,137.7,144.5,.5) / 0 0 0 .25rem rgba(59.5,153,109.65,.5) / 0 0 0 .25rem rgba(11.05,171.7,204,.5) / 0 0 0 .25rem rgba(216.75,164.05,5.95,.5) / 0 0 0 .25rem rgba(225.25,83.3,96.9,.5) / 0 0 0 .25rem rgba(210.8,211.65,212.5,.5) / 0 0 0 .25rem rgba(66.3,69.7,73.1,.5) / 0 0 0 .25rem rgba(13,110,253,.5) / 0 0 0 .25rem rgba(108,117,125,.5) / 0 0 0 .25rem rgba(25,135,84,.5) / 0 0 0 .25rem rgba(13,202,240,.5) / 0 0 0 .25rem rgba(255,193,7,.5) / 0 0 0 .25rem rgba(220,53,69,.5) / 0 0 0 .25rem rgba(248,249,250,.5) / 0 0 0 .25rem rgba(33,37,41,.5); opacity: 0 / .5; display: none; transform: none<br>@media (min-width: 1200px): color: rgba(0,0,0,.9) / #fff; opacity: 0; display: block / flex; border-top-color: #282827<br>@media (max-width: 1199.98px): opacity: .9<br>@media (max-width: 1200px): content: " "; float: right; border-width: 5px; border-color: rgba(0,0,0,0); border-style: solid; display: block; width: 0; height: 0; margin-top: 5px / 7px; border-top-color: #ccc; border-bottom-width: 0px<br>@media (max-width: 767px): display: block / none / flex; border: unset; rotate: 180deg; flex-direction: column; gap: 1rem; z-index: 9999 / 10; content: none<br>@media (max-width: 1199px): position: absolute; top: 27px / 8rem; right: 24px; display: none / block; opacity: 1; transform: rotate(180deg); background-color: rgba(40,40,39,.6)<br>@media (min-width: 768px): top: 31px / 0 / 13rem; right: 30px; background: rgba(0,0,0,0); transform: rotateZ(45deg) / rotateZ(-45deg); position: fixed; display: block; left: 0; width: 100vw; height: 100vh; background-color: rgba(40,40,39,.2); pointer-events: auto; opacity: 1 | `.btn-check:checked+.btn-primary,.btn-check:active+.btn-primary,.btn-primary:active,.btn-primary.active,.show>.btn-primary.dropdown-toggle`<br>`.btn-check:checked+.btn-primary:focus,.btn-check:active+.btn-primary:focus,.btn-primary:active:focus,.btn-primary.active:focus,.show>.btn-primary.dropdown-toggle:focus`<br>`.btn-check:checked+.btn-secondary,.btn-check:active+.btn-secondary,.btn-secondary:active,.btn-secondary.active,.show>.btn-secondary.dropdown-toggle` |
| `.sr-only` | position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0<br>@media (max-width: 991px): position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0 | `.sr-only` |
| `.visible` | visibility: visible !important; overflow: hidden<br>@media (min-width: 1200px): visibility: visible !important<br>@media (max-width: 767px): overflow: hidden | `.visible`<br>`.vertical-stepper__content-collapsible:not(.visible)` |
| `.visible-desktop` | display: none / block<br>@media (min-width: 992px): display: none / block | `.visible-desktop` |
| `.visible-mobile` | display: block / none<br>@media (max-width: 767px): display: block<br>@media (min-width: 992px): display: none | `.visible-mobile` |
| `.visually-hidden` | position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important<br>@media (min-width: 1200px): position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important | `.visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within)` |
| `.visually-hidden-focusable` | position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important<br>@media (min-width: 1200px): position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important | `.visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within)` |

## Practical Starter Combos

```html
<!-- Wide centred wrapper close to v2 1180px rail -->
<div class="choke-1200 mx-auto p-x-spacer-xs">...</div>

<!-- Narrow centred wrapper close to v2 980px rail -->
<div class="choke-1000 mx-auto p-x-spacer-xs">...</div>

<!-- Section spacing using existing platform rhythm -->
<section class="position-relative p-y-spacer-xl">...</section>

<!-- Bootstrap/platform grid -->
<div class="container"><div class="row"><div class="col-md-6 col-12">...</div></div></div>

<!-- Simple flex centre -->
<div class="d-flex align-items-center justify-content-center">...</div>
<!-- Or platform helper -->
<div class="flex-center">...</div>
```
