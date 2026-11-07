import test from 'node:test';
import assert from 'node:assert/strict';
import { obrazekUrl } from '../lib/obrazek.js';

test('obrázek vedle článku dostane adresu ze složky blog', () => {
  assert.equal(obrazekUrl('foto.png'), '/blog/foto.png');
});
test('absolutní adresy zůstanou beze změny', () => {
  assert.equal(obrazekUrl('/assets/x.png'), '/assets/x.png');
  assert.equal(obrazekUrl('https://example.org/x.png'), 'https://example.org/x.png');
});
