import React from 'react';
import config from '../../../../usx-react/src/components/popover/config.json';
import Popover from '../../../../usx-react/src/components/popover/Popover.tsx';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import ReactMeta, { storyDefs, NavigationBarLayout, AllPlacements as AllPlacementsReact, RtlPlacements as RtlPlacementsReact } from './Popover.React.stories.jsx';

export default {
  excludeStories: ['Unenhanced'],
  decorators: ReactMeta.decorators,
  title: 'Django/USX/Popover',
  tags: ['USX', 'autodocs'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

const createPopoverStory = createDjangoStory({ componentName: 'popover' });

/** Plain content in a native disclosure with an enhanced floating panel. */
export const Default = createPopoverStory(storyDefs.Default);
export const Unenhanced = { ...createPopoverStory(storyDefs.Unenhanced), parameters: { docs: { description: { story: 'Native details behavior still opens and closes the panel when its trigger is clicked. Without USX JavaScript, outside clicks, Escape, and the optional Close button do not dismiss it.' } } } };

/** Original rounded panel with extra vertical padding. */
export const RoundedPanel = createPopoverStory(storyDefs.RoundedPanel);

/** Square panel with equal outer padding on all sides. */
export const SquarePanel = createPopoverStory(storyDefs.SquarePanel);

/** Caller-authored utility classes style the summary without Popover trigger styles. */
export const AuthoredTrigger = createPopoverStory(storyDefs.AuthoredTrigger);

/** Summary configuration is grouped and passed directly to the shared Summary component. */
export const GroupedSummaryProps = createPopoverStory(storyDefs.GroupedSummaryProps);

/** Nested flyouts and links use the same item data as the React story. */
export const MenuItems = createPopoverStory(storyDefs.MenuItems);

/** The same nested menu in a square panel. */
export const SquareMenuItems = createPopoverStory(storyDefs.SquareMenuItems);

/** The complete Popover composition example, including nested flyouts and close behavior. */
export const WorstCase = createPopoverStory(storyDefs.WorstCase);

/** Close attributes are handled by the shared USX enhancement. */
export const Links = createPopoverStory(storyDefs.Links);

/** Form controls and headings remain available inside the panel. */
export const RichForm = createPopoverStory(storyDefs.RichForm);

/** Without `headingAs`, `panelHeading` renders as an h2. */
export const HeadingAsDefault = createPopoverStory(storyDefs.HeadingAsDefault);

/** Set `headingAs` so the panel heading fits the outline of the page that contains it. */
export const HeadingAsH3 = createPopoverStory(storyDefs.HeadingAsH3);

/** Heading levels are independent of visual size; use `panelClassName` or utilities to restyle. */
export const HeadingAsH5 = createPopoverStory(storyDefs.HeadingAsH5);

/** All 12 side and alignment combinations use the same template. */
export const AllPlacements = createDjangoStory({ componentName: 'popover', renderTree: AllPlacementsReact.render })({});

/** Start and end alignments follow right-to-left reading order. */
export const RtlPlacements = createDjangoStory({ componentName: 'popover', renderTree: RtlPlacementsReact.render })({});

/** The panel keeps a long link list scrollable. */
export const LongContent = createPopoverStory(storyDefs.LongContent);

/** One positioned Popover contains a Tree on small screens and a list with optional nested Popovers on larger screens. */
export const ResponsiveComposition = createPopoverStory(storyDefs.ResponsiveComposition);

export const NavigationBar = createDjangoStory({
  componentName: 'popover',
  renderTree: () => NavigationBarLayout({ children: <Popover {...storyDefs.NavigationBar} /> }),
})({});
