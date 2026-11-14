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
  const response = await handleContact(request(), env(), async (url, options) => { calls.push({url, options}); return Response.json(calls.length === 1 ? verified : { success: 'true' }); });
  assert.equal(response.status, 200); assert.equal(calls.length, 2);
  assert.equal(JSON.parse(calls[1].options.body)._replyto, fields.email);
});
test('does not report success when mail provider rejects delivery', async () => {
  let count = 0;
  const response = await handleContact(request(), env(), async () => Response.json(++count === 1 ? verified : { success: false }));
  assert.equal(response.status, 502);
});
test('fails closed when bot secret is unavailable', async () => {
  assert.equal((await handleContact(request(), { ...env(), TURNSTILE_SECRET_KEY: '' }, noFetch)).status, 503);
});
