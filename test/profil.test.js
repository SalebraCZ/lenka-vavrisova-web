import test from 'node:test';
import assert from 'node:assert/strict';
import { read, positions, isAscending } from './helpers.js';

const h = () => read('_site/profil/index.html');

test('pruh faktů ve schváleném pořadí', () => {
  const pruh = h().split('class="facts"')[1].split('</div>\n</section>')[0];
  assert.ok(isAscending(positions(pruh, ['Change Management a AI adoption Lead', 'Koučka', 'Majitelka sportovního klubu', 'Ing.'])));
  assert.ok(pruh.includes('rekvalifikace akreditovaná MŠMT'));
});

test('pořadí částí profilu', () => {
  assert.ok(isAscending(positions(h(), ['id="o-mne"', 'id="zkusenosti"', 'id="mimo-praci"', 'id="kontakt"'])));
});

test('text O mně ve třetí osobě a podtitul', () => {
  const html = h();
  assert.ok(html.includes('Rozvíjím potenciál lidí a pomáhám jim měnit způsob, jakým fungují firmy i sami v sobě.'));
  assert.ok(html.includes('Lenka Vavrisová je člověk, který přirozeně propojuje lidi, systémy a změnu.'));
  assert.ok(html.includes('Protože když se mění lidé, může se skutečně změnit i způsob, jakým fungují firmy.'));
});

test('kurzy nemají roky', () => {
  const kurzy = JSON.parse(read('src/_data/kurzy.json'));
  assert.ok(kurzy.prace.length > 0 && kurzy.sport.length > 0);
  for (const k of [...kurzy.prace, ...kurzy.sport]) {
    assert.deepEqual(Object.keys(k).sort(), ['nazev', 'poradatel']);
    assert.ok(!/\b(19|20)\d{2}\b/.test(k.nazev), k.nazev);
  }
});

test('zkušenosti: probíhající první, Grig jako COO', () => {
  const z = JSON.parse(read('src/_data/zkusenosti.json'));
  const iProbihajici = z.map((r, i) => (r.konec === null ? i : -1)).filter(i => i > -1);
  assert.deepEqual(iProbihajici, iProbihajici.map((_, i) => i));
  const ukoncene = z.filter(r => r.konec !== null).map(r => r.konec);
  assert.deepEqual(ukoncene, [...ukoncene].sort().reverse());
  assert.equal(z.find(r => r.organizace === 'Grig a.s.').role, 'COO');
});
