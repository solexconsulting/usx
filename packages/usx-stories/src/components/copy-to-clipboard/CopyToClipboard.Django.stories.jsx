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
export const DarkBackground = {
  ...createStory(storyDefs.DarkBackground),
  render: (args) => (
    <div className="bg-base-darkest padding-2">
      {createStory(storyDefs.DarkBackground).render(args)}
    </div>
  )
};
export const DarkBackgroundWithText = {
  ...createStory(storyDefs.DarkBackgroundWithText),
  render: (args) => (
    <div className="bg-base-darkest padding-2">
      {createStory(storyDefs.DarkBackgroundWithText).render(args)}
    </div>
  )
};
