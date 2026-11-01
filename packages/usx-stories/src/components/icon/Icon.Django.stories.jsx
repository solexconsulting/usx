import React from 'react';
import iconConfig from '../../../../usx-react/src/components/icon/config.json';
import {
  buildArgTypes,
  createDjangoStory,
  createBulkDjangoStory,
} from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Icon.React.stories.jsx';

const generatedArgTypes = buildArgTypes(iconConfig.props || {});

export default {
  title: 'Django/USWDS/Icon',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Looking for all available icons? Check out the [Icons Documentation](/docs/documentation-icons--docs&globals=technology:django) for a complete list.'
      }
    }
  },
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'icon' });

// Matches the React stories' row of icons.
const iconRow = ({ children }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>{children}</div>
);

export const Default = createStory(storyDefs.Default);
export const UsxSource = {
  ...createStory(storyDefs.UsxSource),
  name: 'USX Source',
};

export const DifferentSizes = createBulkDjangoStory(
  'icon',
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((size) => ({ props: { name: 'accessibility_new', size } })),
  iconRow
);

export const DifferentIcons = createBulkDjangoStory(
  'icon',
  [
    { props: { name: 'accessibility_new', size: 3 } },
    { props: { name: 'check_circle', size: 3 } },
    { props: { name: 'error', size: 3 } },
  ],
  iconRow
);

export const DifferentColors = createBulkDjangoStory(
  'icon',
  [
    { props: { name: 'accessibility_new', size: 3, color: 'primary' } },
    { props: { name: 'check_circle', size: 3, color: 'accent-warm-light' } },
    { props: { name: 'error', size: 3, color: 'accent-neutral-light' } },
  ],
  iconRow
);
