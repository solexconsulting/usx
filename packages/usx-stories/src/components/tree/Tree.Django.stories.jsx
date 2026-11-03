import React from 'react';
import config from '../../../../usx-react/src/components/tree/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import ReactMeta, { storyDefs, examples, TreeExample } from './Tree.React.stories.jsx';

export default {
  title: 'Django/USX/Tree',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: {
    docs: {
      description: {
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

const djangoStory = createDjangoStory({ componentName: 'tree' });
const createStory = djangoStory;

export const Default = createStory(storyDefs.Default);

export const Padded = createStory(storyDefs.Padded);

export const EmptyBranch = createStory(storyDefs.EmptyBranch);

export const DetailsLeaf = createStory(storyDefs.DetailsLeaf);

export const NestedGroups = createStory(storyDefs.NestedGroups);

const createExampleStory = (example) => {
  const story = createStory(example.args);
  return {
    ...story,
    parameters: {
      docs: {
        ...story.parameters.docs,
        description: { story: example.description },
      },
    },
    render: (args) => <TreeExample {...example}>{story.render(args)}</TreeExample>,
  };
};

export const ResidentServices = createExampleStory(examples.ResidentServices);
export const ServiceDirectory = createExampleStory(examples.ServiceDirectory);
export const DocumentLibrary = createExampleStory(examples.DocumentLibrary);
export const ApplicationHelp = createExampleStory(examples.ApplicationHelp);
