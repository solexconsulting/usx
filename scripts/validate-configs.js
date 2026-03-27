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

if (failures) {
  console.error(`\nValidation failed: ${failures} file(s) affected.`);
  process.exit(2);
}

console.log(`All ${files.length} config.json files validated OK.`);
process.exit(0);