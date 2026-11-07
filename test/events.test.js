import test from 'node:test';
import assert from 'node:assert/strict';
import { splitEvents } from '../lib/events.js';

const ev = d => ({ data: { datum: d } });

test('dnešní akce je připravovaná, i pozdě večer v Praze', () => {
  const r = splitEvents([ev('2026-11-06'), ev('2026-11-07'), ev('2026-12-01'), ev('2026-05-12')], new Date('2026-11-07T22:30:00Z'));
  assert.deepEqual(r.upcoming.map(e => e.data.datum), ['2026-11-07', '2026-12-01']);
  assert.deepEqual(r.past.map(e => e.data.datum), ['2026-11-06', '2026-05-12']);
});

test('datum jako Date z hlavičky funguje stejně', () => {
  const r = splitEvents([{ data: { datum: new Date('2026-11-07') } }], new Date('2026-11-07T10:00:00Z'));
  assert.equal(r.upcoming.length, 1);
});
