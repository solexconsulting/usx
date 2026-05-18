import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Block.React.stories.jsx';

export default {
  title: 'Django/Block',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory('block');

export const Default = createStory(storyDefs.Default);
export const Callout = createStory(storyDefs.Callout);
export const Dedent = createStory(storyDefs.Dedent);
export const IndentSm = createStory(storyDefs.IndentSm);
export const IndentMd = createStory(storyDefs.IndentMd);
export const IndentLg = createStory(storyDefs.IndentLg);
export const IndentXl = createStory(storyDefs.IndentXl);
export const Big = createStory(storyDefs.Big);
export const DedentBig = createStory(storyDefs.DedentBig);
export const ColorPrimary = createStory(storyDefs.ColorPrimary);
export const ColorError = createStory(storyDefs.ColorError);
export const ColorWarning = createStory(storyDefs.ColorWarning);
export const ColorSuccess = createStory(storyDefs.ColorSuccess);
export const ColorInfo = createStory(storyDefs.ColorInfo);
export const AddressBlock = createStory(storyDefs.AddressBlock);
export const QuoteBlock = createStory(storyDefs.QuoteBlock);
export const QuoteWithAvatar = createStory(storyDefs.QuoteWithAvatar);
export const CalloutQuote = createStory(storyDefs.CalloutQuote);
export const WithAttribution = createStory(storyDefs.WithAttribution);
