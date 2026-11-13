import test from 'node:test';
import assert from 'node:assert/strict';
import { read } from './helpers.js';

// Počet připravovaných akcí bereme ze sestavené stránky, ne z vlastního čtení
// souborů: test tak vždy souhlasí s tím, jak hlavičky přečetlo Eleventy.
const pripravovane = html => (html.match(/class="ev"/g) || []).length;

test('proběhlé akce ze spuštění jsou na stránce', () => {
  const h = read('_site/akce/index.html');
  for (const s of ['TechMeetup Ostrava', 'A co lidi?', 'Co s lidmi?']) assert.ok(h.includes(s), s);
});

test('prázdné Připravujeme ukáže větu, jinak akce a pruh na úvodu', () => {
  const stranka = read('_site/akce/index.html');
  const uvod = read('_site/index.html');
  if (pripravovane(stranka) === 0) {
    assert.match(stranka, /id="pripravujeme-prazdne"/);
    assert.ok(!uvod.includes('id="nejblizsi-akce"'));
  } else {
    assert.ok(!stranka.includes('id="pripravujeme-prazdne"'));
    assert.ok(uvod.includes('id="nejblizsi-akce"'));
  }
});

test('proběhlé akce s nahrávkou mají odkaz na záznam', () => {
  const h = read('_site/akce/index.html');
  assert.ok(h.includes('href="https://www.youtube.com/watch?v=yIjSJntKrMI&amp;t=745s"'));
  assert.ok(h.includes('href="https://www.youtube.com/watch?v=_1gMs2TMBqQ&amp;t=2820s"'));
  assert.ok(h.includes('href="https://www.youtube.com/watch?v=bdNf8J8Q_88"'));
  assert.ok(h.includes('Záznam na YouTube'));
});
