import disposableDomains from "../data/disposable-email-domains.json";
import { CONTACT_HOSTNAME } from "../data/contact-config";

const blockedDomains = new Set(disposableDomains);
const CONTACT_RECIPIENT = "militantejuanenricodomanico@gmail.com";
export function isDisposableEmail(email: string) {
  const parts = email.toLowerCase().split("@").pop()!.split(".");
  while (parts.length > 1) {
    if (blockedDomains.has(parts.join("."))) return true;
    parts.shift();
  }
  return false;
}

interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}
export interface ContactEnvironment {
  TURNSTILE_SECRET_KEY: string;
  EMAILJS_PRIVATE_KEY?: string;
  CONTACT_RATE_LIMIT: RateLimiter;
  CONTACT_SEND_LIMIT: RateLimiter;
}

const reply = (error: string, status: number) => Response.json({ error }, {
  status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
});

export async function handleContact(request: Request, env: ContactEnvironment, sendRequest: typeof fetch = fetch) {
  if (request.method !== "POST") return reply("Method not allowed.", 405);
  const origin = `https://${CONTACT_HOSTNAME}`;
  if (request.headers.get("origin") !== origin) return reply("Please send your message from the contact page.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Invalid request format.", 415);
  if (Number(request.headers.get("content-length")) > 12000) return reply("Message is too large.", 413);
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_RATE_LIMIT || !env.CONTACT_SEND_LIMIT) return reply("Contact form is temporarily unavailable. Please email me directly.", 503);
  if (!(await env.CONTACT_RATE_LIMIT.limit({ key: ip })).success) return reply("Too many attempts. Please wait a minute and try again.", 429);
  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("Invalid message.", 400);
    const decoder = new TextDecoder();
    let raw = "", bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 12000) {
        await reader.cancel();
        return reply("Message is too large.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply("Invalid message.", 400);
    body = parsed;
  } catch { return reply("Invalid message.", 400); }
  const text = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  const name = text("name"), email = text("email").toLowerCase(), phone = text("phone"), subject = text("subject"), message = text("message"), token = text("token");
  if (text("honeypot")) return reply("Unable to verify this submission.", 403);
  if (name.length < 2 || name.length > 100 || phone.length > 40 || subject.length > 160 || message.length < 10 || message.length > 1000 || /[\r\n]/.test(name + email + subject + phone)) return reply("Please enter your name and a message between 10 and 1,000 characters.", 400);
  if (email.length > 254 || !/^[^\s@]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(email)) return reply("Please enter a valid email address.", 400);
  if (isDisposableEmail(email)) return reply("Temporary or disposable email addresses are not accepted. Please use your regular email address.", 400);
  if (!token || token.length > 2048) return reply("Please complete the bot verification.", 403);

  try {
    const verification = await sendRequest("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (!verification.ok || result.success !== true || result.hostname !== CONTACT_HOSTNAME || result.action !== "contact") return reply("Bot verification failed or expired. Please verify again.", 403);
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
    const emailKey = Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
    if (!(await env.CONTACT_SEND_LIMIT.limit({ key: `ip:${ip}` })).success || !(await env.CONTACT_SEND_LIMIT.limit({ key: `email:${emailKey}` })).success) return reply("Please wait a minute before sending another message.", 429);

    // Keep the original configured EmailJS service behind server validation.
    // Its public key selects the account; no credentials are sent to browsers.
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
    const inquiry = `From: ${name}\nReply to: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`;
    const primary = await sendRequest("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_azcv23s", template_id: "template_3zl7lsk", user_id: "kUDnhN5l63awEUq0y",
        ...(env.EMAILJS_PRIVATE_KEY ? { accessToken: env.EMAILJS_PRIVATE_KEY } : {}),
        template_params: {
          from_name: name, name, user_name: name,
          // Legacy templates may use email/user_email for their To field.
          // Only explicit sender/Reply-To fields may contain the visitor address.
          email: CONTACT_RECIPIENT, user_email: CONTACT_RECIPIENT,
          to_email: CONTACT_RECIPIENT, recipient_email: CONTACT_RECIPIENT, to_name: "Juan Militante",
          from_email: email, sender_email: email, contact_email: email, reply_to: email,
          phone: phone || "Not provided", contact_number: phone || "Not provided",
          subject: subject || "General Project Discussion", title: subject || "General Project Discussion",
          message: inquiry, message_html: escapeHtml(inquiry),
        },
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (primary.ok && (await primary.text()).trim() === "OK") return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    // Avoid a second delivery if the first provider has an ambiguous failure.
    if (primary.ok || primary.status >= 500) return reply("The email service could not confirm delivery. Please try again later or email me directly.", 502);

    const delivery = await sendRequest("https://formsubmit.co/ajax/militantejuanenricodomanico@gmail.com", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin, Referer: `${origin}/contact` },
      body: JSON.stringify({ name, email, phone: phone || "Not provided", message, _replyto: email, _subject: `[Wancor] ${subject || "Project inquiry"} - ${name}`, _template: "box", _captcha: "false" }),
      signal: AbortSignal.timeout(20000),
    });
    const delivered = await delivery.json() as { success?: boolean | string; message?: string };
    if (!delivery.ok || (delivered.success !== true && delivered.success !== "true")) {
      const needsActivation = typeof delivered.message === "string" && /needs activation|activate form/i.test(delivered.message);
      console.error("Contact delivery rejected", { primaryStatus: primary.status, fallbackStatus: delivery.status, needsActivation });
      return reply(needsActivation
        ? "The contact form's email service needs activation by the site owner. Please email me directly for now."
        : "Unable to deliver your message right now. Please try again later or email me directly.", 502);
    }
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return reply("Unable to send right now. Please try again later or email me directly.", 502); }
}
