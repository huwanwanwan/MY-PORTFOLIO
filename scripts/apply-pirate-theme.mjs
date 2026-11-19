import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../profile-assets/', import.meta.url);
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const files = new Set([...readme.matchAll(/profile-assets\/([a-z-]+)\.svg/g)].map((match) => match[1].replace(/-motion$/, '')));
const peach = '#FFA586';
const crimson = '#B51A2B';
const navy = '#161B2F';

function wheel(x, y, radius = 30, opacity = 1) {
  return `<g transform="translate(${x} ${y})" opacity="${opacity}"><g class="wheel-spin" fill="none" stroke="${peach}" stroke-width="2.5" stroke-linecap="round">
    <circle r="${radius * .68}"/><circle r="${radius * .16}" fill="${crimson}"/>
    ${Array.from({ length: 8 }, (_, index) => `<g transform="rotate(${index * 45})"><path d="M0 ${-radius * .2}V${-radius}"/><path d="M-3 ${-radius}H3" stroke-width="4"/></g>`).join('')}
  </g></g>`;
}

function strawHat(x, y, size = 1) {
  return `<g transform="translate(${x} ${y}) scale(${size})"><path d="M-27 0Q-25-29 0-29T27 0Z" fill="${peach}"/><path d="M-27-6Q0-2 27-6V1H-27Z" fill="${crimson}"/><ellipse cy="3" rx="42" ry="8" fill="${peach}"/><path d="M-25-18Q0-27 22-18" fill="none" stroke="#541A2E" stroke-opacity=".4"/></g>`;
}

function compass(x, y, size = 30) {
  return `<g transform="translate(${x} ${y}) scale(${size / 30})" fill="none" stroke="${peach}" stroke-width="1.5"><circle r="25"/><path d="M0-30V-23M30 0H23M0 30V23M-30 0H-23"/><path d="m0-19 6 19-6 19-6-19Z" fill="${crimson}"/><path d="m-18 0 18-6 18 6-18 6Z" fill="${peach}" stroke="none"/><circle r="3" fill="${navy}" stroke="none"/></g>`;
}

function flag(x, y) {
  return `<g transform="translate(${x} ${y})"><path d="M-61-62V65" stroke="${peach}" stroke-width="4" stroke-linecap="round"/><g class="pirate-flag"><path d="M-58-58C-15-78 32-40 73-60V35C26 55-16 18-58 39Z" fill="#242F49"/>
    <g transform="translate(5 -5)" stroke="#E8EDF5" stroke-width="6" stroke-linecap="round"><path d="m-27-8 48 39m-48 0L21-8"/></g>
    <path d="M-16 2C-34-37 37-42 27 1L20 13V26H-9V13Z" fill="#E8EDF5"/>
    <ellipse cx="-5" cy="-1" rx="5" ry="7" fill="${navy}"/><ellipse cx="16" cy="-1" rx="5" ry="7" fill="${navy}"/>
    <path d="m5 6-4 6h8Zm-9 9v10m9-10v10m9-10v10" fill="${navy}" stroke="${navy}"/>
    ${strawHat(5, -24, .77)}
  </g></g>`;
}

function costume(x, y) {
  return `<g transform="translate(${x} ${y})" opacity=".85">
    <circle cy="4" r="66" fill="#242F49"/>
    <circle cy="4" r="56" fill="#541A2E" opacity=".42"/>
    ${strawHat(0, -27, .7)}
    <path d="m-14-9-19 12 6 46h22L-8 4Zm28 0L33 3l-6 46H5L8 4Z" fill="${crimson}"/>
    <path d="M-14-9-8 4 0 12 8 4 14-9" fill="none" stroke="${peach}" stroke-width="2"/>
    <path d="M-28 48H28L23 63H-23Z" fill="#384358"/>
    <path d="M-29 46H29" stroke="${peach}" stroke-width="5"/>
    <circle cx="-12" cy="18" r="2" fill="${peach}"/><circle cx="-11" cy="30" r="2" fill="${peach}"/>
    <path d="m-27 6 4 31m50-31-4 31" fill="none" stroke="${peach}" stroke-opacity=".3" stroke-width="1.5"/>
  </g>`;
}

function island(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" opacity=".15" fill="${peach}">
    <path d="M-35 20Q0 1 35 20Z"/><path d="M-2 13Q5-3 0-24L4-24Q10-3 3 13Z"/>
    <path d="M2-22Q-25-38-31-12Q-14-22 2-22Zm0 0Q24-40 32-15Q18-24 2-22Zm0 0Q-2-44-17-38Q-7-29 2-22Zm0 0Q12-46 22-36Q9-29 2-22Z"/>
    <path d="M-38 28Q-17 22 0 28T38 28" fill="none" stroke="${peach}" stroke-width="2"/>
  </g>`;
}

async function refinedCover() {
  const mark = await readFile(new URL('wancor-mark.svg', root), 'utf8');
  const paths = mark.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="220" viewBox="0 0 960 220" role="img" aria-labelledby="title"><title id="title">Wancor — One Piece inspired developer's log</title>
    <defs><radialGradient id="sea-light"><stop stop-color="#541A2E"/><stop offset="1" stop-color="#161B2F"/></radialGradient><clipPath id="sea-window"><rect width="960" height="220" rx="22"/></clipPath></defs>
    <g clip-path="url(#sea-window)">
      <rect width="960" height="220" fill="${navy}"/><ellipse cx="480" cy="81" rx="340" ry="170" fill="url(#sea-light)"/>
      <g fill="none" stroke="#384358" opacity=".5"><circle cx="145" cy="97" r="67"/><circle cx="145" cy="97" r="78" stroke-dasharray="1 10"/><path d="M210 118Q290 165 370 96T600 97T731 90" stroke-dasharray="3 9"/></g>
      ${wheel(145, 97, 43)}${flag(800, 98)}
      <svg x="424" y="35" width="112" height="82" viewBox="65 115 385 280">${paths}</svg>
      <g font-family="Arial, Helvetica, sans-serif" text-anchor="middle"><text x="480" y="24" fill="${peach}" font-size="10" letter-spacing="3">DEVELOPER'S LOG</text><text x="480" y="147" fill="#E8EDF5" font-size="19" font-weight="700" letter-spacing="8">WANCOR</text></g>
      <path d="M0 178C140 148 265 202 420 177S730 149 960 173V220H0Z" fill="#242F49"/>
      <path d="M0 194C183 169 286 219 493 193S758 172 960 193V220H0Z" fill="#384358" opacity=".65"/>
      <path d="M0 212C194 192 322 234 540 211S791 197 960 211V220H0Z" fill="#541A2E"/>
      <g font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing="1.7" fill="#B4BED0"><text x="26" y="204">BULACAN, PHILIPPINES</text><text x="934" y="204" text-anchor="end">WEB &amp; MOBILE DEVELOPER</text></g>
    </g>
  </svg>\n`;
}

for (const themedFile of files) {
  if (!themedFile.endsWith('-grand-voyage')) continue;
  const file = themedFile.replace(/-grand-voyage$/, '');
  let svg = await readFile(new URL(`${file}.svg`, root), 'utf8');
  let decoration = '';
  if (file === 'portfolio-cover') {
    svg = await refinedCover();
    // The central portfolio logo remains the original Wancor artwork.
  } else if (file.startsWith('section-')) {
    decoration = file.includes('about') ? strawHat(884, 43, .48) : file.includes('work') ? compass(884, 40, 20) : wheel(885, 40, 23, .8);
    svg = svg.replace(/<\/svg>\s*$/, `${decoration}</svg>\n`);
  } else if (file.startsWith('about-')) {
    svg = svg.replace(/<\/svg>\s*$/, `${costume(855, 195)}</svg>\n`);
  } else if (file.startsWith('tech-stack')) {
    svg = svg.replace(/<\/svg>\s*$/, `<text x="824" y="43" fill="#B4BED0" font-family="Arial, Helvetica, sans-serif" text-anchor="end" font-size="11" letter-spacing="2">THE CREW’S TOOLKIT</text>${wheel(886, 38, 22, .9)}</svg>\n`);
  } else if (file.startsWith('featured-work')) {
    svg = svg.replace(/<\/svg>\s*$/, `${island(424, 75, .65)}${island(894, 75, .65)}${island(424, 195, .65)}${island(894, 195, .65)}</svg>\n`);
  } else if (file.startsWith('dashboard')) {
    svg = svg.replace('JUAN / GITHUB OVERVIEW', 'CAPTAIN’S LOG / GITHUB')
      .replace('Contribution history', 'Voyage of contributions')
      .replace('Public activity stats', 'Captain’s stats')
      .replace('When I commit / UTC+8', 'Ship’s watch / UTC+8');
    svg = svg.replace(/<\/svg>\s*$/, `${wheel(735, 30, 17, .7)}</svg>\n`);
  } else if (file.startsWith('activity')) {
    svg = svg.replace('CONTRIBUTION ACTIVITY', 'VOYAGE MAP / CONTRIBUTIONS');
    svg = svg.replace(/<\/svg>\s*$/, `${compass(885, 42, 20)}</svg>\n`);
  }
  svg = svg.replace('<title id="title">', '<title id="title">One Piece inspired — ');
  await writeFile(new URL(`${themedFile}.svg`, root), svg);
}
console.log('Applied the pirate theme: ship’s wheels, straw hat, flag, compass, and red vest.');
