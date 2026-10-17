import React from 'react';
import config from '../../../../usx-react/src/components/drawer/config.json';
import { djangoComponent, serializePropsForDjango } from '../../utils/djangoComponent.js';
import { buildArgTypes, componentTag, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Drawer.React.stories.jsx';

export default {
  title: 'Django/USX/Drawer',
  tags: ['USX', 'autodocs'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
    footer: { control: false },
    trigger: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Django template renders the same native dialog structure. Supply a unique `id`, visible trigger text, and a descriptive heading. Pass rich HTML to `children` and `footer` for forms, navigation, and actions. Modal drawers make the rest of the page inert; set `modal=False` for a modeless popover drawer.',
      },
    },
  },
};

const djangoStory = createDjangoStory({ componentName: 'drawer' });
const DjangoDrawer = djangoComponent({ componentName: 'drawer' });

const createStory = (args) => djangoStory(serializePropsForDjango(args));

/** A named modal drawer opens with heading focus and restores focus when closed. */
export const Default = createStory(storyDefs.Default);

const sides = storyDefs.Sides.map(serializePropsForDjango);

/** Four opening edges include logical inline start and end. */
export const AllSides = {
  parameters: {
    docs: {
      source: { code: sides.map((props) => componentTag({ name: 'drawer', props })).join('\n\n') },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sides.map((args) => (
        <DjangoDrawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

const sizes = storyDefs.Sizes.map(serializePropsForDjango);

/** Compact, default, and wide panel sizes. */
export const AllSizes = {
  parameters: {
    docs: {
      source: { code: sizes.map((props) => componentTag({ name: 'drawer', props })).join('\n\n') },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((args) => (
        <DjangoDrawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** A modeless panel leaves other page controls available. */
export const Modeless = {
  ...createStory(storyDefs.Modeless),
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <DjangoDrawer {...args} />
      <button className="usa-button usa-button--outline" type="button">
        Other page task
      </button>
    </div>
  ),
};

/** A form can take initial focus and close through native dialog submission. */
export const RichForm = createStory(storyDefs.RichForm);

/** A popover inside a drawer stays independent of its parent dialog. */
export const NestedPopover = createStory(storyDefs.NestedPopover);

/** A long navigation list exercises scrolling. */
export const LongContent = createStory(storyDefs.LongContent);

const rtl = storyDefs.Rtl.map(serializePropsForDjango);

/** Logical inline edges follow right-to-left reading order. */
export const Rtl = {
  parameters: {
    docs: {
      source: {
        code: `<div dir="rtl">\n${rtl.map((props) => componentTag({ name: 'drawer', props })).join('\n\n')}\n</div>`,
      },
    },
  },
  render: () => (
    <div dir="rtl" style={{ display: 'flex', gap: '1rem' }}>
      {rtl.map((args) => (
        <DjangoDrawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** Native disabled state prevents opening. */
export const Disabled = createStory(storyDefs.Disabled);

/** An icon trigger supplies an accessible text label. */
export const IconTrigger = createStory(storyDefs.IconTrigger);

/** A custom trigger's visible text remains its accessible name. */
export const CustomTrigger = createStory(storyDefs.CustomTrigger);
