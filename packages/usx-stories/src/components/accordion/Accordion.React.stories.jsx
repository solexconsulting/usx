import React from 'react';
import accordion from '@uswds/uswds/js/usa-accordion';
import { Accordion } from '../../../../usx-react/src/components/accordion/Accordion.tsx';
import config from '../../../../usx-react/src/components/accordion/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { expect, fn, userEvent } from 'storybook/test';

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
          component: uswdsInitNote('`accordion.init()`') + '\n\nSet iconPosition to "start" or "end" for one accordion. Leave it unset to use the global USWDS or theme setting ($theme-accordion-icon-position in Sass).'
        }
      }
    },
    decorators: [
      (Story, context) => {
        const root = React.useRef(null);
        React.useEffect(() => {
          accordion.init(root.current);
        }, [context.args.items, context.args.multiselectable]);
        return <div ref={root}><Story /></div>;
      },
    ],
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
    iconPosition: 'start'
  },
  IconEnd: {
    id: 'accordion-icon-end',
    items: items1,
    iconPosition: 'end'
  }
};

for (const args of Object.values(storyDefs)) {
  args.items = args.items.map(item => ({ ...item, id: `${args.id}-${item.id}` }));
}

export const Default = {
    args: storyDefs.Default,
    play: async function({ canvas, canvasElement }) {
    await expect(generatedArgTypes.items.control.type).toBe('object');
    await expect(generatedArgTypes.items.type.name).toBe('array');
        const button = canvas.getByRole('button', { name: /accordion item 1/i });
        const content = canvas.getByText(/content for accordion item 1/i);
      const secondButton = canvas.getByRole('button', { name: /accordion item 2/i });
      const secondContent = canvas.getByText(/content for accordion item 2/i);

      await expect(canvasElement.querySelector('.usx-accordion')).not.toHaveAttribute('data-allow-multiple');
        await expect(content).not.toBeVisible();

        await userEvent.click(button);

        await expect(content).toBeVisible();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(secondButton);
      await expect(content).not.toBeVisible();
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(secondContent).toBeVisible();
      await userEvent.click(secondButton);
      await expect(secondContent).not.toBeVisible();
      await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    }
}

export const Bordered = {
    args: storyDefs.Bordered
}

export const InitiallyExpanded = {
  args: {
    id: 'accordion-initially-expanded',
    items: items1.map((item, index) => ({
      ...item,
      id: `accordion-initially-expanded-${item.id}`,
      expanded: index === 0,
      handleToggle: fn(),
    })),
  },
  play: async function({ canvas, args }) {
    const button = canvas.getByRole('button', { name: /accordion item 1/i });
    const content = canvas.getByText(/content for accordion item 1/i);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
    await userEvent.click(button);
    await expect(args.items[0].handleToggle).toHaveBeenCalledTimes(1);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(content).not.toBeVisible();
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
  },
};

export const MultiSelectable = {
  args: storyDefs.MultiSelectable,
  play: async function({ canvas, canvasElement }) {
    const firstButton = canvas.getByRole('button', { name: /accordion item 1/i });
    const secondButton = canvas.getByRole('button', { name: /accordion item 2/i });
    const firstContent = canvas.getByText(/content for accordion item 1/i);
    const secondContent = canvas.getByText(/content for accordion item 2/i);

    await expect(canvasElement.querySelector('.usx-accordion')).toHaveAttribute('data-allow-multiple');
    await userEvent.click(firstButton);
    await userEvent.click(secondButton);
    await expect(firstContent).toBeVisible();
    await expect(secondContent).toBeVisible();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(firstButton);
    await expect(firstContent).not.toBeVisible();
    await expect(secondContent).toBeVisible();
    await userEvent.click(secondButton);
  }
}

export const CustomHeadingLevel = {
    args: storyDefs.CustomHeadingLevel
}

export const BorderedMultiSelectableH4 = {
    args: storyDefs.BorderedMultiSelectableH4
}

export const IconStart = {
  args: storyDefs.IconStart,
  play: async function({ canvasElement }) {
    const root = canvasElement.querySelector('.usx-accordion');
    await expect(root).toHaveClass('usa-accordion--icon-start');
    await expect(root).not.toHaveClass('usa-accordion--icon-end');
    await expect(root).not.toHaveAttribute('iconPosition');
  },
}

export const IconEnd = {
  args: storyDefs.IconEnd,
  play: async function({ canvasElement }) {
    const root = canvasElement.querySelector('.usx-accordion');
    await expect(root).toHaveClass('usa-accordion--icon-end');
    await expect(root).not.toHaveClass('usa-accordion--icon-start');
    await expect(root).not.toHaveAttribute('iconPosition');
  },
}