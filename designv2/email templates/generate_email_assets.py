#!/usr/bin/env python3
"""Generate V2 email divider SVG/PNG assets and helper HTML."""

from __future__ import annotations

import html
import json
import math
import os
import struct
import zlib
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SVG_DIR = ROOT / "dividers" / "svg"
PNG_DIR = ROOT / "dividers" / "png"
SNIPPET_DIR = ROOT / "snippets"
BLOB_DIR = ROOT / "icons" / "png"

WIDTH = 1280
DISPLAY_WIDTH = 640
HEIGHT = 147
MOBILE_DISPLAY_WIDTH = 320
MOBILE_HEIGHT = 74

PALETTE = {
    "white": "#ffffff",
    "pink": "#f27fae",
    "teal": "#00a4b6",
    "yellow": "#ffb72c",
    "neutral": "#faf8f8",
    "neutral-deep": "#e9e4e3",
    "ink": "#363635",
}

SHAPES = {
    "mask-top": {
        "source_class": ".abundance-mask--top",
        "view_box": (6000, 700),
        "path": "M0 360L1850 684L6000 24V700H0V360Z",
        "description": "Large masked section entry, used above coloured editorial bands.",
    },
    "mask-bottom": {
        "source_class": ".abundance-mask--bottom",
        "view_box": (6000, 700),
        "path": "M0 0H6000V340L4200 16L0 684V0Z",
        "description": "Large masked section exit, used below coloured editorial bands.",
    },
    "divider-rise-left": {
        "source_class": ".abundance-dividers--rise-left",
        "view_box": (6000, 700),
        "path": "M0 588L0 700L1980 252L6000 532L6000 420L1980 140Z",
        "description": "Thin editorial angled divider rising from left.",
    },
    "divider-rise-right": {
        "source_class": ".abundance-dividers--rise-right",
        "view_box": (6000, 700),
        "path": "M0 546L0 658L3960 210L6000 336L6000 224L3960 98Z",
        "description": "Thin editorial angled divider rising from right.",
    },
    "divider-fall-left": {
        "source_class": ".abundance-dividers--fall-left",
        "view_box": (6000, 700),
        "path": "M0 210L0 322L1980 574L6000 294L6000 182L1980 462Z",
        "description": "Thin editorial angled divider falling from left.",
    },
    "footer-peak": {
        "source_class": ".bg-mask--abv2-footer-peak",
        "view_box": (6000, 700),
        "path": "M0 430L1850 70L6000 430V700H0V430Z",
        "description": "Footer peak transition from page content into yellow footer.",
    },
    "dot-blob": {
        "source_class": "--abv2-dot-mask",
        "view_box": (200, 200),
        "path": "M99.3243 200C174.509 200 190.531 154.684 198.649 100.137C209.406 27.8664 154.063 -3.34294 99.3243 0.282052C35.8709 4.47904 0 44.9903 0 100.137C0 155.285 23.2712 200 99.3243 200Z",
        "description": "Organic V2 blob mask used behind numbers, notes and editorial accents.",
    },
    "cap-bottom-concave": {
        "source_class": ".bg-cap--b-concave-white",
        "view_box": (1440, 57),
        "path": "M1440 56.0905V0C1253.56 30.7621 1015.85 48.0905 710.27 48.0905C424.167 48.0905 189.936 33.4422 0 7.07972V56.0905H1440Z",
        "description": "Legacy/platform bottom concave cap found in the compiled V2 CSS.",
    },
    "cap-top-concave": {
        "source_class": ".bg-cap--t-concave-white",
        "view_box": (1440, 72),
        "path": "M1440 0H0V71.4574C199.072 37.0112 436.894 15.3811 710.27 9.35385C751.084 8.4529 791.921 8.00023 832.648 8H832.711C1044.35 8.00121 1253.02 20.22 1440 45.2387V0Z",
        "description": "Legacy/platform top concave cap found in the compiled V2 CSS.",
    },
    "cap-bottom-convex": {
        "source_class": ".bg-cap--b-convex-white, .bg-mask--b-convex",
        "view_box": (1440, 95),
        "path": "M1440 46.9095C1253.56 77.6716 1015.85 95 710.27 95C424.167 95 189.936 80.3517 0 53.9892L0 0H1440V46.9095Z",
        "description": "Legacy/platform bottom convex cap found in the compiled V2 CSS.",
    },
    "cap-top-convex": {
        "source_class": ".bg-cap--t-convex-white, .bg-cap--t-convex-neutral-300, .bg-mask--t-convex",
        "view_box": (1440, 96),
        "path": "M0 63.4574L0 96H1440V37.2387C1253.02 12.22 1044.35 0.0012153 832.711 9.0652e-08C832.69 -3.02174e-08 832.669 -3.02172e-08 832.648 9.0652e-08C791.921 0.00023394 751.084 0.452901 710.27 1.35385C436.894 7.38112 199.072 29.0112 0 63.4574Z",
        "description": "Legacy/platform top convex cap found in the compiled V2 CSS.",
    },
    "pitch-page-hero-img-mask": {
        "source_class": ".pitch-page-hero-img-mask",
        "view_box": (384, 384),
        "path": "M190.703 384C335.058 384 365.82 296.993 381.406 192.264C402.059 53.5034 295.8 -6.41845 190.703 0.54154C68.8721 8.59975 0 86.3815 0 192.264C0 298.146 44.6808 384 190.703 384Z",
        "description": "Organic image mask found in the compiled V2 CSS.",
    },
}

TRANSITIONS = [
    ("pink", "white"),
    ("white", "pink"),
    ("teal", "white"),
    ("white", "teal"),
    ("yellow", "white"),
    ("white", "yellow"),
    ("neutral", "white"),
    ("white", "neutral"),
]

FOOTER_TRANSITIONS = [
    ("white", "yellow"),
    ("neutral", "yellow"),
    ("neutral", "ink"),
    ("white", "ink"),
    ("yellow", "ink"),
]


def hex_to_rgb(value: str) -> tuple[int, int, int, int]:
    value = value.lstrip("#")
    return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), 255)


def parse_path(path: str) -> list[tuple[float, float]]:
    tokens = []
    buf = ""
    for ch in path:
        if ch in "MLHVCSZmlhvcsz":
            if buf.strip():
                tokens.extend(buf.replace(",", " ").split())
            tokens.append(ch)
            buf = ""
        elif ch == "-":
            if buf.strip() and not buf.endswith(("e", "E")):
                tokens.extend(buf.replace(",", " ").split())
                buf = ch
            else:
                buf += ch
        else:
            buf += ch
    if buf.strip():
        tokens.extend(buf.replace(",", " ").split())

    points = []
    i = 0
    cmd = None
    current = (0.0, 0.0)
    while i < len(tokens):
        if tokens[i].isalpha():
            cmd = tokens[i]
            i += 1
            if cmd.upper() == "Z":
                continue
        if cmd in ("M", "L"):
            x = float(tokens[i])
            y = float(tokens[i + 1])
            current = (x, y)
            points.append(current)
            i += 2
            if cmd == "M":
                cmd = "L"
        elif cmd == "H":
            x = float(tokens[i])
            current = (x, current[1])
            points.append(current)
            i += 1
        elif cmd == "V":
            y = float(tokens[i])
            current = (current[0], y)
            points.append(current)
            i += 1
        elif cmd == "C":
            # The only curved source here is the blob. Approximate each cubic
            # with enough line segments for clean high-density email testing.
            x0, y0 = current
            x1, y1, x2, y2, x3, y3 = map(float, tokens[i : i + 6])
            for step in range(1, 33):
                t = step / 32
                mt = 1 - t
                x = mt**3 * x0 + 3 * mt**2 * t * x1 + 3 * mt * t**2 * x2 + t**3 * x3
                y = mt**3 * y0 + 3 * mt**2 * t * y1 + 3 * mt * t**2 * y2 + t**3 * y3
                points.append((x, y))
            current = (x3, y3)
            i += 6
        else:
            raise ValueError(f"Unsupported path command: {cmd}")
    return points


def point_in_poly(x: float, y: float, poly: list[tuple[float, float]]) -> bool:
    inside = False
    j = len(poly) - 1
    for i, point in enumerate(poly):
        xi, yi = point
        xj, yj = poly[j]
        if (yi > y) != (yj > y):
            cross = (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi
            if x <= cross:
                inside = not inside
        j = i
    return inside


def png_bytes(width: int, height: int, rgba: bytearray) -> bytes:
    def chunk(kind: bytes, data: bytes) -> bytes:
        return (
            struct.pack(">I", len(data))
            + kind
            + data
            + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)
        )

    scanlines = bytearray()
    stride = width * 4
    for y in range(height):
        scanlines.append(0)
        scanlines.extend(rgba[y * stride : (y + 1) * stride])
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(bytes(scanlines), 9))
        + chunk(b"IEND", b"")
    )


def render_shape(shape_key: str, top: str, bottom: str, transparent: bool = False) -> tuple[str, int, int]:
    shape = SHAPES[shape_key]
    vbw, vbh = shape["view_box"]
    points = [(x * WIDTH / vbw, y * HEIGHT / vbh) for x, y in parse_path(shape["path"])]
    from_rgba = hex_to_rgb(PALETTE[top])
    to_rgba = hex_to_rgb(PALETTE[bottom])
    clear = (0, 0, 0, 0)
    rgba = bytearray(WIDTH * HEIGHT * 4)

    if shape_key in ("mask-top", "footer-peak"):
        base_rgba = from_rgba
        shape_rgba = to_rgba
    else:
        base_rgba = to_rgba
        shape_rgba = from_rgba

    for y in range(HEIGHT):
        for x in range(WIDTH):
            fill = shape_rgba if point_in_poly(x + 0.5, y + 0.5, points) else base_rgba
            if transparent:
                fill = from_rgba if point_in_poly(x + 0.5, y + 0.5, points) else clear
            off = (y * WIDTH + x) * 4
            rgba[off : off + 4] = bytes(fill)

    suffix = "transparent" if transparent else f"{top}-to-{bottom}"
    filename = f"{shape_key}-{suffix}@2x.png"
    (PNG_DIR / filename).write_bytes(png_bytes(WIDTH, HEIGHT, rgba))
    return filename, WIDTH, HEIGHT


def draw_rect(rgba: bytearray, width: int, x0: int, y0: int, x1: int, y1: int, colour: tuple[int, int, int, int]) -> None:
    height = len(rgba) // (width * 4)
    for y in range(max(0, y0), min(height, y1)):
        for x in range(max(0, x0), min(width, x1)):
            off = (y * width + x) * 4
            rgba[off : off + 4] = bytes(colour)


def draw_digit(rgba: bytearray, width: int, digit: int, colour: tuple[int, int, int, int]) -> None:
    # Simple bold, Georgia-ish numeral marks. These are rasterised into the
    # blob PNGs so email clients do not need web fonts, masks or SVG support.
    factor = width / 96

    def r(x0: int, y0: int, x1: int, y1: int) -> None:
        draw_rect(
            rgba,
            width,
            round(x0 * factor),
            round(y0 * factor),
            round(x1 * factor),
            round(y1 * factor),
            colour,
        )

    if digit == 1:
        r(42, 26, 54, 32)
        r(50, 26, 64, 78)
        r(38, 72, 74, 82)
    elif digit == 2:
        r(34, 24, 70, 34)
        r(64, 34, 76, 48)
        r(50, 48, 68, 58)
        r(38, 58, 54, 70)
        r(34, 70, 76, 82)
    elif digit == 3:
        r(34, 24, 70, 34)
        r(62, 34, 76, 48)
        r(46, 48, 70, 58)
        r(62, 58, 76, 72)
        r(34, 72, 70, 82)


def render_blob_number(digit: int, colour_name: str) -> dict[str, str | int]:
    size = 96
    scale = 3
    hi = size * scale
    shape = SHAPES["dot-blob"]
    vbw, vbh = shape["view_box"]
    points = [(x * hi / vbw, y * hi / vbh) for x, y in parse_path(shape["path"])]
    fill = hex_to_rgb(PALETTE[colour_name])
    ink = hex_to_rgb(PALETTE["ink"])
    clear = (0, 0, 0, 0)
    hi_rgba = bytearray(hi * hi * 4)

    for y in range(hi):
        for x in range(hi):
            value = fill if point_in_poly(x + 0.5, y + 0.5, points) else clear
            off = (y * hi + x) * 4
            hi_rgba[off : off + 4] = bytes(value)

    draw_digit(hi_rgba, hi, digit, ink)

    rgba = bytearray(size * size * 4)
    for y in range(size):
        for x in range(size):
            totals = [0, 0, 0, 0]
            for yy in range(scale):
                for xx in range(scale):
                    off = (((y * scale + yy) * hi) + (x * scale + xx)) * 4
                    for channel in range(4):
                        totals[channel] += hi_rgba[off + channel]
            out = bytes(round(value / (scale * scale)) for value in totals)
            off = (y * size + x) * 4
            rgba[off : off + 4] = out

    filename = f"blob-number-{digit}-{colour_name}@2x.png"
    (BLOB_DIR / filename).write_bytes(png_bytes(size, size, rgba))
    return {
        "shape": "dot-blob",
        "transition": f"number-{digit}-{colour_name}",
        "file": f"icons/png/{filename}",
        "width": size,
        "height": size,
        "source_svg": "dividers/svg/dot-blob.svg",
    }


def write_svg_sources() -> list[dict[str, str]]:
    records = []
    for key, shape in SHAPES.items():
        vbw, vbh = shape["view_box"]
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vbw} {vbh}" '
            f'preserveAspectRatio="none" role="img" aria-label="{html.escape(shape["description"])}">\n'
            f'  <path fill="#000000" d="{shape["path"]}"/>\n'
            f"</svg>\n"
        )
        filename = f"{key}.svg"
        (SVG_DIR / filename).write_text(svg, encoding="utf-8")
        records.append({"shape": key, "source_class": shape["source_class"], "file": f"dividers/svg/{filename}"})
    return records


def write_contact_sheet(files: list[dict[str, str]]) -> None:
    items = "\n".join(
        f'''        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e9e4e3;font:14px Arial,sans-serif;color:#363635;">{html.escape(item["name"])}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e9e4e3;"><img src="png/{html.escape(item["file"])}" width="320" style="display:block;width:320px;height:auto;border:1px solid #e9e4e3;" alt="{html.escape(item["alt"])}"></td>
        </tr>'''
        for item in files
    )
    (ROOT / "dividers" / "contact-sheet.html").write_text(
        f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Abundance V2 Email Divider Contact Sheet</title>
</head>
<body style="margin:0;background:#faf8f8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px;max-width:100%;background:#ffffff;">
          <tr>
            <td style="padding:24px;font:bold 26px Georgia,serif;color:#363635;">Abundance V2 email divider assets</td>
          </tr>
{items}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_test_page(files: list[dict[str, str]]) -> None:
    blocks = "\n".join(
        f'''        <tr>
          <td style="padding:20px 0 6px;font:bold 16px Arial,sans-serif;color:#363635;">{html.escape(item["name"])}</td>
        </tr>
        <tr>
          <td><img src="png/{html.escape(item["file"])}" width="640" style="display:block;width:100%;max-width:640px;height:auto;" alt="{html.escape(item["alt"])}"></td>
        </tr>'''
        for item in files
        if "transparent" not in item["name"]
    )
    (ROOT / "divider-email-test.html").write_text(
        f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Abundance Divider Email Test</title>
  <style>
    @media only screen and (max-width: 640px) {{
      .email-container {{ width:100% !important; }}
      .mobile-pad {{ padding-left:18px !important; padding-right:18px !important; }}
    }}
  </style>
</head>
<body style="margin:0;padding:0;background:#faf8f8;">
  <center role="article" aria-roledescription="email" lang="en" style="width:100%;background:#faf8f8;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" class="email-container" style="width:640px;max-width:640px;margin:0 auto;background:#ffffff;">
      <tr><td class="mobile-pad" style="padding:28px 24px;font:bold 28px Georgia,serif;color:#363635;">Divider test at 640px and mobile-scaled width</td></tr>
{blocks}
    </table>
  </center>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_snippets(files: list[dict[str, str]]) -> None:
    rows = []
    for item in files:
        if "transparent" in item["name"]:
            continue
        snippet = f"""<!-- BeeFree row: {item["name"]} -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
  <tr>
    <td align="center" style="padding:0;margin:0;line-height:0;font-size:0;">
      <img src="dividers/png/{item["file"]}" width="{DISPLAY_WIDTH}" height="{round(HEIGHT / 2)}" alt="" role="presentation" style="display:block;width:100%;max-width:{DISPLAY_WIDTH}px;height:auto;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;">
    </td>
  </tr>
</table>
"""
        filename = item["name"].replace("@2x.png", ".html")
        (SNIPPET_DIR / filename).write_text(snippet, encoding="utf-8")
        rows.append({"name": item["name"], "snippet": f"snippets/{filename}"})
    (ROOT / "beefree-divider-snippet-index.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")


def write_manifest(svg_records: list[dict[str, str]], png_records: list[dict[str, str]]) -> None:
    manifest = {
        "source_css": "designv2/component html/abundance-main-css.css",
        "target_display_width_px": DISPLAY_WIDTH,
        "rendered_width_px": WIDTH,
        "rendered_height_px": HEIGHT,
        "palette": PALETTE,
        "source_svgs": svg_records,
        "outputs": png_records,
        "notes": [
            "PNG assets are flat rendered for email clients that do not support CSS mask-image, clip-path or pseudo-elements.",
            "Transparent PNGs contain the shape only and are intended for QA/testing, not primary production rows.",
            "The V2 CSS height is 11.5% of width. At 1280px this is rounded to 147px.",
        ],
    }
    (ROOT / "divider-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    lines = [
        "# Divider Asset Manifest",
        "",
        f"- Source CSS: `designv2/component html/abundance-main-css.css`",
        f"- Display width: `{DISPLAY_WIDTH}px`",
        f"- Render width: `{WIDTH}px`",
        f"- Render height: `{HEIGHT}px`",
        "",
        "## Source Shapes",
    ]
    for shape in svg_records:
        lines.append(f"- `{shape['shape']}` from `{shape['source_class']}` -> `{shape['file']}`")
    lines.extend(["", "## Outputs"])
    for item in png_records:
        lines.append(
            f"- `{item['file']}`: `{item['shape']}`, `{item['transition']}`, `{item['width']}x{item['height']}`"
        )
    (ROOT / "divider-manifest.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    for directory in (SVG_DIR, PNG_DIR, SNIPPET_DIR, BLOB_DIR):
        directory.mkdir(parents=True, exist_ok=True)

    svg_records = write_svg_sources()
    png_records = []
    contact = []

    production_shapes = ["mask-top", "mask-bottom", "divider-rise-left", "divider-rise-right", "divider-fall-left"]
    for shape in production_shapes:
        for top, bottom in TRANSITIONS:
            filename, width, height = render_shape(shape, top, bottom)
            record = {
                "shape": shape,
                "transition": f"{top}-to-{bottom}",
                "file": filename,
                "width": width,
                "height": height,
                "source_svg": f"dividers/svg/{shape}.svg",
            }
            png_records.append(record)
            contact.append({"name": filename, "file": filename, "alt": f"{shape} {top} to {bottom}"})
        filename, width, height = render_shape(shape, "white", "ink", transparent=True)
        record = {
            "shape": shape,
            "transition": "transparent-test",
            "file": filename,
            "width": width,
            "height": height,
            "source_svg": f"dividers/svg/{shape}.svg",
        }
        png_records.append(record)
        contact.append({"name": filename, "file": filename, "alt": f"{shape} transparent test"})

    for top, bottom in FOOTER_TRANSITIONS:
        filename, width, height = render_shape("footer-peak", top, bottom)
        record = {
            "shape": "footer-peak",
            "transition": f"{top}-to-{bottom}",
            "file": filename,
            "width": width,
            "height": height,
            "source_svg": "dividers/svg/footer-peak.svg",
        }
        png_records.append(record)
        contact.append({"name": filename, "file": filename, "alt": f"footer peak {top} to {bottom}"})
    filename, width, height = render_shape("footer-peak", "white", "ink", transparent=True)
    png_records.append(
        {
            "shape": "footer-peak",
            "transition": "transparent-test",
            "file": filename,
            "width": width,
            "height": height,
            "source_svg": "dividers/svg/footer-peak.svg",
        }
    )
    contact.append({"name": filename, "file": filename, "alt": "footer peak transparent test"})

    for digit, colour in ((1, "yellow"), (2, "pink"), (3, "teal")):
        png_records.append(render_blob_number(digit, colour))

    write_contact_sheet(contact)
    write_test_page(contact)
    write_snippets(contact)
    write_manifest(svg_records, png_records)


if __name__ == "__main__":
    main()
