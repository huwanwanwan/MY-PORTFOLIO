import { parseContributionCalendar } from "../../../server/github-contributions";

export async function GET() {
  try {
    const upstream = await fetch("https://github.com/users/huwanwanwan/contributions", {
      headers: { Accept: "text/html", "User-Agent": "Wancor-Portfolio" },
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) throw new Error("GitHub unavailable");
    return Response.json(parseContributionCalendar(await upstream.text()), {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return Response.json({ error: "GitHub activity is temporarily unavailable." }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
