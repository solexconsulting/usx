import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/combobox/combobox.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/combobox/combobox.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './Combobox.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle, snapshotId } from '../../utils/playHelpers.js';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/Combobox',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`combobox.init()`'),
      },
    },
  },
  decorators: [...componentInit('combobox')],
};

const checks = Object.fromEntries(Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), async (section) => {
  await expect(section).toHaveClass('usa-form-group', 'usx-form-group');
  await expect(Boolean(section.classList.contains('usa-form-group--error'))).toBe(Boolean(def.error));
  const box = section.querySelector('.usa-combo-box.usx-combo-box');
  await waitFor(() => expect(box).toHaveAttribute('data-enhanced', 'true'));
  await expect(Boolean(box.classList.contains('usx-combo-box--error'))).toBe(Boolean(def.error));
  await expect(box.getAttribute('data-default-value')).toBe(def.value ?? def.defaultValue ?? null);
  await expect(box.getAttribute('data-placeholder')).toBe(def.placeholder ?? null);
  const input = box.querySelector('input.usa-combo-box__input');
  const select = box.querySelector('select.usa-combo-box__select');
  const label = section.querySelector(`label[for="${input.id}"]`);
  await expect(input.id).toMatch(snapshotId(def.id));
  await expect(input).toHaveAttribute('role', 'combobox');
  await expect(input).toHaveAccessibleName(new RegExp(def.label));
  await expect(label).toHaveTextContent(def.label);
  await expect(select).toHaveAttribute('name', def.name);
  await expect(select).toHaveAttribute('aria-hidden', 'true');
  await expect(select.querySelectorAll('option')).toHaveLength(def.options.length);
  await expect(select.querySelector('option')).toHaveAttribute('value', def.options[0].value);
  await expect(select.querySelector('option:last-child')).toHaveTextContent(def.options.at(-1).label);
  await expect(select.value).toBe(def.value ?? def.defaultValue ?? '');
  await expect(Boolean(input.disabled)).toBe(Boolean(def.disabled));
  await expect(Boolean(input.required)).toBe(Boolean(def.required));
  await expect(input.getAttribute('placeholder')).toBe(def.placeholder ?? null);
  const descriptionIds = [def.hint && `${input.id}-hint`, def.error && `${input.id}-error`].filter(Boolean);
  await expect(select.getAttribute('aria-describedby')).toBe(descriptionIds.join(' ') || null);
  if (def.hint) await expect(section.querySelector(`#${input.id}-hint`)).toHaveTextContent(def.hint);
  if (def.error) await expect(section.querySelector(`#${input.id}-error`)).toHaveTextContent(def.error);
  const list = box.querySelector('[role="listbox"]');
  await expect(list).toHaveAttribute('id', `${input.id}--list`);
  await expect(list).toHaveAttribute('aria-labelledby', label.id);
  await expect(input).toHaveAttribute('aria-controls', list.id);
}]));

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('USWDS filter, select, and clear', async () => {
    const section = sectionFor(context.canvasElement, 'Default');
    const input = section.querySelector('.usa-combo-box__input');
    const select = section.querySelector('select');
    await userEvent.click(input);
    await userEvent.type(input, 'yuzu');
    await waitFor(() => expect(section.querySelectorAll('[role="option"]')).toHaveLength(1));
    await expect(section.querySelector('[role="option"]')).toHaveTextContent('Yuzu');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(section.querySelector('[role="option"]'));
    await expect(select.value).toBe('yuzu');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(section.querySelector('.usa-combo-box__clear-input'));
    await expect(select.value).toBe('');
    await expect(input.value).toBe('');
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
