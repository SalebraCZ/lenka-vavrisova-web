import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { read } from './helpers.js';
import { splitEvents } from '../lib/events.js';

// Stejný den jako při sestavení (npm test nastavuje BUILD_DATE).
const dnes = process.env.BUILD_DATE ? new Date(`${process.env.BUILD_DATE}T12:00:00Z`) : new Date();
const akce = fs.readdirSync('akce').filter(f => f.endsWith('.md'))
  .map(f => ({ data: { datum: read(`akce/${f}`).match(/^datum:\s*(\S+)/m)[1] } }));
const { upcoming } = splitEvents(akce, dnes);

test('proběhlé akce ze spuštění jsou na stránce', () => {
  const h = read('_site/akce/index.html');
  for (const s of ['TechMeetup Ostrava', 'A co lidi?', 'Co s lidmi?']) assert.ok(h.includes(s), s);
});

test('prázdné Připravujeme ukáže větu, jinak akce a pruh na úvodu', () => {
  const stranka = read('_site/akce/index.html');
  const uvod = read('_site/index.html');
  if (upcoming.length === 0) {
    assert.match(stranka, /id="pripravujeme-prazdne"/);
    assert.ok(!uvod.includes('id="nejblizsi-akce"'));
  } else {
    assert.ok(!stranka.includes('id="pripravujeme-prazdne"'));
    assert.ok(uvod.includes('id="nejblizsi-akce"'));
  }
});
