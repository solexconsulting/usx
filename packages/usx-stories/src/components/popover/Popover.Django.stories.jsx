import React from 'react';
import config from '../../../../usx-react/src/components/popover/config.json';
import { djangoComponent, serializePropsForDjango } from '../../utils/djangoComponent.js';
import { buildArgTypes, componentTag, createDjangoStory } from '../../utils/storyHelpers.jsx';
import ReactMeta, { storyDefs, NavigationBarLayout } from './Popover.React.stories.jsx';

export default {
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

const djangoStory = createDjangoStory({ componentName: 'popover' });

const serializePopoverArgs = serializePropsForDjango;

const createPopoverStory = (args) => djangoStory(serializePopoverArgs(args));

/** Plain content in a native disclosure with an enhanced floating panel. */
export const Default = createPopoverStory(storyDefs.Default);

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

const DjangoPopover = djangoComponent({ componentName: 'popover' });
const placements = storyDefs.Placements.map(serializePopoverArgs);
const rtlPlacements = storyDefs.RtlPlacements.map(serializePopoverArgs);

/** All 12 side and alignment combinations use the same template. */
export const AllPlacements = {
  parameters: {
    docs: {
      source: {
        code: placements.map((props) => componentTag({ name: 'popover', props })).join('\n\n'),
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(12rem, 1fr))',
        gap: '6rem 3rem',
      }}
    >
      {placements.map((args) => (
        <div key={args.id}>
          <DjangoPopover {...args} />
        </div>
      ))}
    </div>
  ),
};

/** Start and end alignments follow right-to-left reading order. */
export const RtlPlacements = {
  parameters: {
    docs: {
      source: {
        code: `<div dir="rtl">\n${rtlPlacements.map((props) => componentTag({ name: 'popover', props })).join('\n\n')}\n</div>`,
      },
    },
  },
  render: () => (
    <div
      dir="rtl"
      style={{ display: 'flex', justifyContent: 'center', gap: '8rem', padding: '6rem 3rem' }}
    >
      {rtlPlacements.map((args) => (
        <DjangoPopover key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** The panel keeps a long link list scrollable. */
export const LongContent = createPopoverStory(storyDefs.LongContent);

/** One positioned Popover contains a Tree on small screens and a list with optional nested Popovers on larger screens. */
export const ResponsiveComposition = createPopoverStory(storyDefs.ResponsiveComposition);

export const NavigationBar = {
  render: () => (
    <NavigationBarLayout>
      <DjangoPopover
        {...serializePopoverArgs(storyDefs.NavigationBar)}
      />
    </NavigationBarLayout>
  ),
};
