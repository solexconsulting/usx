import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Identifier.React.stories.jsx';

export default {
  title: 'Django/Identifier',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('identifier');
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
