import { readFile } from 'node:fs/promises';

export const techLogoFiles = {
  HTML: 'html5', CSS: 'css3', JavaScript: 'javascript', TypeScript: 'typescript',
  React: 'react', 'Next.js': 'nextjs', 'Tailwind CSS': 'tailwindcss', Kotlin: 'kotlin',
  Dart: 'dart', Flutter: 'flutter', Unity: 'unity', 'C#': 'csharp', 'Node.js': 'nodejs',
  Express: 'express', PHP: 'php', Python: 'python', MySQL: 'mysql', PostgreSQL: 'postgresql',
  Git: 'git', GitHub: 'github', Cloudflare: 'cloudflare', Figma: 'figma', Arduino: 'arduino',
};

const logos = new Map();
for (const [name, file] of Object.entries(techLogoFiles)) {
  let source = await readFile(new URL(`../profile-assets/tech-logos/${file}.svg`, import.meta.url), 'utf8');
  // Preserve the real artwork. Only recolor its paint, keeping light cutouts dark.
  const paint = (color) => {
    if (color === 'none' || color === 'transparent') return color;
    const negative = /^(?:#fff(?:fff)?|white|#ebebeb)$/i.test(color)
      || (file === 'nextjs' && color.startsWith('url('))
      || (file === 'javascript' && /^#323330$/i.test(color));
    return negative ? '#161B2F' : '#FFA586';
  };
  source = source.replace(/\b(fill|stroke|stop-color)="([^"]+)"/g, (_, attribute, color) => `${attribute}="${paint(color)}"`);
  source = source.replace(/\b(fill|stroke|stop-color):\s*([^;"}]+)/g, (_, attribute, color) => `${attribute}:${paint(color.trim())}`);
  const viewBox = source.match(/viewBox="([^"]+)"/)?.[1] || '0 0 128 128';
  const body = source.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/, '');
  // Namespace SVG definitions so logos with reused gradient/clip IDs cannot collide.
  const prefix = `tech-${file}-`;
  const scoped = body.replace(/\bid="([^"]+)"/g, `id="${prefix}$1"`)
    .replace(/url\(#([^)]*)\)/g, `url(#${prefix}$1)`)
    .replace(/(href=")#([^"]+)"/g, `$1#${prefix}$2"`);
  logos.set(name, { viewBox, body: scoped });
}

export function realTechLogo(name, x, y, size = 22) {
  const logo = logos.get(name);
  if (!logo) throw new Error(`Missing real technology logo: ${name}`);
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${logo.viewBox}" fill="#FFA586" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${logo.body}</svg>`;
}
