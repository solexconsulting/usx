import React from 'react';
import { Accordion } from '../../../../usx-react/src/components/accordion/Accordion.tsx';
import config from '../../../../usx-react/src/components/accordion/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { fn } from 'storybook/test';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Accordion',
  component: Accordion,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          uswdsInitNote('`accordion.init()`') +
          '\n\nSet iconPosition to "start" or "end" for one accordion. Leave it unset to use the global USWDS or theme setting ($theme-accordion-icon-position in Sass).',
      },
    },
  },
  decorators: [...componentInit('accordion')],
};

const items1 = [
  {
    id: 'item-1',
    title: 'Accordion Item 1',
    content: 'Content for accordion item 1.',
  },
  {
    id: 'item-2',
    title: 'Accordion Item 2',
    content: 'Content for accordion item 2.',
  },
  {
    id: 'item-3',
    title: 'Accordion Item 3',
    content: 'Content for accordion item 3.',
  },
];

export const storyDefs = {
  Default: {
    id: 'accordion-default',
    items: items1,
  },
  Bordered: {
    id: 'accordion-bordered',
    items: items1,
    bordered: true,
  },
  MultiSelectable: {
    id: 'accordion-multi',
    items: items1,
    multiselectable: true,
  },
  CustomHeadingLevel: {
    id: 'accordion-h2',
    items: items1,
    headingLevel: 'h2',
  },
  BorderedMultiSelectableH4: {
    id: 'accordion-bordered-multi-h4',
    items: items1,
    bordered: true,
    multiselectable: true,
    headingLevel: 'h4',
  },
  IconStart: {
    id: 'accordion-icon-start',
    items: items1,
    iconPosition: 'start',
  },
  IconEnd: {
    id: 'accordion-icon-end',
    items: items1,
    iconPosition: 'end',
  },
  InitiallyExpanded: {
    id: 'accordion-initially-expanded',
    items: items1.map((item, index) => ({
      ...item,
      id: `accordion-initially-expanded-${item.id}`,
      expanded: index === 0,
      handleToggle: fn(),
    })),
  },
};

for (const args of Object.values(storyDefs)) {
  args.items = args.items.map((item) => ({ ...item, id: `${args.id}-${item.id}` }));
}

export const Default = {args: storyDefs.Default};
export const Bordered = {args: storyDefs.Bordered};
export const InitiallyExpanded = {args: storyDefs.InitiallyExpanded};
export const MultiSelectable = {args: storyDefs.MultiSelectable};
export const CustomHeadingLevel = {args: storyDefs.CustomHeadingLevel};
export const BorderedMultiSelectableH4 = {args: storyDefs.BorderedMultiSelectableH4};
export const IconStart = {args: storyDefs.IconStart};
export const IconEnd = {args: storyDefs.IconEnd};
