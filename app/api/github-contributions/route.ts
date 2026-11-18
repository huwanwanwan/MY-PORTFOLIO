import { parseContributionCalendar, rollingContributionCalendar } from "../../../server/github-contributions";

export async function GET() {
  try {
    const now = new Date();
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - 364);
    const years = [...new Set([start.getUTCFullYear(), now.getUTCFullYear()])];
    // Explicit yearly calendars avoid GitHub's stale default rolling-calendar response.
    const calendars = await Promise.all(years.map(async year => {
      const url = new URL("https://github.com/users/huwanwanwan/contributions");
      url.searchParams.set("from", year + "-01-01");
      url.searchParams.set("to", year + "-12-31");
      const upstream = await fetch(url, {
        headers: { Accept: "text/html", "User-Agent": "Wancor-Portfolio", "Cache-Control": "no-cache" },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (!upstream.ok) throw new Error("GitHub unavailable");
      return parseContributionCalendar(await upstream.text());
    }));
    return Response.json(rollingContributionCalendar(calendars, now), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "GitHub activity is temporarily unavailable." }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
