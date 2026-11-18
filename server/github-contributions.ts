export type ContributionDay = { date: string; count: number; level: number };
export type ContributionCalendar = {
  username: string;
  total: number;
  days: ContributionDay[];
  updatedAt: string;
};

export function parseContributionCalendar(html: string): ContributionCalendar {
  const attributes = (tag: string, name: string) =>
    tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attributes(match[1], "for");
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const count = text.match(/^([\d,]+) contributions?\b/);
    if (id && (count || /^No contributions\b/.test(text))) {
      counts.set(id, count ? Number(count[1].replaceAll(",", "")) : 0);
    }
  }
  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*>/g)) {
    const date = attributes(match[0], "data-date");
    const id = attributes(match[0], "id");
    const level = Number(attributes(match[0], "data-level"));
    if (date && id && counts.has(id) && Number.isInteger(level) && level >= 0 && level <= 4) {
      days.push({ date, count: counts.get(id)!, level });
    }
  }
  if (days.length < 300 || new Set(days.map(day => day.date)).size !== days.length) {
    throw new Error("GitHub contribution calendar format unavailable");
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  return {
    username: "huwanwanwan",
    total: days.reduce((sum, day) => sum + day.count, 0),
    days,
    updatedAt: new Date().toISOString(),
  };
}
