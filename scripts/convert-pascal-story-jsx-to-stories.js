#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');
const SKIP_TOKEN = 'backup-migrated';

function isPascal(name) {
  return /^[A-Z][A-Za-z0-9]*\.jsx$/.test(name);
}

function shouldBeStory(content) {
  return /export\s+default\s*\{/.test(content) || /tags:\s*\['autodocs'\]/.test(content) || /djangoComponent\(/.test(content);
}

let renamed = 0;
const dirs = fs.readdirSync(COMPONENTS);
dirs.forEach(dir => {
  const dirPath = path.join(COMPONENTS, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return;
  if (dirPath.includes(SKIP_TOKEN)) return;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (!isPascal(file)) return;
    const full = path.join(dirPath, file);
    if (full.includes(SKIP_TOKEN)) return;
    const content = fs.readFileSync(full, 'utf8');
    if (shouldBeStory(content)) {
      const target = path.join(dirPath, file.replace(/\.jsx$/, '.stories.jsx'));
      if (fs.existsSync(target)) return;
      fs.copyFileSync(full, full + '.bak');
      fs.renameSync(full, target);
      console.log(`Renamed story file: ${full} -> ${target}`);
      renamed++;
    }
  });
});

console.log(`Done. Renamed ${renamed} files.`);
