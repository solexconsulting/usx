import React from 'react';
import { storyDefs } from './Eyebrow.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/Eyebrow',
  tags: ['autodocs'],
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django Eyebrow component - consumes React storyDefs',
      },
    },
  },
};

export const InH1 = createDjangoStory('eyebrow', null, (component) => (
    <>
      <h1>
        {component}
        Heading
      </h1>
    </>
))(storyDefs.InH1);

export const InH2 = createDjangoStory('eyebrow', null, (component) => (
    <h2>
      {component}
      Full Section Heading
    </h2>
))(storyDefs.InH2);

export const InH3 = createDjangoStory('eyebrow', null, (component) => (
    <h3>
      {component}
      Full Subsection
    </h3>
))(storyDefs.InH3);
