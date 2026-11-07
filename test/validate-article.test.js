import test from 'node:test';
import assert from 'node:assert/strict';
import { validateArticle } from '../lib/validate-article.js';

test('chybějící název zastaví sestavení', () => {
  assert.throws(() => validateArticle({ datum: '2026-11-10', perex: 'x' }, 'blog/a.md'), /Článek blog\/a\.md: chybí pole nazev/);
});
test('prázdný perex zastaví sestavení', () => {
  assert.throws(() => validateArticle({ nazev: 'A', datum: '2026-11-10', perex: '' }, 'blog/a.md'), /chybí pole perex/);
});
test('neplatné datum zastaví sestavení', () => {
  assert.throws(() => validateArticle({ nazev: 'A', datum: 'zítra', perex: 'x' }, 'blog/a.md'), /neplatné datum/);
});
test('úplná hlavička projde, i s datem jako Date', () => {
  assert.doesNotThrow(() => validateArticle({ nazev: 'A', datum: '2026-11-10', perex: 'x' }, 'blog/a.md'));
  assert.doesNotThrow(() => validateArticle({ nazev: 'A', datum: new Date('2026-11-10'), perex: 'x' }, 'blog/a.md'));
});
