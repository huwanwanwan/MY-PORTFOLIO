const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
};
const { handleContact, isDisposableEmail } = require('../server/contact.ts');
const host = 'portfolio.juandomanicomilitante.workers.dev';
const fields = { name: 'Example Visitor', email: 'visitor@gmail.com', message: 'Please help with a website project.', token: 'test-token' };
const env = () => ({ TURNSTILE_SECRET_KEY: 'test-secret', CONTACT_RATE_LIMIT: { limit: async () => ({ success: true }) }, CONTACT_SEND_LIMIT: { limit: async () => ({ success: true }) } });
const request = (body = fields, headers = {}) => new Request(`https://${host}/api/contact`, { method: 'POST', headers: { origin: `https://${host}`, 'content-type': 'application/json', 'cf-connecting-ip': '192.0.2.1', ...headers }, body: JSON.stringify(body) });
const verified = { success: true, hostname: host, action: 'contact' };
const noFetch = async () => { assert.fail('Blocked requests must not contact verification or mail provider'); };

test('blocks disposable providers and their subdomains without rejecting regular addresses', () => {
  for (const email of ['visitor@mailinator.com', 'visitor@sub.mailinator.com', 'visitor@yopmail.com', 'visitor@10minutemail.com']) assert.equal(isDisposableEmail(email), true, email);
  for (const email of ['visitor@gmail.com', 'visitor@outlook.com', 'visitor@company.example']) assert.equal(isDisposableEmail(email), false, email);
});
for (const [name, changes, status] of [
  ['disposable email', { email: 'visitor@mailinator.com' }, 400],
  ['missing challenge', { token: '' }, 403],
  ['honeypot bot', { honeypot: 'spam' }, 403],
  ['header injection', { subject: 'Hello\r\nBcc: spam@example.com' }, 400],
  ['invalid email', { email: 'invalid' }, 400],
  ['oversized message', { message: 'a'.repeat(1001) }, 400],
]) test(`rejects ${name} before delivery`, async () => assert.equal((await handleContact(request({ ...fields, ...changes }), env(), noFetch)).status, status));

test('rejects cross-origin posts', async () => assert.equal((await handleContact(request(fields, { origin: 'https://untrusted.example' }), env(), noFetch)).status, 403));
test('enforces edge attempt limit before validation', async () => {
  const settings = env(); settings.CONTACT_RATE_LIMIT.limit = async () => ({ success: false });
  assert.equal((await handleContact(request(), settings, noFetch)).status, 429);
});
for (const [name, result] of [ ['failed token', { success: false }], ['wrong hostname', { ...verified, hostname: 'untrusted.example' }], ['wrong action', { ...verified, action: 'login' }] ]) {
  test(`rejects ${name} before mail delivery`, async () => {
    let calls = 0;
    const response = await handleContact(request(), env(), async () => { calls++; return Response.json(result); });
    assert.equal(response.status, 403); assert.equal(calls, 1);
  });
}
test('rate limits verified senders before mail delivery', async () => {
  const settings = env(); settings.CONTACT_SEND_LIMIT.limit = async () => ({ success: false });
  let calls = 0;
  const response = await handleContact(request(), settings, async () => { calls++; return Response.json(verified); });
  assert.equal(response.status, 429); assert.equal(calls, 1);
});
test('accepts verified legitimate message and sends only once', async () => {
  const calls = [];
  const response = await handleContact(request(), env(), async (url, options) => { calls.push({url, options}); return calls.length === 1 ? Response.json(verified) : new Response('OK'); });
  assert.equal(response.status, 200); assert.equal(calls.length, 2);
  assert.equal(JSON.parse(calls[1].options.body).template_params.reply_to, fields.email);
});
test('does not report success when mail provider rejects delivery', async () => {
  let count = 0;
  const response = await handleContact(request(), env(), async () => Response.json(++count === 1 ? verified : { success: false }));
  assert.equal(response.status, 502);
});
test('fails closed when bot secret is unavailable', async () => {
  assert.equal((await handleContact(request(), { ...env(), TURNSTILE_SECRET_KEY: '' }, noFetch)).status, 503);
});

test('uses fallback after a definite EmailJS rejection', async () => {
  let count = 0;
  const response = await handleContact(request(), env(), async () => {
    count++;
    if (count === 1) return Response.json(verified);
    if (count === 2) return new Response('Server API disabled', { status: 403 });
    return Response.json({ success: 'true' });
  });
  assert.equal(response.status, 200); assert.equal(count, 3);
});
test('reports a fallback activation requirement clearly', async () => {
  let count = 0;
  const response = await handleContact(request(), env(), async () => {
    count++;
    if (count === 1) return Response.json(verified);
    if (count === 2) return new Response('Not found', { status: 404 });
    return Response.json({ success: 'false', message: 'This form needs Activation.' });
  });
  assert.equal(response.status, 502); assert.match((await response.json()).error, /activation/);
});
test('does not send twice after ambiguous provider failures', async () => {
  let count = 0;
  const response = await handleContact(request(), env(), async () => ++count === 1 ? Response.json(verified) : new Response('Error', { status: 503 }));
  assert.equal(response.status, 502); assert.equal(count, 2);
});
test('escapes HTML before inserting message into HTML mail templates', async () => {
  let count = 0;
  await handleContact(request({ ...fields, message: '<script>alert(1)</script>' }), env(), async (_url, options) => {
    if (++count === 1) return Response.json(verified);
    assert.ok(JSON.parse(options.body).template_params.message_html.endsWith('&lt;script&gt;alert(1)&lt;/script&gt;'));
    return new Response('OK');
  });
});

for (const sender of ['visitor@gmail.com', 'visitor@yahoo.com', 'visitor@outlook.com']) {
  test(`routes inquiries from ${sender} to the owner while preserving Reply-To`, async () => {
    let count = 0;
    const response = await handleContact(request({ ...fields, email: sender }), env(), async (_url, options) => {
      if (++count === 1) return Response.json(verified);
      const params = JSON.parse(options.body).template_params;
      for (const field of ['to_email', 'recipient_email', 'email', 'user_email']) {
        assert.equal(params[field], 'militantejuanenricodomanico@gmail.com');
      }
      assert.equal(params.reply_to, sender);
      assert.equal(params.from_email, sender);
      assert.ok(params.message.includes(`Reply to: ${sender}`));
      return new Response('OK');
    });
    assert.equal(response.status, 200);
  });
}


test('sends the EmailJS private key only to the server-side delivery provider', async () => {
  const settings = { ...env(), EMAILJS_PRIVATE_KEY: 'test-private-key' };
  let calls = 0;
  const response = await handleContact(request(), settings, async (url, options) => {
    if (++calls === 1) {
      assert.equal(new URLSearchParams(options.body).has('accessToken'), false);
      return Response.json(verified);
    }
    assert.equal(url, 'https://api.emailjs.com/api/v1.0/email/send');
    assert.equal(JSON.parse(options.body).accessToken, settings.EMAILJS_PRIVATE_KEY);
    return new Response('OK');
  });
  assert.equal(response.status, 200);
  assert.equal((await response.text()).includes(settings.EMAILJS_PRIVATE_KEY), false);
});


test('trims whitespace around the EmailJS private key', async () => {
  let calls = 0;
  const response = await handleContact(request(), { ...env(), EMAILJS_PRIVATE_KEY: '  test-private-key\n' }, async (_url, options) => {
    if (++calls === 1) return Response.json(verified);
    assert.equal(JSON.parse(options.body).accessToken, 'test-private-key');
    return new Response('OK');
  });
  assert.equal(response.status, 200);
});

test('identifies provider authentication failure without exposing credentials or provider response', async () => {
  let count = 0;
  const secret = 'sensitive-test-private-key';
  const response = await handleContact(request(), {...env(), EMAILJS_PRIVATE_KEY: secret}, async () => {
    if (++count === 1) return Response.json(verified);
    if (count === 2) return new Response(`API access in strict mode, but no Private Key was provided ${secret}`, { status: 403 });
    return Response.json({ success: false, message: 'Rate limit exceeded' }, { status: 429 });
  });
  assert.equal(response.status, 502);
  const body = await response.text();
  assert.match(body, /MAIL_AUTH/);
  assert.equal(body.includes(secret), false);
  assert.equal(body.includes('strict mode'), false);
});
