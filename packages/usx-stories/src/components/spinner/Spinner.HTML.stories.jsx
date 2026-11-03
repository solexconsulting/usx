import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/spinner/spinner.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/spinner/spinner.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Spinner.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Spinner',
  tags: ['USX', 'autodocs'],
};

const checkSpinner = (def) => async (spinner) => {
  await expect(spinner).toHaveClass('usx-spinner');
  await expect(spinner).toHaveAttribute('role', 'status');
  await expect(spinner).toHaveAttribute('aria-live', 'polite');

  const icon = spinner.querySelector('svg');
  await expect(icon.querySelector('use').getAttribute('href')).toMatch(/usx-sprite\.svg#spinner$/);
  await expect(icon.getAttribute('class')).toMatch(new RegExp(`icon--size-${def.size}\\b`));
  // Sizes step up 8px at a time; size 1 is a smaller half-step.
  if (def.size > 1) await expect(icon.getBoundingClientRect().width).toBe(def.size * 8);
  else await expect(icon.getBoundingClientRect().width).toBeLessThan(16);
  if (def.color) await expect(icon).toHaveClass(`text-${def.color}`);
  // The icon turns.
  await expect(getComputedStyle(icon).animationName).not.toBe('none');

  // The label is shown, or kept for screen readers only; with neither the spinner has no text.
  const label = spinner.querySelector('label');
  const text = def.label ?? def.screenReaderLabel;
  if (text) {
    await expect(label).toHaveTextContent(text);
    await expect(label.getBoundingClientRect().right < 0).toBe(Boolean(def.screenReaderLabel));
    await expect(spinner).toHaveTextContent(text);
  } else {
    await expect(label).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkSpinner(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Overviews', async () => {
    const spinners = (title) => [
      ...sectionFor(context.canvasElement, title).querySelectorAll('.usx-spinner'),
    ];
    for (const [title, color] of [
      ['Different Sizes', null],
      ['Different Sizes On Inverted Background', 'inverse'],
    ]) {
      const section = sectionFor(context.canvasElement, title);
      const items = spinners(title);
      await expect(items).toHaveLength(9);
      if (color) await expect(section).toHaveClass('bg-surface-inverse');
      for (const [index, spinner] of items.entries()) {
        await checkSpinner({ size: index + 1, color })(spinner);
      }
      const widths = items.map((spinner) => spinner.querySelector('svg').getBoundingClientRect().width);
      await expect(widths).toEqual([...widths].sort((a, b) => a - b));
    }
    for (const [title, tokens] of [
      ['Different Colors', ['primary', 'secondary', 'accent-cool', 'error', 'success']],
      ['Different Colors On Inverted Background', ['base', 'primary-light', 'secondary-light', 'accent-cool-light']],
    ]) {
      const items = spinners(title);
      await expect(items).toHaveLength(tokens.length);
      for (const [index, spinner] of items.entries()) {
        await checkSpinner({ size: 4, color: tokens[index] })(spinner);
      }
      const colors = items.map((spinner) => getComputedStyle(spinner.querySelector('svg')).color);
      await expect(new Set(colors).size).toBe(colors.length);
    }
  });
  await context.step('Tooltip composition', async () => {
    const wrapper = sectionFor(context.canvasElement, 'With Tooltip');
    const tooltip = wrapper.querySelector(':scope > .usx-tooltip');
    await expect(tooltip).not.toBeNull();
    await checkSpinner({ size: 4 })(tooltip.querySelector('.usx-spinner'));
    const body = tooltip.querySelector('.usa-tooltip__body');
    await expect(body).toHaveAttribute('role', 'tooltip');
    await expect(body).toHaveClass('usa-tooltip__body--right');
    await expect(body).toHaveTextContent('Loading...');
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
