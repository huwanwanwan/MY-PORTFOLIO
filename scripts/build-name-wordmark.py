"""Build a portable, transparent SVG from the One Piece fan font (requires fontTools)."""
from pathlib import Path
from html import escape
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parent.parent
font_path = root / "profile-assets/fonts/one-piece/OnePiece-zAqL.ttf"
font = TTFont(font_path)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
name = "JUAN DOMANICO MILITANTE"
advance = 0
parts = []
bottom, top = float("inf"), float("-inf")
for character in name:
    glyph_name = cmap.get(ord(character))
    if not glyph_name:
        raise ValueError(f"Missing character: {character}")
    glyph = glyphs[glyph_name]
    pen = SVGPathPen(glyphs)
    glyph.draw(pen)
    bounds = BoundsPen(glyphs)
    glyph.draw(bounds)
    if bounds.bounds:
        bottom = min(bottom, bounds.bounds[1])
        top = max(top, bounds.bounds[3])
    if pen.getCommands():
        parts.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
    advance += font["hmtx"].metrics[glyph_name][0]

scale = min(864 / advance, 78 / (top - bottom))
x = (1000 - advance * scale) / 2
y = (112 - (top - bottom) * scale) / 2 + top * scale
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="112" viewBox="0 0 1000 112" role="img" aria-labelledby="title">
<title id="title">Juan Domanico Militante — One Piece style name</title>
<desc>Transparent vector lettering set in ONE PIECE by Phantom King Graphics.</desc>
<g transform="translate({x:.3f} {y:.3f}) scale({scale:.6f} {-scale:.6f})" fill="#EDF1F7">{''.join(parts)}</g>
</svg>
'''
(root / "profile-assets/name-one-piece.svg").write_text(svg, encoding="utf-8")
print("Created transparent SVG wordmark with real font outlines.")
