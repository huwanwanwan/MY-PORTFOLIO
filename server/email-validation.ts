// DNS checks establish domain mail routing, not the existence or ownership of a mailbox.
export function isValidContactEmail(email: string) {
  if (email.length > 254) return false;
  const [local, domain, extra] = email.split("@");
  return extra === undefined && !!local && local.length <= 64 &&
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i.test(local) &&
    !!domain && domain.length <= 253 && domain.split(".").every(part => part.length <= 63) &&
    /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(domain);
}

type DnsResult = { Status: number; TC?: boolean; Answer?: { type: number; data: string }[] };
export async function checkEmailDomain(email: string, sendRequest: typeof fetch = fetch): Promise<"valid" | "invalid" | "unavailable"> {
  const domain = email.slice(email.lastIndexOf("@") + 1);
  async function query(type: string): Promise<DnsResult> {
    const url = new URL("https://cloudflare-dns.com/dns-query");
    url.searchParams.set("name", domain);
    url.searchParams.set("type", type);
    const response = await sendRequest(url.toString(), {
      headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("DNS unavailable");
    const result = await response.json() as DnsResult;
    if (!result || ![0, 3].includes(result.Status) || result.TC) throw new Error("DNS unavailable");
    return result;
  }
  try {
    const mx = await query("MX");
    if (mx.Status === 3) return "invalid";
    const records = (mx.Answer ?? []).filter(record => record.type === 15);
    if (records.some(record => /^0\s+\.$/.test(record.data.trim()))) return "invalid";
    if (records.some(record => /^\d+\s+(?:[a-z0-9-]+\.)*[a-z0-9-]+\.?$/i.test(record.data.trim()))) return "valid";
    if (records.length) return "unavailable";
    // SMTP permits an implicit MX using the domain's address records.
    const addresses = await Promise.all([query("A"), query("AAAA")]);
    return addresses.some(result => result.Status === 0 && result.Answer?.some(record => record.type === 1 || record.type === 28)) ? "valid" : "invalid";
  } catch { return "unavailable"; }
}
