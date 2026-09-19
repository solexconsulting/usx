#!/usr/bin/env node
// Scaffolds a new component across the workspace from scripts/templates/component:
//   packages/usx-react/src/components/<kebab>/   React entry, Django + HTML templates, config.json
//   packages/usx/src/components/_<kebab>.scss (+ @forward from packages/usx/src/index.scss)
//   packages/usx-stories/src/components/<kebab>/  React/Django/HTML stories
// then regenerates index.js and packages/usx-contracts/src/contracts.js. Run: pnpm new-component <ComponentName>
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  COMPONENTS_DIR,
  REPO_ROOT,
  STORIES_DIR,
  USX_SCSS_DIR,
  loadComponentConfigs,
  printErrors,
  rel,
  toKebab,
  toPascal,
} from './lib/component-configs.js';

const rawName = process.argv[2];
if (!rawName) {
  console.error('Usage: pnpm new-component <ComponentName>');
  process.exit(2);
}

const Name = toPascal(rawName);
const kebab = toKebab(Name);
const templatesDir = path.join(REPO_ROOT, 'scripts', 'templates', 'component');
const targetDir = path.join(COMPONENTS_DIR, kebab);
const storiesDir = path.join(STORIES_DIR, kebab);
const usxIndexScss = path.join(USX_SCSS_DIR, '..', 'index.scss');

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length) {
  console.error(`Component directory already exists and is not empty: ${rel(targetDir)}`);
  process.exit(3);
}

const render = (file) =>
  fs.readFileSync(path.join(templatesDir, file), 'utf8').replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);

function write(dest, contents) {
  if (fs.existsSync(dest)) {
    console.log(`Skipping existing ${rel(dest)}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, contents, 'utf8');
  console.log(`Created ${rel(dest)}`);
}

for (const file of fs.readdirSync(templatesDir)) {
  const contents = render(file);
  if (file.endsWith('.stories.jsx')) {
    write(path.join(storiesDir, file.replace('component', Name)), contents);
  } else if (file.endsWith('.scss')) {
    write(path.join(USX_SCSS_DIR, `_${kebab}.scss`), contents);
  } else {
    write(path.join(targetDir, file.replace('component', kebab).replace('Component', Name)), contents);
  }
}

const forwardLine = `@forward './components/${kebab}';`;
const indexScss = fs.readFileSync(usxIndexScss, 'utf8');
if (!indexScss.includes(forwardLine)) {
  fs.writeFileSync(usxIndexScss, `${indexScss.trimEnd()}\n${forwardLine}\n`, 'utf8');
  console.log(`Added ${forwardLine} to ${rel(usxIndexScss)}`);
}

const { errors } = loadComponentConfigs();
if (errors.size) {
  printErrors(errors);
  process.exit(1);
}

for (const script of ['generate-exports.js', 'generate-contracts.js']) {
  execFileSync(process.execPath, [path.join(REPO_ROOT, 'scripts', script)], { stdio: 'inherit' });
}

console.log(`\nComponent ${Name} scaffolded at ${rel(targetDir)}`);
