#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');
const SKIP_TOKEN = 'backup-migrated';

function toPascal(kebab) {
  return kebab.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function ensureBak(file) {
  const bak = file + '.bak';
  if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
}

const dirs = fs.readdirSync(COMPONENTS, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const summary = [];

dirs.forEach(dir => {
  const dirPath = path.join(COMPONENTS, dir);
  if (dirPath.includes(SKIP_TOKEN)) return;
  const pascal = toPascal(dir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jsx'));
  files.forEach(file => {
    if (file.endsWith('.stories.jsx')) return;
    if (file.endsWith('.bak')) return;
    const base = file.replace(/\.jsx$/, '');
    // only rename if base equals the directory name (lowercase/kebab) or is kebab form
    if (base === pascal) return; // already correct
    if (base.toLowerCase() === dir.toLowerCase()) {
      const oldPath = path.join(dirPath, file);
      const newPath = path.join(dirPath, `${pascal}.jsx`);
      if (fs.existsSync(newPath)) {
        summary.push({ dir, file, status: 'skipped-exists', note: path.relative(ROOT, newPath) });
        return;
      }
      try {
        ensureBak(oldPath);
        fs.renameSync(oldPath, newPath);
        summary.push({ dir, from: path.relative(ROOT, oldPath), to: path.relative(ROOT, newPath), status: 'renamed' });
      } catch (err) {
        summary.push({ dir, file, status: 'error', message: err.message });
      }
    }
  });
});

console.log('Rename summary:');
summary.forEach(s => {
  if (s.status === 'renamed') console.log(`- renamed ${s.from} -> ${s.to}`);
  else if (s.status === 'skipped-exists') console.log(`- skipped ${s.dir}: target exists (${s.note})`);
  else console.log(`- ${s.dir}/${s.file}: ${s.status} ${s.message || ''}`);
});
console.log('\nBackups created alongside original files with .bak suffix.');
