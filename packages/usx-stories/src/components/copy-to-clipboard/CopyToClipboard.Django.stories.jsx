import React from 'react';
import config from '../../../../usx-react/src/components/copy-to-clipboard/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CopyToClipboard.React.stories.jsx';

export default {
  title: 'Django/USX/CopyToClipboard',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'copy-to-clipboard' });

export const Default = createStory(storyDefs.Default);
export const WithText = createStory(storyDefs.WithText);
const createInvertedStory = (args) => {
  const story = createStory(args);
  return {
    ...story,
    render: (storyArgs) => <div className="bg-surface-inverse padding-2">{story.render(storyArgs)}</div>,
  };
};

export const InvertedBackground = createInvertedStory(storyDefs.InvertedBackground);
export const InvertedBackgroundWithText = createInvertedStory(storyDefs.InvertedBackgroundWithText);
