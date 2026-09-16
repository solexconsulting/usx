#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const root = "./";
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
const FILE_CHECK_EXCEPTIONS = new Set(['example-pages', 'branding', '']);

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

// Parsed successfully-loaded configs, keyed by component name, so that
// cross-component "component" references (e.g. avatar-group.avatars.items
// referencing the "avatar" component) can be checked below.
const configsByName = new Map();

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

    // `required` is a manifest of prop names that must actually exist in `props`.
    const propNames = new Set(Object.keys(data.props || {}));
    const unknownRequired = (data.required || []).filter((name) => !propNames.has(name));
    if (unknownRequired.length) {
      failures++;
      console.error(`\nValidation errors in ${path.relative(root, f)}:`);
      unknownRequired.forEach((name) => {
        console.error(`  - required references unknown prop "${name}"`);
      });
    }

    if (data.name) configsByName.set(data.name, data);
  } catch (err) {
    failures++;
    console.error(`\nFailed to read/parse ${f}: ${err.message}`);
  }
});

// A prop node references another component's props (e.g. "avatars" is an
// array of "avatar" prop objects). Verify every such reference points at a
// real component, and that any "omit" entries are actual props on it.
function checkComponentRefs(node, componentLabel, propPath, errors) {
  if (!node || typeof node !== 'object') return;

  if (node.component) {
    const ref = configsByName.get(node.component);
    if (!ref) {
      errors.push(`${propPath} references unknown component "${node.component}"`);
    } else if (node.omit) {
      const refPropNames = new Set(Object.keys(ref.props || {}));
      node.omit.forEach((name) => {
        if (!refPropNames.has(name)) {
          errors.push(`${propPath} omits "${name}", which is not a prop of component "${node.component}"`);
        }
      });
    }
  } else if (node.omit) {
    errors.push(`${propPath} sets "omit" without "component"`);
  }

  if (node.items) checkComponentRefs(node.items, componentLabel, `${propPath}.items`, errors);
  if (node.properties) {
    Object.entries(node.properties).forEach(([key, value]) => {
      checkComponentRefs(value, componentLabel, `${propPath}.properties.${key}`, errors);
    });
  }
}

files.forEach((f) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch {
    return; // already reported above
  }
  const errors = [];
  Object.entries(data.props || {}).forEach(([propName, prop]) => {
    checkComponentRefs(prop, data.name, propName, errors);
  });
  if (errors.length) {
    failures++;
    console.error(`\nValidation errors in ${path.relative(root, f)}:`);
    errors.forEach((e) => console.error(`  - ${e}`));
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