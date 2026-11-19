import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { icon, iconPaths } from './profile-icons.mjs';

const output = new URL('../profile-assets/', import.meta.url);
const brandSource = await readFile(new URL('../profile-assets/wancor-mark.svg', import.meta.url), 'utf8');
const brandPaths = brandSource.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/, '');
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><defs><linearGradient id="section"><stop stop-color="#541A2E"/><stop offset=".7" stop-color="#161B2F"/></linearGradient><linearGradient id="project"><stop stop-color="#242F49"/><stop offset="1" stop-color="#384358"/></linearGradient></defs>${body}</svg>\n`;
await mkdir(new URL('icons/', output), { recursive: true });
for (const name of Object.keys(iconPaths)) {
  await writeFile(new URL(`icons/${name}.svg`, output), svg(32, 32, `${name} icon`, icon(name, 4, 4, 24)));
}

// The exact vector mark used in the portfolio navigation, without redrawing it.
await writeFile(new URL('portfolio-cover.svg', output), svg(960, 180, 'Wancor — original portfolio logo', `
  <rect width="960" height="180" rx="18" fill="#161B2F"/>
  <path d="M0 156C180 175 310 144 480 158S780 172 960 140V180H0Z" fill="#242F49"/>
  <path d="M0 175C240 183 350 160 530 172S820 180 960 158V180H0Z" fill="#541A2E"/>
  <svg x="424" y="24" width="112" height="82" viewBox="65 115 385 280">${brandPaths}</svg>
  <text x="480" y="139" fill="#E8EDF5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="7">WANCOR</text>
`));

await writeFile(new URL('about-portfolio.svg', output), svg(960, 290, 'About Juan Domanico Militante', `
  <rect width="960" height="290" rx="18" fill="#161B2F"/>
  <rect x="96" y="141" width="215" height="30" rx="4" fill="#541A2E"/>
  <g font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#B4BED0">
    <text x="28" y="42">I'm <tspan font-weight="700" fill="#E8EDF5">Juan Domanico Militante</tspan>, a <tspan fill="#FFA586">Web and Mobile Developer</tspan></text>
    <text x="28" y="74">and an Information Technology student at</text>
    <text x="28" y="106" font-weight="700" fill="#E8EDF5">Pambayang Dalubhasaan ng Marilao.</text>
    <text x="28" y="164">I have</text><text x="102" y="164" font-weight="700" fill="#FFF5EF">4 years of experience</text>
    <text x="324" y="164">creating websites and mobile applications.</text>
    <text x="28" y="196">I enjoy building <tspan fill="#E8EDF5" font-weight="700">simple, useful, and easy-to-use systems</tspan>, including</text>
    <text x="28" y="228"><tspan fill="#FFA586">mobile apps that work offline</tspan> and web applications for managing</text>
    <text x="28" y="260">documents, sales, and inventory.</text>
  </g>
`));

const sections = [['about', 'ABOUT ME', 'Web and Mobile Developer'], ['work', 'SELECTED PROJECTS', 'Web, mobile, games, and hardware'], ['metrics', 'GITHUB ACTIVITY', 'Public contributions and repository statistics']];
for (const [slug, title, subtitle] of sections) {
  await writeFile(new URL(`section-${slug}-portfolio.svg`, output), svg(960, 80, title, `<rect width="960" height="80" rx="14" fill="#161B2F"/><rect x="64" y="15" width="${title.length * 13 + 22}" height="31" rx="4" fill="#541A2E"/>${icon({about: 'user', work: 'folder', metrics: 'chart'}[slug], 24, 25, 28)}<g font-family="Arial, Helvetica, sans-serif" fill="#E8EDF5"><text x="70" y="35" font-size="17" font-weight="700" letter-spacing="2">${title}</text><text x="70" y="58" font-size="13" fill="#B4BED0">${subtitle}</text></g><path d="M545 40H932" stroke="#FFA586" opacity=".35"/>`));
}

await writeFile(new URL('featured-work-portfolio.svg', output), svg(960, 260, 'Selected projects: SIGLA, DocuLink, InventoPOS, games, and hardware', `
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
      return `<rect x="${x}" y="${y}" width="450" height="104" rx="26" fill="url(#project)" stroke="#B51A2B"/>${icon(['phone', 'database', 'game', 'chip'][index], x + 18, y + 17, 23)}<rect x="${x + 47}" y="${y + 16}" width="${name.replace(/&amp;/g, '&').length * 9.4 + 20}" height="26" rx="4" fill="#541A2E"/><text x="${x + 52}" y="${y + 35}" font-size="15" font-weight="700">${name}</text><text x="${x + 18}" y="${y + 55}" font-size="14" fill="#B4BED0">${description}</text><text x="${x + 18}" y="${y + 82}" font-size="11" fill="#B4BED0" letter-spacing="1">${tools}</text>`;
    }).join('')}
  </g>
`));
