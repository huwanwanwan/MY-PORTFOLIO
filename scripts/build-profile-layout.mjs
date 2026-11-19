import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('../profile-assets/', import.meta.url);
const image = async (path) => `data:image/png;base64,${(await readFile(path)).toString('base64')}`;
const cover = await image(new URL('../git_cover.png', import.meta.url));
const portrait = await image(new URL('../profile-assets/portrait.png', import.meta.url));
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;

// A short SVG viewport crops the display of the original PNG without changing it.
await writeFile(new URL('cover.svg', output), svg(960, 220, 'Wancor cover — cropped from git_cover.png', `
  <defs><clipPath id="cover"><rect width="960" height="220" rx="18"/></clipPath></defs>
  <g clip-path="url(#cover)"><image href="${cover}" x="0" y="-160" width="960" height="480" preserveAspectRatio="xMidYMid slice"/></g>
  <rect x="1" y="1" width="958" height="218" rx="18" fill="none" stroke="#384358"/>
`));

await writeFile(new URL('intro.svg', output), svg(960, 360, 'Hi, I am Juan Domanico Militante — Web and Mobile Developer', `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#161B2F"/><stop offset=".55" stop-color="#242F49"/><stop offset="1" stop-color="#541A2E"/></linearGradient>
    <linearGradient id="wave"><stop stop-color="#FFA586"/><stop offset=".5" stop-color="#B51A2B"/><stop offset="1" stop-color="#541A2E"/></linearGradient>
    <clipPath id="panel"><rect width="960" height="360" rx="18"/></clipPath>
  </defs>
  <g clip-path="url(#panel)">
    <rect width="960" height="360" fill="url(#bg)"/>
    <circle cx="783" cy="318" r="195" fill="#B51A2B" opacity=".45"/>
    <path d="M0 320C250 375 410 282 612 318S835 330 960 260V360H0Z" fill="url(#wave)"/>
    <image href="${portrait}" x="585" y="18" width="360" height="410" preserveAspectRatio="xMidYMin meet"/>
    <g font-family="Arial, Helvetica, sans-serif" fill="#FFA586">
      <circle cx="36" cy="39" r="4" fill="#FFA586"/>
      <text x="50" y="44" font-size="12" font-weight="700" letter-spacing="2">WEB &amp; MOBILE DEVELOPER</text>
      <text x="32" y="112" font-size="48" font-weight="700">Hi, I'm Juan.</text>
      <text x="34" y="146" font-size="18">Juan Domanico Militante (Ikoy)</text>
      <text x="34" y="187" font-size="16">I build responsive websites and mobile apps</text>
      <text x="34" y="211" font-size="16">that are simple, useful, and easy to use.</text>
      <rect x="34" y="239" width="172" height="34" rx="17" fill="#541A2E" stroke="#B51A2B"/>
      <text x="120" y="261" font-size="12" text-anchor="middle" font-weight="700">4 YEARS OF EXPERIENCE</text>
      <text x="34" y="304" font-size="13">BULACAN, PHILIPPINES</text>
    </g>
  </g>
`));

const sections = [['about', 'A LITTLE ABOUT ME', 'The person behind the projects.'], ['work', 'WHAT I BUILD', 'Web, mobile, games, and hardware.'], ['metrics', 'MY GITHUB AT A GLANCE', 'Real numbers. My own colors.']];
for (const [slug, title, subtitle] of sections) {
  await writeFile(new URL(`section-${slug}.svg`, output), svg(960, 80, title, `<rect width="960" height="80" rx="14" fill="#161B2F"/><rect x="24" y="24" width="4" height="32" rx="2" fill="#B51A2B"/><g font-family="Arial, Helvetica, sans-serif" fill="#FFA586"><text x="44" y="35" font-size="17" font-weight="700" letter-spacing="2">${title}</text><text x="44" y="58" font-size="13">${subtitle}</text></g><path d="M545 40H932" stroke="#384358"/>`));
}

await writeFile(new URL('featured-work.svg', output), svg(960, 260, 'Selected projects: SIGLA, DocuLink, InventoPOS, games, and hardware', `
  <rect width="960" height="260" rx="18" fill="#161B2F"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#FFA586">
    ${[
      ['SIGLA', 'A sign language app that works offline.', 'KOTLIN · ANDROID'],
      ['DOCULINK &amp; INVENTOPOS', 'Tools for documents, sales, and stock.', 'REACT · PHP · DATABASES'],
      ['GAMES &amp; AR', 'Games, 2D animation, and phone camera AR.', 'UNITY · C#'],
      ['HARDWARE &amp; SENSORS', 'Attendance devices and rainfall alerts.', 'ARDUINO · RFID · SENSORS'],
    ].map(([name, description, tools], index) => {
      const x = 20 + index % 2 * 470;
      const y = 18 + Math.floor(index / 2) * 120;
      return `<rect x="${x}" y="${y}" width="450" height="104" rx="12" fill="#242F49" stroke="#384358"/><text x="${x + 18}" y="${y + 29}" font-size="15" font-weight="700">${name}</text><text x="${x + 18}" y="${y + 55}" font-size="14">${description}</text><text x="${x + 18}" y="${y + 82}" font-size="11" letter-spacing="1">${tools}</text>`;
    }).join('')}
  </g>
`));
