import config from '../../../../usx-react/src/components/identifier/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Identifier.React.stories.jsx';

export default {
  title: 'Django/USWDS/Identifier',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'identifier' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) =>
  Object.fromEntries(Object.entries(args).filter(([key]) => allowedPropNames.has(key)));

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const DefaultSpanish = createStory(toDjangoArgs(storyDefs.DefaultSpanish));
export const MultipleParentsAndAvatars = createStory(
  toDjangoArgs(storyDefs.MultipleParentsAndAvatars)
);
export const MultipleParentsAndAvatarsSpanish = createStory(
  toDjangoArgs(storyDefs.MultipleParentsAndAvatarsSpanish)
);
export const MultipleParentsAndAvatarsOverlappingAvatars = createStory(
  toDjangoArgs(storyDefs.MultipleParentsAndAvatarsOverlappingAvatars)
);
export const NoAvatars = createStory(toDjangoArgs(storyDefs.NoAvatars));
export const TaxpayerDisclaimer = createStory(toDjangoArgs(storyDefs.TaxpayerDisclaimer));
export const TaxpayerDisclaimerSpanish = createStory(
  toDjangoArgs(storyDefs.TaxpayerDisclaimerSpanish)
);
export const Solex = createStory(toDjangoArgs(storyDefs.Solex));
export const MultipleParentsAndAvatarsMixedArticle = createStory(
  toDjangoArgs(storyDefs.MultipleParentsAndAvatarsMixedArticle)
);
export const AvatarVariants = createStory(toDjangoArgs(storyDefs.AvatarVariants));
export const LogoShapeRounded = createStory(toDjangoArgs(storyDefs.LogoShapeRounded));
export const LogoShapeGlobal = createStory(toDjangoArgs(storyDefs.LogoShapeGlobal));
