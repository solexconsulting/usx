import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-history/ChatHistory';
import config from '../../../../../../usx-react/src/components/chat-history/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  Default: { hasMore: true },
  Loading: { hasMore: true, loading: true },
  Error: { hasMore: true, error: 'Try loading again.' },
  Beginning: { hasMore: false },
};
export default {
  title: 'React/USX/Chat/History',
  decorators: componentInit('popover', 'chat'),
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};
export const Default = partStory(Component, 'chat-history', storyDefs.Default, {
  exampleId: 'history-default',
});
export const Loading = partStory(Component, 'chat-history', storyDefs.Loading, {
  exampleId: 'history-loading',
});
export const Error = partStory(Component, 'chat-history', storyDefs.Error, {
  exampleId: 'history-error',
});
export const Beginning = partStory(Component, 'chat-history', storyDefs.Beginning, {
  exampleId: 'history-beginning',
});
