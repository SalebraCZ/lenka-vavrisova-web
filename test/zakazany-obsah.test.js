import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { read, allHtmlFiles } from './helpers.js';

const ZAKAZANO = [/\bKč\b/, /\bDPH\b/, /certifikát ICF/i, /nejstarší tým/i, /Škola intuice/i, /datum narození/i, /\bcovid/i, /kyslík/i];

test('žádná stránka nenese zakázaný obsah', () => {
  for (const file of allHtmlFiles('_site')) {
    const text = read(file).replace(/<[^>]+>/g, ' ');
    for (const re of ZAKAZANO) assert.ok(!re.test(text), `${file}: ${re}`);
  }
});

test('veřejný repozitář nenese podklady', () => {
  for (const name of ['podklady', 'docs', 'reports', 'research_notes']) assert.ok(!fs.existsSync(name), name);
});
