import fs from 'node:fs';
import path from 'node:path';

export function read(file) {
  return fs.readFileSync(file, 'utf8');
}

export function allHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return allHtmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

// Pozice řetězců v textu; hodí se pro kontrolu pořadí sekcí.
export function positions(text, needles) {
  return needles.map(n => text.indexOf(n));
}

export function isAscending(nums) {
  return nums.every((n, i) => n > -1 && (i === 0 || n > nums[i - 1]));
}
