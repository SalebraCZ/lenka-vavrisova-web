import test from 'node:test';
import assert from 'node:assert/strict';
import { read } from './helpers.js';

test('3 proběhlé akce, žádná připravovaná', () => {
  const h = read('_site/akce/index.html');
  for (const s of ['TechMeetup Ostrava', 'A co lidi?', 'Co s lidmi?']) assert.ok(h.includes(s), s);
  assert.match(h, /id="pripravujeme-prazdne"/);
});

test('bez připravovaných akcí není pruh na úvodu', () => {
  assert.ok(!read('_site/index.html').includes('id="nejblizsi-akce"'));
});
