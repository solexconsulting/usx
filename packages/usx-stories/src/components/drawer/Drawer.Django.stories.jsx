import React from 'react';
import config from '../../../../usx-react/src/components/drawer/config.json';
import { djangoComponent, serializePropsForDjango } from '../../utils/djangoComponent.js';
import { buildArgTypes, componentTag, createDjangoStory } from '../../utils/storyHelpers.jsx';
import ReactMeta, { storyDefs } from './Drawer.React.stories.jsx';

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
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

const djangoStory = createDjangoStory({ componentName: 'drawer' });
const DjangoDrawer = djangoComponent({ componentName: 'drawer' });

const createStory = (args) => djangoStory(serializePropsForDjango(args));

/** A named modal drawer opens with heading focus and restores focus when closed. */
export const Default = createStory(storyDefs.Default);

/** An icon-only menu button uses the trigger slot and an explicit accessible name. */
export const MenuIconTrigger = createStory(storyDefs.MenuIconTrigger);

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

/** Account shortcuts, an appointment, and a checklist show useful content at each size. */
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

/** A form can take initial focus and close through native dialog submission. */
export const RichForm = createStory(storyDefs.RichForm);

/** Deeply nested navigation, search, and an account footer in a wide drawer. */
export const ServiceNavigation = createStory(storyDefs.ServiceNavigation);

/** Rounded corners are opt-in; edges are square by default. */
export const Rounded = createStory(storyDefs.Rounded);

/** With no close button, the drawer closes only through its own actions. */
export const ActionRequired = createStory(storyDefs.ActionRequired);

/** Native disabled state prevents opening. */
export const Disabled = createStory(storyDefs.Disabled);
