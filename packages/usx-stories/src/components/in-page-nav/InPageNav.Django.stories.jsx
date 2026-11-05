import React from 'react';
import config from '../../../../usx-react/src/components/in-page-nav/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './InPageNav.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  excludeStories: ['Unenhanced'],
  title: 'Django/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`')
      },
    }
  },
  decorators: [...componentInit('inPageNavigation')],
};

const createStory = createDjangoStory({ componentName: 'in-page-nav' });

export const Default = createStory(storyDefs.Default);
export const Unenhanced = { ...createStory(storyDefs.Unenhanced), parameters: { docs: { description: { story: 'The article headings and content remain available, but USWDS JavaScript does not generate the in-page link list.' } } } };
export const CustomHeadingElements = createStory(storyDefs.CustomHeadingElements);
export const CustomTitle = createStory(storyDefs.CustomTitle);
export const BelowMinimumHeadingCount = createStory(storyDefs.BelowMinimumHeadingCount);
export const CustomContentSelector = createStory(storyDefs.CustomContentSelector);
