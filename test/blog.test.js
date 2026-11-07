import test from 'node:test';
import assert from 'node:assert/strict';
import { read } from './helpers.js';

const CLANEK = '_site/blog/kdyz-ai-prestane-zrychlovat-praci/index.html';

test('první článek je na webu a v seznamu', () => {
  assert.ok(read(CLANEK).includes('Když AI přestane zrychlovat práci a začne zrychlovat vás'));
  assert.ok(read('_site/blog/index.html').includes('href="/blog/kdyz-ai-prestane-zrychlovat-praci/"'));
});
test('článek nenese pracovní poznámky z podkladů', () => {
  const h = read(CLANEK);
  for (const s of ['Stav:', 'Upraveno:', 'Rozhodnuto']) assert.ok(!h.includes(s), s);
});
