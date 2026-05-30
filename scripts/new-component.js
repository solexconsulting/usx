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

// Create colocated story files in the component folder using templates
const templateFiles = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.stories.jsx'));
if (templateFiles.length === 0) {
  console.warn('No story templates found in', templatesDir);
} else {
  templateFiles.forEach((file) => {
    const src = path.join(templatesDir, file);
    let contents = fs.readFileSync(src, 'utf8');
    contents = contents.replace(/{{Name}}/g, Name).replace(/{{kebab}}/g, kebab);
    const destFile = file.replace('component', Name);
    const dest = path.join(targetDir, destFile);
    if (fs.existsSync(dest)) {
      console.log('Skipping existing story', dest);
      return;
    }
    fs.writeFileSync(dest, contents, 'utf8');
    console.log('Created', dest);
  });
}

console.log(`Component ${Name} scaffolded at ${targetDir}`);
