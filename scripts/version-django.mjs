import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Changesets owns the version; Python metadata and the shared manifest follow it.
export function versionDjango(directory) {
  const { version } = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
  if (!/^\d+\.\d+\.\d+$/.test(version))
    throw new Error('Django releases currently require a stable major.minor.patch version');
  const file = path.join(directory, 'pyproject.toml');
  const source = fs.readFileSync(file, 'utf8');
  const section = source.split(/^\[project\]\s*$/m)[1]?.split(/^\[/m)[0];
  if (!section || !/^version = "[^"]+"$/m.test(section))
    throw new Error('Missing literal project.version in pyproject.toml');
  const updated = section.replace(/^version = "[^"]+"$/m, `version = "${version}"`);
  fs.writeFileSync(file, source.replace(section, updated));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  versionDjango(fileURLToPath(new URL('../packages/usx-django/', import.meta.url)));
