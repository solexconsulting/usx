import React from 'react';
import Alert from '../../../../core/src/components/alert/Alert.jsx';
import languageSelector from '@uswds/uswds/js/usa-language-selector';
import config from '../../../../core/src/components/language-selector/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './LanguageSelector.React.stories.jsx';

export default {
  title: 'Django/USWDS/LanguageSelector',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [
    (Story) => {
      // The usa-language__primary menu reuses accordion show/hide behavior;
      // initialize the real USWDS JS for the story, same as the HTML story.
      React.useEffect(() => {
        languageSelector.on();
        return () => languageSelector.off();
      }, []);

      return (
        <>
          <Alert
            heading="Performance Issues"
            variant="warning"
            text="This <em>language-selector</em> component has known performance issues we are working on resolving."
            className="margin-bottom-3"
          />
          <Story />
        </>
      );
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
