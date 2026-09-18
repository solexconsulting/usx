import React from 'react';
import {{Name}} from '../../../../usx-react/src/components/{{kebab}}/{{Name}}.tsx';
import config from '../../../../usx-react/src/components/{{kebab}}/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/USX/{{Name}}',
  component: {{Name}},
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
