#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');
const SKIP_TOKEN = 'backup-migrated';

function isPascalJsx(name) {
  return /^[A-Z][A-Za-z0-9]*\.jsx$/.test(name);
}

function looksLikeStory(content) {
  return /export\s+default\s*\{/.test(content)
    || /tags:\s*\[\s*['"]autodocs['"]/.test(content)
    || /djangoComponent\(/.test(content)
    || /export\s+const\s+Default\s*=/.test(content)
    || /parameters:\s*\{\s*docs:/.test(content);
}

let count = 0;
const dirs = fs.readdirSync(COMPONENTS);
dirs.forEach(dir => {
  const dirPath = path.join(COMPONENTS, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return;
  if (dirPath.includes(SKIP_TOKEN)) return;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (!isPascalJsx(file)) return;
    const full = path.join(dirPath, file);
    if (full.includes(SKIP_TOKEN)) return;
    let content;
    try { content = fs.readFileSync(full, 'utf8'); } catch (e) { return; }
    if (!looksLikeStory(content)) return;

    const target = path.join(dirPath, file.replace(/\.jsx$/, '.stories.jsx'));
    if (fs.existsSync(target)) {
      // don't overwrite existing story file; create a numbered backup
      const alt = target + '.autofix';
      fs.copyFileSync(full, alt);
      console.log(`Copied ${full} -> ${alt} (target exists)`);
      count++;
      return;
    }

    // backup original
    fs.copyFileSync(full, full + '.bak');
    fs.renameSync(full, target);
    console.log(`Renamed ${full} -> ${target} (backup at ${full}.bak)`);
    count++;
  });
});

console.log(`Done. Fixed ${count} files.`);
