#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default || require('ajv');

const root = path.resolve(__dirname, '..');
const schemaPath = path.join(root, 'packages', 'core', 'config.schema.json');

if (!fs.existsSync(schemaPath)) {
  console.error('Schema not found:', schemaPath);
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validate = ajv.compile(schema);

// Component folders that are intentionally exempt from required-file checks.
// These are non-standard entries (e.g. demonstration pages, not components).
const FILE_CHECK_EXCEPTIONS = new Set(['example-pages']);

// Every real component folder must contain these file patterns.
// Each entry is a regex tested against the filenames in the folder.
const REQUIRED_FILE_PATTERNS = [
  { pattern: /\.jsx$/,          label: 'React component (.jsx)' },
  { pattern: /\.django\.html$/, label: 'Django template (.django.html)' },
  { pattern: /\.html$/,         label: 'HTML template (.html)' },
  { pattern: /\.scss$/,         label: 'Stylesheet (.scss)' },
  { pattern: /^config\.json$/,  label: 'config.json' },
];

function findConfigFiles(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) out.push(...findConfigFiles(p));
    else if (stat.isFile() && name === 'config.json') out.push(p);
  }
  return out;
}

const componentsDir = path.join(root, 'packages', 'core', 'src', 'components');
if (!fs.existsSync(componentsDir)) {
  console.error('Components dir not found:', componentsDir);
  process.exit(1);
}

// ─── 1. Validate config.json schema ──────────────────────────────────────────

const files = findConfigFiles(componentsDir);
let failures = 0;

files.forEach((f) => {
  try {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    const ok = validate(data);
    if (!ok) {
      failures++;
      console.error(`\nValidation errors in ${path.relative(root, f)}:`);
      validate.errors.forEach((e) => {
        console.error(`  - ${e.instancePath || '/'} ${e.message}`);
      });
    }
  } catch (err) {
    failures++;
    console.error(`\nFailed to read/parse ${f}: ${err.message}`);
  }
});

if (files.length === 0) {
  console.warn('No config.json files found under', componentsDir);
}

// ─── 2. Check required file presence in every component folder ───────────────

let warnings = 0;

const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const dir of componentDirs) {
  const dirPath = path.join(componentsDir, dir);
  const dirFiles = fs.readdirSync(dirPath);

  if (FILE_CHECK_EXCEPTIONS.has(dir)) {
    console.warn(`  [SKIP] ${dir} is exempt from required-file checks`);
    continue;
  }

  for (const { pattern, label } of REQUIRED_FILE_PATTERNS) {
    const found = dirFiles.some((f) => pattern.test(f));
    if (!found) {
      warnings++;
      console.warn(`  [WARN] packages/core/src/components/${dir}/ missing: ${label}`);
    }
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

if (failures) {
  console.error(`\nValidation failed: ${failures} config.json file(s) have schema errors.`);
  process.exit(2);
}

if (warnings) {
  console.warn(`\nFile-presence check: ${warnings} warning(s) — see above.`);
}

console.log(`All ${files.length} config.json files validated OK.${warnings ? ` (${warnings} file-presence warnings)` : ''}`);
process.exit(0);