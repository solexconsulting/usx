#!/usr/bin/env node
// Compiles src/contracts.js (the canonical CMS contract manifest) into a
// plain dist/component-contracts.json for non-JS consumers (e.g. the SOLEX
// CMS). Mirrors packages/usx-theme/build.js's theme-manifest.json emission.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const contractsPath = path.join(__dirname, '..', 'src', 'contracts.js');

const { componentContracts } = await import(contractsPath);

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
  path.join(distDir, 'component-contracts.json'),
  JSON.stringify(componentContracts, null, 2) + '\n',
  'utf8'
);

console.log(`Wrote ${Object.keys(componentContracts.components).length} component contracts to dist/component-contracts.json`);
