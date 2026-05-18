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

export const InH1 = createDjangoStory({
  componentName: 'eyebrow',
  wrapper: (payload, _args, { mode }) => {
  if (mode === 'source') {
    return `<h1>${payload}Heading</h1>`;
  }

  return <h1 dangerouslySetInnerHTML={{ __html: `${payload}Heading` }} />;
  }
})(storyDefs.InH1);

export const InH2 = createDjangoStory({
  componentName: 'eyebrow',
  wrapper: (payload, _args, { mode }) => {
  if (mode === 'source') {
    return `<h2>${payload}Full Section Heading</h2>`;
  }

  return <h2 dangerouslySetInnerHTML={{ __html: `${payload}Full Section Heading` }} />;
  }
})(storyDefs.InH2);

export const InH3 = createDjangoStory({
  componentName: 'eyebrow',
  wrapper: (payload, _args, { mode }) => {
  if (mode === 'source') {
    return `<h3>${payload}Full Subsection</h3>`;
  }

  return <h3 dangerouslySetInnerHTML={{ __html: `${payload}Full Subsection` }} />;
  }
})(storyDefs.InH3);
