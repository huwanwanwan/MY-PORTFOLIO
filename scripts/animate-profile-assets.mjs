import { readFile, writeFile } from 'node:fs/promises';

// CSS animations work inside SVG images on GitHub; no scripts or external files.
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const files = new Set([...readme.matchAll(/profile-assets\/([a-z-]+)\.svg/g)].map((match) => match[1].replace(/-motion$/, '')));
const css = `<style>
  @keyframes appear { from { opacity: .25; } to { opacity: 1; } }
  @keyframes rise { from { transform: scaleY(.08); } to { transform: scaleY(1); } }
  @keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
  @keyframes glow { 0%,100% { opacity: .72; } 50% { opacity: 1; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
  text { animation: appear .8s ease-out both; }
  .motion-bar { transform-box: fill-box; transform-origin: center bottom; animation: rise 1.6s cubic-bezier(.22,1,.36,1) both; }
  .motion-line { stroke-dasharray: 1; animation: draw 2.2s ease-out both; }
  .motion-ring { animation: appear 1.8s ease-out both; }
  .motion-cell { animation: appear 1s ease-out both; animation-delay: var(--delay,0ms); }
  .motion-icon { animation: glow 5s ease-in-out infinite; }
  .motion-logo { animation: float 6s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>`;

for (const file of files) {
  const source = new URL(`../profile-assets/${file}.svg`, import.meta.url);
  let svg = await readFile(source, 'utf8');
  svg = svg.replace(/(<g\b[^>]*stroke="#FFA586")/g, '$1 class="motion-icon"');
  // Animate only the outer logo viewport, never its internal paths or transforms.
  if (file.startsWith('tech-stack') || file === 'portfolio-cover') {
    svg = svg.replace(/<svg\b(?=[^>]*\bx=")/g, '<svg class="motion-logo"');
  }
  if (file.startsWith('dashboard')) {
    svg = svg.replace(/<rect\b([^>]*\bwidth="11"[^>]*)>/g, '<rect class="motion-bar" $1>');
    svg = svg.replace(/<path\b([^>]*stroke-width="3"[^>]*)>/g, '<path class="motion-line" pathLength="1" $1>');
    svg = svg.replace(/<circle\b([^>]*stroke-dasharray="[^"]+"[^>]*)>/g, '<circle class="motion-ring" $1>');
  }
  if (file.startsWith('activity')) {
    let index = 0;
    svg = svg.replace(/<rect\b([^>]*width="12"[^>]*height="12"[^>]*)>/g, (_, attrs) => `<rect class="motion-cell" style="--delay:${index++ % 18 * 35}ms" ${attrs}>`);
  }
  svg = svg.replace(/(<svg\b[^>]*>)/, `$1${css}`);
  await writeFile(new URL(`../profile-assets/${file}-motion.svg`, import.meta.url), svg);
}
console.log(`Animated ${files.size} README graphics with reduced-motion support.`);
