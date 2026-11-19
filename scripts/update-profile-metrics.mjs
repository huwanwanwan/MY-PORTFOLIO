import { mkdir, writeFile } from 'node:fs/promises';

const username = 'huwanwanwan';
const palette = { midnight: '#161B2F', navy: '#242F49', slate: '#384358', peach: '#FFA586', crimson: '#B51A2B', burgundy: '#541A2E' };
const { midnight, navy, slate, peach, crimson, burgundy } = palette;
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const text = (x, y, value, size = 16, color = peach, extra = '') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${escape(value)}</text>`;
const box = (x, y, width, height, fill = navy, radius = 16) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${slate}"/>`;
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><rect width="${width}" height="${height}" rx="20" fill="${midnight}"/><g font-family="Arial, Helvetica, sans-serif">${body}</g></svg>\n`;
const output = new URL('../profile-assets/', import.meta.url);
await mkdir(output, { recursive: true });
for (const label of ['Portfolio', 'Email', 'LinkedIn']) {
  await writeFile(new URL(`link-${label.toLowerCase()}.svg`, output), svg(200, 44, label, box(1, 1, 198, 42, navy, 12) + text(100, 28, label.toUpperCase(), 13, peach, 'text-anchor="middle" font-weight="700" letter-spacing="2"')));
}

await writeFile(new URL('header.svg', output), svg(960, 224, 'Juan Domanico Militante | Web and Mobile Developer', `
  <path d="M0 194H960" stroke="${slate}"/>
  <rect x="414" y="32" width="132" height="4" rx="2" fill="${crimson}"/>
  ${text(480, 95, 'JUAN DOMANICO MILITANTE', 34, peach, 'text-anchor="middle" font-weight="700" letter-spacing="2"')}
  ${text(480, 137, 'Web and Mobile Developer', 22, peach, 'text-anchor="middle"')}
  ${text(480, 175, 'Bulacan, Philippines', 15, peach, 'text-anchor="middle"')}
`));

const groups = [
  ['WEB', ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS']],
  ['MOBILE & GAMES', ['Kotlin', 'Dart', 'Flutter', 'Unity', 'C#']],
  ['BACKEND & DATA', ['Node.js', 'Express', 'PHP', 'Python', 'MySQL', 'PostgreSQL']],
  ['TOOLS & HARDWARE', ['Git', 'GitHub', 'Cloudflare', 'Figma', 'Arduino']],
];
let stack = text(32, 45, 'TECH STACK', 18, peach, 'font-weight="700" letter-spacing="2"');
groups.forEach(([label, items], index) => {
  const y = 72 + index * 100;
  stack += box(24, y, 912, 84) + text(44, y + 24, label, 12, peach, 'font-weight="700" letter-spacing="1.5"');
  let x = 44;
  items.forEach((item) => {
    const width = Math.max(66, item.length * 7.8 + 26);
    stack += box(x, y + 37, width, 30, midnight, 7) + text(x + width / 2, y + 57, item, 14, peach, 'text-anchor="middle"');
    x += width + 10;
  });
});
await writeFile(new URL('tech-stack.svg', output), svg(960, 488, 'Tech stack grouped by web, mobile and games, backend and data, tools and hardware', stack));

async function github(path) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'huwanwanwan-profile-metrics' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`GitHub ${path}: ${response.status}`);
  return response.json();
}
const user = await github(`/users/${username}`);
const repos = [];
for (let page = 1; ; page++) {
  const batch = await github(`/users/${username}/repos?type=owner&per_page=100&page=${page}`);
  repos.push(...batch);
  if (batch.length < 100) break;
}
const ownRepos = repos.filter((repo) => !repo.fork);
const languageBytes = {};
// Small batches keep public API requests bounded.
for (let index = 0; index < ownRepos.length; index += 4) {
  const results = await Promise.all(ownRepos.slice(index, index + 4).map((repo) => github(`/repos/${username}/${encodeURIComponent(repo.name)}/languages`)));
  for (const languages of results) for (const [name, bytes] of Object.entries(languages)) languageBytes[name] = (languageBytes[name] || 0) + bytes;
}
const activityResponse = await fetch('https://portfolio.juandomanicomilitante.workers.dev/api/github-contributions', { signal: AbortSignal.timeout(30000), cache: 'no-store' });
if (!activityResponse.ok) throw new Error(`Contribution calendar: ${activityResponse.status}`);
const activity = await activityResponse.json();
if (activity.username !== username || !Array.isArray(activity.days) || activity.days.length < 360) throw new Error('Invalid contribution calendar');
const days = activity.days;
if (days.some((day) => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4)) throw new Error('Invalid contribution day');
const total = days.reduce((sum, day) => sum + day.count, 0);
const activeDays = days.filter((day) => day.count > 0).length;
const stars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
const forks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
const count = (value) => value.toLocaleString('en-US');
const updated = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
let metrics = text(32, 45, 'GITHUB ANALYTICS', 18, peach, 'font-weight="700" letter-spacing="2"');
const values = [['Public repositories', user.public_repos], ['Stars received', stars], ['Repository forks', forks], ['Followers', user.followers], ['Contributions / 365 days', total], ['Active days / 365 days', activeDays]];
values.forEach(([label, value], index) => {
  const x = 24 + (index % 3) * 308;
  const y = 72 + Math.floor(index / 3) * 110;
  metrics += box(x, y, 296, 96) + text(x + 20, y + 42, count(value), 32, peach, 'font-weight="700"') + text(x + 20, y + 72, label, 14);
});
metrics += text(32, 325, 'LANGUAGES', 15, peach, 'font-weight="700" letter-spacing="1.5"');
metrics += text(32, 348, 'Share of code bytes across owned public repositories (forks excluded).', 13);
const languages = Object.entries(languageBytes).sort((a, b) => b[1] - a[1]);
const totalBytes = languages.reduce((sum, [, bytes]) => sum + bytes, 0);
const top = languages.slice(0, 5);
if (languages.length > 5) top.push(['Other', languages.slice(5).reduce((sum, [, bytes]) => sum + bytes, 0)]);
top.forEach(([name, bytes], index) => {
  const y = 382 + index * 40;
  const percent = bytes / totalBytes * 100;
  metrics += text(32, y, name, 14) + text(928, y, `${percent.toFixed(1)}%`, 14, peach, 'text-anchor="end"');
  metrics += `<rect x="190" y="${y - 10}" width="640" height="10" rx="5" fill="${slate}"/><rect x="190" y="${y - 10}" width="${Math.max(1, 640 * percent / 100).toFixed(2)}" height="10" rx="5" fill="${peach}"/>`;
});
metrics += text(32, 660, `Updated ${updated} (Philippine time) | Public GitHub data`, 12);
await writeFile(new URL('analytics.svg', output), svg(960, 686, 'GitHub repository metrics and language use', metrics));

const colors = [navy, slate, burgundy, crimson, peach];
let calendar = text(32, 45, 'CONTRIBUTION ACTIVITY', 18, peach, 'font-weight="700" letter-spacing="2"');
calendar += text(32, 74, `${count(total)} contributions in the last 365 days`, 16);
const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
let lastMonth = '';
days.forEach((day, index) => {
  const position = firstWeekday + index;
  const col = Math.floor(position / 7);
  const row = position % 7;
  const x = 48 + col * 16;
  const y = 115 + row * 16;
  const month = day.date.slice(0, 7);
  if (month !== lastMonth && col < 51) {
    calendar += text(x, 103, new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }), 11);
    lastMonth = month;
  }
  calendar += `<rect x="${x}" y="${y}" width="12" height="12" rx="3" fill="${colors[day.level]}"><title>${day.date}: ${day.count} contributions</title></rect>`;
});
calendar += text(48, 254, `${days[0].date} to ${days.at(-1).date}`, 12) + text(740, 254, 'Less', 12);
colors.forEach((color, index) => { calendar += `<rect x="${777 + index * 17}" y="243" width="12" height="12" rx="3" fill="${color}"/>`; });
calendar += text(871, 254, 'More', 12);
calendar += text(48, 280, 'GitHub contributions, including commits, issues, pull requests, and reviews.', 12);
await writeFile(new URL('activity.svg', output), svg(960, 306, 'GitHub contribution calendar in the portfolio color palette', calendar));
console.log(`Updated profile assets: ${repos.length} public repositories, ${total} contributions.`);
