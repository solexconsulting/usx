import React from 'react';
import config from '../../../../usx-react/src/components/footer/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { FooterInitOnce } from './footerInit.jsx';
import { storyDefs, borderRoleVars, BorderRoles as BorderRolesReact } from './Footer.React.stories.jsx';

export default {
  title: 'Django/USWDS/Footer',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [FooterInitOnce],
  parameters: { docs: { description: { component: uswdsInitNote('`footer.init()`') } } },
};

const createStory = createDjangoStory({ componentName: 'footer' });

export const Big      = { ...createStory(storyDefs.Big), name: 'Big Footer' };
export const Medium   = { ...createStory(storyDefs.Medium), name: 'Medium Footer' };
export const Slim     = createStory(storyDefs.Slim);
export const LogoOnly = createStory(storyDefs.LogoOnly);
export const NoNav    = createStory(storyDefs.NoNav);
export const Minimal  = createStory(storyDefs.Minimal);
export const PrimaryOnly = createStory(storyDefs.PrimaryOnly);
const borderRoles = createStory(BorderRolesReact.args);
export const BorderRoles = {
  ...borderRoles,
  render: (args) => <div style={borderRoleVars}>{borderRoles.render(args)}</div>,
};
export const CustomComposition = createStory(storyDefs.CustomComposition);
