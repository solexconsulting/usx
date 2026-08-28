
import { Accordion } from '../../../../core/src/components/accordion/Accordion.jsx';
import config from '../../../../core/src/components/accordion/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { expect } from 'storybook/test';

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
          component: 'USWDS defaults the accordion icon to the start side. Set $theme-accordion-icon-position to "start" or "end" in Sass for a global choice, or use usa-accordion--icon-start / usa-accordion--icon-end for one accordion.'
        }
      }
    }
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
        content: 'Content for accordion item 3.'
    }
]

export const storyDefs = {
  Default: {
    id: 'accordion-default',
    items: items1
  },
  Bordered: {
    id: 'accordion-bordered',
    items: items1,
    bordered: true
  },
  MultiSelectable: {
    id: 'accordion-multi',
    items: items1,
    multiselectable: true
  },
  CustomHeadingLevel: {
    id: 'accordion-h2',
    items: items1,
    headingLevel: 'h2'
  },
  BorderedMultiSelectableH4: {
    id: 'accordion-bordered-multi-h4',
    items: items1,
    bordered: true,
    multiselectable: true,
    headingLevel: 'h4'
  },
  IconStart: {
    id: 'accordion-icon-start',
    items: items1,
    className: 'usa-accordion--icon-start'
  },
  IconEnd: {
    id: 'accordion-icon-end',
    items: items1,
    className: 'usa-accordion--icon-end'
  }
};

export const Default = {
    args: storyDefs.Default,
    play: async function({ canvas, userEvent }) {
        const button = canvas.getByRole('button', { name: /accordion item 1/i });
        const content = canvas.getByText(/content for accordion item 1/i);

        await expect(content).not.toBeVisible();

        await userEvent.click(button);

        await expect(content).toBeVisible();
    }
}

export const Bordered = {
    args: storyDefs.Bordered
}

export const MultiSelectable = {
    args: storyDefs.MultiSelectable
}

export const CustomHeadingLevel = {
    args: storyDefs.CustomHeadingLevel
}

export const BorderedMultiSelectableH4 = {
    args: storyDefs.BorderedMultiSelectableH4
}

export const IconStart = {
  args: storyDefs.IconStart
}

export const IconEnd = {
  args: storyDefs.IconEnd
}