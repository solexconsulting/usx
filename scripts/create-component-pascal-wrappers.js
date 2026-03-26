#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');
const SKIP_TOKEN = 'backup-migrated';

function toPascal(kebab) {
  return kebab.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function readDirs(dir) {
  try { return fs.readdirSync(dir); } catch (e) { return []; }
}

const created = [];

readDirs(COMPONENTS).forEach(dir => {
  const dirPath = path.join(COMPONENTS, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return;
  if (dirPath.includes(SKIP_TOKEN)) return;
  const pascal = toPascal(dir);
  const lowerFile = path.join(dirPath, `${dir}.jsx`);
  const pascalFile = path.join(dirPath, `${pascal}.jsx`);
  const storyFile = path.join(dirPath, `${pascal}.stories.jsx`);
  // Only create wrapper if story expects Pascal and lowercase component exists but Pascal file doesn't
  if (fs.existsSync(storyFile) && fs.existsSync(lowerFile) && !fs.existsSync(pascalFile)) {
    const rel = `./${path.basename(lowerFile)}`;
    const content = `export { default } from '${rel}';\n`;
    fs.writeFileSync(pascalFile, content, 'utf8');
    created.push(pascalFile);
  }
});

if (created.length) {
  console.log('Created Pascal wrapper files:');
  created.forEach(f => console.log(' -', f));
} else {
  console.log('No wrappers needed.');
}
