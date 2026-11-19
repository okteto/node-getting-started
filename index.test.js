const assert = require('node:assert');
const { test } = require('node:test');
const app = require('./index');

test('GET / responds with Hello world!', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());
  await new Promise((resolve) => server.once('listening', resolve));

  const res = await fetch(`http://127.0.0.1:${server.address().port}/`);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(await res.text(), 'Hello world!');
});
