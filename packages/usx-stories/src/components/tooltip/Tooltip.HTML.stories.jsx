import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/tooltip/tooltip.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/tooltip/tooltip.django-snapshot.html?raw';
import { expect, waitFor } from 'storybook/test';
import { storyDefs } from './Tooltip.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS-Inspired/Tooltip (CSS-only)',
  tags: ['USWDS-Inspired', 'autodocs'],
};

const shown = (element) => {
  const { opacity, visibility, display } = getComputedStyle(element);
  return display !== 'none' && visibility !== 'hidden' && Number(opacity) > 0.5;
};

const checkTooltip = (def) => async (wrapper) => {
  await expect(wrapper).toHaveClass('usx-tooltip');
  const trigger = wrapper.firstElementChild;
  const body = wrapper.querySelector('.usa-tooltip__body');
  await expect(body).toHaveAttribute('role', 'tooltip');
  await expect(body).toHaveClass(`usa-tooltip__body--${def.position}`);
  await expect(body).toHaveTextContent(def.label);

  // The tip stays hidden until its trigger takes focus, and goes again when focus leaves.
  await expect(shown(body)).toBe(false);
  trigger.focus();
  await waitFor(() => expect(shown(body)).toBe(true));

  // It appears on the requested side of the trigger.
  const [tip, anchor] = [body, trigger].map((element) => element.getBoundingClientRect());
  const placed = {
    top: tip.bottom <= anchor.top + 1,
    bottom: tip.top >= anchor.bottom - 1,
    left: tip.right <= anchor.left + 1,
    right: tip.left >= anchor.right - 1,
  };
  await expect(placed[def.position]).toBe(true);

  trigger.blur();
  await waitFor(() => expect(shown(body)).toBe(false));
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkTooltip(def)])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
