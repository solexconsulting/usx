import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/switch/switch.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/switch/switch.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './Switch.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Switch',
  tags: ['USX', 'autodocs'],
  // Add indeterminate to checkbox on mount for demo purposes
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.querySelectorAll('[id$="indeterminate-switch"]').forEach((checkbox) => {
          checkbox.indeterminate = true;
        });
      }, []);
      return <Story />;
    },
  ],
};

const inputOf = (section) => (section.matches('input') ? section : section.querySelector('input'));
// Story export key to section title, where the sizes are spelled in capitals.
const titleOf = (key) => (['XS', 'SM', 'MD', 'LG', 'XL'].includes(key) ? key : sectionTitle(key));

const checkSwitch = (def) => async (section) => {
  const input = inputOf(section);
  await expect(input).toHaveAttribute('type', 'checkbox');
  await expect(input.id).toMatch(snapshotId(def.id));
  await expect(input).toHaveClass('usx-switch', `usx-toggle-${def.size ?? 'md'}`);
  if (def.variant) await expect(input).toHaveClass(`text-${def.variant}`);
  await (def.defaultChecked ? expect(input) : expect(input).not).toBeChecked();
  await (def.disabled ? expect(input) : expect(input).not).toBeDisabled();

  // With a label, the switch sits inside it so the text toggles it too.
  if (def.label) {
    await expect(section.tagName).toBe('LABEL');
    await expect(section).toHaveClass('usa-label', 'usx-switch__label');
    await expect(input).toHaveAccessibleName(def.label);
  } else {
    await expect(section).toBe(input);
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [titleOf(key), checkSwitch(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Toggling', async () => {
    for (const [key, def] of Object.entries(storyDefs)) {
      const section = sectionFor(context.canvasElement, titleOf(key));
      const input = inputOf(section);
      const before = input.checked;
      await userEvent.click(def.label ? section : input);
      await expect(input.checked).toBe(def.disabled ? before : !before);
      if (!def.disabled) {
        input.focus();
        await userEvent.keyboard(' ');
        await expect(input.checked).toBe(before);
      }
    }
  });
  await context.step('Sizes grow', async () => {
    const width = (key) =>
      inputOf(sectionFor(context.canvasElement, key)).getBoundingClientRect().width;
    const widths = ['XS', 'SM', 'MD', 'LG', 'XL'].map(width);
    for (let i = 1; i < widths.length; i++) await expect(widths[i]).toBeGreaterThan(widths[i - 1]);
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
