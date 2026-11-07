import test from 'node:test';
import assert from 'node:assert/strict';
import { slugCs } from '../lib/slug.js';

test('slugCs odstraní diakritiku, mezery a interpunkci', () => {
  assert.equal(slugCs('Když AI přestane'), 'kdyz-ai-prestane');
  assert.equal(slugCs('  Řízení – změny!! '), 'rizeni-zmeny');
  assert.equal(slugCs('Článek 2'), 'clanek-2');
});
