import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/skipnav/skipnav.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/skipnav/skipnav.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './Skipnav.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Skipnav',
  tags: ['USWDS', 'autodocs'],
};

const checkSkipnav = (def) => async (link) => {
  await expect(link.tagName).toBe('A');
  await expect(link).toHaveClass('usa-skipnav');

  // The link points at an element that exists, whatever form the target prop took.
  const id = link.getAttribute('href').slice(1);
  await expect(id).toMatch(snapshotId(def.target.replace(/^#/, '')));
  const target = link.ownerDocument.getElementById(id);
  await expect(target).toBeTruthy();

  if (def.content || def.children)
    await expect(link.querySelector('strong')).toHaveTextContent('main content');
  else await expect(link).toHaveTextContent('Skip to main content');

  // Hidden until focused from the keyboard, then shown on screen.
  await expect(link.getBoundingClientRect().bottom).toBeLessThanOrEqual(0);
  await userEvent.tab();
  const first = link.ownerDocument.activeElement;
  link.focus();
  await expect(link).toHaveFocus();
  await waitFor(() => expect(link.getBoundingClientRect().top).toBeGreaterThanOrEqual(0));
  first.blur?.();
  link.blur();
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkSkipnav(def)])
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
