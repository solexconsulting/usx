import React from 'react';
import config from '../../../../usx-react/src/components/quote/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Quote.React.stories.jsx';

export default {
  title: 'Django/USX/Quote',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [(Story) => <div className="padding-3"><Story /></div>],
};

const createStory = createDjangoStory({ componentName: 'quote' });

export const Default = createStory(storyDefs.Default);
export const WithAttribution = createStory(storyDefs.WithAttribution);
export const WithAvatar = createStory(storyDefs.WithAvatar);
export const Vertical = createStory(storyDefs.Vertical);
export const WithCalloutProps = createStory(storyDefs.WithCalloutProps);
export const Typography = createStory(storyDefs.Typography);
export const WithSource = createStory(storyDefs.WithSource);
export const WithAvatarAndSource = createStory(storyDefs.WithAvatarAndSource);
export const SourceTitleOnly = createStory(storyDefs.SourceTitleOnly);
export const SourceLinkOnly = createStory(storyDefs.SourceLinkOnly);
export const ChildrenOverride = createStory(storyDefs.ChildrenOverride);
export const EmptyChildren = createStory(storyDefs.EmptyChildren);
export const CustomAttribution = createStory(storyDefs.CustomAttribution);
