const assert = require('node:assert');
const { test } = require('node:test');
const { app, MESSAGE } = require('./index');

// get starts the application on a free port and requests one of its paths.
async function get(t, path) {
  const server = app.listen(0);
  t.after(() => server.close());
  await new Promise((resolve) => server.once('listening', resolve));

  return fetch(`http://127.0.0.1:${server.address().port}${path}`);
}

test('GET /api/info responds with the message and the Node.js version', async (t) => {
  const res = await get(t, '/api/info');

  assert.strictEqual(res.status, 200);
  const info = await res.json();
  assert.strictEqual(info.message, MESSAGE);
  assert.match(info.runtime, /^Node\.js \d+\./);
});

test('GET / responds with the page', async (t) => {
  const res = await get(t, '/');

  assert.strictEqual(res.status, 200);
  assert.match(await res.text(), /id="message"/);
});
