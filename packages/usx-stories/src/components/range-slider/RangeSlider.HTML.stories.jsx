import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/range-slider/range-slider.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/range-slider/range-slider.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, fireEvent, waitFor } from 'storybook/test';
import { storyDefs } from './RangeSlider.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`range.init()`'),
      },
    },
  },
  decorators: [...componentInit('range')],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const sliderOf = (group) => group.querySelector('input[type="range"]');
const spoken = (def, value) =>
  `${value}${def.textUnit ? ` ${def.textUnit}` : ''} ${def.textPreposition ?? 'of'} ${def.max}`;

const checkSlider = (def) => async (group) => {
  await expect(group).toHaveClass('usa-form-group', 'usx-form-group');
  await waitFor(() => expect(sliderOf(group)).toHaveAttribute('data-enhanced', 'true'));
  const slider = sliderOf(group);
  await expect(slider).toHaveClass('usa-range', 'usx-range-slider');
  await expect(slider.id).toMatch(snapshotId(def.id));
  await expect(slider).toHaveAccessibleName(def.label);
  for (const attribute of ['min', 'max', 'step'])
    await expect(slider).toHaveAttribute(attribute, String(def[attribute]));
  await expect(slider.value).toBe(String(def.defaultValue));
  await (def.disabled ? expect(slider) : expect(slider).not).toBeDisabled();


  // The script keeps a spoken value and a visible value up to date.
  await expect(slider).toHaveAttribute('aria-valuetext', spoken(def, def.defaultValue));
  await expect(group.querySelector('.usa-range__value')).toHaveTextContent(
    String(def.defaultValue)
  );

  const hint = group.querySelector('.usa-hint');
  if (def.hint) {
    await expect(hint).toHaveTextContent(def.hint);
    await expect(slider.getAttribute('aria-describedby').split(' ')).toContain(hint.id);
  } else {
    await expect(hint).toBeNull();
  }
  await hasClass(group, 'usa-form-group--error', Boolean(def.error));
  if (def.error)
    await expect(group.querySelector('.usa-error-message')).toHaveTextContent(def.error);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkSlider(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Moving the slider', async () => {
    const def = storyDefs.Default;
    const group = sectionFor(context.canvasElement, 'Default');
    const slider = sliderOf(group);
    // Moving to any value updates both the spoken and the visible value.
    for (const value of [def.defaultValue + def.step, def.min, def.max]) {
      fireEvent.change(slider, { target: { value: String(value) } });
      await waitFor(() => expect(slider).toHaveAttribute('aria-valuetext', spoken(def, value)));
      await expect(group.querySelector('.usa-range__value')).toHaveTextContent(String(value));
    }
    // A disabled slider cannot take focus.
    const disabled = sliderOf(sectionFor(context.canvasElement, 'Disabled'));
    disabled.focus();
    await expect(disabled).not.toHaveFocus();
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
