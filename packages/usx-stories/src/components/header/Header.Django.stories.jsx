import config from '../../../../usx-react/src/components/header/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import {
  storyDefs,
  borderRoleVars,
  BorderRoles as BorderRolesReact,
} from './Header.React.stories.jsx';
import { storyDefs as themePickerStoryDefs } from '../theme-picker/ThemePicker.React.stories.jsx';
import { useDjangoRenderedHtml } from '../../utils/djangoComponent.js';
import { useGlobals } from 'storybook/preview-api';
import React, { useEffect, useRef } from 'react';

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

const borderRoles = createStory(BorderRolesReact.args);
export const BorderRoles = {
  ...borderRoles,
  render: (args) => <div style={borderRoleVars}>{borderRoles.render(args)}</div>,
};

// Both requests are visible to the snapshot renderer. The live story also
// receives Django's rendered ThemePicker HTML for its interactive end slot.
const ExtensibilitySlotsStory = ({ updateGlobals, ...args }) => {
  const storyRoot = useRef(null);
  const { html: navEndContent } = useDjangoRenderedHtml('theme-picker', {
    ...themePickerStoryDefs.LightDark,
    id: 'theme-picker',
  });
  const { html, error } = useDjangoRenderedHtml('header', { ...args, navEndContent });
  useEffect(() => {
    const root = storyRoot.current;
    const onChange = (event) => {
      if (event.target.matches('.usx-theme-picker select')) updateGlobals({ theme: event.target.value });
    };
    root?.addEventListener('change', onChange);
    return () => root?.removeEventListener('change', onChange);
  }, [updateGlobals]);

  if (error) {
    return (
      <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>
    );
  }

  return <div ref={storyRoot} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const ExtensibilitySlots = {
  args: storyDefs.ExtensibilitySlots,
  parameters: {
    docs: {
      description: {
        story:
          "`navEndContent` embeds Django's own `theme-picker` component (fetched and rendered server-side), so it drives the toolbar theme global the same way the React story's live `ThemePicker` does.",
      },
    },
  },
  render: (args) => {
    const [, updateGlobals] = useGlobals();
    return <ExtensibilitySlotsStory {...args} updateGlobals={updateGlobals} />;
  },
};
