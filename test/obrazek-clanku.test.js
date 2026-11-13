import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { read } from './helpers.js';

const SRC = 'src="/blog/techmeetup-ostrava.jpg"';

test('obrázek článku je v článku, na blogu i na úvodu', () => {
  for (const page of ['_site/blog/kdyz-ai-prestane-zrychlovat-praci/index.html', '_site/blog/index.html', '_site/index.html']) {
    assert.ok(read(page).includes(SRC), page);
  }
});

test('obrázek článku je malý a bez metadat', () => {
  const buf = fs.readFileSync('_site/blog/techmeetup-ostrava.jpg');
  assert.ok(buf.length < 250 * 1024, `${buf.length} B`);
  assert.ok(!buf.includes(Buffer.from('Exif')), 'soubor nese EXIF');
});
