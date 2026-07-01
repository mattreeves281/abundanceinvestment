# UAT Revised v1 Type Spec Snag Report

## Summary

| Area | Status | Note |
|---|---|---|
| Heading letter-spacing | Spec mismatch | UAT headings are missing the revised spec letter-spacing |
| Heading weight | Spec mismatch | Spec expected `600`; UAT currently appears to render heading classes at `700` |
| Heading 1/2 mobile line-height | Spec mismatch | Minor responsive value difference |
| Body letter-spacing | Spec mismatch | Most body classes use `letter-spacing: normal` rather than revised spec value |
| `.body--lg` line-height | Spec mismatch | One line-height mismatch found |
| Label styles | Spec mismatch | Some label line-height/colour/size differences, especially `.label-lg` |

## Detail

### Headings

The revised primitive spec expects heading styles to use the updated letter-spacing and a `600` font-weight. UAT heading classes are available and usable, but the values do not exactly match the revised primitive specification.

Suggested action:

- Add the revised heading letter-spacing values.
- Check whether UAT should use `600` rather than `700` for the relevant heading classes.
- Check mobile line-height values for heading 1 and heading 2.

### Body Text

Body type classes exist in UAT and are usable for the HTML mapping. The main mismatch is that several body classes use `letter-spacing: normal` rather than the revised primitive value.

Suggested action:

- Add the revised body letter-spacing values.
- Check `.body--lg` line-height against the revised primitive spec.

### Labels

Label classes exist in UAT, but some values differ from the revised primitive spec, particularly around line-height, colour, and `.label-lg` size.

Suggested action:

- Review label line-height and colour values against the revised primitive spec.
- Check `.label-lg` size against the expected spec value.

## Priority

These should be handled after the functional HTML mapping blockers. They may affect visual fidelity, but they do not prevent the pages from being rebuilt against UAT CSS.
