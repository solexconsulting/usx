import React from 'react';
import LanguageSelector from '../../../../usx-react/src/components/language-selector/LanguageSelector.tsx';
import config from '../../../../usx-react/src/components/language-selector/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs', 'Unenhanced'],
  title: 'React/USWDS/LanguageSelector',
  component: LanguageSelector,
  argTypes: generatedArgTypes,
  decorators: [...componentInit('languageSelector')],
  parameters: {
    docs: {
      description: {
        component: 'USWDS `usa-language-selector` with the USX treatment. Renders a two-language button (`variant="two"`) or a three-or-more-language dropdown menu (`variant="menu"`, optionally `unstyled`); auto-inferred from `languages.length` when `variant` is omitted. Always wrapped in a `<nav>` landmark for assistive-tech discoverability. ' + uswdsInitNote('`languageSelector.init()`')
      }
    }
  }
};

const manyLanguages = [
  ...config.default.languages,
  { code: 'de', label: 'Deutsch', description: 'German', href: 'https://example.com/de' },
  { code: 'zh', label: '中文', description: 'Chinese', href: 'https://example.com/zh' },
];

export const storyDefs = {
  Default: config.default,
  Unenhanced: { ...config.default, id: 'language-options-unenhanced', extraAttributes: { 'data-enhanced': 'true' } },
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

export const Default = {
  args: storyDefs.Default,
};

export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'The language choices remain in the markup, but the menu cannot be opened without USWDS JavaScript.' } } } };
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
