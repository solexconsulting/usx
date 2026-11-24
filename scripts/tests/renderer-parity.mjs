import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  COMPONENTS_DIR,
  REPO_ROOT as root,
  findComponentFile,
  listComponentDirs,
  loadComponentConfigs,
} from '../lib/component-configs.js';
import { createStoryRuntime } from '../snapshots/render/runtime.ts';
import { parityStore } from '../snapshots/results/stores.ts';
import { parityInputHash } from '../snapshots/parity/inputs.ts';
import { writeReport } from '../snapshots/commands/report.ts';
import { normalizeMarkup } from '../snapshots/compare/normalize.ts';

// Batch-render the actual Django components with the same asset root as React.
// No HTTP server or story host is involved in this parity check.
const djangoProgram = `
import json, os, sys
os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings.development'
import django
django.setup()
from django.test import override_settings
from django.utils.safestring import mark_safe
from project.components.core.render import render_component
results = []
with override_settings(STATIC_URL='/', MEDIA_URL='/media/', DEBUG=False):
    for item in json.load(sys.stdin):
        try:
            props = item['props']
            for name in item.get('safeProps', []):
                props[name] = mark_safe(props[name])
            results.append({'html': render_component(item['component'], props)})
        except Exception as error:
            results.append({'error': str(error)})
print(json.dumps(results))
`;
const inputHash = parityInputHash();
const runtime = await createStoryRuntime();
const cases = [];
const components = new Map();
const { configs } = loadComponentConfigs();
async function add(component, label, props, reactProps = props, safeProps = []) {
  try {
    if (!components.has(component)) {
      const entry = findComponentFile(component);
      const { default: Component } = await runtime.load(
        path.join(COMPONENTS_DIR, component, entry.file)
      );
      components.set(component, Component);
    }
    cases.push({
      component,
      label,
      props,
      safeProps,
      react: renderToStaticMarkup(React.createElement(components.get(component), reactProps)),
    });
  } catch (error) {
    cases.push({ component, label, props, reactError: error.message });
  }
}
const fixtures = path.join(import.meta.dirname, 'fixtures/renderer-parity');
try {
  // Contract examples serialize rich slots as HTML, just like Default stories.
  // Use the existing decoder to supply equivalent React nodes and Django HTML.
  const { storyDefaultArgs } = await runtime.load(
    path.join(root, 'packages/usx-stories/src/utils/storyHelpers.jsx')
  );
  function decode(value, spec) {
    if (spec?.type === 'slot') return storyDefaultArgs(value);
    if (Array.isArray(value))
      return spec?.items ? value.map((item) => decode(item, spec.items)) : value;
    if (!value || typeof value !== 'object' || !spec) return value;
    const properties = { ...configs.get(spec.component)?.props, ...spec.properties };
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, decode(item, properties[key])])
    );
  }
  for (const component of listComponentDirs()) {
    const config = JSON.parse(
      fs.readFileSync(path.join(COMPONENTS_DIR, component, 'config.json'), 'utf8')
    );
    await add(
      component,
      'Contract example',
      config.default || {},
      decode(config.default || {}, { properties: config.props })
    );
  }
  for (const file of fs
    .readdirSync(fixtures)
    .filter((file) => file.endsWith('.jsx'))
    .sort()) {
    const { default: groups } = await runtime.load(path.join(fixtures, file));
    for (const { component, bases = [], edges = [], cases: extraCases = [] } of groups) {
      const config = JSON.parse(
        fs.readFileSync(path.join(COMPONENTS_DIR, component, 'config.json'), 'utf8')
      );
      for (const [index, base] of bases.entries()) {
        await add(component, `base ${index}`, base);
        for (const [key, prop] of Object.entries(config.props)) {
          const values =
            prop.type === 'boolean'
              ? [false, true]
              : prop.type === 'select'
                ? prop.options
                : prop.type === 'string'
                  ? ['']
                  : prop.type === 'array'
                    ? [[]]
                    : prop.type === 'slot'
                      ? ['', false, true, 0, 'Content']
                      : [];
          for (const value of values ?? [])
            await add(component, `base ${index}, ${key}=${JSON.stringify(value)}`, {
              ...base,
              [key]: value,
            });
        }
      }
      for (const [index, props] of edges.entries())
        await add(component, `edge ${index}`, { ...bases[0], ...props });
      for (const { label, props, reactProps, safeProps } of extraCases)
        await add(component, label, props, reactProps, safeProps);
    }
  }
} finally {
  await runtime.close();
}
assert.ok(cases.length, 'No direct renderer parity cases found');
const djangoRoot = path.join(root, 'apps/storybook-django');
const result = spawnSync(
  process.env.USX_TEST_PYTHON || path.join(djangoRoot, 'venv/bin/python'),
  ['-c', djangoProgram],
  {
    cwd: djangoRoot,
    input: JSON.stringify(cases.map(({ component, props, safeProps }) => ({ component, props, safeProps }))),
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }
);
let rendered;
try {
  if (result.status !== 0)
    throw new Error(result.error?.message || result.stderr || 'Django renderer failed');
  rendered = JSON.parse(result.stdout);
  assert.equal(rendered.length, cases.length, 'Django returned an incomplete result');
} catch (error) {
  rendered = cases.map(() => ({ error: error.message }));
}
const results = new Map();
const normalize = (html) =>
  normalizeMarkup(html, { source: 'react', ignoreAttributes: new Set(), strict: true });
for (const [index, test] of cases.entries()) {
  const current = results.get(test.component) || { status: 'pass', caseCount: 0, failures: [] };
  results.set(test.component, current);
  current.caseCount++;
  const django = rendered[index];
  const error = test.reactError || django.error;
  const reactLines = test.reactError ? [] : normalize(test.react);
  const djangoLines = django.error ? [] : normalize(django.html);
  if (!error && JSON.stringify(reactLines) === JSON.stringify(djangoLines)) continue;
  current.status = error || current.status === 'error' ? 'error' : 'fail';
  let at = reactLines.findIndex((line, offset) => line !== djangoLines[offset]);
  if (at === -1) at = reactLines.length;
  current.failures.push({
    label: test.label,
    props: test.props,
    message: error
      ? `${test.reactError ? 'React' : 'Django'}: ${error}`
      : 'Rendered markup differs',
    react: reactLines.slice(Math.max(0, at - 2), at + 5),
    django: djangoLines.slice(Math.max(0, at - 2), at + 5),
  });
}
const store = parityStore();
for (const [component, result] of results) {
  store.write(component, { inputHash, recordedAt: new Date().toISOString(), result });
  for (const failure of result.failures)
    console.error(`${component}: ${failure.label}: ${failure.message}`);
}
// Failed renders are results too; publish the report before returning a failing exit code.
await writeReport(undefined);
const failures = [...results.values()].reduce((sum, result) => sum + result.failures.length, 0);
console.log(
  `${cases.length} direct parity cases across ${results.size} components: ${failures} failing. Snapshot report updated.`
);
process.exitCode = failures ? 1 : 0;
