import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { read } from './helpers.js';

test('úvod a profil ukazují fotku místo zástupného kruhu', () => {
  for (const page of ['_site/index.html', '_site/profil/index.html']) {
    const h = read(page);
    assert.ok(h.includes('src="/assets/lenka.jpg"'), page);
    assert.ok(!h.includes('Místo pro fotografii'), page);
  }
});

test('fotka je malá a bez metadat (EXIF může nést polohu)', () => {
  const buf = fs.readFileSync('_site/assets/lenka.jpg');
  assert.ok(buf.length < 250 * 1024, `${buf.length} B`);
  assert.ok(!buf.includes(Buffer.from('Exif')), 'soubor nese EXIF');
});
