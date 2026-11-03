import config from '../../../../usx-react/src/components/clickable/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import * as ReactStories from './Clickable.React.stories.jsx';

export const storyDefs = ReactStories.storyDefs;

export default {
  title: 'Django/USX/Clickable',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const composedStory = (reactStory, args) =>
  createDjangoStory({ componentName: 'clickable', renderTree: reactStory.render })(args);

export const Default = composedStory(ReactStories.Default, storyDefs.Default);
export const MultipleClickables = composedStory(
  ReactStories.MultipleClickables, storyDefs.MultipleClickableCard
);
export const WithColorChange = composedStory(ReactStories.WithColorChange, storyDefs.WithColorChange);
export const ReadJohnsStoryCta = {
  ...composedStory(ReactStories.ReadJohnsStoryCta, storyDefs.ReadJohnsStoryCta),
  name: "Read John's Story CTA",
};
export const ClickableQuote = composedStory(ReactStories.ClickableQuote, storyDefs.ClickableQuote);
export const ClickableQuoteManualMarkup = {
  ...composedStory(ReactStories.ClickableQuoteManualMarkup, storyDefs.ClickableQuote),
  name: 'Clickable Quote v2 (Manual Markup)',
};
export const AllClassesSingleElement = composedStory(
  ReactStories.AllClassesSingleElement, storyDefs.AllClassesSingleElement
);
export const ColorClassesWithinLinkClass = composedStory(
  ReactStories.ColorClassesWithinLinkClass, storyDefs.ColorClassesWithinLinkClass
);
export const ColorClassesOutsideLinkClass = composedStory(
  ReactStories.ColorClassesOutsideLinkClass, storyDefs.ColorClassesOutsideLinkClass
);
export const ButtonSurface = composedStory(ReactStories.ButtonSurface, storyDefs.ButtonSurface);
