import config from '../../../../usx-react/src/components/identifier/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, AvatarVariants as ReactAvatarVariants, Solex as ReactSolex, MultipleParentsAndAvatarsMixedArticle as ReactMultipleParentsAndAvatarsMixedArticle } from './Identifier.React.stories.jsx';

export default {
  title: 'Django/USWDS/Identifier',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'identifier' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const DefaultSpanish = createStory(toDjangoArgs(storyDefs.DefaultSpanish));
export const MultipleParentsAndAvatars = createStory(toDjangoArgs(storyDefs.MultipleParentsAndAvatars));
export const MultipleParentsAndAvatarsSpanish = createStory(toDjangoArgs(storyDefs.MultipleParentsAndAvatarsSpanish));
export const MultipleParentsAndAvatarsOverlappingAvatars = createStory(toDjangoArgs(storyDefs.MultipleParentsAndAvatarsOverlappingAvatars));
export const NoAvatars = createStory(toDjangoArgs(storyDefs.NoAvatars));
export const TaxpayerDisclaimer = createStory(toDjangoArgs(storyDefs.TaxpayerDisclaimer));
export const TaxpayerDisclaimerSpanish = createStory(toDjangoArgs(storyDefs.TaxpayerDisclaimerSpanish));
export const Solex = {
  ...createStory(toDjangoArgs(storyDefs.Solex)),
  play: ReactSolex.play,
};
export const MultipleParentsAndAvatarsMixedArticle = {
  ...createStory(toDjangoArgs(storyDefs.MultipleParentsAndAvatarsMixedArticle)),
  play: ReactMultipleParentsAndAvatarsMixedArticle.play,
};
export const AvatarVariants = {
  ...createStory(toDjangoArgs(storyDefs.AvatarVariants)),
  play: ReactAvatarVariants.play,
};
