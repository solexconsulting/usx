import config from '../../../../core/src/components/carousel/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Carousel.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USX/Carousel',
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'carousel' });

export const Default = createStory(storyDefs.Default);
export const WithoutDots = createStory(storyDefs.WithoutDots);
export const CustomId = createStory(storyDefs.CustomId);
export const WithImages = createStory(storyDefs.WithImages);
export const WithSlideChildren = createStory(storyDefs.WithSlideChildren);
export const WithHTMLChildren = createStory(storyDefs.WithHTMLChildren);
