import config from '../../../../usx-react/src/components/checkbox-group/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CheckboxGroup.React.stories.jsx';

export default {
  title: 'Django/USWDS-Inspired/CheckboxGroup',
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'checkbox-group' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const WithDescriptions = createStory(toDjangoArgs(storyDefs.WithDescriptions));
export const WithHint = createStory(toDjangoArgs(storyDefs.WithHint));
export const WithError = createStory(toDjangoArgs(storyDefs.WithError));
export const Tile = createStory(toDjangoArgs(storyDefs.Tile));
export const Small = createStory(toDjangoArgs(storyDefs.Small));
