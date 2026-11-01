import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/swap/swap.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/swap/swap.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './Swap.React.stories.jsx';
import { createAllVariantsPlay } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Swap',
  tags: ['USX', 'autodocs'],
};

// Story keys read "Default - Icon"; the section title drops the dash.
const titleOf = (key) => key.replace(/\s*-\s*/g, ' ');
const visible = (element) => {
  const { opacity, visibility, display } = getComputedStyle(element);
  return display !== 'none' && visibility !== 'hidden' && Number(opacity) > 0.5;
};

const checkSwap = (def) => async (swap) => {
  await expect(swap.tagName).toBe('LABEL');
  await expect(swap).toHaveClass('usx-swap');
  for (const variant of ['active', 'rotate', 'flip']) {
    await (variant === def.variant ? expect(swap) : expect(swap).not).toHaveClass(
      `usx-swap--${variant}`
    );
  }
  const input = swap.querySelector('input[type="checkbox"]');
  const on = swap.querySelector('.usx-swap-on');
  const off = swap.querySelector('.usx-swap-off');
  await expect(input !== null).toBe(def.includeInput !== false);
  await expect(on).toBeTruthy();
  await expect(off).toBeTruthy();
  if (typeof def.onContent === 'string') {
    await expect(on).toHaveTextContent(def.onContent);
    await expect(off).toHaveTextContent(def.offContent);
  } else if (def.onContent) {
    // Icon content: the two states show different icons or colours.
    await expect(on.innerHTML).not.toBe(off.innerHTML);
  }

  if (!input) {
    // The active variant has no input and should stay on.
    await waitFor(() => expect([visible(on), visible(off)]).toEqual([true, false]));
    return;
  }

  // Flip turns the content over rather than fading it, so its state shows in the transform.
  const flips = def.variant === 'flip';
  const turn = () => [on, off].map((element) => getComputedStyle(element).transform);
  const before = turn();
  if (!flips) await waitFor(() => expect([visible(on), visible(off)]).toEqual([false, true]));

  // Clicking flips the checkbox and which content shows, and clicking again flips it back.
  await userEvent.click(swap);
  await expect(input).toBeChecked();
  if (flips) await waitFor(() => expect(turn()).not.toEqual(before));
  else await waitFor(() => expect([visible(on), visible(off)]).toEqual([true, false]));
  await userEvent.click(swap);
  await expect(input).not.toBeChecked();
  if (flips) await waitFor(() => expect(turn()).toEqual(before));
  else await waitFor(() => expect([visible(on), visible(off)]).toEqual([false, true]));
};

const play = createAllVariantsPlay(
  Object.fromEntries(Object.entries(storyDefs).map(([key, def]) => [titleOf(key), checkSwap(def)]))
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
