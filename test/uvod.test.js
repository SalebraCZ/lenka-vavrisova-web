import test from 'node:test';
import assert from 'node:assert/strict';
import { read, positions, isAscending } from './helpers.js';

test('úvod: pořadí sekcí a obsah', () => {
  const h = read('_site/index.html');
  assert.ok(h.includes('Firma zvládne změnu tak dobře, jak ji zvládnete vy.'));
  assert.ok(isAscending(positions(h, ['<h1', 'id="poznavate-se"', 'id="nabidky"', 'id="clanky"', 'id="kontakt"'])));
  const nabidky = h.split('id="nabidky"')[1];
  assert.ok(isAscending(positions(nabidky, ['href="/koucink/"', 'href="/provazeni/"', 'href="/workshop/"'])), 'pořadí nabídek: koučink, provázení, workshop');
  assert.ok(nabidky.includes('<a class="offer main" href="/koucink/"'), 'hlavní nabídka je koučink');
  assert.ok(h.includes('href="/blog/kdyz-ai-prestane-zrychlovat-praci/"'));
});

test('Poznáváte se? má 8 otázek majitele', () => {
  const sekce = read('_site/index.html').split('id="poznavate-se"')[1].split('</section>')[0];
  assert.ok(sekce.includes('Řídím ještě firmu, nebo už jen hasím požáry?'));
  assert.equal((sekce.match(/<li/g) || []).length, 8);
});

test('hlavní nabídka a koučink mluví o změně toho, kdo firmu vede', () => {
  assert.ok(read('_site/index.html').includes('Transformace firmy začíná u toho, kdo ji vede.'));
  assert.ok(read('_site/koucink/index.html').includes('Skutečná transformace se neodehrává jen ve firmě.'));
  assert.ok(read('_site/provazeni/index.html').includes('můžeme pracovat i na vaší vlastní změně'));
});
