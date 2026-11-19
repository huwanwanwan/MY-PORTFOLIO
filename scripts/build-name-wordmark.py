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
# The fan font substitutes figures for I and an anchor for E. Keep only its skull O.
plain_letters = {
    "I": ("M80 0H590V70L430 110V1310L590 1350V1420H80V1350L240 1310V110L80 70Z", 672),
    "E": ("M90 0H780V330H715L650 110H360V660H570L620 540H680V900H620L570 780H360V1310H650L715 1090H780V1420H90V1350L210 1310V110L90 70Z", 838),
}
advance = 0
parts = []
bottom, top = float("inf"), float("-inf")
for character in name:
    if character in plain_letters:
        path, width = plain_letters[character]
        parts.append(f'<path data-letter="{character}" transform="translate({advance} 0)" d="{path}"/>')
        bottom, top = min(bottom, 0), max(top, 1420)
        advance += width
        continue
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
        parts.append(f'<path data-letter="{character}" transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
    advance += font["hmtx"].metrics[glyph_name][0]

scale = min(680 / advance, 52 / (top - bottom))
x = (1000 - advance * scale) / 2
y = (84 - (top - bottom) * scale) / 2 + top * scale
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="84" viewBox="0 0 1000 84" role="img" aria-labelledby="title">
<title id="title">Juan Domanico Militante — One Piece style name</title>
<desc>Transparent One Piece inspired lettering. Only the O glyphs use skulls; I and E use readable serif letters.</desc>
<g transform="translate({x:.3f} {y:.3f}) scale({scale:.6f} {-scale:.6f})" fill="#EDF1F7">{''.join(parts)}</g>
</svg>
'''
(root / "profile-assets/name-one-piece-small.svg").write_text(svg, encoding="utf-8")
print("Created transparent SVG wordmark with real font outlines.")
