import React from 'react';
import config from '../../../../usx-react/src/components/banner/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Banner.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Banner',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`banner.init()`')
      }
    }
  },
  decorators: [...componentInit('banner')]
};

const createStory = createDjangoStory({ componentName: 'banner' });

export const Default = createStory(storyDefs.Default);
export const Mil = { name: '.mil TLD', ...createStory(storyDefs.Mil) };
export const Custom = { name: 'Custom text and TLD', ...createStory(storyDefs.Custom) };
export const CustomFlag = createStory(storyDefs.CustomFlag);
