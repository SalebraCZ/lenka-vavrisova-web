import test from 'node:test';
import assert from 'node:assert/strict';
import { read, positions, isAscending } from './helpers.js';

test('úvod: pořadí sekcí a obsah', () => {
  const h = read('_site/index.html');
  assert.ok(h.includes('AI transformace začíná u lidí. Dřív než u nástroje.'));
  assert.ok(isAscending(positions(h, ['<h1', 'id="poznavate-se"', 'id="nabidky"', 'id="clanky"', 'id="kontakt"'])));
  for (const href of ['/provazeni/', '/workshop/', '/koucink/']) assert.ok(h.includes(`href="${href}"`));
  assert.ok(h.includes('href="/blog/kdyz-ai-prestane-zrychlovat-praci/"'));
});

test('Poznáváte se? má 6 otázek ze spec', () => {
  const sekce = read('_site/index.html').split('id="poznavate-se"')[1].split('</section>')[0];
  assert.equal((sekce.match(/<li/g) || []).length, 6);
});
