# Abundance V2 Email Design System Adaptation

This folder contains a production-oriented HTML email adaptation of the V2 website visual language. It intentionally does not reuse the website CSS directly. The source review covered `designv2/component html/abundance-main-css.css` and the checked blob pages in `designv2/v2 actual pages checked blobs`.

## 1. Email Design Tokens Extracted From V2

**Canvas and width**
- Email shell: `640px` max width, centred on `#faf8f8`.
- Main content: `#ffffff` or V2 band colours, with table rows split for BeeFree import.
- Mobile: single-column stacking below `640px`; content padding reduces from `32px` to `20px`.

**Palette**
- Ink: `#363635`
- Secondary text: `#4d4a46`
- White: `#ffffff`
- Neutral surface: `#faf8f8`
- Neutral rule: `#e9e4e3`
- Soft neutral block: `#f1eeed`
- Pink: `#f27fae`
- Pink dark/action: `#c1658b`
- Pink surface: `#f7d9e8`
- Teal: `#00a4b6`
- Teal dark/action: `#008391`
- Teal surface: `#cdebf0`
- Yellow: `#ffb72c`
- Yellow surface: `#ffeecd`

Use the saturated pink, teal and yellow as the primary V2 email signal. Lighter surfaces are supporting tones for notes and secondary cards, not the dominant look.

**Type**
- Headings: V2 `New Kansas`; email fallback uses `Georgia, serif`, bold.
- Body: V2 `Sohne Buch`; email fallback uses `Arial, sans-serif`.
- UI/button text: V2 `Sohne Kraftig`; email fallback uses `Arial, sans-serif`, bold.
- Email scale: hero `44/46`, section heads `32-34/36-38`, card heads `25/28`, body `16/25`, small/regulatory `12-13/18-20`.

**Shape and spacing**
- Cards: rounded `20-24px`, with no nested-card structure.
- CTA buttons: V2 outline-first model; resolved large-button values are `2px` border, `999px` radius, `14px 24px` padding, `15px` font size and `15px` line-height. Primary is pink outline/text, secondary is teal outline/text, tertiary is ink outline/text on coloured bands.
- Dividers: V2 mask/divider SVGs rendered as bitmap rows at `1280x147px`, displayed at `640x74px`.
- Mask cadence: top masks use the previous section colour as the base and incoming section colour as the shape; bottom masks use the outgoing section colour as the shape and next section colour as the base.
- Editorial rhythm: generous `24-42px` row padding, soft neutral article section, highlighted note with a pink left border.
- Logo: use the proper Abundance asset `https://cdn4.sharein.com/abundance/assets/icons/logo-new-2.svg`. For Outlook-heavy sends, create and host a PNG fallback export of the same logo.

## 2. Standalone HTML Templates

Primary component-test template:

- `abundance-v2-content-page-email.html`

Secondary homepage/newsletter reference:

- `abundance-v2-newsletter-email.html`

`abundance-v2-newsletter-email.html` is the homepage/newsletter-led variant. It demonstrates:

- Preheader
- Brand header
- Hero section
- Heading and body copy
- Primary CTA with Outlook VML fallback
- Two-column promotional cards
- Article/news rows
- Highlighted information block
- Footer and regulatory copy

`abundance-v2-content-page-email.html` is the content-page variant based primarily on `how-it-works.html`. It demonstrates:

- Editorial illustrated hero
- On-this-page link group
- `abundance-dividers` thin mask accents
- Feature card matrix
- Proper top mask / coloured section / bottom mask cadence
- Step rows
- Quote block
- Rate/stat cards
- Two-way comparison cards
- Case-study rows
- Hard-coded use-of-funds bar chart
- Email-safe FAQ rows
- Yellow footer

Use the content-page variant as the single main preview for testing reusable components.

Before production send, replace placeholder links, copy and the regulatory footer with the current approved wording.

## 3. BeeFree Row Component Map

Recommended reusable rows:

1. `preheader-hidden`
   - Hidden preview text row; keep campaign-specific.
2. `brand-header`
   - White header row with the real Abundance logo and right-side label.
3. `hero-image-copy`
   - White homepage-style hero with rounded image, editorial headline, body and pink outline CTA.
4. `image-two-up-investments`
   - Two square investment image tiles; stacks on mobile.
5. `masked-pink-impact-band`
   - Full colour accent band using top and bottom section masks, image, copy, stats and ink outline CTA.
6. `masked-teal-related-links`
   - Full colour accent band for related links and next-step navigation.
7. `divider-row`
   - Import one snippet from `snippets/*.html`; swap PNG filename for the desired colour transition.
8. `abundance-divider-accent`
   - Use `divider-rise-left-*`, `divider-rise-right-*` or `divider-fall-left-*` assets as thin editorial accents between normal sections.
9. `article-list`
   - Neutral background news row with date column and linked headline.
10. `highlight-note`
   - Soft neutral information block with pink left rule.
11. `secondary-cta`
   - Outline pill CTA for secondary actions.
12. `comparison-two-way`
   - Two nested cards comparing regular investing and single deposits.
13. `case-study-rows`
   - Image-led story rows with linked text actions.
14. `use-of-funds-chart`
   - Hard-coded table-based bar chart; no select/dropdown behaviour in email.
15. `faq-static`
   - Expanded question/answer rows. True interactive accordions are not reliable in major email clients.
16. `footer-peak-divider`
   - Footer-specific peak divider.
17. `footer-regulatory`
   - Yellow V2 footer with logo, links, unsubscribe and regulatory copy.

The generated BeeFree divider snippets are in `snippets/`, with an index at `beefree-divider-snippet-index.json`. Additional hand-authored row snippets include `hero-image-copy.html`, `image-two-up-investments.html`, `masked-pink-impact-band.html` and `risk-note.html`.

## 4. V2 Treatments Not Reliably Reproduced In Email

- CSS masks and `clip-path`: replaced with rendered PNG divider rows. This preserves the V2 geometry in Outlook and other conservative clients.
- Pseudo-elements for band edges, card rules and footer peaks: replaced with real table rows, inline borders or PNG assets.
- Web fonts: retained as a visual reference only; production email uses `Georgia` for headings and `Arial` for body/UI fallback.
- CSS grid/flex layouts: rebuilt as nested tables with mobile stacking classes.
- Hover/focus transitions: omitted from core email rendering; CTA hierarchy is communicated by colour, border and text weight.
- Organic blob masks in content: extracted as `dividers/svg/dot-blob.svg`, but not used as a live CSS mask in email. Use a pre-rendered PNG if a future campaign needs blob art.
- Shadows: reduced or omitted. Many email clients render shadows inconsistently, so hierarchy relies on colour surfaces, spacing and rounded corners.
- Remote/background images: avoided for structural content. Any campaign images should use normal `<img>` tags with meaningful `alt`, fixed `width`, intrinsic dimensions and a solid background colour behind them.

## Divider Asset Library

Generated files:

- Source SVGs: `dividers/svg/`, including the active V2 email divider family plus legacy/platform caps and organic masks found in the compiled CSS.
- Production PNGs: `dividers/png/`
- Contact sheet: `dividers/contact-sheet.html`
- Email test page: `divider-email-test.html`
- Manifest: `divider-manifest.md` and `divider-manifest.json`

Regenerate with:

```bash
python3 "designv2/email templates/generate_email_assets.py"
```
