import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/file-list/file-list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/file-list/file-list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './FileList.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/FileList',
  tags: ['USX', 'autodocs'],
};

const perFileOverride = [
  { key: 1, name: 'test1.jpg', size: 7000 },
  { key: 2, name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' },
];
const checks = Object.fromEntries(
  Object.entries({ ...storyDefs, PerFileOverride: { files: perFileOverride } }).map(([key, def]) => [
    sectionTitle(key),
    async (section) => {
      await expect(section).toHaveClass('usx-file-input__list', 'margin-top-1');
      await expect(section.querySelector('[aria-live="polite"]')).toHaveTextContent(`You have selected the file: ${def.files.at(-1).name}.`);
      await expect(section.querySelector('.usx-file-input__list-heading')).toHaveTextContent(def.hint ?? 'Selected files');
      const rows = [...section.querySelectorAll('.usx-file-input__file-list > li')];
      await expect(rows).toHaveLength(def.files.length);
      for (const [index, row] of rows.entries()) {
        const file = def.files[index];
        const name = row.querySelector('.usx-file-input__file-name');
        await expect(name).toHaveTextContent(file.name);
        await expect(name.tagName).toBe(file.url ? 'A' : 'SPAN');
        if (file.url) {
          await expect(name).toHaveAttribute('href', file.url);
          await expect(name).toHaveAttribute('target', '_blank');
        }
        await expect(Boolean(row.querySelector('.usx-file-input__file-size'))).toBe(file.size != null);
        if (key === 'ZeroSize') await expect(row.querySelector('.usx-file-input__file-size')).toHaveTextContent('TXT, 0 B');
        const deleteButton = row.querySelector('.usx-file-input__delete-button');
        await expect(Boolean(deleteButton)).toBe(!def.disabled && def.onRemove !== null);
        if (deleteButton) {
          await expect(deleteButton).toHaveAccessibleName('Delete');
          await expect(deleteButton).toHaveAttribute('tooltip', 'Delete this file');
          await expect(deleteButton.querySelector('use').getAttribute('href')).toMatch(/#delete$/);
        }
      }
    },
  ]),
);
const play = createAllVariantsPlay(checks);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
