import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/copy-to-clipboard/copy-to-clipboard.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/copy-to-clipboard/copy-to-clipboard.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './CopyToClipboard.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/CopyToClipboard',
  tags: ['USX', 'autodocs'],
};

const checkCopy = (def) => async (section) => {
  const button = section.matches('button') ? section : section.querySelector('button.usx-copy');
  await expect(button).toHaveClass('usa-button', 'usx-button', 'usx-button--ghost');
  await expect(button).toHaveAttribute('type', 'button');
  if (def.className) await expect(button).toHaveClass(...def.className.split(' '));
  await expect(button.querySelector('.usx-copy__copy use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#content_copy$/)
  );
  await expect(button.querySelector('.usx-copy__check use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#check$/)
  );

  // Resting state shows the copy icon; the check icon appears only once something has been copied.
  await expect(button.querySelector('.usx-copy__copy')).toBeVisible();
  await expect(button.querySelector('.usx-copy__check')).not.toBeVisible();

  if (def.label) {
    await expect(button).toHaveAccessibleName(def.label);
    await expect(section.querySelector('[role="tooltip"]')).toBeNull();
  } else {
    // An icon-only button is described by its tooltip; the text swaps once copied.
    const tooltip =
      section.querySelector('[role="tooltip"]') ??
      section.parentElement.querySelector('[role="tooltip"]');
    await expect(tooltip.querySelector('.usx-copy__tooltip--copy')).toHaveTextContent(
      def.tooltipProps.label
    );
    await expect(tooltip.querySelector('.usx-copy__tooltip--copied')).toHaveTextContent(
      def.tooltipProps.copiedTooltip
    );
    await expect(tooltip).not.toBeVisible();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (section) => {
      await checkCopy(def)(section);
      // Inverted variants sit on an inverse surface.
      if (def.className?.includes('inverse'))
        await expect(section).toHaveClass('bg-surface-inverse');
    },
  ])
);

const play = createAllVariantsPlay(checks);

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
