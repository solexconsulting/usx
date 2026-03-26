#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');

function ensureBak(file) {
  const bak = file + '.bak';
  if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
}

function tryFiles(dir, candidates) {
  for (const c of candidates) {
    const p = path.join(dir, c);
    if (fs.existsSync(p)) return c;
  }
  return null;
}

const dirs = fs.readdirSync(COMPONENTS);
let changed = 0;
dirs.forEach(dir => {
  const dirPath = path.join(COMPONENTS, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.stories.jsx'));
  files.forEach(story => {
    const storyPath = path.join(dirPath, story);
    const content = fs.readFileSync(storyPath, 'utf8');
    // find import of local component: import Component from './Xxx.jsx';
    const m = content.match(/import\s+[^;]*from\s+['"]\.\/(.+?\.jsx)['"];?/);
    if (!m) return;
    const imported = m[1];
    const pascal = imported.replace(/\.jsx$/, '');
    const kebab = dir; // folder name
    const candidates = [ `${kebab}.jsx`, `${kebab.replace(/-/g, '')}.jsx`, `${kebab.charAt(0).toUpperCase()+kebab.slice(1)}.jsx`, `${pascal}.jsx` ];
    const found = tryFiles(dirPath, candidates);
    if (!found) return;
    if (found === imported) return; // already correct
    // replace import occurrence
    const newContent = content.replace(imported, found);
    ensureBak(storyPath);
    fs.writeFileSync(storyPath, newContent, 'utf8');
    console.log(`Patched ${path.relative(ROOT, storyPath)} -> import './${found}'`);
    changed++;
  });
});

console.log(`Done. Modified ${changed} story files.`);
