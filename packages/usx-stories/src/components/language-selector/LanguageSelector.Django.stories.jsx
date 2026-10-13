import React from 'react';
import config from '../../../../usx-react/src/components/language-selector/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './LanguageSelector.React.stories.jsx';

export default {
  title: 'Django/USWDS/LanguageSelector',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`languageSelector.init()`')
      }
    }
  },
  decorators: [...componentInit('languageSelector')],
};

const createStory = createDjangoStory({ componentName: 'language-selector' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const TwoLanguages = createStory(toDjangoArgs(storyDefs.TwoLanguages));
export const ManyLanguages = createStory(toDjangoArgs(storyDefs.ManyLanguages));
export const Unstyled = createStory(toDjangoArgs(storyDefs.Unstyled));
export const Small = createStory(toDjangoArgs(storyDefs.Small));
