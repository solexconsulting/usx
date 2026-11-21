import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { versionDjango } from '../version-django.mjs';

function fixture(t, version) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'django-version-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.writeFileSync(path.join(directory, 'package.json'), JSON.stringify({ version }));
  fs.writeFileSync(
    path.join(directory, 'pyproject.toml'),
    '[project]\nname = "solex-usx-django"\nversion = "0.1.0"\n\n[tool.other]\nversion = "leave-alone"\n'
  );
  return directory;
}

test('the Changesets version updates only Python project metadata and is idempotent', (t) => {
  const directory = fixture(t, '0.2.0');
  versionDjango(directory);
  const file = path.join(directory, 'pyproject.toml');
  const updated = fs.readFileSync(file, 'utf8');
  assert.match(updated, /version = "0.2.0"/);
  assert.match(updated, /version = "leave-alone"/);
  versionDjango(directory);
  assert.equal(fs.readFileSync(file, 'utf8'), updated);
});

test('unsupported prereleases and missing Python versions fail before writing', (t) => {
  const directory = fixture(t, '0.2.0-next.0');
  const file = path.join(directory, 'pyproject.toml');
  const original = fs.readFileSync(file, 'utf8');
  assert.throws(() => versionDjango(directory), /stable/);
  assert.equal(fs.readFileSync(file, 'utf8'), original);
  fs.writeFileSync(path.join(directory, 'package.json'), '{"version":"0.2.0"}');
  fs.writeFileSync(file, '[project]\nname = "solex-usx-django"\n');
  assert.throws(() => versionDjango(directory), /Missing literal/);
});
