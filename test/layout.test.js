import test from 'node:test';
import assert from 'node:assert/strict';
import { read, allHtmlFiles } from './helpers.js';

test('každá stránka má lang cs, navigaci a kontakt', () => {
  for (const file of allHtmlFiles('_site')) {
    const html = read(file);
    assert.match(html, /<html lang="cs"/, file);
    for (const href of ['/provazeni/', '/workshop/', '/koucink/', '/profil/', '/akce/', '/blog/', '#kontakt'])
      assert.ok(html.includes(`href="${href}"`), `${file}: chybí odkaz ${href}`);
    assert.match(html, /id="kontakt"/, file);
    assert.ok(html.includes('Rezervovat úvodních 30 minut zdarma'), file);
    assert.ok(html.includes('vavrisova@umelainteligence.cz'), file);
    assert.ok(html.includes('725 406 696'), file);
  }
});

test('mailto má zakódovaný předmět', () => {
  assert.match(read('_site/index.html'), /href="mailto:vavrisova@umelainteligence\.cz\?subject=[^"\s]+"/);
});

test('písma se nenačítají z Googlu', () => {
  for (const file of allHtmlFiles('_site')) assert.ok(!read(file).includes('fonts.googleapis.com'), file);
});

test('kontakt má odkaz na Instagram bez sledovacího parametru', () => {
  const h = read('_site/index.html');
  assert.ok(h.includes('href="https://www.instagram.com/salebra1/"'));
  assert.ok(!h.includes('cplk='));
});
