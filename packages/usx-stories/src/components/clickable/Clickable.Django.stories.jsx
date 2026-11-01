import config from '../../../../usx-react/src/components/clickable/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import singleSource from './story-single.html?raw';
import multipleSource from './story-multiple.html?raw';
import colorSource from './story-color.html?raw';
import readJohnsSource from './story-read-johns.html?raw';
import quoteSource from './story-quote.html?raw';
import quoteManualSource from './story-quote-manual.html?raw';
import allClassesSource from './story-all-classes.html?raw';
import withinLinkSource from './story-within-link.html?raw';
import outsideLinkSource from './story-outside-link.html?raw';
import buttonSource from './story-button.html?raw';

export const storyDefs = {
  SingleClickable: {
    href: 'https://google.com',
    className: 'display-flex flex-column padding-2 border',
  },
  MultipleClickableCard: {
    href: 'https://google.com',
    className: 'padding-1 display-flex flex-column flex-align-center',
  },
  WithColorChange: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
  },
  ReadJohnsStoryCta: {
    href: 'https://google.com',
    className: 'display-flex flex-row flex-align-center margin-1 usx-width-fit',
  },
  ClickableQuote: {
    href: 'https://google.com',
    className: 'display-block maxw-tablet',
  },
  AllClassesSingleElement: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ColorClassesWithinLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ColorClassesOutsideLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ButtonSurface: {
    className: 'usa-button usx-button usx-button--ghost',
  },
};

export default {
  title: 'Django/USX/Clickable',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const createStory = createDjangoStory({ componentName: 'clickable' });

/** The Django server renders the same template that Storybook shows as this story's source. */
const composedStory = (example, args, source) => ({
  args,
  parameters: { docs: { source: { code: source } } },
  render: (storyArgs) => {
    const props = { ...storyArgs, __storybookExample: example };
    return createStory(props).render(props);
  },
});

export const SingleClickable = composedStory('single', storyDefs.SingleClickable, singleSource);
export const MultipleClickables = composedStory(
  'multiple',
  storyDefs.MultipleClickableCard,
  multipleSource
);
export const WithColorChange = composedStory('color', storyDefs.WithColorChange, colorSource);
export const ReadJohnsStoryCta = {
  ...composedStory('read-johns', storyDefs.ReadJohnsStoryCta, readJohnsSource),
  name: "Read John's Story CTA",
};
export const ClickableQuote = composedStory('quote', storyDefs.ClickableQuote, quoteSource);
export const ClickableQuoteManualMarkup = {
  ...composedStory('quote-manual', storyDefs.ClickableQuote, quoteManualSource),
  name: 'Clickable Quote v2 (Manual Markup)',
};
export const AllClassesSingleElement = composedStory(
  'all-classes',
  storyDefs.AllClassesSingleElement,
  allClassesSource
);
export const ColorClassesWithinLinkClass = composedStory(
  'within-link',
  storyDefs.ColorClassesWithinLinkClass,
  withinLinkSource
);
export const ColorClassesOutsideLinkClass = composedStory(
  'outside-link',
  storyDefs.ColorClassesOutsideLinkClass,
  outsideLinkSource
);
export const ButtonSurface = composedStory('button', storyDefs.ButtonSurface, buttonSource);
