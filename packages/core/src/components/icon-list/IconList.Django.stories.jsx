import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './IconList.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/IconList',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = createDjangoStory({ componentName: 'icon-list' });

export const Default = createStory(storyDefs.Default);
export const SimpleContent = createStory(storyDefs.SimpleContent);
export const RichContent = createStory(storyDefs.RichContent);
export const CustomSizeWithRichContent = createStory(storyDefs.CustomSizeWithRichContent);
export const CustomSize = createStory(storyDefs.CustomSize);
