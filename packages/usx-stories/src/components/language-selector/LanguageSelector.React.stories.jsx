import React from 'react';
import LanguageSelector from '../../../../core/src/components/language-selector/LanguageSelector.jsx';
import Alert from '../../../../core/src/components/alert/Alert.jsx';
import config from '../../../../core/src/components/language-selector/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { expect } from 'storybook/test';
import languageSelector from '@uswds/uswds/js/usa-language-selector';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
  title: 'React/USWDS/LanguageSelector',
  component: LanguageSelector,
  argTypes: generatedArgTypes,
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
  parameters: {
    docs: {
      description: {
        component: 'USWDS `usa-language-selector` with the USX treatment. Renders a two-language button (`variant="two"`) or a three-or-more-language dropdown menu (`variant="menu"`, optionally `unstyled`); auto-inferred from `languages.length` when `variant` is omitted. Always wrapped in a `<nav>` landmark for assistive-tech discoverability.'
      }
    }
  }
};


const twoLanguages = [
  // No href: matches real USWDS's canonical two-language pattern, where the
  // button has no navigation target and app-level JS/backend swaps content.
  { code: 'en', label: 'English', current: true },
  { code: 'es', label: 'Español' }
];

const manyLanguages = config.default.languages;

export const storyDefs = {
  TwoLanguages: {
    variant: 'two',
    languages: twoLanguages
  },
  ManyLanguages: {
    variant: 'menu',
    languages: manyLanguages,
    label: 'Languages',
    id: 'language-options-many'
  },
  Unstyled: {
    variant: 'menu',
    unstyled: true,
    languages: manyLanguages,
    label: 'Languages',
    id: 'language-options-unstyled'
  },
  Small: {
    variant: 'menu',
    small: true,
    languages: manyLanguages,
    label: 'Languages',
    id: 'language-options-small'
  }
};

export const TwoLanguages = {
  args: storyDefs.TwoLanguages,
};

export const ManyLanguages = {
  args: storyDefs.ManyLanguages,
};

export const Unstyled = {
  args: storyDefs.Unstyled
};

export const Small = {
  args: storyDefs.Small,
  parameters: {
    docs: {
      description: {
        story: 'Compact sizing (usa-language--small) for placement in a header alongside other nav controls.'
      }
    }
  }
};
