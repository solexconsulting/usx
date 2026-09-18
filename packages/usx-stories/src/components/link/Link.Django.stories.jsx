import React from 'react';
import config from '../../../../usx-react/src/components/link/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Link.React.stories.jsx';

export default {
  title: 'Django/USWDS/Link',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'link' });
const createDarkStory = createDjangoStory({
  componentName: 'link',
  wrapper: (payload, _args, { mode }) => {
    const normalizedPayload = payload.trim();

    if (mode === 'source') {
      return `<div class="usa-dark-background padding-1 display-inline-block">\n  <p>This is ${normalizedPayload}.</p>\n</div>`;
    }

    return (
      <div className="usa-dark-background padding-1 display-inline-block">
        <p dangerouslySetInnerHTML={{ __html: `This is ${normalizedPayload}.` }} />
      </div>
    );
  },
});
const createDarkAltStory = createDjangoStory({
  componentName: 'link',
  wrapper: (payload, _args, { mode }) => {
    const normalizedPayload = payload.trim();

    if (mode === 'source') {
      return `<div class="usa-dark-background padding-1 display-inline-block">\n  <p>${normalizedPayload} is an alternate external text link on a dark background.</p>\n</div>`;
    }

    return (
      <div className="usa-dark-background padding-1 display-inline-block">
        <p dangerouslySetInnerHTML={{ __html: `${normalizedPayload} is an alternate external text link on a dark background.` }} />
      </div>
    );
  },
});

export const Default = createStory(storyDefs.Default);
export const Visited = createStory(storyDefs.Visited);
export const ExternalCurrentTab = createStory(storyDefs.ExternalCurrentTab);
export const ExternalNewTab = createStory(storyDefs.ExternalNewTab);
export const DarkBackground = createDarkStory(storyDefs.DarkBackground);
export const DarkBackgroundAlternateExternal = createDarkAltStory(storyDefs.DarkBackgroundAlternateExternal);
