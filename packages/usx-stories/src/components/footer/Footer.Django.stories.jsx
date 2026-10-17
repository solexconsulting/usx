import React from 'react';
import config from '../../../../usx-react/src/components/footer/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, borderRoleVars, BorderRoles as BorderRolesReact } from './Footer.React.stories.jsx';

export default {
  title: 'Django/USWDS/Footer',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'footer' });

export const Big      = { ...createStory(storyDefs.Big), name: 'Big Footer' };
export const Medium   = { ...createStory(storyDefs.Medium), name: 'Medium Footer' };
export const Slim     = createStory(storyDefs.Slim);
export const LogoOnly = createStory(storyDefs.LogoOnly);
export const NoNav    = createStory(storyDefs.NoNav);
export const Minimal  = createStory(storyDefs.Minimal);
const borderRoles = createStory(BorderRolesReact.args);
export const BorderRoles = {
  ...borderRoles,
  render: (args) => <div style={borderRoleVars}>{borderRoles.render(args)}</div>,
};
