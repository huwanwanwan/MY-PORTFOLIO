# Contact form spam protection

Production requests to `/api/contact` are handled by `worker.ts` before the Vinext page router. Email delivery runs only after server validation; the browser no longer calls EmailJS or the mail relay directly.

- Cloudflare Turnstile must verify successfully, with the exact production hostname and `contact` action. Tokens expire and are single use.
- The honeypot, email format, field lengths, request origin, and request body size are checked on the server.
- Cloudflare limits attempts to five per minute per IP and verified submissions to two per minute per IP and email hash. These edge limits are local to each Cloudflare location; they are abuse controls, not a global daily quota. The browser's existing two-per-day counter remains a convenience limit.
- Known disposable domains and their subdomains are rejected using the locally bundled CC0 list from https://github.com/disposable-email-domains/disposable-email-domains. Refresh it with `node scripts/update-disposable-domains.mjs`, run the security tests, and redeploy. Newly created disposable services may be absent from the list.
- EmailJS is the primary provider, using the original configured service and template from the server. Enable non-browser API requests in the EmailJS Account / Security settings. FormSubmit is a fallback for definite primary-provider rejections and must be activated for the recipient. Ambiguous errors do not trigger a second delivery. Both providers must explicitly report success. The application does not request separate automatic-reply emails; any EmailJS template behavior is managed in that account.

The production Turnstile widget is restricted to the portfolio hostname. Its public site key is in `data/contact-config.ts`; `TURNSTILE_SECRET_KEY` is stored only as a Cloudflare Worker secret. Never put the secret in Git or a `NEXT_PUBLIC_` variable. Missing configuration fails closed. `npm run deploy:vinext` deploys the protected endpoint; `next dev` and `next start` alone do not run the Worker wrapper.

Run `node --test tests/contact-security.test.cjs`, then `npm run build`. Tests mock verification and delivery so they send no email. Live checks validate blocked requests without sending mail; delivery tests are separate from the automated checks. During the user-approved delivery diagnostic, EmailJS explicitly rejected non-browser requests and FormSubmit accepted one labeled test. Provider acceptance alone does not confirm inbox receipt.

These checks protect this website form. They cannot filter mail sent directly to the published email address or prevent all spam; mailbox-level spam filtering is separate.

References: [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [FormSubmit AJAX API](https://formsubmit.co/ajax-documentation). Domain-list license: `data/DISPOSABLE-EMAIL-LICENSE.txt`.

EmailJS recipient fields (`to_email`, `recipient_email`, and legacy `email`/`user_email`) are fixed to the portfolio owner. Visitor addresses are used only in explicit sender and Reply-To fields and included in the message. In the EmailJS template, keep To Email set to the owner address or `{{to_email}}`; use `{{reply_to}}` for replies.
