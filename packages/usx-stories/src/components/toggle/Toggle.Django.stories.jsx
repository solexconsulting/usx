import config from '../../../../core/src/components/toggle/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Toggle.React.stories.jsx';

export default {
  title: 'Django/USWDS-Inspired/Toggle',
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'toggle' });

export const Default = createStory(storyDefs.Default);
export const Icon = createStory(storyDefs.IconVariant);
export const TotallyDisabled = createStory(storyDefs.TotallyDisabled);
export const PartiallyDisabled = createStory(storyDefs.PartiallyDisabled);
