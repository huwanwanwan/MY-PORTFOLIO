import { mkdir, writeFile } from 'node:fs/promises';

const username = 'huwanwanwan';
const palette = { midnight: '#161B2F', navy: '#242F49', slate: '#384358', peach: '#FFA586', crimson: '#B51A2B', burgundy: '#541A2E' };
const { midnight, navy, slate, peach, crimson, burgundy } = palette;
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const text = (x, y, value, size = 16, color = peach, extra = '') => `<text x="${x}" y="${y}" fill="${color === peach ? '#FFFFFF' : color}" font-size="${size}" ${extra}>${escape(value)}</text>`;
const box = (x, y, width, height, fill = navy, radius = 16) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${slate}"/>`;
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><rect width="${width}" height="${height}" rx="20" fill="${midnight}"/><g font-family="Arial, Helvetica, sans-serif">${body}</g></svg>\n`;
const output = new URL('../profile-assets/', import.meta.url);
await mkdir(output, { recursive: true });
await import('./build-profile-layout.mjs');
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
  if (response.status === 409 && path.includes('/commits?')) return []; // Empty repositories.
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
const repoLanguageCounts = {};
const commitLanguageCounts = {};
const hours = Array(24).fill(0);
let authoredCommits = 0;
let repositoriesContributed = 0;
// Small batches keep public API requests bounded.
for (let index = 0; index < ownRepos.length; index += 4) {
  const results = await Promise.all(ownRepos.slice(index, index + 4).map((repo) => github(`/repos/${username}/${encodeURIComponent(repo.name)}/languages`)));
  for (const languages of results) for (const [name, bytes] of Object.entries(languages)) languageBytes[name] = (languageBytes[name] || 0) + bytes;
}
for (const repo of ownRepos) {
  const mainLanguage = repo.language || 'Not detected';
  repoLanguageCounts[mainLanguage] = (repoLanguageCounts[mainLanguage] || 0) + 1;
  let repoCommits = 0;
  for (let page = 1; ; page++) {
    const batch = await github(`/repos/${username}/${encodeURIComponent(repo.name)}/commits?author=${username}&per_page=100&page=${page}`);
    for (const commit of batch) {
      const date = new Date(commit.commit.author.date);
      hours[(date.getUTCHours() + 8) % 24]++;
      repoCommits++;
    }
    if (batch.length < 100) break;
  }
  authoredCommits += repoCommits;
  if (repoCommits > 0) repositoriesContributed++;
  commitLanguageCounts[mainLanguage] = (commitLanguageCounts[mainLanguage] || 0) + repoCommits;
}
const pullRequests = await github(`/search/issues?q=${encodeURIComponent(`author:${username} type:pr`)}&per_page=1`);
const issues = await github(`/search/issues?q=${encodeURIComponent(`author:${username} type:issue`)}&per_page=1`);
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

// Dashboard inspired by the requested chart types, with original layout and styling.
let dashboard = text(30, 40, 'JUAN / GITHUB OVERVIEW', 17, peach, 'font-weight="700" letter-spacing="2"');
dashboard += text(930, 39, `UPDATED ${updated}`, 11, peach, 'text-anchor="end"');
dashboard += box(20, 62, 920, 220);
dashboard += text(40, 94, 'Contribution history', 19, peach, 'font-weight="700"');
dashboard += text(40, 127, count(total), 36, peach, 'font-weight="700"');
dashboard += text(40, 152, 'contributions / last 365 days', 13);
dashboard += text(40, 184, `${user.public_repos} public repositories`, 14);
dashboard += text(40, 208, `${activeDays} active days`, 14);
dashboard += text(40, 245, `On GitHub since ${new Date(user.created_at).getUTCFullYear()}`, 12);
const months = new Map();
for (const day of days) months.set(day.date.slice(0, 7), (months.get(day.date.slice(0, 7)) || 0) + day.count);
const monthEntries = [...months.entries()];
const maxMonth = Math.max(1, ...monthEntries.map(([, value]) => value));
const points = monthEntries.map(([, value], index) => [322 + index * 570 / Math.max(1, monthEntries.length - 1), 229 - value / maxMonth * 111]);
const pointPath = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
dashboard += `<path d="M322 118H904M322 173H904M322 229H904" stroke="${slate}" stroke-width="1"/><path d="${pointPath} L892 229L322 229Z" fill="${burgundy}"/><path d="${pointPath}" fill="none" stroke="${peach}" stroke-width="3"/>`;
monthEntries.forEach(([month, value], index) => {
  const [x, y] = points[index];
  dashboard += `<circle cx="${x}" cy="${y}" r="3" fill="${peach}"><title>${month}: ${value} contributions</title></circle>`;
  if (index % 2 === 0) dashboard += text(x, 254, new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }), 11, peach, 'text-anchor="middle"');
});

dashboard += box(20, 300, 450, 258) + box(490, 300, 450, 258);
dashboard += text(40, 334, 'Public activity stats', 19, peach, 'font-weight="700"');
const statRows = [['Stars received', stars], ['Authored commits', authoredCommits], ['Pull requests opened', pullRequests.total_count], ['Issues opened', issues.total_count], ['Repos with my commits', repositoriesContributed]];
statRows.forEach(([label, value], index) => { const y = 373 + index * 31; dashboard += text(42, y, label, 15) + text(442, y, count(value), 17, peach, 'text-anchor="end" font-weight="700"'); });
dashboard += text(510, 334, 'When I commit / UTC+8', 19, peach, 'font-weight="700"');
const maxHour = Math.max(1, ...hours);
for (let hour = 0; hour < 24; hour++) {
  const height = hours[hour] / maxHour * 132;
  const x = 522 + hour * 16;
  dashboard += `<rect x="${x}" y="${508 - Math.max(1, height)}" width="11" height="${Math.max(1, height)}" rx="2" fill="${hours[hour] === maxHour ? peach : crimson}"><title>${String(hour).padStart(2, '0')}:00 — ${hours[hour]} commits</title></rect>`;
  if (hour % 4 === 0) dashboard += text(x + 5, 530, `${String(hour).padStart(2, '0')}:00`, 10, peach, 'text-anchor="middle"');
}
dashboard += text(510, 549, 'Owned public repos · author timestamps · Philippine time', 11);

function donutPanel(x, title, data, unit, subtitle) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const entries = sorted.slice(0, 4);
  if (sorted.length > 4) entries.push(['Other', sorted.slice(4).reduce((sum, [, value]) => sum + value, 0)]);
  const sum = entries.reduce((value, [, amount]) => value + amount, 0);
  const chartColors = [peach, crimson, slate, burgundy, midnight];
  let content = box(x, 576, 450, 280) + text(x + 20, 612, title, 19, peach, 'font-weight="700"') + text(x + 20, 636, subtitle, 12);
  const cx = x + 116;
  const cy = 735;
  const circumference = 2 * Math.PI * 62;
  content += `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${slate}" stroke-width="23"/>`;
  let offset = 0;
  entries.forEach(([name, amount], index) => {
    const fraction = amount / (sum || 1);
    content += `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${chartColors[index]}" stroke-width="23" stroke-dasharray="${fraction * circumference} ${circumference}" stroke-dashoffset="${-offset * circumference}" transform="rotate(-90 ${cx} ${cy})"><title>${escape(name)}: ${amount} ${unit}</title></circle>`;
    offset += fraction;
    const y = 680 + index * 29;
    content += `<rect x="${x + 225}" y="${y - 10}" width="10" height="10" rx="3" fill="${chartColors[index]}"/>` + text(x + 244, y, name, 13) + text(x + 428, y, `${(fraction * 100).toFixed(0)}%`, 12, peach, 'text-anchor="end"');
  });
  content += text(cx, cy + 2, count(sum), 28, peach, 'text-anchor="middle" font-weight="700"') + text(cx, cy + 22, unit, 12, peach, 'text-anchor="middle"');
  return content;
}
dashboard += donutPanel(20, 'Languages by repository', repoLanguageCounts, 'repos', 'Each repository counts once by its main language.');
dashboard += donutPanel(490, 'Languages by commit', commitLanguageCounts, 'commits', 'Commits grouped by each repo’s main language.');
dashboard += text(30, 892, 'BUILDING, ONE COMMIT AT A TIME', 14, peach, 'font-weight="700" letter-spacing="1.5"');
const milestones = [['LANGUAGES', Object.keys(languageBytes).length], ['REPOSITORIES', user.public_repos], ['STARS', stars], ['COMMITS', authoredCommits], ['FOLLOWERS', user.followers], ['PULL REQUESTS', pullRequests.total_count]];
milestones.forEach(([label, value], index) => {
  const x = 20 + index * 155;
  dashboard += box(x, 912, 145, 132);
  dashboard += `<path d="M${x + 51} 929H${x + 94}V960L${x + 72.5} 978L${x + 51} 960Z" fill="${burgundy}" stroke="${crimson}"/>`;
  dashboard += text(x + 72.5, 958, count(value), 20, peach, 'text-anchor="middle" font-weight="700"') + text(x + 72.5, 1007, label, 10, peach, 'text-anchor="middle" font-weight="700" letter-spacing="1"');
});
dashboard += text(30, 1071, 'Commit charts cover your authored commits on default branches of owned public repositories.', 12);
dashboard += text(30, 1093, 'Pull request and issue totals cover public GitHub activity. All metric tiles show real counts.', 12);
await writeFile(new URL('dashboard.svg', output), svg(960, 1116, 'GitHub dashboard: contributions, stats, commit hours, language donuts, and metric tiles', dashboard));
console.log(`Updated profile assets: ${repos.length} public repositories, ${total} contributions.`);
