
import config from '../../../../usx-react/src/components/header/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Header.React.stories.jsx';
import { storyDefs as themePickerStoryDefs } from '../theme-picker/ThemePicker.React.stories.jsx';
import { fetchComponentHtml, useDjangoRenderedHtml } from '../../utils/djangoComponent.js';
import React, { useEffect, useState } from 'react';

export default {
  title: 'Django/USWDS/Header',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'header' });

export const Default = createStory(storyDefs.Default);
export const Basic = createStory(storyDefs.Basic);
export const BasicWithMegamenu = createStory(storyDefs.BasicWithMegamenu);
export const Extended = createStory(storyDefs.Extended);
export const ExtendedWithMegamenu = createStory(storyDefs.ExtendedWithMegamenu);
export const WithMenuIcon = createStory(storyDefs.WithMenuIcon);
export const Minimal = createStory(storyDefs.Minimal);
export const Maximal = createStory(storyDefs.Maximal);
export const TextOnly = createStory(storyDefs.TextOnly);
export const SymbolAndText = createStory(storyDefs.SymbolAndText);
export const SingleLogo = createStory(storyDefs.SingleLogo);
export const ResponsiveLogo = createStory(storyDefs.ResponsiveLogo);
export const ResponsiveLogoExtended = createStory(storyDefs.ResponsiveLogoExtended);
export const ThemeResponsiveLogo = createStory(storyDefs.ThemeResponsiveLogo);
export const ExternalLinks = createStory(storyDefs.ExternalLinks);

// Same channel event the toolbar's own theme switcher emits — see
// ThemePicker.Django.stories.jsx, which drives the global theme the same way.
const THEME_PICKER_ONCHANGE =
  "window.__STORYBOOK_ADDONS_CHANNEL__.emit('updateGlobals', { globals: { theme: this.value } })";

// utilityContent is a plain React element, serialized to static HTML by
// createDjangoStory. navEndContent instead needs to stay *interactive*, so
// rather than serialize a React ThemePicker, this fetches Django's own
// theme-picker render (a real onchange attribute, not a stripped React
// handler) and passes its HTML straight through as the slot's string prop.
const ExtensibilitySlotsStory = (args) => {
  const [navEndContent, setNavEndContent] = useState(null);

  useEffect(() => {
    let active = true;
    fetchComponentHtml('theme-picker', {
      ...themePickerStoryDefs.LightDark,
      onChange: THEME_PICKER_ONCHANGE,
    }).then((html) => {
      if (active) setNavEndContent(html);
    });
    return () => { active = false; };
  }, []);

  const { html, error } = useDjangoRenderedHtml('header', { ...args, navEndContent });

  if (error) {
    return <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const ExtensibilitySlots = {
  args: storyDefs.ExtensibilitySlots,
  parameters: {
    docs: {
      description: {
        story: '`navEndContent` embeds Django\'s own `theme-picker` component (fetched and rendered server-side), so it drives the toolbar theme global the same way the React story\'s live `ThemePicker` does.'
      }
    }
  },
  render: (args) => <ExtensibilitySlotsStory {...args} />,
};
