import config from '../../../../core/src/components/identifier/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Identifier.React.stories.jsx';

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
export const MultipleParentsAndLogos = createStory(toDjangoArgs(storyDefs.MultipleParentsAndLogos));
export const MultipleParentsAndLogosSpanish = createStory(toDjangoArgs(storyDefs.MultipleParentsAndLogosSpanish));
export const MultipleParentsAndLogosOverlappingAvatars = createStory(toDjangoArgs(storyDefs.MultipleParentsAndLogosOverlappingAvatars));
export const NoLogos = createStory(toDjangoArgs(storyDefs.NoLogos));
export const TaxpayerDisclaimer = createStory(toDjangoArgs(storyDefs.TaxpayerDisclaimer));
export const TaxpayerDisclaimerSpanish = createStory(toDjangoArgs(storyDefs.TaxpayerDisclaimerSpanish));
