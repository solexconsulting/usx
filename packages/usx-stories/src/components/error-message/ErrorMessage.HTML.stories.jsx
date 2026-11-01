import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/error-message/error-message.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/error-message/error-message.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './ErrorMessage.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/ErrorMessage',
  tags: ['USWDS', 'autodocs'],
};

const checkMessage = (def) => async (message) => {
  await expect(message).toHaveClass('usa-error-message', 'usx-error-message');
  if (def.className) await expect(message).toHaveClass(...def.className.split(' '));
  await expect(message.id).toMatch(snapshotId(def.id));
  await expect(message).toHaveAttribute('role', 'alert');
  await expect(message).toHaveTextContent(def.children);
  await expect(message).toBeVisible();
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkMessage(def)])
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
