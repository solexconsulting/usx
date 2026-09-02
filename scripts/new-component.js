#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { execSync } from 'child_process';

function toKebab(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function toPascal(name) {
  return name
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toUpperCase());
}

const [,, rawName] = process.argv;
if (!rawName) {
  console.error('Usage: new-component <ComponentName>');
  process.exit(2);
}

const Name = toPascal(rawName);
const kebab = toKebab(rawName);

const repoRoot = "./";
const templatesDir = path.join(repoRoot, 'scripts', 'templates', 'component');
const targetDir = path.join(repoRoot, 'packages', 'core', 'src', 'components', kebab);
const usxScssDir = path.join(repoRoot, 'packages', 'usx', 'src', 'components');
const storiesDir = path.join(repoRoot, 'packages', 'usx-stories', 'src', 'components', kebab);
const usxIndexScssPath = path.join(repoRoot, 'packages', 'usx', 'src', 'index.scss');

if (fs.existsSync(targetDir)) {
  const existingFiles = fs.readdirSync(targetDir).filter((f) => f !== '.' && f !== '..');
  if (existingFiles.length > 0) {
    console.error('Component directory already exists and is not empty:', targetDir);
    process.exit(3);
  }
  // directory exists but is empty — proceed to populate
} else {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(templatesDir);
files.forEach((file) => {
  // Story templates go to packages/usx-stories (see below) — Storybook only
  // scans that package. SCSS goes to packages/usx (see below) — that's the
  // package every real component's runtime-themeable styles live in.
  if (file.endsWith('.stories.jsx') || file.endsWith('.scss')) return;
  const src = path.join(templatesDir, file);
  let destName = file.replace('component', kebab).replace('Component', Name);;
  const dest = path.join(targetDir, destName);
  if (fs.existsSync(dest)) {
    console.log('Skipping existing file', dest);
    return;
  }
  let contents = fs.readFileSync(src, 'utf8');
  contents = contents.replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);
  fs.writeFileSync(dest, contents, 'utf8');
  console.log('Created', dest);
});

// Create the per-component SCSS partial in packages/usx (the package every
// real component's theme-aware styles live in) and forward it from
// packages/usx/src/index.scss so it's actually included in the build.
const scssTemplatePath = path.join(templatesDir, 'component.scss');
if (fs.existsSync(scssTemplatePath)) {
  fs.mkdirSync(usxScssDir, { recursive: true });
  const scssDest = path.join(usxScssDir, `_${kebab}.scss`);
  if (fs.existsSync(scssDest)) {
    console.log('Skipping existing file', scssDest);
  } else {
    let scssContents = fs.readFileSync(scssTemplatePath, 'utf8');
    scssContents = scssContents.replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);
    fs.writeFileSync(scssDest, scssContents, 'utf8');
    console.log('Created', scssDest);
  }

  const forwardLine = `@forward './components/${kebab}';`;
  const existingIndexScss = fs.existsSync(usxIndexScssPath) ? fs.readFileSync(usxIndexScssPath, 'utf8') : '';
  if (!existingIndexScss.includes(forwardLine)) {
    const updatedIndexScss = existingIndexScss.replace(/\n?$/, '') + `\n${forwardLine}\n`;
    fs.writeFileSync(usxIndexScssPath, updatedIndexScss, 'utf8');
    console.log('Added', forwardLine, 'to', usxIndexScssPath);
  }
}

// Validate generated config.json against schema using AJV if available
const generatedConfigPath = path.join(targetDir, 'config.json');
if (fs.existsSync(generatedConfigPath)) {
  try {
    const cfg = JSON.parse(fs.readFileSync(generatedConfigPath, 'utf8'));
    const schemaPath = path.join(repoRoot, 'packages', 'core', 'config.schema.json');
    let schema = null;
    try {
      schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    } catch {
      console.error('Failed to load config schema');
      process.exit(6);
    }

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const valid = validate(cfg);
    if (!valid) {
      console.error('config.json validation failed with AJV:');
      console.error(validate.errors);
      process.exit(8);
    }

    if (cfg.name && cfg.name !== kebab) {
      console.warn(`Warning: config.json name ('${cfg.name}') does not match folder name ('${kebab}').`);
    }
    console.log('config.json validated against schema');
  } catch {
    console.error('Failed to parse config.json');
    process.exit(5);
  }
} else {
  console.warn('No config.json generated to validate');
}

// Regenerate core exports using the repo's export generator if available
try {
  const gen = path.join(repoRoot, 'scripts', 'generate-exports.cjs');
  if (fs.existsSync(gen)) {
    execSync(`node ${gen}`, { stdio: 'inherit' });
    console.log('Regenerated core exports using scripts/generate-exports.cjs');
  } else {
    // fallback: warn so maintainers can run their export generator
    console.warn('generate-exports.cjs not found; please run your export generation workflow to update packages/core/src/index.js');
  }
} catch (e) {
  console.warn('Failed to regenerate core exports automatically:', e.message);
}

// Create story files in packages/usx-stories — the only package Storybook's
// `stories` glob (apps/storybook/.storybook/main.js) actually scans.
const templateFiles = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.stories.jsx'));
if (templateFiles.length === 0) {
  console.warn('No story templates found in', templatesDir);
} else {
  fs.mkdirSync(storiesDir, { recursive: true });
  templateFiles.forEach((file) => {
    const src = path.join(templatesDir, file);
    let contents = fs.readFileSync(src, 'utf8');
    contents = contents.replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);
    const destFile = file.replace('component', Name);
    const dest = path.join(storiesDir, destFile);
    if (fs.existsSync(dest)) {
      console.log('Skipping existing story', dest);
      return;
    }
    fs.writeFileSync(dest, contents, 'utf8');
    console.log('Created', dest);
  });
}

console.log(`Component ${Name} scaffolded at ${targetDir}`);
