import React from 'react';
import languageSelector from '@uswds/uswds/js/usa-language-selector';
import config from '../../../../usx-react/src/components/language-selector/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
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
  decorators: [
    (Story) => {
      // The usa-language__primary menu reuses accordion show/hide behavior;
      // initialize the real USWDS JS for the story, same as the HTML story.
      // Delayed since the Django markup is fetched asynchronously and may not
      // be mounted yet on the first effect run.
      React.useEffect(() => {
        const timeout = setTimeout(() => {
          languageSelector.init();
        }, 400);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ],
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
