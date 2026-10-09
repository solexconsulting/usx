import React from 'react';
import config from '../../../../usx-react/src/components/callout/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Callout.React.stories.jsx';

export default {
  title: 'Django/USX/Callout',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [(Story) => <div className="padding-3"><Story /></div>],
};

const createStory = createDjangoStory({ componentName: 'callout' });

export const Default = createStory(storyDefs.Default);
export const ThinHorizontal = createStory(storyDefs.ThinHorizontal);
export const Vertical = createStory(storyDefs.Vertical);
export const BigVertical = createStory(storyDefs.BigVertical);
export const Colors = createStory(storyDefs.Colors);
export const IndentSM = createStory(storyDefs.IndentSM);
export const IndentMD = createStory(storyDefs.IndentMD);
export const IndentLG = createStory(storyDefs.IndentLG);
export const IndentXL = createStory(storyDefs.IndentXL);
export const Dedent = createStory(storyDefs.Dedent);
export const Section = createStory(storyDefs.Section);
export const Aside = createStory(storyDefs.Aside);
export const Blockquote = createStory(storyDefs.Blockquote);
export const ChildrenOverride = createStory(storyDefs.ChildrenOverride);
export const EmptyChildren = createStory(storyDefs.EmptyChildren);
