import React from 'react';
import Eyebrow from '../../../../usx-react/src/components/eyebrow/Eyebrow.tsx';
import config from '../../../../usx-react/src/components/eyebrow/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  InH1: {
    children: 'Page Title',
  },
  InH2: {
    children: 'Section Heading',
  },
  InH3: {
    children: 'Subsection',
  },
};

export default {
  title: 'React/USX/Eyebrow',
  component: Eyebrow,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const InH1 = {
  render: () => (
    <h1>
      <Eyebrow {...storyDefs.InH1} />
      Full Page Title
    </h1>
  ),
};

export const InH2 = {
  render: () => (
    <h2>
      <Eyebrow {...storyDefs.InH2} />
      Full Section Heading
    </h2>
  ),
};

export const InH3 = {
  render: () => (
    <h3>
      <Eyebrow {...storyDefs.InH3} />
      Full Subsection
    </h3>
  ),
};
