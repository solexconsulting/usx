import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/checkbox-group/checkbox-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/checkbox-group/checkbox-group.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './CheckboxGroup.React.stories.jsx';
import { checkCheckbox, checkToggle } from '../checkbox/checkCheckbox.js';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS-Inspired/CheckboxGroup',
  tags: ['USWDS-Inspired', 'autodocs'],
};

const checkGroup = (def) => async (formGroup) => {
  await expect(formGroup).toHaveClass('usa-form-group', 'usx-form-group');
  const fieldset = formGroup.querySelector('fieldset.usa-checkbox-group');
  await expect(fieldset.id).toMatch(snapshotId(def.id));
  await expect(fieldset).toHaveAccessibleName(def.legend);
  await expect(fieldset.querySelector('legend')).toHaveTextContent(def.legend);

  // The group owns the form group, hint and error; the checkboxes inside render without their own.
  await expect(formGroup.querySelectorAll('.usa-form-group')).toHaveLength(0);
  const message = fieldset.querySelector('.usa-error-message');
  if (def.error) {
    await expect(formGroup).toHaveClass('usa-form-group--error');
    await expect(fieldset.querySelector('legend')).toHaveClass('usa-label--error');
    await expect(message).toHaveAttribute('role', 'alert');
    await expect(message).toHaveTextContent(def.error);
  } else {
    await expect(formGroup).not.toHaveClass('usa-form-group--error');
    await expect(message).toBeNull();
  }
  if (def.hint) await expect(fieldset.querySelector('.usa-hint')).toHaveTextContent(def.hint);

  const boxes = [...fieldset.querySelectorAll('.usa-checkbox')];
  await expect(boxes).toHaveLength(def.checkboxProps.length);
  for (const [index, option] of def.checkboxProps.entries()) {
    await checkCheckbox(boxes[index], option, {
      id: `${def.id}-${index}`,
      name: def.name,
      tile: def.tile,
      small: def.small,
    });
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkGroup(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Toggling', async () => {
    const group = sectionFor(context.canvasElement, 'Default');
    for (const [index, box] of [...group.querySelectorAll('.usa-checkbox')].entries()) {
      await checkToggle(box, Boolean(storyDefs.Default.checkboxProps[index].disabled));
    }
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
