import fs from 'node:fs';
import path from 'node:path';
import {
  REPO_ROOT,
  COMPONENTS_DIR,
  buildContractManifest,
  loadComponentConfigs,
  printErrors,
} from './lib/component-configs.js';

const { configs, errors } = loadComponentConfigs();
if (errors.size) {
  printErrors(errors);
  process.exit(1);
}

const packageDir = path.join(REPO_ROOT, 'packages/usx-django');
const outputDir = path.join(packageDir, 'usx_django');
const runtimeDir = path.join(REPO_ROOT, 'apps/storybook-django/project/components');

for (const directory of ['core', 'templatetags', 'templates']) {
  fs.rmSync(path.join(outputDir, directory), { recursive: true, force: true });
}
for (const directory of ['core', 'templatetags']) {
  fs.cpSync(path.join(runtimeDir, directory), path.join(outputDir, directory), {
    recursive: true,
    filter: (source) => fs.statSync(source).isDirectory()
      ? path.basename(source) !== '__pycache__'
      : source.endsWith('.py'),
  });
}
fs.copyFileSync(path.join(runtimeDir, 'table_component.py'), path.join(outputDir, 'table_component.py'));
fs.cpSync(COMPONENTS_DIR, path.join(outputDir, 'templates'), {
  recursive: true,
  filter: (source) => fs.statSync(source).isDirectory()
    ? path.basename(source) !== '__pycache__'
    : source.endsWith('.django.html') || path.basename(source) === 'config.json' || source.endsWith('.py'),
});
fs.writeFileSync(
  path.join(outputDir, 'component-contracts.json'),
  `${JSON.stringify(buildContractManifest(configs), null, 2)}\n`,
);
fs.copyFileSync(path.join(REPO_ROOT, 'LICENSE'), path.join(packageDir, 'LICENSE'));
console.log(`Prepared Django package with ${configs.size} contracts in packages/usx-django.`);