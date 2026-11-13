import test from 'node:test';
import assert from 'node:assert/strict';
import { read, positions, isAscending } from './helpers.js';

const h = () => read('_site/provazeni/index.html');

test('provázení: 4 fáze ve správném pořadí', () => {
  assert.ok(isAscending(positions(h(), ['Před zavedením', 'Těsně před nasazením', 'Nasazení a hned po něm', 'Týdny po zavedení'])));
});

test('provázení: vedení a 2 karty Proč mi věřit', () => {
  const html = h();
  assert.ok(html.includes('Uměláinteligence.cz'));
  assert.equal((html.match(/class="card karta-duvera"/g) || []).length, 2);
});

test('text O mně v první osobě na Provázení není (Lenka, 7. 11. 2026)', () => {
  assert.ok(!h().includes('V roce 2013 jsem založila sportovní tým od nuly.'));
});
