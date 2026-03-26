#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

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

const repoRoot = path.resolve(__dirname, '..');
const templatesDir = path.join(repoRoot, 'scripts', 'templates', 'component');
const targetDir = path.join(repoRoot, 'packages', 'core', 'src', 'components', kebab);

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
  // Do not copy story templates into the component folder; those are written to the stories dir separately
  if (file.endsWith('.stories.jsx')) return;
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

// If an index.js wasn't part of templates, ensure there's a re-export index.js
const indexPath = path.join(targetDir, 'index.js');
if (!fs.existsSync(indexPath)) {
  const reexport = `export { default } from './${Name}.jsx';\n`;
  fs.writeFileSync(indexPath, reexport, 'utf8');
  console.log('Created', indexPath);
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
    } catch (e) {
      console.error('Failed to load config schema:', e.message);
      process.exit(6);
    }

    let Ajv;
    try {
      Ajv = require('ajv');
    } catch (e) {
      console.error('AJV not found. Please run `pnpm install` to install dev dependencies.');
      process.exit(7);
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
  } catch (e) {
    console.error('Failed to parse config.json:', e.message);
    process.exit(5);
  }
} else {
  console.warn('No config.json generated to validate');
}

// Add auto-export to packages/core/src/index.js
const coreIndex = path.join(repoRoot, 'packages', 'core', 'src', 'index.js');
try {
  if (fs.existsSync(coreIndex)) {
    let idx = fs.readFileSync(coreIndex, 'utf8');
    const exportLine = `export { default as ${Name} } from './components/${kebab}';`;
    if (!idx.includes(exportLine)) {
      idx = idx.trim() + '\n' + exportLine + '\n';
      fs.writeFileSync(coreIndex, idx, 'utf8');
      console.log('Updated', coreIndex, 'with new export');
    } else {
      console.log(`${Name} already exported from core index`);
    }
  } else {
    console.warn('packages/core/src/index.js not found; skipping auto-export');
  }
} catch (e) {
  console.error('Failed to update core index exports:', e.message);
}

// Create story files in packages/core/src/stories using templates
const storiesDir = path.join(repoRoot, 'packages', 'core', 'src', 'stories');
if (!fs.existsSync(storiesDir)) fs.mkdirSync(storiesDir, { recursive: true });
const templateFiles = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.stories.jsx'));
if (templateFiles.length === 0) {
  console.warn('No story templates found in', templatesDir);
} else {
  templateFiles.forEach((file) => {
    const src = path.join(templatesDir, file);
    let contents = fs.readFileSync(src, 'utf8');
    contents = contents.replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);
    const destFile = file.replace('component', Name);
    const dest = path.join(storiesDir, destFile);
    fs.writeFileSync(dest, contents, 'utf8');
    console.log('Created', dest);
  });
}

console.log(`Component ${Name} scaffolded at ${targetDir}`);
