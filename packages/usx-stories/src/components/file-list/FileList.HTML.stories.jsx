import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/file-list/file-list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/file-list/file-list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './FileList.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

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
      if (def.slim) await expect(section).toHaveClass('usx-file-list--slim');
      else await expect(section).not.toHaveClass('usx-file-list--slim');
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
const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Slim keeps the list layout and width', async () => {
    const regular = sectionFor(context.canvasElement, 'Default');
    const slim = sectionFor(context.canvasElement, 'Slim');
    const regularList = regular.querySelector('.usx-file-input__file-list');
    const slimList = slim.querySelector('.usx-file-input__file-list');
    const regularRow = regularList.querySelector('.usx-file-input__file-item');
    const slimRow = slimList.querySelector('.usx-file-input__file-item');
    const regularButton = regularRow.querySelector('.usx-file-input__delete-button');
    const slimButton = slimRow.querySelector('.usx-file-input__delete-button');
    const px = (node, property) => parseFloat(getComputedStyle(node)[property]);

    await expect(getComputedStyle(slimList).maxWidth).toBe(getComputedStyle(regularList).maxWidth);
    await expect(slimList.getBoundingClientRect().width).toBe(regularList.getBoundingClientRect().width);
    await expect(getComputedStyle(slimRow).display).toBe(getComputedStyle(regularRow).display);
    await expect(getComputedStyle(slimRow.querySelector('.usx-file-input__file-info')).display).toBe('block');
    await expect(getComputedStyle(slimRow.querySelector('.usx-file-input__file-name')).display).toBe('inline');
    await expect(getComputedStyle(slimRow.querySelector('.usx-file-input__file-name')).whiteSpace).not.toBe('nowrap');
    const shortRow = slimList.querySelectorAll('.usx-file-input__file-item')[1];
    const shortName = shortRow.querySelector('.usx-file-input__file-name');
    const shortSize = shortRow.querySelector('.usx-file-input__file-size');
    await expect(Math.abs(shortName.getBoundingClientRect().top - shortSize.getBoundingClientRect().top)).toBeLessThan(2);
    await expect(regularRow.querySelector('.usx-file-input__file-size').getBoundingClientRect().top).toBeGreaterThan(
      regularRow.querySelector('.usx-file-input__file-name').getBoundingClientRect().top
    );
    await expect(px(slimRow, 'paddingTop')).toBeLessThan(px(regularRow, 'paddingTop'));
    await expect(px(slimRow, 'fontSize')).toBeLessThan(px(regularRow, 'fontSize'));
    await expect(px(slimRow.querySelector('.usx-file-input__file-name'), 'fontSize')).toBeLessThan(
      px(regularRow.querySelector('.usx-file-input__file-name'), 'fontSize')
    );
    await expect(px(slimRow.querySelector('.usx-file-input__file-size'), 'fontSize')).toBeLessThan(
      px(regularRow.querySelector('.usx-file-input__file-size'), 'fontSize')
    );
    await expect(px(slimButton, 'paddingTop')).toBeLessThan(px(regularButton, 'paddingTop'));
    await expect(px(slimButton, 'fontSize')).toBeLessThan(px(regularButton, 'fontSize'));
    await expect(px(slimButton.querySelector('.usx-file-input__delete-icon'), 'width')).toBeLessThan(
      px(regularButton.querySelector('.usx-file-input__delete-icon'), 'width')
    );
  });
};

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
