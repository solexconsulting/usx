import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const usxSourceDir = path.resolve(packageDir, '../src');
const tokenDistDir = path.resolve(packageDir, '../../tokens/dist');
const sassBin = path.resolve(packageDir, '../../../node_modules/.bin/sass');
const builds = [
  ['src/index.scss', 'dist/usx.css'],
  ['src/themed.scss', 'dist/usx-themed.css']
];

let building = false;
let pending = false;
let timer;

function compile() {
  if (building) {
    pending = true;
    return;
  }

  building = true;
  const child = spawn(sassBin, [
    '--pkg-importer=node',
    '--no-source-map',
    ...builds.flatMap(([input, output]) => [`${input}:${output}`])
  ], { cwd: path.resolve(packageDir, '..'), stdio: 'inherit' });

  child.on('close', (code) => {
    building = false;
    if (code !== 0) process.exitCode = code;
    if (pending) {
      pending = false;
      compile();
    }
  });
}

function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(compile, 150);
}

function watch(directory) {
  fs.watch(directory, { recursive: true }, (_event, filename) => {
    if (filename) scheduleBuild();
  });
}

compile();
watch(usxSourceDir);
watch(tokenDistDir);
console.log(`Watching ${usxSourceDir} and ${tokenDistDir} for changes...`);

function shutdown() {
  clearTimeout(timer);
  process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
