#!/usr/bin/env node
// Regenerates packages/core/src/index.js — the barrel that exports every
// React component (and the entry point for the core package's Vite build).
// Run: pnpm generate:exports
import fs from 'node:fs';
import { INDEX_PATH, buildIndexSource, rel } from './lib/component-configs.js';

const source = buildIndexSource();
fs.writeFileSync(INDEX_PATH, source, 'utf8');
const count = source.split('\n').filter((l) => l.startsWith('export')).length;
console.log(`Wrote ${count} component exports to ${rel(INDEX_PATH)}`);
