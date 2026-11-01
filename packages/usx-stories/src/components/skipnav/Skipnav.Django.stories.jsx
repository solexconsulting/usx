import config from '../../../../usx-react/src/components/skipnav/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, renderWithTarget } from './Skipnav.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Skipnav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'skipnav' });

const createTargetStory = (args, targetId) => {
  const story = createStory(args);
  return { ...story, render: (storyArgs) => renderWithTarget(story.render(storyArgs), targetId) };
};

export const Default = createTargetStory(storyDefs.Default, 'custom-target-1');
export const CustomContent = createTargetStory(storyDefs.CustomContent, 'custom-target-2');
export const WithChildren = createTargetStory(storyDefs.WithChildren, 'custom-target-3');
