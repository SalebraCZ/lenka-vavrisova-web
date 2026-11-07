import test from 'node:test';
import assert from 'node:assert/strict';
import { read, positions, isAscending } from './helpers.js';

const h = () => read('_site/provazeni/index.html');

test('provázení: 4 fáze ve správném pořadí', () => {
  assert.ok(isAscending(positions(h(), ['Před zavedením', 'Těsně před nasazením', 'Nasazení a hned po něm', 'Týdny po zavedení'])));
});

test('provázení: vedení, 2 karty, text O mně v první osobě', () => {
  const html = h();
  assert.ok(html.includes('Uměláinteligence.cz'));
  assert.ok(html.includes('V roce 2013 jsem založila sportovní tým od nuly.'));
  assert.ok(html.includes('Pracuju s majiteli a manažery menších firem.'));
  assert.equal((html.match(/class="card karta-duvera"/g) || []).length, 2);
});

test('text O mně je celý, včetně odstavce Mimo práci', () => {
  assert.ok(h().includes('Mimo práci jsem autorkou knihy Sylvanor a světa Beastorie'));
});
