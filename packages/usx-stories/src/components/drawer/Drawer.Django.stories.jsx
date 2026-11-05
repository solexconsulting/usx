import config from '../../../../usx-react/src/components/drawer/config.json';
import { buildArgTypes, componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';
import ReactMeta, { storyDefs, AllSides as AllSidesReact, AllSizes as AllSizesReact } from './Drawer.React.stories.jsx';

export default {
  excludeStories: ['Unenhanced'],
  title: 'Django/USX/Drawer',
  tags: ['USX', 'autodocs'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
    footer: { control: false },
    trigger: { control: false },
  },
  decorators: [...componentInit('drawer')],
  parameters: {
    docs: {
      description: {
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

const djangoStory = createDjangoStory({ componentName: 'drawer' });
const createStory = djangoStory;

/** A named modal drawer opens with heading focus and restores focus when closed. */
export const Default = createStory(storyDefs.Default);
export const Unenhanced = { ...createStory(storyDefs.Unenhanced), parameters: { docs: { description: { story: 'Native dialog commands still open and close the drawer. USX JavaScript adds dismissal when the backdrop outside the dialog panel is clicked.' } } } };

/** An icon-only menu button uses the trigger slot and an explicit accessible name. */
export const MenuIconTrigger = createStory(storyDefs.MenuIconTrigger);

/** Four opening edges include logical inline start and end. */
export const AllSides = createDjangoStory({ componentName: 'drawer', renderTree: AllSidesReact.render })({});

/** Account shortcuts, an appointment, and a checklist show useful content at each size. */
export const AllSizes = createDjangoStory({ componentName: 'drawer', renderTree: AllSizesReact.render })({});

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
