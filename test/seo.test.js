import test from 'node:test';
import assert from 'node:assert/strict';
import { read, allHtmlFiles } from './helpers.js';

test('každá stránka má popis, canonical a OG', () => {
  for (const file of allHtmlFiles('_site').filter(f => !f.endsWith('404.html'))) {
    const h = read(file);
    // Délku hlídáme jen u stálých stránek; popis článku je jeho perex a ten
    // smí mít libovolnou délku, jinak by delší perex zastavil vydání.
    const clanek = /[\\/]blog[\\/][^\\/]+[\\/]index\.html$/.test(file);
    assert.match(h, clanek ? /<meta name="description" content="[^"]+"/ : /<meta name="description" content="[^"]{50,160}"/, file);
    assert.match(h, /<link rel="canonical" href="https:\/\/lenka-vavrisova\.cz\//, file);
    assert.match(h, /<meta property="og:image" content="https:\/\/lenka-vavrisova\.cz\/assets\/og-obrazek\.png"/, file);
  }
});

test('CNAME a 404', () => {
  assert.equal(read('_site/CNAME').trim(), 'lenka-vavrisova.cz');
  assert.ok(read('_site/404.html').includes('href="/"'));
});
