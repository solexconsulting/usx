import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Card.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Card',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'card' });

export const Default = createStory(storyDefs.Default);
export const WithImage = createStory(storyDefs.WithImage);
export const WithTags = createStory(storyDefs.WithTags);
export const WithImageAndTags = createStory(storyDefs.WithImageAndTags);
export const FlagLayout = createStory(storyDefs.FlagLayout);
export const MediaRight = createStory(storyDefs.MediaRight);
export const HeaderFirst = createStory(storyDefs.HeaderFirst);
export const MediaInset = createStory(storyDefs.MediaInset);
export const MediaInsetRight = createStory(storyDefs.MediaInsetRight);
export const MediaExdent = createStory(storyDefs.MediaExdent);
export const WithCarousel = createStory(storyDefs.WithCarousel);
export const WithCarouselInset = createStory(storyDefs.WithCarouselInset);
export const WithCarouselNoDots = createStory(storyDefs.WithCarouselNoDots);
export const WithCarouselAndTags = createStory(storyDefs.WithCarouselAndTags);
export const WithCarouselFlagLayout = createStory(storyDefs.WithCarouselFlagLayout);
export const Minimal = createStory(storyDefs.Minimal);
export const FullFeatured = createStory(storyDefs.FullFeatured);
export const ImagesWithObjectFitContain = createStory(storyDefs.ImagesWithObjectFitContain);
export const ImagesWithObjectFitFill = createStory(storyDefs.ImagesWithObjectFitFill);
