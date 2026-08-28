import config from '../../../../core/src/components/pagination/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Pagination.React.stories.jsx';

export default {
  title: 'Django/USWDS/Pagination',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'pagination' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const Unbounded = createStory(toDjangoArgs(storyDefs.Unbounded));
export const NoStepOptions = createStory(toDjangoArgs(storyDefs.NoStepOptions));
export const NavigationOnly = createStory(toDjangoArgs(storyDefs.NavigationOnly));
export const SpanishLocale = createStory(toDjangoArgs(storyDefs.SpanishLocale));
export const FewPages = createStory(toDjangoArgs(storyDefs.FewPages));
export const FirstPage = createStory(toDjangoArgs(storyDefs.FirstPage));
export const LastPage = createStory(toDjangoArgs(storyDefs.LastPage));
export const ArrowsOnly = createStory(toDjangoArgs(storyDefs.ArrowsOnly));
export const ArrowsOnlyNoExtras = createStory(toDjangoArgs(storyDefs.ArrowsOnlyNoExtras));
export const IconOnlyArrows = createStory(toDjangoArgs(storyDefs.IconOnlyArrows));
export const WithSummaryAndStepOptions = createStory(toDjangoArgs(storyDefs.WithSummaryAndStepOptions));
