#!/usr/bin/env python3
"""Extract the photos embedded in Jess Duma's portfolio PDF into src/assets/obras/.

The PDF (exported from Canva) carries the original photos at 2400-5400px. This script
extracts them with `pdfimages`, renames each one after the work it shows (mapping below,
by PDF page + image index) and resizes to a max long side, so Astro can build responsive
versions from a sane source.

Requires: pdfimages (poppler) and ImageMagick (`magick`).

Usage:
  python3 scripts/import-portfolio.py ~/Downloads/Portfólio_JessDuma_2026.pdf
  python3 scripts/import-portfolio.py PDF --max 2400 --quality 84 --dry-run

When the portfolio changes (new works), add lines to MAP and rerun: output is regenerated.
"""
import argparse
import os
import subprocess
import sys
import tempfile
from pathlib import Path

# (page, image index on that page as listed by `pdfimages -list`) -> output name
MAP = {
    (1, 0): "capa-detalhe",
    (2, 1): "retrato",
    (4, 2): "para-que-eu-sirva",
    (5, 3): "para-que-eu-sirva-detalhe",
    (6, 4): "margem-de-transbordamento",
    (7, 5): "margem-de-transbordamento-detalhe",
    (8, 6): "vigilia-mental",
    (9, 7): "vigilia-mental-detalhe",
    (10, 8): "biopsia-do-grito",
    (11, 9): "biopsia-do-grito-detalhe",
    (12, 10): "saturacao-ii",
    (13, 11): "saturacao-ii-detalhe",
    (14, 12): "fissura-mundi",
    (15, 13): "afinidade-d2-1",
    (16, 14): "afinidade-d2-2",
    (17, 15): "afinidade-d2-3",
    (18, 16): "afinidade-d2-4",
    (19, 17): "afinidade-d2-5",
    (20, 18): "afinidade-d2-6",
    (21, 19): "saturacao-i",
    (22, 20): "saturacao-i-detalhe",
    (23, 21): "saturacao-i-vista",
    (24, 22): "topografia-da-falha",
    (25, 23): "topografia-da-falha-detalhe",
    (26, 24): "topografia-da-falha-vista",
    (27, 25): "ratoeira",
    (28, 26): "ratoeira-detalhe-1",
    (28, 27): "ratoeira-detalhe-2",
    (28, 28): "ratoeira-detalhe-3",
    (29, 29): "ratoeira-vista",
    (30, 30): "peso-de-papel",
    (31, 31): "peso-de-papel-detalhe",
    (32, 32): "um-para-dormir",
    (33, 33): "um-para-dormir-detalhe-1",
    (33, 34): "um-para-dormir-detalhe-2",
    (34, 35): "doses-1",
    (34, 36): "doses-2",
    (34, 37): "doses-3",
    (36, 38): "obsolescencia",
    (37, 39): "obsolescencia-detalhe",
    (38, 40): "santo",
    (39, 41): "santo-detalhe-1",
    (39, 42): "santo-detalhe-2",
    (40, 43): "familiar",
    (41, 44): "familiar-detalhe",
    (42, 45): "heranca",
    (43, 46): "heranca-detalhe-1",
    (44, 47): "heranca-detalhe-2",
    (45, 48): "conforto",
    (46, 49): "conforto-detalhe",
    (48, 50): "o-valor-da-presenca",
    (49, 51): "o-valor-da-presenca-vista",
}


# Extra crops made from an already extracted image: name -> (source name, ImageMagick geometry
# on the ORIGINAL pixels). "capa" = the dark middle strip, close to the portfolio's cover crop.
CROPS = {
    "capa": ((1, 0), "2450x1580+1361+980"),
}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf", help="portfolio PDF")
    ap.add_argument("--out", default="src/assets/obras", help="output dir (default: %(default)s)")
    ap.add_argument("--max", type=int, default=2400, help="max long side in px (default: %(default)s)")
    ap.add_argument("--quality", type=int, default=84, help="JPEG quality (default: %(default)s)")
    ap.add_argument("--dry-run", action="store_true", help="only print the mapping")
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["pdfimages", "-all", "-p", args.pdf, os.path.join(tmp, "x")], check=True)
        files = {}
        for f in sorted(os.listdir(tmp)):
            _, page, num = Path(f).stem.split("-")
            files[(int(page), int(num))] = os.path.join(tmp, f)
        missing = [k for k in MAP if k not in files]
        if missing:
            sys.exit(f"images not found in PDF: {missing}")
        for key, name in MAP.items():
            dest = out / f"{name}.jpg"
            print(f"p{key[0]:02d} #{key[1]:02d} -> {dest}")
            if args.dry_run:
                continue
            subprocess.run([
                "magick", files[key], "-colorspace", "sRGB", "-resize", f"{args.max}x{args.max}>",
                "-strip", "-quality", str(args.quality), "-interlace", "Plane", str(dest),
            ], check=True)
        for name, (key, geom) in CROPS.items():
            dest = out / f"{name}.jpg"
            print(f"p{key[0]:02d} #{key[1]:02d} crop {geom} -> {dest}")
            if args.dry_run:
                continue
            subprocess.run([
                "magick", files[key], "-colorspace", "sRGB", "-crop", geom, "+repage",
                "-resize", f"{args.max}x{args.max}>", "-strip", "-quality", str(args.quality),
                "-interlace", "Plane", str(dest),
            ], check=True)


if __name__ == "__main__":
    main()
