import React from 'react';
import List from '../../../../usx-react/src/components/list/List.tsx';
import config from '../../../../usx-react/src/components/list/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});


const defaultList = {
  items: [
    "List item",
    "List item",
    "List item"
  ]
};

export const storyDefs = {
  Default: defaultList,
  Ordered: {
    ...defaultList,
    ordered: true,
  },
  Unstyled: {
    ...defaultList,
    unstyled: true,
  },
  Nested: {
    items: [
      'Main point',
      {
        content: 'Program requirements',
        children: [
          'Submit application',
          {
            content: 'Provide supporting documents',
            children: [
              'Photo identification',
              'Proof of address',
              {
                content: 'Income documents',
                ordered: true,
                children: ['Recent pay stubs', 'Most recent tax return'],
              },
            ],
          },
        ],
      },
      'Final confirmation',
    ],
  },
};

export default {
  title: 'React/USWDS/List',
  component: List,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = storyDefs.Default;

export const Ordered = Template.bind({});
Ordered.args = storyDefs.Ordered;

export const Unstyled = Template.bind({});
Unstyled.args = storyDefs.Unstyled;

export const Nested = Template.bind({});
Nested.args = storyDefs.Nested;
