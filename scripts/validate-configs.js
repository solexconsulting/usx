#!/usr/bin/env node
// Validates the component library's authored metadata:
//   1. every config.json passes the schema + cross-reference checks
//   2. every component folder has its React entry, Django template, static
//      HTML template and config.json
//   3. the committed contracts.js and index.js are up to date with config.json
// Exit 1 on any error. Run: pnpm validate:configs (also part of `pnpm test`).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  COMPONENTS_DIR,
  CONTRACTS_PATH,
  INDEX_PATH,
  buildContractManifest,
  buildIndexSource,
  findComponentFile,
  listComponentDirs,
  loadComponentConfigs,
  printErrors,
  rel,
} from './lib/component-configs.js';

const { configs, errors } = loadComponentConfigs();
const problems = [];

// ── File presence ────────────────────────────────────────────────────────────
for (const dir of listComponentDirs()) {
  const files = fs.readdirSync(path.join(COMPONENTS_DIR, dir));
  const missing = [];
  if (!findComponentFile(dir)) missing.push(`React component (${dir}/<Pascal>.tsx)`);
  if (!files.includes(`${dir}.django.html`)) missing.push(`${dir}.django.html`);
  if (!files.includes(`${dir}.html`)) missing.push(`${dir}.html`);
  if (!files.includes('config.json')) missing.push('config.json');
  if (missing.length) problems.push(`${rel(path.join(COMPONENTS_DIR, dir))}/ is missing: ${missing.join(', ')}`);
}

// ── Generated-file freshness ─────────────────────────────────────────────────
if (!errors.size) {
  const { componentContracts } = await import(pathToFileURL(CONTRACTS_PATH));
  const expected = buildContractManifest(configs);
  if (JSON.stringify(componentContracts) !== JSON.stringify(expected)) {
    problems.push(`${rel(CONTRACTS_PATH)} is stale — run \`pnpm generate:contracts\``);
  }
}

const indexPath = INDEX_PATH;
if (fs.readFileSync(indexPath, 'utf8') !== buildIndexSource()) {
  problems.push(`${rel(indexPath)} is stale — run \`pnpm generate:exports\``);
}

// ── Report ───────────────────────────────────────────────────────────────────
if (errors.size) printErrors(errors);
if (problems.length) {
  console.error('');
  for (const p of problems) console.error(`  - ${p}`);
}
if (errors.size || problems.length) {
  console.error(`\nValidation failed: ${errors.size} config error file(s), ${problems.length} other problem(s).`);
  process.exit(1);
}
console.log(`All ${configs.size} components validated OK (configs, files, generated artifacts).`);
