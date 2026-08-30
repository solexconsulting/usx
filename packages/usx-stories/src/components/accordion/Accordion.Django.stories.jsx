// import React from 'react';
import config from '../../../../core/src/components/accordion/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Accordion.React.stories.jsx';

export default {
  title: 'Django/USWDS/Accordion',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'accordion' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const Bordered = createStory(toDjangoArgs(storyDefs.Bordered));
export const MultiSelectable = createStory(toDjangoArgs(storyDefs.MultiSelectable));
export const CustomHeadingLevel = createStory(toDjangoArgs(storyDefs.CustomHeadingLevel));
export const BorderedMultiSelectableH4 = createStory(toDjangoArgs(storyDefs.BorderedMultiSelectableH4));
export const IconStart = createStory(toDjangoArgs(storyDefs.IconStart));
export const IconEnd = createStory(toDjangoArgs(storyDefs.IconEnd));
