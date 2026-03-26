#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const COMPONENTS = path.join(__dirname, '..', 'packages', 'core', 'src', 'components');

function toPascal(kebab) {
  return kebab.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

const dirs = fs.readdirSync(COMPONENTS);
dirs.forEach(dir => {
  const full = path.join(COMPONENTS, dir);
  if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) return;
  const pascal = toPascal(dir);
  const candidates = fs.readdirSync(full).filter(f => f.endsWith('.jsx'));
  candidates.forEach(f => {
    const base = path.basename(f, '.jsx');
    if (base === pascal) return; // already Pascal
    const from = path.join(full, f);
    const to = path.join(full, pascal + '.jsx');
    if (fs.existsSync(to)) return;
    try {
      fs.renameSync(from, to);
      console.log(`Renamed ${from} -> ${to}`);
    } catch (err) {
      console.error('Failed to rename', from, err.message);
    }
  });
});

console.log('Normalization complete.');
