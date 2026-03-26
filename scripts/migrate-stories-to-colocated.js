#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STORIES_DIR = path.join(ROOT, 'packages', 'core', 'src', 'stories');
const COMPONENTS_DIR = path.join(ROOT, 'packages', 'core', 'src', 'components');
const BACKUP_DIR = path.join(STORIES_DIR, 'backup-migrated');

function pascalToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function readDirFiles(dir) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {
    return [];
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(BACKUP_DIR);

const files = readDirFiles(STORIES_DIR).filter(f => f.endsWith('.stories.jsx'));
const groups = {};

files.forEach(f => {
  const m = f.match(/^(.+)\.(React|HTML|Django)\.stories\.jsx$/);
  if (!m) return;
  const base = m[1];
  const kind = m[2];
  groups[base] = groups[base] || {};
  groups[base][kind] = path.join(STORIES_DIR, f);
});

const summary = [];

Object.keys(groups).forEach(base => {
  const group = groups[base];
  const pascal = base;
  const kebab = pascalToKebab(pascal);
  const componentDir = path.join(COMPONENTS_DIR, kebab);
  const targetFile = path.join(componentDir, `${pascal}.stories.jsx`);

  ensureDir(componentDir);

  // Back up originals
  Object.values(group).forEach(orig => {
    const dest = path.join(BACKUP_DIR, path.basename(orig));
    try {
      fs.copyFileSync(orig, dest);
    } catch (err) {
      // ignore
    }
  });

  // Build combined story content
  const content = `import React from 'react';
import Component from './${pascal}.jsx';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../stories/helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: '${pascal}',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const ReactView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: '${kebab}', props: config.default || {} })
      }
    }
  },
  render: (args) => React.createElement(Component, args)
};

export const HTMLView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: '${kebab}', props: config.default || {} })
      }
    }
  },
  render: () => componentTag({ name: '${kebab}', props: config.default || {} })
};

export const DjangoView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: '${kebab}', props: config.default || {} })
      }
    }
  },
  render: djangoComponent('${kebab}')
};
`;

  fs.writeFileSync(targetFile, content, 'utf8');

  // Remove originals (leave backups)
  Object.values(group).forEach(orig => {
    try { fs.unlinkSync(orig); } catch (err) {}
  });

  summary.push({ component: pascal, kebab, created: targetFile, backedUp: Object.keys(group) });
});

console.log('Migration complete. Summary:');
summary.forEach(s => console.log(`- ${s.component} -> ${s.kebab}: wrote ${path.relative(ROOT, s.created)} (backed up originals)`));
console.log('\nBacked up original story files to', path.relative(ROOT, BACKUP_DIR));

if (summary.length === 0) {
  console.log('No story groups found to migrate.');
}

process.exit(0);
