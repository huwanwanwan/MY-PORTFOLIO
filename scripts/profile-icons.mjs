// Original outline symbols, styled for the portfolio rather than brand colors.
export const iconPaths = {
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
  game: '<path d="M7 7h10c2 0 3 2 4 5l1 5c0 3-3 4-5 1l-2-2H9l-2 2c-2 3-5 2-5-1l1-5c1-3 2-5 4-5Z"/><path d="M6 10v5m-2-2.5h4m8-1h.1m3 2h.1"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.1M7 17.5h.1M11 6.5h6m-6 11h6"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
  branch: '<circle cx="6" cy="5" r="3"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 8v8m0-3c8 0 12-1 12-5"/>',
  chip: '<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
  tools: '<path d="M14 6a5 5 0 0 0-6 6L2 18l4 4 6-6a5 5 0 0 0 6-6l-3 3-4-4 3-3Z"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
  chart: '<path d="M3 3v18h18M7 17v-5m5 5V7m5 10V3"/>',
  folder: '<path d="M3 7V4h7l3 3h8v14H3Zm0 4h18"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/>',
  link: '<path d="m10 14 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 2 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 -1)"/>',
  wind: '<path d="M2 8h14a3 3 0 1 0-3-3M2 12h18a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',
};

export function icon(name, x, y, size = 24, color = '#FFA586') {
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.code}</g>`;
}

export function technologyIcon(name) {
  if (['React', 'Next.js'].includes(name)) return 'atom';
  if (['CSS', 'Figma'].includes(name)) return 'layers';
  if (name === 'Tailwind CSS') return 'wind';
  if (['Kotlin', 'Dart', 'Flutter'].includes(name)) return 'phone';
  if (['Unity', 'C#'].includes(name)) return 'game';
  if (['MySQL', 'PostgreSQL'].includes(name)) return 'database';
  if (['Node.js', 'Express', 'PHP', 'Python'].includes(name)) return 'server';
  if (['Git', 'GitHub'].includes(name)) return 'branch';
  if (name === 'Arduino') return 'chip';
  if (name === 'Cloudflare') return 'server';
  return 'code';
}
