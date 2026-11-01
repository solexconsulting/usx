import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/file-input/file-input.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/file-input/file-input.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import * as reactStories from './FileInput.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle, snapshotId } from '../../utils/playHelpers.js';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`fileInput.init()`'),
      },
    },
  },
  decorators: [...componentInit('fileInput')],
};

const storyKeys = [
  'Default', 'AcceptSpecificTypes', 'AcceptImages', 'Multiple', 'WithError', 'Disabled',
  'PreloadedSingle', 'PreloadedMultiple', 'ManagedMultiple', 'PreloadedDownloadable',
  'PreloadedNotDownloadable', 'PreloadedDisabled', 'PreloadedNameOnly', 'LongFileName',
];

const checks = Object.fromEntries(storyKeys.map((key) => [sectionTitle(key), async (section) => {
  const def = reactStories[key].args;
  const managed = Boolean(def.multiple && def.manageIndividualFiles);
  await expect(section).toHaveClass('usa-form-group', 'usx-form-group');
  await expect(Boolean(section.classList.contains('usa-form-group--error'))).toBe(Boolean(def.error));
  const input = section.querySelector('input[type="file"]');
  await expect(input.getAttribute('id')).toMatch(snapshotId(def.id));
  await expect(input).toHaveAttribute('name', def.name ?? def.id);
  await expect(section.querySelector(`label[for="${input.id}"]`)).toHaveTextContent(def.label);
  await expect(Boolean(input.hasAttribute('multiple'))).toBe(Boolean(def.multiple));
  await expect(Boolean(input.hasAttribute('disabled'))).toBe(Boolean(def.disabled));
  await expect(Boolean(input.hasAttribute('required'))).toBe(Boolean(def.required));
  await expect(input.getAttribute('accept')).toBe(def.accept ?? null);
  await expect(input.getAttribute('data-errormessage')).toBe(def.invalidFileTypeMessage ?? null);
  const describedBy = [def.hint && `${input.id}-hint`, def.error && `${input.id}-error`].filter(Boolean);
  await expect(input.getAttribute('aria-describedby')).toBe(describedBy.join(' ') || null);
  if (def.hint) await expect(section.querySelector(`#${input.id}-hint`)).toHaveTextContent(def.hint);
  if (def.error) await expect(section.querySelector(`#${input.id}-error`)).toHaveTextContent(def.error);
  await expect(Boolean(section.querySelector('.usx-file-input__add-only'))).toBe(managed);
  await waitFor(() => expect(section.querySelector('.usa-file-input[data-enhanced="true"]')).not.toBeNull());

  const list = section.querySelector('.usx-file-input__list');
  const files = managed ? def.defaultFiles ?? [] : [];
  await expect(Boolean(list)).toBe(files.length > 0);
  if (list) {
    await expect(list.querySelector('.usx-file-input__list-heading')).toHaveTextContent(def.fileListHint ?? 'Selected files');
    await expect(list.querySelector('[aria-live="polite"]')).toHaveTextContent(files.at(-1).name);
    const rows = [...list.querySelectorAll('.usx-file-input__file-item')];
    await expect(rows).toHaveLength(files.length);
    for (const [index, row] of rows.entries()) {
      const file = files[index];
      const name = row.querySelector('.usx-file-input__file-name');
      await expect(name).toHaveTextContent(file.name);
      await expect(name.tagName).toBe(file.url ? 'A' : 'SPAN');
      if (file.url) await expect(name).toHaveAttribute('href', file.url);
      await expect(Boolean(row.querySelector('.usx-file-input__file-size'))).toBe(file.size != null);
      await expect(Boolean(row.querySelector('.usx-file-input__delete-button'))).toBe(!def.disabled);
    }
  }
}]));
const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('USWDS single-file preview', async () => {
    const section = sectionFor(context.canvasElement, 'Default');
    const input = section.querySelector('input[type="file"]');
    await userEvent.upload(input, new File(['sample'], 'example.txt', { type: 'text/plain' }));
    await waitFor(() => expect(section.querySelector('.usa-file-input__preview')).toHaveTextContent('example.txt'));
    await expect(input).toHaveAttribute('aria-label', 'Change file');
  });
  await context.step('USWDS multiple-file preview', async () => {
    const section = sectionFor(context.canvasElement, 'Multiple');
    const input = section.querySelector('input[type="file"]');
    await userEvent.upload(input, [
      new File(['first'], 'first.txt', { type: 'text/plain' }),
      new File(['second'], 'second.txt', { type: 'text/plain' }),
    ]);
    await waitFor(() => expect(section.querySelectorAll('.usa-file-input__preview')).toHaveLength(2));
  });
  await context.step('Managed add and delete', async () => {
    const section = sectionFor(context.canvasElement, 'Managed Multiple');
    const input = section.querySelector('input[type="file"]');
    const changes = [];
    section.addEventListener('usx:files-change', (event) => changes.push(event.detail.files));
    await userEvent.upload(input, new File(['sample'], 'added.txt', { type: 'text/plain' }));
    await waitFor(() => expect(section.querySelector('.usx-file-input__file-name')).toHaveTextContent('added.txt'));
    await expect(input.value).toBe('');
    await expect(changes.at(-1).map((file) => file.name)).toEqual(['added.txt']);
    await userEvent.click(section.querySelector('.usx-file-input__delete-button'));
    await waitFor(() => expect(section.querySelector('.usx-file-input__list')).toBeNull());
    await expect(changes.at(-1)).toHaveLength(0);
  });
  await context.step('Preloaded file delete', async () => {
    const section = sectionFor(context.canvasElement, 'Preloaded Downloadable');
    const rows = section.querySelectorAll('.usx-file-input__file-item');
    await expect(rows).toHaveLength(2);
    await userEvent.click(rows[0].querySelector('.usx-file-input__delete-button'));
    await expect(section.querySelectorAll('.usx-file-input__file-item')).toHaveLength(1);
    await expect(section.querySelector('.usx-file-input__file-name')).toHaveTextContent('pay-stub.pdf');
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  tags: ['USX'],
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
  tags: ['USX'],
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
