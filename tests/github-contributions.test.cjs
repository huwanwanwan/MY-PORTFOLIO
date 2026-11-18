const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const exportsForTest = {};
new Function('exports', ts.transpileModule(fs.readFileSync(require.resolve('../server/github-contributions.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText)(exportsForTest);
const { rollingContributionCalendar } = exportsForTest;
function yearCalendar(year) {
  const days = [];
  const date = new Date(Date.UTC(year, 0, 1));
  while (date.getUTCFullYear() === year) {
    days.push({ date: date.toISOString().slice(0, 10), count: 1, level: 1 });
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return { username: 'huwanwanwan', total: days.length, days, updatedAt: '' };
}
test('merges explicit years into exactly 365 days and excludes future dates', () => {
  const result = rollingContributionCalendar([yearCalendar(2025), yearCalendar(2026)], new Date('2026-11-18T20:00:00Z'));
  assert.equal(result.total, 365);
  assert.equal(result.days.length, 365);
  assert.equal(result.days[0].date, '2025-11-20');
  assert.equal(result.days.at(-1).date, '2026-11-19');
});
test('handles leap years and duplicate calendar entries without double counting', () => {
  const calendar = yearCalendar(2024);
  const result = rollingContributionCalendar([calendar, calendar], new Date('2024-12-31T12:00:00Z'));
  assert.equal(result.total, 365);
  assert.equal(result.days[0].date, '2024-01-02');
});
test('rejects an incomplete year instead of displaying an incorrect total', () => {
  assert.throws(() => rollingContributionCalendar([yearCalendar(2026)], new Date('2026-01-01T00:00:00Z')), /Incomplete/);
});

test('includes Manila activity after local midnight while UTC is still on the previous day', () => {
  const calendar = yearCalendar(2026);
  calendar.days.find(day => day.date === '2026-11-19').count = 7;
  const result = rollingContributionCalendar([yearCalendar(2025), calendar], new Date('2026-11-18T20:00:00Z'));
  assert.equal(result.days.at(-1).date, '2026-11-19');
  assert.equal(result.days.at(-1).count, 7);
  assert.equal(result.total, 371);
});
