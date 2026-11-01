import React from 'react';
import config from '../../../../usx-react/src/components/summary/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Summary.React.stories.jsx';

export default {
  title: 'Django/USX/Summary',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const createStory = createDjangoStory({componentName: 'summary'});

export const Default = createStory(storyDefs.Default);
export const ButtonClasses = createStory(storyDefs.ButtonClasses);
export const Colors = createStory(storyDefs.Colors);
export const MinimalDecoration = createStory(storyDefs.MinimalDecoration);
export const CustomClasses = createStory(storyDefs.CustomClasses);
export const Wrapping = createDjangoStory({
  componentName: 'summary',
  wrapper: (summary, _args, { mode }) =>
    mode === 'source' ? (
      `<details style="width:12rem">${summary}<p>Your reference number is also on your letter.</p></details>`
    ) : (
      <details
        style={{ width: '12rem' }}
        dangerouslySetInnerHTML={{
          __html: `${summary}<p>Your reference number is also on your letter.</p>`,
        }}
      />
    ),
})(storyDefs.Wrapping);
