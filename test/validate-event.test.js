import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEvent } from '../lib/validate-event.js';

const ok = { nazev: 'A', datum: '2026-12-01', misto: 'Brno', typ: 'přednáška' };

test('akce bez data zastaví sestavení s názvem souboru', () => {
  const { datum, ...bez } = ok;
  assert.throws(() => validateEvent(bez, 'akce/a.md'), /Akce akce\/a\.md: chybí pole datum/);
});
test('akce s neplatným datem zastaví sestavení', () => {
  assert.throws(() => validateEvent({ ...ok, datum: 'v prosinci' }, 'akce/a.md'), /Akce akce\/a\.md: neplatné datum/);
});
test('úplná akce projde', () => {
  assert.doesNotThrow(() => validateEvent(ok, 'akce/a.md'));
});
