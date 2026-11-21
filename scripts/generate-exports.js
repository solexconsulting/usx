#!/usr/bin/env node
// Regenerates the React package's core and optional component entry points.
// Run: pnpm generate:exports
import fs from 'node:fs';
import { REACT_ENTRY_POINTS, buildIndexSource, rel } from './lib/component-configs.js';

for (const [entryPoint, file] of Object.entries(REACT_ENTRY_POINTS)) {
  const source = buildIndexSource(entryPoint);
  fs.writeFileSync(file, source, 'utf8');
  const count = source.split('\n').filter((l) => l.startsWith('export')).length;
  console.log(`Wrote ${count} component exports to ${rel(file)}`);
}
