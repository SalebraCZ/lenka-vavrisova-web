import test from 'node:test';
import assert from 'node:assert/strict';
import { read } from './helpers.js';

test('workshop má text z podkladů a rozsah', () => {
  const h = read('_site/workshop/index.html');
  assert.ok(h.includes('Lidská stránka zavádění AI'));
  assert.ok(h.includes('Když AI zavádějí jen 2 nadšenci, peníze za nástroje se nevrátí.'));
  for (const s of ['půl dne, 4 hodiny', 'osobně ve firmě, nebo online', 'do 30 lidí']) assert.ok(h.includes(s), s);
});

test('koučink: nejdřív majitelé, pak jednotlivci, Koučovací cyklus', () => {
  const h = read('_site/koucink/index.html');
  assert.ok(h.indexOf('pro zakladatele, majitele/majitelky a vedení') > -1);
  assert.ok(h.indexOf('pro zakladatele, majitele/majitelky a vedení') < h.indexOf('pro jednotlivce'));
  assert.ok(h.includes('Koučovací cyklus'));
  assert.ok(!h.includes('Provázení změnou'));
});
