import { writeFile } from "node:fs/promises";
const source = "https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf";
const response = await fetch(source);
if (!response.ok) throw new Error(`Domain list download failed: ${response.status}`);
const domains = [...new Set((await response.text()).split(/\r?\n/).map((line) => line.trim().toLowerCase()).filter((line) => line && !line.startsWith("#")))].sort();
if (domains.length < 5000 || domains.some((domain) => !/^[a-z0-9.-]+\.[a-z0-9-]+$/.test(domain))) throw new Error("Unexpected domain list format; existing list was preserved.");
await writeFile(new URL("../data/disposable-email-domains.json", import.meta.url), JSON.stringify(domains));
console.log(`Updated ${domains.length} disposable email domains. Run security tests and redeploy.`);
