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
    ${strawHat(0, -27, .7)}
    <path d="m-14-9-19 12 6 46h22L-8 4Zm28 0L33 3l-6 46H5L8 4Z" fill="${crimson}"/>
    <path d="M-14-9-8 4 0 12 8 4 14-9" fill="none" stroke="${peach}" stroke-width="2"/>
    <path d="M-28 48H28L23 63H-23Z" fill="#384358"/>
    <path d="M-29 46H29" stroke="${peach}" stroke-width="5"/>
    <circle cx="-12" cy="18" r="2" fill="${peach}"/><circle cx="-11" cy="30" r="2" fill="${peach}"/>
  </g>`;
}

for (const themedFile of files) {
  if (!themedFile.endsWith('-voyage')) continue;
  const file = themedFile.replace(/-voyage$/, '');
  let svg = await readFile(new URL(`${file}.svg`, root), 'utf8');
  let decoration = '';
  if (file === 'portfolio-cover') {
    decoration = wheel(145, 85, 56) + flag(797, 85);
    svg = svg.replace(/<\/svg>\s*$/, `${decoration}</svg>\n`);
    // The central portfolio logo remains the original Wancor artwork.
  } else if (file.startsWith('section-')) {
    decoration = wheel(885, 40, 23, .8);
    svg = svg.replace(/<\/svg>\s*$/, `${decoration}</svg>\n`);
  } else if (file.startsWith('about-')) {
    svg = svg.replace(/<\/svg>\s*$/, `${costume(855, 195)}</svg>\n`);
  } else if (file.startsWith('tech-stack')) {
    svg = svg.replace(/<\/svg>\s*$/, `${wheel(886, 38, 22, .9)}</svg>\n`);
  } else if (file.startsWith('featured-work')) {
    svg = svg.replace(/<\/svg>\s*$/, `<g opacity=".16">${compass(428, 67, 24)}${compass(898, 67, 24)}${compass(428, 187, 24)}${compass(898, 187, 24)}</g></svg>\n`);
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
