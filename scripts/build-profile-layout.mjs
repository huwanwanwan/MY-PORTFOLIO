import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('../profile-assets/', import.meta.url);
const image = async (path) => `data:image/png;base64,${(await readFile(path)).toString('base64')}`;
const cover = await image(new URL('../git_cover.png', import.meta.url));
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><defs><linearGradient id="section"><stop stop-color="#541A2E"/><stop offset=".7" stop-color="#161B2F"/></linearGradient><linearGradient id="project"><stop stop-color="#541A2E"/><stop offset="1" stop-color="#242F49"/></linearGradient></defs>${body}</svg>\n`;

// A short SVG viewport crops the display of the original PNG without changing it.
await writeFile(new URL('cover.svg', output), svg(960, 220, 'Wancor cover — cropped from git_cover.png', `
  <defs><clipPath id="cover"><rect width="960" height="220" rx="18"/></clipPath></defs>
  <g clip-path="url(#cover)"><image href="${cover}" x="0" y="-160" width="960" height="480" preserveAspectRatio="xMidYMid slice"/></g>
  <rect x="1" y="1" width="958" height="218" rx="18" fill="none" stroke="#384358"/>
`));

const sections = [['about', 'A LITTLE ABOUT ME', 'The person behind the projects.'], ['work', 'WHAT I BUILD', 'Web, mobile, games, and hardware.'], ['metrics', 'MY GITHUB AT A GLANCE', 'Real numbers. My own colors.']];
for (const [slug, title, subtitle] of sections) {
  await writeFile(new URL(`section-${slug}-signature.svg`, output), svg(960, 80, title, `<rect width="960" height="80" rx="14" fill="url(#section)"/><rect x="24" y="24" width="6" height="32" rx="2" fill="#B51A2B"/><g font-family="Arial, Helvetica, sans-serif" fill="#E8EDF5"><text x="44" y="35" font-size="17" font-weight="700" letter-spacing="2">${title}</text><text x="44" y="58" font-size="13" fill="#B4BED0">${subtitle}</text></g><path d="M545 40H932" stroke="#FFA586" opacity=".35"/>`));
}

await writeFile(new URL('featured-work-signature.svg', output), svg(960, 260, 'Selected projects: SIGLA, DocuLink, InventoPOS, games, and hardware', `
  <rect width="960" height="260" rx="18" fill="#161B2F"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#E8EDF5">
    ${[
      ['SIGLA', 'A sign language app that works offline.', 'KOTLIN · ANDROID'],
      ['DOCULINK &amp; INVENTOPOS', 'Tools for documents, sales, and stock.', 'REACT · PHP · DATABASES'],
      ['GAMES &amp; AR', 'Games, 2D animation, and phone camera AR.', 'UNITY · C#'],
      ['HARDWARE &amp; SENSORS', 'Attendance devices and rainfall alerts.', 'ARDUINO · RFID · SENSORS'],
    ].map(([name, description, tools], index) => {
      const x = 20 + index % 2 * 470;
      const y = 18 + Math.floor(index / 2) * 120;
      return `<rect x="${x}" y="${y}" width="450" height="104" rx="16" fill="url(#project)" stroke="#B51A2B"/><text x="${x + 18}" y="${y + 29}" font-size="15" font-weight="700">${name}</text><text x="${x + 18}" y="${y + 55}" font-size="14" fill="#B4BED0">${description}</text><text x="${x + 18}" y="${y + 82}" font-size="11" fill="#B4BED0" letter-spacing="1">${tools}</text>`;
    }).join('')}
  </g>
`));
